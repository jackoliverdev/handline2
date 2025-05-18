import { useState, useEffect } from 'react';
import { getUserProfile, updateUserPreferences } from '@/lib/user-service';
import { useUser } from 'reactfire';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: user } = useUser();

  // Initialize dark mode from Supabase
  useEffect(() => {
    const initDarkMode = async () => {
      if (!user?.uid) return;
      
      try {
        setIsLoading(true);
        const profile = await getUserProfile(user.uid);
        
        if (profile && profile.dark_mode !== undefined) {
          setDarkMode(profile.dark_mode);
          applyDarkMode(profile.dark_mode);
        } else {
          // If no preference is set, default to system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setDarkMode(prefersDark);
          applyDarkMode(prefersDark);
        }
      } catch (error) {
        console.error('Failed to fetch dark mode preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initDarkMode();
  }, [user?.uid]);

  // Apply dark mode to the document
  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle dark mode and save to Supabase
  const toggleDarkMode = async () => {
    if (!user?.uid) return;
    
    try {
      const newValue = !darkMode;
      setDarkMode(newValue);
      applyDarkMode(newValue);
      
      await updateUserPreferences(user.uid, { dark_mode: newValue });
    } catch (error) {
      console.error('Failed to update dark mode preference:', error);
      // Revert on error
      setDarkMode(darkMode);
      applyDarkMode(darkMode);
    }
  };

  return { darkMode, isLoading, toggleDarkMode };
}; 