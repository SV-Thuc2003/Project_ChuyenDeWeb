package com.example.be.mapper.detail;

import com.example.be.dto.response.detail.NonElectricPurifierDetailResponse;
import com.example.be.entity.NonElectricPurifierDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NonElectricPurifierDetailMapper {
    NonElectricPurifierDetailResponse toResponse(NonElectricPurifierDetail detail);
}
