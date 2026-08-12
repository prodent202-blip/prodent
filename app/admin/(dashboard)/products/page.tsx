'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AdminField, adminInputClass, adminTextareaClass } from '@/components/admin/admin-field'
import type { Catalog, Category, Product } from '@/lib/types/catalog'

type ProductWithRelations = Product & {
  category: Pick<Category, 'id' | 'name' | 'slug'>
  catalog: Pick<Catalog, 'id' | 'name' | 'slug'>
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [categories, setCategories] = useState<(Category & { catalog: Catalog })[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    const [prodRes, catRes, catalogRes] = await Promise.all([
      fetch('/api/admin/products'),
      fetch('/api/admin/categories'),
      fetch('/api/admin/catalogs'),
    ])
    if (prodRes.ok) setProducts(await prodRes.json())
    if (catalogRes.ok) {
      const data = await catalogRes.json()
      setCatalogs(data)
      if (!catalogId && data.length > 0) setCatalogId(data[0].id)
    }
    if (catRes.ok) setCategories(await catRes.json())
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredCategories = categories.filter((c) => c.catalog_id === catalogId)

  useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find((c) => c.id === categoryId)) {
      setCategoryId(filteredCategories[0].id)
    }
  }, [catalogId, filteredCategories, categoryId])

  function resetForm() {
    setName('')
    setDescription('')
    setImageUrl('')
    setEditingId(null)
    setError('')
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    if (res.ok) {
      const { url } = await res.json()
      setImageUrl(url)
    } else {
      const data = await res.json()
      setError(data.error || 'Upload failed')
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const body = {
      name,
      description,
      catalog_id: catalogId,
      category_id: categoryId,
      image_url: imageUrl,
      ...(editingId ? { id: editingId } : {}),
    }

    const res = await fetch('/api/admin/products', {
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
    if (!confirm('Delete this product?')) return
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  function startEdit(product: ProductWithRelations) {
    setEditingId(product.id)
    setName(product.name)
    setDescription(product.description || '')
    setCatalogId(product.catalog_id)
    setCategoryId(product.category_id)
    setImageUrl(product.image_url || '')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Products</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold">{editingId ? 'Edit product' : 'New product'}</h2>
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
        <AdminField label="Category">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={adminInputClass}
            required
          >
            {filteredCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={adminInputClass} required />
        </AdminField>
        <AdminField label="Description">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={adminTextareaClass} />
        </AdminField>
        <AdminField label="Product image">
          <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
          {uploading ? <p className="text-xs text-muted-foreground">Uploading...</p> : null}
          {imageUrl ? (
            <div className="relative mt-2 aspect-video w-40 overflow-hidden rounded-lg border border-border">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
            </div>
          ) : null}
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
        ) : products.length === 0 ? (
          <p className="text-muted-foreground">No products yet.</p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-4">
                  {product.image_url ? (
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border">
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                    </div>
                  ) : null}
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.catalog?.name} · {product.category?.name}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(product)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
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
