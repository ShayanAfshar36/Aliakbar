import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { whyChoose } from '../../data/site'

const IMAGE =
  'https://images.unsplash.com/photo-1635816048695-51dc43a7b24c?auto=format&fit=crop&q=80&w=1200'

export default function WhyChoose() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-line">
                <img
                  src={IMAGE}
                  alt="Rider on a Voltaro electric bike"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-line bg-white/95 p-5 shadow-card backdrop-blur sm:left-auto sm:right-6 sm:w-[260px]">
                <p className="text-[34px] font-extrabold leading-none text-ink">30 days</p>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">
                  Ride it, live with it, and return it for a full refund if it is not the one.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Why Choose Voltaro"
              title="A bike is only as good as the support behind it."
              description="We are riders and technicians first. That shows up in how we build, fit and look after every bike we sell."
            />

            <ol className="mt-10 flex flex-col gap-7">
              {whyChoose.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <li className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-bold">{item.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
