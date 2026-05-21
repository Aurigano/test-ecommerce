---
name: ksa-mobile-first-ui
description: Use when designing or implementing storefront, checkout, account, or trust/compliance pages for the KSA/GCC ecommerce platform. Applies mobile-first, Arabic-first, RTL-aware, KSA-compliance-first UI rules for discovery, conversion, and retention journeys. Trigger for homepage, PLP, PDP, cart, checkout, account, login/register, returns, trust pages, and theme/system decisions for Fashion, Electronics, and General Retail.
---

# KSA Mobile-First UI

Use this skill whenever we are building customer-facing ecommerce pages for this business.

## What This Skill Optimizes For

- Mobile-first layouts before desktop refinement
- Arabic-first and RTL-safe UI decisions
- KSA trust/compliance visibility in the interface
- Fast discovery, low-friction checkout, strong post-purchase support
- A single reusable component system with theme variation by tokens, not separate codepaths

## Start Here

Before building or revising a page:

1. Identify the journey:
   - `Discovery`: home, category, search, PLP, PDP
   - `Conversion`: cart, checkout, payment, confirmation
   - `Retention`: account, order tracking, returns, wishlist
2. Read [references/mobile-first-ksa.md](references/mobile-first-ksa.md).
3. Apply the relevant page and component rules from that reference before making UI decisions.

## Non-Negotiables

- Default to mobile-first composition and thumb-zone CTAs.
- Keep Arabic/RTL support as a first-class layout concern, not a late flip.
- Preserve explicit KSA trust markers:
  - CR number
  - VAT number
  - VAT-inclusive pricing
  - Maroof badge/link
  - return policy visibility
- Prioritize KSA payment methods in UI order.
- Treat National Address support as a required checkout/system capability.

## Design Workflow

When implementing a page:

1. Choose the journey and page type from the reference.
2. Apply the mobile shell rules first:
   - top bar
   - bottom navigation where appropriate
   - sticky bottom CTA patterns
3. Add KSA trust/compliance elements early instead of retrofitting them.
4. Ensure RTL/LTR behavior is correct for navigation, icons, prices, numbers, and mixed-language content.
5. Use theme tokens for Fashion, Electronics, or General Retail; do not fork core flows unless the reference explicitly calls for category-specific modules.

## Implementation Guidance

- Prefer one shared component library with token/theme overrides.
- For future Tailwind work, use logical properties and direction-safe spacing/alignment.
- For future auth/account flows, remember the guide prefers phone-first OTP for KSA even if interim pages use email-first.
- For PDP and checkout work, sticky bottom actions are a feature, not decoration.
- For support/returns/account experiences, WhatsApp should be treated as a primary support path.

## Output Standard

When you build future pages using this skill, aim for:

- fast mobile scanning
- clear trust and payment visibility
- strong Arabic/English resilience
- minimal checkout friction
- consistent omnichannel credibility

If a requested design conflicts with the reference, follow the reference unless the user explicitly overrides it.
