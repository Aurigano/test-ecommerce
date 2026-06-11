import { cn } from '../../lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-lg border-2 border-[var(--storefront-line)] bg-[var(--storefront-panel)] text-[var(--storefront-ink)] shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-2 p-6', className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        'text-xl font-bold tracking-tight text-[var(--storefront-ink)]',
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-[var(--storefront-muted)]', className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
