"use client";

import { useState, useEffect } from 'react';

export function useWebsiteTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('website-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Explicitly default to light mode if not set
      localStorage.setItem('website-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('website-theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, toggleTheme, mounted };
} 