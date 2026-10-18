"use client"
import { useMemo, useState } from 'react'
import FreelancerFilter from '@/components/freelancer/FreelancerFilter'
import FreelancerCard from '@/components/freelancer/FreelancerCard'

export default function FreelancerListClient({ 
  initialFreelancers, 
  semuaKota,
  initialKota = '',
  initialQ = '',
}: { 
  initialFreelancers: any[], 
  semuaKota: string[],
  initialKota?: string,
  initialQ?: string,
}) {
  const [filters, setFilters] = useState({ 
    kota: initialKota, 
    skills: [] as string[], 
    ketersediaan: '', 
    q: initialQ 
  })
  const [page, setPage] = useState(1)
  const perPage = 6

  const skillsOptions = useMemo(() => {
    const s = new Set<string>()
    initialFreelancers.forEach(f => (f.skills || []).forEach((x: string) => s.add(x)))
    return Array.from(s)
  }, [initialFreelancers])

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase()
    return initialFreelancers.filter(f => {
      if (filters.kota && f.kota !== filters.kota) return false
      if (filters.ketersediaan && f.ketersediaan !== filters.ketersediaan) return false
      if (filters.skills.length > 0 && !filters.skills.every(s => (f.skills || []).includes(s))) return false
      if (q && !(f.nama.toLowerCase().includes(q) || (f.skills || []).join(' ').toLowerCase().includes(q))) return false
      return true
    })
  }, [filters, initialFreelancers])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <FreelancerFilter
        kotaOptions={semuaKota as any}
        skillsOptions={skillsOptions}
        initialKota={initialKota}
        initialQ={initialQ}
        onChange={(f) => {
          setFilters({
            kota: f.kota || '',
            skills: f.skills || [],
            ketersediaan: f.ketersediaan || '',
            q: f.q || ''
          });
          setPage(1);
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="text-xs font-medium text-zinc-500">
          Menampilkan <span className="text-zinc-950 font-semibold">{filtered.length}</span> talenta mandiri
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-zinc-200/90 shadow-xs">
          <div className="text-zinc-400 mb-3 text-4xl">🔍</div>
          <h3 className="text-base font-semibold text-zinc-950 mb-1">Tidak ada hasil</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Coba gunakan kata kunci yang lebih umum atau sesuaikan filter wilayah dan status.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pageItems.map(f => <FreelancerCard key={f.id} f={f as any} />)}
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
