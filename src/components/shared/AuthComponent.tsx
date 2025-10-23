'use client';

import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, BookOpen, Award } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthStore } from "@/store/slices/auth";

const AuthComponent: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { token, user, setAuth } = useAuthStore();

    const handleLogout = () => {
        setAuth(null, null);
    };

    if (!token || !user) {
        return (
            <Link href="/login">
                <Button variant="ghost" size="icon" className="w-9 h-9 p-0 rounded-full hover:bg-[#333] transition-colors">
                    <User className="w-5 h-5 text-[#cccccc]" />
                </Button>
            </Link>
        );
    }

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href="/profile">
                <Button variant="ghost" size="icon" className="w-9 h-9 p-0 rounded-full hover:bg-[#333] transition-colors">
                    <User className="w-5 h-5 text-[#cccccc]" />
                </Button>
            </Link>

            {isHovered && (
                // Removed mt-2 to eliminate the gap and match CartComponent
                <div className="absolute right-0 top-full w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                            <div className="w-10 h-10 bg-[#ffa500] rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {user.fullName?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {user.fullName || 'Người dùng'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email || 'user@example.com'}
                                </p>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <Link href="/profile" className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                                <Settings className="w-4 h-4" />
                                Thông tin cá nhân
                            </Link>
                            <Link href="/my-courses" className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                                <BookOpen className="w-4 h-4" />
                                Khóa học của tôi
                            </Link>
                            <Link href="/certificates" className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                                <Award className="w-4 h-4" />
                                Chứng chỉ
                            </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-200 pt-2">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded w-full text-left"
                            >
                                <LogOut className="w-4 h-4" />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthComponent;