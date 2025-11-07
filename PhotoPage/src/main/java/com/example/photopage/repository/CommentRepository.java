package com.example.photopage.repository;

import com.example.photopage.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByPost_Id(Integer postId);
    Optional<Comment> findByIdAndAuthor_UserId(Integer commentId, Integer userId);
}
