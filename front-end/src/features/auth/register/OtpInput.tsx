import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/ui/InputField.tsx";
import Button from "../../../components/ui/Button.tsx";
import { verifyOtp, resendOtp } from "../../../Service/authService.ts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

interface OptInoutProps {
  email: string;
  onSuccess?: () => void;
}

const OptInout: React.FC<OptInoutProps> = ({ email, onSuccess }) => {
  const [otpCode, setOtpCode] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpCode.trim()) {
      toast.warning(t("otp.enter_warning"));
      return;
    }

    setIsVerifying(true);
    try {
      const data = await verifyOtp({ email, otpCode });
      toast.success(data.message || t("otp.success"));
      if (onSuccess) onSuccess();
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t("otp.failed"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const data = await resendOtp(email);
      const msg = data.message || t("otp.resend_success");
      setResendMessage(msg);
      toast.success(msg);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t("otp.resend_failed"));
    } finally {
      setIsResending(false);
    }
  };

  return (
      <>
        <form
            className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
            onSubmit={handleVerify}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {t("otp.title")}
          </h2>
          <p className="mb-6 text-center text-gray-700">
            {t("otp.instructions")} <strong>{email}</strong>
          </p>

          <InputField
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder={t("otp.placeholder")}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />

          <Button
              type="submit"
              className="w-full mb-4"
              variant="primary"
              disabled={isVerifying}
          >
            {isVerifying ? t("otp.verifying") : t("otp.verify")}
          </Button>

          <div className="text-center">
            <p className="mb-2 text-gray-600">{t("otp.not_received")}</p>
            <Button
                type="button"
                variant="secondary"
                onClick={handleResend}
                className="inline-block px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                disabled={isResending}
            >
              {isResending ? t("otp.resending") : t("otp.resend")}
            </Button>
            {resendMessage && (
                <p className="mt-2 text-sm text-green-600">{resendMessage}</p>
            )}
          </div>
        </form>
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
      </>
  );
};

export default OptInout;
