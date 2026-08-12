import type { Metadata } from 'next'
import { ShieldCheck, BadgeDollarSign, Truck, HeartHandshake } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${siteConfig.name} — trusted dental and surgical instrument distribution in Mauritius.`,
}

const values = [
  {
    title: 'Quality First',
    description:
      'Every instrument and material we distribute is sourced for durability and precision, so professionals can trust their tools.',
    icon: ShieldCheck,
  },
  {
    title: 'Fair, Transparent Pricing',
    description:
      'We cut out unnecessary middlemen to keep our prices competitive, with no hidden costs.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Reliability',
    description:
      "Consistent stock and dependable delivery, because your clinic can't afford to wait.",
    icon: Truck,
  },
  {
    title: 'Local Support',
    description:
      'A Mauritius-based team that understands the local market and is easy to reach.',
    icon: HeartHandshake,
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="About Us"
          title="Trusted Dental & Surgical Instrument Distribution in Mauritius"
          description="Prodent imports and distributes high-quality dental and surgical instruments, as well as dental materials, sourced directly from trusted manufacturers in Pakistan. We work with dental clinics, surgeons, and healthcare suppliers across Mauritius, giving them reliable access to the tools and materials they depend on every day."
        />
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal delay={80}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Prodent was founded to close a gap in the local market — reliable, affordable, and
              genuine dental and surgical instruments, without the long wait times and high costs of
              sourcing internationally on your own. By building direct relationships with
              manufacturers in Pakistan, we&apos;re able to bring quality instruments and materials
              to Mauritius at competitive prices, backed by local support.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Our Mission</h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                To make quality dental and surgical instruments accessible and affordable to every
                dental practice and clinic in Mauritius, backed by dependable service and fast local
                availability.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Our Vision</h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                To become Mauritius&apos;s most trusted name in dental and surgical instrument
                distribution — known for quality, consistency, and genuine care for the
                professionals we serve.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our values"
            description="The principles that guide every product we distribute and every relationship we build."
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal
              as="li"
              key={value.title}
              delay={i * 90}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <value.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  )
}
