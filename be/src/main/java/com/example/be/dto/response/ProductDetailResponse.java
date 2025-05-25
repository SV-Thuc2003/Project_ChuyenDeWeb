package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;


@Getter
@AllArgsConstructor
public class ProductDetailResponse {
    private Integer capacityLPerHour;
    private String technology;
    private String powerConsumption;
    private String dimensions;
    private String material;
    private BigDecimal weightKg;
    private String additionalInfo;
}
