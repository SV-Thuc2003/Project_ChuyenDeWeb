package com.example.be.mapper.detail;

import com.example.be.dto.response.detail.PrefilterHousingDetailResponse;
import com.example.be.entity.PrefilterHousingDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PrefilterHousingDetailMapper {
    PrefilterHousingDetailResponse toResponse(PrefilterHousingDetail detail);
}
