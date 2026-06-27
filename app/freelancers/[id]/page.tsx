import Navbar from '../../../components/layout/Navbar'
import Footer from '../../../components/layout/Footer'
import { freelancers } from '../../../lib/data'
import ContactModal from '../../../components/freelancer/ContactModal'
import Image from 'next/image'
import { MapPin, BadgeCheck, Clock, Eye, Calendar, ExternalLink, MessageCircle, Star } from 'lucide-react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

type Props = { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params
  const f = freelancers.find(x => x.id === id)

  if (!f) return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="container-custom text-center py-20 flex-1">
        <h2 className="text-2xl font-600 text-[#1A202C]">Freelancer tidak ditemukan</h2>
      </main>
      <Footer />
    </div>
  )

  const statusColors = {
    'Tersedia': 'bg-[#D1FAE5] text-[#065F46]',
    'Sibuk': 'bg-[#FEF3C7] text-[#92400E]',
    'Tidak Tersedia': 'bg-[#FEE2E2] text-[#991B1B]'
  }
  const badgeColor = statusColors[f.ketersediaan as keyof typeof statusColors] || 'bg-slate-100 text-slate-600'

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container-custom py-12 flex-1">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Sidebar Kiri (Sticky) */}
          <aside className="w-full md:w-1/3 md:sticky md:top-24">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center">
              <div className="relative inline-block mx-auto mb-4">
                <Image
                  src={f.avatar}
                  alt={f.nama}
                  width={96}
                  height={96}
                  className="rounded-full w-24 h-24 object-cover ring-4 ring-[#047857]/20 mx-auto"
                />
                {f.terverifikasi && (
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                    <BadgeCheck size={24} className="text-[#0077B6] fill-white" />
                  </div>
                )}
              </div>

              <h1 className="text-xl font-600 text-[#1A202C] mb-1">{f.nama}</h1>
              <div className="flex items-center justify-center text-[#64748B] text-sm mb-2">
                <MapPin size={14} className="mr-1" />
                {f.kota}
              </div>
              <div className="flex items-center justify-center text-amber-500 text-sm font-600 mb-4">
                <Star size={16} className="mr-1 fill-amber-500" />
                {f.rating} <span className="text-[#64748B] font-400 ml-1">({f.reviews.length} Ulasan)</span>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-600 mb-6 ${badgeColor}`}>
                {f.ketersediaan}
              </div>

              {f.tarifPerJam && (
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] mb-6">
                  <div className="text-xs text-[#64748B] font-500 uppercase tracking-wider mb-1">Mulai Dari</div>
                  <div className="text-lg font-700 text-[#0077B6]">
                    Rp {f.tarifPerJam.toLocaleString('id-ID')} <span className="text-xs font-400 text-[#64748B]">/ jam</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <ContactModal defaultWa={'628111222333'} />
                {f.instagramUrl && (
                  <a
                    href={f.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white py-3 rounded-xl font-500 hover:opacity-90 transition-all"
                  >
                    <FaInstagram size={18} />
                    Instagram
                  </a>
                )}
                {f.linkedinUrl && (
                  <a
                    href={f.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-3 rounded-xl font-500 hover:opacity-90 transition-all"
                  >
                    <FaLinkedin size={18} />
                    LinkedIn
                  </a>
                )}
                <button className="w-full border border-[#E2E8F0] text-[#1A202C] font-500 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 mt-2">
                  <MessageCircle size={18} />
                  Kirim Pesan
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-2 gap-4">
                <div className="text-left">
                  <div className="flex items-center text-[#64748B] text-[10px] uppercase font-600 tracking-wider mb-1">
                    <Eye size={12} className="mr-1" /> Dilihat
                  </div>
                  <div className="text-sm font-600">{f.totalDilihat} kali</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center text-[#64748B] text-[10px] uppercase font-600 tracking-wider mb-1">
                    <Calendar size={12} className="mr-1" /> Bergabung
                  </div>
                  <div className="text-sm font-600">Feb 2024</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Konten Utama (Kanan) */}
          <div className="w-full md:w-2/3 space-y-6">
            <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in">
              <h2 className="text-xl font-600 text-[#1A202C] mb-4">Tentang Saya</h2>
              <p className="text-[#64748B] leading-relaxed whitespace-pre-line">
                {f.bio}
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-600 text-[#1A202C] mb-6">Keahlian & Spesialisasi</h2>
              <div className="flex flex-wrap gap-2">
                {f.skills.map(s => (
                  <span
                    key={s}
                    className="px-4 py-2 bg-[#EFF6FF] border border-[#047857]/10 text-[#0077B6] font-500 text-sm rounded-xl"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {f.portfolioUrl && (
              <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-600 text-[#1A202C] mb-4">Portfolio Eksternal</h2>
                <a
                  href={f.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#0077B6] font-500 hover:underline"
                >
                  Lihat hasil kerja eksternal <ExternalLink size={16} />
                </a>
              </section>
            )}

            {f.portfolioImages && f.portfolioImages.length > 0 && (
              <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-600 text-[#1A202C] mb-6">Galeri Portofolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {f.portfolioImages.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-[#E2E8F0] group">
                      <Image src={img} alt="Portfolio item" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-600 text-[#1A202C] mb-6">Ulasan Klien ({f.reviews.length})</h2>
              {f.reviews.length === 0 ? (
                <p className="text-[#64748B] text-sm">Belum ada ulasan untuk freelancer ini.</p>
              ) : (
                <div className="space-y-6">
                  {f.reviews.map(r => (
                    <div key={r.id} className="border-b border-[#E2E8F0] last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-600 text-[#1A202C]">{r.namaPengguna}</div>
                        <div className="text-xs text-[#64748B]">{r.tanggal}</div>
                      </div>
                      <div className="flex text-amber-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < r.rating ? "fill-amber-500" : "text-slate-300"} />
                        ))}
                      </div>
                      <p className="text-sm text-[#64748B]">{r.komentar}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
