package com.example.be.service;

import com.example.be.dto.response.DashboardSummaryResponse;
import com.example.be.dto.response.SalesDataPointResponse;
import com.example.be.dto.response.TopSellingProductResponse;
import com.example.be.entity.Category;
import com.example.be.entity.Product;
import com.example.be.entity.ProductImage;
import com.example.be.repository.AdminDashboardRepository;
import com.example.be.repository.OrderRepository;
import com.example.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService implements AdminDashboardRepository {

    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    @Override
    public DashboardSummaryResponse getSummary() {
        LocalDate today = LocalDate.now();

        BigDecimal todayRevenue = orderRepo.sumRevenueByDate(today);
        Integer productsSold = orderRepo.sumProductsSoldByDate(today);
        int newUsers = userRepo.countUsersRegisteredBetween(today.atStartOfDay(), today.plusDays(1).atStartOfDay());
        int processing = orderRepo.countByStatusName("Pending");

        return new DashboardSummaryResponse(
                formatCurrency(todayRevenue),
                (productsSold != null ? productsSold : 0) + " sản phẩm",
                newUsers,
                processing
        );
    }

    @Override
    public List<SalesDataPointResponse> getSalesOverview() {
        List<SalesDataPointResponse> result = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = today.minusDays(6 - i);
            String day = switch (date.getDayOfWeek().getValue()) {
                case 1 -> "Thứ 2";
                case 2 -> "Thứ 3";
                case 3 -> "Thứ 4";
                case 4 -> "Thứ 5";
                case 5 -> "Thứ 6";
                case 6 -> "Thứ 7";
                case 7 -> "Chủ nhật";
                default -> "Không xác định";
            };

            Integer soldProducts = orderRepo.sumProductsSoldByDate(date);
            BigDecimal revenue = orderRepo.sumRevenueByDate(date);

            result.add(new SalesDataPointResponse(
                    day,
                    soldProducts != null ? soldProducts : 0,
                    revenue != null ? revenue.divide(BigDecimal.valueOf(1_000_000)).intValue() : 0
            ));
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TopSellingProductResponse> getTopSellingProducts() {
        List<Object[]> rows = orderRepo.findTopSellingProducts(PageRequest.of(0, 5)); // top 5

        return rows.stream().map(row -> {
            Product product = (Product) row[0];
            Long total = (Long) row[1];

            String imageUrl = product.getImages().stream()
                    .filter(ProductImage::getIsThumbnail)
                    .map(ProductImage::getImageUrl)
                    .findFirst()
                    .orElse("default.png");

            String category = product.getCategories().stream()
                    .findFirst()
                    .map(Category::getName)
                    .orElse("Chưa phân loại");

            return new TopSellingProductResponse(
                    product.getName(),
                    imageUrl,
                    category,
                    total != null ? total.intValue() : 0
            );
        }).toList();
    }

    private String formatCurrency(BigDecimal value) {
        if (value == null) return "0 triệu ₫";
        return value.divide(BigDecimal.valueOf(1_000_000)).toPlainString() + " triệu ₫";
    }
}
