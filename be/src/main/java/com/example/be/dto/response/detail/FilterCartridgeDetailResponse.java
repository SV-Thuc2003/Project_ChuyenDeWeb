package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterCartridgeDetailResponse implements ProductDetailResponse {
    private String usedFor;
    private String stageNumber;
    private String type;
    private String material;
    private String filterSizeMicron;
    private Integer lifespanMonths;
    private String functions;  // Tương ứng với filter_functions
    private String brandOrigin;
    private String manufactureOrigin;
    private String manufacturer;
    private String warranty;
    private String additionalInfo;
}

