"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Store, Briefcase, Trash2, CheckCircle2, XCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { toggleVerifyUMKM, toggleVerifyFreelancer, deleteUserAdmin, deleteUMKMAdmin, deleteFreelancerAdmin } from "@/lib/actions/admin";

export default function AdminClient({ stats, users, umkms, freelancers }: any) {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleAction = async (actionFn: any, ...args: any[]) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await actionFn(...args);
      if (res?.error) {
        setMessage({ text: res.error, type: 'error' });
      } else if (res?.success) {
        setMessage({ text: res.success, type: 'success' });
      }
    } catch (e) {
      setMessage({ text: "Terjadi kesalahan sistem.", type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-3 border border-zinc-200/70">
          Super Admin Console
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
          Dasbor Pengelola AdaKepri
        </h1>
        <p className="text-sm text-zinc-500 mt-1 font-normal">
          Pusat kendali akun pengguna, moderasi UMKM, dan kurasi talenta lokal.
        </p>
      </div>

      {message && (
        <div className={`p-3.5 rounded-lg text-xs font-medium border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
          {message.text}
        </div>
      )}

      {/* Navigation Pills Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200/80 pb-4">
        {[
          { id: 'overview', label: 'Ikhtisar' },
          { id: 'users', label: `Pengguna (${users?.length || 0})` },
          { id: 'umkm', label: `UMKM (${umkms?.length || 0})` },
          { id: 'freelancers', label: `Freelancer (${freelancers?.length || 0})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-zinc-950 text-white shadow-xs' 
                : 'bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 border border-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}

        <div className="h-4 w-px bg-zinc-200 mx-1 hidden sm:block"></div>

        <Link
          href="/admin/moderation"
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors bg-white text-zinc-800 hover:bg-zinc-50 border border-zinc-200 flex items-center gap-1.5"
        >
          <span>Moderasi UMKM</span>
          {stats?.pendingUMKM > 0 && (
            <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {stats.pendingUMKM}
            </span>
          )}
        </Link>
        <Link
          href="/admin/reports"
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors bg-white text-zinc-800 hover:bg-zinc-50 border border-zinc-200 flex items-center gap-1.5"
        >
          <span>Laporan Masuk</span>
          {stats?.totalReports > 0 && (
            <span className="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {stats.totalReports}
            </span>
          )}
        </Link>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-xl border border-zinc-200/90 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800 shrink-0">
                <Users size={20} />
              </div>
              <div>
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Total Pengguna</div>
                <div className="text-2xl font-bold text-zinc-950 tracking-tight">{stats.totalUsers}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-zinc-200/90 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800 shrink-0">
                <Store size={20} />
              </div>
              <div>
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Total UMKM</div>
                <div className="text-2xl font-bold text-zinc-950 tracking-tight">{stats.totalUMKM}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-zinc-200/90 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800 shrink-0">
                <Briefcase size={20} />
              </div>
              <div>
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Total Freelancer</div>
                <div className="text-2xl font-bold text-zinc-950 tracking-tight">{stats.totalFreelancer}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-zinc-200/90 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div>
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Menunggu Kurasi</div>
                <div className="text-2xl font-bold text-amber-700 tracking-tight">{stats.pendingUMKM}</div>
              </div>
            </div>

          </div>

          {/* Quick Action Alert if Pending */}
          {stats.pendingUMKM > 0 && (
            <div className="bg-white rounded-xl p-5 border border-zinc-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950">Ada {stats.pendingUMKM} UMKM baru yang perlu disetujui</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Tinjau deskripsi dan informasi kontak untuk mempublikasikannya ke Beranda.</p>
              </div>
              <Link
                href="/admin/moderation"
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Buka Antrean Moderasi</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-zinc-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Nama Pengguna</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role Akses</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {users.map((u: any) => (
                  <tr key={u.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="px-5 py-3 font-semibold text-zinc-950">{u.name || '-'}</td>
                    <td className="px-5 py-3 text-zinc-500">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${u.role === 'ADMIN' ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {u.email !== 'admin@adakepri.local' && (
                        <button 
                          disabled={loading}
                          onClick={() => { if(confirm(`Yakin ingin menghapus akun ${u.name || u.email}?`)) handleAction(deleteUserAdmin, u.id) }}
                          className="text-zinc-400 hover:text-rose-600 p-1.5 rounded transition-colors cursor-pointer"
                          title="Hapus Akun"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UMKM Tab */}
      {activeTab === 'umkm' && (
        <div className="bg-white rounded-xl border border-zinc-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Nama Bisnis</th>
                  <th className="px-5 py-3">Kategori &amp; Wilayah</th>
                  <th className="px-5 py-3">Pemilik</th>
                  <th className="px-5 py-3">Status Publikasi</th>
                  <th className="px-5 py-3">Verifikasi</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {umkms.map((u: any) => (
                  <tr key={u.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="px-5 py-3 font-semibold text-zinc-950">{u.title}</td>
                    <td className="px-5 py-3">
                      <span>{u.category}</span> • <span className="text-zinc-400">{u.location}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-zinc-800">{u.owner?.name || '-'}</div>
                      <div className="text-[11px] text-zinc-400">{u.owner?.email || '-'}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                        u.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' :
                        u.status === 'PENDING' ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'APPROVED' ? 'bg-emerald-500' : u.status === 'PENDING' ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {u.terverifikasi ? (
                        <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 size={13} /> Terverifikasi
                        </span>
                      ) : (
                        <span className="text-[11px] text-zinc-400">Belum</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right space-x-1">
                      <button 
                        disabled={loading}
                        onClick={() => handleAction(toggleVerifyUMKM, u.id, u.terverifikasi)}
                        className="px-2.5 py-1 text-xs font-medium border border-zinc-200 rounded hover:bg-zinc-50 text-zinc-700 cursor-pointer transition-colors"
                      >
                        {u.terverifikasi ? "Cabut Centang" : "Beri Centang"}
                      </button>
                      <button 
                        disabled={loading}
                        onClick={() => { if(confirm(`Yakin ingin menghapus UMKM "${u.title}"?`)) handleAction(deleteUMKMAdmin, u.id) }}
                        className="text-zinc-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Freelancers Tab */}
      {activeTab === 'freelancers' && (
        <div className="bg-white rounded-xl border border-zinc-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Nama Talenta</th>
                  <th className="px-5 py-3">Profesi &amp; Kota</th>
                  <th className="px-5 py-3">Ketersediaan</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {freelancers.map((f: any) => (
                  <tr key={f.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="px-5 py-3 font-semibold text-zinc-950">
                      <div>{f.user?.name || '-'}</div>
                      <div className="text-[11px] text-zinc-400 font-normal">{f.user?.email || '-'}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div>{f.profession}</div>
                      <div className="text-[11px] text-zinc-400">{f.kota}</div>
                    </td>
                    <td className="px-5 py-3">{f.ketersediaan}</td>
                    <td className="px-5 py-3">
                      {f.terverifikasi ? (
                        <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 size={13} /> Terverifikasi
                        </span>
                      ) : (
                        <span className="text-[11px] text-zinc-400">Belum</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right space-x-1">
                      <button 
                        disabled={loading}
                        onClick={() => handleAction(toggleVerifyFreelancer, f.id, f.terverifikasi)}
                        className="px-2.5 py-1 text-xs font-medium border border-zinc-200 rounded hover:bg-zinc-50 text-zinc-700 cursor-pointer transition-colors"
                      >
                        {f.terverifikasi ? "Cabut Centang" : "Beri Centang"}
                      </button>
                      <button 
                        disabled={loading}
                        onClick={() => { if(confirm(`Yakin ingin menghapus profil freelancer ini?`)) handleAction(deleteFreelancerAdmin, f.id) }}
                        className="text-zinc-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
