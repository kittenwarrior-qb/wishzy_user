"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit2, UserCheck, BadgeCheck, User, CheckCircle2, Settings } from "lucide-react";

interface UserInfoProps {
  user: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: "Nam" | "Nữ" | "Khác";
    avatarUrl: string;
    isTeacher?: boolean;
  };
  handleChange: (field: string, value: string) => void;
}

export default function UserInfo({ user, handleChange }: UserInfoProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="text-amber-500" size={32} />
            <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
        </div>
        <Button variant="outline" className="flex items-center gap-1">
           <Settings size={16} /> Tùy chỉnh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-24 h-24">
          <Image
            src={user.avatarUrl}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full border object-cover w-24 h-24"
          />
          <label className="absolute bottom-0 right-0 rounded-full p-1 shadow cursor-pointer bg-white hover:bg-gray-100">
            <Edit2 size={16} />
            <input type="file" className="hidden" aria-label="Upload avatar" />
          </label>
        </div>

        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-semibold text-xl">{user.name}</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-amber-500 text-xs font-medium">
              {user.isTeacher ? "Giảng viên" : "Học viên"}
            </span>
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
              <BadgeCheck size={14} /> Verified
            </span>
          </div>
          <p className="text-sm mt-1">{user.email} • {user.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={user.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="w-full border border-none bg-amber-100 rounded px-3 py-2"
          disabled
          value={user.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={user.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={user.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
        />
        <div className="flex items-center gap-4">
          {["Nam", "Nữ", "Khác"].map((g) => (
            <label key={g} className="flex items-center gap-1 text-sm">
              <UserCheck size={16} />
              <input
                type="radio"
                name="gender"
                value={g}
                checked={user.gender === g}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="default" className="flex items-center gap-1">
          <CheckCircle2 size={16} /> Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
