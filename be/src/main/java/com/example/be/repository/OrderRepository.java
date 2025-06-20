package com.example.be.repository;

import com.example.be.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;


import java.math.BigDecimal;
import java.time.LocalDate;
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

    //ADMIN
    @Query("SELECT SUM(od.quantity) FROM OrderDetail od WHERE DATE(od.order.createdAt) = :date")
    Integer sumProductsSoldByDate(@Param("date") LocalDate date);

    @Query("SELECT SUM(o.totalInvoice) FROM Order o WHERE DATE(o.createdAt) = :date")
    BigDecimal sumRevenueByDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status.statusName = :statusName")
    int countByStatusName(@Param("statusName") String statusName);

    @Query("SELECT od.product, SUM(od.quantity) as total FROM OrderDetail od GROUP BY od.product ORDER BY total DESC")
    List<Object[]> findTopSellingProducts(Pageable pageable);

    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.user " +
            "JOIN FETCH o.status " +
            "JOIN FETCH o.paymentMethod " +
            "JOIN FETCH o.shippingAddress " +
            "LEFT JOIN FETCH o.orderDetails od " +
            "LEFT JOIN FETCH od.product p")
    List<Order> findAllWithDetails();
}
