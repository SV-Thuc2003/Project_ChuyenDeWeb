package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NonElectricPurifierDetailResponse implements ProductDetailResponse {
    private String productType;
    private String technology;
    private String functions;
    private Integer filtrationStages;
    private Integer filterLevels;
    private Integer filterLifespanMonths;
    private String workingPressureMpa;
    private BigDecimal flowRateLPerMin;
    private Integer capacityLPerHour;
    private String material;
    private String features;
    private String dimensionWeight;
    private String brandOrigin;
    private String manufactureOrigin;
    private String manufacturer;
    private Integer launchYear;
}
