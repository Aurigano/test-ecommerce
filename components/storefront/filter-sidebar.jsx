import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Badge } from '../ui/badge'

export function FilterSidebar({
  sections = [
    { title: 'Price', options: ['Under INR 2,500', 'INR 2,500 - 7,500', 'Above INR 7,500'] },
    { title: 'Delivery', options: ['Same day', 'Tomorrow', 'Within 3 days'] },
    { title: 'Offers', options: ['Tabby available', 'Tamara available', 'Free delivery'] },
  ],
}) {
  return (
    <Card className="rounded-lg bg-[var(--storefront-panel-strong)]">
      <CardHeader className="space-y-3">
        <Badge variant="outline">Sidebar filters</Badge>
        <div className="space-y-1">
          <CardTitle>Refine the catalog</CardTitle>
          <CardDescription>Designed as a configurable rail for desktop-heavy product discovery.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {sections.map((section) => (
          <div
            key={section.title}
            className="space-y-3 border-t-2 border-[var(--storefront-line)] pt-5 first:border-t-0 first:pt-0"
          >
            <h3 className="text-base font-bold text-gray-700">{section.title}</h3>
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => (
                <Badge key={option}>{option}</Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
