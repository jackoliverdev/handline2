"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, FileText, TrendingUp, 
  Flame, Scissors, Edit, Trash, Star, Moon, Sun
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllProducts, toggleProductFeatured, toggleProductStock } from "@/lib/products-service";
import { getAllBlogs } from "@/lib/blog-service";
import { formatPrice } from "@/lib/utils";
import { format, addDays, subDays } from "date-fns";
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
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { updateUserPreferences, getUserProfile } from "@/lib/user-service";
import { useUser } from "reactfire";

// Define types for the dashboard statistics
interface ProductInfo {
  id: string;
  title: string;
  price: number;
  isOutOfStock: boolean;
  image_url?: string;
  category?: string;
  temperature_rating?: number;
  cut_resistance_level?: string;
  description?: string;
  is_featured: boolean;
}

interface DashboardStats {
  totalProducts: number;
  productsInStock: number;
  featuredProducts: number;
  totalBlogs: number;
  publishedBlogs: number;
  topProducts: ProductInfo[];
}

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { data: user } = useUser();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    productsInStock: 0,
    featuredProducts: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    topProducts: []
  });
  
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
        
        // Fetch necessary data in parallel
        const [
          { products }, 
          { data: blogs }
        ] = await Promise.all([
          getAllProducts(),
          getAllBlogs()
        ]);
        
        // Process products
        const productsInStock = products.filter((p: any) => !p.out_of_stock);
        const featuredProducts = products.filter((p: any) => p.is_featured);
        
        // Process blogs
        const publishedBlogs = blogs ? blogs.filter((b: any) => b.is_published) : [];
        
        // Get top products
        const topProductsData: ProductInfo[] = products
          .filter((product: any) => product.is_featured) // Only get featured products
          .map((product: any) => ({
            id: product.id,
            title: product.name,
            price: product.price || 99.99,
            isOutOfStock: product.out_of_stock,
            image_url: product.image_url,
            category: product.category || "Safety Gloves",
            temperature_rating: product.temperature_rating,
            cut_resistance_level: product.cut_resistance_level,
            description: product.short_description || product.description,
            is_featured: product.is_featured
          }));
        
        // Update state with all processed data
        setStats({
          totalProducts: products.length,
          productsInStock: productsInStock.length,
          featuredProducts: featuredProducts.length,
          totalBlogs: blogs ? blogs.length : 0,
          publishedBlogs: publishedBlogs.length,
          topProducts: topProductsData
        });
        
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
    } else {
      document.documentElement.classList.remove('dark');
    }
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
      
      // Store in localStorage too for redundancy
      localStorage.setItem('adminDarkMode', newValue ? 'true' : 'false');
      
      // Update user preferences
      await updateUserPreferences(user.uid, { dark_mode: newValue });
    } catch (error) {
      console.error('Failed to update dark mode preference:', error);
    }
  };

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
            Welcome to your Hand Line Admin dashboard. Here's a quick overview of your website:
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
            {format(new Date(), 'dd/MM/yyyy')}
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
              <Star className="h-4 w-4 text-brand-primary" />
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
              <TrendingUp className="h-4 w-4 text-brand-primary" />
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
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Featured Products</h3>
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin/product">Manage All Products</Link>
              </Button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {stats.topProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#F5EFE0]/80 rounded-lg overflow-hidden shadow-sm border border-brand-primary/10 flex flex-col h-full p-4"
                  >
                    {/* Image */}
                    <div className="relative h-40 bg-black rounded-md mb-3">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.title}
                          fill
                          className="object-contain p-2 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-900">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-brand-primary text-white py-0.5 px-2 rounded text-xs font-medium">
                        {product.category || "Safety Gloves"}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <h3 className="text-lg font-bold text-brand-dark mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-brand-secondary mb-3 line-clamp-2">
                      {product.description || "High-quality safety gloves for industrial use"}
                    </p>
                    
                    <div className="flex justify-between mb-3">
                      {product.temperature_rating && (
                        <div className="flex items-center">
                          <Flame className="h-4 w-4 text-brand-primary mr-1" />
                          <span className="text-xs">{product.temperature_rating}°C</span>
                        </div>
                      )}
                      {product.cut_resistance_level && (
                        <div className="flex items-center">
                          <Scissors className="h-4 w-4 text-brand-primary mr-1" />
                          <span className="text-xs">{product.cut_resistance_level}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between pt-2 border-t gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/product/${product.id}`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Featured</span>
                        <Switch
                          checked={product.is_featured}
                          onCheckedChange={() => handleToggleFeatured(product.id)}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">Content Statistics</p>
              <p className="text-sm text-muted-foreground">
                {stats.publishedBlogs} published, {stats.totalBlogs - stats.publishedBlogs} drafts
              </p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/admin/blogs">Manage All Content</Link>
            </Button>
          </div>
          
          <Progress 
            value={stats.totalBlogs > 0 ? (stats.publishedBlogs / stats.totalBlogs) * 100 : 0} 
            className="h-2 mt-2" 
          />
          
          <div className="mt-6">
            <Button className="w-full" asChild>
              <Link href="/admin/blogs/new">Create New Blog Post</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}