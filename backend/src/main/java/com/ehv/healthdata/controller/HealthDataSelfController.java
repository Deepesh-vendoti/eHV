package com.ehv.healthdata.controller;

import com.ehv.healthdata.model.HealthDataSelf;
import com.ehv.healthdata.service.HealthDataSelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/healthdata/self")
@RequiredArgsConstructor
public class HealthDataSelfController {
    private final HealthDataSelfService service;

    @PostMapping
    public ResponseEntity<HealthDataSelf> addData(@RequestBody HealthDataSelf data) {
        return ResponseEntity.ok(service.addHealthData(data));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<HealthDataSelf>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(service.getByPatientId(patientId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        service.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
} 