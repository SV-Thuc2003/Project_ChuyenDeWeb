
package com.example.be.service;

import com.example.be.dto.response.FavoriteResponse;
import com.example.be.entity.Favorite;
import com.example.be.entity.FavoriteId;
import com.example.be.entity.Product;
import com.example.be.entity.User;
import com.example.be.mapper.FavoriteMapper;
import com.example.be.repository.FavoriteRepository;
import com.example.be.repository.ProductRepository;
import com.example.be.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final FavoriteMapper favoriteMapper;

    public void addFavorite(Integer userId, Integer productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        FavoriteId id = new FavoriteId(userId, productId);

        if (favoriteRepository.existsById(id)) return;

        Favorite favorite = Favorite.builder()
                .id(id)
                .user(user)
                .product(product)
                .build();

        favoriteRepository.save(favorite);
    }

    public void removeFavorite(Integer userId, Integer productId) {
        FavoriteId id = new FavoriteId(userId, productId);
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
        }
    }

    @Transactional
    public List<FavoriteResponse> getFavoritesByUser(Integer userId) {
        return favoriteRepository.findByIdUserId(userId).stream()
                .map(favoriteMapper::toDto)
                .collect(Collectors.toList());
    }

}
