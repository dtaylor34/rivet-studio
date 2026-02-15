import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import themes from './themes';

const ThemeContext = createContext();

const STORAGE_KEY = 'rivet-studio-theme';

const applyTheme = (themeKey) => {
  const theme = themes[themeKey];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  root.setAttribute('data-theme', themeKey);
};

const getSystemPreference = () => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && themes[saved]) return saved;
  } catch (e) {}
  return getSystemPreference();
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(currentTheme);
    try { localStorage.setItem(STORAGE_KEY, currentTheme); } catch (e) {}
  }, [currentTheme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setCurrentTheme(getSystemPreference());
      } catch (e) {
        setCurrentTheme(getSystemPreference());
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setTheme = useCallback((key) => { if (themes[key]) setCurrentTheme(key); }, []);
  const toggleTheme = useCallback(() => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const availableThemes = Object.entries(themes).map(([key, val]) => ({ key, label: val.label }));

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, toggleTheme, availableThemes, isDark: currentTheme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export default ThemeContext;
