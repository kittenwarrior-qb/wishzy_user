"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, Play, HelpCircle, Download, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Avatar from "@/assets/cv1.jpg";
import Logo from "@/assets/wishzy-logo.png";

import MenuProfile from "@/components/pages/profile-page/sidebarprofile";
import UserInfo from "@/components/pages/profile-page/UserInfo";
import Courses from "@/components/pages/profile-page/Courses";
import Schedule from "@/components/pages/profile-page/Schedule";
import Certificates from "@/components/pages/profile-page/Certificates";
import TeacherPanel from "@/components/pages/profile-page/TeacherPanel";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { UserService } from "@/services/user.service";

export interface UserInfoType {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: "Nam" | "Nữ" | "Khác";
  avatar: string;
  isTeacher?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type ApiUser = {
  _id?: string;
  email: string;
  fullName: string;
  role: "user" | "admin" | "instructor";
  avatar?: string;
  dob?: number | string; 
  gender?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
};

const mapApiUserToUserInfo = (apiUser: ApiUser): UserInfoType => {
  let gender: "Nam" | "Nữ" | "Khác" = "Khác";
  if (apiUser.gender) {
    const g = apiUser.gender.toLowerCase();
    if (g === "nam") gender = "Nam";
    else if (g === "nữ" || g === "nu") gender = "Nữ";
  }

  let dobStr = "";
  if (apiUser.dob) {
    if (typeof apiUser.dob === "number" && !isNaN(apiUser.dob)) {
      dobStr = new Date(apiUser.dob).toISOString().split("T")[0];
    } else if (typeof apiUser.dob === "string") {
      const d = new Date(apiUser.dob);
      if (!isNaN(d.getTime())) dobStr = d.toISOString().split("T")[0];
    }
  }

  return {
    _id: apiUser._id,
    fullName: apiUser.fullName,
    email: apiUser.email,
    phone: apiUser.phone || "",
    dob: dobStr,
    gender,
    avatar: apiUser.avatar || "/default-avatar.png",
    isTeacher: apiUser.role === "instructor",
    createdAt: apiUser.createdAt,
    updatedAt: apiUser.updatedAt,
  };
};

export default function ProfileDashboard() {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleChange = (field: keyof UserInfoType, value: string) => {
    if (!user) return;
    setUser({ ...user, [field]: value });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Bạn chưa đăng nhập, vui lòng đăng nhập lại");
          router.push("/login");
          return;
        }

        const res = await UserService.getProfile();
        if (res.user) setUser(mapApiUserToUserInfo(res.user));
        else {
          toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
          router.push("/login");
        }
      } catch (error: unknown) {
        toast.error("Không thể tải thông tin, vui lòng đăng nhập lại");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      setLoading(true);

      let dobTimestamp: number | undefined;
      if (user.dob) {
        const [y, m, d] = user.dob.split("-").map(Number);
        dobTimestamp = Date.UTC(y, m - 1, d);
      }

      const payload = {
        fullName: user.fullName,
        phone: user.phone,
        dob: dobTimestamp,
        gender: user.gender,
      };

      const updated = await UserService.updateProfile(payload);
      setUser(mapApiUserToUserInfo(updated.user));
      toast.success("Cập nhật thông tin thành công");
    } catch (error: unknown) {
      toast.error("Lỗi khi cập nhật, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Đang tải thông tin...</p>;
  if (!user) return <p className="text-center py-10">Không tìm thấy thông tin người dùng</p>;

  return (
    <div className="space-y-8">
      <section className="relative bg-gradient-to-r p-5 sm:p-6 text-amber-500 shadow-md">
        <div className="absolute top-2 right-6 hidden md:block lg:hidden">
          <MenuProfile variant="toggle" />
        </div>
        <Link href="/" className="absolute top-2 right-6">
          <Image src={Logo.src || Logo} alt="Wishzy Logo" width={80} height={30} className="block sm:hidden" />
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <Image src={Avatar.src} alt="Avatar" width={56} height={56} className="rounded-full border-2 border-white/70 object-cover w-14 h-14" />
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
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              >
                {user.fullName}{" "}
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 shadow backdrop-blur">
                  {user.isTeacher ? "Giảng viên" : "Học viên"}
                </span>
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-2">
            <Button variant="default" className="flex items-center gap-2"><Play size={16} /> Tiếp tục học</Button>
            <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2"><BookOpen size={16} /> Tài liệu</Button>
            <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2"><HelpCircle size={16} /> Hỗ trợ</Button>
            <Button variant="outline" className="hover:bg-gray-100 flex items-center gap-2"><Download size={16} /> Xuất dữ liệu</Button>
          </div>
        </div>
      </section>

      <div className="space-y-6 px-4">
        <UserInfo user={user} handleChange={handleChange as (field: string, value: string) => void} onSave={handleSaveProfile} />
        <Schedule schedules={[]} />
        <Certificates certificates={[]} />
        <Courses courses={[]} />
        <TeacherPanel />
      </div>
    </div>
  );
}
