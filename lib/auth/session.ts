import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'prodent_admin_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function getSecret(): string | null {
  return process.env.ADMIN_PASSWORD ?? null
}

function sign(payload: string): string | null {
  const secret = getSecret()
  if (!secret) return null
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function createSessionToken(): string {
  const secret = getSecret()
  if (!secret) throw new Error('ADMIN_PASSWORD is not configured')

  const expires = Date.now() + SESSION_DURATION_MS
  const payload = `${expires}`
  const signature = sign(payload)!
  return `${payload}.${signature}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !getSecret()) return false

  const [expiresStr, signature] = token.split('.')
  if (!expiresStr || !signature) return false

  const expected = sign(expiresStr)
  if (!expected) return false

  try {
    const sigBuf = Buffer.from(signature)
    const expectedBuf = Buffer.from(expected)
    if (sigBuf.length !== expectedBuf.length) return false
    if (!timingSafeEqual(sigBuf, expectedBuf)) return false
  } catch {
    return false
  }

  const expires = Number(expiresStr)
  if (Number.isNaN(expires) || Date.now() > expires) return false

  return true
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false

  try {
    const a = Buffer.from(password)
    const b = Buffer.from(adminPassword)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export { COOKIE_NAME, SESSION_DURATION_MS }
