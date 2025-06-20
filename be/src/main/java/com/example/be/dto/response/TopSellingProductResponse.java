package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopSellingProductResponse {
    private String name;
    private String imageUrl;
    private String category;
    private int totalSold;
}
