package com.example.be.security.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * Xử lý khi xác thực OAuth2 thất bại.
 * Lớp này kế thừa từ SimpleUrlAuthenticationFailureHandler để xử lý chuyển hướng người dùng
 * đến trang lỗi khi xác thực OAuth2 thành công.
 */
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    // URL mặc định để chuyển hướng khi xác thực OAuth2 thất bại
    private final String DEFAULT_FAILURE_URL ="http://localhost:5173/oauth2/redirect?error=true";

    /**
     * Phương thức để chuyển hướng khi xác thực OAuth2 thất bại.
     *
     * @param request yêu cầu HTTP từ phía client
     * @param response phản hồi HTTP gửi về client
     * @param exception Ngoại lệ xảy ra trong quá trình xác thực
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        // Lấy thông điệp lỗi chi tiết
        String errorMessage = URLEncoder.encode(exception.getLocalizedMessage(), StandardCharsets.UTF_8);
        // có thể thêm mã lỗi vào URL
        String errorCode = "authentication_error";
//        nếu nguyên nhân cụ thể hơn từ ngoại lệ gốc, thì dùng tên lớp  làm mã lỗi
        if (exception.getCause() != null) {
            errorCode = exception.getCause().getClass().getSimpleName();
        }

        // Tạo URL chuyển hướng với thông tin lỗi
        String redirectUrl = DEFAULT_FAILURE_URL + "&message=" + errorMessage + "&code=" + errorCode;

        // Chuyển hướng đến URL chứa thông tin lỗi
        response.sendRedirect(redirectUrl);
    }
//        String redirectUrl = DEFAULT_FAILURRE_URL + "&message=" + errorMessage;
//        response.sendRedirect(redirectUrl);
//    }
}

