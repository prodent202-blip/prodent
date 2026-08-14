import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Authentication is not configured' }, { status: 500 })
  }

  await supabase.auth.signOut()
  return NextResponse.json({ success: true })
}
