import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, Star } from 'lucide-react'
import { Freelancer } from '../../lib/data'

export default function FreelancerCard({ f }: { f: Freelancer }) {
  const statusColors = {
    'Tersedia': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Sibuk': 'bg-amber-100 text-amber-800 border-amber-200',
    'Tidak Tersedia': 'bg-rose-100 text-rose-800 border-rose-200'
  }

  const badgeColor = statusColors[f.ketersediaan as keyof typeof statusColors] || 'bg-slate-100 text-slate-800 border-slate-200'

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
      <div className="flex items-start justify-between mb-5">
        <div className="relative">
          <Image
            src={f.avatar}
            alt={f.nama}
            width={72}
            height={72}
            className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all"
          />
          {f.terverifikasi && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm shadow-emerald-500/30" title="Terverifikasi">
              <BadgeCheck size={24} className="text-primary fill-white" />
            </div>
          )}
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-600 border ${badgeColor}`}>
          {f.ketersediaan}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-700 text-slate-900 mb-2">{f.nama}</h3>
        
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center text-slate-600 text-sm md:text-base">
            <MapPin size={18} className="mr-1.5" />
            {f.kota}
          </div>
          <div className="flex items-center text-amber-500 text-sm md:text-base font-600">
            <Star size={16} className="mr-1 fill-amber-500" />
            {f.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {f.skills.map((skill) => (
            <span
              key={skill}
              className="bg-emerald-50 text-emerald-700 text-xs md:text-sm px-4 py-1.5 rounded-full font-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/freelancers/${f.id}`}
        className="w-full block bg-emerald-50 text-[#047857] hover:bg-[#047857] hover:text-white text-center py-3.5 rounded-xl font-600 transition-all mt-auto text-base"
      >
        Lihat Profil
      </Link>
    </div>
  )
}
