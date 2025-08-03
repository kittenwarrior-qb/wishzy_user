import { LoginResponse, RegisterResponse } from "@/types/schema/auth.schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const endpoint = "auth";

export const AuthService = {
  login: async (data: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    const res = await fetch(`${apiUrl}/${endpoint}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(errRes.msg);
    }

    const resData = await res.json();
    return resData;
  },
  register: async (data: {
    email: string;
    password: string;
  }): Promise<RegisterResponse> => {
    const res = await fetch(`${apiUrl}/${endpoint}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(errRes.msg);
    }

    const resData = await res.json();
    return resData;
  },
};
