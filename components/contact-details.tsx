import { Mail, MapPin, Phone } from 'lucide-react'
import type { ContactInfo } from '@/lib/contact'
import { cn } from '@/lib/utils'

type ContactDetailsProps = {
  contact: ContactInfo
  className?: string
  /** Visual variant for light or inverted backgrounds. */
  variant?: 'default' | 'inverted'
}

export function ContactDetails({ contact, className, variant = 'default' }: ContactDetailsProps) {
  const isInverted = variant === 'inverted'

  const itemClass = cn(
    'flex items-center gap-3 text-sm',
    isInverted ? 'text-primary-foreground/90' : 'text-muted-foreground',
  )

  const linkClass = cn(
    'transition-colors',
    isInverted ? 'hover:text-primary-foreground' : 'hover:text-primary',
  )

  const iconClass = cn(
    'size-4 shrink-0',
    isInverted ? 'text-primary-foreground/70' : 'text-primary',
  )

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div className={itemClass}>
        <MapPin className={iconClass} aria-hidden="true" />
        <span>{contact.location}</span>
      </div>
      <div className={itemClass}>
        <Mail className={iconClass} aria-hidden="true" />
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
      </div>
      <div className={itemClass}>
        <Phone className={iconClass} aria-hidden="true" />
        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className={linkClass}>
          {contact.phone}
        </a>
      </div>
    </div>
  )
}
