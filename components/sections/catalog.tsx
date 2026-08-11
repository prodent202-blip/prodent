import { Download, FileText } from 'lucide-react'
import { productCategories, siteConfig } from '@/lib/site-config'
import { SectionHeading } from '@/components/section-heading'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'

export function Catalog() {
  return (
    <section id="products" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Products & Catalog"
            title="A complete range for your practice"
            description="Browse our core categories below. Placeholder images can be swapped for real product photos, and the full catalog is available to download."
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category, i) => (
            <Reveal as="li" key={category.title} delay={i * 90} className="h-full">
              <ProductCard category={category} />
            </Reveal>
          ))}
        </ul>

        {/* Download full catalog — point `catalogPdf` in site-config at a real PDF */}
        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-primary/20 bg-gradient-to-br from-secondary to-card p-8 text-center shadow-sm sm:flex-row sm:text-left lg:p-10">
            <div className="flex items-center gap-5">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:inline-flex">
                <FileText className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Download our full catalog</h3>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Get the complete list of instruments, materials, and consumables in one PDF.
                </p>
              </div>
            </div>
            <a
              href={siteConfig.catalogPdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Download className="size-5" aria-hidden="true" />
              Download Full Catalog (PDF)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
