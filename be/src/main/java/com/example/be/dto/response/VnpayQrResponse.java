package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VnpayQrResponse {
    private String qrUrl;
    private String txnRef;
    private int amount;
}
