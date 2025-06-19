package com.example.be.mapper;

import com.example.be.dto.request.ProductRequest;
import com.example.be.dto.response.detail.ProductDetailResponse;
import com.example.be.dto.response.ProductResponse;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.entity.ProductImage;
import com.example.be.enums.ProductType;
import com.example.be.mapper.detail.FilterCartridgeDetailMapper;
import com.example.be.mapper.detail.NonElectricPurifierDetailMapper;
import com.example.be.mapper.detail.PrefilterHousingDetailMapper;
import com.example.be.mapper.detail.WaterPurifierDetailMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.Context;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "categories", target = "categories", qualifiedByName = "mapCategories")
    @Mapping(source = "images", target = "imageUrls", qualifiedByName = "mapImageUrls")
    @Mapping(source = "images", target = "thumbnailUrl", qualifiedByName = "mapThumbnailUrl")
    @Mapping(source = ".", target = "detail", qualifiedByName = "mapProductDetail")
    ProductResponse toResponse(
            Product product,
            @Context WaterPurifierDetailMapper waterMapper,
            @Context FilterCartridgeDetailMapper filterMapper,
            @Context NonElectricPurifierDetailMapper nonElectricMapper,
            @Context PrefilterHousingDetailMapper prefilterMapper
    );

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "name", target = "name")
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "waterPurifierDetail", ignore = true)
    @Mapping(target = "filterCartridgeDetail", ignore = true)
    @Mapping(target = "nonElectricPurifierDetail", ignore = true)
    @Mapping(target = "prefilterHousingDetail", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "stock", ignore = true)
    Product toEntity(ProductRequest request);

    @Named("mapCategories")
    default List<String> mapCategories(Set<Category> categories) {
        if (categories == null) return List.of();
        return categories.stream()
                .map(Category::getName)
                .collect(Collectors.toList());
    }

    @Named("mapImageUrls")
    default List<String> mapImageUrls(List<ProductImage> images) {
        if (images == null) return List.of();
        return images.stream()
                .map(ProductImage::getImageUrl)
                .collect(Collectors.toList());
    }

    @Named("mapThumbnailUrl")
    default String mapThumbnailUrl(List<ProductImage> images) {
        if (images == null || images.isEmpty()) return null;
        return images.get(0).getImageUrl();
    }

    @Named("mapProductDetail")
    default ProductDetailResponse mapProductDetail(
            Product product,
            @Context WaterPurifierDetailMapper waterMapper,
            @Context FilterCartridgeDetailMapper filterMapper,
            @Context NonElectricPurifierDetailMapper nonElectricMapper,
            @Context PrefilterHousingDetailMapper prefilterMapper
    ) {
        if (product == null || product.getProductType() == null) return null;

        if (product.getProductType() == ProductType.WATER_PURIFIER) {
            return waterMapper.toResponse(product.getWaterPurifierDetail());
        } else if (product.getProductType() == ProductType.FILTER_CARTRIDGE) {
            return filterMapper.toResponse(product.getFilterCartridgeDetail());
        } else if (product.getProductType() == ProductType.NON_ELECTRIC_PURIFIER) {
            return nonElectricMapper.toResponse(product.getNonElectricPurifierDetail());
        } else if (product.getProductType() == ProductType.PREFILTER_HOUSING) {
            return prefilterMapper.toResponse(product.getPrefilterHousingDetail());
        } else {
            return null;
        }
    }

}
