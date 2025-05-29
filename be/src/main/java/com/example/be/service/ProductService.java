package com.example.be.service;

import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.entity.*;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import com.example.be.mapper.*;
import com.example.be.mapper.detail.FilterCartridgeDetailMapper;
import com.example.be.mapper.detail.NonElectricPurifierDetailMapper;
import com.example.be.mapper.detail.PrefilterHousingDetailMapper;
import com.example.be.mapper.detail.WaterPurifierDetailMapper;
import com.example.be.repository.*;
import com.example.be.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    // inject các mappers chi tiết
    private final WaterPurifierDetailMapper waterMapper;
    private final FilterCartridgeDetailMapper filterMapper;
    private final NonElectricPurifierDetailMapper nonElectricMapper;
    private final PrefilterHousingDetailMapper prefilterMapper;

    @Transactional
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        );
    }
    @Transactional
    public Page<ProductResponse> getProductsByCategory(String slug, Pageable pageable) {
        Page<Product> productPage = productRepository.findByCategorySlug(slug, pageable);
        return productPage.map(product ->
                productMapper.toResponse(product, waterMapper, filterMapper, nonElectricMapper, prefilterMapper)
        );
    }
}

