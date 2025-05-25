import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa"; // đổi icon cho Facebook cho đúng nhé

interface SocialLoginProps {
  className?: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ className = "" }) => {
  // URL backend để bắt đầu OAuth2 flow
  const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";
  const FACEBOOK_AUTH_URL = "http://localhost:8080/oauth2/authorization/facebook";

  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-1 text-[16px] font-medium text-black">
          Hoặc
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <a
          href={GOOGLE_AUTH_URL}
          className="flex items-center justify-center h-10 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="ml-3 text-lg font-medium">Đăng nhập với Google</span>
        </a>

        <a
          href={FACEBOOK_AUTH_URL}
          className="flex items-center justify-center h-10 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <FaFacebookF className="w-5 h-5" />
          <span className="ml-3 text-lg font-medium">Đăng nhập với Facebook</span>
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
