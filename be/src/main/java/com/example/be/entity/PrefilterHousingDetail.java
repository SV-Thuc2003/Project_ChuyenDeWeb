package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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

    @Column(name = "filter_quantity")
    private Integer filterQuantity;                      // Số lượng cốc lọc

    @Column(name = "filter_material", columnDefinition = "TEXT")
    private String filterMaterial;                        // Chất liệu lõi lọc

    @Column(name = "housing_material", length = 100)
    private String housingMaterial;                       // Chất liệu thân cốc lọc

    @Column(name = "filter_capacity_litres")
    private Integer filterCapacityLitres;                 // Số lít nước lọc tối đa

    @Column(name = "prefilter_function", columnDefinition = "TEXT")
    private String prefilterFunction;                     // Công dụng

    @Column(name = "replacement_cycle", length = 100)
    private String replacementCycle;                       // Thời gian thay lõi

    @Column(name = "dimension_weight", columnDefinition = "TEXT")
    private String dimensionWeight;                        // Kích thước & khối lượng

    @Column(name = "brand_origin", length = 100)
    private String brandOrigin;                            // Xuất xứ thương hiệu

    @Column(name = "manufacture_origin", length = 100)
    private String manufactureOrigin;                      // Nơi sản xuất

    @Column(length = 100)
    private String manufacturer;                           // Tên hãng sản xuất

    @Column(name = "release_year")
    private Integer releaseYear;                           // Năm ra mắt

    @CreationTimestamp
    private LocalDateTime createdAt;
}
