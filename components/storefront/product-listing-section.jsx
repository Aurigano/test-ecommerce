'use client'

import { ProductCard } from './product-card'
import { CategoryRail } from './category-rail'
import { ProductToolbar } from './product-toolbar'

export function ProductListingSection({
  products,
  query,
  onQueryChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  wishlistIds,
  cartById,
  onToggleWishlist,
  onAddToCart,
}) {
  return (
    <section id="catalog" className="space-y-5">
      <ProductToolbar
        query={query}
        onQueryChange={onQueryChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      <CategoryRail
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            inWishlist={wishlistIds.includes(product.id)}
            cartQuantity={cartById[product.id] ?? 0}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  )
}
