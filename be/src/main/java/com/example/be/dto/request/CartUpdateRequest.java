package com.example.be.dto.request;

import lombok.Data;

@Data
public class CartUpdateRequest {
    private Integer id;
    private Integer productId;
    private Integer quantity;
}
