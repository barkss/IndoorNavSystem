package com.indoornav.indoor_navigation.repositories;


import com.indoornav.indoor_navigation.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
