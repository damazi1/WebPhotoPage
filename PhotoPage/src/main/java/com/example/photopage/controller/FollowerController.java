package com.example.photopage.controller;

import com.example.photopage.service.FollowerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/follow")
public class FollowerController {
    private final FollowerService followerService;

    public FollowerController(FollowerService followerService) {
        this.followerService = followerService;
    }


    @GetMapping("/followers/{id}")
    public ResponseEntity<?> getFollowersCount(@PathVariable Integer id) {
        long count = followerService.countFollowers(id); // zawsze >= 0
        return ResponseEntity.ok(Map.of("followersCount", count));
    }
    @GetMapping("/following/{id}")
    public ResponseEntity<?> getFollowingCount(@PathVariable Integer id) {
        long count = followerService.countFollowing(id);
        return ResponseEntity.ok(Map.of("followingCount", count));
    }
    @PostMapping("/followUser/{followerId}/{followedId}")
    public ResponseEntity<?> followUser(@PathVariable Integer followerId, @PathVariable Integer followedId) {
        if(followerId.equals(followedId)) {
            throw new IllegalArgumentException("Nie można followować samego siebie");
        }
        followerService.followUser(followerId, followedId);
        return ResponseEntity.ok().build();
    }
}
