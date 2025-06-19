package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryResponse {
    private String todayRevenue;
    private String totalSoldProducts;
    private int newCustomersToday;
    private int processingOrders;
}
