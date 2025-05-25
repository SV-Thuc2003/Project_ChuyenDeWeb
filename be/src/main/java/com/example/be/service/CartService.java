package com.example.be.service;

import com.example.be.dto.request.CartRequest;
import com.example.be.entity.Cart;
import com.example.be.repository.CartRepository;
import com.example.be.repository.ProductRepository;
import com.example.be.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CartService {
    private CartRepository cartRepository;
    private UserRepository userRepository;
    private ProductRepository productRepository;

    public List<Cart> getUserCart(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    public void addToCart(Integer userId, CartRequest request) {
        Cart cart = cartRepository.findByUserIdAndProductId(userId, request.getProductId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(userRepository.findById(userId).orElseThrow());
                    newCart.setProduct(productRepository.findById(request.getProductId()).orElseThrow());
                    newCart.setQuantity(0);
                    return newCart;
                });
        cart.setQuantity(cart.getQuantity() + request.getQuantity());
        cart.setAddedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }
    public void updateQuantity(Integer userId, CartRequest request) {
        Cart cart = cartRepository.findByUserIdAndProductId(userId, request.getProductId())
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cart.setQuantity(request.getQuantity());
        cartRepository.save(cart);
    }
    public void removeFromCart(Integer userId, Integer productId) {
        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }
}

