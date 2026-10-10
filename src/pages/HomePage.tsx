import Hero from '../components/home/Hero'
import FeaturesGrid from '../components/home/FeaturesGrid'
import BikeFinder from '../components/home/BikeFinder'
import TopPicks from '../components/home/TopPicks'
import TestRideCTA from '../components/home/TestRideCTA'
import RangeCalculator from '../components/home/RangeCalculator'
import ComparisonTable from '../components/home/ComparisonTable'
import WhyChoose from '../components/home/WhyChoose'
import ServicesTeaser from '../components/home/ServicesTeaser'
import Testimonials from '../components/home/Testimonials'
import TeamSection from '../components/home/TeamSection'
import FaqSection from '../components/home/FaqSection'
import CtaSection from '../components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <BikeFinder />
      <TopPicks />
      <TestRideCTA />
      <RangeCalculator />
      <ComparisonTable />
      <WhyChoose />
      <ServicesTeaser />
      <Testimonials />
      <TeamSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
