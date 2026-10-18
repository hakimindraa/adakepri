import Navbar from '../../../components/layout/Navbar'
import Footer from '../../../components/layout/Footer'
import { getFreelancerById } from '@/lib/actions/freelancer'
import Image from 'next/image'
import { MapPin, BadgeCheck, Eye, Calendar, ExternalLink, MessageCircle, Star } from 'lucide-react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

type Props = { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params
  const f = await getFreelancerById(id)

  if (!f) return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 md:px-8 text-center py-24 flex-1 w-full">
        <h2 className="text-xl font-bold text-zinc-950">Freelancer Tidak Ditemukan</h2>
        <p className="text-sm text-zinc-500 mt-2">Profil yang Anda cari mungkin telah dinonaktifkan atau dihapus.</p>
        <a href="/freelancers" className="inline-block mt-6 px-4 py-2 bg-zinc-950 text-white text-xs font-semibold rounded-lg">
          Kembali ke Direktori
        </a>
      </main>
      <Footer />
    </div>
  )

  const isAvailable = f.ketersediaan === 'Tersedia'
  const isBusy = f.ketersediaan === 'Sibuk'

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Sidebar Kiri (Sticky) */}
          <aside className="md:col-span-4 md:sticky md:top-24">
            <div className="bg-white rounded-xl p-6 border border-zinc-200/90 shadow-xs text-center">
              <div className="relative inline-block mx-auto mb-4">
                <Image
                  src={f.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=180&auto=format&fit=crop'}
                  alt={f.nama}
                  width={88}
                  height={88}
                  unoptimized
                  className="rounded-xl w-22 h-22 object-cover border border-zinc-200 mx-auto"
                />
                {f.terverifikasi && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs" title="Terverifikasi">
                    <BadgeCheck size={20} className="text-zinc-950 fill-zinc-100" />
                  </div>
                )}
              </div>

              <h1 className="text-lg font-bold text-zinc-950 mb-1">{f.nama}</h1>
              <div className="flex items-center justify-center text-zinc-500 text-xs mb-3">
                <MapPin size={13} className="mr-1 text-zinc-400" />
                {f.kota}
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium text-zinc-700 mb-6 border border-zinc-200/70">
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500' : isBusy ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
                {f.ketersediaan || 'Tersedia'}
              </div>

              {/* Action Links */}
              <div className="space-y-2.5">
                {f.whatsapp && (
                  <a 
                    href={`https://wa.me/${f.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-xs"
                  >
                    <MessageCircle size={16} />
                    Hubungi via WhatsApp
                  </a>
                )}
                {f.instagramUrl && (
                  <a
                    href={f.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <FaInstagram size={14} className="text-zinc-600" />
                    Profil Instagram
                  </a>
                )}
                {f.linkedinUrl && (
                  <a
                    href={f.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 py-2 rounded-lg text-xs font-medium transition-colors"
                  >
                    <FaLinkedin size={14} className="text-zinc-600" />
                    Profil LinkedIn
                  </a>
                )}
              </div>

              {/* Stats Footer */}
              <div className="mt-6 pt-5 border-t border-zinc-100 grid grid-cols-2 gap-4 text-xs">
                <div className="text-left">
                  <div className="flex items-center text-zinc-400 text-[10px] uppercase font-semibold tracking-wider mb-0.5">
                    <Eye size={12} className="mr-1" /> Dilihat
                  </div>
                  <div className="font-semibold text-zinc-900">{f.totalDilihat} kali</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center text-zinc-400 text-[10px] uppercase font-semibold tracking-wider mb-0.5">
                    <Calendar size={12} className="mr-1" /> Status
                  </div>
                  <div className="font-semibold text-zinc-900">Aktif</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Konten Utama (Kanan) */}
          <div className="md:col-span-8 space-y-6">
            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">Tentang Profesional</h2>
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line font-normal">
                {f.bio || 'Belum ada deskripsi profil.'}
              </p>
            </section>

            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Keahlian &amp; Spesialisasi</h2>
              <div className="flex flex-wrap gap-2">
                {(f.skills || []).map((s: string) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-zinc-100 text-zinc-800 font-medium text-xs rounded-md border border-zinc-200/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {f.portfolioUrl && (
              <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
                <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">Portofolio Eksternal</h2>
                <a
                  href={f.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 hover:underline"
                >
                  Buka tautan portofolio <ExternalLink size={14} />
                </a>
              </section>
            )}

            {f.portfolioImages && f.portfolioImages.length > 0 && (
              <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
                <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Galeri Hasil Kerja</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {f.portfolioImages.map((img: string, i: number) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200">
                      <Image src={img} alt="Hasil Kerja" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
                Ulasan &amp; Pengalaman Klien ({f.reviews ? f.reviews.length : 0})
              </h2>
              {(!f.reviews || f.reviews.length === 0) ? (
                <p className="text-xs text-zinc-400">Belum ada ulasan yang ditinggalkan untuk talenta ini.</p>
              ) : (
                <div className="space-y-5 divide-y divide-zinc-100">
                  {f.reviews.map((r: any) => (
                    <div key={r.id} className="pt-4 first:pt-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-xs font-semibold text-zinc-900">{r.namaPengguna}</div>
                        <div className="text-[11px] text-zinc-400">{r.tanggal}</div>
                      </div>
                      <div className="flex text-amber-500 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-zinc-200"} />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">{r.komentar}</p>
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
