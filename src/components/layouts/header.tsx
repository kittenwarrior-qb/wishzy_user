'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/shared/animated-link";
import Logo from "@/assets/wishzy-logo.png";
import { SearchInput } from "@/components/shared/header-search-input";
import { Menu, X } from "lucide-react";
import CartIcon from "@/components/cart/CartIcon";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-[70px] px-4 xl:px-0">
        <div className="flex items-center gap-4 relative">
          <AnimatedLink href="/">
            <Image src={Logo.src || Logo} alt="Logo" width={120} height={40} />
          </AnimatedLink>

          <div className="hidden md:block">
            <SearchInput />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <CartIcon />
          <Button variant="outline" href="/login">
            Login
          </Button>
          <Button variant="default" href="/register">
            Register
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <CartIcon />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300 px-4 py-2">
          <div className="flex flex-col gap-2 mt-2">
            <SearchInput />
            <div className="py-2">
              <CartIcon />
            </div>
            <Button variant="outline" href="/login">
              Login
            </Button>
            <Button variant="default" href="/register">
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
