import {
  userProfileResponseSchema,
  UserProfileResponse,
} from "@/types/schema/user.schema";
import { useAuthStore } from "@/store/slices/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const UserService = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const { token } = useAuthStore.getState();

    const res = await fetch(`${apiUrl}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();

    return userProfileResponseSchema.parse(data);
  },

  // Cập nhật thông tin cá nhân
  updateProfile: async (payload: {
    fullName: string;
    phone: string;
    dob?: number; 
    gender: string;
  }): Promise<UserProfileResponse> => {
    const { token } = useAuthStore.getState();
    const body = {
      ...payload,
      dob: payload.dob ? payload.dob : undefined,
    };

    const res = await fetch(`${apiUrl}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to update profile");

    const data = await res.json();

    return userProfileResponseSchema.parse(data);
  },
};
