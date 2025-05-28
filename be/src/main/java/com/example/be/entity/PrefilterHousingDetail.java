package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "prefilter_housing_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrefilterHousingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    @Column(name = "cup_count")
    private String cupCount;

    @Column(name = "filter_materials", columnDefinition = "TEXT")
    private String filterMaterials;

    @Column(name = "housing_material", columnDefinition = "TEXT")
    private String housingMaterial;

    @Column(name = "filter_capacity", columnDefinition = "TEXT")
    private String filterCapacity;

    @Column(columnDefinition = "TEXT")
    private String functions;

    @Column(name = "filter_lifespan")
    private String filterLifespan;

    @Column(name = "filtration_stages")
    private Integer filtrationStages;

    @Column(name = "filter_count")
    private Integer filterCount;

    private String technology;

    @Column(name = "working_pressure_mpa")
    private String workingPressureMpa;

    @Column(name = "flow_rate_l_per_min", precision = 5, scale = 2)
    private BigDecimal flowRateLPerMin;

    @Column(name = "capacity_l_per_hour")
    private Integer capacityLPerHour;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String dimensions;

    @Column(name = "weight_kg", precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "brand_origin")
    private String brandOrigin;

    @Column(name = "manufacture_origin")
    private String manufactureOrigin;

    @Column(name = "launch_year")
    private Integer launchYear;

    @Column(columnDefinition = "TEXT")
    private String warranty;

    @Column(name = "additional_info", columnDefinition = "TEXT")
    private String additionalInfo;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
