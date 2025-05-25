package com.example.be.exception;

import com.example.be.enums.exception.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppException extends RuntimeException {
    private ErrorCode errorCode;
}

