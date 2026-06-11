import { Card, CardContent } from '../ui/card'

export function StorefrontInsightGrid({ items }) {
  return (
    <section className="grid gap-3 md:grid-cols-4">
      {items.map(([title, body]) => (
        <Card key={title} className="rounded-lg bg-[var(--storefront-panel-strong)]">
          <CardContent className="space-y-3 p-5">
            <p className="text-lg font-bold text-gray-700">{title}</p>
            <p className="text-sm leading-6 text-[var(--storefront-muted)]">{body}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
