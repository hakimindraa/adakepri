import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { freelancers, umkms } from "../lib/data"
import FreelancerCard from "../components/freelancer/FreelancerCard"
import UMKMCard from "../components/umkm/UMKMCard"
import {
  Laptop, Palette, Camera, Utensils, Shirt, Wrench,
  Search, MessageCircle, CheckCircle, UserPlus,
  MapPin, BadgeCheck, Zap, ArrowRight, ChevronDown
} from 'lucide-react'

export default function Home() {
  const totalFreelancer = freelancers.length
  const totalUMKM = umkms.length
  const totalKota = new Set([...freelancers.map(f => f.kota as string), ...umkms.map(u => u.kota)]).size

  const categories = [
    { name: 'IT & Software', icon: <Laptop size={24} />, color: 'bg-blue-50 text-blue-600' },
    { name: 'Desain Grafis', icon: <Palette size={24} />, color: 'bg-purple-50 text-purple-600' },
    { name: 'Fotografi', icon: <Camera size={24} />, color: 'bg-rose-50 text-rose-600' },
    { name: 'Kuliner', icon: <Utensils size={24} />, color: 'bg-orange-50 text-orange-600' },
    { name: 'Fashion', icon: <Shirt size={24} />, color: 'bg-pink-50 text-pink-600' },
    { name: 'Jasa Teknis', icon: <Wrench size={24} />, color: 'bg-slate-50 text-slate-600' },
  ]

  const cities = [
    { name: 'Batam', img: 'https://images.unsplash.com/photo-1596438411234-70a058d46691?q=80&w=400&auto=format&fit=crop' },
    { name: 'Tanjungpinang', img: 'https://images.unsplash.com/photo-1621245151520-2227d86f7e02?q=80&w=400&auto=format&fit=crop' },
    { name: 'Bintan', img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=400&auto=format&fit=crop' },
    { name: 'Karimun', img: 'https://images.unsplash.com/photo-1544735032-6a71ddef2b27?q=80&w=400&auto=format&fit=crop' },
    { name: 'Natuna', img: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=400&auto=format&fit=crop' },
    { name: 'Anambas', img: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=400&auto=format&fit=crop' },
  ]

  const faqs = [
    { q: "Apakah mendaftar di KepriHub berbayar?", a: "Tidak. KepriHub adalah platform direktori 100% gratis untuk seluruh freelancer dan UMKM di Kepulauan Riau." },
    { q: "Bagaimana cara menghubungi freelancer atau UMKM?", a: "Anda cukup klik profil mereka, lalu tekan tombol 'WhatsApp' untuk langsung terhubung melalui chat tanpa perantara." },
    { q: "Apakah transaksi dilakukan di dalam website?", a: "Tidak. KepriHub hanya berfungsi sebagai jembatan penghubung. Transaksi dan pembayaran dilakukan secara mandiri antara Anda dan penyedia jasa." },
    { q: "Siapa saja yang bisa mendaftar?", a: "Siapa pun talenta kreatif dan pemilik usaha yang berdomisili atau memiliki operasional bisnis di wilayah Kepulauan Riau." }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-16 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-[#064E3B]">
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Text & CTA */}
            <div className="text-left animate-fade-in z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-emerald-50 text-sm font-500 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
                Platform Direktori #1 di Kepulauan Riau
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-800 tracking-tight text-white mb-6 leading-[1.15]">
                Temukan Freelancer & UMKM <br className="hidden lg:block" />
                <span className="text-green-300">
                  Lokal Terbaik
                </span>
              </h1>
              <p className="text-lg md:text-xl font-400 text-emerald-50/80 max-w-xl mb-10 leading-relaxed">
                Jembatan penghubung talenta kreatif dan bisnis lokal di Kepri. Cari jasa atau dukung produk sekitar Anda dengan mudah, aman, dan tanpa biaya.
              </p>

              {/* Search Bar Simulation */}
              <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-xl mb-8">
                <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <Search size={20} className="text-slate-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari jasa desain, web dev, katering..."
                    className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400"
                  />
                </div>
                <button className="bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white font-600 rounded-xl px-8 py-3 transition-all shadow-md whitespace-nowrap">
                  Cari Sekarang
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-[#047857] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#047857] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#047857] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#047857] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" />
                </div>
                <div className="text-emerald-50/90 text-sm font-500">
                  <div className="flex text-amber-400 mb-0.5 text-lg leading-none">
                    ★★★★★
                  </div>
                  Dipercaya 1.000+ warga Kepri
                </div>
              </div>
            </div>

            {/* Right Column: Visuals (Hidden on small mobile for performance) */}
            <div className="hidden lg:block relative h-[500px] w-full">
              {/* Floating Element 1: Freelancer */}
              <div className="absolute top-8 right-8 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 hover:-translate-y-2 transition-all duration-300 animate-slide-up z-20">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 p-0.5">
                    <img className="w-full h-full rounded-full object-cover border-2 border-transparent" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop" alt="Freelancer" />
                  </div>
                  <div>
                    <div className="text-white font-600 text-sm">Ahmad Fauzi</div>
                    <div className="text-emerald-200 text-xs">Web Developer • Batam</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-md">React</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-md">Next.js</span>
                </div>
              </div>

              {/* Floating Element 2: UMKM */}
              <div className="absolute bottom-12 left-0 w-72 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl transform -rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-300 animate-slide-up z-30" style={{ animationDelay: '0.2s' }}>
                <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=300&auto=format&fit=crop" alt="UMKM" className="w-full h-32 object-cover rounded-xl mb-3" />
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-slate-900 font-700 text-sm">Kopi Tarik Pesisir</div>
                    <div className="text-slate-500 text-xs">Tanjungpinang</div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 text-xs font-600 px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="text-amber-500">★</span> 4.9
                  </div>
                </div>
              </div>

              {/* Decorative abstract shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-emerald-400/30 to-amber-400/20 rounded-full blur-3xl z-10"></div>
            </div>

          </div>
        </div>
      </header>

      {/* Stats Bar (Floating Overlap) */}
      <section className="relative z-20 -mt-12 mb-10">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="py-8 text-center bg-white hover:bg-slate-50 transition-colors">
                <div className="text-4xl font-800 text-transparent bg-clip-text bg-gradient-to-r from-[#047857] to-emerald-400 mb-1">{totalFreelancer}</div>
                <div className="text-sm font-600 text-slate-500 uppercase tracking-wider">Freelancer Terdaftar</div>
              </div>
              <div className="py-8 text-center bg-white hover:bg-slate-50 transition-colors">
                <div className="text-4xl font-800 text-transparent bg-clip-text bg-gradient-to-r from-[#047857] to-emerald-400 mb-1">{totalUMKM}</div>
                <div className="text-sm font-600 text-slate-500 uppercase tracking-wider">UMKM Aktif</div>
              </div>
              <div className="py-8 text-center bg-white hover:bg-slate-50 transition-colors">
                <div className="text-4xl font-800 text-transparent bg-clip-text bg-gradient-to-r from-[#047857] to-emerald-400 mb-1">{totalKota}</div>
                <div className="text-sm font-600 text-slate-500 uppercase tracking-wider">Kota & Kabupaten</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Populer */}
      <section className="py-20 bg-slate-50/50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-800 text-slate-900 mb-4 tracking-tight">Kategori Populer</h2>
            <p className="text-lg text-slate-500">Telusuri berdasarkan keahlian atau jenis usaha yang Anda butuhkan.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`/freelancers?q=${cat.name}`}
                className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-sm md:text-base font-600 text-slate-800 group-hover:text-[#047857] transition-colors">{cat.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <main className="container-custom py-16 md:py-24 space-y-24">
        {/* Freelancers Section */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 mb-3">Freelancer Unggulan</h2>
              <p className="text-lg text-slate-600">Talenta kreatif yang siap membantu proyek Anda.</p>
            </div>
            <a href="/freelancers" className="hidden sm:inline-block text-base font-500 text-primary hover:text-primary-dark transition-colors">
              Lihat Semua &rarr;
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freelancers.slice(0, 3).map(f => <FreelancerCard key={f.id} f={f} />)}
          </div>
        </section>

        {/* Kenapa Memilih KepriHub? */}
        <section className="py-20 bg-primary/5 rounded-2xl px-8 md:px-12 border border-primary/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-700 text-slate-900 mb-4">Kenapa Memilih KepriHub?</h2>
            <p className="text-lg text-slate-600">Kami hadir untuk memperkuat ekosistem ekonomi kreatif di Kepulauan Riau.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-3">Asli Lokal Kepri</h3>
              <p className="text-base text-slate-600">Menghubungkan Anda dengan talenta dan bisnis dari kota sendiri.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary">
                <BadgeCheck size={32} />
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-3">Terverifikasi</h3>
              <p className="text-base text-slate-600">Profil freelancer dan UMKM telah melewati proses kurasi manual.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-3">Kontak Langsung</h3>
              <p className="text-base text-slate-600">Hubungi penyedia jasa langsung melalui WhatsApp tanpa perantara.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 text-primary">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-600 text-slate-900 mb-3">Gratis 100%</h3>
              <p className="text-base text-slate-600">Tidak ada potongan biaya atau komisi untuk setiap transaksi.</p>
            </div>
          </div>
        </section>

        {/* UMKM Section */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-700 text-slate-900 mb-3">UMKM Terbaru</h2>
              <p className="text-lg text-slate-600">Dukung bisnis lokal dan temukan produk terbaik.</p>
            </div>
            <a href="/umkm" className="hidden sm:inline-block text-base font-500 text-primary hover:text-primary-dark transition-colors">
              Lihat Semua &rarr;
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {umkms.slice(0, 3).map(u => <UMKMCard key={u.id} u={u} />)}
          </div>
        </section>

        {/* Jelajahi Berdasarkan Kota */}
        <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-700 text-slate-900 mb-4">Jelajahi Berdasarkan Kota</h2>
            <p className="text-lg text-slate-600">Temukan talenta dan bisnis di sekitar wilayah Anda.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cities.map((city) => (
              <a
                key={city.name}
                href={`/freelancers?kota=${city.name}`}
                className="group relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <img src={city.img} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-700 text-xl md:text-2xl mb-1">{city.name}</h3>
                  <p className="text-sm text-white/80 font-500">Lihat Profil &rarr;</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-700 text-slate-900 mb-4">Pertanyaan Umum</h2>
            <p className="text-lg text-slate-600">Mungkin kami sudah menjawab keraguan Anda di sini.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                  <h3 className="text-base md:text-lg font-600 text-slate-900">{faq.q}</h3>
                  <ChevronDown size={24} className="text-slate-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-5 animate-fade-in">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja & Final CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-700 text-slate-900 mb-4">Bagaimana Cara Kerjanya?</h2>
            <p className="text-lg text-slate-600">Mulai langkah Anda di KepriHub dengan proses yang sangat sederhana.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative mb-24">
            <div className="hidden md:block absolute top-10 left-24 right-24 h-0.5 bg-slate-200 z-0"></div>
            {[
              { title: 'Daftar Akun', desc: 'Pilih sebagai Freelancer atau UMKM.', icon: <UserPlus size={28} /> },
              { title: 'Cari Layanan', desc: 'Gunakan filter untuk menemukan profil.', icon: <Search size={28} /> },
              { title: 'Hubungi', desc: 'Klik tombol WA untuk mulai diskusi.', icon: <MessageCircle size={28} /> },
              { title: 'Selesai', desc: 'Transaksi langsung secara mandiri.', icon: <CheckCircle size={28} /> },
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white border-4 border-white ring-2 ring-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-600 text-slate-900 mb-3">{step.title}</h3>
                <p className="text-base text-slate-600 px-4">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="p-10 md:p-16 bg-[#047857] rounded-3xl text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#064E3B] to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-700 mb-6">Siap Memperluas Jangkauan Anda?</h3>
              <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">Bergabunglah dengan ratusan talenta dan bisnis lainnya di Kepulauan Riau hari ini.</p>
              <a href="/register" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white font-700 px-10 py-5 rounded-xl transition-all shadow-lg text-lg">
                Daftar Sekarang Gratis <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
