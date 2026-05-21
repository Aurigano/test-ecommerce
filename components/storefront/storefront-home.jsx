'use client'

import { useMemo } from 'react'
import { products } from '../../src/data/products'
import { useShopStore } from '../../src/store/useShopStore'
import { StorefrontExperience } from './storefront-experience'

export default function StorefrontHome() {
  const cart = useShopStore((state) => state.cart)
  const wishlist = useShopStore((state) => state.wishlist)
  const addToCart = useShopStore((state) => state.addToCart)
  const toggleWishlist = useShopStore((state) => state.toggleWishlist)

  const cartById = useMemo(
    () =>
      cart.reduce((accumulator, item) => {
        accumulator[item.id] = item.quantity
        return accumulator
      }, {}),
    [cart],
  )

  return (
    <StorefrontExperience
      products={products}
      cartById={cartById}
      wishlistIds={wishlist}
      onAddToCart={addToCart}
      onToggleWishlist={toggleWishlist}
    />
  )
}
