package com.indoornav.indoor_navigation_backend.Service;

import com.indoornav.indoor_navigation_backend.Config.CustomUserDetails;
import com.indoornav.indoor_navigation_backend.Entity.User;
import com.indoornav.indoor_navigation_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Added for potential lazy loading issues

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional // Add Transactional to ensure roles are fetched within the session
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new CustomUserDetails( // Updated constructor call
                user.getId(),
                user.getUsername(), // Or user.getEmail() if that's what you use as username
                user.getEmail(),
                user.getPassword(),
                authorities,
                user // Pass the User entity here
        );
    }
}