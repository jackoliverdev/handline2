"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth, useUser } from "reactfire";
import { useRole } from "@/components/role-provider";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  ShieldAlert,
  FileText,
  HelpCircle,
  MessagesSquare,
  ShoppingBag,
  DollarSign,
  Calendar,
  Factory
} from "lucide-react";

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const { data: user } = useUser();
  const router = useRouter();
  const { isAdmin } = useRole();
  
  // Check localStorage for saved collapse state on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);
  
  // Save collapse state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('adminSidebarCollapsed', isCollapsed.toString());
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
      name: "Admin Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Product Management",
      href: "/admin/product",
      icon: ShoppingBag,
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Blog Management",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      name: "Industry Management",
      href: "/admin/industries",
      icon: Factory,
    },
  ];
  
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
        
        {/* Logo */}
        <div className="p-4 mt-16 lg:mt-0">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/Logo-HLC.png" alt="HandLine Logo" />
                <AvatarFallback>HL</AvatarFallback>
              </Avatar>
              <ShieldAlert className="h-3 w-3 text-brand-primary dark:text-brand-primary absolute -top-1 -right-1" />
            </div>
            {!isCollapsed && (
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#121926] dark:text-[#E0E0E0]">Hand Line</span>
                <span className="text-xs ml-1 px-1.5 py-0.5 rounded-sm bg-[#F1F5F9] text-brand-primary dark:bg-[#212121] dark:text-brand-primary font-medium">Admin Panel</span>
              </div>
            )}
          </Link>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="mb-2 px-2">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-[#64748B] dark:text-[#B0B0B0] uppercase tracking-wider">
                Admin Controls
              </div>
            )}
          </div>
          <ul className="space-y-1.5">
            {links.map((link) => {
              // Special case for Admin Dashboard - only highlight on exact match
              const isActive = link.href === "/admin" 
                ? pathname === "/admin" 
                : pathname === link.href || 
                  (pathname?.startsWith(link.href + '/') && 
                   pathname?.split('/').length === link.href.split('/').length + 1);
              
              const Icon = link.icon;
              
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                      isActive 
                        ? "bg-brand-primary text-white dark:bg-brand-primary dark:text-white" 
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:text-[#B0B0B0] hover:dark:bg-[#212121]"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                    title={isCollapsed ? link.name : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    {!isCollapsed && <span>{link.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#444444]">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all text-[#64748B] hover:bg-[#F8FAFC] dark:text-[#B0B0B0] hover:dark:bg-[#212121]"
                  title={isCollapsed ? "Go to User Dashboard" : undefined}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  {!isCollapsed && <span>User Dashboard</span>}
                </Link>
              </li>
            </ul>
          </div>
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
                  <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "Admin"} />
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "A"}</AvatarFallback>
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