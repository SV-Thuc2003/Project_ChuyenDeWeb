package com.example.be.service;

import com.example.be.dto.request.CartRequest;
import com.example.be.dto.CartResponse;
import com.example.be.dto.request.CartUpdateRequest;
import com.example.be.entity.Cart;
import com.example.be.entity.Product;
import com.example.be.entity.ProductImage;
import com.example.be.repository.CartRepository;
import com.example.be.repository.ProductRepository;
import com.example.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // ✅ Tự động inject các final field qua constructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public List<CartResponse> getUserCart(Integer userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        return carts.stream().map(CartResponse::new).toList();
    }

    @Transactional
    public void addToCart(Integer userId, CartRequest request) {
        Cart cart = cartRepository.findByUserIdAndProductId(userId, request.getProductId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(userRepository.findById(userId).orElseThrow());
                    newCart.setProduct(productRepository.findById(request.getProductId()).orElseThrow());
                    newCart.setQuantity(0); // bắt đầu từ 0
                    return newCart;
                });

        cart.setQuantity(cart.getQuantity() + request.getQuantity()); // cộng dồn
        cart.setAddedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }

    public void removeFromCart(Integer userId, Integer cartItemId) {
        Cart cart = cartRepository.findByIdAndUserId(cartItemId, userId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartRepository.delete(cart);
    }

    public void updateCartItems(Integer userId, List<CartUpdateRequest> requests) {
        List<Cart> carts = requests.stream().map(req -> {
            Cart cart = cartRepository.findByIdAndUserId(req.getId(), userId)
                    .orElseThrow(() -> new RuntimeException("Cart item not found"));
            cart.setQuantity(req.getQuantity());
            return cart;
        }).collect(Collectors.toList());

        cartRepository.saveAll(carts);
    }

}
