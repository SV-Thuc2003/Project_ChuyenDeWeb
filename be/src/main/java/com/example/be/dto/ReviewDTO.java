package com.example.be.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ReviewDTO {
    private Integer id;
    private String user;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
