package com.example.be.dto.request;

import lombok.*;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor
public class OtpVerificationRequest {
    private String email;
    private String otpCode;
}

