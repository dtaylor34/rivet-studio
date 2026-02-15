import React, { useState } from 'react';
import { User, Wrench, Percent } from 'lucide-react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import { trackVideoPlay } from '../../utils/analytics';
import unMapperGraphicAngle from '../../assets/un-mapper-graphic-angle.jpg';
import unMapperGraphic45 from '../../assets/un-mapper-graphic-45.jpg';
import unAgentComputer from '../../assets/un-agent-computer.jpg';
import unAgentFlow from '../../assets/un-agent-flow.jpg';
import unDataFlow from '../../assets/un-data-flow.jpg';

const UN_AMBASSADOR_VIDEO_URL = 'https://drive.google.com/file/d/1KqPmGGzZyRt2E6cONv9WMqp5HWS6IebD/preview';

const listeningSteps = [
  { id: 'research', title: 'User research', description: 'Multiple users interviewed.', icon: User },
  { id: 'needs', title: 'Needs applied', description: 'Suggested needs captured.', icon: Wrench },
  { id: 'outcome', title: 'Outcome', description: 'One product, all skill levels.', icon: Percent },
];

function ListeningCircles() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="rounded-lg overflow-visible bg-deep border border-main p-8 lg:p-12 font-sans min-h-[500px] flex flex-col">
      <h2 className="text-[26px] md:text-[32px] font-normal text-heading tracking-normal mb-12 text-center" style={{ letterSpacing: 0 }}>
        User Outreach
      </h2>
      <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-8 lg:gap-6">
        {listeningSteps.map((step, index) => {
          const isHovered = hoveredId === step.id;
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <div className="flex-shrink-0 hidden lg:block" aria-hidden>
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-muted">
                    <path d="M0 12H36M32 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full border flex flex-col items-center justify-center cursor-pointer z-10 transition-all duration-200 ease-out ${
                    isHovered ? 'scale-110 border-heading bg-surface' : 'scale-100 border-muted bg-deep'
                  }`}
                  aria-label={step.title}
                >
                  <Icon className="w-8 h-8 mb-2 text-heading" strokeWidth={1.5} aria-hidden />
                  <span className="text-sm md:text-base font-medium text-heading">{step.title}</span>
                </div>
                {isHovered && (
                  <div
                    className="absolute top-full mt-6 w-64 bg-surface rounded-xl p-5 shadow-2xl border border-subtle z-20 left-1/2 -translate-x-1/2"
                    role="tooltip"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-t border-l border-subtle transform rotate-45" aria-hidden />
                    <h3 className="text-heading font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{step.description}</p>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const UNDataPortal = () => {
  const [showAmbassadorVideo, setShowAmbassadorVideo] = useState(false);

  return (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="United Nations Data Portal"
      subtitle="Powered by Google Data Commons"
      description="UN Data Portal, powered by Google Data Commons, consolidates certified agency data into a single entry point. It enables users to quickly research, save, download and manage their data for policy research and other initiatives."
    />
    <TwoColumnSection
      leftTitle="Contributions"
      leftItems={[
        "Developed and executed UX strategy and planning",
        "Led design sprints for front-end engineer efforts",
        "Built interactive prototypes to enhance the user experience",
        "Collaborated with the engineering team to develop an integrated UX solution"
      ]}
      rightTitle="Challenges"
      rightItems={[
        "Difficulty: Identified UN templates and patterns, while promoting the best ways to navigate the new proposed portal.",
        "Innovation: Created new AI Assistant interface prototype to improve user engagement",
        "Leadership: Prioritized UX designs and developed a comprehensive design system in Figma, including reusable components, interactive prototypes, and style guides",
        "Impact: The new portal will be used by statisticians, policy makers, educators and students from around the world. It will also be available in multiple languages."
      ]}
    />
    <ProcessSection
      title="UN Data Portal — Powered by Google Data Commons"
      description="Developed and spearheaded the UX integration of QuiX into XP. Leveraged existing back-end features and implemented Google Material front-end design solutions."
    >
      <div className="space-y-10">
        <div>
          <div className="rounded-lg overflow-hidden bg-overlay/10">
            <img
              src={unMapperGraphicAngle}
              alt="UN Data Portal — Powered by Google Data Commons"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-body text-lg mt-4">Conversational data exploration using natural language search.</p>
        </div>
        <div>
          <div className="rounded-lg overflow-hidden bg-overlay/10">
            <img
              src={unMapperGraphic45}
              alt="UN Data Portal mapper interface"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-body text-lg mt-4">Data touch points using NL Search</p>
        </div>
      </div>
    </ProcessSection>
    <ProcessSection
      title="UN Data — AI Ambassador"
      description="Created AI Assistant prototype. Developed voice and attitude. Scripted narrative. Prototyped concept video."
    >
      <div className="space-y-12">
        <div>
          <div className={`rounded-lg overflow-hidden bg-overlay/10 relative ${showAmbassadorVideo ? 'aspect-video' : ''}`}>
            {showAmbassadorVideo ? (
              <>
                <iframe
                  src={UN_AMBASSADOR_VIDEO_URL}
                  title="UN AI Ambassador video"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                />
                <button
                  type="button"
                  onClick={() => setShowAmbassadorVideo(false)}
                  className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-md bg-black/70 text-white text-sm font-medium hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close video and show image"
                >
                  Close video
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => { setShowAmbassadorVideo(true); trackVideoPlay('UN AI Ambassador'); }}
                className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset rounded-lg"
                aria-label="Play UN AI Ambassador video"
              >
                <img
                  src={unAgentComputer}
                  alt="UN AI Ambassador — computer interface. Select to play video."
                  className="w-full h-auto object-contain cursor-pointer"
                />
              </button>
            )}
          </div>
          <p className="text-body text-lg mt-4">Play Video: Experience Alba the UN Ambassador (Prototype)</p>
        </div>
        <div>
          <div className="rounded-lg overflow-hidden bg-overlay/10">
            <img
              src={unAgentFlow}
              alt="UN AI Ambassador — flow"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-body text-lg mt-4">Interact and view message threads with agent to learn more about UN Data.</p>
        </div>
      </div>
    </ProcessSection>
    <ProcessSection
      title="UN Data - Listening to the user."
      description="By interviewing multiple users we were able to apply many—if not all—of the suggested needs to create a product that works well for the beginner through to the advanced user."
    >
      <ListeningCircles />
    </ProcessSection>
    <div className="mb-16">
      <div className="bg-surface rounded-2xl p-8 lg:p-12">
        <div className="rounded-lg overflow-hidden bg-overlay/10">
          <img
            src={unDataFlow}
            alt="UN Data flow — User, UNData, and UN organizations"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <p className="text-faint text-center mt-4 text-sm">Details: Developed MVP mocks, Designed complete website</p>
    </div>
  </div>
  );
};

export default UNDataPortal;
