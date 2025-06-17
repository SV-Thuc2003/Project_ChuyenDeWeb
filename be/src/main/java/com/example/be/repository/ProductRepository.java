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
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    Page<Product> findByStatusAndNameContainingIgnoreCase(ProductStatus status, String keyword, Pageable pageable);

    // Lấy sản phẩm mới nhất (trạng thái ACTIVE, sắp xếp theo createdAt)
    Page<Product> findByStatusOrderByCreatedAtDesc(ProductStatus status, Pageable pageable);
    // Lấy sản phẩm nổi bật (featured) theo trạng thái
    Page<Product> findByIsFeaturedTrueAndStatus(ProductStatus status, Pageable pageable);

    Optional<Product> findByIdAndStatus(Integer id, ProductStatus status);


    Page<Product> findByStatus(ProductStatus status, Pageable pageable);

    @Query(value = """
    SELECT * FROM product 
    WHERE status = 'AVAILABLE'
    ORDER BY 
        CASE 
            WHEN product_type = 'MAY_LOC_NUOC' THEN 0 
            ELSE 1 
        END,
        created_at DESC
    LIMIT :limit
    """, nativeQuery = true)
    List<Product> findNewestProductsPrioritizeWaterFilter(@Param("limit") int limit);


    // Tìm giá nhỏ nhất theo categoryId
    @Query("SELECT MIN(p.price) FROM Product p JOIN p.categories c WHERE c.id = :categoryId AND p.status = :status")
    BigDecimal findMinPriceByCategoryId(@Param("categoryId") Integer categoryId,
                                        @Param("status") ProductStatus status);

    // Tìm giá lớn nhất theo categoryId
    @Query("SELECT MAX(p.price) FROM Product p JOIN p.categories c WHERE c.id = :categoryId AND p.status = :status")
    BigDecimal findMaxPriceByCategoryId(@Param("categoryId") Integer categoryId,
                                        @Param("status") ProductStatus status);

    @Query("SELECT p FROM Product p WHERE p.status = :status AND p.productType = :productType")
    Page<Product> findByStatusAndProductType(
            @Param("status") ProductStatus status,
            @Param("productType") ProductType productType,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.id = :categoryId")
    Page<Product> findByCategoryId(@Param("categoryId") Integer categoryId, Pageable pageable);

    // Hoặc thêm điều kiện trạng thái nếu muốn
    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.id = :categoryId AND p.status = :status")
    Page<Product> findByCategoryIdAndStatus(@Param("categoryId") Integer categoryId,
                                            @Param("status") ProductStatus status,
                                            Pageable pageable);
}
