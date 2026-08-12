import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { safeGetCatalogs } from '@/lib/supabase/queries'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CatalogCard } from '@/components/catalog/catalog-card'

export async function CatalogTeaser() {
  const catalogs = await safeGetCatalogs()
  const preview = catalogs.slice(0, 3)

  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Products & Catalog"
            title="Browse our instrument catalogs"
            description="Explore our full range of dental and surgical instruments, organized by catalog and category."
          />
        </Reveal>

        {preview.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((catalog, i) => (
              <Reveal as="li" key={catalog.id} delay={i * 90} className="h-full">
                <CatalogCard catalog={catalog} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal delay={90}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-7" aria-hidden="true" />
              </span>
              <p className="max-w-md text-muted-foreground">
                Our product catalog is being updated. Browse the catalog page or contact us on
                WhatsApp for current availability.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/catalog"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Browse full catalog
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
