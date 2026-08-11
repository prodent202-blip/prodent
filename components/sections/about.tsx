import { MapPin, Ship, Handshake } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const highlights = [
  { icon: Ship, label: 'Imported from Pakistan' },
  { icon: Handshake, label: 'Distributed across Mauritius' },
  { icon: MapPin, label: siteConfig.contact.location },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="About Us"
            title="Your local partner for dental & surgical supplies"
            description={`${siteConfig.name} is an importer and distributor of dental and surgical instruments and dental materials. We source dependable, medical-grade products from Pakistan and deliver them to dental professionals throughout Mauritius — combining international quality with reliable local service.`}
          />
        </Reveal>

        <Reveal delay={100}>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
