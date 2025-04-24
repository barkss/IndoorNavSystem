package com.indoornav.indoor_navigation_backend.Controller;

import com.indoornav.indoor_navigation_backend.Config.CustomUserDetails;
import com.indoornav.indoor_navigation_backend.Entity.Role;
import com.indoornav.indoor_navigation_backend.dto.JwtResponse;
import com.indoornav.indoor_navigation_backend.dto.LoginRequest;
import com.indoornav.indoor_navigation_backend.Service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Attempting authentication for email: " + loginRequest.getEmail());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String jwtToken = jwtService.generateToken(userDetails);

            List<Long> roleIds = userDetails.getUser().getRoles().stream()
                    .map(Role::getId) // Role::getId() now returns Long
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwtToken,
                    userDetails.getId().intValue(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roleIds)); // Sending List<Long>
        } catch (AuthenticationException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            return new ResponseEntity<>("Incorrect email or password", HttpStatus.UNAUTHORIZED);
        }
    }
}