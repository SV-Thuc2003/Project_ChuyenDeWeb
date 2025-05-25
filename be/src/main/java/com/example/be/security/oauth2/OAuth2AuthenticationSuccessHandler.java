package com.example.be.security.oauth2;

import com.example.be.config.AppProperties;
import com.example.be.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

/**
 * Xử lý logic khi người dùng xác thực OAuh2 thành công.
 * Tạo JWT, lưu vào cookie và chuyển hướng về frontend.
 */
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtService; // Dịch vụ tạo IWT
    private final AppProperties appProperties; // Cấu hình ứng dụng (chứa redirect URI,..)

    /**
     * Phương thức được gọi khi xác thực OAuth2 thành công.
     *
     * @param request yêu cầu HTTP từ phía client
     * @param response phản hồi HTTP gửi về client
     * @param authentication đối tượng chứa thông tin người dùng đã xác thực
     * @throws IOException nếu xảy ra lỗi khi gửi phản hồi
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        Object principal = authentication.getPrincipal();
        System.out.println("OAuth2 Principal Class: " + principal.getClass().getName());

        // Kiểm tra xem đối tượng principal có đúng kiểu CustomOAuth2User hay không
        if (principal instanceof CustomOAuth2User customUser) {
            String email = customUser.getEmail();
            // Tạo JWT dựa trên email người dùng
            String token = jwtService.generateToken(email);
            // Log token một phần để tiện debug (không log toàn bộ vì lý do bảo mật)
            System.out.println("Generated token (partial): " + token.substring(0, 20) + "... (truncated)");

            // Tạo cookie chứa JWT
            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true); // chỉ cho phép truy cập từ server (tăng bảo mật)
            cookie.setSecure(false); // chỉ gửi qua HTTPS
            cookie.setPath("/"); // Áp dụng cho toàn bộ domain
            cookie.setMaxAge(60 * 60); // có hiệu lực trong 1 giờ
            // Thêm cookie vào phản hồi
            response.addCookie(cookie);
            // Chuyển hướng về frontend (không truyền token trên URL để bảo mật cao hơn)
            String redirectUrl = UriComponentsBuilder
                    .fromUriString(appProperties.getOauth2().getRedirectUri()) // http://localhost:5173/oauth2/redirect
                    .queryParam("token", token)
                    .build().toUriString();

            response.sendRedirect(redirectUrl);

        } else {
            // Trường hợp lỗi: principal không phải kiểu mong đợi
            System.err.println("Unexpected principal: " + principal.getClass().getName());
            response.sendRedirect(appProperties.getOauth2().getRedirectUri() + "?error=OAuth2PrincipalMismatch");
        }
    }
}


