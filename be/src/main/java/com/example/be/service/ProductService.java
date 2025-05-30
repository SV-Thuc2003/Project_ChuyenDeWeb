package com.example.be.service;

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
        Page<Product> products = productRepository.findByStatusOrderBySoldQuantityDesc(ProductStatus.AVAILABLE, pageable);
        return products.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        ).getContent();
    }
    /**
     * Lấy tất cả sản phẩm có phân trang
     */
    @Transactional
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByStatus(ProductStatus.AVAILABLE, pageable);
        return mapToResponsePage(products);
    }

    /**
     * Lấy sản phẩm theo danh mục (slug) và tất cả danh mục con
     */
    @Transactional
    public Page<ProductResponse> getProductsByCategorySlug(String slug, Pageable pageable) {
        Set<Integer> categoryIds = getCategoryIdsIncludingChildren(slug);
        if (categoryIds.isEmpty()) {
            return Page.empty(pageable);
        }
        Page<Product> products = productRepository.findByCategoryIds(new ArrayList<>(categoryIds), pageable);
        return mapToResponsePage(products);
    }

    /**
     * Lấy sản phẩm theo danh mục và loại sản phẩm (productType)
     */
    @Transactional
    public Page<ProductResponse> getProductsByCategoryAndType(String slug, String productTypeStr, Pageable pageable) {
        Set<Integer> categoryIds = getCategoryIdsIncludingChildren(slug);
        if (categoryIds.isEmpty()) {
            return Page.empty(pageable);
        }

        ProductType productType = parseProductType(productTypeStr);
        Page<Product> products = productRepository.findByCategoryIdsAndProductType(new ArrayList<>(categoryIds), productType, pageable);
        return mapToResponsePage(products);
    }

    /**
     * Lấy sản phẩm theo trạng thái + tên chứa keyword
     */
    @Transactional
    public Page<ProductResponse> getProductsByStatusAndKeyword(ProductStatus status, String keyword, Pageable pageable) {
        Page<Product> products = productRepository.findByStatusAndNameContainingIgnoreCase(status, keyword, pageable);
        return mapToResponsePage(products);
    }

    /**
     * Lấy sản phẩm theo trạng thái và loại sản phẩm
     */
    @Transactional
    public Page<ProductResponse> getProductsByStatusAndType(ProductStatus status, String productTypeStr, Pageable pageable) {
        ProductType productType = parseProductType(productTypeStr);
        Page<Product> products = productRepository.findByStatusAndProductType(status, productType, pageable);
        return mapToResponsePage(products);
    }

    // ----- PRIVATE HELPER METHODS -----

    private Set<Integer> getCategoryIdsIncludingChildren(String slug) {
        Optional<Category> categoryOpt = categoryRepository.findBySlug(slug);
        if (categoryOpt.isEmpty()) {
            return Collections.emptySet();
        }
        Set<Integer> categoryIds = new HashSet<>();
        Category root = categoryOpt.get();
        categoryIds.add(root.getId());
        collectChildCategoryIds(root, categoryIds);
        return categoryIds;
    }

    private void collectChildCategoryIds(Category parent, Set<Integer> categoryIds) {
        List<Category> children = categoryRepository.findByParentId(parent.getId());
        for (Category child : children) {
            categoryIds.add(child.getId());
            collectChildCategoryIds(child, categoryIds);
        }
    }

    private ProductType parseProductType(String productTypeStr) {
        if (productTypeStr == null || productTypeStr.isBlank()) {
            return null;
        }
        try {
            return ProductType.valueOf(productTypeStr.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid productType: " + productTypeStr);
        }
    }

    private Page<ProductResponse> mapToResponsePage(Page<Product> productPage) {
        return productPage.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        );
    }

}

