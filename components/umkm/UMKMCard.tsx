import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, Clock, ArrowRight } from 'lucide-react'
import ReportButton from '../ui/ReportButton'

export default function UMKMCard({ u }: { u: any }) {
  const businessName = u.namaBisnis || u.title || 'Usaha Lokal'

  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 p-5 hover:border-zinc-400 transition-all flex flex-col h-full group relative shadow-xs">
      <div className="absolute top-4 right-4 z-10">
        <ReportButton targetId={u.id} targetType="UMKM" targetName={businessName} />
      </div>

      {/* Top Header: Logo & Name */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="relative shrink-0">
          <Image
            src={u.logo || 'https://placehold.co/100x100?text=UMKM'}
            alt={businessName}
            width={52}
            height={52}
            unoptimized
            className="rounded-xl w-13 h-13 object-cover border border-zinc-100"
          />
          {u.terverifikasi && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs" title="Terverifikasi">
              <BadgeCheck size={16} className="text-zinc-900 fill-zinc-100" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <Link href={`/umkm/${u.id}`} className="hover:underline">
            <h3 className="text-base font-semibold text-zinc-950 truncate tracking-tight">
              {businessName}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center text-xs text-zinc-500 truncate">
              <MapPin size={13} className="mr-1 text-zinc-400 shrink-0" />
              {u.kota || 'Kepulauan Riau'}
            </span>
            {u.kategori && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-[11px] font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                  {u.kategori}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed flex-1">
        {u.deskripsi || 'Penyedia produk dan jasa lokal berkualitas di Kepulauan Riau.'}
      </p>

      {/* Operating Hours & Action */}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between mt-auto">
        {u.jamBuka && u.jamBuka !== '-' ? (
          <div className="flex items-center text-[11px] text-zinc-500">
            <Clock size={12} className="mr-1.5 text-zinc-400" />
            <span className="truncate max-w-[140px]">{u.jamBuka}</span>
          </div>
        ) : (
          <span className="text-[11px] text-zinc-400">Bisnis Lokal</span>
        )}

        <Link
          href={`/umkm/${u.id}`}
          className="flex items-center gap-1 text-xs font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors"
        >
          <span>Detail</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-zinc-400 group-hover:text-zinc-950" />
        </Link>
      </div>
    </div>
  )
}
