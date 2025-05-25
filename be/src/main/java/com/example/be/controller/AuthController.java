package com.example.be.controller;

import com.example.be.dto.request.*;
import com.example.be.dto.response.LoginResponse;
import com.example.be.entity.User;

import com.example.be.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody @Valid RegisterRequest request){
        return authService.register(request);
    }
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody OtpVerificationRequest request){
        return authService.verifyOtp(request);
    }

    @PostMapping("/resend-otp")
    public String resendOtp(@RequestParam String email){
        return authService.resendOtp(email);
    }

    /**
     * Login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        String response = authService.forgotPassword(email);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        String response = authService.resetPasswordWithOtp(request);
        return ResponseEntity.ok(response);
    }

//    @PutMapping("/profile")
//    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest request, @AuthenticationPrincipal UserPrincipal principal){
//        return ResponseEntity.ok(authService.updateProfile(principal.getId(), request));
//    }
//    @PutMapping("/change-password")
//    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request,
//                                                 @AuthenticationPrincipal UserPrincipal principal) {
//        return ResponseEntity.ok(authService.changePassword(principal.getId(), request));
//    }
}
