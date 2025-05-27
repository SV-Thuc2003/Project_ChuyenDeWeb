import React, { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 
import { resetPassword } from "../../../Services/authService"; 

interface Props {
  email: string;
  otp: string;
  onBack: () => void;
}

const StepNewPassword: React.FC<Props> = ({ email, otp, onBack }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ⬅️ hook điều hướng

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.warning("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirm) {
      toast.warning("Mật khẩu không khớp");
      return;
    }

    setLoading(true);

    try {
      const message = await resetPassword(email, otp, password);
      toast.success(message || "Đổi mật khẩu thành công");

      // ⬅️ Chuyển hướng về trang login
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      console.error("Lỗi:", err);
      toast.error(err?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <InputField
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputField
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <Button type="button" onClick={onBack} variant="secondary" className="flex-1">
          Quay lại
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? "Đang đổi..." : "Đổi mật khẩu"}
        </Button>
      </div>
    </form>
  );
};

export default StepNewPassword;
