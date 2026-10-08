import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import AuthorCard from '../components/AuthorCard.jsx';
import { authors } from '../data/authors.js';
import { categories } from '../data/categories.js';

const PRINCIPLES = [
  {
    title: 'Report, then verify',
    body: 'Nothing is published on the basis of a single anonymous claim. Where a fact cannot be independently corroborated, the story says so.',
  },
  {
    title: 'Separate news from argument',
    body: 'Analysis and opinion are labelled wherever they appear and are edited by a different desk from the news report.',
  },
  {
    title: 'Correct in the open',
    body: 'Corrections are published, dated and attached to the original article rather than quietly removed.',
  },
  {
    title: 'Show the method',
    body: 'Data-driven stories explain where the numbers came from, what was excluded and what remains uncertain.',
  },
];

const STANDARDS = [
  ['standards', 'Our journalistic standards', [
    'We attribute information to named sources wherever possible. Where a source cannot be named, we explain why and what we did to verify the account.',
    'We do not pay for interviews. We do not accept gifts, travel or hospitality that could reasonably be seen to influence coverage.',
    'Quotations are reported as spoken, with ellipses marked. Translations are checked by a second speaker of the language.',
  ]],
  ['corrections', 'Corrections policy', [
    'Corrections are published at the foot of the article with the date and time of the change, and a note describing what was wrong.',
    'Significant corrections are also listed on a corrections page. We do not silently amend published text.',
  ]],
  ['fact-checking', 'Fact-checking policy', [
    'Every article is read by a second editor before publication. Numeric claims are traced to their source; statistical claims are reviewed by a desk with subject expertise.',
    'Headlines must be supported by the body of the article. We do not use framing that the reporting does not sustain.',
  ]],
  ['sourcing', 'Transparency and sourcing', [
    'Where a story relies on documents, we describe how they were obtained and how their authenticity was established, without exposing sources to risk.',
    'Where a story relies on a leaked dataset, we describe how it was validated and what steps were taken to protect personal data.',
  ]],
];

function Anchor({ id, title, paragraphs }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-32 border-t border-rule pt-8">
      <h2 id={`${id}-heading`} className="font-display text-[1.5rem] font-700 leading-tight">{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-3xl font-serif text-[1.02rem] leading-relaxed text-ink-soft">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title="About us"
        description="Our mission, editorial principles, coverage, corrections policy and how to contact the newsroom."
      />

      <main id="main">
        <header className="bg-ink text-white">
          <div className="shell py-14 lg:py-20">
            <p className="eyebrow text-accent">About the publication</p>
            <h1 className="mt-3 max-w-4xl font-display text-[2.2rem] font-800 leading-[1.08] tracking-tight sm:text-[3rem]">
              Journalism that takes the reader seriously
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-[1.1rem] leading-relaxed text-white/70">
              THE DAILY EDITION is an independent publication covering world affairs, politics,
              business, technology, science, health, the environment, culture and sport.
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-accent pl-4 font-sans text-[12.5px] leading-relaxed text-white/60">
              This is a demonstration publication. The mission statement, team, policies and contact
              details below are illustrative placeholders, not claims about a real news
              organisation.
            </p>
          </div>
        </header>

        <div className="shell grid gap-14 py-14 lg:grid-cols-[1fr_280px] lg:gap-20">
          <div className="grid gap-12">
            <section aria-labelledby="mission-heading" className="border-t border-rule pt-8">
              <h2 id="mission-heading" className="font-display text-[1.5rem] font-700 leading-tight">
                Our mission
              </h2>
              <p className="mt-4 max-w-3xl font-serif text-[1.05rem] leading-relaxed text-ink-soft">
                To report what is happening, explain why it matters, and be honest about what we do
                not know. We would rather publish a story a day later and be right than publish it
                first and be wrong.
              </p>
              <p className="mt-4 max-w-3xl font-serif text-[1.05rem] leading-relaxed text-ink-soft">
                We aim to be useful to readers who have to live with the consequences of the news:
                clarity over speed, context over volume, and reporting that can be checked.
              </p>
            </section>

            <section aria-labelledby="principles-heading" className="border-t border-rule pt-8">
              <h2 id="principles-heading" className="font-display text-[1.5rem] font-700 leading-tight">
                Editorial principles
              </h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {PRINCIPLES.map((principle) => (
                  <div key={principle.title}>
                    <h3 className="font-sans text-[13px] font-700 uppercase tracking-[0.1em]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 font-serif text-[0.98rem] leading-relaxed text-muted">
                      {principle.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="coverage-heading" className="border-t border-rule pt-8">
              <h2 id="coverage-heading" className="font-display text-[1.5rem] font-700 leading-tight">
                Coverage areas
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link to={`/section/${category.slug}`} className="badge-quiet hover:border-ink hover:text-accent">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {STANDARDS.map(([id, title, paragraphs]) => (
              <Anchor key={id} id={id} title={title} paragraphs={paragraphs} />
            ))}

            <section id="team" aria-labelledby="team-heading" className="scroll-mt-32 border-t border-rule pt-8">
              <h2 id="team-heading" className="font-display text-[1.5rem] font-700 leading-tight">
                Editorial team
              </h2>
              <p className="mt-3 max-w-3xl font-serif text-[0.98rem] leading-relaxed text-muted">
                Demonstration profiles. Names, roles and biographies are fictional.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {authors.map((author) => (
                  <AuthorCard key={author.id} author={author} variant="grid" />
                ))}
              </div>
            </section>

            <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-32 border-t border-rule pt-8">
              <h2 id="contact-heading" className="font-display text-[1.5rem] font-700 leading-tight">
                Contact the newsroom
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                {[
                  ['News desk', 'newsdesk@example.com'],
                  ['Corrections', 'corrections@example.com'],
                  ['Investigations tip line', 'tips@example.com'],
                ].map(([label, address]) => (
                  <div key={label}>
                    <h3 className="font-sans text-[13px] font-700 uppercase tracking-[0.1em]">{label}</h3>
                    <p className="mt-2 font-serif text-[0.98rem] text-muted">{address}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-3xl border border-rule bg-paper-warm p-4 font-sans text-[12.5px] leading-relaxed text-muted">
                Placeholder addresses. Secure and anonymous tip channels are not implemented in this
                demonstration build.
              </p>
            </section>

            <Anchor
              id="privacy"
              title="Privacy policy"
              paragraphs={[
                'This demonstration build stores saved articles in your browser’s local storage only. Nothing is transmitted to a server and no analytics or advertising scripts are loaded.',
                'A production deployment would require a full privacy notice describing data collection, retention and reader rights. That notice is not included here.',
              ]}
            />
            <Anchor
              id="terms"
              title="Terms of use"
              paragraphs={[
                'Placeholder terms. The articles on this site are fictional and must not be relied on as reporting.',
                'Nothing on this site constitutes legal, financial or medical advice.',
              ]}
            />
            <Anchor
              id="cookies"
              title="Cookie preferences"
              paragraphs={[
                'This build sets no cookies and loads no third-party trackers. A consent interface would be required before adding any measurement or advertising technology.',
              ]}
            />
          </div>

          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <nav aria-label="On this page" className="border-t-2 border-ink pt-3">
              <p className="eyebrow mb-3 text-ink">On this page</p>
              <ol className="grid gap-2">
                {[
                  ['mission-heading', 'Our mission'],
                  ['principles-heading', 'Editorial principles'],
                  ['coverage-heading', 'Coverage areas'],
                  ['standards', 'Journalistic standards'],
                  ['corrections', 'Corrections policy'],
                  ['fact-checking', 'Fact-checking policy'],
                  ['sourcing', 'Transparency and sourcing'],
                  ['team', 'Editorial team'],
                  ['contact', 'Contact the newsroom'],
                  ['privacy', 'Privacy policy'],
                  ['terms', 'Terms of use'],
                  ['cookies', 'Cookie preferences'],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="font-sans text-[12.5px] text-muted transition-colors hover:text-accent">
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </main>
    </>
  );
}
