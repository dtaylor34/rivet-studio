# Style updates — how to (rules & plan)

Follow these so changes stay consistent with the project and Material Design 3.

---

## 1. Use semantic color tokens only

**Rule (from .cursorrules):**  
*ALWAYS use semantic color tokens (bg-base, text-heading, border-main, etc.) — NEVER hardcode colors like neutral-900, text-white, etc.*

- **Do:** `text-heading`, `bg-base`, `border-main`, `text-muted`, `bg-surface`, `bg-deep`, etc.
- **Don’t:** `text-white`, `text-black`, `text-neutral-900`, `bg-gray-100`, etc.
- **Exception:** Status (green/red) and decorative accents (e.g. blue-400, purple-400 on process icons) may be hardcoded.

**Where tokens live:**  
`src/theme/themes.js` (values) → `tailwind.config.js` (Tailwind classes) → use in components.

**Theme behavior:**  
- Dark: `text-heading` = white, `bg-deep` = very dark.  
- Light: `text-heading` = dark (23,23,23), `bg-deep` = light gray.  
So “white in dark, black in light” is already handled by **using `text-heading`** (no need for `text-white` / `text-black`).

---

## 2. Tailwind only; minimal inline style

- Use **Tailwind utility classes** for layout, spacing, typography, colors, borders.
- **Inline styles** only for dynamic values (e.g. `backgroundImage`, `transform` from props/state).
- No CSS modules, no styled-components; global overrides only in `src/index.css` if needed.

---

## 3. Theme-specific behavior

- Prefer **one class** that works in both themes via tokens (e.g. `text-heading` on circles).
- If something doesn’t look right in one theme, first check `themes.js`: adjust the token value for that theme rather than hardcoding in the component.
- For rare cases where a component must override by theme, use `data-theme` set by ThemeContext (e.g. in `index.css`: `[data-theme="light"] .some-class { … }`) and still use tokens or existing utilities inside that override when possible.

---

## 4. Material Design 3 alignment

- **Elevation:** Surface tones (bg-base → bg-surface → bg-deep), not heavy shadows.
- **Spacing:** 4px grid; Tailwind spacing scale (p-2, gap-4, etc.).
- **Shape:** rounded-lg (inputs, tags), rounded-2xl (cards, sections).
- **Typography:** font-light for display, clear hierarchy; emphasis by weight, not only color.
- **Motion:** 200–300ms, ease-in-out; `transition-colors` / `transition-opacity` for states.
- **Interaction:** Clear hover/focus/active; visible focus ring (e.g. focus:ring-2 focus:ring-accent).

---

## 5. Accessibility

- Contrast: text meets WCAG 2.1 AA (semantic tokens are chosen for this).
- Focus: all interactive elements keyboard-focusable with visible focus indicator.
- Labels: buttons/links/inputs have visible text or aria-label/aria-labelledby.
- Images: meaningful `alt`; decorative images use `alt=""`.

---

## Checklist for a style change

1. **Color:** Use a token from `tailwind.config.js` (e.g. text-heading, bg-deep). No raw white/black/neutral unless status or decorative exception.
2. **Theme:** If it looks wrong in one theme, fix the token in `themes.js` for that theme rather than hardcoding in the component.
3. **Tailwind:** Prefer utilities; inline style only for dynamic values.
4. **A11y:** Check contrast and focus; keep labels and alt text.

---

## Reference

- **Conventions:** `.cursorrules`
- **Theme values:** `src/theme/themes.js`
- **Token → class mapping:** `tailwind.config.js`
- **Architecture:** `PLAN.md`
