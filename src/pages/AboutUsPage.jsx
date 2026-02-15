import React from 'react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '../utils/analytics';

const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
        <Link to="/" className="text-faint hover:text-body transition-colors">Home</Link>
        <span className="text-ghost">/</span>
        <span className="text-muted">About Us</span>
      </nav>

      {/* Hero */}
      <div className="mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-8 tracking-tight">About Rivet Studio</h1>
        <p className="text-2xl text-body max-w-4xl leading-relaxed font-light">
          A user-first innovation house focused on leveraging AI to generate the best user product experiences.
        </p>
      </div>

      {/* Philosophy / What We Do */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-light text-heading mb-4">Our Philosophy</h2>
            <p className="text-muted leading-relaxed">
              At Rivet Studio, we believe that exceptional user experiences are born from the intersection
              of human understanding and technological innovation. We put users at the center of everything
              we do, using AI and advanced technologies not as a replacement for human insight, but as a
              powerful tool to amplify it.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-light text-heading mb-4">What We Do</h2>
            <p className="text-muted leading-relaxed">
              We partner with organizations to design and build products that people love to use. Our approach
              combines strategic thinking, user research, AI-powered insights, and cutting-edge design to create
              experiences that are not just functional, but delightful and intuitive.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-light text-heading mb-4">Our Approach</h2>
            <p className="text-muted leading-relaxed mb-4">We leverage artificial intelligence and machine learning throughout our process:</p>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start"><span className="text-heading mr-3">•</span><span>AI-powered user research and behavior analysis</span></li>
              <li className="flex items-start"><span className="text-heading mr-3">•</span><span>Data-driven design decisions and optimization</span></li>
              <li className="flex items-start"><span className="text-heading mr-3">•</span><span>Predictive UX modeling and testing</span></li>
              <li className="flex items-start"><span className="text-heading mr-3">•</span><span>Intelligent personalization and adaptive interfaces</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-light text-heading mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'UX Strategy', desc: 'Strategic planning and user research to define product direction and ensure alignment with business goals and user needs.' },
            { title: 'Product Design', desc: 'End-to-end product design from concept to implementation, with a focus on creating intuitive, accessible, and delightful experiences.' },
            { title: 'AI Integration', desc: 'Thoughtful integration of AI and machine learning to enhance user experiences while maintaining human-centered design principles.' },
            { title: 'Prototyping', desc: 'Rapid prototyping and interactive demos to validate concepts and gather feedback before full-scale development.' },
            { title: 'Developer Tools', desc: 'Designing tools and platforms that empower developers to work efficiently and effectively.' },
            { title: 'Workshop Facilitation', desc: 'Leading collaborative workshops to align teams, generate ideas, and drive consensus on product direction.' },
          ].map((service, idx) => (
            <div key={idx} className="bg-base border border-main rounded-lg p-8">
              <h3 className="text-xl font-light text-heading mb-4">{service.title}</h3>
              <p className="text-muted leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-20">
        <h2 className="text-3xl font-light text-heading mb-8">Our Experience</h2>
        <div className="bg-base border border-main rounded-lg p-8 lg:p-12">
          <p className="text-body leading-relaxed mb-6">
            We've had the privilege of working with leading organizations including the United Nations
            and Google, tackling complex challenges in data visualization, developer tools, experimentation
            platforms, and user sentiment analysis.
          </p>
          <p className="text-body leading-relaxed">
            Our work spans enterprise software, data portals, developer platforms, and innovative
            AI-powered tools. Each project is an opportunity to push the boundaries of what's possible
            in user experience design.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="bg-base border border-main rounded-2xl p-12 lg:p-16">
          <h2 className="text-3xl lg:text-4xl font-light text-heading mb-6">Let's Build Something Amazing</h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking to design a new product from scratch, improve an existing
            experience, or explore how AI can enhance your user experience, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={() => trackCTAClick('Start a Conversation', 'about_page')} className="px-8 py-3 bg-cta text-cta-text rounded-full text-sm font-light tracking-wide hover:bg-cta-hover transition-colors duration-300 inline-block">
              Start a Conversation
            </Link>
            <Link to="/client-examples" onClick={() => trackCTAClick('View Our Work', 'about_page')} className="px-8 py-3 border border-tag text-body rounded-full text-sm font-light tracking-wide hover:border-heading hover:text-heading transition-colors duration-300 inline-block">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
