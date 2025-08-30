"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Gửi thông tin thành công!");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-7 py-10 w-full">
      <div className="flex flex-col w-full max-w-[1280px] items-center gap-10">
        <h2 className="font-semibold text-2xl md:text-3xl">
          Liên hệ với chúng tôi
        </h2>

        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8">
          {/* Left info */}
          <div className="flex flex-col w-full lg:w-1/2 gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-gray-700" />
                <p className="text-base font-medium">
                  Địa chỉ văn phòng: 67/2 Phan Đăng Lưu, Q.Bình Thạnh, TP. Hồ
                  Chí Minh
                </p>
              </div>

              <div className="flex items-center gap-3 ml-[4px]">
                <Phone className="w-5 h-5 text-gray-700" />
                <p className="text-base font-medium">
                  Hotline: +84 9-231-1234
                </p>
              </div>
            </div>

            <div className="w-full h-[259px]  rounded-lg overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                alt="Map location"
                src="https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png"
                height={250}
                width={600}
              />
            </div>
          </div>

          {/* Right form */}
          <Card className="w-full lg:w-1/2 border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
              >
                <Input
                  className="h-14 px-5  rounded-xl text-base"
                  placeholder="Tên"
                />

                <Input
                  className="h-14 px-5  rounded-xl text-base"
                  placeholder="Email"
                  type="email"
                />

                <Textarea
                  className="h-28 px-5  rounded-xl text-base resize-none"
                  placeholder="Nội dung"
                />

                <Button
                  variant={'default'}
                  type="submit"
                  className="h-12 w-full font-medium"
                >
                  Gửi
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
