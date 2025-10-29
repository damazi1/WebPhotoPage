package com.example.photopage.service;

import com.example.photopage.model.Photo;
import com.example.photopage.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class PhotoService {

    private final PhotoRepository photoRepository;

    private final String uploadDir = "uploads/";

    public String savePhoto(MultipartFile file) throws IOException {

        Files.createDirectories(Path.of(uploadDir));

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Path.of(uploadDir, filename);

        // Kopiujemy plik
        Files.copy(file.getInputStream(), filePath);

        // Zwracamy ścieżkę względną dla frontendu
        return "/uploads/" + filename;
    }

    public Photo createPhotoRecord(String path) {
        Photo photo = new Photo();
        photo.setUrl(path);
        photo.setUploadDate(LocalDate.now());
        return photoRepository.save(photo);
    }

    public Photo findById(Integer id) {
        return photoRepository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        photoRepository.deleteById(id);
    }
}
