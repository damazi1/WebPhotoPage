package com.example.photopage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PostsRequest {
    private Integer id;
    private String description;
    private String imageUrl;
    private LocalDate postCreationDate;
}
