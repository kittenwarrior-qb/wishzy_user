"use client";

import MenuProfile from "@/components/pages/profile-page/sidebarprofile";
import "./profile.css";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen ">
      <MenuProfile variant="sidebar" />

      <main className="flex-1 overflow-y-auto pb-6 h-screen hide-scrollbar ">
        {children}
      </main>

      <div className="md:hidden">
        <MenuProfile variant="mobile" />
      </div>
    </div>
  );
}
