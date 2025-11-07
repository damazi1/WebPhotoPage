package com.example.photopage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserDetails {
    private String name;
    private String email;
    private LocalDate createDate;
}
