package com.example.photopage.service;

import com.example.photopage.dto.ChangePasswordRequest;
import com.example.photopage.dto.UpdateUserRequest;
import com.example.photopage.model.Photo;
import com.example.photopage.model.User;
import com.example.photopage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }
    public User save(User user) {
        return userRepository.save(user);
    }
    public Photo getUserAvatar(Integer userId) {
        return userRepository.findAvatarByUserId(userId);
    }

    public User updateUser(User user, UpdateUserRequest request) {
        if (request.name() != null) {
            String trimmedName = request.name().trim();
            if (!trimmedName.isEmpty()) {
                user.setName(trimmedName);
            }
        }

        if (request.email() != null) {
            String trimmedEmail = request.email().trim();
            if (!trimmedEmail.isEmpty() && !trimmedEmail.equals(user.getEmail())) {
                userRepository.findByEmail(trimmedEmail)
                        .filter(existing -> !existing.getUserId().equals(user.getUserId()))
                        .ifPresent(existing -> {
                            throw new IllegalArgumentException("Email jest już zajęty");
                        });
                user.setEmail(trimmedEmail);
            }
        }

        return userRepository.save(user);
    }

    public void changePassword(User user, ChangePasswordRequest request) {
        if (request.oldPassword() == null || request.newPassword() == null) {
            throw new IllegalArgumentException("Hasła nie mogą być puste");
        }

        String oldPassword = request.oldPassword().trim();
        String newPassword = request.newPassword().trim();

        if (newPassword.length() < 8) {
            throw new IllegalArgumentException("Hasło musi mieć co najmniej 8 znaków");
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Aktualne hasło jest nieprawidłowe");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
