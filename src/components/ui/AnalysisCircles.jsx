import React, { useState } from 'react';
import { Lightbulb, PenTool, BarChart2, RefreshCw, Rocket } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Hypothesize',
    description: 'Formulate a clear hypothesis based on data and user insights.',
    icon: Lightbulb,
  },
  {
    id: 2,
    title: 'Create',
    description: 'Design and build the experiment or feature prototype.',
    icon: PenTool,
  },
  {
    id: 3,
    title: 'Evaluate',
    description: 'Run the experiment and collect data to measure success.',
    icon: BarChart2,
  },
  {
    id: 4,
    title: 'Iterate',
    description: 'Analyze results and refine the solution based on learnings.',
    icon: RefreshCw,
  },
  {
    id: 5,
    title: 'Launch',
    description: 'Deploy the successful solution to all users.',
    icon: Rocket,
  },
];

export function AnalysisCircles() {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 font-sans">
      <h2 className="text-[26px] md:text-[32px] font-normal text-muted tracking-normal mb-12" style={{ letterSpacing: 0 }}>
        Experimentation process
      </h2>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {steps.map((step) => {
          const isHovered = hoveredStep === step.id;
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Circle */}
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full border flex flex-col items-center justify-center cursor-pointer z-10 transition-all duration-200 ease-out font-sans ${
                  isHovered
                    ? 'scale-110 border-heading bg-surface'
                    : 'scale-100 border-muted bg-deep'
                }`}
                aria-label={step.title}
              >
                <Icon
                  className="w-8 h-8 mb-2 text-heading transition-colors duration-300"
                  aria-hidden
                />
                <span className="text-sm md:text-base font-medium text-heading transition-colors duration-300">
                  {step.title}
                </span>
              </div>

              {/* Hover Card */}
              {isHovered && (
                <div
                  className="absolute top-full mt-6 w-64 bg-surface rounded-xl p-5 shadow-2xl border border-subtle z-20 left-1/2 -translate-x-1/2"
                  role="tooltip"
                >
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-t border-l border-subtle transform rotate-45"
                    aria-hidden
                  />
                  <h3 className="text-heading font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{step.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
