package com.example.be.repository;

import com.example.be.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);

    @Query("""
    SELECT COUNT(o) > 0 FROM Order o
    JOIN o.orderDetails od
    WHERE o.user.id = :userId
    AND od.product.id = :productId
    AND o.status.statusName = 'Completed'
""")
    boolean existsByUserIdAndProductId(@Param("userId") Integer userId, @Param("productId") Integer productId);

}
