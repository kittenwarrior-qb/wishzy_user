import { z } from "zod";
import { msgSchema, paginationSchema } from "./base.schema";

// Schema cho 1 user
export const userSchema = z.object({
  _id: z.string().optional(),   
  email: z.string().email(),
  fullName: z.string(),
  avatar: z.string().optional(),
  role: z.enum(["admin", "user", "instructor"]),
  dob: z.number().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Response khi lấy danh sách user
export const userListResponseSchema = msgSchema.extend({
  users: z.array(userSchema),
  pagination: paginationSchema,
});

// Response khi lấy profile 1 user
export const userProfileResponseSchema = msgSchema.extend({
  user: userSchema,
});

// Typescript types
export type User = z.infer<typeof userSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
