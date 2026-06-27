import Navbar from '../../../components/layout/Navbar'
import Footer from '../../../components/layout/Footer'
import { umkms } from '../../../lib/data'
import Image from 'next/image'
import { MapPin, BadgeCheck, Clock, Eye, Store, MessageCircle, Map as MapIcon, Star } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { SiShopee } from 'react-icons/si'

type Props = { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params
  const u = umkms.find(x => x.id === id)

  if (!u) return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="container-custom text-center py-20 flex-1">
        <h2 className="text-2xl font-600 text-[#1A202C]">UMKM tidak ditemukan</h2>
      </main>
      <Footer />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container-custom py-12 flex-1">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Sidebar Kiri (Info & Kontak) */}
          <aside className="w-full md:w-1/3 md:sticky md:top-24">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center">
              <div className="relative inline-block mx-auto mb-4">
                <Image
                  src={u.logo}
                  alt={u.namaBisnis}
                  width={96}
                  height={96}
                  className="rounded-2xl w-24 h-24 object-cover border border-[#E2E8F0] mx-auto"
                />
                {u.terverifikasi && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <BadgeCheck size={24} className="text-[#0077B6] fill-white" />
                  </div>
                )}
              </div>

              <h1 className="text-xl font-600 text-[#1A202C] mb-1">{u.namaBisnis}</h1>
              <div className="flex items-center justify-center text-amber-500 text-sm font-600 mb-4">
                <Star size={16} className="mr-1 fill-amber-500" />
                {u.rating} <span className="text-[#64748B] font-400 ml-1">({u.reviews.length} Ulasan)</span>
              </div>
              <span className="inline-block bg-[#FFF7ED] text-[#C2410C] text-xs font-600 px-3 py-1 rounded-full mb-6">
                {u.kategori}
              </span>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${u.nomorWA}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-500 hover:opacity-90 transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>

                {u.instagramUrl && (
                  <a
                    href={u.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white py-3 rounded-xl font-500 hover:opacity-90 transition-all"
                  >
                    <FaInstagram size={18} />
                    Instagram
                  </a>
                )}

                {u.tokopediaUrl && (
                  <a
                    href={u.tokopediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#42B549] text-white py-3 rounded-xl font-500 hover:opacity-90 transition-all"
                  >
                    <Store size={18} />
                    Tokopedia
                  </a>
                )}

                {u.shopeeUrl && (
                  <a
                    href={u.shopeeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#EE4D2D] text-white py-3 rounded-xl font-500 hover:opacity-90 transition-all"
                  >
                    <SiShopee size={18} />
                    Shopee
                  </a>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-[#64748B]">
                    <Eye size={16} className="mr-2" />
                    Total Dilihat
                  </div>
                  <span className="font-600">{u.totalDilihat} kali</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Konten Utama (Kanan) */}
          <div className="w-full md:w-2/3 space-y-6">
            <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in">
              <h2 className="text-xl font-600 text-[#1A202C] mb-4">Tentang Bisnis</h2>
              <p className="text-[#64748B] leading-relaxed whitespace-pre-line">
                {u.deskripsi}
              </p>
            </section>

            <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-600 text-[#1A202C] mb-6">Informasi Operasional</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-[#E2E8F0] text-[#0077B6]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-600 uppercase text-[#64748B] tracking-wider">Jam Operasional</div>
                    <div className="text-[#1A202C] font-500 text-sm mt-0.5">{u.jamBuka}</div>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-[#E2E8F0] text-[#0077B6]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-600 uppercase text-[#64748B] tracking-wider">Lokasi</div>
                    <div className="text-[#1A202C] font-500 text-sm mt-0.5">{u.kota}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[10px] font-600 uppercase text-[#64748B] tracking-wider mb-2">Alamat Lengkap</div>
                <p className="text-[#1A202C] text-sm font-400">{u.alamat}</p>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center gap-2">
                <MapIcon size={18} className="text-[#0077B6]" />
                <h3 className="text-sm font-600 text-[#1A202C]">Peta Lokasi</h3>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src={u.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>

            {u.galeriProduk && u.galeriProduk.length > 0 && (
              <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-600 text-[#1A202C] mb-6">Galeri Produk</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {u.galeriProduk.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-[#E2E8F0] group">
                      <Image src={img} alt="Produk" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-600 text-[#1A202C] mb-6">Ulasan Pelanggan ({u.reviews.length})</h2>
              {u.reviews.length === 0 ? (
                <p className="text-[#64748B] text-sm">Belum ada ulasan untuk bisnis ini.</p>
              ) : (
                <div className="space-y-6">
                  {u.reviews.map(r => (
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
