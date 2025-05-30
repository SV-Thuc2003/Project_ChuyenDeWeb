package com.example.be.repository;

import com.example.be.entity.Product;
import com.example.be.enums.ProductStatus;
import com.example.be.enums.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    Page<Product> findByStatusAndNameContainingIgnoreCase(ProductStatus status, String keyword, Pageable pageable);

    Page<Product> findByStatusOrderByCreatedAtDesc(ProductStatus status, Pageable pageable);
    Page<Product> findByStatusOrderBySoldQuantityDesc(ProductStatus status, Pageable pageable);

    Page<Product> findByStatus(ProductStatus status, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.status = :status AND p.productType = :productType")
    Page<Product> findByStatusAndProductType(
            @Param("status") ProductStatus status,
            @Param("productType") ProductType productType,
            Pageable pageable
    );

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.id IN :categoryIds")
    Page<Product> findByCategoryIds(@Param("categoryIds") List<Integer> categoryIds, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE c.id IN :categoryIds AND p.productType = :productType")
    Page<Product> findByCategoryIdsAndProductType(@Param("categoryIds") List<Integer> categoryIds,
                                                  @Param("productType") ProductType productType,
                                                  Pageable pageable);
}
