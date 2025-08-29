"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  Home,
  BookOpen,
  Settings,
  CreditCard,
  Shield,
  Heart,
  Menu,
  X,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Avatar from "@/assets/cv1.jpg";
import { useState } from "react";

const studentMenu = [
  { label: "Tổng quan", icon: Home, href: "/profile" },
  { label: "Khóa học của tôi", icon: BookOpen, href: "/profile/courses" },
  { label: "Yêu thích", icon: Heart, href: "/profile/favorites" },
  { label: "Lịch sử thanh toán", icon: CreditCard, href: "/profile/payments" },
  { label: "Bảo mật", icon: Shield, href: "/profile/security" },
  { label: "Cài đặt", icon: Settings, href: "/profile/settings" },
];

interface MenuProfileProps {
  variant: "sidebar" | "mobile";
}

export default function MenuProfile({ variant }: MenuProfileProps) {
  const segment = useSelectedLayoutSegment();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/profile") return segment === null;
    return segment ? href.includes(segment) : false;
  };

  if (variant === "mobile") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 shadow-md overflow-x-auto md:hidden z-40">
        <div className="flex py-2 px-1 space-x-2 min-w-max">
          {studentMenu.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={idx} href={item.href} className="min-w-[60px]">
                {active ? (
                  <Button
                    variant="default"
                    className="flex flex-col items-center justify-center w-full py-2"
                  >
                    <Icon size={22} />
                    <span className="mt-0.5 text-xs">{item.label}</span>
                  </Button>
                ) : (
                  <div className="flex flex-col items-center justify-center px-3 py-1 rounded-lg text-gray-500 hover:text-blue-500 transition">
                    <Icon size={22} />
                    <span className="mt-0.5 text-xs">{item.label}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-6 left-4 md:flex lg:hidden z-50">
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <Menu size={24} />
        </Button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </Button>
        </div>
        <MenuProfileContent />
      </aside>

      <div className="hidden lg:flex w-72 flex-col">
        <MenuProfileContent />
      </div>
    </>
  );
}

function MenuProfileContent() {
  const segment = useSelectedLayoutSegment();
  const isActive = (href: string) => {
    if (href === "/profile") return segment === null;
    return segment ? href.includes(segment) : false;
  };

  return (
    <aside className="flex flex-col shadow-sm h-screen border-r border-white sticky top-0">
      <div className="flex items-center gap-3 p-6 pt-0">
        <Image
          src={Avatar.src || Avatar}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full border border-gray-300 object-cover"
        />
        <div>
          <h2 className="font-semibold flex items-center gap-1">
            Hồ Văn Duy
            <span className=" bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow">
              <BadgeCheck size={12} className="mr-1" /> Verified
            </span>
          </h2>
          <p className="text-sm ">Học viên</p>
        </div>
      </div>

      <ul className="space-y-2 flex-1 overflow-y-auto px-6 hide-scrollbar py-4">
        {studentMenu.map((item, idx) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={idx}>
              <Link href={item.href}>
                {active ? (
                  <Button
                    variant="default"
                    className="flex items-center gap-3 w-full justify-start py-3"
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition shadow-sm shadow-white cursor-pointer hover:bg-gray-50">
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
