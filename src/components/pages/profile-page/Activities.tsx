"use client";
import { Bell } from "lucide-react";
interface ActivitiesProps {
  activities: { message: string; date: string }[];
}

export default function Activities({ activities }: ActivitiesProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Bell className="text-amber-500" size={20} />
        <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
      </div>
      <ul className="divide-y overflow-y-auto max-h-[350px] ">
        {activities.map((act, idx) => (
          <li key={idx} className="py-3">
            <p className="text-sm">{act.message}</p>
            <p className="text-xs text-gray-400">{act.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
