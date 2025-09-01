"use client";

import { ReactNode, useEffect, useState } from "react";
import { AdminSidebar } from "@/components/app/admin-sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "reactfire";
import { getUserProfile } from "@/lib/user-service";
import { getUserRole } from "@/lib/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: user, status } = useUser();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Check if user has admin access (role-based)
  useEffect(() => {
    const checkAdmin = async () => {
      if (status === "success" && user) {
        const role = await getUserRole(user);
        if (role !== 'admin') {
          router.push('/dashboard');
        }
      } else if (status === "success" && !user) {
        router.push('/');
      }
    };
    checkAdmin();
  }, [user, status, router]);

  // Check localStorage for saved collapse state on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState) {
      setIsSidebarCollapsed(savedState === 'true');
    }
    
    // Set up event listener for sidebar collapse changes
    const handleStorageChange = () => {
      const currentState = localStorage.getItem('adminSidebarCollapsed') === 'true';
      setIsSidebarCollapsed(currentState);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes (for when the sidebar component updates localStorage)
    const interval = setInterval(() => {
      const currentState = localStorage.getItem('adminSidebarCollapsed') === 'true';
      if (currentState !== isSidebarCollapsed) {
        setIsSidebarCollapsed(currentState);
      }
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isSidebarCollapsed]);

  // Initialize dark mode from user profile
  useEffect(() => {
    const fetchDarkMode = async () => {
      if (!user?.uid) return;
      
      try {
        const profile = await getUserProfile(user.uid);
        if (profile && profile.dark_mode !== undefined) {
          setDarkMode(profile.dark_mode);
        }
      } catch (error) {
        console.error('Failed to fetch dark mode preference:', error);
      }
    };
    
    fetchDarkMode();
  }, [user?.uid]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Listen for theme change events from anywhere in the app
    const handleThemeChange = (event: any) => {
      const isDark = event.detail?.isDark;
      if (isDark !== undefined) {
        setDarkMode(isDark);
      }
    };
    
    window.addEventListener('themechange', handleThemeChange);
    
    // Additional check to ensure consistency on page load
    const storedDarkMode = localStorage.getItem('adminDarkMode');
    if (storedDarkMode !== null) {
      const isDark = storedDarkMode === 'true';
      // Only update if different to avoid unnecessary renders
      if (isDark !== darkMode) {
        setDarkMode(isDark);
      }
    }
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, [darkMode]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Protected admin content
  return (
    <div className={`min-h-screen bg-background ${darkMode ? 'dark' : ''}`}>
      {/* Admin Sidebar component */}
      <AdminSidebar />
      
      {/* Main content */}
      <div 
        className={`transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'md:pl-20 lg:pl-24 xl:pl-28' : 'md:pl-64 lg:pl-72 xl:pl-80'}
          pl-0`}
      >
        <main className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-12 xl:px-16">
          {/* Page header with admin badge */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center gap-2 mt-12 sm:mt-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {pathname === '/admin' 
                ? 'Admin Dashboard' 
                : pathname?.includes('/users') 
                  ? 'User Management'
                  : pathname?.includes('/blogs')
                    ? 'Blog Management'
                    : pathname?.includes('/careers')
                      ? 'Careers Management'
                    : pathname?.includes('/product')
                      ? 'Product Management'
                    : pathname?.includes('/help')
                      ? 'Help Center Management'
                      : pathname?.includes('/settings')
                        ? 'Platform Settings'
                        : pathname?.includes('/inbox')
                          ? 'Admin Inbox'
                          : 'Admin Panel'}
            </h1>
            <span className="inline-block w-fit px-2 py-1 text-xs rounded bg-orange-100 text-brand-primary font-semibold">
              Admin Access
            </span>
          </div>
          
          {/* Page content */}
          <div className="animate-in fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 