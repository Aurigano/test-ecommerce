import { StorybookStorefrontShell } from './storybook-shell'
import { StorefrontInsightGrid } from './storefront-insight-grid'

export default {
  title: 'Storefront/Insight Grid',
  component: StorefrontInsightGrid,
}

export const Default = {
  render: () => (
    <StorybookStorefrontShell className="min-h-0">
      <StorefrontInsightGrid
        items={[
          ['Compliance visibility', 'CR, VAT, and returns cues stay above the fold and inside the product journey.'],
          ['Localized payments', 'Apple Pay, mada, and BNPL placement can be tuned per storefront or campaign.'],
          ['Merchandising rhythm', 'Editorial hero composition pairs with dense, searchable product discovery below.'],
          ['SaaS configurability', 'Theme tokens are ready for backend-driven logo, color, and content controls.'],
        ]}
      />
    </StorybookStorefrontShell>
  ),
}
