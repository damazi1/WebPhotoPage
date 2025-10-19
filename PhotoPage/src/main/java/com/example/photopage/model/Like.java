package com.example.photopage.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Likes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Like {

    @EmbeddedId
    private LikeId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "User_id")
    private User user;

    @ManyToOne
    @MapsId("postId")
    @JoinColumn(name = "Post_id")
    private Post post;
}
