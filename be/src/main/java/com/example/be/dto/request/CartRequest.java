package com.example.be.dto.request;

import lombok.Data;
@Data
public class CartRequest {
    private Integer productId;
    private Integer quantity;
}
