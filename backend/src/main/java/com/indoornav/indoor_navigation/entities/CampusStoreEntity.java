package com.indoornav.indoor_navigation.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "campus_stores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampusStoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // Canteen, Bookstore, Coffee Shop, etc.

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private BuildingEntity building; // Store is inside a building

    @Column(nullable = false)
    private String floor;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true, unique = true)
    private String mappedinStoreId; // 🗺️ Mappedin Store ID (if mapped)

    @Column(nullable = false)
    private boolean isOpen; // Store status (Open/Closed)
}
