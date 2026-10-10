import { ArrowRight, Check } from 'lucide-react'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import CtaSection from '../components/home/CtaSection'
import { services } from '../data/site'

const steps = [
  {
    title: 'Tell us how you ride',
    text: 'Route, distance, load and terrain — a two-minute conversation that shapes every recommendation.',
  },
  {
    title: 'Try the right bikes',
    text: 'We size the frame and set the cockpit, then send you out on the bikes that actually fit.',
  },
  {
    title: 'Ride away supported',
    text: 'Handover, warranty registration and a free annual battery health check, for as long as you own it.',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-line bg-soft py-14 lg:py-20">
        <Container>
          <span className="eyebrow">Services</span>
          <h1 className="mt-4 max-w-3xl text-[34px] leading-[1.08] sm:text-[48px]">
            Everything after the sale, handled properly.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            Test rides, servicing, battery care and custom builds — delivered by the same team that
            builds and rides these bikes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/#test-ride" size="lg" icon={<ArrowRight size={17} />}>
              Book a test ride
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Talk to a specialist
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-16 lg:gap-24">
            {services.map((service, index) => {
              const flip = index % 2 === 1
              return (
                <Reveal key={service.title}>
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                      flip ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <div className="overflow-hidden rounded-3xl border border-line">
                      <img
                        src={service.image}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/11] w-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="mt-3 text-[26px] leading-tight sm:text-[32px]">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-muted">{service.text}</p>
                      <ul className="mt-6 flex flex-col gap-3">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-center gap-3 text-[14px] text-ink">
                            <Check size={16} className="shrink-0 text-brand" strokeWidth={3} />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <Button
                        to="/contact"
                        variant="ghost"
                        size="md"
                        className="-ml-2 mt-6"
                        icon={<ArrowRight size={15} />}
                      >
                        Enquire about this
                      </Button>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-soft py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps from browsing to riding."
            align="center"
            className="mx-auto text-center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <div className="h-full rounded-3xl border border-line bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-[15px] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold">{step.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </div>
  )
}
