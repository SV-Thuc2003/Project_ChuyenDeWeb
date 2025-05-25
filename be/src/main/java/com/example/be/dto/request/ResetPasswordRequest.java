package com.example.be.dto.request;

import lombok.Data;

/**
 * Dữ liệu người dùng gửi khi đặt lại mật khẩu bằng OTP
 */
@Data
public class ResetPasswordRequest {
    private String email;         // Email người dùng
    private String otpCode;       // Mã OTP được gửi đến email
    private String newPassword;   // Mật khẩu mới muốn đặt
}
