package com.indoornav.indoor_navigation.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "start_point_id", nullable = false)
    private NavigationPointEntity startPoint;

    @ManyToOne
    @JoinColumn(name = "end_point_id", nullable = false)
    private NavigationPointEntity endPoint;

    @Column(nullable = false)
    private double estimatedTime; // Estimated time to walk between points (minutes)

    @Column(nullable = false, unique = true)
    private String mappedinRouteId; // 🗺️ Mappedin API Route ID
}
