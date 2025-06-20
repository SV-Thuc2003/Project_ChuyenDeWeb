import React, { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../Service/authService"; // import hàm dùng chung
import { useTranslation } from 'react-i18next';

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: () => void;
}

const StepEmail: React.FC<Props> = ({ email, setEmail, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email); // sử dụng API chung
      toast.success(t("auth.otp_sent"));
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t("auth.otp_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <InputField
          label={t("auth.email")}
          placeholder={t("auth.enter_email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t("auth.sending") : t("auth.send_otp")}
      </Button>
    </form>
  );
};

export default StepEmail;
