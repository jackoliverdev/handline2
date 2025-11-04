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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { getProductById, updateProduct, deleteProduct, uploadProductImage, Product } from "@/lib/products-service";
import { ArrowLeft, Save, Trash, Upload, Info, X, Image as ImageIcon, Plus, Thermometer, Scissors, Factory, ExternalLink, Shield, Zap, Snowflake, Flame, Eye, Tag, FileText, Package, Layers } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { MiniProductCard } from "@/components/app/mini-product-card";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

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
  
  // Language management state
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'it'>('en');
  
  // Legacy fields (kept for compatibility, but will be auto-populated from locales)
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [temperatureRating, setTemperatureRating] = useState<number | null>(null);
  const [cutResistanceLevel, setCutResistanceLevel] = useState("");
  const [heatResistanceLevel, setHeatResistanceLevel] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  
  // Locale-aware state for multi-language fields
  const [nameLocales, setNameLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [descriptionLocales, setDescriptionLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [shortDescriptionLocales, setShortDescriptionLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [categoryLocales, setCategoryLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [subCategoryLocales, setSubCategoryLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [featuresLocales, setFeaturesLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [applicationsLocales, setApplicationsLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [industriesLocales, setIndustriesLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [materialsLocales, setMaterialsLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [tagsLocales, setTagsLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [sizeLocales, setSizeLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  
  // New fields from database schema
  const [published, setPublished] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'in_stock' | 'out_of_stock' | 'coming_soon' | 'made_to_order'>('in_stock');
  const [brands, setBrands] = useState<string[]>([]);
  const [lengthCm, setLengthCm] = useState<number | null>(null);
  const [ceCategory, setCeCategory] = useState<string>('');
  const [enStandard, setEnStandard] = useState<string>('');
  const [orderPriority, setOrderPriority] = useState<number>(0);
  
  // Safety standards state
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
  
  // Environment pictograms state  
  const [environmentPictograms, setEnvironmentPictograms] = useState<any>({
    dry: false,
    wet: false,
    dust: false,
    chemical: false,
    biological: false,
    oily_grease: false
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Temporary input fields for adding items
  const [newFeature, setNewFeature] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newBrand, setNewBrand] = useState("");
  
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
  const [coverImage, setCoverImage] = useState<ImageUploadState>({ file: null, previewUrl: null });
  const [additionalImage, setAdditionalImage] = useState<ImageUploadState>({ file: null, previewUrl: null });
  const coverInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();
  
  // Document upload refs
  const techSheetEnRef = useRef<HTMLInputElement>(null);
  const techSheetItRef = useRef<HTMLInputElement>(null);
  const declSheetEnRef = useRef<HTMLInputElement>(null);
  const declSheetItRef = useRef<HTMLInputElement>(null);
  const manuInstructionEnRef = useRef<HTMLInputElement>(null);
  const manuInstructionItRef = useRef<HTMLInputElement>(null);
  const [isUploadingDocs, setIsUploadingDocs] = useState(false);
  // DoC JSON locales (EU)
  const [declarationDocLocales, setDeclarationDocLocales] = useState<Array<{ lang: string; url: string }>>([]);
  const docLocaleFileRef = useRef<HTMLInputElement>(null);
  const [newDocLang, setNewDocLang] = useState<string>('');
  const [isUploadingDocLocale, setIsUploadingDocLocale] = useState(false);
  
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

  // Upload document to Supabase storage
  const uploadDocument = async (file: File, type: 'technical' | 'declaration' | 'manufacturers', language: 'en' | 'it'): Promise<string | null> => {
    if (!file) return null;
    
    try {
      setIsUploadingDocs(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}_${type}_${language}.${fileExt}`;
      
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
  
  // Upload DoC JSON language
  const uploadDocLocale = async (file: File, lang: string): Promise<string | null> => {
    if (!file) return null;
    try {
      setIsUploadingDocLocale(true);
      const fileExt = file.name.split('.').pop();
      const safeLang = (lang || 'en').trim();
      const fileName = `${id}_declaration_${safeLang}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('technical-sheets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('technical-sheets').getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (err) {
      console.error('Error uploading DoC locale:', err);
      toast({ title: 'Upload Error', description: 'Failed to upload declaration document', variant: 'destructive' });
      return null;
    } finally {
      setIsUploadingDocLocale(false);
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
        // Update the appropriate state and database
        const updates: Record<string, any> = {};
        
        if (type === 'technical' && language === 'en') {
          setTechnicalSheetUrl(newDocUrl);
          updates.technical_sheet_url = newDocUrl;
        } else if (type === 'technical' && language === 'it') {
          setTechnicalSheetUrlIt(newDocUrl);
          updates.technical_sheet_url_it = newDocUrl;
        } else if (type === 'declaration' && language === 'en') {
          setDeclarationSheetUrl(newDocUrl);
          updates.declaration_sheet_url = newDocUrl;
        } else if (type === 'declaration' && language === 'it') {
          setDeclarationSheetUrlIt(newDocUrl);
          updates.declaration_sheet_url_it = newDocUrl;
        } else if (type === 'manufacturers' && language === 'en') {
          setManufacturersInstructionUrl(newDocUrl);
          updates.manufacturers_instruction_url = newDocUrl;
        } else if (type === 'manufacturers' && language === 'it') {
          setManufacturersInstructionUrlIt(newDocUrl);
          updates.manufacturers_instruction_url_it = newDocUrl;
        }
        
        await updateProduct(id, updates);
        
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
  const removeDocument = async (type: 'technical' | 'declaration' | 'manufacturers', language: 'en' | 'it') => {
    try {
      const updates: Record<string, any> = {};
      
      if (type === 'technical' && language === 'en') {
        setTechnicalSheetUrl(null);
        updates.technical_sheet_url = null;
      } else if (type === 'technical' && language === 'it') {
        setTechnicalSheetUrlIt(null);
        updates.technical_sheet_url_it = null;
      } else if (type === 'declaration' && language === 'en') {
        setDeclarationSheetUrl(null);
        updates.declaration_sheet_url = null;
      } else if (type === 'declaration' && language === 'it') {
        setDeclarationSheetUrlIt(null);
        updates.declaration_sheet_url_it = null;
      } else if (type === 'manufacturers' && language === 'en') {
        setManufacturersInstructionUrl(null);
        updates.manufacturers_instruction_url = null;
      } else if (type === 'manufacturers' && language === 'it') {
        setManufacturersInstructionUrlIt(null);
        updates.manufacturers_instruction_url_it = null;
      }
      
      await updateProduct(id, updates);
      
      toast({
        title: "Success",
        description: "Document removed successfully"
      });
    } catch (error) {
      console.error("Error removing document:", error);
      toast({
        title: "Error",
        description: "Failed to remove document.",
        variant: "destructive"
      });
    }
  };
  
  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const { product } = await getProductById(id);
        if (product) {
          // Set locale-aware fields from JSON locales
          setNameLocales({ 
            en: product.name_locales?.en || product.name || '', 
            it: product.name_locales?.it || '' 
          });
          setDescriptionLocales({ 
            en: product.description_locales?.en || product.description || '', 
            it: product.description_locales?.it || '' 
          });
          setShortDescriptionLocales({ 
            en: product.short_description_locales?.en || product.short_description || '', 
            it: product.short_description_locales?.it || '' 
          });
          setCategoryLocales({ 
            en: product.category_locales?.en || product.category || '', 
            it: product.category_locales?.it || '' 
          });
          setSubCategoryLocales({ 
            en: product.sub_category_locales?.en || product.sub_category || '', 
            it: product.sub_category_locales?.it || '' 
          });
          setFeaturesLocales({ 
            en: product.features_locales?.en || product.features || [], 
            it: product.features_locales?.it || [] 
          });
          setApplicationsLocales({ 
            en: product.applications_locales?.en || product.applications || [], 
            it: product.applications_locales?.it || [] 
          });
          setIndustriesLocales({ 
            en: product.industries_locales?.en || product.industries || [], 
            it: product.industries_locales?.it || [] 
          });
          setMaterialsLocales({ 
            en: product.materials_locales?.en || [], 
            it: product.materials_locales?.it || [] 
          });
          setTagsLocales({ 
            en: product.tags_locales?.en || [], 
            it: product.tags_locales?.it || [] 
          });
          setSizeLocales({ 
            en: product.size_locales?.en || '', 
            it: product.size_locales?.it || '' 
          });

          // Set legacy fields for backwards compatibility
          setName(product.name);
          setDescription(product.description);
          setShortDescription(product.short_description || "");
          setCategory(product.category || "");
          setSubCategory(product.sub_category || "");
          setFeatures(product.features || []);
          setApplications(product.applications || []);
          setIndustries(product.industries || []);
          
          setTemperatureRating(product.temperature_rating ?? null);
          setCutResistanceLevel(product.cut_resistance_level || "");
          setHeatResistanceLevel(product.heat_resistance_level || "");
          setIsFeatured(product.is_featured);
          setIsOutOfStock(product.out_of_stock || false);
          
          // Set new fields
          setPublished(product.published || false);
          setComingSoon(product.coming_soon || false);
          setAvailabilityStatus(product.availability_status || 'in_stock');
          setBrands(product.brands || []);

          // Load EU DoC JSON
          const docs = Array.isArray((product as any).declaration_docs_locales) ? (product as any).declaration_docs_locales : [];
          const eu = docs.filter((d: any) => d && (d.kind === 'eu' || d.kind === 'multi'))
            .flatMap((d: any) => {
              if (d.kind === 'eu') return [{ lang: d.lang, url: d.url }];
              if (Array.isArray(d.langs)) return d.langs.map((l: string) => ({ lang: l, url: d.url }));
              return [];
            });
          const withLegacy = [...eu];
          if (product.declaration_sheet_url && !withLegacy.find(e => e.lang === 'en')) withLegacy.push({ lang: 'en', url: product.declaration_sheet_url });
          if (product.declaration_sheet_url_it && !withLegacy.find(e => e.lang === 'it')) withLegacy.push({ lang: 'it', url: product.declaration_sheet_url_it });
          setDeclarationDocLocales(withLegacy);
          setLengthCm(product.length_cm ?? null);
          setCeCategory(product.ce_category || '');
          setEnStandard(product.en_standard || '');
          setOrderPriority(product.order_priority || 0);

          // Set safety standards
          const defaultSafety = {
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
          };

          setSafety({
            ...defaultSafety,
            ...product.safety,
            en_388: { ...defaultSafety.en_388, ...product.safety?.en_388 },
            en_407: { ...defaultSafety.en_407, ...product.safety?.en_407 },
            en_511: { ...defaultSafety.en_511, ...product.safety?.en_511 },
            en_374_1: { ...defaultSafety.en_374_1, ...product.safety?.en_374_1 }
          });

          // Set environment pictograms
          const defaultEnvironment = {
            dry: false,
            wet: false,
            dust: false,
            chemical: false,
            biological: false,
            oily_grease: false
          };
          
          setEnvironmentPictograms({
            ...defaultEnvironment,
            ...product.environment_pictograms
          });
          
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
          
          if (product.technical_sheet_url_it) {
            setTechnicalSheetUrlIt(product.technical_sheet_url_it);
          }

          if (product.declaration_sheet_url) {
            setDeclarationSheetUrl(product.declaration_sheet_url);
          }

          if (product.declaration_sheet_url_it) {
            setDeclarationSheetUrlIt(product.declaration_sheet_url_it);
          }

          if (product.manufacturers_instruction_url) {
            setManufacturersInstructionUrl(product.manufacturers_instruction_url);
          }

          if (product.manufacturers_instruction_url_it) {
            setManufacturersInstructionUrlIt(product.manufacturers_instruction_url_it);
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
  }, [id, router, currentLanguage]);
  
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
    
    // Check required fields
    if (!nameLocales.en || !descriptionLocales.en) {
      toast({
        title: "Validation Error",
        description: "Please fill in Product Name and Description in English (required fields).",
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
        // Legacy fields (auto-populated from current language)
        name: nameLocales.en, // Always use English for legacy name field
        description: descriptionLocales.en, // Always use English for legacy description field
        short_description: shortDescriptionLocales.en || shortDescriptionLocales.it || '',
        category: categoryLocales.en || categoryLocales.it || '',
        sub_category: subCategoryLocales.en || subCategoryLocales.it || '',
        features: featuresLocales.en.length > 0 ? featuresLocales.en : featuresLocales.it,
        applications: applicationsLocales.en.length > 0 ? applicationsLocales.en : applicationsLocales.it,
        industries: industriesLocales.en.length > 0 ? industriesLocales.en : industriesLocales.it,
        
        // JSON locale fields - only include if they have content
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
        size_locales: (sizeLocales.en || sizeLocales.it) ? sizeLocales : undefined,
        
        // Other fields
        temperature_rating: temperatureRating,
        cut_resistance_level: cutResistanceLevel,
        heat_resistance_level: heatResistanceLevel,
        is_featured: isFeatured,
        out_of_stock: isOutOfStock,
        published: published,
        coming_soon: comingSoon,
        availability_status: availabilityStatus,
        brands: brands,
        length_cm: lengthCm,
        ce_category: ceCategory || undefined,
        en_standard: (enStandard === "EN388" || enStandard === "EN407") ? enStandard as "EN388" | "EN407" : undefined,
        order_priority: orderPriority,
        safety: safety,
        environment_pictograms: environmentPictograms,
        
        // Image fields
        image_url: newImageUrl,
        image2_url: image2Url,
        image3_url: image3Url,
        image4_url: image4Url,
        image5_url: image5Url,
        technical_sheet_url: technicalSheetUrl,
        technical_sheet_url_it: technicalSheetUrlIt,
        declaration_sheet_url: declarationSheetUrl,
        declaration_sheet_url_it: declarationSheetUrlIt,
        
        // Related products
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
    { value: "Hand protection", label: "Hand Protection" }
  ];
  
  const subcategories = [
    { value: "Cut resistant gloves", label: "Cut Resistant Gloves" },
    { value: "Gloves for general use", label: "Gloves for General Use" },
    { value: "Heat resistant gloves", label: "Heat Resistant Gloves" },
    { value: "Mechanical hazards gloves", label: "Mechanical Hazards Gloves" },
    { value: "Welding glove", label: "Welding Glove" }
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
      
      <Tabs defaultValue="information">
        <TabsList className="flex overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide px-1 sm:px-0">
          <TabsTrigger value="information">Product Information</TabsTrigger>
          <TabsTrigger value="content">Features & Content</TabsTrigger>
          <TabsTrigger value="safety">Safety & Standards</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="related">Related Products</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Product Information */}
        <TabsContent value="information" className="space-y-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Information</h2>
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage}
            />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-6">
              {/* Main content area - 4 columns */}
              <div className="md:col-span-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Basic Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Enter product details in {currentLanguage === 'en' ? 'English' : 'Italian'}
                    </CardDescription>
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
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Technical Specifications</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Configure technical specifications and standards.</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="heatResistance" className="text-xs sm:text-sm">Heat Resistance Level</Label>
                        <Input
                          id="heatResistance"
                          placeholder="e.g. Level 5"
                          value={heatResistanceLevel}
                          onChange={(e) => setHeatResistanceLevel(e.target.value)}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
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
                  </CardContent>
                </Card>
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
                          <p className="text-xs text-muted-foreground">
                            Make this product visible on the website.
                          </p>
                        </div>
                        <Switch
                          id="published"
                          checked={published}
                          onCheckedChange={setPublished}
                        />
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
                          <p className="text-xs text-muted-foreground">
                            Mark this product as coming soon.
                          </p>
                        </div>
                        <Switch
                          id="comingSoon"
                          checked={comingSoon}
                          onCheckedChange={setComingSoon}
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="orderPriority">Order Priority</Label>
                        <Input
                          id="orderPriority"
                          type="number"
                          placeholder="0"
                          value={orderPriority}
                          onChange={(e) => setOrderPriority(Number(e.target.value))}
                          className="text-xs sm:text-sm h-8 sm:h-10"
                        />
                        <p className="text-xs text-muted-foreground">
                          Lower numbers appear first in listings.
                        </p>
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
        
        <TabsContent value="content" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Features & Content</h2>
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  Add key features of this product in {currentLanguage === 'en' ? 'English' : 'Italian'}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newFeature.trim()) {
                            setFeaturesLocales({
                              ...featuresLocales,
                              [currentLanguage]: [...featuresLocales[currentLanguage], newFeature.trim()]
                            });
                            setNewFeature("");
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={() => {
                        if (newFeature.trim()) {
                          setFeaturesLocales({
                            ...featuresLocales,
                            [currentLanguage]: [...featuresLocales[currentLanguage], newFeature.trim()]
                          });
                          setNewFeature("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {featuresLocales[currentLanguage].length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No features added yet. Add some to highlight your product's capabilities.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {featuresLocales[currentLanguage].map((feature, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                          <span className="text-sm">{feature}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              const newFeatures = featuresLocales[currentLanguage].filter((_, i) => i !== index);
                              setFeaturesLocales({
                                ...featuresLocales,
                                [currentLanguage]: newFeatures
                              });
                            }}
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
                <CardDescription>
                  Add recommended applications for this product in {currentLanguage === 'en' ? 'English' : 'Italian'}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add an application"
                      value={newApplication}
                      onChange={(e) => setNewApplication(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newApplication.trim()) {
                            setApplicationsLocales({
                              ...applicationsLocales,
                              [currentLanguage]: [...applicationsLocales[currentLanguage], newApplication.trim()]
                            });
                            setNewApplication("");
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={() => {
                        if (newApplication.trim()) {
                          setApplicationsLocales({
                            ...applicationsLocales,
                            [currentLanguage]: [...applicationsLocales[currentLanguage], newApplication.trim()]
                          });
                          setNewApplication("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {applicationsLocales[currentLanguage].length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No applications added yet. Add some to guide customers on proper product usage.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {applicationsLocales[currentLanguage].map((application, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                          <span className="text-sm">{application}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              const newApplications = applicationsLocales[currentLanguage].filter((_, i) => i !== index);
                              setApplicationsLocales({
                                ...applicationsLocales,
                                [currentLanguage]: newApplications
                              });
                            }}
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
                <CardTitle>Industries</CardTitle>
                <CardDescription>
                  Add industries where this product is applicable in {currentLanguage === 'en' ? 'English' : 'Italian'}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add an industry"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newIndustry.trim()) {
                            setIndustriesLocales({
                              ...industriesLocales,
                              [currentLanguage]: [...industriesLocales[currentLanguage], newIndustry.trim()]
                            });
                            setNewIndustry("");
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={() => {
                        if (newIndustry.trim()) {
                          setIndustriesLocales({
                            ...industriesLocales,
                            [currentLanguage]: [...industriesLocales[currentLanguage], newIndustry.trim()]
                          });
                          setNewIndustry("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {industriesLocales[currentLanguage].length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No industries added yet. Add some to help customers identify relevant products.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2 py-2">
                      {industriesLocales[currentLanguage].map((industry, index) => (
                        <div key={index} className="flex items-center border rounded-full px-3 py-1">
                          <Factory className="h-3 w-3 mr-1" />
                          <span className="text-sm">{industry}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => {
                              const newIndustries = industriesLocales[currentLanguage].filter((_, i) => i !== index);
                              setIndustriesLocales({
                                ...industriesLocales,
                                [currentLanguage]: newIndustries
                              });
                            }}
                          >
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
                <CardDescription>
                  Add materials used in this product in {currentLanguage === 'en' ? 'English' : 'Italian'}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a material"
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newMaterial.trim()) {
                            setMaterialsLocales({
                              ...materialsLocales,
                              [currentLanguage]: [...materialsLocales[currentLanguage], newMaterial.trim()]
                            });
                            setNewMaterial("");
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      size="sm" 
                      onClick={() => {
                        if (newMaterial.trim()) {
                          setMaterialsLocales({
                            ...materialsLocales,
                            [currentLanguage]: [...materialsLocales[currentLanguage], newMaterial.trim()]
                          });
                          setNewMaterial("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {materialsLocales[currentLanguage].length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No materials added yet. Add materials to highlight product composition.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2 py-2">
                      {materialsLocales[currentLanguage].map((material, index) => (
                        <div key={index} className="flex items-center border rounded-full px-3 py-1">
                          <Layers className="h-3 w-3 mr-1" />
                          <span className="text-sm">{material}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => {
                              const newMaterials = materialsLocales[currentLanguage].filter((_, i) => i !== index);
                              setMaterialsLocales({
                                ...materialsLocales,
                                [currentLanguage]: newMaterials
                              });
                            }}
                          >
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
                <CardDescription>
                  Add search tags and product metadata in {currentLanguage === 'en' ? 'English' : 'Italian'}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newTag.trim()) {
                              setTagsLocales({
                                ...tagsLocales,
                                [currentLanguage]: [...tagsLocales[currentLanguage], newTag.trim()]
                              });
                              setNewTag("");
                            }
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          if (newTag.trim()) {
                            setTagsLocales({
                              ...tagsLocales,
                              [currentLanguage]: [...tagsLocales[currentLanguage], newTag.trim()]
                            });
                            setNewTag("");
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {tagsLocales[currentLanguage].length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tagsLocales[currentLanguage].map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => {
                                const newTags = tagsLocales[currentLanguage].filter((_, i) => i !== index);
                                setTagsLocales({
                                  ...tagsLocales,
                                  [currentLanguage]: newTags
                                });
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="size">Size Information</Label>
                    <Input
                      id="size"
                      placeholder="e.g., One size, 7-11, etc."
                      value={sizeLocales[currentLanguage]}
                      onChange={(e) => setSizeLocales({ ...sizeLocales, [currentLanguage]: e.target.value })}
                      className="mt-2"
                    />
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
                    <Label htmlFor="brands">Brands</Label>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Add a brand"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newBrand.trim() && !brands.includes(newBrand.trim())) {
                              setBrands([...brands, newBrand.trim()]);
                              setNewBrand("");
                            }
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          if (newBrand.trim() && !brands.includes(newBrand.trim())) {
                            setBrands([...brands, newBrand.trim()]);
                            setNewBrand("");
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {brands.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {brands.map((brand, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {brand}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => {
                                setBrands(brands.filter((_, i) => i !== index));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lengthCm">Length (cm)</Label>
                    <Input
                      id="lengthCm"
                      type="number"
                      placeholder="e.g., 27"
                      value={lengthCm === null ? "" : lengthCm}
                      onChange={(e) => setLengthCm(e.target.value === "" ? null : Number(e.target.value))}
                      className="mt-2"
                    />
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
                        <p className="text-xs text-muted-foreground">
                          Abrasion, cut, tear, puncture, ISO 13997, impact EN 13594
                        </p>
                      </div>
                      <Switch
                        id="en_388"
                        checked={safety.en_388.enabled}
                        onCheckedChange={(value) => setSafety({ ...safety, en_388: { ...safety.en_388, enabled: value } })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_407">EN 407</Label>
                        <p className="text-xs text-muted-foreground">
                          Contact heat, convective heat, radiant heat, limited flame spread, small splashes molten metal, large quantities molten metal
                        </p>
                      </div>
                      <Switch
                        id="en_407"
                        checked={safety.en_407.enabled}
                        onCheckedChange={(value) => setSafety({ ...safety, en_407: { ...safety.en_407, enabled: value } })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_421">EN 421</Label>
                        <p className="text-xs text-muted-foreground">
                          Contact cold, convective cold, water permeability
                        </p>
                      </div>
                      <Switch
                        id="en_421"
                        checked={safety.en_421}
                        onCheckedChange={(value) => setSafety({ ...safety, en_421: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_511">EN 511</Label>
                        <p className="text-xs text-muted-foreground">
                          Contact cold, convective cold, water permeability
                        </p>
                      </div>
                      <Switch
                        id="en_511"
                        checked={safety.en_511.enabled}
                        onCheckedChange={(value) => setSafety({ ...safety, en_511: { ...safety.en_511, enabled: value } })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_659">EN 659</Label>
                        <p className="text-xs text-muted-foreground">
                          Food grade, EN ISO 21420, ionising radiation, radioactive contamination
                        </p>
                      </div>
                      <Switch
                        id="en_659"
                        checked={safety.en_659}
                        onCheckedChange={(value) => setSafety({ ...safety, en_659: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_12477">EN 12477</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_12477"
                        checked={safety.en_12477}
                        onCheckedChange={(value) => setSafety({ ...safety, en_12477: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_16350">EN 16350</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_16350"
                        checked={safety.en_16350}
                        onCheckedChange={(value) => setSafety({ ...safety, en_16350: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_374_1">EN 374-1</Label>
                        <p className="text-xs text-muted-foreground">
                          Type, chemicals tested
                        </p>
                      </div>
                      <Switch
                        id="en_374_1"
                        checked={safety.en_374_1.enabled}
                        onCheckedChange={(value) => setSafety({ ...safety, en_374_1: { ...safety.en_374_1, enabled: value } })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_374_5">EN 374-5</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_374_5"
                        checked={safety.en_374_5}
                        onCheckedChange={(value) => setSafety({ ...safety, en_374_5: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_381_7">EN 381-7</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_381_7"
                        checked={safety.en_381_7}
                        onCheckedChange={(value) => setSafety({ ...safety, en_381_7: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_60903">EN 60903</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_60903"
                        checked={safety.en_60903}
                        onCheckedChange={(value) => setSafety({ ...safety, en_60903: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_1082_1">EN 1082-1</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_1082_1"
                        checked={safety.en_1082_1}
                        onCheckedChange={(value) => setSafety({ ...safety, en_1082_1: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="food_grade">Food Grade</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="food_grade"
                        checked={safety.food_grade}
                        onCheckedChange={(value) => setSafety({ ...safety, food_grade: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="en_iso_21420">EN ISO 21420</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="en_iso_21420"
                        checked={safety.en_iso_21420}
                        onCheckedChange={(value) => setSafety({ ...safety, en_iso_21420: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ionising_radiation">Ionising Radiation</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="ionising_radiation"
                        checked={safety.ionising_radiation}
                        onCheckedChange={(value) => setSafety({ ...safety, ionising_radiation: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="radioactive_contamination">Radioactive Contamination</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="radioactive_contamination"
                        checked={safety.radioactive_contamination}
                        onCheckedChange={(value) => setSafety({ ...safety, radioactive_contamination: value })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="environmentPictograms">Environment Pictograms</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dry">Dry</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="dry"
                        checked={environmentPictograms.dry}
                        onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, dry: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="wet">Wet</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="wet"
                        checked={environmentPictograms.wet}
                        onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, wet: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dust">Dust</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="dust"
                        checked={environmentPictograms.dust}
                        onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, dust: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="chemical">Chemical</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="chemical"
                        checked={environmentPictograms.chemical}
                        onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, chemical: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="biological">Biological</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="biological"
                        checked={environmentPictograms.biological}
                        onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, biological: value })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="oily_grease">Oily Grease</Label>
                        <p className="text-xs text-muted-foreground">
                          Not applicable
                        </p>
                      </div>
                      <Switch
                        id="oily_grease"
                        checked={environmentPictograms.oily_grease}
                        onCheckedChange={(value) => setEnvironmentPictograms({ ...environmentPictograms, oily_grease: value })}
                      />
                    </div>
                  </div>
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
        
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Documentation</CardTitle>
              <CardDescription>Upload technical sheets, declaration documents, and manufacturers instructions for this product.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Declarations of Conformity (EU) JSON */}
                <div className="space-y-4">
                  <Label>Declarations of Conformity (EU)</Label>
                  <div className="rounded-md border p-4 bg-gray-50 dark:bg-gray-800 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {declarationDocLocales.map((d, idx) => (
                        <Badge key={idx} variant="outline" className="flex items-center gap-2">
                          <span>{d.lang}</span>
                          <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Download</a>
                          <Button type="button" variant="ghost" size="sm" onClick={async () => {
                            const next = declarationDocLocales.filter((_, i) => i !== idx);
                            setDeclarationDocLocales(next);
                            await updateProduct(id, { declaration_docs_locales: next.map(x => ({ lang: x.lang, kind: 'eu', url: x.url })) });
                          }}>Remove</Button>
                        </Badge>
                      ))}
                      {declarationDocLocales.length === 0 && (
                        <p className="text-sm text-muted-foreground">No EU DoC uploaded yet.</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Input placeholder="Language code (e.g. en, it, es)" className="w-48" value={newDocLang} onChange={(e) => setNewDocLang(e.target.value)} />
                      <input ref={docLocaleFileRef} type="file" accept=".pdf" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || !newDocLang) return;
                        const url = await uploadDocLocale(file, newDocLang);
                        if (url) {
                          const next = [...declarationDocLocales, { lang: newDocLang.trim(), url }];
                          setDeclarationDocLocales(next);
                          await updateProduct(id, { declaration_docs_locales: next.map(x => ({ lang: x.lang, kind: 'eu', url: x.url })) });
                          setNewDocLang('');
                        }
                        if (docLocaleFileRef.current) docLocaleFileRef.current.value = '';
                      }} />
                      <Button type="button" variant="outline" onClick={() => docLocaleFileRef.current?.click()} disabled={!newDocLang || isUploadingDocLocale}>
                        {isUploadingDocLocale ? 'Uploading...' : 'Add Language + Upload PDF'}
                      </Button>
                    </div>
                  </div>
                </div>
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
              &quot;{nameLocales[currentLanguage]}&quot; and remove it from our servers.
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