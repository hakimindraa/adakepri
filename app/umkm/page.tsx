"use client"
import { useMemo, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import UMKMFilter from '../../components/umkm/UMKMFilter'
import UMKMCard from '../../components/umkm/UMKMCard'
import { umkms, semuaKota } from '../../lib/data'

export default function Page() {
  const [filters, setFilters] = useState({ kota: '', kategori: '', q: '' })
  const [page, setPage] = useState(1)
  const perPage = 6

  const kategoriOptions = useMemo(() => Array.from(new Set(umkms.map(u => u.kategori))), [])

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase()
    return umkms.filter(u => {
      if (filters.kota && u.kota !== filters.kota) return false
      if (filters.kategori && u.kategori !== filters.kategori) return false
      if (q && !(u.namaBisnis.toLowerCase().includes(q) || u.deskripsi.toLowerCase().includes(q))) return false
      return true
    })
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-700 tracking-tight text-[#1A202C]">
            Direktori UMKM
          </h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto text-base">
            Dukung bisnis lokal terbaik di Kepulauan Riau dengan menjelajahi produk & layanan unggulan mereka.
          </p>
        </div>
      </div>

      <main className="container-custom py-12 flex-1">
        {/* Filter Section */}
        <UMKMFilter
          kotaOptions={semuaKota}
          kategoriOptions={kategoriOptions}
          onChange={(f) => { setFilters(f); setPage(1) }}
        />

        <div className="flex items-center justify-between mb-8">
          <div className="text-sm font-500 text-[#64748B]">
            Menampilkan <span className="text-[#1A202C] font-600">{filtered.length}</span> bisnis lokal
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
            <div className="text-[#64748B] mb-4 text-5xl">🔍</div>
            <h3 className="text-lg font-600 text-[#1A202C] mb-2">Tidak ditemukan</h3>
            <p className="text-[#64748B]">Coba sesuaikan kata kunci atau filter kategori Anda.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {pageItems.map(u => <UMKMCard key={u.id} u={u} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-6">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl text-sm font-500 text-[#1A202C] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                >
                  Sebelumnya
                </button>
                <div className="text-sm font-500 text-[#64748B]">
                  Halaman <span className="text-[#1A202C]">{page}</span> dari {totalPages}
                </div>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-5 py-2.5 border border-[#E2E8F0] rounded-xl text-sm font-500 text-[#1A202C] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
                >
                  Berikutnya
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
