package com.example.be.controller;

import com.example.be.dto.request.*;
import com.example.be.dto.response.LoginResponse;
import com.example.be.dto.response.UserProfileResponse;
import com.example.be.entity.User;

import com.example.be.service.AuthService;

import com.example.be.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

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

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileResponse> getProfile(@PathVariable Integer userId) {
        return ResponseEntity.ok(authService.getProfile(userId));
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<String> updateProfile(@PathVariable Integer userId,
                                                @Valid @RequestBody UpdateProfileRequest request) {
        String result = authService.updateProfile(userId, request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        String response = authService.forgotPassword(email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp-reset-password")
    public ResponseEntity<String> verifyOtpResetPassword(@RequestBody OtpVerificationRequest request) {
        String result = authService.verifyOtpForResetPassword(request);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        String response = authService.resetPasswordWithOtp(request);
        return ResponseEntity.ok(response);
    }

}
