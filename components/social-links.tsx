import { cn } from '@/lib/utils'
import { socialLinks } from '@/lib/site-config'

type SocialLinksProps = {
  className?: string
  /** Visual tone: on light surfaces vs. on the dark footer. */
  tone?: 'default' | 'inverted'
}

/** Config-driven social icon row. Update URLs in lib/site-config.ts. */
export function SocialLinks({ className, tone = 'default' }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-2.5', className)}>
      {socialLinks.map(({ platform, label, href, icon: Icon }) => (
        <li key={platform}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5',
              tone === 'inverted'
                ? 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-secondary hover:text-primary',
            )}
          >
            <Icon className="size-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
