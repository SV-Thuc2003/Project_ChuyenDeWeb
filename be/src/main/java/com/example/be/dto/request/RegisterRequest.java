package com.example.be.dto.request;

import lombok.*;

import jakarta.validation.constraints.*;
//Dangky
@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "Username không được để trống")
    @Size(min = 3, message = "Username phải có ít nhất 3 ký tự")
    private String username;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 8, max = 30, message = "Mật khẩu phải từ 8 đến 30 ký tự")
    private String password;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(0\\d{9}|\\+84\\d{9,10})$", message = "Số điện thoại không hợp lệ")
    private String phone;

    private String name;
}

