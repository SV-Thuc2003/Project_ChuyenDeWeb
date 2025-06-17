package com.example.be.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {
    private Integer id;
    private String name;
    private String slug;
    private String description;
    private String imageUrl;
    private Integer parentId; // Chỉ trả về id của parent

    private List<CategoryResponse> children; // Danh sách các danh mục con (nếu cần)
}