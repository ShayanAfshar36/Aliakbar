import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import Stars from '../ui/Stars'
import SpecRow from '../bikes/SpecRow'
import { bikes, type Bike } from '../../data/bikes'
import { formatPrice, monthlyFrom } from '../../lib/format'

const picks = ['commuter-pro-500', 'cargo-plus-750', 'trail-mtb-700']
  .map((id) => bikes.find((bike) => bike.id === id))
  .filter((bike): bike is Bike => Boolean(bike))

function TopPickCard({ bike }: { bike: Bike }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <Link to={`/bikes/${bike.slug}`} aria-label={`View ${bike.name}`}>
          <img
            src={bike.images[0]}
            alt={bike.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>
        {bike.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
            {bike.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            {bike.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Stars rating={bike.rating} size={12} />
            <span className="text-[12px] font-semibold">{bike.rating.toFixed(1)}</span>
          </span>
        </div>

        <h3 className="mt-4 text-[20px] font-bold leading-snug">{bike.name}</h3>
        <p className="mt-1.5 text-[14px] text-muted">{bike.tagline}</p>

        <SpecRow bike={bike} className="mt-5 border-y border-line py-4" />

        <ul className="mt-5 flex flex-col gap-2.5">
          {bike.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[13px] text-ink">
              <Check size={15} className="mt-0.5 shrink-0 text-brand" strokeWidth={3} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
          <div>
            <span className="block text-[20px] font-extrabold leading-none">
              {formatPrice(bike.price)}
            </span>
            <span className="mt-1 block text-[12px] text-muted">
              or {monthlyFrom(bike.price)}/mo
            </span>
          </div>
          <Button to={`/bikes/${bike.slug}`} size="sm" variant="dark" icon={<ArrowUpRight size={15} />}>
            View Specs
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function TopPicks() {
  return (
    <section className="border-y border-line bg-soft py-16 lg:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Top Picks"
            title="Our Top 3 Picks, Tested and Trusted."
            description="The three bikes our team rides most — chosen for range, comfort and how they hold up over a full season."
          />
          <Button to="/shop" variant="outline" size="md" className="shrink-0">
            Browse all bikes
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {picks.map((bike, index) => (
            <Reveal key={bike.id} delay={index * 90}>
              <TopPickCard bike={bike} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
