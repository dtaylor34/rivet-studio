import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects, prototypingExamples } from '../data/projects';
import { ChevronLeft, ChevronRight } from '../components/ui/ChevronIcon';
import FlightNetworkChart from '../components/prototypes/FlightNetworkChart';
import RivetMapper from '../components/prototypes/RivetMapper';
import PhoneLoader from '../components/prototypes/PhoneLoader';
import backgroundImage from '../assets/Rivet-background-image-converted.jpg';
import cableVideo from '../assets/cable-looping-movie.webm';
import cablePoster from '../assets/cable-poster.jpg';
import { trackExampleNav, trackProjectClick, trackCTAClick } from '../utils/analytics';

const HomePage = () => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Only play the CTA background video while its section is on-screen —
  // keeps scrolling snappy (poster paints instantly, no decode while off-screen).
  const videoRef = useRef(null);
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(vid);
    return () => io.disconnect();
  }, []);

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
    setSlideDir('next');
    setCurrentProjectIndex(nextIdx);
    trackProjectClick(sortedProjects[nextIdx].title, 'carousel_next');
  };
  const prevProject = () => {
    const prevIdx = (currentProjectIndex - 1 + sortedProjects.length) % sortedProjects.length;
    setSlideDir('prev');
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

  // Touch handlers — projects (horizontal swipe to change slide; ignores vertical scroll)
  const projectTouchX = useRef(null);
  const projectTouchY = useRef(null);
  const projectSwiped = useRef(false);
  const onTouchStartProjects = (e) => {
    projectSwiped.current = false;
    projectTouchX.current = e.targetTouches[0].clientX;
    projectTouchY.current = e.targetTouches[0].clientY;
  };
  const onTouchEndProjects = (e) => {
    if (projectTouchX.current == null) return;
    const dx = projectTouchX.current - e.changedTouches[0].clientX;
    const dy = projectTouchY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
      projectSwiped.current = true;
      if (dx > 0) nextProject(); else prevProject();
    }
    projectTouchX.current = null;
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
      <div className="flex justify-center pb-8 md:pb-12">
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
            <h1 className="text-[32px] md:text-[44px] lg:text-[56px] leading-tight font-light text-heading mb-6 tracking-tight lg:max-w-[70%]">
              Rivet Studio delivers user experiences rapidly and effectively, and connects the best approach for optimal results.
            </h1>
            <p className="text-xl md:text-2xl text-muted font-light" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
              We prototype fast, test early, and iterate continuously to ensure every decision is validated by real user feedback.
            </p>
          </div>
        </div>
      </div>

      {/* 2. AI Examples Carousel — hidden (section disabled per request) */}
      {false && (
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
      )}

      {/* 3. Process Section */}
      <div className="w-full py-16 md:py-24 border-t border-main">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-heading text-center mb-10 md:mb-12 tracking-tight">
            Our Design Process
          </h2>
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

      {/* 4. Design Showcase Carousel */}
      <div className="w-full py-16 md:py-24 border-t border-main bg-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-heading text-center tracking-tight">
              <Link to="/client-examples" className="text-heading no-underline hover:opacity-80 transition-opacity">
                Design Showcase
              </Link>
            </h2>
          </div>

          <div className="relative">
            {/* Coverflow stage — center card large + dimmed side cards peeking, cut off by the edges */}
            <div
              className="relative overflow-hidden"
              onTouchStart={onTouchStartProjects}
              onTouchEnd={onTouchEndProjects}
            >
              {(() => {
                const len = sortedProjects.length;
                const prev = sortedProjects[(currentProjectIndex - 1 + len) % len];
                const next = sortedProjects[(currentProjectIndex + 1) % len];
                const current = sortedProjects[currentProjectIndex];
                return (
                  <>
                    {/* Left peek (dimmed, half cut off) */}
                    <button
                      type="button"
                      onClick={prevProject}
                      aria-label={`Previous: ${prev.title}`}
                      className="hidden sm:block absolute left-0 top-1/2 w-[40%] z-0 opacity-50 hover:opacity-70 transition-opacity"
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      <img src={prev.image} alt={prev.title} loading="lazy" decoding="async"
                        className="w-full aspect-[3/2] object-cover rounded-xl shadow-xl blur-[3px]" />
                    </button>

                    {/* Right peek (dimmed, half cut off) */}
                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label={`Next: ${next.title}`}
                      className="hidden sm:block absolute right-0 top-1/2 w-[40%] z-0 opacity-50 hover:opacity-70 transition-opacity"
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      <img src={next.image} alt={next.title} loading="lazy" decoding="async"
                        className="w-full aspect-[3/2] object-cover rounded-xl shadow-xl blur-[3px]" />
                    </button>

                    {/* Center (active) — ~30% larger than the side cards; animates up on change */}
                    <div key={currentProjectIndex} className={`relative z-10 mx-auto w-[86%] sm:w-[52%] ${slideDir === 'next' ? 'animate-in-right' : 'animate-in-left'}`}>
                      <Link
                        to={`/project/${current.slug}`}
                        onClick={(e) => {
                          if (projectSwiped.current) { e.preventDefault(); projectSwiped.current = false; return; }
                          trackProjectClick(current.title, 'carousel');
                        }}
                        className="block hover:opacity-95 transition-opacity"
                      >
                        <img src={current.image} alt={current.title} width={1200} height={800} loading="lazy" decoding="async"
                          className="w-full aspect-[3/2] object-cover rounded-xl shadow-2xl transform-gpu" />
                      </Link>
                    </div>
                  </>
                );
              })()}

              {/* Navigation arrows */}
              <button
                onClick={prevProject}
                aria-label="Previous project"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-surface border border-main shadow-lg text-heading hover:bg-base transition-colors"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={nextProject}
                aria-label="Next project"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-surface border border-main shadow-lg text-heading hover:bg-base transition-colors"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Active project details — animate up on each change */}
            <div key={`details-${currentProjectIndex}`} className={`text-center mt-6 ${slideDir === 'next' ? 'animate-in-right' : 'animate-in-left'}`}>
              <h3 className="font-medium text-heading text-lg sm:text-xl mb-1">
                <Link
                  to={`/project/${sortedProjects[currentProjectIndex].slug}`}
                  onClick={() => trackProjectClick(sortedProjects[currentProjectIndex].title, 'carousel_title')}
                  className="text-heading no-underline hover:opacity-80 transition-opacity"
                >
                  {sortedProjects[currentProjectIndex].title}
                </Link>
              </h3>
              <p className="text-sm text-muted">{sortedProjects[currentProjectIndex].subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Ready to Collaborate CTA with Video */}
      <div className="w-full py-16 md:py-24 bg-deep">
        <div className="flex items-center justify-center">
          <div className="relative overflow-hidden w-full lg:max-w-[1278px]" style={{ backgroundColor: 'rgb(var(--color-bg-deep))' }}>
            <video ref={videoRef} loop muted playsInline preload="none" poster={cablePoster} className="absolute inset-0 w-full h-full object-cover transform-gpu" style={{ opacity: 0.20 }}>
              <source src={cableVideo} type="video/webm" />
            </video>
            <div className="absolute top-0 left-0 right-0 z-10" style={{ height: '120px', background: 'linear-gradient(to bottom, rgb(var(--color-bg-deep)), transparent)' }}></div>
            <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '240px', background: 'linear-gradient(to top, rgb(var(--color-bg-deep)), transparent)' }}></div>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgb(var(--color-bg-deep) / 0.4)' }}></div>

            <div className="relative z-20 text-center py-20 lg:py-28 px-12 lg:px-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-heading mb-6 tracking-tight">
                Ready to start your project?
              </h2>
              <p className="text-xl md:text-2xl text-muted mb-8 font-light max-w-3xl mx-auto">
                Let's discuss how we can help transform your product vision into reality with user-centered design and strategic innovation.
              </p>
              <Link
                to="/contact"
                onClick={() => trackCTAClick('Contact Us', 'video_section')}
                className="inline-block border-2 border-heading text-heading px-10 py-4 rounded-full hover:bg-heading hover:text-base transition-all duration-300 text-[1rem] font-normal tracking-wide hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HomePage;
