package com.example.be.config;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.*;

public class VnpayConfig {

    // ====== Cấu hình ======
    private static final String TMNCODE = "0PQYBO6F";
    private static final String HASH_SECRET = "6YTKH8410LIRJTB392MD2QPIHJOLF7O3";
    private static final String API_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private static final String VERSION = "2.1.0";
    private static final String COMMAND = "qrcode";
    private static final String CURRENCY = "VND";
    private static final String LOCALE = "vn";
    private static final String ORDER_TYPE = "billpayment";

    /**
     * Tạo mã QR thanh toán QR từ VNPay
     * @param amount        Số tiền (VND)
     * @param ipAddr        Địa chỉ IP client
     * @param txnRef        Mã giao dịch
     * @param createDate    Ngày tạo (yyyyMMddHHmmss)
     * @return              Đường dẫn ảnh QR hoặc null nếu lỗi
     */
    public static String createQrPayment(int amount, String ipAddr, String txnRef, String createDate) {
        try {
            String vnpOrderInfo = "Thanh toan QR #" + txnRef;

            Map<String, String> data = new LinkedHashMap<>();
            data.put("vnp_Version", VERSION);
            data.put("vnp_Command", COMMAND);
            data.put("vnp_TmnCode", TMNCODE);
            data.put("vnp_Amount", String.valueOf(amount));
            data.put("vnp_TxnRef", txnRef);
            data.put("vnp_OrderInfo", vnpOrderInfo);
            data.put("vnp_OrderType", ORDER_TYPE);
            data.put("vnp_Locale", LOCALE);
            data.put("vnp_CurrCode", CURRENCY);
            data.put("vnp_CreateDate", createDate);
            data.put("vnp_IpAddr", ipAddr);

            // Tạo chuỗi cần ký
            List<String> keys = new ArrayList<>(data.keySet());
            Collections.sort(keys);
            StringBuilder hashData = new StringBuilder();
            for (int i = 0; i < keys.size(); i++) {
                hashData.append(keys.get(i)).append("=").append(data.get(keys.get(i)));
                if (i < keys.size() - 1) hashData.append("&");
            }

            // Sinh chữ ký
            String secureHash = hmacSHA512(HASH_SECRET, hashData.toString());
            data.put("vnp_SecureHash", secureHash);

            // Convert map to JSON string
            StringBuilder json = new StringBuilder("{");
            int count = 0;
            for (Map.Entry<String, String> entry : data.entrySet()) {
                json.append("\"").append(entry.getKey()).append("\":\"").append(entry.getValue()).append("\"");
                if (++count < data.size()) json.append(",");
            }
            json.append("}");

            // Gửi POST request
            URL url = new URL(API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/json");

            try (OutputStream os = conn.getOutputStream()) {
                os.write(json.toString().getBytes(StandardCharsets.UTF_8));
            }

            // Đọc response
            StringBuilder response = new StringBuilder();
            try (BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String line;
                while ((line = in.readLine()) != null) response.append(line);
            }

            return extractQrCodeUrl(response.toString());

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Tạo chữ ký HMAC-SHA512
    private static String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hash = new StringBuilder();
            for (byte b : bytes) hash.append(String.format("%02x", b));
            return hash.toString();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi tạo chữ ký HMAC", e);
        }
    }

    // Trích QR Code URL từ response JSON đơn giản
    private static String extractQrCodeUrl(String json) {
        int idx = json.indexOf("\"qrCodeUrl\":\"");
        if (idx == -1) return null;
        int start = idx + 13;
        int end = json.indexOf("\"", start);
        return json.substring(start, end);
    }

    // 👉 Hàm phụ nếu bạn cần sinh createDate nhanh
    public static String getCurrentDate() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }
}
