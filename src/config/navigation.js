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
    id: 'ai-examples',
    label: 'Clients',
    path: '/ai-examples',
    order: 2
  },
  {
    id: 'about-us',
    label: 'About Us',
    path: '/about-us',
    order: 3
  }
];

// Helper function to get navigation items in order
export const getNavigationItems = () => {
  return [...navigationItems].sort((a, b) => a.order - b.order);
};

