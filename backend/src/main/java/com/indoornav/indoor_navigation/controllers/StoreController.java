package com.indoornav.indoor_navigation.controllers;


import com.indoornav.indoor_navigation.models.Store;
import com.indoornav.indoor_navigation.repositories.StoreRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreRepository storeRepository;

    public StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @GetMapping
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @PostMapping
    public Store createStore(@RequestBody Store store) {
        return storeRepository.save(store);
    }
}
