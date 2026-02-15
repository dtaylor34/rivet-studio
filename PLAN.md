# Rivet Studio — Architecture Plan (V5)

## 1. Current Architecture

```
src/
├── App.js                          # BrowserRouter with all routes
├── index.js                        # Entry point with ThemeProvider
├── index.css                       # Tailwind + theme defaults + AI pulse animation
├── firebase.js                     # Firebase config
├── config/
│   └── navigation.js               # Centralized nav menu items
├── data/
│   └── projects.js                 # Project registry + prototyping examples
├── theme/
│   ├── themes.js                   # Theme color definitions (dark, light, extensible)
│   └── ThemeContext.jsx             # React context, localStorage, system preference
├── utils/
│   ├── analytics.js                # Google Analytics event tracking helpers
│   └── usePageTracking.js          # Auto page view tracking on route change
├── layouts/
│   └── MainLayout.jsx              # Header + Footer + Outlet + ScrollToTop + SkipNav + PageTracking
├── pages/
│   ├── HomePage.jsx                # Hero, AI carousel, process callouts, client carousel, video CTA
│   ├── ContactPage.jsx             # Split-screen form with bridge image
│   ├── AIExamplesPage.jsx          # Accordion with interactive prototypes + tabs
│   ├── ClientExamplesPage.jsx      # Project card list from registry
│   ├── AboutUsPage.jsx             # Philosophy, services grid, experience, CTA
│   ├── ProjectDetailPage.jsx       # Slug resolver → project component
│   └── projects/
│       ├── index.js                # Barrel export (slug → component mapping)
│       ├── UNDataPortal.jsx
│       ├── GoogleServerCentral.jsx
│       ├── GoogleExperiments.jsx
│       ├── ProductExcellence.jsx
│       ├── GoogleHaTS.jsx
│       └── BrandArchitecture.jsx
├── components/
│   ├── ui/
│   │   ├── ChevronIcon.jsx         # Up/Down/Left/Right chevrons
│   │   ├── TagPill.jsx             # Rounded pill tag
│   │   ├── ProjectCard.jsx         # List-style project card with Link
│   │   ├── FlowChart.jsx           # Interactive XP product flow diagram
│   │   ├── FlowStep.jsx            # Flow chart step with tooltip
│   │   ├── AnalysisCircles.jsx     # Interactive experimentation process circles
│   │   └── Tooltip.jsx             # Portal-based tooltip with viewport awareness
│   ├── sections/
│   │   ├── ProjectHero.jsx         # Title, subtitle, description
│   │   ├── TwoColumnSection.jsx    # Left/right bullet columns
│   │   ├── ProcessSection.jsx      # Title, description, children or image
│   │   └── ImageShowcase.jsx       # Single or grid image display
│   ├── shared/
│   │   ├── ThemeToggle.jsx         # Sun/moon toggle button
│   │   └── Footer.jsx              # Shared footer with nav links
│   └── prototypes/
│       ├── FlightNetworkChart.jsx
│       ├── FlightNetworkVisual.js
│       ├── GlobalFlightNetwork.js
│       ├── RivetMapper.js
│       └── PhoneLoader.js
└── assets/                          # Images, videos, SVG logo
```

### Root Files

```
rivet-studio/
├── .cursorrules                    # Conventions for Cursor AI
├── .env.example                    # FTP credential template (safe to commit)
├── .env                            # Actual FTP credentials (NEVER committed — in .gitignore)
├── .gitignore                      # Excludes .env, node_modules, build
├── PLAN.md                         # This document
├── CHANGELOG.md                    # Version history
├── VERSION_GUIDE.md                # Version guide
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── upload_ftp.py                   # FTP deployment script (reads from .env)
```

## 2. Routing

All routing uses react-router-dom. No custom hash routing.

| Path | Page | Layout |
|---|---|---|
| `/` | HomePage | MainLayout |
| `/contact` | ContactPage | MainLayout |
| `/ai-examples` | AIExamplesPage | MainLayout |
| `/client-examples` | ClientExamplesPage | MainLayout |
| `/about-us` | AboutUsPage | MainLayout |
| `/project/:slug` | ProjectDetailPage | MainLayout |

## 3. Data-Driven Projects

`src/data/projects.js` is the single source of truth:
- `projects[]` — metadata for all client work (id, slug, title, subtitle, tags, image, featured, order)
- `prototypingExamples[]` — AI example metadata with componentKey mapping

Adding a project:
1. Add entry to `projects[]` in `data/projects.js`
2. Create `pages/projects/NewProject.jsx`
3. Register in `pages/projects/index.js`

## 4. Theming Architecture

CSS custom properties → Tailwind utility classes → components use semantic tokens only.

```
themes.js (color values per theme)
  → ThemeContext (swaps CSS vars on :root, persists to localStorage)
    → tailwind.config.js (maps CSS vars → Tailwind classes)
      → Components (bg-base, text-heading, border-main, etc.)
```

### Semantic Color Tokens

| Token | Tailwind Class | Dark | Light | Usage |
|---|---|---|---|---|
| `--color-bg-base` | `bg-base` | neutral-900 | white | Page background |
| `--color-bg-surface` | `bg-surface` | neutral-800 | neutral-100 | Cards, elevated |
| `--color-bg-deep` | `bg-deep` | neutral-950 | neutral-200 | Deeper sections |
| `--color-bg-overlay` | `bg-overlay/[0.03]` | white | black | Subtle overlays |
| `--color-text-heading` | `text-heading` | white | neutral-900 | Headings |
| `--color-text-body` | `text-body` | neutral-300 | neutral-700 | Body text |
| `--color-text-muted` | `text-muted` | neutral-400 | neutral-600 | Secondary |
| `--color-text-faint` | `text-faint` | neutral-500 | neutral-500 | Subtle |
| `--color-text-ghost` | `text-ghost` | neutral-600 | neutral-400 | Very subtle |
| `--color-border-main` | `border-main` | neutral-800 | neutral-200 | Primary borders |
| `--color-border-tag` | `border-tag` | neutral-400 | neutral-600 | Tag borders |
| `--color-accent` | `bg-accent` | blue-600 | blue-600 | CTA actions |
| `--color-cta-bg` | `bg-cta` | white | neutral-900 | Primary CTA bg |
| `--color-cta-text` | `text-cta-text` | neutral-900 | white | Primary CTA text |

### Adding a New Theme
1. Add entry to `src/theme/themes.js` with all token values
2. It automatically appears in the theme switcher

## 5. Design System Reference

### Colors
All colors use semantic tokens — **never hardcode** colors like `neutral-900` in components.

| Instead of... | Use... |
|---|---|
| `bg-neutral-900` | `bg-base` |
| `bg-neutral-800` | `bg-surface` |
| `bg-neutral-950` | `bg-deep` |
| `text-white` | `text-heading` |
| `text-neutral-300` | `text-body` |
| `text-neutral-400` | `text-muted` |
| `border-neutral-800` | `border-main` |
| `bg-blue-600` | `bg-accent` |

**Exception:** Status colors and decorative icon accents can remain hardcoded.

### Typography
- Display: `text-5xl md:text-6xl lg:text-7xl font-light tracking-tight`
- Headline: `text-3xl md:text-4xl font-light tracking-tight`
- Title: `text-xl font-medium`
- Body: `text-body leading-relaxed`
- Label: `text-sm font-light tracking-wide`

### Spacing
- 4px grid: p-1 = 4px, p-2 = 8px, p-4 = 16px, p-6 = 24px, p-8 = 32px
- Section: `py-20 md:py-32`
- Content max: `max-w-7xl mx-auto px-6 lg:px-12`

### Shape
- Cards/sections: `rounded-2xl`
- Inputs/tags: `rounded-lg` or `rounded-full`

## 6. Navigation

Defined in `src/config/navigation.js`. Adding a nav item:
1. Add entry to `navigationItems[]` with id, label, path, order
2. Shared Header and Footer pick it up automatically

## 7. Deployment

### Setup (one-time)
1. Copy `.env.example` to `.env` in the project root
2. Fill in your FTP credentials in `.env`
3. `.env` is in `.gitignore` — it will never be pushed to GitHub

### Deploy
```bash
npm run build              # Creates optimized build/ folder
python upload_ftp.py       # Uploads build/ to server via FTP
```

### Environment Variables (.env)
```
FTP_HOST=ftp.rabitlearning.com
FTP_USER=your_username
FTP_PASS=your_password
FTP_REMOTE_PATH=/rivet-studio
```

**IMPORTANT:** Never put credentials in source code files. Always use `.env`.

## 8. Google Analytics

Measurement ID: `G-3CFCVCZ1M6`

The gtag.js snippet loads in `public/index.html`. All custom event tracking lives in `src/utils/analytics.js`.

### Tracked Events

| Event | Fires when | Key params |
|---|---|---|
| `page_view` | Every route change (automatic) | `page_path`, `page_title` |
| `nav_click` | Header, footer, or mobile menu link clicked | `nav_item`, `nav_location` |
| `cta_click` | Any CTA button clicked | `cta_label`, `cta_location` |
| `project_click` | Project card or carousel item clicked | `project_name`, `click_source` |
| `project_view` | Project detail page opened | `project_name` |
| `example_nav` | AI carousel prev/next | `example_name`, `direction` |
| `example_expand` | AI accordion opened | `example_name` |
| `example_tab` | Details/Tools/Data tab selected | `example_name`, `tab_name` |
| `form_submit` | Contact form submitted | `submit_status`, `budget_range` |
| `theme_toggle` | Dark/light switch toggled | `theme` |
| `flowchart_click` | XP flow step clicked | `step_label` |
| `video_play` | Video thumbnail clicked | `video_title` |

### Adding New Events
1. Add a tracking function to `src/utils/analytics.js`
2. Import and call it in the relevant component
3. View in GA4 → Reports → Engagement → Events

## 9. Key Files

| File | Purpose |
|---|---|
| `.cursorrules` | Conventions for Cursor AI |
| `.env.example` | FTP credential template (commit this) |
| `.env` | Actual credentials (NEVER commit — in .gitignore) |
| `PLAN.md` | This document |
| `CHANGELOG.md` | Version history |
| `VERSION_GUIDE.md` | Version guide |
| `upload_ftp.py` | FTP deployment script |
| `src/utils/analytics.js` | Google Analytics event helpers |
| `src/utils/usePageTracking.js` | Auto page view tracking hook |
| `src/config/navigation.js` | Nav menu items |
| `src/data/projects.js` | Project registry |
| `src/theme/themes.js` | Theme definitions |
| `src/layouts/MainLayout.jsx` | Shared layout (header, footer, routing, page tracking) |
