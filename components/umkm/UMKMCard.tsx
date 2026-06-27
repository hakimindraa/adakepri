import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, Clock, Star } from 'lucide-react'
import { UMKM } from '../../lib/data'

export default function UMKMCard({ u }: { u: UMKM }) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
      <div className="flex items-start gap-5 mb-5">
        <div className="relative flex-shrink-0">
          <Image
            src={u.logo}
            alt={u.namaBisnis}
            width={64}
            height={64}
            className="rounded-xl w-16 h-16 md:w-20 md:h-20 object-cover border border-slate-200 group-hover:border-primary/30 transition-all"
          />
          {u.terverifikasi && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm shadow-emerald-500/30">
              <BadgeCheck size={24} className="text-primary fill-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl md:text-2xl font-700 text-slate-900 truncate">{u.namaBisnis}</h3>
          </div>
          <span className="inline-block bg-amber-50 text-amber-700 text-xs md:text-sm font-600 px-4 py-1.5 rounded-full">
            {u.kategori}
          </span>
        </div>
      </div>

      <div className="flex-1 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center text-slate-600 text-sm md:text-base">
            <MapPin size={18} className="mr-1.5 flex-shrink-0" />
            <span className="truncate">{u.kota}</span>
          </div>
          <div className="flex items-center text-amber-500 text-sm md:text-base font-600">
            <Star size={16} className="mr-1 fill-amber-500 flex-shrink-0" />
            {u.rating}
          </div>
        </div>
        <p className="text-base text-slate-600 leading-relaxed line-clamp-2">
          {u.deskripsi}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center text-slate-500 text-sm mb-5 bg-slate-50 px-3 py-2 rounded-lg">
          <Clock size={16} className="mr-2" />
          {u.jamBuka}
        </div>
        <Link
          href={`/umkm/${u.id}`}
          className="w-full block bg-emerald-50 text-[#047857] hover:bg-[#047857] hover:text-white text-center py-3.5 rounded-xl font-600 transition-all text-base"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  )
}
