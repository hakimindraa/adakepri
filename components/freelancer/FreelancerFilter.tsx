"use client"
import { useState } from 'react'
import { Search, MapPin, Briefcase } from 'lucide-react'

type Props = {
  kotaOptions: string[]
  skillsOptions: string[]
  onChange: (filters: { kota?: string; skills: string[]; ketersediaan?: string; q?: string }) => void
}

export default function FreelancerFilter({ kotaOptions, skillsOptions, onChange }: Props) {
  const [kota, setKota] = useState<string>('')
  const [ketersediaan, setKetersediaan] = useState<string>('')
  const [q, setQ] = useState<string>('')

  const handleApply = () => {
    onChange({ kota, skills: [], ketersediaan, q })
  }

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari freelancer atau keahlian..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none transition-all text-sm"
          />
        </div>

        {/* Kota Dropdown */}
        <div className="relative w-full lg:w-48">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
          <select
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none transition-all text-sm appearance-none"
          >
            <option value="">Semua Kota</option>
            {kotaOptions.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full lg:w-48">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
          <select
            value={ketersediaan}
            onChange={(e) => setKetersediaan(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#047857]/20 focus:border-[#047857] outline-none transition-all text-sm appearance-none"
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
          className="w-full lg:w-auto px-8 py-2.5 bg-gradient-to-r from-[#047857] to-[#036046] hover:from-[#064E3B] hover:to-[#047857] text-white shadow-md font-500 rounded-xl transition-colors"
        >
          Cari
        </button>
      </div>
    </div>
  )
}
