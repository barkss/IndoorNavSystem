package com.indoornav.indoor_navigation_backend.Controller;

import com.indoornav.indoor_navigation_backend.Entity.User;
import com.indoornav.indoor_navigation_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        String email = (String) payload.get("email");
        String password = (String) payload.get("password");
        String firstName = (String) payload.get("firstName"); // Assuming you'll add these later
        String lastName = (String) payload.get("lastName");   // Assuming you'll add these later
        String roleName = (String) payload.get("role"); // Get the role as a String

        User user = new User(username, email, password, firstName, lastName);
        List<String> roles = List.of(roleName); // Create a list with the single role

        try {
            User createdUser = userService.saveUser(user, roles, firstName, lastName);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            String errorMessage = "Username or email already exists";
            if (e.getMessage().contains("username")) {
                errorMessage = "Username already exists";
            } else if (e.getMessage().contains("email")) {
                errorMessage = "Email already exists";
            }
            return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
        } catch (Exception e) {
            System.err.println("Unexpected error creating user: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/*/{id}") // Assuming your actual path is something like /api/users/{id}
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> existingUser = userService.getUserById(id.longValue()); // You correctly convert to Long here for the service call
        if (existingUser.isPresent()) {
            user.setId(id); // Pass the Integer id directly
            User updatedUser = userService.saveUser(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}