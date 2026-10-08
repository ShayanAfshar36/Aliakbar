import {
  BadgeCheck,
  BatteryCharging,
  Droplets,
  ShieldCheck,
  Truck,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import { features } from '../../data/site'

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Droplets,
  BadgeCheck,
  Wrench,
  BatteryCharging,
  Truck,
}

export default function FeaturesGrid() {
  return (
    <section className="border-y border-line bg-soft py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-10">
          <div>
            <SectionHeading
              eyebrow="Why Voltaro"
              title="Engineered for the ride, not the spec sheet."
              description="Every bike is built around the same promise: certified safety, real-world range and service that stays with you."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon] ?? ShieldCheck
                return (
                  <Reveal key={feature.title} delay={index * 70}>
                    <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand">
                        <Icon
                          size={20}
                          className="text-brand transition-colors duration-300 group-hover:text-white"
                        />
                      </span>
                      <h3 className="mt-5 text-[16px] font-bold">{feature.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{feature.text}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-brand p-8 text-white">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/10" />
              <div className="relative">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
                  Ready to ride?
                </span>
                <h3 className="mt-4 text-[28px] leading-tight text-white">
                  Feel the assist before you decide.
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-white/85">
                  Book a free 30-minute test ride. We will size the frame, set the cockpit and let
                  the bike speak for itself.
                </p>
                <ul className="mt-6 flex flex-col gap-2 text-[13px] font-medium text-white/90">
                  <li>· No obligation, no pressure</li>
                  <li>· 12+ models to try</li>
                  <li>· Available in-store and at home</li>
                </ul>
              </div>
              <Button
                to="/#test-ride"
                variant="light"
                size="lg"
                className="relative mt-8"
                icon={<ArrowRight size={17} />}
              >
                Book Test Ride
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
