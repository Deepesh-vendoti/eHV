package com.ehv.patients.service;

import com.ehv.patients.model.Patient;
import com.ehv.patients.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public Patient register(Patient patient) {
        if (patientRepository.existsByEmail(patient.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return patientRepository.save(patient);
    }

    public Patient findByEmail(String email) {
        return patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient updatePatient(Patient patient) {
        if (!patientRepository.existsById(patient.getId())) {
            throw new RuntimeException("Patient not found");
        }
        
        Patient existingPatient = patientRepository.findById(patient.getId()).get();
        
        // Only encode password if it has been changed
        if (patient.getPassword() != null && !patient.getPassword().equals(existingPatient.getPassword())) {
            patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        } else {
            patient.setPassword(existingPatient.getPassword());
        }
        
        return patientRepository.save(patient);
    }

    public void deactivatePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setActive(false);
        patientRepository.save(patient);
    }
} 