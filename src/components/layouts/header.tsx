"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/shared/animated-link";
import { WishzyLogo } from "@/components/shared/wishzy-logo";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import ThemeToggle from "../shared/theme-toggle";
import { CoursesDropdown } from "../shared/courses-dropdown";
import { useInteractiveModeStore } from "@/store/slices/interactive-mode";
import { useCartStore } from "@/store/slices/cart";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isInteractiveMode } = useInteractiveModeStore();
  const { getItemCount } = useCartStore();
  const cartItemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Khóa học", href: "/courses", hasDropdown: true },
    { label: "Về chúng tôi", href: "/about" },
    { label: "Liên hệ", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={` top-0 left-0 right-0 z-[100] transition-all duration-500 lg:px-3
        ${
          isInteractiveMode
            ? "fixed opacity-0 pointer-events-none -translate-y-full"
            : "fixed opacity-100 translate-y-0"
        }
        ${isScrolled ? "sticky bg-white shadow-lg" : "sticky backdrop-blur-sm"}
      `}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center h-16 px-4 lg:px-0">
          <div className="flex items-center gap-6">
            <AnimatedLink href="/" className="flex-shrink-0">
              <WishzyLogo className="h-8 w-auto" />
            </AnimatedLink>
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group text-[15px]">
                  {item.hasDropdown ? (
                    <CoursesDropdown />
                  ) : (
                    <AnimatedLink
                      href={item.href}
                      className="px-3 py-2 text-base-content hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </AnimatedLink>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2  border-t border-gray-200">
            <AnimatedLink
              href="/search"
              className="p-2 text-base-content hover:text-primary transition-colors duration-200"
            >
              <Search size={20} />
            </AnimatedLink>
            <AnimatedLink
              href="/cart"
              className="p-2 text-base-content transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} className=" hover:text-primary" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </AnimatedLink>
            <Button variant="outline" size="sm" className="ml-2">
              <AnimatedLink href="/login" className="flex items-center gap-2">
                Đăng nhập
              </AnimatedLink>
            </Button>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-base-content"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <CoursesDropdown />
                    </div>
                  ) : (
                    <AnimatedLink
                      href={item.href}
                      className="block px-3 py-2 text-base-content hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200"
                    >
                      {item.label}
                    </AnimatedLink>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                <AnimatedLink
                  href="/search"
                  className="p-2 text-base-content hover:text-primary transition-colors duration-200"
                >
                  <Search size={20} />
                </AnimatedLink>

                <AnimatedLink
                  href="/cart"
                  className="p-2 text-base-content hover:text-primary transition-colors duration-200"
                >
                  <ShoppingCart size={20} />
                </AnimatedLink>

                <ThemeToggle />

                <Button variant="outline" size="sm" className="ml-auto">
                  <AnimatedLink
                    href="/login"
                    className="flex items-center gap-2"
                  >
                    Đăng nhập
                  </AnimatedLink>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
