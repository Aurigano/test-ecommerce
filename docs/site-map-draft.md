# ECommerce SaaS Demo Shell Site Map Draft

## Purpose

This draft translates the unified layout architecture and page registry into a practical site map for this repo.

Working assumption:
- This product is a SaaS demo shell for multiple merchant themes.
- The page system is runtime-configured through JSON page templates.
- Merchant branding, content modules, navigation, and merchandising are configurable.
- The default demo should feel like a production-ready storefront, not a generic component lab.

## Core Assumptions

These assumptions are intentionally opinionated so we can keep moving:

- Launch locales: English and Arabic
- Direction support: LTR and RTL from the same layout engine
- Default currency: SAR with optional multi-currency selector
- Checkout model: guest checkout allowed, account creation offered after purchase
- Product domains in demo catalog: fashion, electronics, home, beauty, sports
- Search model: global search with autocomplete, category-aware search results
- Theme model: one shared component system, multiple merchant theme tokens
- Merchant model: each merchant controls branding, category tree, homepage modules, promos, trust blocks, footer content, and campaign pages
- Customer account model: standard self-service portal included
- Support model: FAQ, contact, legal, and order tracking available

## Layout System

Every major page maps to the 6-region engine from the architecture doc:

1. Header
2. Left Content
3. Main Content
4. Right Content
5. Bottom Content
6. Footer

Global overlays sit outside the normal flow:

- mobile bottom navigation
- mini cart drawer
- search autocomplete layer
- toast notifications
- newsletter popup
- exit intent popup
- live chat widget
- live purchase notifications
- size guide modal
- review submission modal

## SaaS Config Ownership

These should be merchant-configurable in runtime JSON or admin settings:

- brand name
- logo
- theme tokens
- typography presets
- announcement bar messages
- language availability
- currency availability
- top navigation structure
- mega menu category tree
- homepage region composition
- campaign landing page composition
- featured collections
- flash sale schedules
- recommendation rules
- newsletter blocks
- trust badges
- footer column content
- legal links
- support content
- live chat availability
- popup enablement rules

These should stay platform-controlled:

- page template registry
- layout manager behavior
- region collapsing rules
- RTL mirroring logic
- auth and checkout guardrails
- error boundaries
- analytics event schema
- accessibility baseline
- performance budgets

## Global Navigation Draft

Primary header navigation:

- Shop
- New Arrivals
- Deals
- Categories
- Brands
- About
- Support

Header utility actions:

- Language
- Currency
- Account
- Wishlist
- Cart

Footer navigation groups:

- Shop
- Customer Care
- About
- Legal
- Social

## Category Tree Draft

Top-level categories:

- Women
- Men
- Electronics
- Home
- Beauty
- Kids
- Sports
- Sale

Example second-level categories:

- Women: Dresses, Tops, Shoes, Bags
- Men: Shirts, Trousers, Shoes, Watches
- Electronics: Audio, Mobile, Laptops, Accessories
- Home: Decor, Kitchen, Bedding, Lighting
- Beauty: Skincare, Makeup, Haircare, Wellness
- Kids: Clothing, Toys, School
- Sports: Activewear, Training, Outdoor

## Route Map

### Discovery and Marketing

| Template ID | Page | Route |
| --- | --- | --- |
| `homepage_default` | Storefront Homepage | `/` |
| `category_tree` | Category Listing / Tree | `/c/[categorySlug]` |
| `plp_search` | Product Listing Page | `/shop` |
| `plp_search` | Search Results | `/search` |
| `pdp_standard_layout` | Product Detail Page | `/product/[productSlug]` |
| `offers_hub` | Special Offers / Clearance Hub | `/deals` |
| `campaign_landing` | Campaign / Promotional Landing Page | `/campaign/[campaignSlug]` |

### Cart and Transactional

| Template ID | Page | Route |
| --- | --- | --- |
| `cart_full` | Shopping Cart | `/cart` |
| `checkout_gateway` | Checkout | `/checkout` |
| `order_confirmation` | Order Confirmation | `/checkout/success` |

### Customer Portal

| Template ID | Page | Route |
| --- | --- | --- |
| `account_dashboard` | Account Dashboard Overview | `/account` |
| `order_history` | Order History / Order List | `/account/orders` |
| `order_tracking_detail` | Order Tracking and Details | `/account/orders/[orderId]` |
| `address_book` | Address Book Management | `/account/addresses` |
| `payment_methods` | Payment Methods Portal | `/account/payments` |
| `wishlist_hub` | Wishlist / Saved Items | `/account/wishlist` |
| `profile_settings` | Profile Settings / Account Security | `/account/profile` |

### Institutional and Support

| Template ID | Page | Route |
| --- | --- | --- |
| `about_editorial` | About Us | `/about` |
| `contact_support` | Contact Us / Support Portal | `/contact` |
| `faq_help_center` | FAQ / Help Center | `/help` |
| `legal_document` | Legal Disclosures | `/legal/[documentSlug]` |

### Supporting Auth Pages

These are not explicitly part of the 20-page registry, but they are required for the live product:

| Page | Route |
| --- | --- |
| Login | `/login` |
| Register | `/register` |
| Forgot Password | `/forgot-password` |

## Page Drafts

## 1. Storefront Homepage

- Route: `/`
- Goal: introduce the merchant brand, drive discovery, and push users into category or product paths
- Header: announcement bar, main nav, sticky header, mega menu
- Left Content: category sidebar
- Main Content: hero banner, featured product grid, brand proof, testimonials
- Right Content: urgency card, newsletter signup
- Bottom Content: recommendations, recently viewed, trust badges
- Footer: full merchant footer

## 2. Category Listing / Tree

- Route: `/c/[categorySlug]`
- Goal: browse category hierarchy before filtering deeply
- Header: standard navigation
- Left Content: nested category tree
- Main Content: breadcrumbs, subcategory grid, sort, product grid
- Right Content: collapsed
- Bottom Content: recommendations, recently viewed
- Footer: full merchant footer

## 3. Product Listing Page / Search Results

- Route: `/shop` and `/search`
- Goal: help users refine large product sets quickly
- Header: announcement bar and standard nav
- Left Content: filters and category navigation
- Main Content: breadcrumbs, search results summary, sort, grid or list, loading states, pagination or infinite scroll
- Right Content: comparison tracker and stock scarcity widgets
- Bottom Content: recommendations and recently viewed
- Footer: full merchant footer

## 4. Product Detail Page

- Route: `/product/[productSlug]`
- Goal: convert interest into add-to-cart with high trust and clarity
- Header: standard navigation
- Left Content: gallery, 360 viewer, video
- Main Content: breadcrumbs, badges, title, price, SKU, variants, quantity, tabs, reviews, questions, customer media
- Right Content: stock, shipping estimator, bundles, complete-the-look, wishlist, share
- Bottom Content: comparison table and recommendations
- Footer: full merchant footer

## 5. Special Offers / Clearance Hub

- Route: `/deals`
- Goal: aggregate urgency-driven products and promotions
- Header: announcement bar and nav
- Left Content: filters and category navigation
- Main Content: flash sale banner, countdown, sale product grid, pagination
- Right Content: scarcity messages and promo hints
- Bottom Content: bundle builder and trust badges
- Footer: full merchant footer

## 6. Campaign / Promotional Landing Page

- Route: `/campaign/[campaignSlug]`
- Goal: support acquisition campaigns with focused storytelling and conversion
- Header: condensed navigation variant
- Left Content: collapsed
- Main Content: immersive hero, countdown, campaign product grid, testimonials
- Right Content: social proof and newsletter gate
- Bottom Content: complete-the-look and recommendations
- Footer: full merchant footer

## 7. Shopping Cart

- Route: `/cart`
- Goal: help users review items and proceed cleanly to checkout
- Header: standard navigation
- Left Content: collapsed
- Main Content: full cart view, cart items, empty state, saved for later
- Right Content: order summary, promo code, express checkout, gift options, trust badges
- Bottom Content: free shipping progress, recommendations, recently viewed
- Footer: full merchant footer

## 8. Checkout

- Route: `/checkout`
- Goal: complete payment with minimal distraction
- Header: condensed checkout header
- Left Content: collapsed
- Main Content: progress indicator, address form, autocomplete, payment selector, payment form
- Right Content: order summary, promo verification, trust badges
- Bottom Content: secure transaction and legal disclaimer row
- Footer: condensed legal footer

## 9. Order Confirmation

- Route: `/checkout/success`
- Goal: confirm purchase, set expectations, and encourage account activation
- Header: standard navigation
- Left Content: collapsed
- Main Content: receipt, order details, fulfillment expectations, tracking links
- Right Content: post-purchase account registration prompt
- Bottom Content: recommendations
- Footer: full merchant footer

## 10. Account Dashboard Overview

- Route: `/account`
- Goal: give customers a quick control center
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: profile summary cards and recent order status
- Right Content: collapsed
- Bottom Content: recommendations and recently viewed
- Footer: full merchant footer

## 11. Order History

- Route: `/account/orders`
- Goal: list all orders with clear reorder and drill-down actions
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: order list grid with statuses, invoices, reorder actions
- Right Content: collapsed
- Bottom Content: recommendations
- Footer: full merchant footer

## 12. Order Tracking and Details

- Route: `/account/orders/[orderId]`
- Goal: show fulfillment progress and order breakdown
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: shipment tracker, order item breakdowns, inline review prompts
- Right Content: collapsed
- Bottom Content: recommendations
- Footer: full merchant footer

## 13. Address Book Management

- Route: `/account/addresses`
- Goal: manage saved delivery addresses
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: saved address cards with add and edit flows
- Right Content: collapsed
- Bottom Content: trust badges
- Footer: full merchant footer

## 14. Payment Methods Portal

- Route: `/account/payments`
- Goal: manage stored payment options securely
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: saved payment methods, add card flow, default selection
- Right Content: collapsed
- Bottom Content: trust badges
- Footer: full merchant footer

## 15. Wishlist / Saved Items Hub

- Route: `/account/wishlist`
- Goal: let users curate and revisit products
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: saved product grid with active wishlist state
- Right Content: collapsed
- Bottom Content: recommendations
- Footer: full merchant footer

## 16. Profile Settings / Account Security

- Route: `/account/profile`
- Goal: let customers manage identity and account preferences
- Header: standard navigation
- Left Content: portal navigation tree
- Main Content: profile forms, password update, language preference, security preferences
- Right Content: collapsed
- Bottom Content: collapsed
- Footer: full merchant footer

## 17. About Us

- Route: `/about`
- Goal: build trust and communicate merchant story
- Header: standard navigation
- Left Content: collapsed
- Main Content: editorial brand story, press mentions, testimonials
- Right Content: newsletter signup
- Bottom Content: recommendations
- Footer: full merchant footer

## 18. Contact Us / Support Portal

- Route: `/contact`
- Goal: give customers fast access to support and store information
- Header: standard navigation
- Left Content: collapsed
- Main Content: contact form, store directory cards, interactive map
- Right Content: live chat widget anchor
- Bottom Content: trust badges and recently viewed
- Footer: full merchant footer

## 19. FAQ / Help Center

- Route: `/help`
- Goal: reduce support load through searchable knowledge
- Header: standard navigation
- Left Content: help category navigation
- Main Content: help search, accordion answers, policy content
- Right Content: support CTA panel
- Bottom Content: recommendations
- Footer: full merchant footer

## 20. Legal Disclosures

- Route: `/legal/[documentSlug]`
- Goal: provide compliant legal content in a stable template
- Header: standard navigation
- Left Content: legal document index
- Main Content: dense legal content layout
- Right Content: collapsed
- Bottom Content: collapsed
- Footer: full merchant footer

## Merchant Theme Variants

Each merchant theme should reuse the same page templates and component registry, while changing:

- color tokens
- typography tokens
- imagery style
- corner radius
- border density
- elevation style
- banner treatment
- merchandising emphasis

Suggested demo themes:

- Fashion Editorial
- Modern Electronics
- Home and Living Marketplace

## Build Order Draft

Suggested implementation order:

1. layout manager and region engine
2. global header, footer, overlays
3. homepage, category page, PLP
4. PDP
5. cart and checkout
6. account dashboard, orders, wishlist
7. support and legal pages
8. campaign and offers templates
9. merchant theme token packs
10. runtime JSON page registry integration

## Open Questions For Later

These can wait until after the first draft implementation:

- exact merchant admin UI for page composition
- category depth limits
- recommendation engine source
- whether campaign pages can override header and footer variants fully
- whether support content is CMS-driven or static at launch
- whether saved payment methods are supported in all markets
