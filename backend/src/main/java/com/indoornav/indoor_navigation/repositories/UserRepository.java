package com.indoornav.indoor_navigation.repositories;


import com.indoornav.indoor_navigation.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
