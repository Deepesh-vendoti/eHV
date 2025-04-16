package com.ehv.healthdata.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_data_self")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthDataSelf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;

    private Double weight; // in kg

    private Double height; // in cm

    private String bloodPressure; // e.g. "120/80"

    private Double bloodSugar; // e.g. 110.5

    private String notes; // free-text observations

    private LocalDateTime entryTime;
} 