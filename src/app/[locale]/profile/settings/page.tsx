"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfileSettings() {
  const [settings, setSettings] = useState({
    receiveEmails: true,
    enableNotifications: true,
    darkMode: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Cài đặt tài khoản</h1>
        <p className="mt-1">
          Bật hoặc tắt các quyền và thông báo cho tài khoản của bạn.
        </p>
      </div>
      <div className="space-y-6">
        <div className="p-2 rounded-xl shadow shadow-white transition flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold ">Nhận email thông báo</h2>
            <p className="text-sm">Nhận các email cập nhật từ hệ thống.</p>
          </div>
          <Button
            variant={settings.receiveEmails ? "default" : "outline"}
            className="mt-3 sm:mt-0 py-1 px-3 flex items-center gap-1"
            onClick={() => toggleSetting("receiveEmails")}
          >
            {settings.receiveEmails ? "Bật" : "Tắt"}
          </Button>
        </div>

        <div className="p-2 rounded-xl shadow shadow-white transition flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Thông báo ứng dụng</h2>
            <p className=" text-sm">Bật thông báo khi có sự kiện quan trọng.</p>
          </div>
          <Button
            variant={settings.enableNotifications ? "default" : "outline"}
            className="mt-3 sm:mt-0 py-1 px-3 flex items-center gap-1"
            onClick={() => toggleSetting("enableNotifications")}
          >
            {settings.enableNotifications ? "Bật" : "Tắt"}
          </Button>
        </div>
      </div>
    </div>
  );
}
