'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/site-config'
import { Logo } from '@/components/logo'
import { WhatsAppButton } from '@/components/whatsapp-button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-background/60 backdrop-blur-sm',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
      >
        <Logo priority />

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive(link.href) ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <WhatsAppButton label="Get in Touch" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 ease-in-out md:hidden',
          open ? 'max-h-96' : 'max-h-0 border-t-transparent',
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary hover:text-primary',
                  isActive(link.href) ? 'text-primary' : 'text-foreground',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 px-1">
            <WhatsAppButton label="Get in Touch" className="w-full" />
          </li>
        </ul>
      </div>
    </header>
  )
}
