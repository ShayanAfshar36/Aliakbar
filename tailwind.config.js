/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',
        muted: '#5F6368',
        line: '#E6E6E6',
        soft: '#F7F6F3',
        brand: {
          DEFAULT: '#FF7A00',
          dark: '#E86A00',
          tint: '#FFF3E8',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(11, 11, 11, 0.25)',
        lift: '0 28px 60px -28px rgba(11, 11, 11, 0.32)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
