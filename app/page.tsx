import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import FreelancerCard from "../components/freelancer/FreelancerCard"
import UMKMCard from "../components/umkm/UMKMCard"
import InteractiveMap from "../components/home/InteractiveMap"
import { getAllFreelancers } from "@/lib/actions/freelancer"
import { getAllUMKM } from "@/lib/actions/umkm"
import {
  Search, MapPin, ArrowRight, ChevronDown, Check, X
} from 'lucide-react'

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{ q?: string; kota?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const rawQ = (params?.q || "").trim()
  const q = rawQ.toLowerCase()
  const kota = (params?.kota || "").trim()

  const freelancers = await getAllFreelancers()
  const dbUmkms = await getAllUMKM()

  const umkms = dbUmkms.map(u => ({
    id: u.id,
    namaBisnis: u.title,
    kategori: u.category as any,
    deskripsi: u.description,
    kota: u.location,
    alamat: u.location,
    googleMapsUrl: '',
    nomorWA: '',
    jamBuka: '-',
    logo: u.imageUrls[0] || 'https://placehold.co/100x100?text=UMKM',
    galeriProduk: u.imageUrls,
    terverifikasi: false,
    totalDilihat: 0,
    rating: 0,
    reviews: [],
  }))

  const totalFreelancer = freelancers.length
  const totalUMKM = umkms.length
  const totalKota = new Set([...freelancers.map(f => f.kota as string), ...umkms.map(u => u.kota)]).size

  // Universal Filter: Filter both Freelancers & UMKMs based on query and city
  const filteredUmkms = umkms.filter(u => {
    if (kota && u.kota !== kota) return false
    if (q) {
      const matchName = (u.namaBisnis || '').toLowerCase().includes(q)
      const matchDesc = (u.deskripsi || '').toLowerCase().includes(q)
      const matchKat = (u.kategori || '').toLowerCase().includes(q)
      const matchCity = (u.kota || '').toLowerCase().includes(q)
      if (!matchName && !matchDesc && !matchKat && !matchCity) return false
    }
    return true
  })

  const filteredFreelancers = freelancers.filter(f => {
    if (kota && f.kota !== kota) return false
    if (q) {
      const matchName = (f.nama || '').toLowerCase().includes(q)
      const matchProf = (f.profession || '').toLowerCase().includes(q)
      const matchBio = (f.bio || '').toLowerCase().includes(q)
      const matchSkill = (f.skills || []).some((s: string) => s.toLowerCase().includes(q))
      const matchCity = (f.kota || '').toLowerCase().includes(q)
      if (!matchName && !matchProf && !matchBio && !matchSkill && !matchCity) return false
    }
    return true
  })

  const isSearching = Boolean(rawQ || kota)

  const cityStats: Record<string, { freelancer: number; umkm: number }> = {}
  freelancers.forEach(f => {
    const k = f.kota || 'Lainnya'
    if (!cityStats[k]) cityStats[k] = { freelancer: 0, umkm: 0 }
    cityStats[k].freelancer++
  })
  umkms.forEach(u => {
    const k = u.kota || 'Lainnya'
    if (!cityStats[k]) cityStats[k] = { freelancer: 0, umkm: 0 }
    cityStats[k].umkm++
  })

  const faqs = [
    { q: "Apakah mendaftar di AdaKepri berbayar?", a: "Tidak. AdaKepri adalah direktori 100% gratis untuk seluruh talenta dan pemilik usaha lokal di Kepulauan Riau." },
    { q: "Bagaimana cara menghubungi penyedia jasa atau UMKM?", a: "Klik profil mereka, lalu tekan tombol kontak WhatsApp untuk langsung terhubung tanpa biaya perantara." },
    { q: "Apakah ada biaya transaksi atau komisi?", a: "Tidak ada komisi sama sekali. Transaksi dan pembayaran dilakukan secara langsung antara Anda dan pihak penyedia jasa." },
    { q: "Siapa saja yang memenuhi syarat untuk mendaftar?", a: "Siapa saja freelancer, kreator, profesional mandiri, maupun pemilik UMKM yang berdomisili atau beroperasi di Kepulauan Riau." }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />

      {/* Hero Section - Clean Editorial & Search Console */}
      <header className="pt-16 pb-14 md:pt-24 md:pb-20 border-b border-zinc-200/70 bg-white">
        <div className="container-custom max-w-4xl text-center">
          
          {/* Subtle Top Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-6 border border-zinc-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>
            Direktori Terbuka Kepulauan Riau
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.15] mb-5">
            Direktori Talenta &amp; Bisnis Lokal Kepulauan Riau
          </h1>

          {/* Subline */}
          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Platform terpusat untuk menemukan talenta profesional terverifikasi dan produk UMKM terbaik di seluruh penjuru Kepri.
          </p>

          {/* Unified Working Search Console (Submits to / to search BOTH UMKM & Freelancers) */}
          <form action="/" method="GET" className="bg-white p-1.5 sm:p-2 rounded-xl border border-zinc-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-2xl mx-auto focus-within:border-zinc-950 transition-colors">
            <div className="flex-1 min-w-0 flex items-center px-3 py-1.5">
              <Search size={18} className="text-zinc-400 mr-2.5 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={rawQ}
                placeholder="Cari produk UMKM, kuliner, desainer, keahlian..."
                className="bg-transparent border-none outline-none w-full text-zinc-900 placeholder-zinc-400 text-sm font-medium"
              />
            </div>

            <div className="border-t md:border-t-0 md:border-l border-zinc-200 flex items-center px-3 py-1.5 md:w-44 shrink-0">
              <MapPin size={16} className="text-zinc-400 mr-2 shrink-0" />
              <select
                name="kota"
                className="bg-transparent border-none outline-none w-full text-zinc-700 text-sm font-medium cursor-pointer"
                defaultValue={kota}
              >
                <option value="">Semua Wilayah</option>
                <option value="Batam">Batam</option>
                <option value="Tanjungpinang">Tanjungpinang</option>
                <option value="Bintan">Bintan</option>
                <option value="Karimun">Karimun</option>
                <option value="Lingga">Lingga</option>
                <option value="Natuna">Natuna</option>
                <option value="Anambas">Anambas</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-medium rounded-lg px-6 py-2.5 transition-colors text-sm shadow-xs whitespace-nowrap cursor-pointer shrink-0"
            >
              Cari Data
            </button>
          </form>

          {/* Active Search Results Banner */}
          {isSearching && (
            <div className="max-w-2xl mx-auto mt-4 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-fade-in">
              <div className="flex items-center gap-2 text-zinc-700 text-left">
                <Search size={14} className="text-zinc-500 shrink-0" />
                <span>
                  Hasil pencarian {rawQ ? <>kata kunci <strong className="text-zinc-950 font-semibold">&ldquo;{rawQ}&rdquo;</strong></> : null}
                  {kota ? <> di wilayah <strong className="text-zinc-950 font-semibold">{kota}</strong></> : null}:
                  {' '}Ditemukan <strong className="text-zinc-950 font-semibold">{filteredUmkms.length} UMKM</strong> dan <strong className="text-zinc-950 font-semibold">{filteredFreelancers.length} Freelancer</strong>
                </span>
              </div>
              <a
                href="/"
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 flex items-center gap-1 shrink-0 transition-colors py-1 px-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100"
              >
                <X size={13} />
                <span>Reset</span>
              </a>
            </div>
          )}

          {/* Frictionless Public Notice */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-500 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Bebas cari &amp; hubungi penjual langsung tanpa login. Pendaftaran hanya untuk pelaku usaha &amp; talenta.</span>
          </div>

          {/* Inline Verified Statistics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-7 pt-6 border-t border-zinc-100 text-xs text-zinc-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-950">{totalFreelancer}</span>
              <span>Talenta Mandiri</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-950">{totalUMKM}</span>
              <span>UMKM Lokal</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-950">{totalKota || 7}</span>
              <span>Kota &amp; Kabupaten</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <Check size={14} className="stroke-[2.5]" />
              <span>100% Gratis</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Sections */}
      <main className="container-custom py-14 md:py-20 space-y-20">

        {/* Featured UMKM Section */}
        <section>
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200/80">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                <span>Direktori Bisnis</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                UMKM &amp; Bisnis Lokal ({filteredUmkms.length})
              </h2>
              <p className="text-sm text-zinc-500 mt-1 font-normal">
                Dukung pertumbuhan usaha sekitar mulai dari kuliner, kerajinan, hingga jasa lokal.
              </p>
            </div>
            <a
              href={`/umkm${isSearching ? `?${new URLSearchParams({ ...(rawQ ? { q: rawQ } : {}), ...(kota ? { kota } : {}) }).toString()}` : ''}`}
              className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Katalog Lengkap ({totalUMKM})</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {filteredUmkms.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-zinc-200 text-xs text-zinc-500">
              Tidak ada UMKM yang cocok dengan pencarian &ldquo;{rawQ || kota}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUmkms.slice(0, 6).map(u => (
                <UMKMCard key={u.id} u={u} />
              ))}
            </div>
          )}
        </section>

        {/* Featured Freelancers Section */}
        <section>
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200/80">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                <span>Talenta Terverifikasi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                Freelancer &amp; Jasa Mandiri ({filteredFreelancers.length})
              </h2>
              <p className="text-sm text-zinc-500 mt-1 font-normal">
                Talenta mandiri yang siap membantu kebutuhan teknis dan kreatif proyek Anda.
              </p>
            </div>
            <a
              href={`/freelancers${isSearching ? `?${new URLSearchParams({ ...(rawQ ? { q: rawQ } : {}), ...(kota ? { kota } : {}) }).toString()}` : ''}`}
              className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Katalog Lengkap ({totalFreelancer})</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {filteredFreelancers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-zinc-200 text-xs text-zinc-500">
              Tidak ada freelancer yang cocok dengan pencarian &ldquo;{rawQ || kota}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFreelancers.slice(0, 6).map(f => (
                <FreelancerCard key={f.id} f={f} />
              ))}
            </div>
          )}
        </section>

        {/* Bento Grid: Nilai Platform (Clean & Informative) */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-zinc-200/90 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Prinsip Platform</span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 mt-1">
              Dirancang untuk Kemudahan Akses &amp; Transparansi
            </h2>
            <p className="text-sm text-zinc-500 mt-2 font-normal leading-relaxed">
              AdaKepri berfungsi murni sebagai fasilitator keterhubungan lokal, bukan perantara transaksi yang mengenakan potongan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-zinc-200/80 bg-[#FAFAFA]">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-zinc-950 mb-1.5">Kontak Langsung WhatsApp</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                Hubungi penyedia jasa atau penjual langsung via chat tanpa komisi atau perantara sistem.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200/80 bg-[#FAFAFA]">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-zinc-950 mb-1.5">Terkurasi Manual</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                Setiap profil ditinjau untuk memastikan portofolio nyata, identitas jelas, dan domisili Kepulauan Riau.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200/80 bg-[#FAFAFA]">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-zinc-950 mb-1.5">Gratis 100% untuk Semua</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                Mendaftar, mempublikasikan portofolio, dan mencari rekan kerja sepenuhnya tanpa biaya sepeser pun.
              </p>
            </div>
          </div>
        </section>

        {/* Peta Ekosistem Wilayah */}
        <section className="pt-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Cakupan Wilayah</span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 mt-1">
              Peta Ekosistem Kepulauan Riau
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5 font-normal">
              Arahkan kursor pada titik wilayah untuk melihat persebaran talenta dan unit usaha lokal.
            </p>
          </div>
          <InteractiveMap stats={cityStats} />
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-zinc-200/90 shadow-xs max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Informasi seputar cara kerja platform direktori AdaKepri.
            </p>
          </div>

          <div className="divide-y divide-zinc-100">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-4 first:pt-0 last:pb-0 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none py-1 text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="text-zinc-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="pt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA (Minimalist Solid Box) */}
        <section className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-12 text-center shadow-xs">
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Punya Usaha UMKM atau Keahlian Jasa?
            </h3>
            <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-normal">
              Buka profil dan pajang produk Anda secara gratis. Hubungkan usaha Anda ke calon pembeli di seluruh Kepulauan Riau tanpa biaya komisi perantara.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/register"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-100 transition-colors shadow-xs"
              >
                Daftarkan Usaha / Jasa (Gratis)
              </a>
              <a
                href="/umkm"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 font-semibold text-sm hover:text-white hover:border-zinc-500 transition-colors"
              >
                Jelajahi Produk &amp; Jasa
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
