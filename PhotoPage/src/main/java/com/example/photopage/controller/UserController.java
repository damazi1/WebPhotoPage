package com.example.photopage.controller;

import com.example.photopage.dto.UserDetails;
import com.example.photopage.model.Photo;
import com.example.photopage.model.User;
import com.example.photopage.service.PhotoService;
import com.example.photopage.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PhotoService photoService;

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false) // takie samo jak w login
                .path("/")
                .maxAge(0) // usuwa cookie
                .sameSite(SameSiteCookies.STRICT.toString()) // takie samo jak w login
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }
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
    @GetMapping("/{id:\\d+}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/avatar")
    public ResponseEntity<?> updateAvatar(@RequestParam("file") MultipartFile file) {
        try {
            // pobierz aktualnego użytkownika
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            // zapisz plik
            String path = photoService.savePhoto(file);
            Photo photo = photoService.createPhotoRecord(path);

            // przypisz awatar do użytkownika
            user.setAvatar(photo);
            userService.save(user); // musisz mieć w UserService metodę save(User)

            return ResponseEntity.ok("Avatar updated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload error: " + e.getMessage());
        }
    }
    @GetMapping("/avatar/{userId}")
    public ResponseEntity<?> getAvatar(@PathVariable Integer userId) {
        try {
            Photo avatar = userService.getUserAvatar(userId);
            String path = (avatar != null) ? avatar.getUrl() : "/avatar-default.webp";
            return ResponseEntity.ok(Map.of("path", path));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server error fetching avatar");
        }
    }
}
