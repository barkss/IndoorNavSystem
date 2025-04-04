package com.indoornav.indoor_navigation.repositories;


import com.indoornav.indoor_navigation.models.Building;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingRepository extends JpaRepository<Building, Long> {
}
