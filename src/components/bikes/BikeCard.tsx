import { Link } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import SpecRow from './SpecRow'
import Stars from '../ui/Stars'
import type { Bike } from '../../data/bikes'
import { formatPrice, monthlyFrom } from '../../lib/format'
import { useStore } from '../../lib/store'

interface BikeCardProps {
  bike: Bike
  className?: string
}

export default function BikeCard({ bike, className = '' }: BikeCardProps) {
  const { isFavorite, toggleFavorite, addToCart } = useStore()
  const saved = isFavorite(bike.id)

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="relative overflow-hidden">
        <Link to={`/bikes/${bike.slug}`} aria-label={`View ${bike.name}`}>
          <img
            src={bike.images[0]}
            alt={bike.name}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {bike.badge ? (
            <span className="pointer-events-auto rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
              {bike.badge}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => toggleFavorite(bike.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${bike.name} from saved` : `Save ${bike.name}`}
            className={`pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors ${
              saved ? 'bg-brand text-white' : 'bg-white/85 text-ink hover:bg-white'
            }`}
          >
            <Heart size={16} className={saved ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {bike.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Stars rating={bike.rating} size={12} />
            <span className="text-[12px] font-semibold text-ink">{bike.rating.toFixed(1)}</span>
          </span>
        </div>

        <h3 className="mt-2 text-[17px] font-bold leading-snug">
          <Link to={`/bikes/${bike.slug}`} className="transition-colors hover:text-brand">
            {bike.name}
          </Link>
        </h3>

        <SpecRow bike={bike} className="mt-4" />

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[19px] font-extrabold">{formatPrice(bike.price)}</span>
              {bike.compareAt ? (
                <span className="text-[13px] text-muted line-through">
                  {formatPrice(bike.compareAt)}
                </span>
              ) : null}
            </div>
            <span className="text-[12px] text-muted">
              or {monthlyFrom(bike.price)}/mo for 24 months
            </span>
          </div>
          <button
            type="button"
            onClick={() => addToCart(bike.id)}
            aria-label={`Add ${bike.name} to cart`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-brand"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}
