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
    content: "",
    image_url: "",
    related_products: [] as string[]
  });
  const [isCreating, setIsCreating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState({
    industry_name: false,
    description: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleRelatedProductsChange = (selectedValues: string[]) => {
    setIndustry((prev) => ({
      ...prev,
      related_products: selectedValues
    }));
  };

  const validateForm = () => {
    const newErrors = {
      industry_name: !industry.industry_name.trim(),
      description: !industry.description.trim()
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
        industry_name: industry.industry_name,
        description: industry.description,
        content: industry.content || null,
        image_url: null, // We'll update this after uploading the image
        related_products: industry.related_products.length > 0 ? industry.related_products : null
      });
      
      // If there's an image to upload
      if (previewImage && fileInputRef.current?.files?.[0]) {
        const { url } = await uploadIndustryImage(newIndustry.id, fileInputRef.current.files[0]);
        if (url) {
          // Update the industry with the image URL
          await updateIndustry(newIndustry.id, { image_url: url });
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
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Industry Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Basic information about the industry solution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry_name" className="flex items-center gap-1 text-xs sm:text-sm">
                    Industry Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="industry_name"
                    name="industry_name"
                    value={industry.industry_name}
                    onChange={handleInputChange}
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
                    value={industry.description}
                    onChange={handleInputChange}
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
                
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-xs sm:text-sm">
                    Detailed Content <span className="text-muted-foreground text-xs sm:text-sm">(Optional)</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={industry.content}
                    onChange={handleInputChange}
                    placeholder="Add detailed markdown content for the industry page. This can include headers, lists, and paragraphs."
                    className="min-h-[200px] sm:min-h-[300px] text-xs sm:text-sm"
                  />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Markdown formatting is supported. Use # for headings, - for lists, etc.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Industry Image</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Upload a representative image for this industry
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
            
            {/* Related Products */}
            <Card className="p-2 sm:p-0">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Related Products</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Select products that are relevant to this industry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableProducts.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      {industry.related_products && industry.related_products.length > 0 ? (
                        industry.related_products.map(productId => {
                          const product = availableProducts.find(p => p.id === productId);
                          return product ? (
                            <MiniProductCard 
                              key={productId}
                              product={product}
                              onRemove={(id) => {
                                setIndustry(prev => ({
                                  ...prev,
                                  related_products: prev.related_products.filter(pId => pId !== id)
                                }));
                              }}
                            />
                          ) : null;
                        })
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground">No related products selected.</p>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-4">
                      <Label htmlFor="product-select" className="text-xs sm:text-sm">Add a product:</Label>
                      <Select
                        onValueChange={(value) => {
                          if (value) {
                            setIndustry(prev => ({
                              ...prev,
                              related_products: [...prev.related_products, value]
                            }));
                          }
                        }}
                      >
                        <SelectTrigger id="product-select" className="text-xs sm:text-sm h-8 sm:h-10">
                          <SelectValue placeholder="Select a product to add..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProducts
                            .filter(product => !industry.related_products.includes(product.id))
                            .map((product) => (
                              <SelectItem key={product.id} value={product.id} className="text-xs sm:text-sm">
                                {product.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
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