import { StorefrontRoutePage } from '../../components/storefront/storefront-route-page'

export default async function SearchPage({ searchParams }) {
  return <StorefrontRoutePage templateId="plp_search" routeSearchParams={await searchParams} />
}

