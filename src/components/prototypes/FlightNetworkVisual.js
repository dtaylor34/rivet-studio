import React from 'react';

const FlightNetworkSection = () => {
  const canvasRef = React.useRef(null);
  const [isAnimating, setIsAnimating] = React.useState(true);
  const [hoveredAirport, setHoveredAirport] = React.useState(null);
  const animationFrameRef = React.useRef(null);
  const particlesRef = React.useRef([]);

  const airports = [
    { code: 'JFK', name: 'New York', x: 0.25, y: 0.35, size: 8, color: '#3b82f6' },
    { code: 'LAX', name: 'Los Angeles', x: 0.15, y: 0.45, size: 7, color: '#3b82f6' },
    { code: 'LHR', name: 'London', x: 0.50, y: 0.25, size: 8, color: '#10b981' },
    { code: 'CDG', name: 'Paris', x: 0.52, y: 0.28, size: 6, color: '#10b981' },
    { code: 'DXB', name: 'Dubai', x: 0.65, y: 0.45, size: 7, color: '#f59e0b' },
    { code: 'SIN', name: 'Singapore', x: 0.75, y: 0.55, size: 7, color: '#f59e0b' },
    { code: 'HND', name: 'Tokyo', x: 0.85, y: 0.35, size: 7, color: '#ef4444' },
    { code: 'SYD', name: 'Sydney', x: 0.90, y: 0.75, size: 6, color: '#ef4444' },
    { code: 'GRU', name: 'São Paulo', x: 0.35, y: 0.70, size: 5, color: '#8b5cf6' },
    { code: 'MEX', name: 'Mexico City', x: 0.20, y: 0.50, size: 5, color: '#3b82f6' }
  ];

  const routes = [
    { from: 'JFK', to: 'LHR' },
    { from: 'LAX', to: 'HND' },
    { from: 'LHR', to: 'DXB' },
    { from: 'CDG', to: 'DXB' },
    { from: 'DXB', to: 'SIN' },
    { from: 'SIN', to: 'HND' },
    { from: 'HND', to: 'SYD' },
    { from: 'JFK', to: 'CDG' },
    { from: 'LAX', to: 'SYD' },
    { from: 'GRU', to: 'LHR' },
    { from: 'MEX', to: 'LAX' },
    { from: 'JFK', to: 'GRU' }
  ];

  class Particle {
    constructor(route, canvas) {
      const fromAirport = airports.find(a => a.code === route.from);
      const toAirport = airports.find(a => a.code === route.to);
      
      this.fromX = fromAirport.x * canvas.width;
      this.fromY = fromAirport.y * canvas.height;
      this.toX = toAirport.x * canvas.width;
      this.toY = toAirport.y * canvas.height;
      
      this.progress = Math.random();
      this.speed = 0.002 + Math.random() * 0.003;
      this.color = fromAirport.color;
    }

    update() {
      this.progress += this.speed;
      if (this.progress > 1) {
        this.progress = 0;
      }
    }

    draw(ctx) {
      const x = this.fromX + (this.toX - this.fromX) * this.progress;
      const y = this.fromY + (this.toY - this.fromY) * this.progress;
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      // Trail effect
      const trailLength = 5;
      for (let i = 1; i <= trailLength; i++) {
        const trailProgress = Math.max(0, this.progress - i * 0.02);
        const trailX = this.fromX + (this.toX - this.fromX) * trailProgress;
        const trailY = this.fromY + (this.toY - this.fromY) * trailProgress;
        
        ctx.beginPath();
        ctx.arc(trailX, trailY, 2 * (1 - i / trailLength), 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor((1 - i / trailLength) * 100).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }
  }

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = [];
    routes.forEach(route => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(new Particle(route, canvas));
      }
    });

    const animate = () => {
      ctx.fillStyle = 'rgba(23, 23, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw routes
      routes.forEach(route => {
        const fromAirport = airports.find(a => a.code === route.from);
        const toAirport = airports.find(a => a.code === route.to);
        
        const fromX = fromAirport.x * canvas.width;
        const fromY = fromAirport.y * canvas.height;
        const toX = toAirport.x * canvas.width;
        const toY = toAirport.y * canvas.height;

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = hoveredAirport && (route.from === hoveredAirport || route.to === hoveredAirport) 
          ? 'rgba(59, 130, 246, 0.4)' 
          : 'rgba(64, 64, 64, 0.3)';
        ctx.lineWidth = hoveredAirport && (route.from === hoveredAirport || route.to === hoveredAirport) ? 2 : 1;
        ctx.stroke();
      });

      // Update and draw particles
      if (isAnimating) {
        particlesRef.current.forEach(particle => {
          particle.update();
          particle.draw(ctx);
        });
      }

      // Draw airports
      airports.forEach(airport => {
        const x = airport.x * canvas.width;
        const y = airport.y * canvas.height;
        const isHovered = hoveredAirport === airport.code;

        // Glow effect for hovered airport
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(x, y, airport.size + 8, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, airport.size + 8);
          gradient.addColorStop(0, airport.color + '40');
          gradient.addColorStop(1, airport.color + '00');
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Airport dot
        ctx.beginPath();
        ctx.arc(x, y, airport.size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : airport.color;
        ctx.fill();
        
        // Airport ring
        ctx.beginPath();
        ctx.arc(x, y, airport.size + 2, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? '#ffffff' : airport.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Airport label
        if (isHovered) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(airport.name, x, y - airport.size - 15);
          ctx.font = '12px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#a3a3a3';
          ctx.fillText(airport.code, x, y - airport.size - 2);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, hoveredAirport]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;

    let found = null;
    airports.forEach(airport => {
      const dx = x - airport.x;
      const dy = y - airport.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 0.03) {
        found = airport.code;
      }
    });

    setHoveredAirport(found);
  };

  return (
    <div className="bg-neutral-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-tight">
            Global Flight Network
          </h2>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            Visualizing real-time connections across major international airports
          </p>
        </div>

        <div className="bg-neutral-800 rounded-2xl p-8 mb-8" style={{ height: '600px', position: 'relative' }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredAirport(null)}
            className="w-full h-full rounded-lg cursor-crosshair"
            style={{ background: '#171717' }}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              isAnimating 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            }`}
          >
            {isAnimating ? 'Pause Animation' : 'Play Animation'}
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Americas', 'Europe', 'Middle East', 'Asia Pacific', 'South America'].map((region, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full`} style={{ 
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][idx] 
              }} />
              <span className="text-neutral-400 text-sm">{region}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightNetworkSection;