'use client'

import { Heart, ShoppingCart, Star, Truck } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const INR_RATE = 84

function formatPrice(value) {
  return currency.format(value * INR_RATE)
}

export function ProductCard({ product, inWishlist, cartQuantity, onToggleWishlist, onAddToCart }) {
  return (
    <Card className="group overflow-hidden rounded-[28px]">
      <div className="relative overflow-hidden border-b border-[var(--storefront-line)] bg-[var(--storefront-panel-strong)]">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <Badge>{product.category}</Badge>
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-slate-900 backdrop-blur transition hover:bg-white"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`size-4 ${inWishlist ? 'fill-current text-[var(--storefront-brand-strong)]' : ''}`} />
          </button>
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-xs font-medium text-[var(--storefront-muted)]">
            <span>{product.badge}</span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-current text-[var(--storefront-brand)]" />
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold leading-tight">
              {product.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-6 text-[var(--storefront-muted)]">{product.description}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-end gap-2">
              <strong className="font-[family-name:var(--font-space-grotesk)] text-xl">{formatPrice(product.price)}</strong>
              <span className="text-sm text-[var(--storefront-muted)] line-through">{formatPrice(product.mrp)}</span>
            </div>
            <p className="text-xs font-medium text-[var(--storefront-muted)]">Tabby from {formatPrice(product.price / 4)}</p>
          </div>
          <Badge variant="outline">{product.stock}</Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--storefront-muted)]">
          <Truck className="size-4 text-[var(--storefront-brand)]" />
          <span>{product.delivery}</span>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-t border-[var(--storefront-line)] p-5 pt-5">
        <Button variant="outline" onClick={() => onToggleWishlist(product.id)}>
          {inWishlist ? 'Saved' : 'Save'}
        </Button>
        <Button onClick={() => onAddToCart(product)}>
          <ShoppingCart className="size-4" />
          {cartQuantity ? `Add more (${cartQuantity})` : 'Add to cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}
