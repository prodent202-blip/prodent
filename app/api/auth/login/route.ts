import { NextResponse } from 'next/server'
import { isAdminUser } from '@/lib/auth/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email?.trim() || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.',
        },
        { status: 500 },
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error || !data.user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    if (!isAdminUser(data.user)) {
      await supabase.auth.signOut()
      return NextResponse.json({ error: 'You do not have admin access' }, { status: 403 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
