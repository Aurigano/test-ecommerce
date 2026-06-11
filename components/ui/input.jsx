import * as React from 'react'
import { cn } from '../../lib/utils'

const Input = React.forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-lg border-2 border-[var(--storefront-line)] bg-white px-4 py-2 text-sm text-[var(--storefront-ink)] shadow-sm outline-none transition-all placeholder:text-[var(--storefront-muted)] focus:border-[var(--storefront-brand)] focus-visible:ring-2 focus-visible:ring-[var(--storefront-brand)]/15',
        className,
      )}
      {...props}
    />
  )
})

export { Input }
