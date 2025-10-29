package com.example.photopage.service;

import com.example.photopage.model.Follower;
import com.example.photopage.model.FollowerId;
import com.example.photopage.model.User;
import com.example.photopage.repository.FollowerRepository;
import com.example.photopage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowerService {

    private final FollowerRepository followerService;
    private final UserRepository userRepository;


    public long countFollowers(Integer userId) {
        return followerService.countByFollowed_UserId(userId);
    }

    public long countFollowing(Integer userId) {
        return followerService.countByFollower_UserId(userId);
    }
    public void followUser(Integer followerId, Integer followedId) {
        if(followerId.equals(followedId)) {
            throw new IllegalArgumentException("Nie możesz obserwować samego siebie!");
        }

        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException("Follower not found"));
        User followed = userRepository.findById(followedId)
                .orElseThrow(() -> new IllegalArgumentException("Followed user not found"));

        FollowerId id = new FollowerId(followerId, followedId);
        if(followerService.existsById(id)) {
            return; // już obserwuje
        }

        Follower follow = new Follower();
        follow.setId(id);
        follow.setFollower(follower);
        follow.setFollowed(followed);
        followerService.save(follow);

        followerService.save(follow);
    }
}
