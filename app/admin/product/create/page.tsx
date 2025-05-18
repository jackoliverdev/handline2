"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, Info, Plus, Tag, Thermometer, Scissors, Factory, X } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { createProduct, uploadProductImage, Product } from "@/lib/products-service";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { MiniProductCard } from "@/components/app/mini-product-card";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("heat-resistant-gloves");
  const [subCategory, setSubCategory] = useState("");
  const [temperatureRating, setTemperatureRating] = useState<number | null>(null);
  const [cutResistanceLevel, setCutResistanceLevel] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Image state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image2Url, setImage2Url] = useState<string | null>(null);
  const [image3Url, setImage3Url] = useState<string | null>(null);
  const [image4Url, setImage4Url] = useState<string | null>(null);
  const [image5Url, setImage5Url] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();
  
  // Related products state
  const [relatedProductId1, setRelatedProductId1] = useState<string | null>(null);
  const [relatedProductId2, setRelatedProductId2] = useState<string | null>(null);
  const [relatedProductId3, setRelatedProductId3] = useState<string | null>(null);
  const [relatedProductId4, setRelatedProductId4] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  
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
  
  // Handle file selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    try {
      setIsUploading(true);
      // Generate a temporary ID since we don't have a product ID yet
      const tempId = `temp-${Date.now()}`;
      
      // Upload the image
      const { url } = await uploadProductImage(tempId, file);
      
      if (url) {
        // Set the URL to the first available slot
        if (!imageUrl) {
          setImageUrl(url);
        } else if (!image2Url) {
          setImage2Url(url);
        } else if (!image3Url) {
          setImage3Url(url);
        } else if (!image4Url) {
          setImage4Url(url);
        } else if (!image5Url) {
          setImage5Url(url);
        } else {
          toast({
            title: "Info",
            description: "All image slots are full. Please remove an image first."
          });
        }
        
        toast({
          title: "Success",
          description: "Image uploaded successfully!"
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  // Remove image
  const removeImage = (imageIndex: number) => {
    switch (imageIndex) {
      case 1:
        setImageUrl(null);
        break;
      case 2:
        setImage2Url(null);
        break;
      case 3:
        setImage3Url(null);
        break;
      case 4:
        setImage4Url(null);
        break;
      case 5:
        setImage5Url(null);
        break;
    }
  };

  // Fetch available products for related products selection
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        const data = await response.json();
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
  
  // Remove a related product
  const removeRelatedProduct = (productId: string) => {
    if (relatedProductId1 === productId) {
      setRelatedProductId1(null);
    } else if (relatedProductId2 === productId) {
      setRelatedProductId2(null);
    } else if (relatedProductId3 === productId) {
      setRelatedProductId3(null);
    } else if (relatedProductId4 === productId) {
      setRelatedProductId4(null);
    }
    
    // In create page, we don't need to update database since it doesn't exist yet
    // But we'll provide feedback to the user
    toast({
      title: "Success",
      description: "Related product removed"
    });
  };
  
  // Add a related product to the first available slot
  const addRelatedProduct = (productId: string) => {
    if (!relatedProductId1) {
      setRelatedProductId1(productId);
    } else if (!relatedProductId2) {
      setRelatedProductId2(productId);
    } else if (!relatedProductId3) {
      setRelatedProductId3(productId);
    } else if (!relatedProductId4) {
      setRelatedProductId4(productId);
    } else {
      toast({
        title: "Error",
        description: "You can only add up to 4 related products",
        variant: "destructive"
      });
      return;
    }
    
    // In create page, we don't need to update database since it doesn't exist yet
    // But we'll provide feedback to the user
    toast({
      title: "Success",
      description: "Related product added"
    });
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
      setIsSubmitting(true);
      
      const productId = uuidv4();
      
      const productData = {
        id: productId,
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
        image_url: imageUrl,
        image2_url: image2Url,
        image3_url: image3Url,
        image4_url: image4Url,
        image5_url: image5Url,
        related_product_id_1: relatedProductId1,
        related_product_id_2: relatedProductId2,
        related_product_id_3: relatedProductId3,
        related_product_id_4: relatedProductId4,
        additional_images: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Use the createProduct service function
      const { product } = await createProduct(productData);
      
      if (!product) {
        throw new Error("Failed to create product");
      }
      
      toast({
        title: "Success",
        description: "Product created successfully!"
      });
      
      // Redirect to the product list page
      router.push("/admin/product");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const categories = [
    { value: "heat-resistant-gloves", label: "Heat Resistant Gloves" },
    { value: "cut-resistant-gloves", label: "Cut Resistant Gloves" },
    { value: "welding-gloves", label: "Welding Gloves" },
    { value: "chemical-resistant-gloves", label: "Chemical Resistant Gloves" },
    { value: "general-purpose", label: "General Purpose" },
    { value: "specialty-gloves", label: "Specialty Gloves" }
  ];
  
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
        <h1 className="text-2xl font-bold tracking-tight">Create New Product</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/product">Cancel</Link>
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-6">
          {/* Main content area - 4 columns */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Product Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Enter the details for your new safety glove product.</CardDescription>
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
            
            <Card>
              <CardHeader>
                <CardTitle>Features and Applications</CardTitle>
                <CardDescription>Define key product capabilities and use cases.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Features</Label>
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
                    
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center border rounded-lg px-3 py-1">
                          <Tag className="h-3 w-3 mr-1" />
                          <span className="text-sm">{feature}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removeFeature(index)}
                          >
                            <ArrowLeft className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {features.length === 0 && (
                        <p className="text-sm text-muted-foreground py-2">
                          No features added yet.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Applications</Label>
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
                    
                    <div className="flex flex-wrap gap-2">
                      {applications.map((application, index) => (
                        <div key={index} className="flex items-center border rounded-lg px-3 py-1">
                          <span className="text-sm">{application}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removeApplication(index)}
                          >
                            <ArrowLeft className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {applications.length === 0 && (
                        <p className="text-sm text-muted-foreground py-2">
                          No applications added yet.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Industries</Label>
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
                    
                    <div className="flex flex-wrap gap-2">
                      {industries.map((industry, index) => (
                        <div key={index} className="flex items-center border rounded-lg px-3 py-1">
                          <Factory className="h-3 w-3 mr-1" />
                          <span className="text-sm">{industry}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removeIndustry(index)}
                          >
                            <ArrowLeft className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {industries.length === 0 && (
                        <p className="text-sm text-muted-foreground py-2">
                          No industries added yet.
                        </p>
                      )}
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
                    <Label htmlFor="cover">Product Images</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="product-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    
                    {/* Product Images Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { index: 1, url: imageUrl, label: "Main Image" },
                        { index: 2, url: image2Url, label: "Image 2" },
                        { index: 3, url: image3Url, label: "Image 3" },
                        { index: 4, url: image4Url, label: "Image 4" },
                        { index: 5, url: image5Url, label: "Image 5" }
                      ].map((image) => (
                        <div 
                          key={image.index} 
                          className={`relative border rounded-md overflow-hidden ${!image.url ? 'border-dashed p-2 h-20 flex items-center justify-center' : 'h-20'}`}
                        >
                          {image.url ? (
                            <>
                              <img
                                src={image.url}
                                alt={`Product image ${image.index}`}
                                className="w-full h-full object-contain"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-5 w-5"
                                onClick={() => removeImage(image.index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <span className="text-xs text-muted-foreground">{image.label}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div 
                      className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                          <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Click to upload a product image
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-md bg-blue-50 p-3 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100">
                    <Info className="h-4 w-4" />
                    <p className="text-xs">
                      You can upload up to 5 product images. The first image will be used as the main product image.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/admin/product">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Product"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Related Products Card */}
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
                      onValueChange={(value) => {
                        if (value) {
                          addRelatedProduct(value);
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
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 