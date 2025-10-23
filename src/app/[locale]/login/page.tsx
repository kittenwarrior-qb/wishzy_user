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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Chrome, Facebook, Github } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/slices/auth";
import { loginFormSchema } from "@/types/schema/auth.schema";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/slices/cart";

const socialLoginButtons = [
  {
    id: "github-facebook-row",
    buttons: [
      {
        icon: Github,
        text: "Đăng nhập với Github",
        className: "flex-1",
      },
      {
        icon: Facebook,
        text: "Đăng nhập với Facebook",
        className: "flex-1",
      },
    ],
  },
  {
    id: "google-row",
    buttons: [
      {
        icon: Chrome,
        text: "Đăng nhập với Google",
        className: "w-full",
      },
    ],
  },
];

const LoginPage = () => {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const locale = (pathname?.split('/')?.[1] || 'vi');
  const { items: cartItems } = useCartStore();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setIsLoadind(true);
    try {
      const res = await AuthService.login(data);
      if ("accessToken" in res && "user" in res) {
        setAuth(res.accessToken, res.user);
        toast.success("Thông báo", {
          description: res.msg,
          duration: 2000,
          className: "mt-8",
        });
        form.reset();
        // Decide destination based on cart existence
        let hasItems = (cartItems?.length || 0) > 0;
        if (!hasItems) {
          try {
            const raw = localStorage.getItem('wishzy-cart-storage');
            if (raw) {
              const parsed = JSON.parse(raw);
              const persistedItems = parsed?.state?.items;
              if (Array.isArray(persistedItems) && persistedItems.length > 0) {
                hasItems = true;
              }
            }
          } catch {}
        }

        const target = hasItems ? `/${locale}/cart` : `/${locale}`;
        router.replace(target);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Thông báo", {
        description: error.message,
        duration: 2000,
        className: "mt-8",
      });
    } finally {
      setIsLoadind(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <div className="flex w-full max-w-[1280px] items-center justify-between gap-8 relative px-4">
        <Image
          className="relative w-[570px] h-[316px] aspect-[1.81] object-cover"
          alt="Login illustration"
          src="/image_auth.png"
          width={570}
          height={316}
        />

        <div className="flex flex-col w-full max-w-[635px] items-center gap-5 relative">
          <div className="relative w-fit mt-[-1.00px] font-bold text-black text-sm text-center tracking-[0] leading-[21px]">
            Xin chào bạn đã đến với Wishzy
            <br />
            Đăng nhập vào tài khoản ngay để vào học nào
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-[7px] relative self-stretch w-full flex-[0_0_auto]">
                    <FormLabel className="relative self-stretch mt-[-1.00px] font-bold text-black text-xs tracking-[0] leading-[18px]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="relative self-stretch w-full h-11 bg-[#ffffff] rounded-lg border border-solid border-gray-300"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-[7px] relative self-stretch w-full flex-[0_0_auto]">
                    <FormLabel className="relative self-stretch mt-[-1.00px] font-bold text-black text-xs tracking-[0] leading-[18px]">
                      Mật khẩu người dùng
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="relative self-stretch w-full h-11 bg-[#ffffff] rounded-lg border border-solid border-gray-300"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] mt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-12 items-center justify-center px-[11px] py-0 relative self-stretch w-full bg-[#FFA500] hover:bg-[#e55a0d] rounded-[15px] overflow-hidden border-0"
                >
                  <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                      {isLoading ? "Đang đăng nhập..." : "Đăng nhập ngay"}
                    </div>
                  </div>
                </Button>

                {socialLoginButtons.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center gap-2 self-stretch w-full relative flex-[0_0_auto]"
                  >
                    {row.buttons.map((button, index) => {
                      const IconComponent = button.icon;
                      return (
                        <Button
                          key={`${row.id}-${index}`}
                          type="button"
                          className={`flex h-12 items-center justify-center px-[11px] py-0 relative ${button.className} bg-[#ffffff] rounded-[15px] overflow-hidden border border-solid border-gray-300 hover:bg-gray-50`}
                          variant="outline"
                        >
                          <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                            <IconComponent className="relative w-6 h-6" />
                            <div className="relative w-fit mt-[-1.00px] font-bold text-black text-base tracking-[0] leading-6 whitespace-nowrap">
                              {button.text}
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                ))}

                <div className="text-center w-full mt-4">
                  <span className="text-sm text-gray-600">Chưa có tài khoản? </span>
                  <Link href={`/${locale}/register`} className="text-sm text-[#FFA500] hover:underline font-semibold">
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
