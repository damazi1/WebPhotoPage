package com.example.photopage.Models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private LocalDate accountCreateDate;

    private String email;
    private String name;
    private String password;
    private String phone;

    // Gettery i settery
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public LocalDate getAccountCreateDate() { return accountCreateDate; }
    public void setAccountCreateDate(LocalDate accountCreateDate) { this.accountCreateDate = accountCreateDate; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
