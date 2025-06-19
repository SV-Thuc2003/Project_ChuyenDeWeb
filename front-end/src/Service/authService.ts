// src/services/authService.ts

import axios, { AxiosError } from "axios";
import { RegisterFormData } from '../types/Register';
import { LoginCredentials, LoginResponse } from '../types/Login';

const API_URL = 'http://localhost:8080/api/auth'; // hoặc lấy từ .env
//Call api của register
export const register = async (formData: RegisterFormData): Promise<string> => {
    try {
        const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name: formData.name || '',
            phone: formData.phone || '',
        };

        const response = await axios.post<{ message: string }>(
            `${API_URL}/register`,
            payload
        );

        return response.data.message; // ví dụ: "Đăng ký thành công"
    } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        console.error("Lỗi đăng ký:", err);
        const message = err.response?.data?.message || "Đăng ký thất bại";
        throw new Error(message);
    }
};

interface VerifyOtpParams {
  email: string;
  otpCode: string;
}

// Hàm xác thực OTP
export const verifyOtp = async ({ email, otpCode }: VerifyOtpParams): Promise<any> => {
  const response = await axios.post(`${API_URL}/verify-otp`, { email, otpCode });
  return response.data;
};

// Hàm gửi lại OTP
export const resendOtp = async (email: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/resend-otp`, null, {
    params: { email }
  });
  return response.data;
};

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      credentials
    );
    return response.data;
  } catch (error: any) {
    console.error("Lỗi đăng nhập:", error);
    const message = error.response?.data?.message || "Đăng nhập thất bại";
    throw new Error(message);
  }
};

export const forgotPassword = async (email: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/forgot-password`, null, {
        params: { email },
    });
    return response.data;
};

interface VerifyOtpResetPasswordParams {
  email: string;
  otpCode: string;
}

// Hàm xác thực OTP cho reset password
export const verifyOtpResetPassword = async ({
  email,
  otpCode,
}: VerifyOtpResetPasswordParams): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_URL}/verify-otp-reset-password`,
      { email, otpCode }
    );
    return response.data;  // Ví dụ response trả về String thông báo
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("Lỗi verify OTP reset password:", err);
    const message = err.response?.data?.message || "Xác thực OTP thất bại";
    throw new Error(message);
  }
};

export const resetPassword = async (email: string, otpCode: string, newPassword: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/reset-password`, {
        email,
        otpCode,
        newPassword,
    });
    return response.data;
};
