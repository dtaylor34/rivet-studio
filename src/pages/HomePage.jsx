import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, prototypingExamples } from '../data/projects';
import { ChevronLeft, ChevronRight } from '../components/ui/ChevronIcon';
import FlightNetworkChart from '../components/prototypes/FlightNetworkChart';
import RivetMapper from '../components/prototypes/RivetMapper';
import PhoneLoader from '../components/prototypes/PhoneLoader';
import backgroundImage from '../assets/Rivet-background-image-converted.jpg';
import cableVideo from '../assets/cable-looping-movie.mov';
import { trackExampleNav, trackProjectClick, trackCTAClick } from '../utils/analytics';

const HomePage = () => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  // Carousel navigation
  const nextExample = () => {
    const nextIdx = (currentExampleIndex + 1) % prototypingExamples.length;
    setCurrentExampleIndex(nextIdx);
    trackExampleNav(prototypingExamples[nextIdx].title, 'next');
  };
  const prevExample = () => {
    const prevIdx = (currentExampleIndex - 1 + prototypingExamples.length) % prototypingExamples.length;
    setCurrentExampleIndex(prevIdx);
    trackExampleNav(prototypingExamples[prevIdx].title, 'prev');
  };
  const nextProject = () => {
    const nextIdx = (currentProjectIndex + 1) % sortedProjects.length;
    setCurrentProjectIndex(nextIdx);
    trackProjectClick(sortedProjects[nextIdx].title, 'carousel_next');
  };
  const prevProject = () => {
    const prevIdx = (currentProjectIndex - 1 + sortedProjects.length) % sortedProjects.length;
    setCurrentProjectIndex(prevIdx);
    trackProjectClick(sortedProjects[prevIdx].title, 'carousel_prev');
  };

  // Touch handlers — examples
  const onTouchStartExamples = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMoveExamples = (e) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEndExamples = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipeDistance) nextExample();
    if (d < -minSwipeDistance) prevExample();
  };

  // Touch handlers — projects
  const onTouchStartProjects = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMoveProjects = (e) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEndProjects = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipeDistance) nextProject();
    if (d < -minSwipeDistance) prevProject();
  };

  const renderExampleComponent = (example) => {
    switch (example.componentKey) {
      case 'FlightNetworkChart':
        return <div className="w-full bg-base rounded-lg overflow-hidden" data-no-theme-transition><FlightNetworkChart /></div>;
      case 'RivetMapper':
        return <div className="w-full bg-surface rounded-lg overflow-hidden" data-no-theme-transition><RivetMapper /></div>;
      case 'PhoneLoader':
        return <div className="w-full bg-base rounded-lg overflow-hidden" data-no-theme-transition><PhoneLoader /></div>;
      default:
        return (
          <div className="w-full min-h-[400px] bg-surface rounded-lg flex items-center justify-center">
            <div className="text-center py-20">
              <p className="text-muted text-xl mb-2">Coming Soon</p>
              <p className="text-faint">{example.description}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* 1. Overview / Hero Section */}
      <div className="flex justify-center pb-20 md:pb-32">
        <div
          className="relative overflow-hidden p-12 w-full lg:max-w-[1278px]"
          style={{
            minHeight: '480px',
            backgroundImage: `linear-gradient(rgb(var(--color-bg-base) / 0.82), rgb(var(--color-bg-base) / 0.82)), linear-gradient(to bottom, transparent 0%, transparent calc(100% - 300px), rgb(var(--color-bg-base)) 100%), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative z-10" style={{ paddingTop: '48px' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight">
              Product Design Studio
            </h1>
            <p className="text-xl md:text-2xl text-muted font-light" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
              Rivet Studio crafts high-quality digital experiences that are both visually compelling and highly functional.
              <br />We partner with teams to bring product visions to life.
              <br />Take a look at our AI examples and Client Work.
            </p>
          </div>
        </div>
      </div>

      {/* 2. AI Examples Carousel */}
      <div className="w-full py-20 md:py-32 border-t border-main bg-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight">
              <Link to="/ai-examples" className="text-heading no-underline hover:opacity-80 transition-opacity">
                AI Examples
              </Link>
            </h2>
          </div>

          <div className="relative">
            <div
              className="border border-main rounded-lg overflow-hidden bg-base"
              onTouchStart={onTouchStartExamples}
              onTouchMove={onTouchMoveExamples}
              onTouchEnd={onTouchEndExamples}
            >
              {/* Title Bar */}
              <div className="px-6 py-5 border-b border-main">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-heading text-xl mb-1">
                      {prototypingExamples[currentExampleIndex].title}
                    </h3>
                    <p className="text-sm text-muted">
                      {prototypingExamples[currentExampleIndex].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={prevExample} className="p-2 hover:bg-surface rounded-full transition-colors" aria-label="Previous example">
                      <ChevronLeft className="w-6 h-6 text-muted" />
                    </button>
                    <span className="text-faint text-sm">{currentExampleIndex + 1} / {prototypingExamples.length}</span>
                    <button onClick={nextExample} className="p-2 hover:bg-surface rounded-full transition-colors" aria-label="Next example">
                      <ChevronRight className="w-6 h-6 text-muted" />
                    </button>
                    <Link to="/ai-examples" onClick={() => trackCTAClick('View More', 'ai_carousel')} className="ml-4 text-muted hover:text-heading transition-colors text-sm underline">
                      View More
                    </Link>
                  </div>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="p-6">
                {renderExampleComponent(prototypingExamples[currentExampleIndex])}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Process Section */}
      <div className="w-full py-20 md:py-32 border-t border-main">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight" style={{ maxWidth: '930px' }}>
              Rivet Studio delivers user experiences rapidly and effectively to identify the best approach for optimal results.
            </h2>
            <p className="text-xl md:text-2xl text-muted font-light" style={{ maxWidth: '870px' }}>
              We prototype fast, test early, and iterate continuously to ensure every decision is validated by real user feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-main rounded-xl p-8 bg-base hover:border-subtle transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-heading mb-3">Rapid Prototyping</h3>
              <p className="text-muted leading-relaxed">
                We build interactive prototypes in days, not weeks, allowing you to visualize and test concepts before investing in full development.
              </p>
            </div>

            <div className="border border-main rounded-xl p-8 bg-base hover:border-subtle transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-500 bg-opacity-10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-heading mb-3">User-Validated Decisions</h3>
              <p className="text-muted leading-relaxed">
                Every design choice is tested with real users. We gather feedback early to ensure solutions address actual needs, not assumptions.
              </p>
            </div>

            <div className="border border-main rounded-xl p-8 bg-base hover:border-subtle transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-500 bg-opacity-10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-heading mb-3">Iterative Refinement</h3>
              <p className="text-muted leading-relaxed">
                We continuously refine based on insights and metrics, evolving the experience until it achieves the best possible outcome for users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Client Work Carousel */}
      <div className="w-full py-20 md:py-32 border-t border-main bg-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight">
              <Link to="/client-examples" className="text-heading no-underline hover:opacity-80 transition-opacity">
                Client Work
              </Link>
            </h2>
          </div>

          <div className="relative">
            <div
              className="border border-main rounded-lg overflow-hidden bg-base"
              onTouchStart={onTouchStartProjects}
              onTouchMove={onTouchMoveProjects}
              onTouchEnd={onTouchEndProjects}
            >
              <div className="px-6 py-5 border-b border-main">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-heading text-xl mb-1">
                      {sortedProjects[currentProjectIndex].title}
                    </h3>
                    <p className="text-sm text-muted">{sortedProjects[currentProjectIndex].subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={prevProject} className="p-2 hover:bg-surface rounded-full transition-colors" aria-label="Previous project">
                      <ChevronLeft className="w-6 h-6 text-muted" />
                    </button>
                    <span className="text-faint text-sm">{currentProjectIndex + 1} / {sortedProjects.length}</span>
                    <button onClick={nextProject} className="p-2 hover:bg-surface rounded-full transition-colors" aria-label="Next project">
                      <ChevronRight className="w-6 h-6 text-muted" />
                    </button>
                    <Link to="/client-examples" onClick={() => trackCTAClick('View More', 'client_carousel')} className="ml-4 text-muted hover:text-heading transition-colors text-sm underline">
                      View More
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to={`/project/${sortedProjects[currentProjectIndex].slug}`}
                onClick={() => trackProjectClick(sortedProjects[currentProjectIndex].title, 'carousel')}
                className="block w-full p-6 hover:opacity-90 transition-opacity"
              >
                <div className="bg-base rounded-2xl p-8 lg:p-12">
                  <img
                    src={sortedProjects[currentProjectIndex].image}
                    alt={sortedProjects[currentProjectIndex].title}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Ready to Collaborate CTA with Video */}
      <div className="w-full py-24 md:py-40 bg-deep">
        <div className="flex items-center justify-center">
          <div className="relative overflow-hidden w-full lg:max-w-[1278px]" style={{ backgroundColor: 'rgb(var(--color-bg-deep))' }}>
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.20 }}>
              <source src={cableVideo} type="video/mp4" />
            </video>
            <div className="absolute top-0 left-0 right-0 z-10" style={{ height: '120px', background: 'linear-gradient(to bottom, rgb(var(--color-bg-deep)), transparent)' }}></div>
            <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '240px', background: 'linear-gradient(to top, rgb(var(--color-bg-deep)), transparent)' }}></div>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgb(var(--color-bg-deep) / 0.4)' }}></div>

            <div className="relative z-20 text-center py-32 lg:py-40 px-12 lg:px-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight">
                Ready to start your project?
              </h2>
              <p className="text-xl md:text-2xl text-muted mb-8 font-light max-w-3xl mx-auto">
                Let's discuss how we can help transform your product vision into reality with user-centered design and strategic innovation.
              </p>
              <Link
                to="/contact"
                onClick={() => trackCTAClick('Contact Us', 'video_section')}
                className="inline-block border-2 border-heading text-heading px-10 py-4 rounded-full hover:bg-heading hover:text-base transition-all duration-300 text-base font-normal tracking-wide hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* AI Pulse Animation */}
      <div className="w-full flex items-center justify-center">
        <div className="ai-pulse-container" style={{ width: '1182px', maxWidth: '100%', height: '8px' }}>
          <div className="ai-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
