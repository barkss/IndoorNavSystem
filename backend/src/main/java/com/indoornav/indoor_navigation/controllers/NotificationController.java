package com.indoornav.indoor_navigation.controllers;

import com.indoornav.indoor_navigation.models.NotificationEntity;
import com.indoornav.indoor_navigation.repositories.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @PostMapping
    public NotificationEntity createNotification(@RequestBody NotificationEntity notification) {
        return notificationRepository.save(notification);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        if (!notificationRepository.existsById(id)) return ResponseEntity.notFound().build();
        notificationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
