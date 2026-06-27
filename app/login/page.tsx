"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
    alert('Masuk (console.log)')
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-[#E2E8F0]">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center mb-6">
              <span className="text-2xl font-700 text-[#0077B6]">Kepri</span>
              <span className="text-2xl font-700 text-[#D97706]">Hub</span>
            </Link>
            <h1 className="text-2xl font-600 text-[#1A202C]">Selamat Datang Kembali</h1>
            <p className="text-[#64748B] mt-2 text-sm">Masuk untuk mengelola profil dan koneksi Anda.</p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider mb-2">Alamat Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-600 text-[#64748B] uppercase tracking-wider">Kata Sandi</label>
                <a href="#" className="text-xs font-500 text-[#0077B6] hover:underline">Lupa Sandi?</a>
              </div>
              <input
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white shadow-md rounded-xl font-600 transition-all"
            >
              Masuk Sekarang
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#E2E8F0] text-center text-sm text-[#64748B]">
            Belum punya akun? <Link href="/register" className="font-600 text-[#D97706] hover:text-[#D96D00] transition-colors">Daftar Sekarang</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
