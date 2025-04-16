package com.ehv.records.controller;

import com.ehv.records.model.HealthRecord;
import com.ehv.records.service.HealthRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/health-records")
public class HealthRecordController {
    private final HealthRecordService service;

    @Autowired
    public HealthRecordController(HealthRecordService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<HealthRecord> uploadRecord(
            @RequestParam("file") MultipartFile file,
            @RequestParam Long patientId,
            @RequestParam String recordType,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String tags) {
        try {
            HealthRecord record = service.uploadRecord(file, patientId, recordType, description, "system", tags);
            return ResponseEntity.ok(record);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<HealthRecord>> getPatientRecords(@PathVariable Long patientId) {
        return ResponseEntity.ok(service.getPatientRecords(patientId));
    }

    @GetMapping("/patient/{patientId}/type/{recordType}")
    public ResponseEntity<List<HealthRecord>> getPatientRecordsByType(
            @PathVariable Long patientId,
            @PathVariable String recordType) {
        return ResponseEntity.ok(service.getPatientRecordsByType(patientId, recordType));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        service.deleteRecord(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadRecord(@PathVariable Long id) {
        try {
            byte[] fileContent = service.downloadRecord(id);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"record\"")
                    .body(fileContent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 