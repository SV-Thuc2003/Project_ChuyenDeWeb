import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logologin from "../../assets/logologin.jpg";
import Header from "../../components/common/Header";
import LoginForm from "../../features/auth/login/LoginForm.tsx";
import SocialLogin from "../../features/auth/login/SocialLogin.tsx";

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-[800px] flex items-center justify-center">
                    <img
                        src={logologin}
                        alt={t("auth.loginIllustrationAlt")}
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            <div className="w-full p-8 md:p-16 flex items-center justify-center">
                <div className="w-full max-w-[700px]">
                    <Header title={t("auth.loginTitle")} className="mb-8" />

                    <LoginForm />

                    <SocialLogin />

                    <div className="mt-10 text-center">
                        <p className="text-lg font-medium">
                            {t("auth.noAccount")}{" "}
                            <button
                                className="text-[#3b63f3] hover:underline"
                                onClick={() => navigate("/register")}
                            >
                                {t("auth.registerLink")}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
