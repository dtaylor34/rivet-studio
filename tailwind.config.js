/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--color-bg-base) / <alpha-value>)',
        surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
        deep: 'rgb(var(--color-bg-deep) / <alpha-value>)',
        overlay: 'rgb(var(--color-bg-overlay) / <alpha-value>)',
        heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
        body: 'rgb(var(--color-text-body) / <alpha-value>)',
        muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        faint: 'rgb(var(--color-text-faint) / <alpha-value>)',
        ghost: 'rgb(var(--color-text-ghost) / <alpha-value>)',
        main: 'rgb(var(--color-border-main) / <alpha-value>)',
        subtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
        tag: 'rgb(var(--color-border-tag) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        input: 'rgb(var(--color-input-bg) / <alpha-value>)',
        'input-border': 'rgb(var(--color-input-border) / <alpha-value>)',
        card: 'rgb(var(--color-card-bg) / <alpha-value>)',
        cta: 'rgb(var(--color-cta-bg) / <alpha-value>)',
        'cta-text': 'rgb(var(--color-cta-text) / <alpha-value>)',
        'cta-hover': 'rgb(var(--color-cta-hover) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
