import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getCatalogBySlug,
  getCategoryBySlug,
  getProductsByCategoryId,
} from '@/lib/supabase/queries'
import { SectionHeading } from '@/components/section-heading'
import { CatalogBreadcrumb } from '@/components/catalog/breadcrumb'
import { ProductGrid } from '@/components/catalog/product-grid'
import { Reveal } from '@/components/reveal'

type PageProps = {
  params: Promise<{ catalogSlug: string; categorySlug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { catalogSlug, categorySlug } = await params
  const catalog = await getCatalogBySlug(catalogSlug).catch(() => null)
  if (!catalog) return { title: 'Products' }

  const category = await getCategoryBySlug(catalog.id, categorySlug).catch(() => null)
  return {
    title: category ? `${category.name} — ${catalog.name}` : 'Products',
  }
}

export default async function CategoryProductsPage({ params }: PageProps) {
  const { catalogSlug, categorySlug } = await params
  const catalog = await getCatalogBySlug(catalogSlug).catch(() => null)
  if (!catalog) notFound()

  const category = await getCategoryBySlug(catalog.id, categorySlug).catch(() => null)
  if (!category) notFound()

  const products = await getProductsByCategoryId(category.id).catch(() => [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <CatalogBreadcrumb
          items={[
            { label: 'Catalog', href: '/catalog' },
            { label: catalog.name, href: `/catalog/${catalog.slug}` },
            { label: category.name },
          ]}
          className="mb-6"
        />
        <SectionHeading
          align="left"
          title={category.name}
          description={`Products in ${catalog.name}. Enquire on WhatsApp for pricing and availability.`}
        />
      </Reveal>

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
