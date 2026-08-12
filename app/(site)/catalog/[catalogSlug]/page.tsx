import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FolderOpen } from 'lucide-react'
import { getCatalogBySlug, getCategoriesByCatalogId } from '@/lib/supabase/queries'
import { SectionHeading } from '@/components/section-heading'
import { CatalogBreadcrumb } from '@/components/catalog/breadcrumb'
import { CategoryCard } from '@/components/catalog/category-card'
import { Reveal } from '@/components/reveal'

type PageProps = {
  params: Promise<{ catalogSlug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { catalogSlug } = await params
  const catalog = await getCatalogBySlug(catalogSlug).catch(() => null)
  return {
    title: catalog ? catalog.name : 'Catalog',
    description: catalog?.description ?? undefined,
  }
}

export default async function CatalogCategoriesPage({ params }: PageProps) {
  const { catalogSlug } = await params
  const catalog = await getCatalogBySlug(catalogSlug).catch(() => null)

  if (!catalog) notFound()

  const categories = await getCategoriesByCatalogId(catalog.id).catch(() => [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <CatalogBreadcrumb
          items={[
            { label: 'Catalog', href: '/catalog' },
            { label: catalog.name },
          ]}
          className="mb-6"
        />
        <SectionHeading
          align="left"
          title={catalog.name}
          description={catalog.description ?? 'Browse categories in this catalog.'}
        />
      </Reveal>

      {categories.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal as="li" key={category.id} delay={i * 90} className="h-full">
              <CategoryCard category={category} catalogSlug={catalog.slug} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal delay={90}>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FolderOpen className="size-7" aria-hidden="true" />
            </span>
            <p className="text-muted-foreground">No categories in this catalog yet.</p>
          </div>
        </Reveal>
      )}
    </div>
  )
}
