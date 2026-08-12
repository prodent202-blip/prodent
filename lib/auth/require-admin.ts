import { cookies } from 'next/headers'
import { COOKIE_NAME, verifySessionToken } from '@/lib/auth/session'

export async function requireAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return verifySessionToken(token)
}
