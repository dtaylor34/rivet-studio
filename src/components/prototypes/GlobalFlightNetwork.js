/**
 * GlobalFlightNetwork.js
 * A D3-based flight network visualization component with dynamic data fetching
 *
 * DATA SOURCES:
 * This visualization uses aggregated flight data from multiple sources:
 * - OpenSky Network: Real-time flight tracking data (https://opensky-network.org/)
 * - FlightAware: Commercial aviation data (https://www.flightaware.com/)
 * - OAG: Official Airline Guide schedules (https://www.oag.com/)
 *
 * Current implementation uses representative sample data based on 2023 global aviation patterns.
 */
import * as d3 from 'd3';

const DARK_PALETTE = {
  background: '#171717',
  chartBg: '#262626',
  primary: '#3b82f6',
  secondary: '#60a5fa',
  text: '#e5e7eb',
  textMuted: '#9ca3af',
  containerText: '#ffffff',
  titleRefresh: '#9ca3af',
  titleRefreshHover: '#d1d5db',
  sourceLink: '#93c5fd',
  sourceLinkHover: '#bfdbfe',
  modalOverlay: 'rgba(0, 0, 0, 0.85)',
  modalContent: '#262626',
  modalBorder: '#404040',
  modalHeaderText: '#ffffff',
  modalClose: '#9ca3af',
  modalCloseHoverBg: '#404040',
  modalCloseHoverColor: '#ffffff',
  modalBody: '#e5e7eb',
  modalSectionH3: '#ffffff',
  modalSectionH4: '#d1d5db',
  modalSectionP: '#9ca3af',
  disclaimerBg: '#1f2937',
  disclaimerBorder: '#93c5fd',
  disclaimerText: '#d1d5db',
  tooltipBg: 'rgba(38, 38, 38, 0.98)',
  tooltipBorder: '#737373',
  tooltipText: '#ffffff',
  tooltipTextMuted: '#d1d5db',
  statValue: '#ffffff',
  selectBg: '#2d2d2d',
  selectColor: '#ffffff',
  selectBorder: '#ffffff',
  selectHoverBg: '#3d3d3d',
  selectOptionBg: '#2d2d2d',
  selectChevron: '%23ffffff',
  nodeCircleFill: '#ffffff',
  nodeCircleStroke: '#525252',
  legendText: '#ffffff'
};

const LIGHT_PALETTE = {
  background: '#fafafa',
  chartBg: '#ffffff',
  primary: '#3b82f6',
  secondary: '#60a5fa',
  text: '#1f2937',
  textMuted: '#6b7280',
  containerText: '#111827',
  titleRefresh: '#6b7280',
  titleRefreshHover: '#374151',
  sourceLink: '#2563eb',
  sourceLinkHover: '#3b82f6',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  modalContent: '#ffffff',
  modalBorder: '#e5e7eb',
  modalHeaderText: '#111827',
  modalClose: '#6b7280',
  modalCloseHoverBg: '#f3f4f6',
  modalCloseHoverColor: '#111827',
  modalBody: '#374151',
  modalSectionH3: '#111827',
  modalSectionH4: '#4b5563',
  modalSectionP: '#6b7280',
  disclaimerBg: '#f3f4f6',
  disclaimerBorder: '#3b82f6',
  disclaimerText: '#4b5563',
  tooltipBg: 'rgba(255, 255, 255, 0.98)',
  tooltipBorder: '#d1d5db',
  tooltipText: '#111827',
  tooltipTextMuted: '#4b5563',
  statValue: '#111827',
  selectBg: '#ffffff',
  selectColor: '#111827',
  selectBorder: '#d1d5db',
  selectHoverBg: '#f9fafb',
  selectOptionBg: '#ffffff',
  selectChevron: '%23111827',
  nodeCircleFill: '#ffffff',
  nodeCircleStroke: '#9ca3af',
  legendText: '#111827'
};

class GlobalFlightNetwork {
    constructor(container, options = {}) {
      this.container = container;
      const isDark = options.isDark !== false;
      const colors = options.colors || (isDark ? DARK_PALETTE : LIGHT_PALETTE);
      this.options = {
        maxWidth: options.maxWidth || 1400,
        apiEndpoint: options.apiEndpoint || null,
        refreshInterval: options.refreshInterval || null,
        useFallbackData: options.useFallbackData !== false,
        dataSource: {
          name: 'Global Aviation Data Network',
          description: 'Aggregated flight data from OpenSky Network, FlightAware, and OAG Official Airline Guide',
          links: [
            { name: 'OpenSky Network', url: 'https://opensky-network.org/' },
            { name: 'FlightAware', url: 'https://www.flightaware.com/' },
            { name: 'OAG Aviation', url: 'https://www.oag.com/' }
          ],
          updateFrequency: 'Daily',
          license: 'Data compiled from public aviation sources',
          disclaimer: 'Current visualization uses representative sample data based on global aviation patterns.'
        },
        colors,
        ...options
      };
      if (!options.colors) this.options.colors = colors;
      
      this.currentData = null;
      this.resizeTimer = null;
      this.refreshTimer = null;
      this.lastFetchDate = null;
      this.destroyed = false;

      this.init();
    }
    
    async init() {
      this.injectStyles();
      this.createStructure();
      this.showLoadingState();
      
      await this.loadData();

      if (this.destroyed) return;

      this.updateTitle();
      this.currentData = this.allFlightData.today;
      this.hideLoadingState();
      this.drawVisualization();
      this.setupEventListeners();
      
      if (this.options.refreshInterval) {
        this.setupAutoRefresh();
      }
    }
    
    showLoadingState() {
      const loadingEl = document.createElement('div');
      loadingEl.className = 'gfn-loading';
      loadingEl.innerHTML = '<div class="gfn-spinner"></div><p>Loading flight data...</p>';
      this.chartEl.appendChild(loadingEl);
    }
    
    hideLoadingState() {
      const loadingEl = this.container.querySelector('.gfn-loading');
      if (loadingEl) {
        loadingEl.remove();
      }
    }
    
    showSourceModal() {
      // Format the date
      const dataDate = this.lastFetchDate || new Date();
      const month = String(dataDate.getMonth() + 1).padStart(2, '0');
      const day = String(dataDate.getDate()).padStart(2, '0');
      const year = dataDate.getFullYear();
      const formattedDate = `${month}.${day}.${year}`;
      
      const modal = document.createElement('div');
      modal.className = 'gfn-modal';
      modal.innerHTML = `
        <div class="gfn-modal-overlay"></div>
        <div class="gfn-modal-content">
          <div class="gfn-modal-header">
            <h2>Data Sources & Attribution</h2>
            <button class="gfn-modal-close">×</button>
          </div>
          <div class="gfn-modal-body">
            <div class="gfn-source-section">
              <h3>${this.options.dataSource.name}</h3>
              <p>${this.options.dataSource.description}</p>
            </div>
            
            <div class="gfn-source-section">
              <h4>Primary Data Sources:</h4>
              <ul class="gfn-source-list">
                ${this.options.dataSource.links.map(link => `
                  <li>
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                      ${link.name}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                `).join('')}
              </ul>
            </div>
            
            <div class="gfn-source-section">
              <h4>Update Frequency:</h4>
              <p>${this.options.dataSource.updateFrequency}, ${formattedDate}</p>
            </div>
            
            <div class="gfn-source-section">
              <h4>License & Usage:</h4>
              <p>${this.options.dataSource.license}</p>
            </div>
            
            <div class="gfn-source-disclaimer">
              <strong>Note:</strong> ${this.options.dataSource.disclaimer}
            </div>
            
            ${this.lastFetchDate ? `
              <div class="gfn-source-timestamp">
                <strong>Last Updated:</strong> ${this.lastFetchDate.toLocaleString()}
              </div>
            ` : ''}
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close handlers
      const closeModal = () => modal.remove();
      modal.querySelector('.gfn-modal-close').addEventListener('click', closeModal);
      modal.querySelector('.gfn-modal-overlay').addEventListener('click', closeModal);
      
      // Escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    }
    
    async fetchDataFromAPI() {
      if (!this.options.apiEndpoint) {
        throw new Error('No API endpoint provided');
      }
      
      try {
        const response = await fetch(this.options.apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        this.lastFetchDate = new Date();
        
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('gfn_flight_data', JSON.stringify({
            data: data,
            timestamp: this.lastFetchDate.toISOString()
          }));
        }
        
        return data;
      } catch (error) {
        console.error('Error fetching flight data:', error);
        throw error;
      }
    }
    
    loadCachedData() {
      if (typeof localStorage === 'undefined') {
        return null;
      }
      
      try {
        const cached = localStorage.getItem('gfn_flight_data');
        if (!cached) return null;
        
        const { data, timestamp } = JSON.parse(cached);
        const cacheDate = new Date(timestamp);
        const now = new Date();
        
        const hoursSinceCache = (now - cacheDate) / (1000 * 60 * 60);
        
        if (hoursSinceCache < 24) {
          console.log('Using cached flight data from:', timestamp);
          this.lastFetchDate = cacheDate;
          return data;
        }
        
        console.log('Cached data is stale, fetching fresh data');
        return null;
      } catch (error) {
        console.error('Error loading cached data:', error);
        return null;
      }
    }
    
    getFallbackData() {
      return {
        today: {
          airports: [
            { id: 'ATL', name: 'Atlanta', region: 'North America' },
            { id: 'DXB', name: 'Dubai', region: 'Middle East' },
            { id: 'LAX', name: 'Los Angeles', region: 'North America' },
            { id: 'ORD', name: 'Chicago', region: 'North America' },
            { id: 'LHR', name: 'London', region: 'Europe' },
            { id: 'HND', name: 'Tokyo', region: 'Asia' },
            { id: 'CDG', name: 'Paris', region: 'Europe' },
            { id: 'DFW', name: 'Dallas', region: 'North America' },
            { id: 'IST', name: 'Istanbul', region: 'Europe' },
            { id: 'FRA', name: 'Frankfurt', region: 'Europe' },
            { id: 'SIN', name: 'Singapore', region: 'Asia' },
            { id: 'ICN', name: 'Seoul', region: 'Asia' },
            { id: 'AMS', name: 'Amsterdam', region: 'Europe' },
            { id: 'JFK', name: 'New York', region: 'North America' },
            { id: 'SFO', name: 'San Francisco', region: 'North America' },
            { id: 'PEK', name: 'Beijing', region: 'Asia' },
            { id: 'SYD', name: 'Sydney', region: 'Oceania' },
            { id: 'MAD', name: 'Madrid', region: 'Europe' },
            { id: 'BKK', name: 'Bangkok', region: 'Asia' },
            { id: 'GRU', name: 'São Paulo', region: 'South America' }
          ],
          routes: [
            { source: 'ATL', target: 'LAX', flights: 45, passengers: 7650 },
            { source: 'ATL', target: 'ORD', flights: 38, passengers: 6460 },
            { source: 'LAX', target: 'SFO', flights: 52, passengers: 8840 },
            { source: 'JFK', target: 'LAX', flights: 41, passengers: 6970 },
            { source: 'JFK', target: 'LHR', flights: 35, passengers: 10150 },
            { source: 'LHR', target: 'CDG', flights: 28, passengers: 4760 },
            { source: 'LHR', target: 'DXB', flights: 32, passengers: 11200 },
            { source: 'DXB', target: 'SIN', flights: 24, passengers: 8400 },
            { source: 'HND', target: 'ICN', flights: 31, passengers: 5270 },
            { source: 'HND', target: 'SIN', flights: 26, passengers: 7020 },
            { source: 'FRA', target: 'LHR', flights: 29, passengers: 4930 },
            { source: 'IST', target: 'DXB', flights: 22, passengers: 7040 },
            { source: 'CDG', target: 'FRA', flights: 25, passengers: 4250 },
            { source: 'SIN', target: 'SYD', flights: 19, passengers: 6270 },
            { source: 'PEK', target: 'HND', flights: 27, passengers: 8100 },
            { source: 'ICN', target: 'LAX', flights: 18, passengers: 5940 },
            { source: 'AMS', target: 'LHR', flights: 33, passengers: 5610 },
            { source: 'SFO', target: 'HND', flights: 15, passengers: 4950 },
            { source: 'ORD', target: 'DFW', flights: 36, passengers: 6120 },
            { source: 'DFW', target: 'LAX', flights: 34, passengers: 5780 },
            { source: 'MAD', target: 'LHR', flights: 21, passengers: 3570 },
            { source: 'BKK', target: 'SIN', flights: 23, passengers: 3910 },
            { source: 'GRU', target: 'JFK', flights: 12, passengers: 3360 },
            { source: 'SYD', target: 'LAX', flights: 14, passengers: 4620 },
            { source: 'DXB', target: 'LHR', flights: 30, passengers: 10500 },
            { source: 'FRA', target: 'JFK', flights: 20, passengers: 5800 },
            { source: 'IST', target: 'FRA', flights: 17, passengers: 2890 },
            { source: 'PEK', target: 'LAX', flights: 16, passengers: 5280 },
            { source: 'ATL', target: 'DFW', flights: 37, passengers: 6290 },
            { source: 'ORD', target: 'SFO', flights: 28, passengers: 4760 }
          ]
        },
        cancelled: {
          airports: [
            { id: 'ATL', name: 'Atlanta', region: 'North America' },
            { id: 'ORD', name: 'Chicago', region: 'North America' },
            { id: 'DFW', name: 'Dallas', region: 'North America' },
            { id: 'JFK', name: 'New York', region: 'North America' },
            { id: 'LAX', name: 'Los Angeles', region: 'North America' },
            { id: 'LHR', name: 'London', region: 'Europe' },
            { id: 'CDG', name: 'Paris', region: 'Europe' },
            { id: 'FRA', name: 'Frankfurt', region: 'Europe' },
            { id: 'AMS', name: 'Amsterdam', region: 'Europe' },
            { id: 'DXB', name: 'Dubai', region: 'Middle East' }
          ],
          routes: [
            { source: 'ATL', target: 'ORD', flights: 8, passengers: 1360 },
            { source: 'ORD', target: 'DFW', flights: 6, passengers: 1020 },
            { source: 'JFK', target: 'LAX', flights: 5, passengers: 850 },
            { source: 'JFK', target: 'LHR', flights: 7, passengers: 2030 },
            { source: 'LHR', target: 'CDG', flights: 4, passengers: 680 },
            { source: 'LHR', target: 'FRA', flights: 5, passengers: 850 },
            { source: 'FRA', target: 'AMS', flights: 3, passengers: 510 },
            { source: 'CDG', target: 'DXB', flights: 4, passengers: 1400 },
            { source: 'ATL', target: 'DFW', flights: 6, passengers: 1020 },
            { source: 'LAX', target: 'DFW', flights: 5, passengers: 850 }
          ]
        },
        seasonal: {
          airports: [
            { id: 'MIA', name: 'Miami', region: 'North America' },
            { id: 'CUN', name: 'Cancún', region: 'North America' },
            { id: 'BCN', name: 'Barcelona', region: 'Europe' },
            { id: 'ATH', name: 'Athens', region: 'Europe' },
            { id: 'DXB', name: 'Dubai', region: 'Middle East' },
            { id: 'BKK', name: 'Bangkok', region: 'Asia' },
            { id: 'SYD', name: 'Sydney', region: 'Oceania' },
            { id: 'HNL', name: 'Honolulu', region: 'Oceania' },
            { id: 'ICE', name: 'Reykjavik', region: 'Europe' },
            { id: 'CPT', name: 'Cape Town', region: 'Africa' },
            { id: 'SIN', name: 'Singapore', region: 'Asia' },
            { id: 'LAX', name: 'Los Angeles', region: 'North America' },
            { id: 'JFK', name: 'New York', region: 'North America' }
          ],
          routes: [
            { source: 'JFK', target: 'CUN', flights: 28, passengers: 5320 },
            { source: 'LAX', target: 'HNL', flights: 35, passengers: 6300 },
            { source: 'MIA', target: 'CUN', flights: 42, passengers: 7980 },
            { source: 'JFK', target: 'BCN', flights: 18, passengers: 5220 },
            { source: 'LAX', target: 'SYD', flights: 12, passengers: 3960 },
            { source: 'JFK', target: 'ATH', flights: 15, passengers: 4350 },
            { source: 'DXB', target: 'BKK', flights: 22, passengers: 7040 },
            { source: 'SIN', target: 'SYD', flights: 20, passengers: 6600 },
            { source: 'JFK', target: 'ICE', flights: 14, passengers: 3220 },
            { source: 'LAX', target: 'BKK', flights: 16, passengers: 5280 },
            { source: 'BCN', target: 'ATH', flights: 19, passengers: 3230 },
            { source: 'DXB', target: 'CPT', flights: 11, passengers: 3630 },
            { source: 'MIA', target: 'SIN', flights: 13, passengers: 4290 }
          ]
        }
      };
    }
    
    async loadData() {
      try {
        let data = this.loadCachedData();
        
        if (!data && this.options.apiEndpoint) {
          console.log('Fetching fresh flight data from API...');
          data = await this.fetchDataFromAPI();
        }
        
        if (!data && this.options.useFallbackData) {
          console.log('Using fallback flight data');
          data = this.getFallbackData();
        }
        
        if (!data) {
          throw new Error('No flight data available');
        }
        
        this.allFlightData = data;
      } catch (error) {
        console.error('Error loading flight data:', error);
        
        if (this.options.useFallbackData) {
          console.log('Falling back to default data due to error');
          this.allFlightData = this.getFallbackData();
        } else {
          throw error;
        }
      }
    }
    
    setupAutoRefresh() {
      this.refreshTimer = setInterval(async () => {
        console.log('Auto-refreshing flight data...');
        try {
          await this.loadData();
          this.currentData = this.allFlightData[this.selectEl.value];
          d3.select(this.chartEl).select('svg').remove();
          this.drawVisualization();
        } catch (error) {
          console.error('Error during auto-refresh:', error);
        }
      }, this.options.refreshInterval);
    }
    
    async manualRefresh() {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('gfn_flight_data');
      }
      
      this.showLoadingState();
      try {
        await this.loadData();
        this.currentData = this.allFlightData[this.selectEl.value];
        d3.select(this.chartEl).select('svg').remove();
        this.drawVisualization();
        this.updateTitle();
      } catch (error) {
        console.error('Error during manual refresh:', error);
        alert('Failed to refresh data. Using cached data.');
      } finally {
        this.hideLoadingState();
      }
    }
    
    injectStyles() {
      const existingStyles = document.getElementById('global-flight-network-styles-v2');
      if (existingStyles) {
        existingStyles.remove();
      }
      const c = this.options.colors;
      const styles = `
        .gfn-container {
          max-width: ${this.options.maxWidth}px;
          margin: 0 auto;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${c.background};
          color: ${c.containerText};
        }
        .gfn-container * { box-sizing: border-box; }
        .gfn-chart {
          background: ${c.chartBg};
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          margin: 0;
          position: relative;
          min-height: 400px;
        }
        .gfn-chart svg { width: 100%; height: auto; display: block; }
        .gfn-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: ${c.text};
        }
        .gfn-spinner {
          border: 3px solid ${c.chartBg};
          border-top: 3px solid ${c.primary};
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: gfn-spin 1s linear infinite;
          margin: 0 auto 15px;
        }
        @keyframes gfn-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .gfn-title {
          text-align: left;
          margin: 0 0 8px 0;
          color: ${c.text};
          font-size: 28px;
          font-weight: 300;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .gfn-title-refresh {
          width: 20px;
          height: 20px;
          cursor: pointer;
          color: ${c.titleRefresh};
          transition: transform 0.3s ease, color 0.2s ease;
        }
        .gfn-title-refresh:hover { color: ${c.titleRefreshHover}; transform: rotate(180deg); }
        .gfn-subtitle {
          text-align: left;
          color: ${c.textMuted};
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 300;
        }
        .gfn-source-link {
          color: ${c.sourceLink};
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .gfn-source-link:hover { color: ${c.sourceLinkHover}; }
        .gfn-modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .gfn-modal-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: ${c.modalOverlay};
          backdrop-filter: blur(4px);
        }
        .gfn-modal-content {
          position: relative;
          background: ${c.modalContent};
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          animation: gfn-modal-slide-up 0.3s ease;
        }
        @keyframes gfn-modal-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gfn-modal-header {
          padding: 24px;
          border-bottom: 1px solid ${c.modalBorder};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gfn-modal-header h2 { margin: 0; font-size: 24px; font-weight: 400; color: ${c.modalHeaderText}; }
        .gfn-modal-close {
          background: none;
          border: none;
          font-size: 32px;
          color: ${c.modalClose};
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .gfn-modal-close:hover { background: ${c.modalCloseHoverBg}; color: ${c.modalCloseHoverColor}; }
        .gfn-modal-body { padding: 24px; color: ${c.modalBody}; }
        .gfn-source-section { margin-bottom: 24px; }
        .gfn-source-section h3 { margin: 0 0 12px 0; font-size: 18px; font-weight: 500; color: ${c.modalSectionH3}; }
        .gfn-source-section h4 { margin: 0 0 8px 0; font-size: 14px; font-weight: 500; color: ${c.modalSectionH4}; text-transform: uppercase; letter-spacing: 0.5px; }
        .gfn-source-section p { margin: 0; line-height: 1.6; color: ${c.modalSectionP}; }
        .gfn-source-list { list-style: none; padding: 0; margin: 0; }
        .gfn-source-list li { margin-bottom: 12px; }
        .gfn-source-list a {
          color: ${c.sourceLink};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }
        .gfn-source-list a:hover { color: ${c.sourceLinkHover}; }
        .gfn-source-list a svg { flex-shrink: 0; }
        .gfn-source-disclaimer {
          background: ${c.disclaimerBg};
          border-left: 3px solid ${c.disclaimerBorder};
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 13px;
          color: ${c.disclaimerText};
          line-height: 1.5;
        }
        .gfn-source-timestamp {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid ${c.modalBorder};
          font-size: 13px;
          color: ${c.textMuted};
        }
        .gfn-stats {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 24px;
          padding: 15px;
          background: ${c.chartBg};
          border-radius: 12px;
          width: 100%;
        }
        .gfn-dropdown-container { flex: 1; text-align: center; }
        .gfn-stat-item { flex: 1; text-align: center; position: relative; }
        .gfn-stat-label {
          font-size: 12px;
          color: ${c.textMuted};
          margin-bottom: 8px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .gfn-help-icon {
          width: 14px;
          height: 14px;
          cursor: help;
          color: ${c.textMuted};
          transition: color 0.2s ease;
        }
        .gfn-help-icon:hover { color: ${c.text}; }
        .gfn-help-icon:hover ~ .gfn-stat-tooltip { opacity: 1; }
        .gfn-stat-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 22px;
          padding: 10px 14px;
          background: ${c.tooltipBg};
          border: 1px solid ${c.tooltipBorder};
          border-radius: 6px;
          font-size: 12px;
          color: ${c.tooltipText};
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease 0.1s;
          z-index: 1001;
          max-width: 190px;
          min-width: 180px;
          white-space: normal;
          text-align: center;
          line-height: 1.4;
        }
        .gfn-stat-value { font-size: 16px; font-weight: 300; color: ${c.statValue}; }
        .gfn-select {
          background: ${c.selectBg};
          color: ${c.selectColor};
          border: 1px solid ${c.selectBorder};
          border-radius: 2rem;
          padding: 0 50px 0 24px;
          font-size: 16px;
          font-weight: 400;
          cursor: pointer;
          outline: none;
          width: auto;
          height: 48px;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${c.selectChevron}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 20px center;
        }
        .gfn-select:hover { background-color: ${c.selectHoverBg}; border-color: ${c.selectBorder}; }
        .gfn-select:focus { border-color: ${c.selectBorder}; outline: none; }
        .gfn-select option { background: ${c.selectOptionBg}; color: ${c.selectColor}; padding: 10px; }
        .gfn-arc { fill: none; stroke-linecap: round; opacity: 0.7; transition: opacity 0.3s; }
        .gfn-arc:hover { opacity: 1; stroke-width: 3; }
        .gfn-node circle { fill: ${c.nodeCircleFill}; stroke: ${c.nodeCircleStroke}; stroke-width: 2; }
        .gfn-node text { font-size: 12px; fill: ${c.text}; }
        .gfn-node .gfn-airport-code { font-weight: bold; font-size: 11px; }
        .gfn-tooltip {
          position: absolute;
          padding: 12px;
          background: ${c.tooltipBg};
          border: 1px solid ${c.tooltipBorder};
          border-radius: 8px;
          pointer-events: none;
          opacity: 0;
          font-size: 13px;
          color: ${c.tooltipText};
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
          z-index: 1000;
        }
        
        @media (max-width: 1024px) {
          .gfn-stats {
            flex-wrap: wrap;
          }
          
          .gfn-dropdown-container {
            flex: 1 1 100%;
            margin-bottom: 15px;
          }
          
          .gfn-stat-item {
            flex: 1 1 50%;
          }
        }
        
        @media (max-width: 480px) {
          .gfn-dropdown-container, .gfn-stat-item {
            flex: 1 1 100%;
            margin-bottom: 10px;
          }
          
          .gfn-modal-content {
            max-height: 90vh;
          }
          
          .gfn-modal-header {
            padding: 16px;
          }
          
          .gfn-modal-body {
            padding: 16px;
          }
        }
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.id = 'global-flight-network-styles-v2';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    
    createStructure() {
      this.container.innerHTML = `
        <div class="gfn-container">
          <h1 class="gfn-title">
            <span class="gfn-title-text"></span>
            <svg class="gfn-title-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" title="Refresh data">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </h1>
          <p class="gfn-subtitle">
            Arc thickness represents daily flight volume between airports. 
            <a href="#" class="gfn-source-link">View Data Sources</a>
          </p>
          <div class="gfn-chart"></div>
          <div class="gfn-stats">
            <div class="gfn-dropdown-container">
              <select class="gfn-select">
                <option value="today">Today's Routes</option>
                <option value="cancelled">Cancelled Routes</option>
                <option value="seasonal">Seasonal Routes</option>
              </select>
            </div>
            <div class="gfn-stat-item">
              <div class="gfn-stat-label">
                Total Flights Today
                <span style="position: relative; display: inline-flex;">
                  <svg class="gfn-help-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div class="gfn-stat-tooltip">Total number of scheduled flights operating today across all tracked routes</div>
                </span>
              </div>
              <div class="gfn-stat-value gfn-total-flights">0</div>
            </div>
            <div class="gfn-stat-item">
              <div class="gfn-stat-label">
                Active Routes
                <span style="position: relative; display: inline-flex;">
                  <svg class="gfn-help-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div class="gfn-stat-tooltip">Number of unique flight paths between airports with active service today</div>
                </span>
              </div>
              <div class="gfn-stat-value gfn-total-routes">0</div>
            </div>
            <div class="gfn-stat-item">
              <div class="gfn-stat-label">
                Busiest Route
                <span style="position: relative; display: inline-flex;">
                  <svg class="gfn-help-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div class="gfn-stat-tooltip">Airport pair with the highest number of flights scheduled today</div>
                </span>
              </div>
              <div class="gfn-stat-value gfn-busiest-route">-</div>
            </div>
            <div class="gfn-stat-item">
              <div class="gfn-stat-label">
                Affected Passengers
                <span style="position: relative; display: inline-flex;">
                  <svg class="gfn-help-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div class="gfn-stat-tooltip">Estimated total number of passengers on all tracked flights today</div>
                </span>
              </div>
              <div class="gfn-stat-value gfn-total-passengers">0</div>
            </div>
          </div>
        </div>
        <div class="gfn-tooltip"></div>
      `;
      
      const gfnContainer = this.container.querySelector('.gfn-container');
      this.chartEl = gfnContainer.querySelector('.gfn-chart');
      this.titleEl = gfnContainer.querySelector('.gfn-title-text');
      this.titleRefreshIcon = gfnContainer.querySelector('.gfn-title-refresh');
      this.sourceLinkEl = gfnContainer.querySelector('.gfn-source-link');
      this.selectEl = gfnContainer.querySelector('.gfn-select');
      this.tooltipEl = this.container.querySelector('.gfn-tooltip');
    }
    
    updateTitle() {
      const dataDate = this.lastFetchDate || new Date();
      const month = String(dataDate.getMonth() + 1).padStart(2, '0');
      const day = String(dataDate.getDate()).padStart(2, '0');
      const year = dataDate.getFullYear();
      const formattedDate = `${month}.${day}.${year}`;
      
      let titleText = `Global Flight Network - ${formattedDate}`;
      
      if (this.lastFetchDate) {
        const hoursSinceFetch = (new Date() - this.lastFetchDate) / (1000 * 60 * 60);
        if (hoursSinceFetch < 1) {
          titleText += ' • Live Data';
        } else if (hoursSinceFetch < 24) {
          titleText += ` • Updated ${Math.floor(hoursSinceFetch)}h ago`;
        } else {
          const daysSinceFetch = Math.floor(hoursSinceFetch / 24);
          titleText += ` • Updated ${daysSinceFetch}d ago`;
        }
      }
      
      if (this.titleEl) this.titleEl.textContent = titleText;
    }
    
    setupEventListeners() {
      this.selectEl.addEventListener('change', (e) => {
        this.updateVisualization(e.target.value);
      });
      
      this.titleRefreshIcon.addEventListener('click', () => {
        this.manualRefresh();
      });
      
      this.sourceLinkEl.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSourceModal();
      });
      
      this.resizeHandler = () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          d3.select(this.chartEl).select('svg').remove();
          this.drawVisualization();
        }, 250);
      };
      window.addEventListener('resize', this.resizeHandler);
    }
    
    updateVisualization(routeType) {
      this.currentData = this.allFlightData[routeType];
      d3.select(this.chartEl).select('svg').remove();
      this.drawVisualization();
    }
    
    drawVisualization() {
      if (this.destroyed || !this.container) return;

      const flightData = this.currentData;
      if (!flightData?.routes?.length) return;

      const totalFlights = flightData.routes.reduce((sum, r) => sum + r.flights, 0);
      const totalPassengers = flightData.routes.reduce((sum, r) => sum + r.passengers, 0);
      const busiestRoute = flightData.routes.reduce((max, r) => r.flights > max.flights ? r : max);

      const totalFlightsEl = this.container.querySelector('.gfn-total-flights');
      const totalRoutesEl = this.container.querySelector('.gfn-total-routes');
      const busiestRouteEl = this.container.querySelector('.gfn-busiest-route');
      const totalPassengersEl = this.container.querySelector('.gfn-total-passengers');
      if (totalFlightsEl) totalFlightsEl.textContent = totalFlights.toLocaleString();
      if (totalRoutesEl) totalRoutesEl.textContent = flightData.routes.length;
      if (busiestRouteEl) busiestRouteEl.textContent = `${busiestRoute.source} ↔ ${busiestRoute.target}`;
      if (totalPassengersEl) totalPassengersEl.textContent = totalPassengers.toLocaleString();
      
      const containerWidth = this.chartEl.clientWidth;
      const margin = { top: 60, right: 0, bottom: 80, left: 0 };
      const width = containerWidth;
      const height = 300;
      const chartOffset = 300;
      
      const svg = d3.select(this.chartEl)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height + margin.top + margin.bottom}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .append('g')
        .attr('transform', `translate(0,${margin.top})`);
      
      const x = d3.scalePoint()
        .domain(flightData.airports.map(d => d.id))
        .range([0, width])
        .padding(1);
      
      const colorScale = d3.scaleOrdinal()
        .domain(['North America', 'Europe', 'Asia', 'Middle East', 'Oceania', 'South America', 'Africa'])
        .range(['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#95e1d3', '#f38181', '#a29bfe']);
      
      const strokeScale = d3.scaleLinear()
        .domain([0, d3.max(flightData.routes, d => d.flights)])
        .range([0.5, 8]);
      
      const arc = (source, target) => {
        const sx = x(source);
        const tx = x(target);
        const dx = tx - sx;
        const dy = -Math.abs(dx) * 0.6;
        return `M${sx},${chartOffset} Q${sx + dx/2},${chartOffset + dy} ${tx},${chartOffset}`;
      };
      
      svg.selectAll('.gfn-arc')
        .data(flightData.routes)
        .join('path')
        .attr('class', 'gfn-arc')
        .attr('d', d => arc(d.source, d.target))
        .attr('stroke', d => {
          const sourceAirport = flightData.airports.find(a => a.id === d.source);
          return colorScale(sourceAirport.region);
        })
        .attr('stroke-width', d => strokeScale(d.flights))
        .on('mouseover', (event, d) => {
          const sourceAirport = flightData.airports.find(a => a.id === d.source);
          const targetAirport = flightData.airports.find(a => a.id === d.target);
          
          this.tooltipEl.style.opacity = '1';
          const tc = this.options.colors.tooltipText;
          const tm = this.options.colors.tooltipTextMuted;
          this.tooltipEl.innerHTML = `
            <strong style="color: ${tc}">${sourceAirport.name} → ${targetAirport.name}</strong><br/>
            <span style="color: ${tc}">${d.flights} flights today</span><br/>
            <span style="color: ${tc}">${d.passengers.toLocaleString()} passengers</span><br/>
            <span style="color: ${tm}">${sourceAirport.region} → ${targetAirport.region}</span>
          `;
          this.tooltipEl.style.left = (event.pageX + 10) + 'px';
          this.tooltipEl.style.top = (event.pageY - 10) + 'px';
        })
        .on('mouseout', () => {
          this.tooltipEl.style.opacity = '0';
        });
      
      const nodes = svg.selectAll('.gfn-node')
        .data(flightData.airports)
        .join('g')
        .attr('class', 'gfn-node')
        .attr('transform', d => `translate(${x(d.id)},${chartOffset})`)
        .on('mouseover', (event, d) => {
          this.tooltipEl.style.opacity = '1';
          const tc = this.options.colors.tooltipText;
          const tm = this.options.colors.tooltipTextMuted;
          this.tooltipEl.innerHTML = `
            <strong style="color: ${tc}">${d.name}</strong><br/>
            <span style="color: ${tc}">${d.id}</span><br/>
            <span style="color: ${tm}">${d.region}</span>
          `;
          this.tooltipEl.style.left = (event.pageX + 10) + 'px';
          this.tooltipEl.style.top = (event.pageY - 10) + 'px';
        })
        .on('mouseout', () => {
          this.tooltipEl.style.opacity = '0';
        });
      
      nodes.append('circle')
        .attr('r', 5)
        .attr('fill', this.options.colors.nodeCircleFill)
        .style('cursor', 'pointer');
      
      nodes.append('text')
        .attr('class', 'gfn-airport-code')
        .attr('x', -11)
        .attr('y', 3)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'end')
        .text(d => d.id)
        .style('cursor', 'pointer');
      
      const legend = svg.append('g')
        .attr('transform', 'translate(48, 362)');
      
      const regions = ['North America', 'Europe', 'Asia', 'Middle East', 'Oceania', 'South America', 'Africa'];
      
      regions.forEach((region) => {
        const g = legend.append('g');
        
        g.append('circle')
          .attr('r', 5)
          .attr('fill', colorScale(region));
        
        g.append('text')
          .attr('x', 15)
          .attr('y', 5)
          .text(region)
          .style('font-size', '12px')
          .style('fill', this.options.colors.legendText);
      });
      
      let xPosition = 0;
      legend.selectAll('g').each(function() {
        d3.select(this).attr('transform', `translate(${xPosition}, 0)`);
        const textWidth = this.querySelector('text').getBBox().width;
        xPosition += 15 + textWidth + 16;
      });
    }
    
    destroy() {
      this.destroyed = true;
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer);
      }
      const styleEl = document.getElementById('global-flight-network-styles-v2');
      if (styleEl) styleEl.remove();
      if (this.container) this.container.innerHTML = '';
    }
  }
  
  export default GlobalFlightNetwork;