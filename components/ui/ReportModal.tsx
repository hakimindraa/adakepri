"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X, CheckCircle } from "lucide-react";
import { createReport } from "@/lib/actions/report";
import { useSession } from "next-auth/react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: "UMKM" | "FREELANCER";
  targetName: string;
}

export default function ReportModal({ isOpen, onClose, targetId, targetType, targetName }: ReportModalProps) {
  const { data: session } = useSession();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      setErrorMsg("Anda harus login untuk melaporkan konten.");
      return;
    }
    if (!reason.trim()) {
      setErrorMsg("Pilih atau isi alasan pelaporan.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const res = await createReport(targetId, targetType, reason);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setErrorMsg("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setReason("");
    setErrorMsg("");
    onClose();
  };

  const predefinedReasons = [
    "Penipuan atau Spam",
    "Konten tidak pantas / menyinggung",
    "Informasi palsu / menyesatkan",
    "Pelanggaran hak cipta"
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-700 text-lg text-slate-800 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={20} /> Laporkan {targetType === 'UMKM' ? 'Loker' : 'Profil'}
          </h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-lg font-700 text-slate-800 mb-2">Laporan Terkirim</h4>
              <p className="text-slate-500 text-sm">
                Terima kasih atas laporan Anda. Tim kami akan segera meninjau {targetName} dan mengambil tindakan yang diperlukan.
              </p>
              <button 
                onClick={handleClose}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-600 hover:bg-slate-200 transition-colors text-sm"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-slate-500 mb-4">
                Anda melaporkan: <span className="font-600 text-slate-700">{targetName}</span>
              </p>

              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-xs font-500 rounded-xl border border-rose-100">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-3 mb-6">
                <label className="text-sm font-600 text-slate-700 block">Pilih Alasan</label>
                {predefinedReasons.map((r, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input 
                      type="radio" 
                      name="reason" 
                      value={r}
                      checked={reason === r}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-4 h-4 text-[#0077B6] border-slate-300 focus:ring-[#0077B6]"
                    />
                    <span className="text-sm text-slate-700 font-500">{r}</span>
                  </label>
                ))}
                
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="radio" 
                    name="reason_other" 
                    checked={!predefinedReasons.includes(reason) && reason !== ""}
                    onChange={() => setReason("")}
                    className="w-4 h-4 mt-1 text-[#0077B6] border-slate-300 focus:ring-[#0077B6]"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-slate-700 font-500 mb-2 block">Lainnya</span>
                    <textarea 
                      placeholder="Jelaskan alasan Anda..."
                      value={!predefinedReasons.includes(reason) ? reason : ""}
                      onChange={(e) => setReason(e.target.value)}
                      onClick={() => { if(predefinedReasons.includes(reason)) setReason("") }}
                      className="w-full text-sm p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent min-h-[80px]"
                    />
                  </div>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-600 hover:bg-slate-50 transition-colors text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || !reason.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-600 hover:bg-rose-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Kirim Laporan"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
