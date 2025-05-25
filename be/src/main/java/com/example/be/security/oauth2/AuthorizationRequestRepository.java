//package com.example.be.security.oauth2;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
//
///**
// * Giao diện để quản lý OAuth2AuthorizationRequest  trong quá trình xác thực OAuth2.
// * Cung cấp các phương thức để tải, lưu và xóa yêu cầu ủy quyền OAuth2.
// */
//public interface AuthorizationRequestRepository<T extends OAuth2AuthorizationRequest> {
//    /**
//     * Tải yêu cầu ủy quyền OAuht2 từ request hiện tại.
//     *
//     * @param request HttpServletRequest hiện tại
//     * @return Đối tượng OAuth2AuthorizationRequest, hoặc null nếu không tồn tại
//     */
//    T loadAuthorizationRequest(HttpServletRequest request);
//
//    /**
//     * Lưu yêu cầu ủy quyền OAuth2 vào phiên làm việc hoặc cookie.
//     *
//     * @param authorizationRequest Yêu cầu ủy quyền cần lưu
//     * @param request HttpServletRequest hiện tại
//     * @param response HttpServletResponse hiện tại
//     */
//    void saveAuthorizationRequest(T authorizationRequest, HttpServletRequest request, HttpServletResponse response);
//
//    /**
//     * Xóa và trả về yêu cầu ủy quyền đã lưu (nếu có) từ request hiện tại.
//     *
//     * @param request HttpServletRequest hiện tại
//     * @return Đối tượng OAuth2AuthorizationRequest đã bị xóa, hoặc null nếu không tồn tại
//     */
//    T removeAuthorizationRequest(HttpServletRequest request);
//}
