import { useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import Container from '../ui/Container'
import Stars from '../ui/Stars'
import { testimonials } from '../../data/site'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const active = testimonials[index]

  const go = (dir: number) =>
    setIndex((current) => (current + dir + testimonials.length) % testimonials.length)

  return (
    <section className="bg-brand py-16 text-white lg:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <Quote size={24} className="fill-white text-white" />
          </span>

          <h2 className="mt-7 text-3xl text-white sm:text-4xl">What Riders are Saying</h2>
          <div className="mt-4 flex items-center gap-2">
            <Stars rating={5} size={18} className="[&_*]:fill-white [&_*]:text-white" />
            <span className="text-[13px] font-semibold text-white/90">5.0 average</span>
          </div>

          <blockquote
            key={active.name}
            className="mt-8 text-[19px] font-medium italic leading-relaxed text-white/95 sm:text-[22px]"
          >
            “{active.quote}”
          </blockquote>

          <div className="mt-8">
            <p className="text-[15px] font-bold text-white">{active.name}</p>
            <p className="text-[13px] text-white/70">{active.role}</p>
          </div>

          <div className="mt-9 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-brand"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((item, dotIndex) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Show testimonial ${dotIndex + 1}`}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    dotIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-brand"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
