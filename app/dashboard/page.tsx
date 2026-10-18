import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { getMyUMKM } from '@/lib/actions/umkm'
import { getFreelancerByUserId } from '@/lib/actions/freelancer'
import { getInbox } from '@/lib/actions/message'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const userDb = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })
  
  const umkmProfile = await getMyUMKM()
  const freelancerProfile = await getFreelancerByUserId(session.user.id)
  const messages = await getInbox()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <DashboardClient user={{...session.user, role: userDb?.role || 'USER'}} umkm={umkmProfile} freelancer={freelancerProfile} initialMessages={messages} />
      <Footer />
    </div>
  )
}
