package com.example.be.entity;

import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;

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


    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String brand;


    @Column(columnDefinition = "TEXT")
    private String feature;

    private int stock;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();


    @Enumerated(EnumType.STRING)
    @Column(name = "product_type")
    private ProductType productType;

//    @ManyToMany
//    @JoinTable(name = "category_mapping",
//    joinColumns = @JoinColumn(name = "product_id"),
//    inverseJoinColumns = @JoinColumn(name = "category_id"))
//    private Set<Category> categories = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "category_mapping",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private WaterPurifierDetail waterPurifierDetail;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private FilterCartridgeDetail filterCartridgeDetail;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private NonElectricPurifierDetail nonElectricPurifierDetail;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private PrefilterHousingDetail prefilterHousingDetail;

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
