import { Mail, Phone, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SectionHeading } from '@/components/section-heading'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { SocialLinks } from '@/components/social-links'
import { Reveal } from '@/components/reveal'

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: siteConfig.contact.location,
    href: null,
  },
] as const

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent to-primary text-primary-foreground shadow-lg">
            <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
              <div className="flex flex-col gap-6">
                <SectionHeading
                  align="left"
                  title="Get in touch"
                  description="Have a question or ready to order? Message us on WhatsApp for the quickest reply, or reach us by email or phone."
                  className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80 [&_span]:bg-white/15 [&_span]:text-primary-foreground"
                  eyebrow="Contact"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppButton size="lg" label="Chat on WhatsApp" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-primary-foreground/80">Follow us</span>
                  <SocialLinks tone="inverted" />
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-primary-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-medium uppercase tracking-wide text-primary-foreground/70">
                          {label}
                        </span>
                        <span className="text-base font-semibold">{value}</span>
                      </span>
                    </>
                  )
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                          {content}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
