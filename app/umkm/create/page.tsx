import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CreateUMKMClient from '@/components/umkm/CreateUMKMClient'

export default function CreateUMKMPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="flex-1 container-custom py-10 md:py-16">
        <CreateUMKMClient />
      </main>
      <Footer />
    </div>
  )
}
