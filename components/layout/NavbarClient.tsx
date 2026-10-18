"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function NavbarClient({ 
  session, 
  userRole = "USER",
}: { 
  session: any, 
  userRole?: string,
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .nav-desktop-only { display: none !important; }
        @media (min-width: 768px) { .nav-desktop-only { display: flex !important; } }
        .nav-mobile-only { display: flex !important; }
        @media (min-width: 768px) { .nav-mobile-only { display: none !important; } }
      `}} />
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-1.5 group">
              <span className="text-xl font-bold tracking-tight text-zinc-950">
                Ada<span className="text-zinc-500 font-medium">Kepri</span>
              </span>

            </Link>

            {/* DESKTOP NAVBAR LAYOUT */}
            <div className="nav-desktop-only items-center justify-end flex-1 gap-10">

              {/* Desktop Navigation Links */}
              <div className="flex items-center gap-7">
                <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
                  Beranda
                </Link>
                <Link href="/freelancers" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
                  Freelancer
                </Link>
                <Link href="/umkm" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
                  UMKM
                </Link>
              </div>

              {/* Desktop Auth Section */}
              <div className="flex items-center gap-3 pl-6 border-l border-zinc-200">
                {session ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors bg-zinc-50 hover:bg-zinc-100 py-1.5 px-3 rounded-lg border border-zinc-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 overflow-hidden text-xs">
                        {session.user?.image ? (
                          <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                        ) : (
                          <User size={13} />
                        )}
                      </div>
                      <span>Dasbor Mitra</span>
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="text-sm font-medium text-zinc-500 hover:text-rose-600 transition-colors px-2 py-1"
                    >
                      Keluar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition-colors"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg transition-colors shadow-xs"
                    >
                      Daftar Usaha / Jasa
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE NAVBAR TOGGLE */}
            <div className="nav-mobile-only items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-700 hover:text-zinc-950 p-2 transition-colors rounded-lg hover:bg-zinc-100"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Overlay */}
          {isOpen && (
            <div className="nav-mobile-only flex-col py-4 border-t border-zinc-200 bg-white/95 backdrop-blur-md absolute left-0 right-0 top-16 px-5 pb-6 shadow-sm border-b">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-base font-medium text-zinc-700 hover:text-zinc-950" onClick={() => setIsOpen(false)}>Beranda</Link>
                <Link href="/freelancers" className="text-base font-medium text-zinc-700 hover:text-zinc-950" onClick={() => setIsOpen(false)}>Freelancer</Link>
                <Link href="/umkm" className="text-base font-medium text-zinc-700 hover:text-zinc-950" onClick={() => setIsOpen(false)}>UMKM</Link>
                <hr className="border-zinc-200" />
                <div className="flex flex-col gap-2.5 pt-1">
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="w-full py-2.5 text-sm font-medium text-zinc-900 border border-zinc-200 rounded-lg text-center bg-zinc-50"
                        onClick={() => setIsOpen(false)}
                      >
                        Dasbor Mitra
                      </Link>
                      <button
                        onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }}
                        className="w-full py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg text-center"
                      >
                        Keluar Akun Mitra
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="w-full py-2.5 text-sm font-medium text-zinc-800 border border-zinc-200 rounded-lg text-center hover:bg-zinc-50"
                        onClick={() => setIsOpen(false)}
                      >
                        Masuk Akun Mitra
                      </Link>
                      <Link
                        href="/register"
                        className="w-full py-2.5 text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Daftar Usaha / Jasa Baru
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
