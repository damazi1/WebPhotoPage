package com.example.photopage.controller;

import com.example.photopage.model.User;
import com.example.photopage.repository.UserRepository;
import com.example.photopage.Security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    // Pobierz wszystkich użytkowników
    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Dodaj nowego użytkownika
    @PostMapping
    public User addUser(@RequestBody User user) {
        user.setAccountCreateDate(LocalDate.now());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Pobierz zalogowanego użytkownika
    @GetMapping("/me")
    public User getMyProfile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // usuń "Bearer "
        if (!jwtUtils.validateJwtToken(token)) {
            throw new RuntimeException("Invalid JWT token");
        }

        String email = jwtUtils.getEmailFromJwtToken(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
