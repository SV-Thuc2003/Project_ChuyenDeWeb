package com.example.be.controller;

import com.example.be.dto.*;
import com.example.be.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // TODO: lấy userId từ JWT sau này
    @PostMapping
    public ReviewResponse addReview(@RequestBody ReviewRequest request) {
        Integer userId = 1; // tạm hardcode
        return reviewService.createReview(userId, request);
    }

    @GetMapping("/product/{productId}")
    public List<ReviewResponse> getReviews(@PathVariable Integer productId) {
        return reviewService.getReviewsByProduct(productId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        reviewService.deleteReview(id);
    }
}
