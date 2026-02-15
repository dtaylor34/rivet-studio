import React from 'react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import brandArchitectureLogos from '../../assets/Brand-Architecture-Logos.jpg';

const BrandArchitecture = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="Brand Architecture"
      subtitle="Product visualization and design systems"
      description="Brand Architecture encompasses product visualization and design libraries that create a consistent, scalable visual language across products. This work establishes clear brand principles, component systems, and documentation to support product teams in delivering cohesive user experiences."
    />
    <TwoColumnSection
      leftTitle="Focus Areas:"
      leftItems={[
        "Product visualization systems",
        "Design libraries and component documentation",
        "Brand principles and guidelines",
        "Scalable design tokens and patterns",
        "Cross-product visual consistency"
      ]}
      rightTitle="Impact:"
      rightItems={[
        "Unified visual language across product surfaces",
        "Reduced design and development duplication",
        "Faster iteration with shared libraries",
        "Clear governance for brand and product expression",
        "Improved collaboration between design and engineering"
      ]}
    />
    <ProcessSection
      title="Brand Architecture Overview"
      description="Developed product visualization frameworks and design libraries to align teams on brand expression and reusable components."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={brandArchitectureLogos}
          alt="Brand Architecture Overview"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
  </div>
);

export default BrandArchitecture;
