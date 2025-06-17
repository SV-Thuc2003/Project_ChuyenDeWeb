package com.example.be.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    private Integer userId;

    private PersonalInfoRequest personalInfo;
    private ShippingAddressRequest shippingAddress;
    private String paymentMethod; // ex: "cash", "vnpay", etc.
    private List<ProductItemRequest> products;
    private BigDecimal shippingFee;
    private BigDecimal discount;
    private BigDecimal total;
    private String status;

}
