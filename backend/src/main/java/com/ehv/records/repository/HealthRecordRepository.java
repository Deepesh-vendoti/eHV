package com.ehv.records.repository;

import com.ehv.records.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByPatientId(Long patientId);
    List<HealthRecord> findByPatientIdAndRecordType(Long patientId, String recordType);
    List<HealthRecord> findByPatientIdAndStatus(Long patientId, String status);
    List<HealthRecord> findByPatientIdAndStatusOrderByUploadDateDesc(Long patientId, String status);
    boolean existsByFileNameAndPatientIdAndStatus(String fileName, Long patientId, String status);
} 