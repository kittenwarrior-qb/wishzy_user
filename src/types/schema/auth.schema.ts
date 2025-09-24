import { z } from "zod";
import { msgSchema } from "./base.schema";

const userSchema = z.object({
  _id: z.string(),
  email: z.string(),
  fullName: z.string(),
  role: z.enum(["admin", "user", "instructor"]),
});

export const loginSuccessResponseSchema = msgSchema.extend({
  accessToken: z.string(),
  user: userSchema,
});

export const loginFormSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(3, "Mật khẩu phải ít nhất 3 ký tự"),
});

export const registerFormSchema = z
  .object({
    fullName: z.string("Vui lòng nhập họ tên").min(1, "Vui lòng nhập họ tên"),
    email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu")
      .min(3, "Mật khẩu phải ít nhất 3 ký tự"),
    "confirm-password": z.string("Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data["confirm-password"], {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm-password"],
  });

export const loginResponseSchema = z.union([
  msgSchema,
  loginSuccessResponseSchema,
]);

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterResponse = z.infer<typeof msgSchema>;
export type User = z.infer<typeof userSchema>;
