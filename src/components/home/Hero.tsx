import { ArrowRight, BatteryCharging, Gauge, Route, Star } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1601391721091-4646369e0bb5?auto=format&fit=crop&q=80&w=1500'

const avatars = [
  'photo-1560250097-0b93528c311a',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1629425733761-caae3b5f2e50',
  'photo-1627161683077-e34782c24d81',
].map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=80`)

const stats = [
  { icon: Route, value: '45 mi', label: 'Range per charge' },
  { icon: BatteryCharging, value: '720 Wh', label: 'Battery capacity' },
  { icon: Gauge, value: '25 mph', label: 'Top speed assist' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-[-120px] h-[520px] w-[520px] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-ink/[0.04] blur-3xl" />

      <Container className="relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold text-ink backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            2026 range now shipping · Free delivery
          </span>

          <h1 className="mt-6 text-[38px] leading-[1.03] tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[60px] xl:text-[66px]">
            Discover Your Ideal
            <br />
            <span className="text-brand">Electric Ride</span> Today.
          </h1>

          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            Experience effortless riding with powerful electric bikes designed for comfort,
            performance and everyday convenience — certified, fitted and supported locally.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/shop" size="lg" icon={<ArrowRight size={17} />}>
              Shop Bikes
            </Button>
            <Button to="/#test-ride" variant="outline" size="lg">
              Book Test Ride
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center">
              {avatars.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className={`h-10 w-10 rounded-full border-2 border-white object-cover ${
                    index > 0 ? '-ml-3' : ''
                  }`}
                />
              ))}
              <span className="-ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-ink text-[11px] font-bold text-white">
                4k+
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-brand text-brand" />
                  ))}
                </span>
                <span className="text-[13px] font-bold text-ink">4.9</span>
              </div>
              <p className="text-[13px] text-muted">4,000+ happy riders</p>
            </div>
          </div>
        </div>

        <div className="relative animate-scale-in">
          <div className="overflow-hidden rounded-[28px] border border-line bg-soft">
            <img
              src={HERO_IMAGE}
              alt="Voltaro electric bike"
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </div>

          <ul className="mt-4 grid grid-cols-3 gap-3 lg:absolute lg:-right-4 lg:top-1/2 lg:mt-0 lg:w-[200px] lg:-translate-y-1/2 lg:grid-cols-1 xl:-right-10">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <li
                key={label}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-white/95 p-3.5 shadow-card backdrop-blur lg:flex-row lg:items-center lg:gap-3 lg:p-4"
                style={{ animationDelay: `${200 + index * 120}ms` }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-tint">
                  <Icon size={17} className="text-brand" />
                </span>
                <span>
                  <span className="block text-[15px] font-extrabold leading-none">{value}</span>
                  <span className="mt-1 block text-[11px] font-medium leading-tight text-muted">
                    {label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
