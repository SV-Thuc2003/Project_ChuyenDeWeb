package com.example.be.service;

import com.example.be.dto.ReviewRequest;
import com.example.be.dto.ReviewResponse;
import com.example.be.entity.*;
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

    public ReviewResponse createReview(Integer userId, ReviewRequest req) {
        User user = userRepo.findById(userId).orElseThrow();
        Product product = productRepo.findById(req.getProductId()).orElseThrow();

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(req.getRating())
                .comment(req.getComment())
                .build();

        review = reviewRepo.save(review);

        return ReviewResponse.builder()
                .id(review.getId())
                .username(user.getUsername())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt().toString())
                .build();
    }

    public List<ReviewResponse> getReviewsByProduct(Integer productId) {
        return reviewRepo.findByProductId(productId).stream()
                .map(r -> ReviewResponse.builder()
                        .id(r.getId())
                        .username(r.getUser().getUsername())
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .createdAt(r.getCreatedAt().toString())
                        .build())
                .collect(Collectors.toList());
    }

    public void deleteReview(Integer reviewId) {
        reviewRepo.deleteById(reviewId);
    }
}
