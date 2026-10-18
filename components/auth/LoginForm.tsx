"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginUser } from '@/lib/actions/auth'
import { ArrowLeft, ArrowRight, Store, AlertCircle } from 'lucide-react'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.target as HTMLFormElement)
    try {
      const res = await loginUser(form)
      if (res?.error) {
        setError(res.error)
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-[#FAFAFA]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xs border border-zinc-200/90">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-3 border border-zinc-200/80">
            <Store size={13} />
            <span>Portal Mitra &amp; Produsen</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Masuk Akun Pengelola</h1>
          <p className="text-xs text-zinc-500 mt-1.5 font-normal leading-relaxed">
            Masuk untuk mempublikasikan produk UMKM atau memperbarui profil talenta Anda.
          </p>
        </div>

        {/* Public Visitor Notice */}
        <div className="mb-6 p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
          <div>
            <span className="font-semibold text-zinc-900">Hanya ingin mencari produk?</span> Anda tidak perlu login. Langsung{' '}
            <Link href="/" className="font-semibold text-zinc-950 underline hover:text-zinc-600 inline-flex items-center gap-0.5">
              <span>Cari di Direktori</span>
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-xs font-medium mb-6 border border-rose-200 flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
              Alamat Email / Username
            </label>
            <input
              type="text"
              name="email"
              required
              placeholder="nama@email.com"
              className="w-full border border-zinc-200 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none px-3.5 py-2.5 rounded-xl transition-all text-xs font-medium text-zinc-900 placeholder-zinc-400"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
                Kata Sandi
              </label>
            </div>
            <input
              required
              name="password"
              placeholder="••••••••"
              type="password"
              className="w-full border border-zinc-200 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none px-3.5 py-2.5 rounded-xl transition-all text-xs font-medium text-zinc-900 placeholder-zinc-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-60 shadow-xs cursor-pointer"
          >
            {loading ? "Memproses..." : "Masuk ke Dasbor"}
          </button>
        </form>

        <div className="my-5 flex items-center justify-between">
          <hr className="w-full border-zinc-200" />
          <span className="px-3 text-[11px] text-zinc-400 font-medium bg-white shrink-0">ATAU</span>
          <hr className="w-full border-zinc-200" />
        </div>

        <button
          onClick={() => {
            setLoading(true);
            import("next-auth/react").then(({ signIn }) => signIn('google', { callbackUrl: '/dashboard' }));
          }}
          disabled={loading}
          className="w-full py-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2.5 disabled:opacity-60 shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Masuk dengan Google
        </button>

        <div className="mt-6 pt-5 border-t border-zinc-100 text-center text-xs text-zinc-500">
          Belum mendaftarkan usaha Anda?{' '}
          <Link href="/register" className="font-semibold text-zinc-950 hover:underline">
            Daftar Usaha Baru (Gratis)
          </Link>
        </div>
      </div>
    </main>
  )
}
