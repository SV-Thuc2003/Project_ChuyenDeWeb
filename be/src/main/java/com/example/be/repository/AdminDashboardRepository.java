package com.example.be.repository;

import com.example.be.dto.response.DashboardSummaryResponse;
import com.example.be.dto.response.SalesDataPointResponse;
import com.example.be.dto.response.TopSellingProductResponse;

import java.util.List;

public interface AdminDashboardRepository {
    DashboardSummaryResponse getSummary();
    List<SalesDataPointResponse> getSalesOverview();
    List<TopSellingProductResponse> getTopSellingProducts();
}
