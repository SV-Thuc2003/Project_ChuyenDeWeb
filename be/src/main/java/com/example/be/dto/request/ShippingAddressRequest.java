package com.example.be.dto.request;

import lombok.Data;

@Data
public class ShippingAddressRequest {
    private String address;
    private String ward;
    private String wardCode;
    private String district;
    private String districtId;
    private String city;
    private String provinceId;
}
