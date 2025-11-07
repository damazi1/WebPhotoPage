package com.example.photopage.service;

import com.example.photopage.dto.LoginRequest;
import com.example.photopage.dto.RegisterRequest;
import com.example.photopage.model.User;
import com.example.photopage.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }
    public User signup(RegisterRequest registerRequest) {
        User user = new User()
                .setName(registerRequest.getName())
                .setEmail(registerRequest.getEmail())
                .setPassword(passwordEncoder.encode(registerRequest.getPassword()))
                .setRoles("USER")
                .setAccountCreateDate(LocalDate.now());
        return userRepository.save(user);
    }
    public User login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        return userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow();
    }

    public void requestPasswordReset(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono użytkownika o podanym adresie"));
        // Tu można dodać logikę wysyłki maila z linkiem resetującym
    }

}
