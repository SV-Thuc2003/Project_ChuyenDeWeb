package com.example.be.mapper;

import com.example.be.dto.request.admin.ProductCreateRequest;
import com.example.be.dto.request.admin.ProductUpdateRequest;
import com.example.be.dto.response.ProductResponse;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.entity.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface ProductAdminMapper {
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "categories", target = "categories", qualifiedByName = "mapCategories")
    @Mapping(source = "images", target = "imageUrls", qualifiedByName = "mapImageUrls")
    @Mapping(source = "images", target = "thumbnailUrl", qualifiedByName = "mapThumbnailUrl")
    ProductResponse toResponse(Product product);

    @Named("mapCategories")
    default List<String> mapCategories(Set<Category> categories) {
        if (categories == null) return List.of();
        return categories.stream().map(Category::getName).toList();
    }

    @Named("mapImageUrls")
    default List<String> mapImageUrls(List<ProductImage> images) {
        if (images == null) return List.of();
        return images.stream().map(ProductImage::getImageUrl).toList();
    }

    @Named("mapThumbnailUrl")
    default String mapThumbnailUrl(List<ProductImage> images) {
        if (images == null || images.isEmpty()) return null;
        return images.get(0).getImageUrl();
    }
}
