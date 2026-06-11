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
    <Card className="group overflow-hidden rounded-lg">
      <div className="relative overflow-hidden border-b-2 border-[var(--storefront-line)] bg-[var(--storefront-panel-strong)]">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex rounded bg-[var(--storefront-danger)] px-2 py-1 text-[11px] font-bold text-white">
            SALE
          </span>
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            className="inline-flex size-9 items-center justify-center rounded-full bg-white text-slate-700 shadow hover:bg-gray-100"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`size-4 ${inWishlist ? 'fill-current text-[var(--storefront-brand)]' : ''}`} />
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full bg-white text-slate-700 shadow hover:bg-gray-100"
            aria-label="Quick add"
          >
            <ShoppingCart className="size-4" />
          </button>
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-xs font-medium text-[var(--storefront-muted)]">
            <span>{product.category}</span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-current text-[var(--storefront-brand)]" />
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold leading-tight text-gray-800">
              {product.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-6 text-[var(--storefront-muted)]">{product.description}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-end gap-2">
              <strong className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</strong>
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

      <CardFooter className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-t-2 border-[var(--storefront-line)] p-5 pt-5">
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
