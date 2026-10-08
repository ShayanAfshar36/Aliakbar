import { ArrowRight, Zap } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'

export default function CtaSection() {
  return (
    <section className="bg-[#F1F2F5] py-14 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex items-start gap-6">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white">
              <Zap size={24} className="fill-brand text-brand" />
            </span>
            <div>
              <h2 className="text-[28px] leading-tight text-ink sm:text-[34px]">
                Ready to Find Your Perfect Ride?
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                Let our specialists guide you to the right bike, the right fit and the right service
                plan — with no pressure and no jargon.
              </p>
            </div>
          </div>

          <Button to="/contact" variant="dark" size="lg" icon={<ArrowRight size={17} />} className="shrink-0">
            Get in Touch
          </Button>
        </div>
      </Container>
    </section>
  )
}
