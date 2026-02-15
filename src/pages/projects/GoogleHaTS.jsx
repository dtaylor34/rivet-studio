import React from 'react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import hatsSurveysLanding from '../../assets/HaTS-Surveys-Landing.jpg';
import hatsSurveysSetup from '../../assets/HaTS-Surveys-Setup.jpg';

const GoogleHaTS = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="Google HaTS"
      subtitle="Happiness Tracking Surveys"
      description="HaTS (Happiness Tracking Surveys) is an in-product survey tool designed to capture user sentiment regarding product experiences across Android, Web, and iOS clients. I led the UX vision and design for the new survey setup tool. Additionally, I developed a universal survey template that seamlessly adapted to various device surfaces, incorporating a Google Material aesthetic prior to its release."
    />
    <TwoColumnSection
      leftTitle="Impact:"
      leftItems={[
        "Universal survey templates reduced development time significantly",
        "Ensured upfront alignment across teams",
        "Minimized engineering efforts through standardized design",
        "Seamless adaptation across Android, Web, and iOS platforms"
      ]}
      rightTitle="Design Process:"
      rightItems={[
        "Led UX vision for survey setup tool",
        "Created responsive survey templates",
        "Incorporated Google Material design language",
        "Designed for multi-platform consistency",
        "Built scalable component system"
      ]}
    />
    <ProcessSection
      title="Google HaTS Landing Page"
      description="Directed the complete end-to-end UX development for HaTS3, including the microsite and survey cards. Developed the brand identity, illustrations, and brand awareness for HaTS3 as a stand-alone tool."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={hatsSurveysLanding}
          alt="HaTS Landing Page"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
    <ProcessSection
      title="Google HaTS Rating Banner Survey"
      description="Led the complete end-to-end UX process for survey card layout, design, and positioning across mobile, tablet, and desktop devices."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={hatsSurveysSetup}
          alt="Rating Banner Survey Examples"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
  </div>
);

export default GoogleHaTS;
