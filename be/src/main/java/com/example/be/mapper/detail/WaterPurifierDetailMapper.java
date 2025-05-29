package com.example.be.mapper.detail;

import com.example.be.dto.request.detail.WaterPurifierDetailRequest;
import com.example.be.dto.response.detail.WaterPurifierDetailResponse;
import com.example.be.entity.WaterPurifierDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WaterPurifierDetailMapper {
    WaterPurifierDetailResponse toResponse(WaterPurifierDetail detail);
    WaterPurifierDetail toEntity(WaterPurifierDetailRequest request);
}
