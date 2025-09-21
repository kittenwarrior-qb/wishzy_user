"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  Home,
  BookOpen,
  Settings,
  CreditCard,
  Shield,
  Heart,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/wishzy-logo.png";
import { Button } from "@/components/ui/button";
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
  variant: "sidebar" | "mobile" | "toggle";
}

export default function MenuProfile({ variant }: MenuProfileProps) {
  const segment = useSelectedLayoutSegment();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/profile") return segment === null;
    return segment ? href.includes(segment) : false;
  };

  if (variant === "toggle") {
    return (
      <>
        <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
          <Menu size={22} />
        </Button>

        <div
          className={`fixed inset-0 z-40 transition-opacity lg:hidden ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        <aside
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg p-6 z-50 transform transition-transform lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between p-4">
            <div className="logo mb-8 ">
                <Image src={Logo.src || Logo} alt="Wishzy Logo" width={120} height={40} />
            </div>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          <MenuProfileContent />
        </aside>
      </>
    );
  }


  if (variant === "mobile") {
    return (
      <div className="fixed bottom-[-1] left-0 right-0 bg-amber-50 py-2 shadow-md overflow-x-auto md:hidden z-40">
        <div className="flex py-2 px-1 m-2 space-x-6 min-h-[60px] min-w-max relative">
          {studentMenu.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={idx} href={item.href}>
                <div className="flex flex-col items-center relative">
                  {active ? (
                    <Button
                      variant="default"
                      className="rounded-full w-14 h-14 bg-amber-500 -translate-y-3 shadow-lg scale-110 transition-all duration-300 flex items-center justify-center"
                    >
                      <Icon size={26} className="text-white size-8" />
                    </Button>
                  ) : (
                    <>
                      <Icon size={22} className="text-amber-500 font-semibold" />
                      <span className="mt-0.5 text-xs text-amber-500 font-medium">
                        {item.label}
                      </span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-16 left-4 md:flex lg:hidden z-50">
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <Menu size={24} />
        </Button>
      </div>

      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity lg:hidden ${
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
    <aside className="flex flex-col border-r border-white sticky top-0">
      <ul className="space-y-2 flex-1 overflow-y-auto border-none pr-6 hide-scrollbar py-4">
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
