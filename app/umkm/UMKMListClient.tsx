"use client"
import { useMemo, useState } from 'react'
import UMKMFilter from '@/components/umkm/UMKMFilter'
import UMKMCard from '@/components/umkm/UMKMCard'
import { UMKM, KotaKepri } from '@/lib/data'

export default function UMKMListClient({ 
  umkms, 
  kotaOptions,
  initialKota = '',
  initialKategori = '',
  initialQ = '',
}: { 
  umkms: UMKM[], 
  kotaOptions: KotaKepri[],
  initialKota?: string,
  initialKategori?: string,
  initialQ?: string,
}) {
  const [filters, setFilters] = useState({ 
    kota: initialKota, 
    kategori: initialKategori, 
    q: initialQ 
  })
  const [page, setPage] = useState(1)
  const perPage = 6

  const kategoriOptions = useMemo(() => Array.from(new Set(umkms.map(u => u.kategori).filter(Boolean))), [umkms])

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase()
    return umkms.filter(u => {
      if (filters.kota && u.kota !== filters.kota) return false
      if (filters.kategori && u.kategori !== filters.kategori) return false
      if (q && !(u.namaBisnis.toLowerCase().includes(q) || (u.deskripsi || '').toLowerCase().includes(q))) return false
      return true
    })
  }, [filters, umkms])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <UMKMFilter
        kotaOptions={kotaOptions}
        kategoriOptions={kategoriOptions}
        initialKota={initialKota}
        initialKategori={initialKategori}
        initialQ={initialQ}
        onChange={(f) => {
          setFilters({
            kota: f.kota || '',
            kategori: f.kategori || '',
            q: f.q || ''
          });
          setPage(1);
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="text-xs font-medium text-zinc-500">
          Menampilkan <span className="text-zinc-950 font-semibold">{filtered.length}</span> bisnis lokal
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-zinc-200/90 shadow-xs">
          <div className="text-zinc-400 mb-3 text-4xl">🔍</div>
          <h3 className="text-base font-semibold text-zinc-950 mb-1">Tidak ada hasil</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Coba sesuaikan kata kunci pencarian atau pilih kategori yang berbeda.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pageItems.map(u => <UMKMCard key={u.id} u={u} />)}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-xs"
              >
                Sebelumnya
              </button>
              <div className="text-xs font-medium text-zinc-500">
                Halaman <span className="text-zinc-950 font-semibold">{page}</span> dari {totalPages}
              </div>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 transition-colors shadow-xs"
              >
                Berikutnya
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
