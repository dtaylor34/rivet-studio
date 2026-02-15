import React from 'react';
import { prototypingExamples } from '../data/projects';
import { ChevronDown, ChevronUp } from '../components/ui/ChevronIcon';
import FlightNetworkChart from '../components/prototypes/FlightNetworkChart';
import RivetMapper from '../components/prototypes/RivetMapper';
import PhoneLoader from '../components/prototypes/PhoneLoader';
import { useTheme } from '../theme/ThemeContext';
import { trackExampleExpand, trackExampleTab } from '../utils/analytics';

const AIExamplesPage = () => {
  const { isDark } = useTheme();
  const [expandedExample, setExpandedExample] = React.useState('flight-charter');
  const [selectedTab, setSelectedTab] = React.useState('details');

  const toggleExample = (id) => {
    if (expandedExample === id) { setExpandedExample(null); }
    else {
      setExpandedExample(id);
      setSelectedTab('details');
      const example = prototypingExamples.find((e) => e.id === id);
      if (example) trackExampleExpand(example.title);
    }
  };

  const handleTabSelect = (exampleId, tab) => {
    setSelectedTab(tab);
    const example = prototypingExamples.find((e) => e.id === exampleId);
    if (example) trackExampleTab(example.title, tab);
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

  const renderTabContent = (example) => {
    if (selectedTab === 'details') return <div className="text-body leading-relaxed">{example.details.description}</div>;
    if (selectedTab === 'tools') return (
      <ul className="space-y-2">
        {example.details.tools.map((tool, idx) => (
          <li key={idx} className="text-body flex items-center gap-2"><span className="text-ghost">•</span>{tool}</li>
        ))}
      </ul>
    );
    if (selectedTab === 'data') return <div className="text-body leading-relaxed">{example.details.data}</div>;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
        <a href="/" className="text-faint hover:text-body transition-colors">Home</a>
        <span className="text-ghost">/</span>
        <span className="text-muted">AI Examples</span>
      </nav>

      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-heading mb-6 tracking-tight">AI-Powered Prototypes</h1>
        <p className="text-xl text-muted max-w-3xl leading-relaxed">
          Explore our collection of interactive prototypes that demonstrate the power of AI and modern web technologies.
          Each example showcases innovative approaches to data visualization, user interaction, and creative tools.
        </p>
      </div>

      <div className="space-y-8">
        {prototypingExamples.map((example) => (
          <div key={example.id} className="bg-base border border-main rounded-lg overflow-hidden">
            <button
              onClick={() => toggleExample(example.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-surface/50 transition-colors text-left"
              aria-expanded={expandedExample === example.id}
              aria-controls={`panel-${example.id}`}
              id={`accordion-${example.id}`}
            >
              <div>
                <h3 className="text-2xl font-light text-heading mb-2">{example.title}</h3>
                <p className="text-muted">{example.description}</p>
              </div>
              {expandedExample === example.id
                ? <ChevronUp className="w-6 h-6 text-muted flex-shrink-0 ml-4" />
                : <ChevronDown className="w-6 h-6 text-muted flex-shrink-0 ml-4" />}
            </button>

            {expandedExample === example.id && (
              <div className="bg-base p-6 border-t border-main" id={`panel-${example.id}`} role="region" aria-labelledby={`accordion-${example.id}`}>
                <div className="mb-8">{renderExampleComponent(example)}</div>

                <div className={`rounded-lg p-6 ${isDark ? 'bg-deep' : 'bg-base border border-main'}`}>
                  <div className="flex gap-2 mb-6 border-b border-main pb-4" role="tablist" aria-label="Example details">
                    {['details', 'tools', 'data'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabSelect(example.id, tab)}
                        role="tab"
                        aria-selected={selectedTab === tab}
                        aria-controls={`tabpanel-${tab}`}
                        id={`tab-${tab}`}
                        className={`rounded-full px-4 py-2 font-medium transition-colors capitalize ${
                          selectedTab === tab
                            ? 'bg-blue-500 text-white'
                            : 'text-faint hover:text-body hover:bg-surface/50'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="min-h-[120px]" role="tabpanel" id={`tabpanel-${selectedTab}`} aria-labelledby={`tab-${selectedTab}`}>
                    {renderTabContent(example)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIExamplesPage;
