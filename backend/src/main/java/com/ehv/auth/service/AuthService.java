package com.ehv.auth.service;

import com.ehv.auth.config.JwtTokenProvider;
import com.ehv.auth.dto.AuthResponse;
import com.ehv.auth.dto.PatientAuthRequest;
import com.ehv.patients.model.Patient;
import com.ehv.patients.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(PatientAuthRequest request) {
        System.out.println("🔐 Attempting login for: " + request.getEmail());

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        return new AuthResponse(token);
    }

    public AuthResponse register(Patient patient) {
        System.out.println("📥 Registration request for: " + patient.getEmail());

        try {
            if (patientRepository.existsByEmail(patient.getEmail())) {
                System.out.println("⚠️ Email already registered: " + patient.getEmail());
                throw new RuntimeException("Email already registered");
            }

            // ✅ Hash password before storing
            String rawPassword = patient.getPassword();
            patient.setPassword(passwordEncoder.encode(rawPassword));
            patient.setActive(true);

            // ✅ Save patient
            Patient savedPatient = patientRepository.save(patient);
            System.out.println("✅ Patient saved: " + savedPatient.getEmail());

            // ✅ Authenticate using raw password
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(patient.getEmail(), rawPassword)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);

            return new AuthResponse(token);

        } catch (Exception e) {
            System.out.println("❌ Registration failed with error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Registration failed. Please check logs for details.");
        }
    }
}