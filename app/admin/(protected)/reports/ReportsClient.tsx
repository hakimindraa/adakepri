"use client";

import { useState } from "react";
import { Check, AlertTriangle, EyeOff, ShieldCheck } from "lucide-react";
import { updateReportStatus, updateUMKMStatus, updateFreelancerStatus } from "@/lib/actions/admin";

export default function ReportsClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleResolve = async (id: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await updateReportStatus(id, "RESOLVED");
      if (res?.error) {
        setMessage({ text: res.error, type: 'error' });
      } else {
        setMessage({ text: res?.success || "Laporan berhasil ditandai selesai.", type: 'success' });
        setData(data.map(item => item.id === id ? { ...item, status: "RESOLVED" } : item));
      }
    } catch (e) {
      setMessage({ text: "Terjadi kesalahan sistem.", type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleTakeDown = async (reportId: string, targetId: string, targetType: string) => {
    setLoading(true);
    setMessage(null);
    try {
      let res;
      if (targetType === "UMKM") {
        res = await updateUMKMStatus(targetId, "HIDDEN");
      } else {
        res = await updateFreelancerStatus(targetId, "HIDDEN");
      }

      if (res?.error) {
        setMessage({ text: res.error, type: 'error' });
      } else {
        await updateReportStatus(reportId, "RESOLVED");
        setMessage({ text: "Konten berhasil di-take down (HIDDEN) dan laporan diselesaikan.", type: 'success' });
        setData(data.map(item => item.id === reportId ? { ...item, status: "RESOLVED" } : item));
      }
    } catch (e) {
      setMessage({ text: "Terjadi kesalahan saat take down konten.", type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div className={`p-3.5 rounded-lg text-xs font-medium border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-zinc-200/90 shadow-xs overflow-hidden">
        {data.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-semibold text-zinc-950 mb-0.5">Tidak Ada Laporan</h3>
            <p className="text-xs text-zinc-400">Belum ada pengaduan konten dari masyarakat.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Pelapor</th>
                  <th className="px-5 py-3">Target Dilaporkan</th>
                  <th className="px-5 py-3">Alasan Laporan</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Tindakan Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.map((r: any) => (
                  <tr key={r.id} className={`hover:bg-zinc-50/70 transition-colors ${r.status === 'RESOLVED' ? 'opacity-60 bg-zinc-50/40' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-zinc-950">{r.reporter?.name || 'Anonim'}</div>
                      <div className="text-[11px] text-zinc-400">{r.reporter?.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                        {r.targetType}
                      </span>
                      <div className="font-medium text-zinc-900 mt-1 truncate max-w-[160px]" title={r.targetName}>
                        {r.targetName}
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <div className="flex items-start gap-1.5 text-zinc-700">
                        <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{r.reason}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {r.status === 'UNRESOLVED' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Menunggu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span> Selesai
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right space-x-1.5 whitespace-nowrap">
                      {r.status === 'UNRESOLVED' && (
                        <>
                          <button 
                            disabled={loading}
                            onClick={() => handleResolve(r.id)}
                            className="px-2.5 py-1 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 rounded-lg text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                            title="Tandai Selesai"
                          >
                            <Check size={12} />
                            <span>Selesaikan</span>
                          </button>
                          <button 
                            disabled={loading}
                            onClick={() => { if(confirm(`Yakin ingin menyembunyikan (take down) profil ${r.targetType} ini?`)) handleTakeDown(r.id, r.targetId, r.targetType) }}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                            title="Take Down Konten"
                          >
                            <EyeOff size={12} />
                            <span>Take Down</span>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
