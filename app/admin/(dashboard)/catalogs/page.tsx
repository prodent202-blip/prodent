'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminField, adminInputClass, adminTextareaClass } from '@/components/admin/admin-field'
import type { Catalog } from '@/lib/types/catalog'

export default function AdminCatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    const res = await fetch('/api/admin/catalogs')
    if (res.ok) setCatalogs(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function resetForm() {
    setName('')
    setDescription('')
    setEditingId(null)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const body = { name, description, ...(editingId ? { id: editingId } : {}) }
    const res = await fetch('/api/admin/catalogs', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      resetForm()
      load()
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to save')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this catalog and all its categories and products?')) return
    await fetch('/api/admin/catalogs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  function startEdit(catalog: Catalog) {
    setEditingId(catalog.id)
    setName(catalog.name)
    setDescription(catalog.description || '')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Catalogs</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold">{editingId ? 'Edit catalog' : 'New catalog'}</h2>
        <AdminField label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={adminInputClass} required />
        </AdminField>
        <AdminField label="Description">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={adminTextareaClass} />
        </AdminField>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <div className="flex gap-2">
          <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
          {editingId ? (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="mt-8">
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : catalogs.length === 0 ? (
          <p className="text-muted-foreground">No catalogs yet.</p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {catalogs.map((catalog) => (
              <li key={catalog.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-foreground">{catalog.name}</p>
                  {catalog.description ? (
                    <p className="text-sm text-muted-foreground">{catalog.description}</p>
                  ) : null}
                  <p className="text-xs text-muted-foreground">/{catalog.slug}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(catalog)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(catalog.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
