import { cn } from '@/lib/utils'
import { getWhatsAppLink } from '@/lib/site-config'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'

type WhatsAppButtonProps = {
  /** Visible label. Defaults to a friendly CTA. */
  label?: string
  /** Optional custom prefilled WhatsApp message. */
  message?: string
  className?: string
  size?: 'md' | 'lg'
  variant?: 'brand' | 'outline'
}

const sizeStyles: Record<NonNullable<WhatsAppButtonProps['size']>, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

/**
 * The single, config-driven WhatsApp CTA reused everywhere.
 * Opens the wa.me link (number + prefilled message from site-config) in a new tab.
 */
export function WhatsAppButton({
  label = 'Get in Touch on WhatsApp',
  message,
  className,
  size = 'md',
  variant = 'brand',
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        variant === 'brand'
          ? 'bg-[#25D366] text-white hover:bg-[#20bd5a]'
          : 'border border-border bg-card text-foreground hover:bg-secondary',
        sizeStyles[size],
        className,
      )}
    >
      <WhatsAppIcon className="size-5" />
      <span>{label}</span>
    </a>
  )
}
