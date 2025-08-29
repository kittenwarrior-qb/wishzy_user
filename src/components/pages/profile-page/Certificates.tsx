"use client";

import { Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificatesProps {
  certificates: { title: string; provider: string; date: string; pdf?: string }[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Award className="text-amber-500" size={20} />
        <h2 className="text-lg font-semibold">Chứng chỉ</h2>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto py-2 p-1">
        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white shadow-sm transition-all duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <Award className="text-amber-600" size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base">{cert.title}</span>
                <span className="text-sm text-gray-500">{cert.provider}</span>
                <span className="text-xs text-gray-400 mt-1">{cert.date}</span>
              </div>
            </div>

            {cert.pdf && (
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => window.open(cert.pdf, "_blank")}
              >
                <Download size={18} />
                PDF
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
