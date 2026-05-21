import { Input } from './input'
import { StorybookStorefrontShell } from '../storefront/storybook-shell'

export default {
  title: 'UI/Input',
  component: Input,
}

export const Default = {
  render: () => (
    <StorybookStorefrontShell className="min-h-0">
      <div className="max-w-md">
        <Input placeholder="Search products, brands, or categories" />
      </div>
    </StorybookStorefrontShell>
  ),
}
