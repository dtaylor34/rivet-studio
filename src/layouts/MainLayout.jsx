import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import logo from '../assets/rivet-studio-logo.svg';
import { projects } from '../data/projects';
import { getNavigationItems } from '../config/navigation';
import ThemeToggle from '../components/shared/ThemeToggle';
import Footer from '../components/shared/Footer';
import usePageTracking from '../utils/usePageTracking';
import { trackNavClick, trackCTAClick } from '../utils/analytics';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Header = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navItems = getNavigationItems();

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < lastScrollY) setIsVisible(true);
      else if (y > lastScrollY && y > 100) setIsVisible(false);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const currentPath = location.pathname;
  const isProjectPage = currentPath.startsWith('/project/');
  const projectSlug = isProjectPage ? currentPath.split('/project/')[1] : '';

  const projectTitleMap = {};
  projects.forEach((p) => { projectTitleMap[p.slug] = p.title; });

  return (
    <header
      className={`bg-base border-b border-main sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Left — Logo + Desktop Nav */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Rivet Studio" className="h-10 lg:h-12 w-auto" />
              <span className="text-xl lg:text-2xl font-light text-muted whitespace-nowrap">Rivet Studio</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => trackNavClick(item.label, 'header')}
                  className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                    currentPath === item.path ? 'text-heading' : 'text-muted hover:text-body'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right — Theme toggle, Contact (desktop), Hamburger (mobile) */}
          <div className="flex items-center gap-3 lg:gap-4">
            <ThemeToggle />

            <Link
              to="/contact"
              onClick={() => trackCTAClick('Contact Us', 'header')}
              className="hidden lg:inline-block px-6 py-2 border border-tag text-body rounded-full text-sm font-light tracking-wide hover:border-heading hover:text-heading transition-colors duration-300 whitespace-nowrap"
            >
              Contact Us
            </Link>

            {/* Hamburger Button — Mobile only */}
            <button
              className="lg:hidden p-2 rounded-lg text-muted hover:text-heading hover:bg-surface transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                /* X icon */
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Breadcrumb for project pages */}
        {isProjectPage && (
          <nav className="flex items-center gap-2 text-sm mt-3 lg:mt-4" aria-label="Breadcrumb">
            <Link to="/" className="text-faint hover:text-body transition-colors">Home</Link>
            <span className="text-ghost">/</span>
            <span className="text-muted">{projectTitleMap[projectSlug] || 'Project'}</span>
          </nav>
        )}
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-main bg-base"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => trackNavClick(item.label, 'mobile_menu')}
                className={`block px-4 py-3 rounded-lg text-base font-light transition-colors duration-200 ${
                  currentPath === item.path
                    ? 'text-heading bg-surface'
                    : 'text-muted hover:text-heading hover:bg-surface/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => trackCTAClick('Contact Us', 'mobile_menu')}
              className="block px-4 py-3 rounded-lg text-base font-light text-muted hover:text-heading hover:bg-surface/50 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const MainLayout = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-base">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
