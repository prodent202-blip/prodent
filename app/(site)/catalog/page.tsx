import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { safeGetCatalogs } from '@/lib/supabase/queries'
import { SectionHeading } from '@/components/section-heading'
import { CatalogCard } from '@/components/catalog/catalog-card'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Browse Prodent dental and surgical instrument catalogs by category.',
}

export default async function CatalogPage() {
  const catalogs = await safeGetCatalogs()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Catalog"
          title="Our product catalogs"
          description="Select a catalog to browse categories and products. Enquire on WhatsApp for pricing and availability."
        />
      </Reveal>

      {catalogs.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogs.map((catalog, i) => (
            <Reveal as="li" key={catalog.id} delay={i * 90} className="h-full">
              <CatalogCard catalog={catalog} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal delay={90}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BookOpen className="size-7" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">No catalogs yet</h3>
            <p className="max-w-md text-muted-foreground">
              Our catalog is being set up. Please contact us on WhatsApp for product information
              and availability.
            </p>
          </div>
        </Reveal>
      )}
    </div>
  )
}
