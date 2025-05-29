package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaterPurifierDetailResponse implements ProductDetailResponse {
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
