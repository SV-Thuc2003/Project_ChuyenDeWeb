package com.example.be.security.jwt;

import com.example.be.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Lọc JWT để xác thực người dùng trong mỗi request.
 * Nếu JWT hợp lệ, thông tin người dùng vào SecurityContext.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService; // xử lý JWT (tạo, xác thực, trích xuất thông tin)

    /**
     * Thực hiện lọc JWT cho mỗi request
     *
     * @param request yêu cầu HTTP từ client
     * @param response phản hồi từ HTTP gửi về client
     * @param filterChain chuỗi  filter tiếp theo
//     * @throws ServletException
//     * @throws IOException
     */
    @Override

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // lấy JWT từ cookie
        String token = extractTokenFromRequest(request);
        // Kiểm tra tính hợp lệ của token
        if (token != null && jwtService.validateToken(token)){
            // Trích xuất email (hoặc username) từ token
            String email = jwtService.getUsernameFromToken(token);
            // Tạm set ROLE_USER cho tất cả token hợp lệ (test)
//            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
            // Tạo đối tượng xác thực (authentication)
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null, null); // có thể cung cấp quyền hạn (authorities) nếu cần
            // Gán thông tin chi tiết về request cho đối tượng authentication
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // Thiết lập đối tượng authentication vào SecurityContext để Spring Security sử dụng
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        // tiếp tục chuỗi filter
        filterChain.doFilter(request, response);
    }

    /**
     * Lấy từ cookie có tên là jwt.
     *
     * @param request yêu cầu HTTP
     * @return giá trị token nếu có, ngược lại trả về null
     */
//    private String extractTokenFromCookies(HttpServletRequest request) {
//        if (request.getCookies() != null) {
//            for (Cookie cookie : request.getCookies()){
//                if ("jwt".equals(cookie.getName())){
//                    return cookie.getValue();
//                }
//            }
//        }
//        return null;
//    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        // Ưu tiên Header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        // Fallback về cookie nếu không có header
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Bỏ qua OPTIONS (CORS preflight)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();
        return path.startsWith("/auth/")
                || path.startsWith("/oauth2/")
                || path.startsWith("/api/admin/");
    }

}
