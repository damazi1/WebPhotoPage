package com.example.photopage.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Followers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Follower {

    @EmbeddedId
    private FollowerId id;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "Follower")
    private User follower;

    @ManyToOne
    @MapsId("followedId")
    @JoinColumn(name = "Follow")
    private User followed;
}
