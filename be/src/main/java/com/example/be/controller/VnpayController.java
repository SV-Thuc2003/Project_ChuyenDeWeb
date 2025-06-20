package com.example.be.controller;
import com.example.be.dto.response.VnpayQrResponse;
import com.example.be.repository.CartRepository;
import com.example.be.service.OrderService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.be.config.VnpayConfig;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payment")
public class VnpayController {
    private final OrderService orderService;
    private final CartRepository cartRepository;

    public static String createQrPayment(int amount, String ipAddr, String txnRef, String createDate) {
        // ✅ Trả về ảnh QR mô phỏng chứa thông tin mã giao dịch
        String qrText = "VNPay:" + txnRef + " - Amount:" + amount;
        return "https://api.qrserver.com/v1/create-qr-code/?data=" + qrText + "&size=200x200";
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyFakeTransaction(
            @RequestParam String txnRef,
            @RequestParam Integer orderId,
            @RequestParam Integer userId
    ) {
        if (txnRef == null || txnRef.isBlank()) {
            return ResponseEntity.badRequest().body("Thiếu mã giao dịch");
        }

        try {
            // ✅ Đánh dấu đơn đã thanh toán
            orderService.markOrderAsPaid(orderId);

            // ✅ Xoá giỏ hàng của user
            cartRepository.deleteByUserId(userId);

            return ResponseEntity.ok("✅ Đã xác nhận thanh toán (giả lập). Đơn đã chuyển trạng thái PAID.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Lỗi xác minh đơn hàng: " + e.getMessage());
        }
    }
    @GetMapping("/qr")
    public ResponseEntity<?> getQrPayment(@RequestParam int amount) {
        // ✅ Tạo thông tin QR giả lập
        String txnRef = "TXN" + System.currentTimeMillis();
        String createDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        String qrUrl = createQrPayment(amount, "127.0.0.1", txnRef, createDate);

        VnpayQrResponse response = new VnpayQrResponse(qrUrl, txnRef, amount);

        return ResponseEntity.ok(response);
    }

}
