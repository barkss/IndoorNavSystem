package com.indoornav.indoor_navigation_backend.Service;

import com.indoornav.indoor_navigation_backend.Entity.Role;
import com.indoornav.indoor_navigation_backend.Repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void initializeRoles() {
        if (roleRepository.findByName("ROLE_VISITOR") == null) {
            Role visitorRole = new Role();
            visitorRole.setName("ROLE_VISITOR");
            roleRepository.save(visitorRole);
        }
        if (roleRepository.findByName("ROLE_STUDENT") == null) {
            Role studentRole = new Role();
            studentRole.setName("ROLE_STUDENT");
            roleRepository.save(studentRole);
        }
        if (roleRepository.findByName("ROLE_FACULTY") == null) {
            Role facultyRole = new Role();
            facultyRole.setName("ROLE_FACULTY");
            roleRepository.save(facultyRole);
        }
        if (roleRepository.findByName("ROLE_ADMIN") == null) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }
    }
}