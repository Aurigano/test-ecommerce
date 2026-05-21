import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(
          'h-11 w-full appearance-none rounded-full border border-[var(--storefront-line)] bg-[var(--storefront-panel-strong)] px-4 pr-10 text-sm font-medium text-[var(--storefront-ink)] outline-none transition-all focus-visible:ring-2 focus-visible:ring-[var(--storefront-brand)]',
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
