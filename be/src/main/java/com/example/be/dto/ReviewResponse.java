package com.example.be.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {
    private Integer id;
    private String username;
    private int rating;
    private String comment;
    private String createdAt;
}
