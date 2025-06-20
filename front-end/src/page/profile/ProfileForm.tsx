import React, { useState } from "react";
import { UserProfile } from "../../types/Profile";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { CgProfile } from "react-icons/cg";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { useTranslation } from "react-i18next";

interface ProfileFormProps {
  userId: number;
  initialProfile: UserProfile;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
                                                   userId,
                                                   initialProfile,
                                                 }) => {
  const { t } = useTranslation();
  const { updateProfile, loading } = useUpdateProfile();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<
      Partial<Record<keyof UserProfile, string>>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof UserProfile]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserProfile, string>> = {};

    if (!profile.name.trim()) newErrors.name = t("profile.errors.nameRequired");
    if (!profile.phone.trim()) newErrors.phone = t("profile.errors.phoneRequired");
    if (!profile.address?.trim()) newErrors.address = t("profile.errors.addressRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateProfile(userId, profile);
  };

  return (
      <div className="bg-[#f8f9fa] p-8 rounded-2xl">
        <div className="flex items-center mb-8">
          <div className="w-[68px] h-[68px] bg-[#fd7e14] rounded-full flex items-center justify-center">
            <CgProfile className="w-[40px] h-[40px]" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-medium">{profile.name}</h2>
            <p className="text-gray-500">{profile.phone}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InputField
                label={t("profile.fields.name")}
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder={t("profile.placeholders.name")}
                error={errors.name}
            />

            <InputField
                label={t("profile.fields.phone")}
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder={t("profile.placeholders.phone")}
                error={errors.phone}
            />

            <div className="md:col-span-2">
              <InputField
                  label={t("profile.fields.address")}
                  name="address"
                  value={profile.address ?? ""}
                  onChange={handleInputChange}
                  placeholder={t("profile.placeholders.address")}
                  error={errors.address}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" variant="primary" className="px-8 py-2" disabled={loading}>
              {loading ? t("profile.saving") : t("profile.save")}
            </Button>
          </div>
        </form>
      </div>
  );
};

export default ProfileForm;
