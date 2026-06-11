import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(
          'h-11 w-full appearance-none rounded-lg border-2 border-[var(--storefront-line)] bg-white px-4 pr-10 text-sm font-medium text-[var(--storefront-ink)] outline-none transition-all focus:border-[var(--storefront-brand)] focus-visible:ring-2 focus-visible:ring-[var(--storefront-brand)]/15',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--storefront-muted)]" />
    </div>
  )
}

export { Select }
