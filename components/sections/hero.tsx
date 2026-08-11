import Image from 'next/image'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Reveal } from '@/components/reveal'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-20">
      {/* soft ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_20%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <Reveal className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Imported from Pakistan · Trusted in Mauritius
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Quality Dental &amp; Surgical Instruments
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {siteConfig.name} imports premium dental and surgical instruments and dental materials
            from Pakistan and distributes them to dentists, clinics, and surgical supply buyers
            across Mauritius.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton size="lg" />
            <a
              href="#products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-base font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
            >
              View Catalog
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <Image
              src="/images/hero-instruments.png"
              alt="Polished stainless steel dental and surgical instruments arranged on a clean surface"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* floating trust card */}
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:flex">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Medical-grade quality</p>
              <p className="text-xs text-muted-foreground">Sourced from trusted manufacturers</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
