// Central project registry — single source of truth for all project metadata.
// Adding a project: add entry here, create detail page, register in pages/projects/index.js

import unMapperGraphic from '../assets/un-mapper-graphic-angle.jpg';
import experimentsPortal01 from '../assets/Experiments-Portal-01.jpg';
import serverCentralDashboard from '../assets/Server-Central-Dashboard.jpg';
import productExcellenceMultipleDevices from '../assets/Product-Excellence-Multiple-Devices.jpg';
import brandArchitectureLogos from '../assets/Brand-Architecture-Logos.jpg';
import hatsSurveysLanding from '../assets/HaTS-Surveys-Landing.jpg';

export const projects = [
  {
    id: 1,
    slug: "un-data-portal",
    title: "United Nations Data Portal",
    subtitle: "Consolidating certified agency data into a single entry point",
    tags: ["UX Design", "Product Strategy", "AI/ML"],
    image: unMapperGraphic,
    featured: true,
    order: 1,
  },
  {
    id: 2,
    slug: "google-server-central",
    title: "Google Server Central",
    subtitle: "Streamlined server management experience",
    tags: ["UX Design", "Product Strategy", "Developer Tools"],
    image: serverCentralDashboard,
    featured: true,
    order: 2,
  },
  {
    id: 3,
    slug: "google-experiments",
    title: "Google Experiments Portal (XP)",
    subtitle: "Revolutionizing experimentation at Google",
    tags: ["UX Design", "Product Integration", "Developer Experience"],
    image: experimentsPortal01,
    featured: true,
    order: 3,
  },
  {
    id: 4,
    slug: "product-excellence",
    title: "Google Product Excellence",
    subtitle: "Defining principles and critical user journeys",
    tags: ["UX Strategy", "Product Design", "Workshop Facilitation"],
    image: productExcellenceMultipleDevices,
    featured: true,
    order: 4,
  },
  {
    id: 5,
    slug: "google-hats",
    title: "Google HaTS",
    subtitle: "In-product survey tool for user sentiment",
    tags: ["UX Design", "Product Design", "Multi-platform"],
    image: hatsSurveysLanding,
    featured: true,
    order: 5,
  },
  {
    id: 6,
    slug: "brand-architecture",
    title: "Brand Architecture",
    subtitle: "Product visualization and design systems",
    tags: ["UX Design", "Brand Strategy", "Design Systems"],
    image: brandArchitectureLogos,
    featured: true,
    order: 6,
  },
];

export const prototypingExamples = [
  {
    id: 'flight-charter',
    title: 'Flight Charter',
    description: 'Interactive global flight network visualization',
    componentKey: 'FlightNetworkChart',
    details: {
      description: 'An interactive visualization showing global flight routes and connections. Users can explore major airports and their network connections through an intuitive, animated interface.',
      tools: ['React', 'D3.js', 'Canvas API', 'JavaScript'],
      data: 'Airport coordinates and flight route data sourced from OpenFlights database and publicly available aviation datasets.'
    }
  },
  {
    id: 'rivet-mapper',
    title: 'Rivet Mapper',
    description: 'Interactive rivet mapping application',
    componentKey: 'RivetMapper',
    details: {
      description: 'A creative tool that allows users to create dot-based artwork through an interactive canvas. Features include preset designs, custom creation mode, image tracing, and the ability to save and share designs.',
      tools: ['React', 'HTML Canvas', 'Firebase', 'JavaScript', 'Image Processing APIs'],
      data: 'Preset designs created in-house. User-generated designs stored in Firebase. Image tracing uses edge detection algorithms on user-uploaded images.'
    }
  },
  {
    id: 'phone-loader',
    title: 'Phone Loader',
    description: 'Animated mobile device loading interface',
    componentKey: 'PhoneLoader',
    details: {
      description: 'An elegant loading animation designed for mobile interfaces. Features smooth animations, customizable states, and a modern design system that adapts to different content loading scenarios.',
      tools: ['React', 'CSS Animations', 'Tailwind CSS', 'SVG Graphics', 'JavaScript'],
      data: 'Animation timing and transitions built using CSS keyframes and React state management. No external data sources required.'
    }
  }
];
