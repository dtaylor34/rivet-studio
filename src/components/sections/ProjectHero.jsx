import React from 'react';

const ProjectHero = ({ title, subtitle, description }) => (
  <div className="mb-20">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-4 tracking-tight leading-tight">
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl md:text-2xl text-faint font-light mb-8">{subtitle}</p>
    )}
    <p className="text-lg md:text-xl text-body leading-relaxed font-light max-w-4xl">
      {description}
    </p>
  </div>
);

export default ProjectHero;
