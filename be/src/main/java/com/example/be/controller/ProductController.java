package com.example.be.controller;

import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


//    @GetMapping
//    public ResponseEntity<Page<ProductResponse>> getAllProducts(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "12") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<ProductResponse> products = productService.getAllProducts(pageable);
//        return ResponseEntity.ok(products);
//    }

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
}

//    @GetMapping("/category/{slug}")
//    public ResponseEntity<List<Product>> getProductsByCategorySlug(@PathVariable String slug) {
//        List<Product> products = productService.getProductsByCategorySlug(slug);
//        if (products.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(products);
//    }


//    /**
//     * Lấy tất cả sản phẩm (mặc định là trạng thái AVAILABLE)
//     * Có phân trang
//     */
//    @GetMapping
//    public ResponseEntity<Page<ProductResponse>> getAllProducts(
//            @PageableDefault(size = 20) Pageable pageable
//    ) {
//        Page<ProductResponse> products = productService.getAllProducts(pageable);
//        return ResponseEntity.ok(products);
//    }
//
//    /**
//     * Lấy sản phẩm theo category slug (và danh mục con)
//     */
//    @GetMapping("/category/{slug}")
//    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(
//            @PathVariable String slug,
//            @PageableDefault(size = 20) Pageable pageable
//    ) {
//        Page<ProductResponse> products = productService.getProductsByCategorySlug(slug, pageable);
//        return ResponseEntity.ok(products);
//    }
//
//    /**
//     * Lấy sản phẩm theo category slug + productType
//     */
//    @GetMapping("/category/{slug}/type")
//    public ResponseEntity<Page<ProductResponse>> getProductsByCategoryAndType(
//            @PathVariable String slug,
//            @RequestParam(required = false) String productType,
//            @PageableDefault(size = 20) Pageable pageable
//    ) {
//        Page<ProductResponse> products = productService.getProductsByCategoryAndType(slug, productType, pageable);
//        return ResponseEntity.ok(products);
//    }
//
//    /**
//     * Tìm kiếm sản phẩm theo trạng thái và keyword tên sản phẩm
//     */
//    @GetMapping("/search")
//    public ResponseEntity<Page<ProductResponse>> searchProducts(
//            @RequestParam ProductStatus status,
//            @RequestParam String keyword,
//            @PageableDefault(size = 20) Pageable pageable
//    ) {
//        Page<ProductResponse> products = productService.getProductsByStatusAndKeyword(status, keyword, pageable);
//        return ResponseEntity.ok(products);
//    }
//
//    /**
//     * Lấy sản phẩm theo trạng thái và loại sản phẩm
//     */
//    @GetMapping("/filter")
//    public ResponseEntity<Page<ProductResponse>> filterProductsByStatusAndType(
//            @RequestParam ProductStatus status,
//            @RequestParam(required = false) String productType,
//            @PageableDefault(size = 20) Pageable pageable
//    ) {
//        Page<ProductResponse> products = productService.getProductsByStatusAndType(status, productType, pageable);
//        return ResponseEntity.ok(products);
//    }
