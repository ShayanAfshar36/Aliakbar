import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/site'

export default function ServicesTeaser() {
  const highlighted = services.slice(0, 3)

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title="More than a shop."
            description="From first test ride to the thousandth mile, we look after the whole ownership experience."
          />
          <Button to="/services" variant="outline" size="md" className="shrink-0">
            All services
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlighted.map((service, index) => (
            <Reveal key={service.title} delay={index * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[18px] font-bold">{service.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{service.text}</p>
                  <ul className="mt-5 flex flex-col gap-2 text-[13px] text-ink">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button to="/services" variant="ghost" size="sm" icon={<ArrowRight size={15} />} className="-ml-2">
                      Learn more
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
