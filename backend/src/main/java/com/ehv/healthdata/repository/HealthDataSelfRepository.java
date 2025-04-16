package com.ehv.healthdata.repository;

import com.ehv.healthdata.model.HealthDataSelf;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthDataSelfRepository extends JpaRepository<HealthDataSelf, Long> {
    List<HealthDataSelf> findByPatientId(Long patientId);
} 