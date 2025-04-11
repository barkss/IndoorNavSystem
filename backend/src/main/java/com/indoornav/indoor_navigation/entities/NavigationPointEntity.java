package com.indoornav.indoor_navigation.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "navigation_points")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NavigationPointEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private BuildingEntity building;

    @Column(nullable = true)
    private String description; // Example: "Entrance of Library"

    @Column(nullable = false, unique = true)
    private String mappedinPointId; // 🗺️ Waypoint ID from Mappedin
}
