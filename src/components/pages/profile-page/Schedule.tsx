"use client";
import { CalendarDays } from "lucide-react";

interface ScheduleProps {
  schedules: { title: string; course: string; time: string; location?: string }[];
}

export default function Schedule({ schedules }: ScheduleProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-amber-500" size={20} />
        <h2 className="text-lg font-semibold">Lịch học</h2>
      </div>

      <ul className="divide-y space-y-2 overflow-y-auto max-h-[350px]">
        {schedules.map((sch, idx) => (
          <li key={idx} className="flex flex-col text-sm py-2">
            <span className="font-medium">{sch.title}</span>
            <span>{sch.course} • {sch.time}</span>
            {sch.location && <span className="text-gray-500">{sch.location}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
