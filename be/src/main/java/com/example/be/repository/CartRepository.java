package com.example.be.repository;

import com.example.be.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    // Lấy toàn bộ giỏ hàng theo user
    List<Cart> findByUserId(Integer userId);

    // Tìm theo user + product (dùng khi thêm mới → cộng dồn số lượng)
    Optional<Cart> findByUserIdAndProductId(Integer userId, Integer productId);

    // Xoá theo user + product
    void deleteByUserIdAndProductId(Integer userId, Integer productId);

    // ✅ Thêm: Tìm theo cart ID + user (dùng khi update theo id)
    Optional<Cart> findByIdAndUserId(Integer id, Integer userId);

    // ✅ Tuỳ chọn: Xoá theo cart ID + user
    void deleteByIdAndUserId(Integer id, Integer userId);

    void deleteByUserId(Integer userId);

}
