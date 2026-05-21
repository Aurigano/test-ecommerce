import { defaultStorefrontTheme, getStorefrontThemeVars, storefrontThemes } from '../../src/theme/storefront-theme'

export function StorybookStorefrontShell({ children, themeId = defaultStorefrontTheme.id, className = '' }) {
  const theme = storefrontThemes[themeId] ?? defaultStorefrontTheme

  return (
    <div
      style={getStorefrontThemeVars(theme)}
      className={`min-h-screen bg-[var(--storefront-backdrop)] px-4 py-6 text-[var(--storefront-ink)] sm:px-6 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </div>
  )
}
