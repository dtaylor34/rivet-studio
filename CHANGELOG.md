# Changelog

All notable changes to the Rivet Studio portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v2.0] - 2024-12-06

### Added
- **New Navigation System:**
  - Added "AI Examples" menu item
  - Added "Client Examples" menu item
  - Added "About Us" menu item
  - Navigation items appear to the right of Rivet Studio logo with proper spacing

- **New Pages:**
  - AI Examples page (placeholder ready for content)
  - Client Examples page (placeholder ready for content)
  - About Us page (placeholder ready for content)

- **Shared Header Component:**
  - Created centralized SharedHeader component for consistency across all pages
  - Header now appears on all pages (home, projects, contact, and new pages)
  - Auto-hide header on scroll down, show on scroll up
  - Active page highlighting in navigation
  - Responsive design for mobile and desktop

- **Navigation Configuration:**
  - Created `src/config/navigation.js` for centralized menu management
  - Easy to add/remove/reorder menu items in one place
  - Changes automatically propagate to all pages

### Changed
- Updated all page components to use SharedHeader for consistency
- Improved header layout with better spacing and alignment
- Enhanced mobile navigation display

### Technical Improvements
- Modular navigation system makes future updates easier
- Single source of truth for navigation items
- Better code organization and reusability

### Content Updates (Latest)
- **AI Examples Page:** Complete interactive prototypes showcase
  - Flight Charter with global flight network visualization
  - Rivet Mapper dot-to-dot design tool
  - Phone Loader animation demo
  - Expandable sections with Details and Interactive Demo tabs
  - Full technology stack and data source information

- **Client Examples Page:** Professional project portfolio
  - All 5 major projects (UN Data Portal, Google Server Central, Google XP, Product Excellence, Google HaTS)
  - Click-through to detailed case studies
  - Professional presentation with project cards
  - Call-to-action for new clients

- **About Us Page:** Comprehensive company information
  - Mission statement: User-first innovation house focused on AI-powered UX
  - Philosophy and approach sections
  - Services overview (6 core service areas)
  - Experience highlights
  - Multiple CTAs for engagement

- All pages include breadcrumb navigation for better UX

---

## [v1.0] - 2024-12-06

### Added
- **Portfolio Components:**
  - RivetStudio main portfolio component with project showcase
  - ContactPage for user inquiries and communication
  - RivetMapper interactive dot-to-dot design tool
  - PhoneLoader animated mobile device loading interface
  - GlobalFlightNetwork and FlightNetworkChart interactive visualizations

- **Project Showcase:**
  - UN Data Portal case study
  - Google Server Central case study
  - Google Experiments Portal (XP) case study
  - Google Product Excellence case study
  - Google HaTS case study

- **Infrastructure:**
  - Firebase configuration for backend services
  - Tailwind CSS styling framework integration
  - PostCSS configuration
  - Production-ready .htaccess file for Apache deployment

- **Interactive Experiments Section:**
  - Flight Charter - Interactive global flight network visualization
  - Rivet Mapper - Interactive dot-to-dot design tool
  - Phone Loader - Animated mobile device loading interface

### Configuration
- React Router for navigation
- Responsive design for mobile and desktop
- Auto-hide header on scroll
- Project detail pages with case studies

---

## [Initial] - 2024-12-06

### Added
- Initial Create React App setup
- Basic project structure

