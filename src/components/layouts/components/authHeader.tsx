'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/shared/animated-link";
import ThemeToggle from "@/components/shared/theme-toggle";
import Logo from "@/assets/wishzy-logo.png";

const categories = ["Math", "Science", "English", "History", "Programming"];

interface AuthHeaderProps {
  user: {
    fullName: string;
    avatarUrl: string;
  };
}
export const AuthHeader = ({ user }: AuthHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-[70px] px-4 xl:px-0">
        {/* Logo + Categories */}
        <div className="flex items-center gap-4 relative">
          <AnimatedLink href="/">
            <Image src={Logo.src || Logo} alt="Logo" width={120} height={40} />
          </AnimatedLink>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Button variant="outline" className="flex items-center gap-2">
              <Menu className="w-4 h-4" />
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
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="p-2">
            <Search className="w-5 h-5" />
          </Button>
          <ThemeToggle />

          {/* User avatar */}
          <div className="flex items-center gap-2">
            <Image
              src={user.avatarUrl}
              alt={user.fullName}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{user.fullName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};