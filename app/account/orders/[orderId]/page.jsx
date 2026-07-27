import { StorefrontRoutePage } from '../../../../components/storefront/storefront-route-page'

export default async function OrderDetailsPage({ params }) {
  return <StorefrontRoutePage templateId="order_tracking_detail" routeParams={await params} />
}

