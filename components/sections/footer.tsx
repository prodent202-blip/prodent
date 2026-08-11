import Image from 'next/image'
import { navLinks, siteConfig } from '@/lib/site-config'
import { SocialLinks } from '@/components/social-links'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            {/* Horizontal logo placeholder — swap /public/prodent-logo.png */}
            <Image
              src="/prodent-logo.png"
              alt={`${siteConfig.name} logo`}
              width={180}
              height={58}
              className="h-12 w-auto object-contain"
            />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Connect
            </h2>
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-primary"
              >
                {siteConfig.contact.phone}
              </a>
              <span>{siteConfig.contact.location}</span>
            </div>
            <SocialLinks className="mt-1" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Dental &amp; surgical supplies · Mauritius
          </p>
        </div>
      </div>
    </footer>
  )
}
