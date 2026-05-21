import { useState } from 'react'
import { StorybookStorefrontShell } from './storybook-shell'
import { ProductToolbar } from './product-toolbar'

export default {
  title: 'Storefront/Product Toolbar',
  component: ProductToolbar,
}

export const Default = {
  render: () => {
    const [query, setQuery] = useState('')
    const [sortBy, setSortBy] = useState('featured')

    return (
      <StorybookStorefrontShell className="min-h-0">
        <ProductToolbar query={query} onQueryChange={setQuery} sortBy={sortBy} onSortChange={setSortBy} />
      </StorybookStorefrontShell>
    )
  },
}
