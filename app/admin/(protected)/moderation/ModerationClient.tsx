"use client";

import { useState } from "react";
import { Check, X, Store } from "lucide-react";
import { updateUMKMStatus } from "@/lib/actions/admin";

export default function ModerationClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await updateUMKMStatus(id, newStatus);
      if (res?.error) {
        setMessage({ text: res.error, type: 'error' });
      } else {
        setMessage({ text: res?.success || `Status UMKM berhasil diubah menjadi ${newStatus}!`, type: 'success' });
        setData(data.filter(item => item.id !== id));
      }
    } catch (e) {
      setMessage({ text: "Terjadi kesalahan saat memperbarui status.", type: 'error' });
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
              <Store size={20} />
            </div>
            <h3 className="text-sm font-semibold text-zinc-950 mb-0.5">Antrean Kosong</h3>
            <p className="text-xs text-zinc-400">Tidak ada profil UMKM baru yang sedang menunggu persetujuan (PENDING).</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Nama Usaha</th>
                  <th className="px-5 py-3">Kategori &amp; Wilayah</th>
                  <th className="px-5 py-3">Pemilik</th>
                  <th className="px-5 py-3">Deskripsi Singkat</th>
                  <th className="px-5 py-3 text-right">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.map((u: any) => (
                  <tr key={u.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="px-5 py-4 font-semibold text-zinc-950">{u.title}</td>
                    <td className="px-5 py-4">
                      <span className="font-medium text-zinc-800">{u.category}</span>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{u.location}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-zinc-800">{u.owner?.name || '-'}</div>
                      <div className="text-[11px] text-zinc-400">{u.owner?.email || '-'}</div>
                    </td>
                    <td className="px-5 py-4 max-w-xs truncate" title={u.description}>
                      <span className="text-zinc-600">{u.description}</span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                      <button 
                        disabled={loading}
                        onClick={() => handleStatusChange(u.id, 'APPROVED')}
                        className="px-3.5 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium rounded-lg text-xs transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Check size={13} />
                        <span>Setujui (Approve)</span>
                      </button>
                      <button 
                        disabled={loading}
                        onClick={() => { if(confirm(`Yakin ingin menolak profil "${u.title}"?`)) handleStatusChange(u.id, 'REJECTED') }}
                        className="px-3 py-1.5 border border-zinc-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-zinc-600 font-medium rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <X size={13} />
                        <span>Tolak</span>
                      </button>
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
