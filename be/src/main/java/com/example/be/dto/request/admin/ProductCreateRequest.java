package com.example.be.dto.request.admin;

import com.example.be.enums.ProductStatus;
import jakarta.validation.constraints.*;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class ProductCreateRequest {
    @NotBlank
    private String name;
    private String description;
    @NotNull
    @DecimalMin("0.0") private BigDecimal price;
    @NotNull @Min(0) private Integer stock;
    private String imageUrl;
    private ProductStatus status;
    private Set<Integer> categoryIds;
    private Integer brandId; // nếu có brand
}