package com.example.be.dto.request.detail;

import lombok.Data;

@Data
public class PrefilterHousingDetailRequest implements ProductDetailRequest {
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
