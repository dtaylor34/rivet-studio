// Navigation Configuration
// This file contains all navigation menu items used throughout the site
// Add or modify menu items here and they will be updated everywhere automatically

export const navigationItems = [
  {
    id: 'client-examples',
    label: 'Design Showcase',
    path: '/client-examples',
    order: 1
  },
  {
    id: 'about-us',
    label: 'About',
    path: '/about-us',
    order: 2
  },
  {
    id: 'ai-examples',
    label: 'Login',
    path: '/ai-examples',
    order: 3
  }
];

// Helper function to get navigation items in order
export const getNavigationItems = () => {
  return [...navigationItems].sort((a, b) => a.order - b.order);
};

