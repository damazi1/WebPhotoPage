package com.example.photopage.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class FollowerId implements Serializable {
    private Integer followerId;
    private Integer followedId;
}
