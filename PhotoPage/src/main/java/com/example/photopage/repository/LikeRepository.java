package com.example.photopage.repository;

import com.example.photopage.model.Like;
import com.example.photopage.model.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {
    int countByPost_Id(Integer postId);
    List<Like> findAllByUser_UserId(Integer userId);
}
