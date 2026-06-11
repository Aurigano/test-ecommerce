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
    <header className="rounded-lg border-2 border-[var(--storefront-line)] bg-[var(--storefront-panel)] p-5 shadow-lg">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-28 place-items-center rounded-lg bg-[var(--storefront-brand)] text-sm font-bold uppercase tracking-[0.12em] text-white">
            AC
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--storefront-muted)]">
              {eyebrow}
            </p>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
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
