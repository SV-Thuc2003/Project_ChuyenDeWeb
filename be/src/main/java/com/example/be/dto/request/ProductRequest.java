package com.example.be.dto.request;

import com.example.be.dto.request.detail.ProductDetailRequest;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private Integer brandId;               // Brand id thay vì String brand
    private String feature;
    private Integer stock;
    private ProductStatus status;
    private ProductType productType;
    private List<Integer> categoryIds;
    private ProductDetailRequest detail;  // Base class/interface cho các loại detail
    private List<String> imageUrls;
    private String thumbnailUrl;
    private Boolean isFeatured;
}

