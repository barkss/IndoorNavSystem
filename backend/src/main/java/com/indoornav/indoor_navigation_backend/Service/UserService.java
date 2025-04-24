package com.indoornav.indoor_navigation_backend.Service;

import com.indoornav.indoor_navigation_backend.Entity.Role;
import com.indoornav.indoor_navigation_backend.Entity.User;
import com.indoornav.indoor_navigation_backend.Repository.RoleRepository;
import com.indoornav.indoor_navigation_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public User saveUser(User user) { // For updating basic user info
        return userRepository.save(user);
    }

    @Transactional
    public User saveUser(User user, List<String> selectedRoles, String firstName, String lastName) { // For signup
        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            User savedUser = userRepository.save(user);

            for (String roleName : selectedRoles) {
                Role role = roleRepository.findByName(roleName);
                if (role != null) {
                    savedUser.addRole(role);
                } else {
                    System.err.println("Warning: Role '" + roleName + "' not found.");
                }
            }
            return savedUser;
        } catch (DataIntegrityViolationException e) {
            System.err.println("Error saving user due to data integrity violation: " + e.getMessage());
            throw e;
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}