package com.example.be.enums.exception;

import com.example.be.enums.exception.ErrorCode;
import com.example.be.exception.AppException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
        ErrorCode error = ex.getErrorCode();
        return ResponseEntity
                .status(error.getHttpStatusCode())
                .body(new ErrorResponse(error.name(), error.getMessage(), error.getCode()));
    }

    @Data
    @AllArgsConstructor
    public static class ErrorResponse {
        private String error;
        private String message;
        private int code;
    }
}
