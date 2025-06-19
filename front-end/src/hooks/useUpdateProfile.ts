import { useState } from "react";
import { updateUserProfile } from "../Service/updateUserProfile";
import { UserProfile } from "../types/Profile";
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateProfile = async (userId: number, data: UserProfile) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const message = await updateUserProfile(userId, data);
      toast.success(message || "Cập nhật thành công!");
      setSuccess(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại.";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error, success };
};
