'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AdminField, adminInputClass } from '@/components/admin/admin-field'

export function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      const from = searchParams.get('from') || '/admin'
      router.push(from)
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your admin account to manage the site.
        </p>

        <div className="mt-6 space-y-4">
          <AdminField label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={adminInputClass}
              autoComplete="email"
              required
              autoFocus
            />
          </AdminField>

          <AdminField label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={adminInputClass}
              autoComplete="current-password"
              required
            />
          </AdminField>
        </div>

        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}

        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
