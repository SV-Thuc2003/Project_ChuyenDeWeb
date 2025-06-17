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

    @Column(name = "product_type")
    private String productType;

    private String technology;

    @Column(columnDefinition = "TEXT")
    private String functions;

    @Column(name = "filtration_stages")
    private Integer filtrationStages;

    @Column(name = "filter_levels")
    private Integer filterLevels;

    @Column(name = "filter_lifespan_months")
    private Integer filterLifespanMonths;

    @Column(name = "working_pressure_mpa")
    private String workingPressureMpa;

    @Column(name = "flow_rate_l_per_min", precision = 5, scale = 2)
    private BigDecimal flowRateLPerMin;

    @Column(name = "capacity_l_per_hour")
    private Integer capacityLPerHour;

    private String material;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(name = "dimension_weight", columnDefinition = "TEXT")
    private String dimensionWeight;

    @Column(name = "brand_origin")
    private String brandOrigin;

    @Column(name = "manufacture_origin")
    private String manufactureOrigin;

    private String manufacturer;

    @Column(name = "launch_year")
    private Integer launchYear;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
