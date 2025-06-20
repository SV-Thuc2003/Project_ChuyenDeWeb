import React, { useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../Service/authService";
import { useTranslation } from 'react-i18next';

interface Props {
  email: string;
  otp: string;
  onBack: () => void;
}

const StepNewPassword: React.FC<Props> = ({ email, otp, onBack }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.warning(t("auth.fill_all_fields"));
      return;
    }

    if (password !== confirm) {
      toast.warning(t("auth.password_mismatch"));
      return;
    }

    setLoading(true);

    try {
      const message = await resetPassword(email, otp, password);
      toast.success(message || t("auth.reset_success"));
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      console.error("Lỗi:", err);
      toast.error(err?.response?.data?.message || t("auth.reset_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleReset} className="space-y-4">
        <InputField
            label={t("auth.new_password")}
            placeholder={t("auth.enter_new_password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <InputField
            label={t("auth.confirm_password")}
            placeholder={t("auth.retype_password")}
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
        />
        <div className="flex gap-2">
          <Button type="button" onClick={onBack} variant="secondary" className="flex-1">
            {t("common.back")}
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? t("auth.changing") : t("auth.reset_password")}
          </Button>
        </div>
      </form>
  );
};

export default StepNewPassword;
