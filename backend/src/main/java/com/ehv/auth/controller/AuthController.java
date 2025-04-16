package com.ehv.auth.controller;

import com.ehv.auth.dto.AuthResponse;
import com.ehv.auth.dto.PatientAuthRequest;
import com.ehv.auth.service.AuthService;
import com.ehv.patients.model.Patient;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
=======
>>>>>>> 7495d3c7 (feat: Initialized eHV project with separated FE/BE structure and core functionalities)
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
<<<<<<< HEAD

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
=======
>>>>>>> 7495d3c7 (feat: Initialized eHV project with separated FE/BE structure and core functionalities)
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Patient patient) {
<<<<<<< HEAD
        logger.info("📥 REGISTER attempt: {}", patient.getEmail());
        try {
            AuthResponse response = authService.register(patient);
            logger.info("✅ REGISTER success: {}", patient.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("❌ REGISTER failed for {}: {}", patient.getEmail(), e.getMessage());
            return ResponseEntity.status(403).build();
        }
=======
        return ResponseEntity.ok(authService.register(patient));
>>>>>>> 7495d3c7 (feat: Initialized eHV project with separated FE/BE structure and core functionalities)
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody PatientAuthRequest request) {
<<<<<<< HEAD
        logger.info("🔐 LOGIN attempt: {}", request.getEmail());
        try {
            AuthResponse response = authService.login(request);
            logger.info("✅ LOGIN success: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("❌ LOGIN failed for {}: {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(403).build();
        }
    }
}
=======
        return ResponseEntity.ok(authService.login(request));
    }
} 
>>>>>>> 7495d3c7 (feat: Initialized eHV project with separated FE/BE structure and core functionalities)
