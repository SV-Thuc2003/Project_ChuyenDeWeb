package com.example.be.dto.request;

import com.example.be.enums.ProductStatus;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private String brand;
    private String feature;
    private Integer stock;
    private ProductStatus status;
    private List<Integer> categoryIds;
    private ProductDetailRequest detail;
    private List<String> imageUrls;
    private String thumbnailUrl;
}

