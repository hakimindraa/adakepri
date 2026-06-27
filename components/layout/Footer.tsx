import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#064E3B] text-white/70 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">Ada</span>
              <span className="text-xl font-bold text-green-300">Kepri</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Platform direktori lokal nomor satu di Kepulauan Riau. Menghubungkan talenta kreatif dan pelaku UMKM dengan masyarakat luas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div>
              <h4 className="text-white font-600 mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                <li><Link href="/freelancers" className="hover:text-white transition-colors">Freelancer</Link></li>
                <li><Link href="/umkm" className="hover:text-white transition-colors">UMKM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-600 mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Kontak</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} AdaKepri. Semua Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="#" className="hover:text-white">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
