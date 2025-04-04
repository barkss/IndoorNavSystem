package com.indoornav.indoor_navigation.controllers;

import com.indoornav.indoor_navigation.models.Building;
import com.indoornav.indoor_navigation.repositories.BuildingRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    @Autowired
    private BuildingRepository buildingRepository;

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    @PostMapping
    public Building createBuilding(@RequestBody Building building) {
        return buildingRepository.save(building);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Building> getBuildingById(@PathVariable Long id) {
        return buildingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Building> updateBuilding(@PathVariable Long id, @RequestBody Building buildingDetails) {
        return buildingRepository.findById(id)
                .map(building -> {
                    building.setName(buildingDetails.getName());
                    building.setLocation(buildingDetails.getLocation());
                    return ResponseEntity.ok(buildingRepository.save(building));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBuilding(@PathVariable Long id) {
        return buildingRepository.findById(id)
                .map(building -> {
                    buildingRepository.delete(building);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}