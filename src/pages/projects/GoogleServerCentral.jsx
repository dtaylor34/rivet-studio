import React from 'react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import serverCentralDashboard from '../../assets/Server-Central-Dashboard.jpg';
import serverCentralDiagram from '../../assets/ServerCentral-diagram.jpg';
import serverCentralMicrosite from '../../assets/ServerCentral-microsite.jpg';
import serverCentralOnboarding from '../../assets/ServerCentral-Onboarding.jpg';

const GoogleServerCentral = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="Google Server Central"
      description="Server Central consolidates all server tools into a single, streamlined experience. It enables product teams to effortlessly launch, migrate, manage, prototype, and monitor the servers crucial to delivering an exceptional user experience for Google users."
    />
    <TwoColumnSection
      leftTitle="Contributions"
      leftItems={[
        "Developed and executed UX strategy and planning",
        "Led design sprints and facilitated workshops",
        "Defined critical user journeys (CUJs) for the product",
        "Built interactive prototypes to enhance the user experience",
        "Conducted thorough testing and gathered feedback from existing users",
        "Collaborated with the engineering team to develop an integrated UX solution"
      ]}
      rightTitle="Challenges"
      rightItems={[
        "Difficulty: Identified Google Material templates and patterns, while promoting the use of Boq and demonstrating how Boq Studio can effectively provide developers with contextual information and necessary details.",
        "Leadership: Prioritized UX designs for high-value features to prototype and test, ensuring the greatest user impact. Adjusted designs and project scope for maximum potential impact.",
        "Impact: Implemented a principled, user-centric approach by leveraging existing patterns, templates, and styles to create new Wiz patterns and styles."
      ]}
    />
    <ProcessSection
      title="Boq Studio Product Flow"
      description="Visualized high-value events to align them with the goals of the product's critical user journeys (CUJs). Prioritized and consistently reinforced user needs throughout the entire user experience."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={serverCentralDashboard}
          alt="Boq Studio Product Flow Diagram"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
    <ProcessSection
      title="Product Tool Integration"
      description="Restructured the visual hierarchy to improve organization and clarity. Created a simple, flexible, and intuitive single-panel experience. The project had a significant impact, supporting over 30K+ engineers."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={serverCentralDiagram}
          alt="Product Tool Integration Interface"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
    <ProcessSection
      title="Boq Studio Microsite"
      description="Directed the complete end-to-end UX development process for a platform showcasing new features and training sessions of Boq Studio product."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={serverCentralMicrosite}
          alt="Boq Studio Microsite"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
    <ProcessSection
      title="Onboarding Warm Welcome"
      description="Directed comprehensive end-to-end UX design for first-time users. Developed a captivating onboarding experience that effectively highlights key features."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={serverCentralOnboarding}
          alt="Onboarding Experience"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
  </div>
);

export default GoogleServerCentral;
