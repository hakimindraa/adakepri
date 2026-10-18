import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { semuaKota } from '@/lib/data'
import { getAllFreelancers } from '@/lib/actions/freelancer'
import FreelancerListClient from './FreelancerListClient'

export default async function FreelancersPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string; kota?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const freelancers = await getAllFreelancers()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-zinc-200/80 py-12 md:py-16">
        <div className="container-custom max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-4 border border-zinc-200/60">
            Katalog Talenta Terverifikasi
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            Direktori Freelancer
          </h1>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Temukan profesional mandiri di Kepulauan Riau untuk membantu kebutuhan desain, software, multimedia, hingga jasa teknis.
          </p>
        </div>
      </div>

      <main className="container-custom py-10 md:py-14 flex-1">
        <FreelancerListClient 
          initialFreelancers={freelancers} 
          semuaKota={semuaKota}
          initialKota={params?.kota || ''}
          initialQ={params?.q || ''}
        />
      </main>

      <Footer />
    </div>
  )
}
