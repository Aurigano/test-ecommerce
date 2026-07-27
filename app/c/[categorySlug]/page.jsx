import { StorefrontRoutePage } from '../../../components/storefront/storefront-route-page'

export default async function CategoryPage({ params, searchParams }) {
  return (
    <StorefrontRoutePage
      templateId="category_tree"
      routeParams={await params}
      routeSearchParams={await searchParams}
    />
  )
}

