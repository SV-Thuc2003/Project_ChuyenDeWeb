import React, { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../Services/authService"; // import hàm dùng chung

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: () => void;
}

const StepEmail: React.FC<Props> = ({ email, setEmail, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email); // sử dụng API chung
      toast.success("OTP đã được gửi tới email.");
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gửi OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <InputField
        label="Email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi OTP"}
      </Button>
    </form>
  );
};

export default StepEmail;
