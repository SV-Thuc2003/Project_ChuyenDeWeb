package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "water_purifier_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaterPurifierDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private String modelName;
    private String type;
    private String hotColdSupport;
    private Integer filtrationStages;
    private String technology;
    private String tankCapacity;
    private String capacityLPerHour;
    private String powerConsumption;
    private String dimensions;
    private BigDecimal weightKg;
    private String voltage;
    private String origin;
    private String warranty;
    private String suitableUses;
    private String material;
    private String additionalInfo;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

