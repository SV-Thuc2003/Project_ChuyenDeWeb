package com.example.be.controller;

import com.example.be.dto.ReviewRequest;
import com.example.be.dto.ReviewResponse;
import com.example.be.service.JwtService;
import com.example.be.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtService jwtService;;

    // Tạo review (giả định userId được truyền từ client hoặc từ token)
    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ReviewRequest request
    ) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.getUserIdFromToken(token);
        ReviewResponse response = reviewService.createReview(userId, request);
        return ResponseEntity.ok(response);
    }


    // Lấy danh sách review của 1 sản phẩm
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByProduct(
            @PathVariable Integer productId
    ) {
        List<ReviewResponse> reviews = reviewService.getReviewsByProduct(productId);
        return ResponseEntity.ok(reviews);
    }

    // Xoá review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Integer reviewId,
            @RequestParam("userId") Integer userId // Hoặc lấy từ token nếu có Spring Security
    ) {
        reviewService.deleteReview(reviewId, userId);
        return ResponseEntity.noContent().build();
    }

}



//package com.example.be.controller;
//
//import com.example.be.dto.*;
//import com.example.be.service.ReviewService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/reviews")
//@RequiredArgsConstructor
//public class ReviewController {
//
//    private final ReviewService reviewService;
//
//    // TODO: lấy userId từ JWT sau này
//    @PostMapping
//    public ReviewResponse addReview(@RequestBody ReviewRequest request) {
//        Integer userId = 1; // tạm hardcode
//        return reviewService.createReview(userId, request);
//    }
//
//    @GetMapping("/product/{productId}")
//    public List<ReviewResponse> getReviews(@PathVariable Integer productId) {
//        return reviewService.getReviewsByProduct(productId);
//    }
//
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable Integer id) {
//        reviewService.deleteReview(id);
//    }
//}
