package com.example.photopage.Controllers;

import com.example.photopage.Models.User;
import com.example.photopage.Repositories.UserRepository;
import com.example.photopage.Security.JwtUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

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
        user.setAvatar("/Photos/Default/avatar-default.webp"); // pełna ścieżka w resources
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
