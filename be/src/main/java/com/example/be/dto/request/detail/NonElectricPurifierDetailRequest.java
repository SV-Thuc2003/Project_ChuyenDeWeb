package com.example.be.dto.request.detail;

import lombok.Data;

@Data
public class NonElectricPurifierDetailRequest implements ProductDetailRequest {
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
    private Double weightKg;
    private String brandOrigin;
    private String manufactureOrigin;
    private Integer launchYear;
    private String warranty;
    private String additionalInfo;
}
