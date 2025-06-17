package com.example.be.service;

import com.example.be.dto.response.BrandResponse;
import com.example.be.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    public List<BrandResponse> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(b -> BrandResponse.builder()
                        .id(b.getId())
                        .name(b.getName())
                        .logoUrl(b.getLogoUrl())
                        .build())
                .collect(Collectors.toList());
    }
}
