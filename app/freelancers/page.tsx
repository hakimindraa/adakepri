"use client"
import { useMemo, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import FreelancerFilter from '../../components/freelancer/FreelancerFilter'
import FreelancerCard from '../../components/freelancer/FreelancerCard'
import { freelancers, semuaKota } from '../../lib/data'

export default function Page() {
  const [filters, setFilters] = useState({ kota: '', skills: [] as string[], ketersediaan: '', q: '' })
  const [page, setPage] = useState(1)
  const perPage = 6

  const skillsOptions = useMemo(() => {
    const s = new Set<string>()
    freelancers.forEach(f => f.skills.forEach(x => s.add(x)))
    return Array.from(s)
  }, [])

  const filtered = useMemo(() => {
    const q = filters.q.toLowerCase()
    return freelancers.filter(f => {
      if (filters.kota && f.kota !== filters.kota) return false
      if (filters.ketersediaan && f.ketersediaan !== filters.ketersediaan) return false
      if (filters.skills.length > 0 && !filters.skills.every(s => f.skills.includes(s))) return false
      if (q && !(f.nama.toLowerCase().includes(q) || f.skills.join(' ').toLowerCase().includes(q))) return false
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
            Direktori Freelancer
          </h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto text-base">
            Temukan talenta terbaik Kepulauan Riau untuk membantu proyek dan bisnis Anda berkembang dengan profesionalisme tinggi.
          </p>
        </div>
      </div>

      <main className="container-custom py-12 flex-1">
        {/* Filter Section */}
        <FreelancerFilter
          kotaOptions={semuaKota}
          skillsOptions={skillsOptions}
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

        <div className="flex items-center justify-between mb-8">
          <div className="text-sm font-500 text-[#64748B]">
            Menampilkan <span className="text-[#1A202C] font-600">{filtered.length}</span> talenta kreatif
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
            <div className="text-[#64748B] mb-4 text-5xl">🔍</div>
            <h3 className="text-lg font-600 text-[#1A202C] mb-2">Tidak ditemukan</h3>
            <p className="text-[#64748B]">Coba sesuaikan kata kunci atau filter pencarian Anda.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {pageItems.map(f => <FreelancerCard key={f.id} f={f} />)}
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
