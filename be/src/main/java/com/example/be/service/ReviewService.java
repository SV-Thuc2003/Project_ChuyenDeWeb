package com.example.be.service;

import com.example.be.dto.ReviewDTO;
import com.example.be.dto.request.ReviewRequest;
import com.example.be.entity.Product;
import com.example.be.entity.Review;
import com.example.be.entity.User;
import com.example.be.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;

    public ReviewDTO createReview(Integer userId, ReviewRequest req, String ipAddress) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById(req.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        boolean hasPurchased = orderRepo.existsByUserIdAndProductId(userId, req.getProductId());
        if (!hasPurchased) throw new RuntimeException("Bạn chưa mua sản phẩm này hoặc đơn hàng chưa hoàn tất");

        boolean alreadyReviewed = reviewRepo.existsByUserIdAndProductId(userId, req.getProductId());
        if (alreadyReviewed) throw new RuntimeException("Bạn đã đánh giá sản phẩm này rồi");

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(req.getRating())
                .comment(req.getComment())
                .ipAddress(ipAddress)
                .build();

        review = reviewRepo.save(review);

        return ReviewDTO.builder()
                .id(review.getId())
                .user(user.getName())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }

    public List<ReviewDTO> getReviewsByProduct(Integer productId) {
        return reviewRepo.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(r -> ReviewDTO.builder()
                        .id(r.getId())
                        .user(r.getUser().getName())
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public void deleteReview(Integer reviewId, Integer userId) {
        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền xóa đánh giá này");
        }

        reviewRepo.delete(review);
    }
}
