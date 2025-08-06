"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { createIndustry, uploadIndustryImage, updateIndustry } from "@/lib/industries-service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Factory, ArrowLeft, Save, Trash, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MiniProductCard } from "@/components/app/mini-product-card";

interface Product {
  id: string;
  name: string;
  category?: string;
  image_url?: string | null;
  temperature_rating?: number | null;
  cut_resistance_level?: string | null;
}

export default function CreateIndustryPage() {
  const router = useRouter();
  const [industry, setIndustry] = useState({
    industry_name: "",
    description: "",
    image_url: "",
    feature_image_url: "",
    related_products: [] as string[], // Keep for backward compatibility during transition
    // Locale fields for basic info
    industry_name_locales: {} as Record<string, string>,
    description_locales: {} as Record<string, string>,
    // Showcase fields
    showcase_description: "",
    showcase_description_locales: {} as Record<string, string>,
    // New structured content fields
    summary_content_locales: {} as Record<string, string>,
    summary_content_image_url: "",
    sections_locales: {} as Record<string, any[]>,
    // New individual related product fields - expanded to 10
    related_product_id_1: null as string | null,
    related_product_id_2: null as string | null,
    related_product_id_3: null as string | null,
    related_product_id_4: null as string | null,
    related_product_id_5: null as string | null,
    related_product_id_6: null as string | null,
    related_product_id_7: null as string | null,
    related_product_id_8: null as string | null,
    related_product_id_9: null as string | null,
    related_product_id_10: null as string | null
  });
  const [isCreating, setIsCreating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);
  const [previewSummaryImage, setPreviewSummaryImage] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState({
    industry_name: false,
    description: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const summaryImageInputRef = useRef<HTMLInputElement>(null);

  // New state for structured content management
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'it'>('en');
  const [currentSummary, setCurrentSummary] = useState('');
  const [currentSections, setCurrentSections] = useState<any[]>([]);
  
  // State for basic info with language switching
  const [currentIndustryName, setCurrentIndustryName] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentShowcaseDescription, setCurrentShowcaseDescription] = useState('');
  
  // Helper functions for structured content
  const updateSummaryContent = (lang: 'en' | 'it', content: string) => {
    setIndustry(prev => ({
      ...prev,
      summary_content_locales: {
        ...prev.summary_content_locales,
        [lang]: content
      }
    }));
  };

  const updateSections = (lang: 'en' | 'it', sections: any[]) => {
    setIndustry(prev => ({
      ...prev,
      sections_locales: {
        ...prev.sections_locales,
        [lang]: sections
      }
    }));
  };

  const addSection = () => {
    const newSection = {
      title: '',
      description: '',
      key_hazards: [''],
      ppe_solutions: ['']
    };
    const updatedSections = [...currentSections, newSection];
    setCurrentSections(updatedSections);
    updateSections(currentLanguage, updatedSections);
  };

  const removeSection = (index: number) => {
    const updatedSections = currentSections.filter((_, i) => i !== index);
    setCurrentSections(updatedSections);
    updateSections(currentLanguage, updatedSections);
  };

  const updateSection = (index: number, field: string, value: any) => {
    const updatedSections = [...currentSections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setCurrentSections(updatedSections);
    updateSections(currentLanguage, updatedSections);
  };

  const addHazardOrSolution = (sectionIndex: number, field: 'key_hazards' | 'ppe_solutions') => {
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex][field] = [...updatedSections[sectionIndex][field], ''];
    setCurrentSections(updatedSections);
    updateSections(currentLanguage, updatedSections);
  };

  const removeHazardOrSolution = (sectionIndex: number, field: 'key_hazards' | 'ppe_solutions', itemIndex: number) => {
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex][field] = updatedSections[sectionIndex][field].filter((_: any, i: number) => i !== itemIndex);
    setCurrentSections(updatedSections);
    updateSections(currentLanguage, updatedSections);
  };

  const updateHazardOrSolution = (sectionIndex: number, field: 'key_hazards' | 'ppe_solutions', itemIndex: number, value: string) => {
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex][field][itemIndex] = value;
    setCurrentSections(updatedSections);
    updateSections(currentLanguage, updatedSections);
  };

  // Helper functions for basic info localized content
  const updateIndustryName = (lang: 'en' | 'it', name: string) => {
    setIndustry(prev => ({
      ...prev,
      industry_name_locales: {
        ...prev.industry_name_locales,
        [lang]: name
      }
    }));
  };

  const updateDescription = (lang: 'en' | 'it', description: string) => {
    setIndustry(prev => ({
      ...prev,
      description_locales: {
        ...prev.description_locales,
        [lang]: description
      }
    }));
  };

  // Helper functions for showcase description localized content
  const updateShowcaseDescription = (lang: 'en' | 'it', description: string) => {
    setIndustry(prev => ({
      ...prev,
      showcase_description_locales: {
        ...prev.showcase_description_locales,
        [lang]: description
      }
    }));
  };

  // Helper functions for individual related products
  const addRelatedProduct = (productId: string) => {
    if (industry.related_product_id_1 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_1: productId }));
    } else if (industry.related_product_id_2 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_2: productId }));
    } else if (industry.related_product_id_3 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_3: productId }));
    } else if (industry.related_product_id_4 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_4: productId }));
    } else if (industry.related_product_id_5 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_5: productId }));
    } else if (industry.related_product_id_6 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_6: productId }));
    } else if (industry.related_product_id_7 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_7: productId }));
    } else if (industry.related_product_id_8 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_8: productId }));
    } else if (industry.related_product_id_9 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_9: productId }));
    } else if (industry.related_product_id_10 === null) {
      setIndustry(prev => ({ ...prev, related_product_id_10: productId }));
    }
  };

  const removeRelatedProduct = (productId: string) => {
    if (industry.related_product_id_1 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_1: null }));
    } else if (industry.related_product_id_2 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_2: null }));
    } else if (industry.related_product_id_3 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_3: null }));
    } else if (industry.related_product_id_4 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_4: null }));
    } else if (industry.related_product_id_5 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_5: null }));
    } else if (industry.related_product_id_6 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_6: null }));
    } else if (industry.related_product_id_7 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_7: null }));
    } else if (industry.related_product_id_8 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_8: null }));
    } else if (industry.related_product_id_9 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_9: null }));
    } else if (industry.related_product_id_10 === productId) {
      setIndustry(prev => ({ ...prev, related_product_id_10: null }));
    }
  };

  const getRelatedProductIds = () => {
    return [
      industry.related_product_id_1,
      industry.related_product_id_2,
      industry.related_product_id_3,
      industry.related_product_id_4,
      industry.related_product_id_5,
      industry.related_product_id_6,
      industry.related_product_id_7,
      industry.related_product_id_8,
      industry.related_product_id_9,
      industry.related_product_id_10
    ].filter(Boolean) as string[];
  };

  const isRelatedProductSelected = (productId: string) => {
    return getRelatedProductIds().includes(productId);
  };

  const getAvailableRelatedProducts = () => {
    const selectedIds = getRelatedProductIds();
    return availableProducts.filter(product => !selectedIds.includes(product.id));
  };

  // Update current summary and sections when language changes
  useEffect(() => {
    setCurrentSummary(industry.summary_content_locales[currentLanguage] || '');
    setCurrentSections(industry.sections_locales[currentLanguage] || []);
    setCurrentIndustryName(industry.industry_name_locales[currentLanguage] || '');
    setCurrentDescription(industry.description_locales[currentLanguage] || '');
    setCurrentShowcaseDescription(industry.showcase_description_locales[currentLanguage] || '');
  }, [currentLanguage, industry.summary_content_locales, industry.sections_locales, industry.industry_name_locales, industry.description_locales, industry.showcase_description_locales]);

  // Fetch products for related products selection
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        const data = await response.json();
        console.log("Loaded products:", data.length);
        setAvailableProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "Warning",
          description: "Failed to load products for selection",
          variant: "destructive"
        });
      }
    }

    loadProducts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Cover image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSummaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Summary image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSummaryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIndustry((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSummaryContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentSummary(value);
    updateSummaryContent(currentLanguage, value);
  };

  const handleIndustryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentIndustryName(value);
    updateIndustryName(currentLanguage, value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentDescription(value);
    updateDescription(currentLanguage, value);
  };

  const handleShowcaseDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentShowcaseDescription(value);
    updateShowcaseDescription(currentLanguage, value);
  };

  const handleRelatedProductsChange = (selectedValues: string[]) => {
    setIndustry((prev) => ({
      ...prev,
      related_products: selectedValues
    }));
  };

  const validateForm = () => {
    const newErrors = {
      industry_name: !currentIndustryName.trim(),
      description: !currentDescription.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      // Create industry first to get an ID
      const newIndustry = await createIndustry({
        industry_name: currentIndustryName,
        description: currentDescription,
        content: null, // No longer used but required by interface
        image_url: null, // We'll update this after uploading the image
        feature_image_url: null, // Add the missing field
        showcase_description: currentShowcaseDescription, // Add showcase_description
        showcase_description_locales: industry.showcase_description_locales || null,
        related_products: getRelatedProductIds(),
        industry_name_locales: industry.industry_name_locales || null,
        description_locales: industry.description_locales || null,
        summary_content_locales: industry.summary_content_locales || null,
        summary_content_image_url: industry.summary_content_image_url || null,
        sections_locales: industry.sections_locales || null,
        related_product_id_1: industry.related_product_id_1 || null,
        related_product_id_2: industry.related_product_id_2 || null,
        related_product_id_3: industry.related_product_id_3 || null,
        related_product_id_4: industry.related_product_id_4 || null,
        related_product_id_5: industry.related_product_id_5 || null,
        related_product_id_6: industry.related_product_id_6 || null,
        related_product_id_7: industry.related_product_id_7 || null,
        related_product_id_8: industry.related_product_id_8 || null,
        related_product_id_9: industry.related_product_id_9 || null,
        related_product_id_10: industry.related_product_id_10 || null
      });
      
      // If there's an image to upload
      if (previewImage && fileInputRef.current?.files?.[0]) {
        const { url } = await uploadIndustryImage(newIndustry.id, fileInputRef.current.files[0]);
        if (url) {
          // Update the industry with the image URL
          await updateIndustry(newIndustry.id, { image_url: url });
        }
      }
      
      // If there's a cover image to upload
      if (previewCoverImage && coverImageInputRef.current?.files?.[0]) {
        const { url } = await uploadIndustryImage(newIndustry.id, coverImageInputRef.current.files[0]);
        if (url) {
          // Update the industry with the cover image URL
          await updateIndustry(newIndustry.id, { feature_image_url: url });
        }
      }

      // If there's a summary image to upload
      if (previewSummaryImage && summaryImageInputRef.current?.files?.[0]) {
        const { url } = await uploadIndustryImage(newIndustry.id, summaryImageInputRef.current.files[0]);
        if (url) {
          // Update the industry with the summary image URL
          await updateIndustry(newIndustry.id, { summary_content_image_url: url });
        }
      }
      
      toast({
        title: "Success",
        description: "Industry created successfully",
      });
      
      // Redirect to the industry management page
      router.push("/admin/industries");
    } catch (error) {
      console.error("Error creating industry:", error);
      toast({
        title: "Error",
        description: "Failed to create industry",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto order-2 sm:order-1">
          <Link href="/admin/industries" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Industries
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={isCreating}
          onClick={handleSubmit}
          className="flex items-center gap-1 w-full sm:w-auto order-1 sm:order-2"
        >
          {isCreating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              Creating...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Create Industry
            </>
          )}
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Showcase Details Card */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Showcase Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Content displayed on the front-end industry showcase and hero sections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm">Language:</Label>
                  <Select value={currentLanguage} onValueChange={(value: 'en' | 'it') => setCurrentLanguage(value)}>
                    <SelectTrigger className="w-32 text-xs sm:text-sm h-8 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="showcase_description" className="text-xs sm:text-sm">
                    Showcase Description
                  </Label>
                  <Textarea
                    id="showcase_description"
                    name="showcase_description"
                    value={currentShowcaseDescription}
                    onChange={handleShowcaseDescriptionChange}
                    placeholder="Enter a brief, compelling description for the industry showcase/hero section..."
                    className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                  />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    This description appears in hero sections and industry showcases. Keep it concise and engaging.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Industry Details Card */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Industry Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Basic information about the industry solution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm">Language:</Label>
                  <Select value={currentLanguage} onValueChange={(value: 'en' | 'it') => setCurrentLanguage(value)}>
                    <SelectTrigger className="w-32 text-xs sm:text-sm h-8 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry_name" className="flex items-center gap-1 text-xs sm:text-sm">
                    Industry Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="industry_name"
                    name="industry_name"
                    value={currentIndustryName}
                    onChange={handleIndustryNameChange}
                    placeholder="e.g., Manufacturing, Healthcare, Construction"
                    className={`text-xs sm:text-sm h-8 sm:h-10 ${errors.industry_name ? "border-red-500" : ""}`}
                  />
                  {errors.industry_name && (
                    <p className="text-red-500 text-xs sm:text-sm">Industry name is required</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-1 text-xs sm:text-sm">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Describe the industry and key challenges. Use a new line with '- ' to create bullet points for features."
                    className={`min-h-[100px] sm:min-h-[150px] text-xs sm:text-sm ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs sm:text-sm">Description is required</p>
                  )}
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Use the first paragraph for a brief overview. Add bullet points with '- ' prefix for features.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Structured Content */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Structured Content</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage summary and sections for the new industry page format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm">Language:</Label>
                  <Select value={currentLanguage} onValueChange={(value: 'en' | 'it') => setCurrentLanguage(value)}>
                    <SelectTrigger className="w-32 text-xs sm:text-sm h-8 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary Content */}
                <div className="space-y-2">
                  <Label htmlFor="summary_content" className="text-xs sm:text-sm">
                    Industry Overview Summary
                  </Label>
                  <Textarea
                    id="summary_content"
                    value={currentSummary}
                    onChange={handleSummaryContentChange}
                    placeholder="Enter a comprehensive summary of the industry and its challenges..."
                    className="min-h-[120px] text-xs sm:text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will appear as the "{currentIndustryName || 'Industry'} Industry Overview" section.
                  </p>
                </div>

                {/* Summary Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="summary_image" className="text-xs sm:text-sm">
                    Industry Overview Image
                  </Label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
                    {previewSummaryImage ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <Image
                          src={previewSummaryImage}
                          alt="Summary image preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPreviewSummaryImage(null);
                            if (summaryImageInputRef.current) {
                              summaryImageInputRef.current.value = "";
                            }
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="py-2 sm:py-4">
                        <Factory className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                        <p className="mt-2 text-xs sm:text-sm text-gray-500">
                          Recommended size: 1200 x 630 pixels
                        </p>
                      </div>
                    )}
                    
                    <input
                      ref={summaryImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleSummaryImageChange}
                      className="hidden"
                      id="summary-image"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => summaryImageInputRef.current?.click()}
                      className="mt-2 sm:mt-4 w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {previewSummaryImage ? "Change Image" : "Upload Image"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP.
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs sm:text-sm">Industry Sections</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addSection}
                      className="text-xs"
                    >
                      Add Section
                    </Button>
                  </div>

                  {currentSections.map((section, sectionIndex) => (
                    <Card key={sectionIndex} className="p-4 border-dashed">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <Label className="text-xs sm:text-sm font-medium">Section {sectionIndex + 1}</Label>
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeSection(sectionIndex)}
                            className="text-xs"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label className="text-xs">Section Title</Label>
                            <Input
                              value={section.title}
                              onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                              placeholder="e.g., Raw Material Handling & Batching"
                              className="text-xs h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Section Description</Label>
                            <Textarea
                              value={section.description}
                              onChange={(e) => updateSection(sectionIndex, 'description', e.target.value)}
                              placeholder="Describe this section..."
                              className="min-h-[60px] text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Key Hazards */}
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label className="text-xs">Key Hazards</Label>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addHazardOrSolution(sectionIndex, 'key_hazards')}
                                  className="text-xs h-6"
                                >
                                  Add Hazard
                                </Button>
                              </div>
                              {section.key_hazards.map((hazard: string, hazardIndex: number) => (
                                <div key={hazardIndex} className="flex gap-2 mb-2">
                                  <Input
                                    value={hazard}
                                    onChange={(e) => updateHazardOrSolution(sectionIndex, 'key_hazards', hazardIndex, e.target.value)}
                                    placeholder="Describe a hazard..."
                                    className="text-xs h-7"
                                  />
                                  <Button 
                                    type="button" 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => removeHazardOrSolution(sectionIndex, 'key_hazards', hazardIndex)}
                                    className="text-xs h-7 w-7 p-0"
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>

                            {/* PPE Solutions */}
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label className="text-xs">PPE Solutions</Label>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addHazardOrSolution(sectionIndex, 'ppe_solutions')}
                                  className="text-xs h-6"
                                >
                                  Add Solution
                                </Button>
                              </div>
                              {section.ppe_solutions.map((solution: string, solutionIndex: number) => (
                                <div key={solutionIndex} className="flex gap-2 mb-2">
                                  <Input
                                    value={solution}
                                    onChange={(e) => updateHazardOrSolution(sectionIndex, 'ppe_solutions', solutionIndex, e.target.value)}
                                    placeholder="Describe a PPE solution..."
                                    className="text-xs h-7"
                                  />
                                  <Button 
                                    type="button" 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => removeHazardOrSolution(sectionIndex, 'ppe_solutions', solutionIndex)}
                                    className="text-xs h-7 w-7 p-0"
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {currentSections.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-xs sm:text-sm">No sections added yet. Click "Add Section" to create your first section.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Header Image</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Upload a representative image for the header of the industry page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
                  {previewImage ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                      <Image
                        src={previewImage}
                        alt="Industry preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPreviewImage(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="py-2 sm:py-4">
                      <Factory className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                      <p className="mt-2 text-xs sm:text-sm text-gray-500">
                        Recommended size: 1200 x 630 pixels
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="industry-image"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 sm:mt-4 w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {previewImage ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP.
                </p>
              </CardContent>
            </Card>
            
            {/* Cover Image */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Cover Image</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Upload a cover image for the industry showcase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
                  {previewCoverImage ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                      <Image
                        src={previewCoverImage}
                        alt="Industry cover preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPreviewCoverImage(null);
                          if (coverImageInputRef.current) {
                            coverImageInputRef.current.value = "";
                          }
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="py-2 sm:py-4">
                      <Factory className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                      <p className="mt-2 text-xs sm:text-sm text-gray-500">
                        Recommended size: 1200 x 630 pixels
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={coverImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="cover-image"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => coverImageInputRef.current?.click()}
                    className="mt-2 sm:mt-4 w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {previewCoverImage ? "Change Cover Image" : "Upload Cover Image"}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP.
                </p>
              </CardContent>
            </Card>
            
            {/* Related Products */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Related Products</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Select up to 10 products that are relevant to this industry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableProducts.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm mb-2">
                      Currently this industry has {getRelatedProductIds().length} related products (max 10)
                    </p>
                    <div className="grid gap-2">
                      {getRelatedProductIds().map(productId => {
                        const product = availableProducts.find(p => p.id === productId);
                        return product ? (
                          <MiniProductCard 
                            key={productId}
                            product={product}
                            onRemove={(id) => removeRelatedProduct(id)}
                          />
                        ) : null;
                      })}
                      {getRelatedProductIds().length === 0 && (
                        <p className="text-xs sm:text-sm text-muted-foreground">No related products selected.</p>
                      )}
                    </div>
                    {getRelatedProductIds().length < 10 && getAvailableRelatedProducts().length > 0 && (
                      <div className="mt-2 sm:mt-4">
                        <Label htmlFor="product-select" className="text-xs sm:text-sm">Add a product:</Label>
                        <Select
                          onValueChange={(value) => {
                            if (value) {
                              addRelatedProduct(value);
                            }
                          }}
                        >
                          <SelectTrigger id="product-select" className="text-xs sm:text-sm h-8 sm:h-10">
                            <SelectValue placeholder="Select a product to add..." />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableRelatedProducts().map((product) => (
                              <SelectItem key={product.id} value={product.id} className="text-xs sm:text-sm">
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {getRelatedProductIds().length >= 10 && (
                      <p className="text-xs text-muted-foreground">Maximum of 10 related products reached.</p>
                    )}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-xs sm:text-sm">No products available</AlertTitle>
                    <AlertDescription className="text-xs sm:text-sm">
                      Add products in the product management section first.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 