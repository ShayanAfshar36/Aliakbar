import { Linkedin, Mail } from 'lucide-react'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { team } from '../../data/site'

export default function TeamSection() {
  return (
    <section className="border-y border-line bg-soft py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Team"
          title="The people behind the ride."
          description="Riders, engineers and technicians who would rather talk about your commute than sell you a spec sheet."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 80}>
              <article className="group overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 bg-gradient-to-t from-ink/80 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {[Linkedin, Mail].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        aria-label={`${member.name} contact`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-brand hover:text-white"
                      >
                        <Icon size={15} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[17px] font-bold">{member.name}</h3>
                  <p className="mt-1 text-[13px] text-muted">{member.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
