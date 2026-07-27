import { create } from 'zustand'

function makeToast(message) {
  return {
    id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    message,
  }
}

export const useShopStore = create((set, get) => ({
  cart: [],
  wishlist: [],
  comparison: [],
  recentlyViewed: [],
  searchQuery: '',
  locale: 'en',
  direction: 'ltr',
  currency: 'SAR',
  overlays: {
    miniCart: false,
    search: false,
    newsletter: false,
    sizeGuide: false,
    review: false,
    liveChat: false,
  },
  toasts: [],
  setSearchQuery: (searchQuery) =>
    set((state) => (state.searchQuery === searchQuery ? state : { searchQuery })),
  setLocale: (locale) =>
    set({
      locale,
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    }),
  setCurrency: (currency) => set({ currency }),
  openOverlay: (overlayName) =>
    set((state) => ({
      overlays: { ...state.overlays, [overlayName]: true },
    })),
  closeOverlay: (overlayName) =>
    set((state) => ({
      overlays: { ...state.overlays, [overlayName]: false },
    })),
  toggleOverlay: (overlayName) =>
    set((state) => ({
      overlays: { ...state.overlays, [overlayName]: !state.overlays[overlayName] },
    })),
  pushToast: (message) =>
    set((state) => ({
      toasts: [...state.toasts, makeToast(message)],
    })),
  dismissToast: (toastId) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== toastId),
    })),
  addRecentlyViewed: (productSlug) =>
    set((state) => {
      if (state.recentlyViewed[0] === productSlug) {
        return state
      }

      return {
        recentlyViewed: [productSlug, ...state.recentlyViewed.filter((slug) => slug !== productSlug)].slice(0, 8),
      }
    }),
  toggleCompare: (productId) =>
    set((state) => ({
      comparison: state.comparison.includes(productId)
        ? state.comparison.filter((id) => id !== productId)
        : [...state.comparison, productId].slice(-4),
    })),
  addToCart: (product, quantity = 1) => {
    const existingItem = get().cart.find((item) => item.id === product.id)

    if (existingItem) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
        toasts: [...state.toasts, makeToast(`${product.title} quantity updated`)],
      }))
      return
    }

    set((state) => ({
      cart: [...state.cart, { ...product, quantity }],
      toasts: [...state.toasts, makeToast(`${product.title} added to cart`)],
    }))
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
      toasts: [...state.toasts, makeToast('Item removed from cart')],
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
    set((state) => {
      const nextWishlist = state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId]

      return {
        wishlist: nextWishlist,
        toasts: [
          ...state.toasts,
          makeToast(
            nextWishlist.includes(productId) ? 'Saved to wishlist' : 'Removed from wishlist',
          ),
        ],
      }
    }),
}))
