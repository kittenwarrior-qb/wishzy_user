// src/app/[locale]/providers.tsx
"use client";

import { Header } from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import Transition from "@/components/shared/transitions";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Transition>
          {children}
        </Transition>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}