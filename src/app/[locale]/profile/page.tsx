"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  BookOpen,
  Heart,
  Bell,
  Play,
  HelpCircle,
  Download,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Avatar from "@/assets/cv1.jpg";
import Logo from "@/assets/wishzy-logo.png";

import UserInfo from "@/components/pages/profile-page/UserInfo";
import Activities from "@/components/pages/profile-page/Activities";
import Courses from "@/components/pages/profile-page/Courses";
import Schedule from "@/components/pages/profile-page/Schedule";
import Certificates from "@/components/pages/profile-page/Certificates";
import TeacherPanel from "@/components/pages/profile-page/TeacherPanel";

import { motion } from "framer-motion";

export interface Stats {
  courses: number;
  favorites: number;
  notifications: number;
}
export interface UserInfoType {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: "Nam" | "Nữ" | "Khác";
  avatarUrl: string;
  isTeacher?: boolean;
}
export interface CourseType {
  name: string;
  progress: number;
  status?: "In Progress" | "Completed";
  image: string;
}
export interface ActivityType {
  type: "Notification" | "Activity";
  message: string;
  date: string;
}
export interface ScheduleItemType {
  title: string;
  course: string;
  time: string;
  location?: string;
}
export interface CertificateType {
  title: string;
  provider: string;
  date: string;
  pdf?: string;
}

export default function ProfileDashboard() {
  const [stats] = useState<Stats>({
    courses: 12,
    favorites: 8,
    notifications: 5,
  });

  const [user, setUser] = useState<UserInfoType>({
    name: "Hồ Văn Duy",
    email: "hovanduy@it.fplhcm.edu.vn",
    phone: "0901234567",
    dob: "2005-03-04",
    gender: "Nam",
    avatarUrl: Avatar.src,
    isTeacher: false,
  });

  const handleChange = (field: keyof UserInfoType, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const displayStats = useMemo(
    () => [
      {
        label: "Notifications",
        value: stats.notifications,
        color: "bg-amber-50",
        iconWrap: "bg-amber-100 text-amber-600",
        icon: <Bell size={20} />,
      },
      {
        label: "Courses",
        value: stats.courses,
        color: "bg-blue-50",
        iconWrap: "bg-blue-100 text-blue-600",
        icon: <BookOpen size={20} />,
      },
      {
        label: "Favorites",
        value: stats.favorites,
        color: "bg-pink-50",
        iconWrap: "bg-pink-100 text-pink-600",
        icon: <Heart size={20} />,
      },
    ],
    [stats]
  );

  const courses: CourseType[] = [
    { name: "React Basics", progress: 75, status: "In Progress", image: "aiw" },
    { name: "Advanced JavaScript", progress: 50, status: "In Progress", image: "aiw" },
    { name: "TypeScript Essentials", progress: 90, status: "In Progress", image: "aiw" },
  ];

  const activities: ActivityType[] = [
    { type: "Notification", message: "Bạn có bài kiểm tra mới", date: "2025-08-25" },
    { type: "Activity", message: "Hoàn thành bài kiểm tra JavaScript", date: "2025-08-23" },
    { type: "Notification", message: "Khóa học React sắp kết thúc", date: "2025-08-20" },
    { type: "Activity", message: "Đăng ký khóa học Next.js", date: "2025-08-18" },
    { type: "Notification", message: "Cập nhật mới từ hệ thống", date: "2025-08-17" },
    { type: "Activity", message: "Hoàn thành bài kiểm tra TypeScript", date: "2025-08-15" },
  ];

  const schedules: ScheduleItemType[] = [
    { title: "Q&A tuần", course: "React Basics", time: "Hôm nay • 19:30 - 20:30", location: "Zoom #123-456" },
    { title: "Chấm bài", course: "Advanced JavaScript", time: "Thứ 4 • 14:00 - 15:00" },
    { title: "Livestream tổng kết", course: "TypeScript Essentials", time: "Thứ 6 • 20:00 - 21:00" },
    { title: "Học nhóm", course: "React Basics", time: "Chủ nhật • 10:00 - 11:00", location: "Google Meet" },
    { title: "Học nhóm", course: "Advanced JavaScript", time: "Chủ nhật • 11:30 - 12:30", location: "Google Meet" },
    { title: "Học nhóm", course: "TypeScript Essentials", time: "Chủ nhật • 13:00 - 14:00", location: "Google Meet" },
  ];

  const certificates: CertificateType[] = [
    { title: "React Developer", provider: "Meta", date: "06/2025", pdf: "/react-basics.pdf" },
    { title: "TypeScript Pro", provider: "Udacity", date: "05/2025", pdf: "/typescript-essentials.pdf" },
    { title: "JavaScript Advanced", provider: "Coursera", date: "04/2025", pdf: "/advanced-javascript.pdf" },
    { title: "React Basics", provider: "Udemy", date: "03/2025", pdf: "/react-basics.pdf" },
    { title: "TypeScript Essentials", provider: "edX", date: "02/2025", pdf: "/typescript-essentials.pdf" },
    { title: "JavaScript Fundamentals", provider: "freeCodeCamp", date: "01/2025", pdf: "/javascript-fundamentals.pdf" },
  ];

  return (
    <div className="space-y-8">
      <section className="relative bg-gradient-to-r p-5 sm:p-6 text-amber-500 shadow-md">
        <Link href="/" className="absolute top-2 right-6">
          <Image
            src={Logo.src || Logo}
            alt="Wishzy Logo"
            width={80}
            height={30}
            className="block sm:hidden"
          />
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src={user.avatarUrl}
                alt="Avatar"
                width={56}
                height={56}
                className="rounded-full border-2 border-white/70 object-cover w-14 h-14"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow">
                <BadgeCheck size={12} /> Verified
              </span>
            </div>
            <div>
              <p className="text-xs/none opacity-90 animate-fadeIn">Xin chào,</p>
              <motion.h1
                className="text-xl sm:text-2xl font-semibold flex items-center gap-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ delay: 5, duration: 2, ease: "easeInOut" }}
                style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              >
                {user.name}{" "}
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 shadow backdrop-blur">
                  {user.isTeacher ? "Giảng viên" : "Học viên"}
                </span>
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-2">
            <Button variant="default" className="flex items-center gap-2">
              <Play size={16} /> Tiếp tục học
            </Button>
            <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2">
              <BookOpen size={16} /> Tài liệu
            </Button>
            <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2">
              <HelpCircle size={16} /> Hỗ trợ
            </Button>
            <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2">
              <Download size={16} /> Xuất dữ liệu
            </Button>
          </div>
        </div>
      </section>

      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 min-w-max px-4">
          {displayStats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl shadow-sm ${stat.color} transition min-w-[330px] min-h-[100px] flex-shrink-0`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.iconWrap}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-6 xl:col-span-2">
          <UserInfo user={user} handleChange={handleChange as (field: string, value: string) => void} />
          <Activities activities={activities} />
          <Courses courses={courses} />
        </div>

        <div className="space-y-6">
          <Schedule schedules={schedules} />
          <Certificates certificates={certificates} />
          {<TeacherPanel />}
        </div>
      </div>
    </div>
  );
}
