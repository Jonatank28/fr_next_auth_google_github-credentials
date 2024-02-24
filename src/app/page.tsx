import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getCurrentUser()
  if (!session) {
    redirect('/login')
  } else {
    redirect('/home')
  }
}
