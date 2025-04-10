package com.indoornav.indoor_navigation.repositories;


import com.indoornav.indoor_navigation.models.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByCategory(String category);
}
