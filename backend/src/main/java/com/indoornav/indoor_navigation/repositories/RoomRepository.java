package com.indoornav.indoor_navigation.repositories;

import com.indoornav.indoor_navigation.entities.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    List<RoomEntity> findByBuildingId(Long buildingId);
}