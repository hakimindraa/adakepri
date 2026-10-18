import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getAllUMKM } from '@/lib/actions/umkm'
import { semuaKota } from '@/lib/data'
import UMKMListClient from './UMKMListClient'

export default async function UMKMPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string; kota?: string; kategori?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const dbUmkms = await getAllUMKM()

  // Transform data database ke format kartu UMKM
  const allUmkms = dbUmkms.map(u => ({
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

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-zinc-200/80 py-12 md:py-16">
        <div className="container-custom max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-4 border border-zinc-200/60">
            Katalog Usaha Lokal Kepri
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            Direktori UMKM
          </h1>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Dukung pertumbuhan ekonomi daerah dengan menjelajahi aneka produk unggulan, kuliner, dan layanan bisnis lokal.
          </p>
        </div>
      </div>

      <main className="container-custom py-10 md:py-14 flex-1">
        <UMKMListClient 
          umkms={allUmkms} 
          kotaOptions={semuaKota}
          initialKota={params?.kota || ''}
          initialKategori={params?.kategori || ''}
          initialQ={params?.q || ''}
        />
      </main>

      <Footer />
    </div>
  )
}
