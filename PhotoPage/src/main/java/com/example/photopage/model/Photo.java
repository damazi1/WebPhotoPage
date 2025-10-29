package com.example.photopage.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "photos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Integer id;

    @Column(nullable = false)
    private String url;  // albo ścieżka na dysku
    @Column(name = "upload_date", nullable = false)
    private LocalDate uploadDate;

}
