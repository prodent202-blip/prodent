'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Product } from '@/lib/types/catalog'
import { CatalogProductCard } from '@/components/catalog/catalog-product-card'
import { Reveal } from '@/components/reveal'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false),
    )
  }, [products, query])

  return (
    <div className="flex flex-col gap-8">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal as="li" key={product.id} delay={i * 60} className="h-full">
              <CatalogProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">
          No products match your search. Try a different term or contact us on WhatsApp.
        </p>
      )}
    </div>
  )
}
