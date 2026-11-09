import React from 'react';
import { User } from 'lucide-react';

// "One designer, orchestrating many systems" — three tiers:
// Designer → AI Agents → Applications & Platforms. Responsive + theme-aware.
const AGENTS = ['Claude', 'Claude CLI', 'Gemini', 'ChatGPT', 'Antigravity'];
const APPS = [
  'Maya', 'Unity', 'Adobe', 'HTML', 'CSS', 'MCP', 'API',
  'Figma', 'Meta', 'Firebase',
  'Documentation', 'Github', 'Project Scope', 'Rules',
  'Analytics', 'Discord', 'Database',
  'Animation', 'SFX', 'Audio',
];

// vertical line → horizontal bus → vertical line
const Connector = () => (
  <>
    <div className="h-6 w-0 border-l border-subtle" aria-hidden />
    <div className="w-full max-w-2xl h-0 border-t border-subtle" aria-hidden />
    <div className="h-6 w-0 border-l border-subtle" aria-hidden />
  </>
);

const ToolStackDiagram = () => (
  <div className="flex flex-col items-center w-full py-2">
    {/* Designer */}
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-heading text-heading bg-base font-medium tracking-wide">
      <User className="w-4 h-4" aria-hidden />
      <span>Designer</span>
    </div>

    <Connector />

    {/* AI Agents */}
    <p className="text-faint text-xs uppercase tracking-widest mb-3">AI Agents</p>
    <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl">
      {AGENTS.map((a) => (
        <span
          key={a}
          className="px-4 py-2 rounded-full border border-heading bg-base text-heading text-sm font-medium whitespace-nowrap"
        >
          {a}
        </span>
      ))}
    </div>

    <Connector />

    {/* Applications & Platforms */}
    <p className="text-faint text-xs uppercase tracking-widest mb-3">Applications &amp; Platforms</p>
    <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl">
      {APPS.map((a) => (
        <span
          key={a}
          className="px-4 py-2 rounded-full border border-tag bg-surface text-body text-sm whitespace-nowrap hover:border-heading hover:text-heading transition-colors"
        >
          {a}
        </span>
      ))}
      <span className="px-4 py-2 rounded-full border border-dashed border-tag text-faint text-sm whitespace-nowrap">
        + more
      </span>
    </div>
  </div>
);

export default ToolStackDiagram;
