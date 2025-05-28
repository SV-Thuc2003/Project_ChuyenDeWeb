package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal price;

    private String brand;

    @Column(columnDefinition = "TEXT")
    private String feature;

    private int stock;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ProductStatus {
        AVAILABLE,
        OUT_OF_STOCK,
        DISCONTINUED
    }
}
