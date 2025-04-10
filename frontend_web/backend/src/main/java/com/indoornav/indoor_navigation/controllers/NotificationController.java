package com.indoornav.indoor_navigation.controllers;

import com.indoornav.indoor_navigation.models.Notification;
import com.indoornav.indoor_navigation.repositories.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/{userId}")
    public List<Notification> getNotificationsByUser(@PathVariable Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @PostMapping
    public Notification sendNotification(@RequestBody Notification notification) {
        return notificationRepository.save(notification);
    }
}
