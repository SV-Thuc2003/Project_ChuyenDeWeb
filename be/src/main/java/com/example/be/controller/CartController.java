package com.example.be.controller;

import com.example.be.dto.request.CartRequest;
import com.example.be.dto.CartResponse;
import com.example.be.dto.request.CartUpdateRequest;
import com.example.be.entity.Cart;
import com.example.be.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService; // ✅ phải có "final" thì Lombok mới tự động inject được

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartResponse>> getCart(@PathVariable Integer userId) {
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }


    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Integer userId, @RequestBody CartRequest request) {
        System.out.println("👉 Add to cart: userId=" + userId + ", productId=" + request.getProductId());
        cartService.addToCart(userId, request);
        return ResponseEntity.ok("Added to cart");
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<?> updateCart(@PathVariable Integer userId,
                                        @RequestBody List<CartUpdateRequest> requests) {
        cartService.updateCartItems(userId, requests);
        return ResponseEntity.ok("Cart updated");
    }


    @DeleteMapping("/{userId}/remove/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Integer userId, @PathVariable Integer cartItemId) {
        cartService.removeFromCart(userId, cartItemId);
        return ResponseEntity.ok("Removed from cart");
    }

}
