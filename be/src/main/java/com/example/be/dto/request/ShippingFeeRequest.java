package com.example.be.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
    public class ShippingFeeRequest {
        private String provinceId;
        private String districtId;
        private String wardCode;
        private String address; // số nhà, tên đường
    }


