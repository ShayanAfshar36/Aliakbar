/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        'ink-muted': 'var(--color-ink-muted)',
        paper: 'var(--color-paper)',
        'paper-warm': 'var(--color-paper-warm)',
        surface: 'var(--color-surface)',
        rule: 'var(--color-rule)',
        'rule-strong': 'var(--color-rule-strong)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        shell: '1280px',
        measure: '44rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 14, 20, 0.04), 0 8px 24px -16px rgba(11, 14, 20, 0.18)',
        lift: '0 2px 6px rgba(11, 14, 20, 0.06), 0 24px 48px -28px rgba(11, 14, 20, 0.32)',
        bar: '0 1px 0 rgba(11, 14, 20, 0.06)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'image-reveal': {
          from: { opacity: '0', transform: 'scale(1.04)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'image-reveal': 'image-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 44s linear infinite',
      },
    },
  },
  plugins: [],
};
