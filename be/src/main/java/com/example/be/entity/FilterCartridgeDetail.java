package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "filter_cartridge_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterCartridgeDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    @Column(columnDefinition = "TEXT")
    private String usedFor;

    private String type;

    @Column(name = "stage_number") // since SQL uses VARCHAR for this field
    private String stageNumber;

    @Column(columnDefinition = "TEXT")
    private String material;

    @Column(name = "filter_functions", columnDefinition = "TEXT")
    private String functions;

    @Column(name = "filter_size_micron")
    private String filterSizeMicron;

    @Column(name = "lifespan_months")
    private Integer lifespanMonths;

    @Column(name = "brand_origin")
    private String brandOrigin;

    @Column(name = "manufacture_origin")
    private String manufactureOrigin;

    private String manufacturer;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

