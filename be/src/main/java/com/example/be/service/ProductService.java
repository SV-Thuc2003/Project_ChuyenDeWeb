package com.example.be.service;

import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.entity.ProductDetail;
import com.example.be.entity.ProductImage;
import com.example.be.enums.ProductStatus;
import com.example.be.repository.CategoryRepository;
import com.example.be.repository.ProductDetailRepository;
import com.example.be.repository.ProductImageRepository;
import com.example.be.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ProductMapper productMapper;

    @Transactional
    public ProductResponse createProduct(ProductRequest request){
//        1 Map ProductRequest thành Product entity
        Product product = productMapper.toEntity(request);

        product.setStock(request.getStock()); // ⚠️ bắt buộc vì DB yêu cầu NOT NULL
        product.setStatus(request.getStatus() != null ? request.getStatus() : ProductStatus.AVAILABLE);

        // Gán category (kiểm tra từng id)
        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            Set<Category> categories = new HashSet<>(categoryRepository.findAllById(request.getCategoryIds()));
            product.setCategories(categories);
            System.out.println("Categories size: " + request.getCategoryIds().size());

        }
        // save product first to get id
//        product = productRepository.save(product);
        // Gán ProductDetail và set liên kết 2 chiều
        if (request.getDetail() != null){
            ProductDetail detail = productMapper.toDetailEntity(request.getDetail());
            detail.setProduct(product);
            product.setProductDetail(detail);
        }

        // Gán Images và set liên kết 2 chiều
        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()){
            List<ProductImage> images = new ArrayList<>();
            for (String s : request.getImageUrls()) {
                ProductImage img = new ProductImage();
                img.setImageUrl(s);
                img.setProduct(product);
                ProductImage apply = img;
                images.add(apply);
            }
//            productImageRepository.saveAll(images);
            product.setImages(images);
        }
        // Lưu product và cascade tự động lưu detail + images
        product = productRepository.save(product);
        return productMapper.toResponse(product);
    }
    @Transactional
    public ProductResponse updateProduct(Integer id, ProductRequest request){
        Product existing = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(request.getName());
        existing.setSlug(request.getSlug());
        existing.setDescription(request.getDescription());
        existing.setPrice(request.getPrice());
        existing.setBrand(request.getBrand());
        existing.setFeature(request.getFeature());
        existing.setStock(request.getStock());
        existing.setStatus(request.getStatus());
        existing.setUpdatedAt(java.time.LocalDateTime.now());
        if (request.getCategoryIds() != null){
            Set<Category> categories = new HashSet<>(categoryRepository.findAllById(request.getCategoryIds()));
            existing.setCategories(categories);
        }
        if (request.getDetail() != null){
            ProductDetail detail = existing.getProductDetail();
            if (detail == null) {
                detail = new ProductDetail();
                detail.setProduct(existing);
            }
            ProductDetail updatedDetail = productMapper.toDetailEntity(request.getDetail());
            updatedDetail.setId(detail.getId());
            updatedDetail.setProduct(existing);
            existing.setProductDetail(updatedDetail);
        }
        if (request.getImageUrls() != null ){
            existing.getImages().clear();
            List<ProductImage> newImages = request.getImageUrls().stream().map(url ->{
                ProductImage img = new ProductImage();
                img.setProduct(existing);
                img.setImageUrl(url);
                return img;
            }).toList();
            existing.getImages().addAll(newImages);
        }
        return productMapper.toResponse(productRepository.save(existing));
    }
    public void deleteProduct(Integer id){
        if (!productRepository.existsById(id)){
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
    public ProductResponse getProductById(Integer id){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return productMapper.toResponse(product);
    }
    public Page<ProductResponse> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable).map(productMapper::toResponse);
    }
    public Page<ProductResponse> searchProducts(String keyword, Pageable pageable){
        return productRepository.findByNameContainingIgnoreCase(keyword, pageable).map(productMapper::toResponse);
    }
    public Page<ProductResponse> filterProducts(Long categoryId, String brand, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable){

        return productRepository.filterProducts(categoryId, brand, minPrice, maxPrice, pageable).map(productMapper::toResponse);
    }
}

