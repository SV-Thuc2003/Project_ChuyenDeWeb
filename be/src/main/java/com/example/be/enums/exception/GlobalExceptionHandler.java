package com.example.be.enums.exception;

import com.example.be.dto.response.ErrorResponse;
import com.example.be.exception.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler(AppException.class)
//    public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
//        ErrorCode errorCode = ex.getErrorCode();
//        ErrorResponse response = new ErrorResponse(
//                errorCode.getCode(),
//                errorCode.getMessage(),
//                LocalDateTime.now()
//        );
//        return new ResponseEntity<>(response, errorCode.get)
//    }
}

