package com.indoornav.indoor_navigation.controllers;

import com.indoornav.indoor_navigation.models.RouteEntity;
import com.indoornav.indoor_navigation.repositories.RouteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteRepository routeRepository;
    private final RestTemplate restTemplate;

    // Mappedin API Base URL (Replace with actual URL)
    private static final String MAPPEDIN_API_URL = "https://api.mappedin.com/navigation";

    public RouteController(RouteRepository routeRepository, RestTemplate restTemplate) {
        this.routeRepository = routeRepository;
        this.restTemplate = restTemplate;
    }

    // Fetch all predefined routes (from our database)
    @GetMapping
    public List<RouteEntity> getAllRoutes() {
        return routeRepository.findAll();
    }

    // Fetch a specific route from our database
    @GetMapping("/{id}")
    public ResponseEntity<RouteEntity> getRouteById(@PathVariable Long id) {
        Optional<RouteEntity> route = routeRepository.findById(id);
        return route.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Fetch a real-time route from Mappedin API
    @GetMapping("/mappedin")
    public ResponseEntity<String> getMappedinRoute(@RequestParam String start, @RequestParam String destination) {
        String url = MAPPEDIN_API_URL + "?start=" + start + "&destination=" + destination;
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }

    // Create a new route (optional)
    @PostMapping
    public RouteEntity createRoute(@RequestBody RouteEntity route) {
        return routeRepository.save(route);
    }

    // Delete a route
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        if (!routeRepository.existsById(id)) return ResponseEntity.notFound().build();
        routeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

