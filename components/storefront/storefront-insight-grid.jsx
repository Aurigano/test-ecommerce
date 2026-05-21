import { Card, CardContent } from '../ui/card'

export function StorefrontInsightGrid({ items }) {
  return (
    <section className="grid gap-3 md:grid-cols-4">
      {items.map(([title, body]) => (
        <Card key={title} className="rounded-[28px] bg-[var(--storefront-panel-strong)]">
          <CardContent className="space-y-3 p-5">
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">{title}</p>
            <p className="text-sm leading-6 text-[var(--storefront-muted)]">{body}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
