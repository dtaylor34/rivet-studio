import React from 'react';
import { Link } from 'react-router-dom';
import { getNavigationItems } from '../../config/navigation';
import { trackNavClick, trackCTAClick } from '../../utils/analytics';

const Footer = () => {
  const navItems = getNavigationItems();

  return (
    <footer className="bg-base border-t border-main">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-faint text-sm">
            © {new Date().getFullYear()} Rivet Studio. All rights reserved.
            <span className="ml-2 text-muted" aria-hidden="true">· Portfolio v5</span>
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => trackNavClick(item.label, 'footer')}
                className="text-muted hover:text-heading transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => trackCTAClick('Contact', 'footer')}
              className="text-muted hover:text-heading transition-colors text-sm"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
