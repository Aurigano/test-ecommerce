import { products as seedProducts } from '../data/products'

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createProduct(seedProduct, index) {
  const slug = slugify(seedProduct.title)
  const categorySlug = slugify(seedProduct.category)
  const accent = ['Sand', 'Midnight', 'Cloud', 'Sage', 'Cobalt'][index % 5]

  return {
    ...seedProduct,
    slug,
    categorySlug,
    sku: `SKU-${1000 + seedProduct.id}`,
    colorOptions: [accent, 'Black', 'Ivory'],
    sizeOptions: ['S', 'M', 'L', 'XL'],
    specifications: [
      ['Material', index % 2 === 0 ? 'Engineered premium blend' : 'Retail-grade composite'],
      ['Warranty', index % 3 === 0 ? '2 years' : '1 year'],
      ['Origin', 'Curated merchant assortment'],
    ],
    longDescription: `${seedProduct.description} Designed for modern GCC storefront demos with clear pricing, localized support cues, and high-trust presentation.`,
    badges: [seedProduct.badge, seedProduct.prime ? 'Fast delivery' : 'Merchant pick'],
  }
}

export const products = seedProducts.map(createProduct)

export const productLookup = Object.fromEntries(products.map((product) => [product.slug, product]))

export const categoryTree = [
  {
    slug: 'women',
    name: 'Women',
    children: ['Dresses', 'Tops', 'Shoes', 'Bags'],
  },
  {
    slug: 'men',
    name: 'Men',
    children: ['Shirts', 'Trousers', 'Shoes', 'Watches'],
  },
  {
    slug: 'electronics',
    name: 'Electronics',
    children: ['Audio', 'Mobile', 'Computing', 'Accessories'],
  },
  {
    slug: 'home',
    name: 'Home',
    children: ['Decor', 'Kitchen', 'Bedding', 'Lighting'],
  },
  {
    slug: 'beauty',
    name: 'Beauty',
    children: ['Skincare', 'Haircare', 'Wellness', 'Makeup'],
  },
  {
    slug: 'sports',
    name: 'Sports',
    children: ['Activewear', 'Training', 'Outdoor', 'Travel'],
  },
]

export const merchantConfig = {
  brandName: 'Atlas Commerce',
  brandShort: 'AC',
  locale: 'en',
  direction: 'ltr',
  currencies: ['SAR', 'USD'],
  trustBadges: ['CR verified', 'VAT inclusive', 'Maroof ready', 'Fast support'],
  utilityMessage: 'Mid-season offers now live with express checkout and Saudi-ready trust cues.',
  nav: ['Shop', 'New Arrivals', 'Deals', 'Categories', 'Brands', 'About', 'Support'],
  footerGroups: [
    { title: 'Shop', links: ['New arrivals', 'Deals', 'Gift cards', 'Brands'] },
    { title: 'Customer care', links: ['Help center', 'Delivery', 'Returns', 'Contact'] },
    { title: 'About', links: ['About us', 'Our story', 'Press', 'Careers'] },
    { title: 'Legal', links: ['Privacy policy', 'Terms', 'Returns policy', 'Payment policy'] },
  ],
  support: {
    email: 'support@atlascommerce.demo',
    phone: '+966 11 000 0000',
    whatsapp: '+966 50 000 0000',
  },
}

export const campaigns = [
  {
    slug: 'summer-edit',
    title: 'Summer Edit',
    subtitle: 'Light layers, fast delivery, and wardrobe refresh bundles.',
    body: 'A promotional landing page showing how the system adapts campaign storytelling without breaking the shared layout engine.',
  },
  {
    slug: 'tech-week',
    title: 'Tech Week',
    subtitle: 'Audio, gaming, and work-from-home essentials with stacked offers.',
    body: 'A campaign surface blending urgency, category merchandising, and cross-sell blocks.',
  },
]

export const faqs = [
  {
    category: 'Orders',
    items: [
      {
        question: 'How long does delivery take?',
        answer: 'Most metro orders arrive within one to two business days, with same-day windows for eligible items.',
      },
      {
        question: 'Can I change my order after placing it?',
        answer: 'You can edit address details and cancel eligible lines before packing begins.',
      },
    ],
  },
  {
    category: 'Returns',
    items: [
      {
        question: 'How do returns work?',
        answer: 'Returns can be requested from the account portal or support center, with status updates shared by email and WhatsApp.',
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refund timing depends on payment method, but most card reversals appear within five to seven business days.',
      },
    ],
  },
]

export const legalDocuments = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    body: 'This demo legal page shows how dense legal content can sit inside the unified layout without needing a custom template. Customer data, transaction data, and consent preferences are handled according to merchant and platform policy.',
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    body: 'By using this storefront demo, shoppers can browse, add to cart, and complete sample checkout journeys. Pricing, inventory, and promotions are illustrative and merchant-configurable.',
  },
  {
    slug: 'returns-policy',
    title: 'Returns Policy',
    body: 'Eligible products may be returned within the stated merchant window, subject to product condition and campaign-specific exclusions. Support and account pages expose the request entry points.',
  },
]

export const supportLocations = [
  { city: 'Riyadh', address: 'King Fahd Road, Digital Retail Tower', hours: '9 AM - 9 PM' },
  { city: 'Jeddah', address: 'Corniche Retail District, Unit 12', hours: '10 AM - 10 PM' },
  { city: 'Dammam', address: 'Prince Mohammed Bin Fahd Street', hours: '9 AM - 8 PM' },
]

export const addresses = [
  { id: 'addr-1', name: 'Home', line1: 'Al Olaya District', city: 'Riyadh', phone: '+966 55 111 2222' },
  { id: 'addr-2', name: 'Office', line1: 'Corniche Road', city: 'Jeddah', phone: '+966 55 333 4444' },
]

export const paymentMethods = [
  { id: 'pm-1', label: 'mada ending 4431', type: 'mada', default: true },
  { id: 'pm-2', label: 'Visa ending 1204', type: 'card', default: false },
  { id: 'pm-3', label: 'Apple Pay', type: 'wallet', default: false },
]

export const orderHistory = [
  {
    id: 'ORD-24018',
    status: 'In transit',
    total: 189.5,
    placedAt: '2026-07-21',
    eta: 'Tomorrow by 6 PM',
    items: [products[0], products[3]],
  },
  {
    id: 'ORD-23911',
    status: 'Delivered',
    total: 364.0,
    placedAt: '2026-07-13',
    eta: 'Delivered on 2026-07-15',
    items: [products[6], products[9]],
  },
  {
    id: 'ORD-23552',
    status: 'Delivered',
    total: 84.49,
    placedAt: '2026-06-28',
    eta: 'Delivered on 2026-06-30',
    items: [products[1], products[8]],
  },
]

export function getCategoryBySlug(categorySlug) {
  const category = categoryTree.find((item) => item.slug === categorySlug)

  if (category) {
    return category
  }

  const fallbackProducts = products.filter((product) => product.categorySlug === categorySlug)

  if (fallbackProducts.length > 0) {
    return {
      slug: categorySlug,
      name: fallbackProducts[0].category,
      children: fallbackProducts.slice(0, 4).map((product) => product.title),
    }
  }

  return null
}

export function getCampaignBySlug(campaignSlug) {
  return campaigns.find((campaign) => campaign.slug === campaignSlug) ?? null
}

export function getLegalDocumentBySlug(documentSlug) {
  return legalDocuments.find((document) => document.slug === documentSlug) ?? null
}

export function getProductBySlug(productSlug) {
  return productLookup[productSlug] ?? null
}

export function getOrderById(orderId) {
  return orderHistory.find((order) => order.id === orderId) ?? null
}

export function getProductsForCategory(categorySlug) {
  const normalized = categorySlug.toLowerCase()

  return products.filter(
    (product) =>
      product.categorySlug === normalized || slugify(product.category) === normalized || slugify(product.title).includes(normalized),
  )
}

export function searchProducts(query) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return products
  }

  return products.filter((product) =>
    [product.title, product.category, product.description, product.seller, ...product.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalized),
  )
}

export function getFeaturedProducts(count = 4) {
  return products.slice(0, count)
}

export function getRecommendedProducts(excludeSlug, count = 4) {
  return products.filter((product) => product.slug !== excludeSlug).slice(0, count)
}

export function getRecentlyViewedFallback() {
  return products.slice(4, 8)
}

export function formatDateLabel(value) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
}
