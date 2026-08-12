import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { safeGetSiteSetting } from '@/lib/supabase/queries'
import { DEFAULT_MAP_EMBED_URL } from '@/lib/types/catalog'
import { SectionHeading } from '@/components/section-heading'
import { ContactDetails } from '@/components/contact-details'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${siteConfig.name} — email, phone, WhatsApp, and location in Grand Baie, Mauritius.`,
}

export default async function ContactPage() {
  const mapEmbedUrl = await safeGetSiteSetting('map_embed_url', DEFAULT_MAP_EMBED_URL)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          description="Have a question about our products, need a quote, or want to place an order? Reach out — we typically respond within the same working day."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal delay={80}>
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Contact details</h2>
            <ContactDetails />
            <div className="border-t border-border pt-6">
              <p className="mb-4 text-sm text-muted-foreground">
                The fastest way to reach us is on WhatsApp — tap below to start a chat.
              </p>
              <WhatsAppButton size="lg" label="Chat on WhatsApp" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <iframe
                title="Prodent location map"
                src={mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Find us in Grand Baie — feel free to reach out before visiting to make sure
              someone&apos;s available to assist you.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
