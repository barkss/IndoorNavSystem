package com.indoornav.indoor_navigation.repositories;


import com.indoornav.indoor_navigation.entities.CampusStoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CampusStoreRepository extends JpaRepository<CampusStoreEntity, Long> {
    List<CampusStoreEntity> findByCategory(String category);
}
