package com.ehv.records.service;

import com.ehv.records.model.HealthRecord;
import com.ehv.records.repository.HealthRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class HealthRecordService {
    private final HealthRecordRepository repository;
    private final String uploadDir = "uploads/medical-records";

    @Autowired
    public HealthRecordService(HealthRecordRepository repository) {
        this.repository = repository;
    }

    public HealthRecord uploadRecord(MultipartFile file, Long patientId, String recordType,
                                   String description, String uploadedBy, String tags) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = System.currentTimeMillis() + "_" + originalFilename;
        Path filePath = uploadPath.resolve(uniqueFilename);

        // Save file
        Files.copy(file.getInputStream(), filePath);

        // Create and save record
        HealthRecord record = HealthRecord.builder()
                .patientId(patientId)
                .recordType(recordType)
                .fileName(originalFilename)
                .filePath(filePath.toString())
                .description(description)
                .uploadDate(LocalDateTime.now())
                .uploadedBy(uploadedBy)
                .tags(tags)
                .fileType(file.getContentType())
                .fileSize(file.getSize())
                .status("ACTIVE")
                .build();
        return repository.save(record);
    }

    public List<HealthRecord> getPatientRecords(Long patientId) {
        return repository.findByPatientIdAndStatus(patientId, "ACTIVE");
    }

    public List<HealthRecord> getPatientRecordsByType(Long patientId, String recordType) {
        return repository.findByPatientIdAndRecordType(patientId, recordType);
    }

    public void deleteRecord(Long id) {
        HealthRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
        record.setStatus("DELETED");
        repository.save(record);
    }

    public byte[] downloadRecord(Long id) throws IOException {
        HealthRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
        
        Path filePath = Paths.get(record.getFilePath());
        return Files.readAllBytes(filePath);
    }
} 