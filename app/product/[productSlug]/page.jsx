import { StorefrontRoutePage } from '../../../components/storefront/storefront-route-page'

export default async function ProductPage({ params }) {
  return <StorefrontRoutePage templateId="pdp_standard_layout" routeParams={await params} />
}

