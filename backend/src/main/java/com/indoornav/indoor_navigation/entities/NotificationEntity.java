package com.indoornav.indoor_navigation.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean isRead; // Track if user read the notification

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user; // Assign notifications to users

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now(); // Auto-set time
}
