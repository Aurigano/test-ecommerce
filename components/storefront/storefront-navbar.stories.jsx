import { useState } from 'react'
import { storefrontThemes } from '../../src/theme/storefront-theme'
import { StorybookStorefrontShell } from './storybook-shell'
import { StorefrontNavbar } from './storefront-navbar'

export default {
  title: 'Storefront/Navbar',
  component: StorefrontNavbar,
}

export const Default = {
  render: () => {
    const [themeId, setThemeId] = useState('classic')
    const themeOptions = Object.values(storefrontThemes)
    const currentTheme = storefrontThemes[themeId]

    return (
      <StorybookStorefrontShell themeId={themeId} className="min-h-0">
        <StorefrontNavbar
          brandName="Atlas Commerce"
          eyebrow="Storefront shell"
          currentThemeLabel={currentTheme.label}
          showThemeSwitcher
          themeLabel="Theme preset"
          themeId={themeId}
          themeOptions={themeOptions}
          onThemeChange={setThemeId}
        />
      </StorybookStorefrontShell>
    )
  },
}
