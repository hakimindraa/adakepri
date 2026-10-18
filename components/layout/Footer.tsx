import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/80 text-zinc-500 py-14">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-1.5 mb-3">
              <span className="text-lg font-bold tracking-tight text-zinc-950">
                Ada<span className="text-zinc-500 font-medium">Kepri</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                Direktori
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Direktori terbuka untuk menemukan talenta profesional dan pelaku UMKM di seluruh wilayah Kepulauan Riau.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-14">
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Direktori</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-zinc-950 transition-colors">Beranda</Link></li>
                <li><Link href="/freelancers" className="hover:text-zinc-950 transition-colors">Semua Freelancer</Link></li>
                <li><Link href="/umkm" className="hover:text-zinc-950 transition-colors">Semua UMKM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Tautan</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/register" className="hover:text-zinc-950 transition-colors">Daftarkan Jasa / Usaha</Link></li>
                <li><Link href="/login" className="hover:text-zinc-950 transition-colors">Masuk Akun</Link></li>
                <li><a href="https://wa.me/" target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">Kontak Bantuan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Wilayah</h4>
              <div className="text-xs text-zinc-400 space-y-1">
                <p>Batam • Bintan • Tanjungpinang</p>
                <p>Karimun • Lingga • Natuna • Anambas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} AdaKepri. Menghubungkan ekosistem lokal Kepulauan Riau.
          </p>
          <div className="flex gap-4">
            <span>Platform Komunitas Terbuka</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
