import { cn } from '@/lib/utils'

type AdminFieldProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  label: string
  children: React.ReactNode
  className?: string
}

export function AdminField({ label, children, className, ...props }: AdminFieldProps) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)} {...props}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

export const adminInputClass =
  'h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20'

export const adminTextareaClass =
  'min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
