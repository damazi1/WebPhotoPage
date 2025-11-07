package com.example.photopage.dto;

import java.time.LocalDate;

public record CommentResponse(
        Integer id,
        String content,
        String authorName,
        String authorEmail,
        String avatarUrl,
        LocalDate creationDate
) {
}
