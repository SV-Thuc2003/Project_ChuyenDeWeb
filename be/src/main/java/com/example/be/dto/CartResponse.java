package com.example.be.dto;
import com.example.be.entity.Cart;
import com.example.be.entity.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CartResponse {
    private int id;
    private int productId; // ✅ thêm dòng này!
    private String name;
    private BigDecimal price;
    private int quantity;
    private String thumbnail;

    public CartResponse(Cart cart) {
        this.id = cart.getId();
        this.productId = cart.getProduct().getId(); // ✅ thêm dòng này!
        this.name = cart.getProduct().getName();
        this.price = cart.getProduct().getPrice();
        this.quantity = cart.getQuantity();

        // Lấy ảnh thumbnail hoặc ảnh mặc định
        this.thumbnail = cart.getProduct().getImages().stream()
                .filter(ProductImage::getIsThumbnail)
                .map(ProductImage::getImageUrl)
                .filter(url -> url != null && !url.isBlank())
                .findFirst()
                .orElse("https://your-cdn.com/default-image.png"); // Đổi thành đường dẫn ảnh mặc định thật của bạn
    }
}
