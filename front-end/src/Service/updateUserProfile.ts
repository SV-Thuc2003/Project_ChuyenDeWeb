import axiosInstance from "./axios";
import { UserProfile } from "../types/Profile";

/* GET: lấy thông tin người dùng */
export const fetchUserProfile = async (userId: number): Promise<UserProfile> => {
  const res = await axiosInstance.get<UserProfile>(`/auth/profile/${userId}`);
  return res.data;
};

/* PUT: cập nhật thông tin */
export const updateUserProfile = async (
  userId: number,
  data: UserProfile
): Promise<string> => {
  const res = await axiosInstance.put<string>(`/auth/profile/${userId}`, data);
  return res.data; // "Cập nhật thông tin thành công"
};
