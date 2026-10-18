"use client";

import { useState } from "react";
import { loginAdminAction } from "@/lib/actions/admin-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", email.trim());
      formData.append("password", password);

      const res = await loginAdminAction(formData);

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-zinc-900">
      
      {/* Back button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-zinc-200/90 shadow-xs">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-zinc-200/80 text-zinc-950">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950">
              Portal Super Admin
            </h1>
            <p className="text-xs text-zinc-500 mt-1 font-normal">
              Masuk menggunakan kredensial pengelola AdaKepri.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-700 font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Username / Email Admin
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none transition-colors"
                placeholder="admin"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm shadow-xs transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Masuk ke Dasbor Admin"
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-100 text-center">
            <span className="text-[11px] text-zinc-400">
              Kredensial dikonfigurasi melalui lingkungan server (.env)
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
