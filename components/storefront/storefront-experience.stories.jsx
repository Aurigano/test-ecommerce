import { useMemo, useState } from 'react'
import { StorefrontExperience } from './storefront-experience'
import { products } from '../../src/data/products'

export default {
  title: 'Storefront/Experience',
  component: StorefrontExperience,
  args: {
    initialThemeId: 'atlas',
  },
}

export const Interactive = {
  render: (args) => {
    const [wishlistIds, setWishlistIds] = useState([])
    const [cartById, setCartById] = useState({})

    const content = useMemo(
      () => ({
        brandName: 'Atlas Commerce',
        eyebrow: 'Client storefront',
        heroTitle: 'A fixed-theme storefront foundation with backend-ready branding controls.',
        heroBody:
          'This Storybook view isolates the storefront shell and product listing system so theme changes and client-specific merchandising can be reviewed without the rest of the app.',
        heroCta: 'Browse products',
        secondaryCta: 'Review checkout',
        themeLabel: 'Preset',
        trustBadges: ['Logo-ready', 'Color-ready', 'Compliance-ready', 'Listing-ready'],
      }),
      [],
    )

    return (
      <StorefrontExperience
        {...args}
        products={products}
        content={content}
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
    )
  },
}
