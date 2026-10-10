import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Check,
  ChevronRight,
  Gauge,
  Heart,
  Route,
  Ruler,
  ShieldCheck,
  Weight,
  Wrench,
  Zap,
} from 'lucide-react'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Stars from '../components/ui/Stars'
import BikeGallery from '../components/bikes/BikeGallery'
import BikeCard from '../components/bikes/BikeCard'
import NotFoundPage from './NotFoundPage'
import { getBikeBySlug, similarBikes } from '../data/bikes'
import { formatPrice, monthlyFrom } from '../lib/format'
import { useStore } from '../lib/store'

export default function BikeDetailPage() {
  const { slug } = useParams()
  const bike = slug ? getBikeBySlug(slug) : undefined
  const { addToCart, isFavorite, toggleFavorite } = useStore()
  const [colorIndex, setColorIndex] = useState(0)

  if (!bike) return <NotFoundPage />

  const saved = isFavorite(bike.id)
  const related = similarBikes(bike)

  const specs = [
    { icon: Route, label: 'Range', value: `${bike.range} mi` },
    { icon: BatteryCharging, label: 'Battery', value: `${bike.battery} Wh` },
    { icon: Gauge, label: 'Top speed', value: `${bike.topSpeed} mph` },
    { icon: Zap, label: 'Motor', value: bike.motor },
    { icon: Wrench, label: 'Torque', value: `${bike.torque} Nm` },
    { icon: BadgeCheck, label: 'Sensor', value: bike.sensor },
    { icon: Weight, label: 'Weight', value: `${bike.weight} lbs` },
    { icon: ShieldCheck, label: 'Class', value: bike.bikeClass },
    { icon: Ruler, label: 'Rider height', value: `${bike.riderHeight[0]}–${bike.riderHeight[1]} in` },
    { icon: BadgeCheck, label: 'Max load', value: `${bike.maxLoad} lbs` },
    { icon: ShieldCheck, label: 'Warranty', value: bike.warranty },
  ]

  return (
    <div className="bg-white pb-24 lg:pb-0">
      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted">
          <Link to="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="transition-colors hover:text-ink">
            Shop
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-ink">{bike.name}</span>
        </nav>
      </Container>

      <section className="pt-8 lg:pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <BikeGallery images={bike.images} name={bike.name} />

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {bike.category}
                </span>
                {bike.badge ? (
                  <span className="rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                    {bike.badge}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 text-[32px] leading-tight sm:text-[40px]">{bike.name}</h1>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{bike.tagline}</p>

              <div className="mt-5 flex items-center gap-3">
                <Stars rating={bike.rating} size={16} />
                <span className="text-[13px] font-semibold">{bike.rating.toFixed(1)}</span>
                <span className="text-[13px] text-muted">· {bike.reviews} reviews</span>
              </div>

              <div className="mt-7 flex items-end gap-3 border-y border-line py-6">
                <span className="text-[34px] font-extrabold leading-none">
                  {formatPrice(bike.price)}
                </span>
                {bike.compareAt ? (
                  <span className="text-[16px] text-muted line-through">
                    {formatPrice(bike.compareAt)}
                  </span>
                ) : null}
                <span className="ml-auto text-[13px] text-muted">
                  or {monthlyFrom(bike.price)}/mo for 24 months
                </span>
              </div>

              <div className="mt-6">
                <span className="text-[13px] font-semibold text-ink">
                  Colour — {bike.colors[colorIndex].name}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  {bike.colors.map((color, index) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setColorIndex(index)}
                      aria-label={color.name}
                      aria-pressed={index === colorIndex}
                      className={`h-9 w-9 rounded-full border-2 transition-all ${
                        index === colorIndex ? 'border-brand' : 'border-line hover:border-ink/30'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Button size="lg" fullWidth onClick={() => addToCart(bike.id)} icon={<ArrowRight size={17} />}>
                  Add to Cart
                </Button>
                <div className="flex gap-3">
                  <Button to="/#test-ride" variant="outline" size="lg" className="flex-1">
                    Book Test Ride
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(bike.id)}
                    aria-pressed={saved}
                    aria-label={saved ? 'Remove from saved' : 'Save this bike'}
                    className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border transition-colors ${
                      saved
                        ? 'border-brand bg-brand text-white'
                        : 'border-ink/20 text-ink hover:border-ink'
                    }`}
                  >
                    <Heart size={19} className={saved ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>

              <ul className="mt-7 flex flex-col gap-3 rounded-2xl border border-line bg-soft p-5">
                {bike.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-[13px] text-ink">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand" strokeWidth={3} />
                    {highlight}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-[13px] leading-relaxed text-muted">
                Free shipping · 30-day ride guarantee · Assembled and fitted by our team before
                handover.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-16 border-y border-line bg-soft py-14 lg:mt-24 lg:py-20">
        <Container>
          <h2 className="text-[24px] sm:text-[30px]">Full specifications</h2>
          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 border-b border-line pb-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Icon size={17} className="text-brand" />
                </span>
                <div>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">Overview</span>
              <h2 className="mt-4 text-[26px] leading-tight sm:text-[32px]">
                Built for how you actually ride.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted">{bike.description}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                Every {bike.name} is assembled and safety-checked in our workshop, then fitted to
                you at handover. Ride it for thirty days — if it is not right, send it back for a
                full refund.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-soft p-7">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                Key features
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {bike.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14px] text-ink">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-soft py-14 lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2 className="mt-4 text-[26px] sm:text-[32px]">Similar bikes</h2>
            </div>
            <Button to="/shop" variant="outline" size="md">
              Browse all bikes
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <BikeCard bike={item} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="block text-[17px] font-extrabold leading-none">
              {formatPrice(bike.price)}
            </span>
            <span className="text-[12px] text-muted">or {monthlyFrom(bike.price)}/mo</span>
          </div>
          <Button onClick={() => addToCart(bike.id)} size="md">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
