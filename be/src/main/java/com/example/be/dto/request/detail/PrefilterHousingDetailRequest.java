package com.example.be.dto.request.detail;

import lombok.Data;

@Data
public class PrefilterHousingDetailRequest implements ProductDetailRequest {
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
    private Double weightKg;
    private String brandOrigin;
    private String manufactureOrigin;
    private Integer launchYear;
    private String warranty;
    private String additionalInfo;
}
