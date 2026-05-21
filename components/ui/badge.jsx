import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
  {
    variants: {
      variant: {
        soft: 'border-transparent bg-[var(--storefront-chip)] text-[var(--storefront-brand-strong)]',
        outline: 'border-[var(--storefront-line)] text-[var(--storefront-muted)]',
      },
    },
    defaultVariants: {
      variant: 'soft',
    },
  },
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
