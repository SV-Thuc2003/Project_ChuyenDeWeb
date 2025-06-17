package com.example.be.dto.request.detail;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class NonElectricPurifierDetailRequest implements ProductDetailRequest {
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
