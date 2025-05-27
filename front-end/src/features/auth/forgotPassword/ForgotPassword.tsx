import React, { useState } from "react";
import Stepper from "../../../components/ui/Stepper";
import StepEmail from "./StepEmail";
import StepOtp from "./StepOtp";
import StepNewPassword from "./StepNewPassword";

const steps = ["Nhập Email", "Nhập OTP", "Mật khẩu mới"];

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="max-w-md mx-auto">
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
        <StepNewPassword
          email={email}
          otp={otp}
          onBack={handlePrev}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
