package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterCartridgeDetailResponse implements ProductDetailResponse {
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
