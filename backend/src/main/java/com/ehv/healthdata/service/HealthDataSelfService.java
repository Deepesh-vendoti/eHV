package com.ehv.healthdata.service;

import com.ehv.healthdata.model.HealthDataSelf;
import com.ehv.healthdata.repository.HealthDataSelfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthDataSelfService {
    private final HealthDataSelfRepository repository;

    public HealthDataSelf addHealthData(HealthDataSelf data) {
        data.setEntryTime(LocalDateTime.now());
        return repository.save(data);
    }

    public List<HealthDataSelf> getByPatientId(Long patientId) {
        return repository.findByPatientId(patientId);
    }

    public void deleteEntry(Long id) {
        repository.deleteById(id);
    }
} 