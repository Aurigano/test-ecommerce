import { products } from '../../src/data/products'
import { StorybookStorefrontShell } from './storybook-shell'
import { StorefrontHero } from './storefront-hero'

export default {
  title: 'Storefront/Hero',
  component: StorefrontHero,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  render: () => (
    <StorybookStorefrontShell>
      <StorefrontHero
        heroTitle="One configurable storefront surface for trust, product discovery, and stronger conversion."
        heroBody="Designed for KSA commerce teams with branded theming, compliant trust cues, and product presentation that can scale across client storefronts."
        heroCta="Explore the catalog"
        secondaryCta="Review checkout"
        trustBadges={['CR visible', 'VAT clarity', 'Maroof ready', 'WhatsApp support']}
        featuredProducts={products.slice(0, 3)}
      />
    </StorybookStorefrontShell>
  ),
}
