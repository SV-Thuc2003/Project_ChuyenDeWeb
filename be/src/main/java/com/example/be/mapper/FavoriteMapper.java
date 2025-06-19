package com.example.be.mapper;


import com.example.be.dto.response.FavoriteResponse;
import com.example.be.entity.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productSlug", source = "product.slug")
    @Mapping(target = "productPrice", source = "product.price")
    @Mapping(target = "productImage", expression = "java(favorite.getProduct().getImages().isEmpty() ? null : favorite.getProduct().getImages().get(0).getImageUrl())")
    FavoriteResponse toDto(Favorite favorite);
}
