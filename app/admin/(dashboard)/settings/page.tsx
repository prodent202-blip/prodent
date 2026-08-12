'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminField, adminTextareaClass } from '@/components/admin/admin-field'
import { DEFAULT_MAP_EMBED_URL } from '@/lib/types/catalog'

export default function AdminSettingsPage() {
  const [mapEmbedUrl, setMapEmbedUrl] = useState(DEFAULT_MAP_EMBED_URL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        const setting = data.find((s: { key: string }) => s.key === 'map_embed_url')
        if (setting) setMapEmbedUrl(setting.value)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'map_embed_url', value: mapEmbedUrl }),
    })

    if (res.ok) {
      setMessage('Settings saved.')
    } else {
      setMessage('Failed to save settings.')
    }
    setSaving(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Update the Google Maps embed URL shown on the Contact page.
      </p>

      {loading ? (
        <p className="mt-6 text-muted-foreground">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6">
          <AdminField label="Map embed URL">
            <textarea
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
              className={adminTextareaClass}
              rows={4}
              required
            />
          </AdminField>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Map preview"
              src={mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save settings'}
          </Button>
        </form>
      )}
    </div>
  )
}
