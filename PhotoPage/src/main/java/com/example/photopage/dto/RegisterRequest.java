package com.example.photopage.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String name;
    private String password;
    private String phone;
    private LocalDate accountCreateDate; // opcjonalne
}