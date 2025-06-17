import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../../components/ui/InputField.tsx";
import Button from "../../../components/ui/Button.tsx";
import Checkbox from "../../../components/ui/Checkbox.tsx";
import { login } from "../../../Service/authService.ts";
import { LoginCredentials } from "../../../types/Login.ts";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login: contextLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const credentials: LoginCredentials = {
            username,
            password,
        };

        try {
            const response = await login(credentials);
            console.log("Login response:", response);

            const userId = (response as { userId?: number }).userId;

            if (response.token && response.username && response.role && userId !== undefined) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("username", response.username);
                localStorage.setItem("role", response.role);
                localStorage.setItem("userId", String(userId));

                if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("rememberMe");
                }

                contextLogin(response.username, response.token, response.role);
                console.log("Login successful:", response.username);


                navigate(redirectPath);
            } else {
                setErrorMessage(response.error || "Đăng nhập thất bại");
            }
        } catch (error: unknown) {
            const typedError = error as { message?: string };
            setErrorMessage(typedError.message || "Lỗi kết nối đến máy chủ");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <InputField
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mb-5"
                name="username"
            />

            <InputField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-3"
                name="password"
            />

            <div className="flex justify-between items-center mb-4">
                <Checkbox
                    label="Ghi nhớ đăng nhập"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    name="rememberMe"
                />

                <a
                    href="#"
                    className="text-[15px] font-medium text-[#3b63f3] hover:underline cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/forgot-password");
                    }}
                >
                    Quên mật khẩu
                </a>
            </div>

            {errorMessage && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            <Button
                type="submit"
                fullWidth
                className="h-8 text-[13px]"
                disabled={isLoading}
            >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
        </form>
    );
};

export default LoginForm;
