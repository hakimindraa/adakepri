"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import ReportModal from "./ReportModal";

interface ReportButtonProps {
  targetId: string;
  targetType: "UMKM" | "FREELANCER";
  targetName: string;
}

export default function ReportButton({ targetId, targetType, targetName }: ReportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
        className="text-slate-300 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-rose-50"
        title="Laporkan"
      >
        <Flag size={18} />
      </button>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetId={targetId}
        targetType={targetType}
        targetName={targetName}
      />
    </>
  );
}
