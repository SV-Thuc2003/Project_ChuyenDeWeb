package com.example.be.controller;

import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;


    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<ProductResponse> products;

        if (category != null && !category.isEmpty()) {
            products = productService.getProductsByCategory(category, pageable);
        } else {
            products = productService.getAllProducts(pageable);
        }

        return ResponseEntity.ok(products);
    }

}

