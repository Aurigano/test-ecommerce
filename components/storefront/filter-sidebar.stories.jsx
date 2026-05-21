import { StorybookStorefrontShell } from './storybook-shell'
import { FilterSidebar } from './filter-sidebar'

export default {
  title: 'Storefront/Filter Sidebar',
  component: FilterSidebar,
}

export const Default = {
  render: () => (
    <StorybookStorefrontShell className="min-h-0">
      <div className="max-w-sm">
        <FilterSidebar />
      </div>
    </StorybookStorefrontShell>
  ),
}
