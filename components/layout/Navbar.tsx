"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-800 text-slate-900 tracking-tight">Ada</span>
            <span className="text-2xl font-800 text-primary tracking-tight">Kepri</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-base font-600 text-slate-600 hover:text-primary transition-colors">Beranda</Link>
            <Link href="/freelancers" className="text-base font-600 text-slate-600 hover:text-primary transition-colors">Freelancer</Link>
            <Link href="/umkm" className="text-base font-600 text-slate-600 hover:text-primary transition-colors">UMKM</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 text-base font-600 text-primary border-2 border-primary rounded-lg hover:bg-slate-50 transition-colors text-center"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 text-base font-600 text-white bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] rounded-lg transition-colors shadow-sm text-center"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary p-2 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-fade-in bg-white shadow-lg absolute left-0 right-0 top-20 px-4 pb-6">
            <div className="flex flex-col space-y-5">
              <Link href="/" className="text-lg font-600 text-slate-700 hover:text-primary" onClick={() => setIsOpen(false)}>Beranda</Link>
              <Link href="/freelancers" className="text-lg font-600 text-slate-700 hover:text-primary" onClick={() => setIsOpen(false)}>Freelancer</Link>
              <Link href="/umkm" className="text-lg font-600 text-slate-700 hover:text-primary" onClick={() => setIsOpen(false)}>UMKM</Link>
              <hr className="border-slate-200" />
              <div className="flex flex-col gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3 text-lg font-600 text-primary border-2 border-primary rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 text-lg font-600 text-white bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] rounded-lg text-center shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
