import { StorefrontRoutePage } from '../../components/storefront/storefront-route-page'

export default async function ShopPage({ searchParams }) {
  return <StorefrontRoutePage templateId="plp_search" routeSearchParams={await searchParams} />
}

