'use client'

import { useMemo, useState } from 'react'
import { ProductListingSection } from './product-listing-section'
import { StorefrontNavbar } from './storefront-navbar'
import { StorefrontHero } from './storefront-hero'
import { StorefrontInsightGrid } from './storefront-insight-grid'
import {
  defaultStorefrontTheme,
  getStorefrontThemeVars,
  storefrontThemes,
} from '../../src/theme/storefront-theme'

const sorts = {
  'price-low': (left, right) => left.price - right.price,
  'price-high': (left, right) => right.price - left.price,
  rating: (left, right) => right.rating - left.rating,
  featured: () => 0,
}

const defaultContent = {
  brandName: 'Atlas Commerce',
  eyebrow: 'Storefront shell',
  heroTitle: 'One configurable storefront surface for trust, product discovery, and stronger conversion.',
  heroBody:
    'Designed for KSA commerce teams with branded theming, compliant trust cues, and product presentation that can scale across client storefronts.',
  heroCta: 'Explore the catalog',
  secondaryCta: 'Review checkout',
  themeLabel: 'Theme preset',
  trustBadges: ['CR visible', 'VAT clarity', 'Maroof ready', 'WhatsApp support'],
}

export function StorefrontExperience({
  products,
  cartById,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
  initialThemeId = defaultStorefrontTheme.id,
  content = defaultContent,
  showThemeSwitcher = true,
}) {
  const [themeId, setThemeId] = useState(initialThemeId)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const theme = storefrontThemes[themeId] ?? defaultStorefrontTheme
  const themeVars = getStorefrontThemeVars(theme)

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products],
  )

  const featuredProducts = useMemo(() => products.slice(0, 3), [products])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products
      .filter((product) => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
        const searchText = [product.title, product.category, product.description, product.seller, ...product.tags]
          .join(' ')
          .toLowerCase()
        const queryMatch = normalizedQuery.length === 0 || searchText.includes(normalizedQuery)

        return categoryMatch && queryMatch
      })
      .sort(sorts[sortBy])
  }, [products, query, selectedCategory, sortBy])

  return (
    <div style={themeVars} className="min-h-screen bg-[var(--storefront-backdrop)] text-[var(--storefront-ink)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 pb-16 pt-5 sm:px-6 lg:px-8">
        <StorefrontNavbar
          brandName={content.brandName}
          eyebrow={content.eyebrow}
          currentThemeLabel={theme.label}
          showThemeSwitcher={showThemeSwitcher}
          themeLabel={content.themeLabel}
          themeId={themeId}
          themeOptions={Object.values(storefrontThemes)}
          onThemeChange={setThemeId}
        />

        <StorefrontHero
          heroTitle={content.heroTitle}
          heroBody={content.heroBody}
          heroCta={content.heroCta}
          secondaryCta={content.secondaryCta}
          trustBadges={content.trustBadges}
          featuredProducts={featuredProducts}
        />

        <StorefrontInsightGrid
          items={[
            ['Compliance visibility', 'CR, VAT, and returns cues stay above the fold and inside the product journey.'],
            ['Localized payments', 'Apple Pay, mada, and BNPL placement can be tuned per storefront or campaign.'],
            ['Merchandising rhythm', 'Editorial hero composition pairs with dense, searchable product discovery below.'],
            ['SaaS configurability', 'Theme tokens are ready for backend-driven logo, color, and content controls.'],
          ]}
        />

        <ProductListingSection
          products={filteredProducts}
          query={query}
          onQueryChange={setQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          wishlistIds={wishlistIds}
          cartById={cartById}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  )
}
