package com.example.be.dto;

import lombok.*;

import jakarta.validation.constraints.*;
//Dangky
@Data
public class RegisterRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String name;
    @Email
    private String email;

    private String phone;
    private String address;
    private String avatar;

}