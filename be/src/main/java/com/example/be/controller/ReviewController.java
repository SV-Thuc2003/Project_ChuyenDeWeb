package com.example.be.controller;

import com.example.be.dto.ReviewDTO;
import com.example.be.dto.request.ReviewRequest;
import com.example.be.entity.Product;
import com.example.be.entity.Review;
import com.example.be.entity.User;
import com.example.be.repository.OrderRepository;
import com.example.be.repository.ProductRepository;
import com.example.be.repository.ReviewRepository;
import com.example.be.repository.UserRepository;
import com.example.be.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.be.service.OrderService;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ReviewService reviewService;
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> submitReview(@RequestBody ReviewRequest dto,
                                          Principal principal,
                                          HttpServletRequest request) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            ReviewDTO response = reviewService.createReview(user.getId(), dto, request.getRemoteAddr());
            return ResponseEntity.ok(response); // hoặc trả message nếu muốn
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDTO>> getReviews(@PathVariable Integer productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        List<ReviewDTO> response = reviews.stream().map(r -> new ReviewDTO(
                r.getId(), r.getUser().getName(), r.getRating(), r.getComment(), r.getCreatedAt()
        )).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reviews/can-review")
    public ResponseEntity<Boolean> canReview(@RequestParam Integer userId, @RequestParam Integer productId) {
        boolean hasPurchased = orderService.hasUserPurchasedProduct(userId, productId);
        return ResponseEntity.ok(hasPurchased);
    }

}

