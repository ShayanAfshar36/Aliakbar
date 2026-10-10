import Container from '../ui/Container'
import Button from '../ui/Button'
import Accordion from '../ui/Accordion'
import SectionHeading from '../ui/SectionHeading'
import { faqs } from '../../data/site'

export default function FaqSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered."
              description="Everything you need to know before your first electric ride. Still unsure? Our team is one call away."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="md">
                Talk to a specialist
              </Button>
              <Button to="/services" variant="outline" size="md">
                Service & support
              </Button>
            </div>
          </div>

          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  )
}
