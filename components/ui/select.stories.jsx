import { Select } from './select'
import { StorybookStorefrontShell } from '../storefront/storybook-shell'

export default {
  title: 'UI/Select',
  component: Select,
}

export const Default = {
  render: () => (
    <StorybookStorefrontShell className="min-h-0">
      <div className="max-w-xs">
        <Select defaultValue="featured">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </Select>
      </div>
    </StorybookStorefrontShell>
  ),
}
