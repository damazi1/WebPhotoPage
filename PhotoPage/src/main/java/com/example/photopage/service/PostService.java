package com.example.photopage.service;

import com.example.photopage.dto.CommentResponse;
import com.example.photopage.dto.PostsRequest;
import com.example.photopage.model.Comment;
import com.example.photopage.model.Like;
import com.example.photopage.model.LikeId;
import com.example.photopage.model.Photo;
import com.example.photopage.model.Post;
import com.example.photopage.model.User;
import com.example.photopage.repository.CommentRepository;
import com.example.photopage.repository.LikeRepository;
import com.example.photopage.repository.PostRepository;
import com.example.photopage.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PhotoService photoService;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;

    public Post addPost(String description, MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        try {
            String path = photoService.savePhoto(file);
            Photo photo = photoService.createPhotoRecord(path);
            Post post = new Post()
                    .setDescription(description)
                    .setPhoto(photo)
                    .setPostCreationDate(LocalDate.now())
                    .setOwner(user);
            return postRepository.save(post);
        } catch (Exception e) {
            throw new RuntimeException("Upload error");
        }

    }

    public Optional<Post> deletePost(Integer id) {
        Post post = postRepository.findById(id).orElse(null);
        postRepository.deleteById(id);
        return Optional.ofNullable(post);
    }

    public List<PostsRequest> getPostsByUserId(Integer userId) {
        var userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Nie znaleziono użytkownika o ID: " + userId);
        }

        return postRepository.findByOwner(userOpt.get())
                .stream()
                .map(post -> new PostsRequest(
                        post.getId(),
                        post.getDescription(),
                        post.getPhoto() != null ? post.getPhoto().getUrl() : null,
                        post.getPostCreationDate()
                ))
                .toList();
    }

    public List<PostsRequest> getMyPosts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        List<Post> posts = postRepository.findByOwner(user);

        return posts.stream()
                .map(post -> new PostsRequest(
                        post.getId(),
                        post.getDescription(),
                        post.getPhoto() != null ? post.getPhoto().getUrl() : null,
                        post.getPostCreationDate()
                ))
                .toList();
    }

    public void toggleLike(Integer postId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        LikeId likeId = new LikeId(user.getUserId(), postId);
        if (likeRepository.existsById(likeId)) {
            likeRepository.deleteById(likeId);
            return;
        }

        Post post = postRepository.findById(postId).orElseThrow();
        Like like = Like.builder()
                .id(likeId)
                .user(user)
                .post(post)
                .build();
        likeRepository.save(like);
    }

    public int getLikeCount(Integer postId) {
        return likeRepository.countByPost_Id(postId);
    }

    public boolean hasUserLiked(Integer postId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        LikeId likeId = new LikeId(user.getUserId(), postId);
        return likeRepository.existsById(likeId);
    }

    public List<PostsRequest> getLikedPosts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        return likeRepository.findAllByUser_UserId(user.getUserId())
                .stream()
                .map(Like::getPost)
                .map(post -> new PostsRequest(
                        post.getId(),
                        post.getDescription(),
                        post.getPhoto() != null ? post.getPhoto().getUrl() : null,
                        post.getPostCreationDate()
                ))
                .toList();
    }

    public void addComment(Integer postId, String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Treść komentarza nie może być pusta");
        }
        String trimmedContent = content.trim();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Post post = postRepository.findById(postId).orElseThrow();

        Comment comment = Comment.builder()
                .content(trimmedContent)
                .creationDate(LocalDate.now())
                .author(user)
                .post(post)
                .build();
        commentRepository.save(comment);
    }

    public List<CommentResponse> getComments(Integer postId) {
        return commentRepository.findAllByPost_Id(postId)
                .stream()
                .map(comment -> new CommentResponse(
                        comment.getId(),
                        comment.getContent(),
                        comment.getAuthor().getName(),
                        comment.getAuthor().getEmail(),
                        comment.getAuthor().getAvatar() != null ? comment.getAuthor().getAvatar().getUrl() : null,
                        comment.getCreationDate()
                ))
                .toList();
    }

    public void deleteComment(Integer postId, Integer commentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Comment comment = commentRepository.findById(commentId)
                .filter(c -> c.getPost().getId().equals(postId))
                .orElseThrow(() -> new RuntimeException("Komentarz nie istnieje"));

        if (!comment.getAuthor().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Brak uprawnień do usunięcia komentarza");
        }

        commentRepository.delete(comment);
    }

}

