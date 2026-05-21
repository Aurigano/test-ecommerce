import { useState } from 'react'
import { ProductCard } from './product-card'
import { storefrontThemes, getStorefrontThemeVars } from '../../src/theme/storefront-theme'
import { products } from '../../src/data/products'

export default {
  title: 'Storefront/Product Card',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    product: products[0],
  },
}

export const Default = {
  render: (args) => {
    const [saved, setSaved] = useState(false)
    const [quantity, setQuantity] = useState(0)

    return (
      <div
        style={getStorefrontThemeVars(storefrontThemes.atlas)}
        className="w-[320px] bg-[var(--storefront-backdrop)] p-4"
      >
        <ProductCard
          {...args}
          inWishlist={saved}
          cartQuantity={quantity}
          onToggleWishlist={() => setSaved((current) => !current)}
          onAddToCart={() => setQuantity((current) => current + 1)}
        />
      </div>
    )
  },
}
