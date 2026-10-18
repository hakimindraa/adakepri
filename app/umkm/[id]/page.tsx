import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getUMKMById } from '@/lib/actions/umkm'
import { MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react'

type Props = { params: Promise<{ id: string }> }

export default async function UMKMDetailPage({ params }: Props) {
  const { id } = await params
  const u = await getUMKMById(id)

  if (!u) return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 md:px-8 text-center py-24 flex-1 w-full">
        <h2 className="text-xl font-bold text-zinc-950">UMKM Tidak Ditemukan</h2>
        <p className="text-sm text-zinc-500 mt-2">Data usaha yang Anda cari mungkin sudah tidak aktif atau dihapus.</p>
        <a href="/umkm" className="inline-block mt-6 px-4 py-2 bg-zinc-950 text-white text-xs font-semibold rounded-lg">
          Kembali ke Direktori UMKM
        </a>
      </main>
      <Footer />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Sidebar Kiri (Info & Kontak) */}
          <aside className="md:col-span-4 md:sticky md:top-24">
            <div className="bg-white rounded-xl p-6 border border-zinc-200/90 shadow-xs text-center">
              <div className="relative inline-block mx-auto mb-4">
                {u.imageUrls[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={u.imageUrls[0]}
                    alt={u.title}
                    className="rounded-xl w-22 h-22 object-cover border border-zinc-200 mx-auto"
                  />
                ) : (
                  <div className="w-22 h-22 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 text-xs mx-auto">
                    No Image
                  </div>
                )}
              </div>

              <h1 className="text-lg font-bold text-zinc-950 mb-1">{u.title}</h1>
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span className="inline-block bg-zinc-100 text-zinc-700 text-xs font-medium px-2.5 py-0.5 rounded">
                  {u.category}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-5">
                Pengelola: {u.owner?.name || 'Pelaku Usaha Lokal'}
              </p>

              <div className="space-y-2.5">
                <div className="w-full flex items-center justify-center gap-1.5 bg-zinc-50 text-zinc-700 border border-zinc-200 py-2 rounded-lg text-xs font-medium">
                  <MapPin size={14} className="text-zinc-400" />
                  {u.location}
                </div>
                {u.whatsapp && (
                  <a
                    href={`https://wa.me/${u.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-xs"
                  >
                    <MessageCircle size={16} />
                    Hubungi via WhatsApp
                  </a>
                )}
              </div>

              {u.targetFunding > 0 && (
                <div className="mt-6 pt-5 border-t border-zinc-100 text-left">
                  <div className="text-[10px] font-semibold uppercase text-zinc-400 tracking-wider mb-0.5">Estimasi Layanan / Produk</div>
                  <div className="text-base font-bold text-zinc-950">Mulai Rp {u.targetFunding.toLocaleString('id-ID')}</div>
                </div>
              )}
            </div>
          </aside>

          {/* Konten Utama (Kanan) */}
          <div className="md:col-span-8 space-y-6">
            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">Tentang Usaha</h2>
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line font-normal">
                {u.description || 'Belum ada deskripsi usaha.'}
              </p>
            </section>

            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Ringkasan Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-50 border border-zinc-200/80">
                  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-700">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-zinc-400 tracking-wider">Domisili Usaha</div>
                    <div className="text-zinc-900 font-medium text-xs mt-0.5">{u.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-50 border border-zinc-200/80">
                  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-700">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-zinc-400 tracking-wider">Kategori Produk</div>
                    <div className="text-zinc-900 font-medium text-xs mt-0.5">{u.category}</div>
                  </div>
                </div>
              </div>
            </section>

            {u.imageUrls.length > 0 && (
              <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
                <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Galeri Produk / Tempat</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {u.imageUrls.map((img: string, i: number) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Foto Produk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200/90 shadow-xs">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Lokasi &amp; Peta</h2>
              
              {u.gmapsUrl && (u.gmapsUrl.startsWith('http://') || u.gmapsUrl.startsWith('https://')) && (
                <div className="mb-4">
                  <a 
                    href={u.gmapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 hover:underline"
                  >
                    Buka Google Maps <ExternalLink size={13} />
                  </a>
                </div>
              )}

              <div className="w-full h-60 md:h-72 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    u.gmapsUrl && !u.gmapsUrl.startsWith('http') 
                      ? u.gmapsUrl 
                      : `${u.title} ${u.location}`
                  )}&output=embed`}
                ></iframe>
              </div>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
