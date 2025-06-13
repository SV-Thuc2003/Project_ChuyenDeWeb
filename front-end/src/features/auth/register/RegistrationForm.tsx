import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/ui/InputField.tsx";
import Button from "../../../components/ui/Button.tsx";
import Checkbox from "../../../components/ui/Checkbox.tsx";
import { RegisterFormData, RegisterFormErrors } from "../../../types/Register.ts";
import { register } from "../../../Services/authService.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Khai báo props
interface RegistrationFormProps {
    onSuccess: (email: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (errors[name as keyof RegisterFormErrors]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: RegisterFormErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Tên đăng nhập không được để trống";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Họ và tên không được để trống";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại không được để trống";
        } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = "Bạn phải đồng ý với điều khoản sử dụng";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const message = await register(formData);
            toast.success(message);
            onSuccess(formData.email); // ✅ Gọi callback khi thành công
        } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[700px] ml-4">
            <h1 className="text-3xl mb-6">Đăng ký</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3 p-3">
                    <InputField
                        label="Tên đăng nhập"
                        placeholder="Nhập tên đăng nhập của bạn"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        required
                    />

                    <InputField
                        label="Họ và tên"
                        placeholder="Nhập họ tên đầy đủ"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />

                    <InputField
                        label="Địa chỉ Email"
                        placeholder="Điền địa chỉ email vào đây"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />

                    <InputField
                        label="Điện thoại"
                        placeholder="Điền số điện thoại vào đây"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                    />

                    <InputField
                        label="Mật khẩu"
                        placeholder="Điền mật khẩu vào đây"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />

                    <InputField
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                    />

                    <div className="mt-4 mb-6">
                        <Checkbox
                            label="Tôi đã đồng ý với thoả thuận và điều khoản người dùng"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            name="termsAccepted"
                        />
                        {errors.termsAccepted && (
                            <p className="mt-1 text-xs text-red-500">{errors.termsAccepted}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        className="h-8 font-bold text-lq mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang xử lý..." : "Đăng ký"}
                    </Button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-lg text-black">
                    Nếu bạn đã có tài khoản?{" "}
                    <Link to="/login" className="text-[#3b63f3] hover:underline">
                        Chuyển tới trang đăng nhập
                    </Link>
                </p>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default RegistrationForm;
