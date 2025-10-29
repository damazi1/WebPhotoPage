package com.example.photopage.controller;

import com.example.photopage.model.Photo;
import com.example.photopage.model.User;
import com.example.photopage.service.PhotoService;
import com.example.photopage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.security.Principal;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/photo")
public class PhotoController {

    private final PhotoService photoService;
    private final UserService userService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file, Principal principal) {
        try {
            String path = photoService.savePhoto(file);
            Photo photo = photoService.createPhotoRecord(path);

            return ResponseEntity.ok(photo);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload error");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        photoService.delete(id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        Photo photo = photoService.findById(id);
        if(photo == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(photo);
    }
    @PostMapping("/avatar")
    public ResponseEntity<?> updateAvatar(@RequestParam("file") MultipartFile file) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            // Usuń stary awatar jeśli istnieje
            Photo oldAvatar = user.getAvatar();
            if (oldAvatar != null) {
                // odłącz awatar od użytkownika
                user.setAvatar(null);
                userService.save(user);

                // usuń plik z dysku
                Path oldFilePath = Path.of("uploads", Path.of(oldAvatar.getUrl()).getFileName().toString());
                Files.deleteIfExists(oldFilePath);

                // usuń rekord z bazy
                photoService.delete(oldAvatar.getId());
            }

            // zapisz nowy plik
            String path = photoService.savePhoto(file);
            Photo newPhoto = photoService.createPhotoRecord(path);

            user.setAvatar(newPhoto);
            userService.save(user);

            return ResponseEntity.ok("Avatar updated.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Upload error: " + e.getMessage());
        }
    }
    @GetMapping("/avatar-by-id/{userId}")
    public ResponseEntity<?> getUserAvatar(@PathVariable Integer userId) {
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
