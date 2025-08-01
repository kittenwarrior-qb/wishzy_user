import Link from "next/link";
import React from "react";

export const HoverLink = ({ href, className = "", children }: {href: string, className?: string, children: React.ReactNode}) => {
  return (
    <Link href={href} className={`hover-circle-link ${className}`}>
      {children}
    </Link>
  );
};
