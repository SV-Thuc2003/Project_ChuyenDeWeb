import React, { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { verifyOtpResetPassword } from "../../../Service/authService";
import { useTranslation } from "react-i18next";

interface Props {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  onSuccess: () => void;
  onBack: () => void;
}

const StepOtp: React.FC<Props> = ({ email, otp, setOtp, onSuccess, onBack }) => {
  const [verifying, setVerifying] = useState(false);
  const { t } = useTranslation();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    try {
      await verifyOtpResetPassword({ email, otpCode: otp });
      toast.success(t("auth.otp_verify_success"));
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("auth.otp_verify_failed"));
    } finally {
      setVerifying(false);
    }
  };

  return (
      <form onSubmit={handleVerify} className="space-y-4">
        <InputField
            label={t("auth.otp")}
            placeholder={t("auth.enter_otp")}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
        />
        <div className="flex gap-2">
          <Button type="button" onClick={onBack} variant="secondary" className="flex-1">
            {t("common.back")}
          </Button>
          <Button type="submit" className="flex-1" disabled={verifying}>
            {verifying ? t("auth.verifying") : t("auth.verify")}
          </Button>
        </div>
      </form>
  );
};

export default StepOtp;
