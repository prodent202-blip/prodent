import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'

type LogoProps = {
  /** Sized for a horizontal logo. Swap /public/prodent-logo.png with your own. */
  className?: string
  priority?: boolean
}

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        'inline-flex items-center rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <Image
        src="/prodent-logo.png"
        alt={`${siteConfig.name} logo`}
        width={200}
        height={64}
        priority={priority}
        className="h-11 w-auto object-contain sm:h-12"
      />
    </Link>
  )
}
