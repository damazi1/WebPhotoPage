package com.example.photopage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
public class UserDetails {
    private String name;
    private String email;
    private LocalDate createDate;
}
