import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import { blogPosts } from '../data/site'
import NotFoundPage from './NotFoundPage'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) return <NotFoundPage />

  const others = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <article className="bg-white">
      <Container className="pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} />
          Back to journal
        </Link>
      </Container>

      <header className="py-10 lg:py-14">
        <Container className="max-w-3xl">
          <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em]">
            <span className="text-brand">{post.category}</span>
            <span className="text-muted">· {post.date}</span>
          </div>
          <h1 className="mt-5 text-[32px] leading-[1.1] sm:text-[46px]">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-2 text-[13px] text-muted">
            <Clock size={14} />
            {post.readTime}
          </div>
        </Container>
      </header>

      <Container className="max-w-4xl">
        <img
          src={post.image}
          alt=""
          className="aspect-[16/9] w-full rounded-3xl border border-line object-cover"
        />
      </Container>

      <div className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-6">
            {post.body.map((paragraph, index) => (
              <p
                key={index}
                className={`leading-relaxed text-muted ${
                  index === 0 ? 'text-[19px] text-ink' : 'text-[17px]'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-soft p-8">
            <h2 className="text-[20px] font-bold">Ready to ride?</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Book a free test ride and feel the difference for yourself — no obligation, no
              pressure.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button to="/#test-ride" size="md">
                Book a test ride
              </Button>
              <Button to="/shop" variant="outline" size="md">
                Browse bikes
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <section className="border-t border-line bg-soft py-14 lg:py-20">
        <Container>
          <h2 className="text-[24px] sm:text-[30px]">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                    {item.category}
                  </span>
                  <h3 className="mt-3 text-[18px] font-bold leading-snug transition-colors group-hover:text-brand">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </article>
  )
}
