import { Button } from './button'
import { StorybookStorefrontShell } from '../storefront/storybook-shell'

export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
}

export const Variants = {
  render: () => (
    <StorybookStorefrontShell className="min-h-0">
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </StorybookStorefrontShell>
  ),
}
