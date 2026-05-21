'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { products } from '../src/data/products'
import { useShopStore } from '../src/store/useShopStore'

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

const paymentMethods = [
  { name: 'Apple Pay', note: 'Express checkout first', detail: '36% preference in KSA' },
  { name: 'mada', note: 'National card scheme', detail: 'Preferred local card flow' },
  { name: 'Tabby', note: 'Pay in 4', detail: 'Sharia-compliant BNPL' },
  { name: 'Tamara', note: 'Split payments', detail: 'Best for higher baskets' },
  { name: 'STC Pay', note: 'Wallet checkout', detail: 'Fast repeat payment path' },
  { name: 'Visa / Mastercard', note: 'Credit and debit', detail: 'Tokenized secure entry' },
  { name: 'Cash on Delivery', note: 'With transparent fee', detail: 'Trust-driven fallback option' },
]

const journeyHighlights = [
  'Arabic-ready browsing and RTL-safe layouts',
  'CR, VAT, Maroof, and returns trust cues above the fold',
  'Checkout totals stay clear from bag to payment',
]

const formatPrice = (value) => currency.format(value * INR_RATE)

export default function CommerceShell({ page }) {
  const isCheckoutPage = page === 'checkout'

  return isCheckoutPage ? <CheckoutPage /> : <CatalogPage />
}

function CatalogPage() {
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

  return (
    <div className="site-shell">
      <CommerceHeader
        cartCount={cartCount}
        query={query}
        setQuery={setQuery}
        showWishlistOnly={showWishlistOnly}
        setShowWishlistOnly={setShowWishlistOnly}
        wishlistCount={wishlist.length}
        isCheckoutPage={false}
      />

      <main className="page-shell catalog-shell">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">KSA commerce</p>
            <h1>Atlas Commerce brings trusted shopping, local payments, and cleaner checkout into one storefront.</h1>
            <p className="hero-body">
              Built for Saudi shoppers with Apple Pay, mada, BNPL visibility, VAT-inclusive totals, and clear support
              cues across discovery, bag, and payment.
            </p>

            <div className="hero-actions">
              <a href="#catalog" className="primary-btn">
                Start browsing
              </a>
              <Link href="/checkout" className="secondary-link hero-secondary">
                Review checkout
              </Link>
            </div>

            <div className="journey-points">
              {journeyHighlights.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </div>

          <div className="hero-preview">
            <div className="phone-preview">
              <div className="phone-topbar">
                <span>Desktop storefront</span>
                <strong>Atlas Commerce</strong>
                <span>AR / EN</span>
              </div>
              <div className="phone-card">
                <p className="eyebrow">Trust-led checkout</p>
                <h2>Apple Pay first, mada next, with BNPL placed where shoppers expect it.</h2>
                <div className="payment-chip-row">
                  <span>Apple Pay</span>
                  <span>mada</span>
                  <span>Tabby</span>
                </div>
              </div>
              <div className="phone-list">
                <article>
                  <strong>CR 1010892214</strong>
                  <span>VAT-inclusive pricing stays visible from listing to payment.</span>
                </article>
                <article>
                  <strong>Maroof verified</strong>
                  <span>WhatsApp support, 7-day returns, and delivery clarity in every step.</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <article>
            <span>CR</span>
            <strong>1010892214</strong>
          </article>
          <article>
            <span>VAT</span>
            <strong>310245678900003</strong>
          </article>
          <article>
            <span>Maroof</span>
            <strong>Verified merchant</strong>
          </article>
          <article>
            <span>Returns</span>
            <strong>7-day easy returns</strong>
          </article>
          <article>
            <span>Support</span>
            <strong>WhatsApp first</strong>
          </article>
        </section>

        <section className="commerce-intro">
          <div>
            <p className="eyebrow">Discovery flow</p>
            <h2>One storefront system for fashion, electronics, and general retail.</h2>
          </div>
          <div className="intro-grid">
            <article>
              <strong>Storefront structure</strong>
              <span>Clear navigation, anchored search, and category browsing that stay calm on larger screens.</span>
            </article>
            <article>
              <strong>Arabic-aware trust</strong>
              <span>RTL-safe layouts, local payment ordering, and compliance copy in the right places.</span>
            </article>
            <article>
              <strong>Themeable retail system</strong>
              <span>Shared components with category-specific moments like richer specs or editorial imagery.</span>
            </article>
          </div>
        </section>

        <section className="category-rail-section">
          <div className="section-headline">
            <div>
              <p className="eyebrow">Category rail</p>
              <h2>Browse popular categories without losing scroll speed.</h2>
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

          <div className="category-rail">
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

        <section className="catalog-area" id="catalog">
          <div className="catalog-toolbar">
            <div>
              <p className="eyebrow">Product listing</p>
              <h2>{filteredProducts.length} items ready for faster discovery</h2>
            </div>

            <div className="toolbar-actions">
              <button
                type="button"
                className={showWishlistOnly ? 'toolbar-toggle active' : 'toolbar-toggle'}
                onClick={() => setShowWishlistOnly((current) => !current)}
              >
                {showWishlistOnly ? 'Showing saved' : `Wishlist ${wishlist.length}`}
              </button>
              <button type="button" className="toolbar-toggle">
                Filters
              </button>
            </div>
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
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>

                    <div className="price-row">
                      <strong>{formatPrice(product.price)}</strong>
                      <span>{formatPrice(product.mrp)}</span>
                    </div>

                    <div className="promo-row">
                      <span>Tabby from {formatPrice(product.price / 4)}</span>
                      <span>Tamara split payment ready</span>
                    </div>

                    <div className="delivery-row">
                      <span>{product.delivery}</span>
                      <strong>{product.stock}</strong>
                    </div>

                    <div className="trust-chip-row">
                      <span>VAT included</span>
                      <span>7-day returns</span>
                      <span>Maroof verified</span>
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

        <section className="payment-priority">
          <div className="section-headline">
            <div>
              <p className="eyebrow">Conversion guidance</p>
              <h2>Payment ordering follows KSA shopper preference, not generic checkout defaults.</h2>
            </div>
          </div>

          <div className="payment-method-grid">
            {paymentMethods.map((method, index) => (
              <article key={method.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{method.name}</strong>
                <p>{method.note}</p>
                <em>{method.detail}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="footer-trust-panel">
          <div>
            <p className="eyebrow">Support and compliance</p>
            <h2>Built for the trust signals KSA shoppers and operators expect before they place an order.</h2>
          </div>
          <div className="footer-trust-grid">
            <article>
              <strong>ZATCA-ready invoice</strong>
              <span>Order confirmation includes QR-enabled invoice support and VAT clarity.</span>
            </article>
            <article>
              <strong>National Address aware</strong>
              <span>Checkout is prepared for the 8-character address code validation flow.</span>
            </article>
            <article>
              <strong>WhatsApp support path</strong>
              <span>Returns and order help feel immediate, local, and direct.</span>
            </article>
          </div>
        </section>
      </main>

      <MobileNav
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        showWishlistOnly={showWishlistOnly}
        onToggleWishlist={() => setShowWishlistOnly((current) => !current)}
      />

      {cartCount > 0 ? (
        <Link href="/checkout" className="floating-checkout-btn">
          <span>Proceed to checkout</span>
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
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].name)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.quantity * item.price, 0)
  const shipping = subtotal > 0 ? 14 : 0
  const codFee = subtotal > 0 ? 9 : 0
  const tax = subtotal * 0.15
  const appliedCodFee = selectedPayment === 'Cash on Delivery' ? codFee : 0
  const total = subtotal + shipping + tax + appliedCodFee

  return (
    <div className="site-shell">
      <CommerceHeader
        cartCount={cartCount}
        query=""
        setQuery={() => {}}
        showWishlistOnly={false}
        setShowWishlistOnly={() => {}}
        wishlistCount={wishlist.length}
        isCheckoutPage
      />

      <main className="page-shell checkout-shell">
        <section className="checkout-hero">
          <div>
            <p className="eyebrow">Guest checkout supported</p>
            <h1>Checkout keeps totals, delivery details, and payment choices clear from the first step.</h1>
            <p className="hero-body">
              Apple Pay stays first, National Address is explicit, and VAT, delivery, and COD fees are visible before
              the final action.
            </p>
          </div>
          <Link href="/" className="secondary-link hero-secondary">
            Continue shopping
          </Link>
        </section>

        <section className="checkout-progress">
          <span className="active">Bag</span>
          <span className="active">Address</span>
          <span>Payment</span>
          <span>Review</span>
        </section>

        <section className="trust-strip checkout-trust-strip">
          <article>
            <span>CR</span>
            <strong>1010892214</strong>
          </article>
          <article>
            <span>VAT</span>
            <strong>15% included</strong>
          </article>
          <article>
            <span>Maroof</span>
            <strong>Verified</strong>
          </article>
          <article>
            <span>Support</span>
            <strong>WhatsApp available</strong>
          </article>
        </section>

        <div className="checkout-layout">
          <section className="checkout-main">
            <div className="checkout-panel-block">
              <div className="checkout-section-head">
                <div>
                  <p className="eyebrow">Contact and delivery</p>
                  <h2>Address first, with the KSA-specific fields visible immediately.</h2>
                </div>
              </div>

              <form className="checkout-form-grid">
                <label className="checkout-field">
                  <span>Full name</span>
                  <input type="text" placeholder="Enter customer name" />
                </label>
                <label className="checkout-field">
                  <span>Phone number</span>
                  <input type="tel" placeholder="+966 5X XXX XXXX" />
                </label>
                <label className="checkout-field full">
                  <span>Email address</span>
                  <input type="email" placeholder="name@example.com" />
                </label>
                <label className="checkout-field full">
                  <span>National Address code</span>
                  <input type="text" placeholder="RNMA7272" maxLength={8} />
                  <small>8-character code required for courier validation from January 1, 2026.</small>
                </label>
                <label className="checkout-field full">
                  <span>Street address</span>
                  <input type="text" placeholder="Building, street, district" />
                </label>
                <label className="checkout-field">
                  <span>City</span>
                  <input type="text" placeholder="Riyadh" />
                </label>
                <label className="checkout-field">
                  <span>Postal code</span>
                  <input type="text" placeholder="12345" />
                </label>
              </form>
            </div>

            <div className="checkout-panel-block">
              <div className="checkout-section-head">
                <div>
                  <p className="eyebrow">Payment methods</p>
                  <h2>Order payment options in the sequence KSA shoppers expect.</h2>
                </div>
              </div>

              <div className="payment-option-list">
                {paymentMethods.map((method) => (
                  <label key={method.name} className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === method.name}
                      onChange={() => setSelectedPayment(method.name)}
                    />
                    <div>
                      <strong>{method.name}</strong>
                      <span>{method.note}</span>
                    </div>
                    <em>{method.detail}</em>
                  </label>
                ))}
              </div>
            </div>

            <div className="checkout-panel-block">
              <div className="checkout-section-head">
                <div>
                  <p className="eyebrow">Order items</p>
                  <h2>{cartCount} items in your bag</h2>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="empty-state">
                  <h3>Your cart is empty</h3>
                  <p>Add products from the home page to see the full checkout experience here.</p>
                  <Link href="/" className="secondary-link">
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
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="seller-row">
                          <span>{item.delivery}</span>
                          <em>VAT included</em>
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
            </div>
          </section>

          <aside className="payment-panel">
            <div className="payment-card">
              <p className="eyebrow">Transparent total</p>
              <h2>Review before placing the order</h2>

              <div className="checkout-line">
                <span>Items subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="checkout-line">
                <span>Delivery</span>
                <strong>{formatPrice(shipping)}</strong>
              </div>
              <div className="checkout-line">
                <span>COD fee</span>
                <strong>{appliedCodFee > 0 ? formatPrice(appliedCodFee) : 'Only if selected'}</strong>
              </div>
              <div className="checkout-line">
                <span>VAT</span>
                <strong>{formatPrice(tax)}</strong>
              </div>
              <div className="checkout-line total-line">
                <span>Total payable</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <div className="payment-note">
                <span>ZATCA invoice</span>
                <strong>QR-ready after confirmation</strong>
              </div>
              <div className="payment-note">
                <span>Trust</span>
                <strong>Maroof, CR, VAT, 7-day returns</strong>
              </div>
              <div className="payment-note">
                <span>Support</span>
                <strong>WhatsApp and email follow-up</strong>
              </div>

              <button type="button" className="checkout-btn" disabled={cart.length === 0}>
                Proceed to Payment
              </button>
            </div>
          </aside>
        </div>
      </main>

      <MobileNav cartCount={cartCount} wishlistCount={wishlist.length} isCheckoutPage />
    </div>
  )
}

function CommerceHeader({
  cartCount,
  query,
  setQuery,
  showWishlistOnly,
  setShowWishlistOnly,
  wishlistCount,
  isCheckoutPage,
}) {
  return (
    <header className="topbar">
      <Link href="/" className="brand-block brand-link">
        <span className="brand-mark">AC</span>
        <div>
          <p className="eyebrow">KSA commerce</p>
          <h2>Atlas Commerce</h2>
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
              ? 'Search stays on the home catalog flow'
              : 'Search products, categories, or trusted brands'
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={isCheckoutPage}
        />
        {isCheckoutPage ? (
          <Link href="/" className="nav-search-link">
            Browse
          </Link>
        ) : (
          <button type="submit">Search</button>
        )}
      </form>

      <nav className="nav-actions" aria-label="Primary">
        <button type="button" className="nav-chip">
          <span className="nav-kicker">Language</span>
          <strong>AR / EN</strong>
        </button>
        <Link href="/login" className="nav-chip nav-link-chip">
          <span className="nav-kicker">Account</span>
          <strong>Orders & Access</strong>
        </Link>
        {isCheckoutPage ? (
          <Link href="/" className="nav-chip nav-link-chip">
            <span className="nav-kicker">Saved</span>
            <strong>{wishlistCount} items</strong>
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
        <Link href="/checkout" className="nav-chip nav-cart nav-link-chip">
          <span className="nav-kicker">Cart</span>
          <strong>{cartCount} items</strong>
        </Link>
      </nav>
    </header>
  )
}

function MobileNav({ cartCount, wishlistCount, showWishlistOnly = false, onToggleWishlist, isCheckoutPage = false }) {
  const catalogHref = isCheckoutPage ? '/#catalog' : '#catalog'

  return (
    <nav className="mobile-nav" aria-label="Mobile">
      <Link href="/">Home</Link>
      <a href={catalogHref}>Categories</a>
      <a href={catalogHref}>Search</a>
      {isCheckoutPage ? (
        <Link href="/">Saved {wishlistCount}</Link>
      ) : (
        <button type="button" onClick={onToggleWishlist}>
          {showWishlistOnly ? 'Viewing saved' : `Saved ${wishlistCount}`}
        </button>
      )}
      <Link href="/login">Account</Link>
      <Link href="/checkout">Cart {cartCount}</Link>
    </nav>
  )
}
