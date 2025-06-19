package com.example.be.dto.response;

import java.time.LocalDateTime;

public record ReviewResponse(
        Integer id,
        String user,
        Integer rating,
        String comment,
        LocalDateTime createdAt
) {}

