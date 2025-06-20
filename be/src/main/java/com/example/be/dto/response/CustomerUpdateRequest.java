package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerUpdateRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
}
