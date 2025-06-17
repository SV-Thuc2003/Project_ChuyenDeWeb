package com.example.be.repository;

import com.example.be.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProductId(Integer productId);

// hiển thị thị review mới nhất lên đầu
    List<Review> findByProductIdOrderByCreatedAtDesc(Integer productId);

}
