import React from 'react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import { FlowChart } from '../../components/ui/FlowChart';
import { AnalysisCircles } from '../../components/ui/AnalysisCircles';
import experimentsPortal01 from '../../assets/Experiments-Portal-01.jpg';

const GoogleExperiments = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="Google Experiments Portal (XP)"
      description="The Experiments Portal revolutionizes the way product teams conduct experiments at Google. XP has seamlessly integrated multiple tools into a single platform, empowering developers to effortlessly test hypotheses, analyze data slices, monitor experiments, and effectively quantify decisions regarding new product features."
    />
    <TwoColumnSection
      leftTitle="Contributions"
      leftItems={[
        "Developed and executed UX strategy and planning",
        "Led design sprints and facilitated workshops",
        "Defined critical user journeys (CUJs) for the product",
        "Built interactive UX prototypes",
        "Oversaw the integration of UX and engineering",
        "Successfully migrated multiple products onto a unified platform"
      ]}
      rightTitle="Challenges"
      rightItems={[
        "Difficulty: Aligned agendas among cross-functional teams (Rasta, Mendel, and XP) to achieve a unified experience, enhancing developer velocity.",
        "Leadership: Prioritized UX designs for high-value features, incorporating leadership input, and swiftly adjusted the designs to optimize the front-end of an earlier QuiX migration release.",
        "Impact: Implemented a user-focused approach, leveraging existing patterns and minimizing cognitive load for developers when learning a new product tool."
      ]}
    />
    <ProcessSection
      title="Google XP Product Flow"
      description="Developed and spearheaded the UX integration of QuiX into XP. Leveraged existing back-end features and implemented Google Material front-end design solutions."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={experimentsPortal01}
          alt="Google XP Product Flow"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
    <ProcessSection
      title="Google XP Experimentation Process"
      description="Led end-to-end UX prototypes to help demonstrate how the Experiment process works within the new configuration. My prototypes were essential and useful for engineers to adopt the new direction and to also align efforts on a shared vision for XP."
    >
      <div className="bg-deep rounded-lg overflow-hidden">
        <FlowChart />
      </div>
    </ProcessSection>
    <ProcessSection
      title="Google XP Analysis"
      description="Led the complete end-to-end UX integration of over 7 stand-alone tools, successfully merging them into a unified and seamless experience within XP. The project had a significant impact, supporting over 30K+ servers in production."
    >
      <div className="bg-deep rounded-lg min-h-[500px] overflow-visible">
        <AnalysisCircles />
      </div>
    </ProcessSection>
  </div>
);

export default GoogleExperiments;
