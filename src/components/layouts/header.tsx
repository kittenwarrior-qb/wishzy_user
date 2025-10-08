"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WishzyLogo } from "@/components/shared/wishzy-logo";
import { Menu, X, Search, ShoppingCart, Heart, ChevronDown } from "lucide-react";
import { SearchDropdown } from "../shared/Dropdown/SearchDropdown";
import { UserDropdown } from "../shared/Dropdown/UserDropdown";
import { useInteractiveModeStore } from "@/store/slices/interactive-mode";
import { useCartStore } from "@/store/slices/cart";
import { useAuthStore } from "@/store/slices/auth";
import { DiscoverDropdown } from "../shared/Dropdown/DiscoverDropdown";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isInteractiveMode } = useInteractiveModeStore();
  const { getItemCount } = useCartStore();
  const { token, user, setAuth } = useAuthStore();
  const cartItemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Khám phá", href: "/courses", hasDropdown: true },
    { label: "Thi thử", href: "/about" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    setAuth(null, null);
  };

  return (
    <header
      className={` top-0 left-0 right-0 z-[100] transition-all duration-500 lg:px-3
        ${
          isInteractiveMode
            ? "fixed opacity-0 pointer-events-none -translate-y-full"
            : "fixed opacity-100 translate-y-0"
        }
        ${isScrolled ? "sticky bg-white shadow-lg" : "sticky "}
      `}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center h-16 px-4 lg:px-0">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0">
              <WishzyLogo className="h-8 w-auto" />
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group text-[15px]">
                  {item.hasDropdown ? (
                    <DiscoverDropdown>
                     <button className="flex items-center gap-2 cursor-pointer px-3 py-2 text-base-content hover:text-[#f76d1d] hover:bg-[#ffe5d6] rounded-sm transition-colors duration-200 font-medium">
                       {item.label}
                       <ChevronDown 
                        size={16} 
                      />
                     </button>
                   </DiscoverDropdown>
                 ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-base-content hover:text-[#f76d1d] hover:bg-[#ffe5d6]  rounded-sm transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
          
          {/* Enhanced Search Bar with Dropdown */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-[400px] mx-8">
          <SearchDropdown>
            <div className="search-trigger">
              {/* Search icon hoặc button */}
              <Search size={20} />
            </div>
          </SearchDropdown>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="lg:hidden p-2 text-base-content hover:text-primary transition-colors duration-200"
            >
              <Search size={20} />
            </Link>
            <Link
              href="/wishlist"
              className="p-2 text-base-content hover:text-primary transition-colors duration-200"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-base-content transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} className=" hover:text-primary" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>
            
            {/* User Authentication */}
            {token && user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Button variant="outline" size="sm" className="ml-2">
                <Link href="/login" className="flex items-center gap-2">
                  Đăng nhập
                </Link>
              </Button>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-base-content"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - keep your existing mobile menu code */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {/* Your existing mobile menu content */}
          </div>
        )}
      </div>
    </header>
  );
};