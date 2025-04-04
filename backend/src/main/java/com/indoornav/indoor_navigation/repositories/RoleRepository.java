package com.indoornav.indoor_navigation.repositories;

import com.indoornav.indoor_navigation.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}