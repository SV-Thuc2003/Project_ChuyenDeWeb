package com.example.be.controller;

import com.example.be.dto.request.CartRequest;
import com.example.be.entity.Cart;
import com.example.be.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart")
public class CartController {
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCart(@PathVariable Integer userId) {
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }
    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Integer userId, @RequestBody CartRequest request) {
        cartService.addToCart(userId,request);
        return ResponseEntity.ok("Added to cart");
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<?> updateQuantity(@PathVariable Integer userId, @RequestBody CartRequest request) {
        cartService.updateQuantity(userId, request);
        return ResponseEntity.ok("Quantity updated");
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Integer userId, @PathVariable Integer productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok("Removed from cart");
    }
}
