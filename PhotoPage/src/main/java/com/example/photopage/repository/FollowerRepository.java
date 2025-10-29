package com.example.photopage.repository;

import com.example.photopage.model.Follower;
import com.example.photopage.model.FollowerId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, FollowerId> {

    long countByFollowed_UserId(Integer userId);
    long countByFollower_UserId(Integer userId);
}
