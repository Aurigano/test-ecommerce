import { useState } from 'react'
import { StorybookStorefrontShell } from './storybook-shell'
import { CategoryRail } from './category-rail'

export default {
  title: 'Storefront/Category Rail',
  component: CategoryRail,
}

export const Default = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('All')

    return (
      <StorybookStorefrontShell className="min-h-0">
        <CategoryRail
          categories={['All', 'Audio', 'Home', 'Electronics', 'Fashion', 'Beauty']}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </StorybookStorefrontShell>
    )
  },
}
