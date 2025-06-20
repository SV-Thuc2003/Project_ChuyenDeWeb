package com.example.be.controller;

import com.example.be.dto.request.OrderRequest;
import com.example.be.dto.response.OrderResponse;
import com.example.be.entity.Order;
import com.example.be.entity.OrderStatus;
import com.example.be.repository.OrderRepository;
import com.example.be.repository.OrderStatusRepository;
import com.example.be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final OrderService orderService; // ✅ Dòng này nè
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            Integer orderId = orderService.placeOrder(request);
            return ResponseEntity.ok(orderId); // ✅ trả về ID đơn hàng
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi đặt hàng: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserOrders(@PathVariable Integer userId) {
        try {
            List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Không thể lấy đơn hàng: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAllWithDetails();
        orders.forEach(o -> o.getOrderDetails().forEach(d -> {
            System.out.println("Product: " + (d.getProduct() != null ? d.getProduct().getName() : "null"));
        }));
        return orders;
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Integer id,
                                                   @RequestBody Map<String, Integer> body) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        Integer statusId = body.get("statusId");
        OrderStatus status = orderStatusRepository.findById(statusId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status"));

        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());

        Order updated = orderRepository.save(order);
        return ResponseEntity.ok(updated);
    }
}
