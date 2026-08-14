import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth/require-admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const user = await requireAdminSession()
  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await request.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: 'Current password and new password are required' },
      { status: 400 },
    )
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: 'New password must be at least 8 characters' },
      { status: 400 },
    )
  }

  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Authentication is not configured' }, { status: 500 })
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })

  if (verifyError) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
  }

  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
