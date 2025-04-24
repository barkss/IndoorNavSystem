package com.indoornav.indoor_navigation_backend.Repository;

import com.indoornav.indoor_navigation_backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String name); // Correctly placed in RoleRepository
}