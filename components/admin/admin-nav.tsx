'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/catalogs', label: 'Catalogs' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/settings', label: 'Settings' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-4 sm:flex">
      {links.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              active ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
