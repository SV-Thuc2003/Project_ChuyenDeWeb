package com.example.be.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrandResponse {
    private Integer id;
    private String name;
    private String logoUrl;
}
