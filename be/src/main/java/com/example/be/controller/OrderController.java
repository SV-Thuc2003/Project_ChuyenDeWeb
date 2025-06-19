package com.example.be.controller;

import com.example.be.dto.request.OrderRequest;
import com.example.be.dto.response.OrderResponse;
import com.example.be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {

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


}
