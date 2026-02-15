// Theme definitions
// Each theme maps semantic tokens to actual color values (RGB format for Tailwind opacity support).
// To add a new theme: add an entry here, it automatically appears in the theme switcher.

const themes = {
  dark: {
    label: 'Dark',
    colors: {
      '--color-bg-base': '23 23 23',           // neutral-900
      '--color-bg-surface': '38 38 38',         // neutral-800
      '--color-bg-deep': '10 10 10',            // neutral-950
      '--color-bg-overlay': '255 255 255',      // white at low opacity

      '--color-text-heading': '255 255 255',    // white
      '--color-text-body': '212 212 212',       // neutral-300
      '--color-text-muted': '163 163 163',      // neutral-400
      '--color-text-faint': '115 115 115',      // neutral-500
      '--color-text-ghost': '82 82 82',         // neutral-600

      '--color-border-main': '38 38 38',        // neutral-800
      '--color-border-subtle': '64 64 64',      // neutral-700
      '--color-border-tag': '163 163 163',      // neutral-400

      '--color-accent': '37 99 235',            // blue-600
      '--color-accent-hover': '29 78 216',      // blue-700

      '--color-input-bg': '38 38 38',
      '--color-input-border': '64 64 64',
      '--color-card-bg': '229 229 229',         // neutral-200

      '--color-cta-bg': '255 255 255',
      '--color-cta-text': '23 23 23',
      '--color-cta-hover': '245 245 245',
    },
  },

  light: {
    label: 'Light',
    colors: {
      '--color-bg-base': '255 255 255',
      '--color-bg-surface': '245 245 245',      // neutral-100
      '--color-bg-deep': '229 229 229',         // neutral-200
      '--color-bg-overlay': '0 0 0',

      '--color-text-heading': '23 23 23',       // neutral-900
      '--color-text-body': '64 64 64',          // neutral-700
      '--color-text-muted': '82 82 82',         // neutral-600
      '--color-text-faint': '115 115 115',      // neutral-500
      '--color-text-ghost': '163 163 163',      // neutral-400

      '--color-border-main': '229 229 229',     // neutral-200
      '--color-border-subtle': '212 212 212',   // neutral-300
      '--color-border-tag': '82 82 82',         // neutral-600

      '--color-accent': '37 99 235',
      '--color-accent-hover': '29 78 216',

      '--color-input-bg': '255 255 255',
      '--color-input-border': '212 212 212',
      '--color-card-bg': '245 245 245',

      '--color-cta-bg': '23 23 23',
      '--color-cta-text': '255 255 255',
      '--color-cta-hover': '38 38 38',
    },
  },

  // 'high-contrast': {
  //   label: 'High Contrast',
  //   colors: { /* fill in all tokens */ },
  // },
};

export default themes;
