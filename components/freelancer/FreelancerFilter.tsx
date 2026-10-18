"use client"
import { useState } from 'react'
import { Search, MapPin, Briefcase } from 'lucide-react'

type Props = {
  kotaOptions: string[]
  skillsOptions: string[]
  initialKota?: string
  initialQ?: string
  onChange: (filters: { kota?: string; skills: string[]; ketersediaan?: string; q?: string }) => void
}

export default function FreelancerFilter({ 
  kotaOptions, 
  skillsOptions, 
  initialKota = '', 
  initialQ = '', 
  onChange 
}: Props) {
  const [kota, setKota] = useState<string>(initialKota)
  const [ketersediaan, setKetersediaan] = useState<string>('')
  const [q, setQ] = useState<string>(initialQ)

  const handleApply = () => {
    onChange({ kota, skills: [], ketersediaan, q })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply()
    }
  }

  return (
    <div className="bg-white rounded-xl p-3 md:p-3.5 border border-zinc-200/90 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari nama freelancer atau keahlian..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none transition-colors text-sm text-zinc-900 placeholder-zinc-400 bg-white"
          />
        </div>

        {/* Kota Dropdown */}
        <div className="relative w-full lg:w-44">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
          <select
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            className="w-full pl-8 pr-8 py-2 rounded-lg border border-zinc-200 bg-white focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none transition-colors text-sm text-zinc-800"
          >
            <option value="">Semua Wilayah</option>
            {kotaOptions.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full lg:w-40">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
          <select
            value={ketersediaan}
            onChange={(e) => setKetersediaan(e.target.value)}
            className="w-full pl-8 pr-8 py-2 rounded-lg border border-zinc-200 bg-white focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none transition-colors text-sm text-zinc-800"
          >
            <option value="">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Sibuk">Sibuk</option>
            <option value="Tidak Tersedia">Tidak Tersedia</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm rounded-lg transition-colors shadow-xs"
        >
          Cari
        </button>
      </div>
    </div>
  )
}
