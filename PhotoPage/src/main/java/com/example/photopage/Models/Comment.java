package com.example.photopage.Models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Comment_id")
    private Integer id;

    @Column(name = "Content", nullable = false)
    private String content;

    @Column(name = "Comment_creation_date", nullable = false)
    private LocalDate creationDate;

    @ManyToOne
    @JoinColumn(name = "User_id", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name = "Post_id", nullable = false)
    private Post post;
}
