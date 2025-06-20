import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Stepper from "../../components/ui/Stepper";
import RegistrationForm from "../../features/auth/register/RegistrationForm";
import Illustration from "../../features/auth/register/Illustration";
import OtpVerification from "../../features/auth/register/OtpInput";

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [email, setEmail] = useState<string>("");

    const steps = [t("auth.steps.register"), t("auth.steps.verify")];

    const handleRegisterSuccess = (registeredEmail: string) => {
        setEmail(registeredEmail);
        setCurrentStep(1);
    };

    const handleOtpSuccess = () => {
        alert(t("auth.register.success")); // Đăng ký và xác thực OTP thành công!
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Illustration />
            </div>

            <div className="w-full p-6 bg-white rounded-md shadow-md mx-auto flex flex-col items-center">
                <div className="w-full max-w-md mb-6">
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>

                {currentStep === 0 && (
                    <RegistrationForm onSuccess={handleRegisterSuccess} />
                )}

                {currentStep === 1 && (
                    <OtpVerification email={email} onSuccess={handleOtpSuccess} />
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
