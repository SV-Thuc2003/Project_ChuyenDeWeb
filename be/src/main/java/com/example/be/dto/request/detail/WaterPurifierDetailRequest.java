package com.example.be.dto.request.detail;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class WaterPurifierDetailRequest implements ProductDetailRequest {
    private String modelName;
    private String type;
    private String hotColdSupport;
    private Integer filtrationStages;
    private String technology;
    private String tankCapacity;
    private String capacityLPerHour;
    private String powerConsumption;
    private String dimensions;
    private BigDecimal weightKg;
    private String voltage;
    private String origin;
    private String warranty;
    private String suitableUses;
    private String material;
    private String additionalInfo;
}
