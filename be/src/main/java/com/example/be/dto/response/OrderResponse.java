package com.example.be.dto.response;

import com.example.be.entity.Order;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponse {
    private Integer id;
    private BigDecimal totalInvoice;
    private BigDecimal shippingFee;
    private String status;
    private String paymentMethod;
    private String createdAt;
    private List<ProductItem> products;

    public OrderResponse(Order order) {
        this.id = order.getId();
        this.totalInvoice = order.getTotalInvoice();
        this.shippingFee = order.getShippingAddress() != null ? order.getShippingAddress().getShippingFee() : BigDecimal.ZERO;
        this.status = order.getStatus().getStatusName();
        this.paymentMethod = order.getPaymentMethod().getMethodName();
        this.createdAt = order.getCreatedAt().toString();
        this.products = order.getOrderDetails().stream()
                .map(detail -> new ProductItem(detail, this.status))
                .collect(Collectors.toList());
    }

    @Data
    public static class ProductItem {
        private String name;
        private String imageUrl;
        private int quantity;
        private BigDecimal price;
        private boolean showReviewButton;
        private boolean showReorderButton;

        public ProductItem(com.example.be.entity.OrderDetail detail, String orderStatus) {
            this.name = detail.getProduct().getName();
            this.imageUrl = detail.getProduct().getImages().stream()
                    .filter(img -> img.getIsThumbnail())
                    .map(img -> img.getImageUrl())
                    .findFirst()
                    .orElse("default-image.png");
            this.quantity = detail.getQuantity();
            this.price = detail.getPrice();
            this.showReviewButton = "Completed".equalsIgnoreCase(orderStatus);
            this.showReorderButton = true;
        }
    }
}
