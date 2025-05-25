package com.example.be.dto.request;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String currentPassword;
    private String newPassword;
}
