import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { blogPosts } from '../data/site'

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-soft py-14 lg:py-20">
        <Container>
          <span className="eyebrow">Journal</span>
          <h1 className="mt-4 max-w-2xl text-[34px] leading-tight sm:text-[46px]">
            Guides, stories and honest advice.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            Buying guides, maintenance tips and real-world ride reports from the Voltaro workshop.
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:shadow-lift lg:grid-cols-2"
            >
              <div className="overflow-hidden">
                <img
                  src={featured.image}
                  alt=""
                  className="aspect-[16/11] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] lg:h-full"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em]">
                  <span className="text-brand">{featured.category}</span>
                  <span className="text-muted">· {featured.date}</span>
                </div>
                <h2 className="mt-4 text-[26px] leading-tight sm:text-[32px]">{featured.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-ink transition-colors group-hover:text-brand">
                  Read article
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <Link to={`/blog/${post.slug}`} className="overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em]">
                      <span className="text-brand">{post.category}</span>
                      <span className="text-muted">· {post.date}</span>
                    </div>
                    <h3 className="mt-3 text-[19px] font-bold leading-snug">
                      <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-brand">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-2 pt-6 text-[12px] text-muted">
                      <Clock size={13} />
                      {post.readTime}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
