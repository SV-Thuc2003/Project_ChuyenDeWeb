package com.example.be.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequest {
    private Integer userId;
    private Integer productId;
}
