import React from 'react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import productExcellenceMultipleDevices from '../../assets/Product-Excellence-Multiple-Devices.jpg';
import productExcellenceCUJs from '../../assets/Product-Excellence-CUJs.jpg';

const ProductExcellence = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="Google Product Excellence Website"
      description="Led complete end-to-end UX design for Product Excellence. Collaborated with Product Managers (PM) to establish a shared language and vernacular that aligned PM, Engineering (ENG), and User Experience (UX) teams. The impact of Product Excellence is now evident in company-wide Objectives and Key Results (OKRs) and ongoing efforts to enhance critical user journeys (CUJs) for improved user experience."
    />
    <TwoColumnSection
      leftTitle="Focus Areas:"
      leftItems={[
        "Defining Principles of Excellence",
        "Identifying critical user journeys",
        "Addressing barriers to excellence",
        "Highlighting common pitfalls",
        "Establishing a comprehensive product directory"
      ]}
      rightTitle="Impact:"
      rightItems={[
        "Created a shared language across PM, Engineering, and UX teams",
        "Influenced company-wide OKRs",
        "Improved critical user journey planning",
        "Enhanced cross-functional collaboration",
        "Established best practices for product excellence"
      ]}
    />
    <ProcessSection
      title="Product Workshops"
      description="Facilitated and led workshops with participants from product management, user experience, and engineering teams. Successfully aligned key stakeholders on the product mission and themes, guiding the strategic planning process for 2023."
    >
      <div className="rounded-lg overflow-hidden bg-overlay/10">
        <img
          src={productExcellenceMultipleDevices}
          alt="Workshop Process Diagram"
          className="w-full h-auto object-contain"
        />
      </div>
    </ProcessSection>
    <div className="mb-16">
      <div className="bg-surface rounded-2xl p-8 lg:p-12">
        <div className="rounded-lg overflow-hidden bg-overlay/10">
          <img
            src={productExcellenceCUJs}
            alt="Product Excellence — Critical user journeys"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <p className="text-faint text-center mt-4 text-sm">Complete end-to-end UX design for Product Excellence platform</p>
    </div>
  </div>
);

export default ProductExcellence;
