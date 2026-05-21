'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storefront-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--storefront-brand)] text-white shadow-[0_18px_34px_-22px_var(--storefront-brand-strong)] hover:bg-[var(--storefront-brand-strong)]',
        outline:
          'border border-[var(--storefront-line)] bg-[var(--storefront-panel-strong)] text-[var(--storefront-ink)] hover:border-[var(--storefront-brand)] hover:text-[var(--storefront-brand-strong)]',
        ghost:
          'bg-transparent text-[var(--storefront-muted)] hover:bg-[var(--storefront-chip)] hover:text-[var(--storefront-ink)]',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-6',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
