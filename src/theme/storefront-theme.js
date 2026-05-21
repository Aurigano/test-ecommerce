export const storefrontThemes = {
  atlas: {
    id: 'atlas',
    label: 'Atlas Sand',
    brand: '#e88e2a',
    brandStrong: '#c95c16',
    ink: '#1f1720',
    muted: '#69585d',
    line: 'rgba(31, 23, 32, 0.12)',
    panel: 'rgba(255, 251, 247, 0.86)',
    panelStrong: '#fff8f1',
    backdrop:
      'radial-gradient(circle at top left, rgba(255, 197, 128, 0.34), transparent 24%), radial-gradient(circle at top right, rgba(232, 142, 42, 0.14), transparent 18%), linear-gradient(180deg, #fff8f1 0%, #f5efe7 100%)',
    heroBlend:
      'linear-gradient(140deg, rgba(255, 251, 247, 0.86), rgba(248, 235, 221, 0.72))',
    chip: 'rgba(255, 238, 219, 0.9)',
  },
  pearl: {
    id: 'pearl',
    label: 'Pearl Mint',
    brand: '#2f9d88',
    brandStrong: '#1d6f60',
    ink: '#142422',
    muted: '#516665',
    line: 'rgba(20, 36, 34, 0.12)',
    panel: 'rgba(248, 255, 253, 0.86)',
    panelStrong: '#f6fffc',
    backdrop:
      'radial-gradient(circle at top left, rgba(104, 218, 194, 0.2), transparent 24%), radial-gradient(circle at top right, rgba(47, 157, 136, 0.1), transparent 18%), linear-gradient(180deg, #f7fffd 0%, #edf5f3 100%)',
    heroBlend:
      'linear-gradient(140deg, rgba(247, 255, 253, 0.86), rgba(228, 244, 241, 0.8))',
    chip: 'rgba(224, 247, 240, 0.92)',
  },
  dusk: {
    id: 'dusk',
    label: 'Dusk Indigo',
    brand: '#8577ff',
    brandStrong: '#5b50d0',
    ink: '#f7f4ff',
    muted: 'rgba(236, 232, 255, 0.76)',
    line: 'rgba(247, 244, 255, 0.12)',
    panel: 'rgba(21, 23, 34, 0.86)',
    panelStrong: '#181b29',
    backdrop:
      'radial-gradient(circle at top left, rgba(133, 119, 255, 0.32), transparent 22%), radial-gradient(circle at top right, rgba(123, 211, 255, 0.16), transparent 18%), linear-gradient(180deg, #0f1220 0%, #141828 100%)',
    heroBlend:
      'linear-gradient(140deg, rgba(24, 27, 41, 0.88), rgba(32, 36, 55, 0.78))',
    chip: 'rgba(133, 119, 255, 0.16)',
  },
}

export const defaultStorefrontTheme = storefrontThemes.atlas

export function getStorefrontThemeVars(theme) {
  return {
    '--storefront-brand': theme.brand,
    '--storefront-brand-strong': theme.brandStrong,
    '--storefront-ink': theme.ink,
    '--storefront-muted': theme.muted,
    '--storefront-line': theme.line,
    '--storefront-panel': theme.panel,
    '--storefront-panel-strong': theme.panelStrong,
    '--storefront-backdrop': theme.backdrop,
    '--storefront-hero-blend': theme.heroBlend,
    '--storefront-chip': theme.chip,
  }
}
