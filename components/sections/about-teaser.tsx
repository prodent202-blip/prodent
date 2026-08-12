import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function AboutTeaser() {
  return (
    <section className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="About Us"
            title="Trusted Dental & Surgical Instrument Distribution in Mauritius"
            description="Prodent imports and distributes high-quality dental and surgical instruments, as well as dental materials, sourced directly from trusted manufacturers in Pakistan. We work with dental clinics, surgeons, and healthcare suppliers across Mauritius."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-base font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
            >
              Learn more about us
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
