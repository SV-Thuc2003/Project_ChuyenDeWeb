package com.example.be.dto.response;

import com.example.be.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private BigDecimal price;
    private String brand;
    private ProductStatus status;
    private List<String> categories;
    private List<String> imageUrls;
    private ProductDetailResponse detail;
}

