package com.indoornav.indoor_navigation.models;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // Encrypted password (use BCrypt)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role; // Enum: STUDENT, FACULTY, ADMIN

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private String profilePictureUrl; // Optional profile image

    @Column(nullable = false)
    private boolean isActive = true; // Soft delete flag
}
