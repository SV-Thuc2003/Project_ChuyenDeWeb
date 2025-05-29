package com.example.be.dto.request.detail;

import lombok.Data;

@Data
public class FilterCartridgeDetailRequest implements ProductDetailRequest {
    private Integer stageNumber;
    private String type;
    private String material;
    private String filterSizeMicron;
    private Integer lifespanLiters;
    private Integer lifespanMonths;
    private String functions;
    private String brandOrigin;
    private String manufactureOrigin;
    private String warranty;
    private String additionalInfo;
}
