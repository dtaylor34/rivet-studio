import React, { useState } from 'react';
import { FlowStep } from './FlowStep';
import { trackFlowStepClick } from '../../utils/analytics';

const BOTTOM_DESCRIPTIONS = {
  Ramp: 'Gradually increase traffic allocation.',
  Analysis: 'Deep dive into statistical significance and results.',
  Monitoring: 'Track real-time system health and errors.',
  Details: 'View granular configuration metadata.',
  History: 'Audit log of all changes made to this study.',
  Manage: 'Administrative controls and permissions management.',
};

export function FlowChart() {
  const [activeStep, setActiveStep] = useState('System Selection');

  const handleStepClick = (label) => {
    setActiveStep(label);
    trackFlowStepClick(label);
  };

  return (
    <div className="flex justify-center p-6 md:p-12 overflow-x-auto">
      <div className="relative w-full max-w-[880px] min-w-0">
        {/* Center column (main stack) */}
        <div className="flex flex-col items-center z-20">
          <h3 className="text-[26px] md:text-[32px] font-normal text-muted tracking-normal mb-6" style={{ letterSpacing: 0 }}>XP Product Flow</h3>

          <div className="flex flex-col gap-3 w-64 z-20">
            <FlowStep
              label="Create new study (QuiX)"
              isActive={activeStep === 'Create new study (QuiX)'}
              onClick={() => handleStepClick('Create new study (QuiX)')}
              description="Initialize a new user research study using the QuiX framework. This sets up the foundational parameters for your experiment."
            />

            <FlowStep
              label="System Selection"
              variant={activeStep === 'System Selection' ? 'highlight' : 'default'}
              isActive={activeStep === 'System Selection'}
              onClick={() => handleStepClick('System Selection')}
              className="relative z-20"
              description="Choose the target ecosystem for your study. Available systems: Search Ads, Content Ads, GWS, Play, Shopping, and Superroot."
            />

            <div className="grid grid-cols-2 gap-3">
              <FlowStep
                label="Experiment"
                onClick={() => handleStepClick('Experiment')}
                isActive={activeStep === 'Experiment'}
                description="Configure A/B testing parameters, define variables, and set up your control and treatment groups."
              />
              <FlowStep
                label="Launch"
                onClick={() => handleStepClick('Launch')}
                isActive={activeStep === 'Launch'}
                description="Deploy your study to a live audience. This initiates data collection."
              />
            </div>

            <FlowStep
              label="Template"
              onClick={() => handleStepClick('Template')}
              isActive={activeStep === 'Template'}
              description="Save your current study configuration as a reusable template for future experiments."
            />
            <FlowStep
              label="Drafts"
              onClick={() => handleStepClick('Drafts')}
              isActive={activeStep === 'Drafts'}
              description="Access your saved work-in-progress studies. Manage and resume editing from here."
            />
            <FlowStep
              label="Summary"
              onClick={() => handleStepClick('Summary')}
              isActive={activeStep === 'Summary'}
              description="View a high-level overview of your study's performance and key metrics collected so far."
            />
            <FlowStep
              label="Edit"
              onClick={() => handleStepClick('Edit')}
              isActive={activeStep === 'Edit'}
              description="Modify study parameters, adjust traffic allocation, or update creative assets."
            />

            <div className="grid grid-cols-2 gap-3">
              <FlowStep
                label="Launch"
                onClick={() => handleStepClick('Launch 2')}
                isActive={activeStep === 'Launch 2'}
                description="Re-launch or push updates to your active study after making edits."
              />
              <FlowStep
                label="Finalize"
                onClick={() => handleStepClick('Finalize')}
                isActive={activeStep === 'Finalize'}
                description="Mark the study as complete. Generate final reports and archive the data."
              />
            </div>

            <FlowStep
              label="Extend"
              onClick={() => handleStepClick('Extend')}
              isActive={activeStep === 'Extend'}
              description="Prolong the duration of your study beyond the original end date."
            />
            <FlowStep
              label="Delete"
              onClick={() => handleStepClick('Delete')}
              isActive={activeStep === 'Delete'}
              description="Permanently remove the study and its associated data from the system."
            />
          </div>

          {/* Vertical connecting line from stack to horizontal line */}
          <div className="h-8 w-px border-l border-dashed border-muted" aria-hidden />

          {/* Bottom row */}
          <div className="w-full relative">
            <div className="absolute top-0 left-0 right-0 h-px border-t border-dashed border-muted" aria-hidden />
            <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap md:justify-between md:gap-0 pt-6 w-full">
              {['Ramp', 'Analysis', 'Monitoring', 'Details', 'History', 'Manage'].map((label) => (
                <div key={label} className="flex flex-col items-center relative group">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-px border-l border-dashed border-muted group-hover:border-body transition-colors" aria-hidden />
                  <FlowStep
                    label={label}
                    variant="secondary"
                    className="min-w-[100px] text-xs px-4 py-2 rounded-full border border-main bg-deep/80 backdrop-blur-sm"
                    isActive={activeStep === label}
                    onClick={() => handleStepClick(label)}
                    description={BOTTOM_DESCRIPTIONS[label]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column (Non-QuiX branch) - visible on md+ */}
        <div className="hidden md:flex flex-col gap-3 absolute right-0 top-[54px] w-48 z-20">
          <FlowStep
            label="Non-QuiX"
            variant="highlight"
            isActive={activeStep === 'Non-QuiX'}
            onClick={() => handleStepClick('Non-QuiX')}
            description="Handle studies that do not use the QuiX framework. Supports legacy systems."
          />
          <FlowStep
            label="Summary"
            variant="secondary"
            isActive={activeStep === 'Summary Right'}
            onClick={() => handleStepClick('Summary Right')}
            description="Overview of non-QuiX study performance."
          />
          <FlowStep
            label="Easy extend"
            variant="secondary"
            isActive={activeStep === 'Easy extend'}
            onClick={() => handleStepClick('Easy extend')}
            description="Quickly extend the duration of standard studies without full reconfiguration."
          />
        </div>

        {/* Arrow: Create New Study -> Non-QuiX. 24px padding each side (left matches right), vertically middle-aligned with first button row */}
        <div
          className="hidden md:flex absolute left-[568px] top-[3.25rem] w-[120px] h-12 px-6 items-center justify-center z-10 pointer-events-none"
          aria-hidden
        >
          <svg width="100%" height="100%" viewBox="0 0 100 24" fill="none" className="text-muted shrink-0">
            <path d="M0 12H94" stroke="currentColor" strokeWidth="1.5" />
            <path d="M89 7L94 12L89 17" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
