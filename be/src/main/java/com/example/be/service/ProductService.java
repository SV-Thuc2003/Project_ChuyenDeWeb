package com.example.be.service;

import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import com.example.be.mapper.ProductMapper;
import com.example.be.mapper.detail.FilterCartridgeDetailMapper;
import com.example.be.mapper.detail.NonElectricPurifierDetailMapper;
import com.example.be.mapper.detail.PrefilterHousingDetailMapper;
import com.example.be.mapper.detail.WaterPurifierDetailMapper;
import com.example.be.repository.CategoryRepository;
import com.example.be.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    // inject các mappers chi tiết
    private final WaterPurifierDetailMapper waterMapper;
    private final FilterCartridgeDetailMapper filterMapper;
    private final NonElectricPurifierDetailMapper nonElectricMapper;
    private final PrefilterHousingDetailMapper prefilterMapper;

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        // Chuyển đổi từ DTO sang entity Product
        Product product = productMapper.toEntity(request);

        Set<Category> categories = new HashSet<>();

        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            // Dùng repository lấy danh sách category cùng parent (custom query để fetch parent)
            List<Category> existingCategories = categoryRepository.findAllByIdWithParent(request.getCategoryIds());

            System.out.println(">> Category IDs from request: " + request.getCategoryIds());
            System.out.println(">> Categories found in DB: " + existingCategories.stream().map(Category::getId).toList());

            for (Category category : existingCategories) {
                Category current = category;
                while (current != null) {
                    categories.add(current);
                    current = current.getParent();
                }
            }
        }

        // Set danh sách categories cho product
        product.setCategories(categories);

        // Đảm bảo cập nhật ngược lại để Hibernate quản lý quan hệ 2 chiều
        for (Category category : categories) {
            category.getProducts().add(product);
        }

        // Debug log
        System.out.println("Categories set for product:");
        categories.forEach(cat -> System.out.println("Category ID: " + cat.getId() + ", Name: " + cat.getName()));

        // Lưu product, cascade sẽ tự động xử lý liên kết
        Product savedProduct = productRepository.save(product);

        return productMapper.toResponse(savedProduct, waterMapper, filterMapper, nonElectricMapper, prefilterMapper);
    }

    @Transactional
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByStatusOrderByCreatedAtDesc(ProductStatus.AVAILABLE, pageable);
        return products.map(product -> productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper));
    }

    @Transactional
    public List<ProductResponse> getNewProducts(int limit) {
        Pageable pageable = Pageable.ofSize(limit);
        Page<Product> products = productRepository.findByStatusOrderByCreatedAtDesc(ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        ).getContent();
    }

    @Transactional
    public List<ProductResponse> getBestSellingProducts(int limit) {
        Pageable pageable = Pageable.ofSize(limit);
        Page<Product> products = productRepository.findByIsFeaturedTrueAndStatus(ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        ).getContent();
    }

    @Transactional
    public Page<ProductResponse> getProductsByCategory(Integer categoryId, Pageable pageable) {
        Page<Product> products = productRepository.findByCategoryIdAndStatus(categoryId, ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        );
    }

    @Transactional
    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findByIdAndStatus(id, ProductStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));

        return productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper);
    }
}