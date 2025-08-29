"use client";
import React, { useState } from "react";
import MenuProfile from "@/components/pages/profile-page/sidebarprofile";
import { Menu } from "lucide-react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar PC */}
      <aside className="hidden md:block w-72 bg-white border-r shadow-sm">
        <MenuProfile />
      </aside>

      {/* Sidebar Mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="w-72 h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <MenuProfile onClose={() => setOpen(false)} />
          </div>
          <div className="flex-1 bg-black/50"></div>
        </div>
      )}

      {/* Nội dung chính */}
      <main className="flex-1 p-6 md:p-8">
        {/* Nút mở menu trên mobile */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-white"
        >
          <Menu size={20} />
          <span>Menu</span>
        </button>

        {children}
      </main>
    </div>
  );
}
