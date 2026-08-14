import { NextResponse, type NextRequest } from 'next/server'
import { isAuthenticatedAdmin, updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const { response, user } = await updateSession(request)
  const isAdmin = isAuthenticatedAdmin(user)

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isAdmin) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === '/admin/login' && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
