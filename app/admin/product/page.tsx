"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { getAllProducts, toggleProductFeatured, toggleProductStock, deleteProduct } from "@/lib/products-service";
import { ShoppingBag, Plus, Edit, Trash, Star, Tag, Thermometer, Scissors, ChevronDown, ChevronUp, Filter, X, SearchX, Flame } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/products-service";
import { matchesHazardProtection } from "@/content/hazardfilters";
import { matchesWorkEnvironment } from "@/content/workenvironmentfilters";
import { hazardProtectionFilters } from "@/content/hazardfilters";
import { workEnvironmentFilters } from "@/content/workenvironmentfilters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("none");
  const [selectedTempRating, setSelectedTempRating] = useState<string>("none");
  const [selectedHazardProtections, setSelectedHazardProtections] = useState<string[]>([]);
  const [selectedWorkEnvironments, setSelectedWorkEnvironments] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Number of products to show per row based on screen size (4 in large screens)
  const PRODUCTS_PER_ROW = 4;
  // Number of rows to show initially (2 rows = 8 products)
  const INITIAL_ROWS = 2;
  
  // Load products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        // Fetch all products
        const { products } = await getAllProducts();
        if (products) {
          setProducts(products);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []);
  
  // Get unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category || "Uncategorized"))
  );
  
  // Get unique subcategories based on selected category
  const uniqueSubCategories = Array.from(
    new Set(
      products
        .filter(product => !selectedCategory || selectedCategory === "all" || product.category === selectedCategory)
        .map(product => product.sub_category)
        .filter(Boolean)
    )
  ) as string[];
  
  // Get unique temperature ratings
  const uniqueTempRatings = Array.from(
    new Set(
      products
        .filter(product => product.temperature_rating !== null)
        .map(product => product.temperature_rating)
    )
  ).sort((a, b) => Number(a) - Number(b)) as number[];
  
  // Get unique industries
  const uniqueIndustries = Array.from(
    new Set(
      products
        .flatMap(product => product.industries || [])
    )
  ).sort() as string[];
  
  // Define preferred category order
  const preferredOrder = [
    "Heat Resistant Gloves",
    "Cut Resistant Gloves",
    "General Purpose Gloves",
    "Industrial Swabs",
    "Respiratory Protection"
  ];
  
  // Sort categories based on preferred order
  const categories = [...uniqueCategories].sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    
    // If both categories are in preferredOrder, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only a is in preferredOrder, it comes first
    if (indexA !== -1) {
      return -1;
    }
    
    // If only b is in preferredOrder, it comes first
    if (indexB !== -1) {
      return 1;
    }
    
    // If neither is in preferredOrder, sort alphabetically
    return a.localeCompare(b);
  });
  
  // Update active filters count when filters change
  useEffect(() => {
    let count = 0;
    if (selectedCategory && selectedCategory !== "all") count++;
    if (selectedSubCategory && selectedSubCategory !== "none") count++;
    if (selectedTempRating && selectedTempRating !== "none") count++;
    if (selectedHazardProtections.length > 0) count++;
    if (selectedWorkEnvironments.length > 0) count++;
    if (selectedIndustries.length > 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCategory, selectedSubCategory, selectedTempRating, selectedHazardProtections, selectedWorkEnvironments, selectedIndustries]);
  
  // Handle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  // Handle hazard protection selection
  const toggleHazardProtection = (hazard: string) => {
    setSelectedHazardProtections(prev => 
      prev.includes(hazard)
        ? prev.filter(i => i !== hazard)
        : [...prev, hazard]
    );
  };

  // Handle work environment selection
  const toggleWorkEnvironment = (environment: string) => {
    setSelectedWorkEnvironments(prev => 
      prev.includes(environment)
        ? prev.filter(i => i !== environment)
        : [...prev, environment]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategory("none");
    setSelectedTempRating("none");
    setSelectedHazardProtections([]);
    setSelectedWorkEnvironments([]);
    setSelectedIndustries([]);
  };
  
  // Filter products by all criteria
  const filteredProducts = products.filter((product) => {
    // Match search query
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.short_description && product.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    // Match category
    const matchesCategory = 
      !selectedCategory || 
      selectedCategory === "all" || 
      (product.category || "Uncategorized") === selectedCategory;
    
    // Match subcategory
    const matchesSubCategory =
      !selectedSubCategory ||
      selectedSubCategory === "none" ||
      product.sub_category === selectedSubCategory;
    
    // Match temperature rating
    const matchesTempRating =
      !selectedTempRating ||
      selectedTempRating === "none" ||
      (product.temperature_rating !== null && 
       product.temperature_rating !== undefined && 
       product.temperature_rating.toString() === selectedTempRating);
    
    // Match hazard protection
    const matchesHazardProtectionFilter =
      selectedHazardProtections.length === 0 ||
      selectedHazardProtections.some(hazardId => 
        matchesHazardProtection(product.safety, hazardId)
      );
    
    // Match work environment
    const matchesWorkEnvironmentFilter =
      selectedWorkEnvironments.length === 0 ||
      selectedWorkEnvironments.some(environmentId => 
        matchesWorkEnvironment(product.environment_pictograms, environmentId)
      );
    
    // Match industries
    const matchesIndustries =
      selectedIndustries.length === 0 ||
      (product.industries && 
       selectedIndustries.some(industry => 
         product.industries?.includes(industry)
       ));
    
    return matchesSearch && 
           matchesCategory && 
           matchesSubCategory && 
           matchesTempRating && 
           matchesHazardProtectionFilter && 
           matchesWorkEnvironmentFilter && 
           matchesIndustries;
  });
  
  // Sort products based on selected option and category order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // First sort by category according to preferred order
    const categoryA = a.category || "Uncategorized";
    const categoryB = b.category || "Uncategorized";
    
    const indexA = preferredOrder.indexOf(categoryA);
    const indexB = preferredOrder.indexOf(categoryB);
    
    // If categories are different and both are in preferred order, sort by category
    if (categoryA !== categoryB && indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only one category is in preferred order, it comes first
    if (indexA !== -1 && indexB === -1) {
      return -1;
    }
    
    if (indexA === -1 && indexB !== -1) {
      return 1;
    }
    
    // If categories are the same or neither is in preferred order, 
    // sort by the selected sort option
    switch (sortOption) {
      case "featured":
        // Featured products first, then by date
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0) || 
               new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  // Determine if we need to show the "See More" button
  const initialProductsCount = INITIAL_ROWS * PRODUCTS_PER_ROW;
  const hasMoreProducts = sortedProducts.length > initialProductsCount;
  
  // Determine which products to show (all or just first 2 rows)
  const displayedProducts = isExpanded || !hasMoreProducts 
    ? sortedProducts 
    : sortedProducts.slice(0, initialProductsCount);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle toggling featured status
  const handleToggleFeatured = async (id: string) => {
    try {
      // Use the toggle function
      const { product } = await toggleProductFeatured(id);
      
      if (!product) throw new Error("Failed to update product");
      
      // Update the products list with the new data
      setProducts(products.map(p => 
        p.id === id ? { ...p, is_featured: product.is_featured } : p
      ));
      
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
      
      // Update the products list with the new data
      setProducts(products.map(p => 
        p.id === id ? { ...p, out_of_stock: product.out_of_stock } : p
      ));
      
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
  
  // Handle confirming delete
  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };
  
  // Handle deleting a product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      // Use the delete function
      const { success } = await deleteProduct(productToDelete.id);
      
      if (!success) throw new Error("Failed to delete product");
      
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productToDelete.id));
      
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Header with top-right create button (title shown in admin layout) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px]">
          {/** Duplicate in-page title removed */}
          <p className="text-muted-foreground">Manage your products, add new ones, and control visibility.</p>
        </div>
        <Button asChild>
          <Link href="/admin/product/create">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>
      
      {/* Filter and Grid layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px,1fr]">
        {/* Left sidebar - filters */}
        <div className="hidden md:block">
          <div className="sticky top-24 border rounded-lg overflow-hidden border-brand-primary/10 dark:border-brand-primary/20">
            <div className="bg-[#F5EFE0]/80 dark:bg-transparent p-4 backdrop-blur-sm dark:backdrop-blur-none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brand-dark dark:text-white">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300" 
                    onClick={clearFilters}
                  >
                    <X className="mr-1.5 h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <Accordion type="single" collapsible defaultValue="category" className="border-brand-primary/10 dark:border-brand-primary/20">
                  <AccordionItem value="category" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                    <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="max-h-[240px] overflow-y-auto pr-1 space-y-2 mt-2">
                        <div 
                          className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                            !selectedCategory || selectedCategory === "all" 
                              ? "bg-brand-primary/10 text-brand-primary font-medium" 
                              : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
                          }`}
                          onClick={() => setSelectedCategory("all")}
                        >
                          All Categories
                        </div>
                        {categories.map((category) => (
                          <div 
                            key={category} 
                            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                              selectedCategory === category 
                                ? "bg-brand-primary/10 text-brand-primary font-medium" 
                                : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                
                  {/* Sub-Category Filter */}
                  {uniqueSubCategories.length > 0 && (
                    <AccordionItem value="subcategory" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Sub-Category</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          <div 
                            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                              !selectedSubCategory || selectedSubCategory === "none"
                                ? "bg-brand-primary/10 text-brand-primary font-medium" 
                                : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
                            }`}
                            onClick={() => setSelectedSubCategory("none")}
                          >
                            All Sub-Categories
                          </div>
                          {uniqueSubCategories.map((subCategory) => (
                            <div 
                              key={subCategory} 
                              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                                selectedSubCategory === subCategory 
                                  ? "bg-brand-primary/10 text-brand-primary font-medium" 
                                  : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
                              }`}
                              onClick={() => setSelectedSubCategory(subCategory)}
                            >
                              {subCategory}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {/* Temperature Rating Filter */}
                  {uniqueTempRatings.length > 0 && (
                    <AccordionItem value="temperature" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Temperature Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          <div 
                            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                              !selectedTempRating || selectedTempRating === "none"
                                ? "bg-brand-primary/10 text-brand-primary font-medium" 
                                : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
                            }`}
                            onClick={() => setSelectedTempRating("none")}
                          >
                            Any Temperature
                          </div>
                          {uniqueTempRatings.map((temp) => (
                            <div 
                              key={temp} 
                              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                                selectedTempRating === temp.toString() 
                                  ? "bg-brand-primary/10 text-brand-primary font-medium" 
                                  : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
                              }`}
                              onClick={() => setSelectedTempRating(temp.toString())}
                            >
                              {temp}°C
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {/* Hazard Protection Filter */}
                  {hazardProtectionFilters.length > 0 && (
                    <AccordionItem value="hazardprotection" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Hazard Protection</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          {hazardProtectionFilters.map((hazard) => (
                            <div key={hazard.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`hazard-sidebar-${hazard.id}`} 
                                checked={selectedHazardProtections.includes(hazard.id)}
                                onCheckedChange={() => toggleHazardProtection(hazard.id)}
                                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                              />
                              <label 
                                htmlFor={`hazard-sidebar-${hazard.id}`}
                                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer hover:text-brand-primary transition-colors duration-200"
                              >
                                {hazard.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {/* Work Environment Filter */}
                  {workEnvironmentFilters.length > 0 && (
                    <AccordionItem value="workenvironment" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Work Environment</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          {workEnvironmentFilters.map((environment) => (
                            <div key={environment.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`environment-sidebar-${environment.id}`} 
                                checked={selectedWorkEnvironments.includes(environment.id)}
                                onCheckedChange={() => toggleWorkEnvironment(environment.id)}
                                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                              />
                              <label 
                                htmlFor={`environment-sidebar-${environment.id}`}
                                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer hover:text-brand-primary transition-colors duration-200"
                              >
                                {environment.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {/* Industries Filter */}
                  {uniqueIndustries.length > 0 && (
                    <AccordionItem value="industries" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Industries</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          {uniqueIndustries.map((industry) => (
                            <div key={industry} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`industry-sidebar-${industry}`} 
                                checked={selectedIndustries.includes(industry)}
                                onCheckedChange={() => toggleIndustry(industry)}
                                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                              />
                              <label 
                                htmlFor={`industry-sidebar-${industry}`}
                                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer hover:text-brand-primary transition-colors duration-200"
                              >
                                {industry}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
                
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300" 
                    onClick={clearFilters}
                  >
                    <X className="mr-1.5 h-4 w-4" />
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div>
          {/* Search and sorting */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr,auto]">
            <div className="relative">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Active Filters display */}
          {activeFiltersCount > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {selectedCategory && selectedCategory !== "all" && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {selectedCategory}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setSelectedCategory("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {selectedSubCategory && selectedSubCategory !== "none" && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {selectedSubCategory}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setSelectedSubCategory("none")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {selectedTempRating && selectedTempRating !== "none" && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {selectedTempRating}°C
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setSelectedTempRating("none")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {selectedHazardProtections.map(hazard => (
                <Badge 
                  key={hazard}
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {hazardProtectionFilters.find(h => h.id === hazard)?.name}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleHazardProtection(hazard)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {selectedWorkEnvironments.map(environment => (
                <Badge 
                  key={environment}
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {workEnvironmentFilters.find(e => e.id === environment)?.name}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleWorkEnvironment(environment)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {selectedIndustries.map(industry => (
                <Badge 
                  key={industry}
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {industry}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleIndustry(industry)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs px-2 h-6"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {isExpanded ? sortedProducts.length : Math.min(displayedProducts.length, initialProductsCount)} of {sortedProducts.length} products
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No products yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get started by creating your first product.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/admin/product/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Product
                </Link>
              </Button>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border rounded-lg">
              <SearchX className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="mb-2 text-xl font-semibold">No products found</h3>
              <p className="text-center text-muted-foreground max-w-md">
                We couldn't find any products matching your filter criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md p-2 sm:p-0">
                    <div className="relative aspect-[3/2] overflow-hidden bg-black rounded-md">
                      {product.image_url ? (
                      <img 
                          src={product.image_url} 
                          alt={product.name} 
                        className="h-full w-full object-contain p-1 sm:p-2"
                      />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-900">
                        <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute top-1 right-1 flex flex-col gap-1">
                        {product.is_featured && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs px-1">
                          <Star className="h-3 w-3 mr-1 fill-amber-500" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-2 sm:p-3 border-t">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
                        <h3 className="text-xs sm:text-sm font-medium line-clamp-1">{product.name}</h3>
                      <Badge variant="outline" className="capitalize text-[10px] sm:text-xs px-1.5 h-5 shrink-0 mt-1 sm:mt-0">
                        {product.category || 'Uncategorised'}
                      </Badge>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mb-2">
                        {product.short_description || product.description?.substring(0, 60) || "No description"}
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs mb-2">
                        {product.temperature_rating && (
                          <Badge variant="outline" className="gap-1 h-5 px-1.5 text-[10px] sm:text-xs">
                            <Thermometer className="h-3 w-3" />
                            {product.temperature_rating}°C
                          </Badge>
                        )}
                        {product.cut_resistance_level && (
                          <Badge variant="outline" className="gap-1 h-5 px-1.5 text-[10px] sm:text-xs">
                            <Scissors className="h-3 w-3" />
                            {product.cut_resistance_level}
                          </Badge>
                        )}
                        {product.heat_resistance_level && (
                          <Badge variant="outline" className="gap-1 h-5 px-1.5 text-[10px] sm:text-xs">
                            <Flame className="h-3 w-3" />
                            {product.heat_resistance_level}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-end justify-between gap-1 pt-2 border-t">
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center">
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
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1">Edit</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                              onClick={() => confirmDelete(product)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1">Delete</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center">
                            <Switch
                              checked={product.is_featured}
                              onCheckedChange={() => handleToggleFeatured(product.id)}
                              className="data-[state=checked]:bg-amber-500 h-5 w-9"
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1">Featured</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center">
                            <Switch
                              checked={!product.out_of_stock}
                              onCheckedChange={() => handleToggleStock(product.id)}
                              className="data-[state=checked]:bg-green-500 h-5 w-9"
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1">Stock</span>
                        </div>
                      </div>
                  </div>
                </Card>
              ))}
              </div>
              
              {hasMoreProducts && (
                <div className="flex justify-center pt-4" id="expand-toggle-button">
                  <Button 
                    variant={isExpanded ? "outline" : "default"}
                    size="lg"
                    className="gap-2"
                    onClick={toggleExpanded}
                  >
                    {isExpanded ? (
                      <>
                        Show Less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See More Products <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product
              &quot;{productToDelete?.name}&quot; and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 