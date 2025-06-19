package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalesDataPointResponse {
    private String dayOfWeek;         // "Thứ 2", "Thứ 3", ...
    private int soldProducts;         // Số lượng sản phẩm bán ra
    private int revenue;              // Tổng doanh thu (triệu đồng)
}
