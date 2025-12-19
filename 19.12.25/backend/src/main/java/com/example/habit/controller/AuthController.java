package com.example.habit.controller;

import com.example.habit.dto.AuthRequest;
import com.example.habit.dto.AuthResponse;
import com.example.habit.entity.User;
import com.example.habit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null, null, "Username is required"));
        }
        
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null, null, "Password must be at least 6 characters"));
        }
        
        if (request.getDisplayName() == null || request.getDisplayName().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null, null, "Display name is required"));
        }

        // Check if username already exists
        if (userService.usernameExists(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(null, request.getUsername(), null, "Username already exists"));
        }

        // Register user
        try {
            User savedUser = userService.registerUser(
                request.getUsername().trim(), 
                request.getPassword(), 
                request.getDisplayName().trim()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(savedUser.getId(), savedUser.getUsername(), 
                            savedUser.getDisplayName(), "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(null, null, null, "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null, null, "Username is required"));
        }
        
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null, null, "Password is required"));
        }

        Optional<User> userOptional = userService.authenticateUser(request.getUsername(), request.getPassword());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, request.getUsername(), null, "Invalid username or password"));
        }

        User user = userOptional.get();
        return ResponseEntity.ok(new AuthResponse(user.getId(), user.getUsername(), 
                user.getDisplayName(), "Login successful"));
    }
}
