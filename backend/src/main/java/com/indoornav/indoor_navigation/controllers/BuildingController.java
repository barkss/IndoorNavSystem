package com.indoornav.indoor_navigation.controllers;

import com.indoornav.indoor_navigation.models.BuildingEntity;
import com.indoornav.indoor_navigation.repositories.BuildingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    private final BuildingRepository buildingRepository;

    public BuildingController(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    @GetMapping
    public List<BuildingEntity> getAllBuildings() {
        return buildingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuildingEntity> getBuildingById(@PathVariable Long id) {
        return buildingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BuildingEntity createBuilding(@RequestBody BuildingEntity building) {
        return buildingRepository.save(building);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuildingEntity> updateBuilding(@PathVariable Long id, @RequestBody BuildingEntity updatedBuilding) {
        return buildingRepository.findById(id).map(building -> {
            building.setName(updatedBuilding.getName());
            building.setDescription(updatedBuilding.getDescription());
            return ResponseEntity.ok(buildingRepository.save(building));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuilding(@PathVariable Long id) {
        if (!buildingRepository.existsById(id)) return ResponseEntity.notFound().build();
        buildingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
