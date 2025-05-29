package com.example.be.mapper.detail;

import com.example.be.dto.response.detail.FilterCartridgeDetailResponse;
import com.example.be.entity.FilterCartridgeDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FilterCartridgeDetailMapper {
    FilterCartridgeDetailResponse toResponse(FilterCartridgeDetail detail);
}
