package com.example.photopage.Controllers;

import com.example.photopage.DTO.LoginRequest;
import com.example.photopage.Models.User;
import com.example.photopage.Repositories.UserRepository;
import com.example.photopage.Security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(loginRequest.getEmail()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Nie ma takiego użytkownika"));

        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return jwtUtils.generateJwtToken(user.getEmail());
        } else {
            throw new RuntimeException("Błędne hasło");
        }
    }
}
