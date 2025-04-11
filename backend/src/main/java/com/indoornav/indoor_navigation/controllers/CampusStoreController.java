package com.indoornav.indoor_navigation.controllers;


import com.indoornav.indoor_navigation.entities.CampusStoreEntity;
import com.indoornav.indoor_navigation.repositories.CampusStoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campus-stores")
public class CampusStoreController {

    private final CampusStoreRepository campusStoreRepository;

    public CampusStoreController(CampusStoreRepository campusStoreRepository) {
        this.campusStoreRepository = campusStoreRepository;
    }

    @GetMapping
    public List<CampusStoreEntity> getAllStores() {
        return campusStoreRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampusStoreEntity> getStoreById(@PathVariable Long id) {
        return campusStoreRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CampusStoreEntity createStore(@RequestBody CampusStoreEntity store) {
        return campusStoreRepository.save(store);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        if (!campusStoreRepository.existsById(id)) return ResponseEntity.notFound().build();
        campusStoreRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
