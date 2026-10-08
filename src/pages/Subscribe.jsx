import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

const PLANS = [
  {
    name: 'Digital',
    price: '$0',
    cadence: 'demonstration',
    features: ['Unlimited articles', 'Saved reading list', 'Weekly newsletter', 'No advertising'],
    cta: 'Current access',
  },
  {
    name: 'Digital + App',
    price: '—',
    cadence: 'not available in this build',
    features: ['Everything in Digital', 'Offline reading', 'Full archive access', 'Audio editions'],
    cta: 'Checkout not connected',
    featured: true,
  },
  {
    name: 'Newsroom',
    price: '—',
    cadence: 'not available in this build',
    features: ['Team seats', 'Licensing for syndication', 'Data and charts access', 'Priority support'],
    cta: 'Contact us',
  },
];

export default function Subscribe() {
  return (
    <>
      <Seo
        title="Subscribe"
        description="Subscription plans for THE DAILY EDITION."
      />

      <main id="main">
        <header className="bg-ink text-white">
          <div className="shell py-14 lg:py-20">
            <p className="eyebrow text-accent">Subscription</p>
            <h1 className="mt-3 max-w-3xl font-display text-[2.2rem] font-800 leading-[1.08] tracking-tight sm:text-[3rem]">
              Support reporting that takes its time
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-[1.1rem] leading-relaxed text-white/70">
              Reader funding pays for the months of work behind an investigation. Choose a plan — or
              keep reading for free.
            </p>
          </div>
        </header>

        <div className="shell py-14 lg:py-16">
          <div className="border border-rule bg-paper-warm p-5">
            <p className="eyebrow text-accent">Integration notice</p>
            <p className="mt-2 max-w-3xl font-serif text-[1rem] leading-relaxed text-ink-soft">
              No payment provider or reader-account system is connected in this build. The plans
              below are placeholders and no checkout, charge or account creation will take place. Wire
              a payment provider and an identity system into this page before taking money.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <section
                key={plan.name}
                aria-labelledby={`plan-${plan.name.replace(/\s+/g, '-').toLowerCase()}`}
                className={`flex flex-col border p-7 ${
                  plan.featured ? 'border-ink bg-paper shadow-card' : 'border-rule bg-paper'
                }`}
              >
                <h2
                  id={`plan-${plan.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="font-display text-[1.35rem] font-700"
                >
                  {plan.name}
                </h2>
                <p className="mt-4 font-display text-[2.2rem] font-800 leading-none">{plan.price}</p>
                <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.12em] text-muted">
                  {plan.cadence}
                </p>
                <ul className="mt-6 grid flex-1 gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 font-serif text-[0.98rem] text-ink-soft">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled
                  className={`mt-7 w-full cursor-not-allowed ${
                    plan.featured ? 'btn-ink btn-md opacity-60' : 'btn-ghost btn-md opacity-60'
                  }`}
                >
                  {plan.cta}
                </button>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-rule pt-8">
            <h2 className="font-display text-[1.35rem] font-700">Questions</h2>
            <dl className="mt-5 grid gap-6 sm:grid-cols-2">
              {[
                ['Can I read without subscribing?', 'Yes. Every article on this demonstration site is free to read.'],
                ['Will I be charged?', 'No. No payment provider is connected and no payment details are collected.'],
                ['Do you sell reader data?', 'No reader data is collected by this build at all.'],
                ['How do I cancel?', 'There is nothing to cancel — no account is created here.'],
              ].map(([question, answer]) => (
                <div key={question}>
                  <dt className="font-sans text-[13px] font-700 uppercase tracking-[0.08em]">{question}</dt>
                  <dd className="mt-2 font-serif text-[0.98rem] leading-relaxed text-muted">{answer}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about#contact" className="btn-ghost btn-md mt-8">Contact the newsroom</Link>
          </div>
        </div>
      </main>
    </>
  );
}
