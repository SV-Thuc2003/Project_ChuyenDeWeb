import React, { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { verifyOtpResetPassword } from "../../../Services/authService";

interface Props {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  onSuccess: () => void;
  onBack: () => void;
}

const StepOtp: React.FC<Props> = ({ email, otp, setOtp, onSuccess, onBack }) => {
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  setVerifying(true);
  try {
    // Gọi API kiểm tra OTP thật sự
    await verifyOtpResetPassword({ email, otpCode: otp });
    toast.success("Xác minh OTP thành công");
    onSuccess();  // Chỉ gọi khi OTP đúng
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Xác minh OTP thất bại.");
  } finally {
    setVerifying(false);
  }
};

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <InputField
        label="Mã OTP"
        placeholder="Nhập mã OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <Button type="button" onClick={onBack} variant="secondary" className="flex-1">
          Quay lại
        </Button>
        <Button type="submit" className="flex-1" disabled={verifying}>
          {verifying ? "Đang xác minh..." : "Xác minh"}
        </Button>
      </div>
    </form>
  );
};

export default StepOtp;
