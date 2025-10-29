package com.example.photopage.controller;

import com.example.photopage.model.Post;
import com.example.photopage.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

@RequestMapping("/post")
@RestController
@AllArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping(path = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> addPost(
            @RequestPart("description") String description,
            @RequestPart("file") MultipartFile file) {
        Post savedPost = postService.addPost(description, file);
        return ResponseEntity.ok(savedPost);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Post> deletePost(@PathVariable Integer id) {
        Post deletedPost = postService.deletePost(id).orElse(null);
        return ResponseEntity.ok(deletedPost);
    }
}
