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
import googleIcon from "@/assets/google-icon.png";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/slices/auth";
import { loginFormSchema } from "@/types/schema/auth.schema";
import { useRouter } from "next/navigation";

const items: {
  label: string;
  name: "email" | "password";
  placeholer: string;
}[] = [
  { label: "Email", name: "email", placeholer: "abc@gmail.com" },
  {
    label: "Mật khẩu",
    name: "password",
    placeholer: "Nhập vào mật khẩu của bạn",
  },
];

const LoginPage = () => {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();
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
        router.push("/");
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
    <div className="min-h-[500px]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 py-20">
        <div>Trai</div>
        <div className="flex justify-center">
          <div className="w-[450px]">
            <div className="mb-5">
              <h1 className="font-semibold text-xl text-center">
                Xin chào bạn hiền
              </h1>
              <p className="text-center">Đăng nhập vào tài khoản ngay</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {items.map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className="mb-5">
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            type={
                              item.name === "password" ? "password" : "text"
                            }
                            className="rounded-md py-5 border-primary"
                            placeholder={item.placeholer}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" className="w-full mb-5">
                  Đăng nhập ngay
                </Button>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <Button type="submit" variant={"outline"}>
                    Đăng nhập với Github
                    <Image
                      src={googleIcon}
                      alt="google-icon"
                      className="!w-5 h-5"
                      width={52}
                      height={52}
                    />
                  </Button>
                  <Button type="submit" variant={"outline"}>
                    Đăng nhập với Facebook
                    <Image
                      src={googleIcon}
                      alt="google-icon"
                      className="!w-5 h-5"
                      width={52}
                      height={52}
                    />
                  </Button>
                </div>
                <Button type="button" variant={"outline"} className="w-full">
                  Đăng nhập với Google
                  <Image
                    src={googleIcon}
                    alt="google-icon"
                    className="!w-7 h-7"
                    width={28}
                    height={28}
                  />
                </Button>
              </form>
            </Form>
            <p className="text-center text-sm mt-4">
              Bạn chưa có tài khoản? Đăng ký ngay{" "}
              <Link
                className="underline text-primary font-semibold"
                href={"/register"}
              >
                tại đây
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
