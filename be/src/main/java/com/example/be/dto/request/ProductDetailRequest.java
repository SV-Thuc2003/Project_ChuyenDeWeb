package com.example.be.dto.request;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class ProductDetailRequest {
    private Integer capacityLPerHour;
    private String technology;
    private String powerConsumption;
    private String dimensions;
    private String material;
    private BigDecimal weightKg;
    private String additionalInfo;
}
