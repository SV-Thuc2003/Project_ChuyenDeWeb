package com.example.be.repository;

import com.example.be.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
//    List<Favorite> findById(User user);
    List<Favorite> findByIdUserId(Integer userId);
    Optional<Favorite> findByUserAndProduct(User user, Product product);
}
