package com.example.be.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShippingService {

    private final RestTemplate restTemplate;

    private static final String GHN_TOKEN = "68b20e88-40bb-11f0-a826-7e1a8402b405";
    private static final int FROM_DISTRICT_ID = 1450;

    public int calculateShippingFee(int toDistrictId, String toWardCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Token", GHN_TOKEN);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("service_type_id", 2);
        body.put("insurance_value", 0);
        body.put("from_district_id", FROM_DISTRICT_ID);
        body.put("to_district_id", toDistrictId);
        body.put("to_ward_code", toWardCode);
        body.put("height", 20);
        body.put("length", 20);
        body.put("width", 20);
        body.put("weight", 1000);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                entity,
                Map.class
        );

        Map<String, Object> resBody = response.getBody();
        if (resBody == null || !resBody.containsKey("data")) {
            throw new RuntimeException("GHN không trả về dữ liệu phí");
        }

        Map<String, Object> data = (Map<String, Object>) resBody.get("data");
        return (Integer) data.get("total");
    }
}
