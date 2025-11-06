import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "admin" | "user" | "instructor";

type User = {
  _id: string;
  email: string;
  fullName: string;
  role: Role;
} | null;

type AuthStore = {
  token: string | null;
  user: User;
  setAuth: (token: string | null, user: User) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token: string | null, user: User) => {
        set({ token, user });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
