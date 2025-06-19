package com.example.be.controller;

import com.example.be.entity.OrderStatus;
import com.example.be.repository.OrderStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-statuses")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class OrderStatusController {

    private final OrderStatusRepository orderStatusRepository;

    @GetMapping
    public List<OrderStatus> getAllStatuses() {
        return orderStatusRepository.findAll();
    }
}
