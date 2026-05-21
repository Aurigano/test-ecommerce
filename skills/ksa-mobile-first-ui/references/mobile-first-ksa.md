# Mobile-First Ecommerce Guide for KSA

Source basis:
- `/Users/arindc-blrm24/Downloads/Mobile_First_Ecommerce_Guide_KSA.pdf`
- Extracted for project use on May 9, 2026

## Core Principles

- Build mobile-first. Saudi ecommerce is smartphone-dominant.
- Build Arabic-first with bilingual RTL/LTR from day one.
- Treat KSA compliance and trust UI as product requirements, not footer afterthoughts.
- Use one themeable component library. Fashion, Electronics, and General Retail should mostly differ by tokens and a few category-specific modules.

## Three Critical Journeys

### Discovery

- Home
- Category landing
- PLP
- Search results
- PDP

### Conversion

- Cart
- Checkout
- Payment
- Order confirmation with ZATCA invoice

### Retention

- Account dashboard
- Order history
- Order tracking
- Returns
- Wishlist

## KSA UI Requirements

- Prominent payment options:
  - Apple Pay
  - mada
  - Tabby
  - Tamara
  - STC Pay
  - Visa/Mastercard
  - COD with fee transparency
- ZATCA-compliant invoice download with QR code on confirmation
- National Address field and validation in checkout/address flows
- Maroof verified merchant badge/link
- Article 6/7 trust disclosures:
  - CR number
  - VAT number
  - merchant address
  - VAT-inclusive prices
  - visible 7-day return rights

## RTL Rules

### Mirror in RTL

- page layout
- nav structure
- breadcrumbs
- tabs
- carousels
- pagination
- steppers
- directional icons

### Do Not Mirror

- brand logos
- product imagery
- numbers
- prices
- phone numbers
- media controls
- clocks
- maps

### Typography Guidance

- Arabic primary font guidance from the source:
  - IBM Plex Sans Arabic recommended
  - Tajawal/Cairo/Noto Sans Arabic acceptable alternatives
- Use larger Arabic line-height
- Do not add letter-spacing in Arabic
- Avoid italic and all-caps for Arabic

## Theme System

### Shared System

- common layout architecture
- common components
- tokenized color/type/radius/density

### Theme Differences

- Fashion:
  - softer radii
  - more editorial imagery
  - size guide modules
- Electronics:
  - tighter density
  - more comparison/spec modules
  - more utilitarian cards/tables
- General Retail:
  - balanced defaults

## Mobile Shell Rules

- Keep hero at or under roughly 60% viewport on mobile
- Bottom nav can be used for core destinations:
  - Home
  - Categories
  - Search
  - Wishlist
  - Account
- Sticky bottom CTAs matter on mobile
- Minimum touch target: `44x44`
- Prefer bottom sheets/drawers for filters and quick actions

## Page Patterns

### Homepage

- strong mobile-first hero
- fast LCP
- immediate category/store discovery
- trust visible without scrolling too far

### PLP

- sticky filter/sort bar
- bottom-sheet filtering
- easy scan density
- image-first cards

### PDP

- edge-to-edge image gallery
- sticky add-to-cart after buy box scrolls away
- payment snippets under price
- trust chips:
  - returns
  - Maroof
  - delivery

### Cart

- slide-up drawer or compact mobile pattern preferred
- sticky checkout CTA
- payment promo widget near totals

### Checkout

- single-page or at most 3 steps
- guest checkout prominent
- Apple Pay express first
- National Address field
- transparent totals:
  - VAT
  - delivery
  - COD fee
- trust strip near submission

### Confirmation

- strong success state
- invoice/QR visibility
- payment confirmation
- next steps for tracking/support

### Account / Returns

- card-based menu/dashboard
- reorder and return actions easy to reach
- WhatsApp support/tracking should feel primary

## Component Inventory to Reuse

### Navigation

- sticky top app bar
- mobile bottom nav
- hamburger/drawer for category tree and language

### Commerce

- product card
- badge/chip
- price block
- quantity stepper
- sticky add-to-cart bar
- payment method widgets
- trust strip

### Forms

- 56px mobile inputs
- clear states and inline validation
- National Address masked input
- OTP-friendly patterns for future auth/account work

### States

- skeletons
- empty states with clear CTA
- error/retry patterns

## Payment Ordering

Use this order when presenting methods:

1. Apple Pay
2. mada
3. Tabby
4. Tamara
5. STC Pay
6. Visa/Mastercard
7. COD

## Trust Pattern Rules

- Trust beats novelty for this market.
- Show CR/VAT/Maroof/refund policy clearly.
- Keep 7-day returns visible on PDP, cart, and checkout.
- Keep WhatsApp surfaced as a real support path.

## Modern Differentiators to Add Later

- AR / 3D viewers
- voice search
- visual search
- WhatsApp commerce
- AI recommendations
- social commerce hooks

These are differentiators, not substitutes for the core KSA checkout and trust model.

## Immediate Build Priorities for Future Pages

When in doubt, prioritize:

1. Discovery to PDP to cart
2. Checkout completion
3. Account, orders, returns
4. Trust/compliance visibility
5. Theme refinement after journey usability is solid
