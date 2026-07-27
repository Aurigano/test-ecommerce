import { StorefrontRoutePage } from '../../../components/storefront/storefront-route-page'

export default async function CampaignPage({ params }) {
  return <StorefrontRoutePage templateId="campaign_landing" routeParams={await params} />
}

