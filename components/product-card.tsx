import Image from 'next/image'
import type { ProductCategory } from '@/lib/site-config'

type ProductCardProps = {
  category: ProductCategory
}

/**
 * Product category card with an image slot.
 * Swap the image path in lib/site-config.ts to use your own photo.
 */
export function ProductCard({ category }: ProductCardProps) {
  const { title, description, image, imageAlt, icon: Icon } = category

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      {/* Image slot — replace `image` in site-config to use a real photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={image || '/placeholder.svg'}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </article>
  )
}
