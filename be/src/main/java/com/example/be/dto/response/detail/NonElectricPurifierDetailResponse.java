package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NonElectricPurifierDetailResponse implements ProductDetailResponse {
    private Integer filtrationStages;
    private Integer filterLevels;
    private Integer filterLifespanMonths;
    private String technology;
    private String functions;
    private String workingPressureMpa;
    private Double flowRateLPerMin;
    private String tankCapacity;
    private Integer capacityLPerHour;
    private String features;
    private String material;
    private String dimensions;
    private BigDecimal weightKg;
    private String brandOrigin;
    private String manufactureOrigin;
    private Integer launchYear;
    private String warranty;
    private String additionalInfo;
}
