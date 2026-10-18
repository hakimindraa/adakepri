import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, ArrowRight } from 'lucide-react'
import ReportButton from '../ui/ReportButton'

export default function FreelancerCard({ f }: { f: any }) {
  const isAvailable = f.ketersediaan === 'Tersedia'
  const isBusy = f.ketersediaan === 'Sibuk'

  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 p-5 hover:border-zinc-400 transition-all flex flex-col h-full group relative shadow-xs">
      <div className="absolute top-4 right-4 z-10">
        <ReportButton targetId={f.id} targetType="FREELANCER" targetName={f.nama} />
      </div>

      {/* Top Header: Avatar & Info */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="relative shrink-0">
          <Image
            src={f.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop'}
            alt={f.nama}
            width={52}
            height={52}
            unoptimized
            className="rounded-xl w-13 h-13 object-cover border border-zinc-100"
          />
          {f.terverifikasi && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs" title="Terverifikasi">
              <BadgeCheck size={16} className="text-zinc-900 fill-zinc-100" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <Link href={`/freelancers/${f.id}`} className="hover:underline">
            <h3 className="text-base font-semibold text-zinc-950 truncate tracking-tight">
              {f.nama}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center text-xs text-zinc-500 truncate">
              <MapPin size={13} className="mr-1 text-zinc-400 shrink-0" />
              {f.kota}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-600">
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : isBusy ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
              {f.ketersediaan || 'Tersedia'}
            </span>
          </div>
        </div>
      </div>

      {/* Bio preview if available */}
      {f.bio && (
        <p className="text-xs text-zinc-500 line-clamp-2 mb-3 leading-relaxed">
          {f.bio}
        </p>
      )}

      {/* Skills Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
        {(f.skills || []).slice(0, 4).map((skill: string) => (
          <span
            key={skill}
            className="bg-zinc-100 text-zinc-700 text-[11px] px-2 py-0.5 rounded font-medium"
          >
            {skill}
          </span>
        ))}
        {(f.skills || []).length > 4 && (
          <span className="text-[11px] text-zinc-400 self-center">
            +{f.skills.length - 4} lainnya
          </span>
        )}
      </div>

      {/* Action Footer */}
      <Link
        href={`/freelancers/${f.id}`}
        className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors"
      >
        <span>Lihat Profil Lengkap</span>
        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-zinc-400 group-hover:text-zinc-950" />
      </Link>
    </div>
  )
}
