package com.example.photopage.controller;

import com.example.photopage.dto.UserDetails;
import com.example.photopage.model.User;
import com.example.photopage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers(){
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }
    // Pobierz zalogowanego użytkownika
//    @GetMapping("/me")
//    public User getMyProfile(@RequestHeader("Authorization") String authHeader) {
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            throw new RuntimeException("Missing or invalid Authorization header");
//        }
//
//        String token = authHeader.substring(7); // usuń "Bearer "
//
//        String email = jwtService.extractUsername(token);
//
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }
}
