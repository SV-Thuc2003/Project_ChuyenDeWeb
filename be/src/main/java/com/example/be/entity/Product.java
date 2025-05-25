package com.example.be.entity;
import com.example.be.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name ="products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String slug;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false)
    private BigDecimal price;
    private String brand;
    @Column(columnDefinition = "TEXT")
    private String feature;
    @Column(nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.AVAILABLE;

    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now();
    @UpdateTimestamp
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToMany
    @JoinTable(name = "category_mapping",
    joinColumns = @JoinColumn(name = "product_id"),
    inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private ProductDetail productDetail;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();
}
