// Google Analytics event tracking utilities
// Wraps gtag() calls with safe guards and consistent naming.
//
// Event naming convention:
//   category_action  (e.g., nav_click, project_view, cta_click)
//
// All events appear in GA4 → Reports → Engagement → Events

const gtag = (...args) => {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

// ── Page-level tracking ─────────────────────────────────────────

/** Track virtual page views (called automatically by usePageTracking hook) */
export const trackPageView = (path, title) => {
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
};

// ── Navigation ──────────────────────────────────────────────────

/** Header/footer nav link clicked */
export const trackNavClick = (label, location = 'header') => {
  gtag('event', 'nav_click', {
    nav_item: label,
    nav_location: location,    // 'header', 'footer', 'mobile_menu'
  });
};

// ── Projects ────────────────────────────────────────────────────

/** Project card or carousel item clicked */
export const trackProjectClick = (projectTitle, source = 'carousel') => {
  gtag('event', 'project_click', {
    project_name: projectTitle,
    click_source: source,       // 'carousel', 'card_list', 'breadcrumb'
  });
};

/** Project detail page viewed (fires on mount) */
export const trackProjectView = (projectTitle) => {
  gtag('event', 'project_view', {
    project_name: projectTitle,
  });
};

// ── AI Examples / Prototypes ────────────────────────────────────

/** AI example carousel navigated */
export const trackExampleNav = (exampleTitle, direction) => {
  gtag('event', 'example_nav', {
    example_name: exampleTitle,
    direction: direction,       // 'next', 'prev', 'swipe_next', 'swipe_prev'
  });
};

/** AI example accordion expanded */
export const trackExampleExpand = (exampleTitle) => {
  gtag('event', 'example_expand', {
    example_name: exampleTitle,
  });
};

/** AI example detail tab selected */
export const trackExampleTab = (exampleTitle, tab) => {
  gtag('event', 'example_tab', {
    example_name: exampleTitle,
    tab_name: tab,              // 'details', 'tools', 'data'
  });
};

// ── CTAs ────────────────────────────────────────────────────────

/** Any call-to-action button clicked */
export const trackCTAClick = (label, location) => {
  gtag('event', 'cta_click', {
    cta_label: label,           // 'Get in Touch', 'Contact Us', 'View More', etc.
    cta_location: location,     // 'hero', 'header', 'footer', 'video_section', 'about_page'
  });
};

// ── Contact Form ────────────────────────────────────────────────

/** Contact form submitted (success or error) */
export const trackFormSubmit = (status, budget) => {
  gtag('event', 'form_submit', {
    form_name: 'contact',
    submit_status: status,      // 'success', 'error'
    budget_range: budget,       // 'less-than-10k', '10k-25k', etc.
  });
};

// ── Theme ───────────────────────────────────────────────────────

/** Theme toggled */
export const trackThemeToggle = (newTheme) => {
  gtag('event', 'theme_toggle', {
    theme: newTheme,            // 'dark', 'light'
  });
};

// ── Interactive components ──────────────────────────────────────

/** FlowChart step clicked */
export const trackFlowStepClick = (stepLabel) => {
  gtag('event', 'flowchart_click', {
    step_label: stepLabel,
  });
};

/** Video played */
export const trackVideoPlay = (videoTitle) => {
  gtag('event', 'video_play', {
    video_title: videoTitle,
  });
};
