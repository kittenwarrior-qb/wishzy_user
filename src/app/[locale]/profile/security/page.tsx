"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Smartphone, Monitor } from "lucide-react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const loginHistory = [
  { date: "25/08/2025 10:23 AM", ip: "192.168.1.1" },
  { date: "24/08/2025 08:15 PM", ip: "192.168.1.2" },
  { date: "23/08/2025 02:45 PM", ip: "192.168.1.3" },
];

const recentDevices = [
  { device: "Laptop Windows 10", location: "Hà Nội", lastActive: "25/08/2025 10:23 AM" },
  { device: "iPhone 14", location: "Hồ Chí Minh", lastActive: "24/08/2025 08:15 PM" },
];

const alerts = [
  { type: "warning", message: "Có đăng nhập bất thường từ địa chỉ IP 192.168.1.100" },
];

export default function ProfileSecurity() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Đổi mật khẩu thành công!");
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Đổi mật khẩu thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold ">Bảo mật tài khoản</h1>
        <p className=" mt-1">
          Quản lý mật khẩu, bật xác thực hai yếu tố và kiểm tra lịch sử đăng nhập.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" rounded-xl shadow shadow-white p-2 transition flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Đổi mật khẩu</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu hiện tại" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu mới" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Xác nhận mật khẩu mới" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                variant="default"
                type="submit"
                className="w-full py-2 flex items-center gap-1"
                disabled={isLoading}
              >
                {isLoading ? "Đang cập nhật..." : "Lưu mật khẩu mới"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="shadow-white rounded-xl shadow p-2 transition flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Xác thực hai yếu tố (2FA)</h2>
            <p className="mb-4">Thêm lớp bảo mật cho tài khoản bằng cách bật 2FA.</p>
          </div>
          <Button className="mt-auto w-full flex items-center gap-1 py-2 rounded-lg shadow transition">
            Bật 2FA
          </Button>
        </div>

        <div className="rounded-xl shadow-white shadow p-2 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Lịch sử đăng nhập</h2>
          <div className="space-y-2 max-h-60 overflow-auto">
            {loginHistory.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm px-2 py-1 rounded hover:bg-gray-50"
              >
                <span>{item.date}</span>
                <span>IP: {item.ip}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-3 w-full py-2 flex items-center gap-1">
            Xem tất cả
          </Button>
        </div>

        <div className="rounded-xl shadow p-2 shadow-white transition col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Thiết bị đăng nhập gần đây</h2>
          <div className="space-y-2">
            {recentDevices.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm px-2 py-2 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <Monitor size={16} />
                  <span>{item.device}</span>
                </div>
                <span className="text-xs ">{item.lastActive}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl shadow p-2 shadow-white transition col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <AlertCircle /> Cảnh báo bảo mật
          </h2>
          <div className="space-y-2">
            {alerts.map((item, idx) => (
              <div
                key={idx}
                className="bg-yellow-50 text-yellow-800 px-3 py-2 rounded flex items-center gap-2 text-sm"
              >
                <AlertCircle size={16} />
                {item.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
