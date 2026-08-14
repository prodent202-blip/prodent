import Image from 'next/image'
import type { Product } from '@/lib/types/catalog'
import { buildProductWhatsAppLink, type ContactInfo } from '@/lib/contact'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'

type CatalogProductCardProps = {
  product: Product
  contact: ContactInfo
}

export function CatalogProductCard({ product, contact }: CatalogProductCardProps) {
  const whatsappHref = buildProductWhatsAppLink(contact, product.name)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        {product.description ? (
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        ) : null}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20bd5a]"
        >
          <WhatsAppIcon className="size-4" />
          Enquire on WhatsApp
        </a>
      </div>
    </article>
  )
}
