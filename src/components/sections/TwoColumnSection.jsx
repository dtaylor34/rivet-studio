import React from 'react';

const TwoColumnSection = ({ leftTitle, leftItems, rightTitle, rightItems }) => (
  <div className="rounded-2xl p-8 lg:p-12 mb-16 bg-overlay/[0.03]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-heading">{leftTitle}</h2>
        <ul className="space-y-4">
          {leftItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed flex gap-3 text-body">
              <span className="text-body">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-heading">{rightTitle}</h2>
        <ul className="space-y-4">
          {rightItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed flex gap-3 text-body">
              <span className="text-body">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default TwoColumnSection;
