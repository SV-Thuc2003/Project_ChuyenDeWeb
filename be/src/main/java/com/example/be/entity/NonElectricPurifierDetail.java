package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "non_electric_purifier_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonElectricPurifierDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    private Integer filtrationStages;

    private Integer filterLevels;

    @Column(name = "filter_lifespan_months")
    private Integer filterLifespanMonths;

    private String technology;

    @Column(columnDefinition = "TEXT")
    private String functions;

    @Column(name = "working_pressure_mpa")
    private String workingPressureMpa;

    @Column(name = "flow_rate_l_per_min", precision = 5, scale = 2)
    private BigDecimal flowRateLPerMin;

    @Column(name = "tank_capacity")
    private String tankCapacity;

    @Column(name = "capacity_l_per_hour")
    private Integer capacityLPerHour;

    @Column(columnDefinition = "TEXT")
    private String features;

    private String material;

    @Column(columnDefinition = "TEXT")
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

    @Column(columnDefinition = "TEXT")
    private String additionalInfo;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
