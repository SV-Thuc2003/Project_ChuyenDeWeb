package com.example.be.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private Integer productId;
    private Integer rating;
    private String comment;
}
