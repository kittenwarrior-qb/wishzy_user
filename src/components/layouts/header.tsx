"use client"
import { HoverLink } from "@/components/ui/hoverlink";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import Logo from "@/assets/wishzy-logo.png";
import Image from "next/image";
import { useScrollTop } from "@/hooks/ui/useScrollTop";
import { Menu, Heart, ShoppingCart } from "lucide-react";
import {useTranslations} from 'next-intl';
import SubHeader from "./subheader";

const Header = () => {
  const t = useTranslations('HomePage');
  const isAtTop = useScrollTop();

  return (
    <div className=" sticky top-0 z-50">
    <header className="border-b border-gray-400 bg-white transition-all duration-300 px-4 xl:px-0">
      <div className={`max-w-[1280px] mx-auto flex justify-between items-center transition-all duration-300 h-[80px] ${isAtTop ? "lg:h-[125px]" : "lg:h-[80px]"}`}>
        <div className="lg:hidden md:min-w-[180px] lg:min-w-0  min-w-[150px]">
          <Menu className="lg:hidden" />
        </div>
        <ul className="hidden lg:flex min-w-[400px] text-[14px] justify-between gap-4">
          <li><HoverLink className="!pl-0" href="/">{t('Navigation.home')}</HoverLink></li>
          <li><HoverLink href="/">{t('Navigation.courses')}</HoverLink></li>
          <li><HoverLink href="/">{t('Navigation.categories')}</HoverLink></li>
          <li><HoverLink href="/">{t('Navigation.practice')}</HoverLink></li>
          
        </ul>

        <div className="transition-all duration-300">
          <Link href={'/'}>
          <Image
            src={Logo.src ? Logo.src : Logo}
            alt="Wishzy Logo"
            width={isAtTop ? 250 : 130}
            height={isAtTop ? 88 : 46}
            className="transition-all duration-300 hidden lg:flex"
          />
          <Image
            src={Logo.src ? Logo.src : Logo}
            alt="Wishzy Logo"
            width={130}
            height={46}
            className="transition-all duration-300 lg:hidden"
          />
          </Link>
        </div>

        <div className="flex min-w-[200px] lg:min-w-[400px] justify-end md:justify-between text-[14px]">
          <ul className="lg:flex hidden gap-4 items-center">
            <li><HoverLink href="/">Chứng chỉ</HoverLink></li>
            <li><HoverLink href="/">Bài thi</HoverLink></li>
          </ul>
          <div className="">
            <div className="flex gap-5 md:hidden ">
              <Heart/>
              <ShoppingCart/>
            </div>
            <div className="items-center gap-2 hidden md:flex">
              <Button variant={"threeD"} className="border border-primary text-primary bg-white " href="/login">Đăng nhập</Button>
              <Button variant={"threeD"} className="" href="/register">Đăng ký</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <SubHeader/>
    </div>
  )
}

export default Header;
