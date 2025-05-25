package com.example.be.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="product_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_thumbnail")
    private Boolean isThumbnail = false;

//    @ManyToMany
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}

