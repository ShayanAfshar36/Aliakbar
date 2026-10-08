import Container from '../components/ui/Container'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container className="flex flex-col items-center text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-5 text-[40px] leading-tight sm:text-[56px]">This page took a wrong turn.</h1>
        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
          The page you were looking for is not here. Let us get you back to the bikes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/" size="lg">
            Back to home
          </Button>
          <Button to="/shop" variant="outline" size="lg">
            Browse bikes
          </Button>
        </div>
      </Container>
    </section>
  )
}
