package com.example.photopage.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Post_id")
    private Integer id;

    @Column(name = "Description")
    private String description;

    @Column(name = "Photo", nullable = false)
    private String photo;

    @Column(name = "Post_creation_date", nullable = false)
    private LocalDate postCreationDate;

    @ManyToOne
    @JoinColumn(name = "Owner", nullable = false)
    private User owner;

    // Relacje
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @ManyToMany
    @JoinTable(
        name = "Tags_Posts",
        joinColumns = @JoinColumn(name = "Post_id"),
        inverseJoinColumns = @JoinColumn(name = "Tag_id")
    )
    private List<Tag> tags;
}
