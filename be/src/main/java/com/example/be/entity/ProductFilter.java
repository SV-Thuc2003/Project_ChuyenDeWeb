package com.example.be.entity;

import com.example.be.enums.FilterType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_filters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "filter_name", nullable = false, length = 100)
    private String filterName;

    @Enumerated(EnumType.STRING)
    private FilterType filterType;
}
