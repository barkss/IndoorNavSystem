package com.indoornav.indoor_navigation_backend.dto;


import com.indoornav.indoor_navigation_backend.Entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
}
