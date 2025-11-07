package com.example.photopage.repository;

import com.example.photopage.model.Post;
import com.example.photopage.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByOwner_UserId(Integer userId);
    List<Post> findByOwner(User owner);
}
