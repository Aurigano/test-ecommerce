import { useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { products } from './data/products'
import { useShopStore } from './store/useShopStore'

const INR_RATE = 84

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const sorts = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const formatPrice = (value) => currency.format(value * INR_RATE)

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

function ProductListingPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showWishlistOnly, setShowWishlistOnly] = useState(false)

  const cart = useShopStore((state) => state.cart)
  const wishlist = useShopStore((state) => state.wishlist)
  const addToCart = useShopStore((state) => state.addToCart)
  const toggleWishlist = useShopStore((state) => state.toggleWishlist)

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [],
  )

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const matches = products.filter((product) => {
      const searchableText = [
        product.title,
        product.category,
        product.description,
        product.seller,
        ...product.tags,
      ]
        .join(' ')
        .toLowerCase()

      const categoryMatch =
        selectedCategory === 'All' || product.category === selectedCategory
      const queryMatch =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery)
      const wishlistMatch = !showWishlistOnly || wishlist.includes(product.id)

      return categoryMatch && queryMatch && wishlistMatch
    })

    return [...matches].sort((left, right) => {
      if (sortBy === 'price-low') return left.price - right.price
      if (sortBy === 'price-high') return right.price - left.price
      if (sortBy === 'rating') return right.rating - left.rating
      return 0
    })
  }, [query, selectedCategory, sortBy, showWishlistOnly, wishlist])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cart.reduce((total, item) => total + item.quantity * item.price, 0)
  const featuredDeals = filteredProducts.filter((product) => product.prime).length

  return (
    <div className="page-shell">
      <MarketplaceHeader
        cartCount={cartCount}
        query={query}
        setQuery={setQuery}
        showWishlistOnly={showWishlistOnly}
        setShowWishlistOnly={setShowWishlistOnly}
        wishlistCount={wishlist.length}
      />

      <section className="market-strip">
        <div>
          <p className="eyebrow">Today&apos;s shopping view</p>
          <h2>Scan fast, compare details, and add items to checkout in one place.</h2>
        </div>
        <div className="market-metrics">
          <article>
            <strong>{products.length}</strong>
            <span>dummy listings</span>
          </article>
          <article>
            <strong>{featuredDeals}</strong>
            <span>prime-ready offers</span>
          </article>
          <article>
            <strong>{wishlist.length}</strong>
            <span>wishlist picks</span>
          </article>
        </div>
      </section>

      <main className="catalog-layout">
        <aside className="sidebar">
          <section>
            <p className="eyebrow">Browse by</p>
            <h3>Categories</h3>
            <div className="filter-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === selectedCategory ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="sidebar-note">
            <p className="eyebrow">Quick filters</p>
            <ul>
              <li>Free delivery options highlighted</li>
              <li>Best seller and deal badges included</li>
              <li>Wishlist and cart state stored with Zustand</li>
            </ul>
          </section>
        </aside>

        <section className="catalog-panel">
          <div className="catalog-header">
            <div>
              <p className="eyebrow">Product listing</p>
              <h3>
                {filteredProducts.length} {showWishlistOnly ? 'wishlist picks' : 'items ready to browse'}
              </h3>
            </div>

            <label className="sort-control">
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {sorts.map((sort) => (
                  <option key={sort.value} value={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => {
              const isSaved = wishlist.includes(product.id)
              const cartItem = cart.find((item) => item.id === product.id)

              return (
                <article key={product.id} className="product-card">
                  <div className="product-visual">
                    <img src={product.image} alt={product.title} />
                    <button
                      type="button"
                      className={isSaved ? 'wishlist-toggle active' : 'wishlist-toggle'}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      {isSaved ? 'Saved' : 'Wishlist'}
                    </button>
                  </div>

                  <div className="product-copy">
                    <div className="product-meta-row">
                      <span>{product.category}</span>
                      <span>{product.badge}</span>
                    </div>
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>

                    <div className="rating-row">
                      <strong>{product.rating}</strong>
                      <span>{product.reviews.toLocaleString()} ratings</span>
                    </div>

                    <div className="price-row">
                      <strong>{formatPrice(product.price)}</strong>
                      <span>{formatPrice(product.mrp)}</span>
                    </div>

                    <div className="delivery-row">
                      <span>{product.delivery}</span>
                      <strong>{product.stock}</strong>
                    </div>

                    <div className="seller-row">
                      <span>Sold by {product.seller}</span>
                      {product.prime ? <em>Prime eligible</em> : <em>Standard shipping</em>}
                    </div>
                  </div>

                  <div className="card-actions">
                    <button type="button" className="secondary-btn" onClick={() => toggleWishlist(product.id)}>
                      {isSaved ? 'Remove' : 'Save'}
                    </button>
                    <button type="button" className="primary-btn" onClick={() => addToCart(product)}>
                      {cartItem ? `Add more (${cartItem.quantity})` : 'Add to cart'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      {cartCount > 0 ? (
        <Link to="/checkout" className="floating-checkout-btn">
          <span>Proceed to Checkout</span>
          <strong>
            {cartCount} items • {formatPrice(cartSubtotal)}
          </strong>
        </Link>
      ) : null}
    </div>
  )
}

function CheckoutPage() {
  const cart = useShopStore((state) => state.cart)
  const wishlist = useShopStore((state) => state.wishlist)
  const updateQuantity = useShopStore((state) => state.updateQuantity)
  const removeFromCart = useShopStore((state) => state.removeFromCart)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.quantity * item.price, 0)
  const shipping = subtotal > 0 ? 0 : 0
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  return (
    <div className="page-shell">
      <MarketplaceHeader
        cartCount={cartCount}
        query=""
        setQuery={() => {}}
        showWishlistOnly={false}
        setShowWishlistOnly={() => {}}
        wishlistCount={wishlist.length}
      />

      <section className="checkout-hero">
        <div>
          <p className="eyebrow">Checkout</p>
          <h2>Review your cart, confirm totals, and continue to payment.</h2>
        </div>
        <Link to="/" className="back-link">
          Continue shopping
        </Link>
      </section>

      <main className="checkout-layout">
        <section className="checkout-list">
          <div className="checkout-section-head">
            <div>
              <p className="eyebrow">Order items</p>
              <h3>{cartCount} items ready for checkout</h3>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-state">
              <h4>Your cart is empty</h4>
              <p>Add products from the listing page to see your payment summary here.</p>
              <Link to="/" className="secondary-link">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="checkout-items">
              {cart.map((item) => (
                <article key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.title} />
                  <div className="checkout-item-copy">
                    <div className="product-meta-row">
                      <span>{item.category}</span>
                      <span>{item.badge}</span>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="seller-row">
                      <span>Sold by {item.seller}</span>
                      <em>{item.delivery}</em>
                    </div>
                  </div>

                  <div className="checkout-item-controls">
                    <strong>{formatPrice(item.price)}</strong>
                    <div className="quantity-stepper">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button type="button" className="text-button" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="payment-panel">
          <div className="payment-card">
            <p className="eyebrow">Payment summary</p>
            <h3>Order total</h3>

            <div className="checkout-line">
              <span>Items subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="checkout-line">
              <span>Shipping</span>
              <strong>{shipping === 0 ? 'Free' : formatPrice(shipping)}</strong>
            </div>
            <div className="checkout-line">
              <span>Estimated tax</span>
              <strong>{formatPrice(tax)}</strong>
            </div>
            <div className="checkout-line total-line">
              <span>Amount payable</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="payment-note">
              <span>Payment method</span>
              <strong>Card, UPI, NetBanking</strong>
            </div>
            <div className="payment-note">
              <span>Delivery</span>
              <strong>{cart.length > 0 ? 'Free standard delivery' : 'Add items to continue'}</strong>
            </div>

            <button type="button" className="checkout-btn" disabled={cart.length === 0}>
              Proceed to Payment
            </button>
          </div>
        </aside>
      </main>
    </div>
  )
}

function MarketplaceHeader({
  cartCount,
  query,
  setQuery,
  showWishlistOnly,
  setShowWishlistOnly,
  wishlistCount,
}) {
  const location = useLocation()
  const isCheckoutPage = location.pathname === '/checkout'

  return (
    <header className="topbar">
      <Link to="/" className="brand-block brand-link">
        <span className="brand-mark">MA</span>
        <div>
          <p className="eyebrow">Marketplace</p>
          <h1>Market Atlas</h1>
        </div>
      </Link>

      <form className="search-shell" onSubmit={(event) => event.preventDefault()}>
        <label className="search-label" htmlFor="product-search">
          Search catalog
        </label>
        <input
          id="product-search"
          type="search"
          placeholder={
            isCheckoutPage
              ? 'Search is available on the product listing page'
              : 'Search for headphones, kitchen tools, travel gear...'
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={isCheckoutPage}
        />
        {isCheckoutPage ? (
          <Link to="/" className="nav-search-link">
            Browse
          </Link>
        ) : (
          <button type="submit">Search</button>
        )}
      </form>

      <nav className="nav-actions" aria-label="Primary">
        <button type="button" className="nav-chip">
          <span className="nav-kicker">Settings</span>
          <strong>Preferences</strong>
        </button>
        <button type="button" className="nav-chip">
          <span className="nav-kicker">Account</span>
          <strong>Orders & Login</strong>
        </button>
        {isCheckoutPage ? (
          <Link to="/" className="nav-chip nav-link-chip">
            <span className="nav-kicker">Wishlist</span>
            <strong>{wishlistCount} saved</strong>
          </Link>
        ) : (
          <button
            type="button"
            className={showWishlistOnly ? 'nav-chip active' : 'nav-chip'}
            onClick={() => setShowWishlistOnly((current) => !current)}
          >
            <span className="nav-kicker">Wishlist</span>
            <strong>{showWishlistOnly ? 'Showing saved' : `${wishlistCount} saved`}</strong>
          </button>
        )}
        <Link to="/checkout" className="nav-chip nav-cart nav-link-chip">
          <span className="nav-kicker">Cart</span>
          <strong>{cartCount} items</strong>
        </Link>
      </nav>
    </header>
  )
}

export default App
