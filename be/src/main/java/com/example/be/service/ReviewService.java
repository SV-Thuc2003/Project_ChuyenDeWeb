package com.example.be.service;

import com.example.be.dto.ReviewRequest;
import com.example.be.dto.ReviewResponse;
import com.example.be.entity.*;
import com.example.be.mapper.ReviewMapper;
import com.example.be.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final ReviewMapper reviewMapper;

    public ReviewResponse createReview(Integer userId, ReviewRequest req) {
        User user = userRepo.findById(userId).orElseThrow();
        Product product = productRepo.findById(req.getProductId()).orElseThrow();

        // Dùng mapper chuyển request → entity (phần còn lại tự gán)
        Review review = reviewMapper.toReview(req);
        review.setUser(user);
        review.setProduct(product);
        review.setIpAddress("127.0.0.1"); // hoặc lấy từ HttpServletRequest

        review = reviewRepo.save(review);

        // Dùng mapper convert sang response
        return reviewMapper.toReviewResponse(review);
    }

    public List<ReviewResponse> getReviewsByProduct(Integer productId) {
        return reviewRepo.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(reviewMapper::toReviewResponse)
                .collect(Collectors.toList());
    }
    public void deleteReview(Integer reviewId, Integer userId) {
        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not allowed to delete this review");
        }

        reviewRepo.delete(review);
    }

}


//@Service
//@RequiredArgsConstructor
//public class ReviewService {
//
//    private final ReviewRepository reviewRepo;
//    private final UserRepository userRepo;
//    private final ProductRepository productRepo;
//
//    public ReviewResponse createReview(Integer userId, ReviewRequest req) {
//        User user = userRepo.findById(userId).orElseThrow();
//        Product product = productRepo.findById(req.getProductId()).orElseThrow();
//
//        Review review = Review.builder()
//                .user(user)
//                .product(product)
//                .rating(req.getRating())
//                .comment(req.getComment())
//                .build();
//
//        review = reviewRepo.save(review);
//
//        return ReviewResponse.builder()
//                .id(review.getId())
//                .username(user.getUsername())
//                .rating(review.getRating())
//                .comment(review.getComment())
//                .createdAt(review.getCreatedAt().toString())
//                .build();
//    }
//
//    public List<ReviewResponse> getReviewsByProduct(Integer productId) {
//        return reviewRepo.findByProductId(productId).stream()
//                .map(r -> ReviewResponse.builder()
//                        .id(r.getId())
//                        .username(r.getUser().getUsername())
//                        .rating(r.getRating())
//                        .comment(r.getComment())
//                        .createdAt(r.getCreatedAt().toString())
//                        .build())
//                .collect(Collectors.toList());
//    }
//
//    public void deleteReview(Integer reviewId) {
//        reviewRepo.deleteById(reviewId);
//    }
//}
