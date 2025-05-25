package com.example.be.controller;


import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    //Create product
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest request){
        ProductResponse response = productService.createProduct(request);
        return ResponseEntity.ok(response);
    }

    // update
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Integer id, @RequestBody ProductRequest request){
        ProductResponse response = productService.updateProduct(id, request);
        return ResponseEntity.ok(response);
    }
    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable Integer id){
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer id){
        ProductResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }
    // Get all Product (pagination)
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(Pageable pageable){
        Page<ProductResponse> responsePage = productService.getAllProducts(pageable);
        return ResponseEntity.ok(responsePage);
    }
    // Search by keyword
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(@RequestParam String keyword, Pageable pageable){
        Page<ProductResponse> result = productService.searchProducts(keyword, pageable);
        return ResponseEntity.ok(result);
    }
    //filterProduct
    @GetMapping("/filter")
    public ResponseEntity<Page<ProductResponse>> filterProduct(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            Pageable pageable
            ){
        Page<ProductResponse> result = productService.filterProducts(categoryId, brand, minPrice, maxPrice, pageable);
        return ResponseEntity.ok(result);
    }
}

