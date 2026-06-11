import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

export function StorefrontHero({
  heroTitle,
  heroBody,
  heroCta,
  secondaryCta,
  trustBadges,
  featuredProducts,
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-stretch">
      <div className="flex flex-col justify-between rounded-lg border-2 border-[var(--storefront-line)] bg-[var(--storefront-hero-blend)] p-7 shadow-lg md:p-10">
        <div className="space-y-6">
          <Badge variant="outline">Component library theme</Badge>
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-gray-800 md:text-5xl xl:text-6xl">
              {heroTitle}
            </h2>
            <p className="max-w-xl text-base leading-7 text-[var(--storefront-muted)] md:text-lg">{heroBody}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#catalog">
                {heroCta}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/checkout">{secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {trustBadges.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card className="overflow-hidden rounded-lg">
          <div className="relative h-full min-h-[360px] overflow-hidden">
            <img
              src={featuredProducts[0]?.image}
              alt={featuredProducts[0]?.title}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <Badge className="mb-3 border-white/20 bg-white/12 text-white backdrop-blur" variant="outline">
                Featured drop
              </Badge>
              <h3 className="max-w-xs text-3xl font-bold">
                {featuredProducts[0]?.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/78">
                Editorial imagery, offer framing, and purchase cues all stay themeable from the back office.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="rounded-lg bg-[var(--storefront-panel-strong)]">
            <CardContent className="space-y-4 p-6">
              <div className="inline-flex size-11 items-center justify-center rounded-lg bg-[var(--storefront-chip)]">
                <Sparkles className="size-5 text-[var(--storefront-brand-strong)]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  Dynamic branding without code changes
                </h3>
                <p className="text-sm leading-6 text-[var(--storefront-muted)]">
                  Swap logos, brand colors, backgrounds, and section tone while keeping a stable commerce component
                  system underneath.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {featuredProducts.slice(1).map((product) => (
              <Card key={product.id} className="overflow-hidden rounded-lg bg-[var(--storefront-panel-strong)]">
                <div className="grid min-h-[180px] grid-cols-[112px_minmax(0,1fr)]">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                  <div className="flex flex-col justify-between gap-3 p-4">
                    <div className="space-y-2">
                      <Badge>{product.category}</Badge>
                      <h3 className="text-lg font-bold leading-tight text-gray-800">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-6 text-[var(--storefront-muted)]">{product.delivery}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
