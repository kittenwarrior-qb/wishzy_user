"use client";

import Link from "next/link";
import React from "react";

export const AnimatedLink = ({ href, className = "", children }: {href: string, className?: string, children: React.ReactNode}) => {

  return (
    <Link
      href={href}
      className={`hover-circle-link text-base-content ${className}`}
    >
      {children}
    </Link>
  );
};

 