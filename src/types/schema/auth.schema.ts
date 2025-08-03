import z from "zod";
import { msgSchema } from "./base.schema";

export const loginSuccessResponseSchema = msgSchema.extend({
  accessToken: z.string(),
  user: z.object({
    _id: z.string(),
    email: z.string(),
    fullName: z.string(),
    role: z.enum(["admin", "user", "instructor"]),
  }),
});

export const loginFormSchema = z.object({
  email: z.string("Vui lòng không bỏ trống email").email("Email không hợp lệ"),
  password: z
    .string("Vui lòng không bỏ trống mật khẩu")
    .min(3, "Mật khẩu phải ít nhất 6 ký tự"),
});

export const loginResponseSchema = z.union([
  msgSchema,
  loginSuccessResponseSchema,
]);

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type RegisterResponse = z.infer<typeof msgSchema>;
