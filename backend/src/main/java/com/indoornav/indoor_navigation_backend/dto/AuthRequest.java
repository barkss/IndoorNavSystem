package com.indoornav.indoor_navigation_backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}