package com.indoornav.indoor_navigation.models;

import jakarta.persistence.*;

@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String startLocation;
    private String endLocation;
    private double distance;

    // Constructors, Getters, and Setters
}
