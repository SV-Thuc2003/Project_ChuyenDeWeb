import React, { useState } from "react";
import Stepper from "../../../components/ui/Stepper";
import StepEmail from "./StepEmail";
import StepOtp from "./StepOtp";
import StepNewPassword from "./StepNewPassword";
import logologin from "../../../assets/logologin.jpg";
import { useTranslation } from 'react-i18next';

const ForgotPassword: React.FC = () => {
    const { t } = useTranslation(); // ✅ đặt ở đây nè

    const steps = [
        t("auth.step_email"),
        t("auth.step_otp"),
        t("auth.step_new_password")
    ];

  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="flex min-h-screen bg-white">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-[800px] flex items-center justify-center">
            <img
              src={logologin}
              alt="Pet illustration"
              className="w-full h-auto  object-contain"
            />
          </div>
        </div>
        <div className="w-full max-w-md p-8 md:p-16 flex flex-col items-center justify-center">
          <div className="w-full max-w-[900px]">
            <Stepper steps={steps} currentStep={currentStep} />
          {currentStep === 0 && (
            <StepEmail
              email={email}
              setEmail={setEmail}
              onSuccess={() => {
                setIsEmailSent(true);
                handleNext();
              }}
            />
          )}
          {currentStep === 1 && (
            <StepOtp
              email={email}
              otp={otp}
              setOtp={setOtp}
              onSuccess={handleNext}
              onBack={handlePrev}
            />
          )}
          {currentStep === 2 && (
            <StepNewPassword email={email} otp={otp} onBack={handlePrev} />
          )}
          </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
