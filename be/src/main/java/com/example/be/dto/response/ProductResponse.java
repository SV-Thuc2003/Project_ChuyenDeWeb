package com.example.be.dto.response;

import com.example.be.dto.response.detail.ProductDetailResponse;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private String brand;                   // Brand name
    private String feature;
    private Integer stock;
    private ProductStatus status;
    private ProductType productType;
    private List<String> categories;
    private List<String> imageUrls;
    private String thumbnailUrl;
    private ProductDetailResponse detail;
}

