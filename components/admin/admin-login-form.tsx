'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AdminField, adminInputClass } from '@/components/admin/admin-field'

export function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const from = searchParams.get('from') || '/admin'
      router.push(from)
      router.refresh()
    } else {
      setError('Invalid password')
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
          Enter your password to manage catalogs and products.
        </p>

        <div className="mt-6">
          <AdminField label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={adminInputClass}
              required
              autoFocus
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
