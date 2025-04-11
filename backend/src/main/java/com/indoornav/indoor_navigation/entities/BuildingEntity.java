package com.indoornav.indoor_navigation.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buildings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuildingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String location; // Optional: lat/lon

    @Column(nullable = false, unique = true)
    private String mappedinBuildingId; // 🗺️ Mappedin ID for this building

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL)
    private List<Room> rooms;
}
