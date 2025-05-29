package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrefilterHousingDetailResponse implements ProductDetailResponse {
    private String cupCount;
    private String filterMaterials;
    private String housingMaterial;
    private String filterCapacity;
    private String functions;
    private String filterLifespan;
    private Integer filtrationStages;
    private Integer filterCount;
    private String technology;
    private String workingPressureMpa;
    private Double flowRateLPerMin;
    private Integer capacityLPerHour;
    private String features;
    private String dimensions;
    private BigDecimal weightKg;
    private String brandOrigin;
    private String manufactureOrigin;
    private Integer launchYear;
    private String warranty;
    private String additionalInfo;
}
