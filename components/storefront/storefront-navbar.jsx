'use client'

import { Palette, ShieldCheck } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Select } from '../ui/select'

export function StorefrontNavbar({
  brandName,
  eyebrow,
  currentThemeLabel,
  showThemeSwitcher = true,
  themeLabel,
  themeId,
  themeOptions,
  onThemeChange,
}) {
  return (
    <header className="rounded-[32px] border border-[var(--storefront-line)] bg-[var(--storefront-panel)] p-4 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.28)] backdrop-blur-md">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-[20px] bg-[var(--storefront-brand)] font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
            AC
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--storefront-muted)]">
              {eyebrow}
            </p>
            <div className="flex items-center gap-3">
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold tracking-tight">
                {brandName}
              </h1>
              <Badge>{currentThemeLabel}</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {showThemeSwitcher ? (
            <label className="flex items-center gap-3 text-sm font-medium text-[var(--storefront-muted)]">
              <Palette className="size-4 text-[var(--storefront-brand)]" />
              <span>{themeLabel}</span>
              <Select value={themeId} onChange={(event) => onThemeChange(event.target.value)} className="min-w-44">
                {themeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </label>
          ) : null}

          <div className="flex items-center gap-2 text-sm font-medium text-[var(--storefront-muted)]">
            <ShieldCheck className="size-4 text-[var(--storefront-brand)]" />
            <span>Theme-ready storefront shell</span>
          </div>
        </div>
      </div>
    </header>
  )
}
