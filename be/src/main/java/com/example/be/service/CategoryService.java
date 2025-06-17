package com.example.be.service;

import com.example.be.dto.response.CategoryResponse;
import com.example.be.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> CategoryResponse.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .slug(c.getSlug())
                        .imageUrl(c.getImageUrl())
                        .parentId(c.getParent() != null ? c.getParent().getId() : null)
                        .build())
                .collect(Collectors.toList());
    }
}
