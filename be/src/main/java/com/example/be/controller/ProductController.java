package com.example.be.controller;

import com.example.be.dto.request.ProductFilterRequest;
import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.lang3.tuple.Pair;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest request) {
        ProductResponse response = productService.createProduct(request);
        return ResponseEntity.ok(response);
    }


    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductResponse> products = productService.getAllProducts(pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/new")
    public ResponseEntity<List<ProductResponse>> getNewProducts() {
        List<ProductResponse> products = productService.getNewProducts(8); // lấy 8 sản phẩm
        return ResponseEntity.ok(products);
    }

    @GetMapping("/best-selling")
    public ResponseEntity<List<ProductResponse>> getBestSellingProducts() {
        List<ProductResponse> products = productService.getBestSellingProducts(8);
        return ResponseEntity.ok(products);
    }
    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(
            @PathVariable Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductResponse> response = productService.getProductsByCategory(categoryId, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer id) {
        ProductResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sorted")
    public ResponseEntity<Page<ProductResponse>> getSortedProducts(
            @RequestParam(defaultValue = "newest") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Page<ProductResponse> products = productService.getSortedProducts(sortBy, page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/price-range/{categoryId}")
    public ResponseEntity<Map<String, BigDecimal>> getPriceRangeByCategory(@PathVariable Integer categoryId) {
        Pair<BigDecimal, BigDecimal> range = productService.getPriceRangeByCategory(categoryId);

        Map<String, BigDecimal> response = new HashMap<>();
        response.put("minPrice", range.getLeft());
        response.put("maxPrice", range.getRight());

        return ResponseEntity.ok(response);
    }

    // lọc sản phẩm
    @PostMapping("/filter")
    public ResponseEntity<Page<ProductResponse>> filterProducts(@RequestBody ProductFilterRequest request) {
        Page<ProductResponse> products = productService.filterProducts(request);
        return ResponseEntity.ok(products);
    }
    // tìm kiếm sản phẩm
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam String keyword,
//            @RequestParam(defaultValue = "vi") String lang,   // vi, en, ja…
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ProductResponse> result = productService.searchProducts(keyword, page, size);
        return ResponseEntity.ok(result);
    }

//    @GetMapping("/api/test")
//    public ResponseEntity<String> testLocale(Locale locale) {
//        String message = messageSource.getMessage("product.not_found", null, locale);
//        return ResponseEntity.ok(message);
//    }

}