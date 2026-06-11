'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export function ProductToolbar({ query, onQueryChange, sortBy, onSortChange }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-2">
        <Badge variant="outline">Product listing</Badge>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            Browse a conversion-focused catalog with local trust cues built in.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--storefront-muted)] md:text-base">
            Search, sort, and filter the storefront without losing clarity on price, delivery, returns, or payment
            flexibility.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto] lg:w-[560px]">
        <label className="relative block sm:col-span-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--storefront-muted)]" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search products, brands, or categories"
            className="pl-10"
          />
        </label>
        <Select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </Select>
        <Button variant="ghost" size="sm" className="h-11 rounded-lg px-4">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>
    </div>
  )
}
