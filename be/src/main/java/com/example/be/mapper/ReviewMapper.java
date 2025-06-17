package com.example.be.mapper;

import com.example.be.dto.ReviewRequest;
import com.example.be.dto.ReviewResponse;
import com.example.be.entity.Review;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    // Entity → Response (hiển thị cho client)
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "createdAt", expression = "java(review.getCreatedAt() != null ? review.getCreatedAt().toString() : null)")
    ReviewResponse toReviewResponse(Review review);

    // Optional: nếu bạn muốn dùng để map ReviewRequest → Review
    // Dùng trong Service, vẫn cần gán thủ công user, product
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "ipAddress", ignore = true)
    Review toReview(ReviewRequest request);
}
