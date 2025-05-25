import React, { useState } from "react";
import Stepper from "../../components/ui/Stepper.tsx";
import RegistrationForm from "../../features/auth/register/RegistrationForm.tsx";
import Illustration from "../../features/auth/register/Illustration.tsx";
import OtpVerification from "../../features/auth/register/OtpInput.tsx";

const steps: string[] = ["Đăng ký", "Xác thực OTP"];

const RegisterPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [email, setEmail] = useState<string>("");

    // Khi đăng ký thành công lấy email
    const handleRegisterSuccess = (registeredEmail: string) => {
        setEmail(registeredEmail);
        setCurrentStep(1);
    };

    // Khi xác thực OTP thành công
    const handleOtpSuccess = () => {
        alert("Đăng ký và xác thực OTP thành công!");
        // Có thể chuyển hướng hoặc reset form ở đây
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Illustration />
            </div>

            <div className="w-full p-6 bg-white rounded-md shadow-md mx-auto flex flex-col items-center">
                {/* Bọc Stepper trong div để set max-width và căn giữa */}
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
