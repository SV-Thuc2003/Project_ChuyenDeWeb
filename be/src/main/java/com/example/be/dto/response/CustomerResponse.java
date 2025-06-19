package com.example.be.dto.response;

import com.example.be.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerResponse {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private Status status;
}
