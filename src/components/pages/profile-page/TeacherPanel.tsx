"use client";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

export default function TeacherPanel() {
  return (
    <div className="p-6 text-center space-y-3 pb-8">
      <Sparkles className="mx-auto text-amber-400" size={32} />
      <h3 className="font-semibold text-lg">Trở thành giảng viên!</h3>
      <p className="text-sm ">Hãy đăng ký trở thành giảng viên để tạo khóa học và chia sẻ kiến thức với học viên</p>
      <Button variant="outline" className="flex items-center justify-center gap-2 mx-auto">
        <Plus size={16} /> Đăng ký làm giảng viên
      </Button>
    </div>
  );
}
