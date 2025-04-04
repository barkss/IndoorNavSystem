package com.indoornav.indoor_navigation.repositories;


import com.indoornav.indoor_navigation.models.RouteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteRepository extends JpaRepository<RouteEntity, Long> {
}
