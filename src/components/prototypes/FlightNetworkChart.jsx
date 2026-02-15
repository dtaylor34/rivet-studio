import { useEffect, useRef } from 'react';
import GlobalFlightNetwork from './GlobalFlightNetwork';
import { useTheme } from '../../theme/ThemeContext';

/**
 * React component wrapper for GlobalFlightNetwork
 */
function FlightNetworkChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }
    chartInstance.current = new GlobalFlightNetwork(chartRef.current, {
      maxWidth: 1400,
      isDark,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [isDark]);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '100%',
        minHeight: '600px'  // Prevent layout shift while loading
      }}
    />
  );
}

export default FlightNetworkChart;