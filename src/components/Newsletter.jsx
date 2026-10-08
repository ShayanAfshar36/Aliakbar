import { useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup.
 *
 * There is no mailing-list integration wired up in this build, so the form
 * validates and then states plainly that nothing was sent. The submit handler
 * is the single integration point: replace `onSubscribe` with a call to your
 * provider (or an API route) and the rest of the component is unchanged.
 */
export default function Newsletter({ variant = 'section' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | invalid | pending | unconfigured
  const [message, setMessage] = useState('');

  const onSubscribe = async (address) => {
    // INTEGRATION POINT — no newsletter service is connected in this build.
    return { connected: false, address };
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus('invalid');
      setMessage('Please enter a valid email address, for example name@example.com.');
      return;
    }
    setStatus('pending');
    setMessage('');
    const result = await onSubscribe(email.trim());
    if (result.connected) {
      setStatus('success');
      setMessage(`Thanks — ${result.address} has been added to the list.`);
      setEmail('');
    } else {
      setStatus('unconfigured');
      setMessage(
        'Nothing was sent. This build has no mailing-list service connected, so no address has been stored or subscribed.'
      );
    }
  };

  const compact = variant === 'sidebar';

  return (
    <section
      aria-labelledby={compact ? undefined : 'newsletter-heading'}
      aria-label={compact ? 'Newsletter signup' : undefined}
      className={
        compact
          ? 'border border-rule bg-paper-warm p-5'
          : 'border-y border-ink bg-paper-warm px-6 py-12 sm:px-10 lg:py-14'
      }
    >
      <div className={compact ? '' : 'mx-auto max-w-3xl text-center'}>
        <p className="eyebrow text-accent">Newsletter</p>
        <h2
          id={compact ? undefined : 'newsletter-heading'}
          className={`mt-2 font-display font-700 leading-tight ${compact ? 'text-[1.25rem]' : 'text-[1.75rem] sm:text-[2.15rem]'}`}
        >
          Stay informed. Stay ahead.
        </h2>
        <p className={`mt-2 font-serif text-muted ${compact ? 'text-[0.92rem]' : 'text-[1.02rem]'}`}>
          Get the stories that matter, carefully selected and delivered to your inbox.
        </p>

        <form onSubmit={submit} noValidate className={`mt-5 ${compact ? '' : 'mx-auto flex max-w-xl flex-col gap-3 sm:flex-row'}`}>
          <label htmlFor={compact ? 'newsletter-email-sidebar' : 'newsletter-email'} className="sr-only">
            Email address
          </label>
          <input
            id={compact ? 'newsletter-email-sidebar' : 'newsletter-email'}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="Enter your email"
            aria-invalid={status === 'invalid'}
            aria-describedby={message ? `${compact ? 'newsletter-email-sidebar' : 'newsletter-email'}-status` : undefined}
            className={`min-w-0 flex-1 border bg-paper px-4 py-3 font-sans text-[14px] outline-none transition-colors placeholder:text-muted focus:border-ink ${
              status === 'invalid' ? 'border-accent' : 'border-rule-strong'
            }`}
          />
          <button type="submit" className="btn-accent btn-md shrink-0" disabled={status === 'pending'}>
            {status === 'pending' ? 'Checking…' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p
            id={`${compact ? 'newsletter-email-sidebar' : 'newsletter-email'}-status`}
            role={status === 'invalid' ? 'alert' : 'status'}
            className={`mt-3 font-sans text-[12.5px] ${status === 'invalid' ? 'text-accent' : 'text-muted'} ${compact ? '' : 'mx-auto max-w-xl'}`}
          >
            {message}
          </p>
        )}

        <p className={`meta mt-4 ${compact ? '' : 'mx-auto max-w-xl'}`}>
          We will not sell or share your address. Read our{' '}
          <a href="#footer-legal" className="underline decoration-rule-strong underline-offset-2 hover:decoration-accent">
            privacy policy
          </a>
          . This demonstration build has no mailing-list service connected.
        </p>
      </div>
    </section>
  );
}
