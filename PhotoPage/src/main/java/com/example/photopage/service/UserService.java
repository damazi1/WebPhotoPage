package com.example.photopage.service;

import com.example.photopage.config.JwtService;
import com.example.photopage.dto.UserDetails;
import com.example.photopage.model.User;
import com.example.photopage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }
}
