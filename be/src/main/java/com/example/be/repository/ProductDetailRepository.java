package com.example.be.repository;

import com.example.be.dto.response.ProductDetailResponse;
import com.example.be.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
    Optional<ProductDetail> findByProductId(Long productId);
}

