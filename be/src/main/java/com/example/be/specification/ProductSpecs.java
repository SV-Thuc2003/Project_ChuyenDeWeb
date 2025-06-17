package com.example.be.specification;

import com.example.be.dto.request.ProductFilterRequest;
import com.example.be.entity.Brand;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.enums.ProductStatus;
import org.apache.commons.lang3.tuple.Pair;
import com.example.be.entity.ProductFilterValue;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.List;

public class ProductSpecs {
    public static Specification<Product> categorySlug(String slug) {
        return (root, query, criteriaBuilder) -> {
            if (slug == null || slug.isEmpty()) return null;
            Join<Product, Category> categories = root.join("categories", JoinType.LEFT);
            return criteriaBuilder.equal(categories.get("slug"), slug);
        };
    }

    public static Specification<Product> categoryId(Integer categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) return null;
            Join<Product, Category> categories = root.join("categories", JoinType.LEFT);
            return cb.equal(categories.get("id"), categoryId);
        };
    }

    public static Specification<Product> brandIds(List<Integer> brandIds) {
        return (root, query, cb) -> {
            if (brandIds == null || brandIds.isEmpty()) return null;
            return root.get("brand").get("id").in(brandIds);
        };
    }
    public static Specification<Product> priceBetween(BigDecimal min, BigDecimal max) {
        return (root, query, cb) -> {
            if (min != null && max != null)
                return cb.between(root.get("price"), min, max);
            if (min != null)
                return cb.greaterThanOrEqualTo(root.get("price"), min);
            if (max != null)
                return cb.lessThanOrEqualTo(root.get("price"), max);
            return null;
        };
    }
    public static Specification<Product> hasFilterPairs(List<ProductFilterRequest.FilterPair> filterPairs) {
        return (root, query, cb) -> {
            if (filterPairs == null || filterPairs.isEmpty()) return null;

            Predicate[] existsPredicates = filterPairs.stream().map(pair -> {
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<ProductFilterValue> subRoot = subquery.from(ProductFilterValue.class);
                subquery.select(cb.literal(1L))
                        .where(
                                cb.equal(subRoot.get("product").get("id"), root.get("id")),
                                cb.equal(subRoot.get("filter").get("id"), pair.getFilterId()),
                                cb.equal(subRoot.get("value"), pair.getValue())
                        );
                return cb.exists(subquery);
            }).toArray(Predicate[]::new);

            return cb.and(existsPredicates);
        };
    }

    // tìm kiếm sản phẩm
    public static Specification<Product> status(ProductStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Product> nameOrDescriptionOrBrandContains(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) return null;

            String likeKeyword = "%" + keyword.toLowerCase() + "%";

            // Join brand
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.LEFT);

            return cb.or(
                    cb.like(cb.lower(root.get("name")), likeKeyword),
                    cb.like(cb.lower(root.get("description")), likeKeyword),
                    cb.like(cb.lower(brandJoin.get("name")), likeKeyword)
            );
        };
    }


//    public static Specification<Product> nameOrDescriptionContains(String keyword) {
//        return (root, query, cb) -> {
//            if (keyword == null || keyword.trim().isEmpty()) return null;
//
////            String normalized = removeDiacritics(keyword).toLowerCase();
////            Expression<String> nameField = cb.lower(cb.function("unaccent", String.class, root.get("name")));
////            Expression<String> descriptionField = cb.lower(cb.function("unaccent", String.class, root.get("description")));
//
//            String likeKeyword = "%" + keyword.toLowerCase() + "%";
//            return cb.or(
//                    cb.like(cb.lower(root.get("name")), likeKeyword),
//                    cb.like(cb.lower(root.get("description")), likeKeyword)
//            );
//        };
//    }

}
