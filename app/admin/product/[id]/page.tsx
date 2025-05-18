"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { getProductById, updateProduct, deleteProduct, uploadProductImage, Product } from "@/lib/products-service";
import { ArrowLeft, Save, Trash, Upload, Info, X, Image as ImageIcon, Plus, Thermometer, Scissors, Factory, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { MiniProductCard } from "@/components/app/mini-product-card";

interface ProductEditPageProps {
  params: {
    id: string;
  };
}

interface ImageUploadState {
  file: File | null;
  previewUrl: string | null;
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const router = useRouter();
  const { id } = params;
  
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [temperatureRating, setTemperatureRating] = useState<number | null>(null);
  const [cutResistanceLevel, setCutResistanceLevel] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Image state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image2Url, setImage2Url] = useState<string | null>(null);
  const [image3Url, setImage3Url] = useState<string | null>(null);
  const [image4Url, setImage4Url] = useState<string | null>(null);
  const [image5Url, setImage5Url] = useState<string | null>(null);
  const [technicalSheetUrl, setTechnicalSheetUrl] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<ImageUploadState>({ file: null, previewUrl: null });
  const [additionalImage, setAdditionalImage] = useState<ImageUploadState>({ file: null, previewUrl: null });
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();
  
  // Related product state
  const [relatedProductId1, setRelatedProductId1] = useState<string | null>(null);
  const [relatedProductId2, setRelatedProductId2] = useState<string | null>(null);
  const [relatedProductId3, setRelatedProductId3] = useState<string | null>(null);
  const [relatedProductId4, setRelatedProductId4] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  
  // Handle cover image change
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setCoverImage({
      file,
      previewUrl: URL.createObjectURL(file)
    });
  };
  
  // Handle additional image change
  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type and size
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setAdditionalImage({
      file,
      previewUrl: URL.createObjectURL(file)
    });
  };
  
  // Remove selected cover image
  const removeCoverImage = () => {
    if (coverImage.previewUrl) {
      URL.revokeObjectURL(coverImage.previewUrl);
    }
    setCoverImage({ file: null, previewUrl: null });
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };
  
  // Remove selected additional image
  const removeAdditionalImage = () => {
    if (additionalImage.previewUrl) {
      URL.revokeObjectURL(additionalImage.previewUrl);
    }
    setAdditionalImage({ file: null, previewUrl: null });
    if (additionalInputRef.current) {
      additionalInputRef.current.value = '';
    }
  };
  
  // Remove uploaded product image
  const removeProductImage = async (imgUrl: string) => {
    try {
      // Note: This doesn't actually delete from storage yet, just removes reference
      const updates: Record<string, any> = {};
      
      if (imgUrl === imageUrl) {
        updates.image_url = null;
        setImageUrl(null);
      } else if (imgUrl === image2Url) {
        updates.image2_url = null;
        setImage2Url(null);
      } else if (imgUrl === image3Url) {
        updates.image3_url = null;
        setImage3Url(null);
      } else if (imgUrl === image4Url) {
        updates.image4_url = null;
        setImage4Url(null);
      } else if (imgUrl === image5Url) {
        updates.image5_url = null;
        setImage5Url(null);
      }
      
      if (Object.keys(updates).length > 0) {
        await updateProduct(params.id, updates);
      
        toast({
          title: "Success",
          description: "Image removed successfully"
        });
      }
    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Remove existing cover image
  const removeCoverImageUrl = () => {
    setImageUrl(null);
  };
  
  // Add feature
  const addFeature = () => {
    if (!newFeature) return;
    setFeatures([...features, newFeature]);
    setNewFeature("");
  };
  
  // Remove feature
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  
  // Add application
  const addApplication = () => {
    if (!newApplication) return;
    setApplications([...applications, newApplication]);
    setNewApplication("");
  };
  
  // Remove application
  const removeApplication = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index));
  };
  
  // Add industry
  const addIndustry = () => {
    if (!newIndustry) return;
    setIndustries([...industries, newIndustry]);
    setNewIndustry("");
  };
  
  // Remove industry
  const removeIndustry = (index: number) => {
    setIndustries(industries.filter((_, i) => i !== index));
  };
  
  // Upload image to Supabase storage
  const uploadImage = async (file: File, isCover: boolean = true): Promise<string | null> => {
    if (!file) return null;
    
    try {
      setIsSaving(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}_${isCover ? 'cover' : Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase
        .storage
        .from('products')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        throw error;
      }
      
      // Get public URL
      const { data: urlData } = supabase
        .storage
        .from('products')
        .getPublicUrl(fileName);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Error",
        description: "Failed to upload product image",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };
  
  // Upload additional image and add it to images array
  const uploadAdditionalImage = async () => {
    if (!additionalImage.file) return;
    
    try {
      setIsSaving(true);
      const newImageUrl = await uploadImage(additionalImage.file, false);
      
      if (newImageUrl) {
        // Add new image URL to the images array
        if (!image2Url) {
          await updateProduct(id, { image2_url: newImageUrl });
          setImage2Url(newImageUrl);
        } else if (!image3Url) {
          await updateProduct(id, { image3_url: newImageUrl });
          setImage3Url(newImageUrl);
        } else if (!image4Url) {
          await updateProduct(id, { image4_url: newImageUrl });
          setImage4Url(newImageUrl);
        } else if (!image5Url) {
          await updateProduct(id, { image5_url: newImageUrl });
          setImage5Url(newImageUrl);
        } else {
          // If all image slots are full
          toast({
            title: "Info",
            description: "All image slots are full. Please remove an image first."
          });
        }
        
        // Reset form fields
        removeAdditionalImage();
        
        toast({
          title: "Success",
          description: "Product image added successfully!"
        });
      }
    } catch (error) {
      console.error("Error adding product image:", error);
      toast({
        title: "Error",
        description: "Failed to add product image.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const { product } = await getProductById(id);
        if (product) {
          setName(product.name);
          setDescription(product.description);
          setShortDescription(product.short_description || "");
          setCategory(product.category || "");
          setSubCategory(product.sub_category || "");
          setTemperatureRating(product.temperature_rating ?? null);
          setCutResistanceLevel(product.cut_resistance_level || "");
          setIsFeatured(product.is_featured);
          setIsOutOfStock(product.out_of_stock || false);
          setFeatures(product.features || []);
          setApplications(product.applications || []);
          setIndustries(product.industries || []);
          
          // Set image URLs if they exist
          if (product.image_url) {
            setImageUrl(product.image_url);
          }
          
          if (product.image2_url) {
            setImage2Url(product.image2_url);
          }
          
          if (product.image3_url) {
            setImage3Url(product.image3_url);
          }
          
          if (product.image4_url) {
            setImage4Url(product.image4_url);
          }
          
          if (product.image5_url) {
            setImage5Url(product.image5_url);
          }
          
          if (product.technical_sheet_url) {
            setTechnicalSheetUrl(product.technical_sheet_url);
          }
          
          // Set related product IDs
          setRelatedProductId1(product.related_product_id_1 || null);
          setRelatedProductId2(product.related_product_id_2 || null);
          setRelatedProductId3(product.related_product_id_3 || null);
          setRelatedProductId4(product.related_product_id_4 || null);
        } else {
          toast({
            title: "Error",
            description: "Product not found",
            variant: "destructive"
          });
          router.push("/admin/product");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        toast({
          title: "Error",
          description: "Failed to load product. Please try again.",
          variant: "destructive"
        });
        router.push("/admin/product");
      } finally {
        setIsLoading(false);
      }
    }
    
    // Fetch available products for selection
    async function loadAvailableProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        const data = await response.json();
        // Filter out the current product
        setAvailableProducts(data.filter((p: any) => p.id !== id));
      } catch (error) {
        console.error("Error loading available products:", error);
        toast({
          title: "Warning",
          description: "Failed to load products for selection",
          variant: "destructive"
        });
      }
    }
    
    loadProduct();
    loadAvailableProducts();
  }, [id, router]);
  
  // Remove a related product
  const removeRelatedProduct = async (productId: string) => {
    try {
      setIsSaving(true);
      let updates: any = {};
      
      // First update the local state
      if (relatedProductId1 === productId) {
        setRelatedProductId1(null);
        updates.related_product_id_1 = null;
      } else if (relatedProductId2 === productId) {
        setRelatedProductId2(null);
        updates.related_product_id_2 = null;
      } else if (relatedProductId3 === productId) {
        setRelatedProductId3(null);
        updates.related_product_id_3 = null;
      } else if (relatedProductId4 === productId) {
        setRelatedProductId4(null);
        updates.related_product_id_4 = null;
      }
      
      // Only update if we found a related product to remove
      if (Object.keys(updates).length > 0) {
        // Update the database immediately
        const { product } = await updateProduct(id, updates);
        
        if (!product) {
          throw new Error("Failed to update related products");
        }
        
        toast({
          title: "Success",
          description: "Related product removed successfully"
        });
      }
    } catch (error) {
      console.error("Error removing related product:", error);
      toast({
        title: "Error",
        description: "Failed to remove related product. Please try again.",
        variant: "destructive"
      });
      
      // Reload the product data to reset any inconsistency
      const { product } = await getProductById(id);
      if (product) {
        setRelatedProductId1(product.related_product_id_1 || null);
        setRelatedProductId2(product.related_product_id_2 || null);
        setRelatedProductId3(product.related_product_id_3 || null);
        setRelatedProductId4(product.related_product_id_4 || null);
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  // Add a related product to the first available slot
  const addRelatedProduct = async (productId: string) => {
    try {
      setIsSaving(true);
      let updates: any = {};
      
      // First find which slot to use and update local state
      if (!relatedProductId1) {
        setRelatedProductId1(productId);
        updates.related_product_id_1 = productId;
      } else if (!relatedProductId2) {
        setRelatedProductId2(productId);
        updates.related_product_id_2 = productId;
      } else if (!relatedProductId3) {
        setRelatedProductId3(productId);
        updates.related_product_id_3 = productId;
      } else if (!relatedProductId4) {
        setRelatedProductId4(productId);
        updates.related_product_id_4 = productId;
      } else {
        toast({
          title: "Error",
          description: "You can only add up to 4 related products",
          variant: "destructive"
        });
        return;
      }
      
      // Only update if we found an available slot
      if (Object.keys(updates).length > 0) {
        // Update the database immediately
        const { product } = await updateProduct(id, updates);
        
        if (!product) {
          throw new Error("Failed to update related products");
        }
        
        toast({
          title: "Success",
          description: "Related product added successfully"
        });
      }
    } catch (error) {
      console.error("Error adding related product:", error);
      toast({
        title: "Error",
        description: "Failed to add related product. Please try again.",
        variant: "destructive"
      });
      
      // Reload the product data to reset any inconsistency
      const { product } = await getProductById(id);
      if (product) {
        setRelatedProductId1(product.related_product_id_1 || null);
        setRelatedProductId2(product.related_product_id_2 || null);
        setRelatedProductId3(product.related_product_id_3 || null);
        setRelatedProductId4(product.related_product_id_4 || null);
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  // Get all related product IDs as an array
  const getRelatedProductIds = () => {
    return [relatedProductId1, relatedProductId2, relatedProductId3, relatedProductId4]
      .filter(Boolean) as string[];
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Upload cover image if a new one is selected
      let newImageUrl = imageUrl;
      if (coverImage.file) {
        newImageUrl = await uploadImage(coverImage.file, true);
      }
      
      const productData = {
        name,
        description,
        short_description: shortDescription,
        category,
        sub_category: subCategory,
        temperature_rating: temperatureRating,
        cut_resistance_level: cutResistanceLevel,
        is_featured: isFeatured,
        out_of_stock: isOutOfStock,
        features,
        applications,
        industries,
        image_url: newImageUrl,
        image2_url: image2Url,
        image3_url: image3Url,
        image4_url: image4Url,
        image5_url: image5Url,
        technical_sheet_url: technicalSheetUrl,
        related_product_id_1: relatedProductId1,
        related_product_id_2: relatedProductId2,
        related_product_id_3: relatedProductId3,
        related_product_id_4: relatedProductId4,
        updated_at: new Date().toISOString()
      };
      
      // Use the updateProduct function
      const { product } = await updateProduct(id, productData);
      
      if (!product) {
        throw new Error("Failed to update product");
      }
      
      toast({
        title: "Success",
        description: "Product updated successfully!"
      });
      
      // Update image URLs if new ones were uploaded
      if (newImageUrl && newImageUrl !== imageUrl) {
        setImageUrl(newImageUrl);
        setImage2Url(image2Url);
        setImage3Url(image3Url);
        setImage4Url(image4Url);
        setImage5Url(image5Url);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      // Use the deleteProduct function
      const { success } = await deleteProduct(id);
      
      if (!success) {
        throw new Error("Failed to delete product");
      }
      
      toast({
        title: "Success",
        description: "Product deleted successfully."
      });
      
      router.push("/admin/product");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };
  
  const categories = [
    { value: "Heat Resistant Gloves", label: "Heat Resistant Gloves" },
    { value: "Cut Resistant Gloves", label: "Cut Resistant Gloves" },
    { value: "Welding Gloves", label: "Welding Gloves" },
    { value: "Chemical Resistant Gloves", label: "Chemical Resistant Gloves" },
    { value: "General Purpose Gloves", label: "General Purpose Gloves" },
    { value: "Industrial Swabs", label: "Industrial Swabs" },
    { value: "Respiratory Protection", label: "Respiratory Protection" }
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" asChild className="mr-2">
          <Link href="/admin/product">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
        <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
      
      <Tabs defaultValue="details">
        <TabsList className="flex overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide px-1 sm:px-0">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="features">Features & Applications</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="related">Related Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-6">
              {/* Main content area - 4 columns */}
              <div className="md:col-span-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Product Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Edit your product details here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="name" className="text-xs sm:text-sm">Product Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter product name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="shortDescription" className="text-xs sm:text-sm">Short Description</Label>
                        <Input
                          id="shortDescription"
                          placeholder="Brief product description"
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="description" className="text-xs sm:text-sm">Full Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter a detailed description of your product"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          required
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="temperature" className="text-xs sm:text-sm">Temperature Rating (°C)</Label>
                          <Input
                            id="temperature"
                            type="number"
                            placeholder="e.g. 500"
                            value={temperatureRating === null ? "" : temperatureRating}
                            onChange={(e) => setTemperatureRating(e.target.value === "" ? null : Number(e.target.value))}
                            className="text-xs sm:text-sm h-8 sm:h-10"
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="cutResistance" className="text-xs sm:text-sm">Cut Resistance Level</Label>
                          <Input
                            id="cutResistance"
                            placeholder="e.g. Level 5"
                            value={cutResistanceLevel}
                            onChange={(e) => setCutResistanceLevel(e.target.value)}
                            className="text-xs sm:text-sm h-8 sm:h-10"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar - 2 columns */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Settings</CardTitle>
                    <CardDescription>Configure how your product appears.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subCategory">Sub-Category</Label>
                        <Input
                          id="subCategory"
                          placeholder="Optional sub-category"
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="featured">Featured Product</Label>
                          <p className="text-xs text-muted-foreground">
                            Show this product in featured sections.
                          </p>
                        </div>
                        <Switch
                          id="featured"
                          checked={isFeatured}
                          onCheckedChange={setIsFeatured}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="outOfStock">Out of Stock</Label>
                          <p className="text-xs text-muted-foreground">
                            Mark this product as out of stock.
                          </p>
                        </div>
                        <Switch
                          id="outOfStock"
                          checked={isOutOfStock}
                          onCheckedChange={setIsOutOfStock}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cover">Product Image</Label>
                        <input
                          ref={coverInputRef}
                          type="file"
                          id="cover"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverImageChange}
                        />
                        
                        {coverImage.previewUrl ? (
                          <div className="relative rounded-md overflow-hidden border">
                            <img 
                              src={coverImage.previewUrl} 
                              alt="Cover preview" 
                              className="w-full h-48 object-contain"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={removeCoverImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : imageUrl ? (
                          <div className="relative rounded-md overflow-hidden border">
                            <img 
                              src={imageUrl} 
                              alt="Product image" 
                              className="w-full h-48 object-contain"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={removeCoverImageUrl}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div 
                            className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => coverInputRef.current?.click()}
                          >
                            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload a product image
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/admin/product">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="features" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>Add key features of this product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {features.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No features added yet. Add some to highlight your product's capabilities.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                          <span className="text-sm">{feature}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Add recommended applications for this product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add an application"
                      value={newApplication}
                      onChange={(e) => setNewApplication(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addApplication()}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={addApplication}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {applications.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No applications added yet. Add some to guide customers on proper product usage.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {applications.map((application, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                          <span className="text-sm">{application}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => removeApplication(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Industries</CardTitle>
                <CardDescription>Add industries where this product is applicable.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add an industry"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addIndustry()}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={addIndustry}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {industries.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No industries added yet. Add some to help customers identify relevant products.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2 py-2">
                      {industries.map((industry, index) => (
                        <div key={index} className="flex items-center border rounded-full px-3 py-1">
                          <Factory className="h-3 w-3 mr-1" />
                          <span className="text-sm">{industry}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removeIndustry(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleSubmit} 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save All Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Add and manage product images. You can upload up to 5 product images.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  
                  {/* Product Images Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    {[
                      { index: 1, url: imageUrl, label: "Main Image" },
                      { index: 2, url: image2Url, label: "Image 2" },
                      { index: 3, url: image3Url, label: "Image 3" },
                      { index: 4, url: image4Url, label: "Image 4" },
                      { index: 5, url: image5Url, label: "Image 5" }
                    ].map((image) => (
                      <div 
                        key={image.index} 
                        className={`relative border rounded-md overflow-hidden ${!image.url ? 'border-dashed p-4 h-32 flex items-center justify-center' : 'h-32'}`}
                      >
                        {image.url ? (
                          <>
                            <img
                              src={image.url}
                              alt={`Product image ${image.index}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1"
                              onClick={() => removeProductImage(image.url!)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">{image.label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <Label>Upload New Image</Label>
                    <input
                      ref={additionalInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAdditionalImageChange}
                    />
                    
                    {additionalImage.previewUrl ? (
                      <div className="relative rounded-md overflow-hidden border mt-2">
                        <img 
                          src={additionalImage.previewUrl} 
                          alt="New image preview" 
                          className="w-full h-52 object-contain"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={removeAdditionalImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors mt-2"
                        onClick={() => additionalInputRef.current?.click()}
                      >
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Click to upload a product image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    
                    {additionalImage.previewUrl && (
                      <Button 
                        className="w-full mt-2"
                        onClick={uploadAdditionalImage}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-brand-primary"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Image
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 rounded-md bg-blue-50 p-3 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100">
                <Info className="h-4 w-4" />
                <p className="text-xs">
                  You can upload up to 5 product images. The first image will be used as the main product image.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <Label htmlFor="technical_sheet">Technical Sheet URL</Label>
                <Input
                  id="technical_sheet"
                  placeholder="URL to PDF technical sheet"
                  value={technicalSheetUrl || ""}
                  onChange={(e) => setTechnicalSheetUrl(e.target.value || null)}
                />
                <p className="text-xs text-muted-foreground">
                  Provide a link to a downloadable PDF with detailed technical specifications
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSubmit} 
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save All Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Products</CardTitle>
              <CardDescription>
                Link this product to other related products. You can add up to 4 related products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Currently Selected Related Products</Label>
                  <div className="grid gap-2">
                    {getRelatedProductIds().length > 0 ? (
                      getRelatedProductIds().map(productId => {
                        const product = availableProducts.find(p => p.id === productId);
                        return product ? (
                          <MiniProductCard 
                            key={productId}
                            product={product}
                            onRemove={removeRelatedProduct}
                          />
                        ) : null;
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No related products selected. Add some below.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-select">Add a related product:</Label>
                  <Select
                    onValueChange={async (value) => {
                      if (value) {
                        await addRelatedProduct(value);
                      }
                    }}
                  >
                    <SelectTrigger id="product-select">
                      <SelectValue placeholder="Select a product to add..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts
                        .filter(product => !getRelatedProductIds().includes(product.id))
                        .map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSubmit} 
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product
              &quot;{name}&quot; and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 