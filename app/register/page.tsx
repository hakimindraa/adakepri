"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'
import { Laptop, Store, ArrowLeft } from 'lucide-react'

export default function Page() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<'freelancer' | 'umkm' | null>(null)
  const router = useRouter()

  const onSelectRole = (r: 'freelancer' | 'umkm') => {
    setRole(r)
    setStep(2)
  }

  const submitFreelancer = (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    console.log(Object.fromEntries(form.entries()))
    alert('Terdaftar (console.log)')
    router.push('/login')
  }

  const submitUMKM = (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    console.log(Object.fromEntries(form.entries()))
    alert('Terdaftar (console.log)')
    router.push('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 container-custom py-12 md:py-20 animate-fade-in">
        
        {step === 1 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-700 text-[#1A202C] mb-4">Mulai Perjalanan Anda</h1>
              <p className="text-[#64748B] text-base">Pilih jenis akun yang sesuai dengan profil Anda di AdaKepri.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={() => onSelectRole('freelancer')}
                className="group flex flex-col p-8 bg-white rounded-2xl border-2 border-transparent hover:border-[#047857] shadow-sm hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-[#047857]/10 text-[#0077B6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Laptop size={28} />
                </div>
                <h3 className="text-xl font-600 text-[#1A202C] mb-2">Sebagai Freelancer</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">Tawarkan jasa profesional Anda, atur tarif, dan temukan klien potensial di seluruh Kepulauan Riau.</p>
              </button>

              <button
                onClick={() => onSelectRole('umkm')}
                className="group flex flex-col p-8 bg-white rounded-2xl border-2 border-transparent hover:border-[#D97706] shadow-sm hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Store size={28} />
                </div>
                <h3 className="text-xl font-600 text-[#1A202C] mb-2">Sebagai UMKM</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">Daftarkan bisnis Anda, tampilkan produk unggulan, dan jangkau lebih banyak pelanggan lokal dengan mudah.</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm font-500 text-[#64748B] hover:text-[#0077B6] mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Kembali pilih peran
            </button>

            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
              <div className="mb-8">
                <h1 className="text-2xl font-600 text-[#1A202C]">Lengkapi Profil {role === 'freelancer' ? 'Freelancer' : 'UMKM'}</h1>
                <p className="text-sm text-[#64748B] mt-1">Informasi ini akan membantu orang lain mengenal Anda lebih baik.</p>
              </div>

              {role === 'freelancer' && (
                <form onSubmit={submitFreelancer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Foto Profil (Avatar)</label>
                      <input type="file" name="avatar" accept="image/*" className="w-full border border-[#E2E8F0] outline-none px-4 py-2.5 rounded-xl transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-500 file:bg-[#047857]/10 file:text-[#0077B6] hover:file:bg-[#047857]/20" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input required name="nama" placeholder="Contoh: Budi Santoso" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Email</label>
                      <input required type="email" name="email" placeholder="budi@email.com" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Kata Sandi</label>
                      <input required type="password" name="password" placeholder="••••••••" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Nomor WhatsApp</label>
                      <input required name="nomorwa" placeholder="628..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Kota Domisili</label>
                      <select name="kota" className="w-full bg-white border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm appearance-none">
                        <option>Batam</option>
                        <option>Tanjungpinang</option>
                        <option>Bintan</option>
                        <option>Karimun</option>
                        <option>Natuna</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Instagram URL</label>
                      <input name="instagramUrl" placeholder="https://instagram.com/..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">LinkedIn URL</label>
                      <input name="linkedinUrl" placeholder="https://linkedin.com/in/..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Keahlian (Skills)</label>
                      <input required name="skills" placeholder="Web Developer, Desain Grafis..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Upload Galeri Portofolio (Bisa Lebih Dari Satu)</label>
                      <input type="file" name="portfolio" multiple accept="image/*" className="w-full border border-[#E2E8F0] outline-none px-4 py-2.5 rounded-xl transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-500 file:bg-[#047857]/10 file:text-[#0077B6] hover:file:bg-[#047857]/20" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Bio Singkat</label>
                      <textarea required name="bio" placeholder="Ceritakan pengalaman Anda..." rows={3} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none px-4 py-3 rounded-xl transition-all text-sm resize-none" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white shadow-md rounded-xl font-600 transition-all mt-4">
                    Daftar Sebagai Freelancer
                  </button>
                </form>
              )}

              {role === 'umkm' && (
                <form onSubmit={submitUMKM} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Logo Bisnis</label>
                      <input type="file" name="logo" accept="image/*" className="w-full border border-[#E2E8F0] outline-none px-4 py-2.5 rounded-xl transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-500 file:bg-[#D97706]/10 file:text-[#D97706] hover:file:bg-[#D97706]/20" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Nama Bisnis / Toko</label>
                      <input required name="namaBisnis" placeholder="Contoh: Kedai Kopi Makmur" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Email</label>
                      <input required type="email" name="email" placeholder="admin@bisnis.com" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Nomor WhatsApp</label>
                      <input required name="nomorWA" placeholder="628..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Kategori</label>
                      <select name="kategori" className="w-full bg-white border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm appearance-none">
                        <option>Kuliner</option>
                        <option>Fashion</option>
                        <option>Kerajinan</option>
                        <option>Jasa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Jam Operasional</label>
                      <input required name="jamBuka" placeholder="08.00 - 20.00" className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Instagram URL</label>
                      <input name="instagramUrl" placeholder="https://instagram.com/..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Tokopedia URL</label>
                      <input name="tokopediaUrl" placeholder="https://tokopedia.com/..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Shopee URL</label>
                      <input name="shopeeUrl" placeholder="https://shopee.co.id/..." className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Upload Galeri Produk (Bisa Lebih Dari Satu)</label>
                      <input type="file" name="galeri" multiple accept="image/*" className="w-full border border-[#E2E8F0] outline-none px-4 py-2.5 rounded-xl transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-500 file:bg-[#D97706]/10 file:text-[#D97706] hover:file:bg-[#D97706]/20" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-[#64748B] uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea required name="alamat" placeholder="Jl. Sudirman No. 123..." rows={2} className="w-full border border-[#E2E8F0] focus:ring-2 focus:ring-[#D97706]/20 focus:border-[#D97706] outline-none px-4 py-3 rounded-xl transition-all text-sm resize-none" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white rounded-xl font-600 transition-all shadow-md mt-4">
                    Daftar Sebagai UMKM
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
