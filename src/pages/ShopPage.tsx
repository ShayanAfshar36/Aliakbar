import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Heart, Search, SlidersHorizontal, X } from 'lucide-react'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import BikeCard from '../components/bikes/BikeCard'
import { bikes, categories } from '../data/bikes'
import { useStore } from '../lib/store'
import { formatPrice } from '../lib/format'

const MAX_PRICE = 5000

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'range-desc', label: 'Longest range' },
  { value: 'rating-desc', label: 'Top rated' },
]

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const { favorites } = useStore()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const q = params.get('q') ?? ''
  const selectedCategories = (params.get('category') ?? '').split(',').filter(Boolean)
  const maxPrice = Number(params.get('maxPrice') ?? MAX_PRICE)
  const sort = params.get('sort') ?? 'featured'
  const savedOnly = params.get('saved') === '1'

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const toggleCategory = (category: string) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category]
    update('category', next.join(','))
  }

  const clearAll = () => setParams(new URLSearchParams(), { replace: true })

  const results = useMemo(() => {
    const list = bikes.filter((bike) => {
      if (savedOnly && !favorites.includes(bike.id)) return false
      if (selectedCategories.length > 0 && !selectedCategories.includes(bike.category)) return false
      if (bike.price > maxPrice) return false
      if (q) {
        const haystack = `${bike.name} ${bike.category} ${bike.tagline} ${bike.features.join(' ')}`.toLowerCase()
        if (!haystack.includes(q.toLowerCase())) return false
      }
      return true
    })

    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      case 'range-desc':
        return [...list].sort((a, b) => b.range - a.range)
      case 'rating-desc':
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [q, selectedCategories, maxPrice, sort, savedOnly, favorites])

  const hasFilters = Boolean(q) || selectedCategories.length > 0 || maxPrice < MAX_PRICE || savedOnly

  const filterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">Category</h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex cursor-pointer items-center gap-3 text-[14px] text-muted transition-colors hover:text-ink">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 rounded border-line accent-brand"
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">Max price</h3>
          <span className="text-[13px] font-bold text-brand">{formatPrice(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={1000}
          max={MAX_PRICE}
          step={50}
          value={maxPrice}
          onChange={(event) => update('maxPrice', event.target.value)}
          aria-label="Maximum price"
          className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand"
        />
      </div>

      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">Saved</h3>
        <button
          type="button"
          onClick={() => update('saved', savedOnly ? null : '1')}
          aria-pressed={savedOnly}
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
            savedOnly ? 'border-brand bg-brand text-white' : 'border-line text-ink hover:border-ink'
          }`}
        >
          <Heart size={14} className={savedOnly ? 'fill-current' : ''} />
          Saved only {favorites.length > 0 ? `(${favorites.length})` : ''}
        </button>
      </div>

      {hasFilters ? (
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-2 self-start text-[13px] font-semibold text-muted transition-colors hover:text-brand"
        >
          <X size={14} />
          Clear all filters
        </button>
      ) : null}
    </div>
  )

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-soft py-12 lg:py-16">
        <Container>
          <span className="eyebrow">Shop</span>
          <h1 className="mt-4 max-w-2xl text-[34px] leading-tight sm:text-[44px]">
            Every Voltaro bike, side by side.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Filter by category, budget and range to find the bike that fits your route. Every model
            ships assembled, certified and ready to ride.
          </p>
        </Container>
      </section>

      <section className="py-10 lg:py-14">
        <Container>
          <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={q}
                onChange={(event) => update('q', event.target.value)}
                placeholder="Search bikes…"
                aria-label="Search bikes"
                className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-[14px] outline-none transition-colors focus:border-brand"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-[13px] font-semibold transition-colors hover:border-ink lg:hidden"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>

              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => update('sort', event.target.value)}
                className="h-12 rounded-full border border-line bg-white px-5 text-[13px] font-semibold outline-none transition-colors focus:border-brand"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
            <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="lg:sticky lg:top-24">{filterPanel}</div>
            </aside>

            <div>
              <p className="text-[13px] font-semibold text-muted">
                {results.length} {results.length === 1 ? 'bike' : 'bikes'}
                {savedOnly ? ' saved' : ''}
              </p>

              {results.length > 0 ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((bike, index) => (
                    <Reveal key={bike.id} delay={Math.min(index, 5) * 60}>
                      <BikeCard bike={bike} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-line bg-soft px-8 py-16 text-center">
                  <h2 className="text-[18px] font-bold">No bikes match those filters</h2>
                  <p className="mt-2 max-w-sm text-[14px] text-muted">
                    Try widening your price range or clearing the search to see the full range.
                  </p>
                  <Button onClick={clearAll} size="md" className="mt-6">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
