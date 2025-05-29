package com.example.be.enums.exception;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    USER_NOT_FOUND(1001, "Tài khoản không tồn tại", HttpStatus.NOT_FOUND),
    INVALID_PASSWORD(1002, "Sai mật khẩu", HttpStatus.BAD_REQUEST),
    USER_NOT_VERIFIED(1003, "Tài khoản chưa xác minh OTP", HttpStatus.UNAUTHORIZED),
    USER_BANNED(1004, "Tài khoản đã bị khóa", HttpStatus.FORBIDDEN),
    EMAIL_NOT_FOUND(1005, "Email không tồn tại", HttpStatus.NOT_FOUND),
    INVALID_OTP(1006, "Mã OTP không chính xác", HttpStatus.BAD_REQUEST),
    OTP_EXPIRED(1007, "Mã OTP đã hết hạn", HttpStatus.BAD_REQUEST),
    ACCOUNT_ALREADY_VERIFIED(1011, "Tài khoản đã được xác thực", HttpStatus.BAD_REQUEST),

    USERNAME_ALREADY_EXISTS(1008, "Tên người dùng đã tồn tại", HttpStatus.CONFLICT),
    EMAIL_ALREADY_EXISTS(1009, "Email đã được đăng ký", HttpStatus.CONFLICT),
    ROLE_NOT_FOUND(1010, "Không tìm thấy vai trò (role)", HttpStatus.NOT_FOUND);

    int code;
    String message;
    HttpStatusCode httpStatusCode;
}

