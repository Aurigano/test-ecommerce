import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded px-2 py-1 text-[11px] font-semibold',
  {
    variants: {
      variant: {
        soft: 'border border-transparent bg-[var(--storefront-chip)] text-[var(--storefront-brand-strong)]',
        outline: 'border border-[var(--storefront-line)] bg-white text-[var(--storefront-muted)]',
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
