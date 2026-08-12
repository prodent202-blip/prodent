import { NextResponse, type NextRequest } from 'next/server'
import { COOKIE_NAME, verifySessionToken } from '@/lib/auth/session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!verifySessionToken(token)) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (verifySessionToken(token)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
