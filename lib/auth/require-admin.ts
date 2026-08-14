import type { User } from '@supabase/supabase-js'
import { isAdminUser } from '@/lib/auth/admin'
import { createClient } from '@/lib/supabase/server'

export async function requireAdminSession(): Promise<User | null> {
  const supabase = await createClient()
  if (!supabase) return null

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user || !isAdminUser(user)) return null
  return user
}

export async function getAdminSession(): Promise<User | null> {
  return requireAdminSession()
}
