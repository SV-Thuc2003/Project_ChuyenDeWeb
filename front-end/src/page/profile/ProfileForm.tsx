// src/components/profile/ProfileForm.tsx
import React, { useState } from "react";
import { UserProfile } from "../../types/Profile";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { CgProfile } from "react-icons/cg";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

interface ProfileFormProps {
  userId: number;                  // <-- nhận userId để call API
  initialProfile: UserProfile;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  userId,
  initialProfile,
}) => {
  const { updateProfile, loading } = useUpdateProfile();

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserProfile, string>>
  >({});

  /* ---------- HANDLE INPUT ---------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));

    // Clear lỗi realtime
    if (errors[name as keyof UserProfile]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ---------- VALIDATE ---------- */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserProfile, string>> = {};

    if (!profile.name.trim()) newErrors.name = "Họ tên không được để trống";
    if (!profile.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    if (!profile.address?.trim()) newErrors.address = "Địa chỉ không được để trống";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateProfile(userId, profile);          // <-- call API
  };

  return (
    <div className="bg-[#f8f9fa] p-8 rounded-2xl">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="w-[68px] h-[68px] bg-[#fd7e14] rounded-full flex items-center justify-center">
          <CgProfile className="w-[40px] h-[40px]" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-medium">{profile.name}</h2>
          <p className="text-gray-500">{profile.phone}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <InputField
            label="Họ tên"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Họ và tên"
            error={errors.name}
          />

          <InputField
            label="Số điện thoại"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            placeholder="Số điện thoại"
            error={errors.phone}
          />

          <div className="md:col-span-2">
            <InputField
              label="Địa chỉ"
              name="address"
              value={profile.address ?? ""}
              onChange={handleInputChange}
              placeholder="Địa chỉ"
              error={errors.address}
            />
          </div>
        </div>

        <div className="mt-8">
          <Button type="submit" variant="primary" className="px-8 py-2" disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
