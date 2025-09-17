'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/shared/animated-link";
import ThemeToggle from "@/components/shared/theme-toggle";
import Logo from "@/assets/wishzy-logo.png";
import { SearchInput } from "@/components/shared/header-search-input";
import { Menu, X } from "lucide-react";

const categories = ["Math", "Science", "English", "History", "Programming"];

export const GuestHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-[70px] px-4 xl:px-0">
        {/* Logo + Desktop Categories */}
        <div className="flex items-center gap-4 relative">
          <AnimatedLink href="/">
            <Image src={Logo.src || Logo} alt="Logo" width={120} height={40} />
          </AnimatedLink>

          {/* Desktop Categories */}
          <div
            className="hidden md:block relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Button variant="outline" className="flex items-center gap-2">
              Categories
            </Button>
            {dropdownOpen && (
              <ul className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-base-300 z-50">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <AnimatedLink
                      href={`/categories/${cat.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-neutral/10"
                    >
                      {cat}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <SearchInput />
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" href="/login">
            Login
          </Button>
          <Button variant="default" href="/register">
            Register
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300 px-4 py-2">
          <ul className="flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <li key={idx}>
                <AnimatedLink
                  href={`/categories/${cat.toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-neutral/10"
                >
                  {cat}
                </AnimatedLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 mt-2">
            <SearchInput />
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
