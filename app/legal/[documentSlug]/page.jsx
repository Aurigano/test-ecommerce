import { StorefrontRoutePage } from '../../../components/storefront/storefront-route-page'

export default async function LegalPage({ params }) {
  return <StorefrontRoutePage templateId="legal_document" routeParams={await params} />
}
