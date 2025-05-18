"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth, useUser } from "reactfire";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  ShieldAlert,
  HelpCircle,
  ShoppingBag,
  Package,
  ClipboardList
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const { data: user } = useUser();
  const router = useRouter();
  
  // Check localStorage for saved collapse state on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);
  
  // Save collapse state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);
  
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: Package,
    },
    {
      name: "Quotes",
      href: "/dashboard/quotes",
      icon: ClipboardList,
    },
    {
      name: "Help Center",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];
  
  // Add admin link if user is admin
  const isAdmin = user?.email === "jackoliverdev@gmail.com";
  
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost" 
        size="icon"
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isMobileOpen ? <X /> : <Menu />}
      </Button>
      
      {/* Sidebar container */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-[#E2E8F0] dark:bg-[#121212] dark:border-[#444444] shadow-sm transition-all duration-300 ease-in-out lg:translate-x-0",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Collapse toggle button - positioned at middle right edge */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleCollapsed}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full border shadow-md bg-background hover:bg-muted hidden lg:flex items-center justify-center z-50"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? 
            <ChevronsRight size={16} className="dark:text-[#E0E0E0]" /> : 
            <ChevronsLeft size={16} className="dark:text-[#E0E0E0]" />
          }
        </Button>
        
        {/* Logo & Search */}
        <div className="p-4 mt-16 lg:mt-0">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/handline-logo.png" alt="HandLine Logo" />
                <AvatarFallback>HL</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <span className="text-lg font-semibold text-[#121926] dark:text-[#E0E0E0]">HandLine</span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-1.5">
            {links.map((link) => {
              // Special case for Dashboard - only highlight if exactly /dashboard or not matching any other nav items
              const isDashboardActive = link.href === "/dashboard" 
                ? pathname === "/dashboard" || (
                    pathname?.startsWith("/dashboard/") && 
                    !links.some(l => l.href !== "/dashboard" && pathname?.startsWith(l.href))
                  )
                : pathname === link.href || pathname?.startsWith(`${link.href}/`);
              
              const isActive = isDashboardActive;
              const Icon = link.icon;
              
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                      isActive 
                        ? "bg-[#F28C38] text-white dark:bg-[#F28C38] dark:text-white" 
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:text-[#B0B0B0] hover:dark:bg-[#212121]"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                    title={isCollapsed ? link.name : undefined}
                  >
                    <div className="min-w-5 flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    {!isCollapsed && (
                      <span className="flex-1 flex justify-between items-center">
                        <span>{link.name}</span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
            
          {/* Admin Dashboard Link (only for admin user) */}
          {isAdmin && (
            <div className="mt-6 pt-6 border-t dark:border-[#444444]">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/admin"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                      pathname?.startsWith('/admin')
                        ? "bg-[#F28C38] text-white dark:bg-[#F28C38] dark:text-white"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:text-[#B0B0B0] hover:dark:bg-[#212121]"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                    title={isCollapsed ? "Admin Dashboard" : undefined}
                  >
                    <div className="min-w-5 flex-shrink-0">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    {!isCollapsed && <span className="font-medium">Admin Dashboard</span>}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
        
        {/* User profile and logout */}
        <div className="border-t border-[#E2E8F0] dark:border-[#444444] p-3">
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#121926] dark:text-[#E0E0E0]">{user?.displayName || user?.email}</span>
                  {user?.displayName && (
                    <span className="text-xs text-[#64748B] dark:text-[#B0B0B0] truncate max-w-[120px]">{user?.email}</span>
                  )}
                </div>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              title="Logout"
              className="text-[#64748B] hover:text-[#121926] hover:bg-[#F8FAFC] dark:text-[#888888] dark:hover:text-[#E0E0E0] dark:hover:bg-[#212121]"
            >
              <LogOut className={cn("h-5 w-5", isCollapsed ? "" : "h-4 w-4")} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 