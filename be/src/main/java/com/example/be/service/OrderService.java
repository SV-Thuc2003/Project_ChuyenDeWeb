package com.example.be.service;

import com.example.be.dto.request.OrderRequest;
import com.example.be.dto.request.ProductItemRequest;
import com.example.be.dto.response.OrderResponse;
import com.example.be.entity.*;
import com.example.be.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final ShippingService shippingService;
    private final ShippingAddressRepository shippingAddressRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CartRepository cartRepository;

    @Transactional
    public Integer placeOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("✅ Tìm thấy user: " + user.getUsername());

        BigDecimal shippingFee = request.getShippingFee();
        if (shippingFee == null || shippingFee.compareTo(BigDecimal.ZERO) <= 0) {
            int fee = shippingService.calculateShippingFee(
                    Integer.parseInt(request.getShippingAddress().getDistrictId()),
                    request.getShippingAddress().getWardCode()
            );
            shippingFee = BigDecimal.valueOf(fee);
        }

        System.out.println("📦 Bắt đầu lưu ShippingAddress...");
        ShippingAddress address = ShippingAddress.builder()
                .user(user)
                .fullName(request.getPersonalInfo().getName())
                .phone(request.getPersonalInfo().getPhone())
                .address(request.getShippingAddress().getAddress())
                .ward(request.getShippingAddress().getWard())
                .district(request.getShippingAddress().getDistrict())
                .city(request.getShippingAddress().getCity())
                .shippingFee(shippingFee)
                .build();
        shippingAddressRepository.save(address);

        String statusName = request.getStatus() != null ? request.getStatus() : "Pending";
        OrderStatus status = orderStatusRepository.findByStatusName(statusName)
                .orElseThrow(() -> new RuntimeException("OrderStatus not found"));

        PaymentMethod payment = paymentMethodRepository.findByMethodName(request.getPaymentMethod())
                .orElseThrow(() -> new RuntimeException("PaymentMethod not found"));
        System.out.println("💸 Phương thức thanh toán: " + request.getPaymentMethod());

        Order order = Order.builder()
                .user(user)
                .totalInvoice(request.getTotal())
                .status(status)
                .paymentMethod(payment)
                .shippingAddress(address)
                .build();
        orderRepository.save(order);

        for (ProductItemRequest item : request.getProducts()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            BigDecimal price = product.getPrice();
            int qty = item.getQuantity();
            BigDecimal totalPrice = price.multiply(BigDecimal.valueOf(qty));

            OrderDetail detail = OrderDetail.builder()
                    .id(new OrderDetailId(order.getId(), product.getId()))
                    .order(order)
                    .product(product)
                    .quantity(qty)
                    .price(price)
                    .totalPrice(totalPrice)
                    .build();
            orderDetailRepository.save(detail);
        }

        cartRepository.deleteByUserId(user.getId());

        return order.getId(); // ✅ TRẢ ORDER ID VỀ
    }
    @Transactional
    public List<OrderResponse> getOrdersByUserId(Integer userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markOrderAsPaid(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        OrderStatus paidStatus = orderStatusRepository.findByStatusName("Paid")
                .orElseThrow(() -> new RuntimeException("Trạng thái 'Paid' không tồn tại"));

        order.setStatus(paidStatus);
        orderRepository.save(order);
    }

}
