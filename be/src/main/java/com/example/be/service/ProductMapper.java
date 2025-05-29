//package com.example.be.service;
//
//import com.example.be.dto.request.ProductDetailRequest;
//import com.example.be.dto.request.ProductRequest;
//import com.example.be.dto.response.ProductDetailResponse;
//import com.example.be.dto.response.ProductResponse;
//import com.example.be.entity.Category;
//import com.example.be.entity.Product;
//import com.example.be.entity.ProductDetail;
//import com.example.be.entity.ProductImage;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//
//import java.util.List;
//import java.util.Set;
//
//@Mapper(componentModel = "spring")
//public interface ProductMapper {
////    mapping cơ bản8
//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "categories", ignore = true) //xử lý riêng
//    @Mapping(target = "images", ignore = true) // xử lý riêng
//    @Mapping(target = "productDetail", ignore = true)
//    Product toEntity(ProductRequest request);
//
//    @Mapping(target = "categories", expression = "java(mapCategoryNames(product.getCategories()))")
//    @Mapping(target = "imageUrls", expression = "java(mapImageUrls(product.getImages()))")
//    ProductResponse toResponse(Product product);
//
//    ProductDetail toDetailEntity(ProductDetailRequest request);
//    ProductDetailResponse toDetailResponse(ProductDetail entity);
//
////    Helper methods
//    default List<String> mapCategoryNames(Set<Category> categories){
//        if (categories == null) return null;
//        return categories.stream().map(Category::getName).toList();
//    }
//
//    default List<String> mapImageUrls(List<ProductImage> images){
//        if (images == null) return null;
//        return images.stream().map(ProductImage::getImageUrl).toList();
//    }
//}
//
