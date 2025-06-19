package com.example.be.controller;

import com.example.be.dto.response.DashboardSummaryResponse;
import com.example.be.dto.response.SalesDataPointResponse;
import com.example.be.dto.response.TopSellingProductResponse;
import com.example.be.repository.AdminDashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardRepository dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @GetMapping("/sales-overview")
    public ResponseEntity<List<SalesDataPointResponse>> getSalesOverview() {
        return ResponseEntity.ok(dashboardService.getSalesOverview());
    }

    @GetMapping("/top-selling")
    public ResponseEntity<List<TopSellingProductResponse>> getTopSelling() {
        return ResponseEntity.ok(dashboardService.getTopSellingProducts());
    }
}
