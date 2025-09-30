"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transitionRef.current) {
      gsap.fromTo(
        transitionRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.75,
        }
      );
    }
  }, []); // Mảng rỗng đảm bảo hiệu ứng chỉ chạy một lần khi component được mount

  return (
    <div ref={transitionRef}>
      {children}
    </div>
  );
}