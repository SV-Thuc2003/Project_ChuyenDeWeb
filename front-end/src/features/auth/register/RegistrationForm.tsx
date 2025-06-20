import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/ui/InputField.tsx";
import Button from "../../../components/ui/Button.tsx";
import Checkbox from "../../../components/ui/Checkbox.tsx";
import { RegisterFormData, RegisterFormErrors } from "../../../types/Register.ts";
import { register } from "../../../Service/authService.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

interface RegistrationFormProps {
    onSuccess: (email: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
    const { t } = useTranslation();

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
            newErrors.username = t("auth.errors.username_required");
        }

        if (!formData.name.trim()) {
            newErrors.name = t("auth.errors.fullname_required");
        }

        if (!formData.email.trim()) {
            newErrors.email = t("auth.errors.email_required");
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t("auth.errors.email_invalid");
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t("auth.errors.phone_required");
        } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))) {
            newErrors.phone = t("auth.errors.phone_invalid");
        }

        if (!formData.password) {
            newErrors.password = t("auth.errors.password_required");
        } else if (formData.password.length < 6) {
            newErrors.password = t("auth.errors.password_short");
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t("auth.errors.password_mismatch");
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = t("auth.errors.terms_required");
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
            onSuccess(formData.email);
        } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message || t("auth.errors.registration_failed"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[700px] ml-4">
            <h1 className="text-3xl mb-6">{t("auth.register_title")}</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3 p-3">
                    <InputField
                        label={t("auth.username")}
                        placeholder={t("auth.username_placeholder")}
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        required
                    />

                    <InputField
                        label={t("auth.fullname")}
                        placeholder={t("auth.fullname_placeholder")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />

                    <InputField
                        label={t("auth.email")}
                        placeholder={t("auth.email_placeholder")}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />

                    <InputField
                        label={t("auth.phone")}
                        placeholder={t("auth.phone_placeholder")}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                    />

                    <InputField
                        label={t("auth.password")}
                        placeholder={t("auth.password_placeholder")}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />

                    <InputField
                        label={t("auth.confirm_password")}
                        placeholder={t("auth.confirm_password_placeholder")}
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                    />

                    <div className="mt-4 mb-6">
                        <Checkbox
                            label={t("auth.terms_agree")}
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
                        {isLoading ? t("common.processing") : t("auth.register")}
                    </Button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-lg text-black">
                    {t("auth.already_have_account")}{" "}
                    <Link to="/login" className="text-[#3b63f3] hover:underline">
                        {t("auth.login_redirect")}
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
