import React from 'react';
import ProjectHero from '../../components/sections/ProjectHero';
import TwoColumnSection from '../../components/sections/TwoColumnSection';
import ProcessSection from '../../components/sections/ProcessSection';
import Turntable360 from '../../components/prototypes/Turntable360';
import ToolStackDiagram from '../../components/ui/ToolStackDiagram';
import naturaHero from '../../assets/natura-hero.webp';
import naturaMayaShaded from '../../assets/natura-maya-shaded.webp';
import naturaMayaWire from '../../assets/natura-maya-wire.webp';
import naturaRenderSheet from '../../assets/natura-render-sheet.webp';
import naturaSetup from '../../assets/natura-setup.webp';
import naturaPayment from '../../assets/natura-payment.webp';
import naturaSelect1 from '../../assets/natura-select-1.webp';
import naturaSelect2 from '../../assets/natura-select-2.webp';
import naturaPandaLanding from '../../assets/natura-panda-landing.webp';
import naturaPandaTransition from '../../assets/natura-panda-transition.webp';
import naturaPandaLevels from '../../assets/natura-panda-levels.webp';
import naturaPandaDetails from '../../assets/natura-panda-details.webp';
import naturaPandaNewGame from '../../assets/natura-panda-new-game.webp';
import natura3dLeft from '../../assets/natura-3d-left.webp';
import naturaBonusGears from '../../assets/natura-bonus-gears.webp';

// Image with caption, styled to match the site.
const Figure = ({ src, alt, caption }) => (
  <figure className="rounded-lg overflow-hidden bg-overlay/10">
    <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full h-auto" />
    {caption && <figcaption className="text-muted text-sm px-4 py-3">{caption}</figcaption>}
  </figure>
);

const atAGlance = [
  { label: 'Role', value: 'Founder, Principal Designer & Developer' },
  { label: 'Platforms', value: 'VR · AR · Web · Tablet · Mobile' },
  { label: 'Stack', value: 'Unity · Maya · MCP · API · REST · CLI · GitHub' },
];

const NaturaKingdom = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
    <ProjectHero
      title="Natura Kingdom"
      subtitle="Uncovering the Secrets of the Wild"
      description="An original, cross-platform 3D classic pinball game and platform I designed and built end-to-end through Rivet Studio. It pairs a distinct art direction — mechanical automation woven into organic, natural environments — with approachable exploration and puzzle mechanics, and ships as a platform that can host multiple games (such as Panda Pinball) under one world."
    />

    {/* Hero image */}
    <figure className="rounded-xl overflow-hidden bg-overlay/10 mb-16 shadow-2xl transform-gpu">
      <img
        src={naturaHero}
        alt="Natura Kingdom — starting page"
        width={2400}
        height={1450}
        decoding="async"
        className="w-full h-auto"
      />
      <figcaption className="text-muted text-sm px-4 py-3">Launch screen</figcaption>
    </figure>

    {/* At a glance */}
    <div className="rounded-2xl p-8 lg:p-12 mb-16 bg-overlay/[0.03]">
      <h2 className="text-2xl font-semibold mb-6 text-heading">At a Glance</h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
        {atAGlance.map((row) => (
          <div key={row.label} className="flex flex-col">
            <dt className="text-faint text-sm uppercase tracking-wide mb-1">{row.label}</dt>
            <dd className="text-body leading-relaxed">{row.value}</dd>
          </div>
        ))}
        <div className="flex flex-col">
          <dt className="text-faint text-sm uppercase tracking-wide mb-1">Status</dt>
          <dd className="text-body leading-relaxed">Playable web demo live; full game in development.</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-faint text-sm uppercase tracking-wide mb-1">Links</dt>
          <dd className="text-body leading-relaxed">
            <a href="https://naturakingdom.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">naturakingdom.com</a>
            {' · '}
            <span className="text-faint italic">Demo Example</span>
          </dd>
        </div>
      </dl>
    </div>

    <ProcessSection
      title="The Challenge"
      description="Could a single designer, working with AI-assisted tooling, ship a polished, cross-platform 3D experience end-to-end? Natura Kingdom is an example of how Rivet Studio moved beyond a static concept, and delivered something people can actually play in a browser today that also seamlessly extends to tablet, mobile, AR, and VR."
    />

    <TwoColumnSection
      leftTitle="Approach"
      leftItems={[
        "Design-led, built in code — owned the full arc (concept, art direction, game design, UX, implementation), designing directly in a running Unity build so every interaction was validated in the real engine.",
        "AI-assisted development — used MCP (Model Context Protocol) and CLI tooling to connect systems and automate the build pipeline, and leaned on AI tools to move from idea to working mechanic faster.",
        "Cross-platform from the start — architected around a shared core so the same world targets web, tablet, mobile, AR, and VR instead of being rebuilt per platform.",
      ]}
      rightTitle="What I Built"
      rightItems={[
        "A live, playable web-browser demo with real-time 3D movement (WASD / arrow keys) and interactive “forest console” objects.",
        "Original 3D assets and environments modeled in Maya and composed in Unity.",
        "A platform structure that hosts multiple games under the Natura Kingdom world — including Panda Pinball.",
      ]}
    />

    <ProcessSection
      title="How I Worked"
      description="One designer orchestrating many systems — AI agents and production tools wired into a single pipeline, from modeling in Maya to shipping a running build."
    >
      <ToolStackDiagram />
    </ProcessSection>

    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-light text-heading mb-6 tracking-tight">Design Decisions</h2>
      <p className="text-lg text-body mb-8 leading-relaxed max-w-3xl">The choices that shaped how the game feels in the first few minutes — each one visible in the screens below.</p>
      <ul className="space-y-4 mb-8 max-w-3xl">
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>Validated in the real engine.</strong> I designed directly in a running Unity build rather than in static mockups, so every interaction was judged on how it actually felt to play, not how it looked in a frame.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>One-line onboarding.</strong> A single control prompt (WASD / arrows) gets a first-time player moving in seconds — the fastest path from landing to playing.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>An ownable visual identity.</strong> "Mechanical automation meets organic wonder" runs through every screen — wood-and-brass materials and forest motifs instead of generic game-UI chrome.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span><strong>Rapid, end-to-end prototyping.</strong> Built complete, playable experiences rather than isolated screens, to quickly assess real user intent and validate direction before committing to production.</span></li>
      </ul>

      <div className="bg-surface rounded-2xl p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Figure src={naturaSetup} alt="Natura Kingdom — player setup screen" caption="Player setup & onboarding" />
          <Figure src={naturaPayment} alt="Natura Kingdom — payment screen" caption="Payment & subscription" />
          <Figure src={naturaSelect1} alt="Natura Kingdom — select a game" caption="Select a game" />
          <Figure src={naturaSelect2} alt="Natura Kingdom — select a game, expanded" caption="Select a game — expanded" />
        </div>
      </div>
    </div>

    <ProcessSection
      title="Panda Pinball — The First Game on the Platform"
      description="Panda Pinball is the first game built inside the Natura Kingdom platform — proof that one shared world can host distinct, self-contained experiences. These screens trace it from landing page and scene transitions through level select, in-level detail, the new-game flow, and bonus rounds."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Figure src={naturaPandaLanding} alt="Panda Pinball — landing page" caption="Panda Pinball — landing page" />
        <Figure src={naturaPandaTransition} alt="Panda Pinball — scene transition" caption="Scene transition" />
        <Figure src={naturaPandaLevels} alt="Panda Pinball — game levels" caption="Game levels" />
        <Figure src={naturaPandaDetails} alt="Panda Pinball — level detail" caption="Level detail" />
        <Figure src={naturaPandaNewGame} alt="Panda Pinball — new game flow" caption="New game flow" />
        <Figure src={naturaBonusGears} alt="Panda Pinball — bonus example" caption="Bonus example" />
      </div>
    </ProcessSection>

    <ProcessSection
      title="VR & AR Experiences"
      description="I'm extending Natura Kingdom off the screen and into VR and AR, so the world can be explored at room scale. The same shared core that drives the web build targets the headsets, so the art direction and mechanics carry over instead of being rebuilt per platform."
    >
      <Figure src={natura3dLeft} alt="Natura Kingdom — 3D environment" caption="Dimension view" />
    </ProcessSection>

    <ProcessSection
      title="Character Creation"
      description="Each character reimagines a real-world animal through a futuristic lens — organic form fused with mechanical detail. The wood-and-brass material language ties every creature back to the world's 'automation meets nature' identity and keeps the tone warm and approachable rather than cold or sci-fi. Drag to rotate, press play to spin, or step through frame by frame."
    >
      <Turntable360 />
    </ProcessSection>

    <ProcessSection
      title="Character Modeling"
      description="Each animal is modeled in Maya, built deliberately toward the vision for the game and how the character will ultimately be represented in-world — from wireframe topology through to the final shaded render."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Figure src={naturaMayaWire} alt="Mechanical panda — Maya wireframe" caption="Character wireframe" />
        <Figure src={naturaMayaShaded} alt="Mechanical panda — shaded Maya render" caption="Character shading" />
      </div>
      <div className="mt-4 md:mt-6">
        <Figure src={naturaRenderSheet} alt="Mechanical panda — render sheet" caption="Character profiles" />
      </div>
    </ProcessSection>

    <ProcessSection
      title="Outcome"
    >
      <ul className="space-y-4">
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Shipped a live, playable demo at naturakingdom.com — real-time 3D running in the browser.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Built an alpha version for user testing across desktop, tablet, and mobile.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Evaluating analytics on in-game interactions to guide gameplay improvements.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Building out the character model library and original audio and sound design to expand the world and its cast.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Addressing user-reported bugs and issues.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Benchmarking performance across iOS, Android, and web to ensure a consistent, high-fidelity experience on every platform.</span></li>
        <li className="flex gap-3 text-body leading-relaxed"><span>•</span><span>Evolving the validated prototype into fully immersive VR and AR experiences.</span></li>
      </ul>
    </ProcessSection>

  </div>
);

export default NaturaKingdom;
