package com.ehv.records.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private String recordType; // e.g., "LAB_REPORT", "PRESCRIPTION", "SCAN", etc.

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String filePath;

    @Column
    private String description;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @Column(nullable = false)
    private String uploadedBy; // Could be doctor ID or patient ID

    @Column
    private String tags; // Comma-separated tags for easy searching

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false)
    private Long fileSize;

    @Column(nullable = false)
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, DELETED

    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = "ACTIVE";
        }
    }
} 