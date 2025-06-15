package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private Integer userId; // 👈 Thêm dòng này
}

