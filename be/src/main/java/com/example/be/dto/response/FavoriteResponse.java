package com.example.be.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteResponse {
    private Integer userId;
    private Integer productId;
    private String productName;
    private String productImage;
    private String productSlug;
    private BigDecimal productPrice;
}
