import React from 'react';
import { useTranslation } from 'react-i18next';
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";

const ContactDetails: React.FC = () => {
  const { t } = useTranslation();

  return (
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-black">
          {t('contact.details.title')}
        </h2>

        <p className="text-lg text-gray-800">
          {t('contact.details.subtitle')}
        </p>

        <div className="space-y-6">
          {/* Address */}
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-[#fd7e14] bg-opacity-20 flex items-center justify-center mr-4">
              <CiLocationOn className="w-6 h-6" />
            </div>
            <p className="text-xl font-medium leading-relaxed">
              {t('contact.details.address')}
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#fd7e14] flex items-center justify-center mr-4">
              <MdOutlineEmail className="w-6 h-6" />
            </div>
            <p className="text-lg font-semibold">
              {t('contact.details.email')}
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#fd7e14] flex items-center justify-center mr-4">
              <HiOutlinePhone className="w-5 h-5" />
            </div>
            <p className="text-lg font-bold">
              {t('contact.details.phone')}
            </p>
          </div>

          {/* Hours */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#fd7e14] bg-opacity-20 flex items-center justify-center mr-4">
              <IoTimeOutline className="w-6 h-6" />
            </div>
            <p className="text-lg font-semibold">
              {t('contact.details.hours')}
            </p>
          </div>
        </div>
      </div>
  );
};

export default ContactDetails;
