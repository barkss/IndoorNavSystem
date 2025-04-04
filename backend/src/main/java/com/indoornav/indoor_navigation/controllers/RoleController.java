package com.indoornav.indoor_navigation.controllers;


import com.indoornav.indoor_navigation.models.RoleEntity;
import com.indoornav.indoor_navigation.repositories.RoleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<RoleEntity> getAllRoles() {
        return roleRepository.findAll();
    }

    @PostMapping
    public RoleEntity createRole(@RequestBody RoleEntity role) {
        return roleRepository.save(role);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        if (!roleRepository.existsById(id)) return ResponseEntity.notFound().build();
        roleRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
