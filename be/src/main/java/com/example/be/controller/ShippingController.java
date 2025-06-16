package com.example.be.controller;

import com.example.be.dto.request.ShippingFeeRequest;
import com.example.be.dto.response.ShippingFeeResponse;
import com.example.be.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/shipping")
@RequiredArgsConstructor
public class ShippingController {

    private final RestTemplate restTemplate;
    private final ShippingService shippingService; // ✅ Thêm dòng này

    @PostMapping("/fee")
    public ResponseEntity<ShippingFeeResponse> getFee(@RequestBody ShippingFeeRequest req) {
        int fee = shippingService.calculateShippingFee(
                Integer.parseInt(req.getDistrictId()),
                req.getWardCode()
        );
        return ResponseEntity.ok(new ShippingFeeResponse(fee));
    }

}

