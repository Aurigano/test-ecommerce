import { create } from 'zustand'

export const useShopStore = create((set, get) => ({
  cart: [],
  wishlist: [],
  addToCart: (product) => {
    const existingItem = get().cart.find((item) => item.id === product.id)

    if (existingItem) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }))
      return
    }

    set((state) => ({
      cart: [...state.cart, { ...product, quantity: 1 }],
    }))
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, nextQuantity) =>
    set((state) => ({
      cart:
        nextQuantity <= 0
          ? state.cart.filter((item) => item.id !== productId)
          : state.cart.map((item) =>
              item.id === productId ? { ...item, quantity: nextQuantity } : item,
            ),
    })),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
}))
