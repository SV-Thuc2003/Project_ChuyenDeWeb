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

    private Integer stageNumber;

    private String type;

    private String material;

    @Column(name = "filter_size_micron")
    private String filterSizeMicron;

    private Integer lifespanLiters;

    private Integer lifespanMonths;

    @Column(columnDefinition = "TEXT")
    private String functions;

    @Column(name = "brand_origin")
    private String brandOrigin;

    @Column(name = "manufacture_origin")
    private String manufactureOrigin;

    @Column(columnDefinition = "TEXT")
    private String warranty;

    @Column(columnDefinition = "TEXT")
    private String additionalInfo;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
