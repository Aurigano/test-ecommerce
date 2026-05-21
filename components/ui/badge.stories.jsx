import { Badge } from './badge'
import { StorybookStorefrontShell } from '../storefront/storybook-shell'

export default {
  title: 'UI/Badge',
  component: Badge,
}

export const Variants = {
  render: () => (
    <StorybookStorefrontShell className="min-h-0">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </StorybookStorefrontShell>
  ),
}
