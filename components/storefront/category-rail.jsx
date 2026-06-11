export function CategoryRail({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`inline-flex h-10 items-center rounded-lg border-2 px-4 text-sm font-semibold transition ${
            selectedCategory === category
              ? 'border-[var(--storefront-brand)] bg-[var(--storefront-brand)] text-white'
              : 'border-[var(--storefront-line)] bg-[var(--storefront-panel-strong)] text-[var(--storefront-ink)] hover:border-[var(--storefront-brand)]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
