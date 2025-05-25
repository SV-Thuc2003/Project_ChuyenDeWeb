package com.example.be.dto;

import lombok.*;

//@Data
//@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String token;
}
