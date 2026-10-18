import { auth } from '@/auth'
import NavbarClient from './NavbarClient'
import { db } from '@/lib/db'

export default async function Navbar() {
  const session = await auth()
  
  let role = "USER"
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })
    if (user?.role) role = user.role
  }

  return (
    <NavbarClient 
      session={session} 
      userRole={role} 
    />
  )
}
