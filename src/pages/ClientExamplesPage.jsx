import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ui/ProjectCard';
import { trackCTAClick } from '../utils/analytics';

const ClientExamplesPage = () => {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
        <Link to="/" className="text-faint hover:text-body transition-colors">Home</Link>
        <span className="text-ghost">/</span>
        <span className="text-muted">Design Showcase</span>
      </nav>

      <div className="mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight">Design Showcase</h1>
        <p className="text-xl text-muted max-w-3xl leading-relaxed">
          Explore our portfolio of enterprise-level projects designed for leading organizations.
          Each case study demonstrates our approach to solving complex user experience challenges
          through thoughtful design, strategic thinking, and innovative solutions.
        </p>
      </div>

      <div className="space-y-20">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      <div className="mt-32 text-center">
        <div className="bg-base border border-main rounded-2xl p-12 lg:p-16">
          <h2 className="text-3xl lg:text-4xl font-light text-heading mb-6">Ready to start your project?</h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your product vision into reality with user-centered design and strategic innovation.
          </p>
          <Link to="/contact" onClick={() => trackCTAClick('Contact Us', 'client_examples')} className="px-8 py-3 border border-tag text-body rounded-full text-sm font-light tracking-wide hover:border-heading hover:text-heading transition-colors duration-300 inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientExamplesPage;
