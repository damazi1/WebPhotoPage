package com.example.photopage.service;

import com.example.photopage.model.Photo;
import com.example.photopage.model.Post;
import com.example.photopage.model.User;
import com.example.photopage.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PhotoService photoService;

    public Post addPost(String description, MultipartFile file){
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
        } catch (Exception e){
            throw new RuntimeException("Upload error");
        }

    }

    public Optional<Post> deletePost (Integer id){
        Post post = postRepository.findById(id).orElse(null);
        postRepository.deleteById(id);
        return Optional.ofNullable(post);
    }
}
