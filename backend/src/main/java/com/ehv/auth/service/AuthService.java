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
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        return new AuthResponse(token);
    }

    public AuthResponse register(Patient patient) {
        if (patientRepository.existsByEmail(patient.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        patient.setActive(true);
        patientRepository.save(patient);

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(patient.getEmail(), patient.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        return new AuthResponse(token);
    }
} 