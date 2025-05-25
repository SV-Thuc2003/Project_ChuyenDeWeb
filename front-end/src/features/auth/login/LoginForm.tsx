import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import InputField from "../../../components/ui/InputField.tsx";
import Button from "../../../components/ui/Button.tsx";
import Checkbox from "../../../components/ui/Checkbox.tsx";
import { login } from "../../../Services/authService.ts";
import { LoginCredentials } from "../../../types/Login.ts";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // <-- khởi tạo useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const credentials: LoginCredentials = {
      username,
      password,
      // rememberMe không gửi lên backend nếu backend không hỗ trợ
    };

    try {
      const response = await login(credentials);

      if (response.token) {
        localStorage.setItem("token", response.token);

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        console.log("Login successful:", response.user);

        // Redirect về trang home
        navigate("/");
      } else {
        setErrorMessage(response.error || "Đăng nhập thất bại");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Lỗi kết nối đến máy chủ");
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

        <Button
          type="button"
          className="text-[10px] font-medium text-[#0c2991] hover:underline"
          onClick={() => console.log("Forgot password clicked")}
        >
          Quên mật khẩu
        </Button>
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
