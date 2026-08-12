import { NextResponse } from 'next/server'
import {
  COOKIE_NAME,
  createSessionToken,
  SESSION_DURATION_MS,
  verifyPassword,
} from '@/lib/auth/session'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = createSessionToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_MS / 1000,
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
