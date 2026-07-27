'use client'

import { Component } from 'react'
import { cn } from '../../lib/utils'

class RegionErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="store-card store-muted-card">
          <p className="store-section-kicker">Recovered region</p>
          <h3 className="store-section-title">This block failed quietly.</h3>
          <p className="store-copy">The surrounding storefront stayed intact so the core journey can continue.</p>
        </div>
      )
    }

    return this.props.children
  }
}

function Region({ children, className }) {
  return (
    <RegionErrorBoundary>
      <div className={cn('flex min-w-0 flex-col gap-5', className)}>{children}</div>
    </RegionErrorBoundary>
  )
}

export function StorefrontLayoutManager({
  direction = 'ltr',
  routeTemplateId,
  merchantConfig,
  header,
  leftContent,
  mainContent,
  rightContent,
  bottomContent,
  footer,
  overlays,
}) {
  const leftCount = leftContent.length
  const rightCount = rightContent.length

  let middleTemplate = 'minmax(0, 1fr)'

  if (leftCount > 0 && rightCount > 0) {
    middleTemplate = 'minmax(220px, 20%) minmax(0, 60%) minmax(220px, 20%)'
  } else if (leftCount > 0) {
    middleTemplate = 'minmax(220px, 20%) minmax(0, 80%)'
  } else if (rightCount > 0) {
    middleTemplate = 'minmax(0, 80%) minmax(220px, 20%)'
  }

  return (
    <div dir={direction} className="storefront-runtime">
      <div className="storefront-chrome">
        <div className="storefront-container">
          <div className="storefront-template-meta">
            <span>{merchantConfig.brandName}</span>
            <span>{routeTemplateId}</span>
            <span>{direction.toUpperCase()}</span>
          </div>

          <Region className="storefront-header-region">{header}</Region>

          <section className="storefront-middle-region" style={{ gridTemplateColumns: middleTemplate }}>
            {leftCount > 0 ? <Region className="storefront-side-region">{leftContent}</Region> : null}
            <Region className="storefront-main-region">{mainContent}</Region>
            {rightCount > 0 ? <Region className="storefront-side-region">{rightContent}</Region> : null}
          </section>

          {bottomContent.length > 0 ? (
            <Region className="storefront-bottom-region">{bottomContent}</Region>
          ) : null}

          <Region className="storefront-footer-region">{footer}</Region>
        </div>
      </div>

      <div className="storefront-overlay-layer">{overlays}</div>
    </div>
  )
}
