import { useMemo, useState } from 'react'
import { products } from '../../src/data/products'
import { StorybookStorefrontShell } from './storybook-shell'
import { ProductListingSection } from './product-listing-section'

export default {
  title: 'Storefront/Product Listing Section',
  component: ProductListingSection,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  render: () => {
    const [query, setQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('featured')
    const [wishlistIds, setWishlistIds] = useState([])
    const [cartById, setCartById] = useState({})

    const categories = useMemo(
      () => ['All', ...new Set(products.map((product) => product.category))],
      [],
    )

    const filteredProducts = useMemo(() => {
      const normalizedQuery = query.trim().toLowerCase()

      return products.filter((product) => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
        const searchText = [product.title, product.category, product.description, product.seller, ...product.tags]
          .join(' ')
          .toLowerCase()

        return categoryMatch && (normalizedQuery.length === 0 || searchText.includes(normalizedQuery))
      })
    }, [query, selectedCategory])

    return (
      <StorybookStorefrontShell>
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
          onToggleWishlist={(productId) =>
            setWishlistIds((current) =>
              current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
            )
          }
          onAddToCart={(product) =>
            setCartById((current) => ({
              ...current,
              [product.id]: (current[product.id] ?? 0) + 1,
            }))
          }
        />
      </StorybookStorefrontShell>
    )
  },
}
