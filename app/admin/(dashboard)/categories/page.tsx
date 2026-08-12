'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AdminField, adminInputClass } from '@/components/admin/admin-field'
import type { Catalog, Category } from '@/lib/types/catalog'

type CategoryWithCatalog = Category & { catalog: Pick<Catalog, 'id' | 'name' | 'slug'> }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithCatalog[]>([])
  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [name, setName] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    const [catRes, catalogRes] = await Promise.all([
      fetch('/api/admin/categories'),
      fetch('/api/admin/catalogs'),
    ])
    if (catRes.ok) setCategories(await catRes.json())
    if (catalogRes.ok) {
      const data = await catalogRes.json()
      setCatalogs(data)
      if (!catalogId && data.length > 0) setCatalogId(data[0].id)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function resetForm() {
    setName('')
    setEditingId(null)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const body = { name, catalog_id: catalogId, ...(editingId ? { id: editingId } : {}) }
    const res = await fetch('/api/admin/categories', {
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
    if (!confirm('Delete this category and all its products?')) return
    await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  function startEdit(category: CategoryWithCatalog) {
    setEditingId(category.id)
    setName(category.name)
    setCatalogId(category.catalog_id)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Categories</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold">{editingId ? 'Edit category' : 'New category'}</h2>
        <AdminField label="Catalog">
          <select
            value={catalogId}
            onChange={(e) => setCatalogId(e.target.value)}
            className={adminInputClass}
            required
          >
            {catalogs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={adminInputClass} required />
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
        ) : categories.length === 0 ? (
          <p className="text-muted-foreground">No categories yet.</p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-foreground">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.catalog?.name} · /{category.slug}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
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
