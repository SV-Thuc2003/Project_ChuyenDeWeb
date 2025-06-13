package com.example.be.specification;

import com.example.be.entity.Category;
import com.example.be.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> filterBy(List<Long> categoryIds, String brand, BigDecimal minPrice, BigDecimal maxPrice) {
        return (root, query, criteriaBuilder) -> {
            query.distinct(true); // tránh trùng sản phẩm khi join nhiều bảng
            List<Predicate> predicates = new ArrayList<>();

            if(categoryIds != null && !categoryIds.isEmpty()){
                Join<Product, Category> categoryJoin = root.join("categories");
                predicates.add(categoryJoin.get("id").in(categoryIds));
            }

            if (brand != null && !brand.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("brand"), brand));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
