import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Reveal } from '@/components/reveal'

export function CtaSection() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent to-primary text-primary-foreground shadow-lg">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:p-12 lg:p-16">
              <SectionHeading
                align="center"
                title="Ready to order or need a quote?"
                description="The fastest way to reach us is on WhatsApp. We typically respond within the same working day."
                className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80"
                eyebrow="Get in Touch"
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton size="lg" label="Chat on WhatsApp" />
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 text-base font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Contact details
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
