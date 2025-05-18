"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getAllIndustries, deleteIndustry } from "@/lib/industries-service";
import { Factory, Plus, Edit, Trash, Star, Eye, Calendar, Image as ImageIcon, Tag, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";

// Industry type definition
interface Industry {
  id: string;
  industry_name: string;
  description: string;
  content: string | null;
  image_url: string | null;
  related_products: string[] | null;
  created_at: string;
  updated_at: string;
  slug?: string;
}

export default function IndustryManagementPage() {
  const { language } = useLanguage();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [industryToDelete, setIndustryToDelete] = useState<Industry | null>(null);
  
  // Load industries on mount
  useEffect(() => {
    async function loadIndustries() {
      try {
        // Fetch all industries
        const { data } = await getAllIndustries(language);
        if (data) {
          setIndustries(data as Industry[]);
        }
      } catch (error) {
        console.error("Error loading industries:", error);
        toast({
          title: "Error",
          description: "Failed to load industries. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadIndustries();
  }, [language]);
  
  // Filter industries based on search term
  const filteredIndustries = industries.filter(industry => 
    industry.industry_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle confirming delete
  const confirmDelete = (industry: Industry) => {
    setIndustryToDelete(industry);
    setDeleteDialogOpen(true);
  };
  
  // Handle deleting an industry
  const handleDeleteIndustry = async () => {
    if (!industryToDelete) return;
    
    try {
      await deleteIndustry(industryToDelete.id);
      
      // Remove the deleted industry from the state
      setIndustries(industries.filter(industry => industry.id !== industryToDelete.id));
      
      toast({
        title: "Success",
        description: "Industry deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting industry:", error);
      toast({
        title: "Error",
        description: "Failed to delete industry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setIndustryToDelete(null);
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Extract the first paragraph from the description
  const getShortDescription = (description: string) => {
    const firstParagraph = description.split('\n\n')[0];
    return firstParagraph && firstParagraph.length > 150
      ? firstParagraph.substring(0, 150) + '...'
      : firstParagraph;
  };
  
  return (
    <div className="space-y-6">
      {/* Header with search and create button */}
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:gap-4 sm:mb-0 flex-col sm:flex-row">
        <div className="flex-1 min-w-[240px] w-full sm:w-auto mb-2 sm:mb-0">
          <Input
            placeholder="Search industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full sm:max-w-sm text-xs sm:text-sm h-8 sm:h-10"
          />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/industries/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Industry
          </Link>
        </Button>
      </div>
      
      {/* Industry cards */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Solutions</CardTitle>
          <CardDescription>Manage your industry solutions showcased on the website.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : industries.length === 0 ? (
            <div className="text-center py-10">
              <Factory className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No industries yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get started by creating your first industry solution.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/admin/industries/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Industry
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredIndustries.map((industry) => (
                <Card key={industry.id} className="overflow-hidden transition-all hover:shadow-md p-2 sm:p-0">
                  {/* Image Section */}
                  <div className="relative h-[120px] sm:h-[180px] w-full overflow-hidden bg-muted rounded-md">
                    {industry.image_url ? (
                      <Image
                        src={industry.image_url}
                        alt={industry.industry_name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Factory className="h-10 w-10 sm:h-16 sm:w-16 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 sm:p-4 border-b">
                    <div className="mb-1 sm:mb-2">
                      <h3 className="font-medium text-xs sm:text-base line-clamp-1">{industry.industry_name}</h3>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                      {getShortDescription(industry.description)}
                    </p>
                    
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground gap-2">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Updated: {formatDate(industry.updated_at)}</span>
                    </div>
                    
                    {industry.related_products && industry.related_products.length > 0 && (
                      <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground gap-2 mt-1">
                        <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span>{industry.related_products.length} related products</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center px-2 sm:px-4 py-2 sm:py-3 bg-muted/20">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0"
                        asChild
                      >
                        <Link href={`/admin/industries/${industry.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        onClick={() => confirmDelete(industry)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 p-0"
                        asChild
                      >
                        <Link href={`/industries/${industry.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this industry?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the industry
              &quot;{industryToDelete?.industry_name}&quot; and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteIndustry}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 