"use client";

import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "@/components/app/sidebar";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/hooks/use-dark-mode";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { darkMode } = useDarkMode();
  
  // Check localStorage for saved collapse state on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsSidebarCollapsed(savedState === 'true');
    }
    
    // Set up event listener for sidebar collapse changes
    const handleStorageChange = () => {
      const currentState = localStorage.getItem('sidebarCollapsed') === 'true';
      setIsSidebarCollapsed(currentState);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes (for when the sidebar component updates localStorage)
    const interval = setInterval(() => {
      const currentState = localStorage.getItem('sidebarCollapsed') === 'true';
      if (currentState !== isSidebarCollapsed) {
        setIsSidebarCollapsed(currentState);
      }
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isSidebarCollapsed]);

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'dark' : 'light'}`}>
      <div className="relative flex min-h-screen w-full bg-background">
        {/* Sidebar component */}
        <Sidebar />
        
        {/* Main content */}
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out border-l border-border
            ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'}
            pl-0`}
        >
          <main className="flex-1 flex flex-col py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
            {/* Page header with current page title */}
            <div className="mb-6 sm:mb-8 pl-14 sm:pl-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {pathname === '/dashboard' 
                  ? 'Dashboard' 
                  : pathname?.includes('/team') 
                    ? 'Team Management'
                    : pathname?.includes('/settings')
                      ? 'Settings'
                      : 'Application'}
              </h1>
            </div>
            
            {/* Page content */}
            <div className={`flex-1 animate-in fade-in ${darkMode ? 'dashboard-mono' : 'light-dashboard'}`}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
