"use client"

import { useState } from 'react'
import { MapPin, Map } from 'lucide-react'

// Coordinate estimates based on standard Kepri map layout (percentages relative to the map container)
const mapPoints = [
  { name: 'Natuna', top: '18%', left: '85%' },
  { name: 'Anambas', top: '55%', left: '70%' },
  { name: 'Bintan', top: '42%', left: '46%' },
  { name: 'Tanjungpinang', top: '48%', left: '46%' },
  { name: 'Batam', top: '43%', left: '33%' },
  { name: 'Karimun', top: '70%', left: '38%' },
  { name: 'Lingga', top: '80%', left: '48%' },
]

export default function InteractiveMap({ stats }: { stats: Record<string, { freelancer: number, umkm: number }> }) {
  const [activeCity, setActiveCity] = useState<string | null>(null)

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xs border border-zinc-200/90 bg-white">
      {/* Container aspect ratio adjusts naturally without scrolling */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
        {/* Real Map Image Background */}
        <img
          src="/images/map-kepri.png"
          alt="Peta Kepulauan Riau"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        />

        {/* Map Title inside canvas */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
          <div className="flex items-center gap-2 text-zinc-950 bg-white/90 px-3 py-1.5 rounded-lg border border-zinc-200/80 backdrop-blur-sm shadow-xs">
            <Map size={16} className="text-zinc-600" />
          </div>
        </div>

        {/* Render Map Pins */}
        {mapPoints.map((city) => {
          const cityStats = stats[city.name] || { freelancer: 0, umkm: 0 }
          const isActive = activeCity === city.name
          const totalServices = cityStats.freelancer + cityStats.umkm

          return (
            <div
              key={city.name}
              className="absolute z-20 group"
              style={{ top: city.top, left: city.left }}
              onMouseEnter={() => setActiveCity(city.name)}
              onMouseLeave={() => setActiveCity(null)}
              onClick={() => setActiveCity(isActive ? null : city.name)}
            >
              {/* Pin Indicator */}
              <div className="relative flex items-center justify-center -ml-3 -mt-3 cursor-pointer">
                <div className={`absolute w-8 h-8 rounded-full ${isActive ? 'bg-zinc-900/30 scale-125' : 'bg-zinc-900/10 group-hover:scale-110'} transition-transform duration-200`}></div>
                <div className={`w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-all duration-200 ${isActive ? 'bg-zinc-950 scale-110' : 'bg-zinc-800 group-hover:bg-zinc-950'}`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>

                {/* Floating Label when not active */}
                {!isActive && (
                  <div className="absolute top-6 whitespace-nowrap text-[10px] font-medium text-zinc-700 bg-white/95 px-2 py-0.5 rounded border border-zinc-200/70 shadow-xs pointer-events-none">
                    {city.name}
                  </div>
                )}
              </div>

              {/* Tooltip / Minimalist Card */}
              <div
                className={`absolute w-[210px] bg-white rounded-xl shadow-md border border-zinc-200/90 p-3.5 transition-all duration-200 z-50
                  ${parseInt(city.left) > 70 ? 'right-0' : parseInt(city.left) < 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'}
                  ${parseInt(city.top) > 60 ? 'bottom-full mb-3 origin-bottom' : 'top-full mt-3 origin-top'}
                  ${isActive ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
              >
                <div className="text-left mb-2.5 pb-2 border-b border-zinc-100">
                  <h3 className="font-semibold text-zinc-950 text-sm">{city.name}</h3>
                  <div className="text-[11px] text-zinc-500 mt-0.5">{totalServices} Profil Terdaftar</div>
                </div>

                <div className="space-y-1.5">
                  <a
                    href={`/freelancers?kota=${city.name}`}
                    className="block w-full text-center py-1.5 px-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 text-xs font-medium transition-colors"
                  >
                    {cityStats.freelancer} Freelancer
                  </a>
                  <a
                    href={`/umkm?kota=${city.name}`}
                    className="block w-full text-center py-1.5 px-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-950 hover:text-white text-zinc-700 text-xs font-medium transition-colors border border-zinc-100"
                  >
                    {cityStats.umkm} UMKM
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
