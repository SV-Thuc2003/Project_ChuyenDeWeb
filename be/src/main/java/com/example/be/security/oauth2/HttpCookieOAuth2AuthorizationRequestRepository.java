package com.example.be.security.oauth2;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.util.SerializationUtils;
import org.springframework.web.util.WebUtils;

import java.util.Base64;

import jakarta.servlet.http.Cookie;

/**
 * Lớp này dùng để lưu trữ và quản lý OAuth2AuthorizationRequest thông qua cookie.
 * Cần thiết khi dùng OAuth2 để xác thực với các nhà cung cấp như Google, Facebook
 */
public class HttpCookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {
    // tên cookie dùng để lưu OAuth2AuthorizationRequest
    public static final String OAUTH2_AUTH_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    // thời gian sống của cookie
    public static final int COOKIE_EXPIRE_SECONDS = 180;

    /**
     *Load OAuth2AuthorizationRequest từ cookie trong request hiện tại.
     *
     * @param request Yêu cầu gửi HTTP từ phía client
     * @return Đối tượng OAuth2AuthorizationRequest dược lưu trong cookie hoặc null nếu không tìm thấy
     */
    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return getAuthorizationRequestCookie(request);
    }

    /**
     * Lưu OAuth2AuthorizationRequest vào cookie
     * @param authorizationRequest Yêu cầu xác thực OAuth2
     * @param request Yêu cầu gửi HTTP từ client
     * @param response Phản hồi HTTP về client
     */
    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest,
                                         HttpServletRequest request, HttpServletResponse response) {
        // Nếu không có request thì xóa cookie
        if (authorizationRequest == null) {
            removeAuthorizationRequestCookies(request, response);
            return;
        }
        // Serialize và lưu vào cookie
        addCookie(response, OAUTH2_AUTH_REQUEST_COOKIE_NAME, serialize(authorizationRequest), COOKIE_EXPIRE_SECONDS);
    }

    /**
     * Xóa và trả về OAuth2AuthorizationRequest đang được lưu
     * @param request Yêu cầu gửi HTTP từ phía client
     * @param response Phản hồi HTTP
     * @return Đối tượng OAuth2AuthorizationRequest nếu có
     */
    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        return loadAuthorizationRequest(request);
    }

    /**
     * Xóa cookie chứa thông tin yêu cầu xác thực OAuth2
     *
     * @param request Yêu cầu HTTP
     * @param response Phản hồi HTTP
     */
    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
        deleteCookie(request, response, OAUTH2_AUTH_REQUEST_COOKIE_NAME);
    }

    /**
     * Chuyển đối tượng OAuth2AuthorizationRequest  thành chuỗi (Base64) để lưu trong cookie.
     * @param authorizationRequest Đối tượng OAuth2AuthorizationRequest
     * @return Chuỗi đã mã hóa
     */
    // Helper methods
    private String serialize(OAuth2AuthorizationRequest authorizationRequest) {
        return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(authorizationRequest));
    }

    /**
     * Lấy và giải mã cookie chứa OAuth2AuthorizationRequest  từ request.
     *
     * @param request Yêu cầu HTTP
     * @return Đối tượng OAuth2AuthorizationRequest hoặc null nếu không có
     */
    private OAuth2AuthorizationRequest getAuthorizationRequestCookie(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, OAUTH2_AUTH_REQUEST_COOKIE_NAME);
        if (cookie != null) {
            return (OAuth2AuthorizationRequest) SerializationUtils.deserialize(
                    Base64.getUrlDecoder().decode(cookie.getValue()));
        }
        return null;
    }

    /**
     * Thêm cookie vào response.
     *
     * @param response Đối tượng oharn hồi HTTP
     * @param name Tên cookie
     * @param value Giá trị cookie
     * @param maxAge Thời gian sống của cookie
     */
    private void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/"); // áp dụng cho toàn bộ domain
        cookie.setHttpOnly(true); // Không cho javascript truy cập, tăng bảo mật
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    /**
     * Xóa cookie khỏi trình duyệt người dùng
     *
     * @param request Yêu cầu HTTP
     * @param response Phản hồi HTTP
     * @param name Tên cookie cần xóa
     */
    private void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie cookie = WebUtils.getCookie(request, name);
        if (cookie != null) {
            cookie.setValue(""); // gán giá trị rộng
            cookie.setPath("/"); // áp dụng cho toàn domain
            cookie.setMaxAge(0); // hết hạn ngay lập tức
            response.addCookie(cookie);
        }
    }
}

