import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { Catalog } from '@/lib/types/catalog'

type CatalogCardProps = {
  catalog: Catalog
}

export function CatalogCard({ catalog }: CatalogCardProps) {
  return (
    <Link
      href={`/catalog/${catalog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">{catalog.name}</h3>
        {catalog.description ? (
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {catalog.description}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View categories
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
