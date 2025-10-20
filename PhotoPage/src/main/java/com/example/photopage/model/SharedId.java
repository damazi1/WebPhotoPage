package com.example.photopage.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SharedId implements Serializable {
    private Integer userId;
    private Integer postId;
}
