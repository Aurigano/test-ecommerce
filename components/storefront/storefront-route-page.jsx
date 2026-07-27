'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  BookOpen,
  ChevronRight,
  Clock3,
  CreditCard,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react'
import { ProductCard } from './product-card'
import { StorefrontLayoutManager } from './layout-manager'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { pageTemplates } from '../../src/site/templates'
import {
  addresses,
  campaigns,
  categoryTree,
  faqs,
  formatDateLabel,
  getCampaignBySlug,
  getCategoryBySlug,
  getFeaturedProducts,
  getLegalDocumentBySlug,
  getOrderById,
  getProductBySlug,
  getProductsForCategory,
  getRecommendedProducts,
  getRecentlyViewedFallback,
  legalDocuments,
  merchantConfig,
  orderHistory,
  paymentMethods,
  products,
  searchProducts,
  supportLocations,
} from '../../src/site/demo-data'
import { storefrontRoutesByGroup } from '../../src/site/routes'
import { defaultStorefrontTheme, getStorefrontThemeVars } from '../../src/theme/storefront-theme'
import { useShopStore } from '../../src/store/useShopStore'

const currencyFormatters = {
  SAR: new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 2 }),
  USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }),
}

const overlayPurchaseFeed = [
  'Riyadh shopper picked up Auraloop Wireless Headphones',
  'Jeddah customer completed checkout with Apple Pay',
  'Dammam order placed for Orbit Portable Projector',
]

function formatMoney(value, currency = 'SAR') {
  return (currencyFormatters[currency] ?? currencyFormatters.SAR).format(value)
}

function SectionCard({ kicker, title, body, children, className = '' }) {
  return (
    <Card className={`store-card ${className}`}>
      <CardHeader className="store-card-head">
        {kicker ? <p className="store-section-kicker">{kicker}</p> : null}
        {title ? <CardTitle className="store-section-title">{title}</CardTitle> : null}
        {body ? <p className="store-copy">{body}</p> : null}
      </CardHeader>
      {children ? <CardContent className="store-card-body">{children}</CardContent> : null}
    </Card>
  )
}

function MerchantLink({ href, children, className = '', ...props }) {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}

function computeBreadcrumbs(pageContext) {
  const items = [{ label: 'Home', href: '/' }]

  if (pageContext.category) {
    items.push({ label: pageContext.category.name, href: `/c/${pageContext.category.slug}` })
  }

  if (pageContext.product) {
    items.push({
      label: pageContext.product.category,
      href: `/c/${pageContext.product.categorySlug}`,
    })
    items.push({ label: pageContext.product.title, href: `/product/${pageContext.product.slug}` })
  }

  if (pageContext.campaign) {
    items.push({ label: 'Campaigns', href: '/deals' })
    items.push({ label: pageContext.campaign.title, href: `/campaign/${pageContext.campaign.slug}` })
  }

  if (pageContext.legalDocument) {
    items.push({ label: 'Legal', href: '/legal/privacy-policy' })
    items.push({ label: pageContext.legalDocument.title, href: `/legal/${pageContext.legalDocument.slug}` })
  }

  if (pageContext.routeLabel) {
    items.push({ label: pageContext.routeLabel, href: '#' })
  }

  return items
}

function buildPageContext(templateId, routeParams, routeSearchParams, storeState) {
  const searchQuery = routeSearchParams?.q ?? storeState.searchQuery ?? ''
  const categorySlug = routeParams?.categorySlug
  const productSlug = routeParams?.productSlug
  const campaignSlug = routeParams?.campaignSlug
  const documentSlug = routeParams?.documentSlug
  const orderId = routeParams?.orderId

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null
  const product = productSlug ? getProductBySlug(productSlug) : null
  const campaign = campaignSlug ? getCampaignBySlug(campaignSlug) : null
  const legalDocument = documentSlug ? getLegalDocumentBySlug(documentSlug) : null
  const order = orderId ? getOrderById(orderId) : null

  const recentlyViewedProducts = storeState.recentlyViewed
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean)

  const effectiveRecentlyViewed =
    recentlyViewedProducts.length > 0 ? recentlyViewedProducts : getRecentlyViewedFallback()

  const wishlistProducts = products.filter((item) => storeState.wishlist.includes(item.id))
  const comparisonProducts = products.filter((item) => storeState.comparison.includes(item.id))

  if (categorySlug && !category) {
    return { notFound: true, title: 'Category not found', body: 'We could not find that category page.' }
  }

  if (productSlug && !product) {
    return { notFound: true, title: 'Product not found', body: 'This product slug is not available in the demo catalog.' }
  }

  if (campaignSlug && !campaign) {
    return { notFound: true, title: 'Campaign not found', body: 'That campaign page is not available in this demo shell.' }
  }

  if (documentSlug && !legalDocument) {
    return { notFound: true, title: 'Document not found', body: 'The requested legal document does not exist.' }
  }

  if (orderId && !order) {
    return { notFound: true, title: 'Order not found', body: 'The requested order was not found in the demo account data.' }
  }

  const routeLabels = {
    homepage_default: 'Storefront',
    category_tree: 'Category',
    plp_search: searchQuery ? 'Search results' : 'Shop',
    offers_hub: 'Deals',
    cart_full: 'Cart',
    checkout_gateway: 'Checkout',
    order_confirmation: 'Confirmation',
    account_dashboard: 'Account',
    order_history: 'Orders',
    order_tracking_detail: 'Order details',
    address_book: 'Addresses',
    payment_methods: 'Payments',
    wishlist_hub: 'Wishlist',
    profile_settings: 'Profile settings',
    about_editorial: 'About',
    contact_support: 'Contact',
    faq_help_center: 'Help center',
    legal_document: 'Legal',
    sitemap_index: 'Sitemap',
  }

  const routeLabel = routeLabels[templateId] ?? ''
  const selectedProducts =
    templateId === 'homepage_default'
      ? getFeaturedProducts(8)
      : templateId === 'category_tree'
        ? getProductsForCategory(category.slug)
        : templateId === 'plp_search'
          ? searchProducts(searchQuery)
          : templateId === 'offers_hub'
            ? products.filter((item) => item.badge.toLowerCase().includes('deal') || item.badges?.join(' ').toLowerCase().includes('deal')).slice(0, 8)
            : templateId === 'wishlist_hub'
              ? wishlistProducts
              : templateId === 'campaign_landing'
                ? getFeaturedProducts(6)
                : products.slice(0, 6)

  return {
    routeLabel,
    category,
    product,
    campaign,
    legalDocument,
    order,
    searchQuery,
    breadcrumbs: computeBreadcrumbs({ category, product, campaign, legalDocument, routeLabel }),
    selectedProducts,
    featuredProducts: getFeaturedProducts(4),
    recommendations: getRecommendedProducts(product?.slug, 4),
    recentlyViewedProducts: effectiveRecentlyViewed,
    comparisonProducts,
    wishlistProducts,
    faqGroups: faqs,
    legalDocuments,
    orderHistory,
    addresses,
    paymentMethods,
    supportLocations,
    trustBadges: merchantConfig.trustBadges,
  }
}

export function StorefrontRoutePage({ templateId, routeParams = {}, routeSearchParams = {} }) {
  const template = pageTemplates[templateId]
  const store = useShopStore()
  const searchQuery = useShopStore((state) => state.searchQuery)
  const setSearchQuery = useShopStore((state) => state.setSearchQuery)
  const addRecentlyViewed = useShopStore((state) => state.addRecentlyViewed)
  const dismissToast = useShopStore((state) => state.dismissToast)
  const toastQueue = useShopStore((state) => state.toasts)
  const [selectedColor, setSelectedColor] = useState('Sand')
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [purchaseFeedIndex, setPurchaseFeedIndex] = useState(0)

  const pageContext = useMemo(
    () => buildPageContext(templateId, routeParams, routeSearchParams, store),
    [templateId, routeParams, routeSearchParams, store],
  )

  useEffect(() => {
    if (routeSearchParams?.q && routeSearchParams.q !== searchQuery) {
      setSearchQuery(routeSearchParams.q)
    }
  }, [routeSearchParams, searchQuery, setSearchQuery])

  useEffect(() => {
    if (pageContext.product) {
      addRecentlyViewed(pageContext.product.slug)
      setSelectedColor(pageContext.product.colorOptions[0])
      setSelectedSize(pageContext.product.sizeOptions[1] ?? pageContext.product.sizeOptions[0])
    }
  }, [pageContext.product, addRecentlyViewed])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPurchaseFeedIndex((current) => (current + 1) % overlayPurchaseFeed.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (toastQueue.length === 0) {
      return undefined
    }

    const toast = toastQueue[0]
    const timeout = window.setTimeout(() => {
      dismissToast(toast.id)
    }, 2500)

    return () => window.clearTimeout(timeout)
  }, [toastQueue, dismissToast])

  if (!template) {
    return (
      <div className="storefront-not-found">
        <SectionCard kicker="Template missing" title="That route template does not exist." body="The route was requested, but no layout template is registered for it." />
      </div>
    )
  }

  if (pageContext.notFound) {
    return (
      <div className="storefront-not-found">
        <SectionCard kicker="Not found" title={pageContext.title} body={pageContext.body}>
          <CardFooter className="store-inline-actions">
            <Button asChild>
              <MerchantLink href="/">Return home</MerchantLink>
            </Button>
            <Button variant="outline" asChild>
              <MerchantLink href="/shop">Browse products</MerchantLink>
            </Button>
          </CardFooter>
        </SectionCard>
      </div>
    )
  }

  const renderBlock = (factoryKey, index) => {
    switch (factoryKey) {
      case 'AnnouncementBar':
        return (
          <div key={`${factoryKey}-${index}`} className="store-utility-bar">
            <div className="store-utility-message">
              <Bell className="size-4" />
              <span>{merchantConfig.utilityMessage}</span>
            </div>
            <div className="store-inline-actions">
              <button type="button" className="store-pill-button" onClick={() => store.setLocale(store.locale === 'en' ? 'ar' : 'en')}>
                <Languages className="size-4" />
                {store.locale === 'en' ? 'AR' : 'EN'}
              </button>
              <button type="button" className="store-pill-button" onClick={() => store.setCurrency(store.currency === 'SAR' ? 'USD' : 'SAR')}>
                {store.currency}
              </button>
            </div>
          </div>
        )
      case 'HeaderTopNavigation':
        return (
          <header key={`${factoryKey}-${index}`} className={`store-top-navigation ${template.variants.header === 'condensed' ? 'is-condensed' : ''}`}>
            <MerchantLink href="/" className="store-brand-lockup">
              <span className="store-brand-mark">{merchantConfig.brandShort}</span>
              <div>
                <p className="store-section-kicker">Unified merchant shell</p>
                <h1 className="store-brand-title">{merchantConfig.brandName}</h1>
              </div>
            </MerchantLink>
            <div className="store-search-shell">
              <Search className="size-4 text-slate-400" />
              <input
                value={store.searchQuery}
                onChange={(event) => {
                  store.setSearchQuery(event.target.value)
                  store.openOverlay('search')
                }}
                onFocus={() => store.openOverlay('search')}
                placeholder="Search products, categories, and help articles"
              />
              <Button asChild size="sm" className="text-white">
                <MerchantLink href={`/search?q=${encodeURIComponent(store.searchQuery || 'featured')}`} className="text-white">
                  Search
                </MerchantLink>
              </Button>
            </div>
            <nav className="store-action-nav">
              <MerchantLink href="/account" className="store-action-link">Account</MerchantLink>
              <MerchantLink href="/account/wishlist" className="store-action-link">Wishlist {store.wishlist.length ? `(${store.wishlist.length})` : ''}</MerchantLink>
              <button type="button" className="store-action-link" onClick={() => store.toggleOverlay('miniCart')}>
                Cart ({store.cart.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            </nav>
          </header>
        )
      case 'MegaMenuBar':
        return (
          <div key={`${factoryKey}-${index}`} className="store-mega-menu">
            {merchantConfig.nav.map((item) => (
              <span key={item} className="store-mega-item">{item}</span>
            ))}
            <MerchantLink href="/deals" className="store-mega-sale">Flash sale</MerchantLink>
          </div>
        )
      case 'CategorySidebarNavigation':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Departments" title="Browse the catalog tree" body="This left region collapses or expands based on the template registry.">
            <div className="store-list-stack">
              {categoryTree.map((item) => (
                <MerchantLink key={item.slug} href={`/c/${item.slug}`} className="store-tree-link">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.children.join(' · ')}</span>
                  </div>
                  <ChevronRight className="size-4" />
                </MerchantLink>
              ))}
            </div>
          </SectionCard>
        )
      case 'HeroBanner':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Discovery led commerce" title="One registry-driven storefront, ready for multiple merchants." body="The homepage demonstrates how campaign content, category discovery, trust blocks, and product merchandising can all be reassembled without hardcoded page wrappers." className="store-hero-card">
            <div className="store-hero-grid">
              <div className="store-highlight-list">
                {merchantConfig.trustBadges.map((badge) => (
                  <span key={badge} className="store-highlight-chip">{badge}</span>
                ))}
              </div>
              <div className="store-inline-actions">
                <Button asChild>
                  <MerchantLink href="/shop">Explore products</MerchantLink>
                </Button>
                <Button variant="outline" asChild>
                  <MerchantLink href="/checkout">Review checkout</MerchantLink>
                </Button>
              </div>
            </div>
          </SectionCard>
        )
      case 'PrimaryProductGrid':
      case 'RecommendationsCarousel':
      case 'RecentlyViewedStrip':
      case 'WishlistCurationGrid': {
        const collection =
          factoryKey === 'RecommendationsCarousel'
            ? pageContext.recommendations
            : factoryKey === 'RecentlyViewedStrip'
              ? pageContext.recentlyViewedProducts
              : factoryKey === 'WishlistCurationGrid'
                ? pageContext.wishlistProducts
                : pageContext.selectedProducts

        const title =
          factoryKey === 'RecommendationsCarousel'
            ? 'Recommended next'
            : factoryKey === 'RecentlyViewedStrip'
              ? 'Recently viewed'
              : factoryKey === 'WishlistCurationGrid'
                ? 'Saved items'
                : 'Product collection'

        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Merchandising" title={title} body="Shared product cards keep listing, recommendation, and wishlist surfaces visually consistent.">
            <div className="store-product-grid">
              {collection.length > 0 ? (
                collection.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={store.currency}
                    inWishlist={store.wishlist.includes(product.id)}
                    cartQuantity={store.cart.find((item) => item.id === product.id)?.quantity ?? 0}
                    onToggleWishlist={store.toggleWishlist}
                    onAddToCart={(item) => store.addToCart(item, 1)}
                  />
                ))
              ) : (
                <div className="store-empty-panel">No products are available for this state yet.</div>
              )}
            </div>
          </SectionCard>
        )
      }
      case 'PressMentions':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Brand trust" title="Seen across editorial, social, and merchant campaigns.">
            <div className="store-logo-grid">
              {['Retail Gulf', 'Merchant Week', 'Daily Shopper', 'Saudi Trend'].map((item) => (
                <span key={item} className="store-logo-chip">{item}</span>
              ))}
            </div>
          </SectionCard>
        )
      case 'TestimonialsSlider':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Social proof" title="Customers understand the value quickly.">
            <div className="store-list-stack">
              {[
                'Trust cues, delivery clarity, and payment placement feel much stronger than a generic demo.',
                'The same layout system works for campaigns, core catalog pages, and account flows.',
              ].map((quote) => (
                <blockquote key={quote} className="store-quote">{quote}</blockquote>
              ))}
            </div>
          </SectionCard>
        )
      case 'CountdownTimerCard':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Urgency" title="Offer window ends in 11h 24m" body="A reusable right-rail urgency block for homepage, deals, and campaign templates." />
        )
      case 'NewsletterSignupCard':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Retention" title="Capture high-intent shoppers">
            <div className="store-field-stack">
              <input className="store-input" placeholder="Email address" />
              <Button onClick={() => store.openOverlay('newsletter')}>Join the list</Button>
            </div>
          </SectionCard>
        )
      case 'TrustBadgesPanel':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Trust cues" title="Visible compliance and support signals">
            <div className="store-badge-grid">
              {pageContext.trustBadges.map((item) => (
                <Badge key={item} variant="outline">{item}</Badge>
              ))}
            </div>
          </SectionCard>
        )
      case 'BreadcrumbsTrail':
        return (
          <nav key={`${factoryKey}-${index}`} className="store-breadcrumbs">
            {pageContext.breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="store-breadcrumb-item">
                {index > 0 ? <ChevronRight className="size-4" /> : null}
                {item.href === '#' ? <span>{item.label}</span> : <MerchantLink href={item.href}>{item.label}</MerchantLink>}
              </span>
            ))}
          </nav>
        )
      case 'SubcategoryBubbleGrid':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Subcategories" title={pageContext.category?.name ?? 'Category cluster'}>
            <div className="store-chip-grid">
              {(pageContext.category?.children ?? []).map((child) => (
                <span key={child} className="store-round-chip">{child}</span>
              ))}
            </div>
          </SectionCard>
        )
      case 'SortToolbar':
        return (
          <div key={`${factoryKey}-${index}`} className="store-toolbar-card">
            <div>
              <p className="store-section-kicker">Listing controls</p>
              <h2 className="store-section-title">
                {pageContext.searchQuery
                  ? `Results for “${pageContext.searchQuery}”`
                  : pageContext.category
                    ? `${pageContext.category.name} assortment`
                    : 'Curated storefront listing'}
              </h2>
            </div>
            <div className="store-inline-actions">
              {['Featured', 'Price low', 'Top rated'].map((label) => (
                <button key={label} type="button" className="store-pill-button">{label}</button>
              ))}
            </div>
          </div>
        )
      case 'SearchResultsSummary':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Search intelligence" title={`${pageContext.selectedProducts.length} matching products`} body="Autocomplete, listing refinement, and comparison fit into the same shared route renderer." />
        )
      case 'FiltersPanel':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Filters" title="Refine results">
            <div className="store-list-stack">
              {['Ready to ship', 'Top rated', 'Merchant offer', 'Apple Pay eligible'].map((item) => (
                <label key={item} className="store-check-row">
                  <input type="checkbox" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </SectionCard>
        )
      case 'ComparisonPane':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Compare" title={`Tracking ${pageContext.comparisonProducts.length} products`}>
            <div className="store-list-stack">
              {pageContext.comparisonProducts.length > 0 ? (
                pageContext.comparisonProducts.map((item) => (
                  <div key={item.id} className="store-inline-summary">
                    <span>{item.title}</span>
                    <button type="button" className="store-link-button" onClick={() => store.toggleCompare(item.id)}>
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="store-copy">Pick up to four items from PLP or PDP to keep them here.</p>
              )}
            </div>
          </SectionCard>
        )
      case 'StockScarcityMessages':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Scarcity" title="Low stock items surface in the right rail">
            <div className="store-list-stack">
              {products.slice(0, 3).map((item) => (
                <div key={item.id} className="store-inline-summary">
                  <span>{item.title}</span>
                  <strong>{item.stock}</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'ProductImageGallery':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Product media" title={pageContext.product.title}>
            <div className="store-media-stack">
              <img src={pageContext.product.image} alt={pageContext.product.title} className="store-pdp-image" />
              <div className="store-thumbnail-row">
                {[1, 2, 3].map((item) => (
                  <img key={item} src={pageContext.product.image} alt={`${pageContext.product.title} thumbnail ${item}`} className="store-thumbnail" />
                ))}
              </div>
            </div>
          </SectionCard>
        ) : null
      case 'ProductVideoPlayer':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Rich media" title="Product video and 360 viewer">
            <div className="store-video-placeholder">Interactive demo media surface</div>
          </SectionCard>
        )
      case 'ProductInfoBlock':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker={pageContext.product.category} title={pageContext.product.title} body={pageContext.product.longDescription}>
            <div className="store-price-row">
              <strong>{formatMoney(pageContext.product.price, store.currency)}</strong>
              <span>{formatMoney(pageContext.product.mrp, store.currency)}</span>
            </div>
            <div className="store-badge-grid">
              {pageContext.product.badges.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="store-inline-actions">
              <Button onClick={() => store.addToCart(pageContext.product, quantity)}>Add {quantity} to cart</Button>
              <Button variant="outline" onClick={() => store.toggleCompare(pageContext.product.id)}>Compare</Button>
              <Button variant="ghost" onClick={() => store.openOverlay('sizeGuide')}>Size guide</Button>
            </div>
          </SectionCard>
        ) : null
      case 'VariantSelectorColor':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Color" title="Select finish">
            <div className="store-chip-grid">
              {pageContext.product.colorOptions.map((option) => (
                <button key={option} type="button" className={`store-round-chip ${selectedColor === option ? 'is-active' : ''}`} onClick={() => setSelectedColor(option)}>
                  {option}
                </button>
              ))}
            </div>
          </SectionCard>
        ) : null
      case 'VariantSelectorSize':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Size" title="Select size">
            <div className="store-chip-grid">
              {pageContext.product.sizeOptions.map((option) => (
                <button key={option} type="button" className={`store-round-chip ${selectedSize === option ? 'is-active' : ''}`} onClick={() => setSelectedSize(option)}>
                  {option}
                </button>
              ))}
            </div>
          </SectionCard>
        ) : null
      case 'QuantitySelectorBlock':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Quantity" title="Adjust order quantity">
            <div className="store-stepper">
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((current) => current + 1)}>+</button>
            </div>
          </SectionCard>
        )
      case 'SocialProofCounter':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Activity" title="523 shoppers viewed this today" body="Live-looking social proof can be toggled per merchant or campaign." />
        )
      case 'ProductTabsNavigator':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Specs and details" title="Key specifications">
            <div className="store-list-stack">
              {pageContext.product.specifications.map(([label, value]) => (
                <div key={label} className="store-inline-summary">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        ) : null
      case 'ReviewsSummaryWidget':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Ratings" title={`${pageContext.product.rating} average rating`} body={`${pageContext.product.reviews.toLocaleString()} reviews from verified shoppers.`} />
        ) : null
      case 'ProductReviewsEngine':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Reviews" title="What customers are saying">
            <div className="store-list-stack">
              {['Great delivery clarity and packaging.', 'The product page feels complete and trustworthy.'].map((review) => (
                <blockquote key={review} className="store-quote">{review}</blockquote>
              ))}
            </div>
          </SectionCard>
        )
      case 'ReviewHighlights':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Highlights" title="Most mentioned themes">
            <div className="store-badge-grid">
              {['Fast shipping', 'True to size', 'Well packed', 'Worth the price'].map((item) => (
                <Badge key={item} variant="outline">{item}</Badge>
              ))}
            </div>
          </SectionCard>
        )
      case 'CustomerPhotosGallery':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Customer media" title="Real shopper photos">
            <div className="store-thumbnail-row">
              {[1, 2, 3].map((item) => (
                <img key={item} src={pageContext.product.image} alt={`Customer upload ${item}`} className="store-thumbnail" />
              ))}
            </div>
          </SectionCard>
        ) : null
      case 'ProductQuestionsAnswers':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Questions" title="Ask before you buy">
            <div className="store-list-stack">
              <div className="store-qa-row">
                <strong>Does this support next-day delivery?</strong>
                <span>Yes, on eligible addresses shown during checkout.</span>
              </div>
              <div className="store-qa-row">
                <strong>Is there a warranty?</strong>
                <span>Warranty terms vary by merchant config and product category.</span>
              </div>
            </div>
          </SectionCard>
        )
      case 'StockLevelIndicator':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Availability" title={pageContext.product.stock} body={pageContext.product.delivery} />
        ) : null
      case 'ShippingCostEstimator':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Delivery estimate" title="Delivery from SAR 18" body="Address-aware shipping can later plug into live rates without changing the region layout." />
        )
      case 'FrequentlyBoughtTogether':
      case 'CompleteTheLook':
      case 'BundleBuilder':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Cross-sell" title={factoryKey === 'BundleBuilder' ? 'Bundle builder' : factoryKey === 'CompleteTheLook' ? 'Complete the look' : 'Frequently bought together'}>
            <div className="store-compact-product-list">
              {pageContext.recommendations.slice(0, 3).map((item) => (
                <div key={item.id} className="store-inline-summary">
                  <span>{item.title}</span>
                  <strong>{formatMoney(item.price, store.currency)}</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'WishlistShareActions':
        return pageContext.product ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Actions" title="Save or share">
            <div className="store-inline-actions">
              <Button variant="outline" onClick={() => store.toggleWishlist(pageContext.product.id)}>
                <Heart className="size-4" />
                {store.wishlist.includes(pageContext.product.id) ? 'Saved' : 'Save'}
              </Button>
              <Button variant="ghost">Share product</Button>
            </div>
          </SectionCard>
        ) : null
      case 'ProductComparisonTable':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Comparison" title="Decision support table">
            <div className="store-list-stack">
              {['Price', 'Delivery', 'Warranty'].map((item) => (
                <div key={item} className="store-inline-summary">
                  <span>{item}</span>
                  <strong>Comparable across items</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'FlashSaleBanner':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Flash sale" title="Merchant-configurable promotional surface" body="Deals pages and campaign pages share the same banner block, only driven by different data and placement." className="store-sale-banner" />
        )
      case 'PromoCodeHints':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Promotions" title="Promo code guidance">
            <div className="store-field-stack">
              <input className="store-input" placeholder="Enter promo code" />
              <p className="store-copy">Try `WELCOME10` or merchant campaign rules configured in runtime data.</p>
            </div>
          </SectionCard>
        )
      case 'CampaignHero':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Campaign landing" title={pageContext.campaign?.title ?? campaigns[0].title} body={pageContext.campaign?.body ?? campaigns[0].body} className="store-hero-card">
            <p className="store-lead">{pageContext.campaign?.subtitle ?? campaigns[0].subtitle}</p>
          </SectionCard>
        )
      case 'CartFullView':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Bag review" title="Shopping cart">
            <div className="store-list-stack">
              {store.cart.length > 0 ? (
                store.cart.map((item) => (
                  <div key={item.id} className="store-cart-row">
                    <img src={item.image} alt={item.title} className="store-cart-thumb" />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{formatMoney(item.price, store.currency)} each</span>
                    </div>
                    <div className="store-stepper is-compact">
                      <button type="button" onClick={() => store.updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => store.updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button type="button" className="store-link-button" onClick={() => store.removeFromCart(item.id)}>Remove</button>
                  </div>
                ))
              ) : (
                <div className="store-empty-panel">Your cart is empty. Add products from listing or PDP pages to populate this route.</div>
              )}
            </div>
          </SectionCard>
        )
      case 'SavedForLaterSection':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Retention" title="Saved for later">
            <div className="store-compact-product-list">
              {pageContext.recommendations.slice(0, 2).map((item) => (
                <div key={item.id} className="store-inline-summary">
                  <span>{item.title}</span>
                  <Button size="sm" variant="outline" onClick={() => store.addToCart(item, 1)}>Move to cart</Button>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'OrderSummaryWidget': {
        const subtotal = store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const shipping = subtotal > 0 ? 18 : 0
        const tax = subtotal * 0.15
        const total = subtotal + shipping + tax

        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Summary" title="Order totals">
            <div className="store-list-stack">
              <div className="store-inline-summary"><span>Subtotal</span><strong>{formatMoney(subtotal, store.currency)}</strong></div>
              <div className="store-inline-summary"><span>Shipping</span><strong>{formatMoney(shipping, store.currency)}</strong></div>
              <div className="store-inline-summary"><span>VAT</span><strong>{formatMoney(tax, store.currency)}</strong></div>
              <div className="store-inline-summary is-strong"><span>Total</span><strong>{formatMoney(total, store.currency)}</strong></div>
            </div>
            <CardFooter className="store-card-foot">
              <Button asChild className="w-full">
                <MerchantLink href={templateId === 'checkout_gateway' ? '/checkout/success' : '/checkout'}>
                  {templateId === 'checkout_gateway' ? 'Proceed to Payment' : 'Proceed to checkout'}
                </MerchantLink>
              </Button>
            </CardFooter>
          </SectionCard>
        )
      }
      case 'ExpressCheckoutButtons':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Express checkout" title="Preferred payment shortcuts">
            <div className="store-inline-actions">
              {['Apple Pay', 'mada', 'Tabby'].map((item) => (
                <button key={item} type="button" className="store-pill-button">{item}</button>
              ))}
            </div>
          </SectionCard>
        )
      case 'GiftOptionsPanel':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Extras" title="Gift and order options">
            <label className="store-check-row">
              <input type="checkbox" />
              <span>Add a gift note and branded wrap</span>
            </label>
          </SectionCard>
        )
      case 'FreeShippingProgressBar': {
        const subtotal = store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const progress = Math.min(100, Math.round((subtotal / 250) * 100))

        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Thresholds" title="Free shipping progress">
            <div className="store-progress-shell">
              <div className="store-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="store-copy">{progress === 100 ? 'Free shipping unlocked.' : `Add ${formatMoney(Math.max(0, 250 - subtotal), store.currency)} more to unlock free shipping.`}</p>
          </SectionCard>
        )
      }
      case 'CheckoutHeader':
        return (
          <header key={`${factoryKey}-${index}`} className="store-top-navigation is-checkout">
            <MerchantLink href="/" className="store-brand-lockup">
              <span className="store-brand-mark">{merchantConfig.brandShort}</span>
              <div>
                <p className="store-section-kicker">Checkout</p>
                <h1 className="store-brand-title">{merchantConfig.brandName}</h1>
              </div>
            </MerchantLink>
            <div className="store-inline-actions">
              <span className="store-security-pill"><ShieldCheck className="size-4" /> Secure payment flow</span>
            </div>
          </header>
        )
      case 'CheckoutProgressIndicator':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Checkout steps" title="Address, payment, review">
            <div className="store-step-flow">
              {['Address', 'Payment', 'Confirm'].map((item, index) => (
                <div key={item} className={`store-step-node ${index === 1 ? 'is-active' : ''}`}>{item}</div>
              ))}
            </div>
          </SectionCard>
        )
      case 'AddressFormSection':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Delivery details" title="Address form">
            <div className="store-form-grid">
              {['Full name', 'Email', 'Phone', 'National address', 'City', 'Building number'].map((field) => (
                <input key={field} className="store-input" placeholder={field} />
              ))}
            </div>
          </SectionCard>
        )
      case 'PaymentMethodSection':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Payment methods" title="Choose how to pay">
            <div className="store-list-stack">
              {['Apple Pay', 'mada', 'Visa / Mastercard', 'Tabby', 'Tamara'].map((item) => (
                <label key={item} className="store-check-row">
                  <input type="radio" name="payment-method" defaultChecked={item === 'Apple Pay'} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </SectionCard>
        )
      case 'PaymentFormSection':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Secure entry" title="Payment form">
            <div className="store-form-grid">
              {['Card number', 'Cardholder name', 'Expiry date', 'CVV'].map((field) => (
                <input key={field} className="store-input" placeholder={field} />
              ))}
            </div>
          </SectionCard>
        )
      case 'SecureTransactionDisclaimers':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Legal and security" title="Transaction safeguards" body="PCI-conscious handling, merchant policy links, VAT clarity, and shipping disclosures remain visible in the checkout shell." />
        )
      case 'OrderConfirmationPanel':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Thank you" title="Your order is confirmed">
            <div className="store-list-stack">
              <div className="store-inline-summary"><span>Order number</span><strong>{orderHistory[0].id}</strong></div>
              <div className="store-inline-summary"><span>Status</span><strong>{orderHistory[0].status}</strong></div>
              <div className="store-inline-summary"><span>Estimated arrival</span><strong>{orderHistory[0].eta}</strong></div>
            </div>
            <CardFooter className="store-inline-actions">
              <Button asChild><MerchantLink href="/account/orders">Track order</MerchantLink></Button>
              <Button variant="outline" asChild><MerchantLink href="/shop">Continue shopping</MerchantLink></Button>
            </CardFooter>
          </SectionCard>
        )
      case 'AccountRegistrationPrompt':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Post-purchase onboarding" title="Create an account from this order" body="Guest checkout can convert into portal access with one follow-up action." >
            <CardFooter className="store-card-foot">
              <Button asChild className="w-full">
                <MerchantLink href="/register">Register now</MerchantLink>
              </Button>
            </CardFooter>
          </SectionCard>
        )
      case 'CustomerPortalNavigation': {
        const links = [
          ['/account', 'Overview'],
          ['/account/orders', 'Orders'],
          ['/account/addresses', 'Addresses'],
          ['/account/payments', 'Payments'],
          ['/account/wishlist', 'Wishlist'],
          ['/account/profile', 'Profile'],
        ]

        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Customer portal" title="Account navigation">
            <div className="store-list-stack">
              {links.map(([href, label]) => (
                <MerchantLink key={href} href={href} className="store-tree-link">
                  <span>{label}</span>
                  <ChevronRight className="size-4" />
                </MerchantLink>
              ))}
            </div>
          </SectionCard>
        )
      }
      case 'ProfileOverviewCards':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Account overview" title="Customer summary">
            <div className="store-stats-grid">
              {[
                ['Open orders', '1'],
                ['Saved items', `${store.wishlist.length}`],
                ['Saved addresses', `${addresses.length}`],
              ].map(([label, value]) => (
                <div key={label} className="store-stat-card">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'RecentOrderStatusBlock':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Latest order" title={orderHistory[0].id} body={`${orderHistory[0].status} · ${orderHistory[0].eta}`} />
        )
      case 'HistoricalOrdersGrid':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Order history" title="Past orders">
            <div className="store-list-stack">
              {orderHistory.map((item) => (
                <MerchantLink key={item.id} href={`/account/orders/${item.id}`} className="store-tree-link">
                  <div>
                    <strong>{item.id}</strong>
                    <span>{formatDateLabel(item.placedAt)} · {item.status}</span>
                  </div>
                  <strong>{formatMoney(item.total, store.currency)}</strong>
                </MerchantLink>
              ))}
            </div>
          </SectionCard>
        )
      case 'CarrierTrackerTimeline':
        return pageContext.order ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Tracking" title={pageContext.order.id}>
            <div className="store-list-stack">
              {['Order placed', 'Packed', 'In transit', 'Delivered'].map((item, index) => (
                <div key={item} className={`store-timeline-row ${index < 3 ? 'is-done' : ''}`}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        ) : null
      case 'OrderItemsBreakdown':
        return pageContext.order ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Order items" title="Line breakdown">
            <div className="store-compact-product-list">
              {pageContext.order.items.map((item) => (
                <div key={item.id} className="store-inline-summary">
                  <span>{item.title}</span>
                  <strong>{formatMoney(item.price, store.currency)}</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        ) : null
      case 'ReviewSubmissionPrompt':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Retention" title="Review delivered products">
            <Button onClick={() => store.openOverlay('review')}>Open review form</Button>
          </SectionCard>
        )
      case 'SavedAddressesDashboard':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Addresses" title="Saved delivery points">
            <div className="store-list-stack">
              {addresses.map((item) => (
                <div key={item.id} className="store-tree-link">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.line1}, {item.city}</span>
                  </div>
                  <span>{item.phone}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'SavedPaymentMethodsDeck':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Wallet" title="Stored payment methods">
            <div className="store-list-stack">
              {paymentMethods.map((item) => (
                <div key={item.id} className="store-inline-summary">
                  <span>{item.label}</span>
                  <Badge>{item.default ? 'Default' : item.type}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'ProfileSettingsForm':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Profile and security" title="Account preferences">
            <div className="store-form-grid">
              {['First name', 'Last name', 'Email address', 'Password update'].map((field) => (
                <input key={field} className="store-input" placeholder={field} />
              ))}
            </div>
          </SectionCard>
        )
      case 'AboutEditorialNarrative':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Merchant narrative" title="About this storefront system" body="This demo storefront shows how one shared layout engine can support editorial brand pages, commerce-heavy flows, and support templates without rebuilding page wrappers each time." />
        )
      case 'ContactSupportPortal':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Support portal" title="Contact and location details">
            <div className="store-form-grid">
              {['Full name', 'Email address', 'Order number', 'How can we help?'].map((field) => (
                <input key={field} className="store-input" placeholder={field} />
              ))}
            </div>
            <div className="store-location-grid">
              {supportLocations.map((location) => (
                <div key={location.city} className="store-stat-card">
                  <strong>{location.city}</strong>
                  <span>{location.address}</span>
                  <span>{location.hours}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'LiveChatPanel':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Live help" title="Chat with support">
            <p className="store-copy">The floating chat anchor is always available, but this right-rail panel keeps the support path visible on contact routes too.</p>
            <Button variant="outline" onClick={() => store.toggleOverlay('liveChat')}>Open live chat</Button>
          </SectionCard>
        )
      case 'HelpCenterNavigation':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Help topics" title="Knowledge base sections">
            <div className="store-list-stack">
              {pageContext.faqGroups.map((group) => (
                <div key={group.category} className="store-tree-link">
                  <span>{group.category}</span>
                  <ChevronRight className="size-4" />
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'HelpCenterContent':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Searchable help" title="FAQ and support answers">
            <div className="store-field-stack">
              <input className="store-input" placeholder="Search help topics" />
            </div>
            <div className="store-list-stack">
              {pageContext.faqGroups.flatMap((group) => group.items).map((item) => (
                <div key={item.question} className="store-qa-row">
                  <strong>{item.question}</strong>
                  <span>{item.answer}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'SitemapRouteIndex':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Route inventory" title="All active storefront routes" body="This page documents the implemented route map with both route patterns and seeded working examples.">
            <div className="store-sitemap-groups">
              {storefrontRoutesByGroup.map((group) => (
                <div key={group.group} className="store-sitemap-group">
                  <div className="store-sitemap-heading">
                    <h3>{group.group}</h3>
                    <span>{group.entries.length} routes</span>
                  </div>
                  <div className="store-sitemap-list">
                    {group.entries.map((entry) => (
                      <div key={`${entry.group}-${entry.pattern}`} className="store-sitemap-item">
                        <div className="store-sitemap-meta">
                          <strong>{entry.label}</strong>
                          <code>{entry.pattern}</code>
                          {entry.notes ? <p className="store-copy">{entry.notes}</p> : null}
                        </div>
                        <div className="store-sitemap-links">
                          {entry.examples.map((href) => (
                            <MerchantLink key={href} href={href} className="store-sitemap-link">
                              {href}
                            </MerchantLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )
      case 'SupportQuickCta':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Need more help?" title="Reach support quickly" body={`${merchantConfig.support.email} · ${merchantConfig.support.phone}`} />
        )
      case 'LegalDocumentNavigation':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Legal documents" title="Browse policies">
            <div className="store-list-stack">
              {legalDocuments.map((document) => (
                <MerchantLink key={document.slug} href={`/legal/${document.slug}`} className="store-tree-link">
                  <span>{document.title}</span>
                  <ChevronRight className="size-4" />
                </MerchantLink>
              ))}
            </div>
          </SectionCard>
        )
      case 'LegalDocumentContent':
        return pageContext.legalDocument ? (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Legal content" title={pageContext.legalDocument.title} body={pageContext.legalDocument.body} />
        ) : null
      case 'LoadingStates':
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="System behavior" title="Loading and empty states">
            <div className="store-skeleton-grid">
              {[1, 2, 3].map((item) => <div key={item} className="store-skeleton-card" />)}
            </div>
          </SectionCard>
        )
      case 'PaginationBar':
        return (
          <div key={`${factoryKey}-${index}`} className="store-pagination">
            <button type="button" className="store-pill-button">Previous</button>
            <button type="button" className="store-pill-button is-active">1</button>
            <button type="button" className="store-pill-button">2</button>
            <button type="button" className="store-pill-button">Next</button>
          </div>
        )
      case 'GlobalFooterLinks':
        return (
          <footer key={`${factoryKey}-${index}`} className="store-footer">
            <div className="store-footer-grid">
              {merchantConfig.footerGroups.map((group) => (
                <div key={group.title} className="store-footer-column">
                  <strong>{group.title}</strong>
                  {group.links.map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </div>
              ))}
              <div className="store-footer-column">
                <strong>Merchant support</strong>
                <span>{merchantConfig.support.email}</span>
                <span>{merchantConfig.support.phone}</span>
                <span>{merchantConfig.support.whatsapp}</span>
              </div>
            </div>
          </footer>
        )
      case 'LegalFooter':
        return (
          <footer key={`${factoryKey}-${index}`} className="store-footer is-legal">
            <span>Secure checkout · Privacy policy · Terms · Returns policy</span>
          </footer>
        )
      default:
        return (
          <SectionCard key={`${factoryKey}-${index}`} kicker="Factory placeholder" title={factoryKey} body="This block key is registered but does not yet have a dedicated renderer." />
        )
    }
  }

  const renderRegion = (regionName) =>
    template.grid_layout[regionName].map((factoryKey, index) => renderBlock(factoryKey, index))

  const overlayNodes = (
    <>
      {store.overlays.search && store.searchQuery ? (
        <div className="store-overlay-search">
          <div className="store-overlay-panel">
            <div className="store-overlay-head">
              <strong>Search suggestions</strong>
              <button type="button" className="store-link-button" onClick={() => store.closeOverlay('search')}>Close</button>
            </div>
            <div className="store-list-stack">
              {searchProducts(store.searchQuery).slice(0, 4).map((item) => (
                <MerchantLink key={item.id} href={`/product/${item.slug}`} className="store-tree-link" onClick={() => store.closeOverlay('search')}>
                  <span>{item.title}</span>
                  <strong>{item.category}</strong>
                </MerchantLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {store.overlays.miniCart ? (
        <div className="store-overlay-drawer">
          <div className="store-overlay-panel is-drawer">
            <div className="store-overlay-head">
              <strong>Mini cart</strong>
              <button type="button" className="store-link-button" onClick={() => store.closeOverlay('miniCart')}>Close</button>
            </div>
            <div className="store-list-stack">
              {store.cart.length > 0 ? (
                store.cart.map((item) => (
                  <div key={item.id} className="store-inline-summary">
                    <span>{item.title} × {item.quantity}</span>
                    <strong>{formatMoney(item.price * item.quantity, store.currency)}</strong>
                  </div>
                ))
              ) : (
                <p className="store-copy">Your cart is currently empty.</p>
              )}
            </div>
            <div className="store-inline-actions">
              <Button asChild className="w-full">
                <MerchantLink href="/cart">Go to cart</MerchantLink>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {store.overlays.newsletter ? (
        <div className="store-overlay-modal">
          <div className="store-overlay-panel is-modal">
            <div className="store-overlay-head">
              <strong>Newsletter signup</strong>
              <button type="button" className="store-link-button" onClick={() => store.closeOverlay('newsletter')}>Close</button>
            </div>
            <p className="store-copy">Capture campaign traffic and retention intent without leaving the shared layout system.</p>
            <input className="store-input" placeholder="Email address" />
            <Button onClick={() => store.closeOverlay('newsletter')}>Confirm signup</Button>
          </div>
        </div>
      ) : null}

      {store.overlays.sizeGuide ? (
        <div className="store-overlay-modal">
          <div className="store-overlay-panel is-modal">
            <div className="store-overlay-head">
              <strong>Size guide</strong>
              <button type="button" className="store-link-button" onClick={() => store.closeOverlay('sizeGuide')}>Close</button>
            </div>
            <div className="store-list-stack">
              {['S · Chest 36"', 'M · Chest 38"', 'L · Chest 40"', 'XL · Chest 42"'].map((item) => (
                <div key={item} className="store-inline-summary"><span>{item}</span></div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {store.overlays.review ? (
        <div className="store-overlay-modal">
          <div className="store-overlay-panel is-modal">
            <div className="store-overlay-head">
              <strong>Leave a review</strong>
              <button type="button" className="store-link-button" onClick={() => store.closeOverlay('review')}>Close</button>
            </div>
            <textarea className="store-input store-textarea" placeholder="Share your experience with the product and delivery flow." />
            <Button onClick={() => store.closeOverlay('review')}>Submit review</Button>
          </div>
        </div>
      ) : null}

      <button type="button" className="store-chat-anchor" onClick={() => store.toggleOverlay('liveChat')}>
        <MessageCircle className="size-5" />
        Chat
      </button>

      {store.overlays.liveChat ? (
        <div className="store-chat-panel">
          <div className="store-overlay-head">
            <strong>Live chat</strong>
            <button type="button" className="store-link-button" onClick={() => store.closeOverlay('liveChat')}>Close</button>
          </div>
          <p className="store-copy">Support can answer order, returns, and product questions from anywhere in the shell.</p>
        </div>
      ) : null}

      <div className="store-purchase-feed">
        <Sparkles className="size-4" />
        <span>{overlayPurchaseFeed[purchaseFeedIndex]}</span>
      </div>

      <div className="store-toast-stack">
        {store.toasts.map((toast) => (
          <div key={toast.id} className="store-toast">{toast.message}</div>
        ))}
      </div>
    </>
  )

  return (
    <div style={getStorefrontThemeVars(defaultStorefrontTheme)}>
      <StorefrontLayoutManager
        routeTemplateId={template.route_template_id}
        direction={store.direction || template.direction}
        merchantConfig={merchantConfig}
        header={renderRegion('header')}
        leftContent={renderRegion('left_content')}
        mainContent={renderRegion('main_content')}
        rightContent={renderRegion('right_content')}
        bottomContent={renderRegion('bottom_content')}
        footer={renderRegion('footer')}
        overlays={overlayNodes}
      />
    </div>
  )
}
