package com.ehv.auth.controller;

import com.ehv.auth.dto.AuthResponse;
import com.ehv.auth.dto.PatientAuthRequest;
import com.ehv.auth.service.AuthService;
import com.ehv.patients.model.Patient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Patient patient) {
        return ResponseEntity.ok(authService.register(patient));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody PatientAuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
} 