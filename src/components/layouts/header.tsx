'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Heart, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { AnimatedLink } from '@/components/shared/animated-link'
import { useScrollTop } from '@/hooks/useScrollTop'
import SubHeader from './subheader'
import ThemeToggle from '@/components/shared/theme-toggle'
import Logo from '@/assets/wishzy-logo.png'

const Header = () => {
  const t = useTranslations('HomePage')
  const isAtTop = useScrollTop()

  const navItems = [
    { label: t('Navigation.home'), href: '/' },
    { label: t('Navigation.courses'), href: '/course/cam-nang-toan-lop-1-sieu-chi-tiet-thay-my' },
    { label: t('Navigation.categories'), href: '/categories' },
    { label: t('Navigation.practice'), href: '/practice' },
  ]

  return (
    <div className="sticky top-0 z-50 bg-base-100 transition-all duration-300">
      <header className="border-b border-base-300 transition-all duration-300 px-4 xl:px-0">
        <div
          className={`max-w-[1280px] mx-auto flex justify-between items-center h-[80px] transition-all duration-300 ${
            isAtTop ? 'lg:h-[125px]' : 'lg:h-[80px]'
          }`}
        >
          {/* Menu icon */}
          <div className="lg:hidden min-w-[150px] md:min-w-[180px]">
            <Menu className="lg:hidden text-base-content" />
          </div>

          {/* Navigation links */}
          <ul className="hidden lg:flex min-w-[400px] text-sm justify-between gap-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <AnimatedLink
                  href={item.href}
                  className={index === 0 ? '!pl-0' : undefined}
                >
                  {item.label}
                </AnimatedLink>
              </li>
            ))}
          </ul>

          {/* Logo */}
          <div className="transition-all duration-300">
            <AnimatedLink href="/">
              <Image
                src={Logo.src || Logo}
                alt="Wishzy Logo"
                width={isAtTop ? 250 : 130}
                height={isAtTop ? 88 : 46}
                className="hidden lg:block transition-all duration-300"
              />
              <Image
                src={Logo.src || Logo}
                alt="Wishzy Logo"
                width={130}
                height={46}
                className="lg:hidden transition-all duration-300"
              />
            </AnimatedLink>
          </div>

          {/* Right actions */}
          <div className="flex min-w-[200px] lg:min-w-[400px] justify-end md:justify-between text-sm">
            <ul className="hidden lg:flex gap-4 items-center">
              <li className="flex items-center gap-2">
                <ThemeToggle />
                <AnimatedLink href="/exams">Bài thi</AnimatedLink>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <div className="md:hidden flex gap-5">
                <Heart className="text-base-content" />
                <ShoppingCart className="text-base-content" />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" href="/login">
                  Đăng nhập
                </Button>
                <Button variant="default" href="/register">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SubHeader />
    </div>
  )
}

export default Header
