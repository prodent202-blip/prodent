import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type BreadcrumbItem = {
  label: string
  href?: string
}

type CatalogBreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function CatalogBreadcrumb({ items, className }: CatalogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 text-sm', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            {i > 0 ? (
              <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden="true" />
            ) : null}
            {item.href && !isLast ? (
              <Link href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
