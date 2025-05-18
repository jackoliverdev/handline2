"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Calendar, ShoppingBag, FileText, TrendingUp, ArrowUpRight, ArrowDownRight,
  Banknote, Gem, Clock, Award, CalendarDays, CircleDollarSign, CalendarCheck, Circle,
  ChevronDown, Filter, SlidersHorizontal, PieChart, BarChart, User, ShieldAlert,
  ChevronLeft, ChevronRight, Flame, Scissors, Eye, Edit, Trash, Star, Moon, Sun
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllLessons, getBookingsByLessonId, Lesson, LessonBooking } from "@/lib/lessons-service";
import { getAllCoaches, Coach } from "@/lib/coaches-service";
import { getAllBookings, getBookingsByCoach, getBookingsByDateRange, Booking } from "@/lib/bookings-service";
import { getAllProducts, toggleProductFeatured, toggleProductStock } from "@/lib/products-service";
import { getAllFittingBookings, FittingBooking, getAllFittingSlots } from "@/lib/fitting-service";
import { getAllBlogs } from "@/lib/blog-service";
import { formatPrice } from "@/lib/utils";
import { startOfWeek, addDays, format, isToday, isTomorrow, addMonths, subDays, subWeeks, subMonths } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { updateUserPreferences, getUserProfile } from "@/lib/user-service";
import { useUser } from "reactfire";

// Custom GolfIcon component
function Golf(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 18v-6" />
      <path d="M8 10l4 8 4-8" />
      <circle cx="12" cy="4" r="2" />
      <path d="M9 18h6" />
    </svg>
  );
}

// Define types for the dashboard statistics
interface BookingInfo {
  id: string;
  client: string;
  date: string;
  time: string;
  type: string;
  coach: string;
}

interface ProductInfo {
  id: string;
  title: string;
  price: number;
  sales: number;
  isOutOfStock: boolean;
  image_url?: string;
  category?: string;
  temperature_rating?: number;
  cut_resistance_level?: string;
  description?: string;
  is_featured: boolean;
}

interface CoachInfo {
  id: string;
  name: string;
  bookings: number;
  specialty: string;
  isActive: boolean;
}

interface LessonInfo {
  id: string;
  title: string;
  date: string;
  spots: number;
  maxSpots: number;
  price: number;
}

interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  bookingsThisWeek: number;
  bookingsThisMonth: number;
  totalLessons: number;
  activeLessons: number;
  groupLessons: number;
  individualLessons: number;
  groupLessonBookings: number;
  individualBookings: number;
  totalProducts: number;
  productsInStock: number;
  featuredProducts: number;
  lowStockProducts: number;
  totalCoaches: number;
  activeCoaches: number;
  totalFittingSlots: number;
  totalFittingBookings: number;
  fittingBookingsThisWeek: number;
  totalBlogs: number;
  publishedBlogs: number;
  revenue: {
    total: number;
    lessons: number;
    bookings: number;
    products: number;
    fittings: number;
  };
  nextBookings: BookingInfo[];
  topProducts: ProductInfo[];
  topCoaches: CoachInfo[];
  upcomingLessons: LessonInfo[];
}

interface WeeklyData {
  day: string;
  lessons: number;
  bookings: number;
  products: number;
  fittings: number;
}

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { data: user } = useUser();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    upcomingBookings: 0,
    bookingsThisWeek: 0,
    bookingsThisMonth: 0,
    totalLessons: 0,
    activeLessons: 0,
    groupLessons: 0,
    individualLessons: 0,
    groupLessonBookings: 0,
    individualBookings: 0,
    totalProducts: 0,
    productsInStock: 0,
    featuredProducts: 0,
    lowStockProducts: 0,
    totalCoaches: 0,
    activeCoaches: 0,
    totalFittingSlots: 0,
    totalFittingBookings: 0,
    fittingBookingsThisWeek: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    revenue: {
      total: 0,
      lessons: 0,
      bookings: 0,
      products: 0,
      fittings: 0
    },
    nextBookings: [],
    topProducts: [],
    topCoaches: [],
    upcomingLessons: [],
  });
  
  // Weekly revenue distribution for the chart
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([
    { day: "Mon", lessons: 0, bookings: 0, products: 0, fittings: 0 },
    { day: "Tue", lessons: 0, bookings: 0, products: 0, fittings: 0 },
    { day: "Wed", lessons: 0, bookings: 0, products: 0, fittings: 0 },
    { day: "Thu", lessons: 0, bookings: 0, products: 0, fittings: 0 },
    { day: "Fri", lessons: 0, bookings: 0, products: 0, fittings: 0 },
    { day: "Sat", lessons: 0, bookings: 0, products: 0, fittings: 0 },
    { day: "Sun", lessons: 0, bookings: 0, products: 0, fittings: 0 }
  ]);
  
  const [lessonTypeFilter, setLessonTypeFilter] = useState<string>("all");
  const [timeRangeFilter, setTimeRangeFilter] = useState<string>("week");
  const [coachFilter, setCoachFilter] = useState<string>("all");
  const [topItemsCount, setTopItemsCount] = useState<number>(2);
  const [showRevenueSplits, setShowRevenueSplits] = useState<boolean>(true);
  const [selectedCoach, setSelectedCoach] = useState<string>("all");
  const [coachTimeRange, setCoachTimeRange] = useState<string>("all");
  const [coachLessonType, setCoachLessonType] = useState<string>("all");
  const [coachMetricView, setCoachMetricView] = useState<string>("revenue");
  const [coachLessonsData, setCoachLessonsData] = useState<any[]>([]);
  
  const [coachAnalysisData, setCoachAnalysisData] = useState<{
    revenueByType: any;
    timeMetrics: any;
    lessons: any[];
  }>({
    revenueByType: null,
    timeMetrics: null,
    lessons: []
  });
  
  // Add a new state for lesson analytics
  const [selectedLessonCoach, setSelectedLessonCoach] = useState<string>("all");
  const [lessonViewType, setLessonViewType] = useState<string>("individual");
  const [coachLessonsList, setCoachLessonsList] = useState<any[]>([]);
  const [loadingCoachLessons, setLoadingCoachLessons] = useState<boolean>(false);
  
  // Add a new state for table expansion
  const [isTableExpanded, setIsTableExpanded] = useState<boolean>(false);
  
  // Function to load coach-specific lessons
  const loadCoachLessons = async (coachId: string, viewType: string) => {
    try {
      setLoadingCoachLessons(true);
      
      if (viewType === "individual") {
        // For individual lessons, use bookings-service.ts
        const { bookings } = await getAllBookings();
        
        // Filter by coach if not "all"
        let filteredBookings = bookings;
        if (coachId !== "all") {
          filteredBookings = bookings.filter(booking => booking.coach_id === coachId);
        }
        
        // Format individual bookings to match the expected structure
        const enhancedBookings = filteredBookings.map(booking => {
          // Calculate duration if start and end times exist
          let duration = "N/A";
          let durationMinutes = 60; // Default to 60 minutes
          
          if (booking.start_time && booking.end_time) {
            const start = new Date(`1970-01-01T${booking.start_time}`);
            const end = new Date(`1970-01-01T${booking.end_time}`);
            durationMinutes = Math.round((end.getTime() - start.getTime()) / 60000);
            duration = `${durationMinutes} min`;
          }
          
          const coachName = booking.coach?.name || "Unknown Coach";
          
          // Calculate the correct price based on coach rates and duration
          let price = 75; // Default fallback price
          
          if (booking.coach) {
            if (durationMinutes <= 45 && booking.coach.rate_45min) {
              // Use 45-minute rate if duration is 45 minutes or less and rate exists
              price = booking.coach.rate_45min;
            } else if (booking.coach.hourly_rate) {
              // Use hourly rate if available, potentially prorated for longer/shorter sessions
              const hourlyRate = booking.coach.hourly_rate;
              if (durationMinutes === 60) {
                price = hourlyRate;
              } else {
                // Prorate the price based on duration
                price = Math.round((hourlyRate * durationMinutes) / 60);
              }
            }
          }
          
          // Create a lesson-like object from a booking
          return {
            id: booking.id,
            title: `Individual Lesson with ${booking.client_name || "Client"}`,
            description: booking.notes || "No description available",
            date: booking.date,
            start_time: booking.start_time,
            end_time: booking.end_time,
            price: price,
            coach_id: booking.coach_id,
            coach_name: coachName,
            bookings_count: 1, // Each individual booking has exactly 1 booking
            max_participants: 1, // Individual sessions have 1 max participant
            booked_percentage: 100, // Always fully booked
            available_spots: 0, // No available spots for individual bookings
            revenue: price, // Revenue is just the price for 1 booking
            duration,
            client_name: booking.client_name,
            client_email: booking.client_email,
            client_phone: booking.client_phone || "",
            status: booking.status
          };
        });
        
        setCoachLessonsList(enhancedBookings);
      } else {
        // For group lessons, use lessons-service.ts
        const { lessons } = await getAllLessons();
        
        // Filter by coach if not "all"
        let filteredLessons = lessons;
        if (coachId !== "all") {
          filteredLessons = lessons.filter((lesson) => lesson.coach_id === coachId);
        }
        
        // Only include group lessons
        filteredLessons = filteredLessons.filter((lesson) => {
          return lesson.max_participants > 1;
        });
        
        // Get all coaches to match with lessons
        const { coaches } = await getAllCoaches();
        const coachesMap: Record<string, Coach> = coaches.reduce((map: Record<string, Coach>, coach) => {
          map[coach.id] = coach;
          return map;
        }, {});
        
        // Get booking details for each lesson
        const enhancedLessons = await Promise.all(
          filteredLessons.map(async (lesson) => {
            // Get all bookings for this lesson
            const { bookings } = await getBookingsByLessonId(lesson.id);
            
            // Include non-cancelled bookings in the count
            const activeBookings = bookings.filter((b) => b.status !== "cancelled");
            
            // Calculate duration and end time
            let duration = "N/A";
            let end_time = null;
            
            if (lesson.default_start_time) {
              const start = new Date(`1970-01-01T${lesson.default_start_time}`);
              const durationMinutes = lesson.duration || 60;
              const end = new Date(start.getTime() + (durationMinutes * 60000));
              
              const calculatedDurationMinutes = Math.round((end.getTime() - start.getTime()) / 60000);
              duration = `${calculatedDurationMinutes} min`;
              
              // Format end time
              const hours = end.getHours().toString().padStart(2, '0');
              const minutes = end.getMinutes().toString().padStart(2, '0');
              end_time = `${hours}:${minutes}:00`;
            }
            
            // Find the coach for this lesson
            const coach = lesson.coach_id ? coachesMap[lesson.coach_id] : null;
            
            return {
              ...lesson,
              bookings_count: activeBookings.length,
              booked_percentage: Math.round((activeBookings.length / lesson.max_participants) * 100),
              available_spots: lesson.max_participants - activeBookings.length,
              revenue: activeBookings.length * lesson.price, // Calculate revenue
              duration,
              end_time,
              coach_name: coach ? coach.name : "Unknown Coach" 
            };
          })
        );
        
        setCoachLessonsList(enhancedLessons);
      }
    } catch (error) {
      console.error("Error loading coach lessons:", error);
    } finally {
      setLoadingCoachLessons(false);
    }
  };

  // Handle coach selection change
  const handleLessonCoachChange = (value: string) => {
    setSelectedLessonCoach(value);
    loadCoachLessons(value, lessonViewType);
  };

  // Handle view type change
  const handleViewTypeChange = (value: string) => {
    setLessonViewType(value);
    loadCoachLessons(selectedLessonCoach, value);
  };

  // Toggle table expansion state
  const toggleTableExpansion = () => {
    setIsTableExpanded(!isTableExpanded);
  };

  // Format time function for displaying
  const formatLessonTime = (timeString: string | null | undefined): string => {
    if (!timeString) return 'N/A';
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hoursNum = parseInt(hours);
      return `${hoursNum % 12 || 12}:${minutes} ${hoursNum >= 12 ? 'PM' : 'AM'}`;
    } catch (e) {
      return timeString;
    }
  };

  // Calculate summary statistics for lessons
  const calculateSummaryStats = (lessons: any[]) => {
    if (!lessons || lessons.length === 0) {
      return {
        avgDuration: "N/A",
        avgPrice: 0,
        totalBookings: 0,
        totalRevenue: 0
      };
    }

    // Extract numeric duration values
    const durationValues = lessons.map(lesson => {
      if (typeof lesson.duration === 'string') {
        const match = lesson.duration.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      }
      return lesson.duration || 0;
    }).filter(d => d > 0);

    const avgDuration = durationValues.length > 0 
      ? Math.round(durationValues.reduce((sum, val) => sum + val, 0) / durationValues.length) 
      : 0;

    const avgPrice = lessons.length > 0 
      ? Math.round(lessons.reduce((sum, lesson) => sum + lesson.price, 0) / lessons.length) 
      : 0;

    const totalBookings = lessons.reduce((sum, lesson) => sum + lesson.bookings_count, 0);

    const totalRevenue = lessons.reduce((sum, lesson) => sum + (lesson.revenue || 0), 0);

    return {
      avgDuration: `${avgDuration} min`,
      avgPrice,
      totalBookings,
      totalRevenue
    };
  };

  // Handle toggling featured status
  const handleToggleFeatured = async (id: string) => {
    try {
      // Use the toggle function
      const { product } = await toggleProductFeatured(id);
      
      if (!product) throw new Error("Failed to update product");
      
      // Update the products in state
      setStats(prevStats => ({
        ...prevStats,
        topProducts: prevStats.topProducts.map(p => 
          p.id === id ? { ...p, is_featured: product.is_featured } : p
        )
      }));
      
      toast({
        title: "Success",
        description: `Product ${product.is_featured ? 'marked as featured' : 'removed from featured'}.`,
      });
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handle toggling stock status
  const handleToggleStock = async (id: string) => {
    try {
      // Use the toggle function
      const { product } = await toggleProductStock(id);
      
      if (!product) throw new Error("Failed to update product");
      
      // Update the products in state
      setStats(prevStats => ({
        ...prevStats,
        topProducts: prevStats.topProducts.map(p => 
          p.id === id ? { ...p, isOutOfStock: product.out_of_stock } : p
        )
      }));
      
      toast({
        title: "Success",
        description: `Product ${product.out_of_stock ? 'marked as out of stock' : 'marked as in stock'}.`,
      });
    } catch (error) {
      console.error("Error toggling stock status:", error);
      toast({
        title: "Error",
        description: "Failed to update stock status. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Initialize dark mode preference from Supabase
    const initDarkMode = async () => {
      if (!user?.uid) return;
      
      try {
        const profile = await getUserProfile(user.uid);
        
        if (profile && profile.dark_mode !== undefined) {
          setDarkMode(profile.dark_mode);
          applyDarkMode(profile.dark_mode);
        }
      } catch (error) {
        console.error('Failed to fetch dark mode preference:', error);
      }
    };
    
    initDarkMode();
    
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        
        // Fetch all necessary data in parallel
        const [
          { lessons }, 
          { coaches }, 
          { bookings }, 
          { products }, 
          { slots: fittingSlots },
          { bookings: fittingBookings },
          { data: blogs }
        ] = await Promise.all([
          getAllLessons(),
          getAllCoaches(),
          getAllBookings(),
          getAllProducts(),
          getAllFittingSlots(),
          getAllFittingBookings(),
          getAllBlogs()
        ]);
        
        const today = new Date();
        const startOfCurrentWeek = startOfWeek(today);
        const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        // Calculate total bookings
        let totalLessonBookings = 0;
        let groupLessonBookings = 0;
        
        // Count bookings for each lesson
        for (const lesson of lessons) {
          const { bookings: lessonBookings } = await getBookingsByLessonId(lesson.id);
          totalLessonBookings += lessonBookings.length;
          
          // Count bookings for group lessons (lessons with more than 1 participant)
          if (lesson.max_participants > 1) {
            groupLessonBookings += lessonBookings.length;
          }
        }
        
        // Total bookings is the sum of direct bookings and lesson bookings
        const totalBookingsCount = bookings.length + totalLessonBookings;
        
        // Process bookings
        const upcomingBookings = bookings.filter((b: any) => 
          new Date(b.date) >= today && b.status === 'confirmed'
        );
        
        const bookingsThisWeek = bookings.filter((b: any) => 
          new Date(b.date) >= startOfCurrentWeek && 
          new Date(b.date) < addDays(startOfCurrentWeek, 7) &&
          b.status === 'confirmed'
        );
        
        const bookingsThisMonth = bookings.filter((b: any) => 
          new Date(b.date) >= startOfCurrentMonth && 
          new Date(b.date) < addMonths(startOfCurrentMonth, 1) &&
          b.status === 'confirmed'
        );
        
        // Process lessons
        const activeLessons = lessons.filter((l: any) => l.is_active);
        const groupLessons = lessons.filter((l: any) => l.max_participants > 1);
        const individualLessons = lessons.filter((l: any) => l.max_participants === 1);
        
        // Process products
        const productsInStock = products.filter((p: any) => !p.out_of_stock);
        const featuredProducts = products.filter((p: any) => p.is_featured);
        const lowStockProducts = productsInStock.filter(() => Math.random() < 0.3);
        
        // Process coaches
        const activeCoaches = coaches.filter((c: any) => c.is_active);
        
        // Process fitting data
        const upcomingFittingBookings = fittingBookings.filter((b: any) => 
          new Date(b.date) >= today && b.status === 'confirmed'
        );
        
        const fittingBookingsThisWeek = fittingBookings.filter((b: any) => 
          new Date(b.date) >= startOfCurrentWeek && 
          new Date(b.date) < addDays(startOfCurrentWeek, 7) &&
          b.status === 'confirmed'
        );
        
        // Process blogs
        const publishedBlogs = blogs ? blogs.filter((b: any) => b.is_published) : [];
        
        // Calculate revenue
        const totalProductRevenue = products.reduce((acc: number, p: any) => acc + p.price, 0);
        const totalLessonRevenue = lessons.reduce((acc: number, l: any) => acc + l.price, 0);
        const totalBookingRevenue = bookings.length * 75; // Mock average booking value
        const totalFittingRevenue = fittingBookings.length * 120; // Mock average fitting value
        
        // Get next bookings
        const nextBookingsData: BookingInfo[] = [...upcomingBookings, ...upcomingFittingBookings]
          .sort((a, b) => new Date(a.date + ' ' + a.start_time).getTime() - new Date(b.date + ' ' + b.start_time).getTime())
          .slice(0, 5)
          .map(booking => {
            const date = new Date(booking.date);
            let displayDate = format(date, 'MMM d');
            if (isToday(date)) displayDate = 'Today';
            if (isTomorrow(date)) displayDate = 'Tomorrow';
            
            // Determine the booking type
            const isFitting = 'slot_id' in booking;
            
            // Get coach name (only available in regular bookings)
            let coachName = 'Any Coach';
            if (!isFitting && 'coach' in booking && booking.coach) {
              coachName = booking.coach.name || 'Any Coach';
            }
            
            return {
              id: booking.id,
              client: booking.client_name,
              date: displayDate,
              time: booking.start_time.substring(0, 5),
              type: isFitting ? 'Fitting' : 'Coaching',
              coach: coachName
            };
          });
        
        // Get top products
        const topProductsData: ProductInfo[] = products
          .filter((product: any) => product.is_featured) // Only get featured products
          .map((product: any) => ({
            id: product.id,
            title: product.name,
            price: product.price || 99.99,
            sales: Math.floor(Math.random() * 50) + 1, // Mock sales data
            isOutOfStock: product.out_of_stock,
            image_url: product.image_url,
            category: product.category || "Safety Gloves",
            temperature_rating: product.temperature_rating,
            cut_resistance_level: product.cut_resistance_level,
            description: product.short_description || product.description,
            is_featured: product.is_featured
          }));
        
        // Get top coaches
        const topCoachesData: CoachInfo[] = coaches
          .sort(() => Math.random() - 0.5) // Mock sort by booking count
          .slice(0, 4)
          .map((coach: any) => ({
            id: coach.id,
            name: coach.name,
            bookings: Math.floor(Math.random() * 30) + 5, // Mock booking count
            specialty: coach.specialty || 'General',
            isActive: coach.is_active
          }));
        
        // Get upcoming lessons
        const upcomingLessonsData: LessonInfo[] = lessons
          .filter((l: any) => l.is_active)
          .sort(() => Math.random() - 0.5) // Mock sort
          .slice(0, 5)
          .map((lesson: any) => ({
            id: lesson.id,
            title: lesson.title,
            date: format(addDays(today, Math.floor(Math.random() * 14)), 'MMM d'),
            spots: lesson.max_participants - Math.floor(Math.random() * lesson.max_participants),
            maxSpots: lesson.max_participants,
            price: lesson.price
          }));
        
        // Update state with all processed data
        setStats({
          totalBookings: totalBookingsCount, 
          upcomingBookings: upcomingBookings.length,
          bookingsThisWeek: bookingsThisWeek.length,
          bookingsThisMonth: bookingsThisMonth.length,
          
          totalLessons: lessons.length,
          activeLessons: activeLessons.length,
          groupLessons: groupLessons.length,
          individualLessons: individualLessons.length,
          groupLessonBookings: groupLessonBookings,
          individualBookings: bookings.length,
          
          totalProducts: products.length,
          productsInStock: productsInStock.length,
          featuredProducts: featuredProducts.length,
          lowStockProducts: lowStockProducts.length,
          
          totalCoaches: coaches.length,
          activeCoaches: activeCoaches.length,
          
          totalFittingSlots: fittingSlots.length,
          totalFittingBookings: fittingBookings.length,
          fittingBookingsThisWeek: fittingBookingsThisWeek.length,
          
          totalBlogs: blogs ? blogs.length : 0,
          publishedBlogs: publishedBlogs.length,
          
          revenue: {
            total: totalProductRevenue + totalLessonRevenue + totalBookingRevenue + totalFittingRevenue,
            lessons: totalLessonRevenue,
            bookings: totalBookingRevenue,
            products: totalProductRevenue,
            fittings: totalFittingRevenue
          },
          
          nextBookings: nextBookingsData,
          topProducts: topProductsData,
          topCoaches: topCoachesData,
          upcomingLessons: upcomingLessonsData
        });
        
        // Load coach lessons data on initial load
        await loadCoachLessons("all", "individual");
        
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDashboardData();
  }, [user?.uid]);
  
  // Apply dark mode to the document
  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      // Force layout recalculation by triggering a style reflow
      document.documentElement.style.backgroundColor = document.documentElement.style.backgroundColor;
    } else {
      document.documentElement.classList.remove('dark');
      // Force layout recalculation by triggering a style reflow
      document.documentElement.style.backgroundColor = document.documentElement.style.backgroundColor;
    }
    
    // Dispatch a custom event for any components that need to respond to theme changes
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark } }));
  };
  
  // Toggle dark mode and save to Supabase
  const toggleDarkMode = async () => {
    if (!user?.uid) return;
    
    try {
      // Get current state
      const newValue = !darkMode;
      
      // Set local state immediately to update UI
      setDarkMode(newValue);
      applyDarkMode(newValue);
      
      // Additional force refresh for any stubborn components
      setTimeout(() => {
        // Force a slight DOM update that will cause a repaint
        const currentScrollPos = window.scrollY;
        window.scrollTo(0, currentScrollPos + 1);
        setTimeout(() => window.scrollTo(0, currentScrollPos), 0);
      }, 0);
      
      // Store in localStorage too for redundancy
      localStorage.setItem('adminDarkMode', newValue ? 'true' : 'false');
      
      // Try to update via API to bypass RLS issues
      const apiResponse = await fetch('/api/user-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          dark_mode: newValue
        }),
      });
      
      const apiResult = await apiResponse.json();
      console.log('API response:', apiResult);
      
      if (!apiResponse.ok) {
        // If API fails, fall back to direct method
        await updateUserPreferences(user.uid, { dark_mode: newValue });
      }
    } catch (error) {
      console.error('Failed to update dark mode preference:', error);
      // Don't revert the UI state, as it would cause flickering
    }
  };
  
  // Effect to initialize dark mode and ensure consistency
  useEffect(() => {
    if (isMounted && user?.uid) {
      // Check localStorage first for faster initial render
      const storedDarkMode = localStorage.getItem('adminDarkMode');
      
      // Initially apply from localStorage to avoid flash
      if (storedDarkMode !== null) {
        const isDark = storedDarkMode === 'true';
        setDarkMode(isDark);
        applyDarkMode(isDark);
      }
      
      // Then fetch from server for consistency
      const fetchDarkModePreference = async () => {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile && profile.dark_mode !== undefined) {
            setDarkMode(profile.dark_mode);
            applyDarkMode(profile.dark_mode);
            // Update localStorage if different
            localStorage.setItem('adminDarkMode', profile.dark_mode ? 'true' : 'false');
          }
        } catch (error) {
          console.error('Failed to fetch dark mode preference:', error);
        }
      };
      
      fetchDarkModePreference();
    }
  }, [isMounted, user?.uid]);

  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-l-4 border-l-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">...</div>
                <div className="h-2 bg-gray-200 rounded w-3/4 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome and quick status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your HandLine safety gloves dashboard. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch 
              checked={darkMode} 
              onCheckedChange={toggleDarkMode}
              className="data-[state=checked]:bg-blue-600"
            />
            <Moon className="h-4 w-4 text-blue-500" />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            {format(new Date(), 'MMMM d, yyyy')}
          </Button>
        </div>
      </div>
      
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {/* Total Products */}
        <div className="overflow-hidden rounded-xl bg-card border border-border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-card-foreground">
                {isLoading ? '...' : stats.totalProducts}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.featuredProducts} featured products
              </div>
            </div>
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-brand-primary" />
            </div>
          </div>
          <div className="bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mt-2 sm:mt-0">
            Total Products
          </div>
        </div>
        {/* Stock Status */}
        <div className="overflow-hidden rounded-xl bg-card border border-border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-card-foreground">
                {isLoading ? '...' : stats.productsInStock}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.totalProducts > 0 ? 
                  `${Math.round((stats.productsInStock / stats.totalProducts) * 100)}% of product catalogue in stock` : 
                  "No products"}
              </div>
            </div>
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-muted rounded-full flex items-center justify-center">
              <CircleDollarSign className="h-4 w-4 text-brand-primary" />
            </div>
          </div>
          <div className="bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mt-2 sm:mt-0">
            Products In Stock
          </div>
        </div>
        {/* Blog Posts */}
        <div className="overflow-hidden rounded-xl bg-card border border-border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-card-foreground">
                {isLoading ? '...' : stats.totalBlogs}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.publishedBlogs} published posts
              </div>
            </div>
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-muted rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-brand-primary" />
            </div>
          </div>
          <div className="bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mt-2 sm:mt-0">
            Total Blog Posts
          </div>
        </div>
        {/* Draft Posts */}
        <div className="overflow-hidden rounded-xl bg-card border border-border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-card-foreground">
                {isLoading ? '...' : (stats.totalBlogs - stats.publishedBlogs)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Unpublished draft content
              </div>
            </div>
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-muted rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-brand-primary" />
            </div>
          </div>
          <div className="bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mt-2 sm:mt-0">
            Draft Blog Posts
          </div>
        </div>
      </div>

      {/* Product Management Card */}
      <Card className="mt-4 sm:mt-6">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-lg sm:text-xl">Product Management</CardTitle>
          <CardDescription className="text-sm sm:text-base">Manage your HandLine safety glove products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Featured Products */}
            <div className="bg-muted/20 rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-2 flex items-center text-base sm:text-lg">
                <Award className="h-4 w-4 mr-2 text-brand-primary" />
                Featured Products
              </h3>
              <div className="text-2xl font-bold mb-2">{stats.featuredProducts}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {stats.totalProducts > 0 
                  ? `${Math.round((stats.featuredProducts / stats.totalProducts) * 100)}% of products are featured` 
                  : "No products available"}
              </p>
              <div className="mt-3 sm:mt-4">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/product">Manage Featured Products</Link>
                </Button>
              </div>
            </div>
            {/* Product Categories */}
            <div className="bg-muted/20 rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-2 flex items-center text-base sm:text-lg">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-brand-primary" />
                Product Categories
              </h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Heat-Resistant Gloves</span>
                  <span className="font-medium">{Math.floor(stats.totalProducts * 0.4)}</span>
                </div>
                <Progress value={40} className="h-1" />
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Cut-Resistant Gloves</span>
                  <span className="font-medium">{Math.floor(stats.totalProducts * 0.35)}</span>
                </div>
                <Progress value={35} className="h-1" />
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Chemical-Resistant Gloves</span>
                  <span className="font-medium">{Math.floor(stats.totalProducts * 0.25)}</span>
                </div>
                <Progress value={25} className="h-1" />
              </div>
              <div className="mt-3 sm:mt-4">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/product">Manage Categories</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
              <h3 className="font-medium text-base sm:text-lg">Featured Products</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-brand-primary text-brand-primary hover:bg-white/80"
                  onClick={() => {
                    const container = document.getElementById('featured-products-container');
                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Scroll left</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-brand-primary text-brand-primary hover:bg-white/80"
                  onClick={() => {
                    const container = document.getElementById('featured-products-container');
                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Scroll right</span>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link href="/admin/product" className="flex items-center gap-1.5">
                    <span>View All Products</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
              </div>
            ) : stats.topProducts.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground">No featured products available.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Mobile: grid, Desktop: flex carousel */}
                <div
                  id="featured-products-container"
                  className="grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:pb-6 sm:space-x-4 sm:gap-0 scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style jsx global>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {stats.topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#F5EFE0]/80 rounded-lg overflow-hidden shadow-sm border border-brand-primary/10 flex flex-col h-full min-w-0 p-2 sm:p-5 w-full sm:min-w-[240px] md:w-72 flex-shrink-0"
                    >
                      {/* Image */}
                      <div className="relative h-20 sm:h-48 bg-black rounded-md mb-2">
                        {product.image_url ? (
                          <Image
                            src={product.image_url || '/images/placeholder.png'}
                            alt={product.title}
                            fill
                            className="object-contain p-2 sm:p-4 transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-900">
                            <ShoppingBag className="h-8 w-8 text-muted-foreground/40" />
                          </div>
                        )}
                        {/* Category tag: hidden on mobile, visible on sm+ */}
                        <div className="hidden sm:block absolute top-2 left-2 bg-brand-primary text-white py-0.5 px-2 rounded text-xs font-medium">
                          {product.category || "Safety Gloves"}
                        </div>
                        {product.isOutOfStock && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white py-0.5 px-2 rounded text-xs font-medium">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <h3 className="text-xs sm:text-xl font-bold text-brand-dark mb-1 font-heading line-clamp-1 sm:line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-brand-secondary mb-2 sm:mb-4 line-clamp-2">
                        {product.description || "High-quality safety gloves for industrial use"}
                      </p>
                      <div className="flex flex-col gap-1 mb-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:mb-6">
                        {product.temperature_rating && (
                          <div className="flex items-center">
                            <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-brand-primary mr-1" />
                            <span className="text-[10px] sm:text-xs text-brand-secondary">{product.temperature_rating}°C</span>
                          </div>
                        )}
                        {product.cut_resistance_level && (
                          <div className="flex items-center">
                            <Scissors className="h-3 w-3 sm:h-4 sm:w-4 text-brand-primary mr-1" />
                            <span className="text-[10px] sm:text-xs text-brand-secondary">{product.cut_resistance_level}</span>
                          </div>
                        )}
                      </div>
                      {/* Actions */}
                      <div className="mt-auto flex items-center justify-between pt-2 border-t border-border gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 p-0"
                          asChild
                        >
                          <Link href={`/admin/product/${product.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => toast({
                            title: "Action Required",
                            description: "Please go to Product Management to delete products",
                          })}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Switch
                          checked={product.is_featured}
                          onCheckedChange={() => handleToggleFeatured(product.id)}
                          className="data-[state=checked]:bg-amber-500 h-5 w-9"
                        />
                        <Switch
                          checked={!product.isOutOfStock}
                          onCheckedChange={() => handleToggleStock(product.id)}
                          className="data-[state=checked]:bg-green-500 h-5 w-9"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Blog Management Card */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle>Blog Management</CardTitle>
          <CardDescription>Manage your HandLine blog content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Publication Status */}
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <PieChart className="h-4 w-4 mr-2 text-brand-primary" />
                Publication Status
              </h3>
              <div className="flex gap-3 mt-3">
                <div className="flex-1 bg-green-50 p-3 rounded-md border border-green-100">
                  <div className="text-sm text-green-700 mb-1">Published</div>
                  <div className="text-2xl font-bold text-green-800">{stats.publishedBlogs}</div>
                </div>
                <div className="flex-1 bg-amber-50 p-3 rounded-md border border-amber-100">
                  <div className="text-sm text-amber-700 mb-1">Drafts</div>
                  <div className="text-2xl font-bold text-amber-800">{stats.totalBlogs - stats.publishedBlogs}</div>
                </div>
              </div>
              <div className="mt-4">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/blogs">Manage Blog Posts</Link>
                </Button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-brand-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3 mt-2 text-sm">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-muted-foreground">Last post published: </span>
                  <span className="font-medium ml-1">{format(new Date(), 'dd/MM/yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-muted-foreground">Last draft saved: </span>
                  <span className="font-medium ml-1">{format(subDays(new Date(), 1), 'dd/MM/yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-brand-primary mr-2"></div>
                  <span className="text-muted-foreground">Next scheduled post: </span>
                  <span className="font-medium ml-1">{format(addDays(new Date(), 5), 'dd/MM/yyyy')}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/blogs/new">Create New Post</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Latest Blog Posts</h3>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/admin/blogs">View All Posts</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">
                      {i === 1 ? "Innovations in Heat-Resistant Safety Gloves" : 
                       i === 2 ? "The Importance of Cut-Resistant Gloves in Industry" : 
                       "Choosing the Right Safety Gloves for Your Application"}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <CalendarCheck className="h-3 w-3 mr-1" />
                      {format(subDays(new Date(), i * 7), 'dd/MM/yyyy')}
                    </div>
                  </div>
                  <Badge variant="default" className="ml-2">
                    Published
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Analysis Card */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle>Industry Applications</CardTitle>
          <CardDescription>See how your products are distributed across industries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Industry Distribution */}
            <div className="md:col-span-2 bg-muted/20 rounded-lg p-4">
              <h3 className="font-medium mb-4">Product Distribution by Industry</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Manufacturing</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2 mt-1" indicatorClassName="bg-brand-primary" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Construction</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2 mt-1" indicatorClassName="bg-blue-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Chemical Processing</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <Progress value={18} className="h-2 mt-1" indicatorClassName="bg-amber-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Food Processing</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <Progress value={12} className="h-2 mt-1" indicatorClassName="bg-green-500" />
                </div>
              </div>
              <div className="mt-5">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admin/product">View Industry Breakdown</Link>
                </Button>
              </div>
            </div>
            
            {/* Safety Standards */}
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <ShieldAlert className="h-4 w-4 mr-2 text-brand-primary" />
                Safety Standard Compliance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Circle className="h-3 w-3 fill-green-500 text-green-500 mr-2" />
                    <span className="text-sm">EN 388 (Cut Protection)</span>
                  </div>
                  <span className="font-medium text-sm">{Math.floor(stats.totalProducts * 0.85)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Circle className="h-3 w-3 fill-amber-500 text-amber-500 mr-2" />
                    <span className="text-sm">EN 407 (Heat Protection)</span>
                  </div>
                  <span className="font-medium text-sm">{Math.floor(stats.totalProducts * 0.65)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Circle className="h-3 w-3 fill-blue-500 text-blue-500 mr-2" />
                    <span className="text-sm">EN 374 (Chemical)</span>
                  </div>
                  <span className="font-medium text-sm">{Math.floor(stats.totalProducts * 0.40)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Circle className="h-3 w-3 fill-purple-500 text-purple-500 mr-2" />
                    <span className="text-sm">ANSI/ISEA 105</span>
                  </div>
                  <span className="font-medium text-sm">{Math.floor(stats.totalProducts * 0.75)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 