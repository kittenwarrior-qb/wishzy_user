"use client";

import MenuProfile from "@/components/pages/profile-page/sidebarprofile";
import "./profile.css";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-7xl mx-auto">
      <div className="hidden lg:block">
        <MenuProfile variant="sidebar" />
      </div>

      <main className="flex-1 overflow-y-auto pb-32 h-screen hide-scrollbar">
        {children}
      </main>

      <div className="block lg:hidden">
        <MenuProfile variant="mobile" />
      </div>
    </div>
  );
}
