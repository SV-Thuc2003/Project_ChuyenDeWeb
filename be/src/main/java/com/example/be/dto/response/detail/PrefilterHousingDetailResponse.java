package com.example.be.dto.response.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrefilterHousingDetailResponse implements ProductDetailResponse {
    private Integer filterQuantity;
    private String filterMaterial;
    private String housingMaterial;
    private Integer filterCapacityLitres;
    private String prefilterFunction;
    private String replacementCycle;
    private String dimensionWeight;
    private String brandOrigin;
    private String manufactureOrigin;
    private String manufacturer;
    private Integer releaseYear;
}
