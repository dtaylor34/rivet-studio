import React from 'react';

const ProcessSection = ({ title, description, image, children }) => (
  <div className="mb-20">
    <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">{title}</h2>
    {description && (
      <p className="text-lg text-body mb-8 leading-relaxed max-w-3xl">{description}</p>
    )}
    <div className="bg-surface rounded-2xl p-8 lg:p-12">
      {children ?? (
        <div className="bg-overlay/10 rounded-lg aspect-video flex items-center justify-center">
          <p className="text-faint text-center">Image: {image}</p>
        </div>
      )}
    </div>
  </div>
);

export default ProcessSection;
