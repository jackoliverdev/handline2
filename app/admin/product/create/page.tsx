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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, Info, Plus, Tag, Thermometer, Scissors, Factory, X, Layers, Shield } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { createProduct, uploadProductImage, Product } from "@/lib/products-service";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { MiniProductCard } from "@/components/app/mini-product-card";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Badge } from "@/components/ui/badge";

export default function CreateProductPage() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'it'>('en');
  // Locale-aware inputs (mirrors Edit Product behaviour)
  const [nameLocales, setNameLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [shortDescriptionLocales, setShortDescriptionLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [descriptionLocales, setDescriptionLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [categoryLocales, setCategoryLocales] = useState<{en: string, it: string}>({ en: "Hand protection", it: "" });
  const [subCategoryLocales, setSubCategoryLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [temperatureRating, setTemperatureRating] = useState<number | null>(null);
  const [cutResistanceLevel, setCutResistanceLevel] = useState("");
  const [heatResistanceLevel, setHeatResistanceLevel] = useState("");
  const [ceCategory, setCeCategory] = useState("");
  const [enStandard, setEnStandard] = useState<string>("");
  const [brands, setBrands] = useState<string[]>([]);
  const [tagsLocales, setTagsLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [isFeatured, setIsFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'in_stock' | 'out_of_stock' | 'coming_soon' | 'made_to_order'>('in_stock');
  const [orderPriority, setOrderPriority] = useState<number>(0);
  const [featuresLocales, setFeaturesLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [applicationsLocales, setApplicationsLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [industriesLocales, setIndustriesLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [materialsLocales, setMaterialsLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Safety standards state (mirrors Edit)
  const [safety, setSafety] = useState<any>({
    en_388: { enabled: false, abrasion: null, cut: null, tear: null, puncture: null, iso_13997: null, impact_en_13594: null },
    en_407: { enabled: false, contact_heat: null, convective_heat: null, radiant_heat: null, limited_flame_spread: null, small_splashes_molten_metal: null, large_quantities_molten_metal: null },
    en_421: false,
    en_511: { enabled: false, contact_cold: null, convective_cold: null, water_permeability: null },
    en_659: false,
    en_12477: false,
    en_16350: false,
    en_374_1: { enabled: false, type: null, chemicals_tested: null },
    en_374_5: false,
    en_381_7: false,
    en_60903: false,
    en_1082_1: false,
    food_grade: false,
    en_iso_21420: true,
    ionising_radiation: null,
    radioactive_contamination: null
  });
  
  // Environment pictograms state (mirrors Edit)
  const [environmentPictograms, setEnvironmentPictograms] = useState<any>({
    dry: false,
    wet: false,
    dust: false,
    chemical: false,
    biological: false,
    oily_grease: false
  });
  
  // Image state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image2Url, setImage2Url] = useState<string | null>(null);
  const [image3Url, setImage3Url] = useState<string | null>(null);
  const [image4Url, setImage4Url] = useState<string | null>(null);
  const [image5Url, setImage5Url] = useState<string | null>(null);
  const [technicalSheetUrl, setTechnicalSheetUrl] = useState<string | null>(null);
  const [technicalSheetUrlIt, setTechnicalSheetUrlIt] = useState<string | null>(null);
  const [declarationSheetUrl, setDeclarationSheetUrl] = useState<string | null>(null);
  const [declarationSheetUrlIt, setDeclarationSheetUrlIt] = useState<string | null>(null);
  const [manufacturersInstructionUrl, setManufacturersInstructionUrl] = useState<string | null>(null);
  const [manufacturersInstructionUrlIt, setManufacturersInstructionUrlIt] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();
  // Additional image upload state (to mirror Edit preview flow)
  const [additionalImage, setAdditionalImage] = useState<{ file: File | null; previewUrl: string | null }>({ file: null, previewUrl: null });
  const additionalInputRef = useRef<HTMLInputElement>(null);
  
  // Document upload refs
  const techSheetEnRef = useRef<HTMLInputElement>(null);
  const techSheetItRef = useRef<HTMLInputElement>(null);
  const declSheetEnRef = useRef<HTMLInputElement>(null);
  const declSheetItRef = useRef<HTMLInputElement>(null);
  const manuInstructionEnRef = useRef<HTMLInputElement>(null);
  const manuInstructionItRef = useRef<HTMLInputElement>(null);
  const [isUploadingDocs, setIsUploadingDocs] = useState(false);
  
  // Related products state
  const [relatedProductId1, setRelatedProductId1] = useState<string | null>(null);
  const [relatedProductId2, setRelatedProductId2] = useState<string | null>(null);
  const [relatedProductId3, setRelatedProductId3] = useState<string | null>(null);
  const [relatedProductId4, setRelatedProductId4] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  
  // Add feature
  const addFeature = () => {
    if (!newFeature) return;
    setFeaturesLocales({
      ...featuresLocales,
      [currentLanguage]: [...featuresLocales[currentLanguage], newFeature]
    });
    setNewFeature("");
  };
  
  // Remove feature
  const removeFeature = (index: number) => {
    setFeaturesLocales({
      ...featuresLocales,
      [currentLanguage]: featuresLocales[currentLanguage].filter((_, i) => i !== index)
    });
  };
  
  // Add application
  const addApplication = () => {
    if (!newApplication) return;
    setApplicationsLocales({
      ...applicationsLocales,
      [currentLanguage]: [...applicationsLocales[currentLanguage], newApplication]
    });
    setNewApplication("");
  };
  
  // Remove application
  const removeApplication = (index: number) => {
    setApplicationsLocales({
      ...applicationsLocales,
      [currentLanguage]: applicationsLocales[currentLanguage].filter((_, i) => i !== index)
    });
  };
  
  // Add industry
  const addIndustry = () => {
    if (!newIndustry) return;
    setIndustriesLocales({
      ...industriesLocales,
      [currentLanguage]: [...industriesLocales[currentLanguage], newIndustry]
    });
    setNewIndustry("");
  };
  
  // Remove industry
  const removeIndustry = (index: number) => {
    setIndustriesLocales({
      ...industriesLocales,
      [currentLanguage]: industriesLocales[currentLanguage].filter((_, i) => i !== index)
    });
  };
  
  // Add material
  const addMaterial = () => {
    if (!newMaterial) return;
    setMaterialsLocales({
      ...materialsLocales,
      [currentLanguage]: [...materialsLocales[currentLanguage], newMaterial]
    });
    setNewMaterial("");
  };
  
  // Remove material
  const removeMaterial = (index: number) => {
    setMaterialsLocales({
      ...materialsLocales,
      [currentLanguage]: materialsLocales[currentLanguage].filter((_, i) => i !== index)
    });
  };
  
  // Add brand
  const addBrand = () => {
    if (!newBrand) return;
    setBrands([...brands, newBrand]);
    setNewBrand("");
  };
  
  // Remove brand
  const removeBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  };
  
  // Add tag
  const addTag = () => {
    if (!newTag) return;
    setTagsLocales({
      ...tagsLocales,
      [currentLanguage]: [...tagsLocales[currentLanguage], newTag]
    });
    setNewTag("");
  };
  
  // Remove tag
  const removeTag = (index: number) => {
    setTagsLocales({
      ...tagsLocales,
      [currentLanguage]: tagsLocales[currentLanguage].filter((_, i) => i !== index)
    });
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

  // Additional image handlers (preview + staged upload)
  const handleAdditionalImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file type', description: 'Please select an image file (JPEG, PNG, etc.)', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Image must be less than 5MB', variant: 'destructive' });
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setAdditionalImage({ file, previewUrl });
  };

  const removeAdditionalImage = () => {
    setAdditionalImage({ file: null, previewUrl: null });
  };

  const uploadAdditionalImage = async () => {
    if (!additionalImage.file) return;
    try {
      setIsUploading(true);
      const tempId = `temp-${Date.now()}`;
      const { url } = await uploadProductImage(tempId, additionalImage.file);
      if (!url) throw new Error('Failed to upload image');
      if (!imageUrl) setImageUrl(url);
      else if (!image2Url) setImage2Url(url);
      else if (!image3Url) setImage3Url(url);
      else if (!image4Url) setImage4Url(url);
      else if (!image5Url) setImage5Url(url);
      else {
        toast({ title: 'Info', description: 'All image slots are full. Please remove an image first.' });
        return;
      }
      toast({ title: 'Success', description: 'Image uploaded successfully!' });
      setAdditionalImage({ file: null, previewUrl: null });
    } catch (error) {
      console.error('Error uploading additional image:', error);
      toast({ title: 'Error', description: 'Failed to upload image. Please try again.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  // Upload document to Supabase storage
  const uploadDocument = async (file: File, type: 'technical' | 'declaration' | 'manufacturers', language: 'en' | 'it'): Promise<string | null> => {
    if (!file) return null;
    
    try {
      setIsUploadingDocs(true);
      const tempId = `temp-${Date.now()}`;
      const fileExt = file.name.split('.').pop();
      const fileName = `${tempId}_${type}_${language}.${fileExt}`;
      
      const { data, error } = await supabase
        .storage
        .from('technical-sheets')
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
        .from('technical-sheets')
        .getPublicUrl(fileName);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Upload Error",
        description: "Failed to upload document",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploadingDocs(false);
    }
  };
  
  // Handle document uploads
  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'technical' | 'declaration' | 'manufacturers', language: 'en' | 'it') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "PDF must be less than 10MB",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const newDocUrl = await uploadDocument(file, type, language);
      
      if (newDocUrl) {
        // Update the appropriate state
        if (type === 'technical' && language === 'en') {
          setTechnicalSheetUrl(newDocUrl);
        } else if (type === 'technical' && language === 'it') {
          setTechnicalSheetUrlIt(newDocUrl);
        } else if (type === 'declaration' && language === 'en') {
          setDeclarationSheetUrl(newDocUrl);
        } else if (type === 'declaration' && language === 'it') {
          setDeclarationSheetUrlIt(newDocUrl);
        } else if (type === 'manufacturers' && language === 'en') {
          setManufacturersInstructionUrl(newDocUrl);
        } else if (type === 'manufacturers' && language === 'it') {
          setManufacturersInstructionUrlIt(newDocUrl);
        }
        
        toast({
          title: "Success",
          description: "Document uploaded successfully!"
        });
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Error",
        description: "Failed to upload document.",
        variant: "destructive"
      });
    }
  };
  
  // Remove document
  const removeDocument = (type: 'technical' | 'declaration' | 'manufacturers', language: 'en' | 'it') => {
    if (type === 'technical' && language === 'en') {
      setTechnicalSheetUrl(null);
    } else if (type === 'technical' && language === 'it') {
      setTechnicalSheetUrlIt(null);
    } else if (type === 'declaration' && language === 'en') {
      setDeclarationSheetUrl(null);
    } else if (type === 'declaration' && language === 'it') {
      setDeclarationSheetUrlIt(null);
    } else if (type === 'manufacturers' && language === 'en') {
      setManufacturersInstructionUrl(null);
    } else if (type === 'manufacturers' && language === 'it') {
      setManufacturersInstructionUrlIt(null);
    }
    
    toast({
      title: "Success",
      description: "Document removed"
    });
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
    
    if (!nameLocales.en || !descriptionLocales.en) {
      toast({
        title: "Validation Error",
        description: "Please fill in Product Name and Description in English (required).",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const productId = uuidv4();
      
      const productData = {
        id: productId,
        // Legacy columns populated from EN
        name: nameLocales.en,
        description: descriptionLocales.en,
        short_description: shortDescriptionLocales.en || shortDescriptionLocales.it || '',
        category: categoryLocales.en || categoryLocales.it || '',
        sub_category: subCategoryLocales.en || subCategoryLocales.it || '',
        temperature_rating: temperatureRating,
        cut_resistance_level: cutResistanceLevel,
        heat_resistance_level: heatResistanceLevel,
        ce_category: ceCategory,
        brands: brands,
        // Locale JSON payloads (optional)
        name_locales: (nameLocales.en || nameLocales.it) ? nameLocales : undefined,
        description_locales: (descriptionLocales.en || descriptionLocales.it) ? descriptionLocales : undefined,
        short_description_locales: (shortDescriptionLocales.en || shortDescriptionLocales.it) ? shortDescriptionLocales : undefined,
        category_locales: (categoryLocales.en || categoryLocales.it) ? categoryLocales : undefined,
        sub_category_locales: (subCategoryLocales.en || subCategoryLocales.it) ? subCategoryLocales : undefined,
        features_locales: (featuresLocales.en.length > 0 || featuresLocales.it.length > 0) ? featuresLocales : undefined,
        applications_locales: (applicationsLocales.en.length > 0 || applicationsLocales.it.length > 0) ? applicationsLocales : undefined,
        industries_locales: (industriesLocales.en.length > 0 || industriesLocales.it.length > 0) ? industriesLocales : undefined,
        materials_locales: (materialsLocales.en.length > 0 || materialsLocales.it.length > 0) ? materialsLocales : undefined,
        tags_locales: (tagsLocales.en.length > 0 || tagsLocales.it.length > 0) ? tagsLocales : {},
        is_featured: isFeatured,
        out_of_stock: availabilityStatus === 'out_of_stock',
        // Fallback legacy arrays (kept for compatibility)
        features: featuresLocales.en.length > 0 ? featuresLocales.en : featuresLocales.it,
        applications: applicationsLocales.en.length > 0 ? applicationsLocales.en : applicationsLocales.it,
        industries: industriesLocales.en.length > 0 ? industriesLocales.en : industriesLocales.it,
        image_url: imageUrl,
        image2_url: image2Url,
        image3_url: image3Url,
        image4_url: image4Url,
        image5_url: image5Url,
        technical_sheet_url: technicalSheetUrl,
        technical_sheet_url_it: technicalSheetUrlIt,
        declaration_sheet_url: declarationSheetUrl,
        declaration_sheet_url_it: declarationSheetUrlIt,
        manufacturers_instruction_url: manufacturersInstructionUrl,
        manufacturers_instruction_url_it: manufacturersInstructionUrlIt,
        related_product_id_1: relatedProductId1,
        related_product_id_2: relatedProductId2,
        related_product_id_3: relatedProductId3,
        related_product_id_4: relatedProductId4,
        // Ensure required defaults on insert
        published: false,
        coming_soon: false,
        availability_status: 'in_stock' as const,
        order_priority: 0,
        safety: {},
        environment_pictograms: {},
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
    { value: "Hand protection", label: "Hand Protection" }
  ];
  
  const subcategories = [
    { value: "Cut resistant gloves", label: "Cut Resistant Gloves" },
    { value: "Gloves for general use", label: "Gloves for General Use" },
    { value: "Heat resistant gloves", label: "Heat Resistant Gloves" },
    { value: "Mechanical hazards gloves", label: "Mechanical Hazards Gloves" },
    { value: "Welding glove", label: "Welding Glove" }
  ];

  const [lengthCm, setLengthCm] = useState<number | null>(null);
  
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
        <Tabs defaultValue="information">
          <TabsList className="flex overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide px-1 sm:px-0 mb-6">
            <TabsTrigger value="information">Product Information</TabsTrigger>
            <TabsTrigger value="content">Features & Content</TabsTrigger>
            <TabsTrigger value="safety">Safety & Standards</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="related">Related Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="information" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Product Information</h2>
              <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
            </div>
            <div className="grid gap-6 md:grid-cols-6">
              {/* Main content area - 4 columns */}
              <div className="md:col-span-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Basic Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Enter product details in {currentLanguage === 'en' ? 'English' : 'Italian'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="name" className="text-xs sm:text-sm">Product Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter product name"
                          value={nameLocales[currentLanguage]}
                          onChange={(e) => setNameLocales({ ...nameLocales, [currentLanguage]: e.target.value })}
                          required
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="shortDescription" className="text-xs sm:text-sm">Short Description</Label>
                        <Input
                          id="shortDescription"
                          placeholder="Brief product description"
                          value={shortDescriptionLocales[currentLanguage]}
                          onChange={(e) => setShortDescriptionLocales({ ...shortDescriptionLocales, [currentLanguage]: e.target.value })}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="description" className="text-xs sm:text-sm">Full Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter a detailed description of your product"
                          value={descriptionLocales[currentLanguage]}
                          onChange={(e) => setDescriptionLocales({ ...descriptionLocales, [currentLanguage]: e.target.value })}
                          rows={4}
                          required
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={categoryLocales[currentLanguage]} onValueChange={(value) => setCategoryLocales({ ...categoryLocales, [currentLanguage]: value })}>
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
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="subCategory">Sub-Category</Label>
                          <Select value={subCategoryLocales[currentLanguage]} onValueChange={(value) => setSubCategoryLocales({ ...subCategoryLocales, [currentLanguage]: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                              {subcategories.map((subcat) => (
                                <SelectItem key={subcat.value} value={subcat.value}>
                                  {subcat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="temperature" className="text-xs sm:text-sm">Temperature Rating (°C)</Label>
                          <Input id="temperature" type="number" placeholder="e.g. 500" value={temperatureRating === null ? "" : temperatureRating} onChange={(e) => setTemperatureRating(e.target.value === "" ? null : Number(e.target.value))} className="text-xs sm:text-sm h-8 sm:h-10" />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="cutResistance" className="text-xs sm:text-sm">Cut Resistance Level</Label>
                          <Input id="cutResistance" placeholder="e.g. Level 5" value={cutResistanceLevel} onChange={(e) => setCutResistanceLevel(e.target.value)} className="text-xs sm:text-sm h-8 sm:h-10" />
                        </div>
                      </div>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="heatResistance" className="text-xs sm:text-sm">Heat Resistance Level</Label>
                          <Input id="heatResistance" placeholder="e.g. Level 4" value={heatResistanceLevel} onChange={(e) => setHeatResistanceLevel(e.target.value)} className="text-xs sm:text-sm h-8 sm:h-10" />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="ceCategory" className="text-xs sm:text-sm">CE Category</Label>
                          <Select value={ceCategory} onValueChange={setCeCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select CE category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I">Category I</SelectItem>
                              <SelectItem value="II">Category II</SelectItem>
                              <SelectItem value="III">Category III</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:space-y-2">
                          <Label htmlFor="enStandard" className="text-xs sm:text-sm">EN Standard</Label>
                          <Select value={enStandard} onValueChange={setEnStandard}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select EN standard" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="EN388">EN388</SelectItem>
                              <SelectItem value="EN407">EN407</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Related Products moved to its own tab to match Edit */}
              </div>
              {/* Sidebar - 2 columns */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                    <CardDescription>Configure how your product appears.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="published">Published</Label>
                          <p className="text-xs text-muted-foreground">Make this product visible on the website.</p>
                        </div>
                        <Switch id="published" checked={published} onCheckedChange={setPublished} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availabilityStatus">Availability Status</Label>
                        <Select value={availabilityStatus} onValueChange={(value: any) => setAvailabilityStatus(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in_stock">In Stock</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                            <SelectItem value="coming_soon">Coming Soon</SelectItem>
                            <SelectItem value="made_to_order">Made to Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="comingSoon">Coming Soon</Label>
                          <p className="text-xs text-muted-foreground">Mark this product as coming soon.</p>
                        </div>
                        <Switch id="comingSoon" checked={comingSoon} onCheckedChange={setComingSoon} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="featured">Featured Product</Label>
                          <p className="text-xs text-muted-foreground">Show this product in featured sections.</p>
                        </div>
                        <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="orderPriority">Order Priority</Label>
                        <Input
                          id="orderPriority"
                          type="number"
                          value={orderPriority}
                          onChange={(e) => setOrderPriority(Number(e.target.value))}
                          placeholder="0"
                        />
                        <p className="text-xs text-muted-foreground">Lower numbers appear first in listings.</p>
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Safety & Standards</CardTitle>
                <CardDescription>Configure safety standards and environmental pictograms.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="safety">Safety Standards</Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_388">EN 388</Label>
                          <p className="text-xs text-muted-foreground">Abrasion, cut, tear, puncture, ISO 13997, impact EN 13594</p>
                        </div>
                        <Switch id="en_388" checked={safety.en_388?.enabled || false} onCheckedChange={(value) => setSafety({ ...safety, en_388: { ...(safety.en_388 || {}), enabled: value, abrasion: safety.en_388?.abrasion || null, cut: safety.en_388?.cut || null, tear: safety.en_388?.tear || null, puncture: safety.en_388?.puncture || null, iso_13997: safety.en_388?.iso_13997 || null, impact_en_13594: safety.en_388?.impact_en_13594 || null } })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_407">EN 407</Label>
                          <p className="text-xs text-muted-foreground">Contact heat, convective heat, radiant heat, limited flame spread, small splashes molten metal, large quantities molten metal</p>
                        </div>
                        <Switch id="en_407" checked={safety.en_407?.enabled || false} onCheckedChange={(value) => setSafety({ ...safety, en_407: { ...(safety.en_407 || {}), enabled: value, contact_heat: safety.en_407?.contact_heat || null, convective_heat: safety.en_407?.convective_heat || null, radiant_heat: safety.en_407?.radiant_heat || null, limited_flame_spread: safety.en_407?.limited_flame_spread || null, small_splashes_molten_metal: safety.en_407?.small_splashes_molten_metal || null, large_quantities_molten_metal: safety.en_407?.large_quantities_molten_metal || null } })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_421">EN 421</Label>
                          <p className="text-xs text-muted-foreground">Contact cold, convective cold, water permeability</p>
                        </div>
                        <Switch id="en_421" checked={!!safety.en_421} onCheckedChange={(value) => setSafety({ ...safety, en_421: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_511">EN 511</Label>
                          <p className="text-xs text-muted-foreground">Contact cold, convective cold, water permeability</p>
                        </div>
                        <Switch id="en_511" checked={safety.en_511?.enabled || false} onCheckedChange={(value) => setSafety({ ...safety, en_511: { ...(safety.en_511 || {}), enabled: value, contact_cold: safety.en_511?.contact_cold || null, convective_cold: safety.en_511?.convective_cold || null, water_permeability: safety.en_511?.water_permeability || null } })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_659">EN 659</Label>
                          <p className="text-xs text-muted-foreground">Food grade, EN ISO 21420, ionising radiation, radioactive contamination</p>
                        </div>
                        <Switch id="en_659" checked={!!safety.en_659} onCheckedChange={(value) => setSafety({ ...safety, en_659: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_12477">EN 12477</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_12477" checked={!!safety.en_12477} onCheckedChange={(value) => setSafety({ ...safety, en_12477: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_16350">EN 16350</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_16350" checked={!!safety.en_16350} onCheckedChange={(value) => setSafety({ ...safety, en_16350: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_374_1">EN 374-1</Label>
                          <p className="text-xs text-muted-foreground">Type, chemicals tested</p>
                        </div>
                        <Switch id="en_374_1" checked={safety.en_374_1?.enabled || false} onCheckedChange={(value) => setSafety({ ...safety, en_374_1: { ...(safety.en_374_1 || {}), enabled: value, type: safety.en_374_1?.type || null, chemicals_tested: safety.en_374_1?.chemicals_tested || null } })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_374_5">EN 374-5</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_374_5" checked={!!safety.en_374_5} onCheckedChange={(value) => setSafety({ ...safety, en_374_5: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_381_7">EN 381-7</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_381_7" checked={!!safety.en_381_7} onCheckedChange={(value) => setSafety({ ...safety, en_381_7: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_60903">EN 60903</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_60903" checked={!!safety.en_60903} onCheckedChange={(value) => setSafety({ ...safety, en_60903: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_1082_1">EN 1082-1</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_1082_1" checked={!!safety.en_1082_1} onCheckedChange={(value) => setSafety({ ...safety, en_1082_1: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="food_grade">Food Grade</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="food_grade" checked={!!safety.food_grade} onCheckedChange={(value) => setSafety({ ...safety, food_grade: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="en_iso_21420">EN ISO 21420</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="en_iso_21420" checked={!!safety.en_iso_21420} onCheckedChange={(value) => setSafety({ ...safety, en_iso_21420: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ionising_radiation">Ionising Radiation</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="ionising_radiation" checked={!!safety.ionising_radiation} onCheckedChange={(value) => setSafety({ ...safety, ionising_radiation: value })} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="radioactive_contamination">Radioactive Contamination</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="radioactive_contamination" checked={!!safety.radioactive_contamination} onCheckedChange={(value) => setSafety({ ...safety, radioactive_contamination: value })} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="environmentPictograms">Environment Pictograms</Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dry">Dry</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="dry" checked={!!environmentPictograms.dry} onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, dry: value })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="wet">Wet</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="wet" checked={!!environmentPictograms.wet} onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, wet: value })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dust">Dust</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="dust" checked={!!environmentPictograms.dust} onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, dust: value })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="chemical">Chemical</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="chemical" checked={!!environmentPictograms.chemical} onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, chemical: value })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="biological">Biological</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="biological" checked={!!environmentPictograms.biological} onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, biological: value })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="oily_grease">Oily Grease</Label>
                          <p className="text-xs text-muted-foreground">Not applicable</p>
                        </div>
                        <Switch id="oily_grease" checked={!!environmentPictograms.oily_grease} onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, oily_grease: value })} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Features & Content</h2>
              <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                  <CardDescription>Add key features in {currentLanguage === 'en' ? 'English' : 'Italian'}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Add a feature" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFeature()} />
                      <Button type="button" size="sm" onClick={addFeature}><Plus className="h-4 w-4" /></Button>
                    </div>
                    {featuresLocales[currentLanguage].length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">No features added yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {featuresLocales[currentLanguage].map((feature, index) => (
                          <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                            <span className="text-sm">{feature}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => removeFeature(index)}>
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
                  <CardDescription>Add recommended applications in {currentLanguage === 'en' ? 'English' : 'Italian'}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Add an application" value={newApplication} onChange={(e) => setNewApplication(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addApplication()} />
                      <Button type="button" size="sm" onClick={addApplication}><Plus className="h-4 w-4" /></Button>
                    </div>
                    {applicationsLocales[currentLanguage].length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">No applications added yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {applicationsLocales[currentLanguage].map((application, index) => (
                          <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                            <span className="text-sm">{application}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => removeApplication(index)}>
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
                  <CardTitle>Industries</CardTitle>
                  <CardDescription>Add industries in {currentLanguage === 'en' ? 'English' : 'Italian'}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Add an industry" value={newIndustry} onChange={(e) => setNewIndustry(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addIndustry()} />
                      <Button type="button" size="sm" onClick={addIndustry}><Plus className="h-4 w-4" /></Button>
                    </div>
                    {industriesLocales[currentLanguage].length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">No industries added yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2 py-2">
                        {industriesLocales[currentLanguage].map((industry, index) => (
                          <div key={index} className="flex items-center border rounded-full px-3 py-1">
                            <Factory className="h-3 w-3 mr-1" />
                            <span className="text-sm">{industry}</span>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 ml-1" onClick={() => removeIndustry(index)}>
                              <X className="h-3 w-3" />
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
                  <CardTitle>Materials</CardTitle>
                  <CardDescription>Add materials in {currentLanguage === 'en' ? 'English' : 'Italian'}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Add a material" value={newMaterial} onChange={(e) => setNewMaterial(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addMaterial()} />
                      <Button type="button" size="sm" onClick={addMaterial}><Plus className="h-4 w-4" /></Button>
                    </div>
                    {materialsLocales[currentLanguage].length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">No materials added yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2 py-2">
                        {materialsLocales[currentLanguage].map((material, index) => (
                          <div key={index} className="flex items-center border rounded-full px-3 py-1">
                            <Layers className="h-3 w-3 mr-1" />
                            <span className="text-sm">{material}</span>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 ml-1" onClick={() => removeMaterial(index)}>
                              <X className="h-3 w-3" />
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
                  <CardTitle>Tags & Metadata</CardTitle>
                  <CardDescription>Add search tags and metadata.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex gap-2 mt-2">
                        <Input placeholder="Add a tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} />
                        <Button type="button" size="sm" onClick={addTag}><Plus className="h-4 w-4" /></Button>
                      </div>
                      {tagsLocales[currentLanguage].length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tagsLocales[currentLanguage].map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {tag}
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => removeTag(index)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Specifications</CardTitle>
                  <CardDescription>Physical characteristics and brand information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="brandInput">Brands</Label>
                      <div className="flex gap-2 mt-2">
                        <Input placeholder="Add a brand" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addBrand()} />
                        <Button type="button" size="sm" onClick={addBrand}><Plus className="h-4 w-4" /></Button>
                      </div>
                      {brands.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {brands.map((brand, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {brand}
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => removeBrand(index)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lengthCm">Length (cm)</Label>
                      <Input id="lengthCm" type="number" placeholder="e.g., 27" value={lengthCm === null ? "" : lengthCm} onChange={(e) => setLengthCm(e.target.value === "" ? null : Number(e.target.value))} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload and manage product images.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Documentation</CardTitle>
                <CardDescription>Upload technical sheets, declaration documents, and manufacturers instructions for this product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Technical Sheet English */}
                  <div className="space-y-4">
                    <Label>Technical Sheet (English)</Label>
                    <input
                      ref={techSheetEnRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleDocumentUpload(e, 'technical', 'en')}
                    />
                    
                    {technicalSheetUrl ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Technical Sheet (EN)</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={technicalSheetUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Download
                            </a>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDocument('technical', 'en')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => techSheetEnRef.current?.click()}
                      >
                        {isUploadingDocs ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload Technical Sheet (English)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Technical Sheet Italian */}
                  <div className="space-y-4">
                    <Label>Technical Sheet (Italian)</Label>
                    <input
                      ref={techSheetItRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleDocumentUpload(e, 'technical', 'it')}
                    />
                    
                    {technicalSheetUrlIt ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Technical Sheet (IT)</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={technicalSheetUrlIt} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Download
                            </a>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDocument('technical', 'it')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => techSheetItRef.current?.click()}
                      >
                        {isUploadingDocs ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload Technical Sheet (Italian)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Declaration Sheet English */}
                  <div className="space-y-4">
                    <Label>Declaration Sheet (English)</Label>
                    <input
                      ref={declSheetEnRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleDocumentUpload(e, 'declaration', 'en')}
                    />
                    
                    {declarationSheetUrl ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Declaration Sheet (EN)</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={declarationSheetUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Download
                            </a>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDocument('declaration', 'en')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => declSheetEnRef.current?.click()}
                      >
                        {isUploadingDocs ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload Declaration Sheet (English)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Declaration Sheet Italian */}
                  <div className="space-y-4">
                    <Label>Declaration Sheet (Italian)</Label>
                    <input
                      ref={declSheetItRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleDocumentUpload(e, 'declaration', 'it')}
                    />
                    
                    {declarationSheetUrlIt ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Declaration Sheet (IT)</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={declarationSheetUrlIt} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Download
                            </a>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDocument('declaration', 'it')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => declSheetItRef.current?.click()}
                      >
                        {isUploadingDocs ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload Declaration Sheet (Italian)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Manufacturers Instruction English */}
                  <div className="space-y-4">
                    <Label>Manufacturers Instruction (English)</Label>
                    <input
                      ref={manuInstructionEnRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleDocumentUpload(e, 'manufacturers', 'en')}
                    />
                    
                    {manufacturersInstructionUrl ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Manufacturers Instruction (EN)</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={manufacturersInstructionUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Download
                            </a>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDocument('manufacturers', 'en')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => manuInstructionEnRef.current?.click()}
                      >
                        {isUploadingDocs ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload Manufacturers Instruction (English)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Manufacturers Instruction Italian */}
                  <div className="space-y-4">
                    <Label>Manufacturers Instruction (Italian)</Label>
                    <input
                      ref={manuInstructionItRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleDocumentUpload(e, 'manufacturers', 'it')}
                    />
                    
                    {manufacturersInstructionUrlIt ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Manufacturers Instruction (IT)</p>
                              <p className="text-xs text-muted-foreground">PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a 
                              href={manufacturersInstructionUrlIt} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Download
                            </a>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDocument('manufacturers', 'it')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => manuInstructionItRef.current?.click()}
                      >
                        {isUploadingDocs ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload Manufacturers Instruction (Italian)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-md bg-blue-50 p-3 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100 mt-6">
                  <Info className="h-4 w-4" />
                  <p className="text-xs">
                    Upload PDF documents for technical specifications, product declarations, and manufacturers instructions. Documents will be available for download on the product detail pages.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="related" className="space-y-4 mt-4">
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
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/product">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
} 