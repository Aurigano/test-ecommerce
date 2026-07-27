import { campaigns, categoryTree, legalDocuments, orderHistory, products } from './demo-data'

export const routeGroups = [
  'Discovery and marketing',
  'Cart and checkout',
  'Account',
  'Support and legal',
  'Auth',
]

export const storefrontRoutes = [
  {
    group: 'Discovery and marketing',
    label: 'Homepage',
    pattern: '/',
    examples: ['/'],
  },
  {
    group: 'Discovery and marketing',
    label: 'Shop listing',
    pattern: '/shop',
    examples: ['/shop'],
  },
  {
    group: 'Discovery and marketing',
    label: 'Search results',
    pattern: '/search',
    examples: ['/search?q=headphones'],
    notes: 'Query parameter driven listing surface',
  },
  {
    group: 'Discovery and marketing',
    label: 'Category page',
    pattern: '/c/[categorySlug]',
    examples: categoryTree.map((item) => `/c/${item.slug}`),
  },
  {
    group: 'Discovery and marketing',
    label: 'Product detail page',
    pattern: '/product/[productSlug]',
    examples: products.slice(0, 5).map((product) => `/product/${product.slug}`),
  },
  {
    group: 'Discovery and marketing',
    label: 'Deals hub',
    pattern: '/deals',
    examples: ['/deals'],
  },
  {
    group: 'Discovery and marketing',
    label: 'Campaign landing page',
    pattern: '/campaign/[campaignSlug]',
    examples: campaigns.map((campaign) => `/campaign/${campaign.slug}`),
  },
  {
    group: 'Discovery and marketing',
    label: 'Human sitemap',
    pattern: '/sitemap',
    examples: ['/sitemap'],
  },
  {
    group: 'Cart and checkout',
    label: 'Cart',
    pattern: '/cart',
    examples: ['/cart'],
  },
  {
    group: 'Cart and checkout',
    label: 'Checkout',
    pattern: '/checkout',
    examples: ['/checkout'],
  },
  {
    group: 'Cart and checkout',
    label: 'Checkout success',
    pattern: '/checkout/success',
    examples: ['/checkout/success'],
  },
  {
    group: 'Account',
    label: 'Account dashboard',
    pattern: '/account',
    examples: ['/account'],
  },
  {
    group: 'Account',
    label: 'Order history',
    pattern: '/account/orders',
    examples: ['/account/orders'],
  },
  {
    group: 'Account',
    label: 'Order detail',
    pattern: '/account/orders/[orderId]',
    examples: orderHistory.map((order) => `/account/orders/${order.id}`),
  },
  {
    group: 'Account',
    label: 'Address book',
    pattern: '/account/addresses',
    examples: ['/account/addresses'],
  },
  {
    group: 'Account',
    label: 'Saved payments',
    pattern: '/account/payments',
    examples: ['/account/payments'],
  },
  {
    group: 'Account',
    label: 'Wishlist',
    pattern: '/account/wishlist',
    examples: ['/account/wishlist'],
  },
  {
    group: 'Account',
    label: 'Profile settings',
    pattern: '/account/profile',
    examples: ['/account/profile'],
  },
  {
    group: 'Support and legal',
    label: 'About page',
    pattern: '/about',
    examples: ['/about'],
  },
  {
    group: 'Support and legal',
    label: 'Contact support',
    pattern: '/contact',
    examples: ['/contact'],
  },
  {
    group: 'Support and legal',
    label: 'Help center',
    pattern: '/help',
    examples: ['/help'],
  },
  {
    group: 'Support and legal',
    label: 'Legal documents',
    pattern: '/legal/[documentSlug]',
    examples: legalDocuments.map((document) => `/legal/${document.slug}`),
  },
  {
    group: 'Auth',
    label: 'Login',
    pattern: '/login',
    examples: ['/login'],
  },
  {
    group: 'Auth',
    label: 'Register',
    pattern: '/register',
    examples: ['/register'],
  },
  {
    group: 'Auth',
    label: 'Forgot password',
    pattern: '/forgot-password',
    examples: ['/forgot-password'],
  },
]

export const storefrontRoutesByGroup = routeGroups.map((group) => ({
  group,
  entries: storefrontRoutes.filter((route) => route.group === group),
}))
