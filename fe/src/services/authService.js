import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/auth'; // Cập nhật theo backend của bạn

/**
 * Gửi yêu cầu đăng ký tài khoản
 * @param {Object} formData - Dữ liệu đăng ký từ frontend
 * @returns {Promise<string>} - Thông báo từ server
 */
export const register = async (formData) => {
    try {
        const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name: formData.name || '', // Có thể thêm các field khác nếu backend yêu cầu
        };

        const response = await axios.post(`${API_BASE_URL}/register`, payload);
        return response.data;
    } catch (error) {
        // Trả lỗi rõ ràng cho phía FE xử lý
        console.error("Lỗi đăng ký:", error);
        const message = error.response?.data?.message || 'Đăng ký thất bại';
        throw new Error(message);
    }
};
export const verifyOtp = async ({ email, otpCode }) => {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otpCode });
    return response.data;
};

export const resendOtp = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/resend-otp`, null, {
        params: { email }
    });
    return response.data;
};

/**
 * Call API Login
 * @param {Object} credentials - Dữ liệu nhập gồm username và password
 * @return {Promise<Object>} - Dữ liệu trả về gồm token, usernam, role
 */
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data; //{token, username, token}
    } catch (error) {
        console.error("Lỗi đăng nhập:" , error);
        const message = error.response?.data?.message || 'Đăng nhập thất bại';
        throw new Error(message);
    }
}
//
// // Xử lý sau khi login OAuth2 (Spring redirect về FE kèm token trên URL)
// export const handleOAuth2Redirect = () => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token');
//     const username = params.get('username');
//     const role = params.get('role');
//
//     if (token) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', username);
//         localStorage.setItem('role', role);
//         return { token, username, role };
//     } else {
//         throw new Error("Không nhận được token từ OAuth2 redirect");
//     }
// };

