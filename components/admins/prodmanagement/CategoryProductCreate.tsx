"use client";

import React, { useRef, useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Upload, X, Plus, Tag, ArrowLeft } from "lucide-react";
import { uploadProductImage, EnvironmentPictograms } from "@/lib/products-service";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CLOTHING_TYPE_TO_CATEGORIES } from "@/content/clothing-categories";
import { BrandSelector } from "@/components/admins/brand-selector";
import { Brand, getAllBrands } from "@/lib/brands-service";
import { WorkEnvironmentSuitabilityEditor } from "@/components/admins/work-environment-suitability-editor";
import { ProductImagesEditor } from "@/components/admins/product-images-editor";
import { GlovesSafetyStandardsEditor } from "@/components/admins/gloves-safety-standards-editor";
import { HeadSafetyStandardsEditor } from "@/components/admins/head-safety-standards-editor";
import { FootwearSafetyStandardsEditor } from "@/components/admins/footwear-safety-standards-editor";
import { ArmSafetyStandardsEditor } from "@/components/admins/arm-safety-standards-editor";
import { HearingSafetyStandardsEditor } from "@/components/admins/hearing-safety-standards-editor";

interface Props { slug: string; }

export default function CategoryProductCreate({ slug }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState<'en' | 'it'>('en');
  const supabase = createClientComponentClient();

  // Reuse same shapes as editor, start with empty defaults
  const [nameLocales, setNameLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [shortDescriptionLocales, setShortDescriptionLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [descriptionLocales, setDescriptionLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [categoryLocales, setCategoryLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [subCategoryLocales, setSubCategoryLocales] = useState<{en: string, it: string}>({en: '', it: ''});
  const [featuresLocales, setFeaturesLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [applicationsLocales, setApplicationsLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [industriesLocales, setIndustriesLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [materialsLocales, setMaterialsLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [tagsLocales, setTagsLocales] = useState<{en: string[], it: string[]}>({en: [], it: []});
  const [sizeLocales, setSizeLocales] = useState<{en: string, it: string}>({en: '', it: ''});

  const [temperatureRating, setTemperatureRating] = useState<number | null>(null);
  const [cutResistanceLevel, setCutResistanceLevel] = useState<string>('');
  const [heatResistanceLevel, setHeatResistanceLevel] = useState<string>('');
  const [published, setPublished] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'in_stock' | 'out_of_stock' | 'coming_soon' | 'made_to_order'>('in_stock');
  const [brands, setBrands] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<Brand[]>([]);
  const [orderPriority, setOrderPriority] = useState<number>(0);
  // Swabs generic specs
  const [lengthCm, setLengthCm] = useState<number | null>(null);
  const [ceCategory, setCeCategory] = useState<string>('');
  const [enStandard, setEnStandard] = useState<string>('');
  const [environmentPictograms, setEnvironmentPictograms] = useState<EnvironmentPictograms>({
    dry: false,
    wet: false,
    dust: false,
    chemical: false,
    biological: false,
    oily_grease: false
  });

  // Images
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image2Url, setImage2Url] = useState<string | null>(null);
  const [image3Url, setImage3Url] = useState<string | null>(null);
  const [image4Url, setImage4Url] = useState<string | null>(null);
  const [image5Url, setImage5Url] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [technicalSheetUrl, setTechnicalSheetUrl] = useState<string | null>(null);
  const [technicalSheetUrlIt, setTechnicalSheetUrlIt] = useState<string | null>(null);
  const [declarationSheetUrl, setDeclarationSheetUrl] = useState<string | null>(null);
  const [declarationSheetUrlIt, setDeclarationSheetUrlIt] = useState<string | null>(null);
  const [isUploadingDocs, setIsUploadingDocs] = useState(false);

  // Category-specific minimal defaults (match editor)
  const [eyeFaceAttributes, setEyeFaceAttributes] = useState<any>({ has_ir: false, has_uv: false, has_arc: false, uv_code: '', lens_tint: '', coatings: [] });
  const [eyeFaceStandards, setEyeFaceStandards] = useState<any>({ en166: { optical_class: '', mechanical_strength: '', frame_mark: '', lens_mark: '', additional_marking: '' }, en169: false, en170: false, en172: false, en175: false, gs_et_29: false });
  const [eyeFaceComfortFeatures, setEyeFaceComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [eyeFaceEquipment, setEyeFaceEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingStandards, setHearingStandards] = useState<any>({ en352: { parts: [], snr_db: null, hml: { h: null, m: null, l: null }, additional: [] } });
  const [hearingAttributes, setHearingAttributes] = useState<any>({ reusable: null, mount: '', bluetooth: null, compatible_with: [], accessories: [], materials: [], size: '', ce_category: '', water_resistance: null, extreme_temperature: null, electrical_insulation: null });
  const [hearingComfortFeatures, setHearingComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingOtherDetails, setHearingOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingEquipment, setHearingEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respiratoryComfortFeatures, setRespiratoryComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respiratoryOtherDetails, setRespiratoryOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respiratoryEquipment, setRespiratoryEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [footwearStandards, setFootwearStandards] = useState<any>({ en_iso_20345_2011: [], en_iso_20345_2022: [], slip_resistance: '' });
  const [footwearAttributes, setFootwearAttributes] = useState<any>({ class: '', esd: null, metal_free: null, width_fit: [], size_min: null, size_max: null, gender: '', weight_grams: null, weight_ref_size: null, special: [], toe_cap: '', sole_material: '' });
  const [footwearComfortFeatures, setFootwearComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headStandards, setHeadStandards] = useState<any>({ en397: { present: false, optional: { low_temperature: false, molten_metal: false } }, en50365: false, en12492: false, en812: false });
  const [headComfortFeatures, setHeadComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headOtherDetails, setHeadOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headEquipment, setHeadEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headAttributes, setHeadAttributes] = useState<any>({ form_factor: '', brim_length: '', size_min_cm: null, size_max_cm: null, weight_g: null, colours: [], ventilation: null, harness_points: null, chinstrap_points: null, sweatband: null, closed_shell: null, euroslot_mm: null, accessories: [] });
  const [clothingStandards, setClothingStandards] = useState<any>({ en_iso_20471: { class: null }, en_iso_11612: {}, iec_61482_2: { class: null }, en_1149_5: false });
  const [clothingAttributes, setClothingAttributes] = useState<any>({ fit: '', gender: '', size_range: '', colours: [], uv_protection: null });
  const [clothingType, setClothingType] = useState<string>('');
  const [clothingCategory, setClothingCategory] = useState<string>('');
  const [armAttributes, setArmAttributes] = useState<any>({ thumb_loop: null, closure: '', materials: [], size: '', length_cm: null, ce_category: '' });
  // Gloves safety JSON for create
  const defaultSafety: any = { en_388: { enabled: false, abrasion: null, cut: null, tear: null, puncture: null, iso_13997: null, impact_en_13594: null }, en_407: { enabled: false, contact_heat: null, radiant_heat: null, convective_heat: null, limited_flame_spread: null, small_splashes_molten_metal: null, large_quantities_molten_metal: null }, en_511: { enabled: false, contact_cold: null, convective_cold: null, water_permeability: null } };
  const [safety, setSafety] = useState<any>(defaultSafety);
  const [respiratoryStandards, setRespiratoryStandards] = useState<any>({ en149: { enabled: false, class: '', r: false, nr: false, d: false }, en14387: { enabled: false, class: '', gases: {} }, en143: { enabled: false, class: '', r: false, nr: false }, en136: { enabled: false, class: '' }, en140: { enabled: false }, en166: { enabled: false, class: '' }, din_3181_3: { enabled: false } });
  const [respConnections, setRespConnections] = useState<string[]>([]);
  const [respFilterType, setRespFilterType] = useState<string>('');
  const [respProtectionClass, setRespProtectionClass] = useState<string>('');
  const [respProtectionCodes, setRespProtectionCodes] = useState<string[]>([]);
  const [respCompatibleWith, setRespCompatibleWith] = useState<string[]>([]);
  const [padEnDiameter, setPadEnDiameter] = useState<number | ''>('');
  const [padEnLength, setPadEnLength] = useState<number | ''>('');
  const [padItDiameter, setPadItDiameter] = useState<number | ''>('');
  const [padItLength, setPadItLength] = useState<number | ''>('');
  const [clothingComfortFeatures, setClothingComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [clothingOtherDetails, setClothingOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });

  // Load available brands
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brands = await getAllBrands();
        setAvailableBrands(brands);
      } catch (error) {
        console.error('Failed to load brands:', error);
        toast({
          title: "Error loading brands",
          description: "Failed to load available brands",
          variant: "destructive",
        });
      }
    };
    loadBrands();
  }, []);

  // Prefill and lock category
  const categoryMap: Record<string, { en: string; it: string }> = {
    gloves: { en: 'Hand protection', it: 'Protezione delle mani' },
    'industrial-swabs': { en: 'Industrial Swabs', it: 'Tamponi industriali' },
    respiratory: { en: 'Respiratory Protection', it: 'Protezione respiratoria' },
    hearing: { en: 'Hearing Protection', it: "Protezione dell'udito" },
    footwear: { en: 'Safety Footwear', it: 'Calzature di sicurezza' },
    'eye-face': { en: 'Eye & Face protection', it: 'Protezione occhi e viso' },
    head: { en: 'Head protection', it: 'Protezione della testa' },
    clothing: { en: 'Protective Clothing', it: 'Abbigliamento protettivo' },
    'arm-protection': { en: 'Arm protection', it: 'Protezione braccia' },
  };
  React.useEffect(() => {
    const labels = categoryMap[slug] || { en: slug, it: slug };
    setCategoryLocales(labels);
  }, [slug]);

  async function uploadPdfToBucket(file: File, prefix: string) {
    try {
      setIsUploadingDocs(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${prefix}_${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('technical-sheets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('technical-sheets').getPublicUrl(fileName);
      return data.publicUrl as string;
    } catch (e) {
      console.error(e);
      toast({ title: 'Upload Error', description: 'Failed to upload document', variant: 'destructive' });
      return null;
    } finally {
      setIsUploadingDocs(false);
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      if (!nameLocales.en) {
        toast({ title: 'Validation', description: 'Please enter the English name', variant: 'destructive' });
        return;
      }
      const payload: any = {
        name: nameLocales.en,
        description: descriptionLocales.en || '',
        short_description: shortDescriptionLocales.en || '',
        category: categoryLocales.en || (categoryMap[slug]?.en || slug),
        sub_category: subCategoryLocales.en || '',
        name_locales: nameLocales,
        description_locales: descriptionLocales,
        short_description_locales: shortDescriptionLocales,
        category_locales: categoryLocales,
        sub_category_locales: subCategoryLocales,
        features_locales: featuresLocales,
        applications_locales: applicationsLocales,
        industries_locales: industriesLocales,
        materials_locales: materialsLocales,
        tags_locales: tagsLocales,
        size_locales: sizeLocales,
        temperature_rating: temperatureRating,
        cut_resistance_level: cutResistanceLevel,
        heat_resistance_level: heatResistanceLevel,
        length_cm: (slug==='industrial-swabs' || slug==='gloves') ? (lengthCm ?? null) : undefined,
        ce_category: (slug==='industrial-swabs' || slug==='gloves') ? (ceCategory || null) : undefined,
        en_standard: slug==='industrial-swabs' ? (enStandard || null) : undefined,
        technical_sheet_url: technicalSheetUrl,
        technical_sheet_url_it: technicalSheetUrlIt,
        declaration_sheet_url: declarationSheetUrl,
        declaration_sheet_url_it: declarationSheetUrlIt,
        published,
        is_featured: isFeatured,
        out_of_stock: outOfStock,
        availability_status: availabilityStatus,
        brands,
        environment_pictograms: environmentPictograms,
        order_priority: orderPriority,
        image_url: imageUrl,
        image2_url: image2Url,
        image3_url: image3Url,
        image4_url: image4Url,
        image5_url: image5Url,
        // Category-specific
        safety: slug==='gloves' ? safety : undefined,
        footwear_standards: slug==='footwear' ? footwearStandards : undefined,
        footwear_attributes: slug==='footwear' ? footwearAttributes : undefined,
        footwear_comfort_features_locales: slug==='footwear' ? footwearComfortFeatures : undefined,
        eye_face_attributes: slug==='eye-face' ? eyeFaceAttributes : undefined,
        eye_face_standards: slug==='eye-face' ? eyeFaceStandards : undefined,
        hearing_standards: slug==='hearing' ? hearingStandards : undefined,
        hearing_attributes: slug==='hearing' ? hearingAttributes : undefined,
        hearing_comfort_features_locales: slug === 'hearing' ? hearingComfortFeatures : undefined,
        hearing_other_details_locales: slug === 'hearing' ? hearingOtherDetails : undefined,
        hearing_equipment_locales: slug === 'hearing' ? hearingEquipment : undefined,
        respiratory_comfort_features_locales: slug === 'respiratory' ? respiratoryComfortFeatures : undefined,
        respiratory_other_details_locales: slug === 'respiratory' ? respiratoryOtherDetails : undefined,
        respiratory_equipment_locales: slug === 'respiratory' ? respiratoryEquipment : undefined,
        head_standards: slug==='head' ? headStandards : undefined,
        head_attributes: slug==='head' ? headAttributes : undefined,
        head_other_details_locales: slug==='head' ? headOtherDetails : undefined,
        head_equipment_locales: slug==='head' ? headEquipment : undefined,
        head_comfort_features_locales: slug==='head' ? headComfortFeatures : undefined,
        clothing_standards: slug==='clothing' ? clothingStandards : undefined,
        clothing_attributes: slug==='clothing' ? clothingAttributes : undefined,
        clothing_type: slug==='clothing' ? (clothingType || null) : undefined,
        clothing_category: slug==='clothing' ? (clothingCategory || null) : undefined,
        clothing_comfort_features_locales: slug === 'clothing' ? clothingComfortFeatures : undefined,
        clothing_other_details_locales: slug === 'clothing' ? clothingOtherDetails : undefined,
        arm_attributes: slug==='arm-protection' ? armAttributes : undefined,
        eye_face_comfort_features_locales: slug==='eye-face' ? eyeFaceComfortFeatures : undefined,
        eye_face_equipment_locales: slug==='eye-face' ? eyeFaceEquipment : undefined,
        respiratory_standards: slug==='respiratory' ? respiratoryStandards : undefined,
        connections: slug==='respiratory' ? respConnections : undefined,
        filter_type: slug==='respiratory' ? (respFilterType || null) : undefined,
        protection_class: slug==='respiratory' ? (respProtectionClass || null) : undefined,
        protection_codes: slug==='respiratory' ? respProtectionCodes : undefined,
        compatible_with: slug==='respiratory' ? respCompatibleWith : undefined,
        pad_size_json: slug==='industrial-swabs' ? ((): any => {
          const en = { diameter_mm: typeof padEnDiameter === 'number' ? padEnDiameter : undefined, length_mm: typeof padEnLength === 'number' ? padEnLength : undefined };
          const it = { diametro_mm: typeof padItDiameter === 'number' ? padItDiameter : undefined, lunghezza_mm: typeof padItLength === 'number' ? padItLength : undefined };
          const hasEn = typeof en.diameter_mm === 'number' || typeof en.length_mm === 'number';
          const hasIt = typeof it.diametro_mm === 'number' || typeof it.lunghezza_mm === 'number';
          if (!hasEn && !hasIt) return undefined;
          return { ...(hasEn ? { en } : {}), ...(hasIt ? { it } : {}) };
        })() : undefined,
      };

      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json?.product) {
        throw new Error(json?.error?.message || 'Create failed');
      }
      const product = json.product;
      toast({ title: 'Created', description: 'Product created successfully.' });
      router.push(`/admin/prod-management/${slug}/${product.id}`);
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Failed to create product.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" asChild className="mr-2">
          <Link href={`/admin/prod-management/${slug}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant={language==='en' ? 'default' : 'outline'} size="sm" onClick={()=> setLanguage('en')}>English</Button>
          <Button variant={language==='it' ? 'default' : 'outline'} size="sm" onClick={()=> setLanguage('it')}>Italiano</Button>
        </div>
      </div>

      <Tabs defaultValue="information">
        <TabsList className="flex overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide px-1 sm:px-0">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="safety">Safety & Specs</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-6">
            <div className="md:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Basic Information</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Enter product details in the selected language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2"><Label>Product Name</Label><Input value={nameLocales[language]} onChange={(e)=> setNameLocales({ ...nameLocales, [language]: e.target.value })} /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>Short Description</Label><Input value={shortDescriptionLocales[language]} onChange={(e)=> setShortDescriptionLocales({ ...shortDescriptionLocales, [language]: e.target.value })} /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>Full Description</Label><Textarea rows={4} value={descriptionLocales[language]} onChange={(e)=> setDescriptionLocales({ ...descriptionLocales, [language]: e.target.value })} /></div>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div className="space-y-1 sm:space-y-2"><Label>Category</Label><Input value={categoryLocales[language]} disabled /></div>
                      <div className="space-y-1 sm:space-y-2"><Label>Sub-Category</Label><Input value={subCategoryLocales[language]} onChange={(e)=> setSubCategoryLocales({ ...subCategoryLocales, [language]: e.target.value })} /></div>
                    </div>
                    
                    {/* Brand Selection */}
                    <div className="space-y-1 sm:space-y-2">
                      <BrandSelector
                        selectedBrands={brands}
                        onBrandsChange={setBrands}
                        availableBrands={availableBrands}
                        onNewBrand={(newBrand) => {
                          setAvailableBrands([...availableBrands, newBrand]);
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Technical Specifications</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Configure technical specifications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    <div className="space-y-1 sm:space-y-2"><Label>Temperature Rating (°C)</Label><Input type="number" value={temperatureRating === null ? '' : temperatureRating} onChange={(e)=> setTemperatureRating(e.target.value === '' ? null : Number(e.target.value))} /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>Cut Resistance Level</Label><Input value={cutResistanceLevel} onChange={(e)=> setCutResistanceLevel(e.target.value)} /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>Heat Resistance Level</Label><Input value={heatResistanceLevel} onChange={(e)=> setHeatResistanceLevel(e.target.value)} /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>Length (cm)</Label><Input type="number" value={lengthCm === null ? '' : lengthCm} onChange={(e)=> setLengthCm(e.target.value === '' ? null : Number(e.target.value))} /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>Size</Label><Input value={sizeLocales.en} onChange={(e)=> setSizeLocales({...sizeLocales, en: e.target.value})} placeholder="e.g. One size, S, M, L, XL" /></div>
                    <div className="space-y-1 sm:space-y-2"><Label>CE Category</Label><Input value={ceCategory} onChange={(e)=> setCeCategory(e.target.value)} placeholder="e.g. I, II, III" /></div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Environment Suitability - only for gloves, arm, and swabs */}
              {(slug === 'gloves' || slug === 'arm' || slug === 'industrial-swabs') && (
                <WorkEnvironmentSuitabilityEditor
                  environmentPictograms={environmentPictograms}
                  onEnvironmentChange={setEnvironmentPictograms}
                />
              )}
            </div>
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                  <CardDescription>Configure visibility and status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Published</Label><p className="text-xs text-muted-foreground">Visible on the website</p></div><Switch checked={published} onCheckedChange={setPublished} /></div>
                    <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Featured</Label><p className="text-xs text-muted-foreground">Show in featured sections</p></div><Switch checked={isFeatured} onCheckedChange={setIsFeatured} /></div>
                    <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Out of stock</Label><p className="text-xs text-muted-foreground">Temporarily unavailable</p></div><Switch checked={outOfStock} onCheckedChange={setOutOfStock} /></div>
                    <div className="space-y-2"><Label>Availability Status</Label><Select value={availabilityStatus} onValueChange={(v:any)=> setAvailabilityStatus(v)}><SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger><SelectContent><SelectItem value="in_stock">In Stock</SelectItem><SelectItem value="out_of_stock">Out of Stock</SelectItem><SelectItem value="coming_soon">Coming Soon</SelectItem><SelectItem value="made_to_order">Made to Order</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label>Order Priority</Label><Input type="number" value={orderPriority} onChange={(e)=> setOrderPriority(Number(e.target.value))} /><p className="text-xs text-muted-foreground">Lower numbers appear first.</p></div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between"><Button variant="outline" type="button" asChild><Link href={`/admin/prod-management/${slug}`}>Cancel</Link></Button><Button onClick={handleSave} disabled={saving}>{saving ? 'Creating…' : 'Create Product'}</Button></CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Content & Lists</CardTitle><CardDescription>Features, applications, industries, materials, tags, size.</CardDescription></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LocaleListEditor title="Features" items={featuresLocales[language]} onAdd={(val)=> setFeaturesLocales({ ...featuresLocales, [language]: [...featuresLocales[language], val] })} onRemove={(idx)=> setFeaturesLocales({ ...featuresLocales, [language]: featuresLocales[language].filter((_,i)=> i!==idx) })} />
                <LocaleListEditor title="Applications" items={applicationsLocales[language]} onAdd={(val)=> setApplicationsLocales({ ...applicationsLocales, [language]: [...applicationsLocales[language], val] })} onRemove={(idx)=> setApplicationsLocales({ ...applicationsLocales, [language]: applicationsLocales[language].filter((_,i)=> i!==idx) })} />
                <LocaleListEditor title="Industries" items={industriesLocales[language]} onAdd={(val)=> setIndustriesLocales({ ...industriesLocales, [language]: [...industriesLocales[language], val] })} onRemove={(idx)=> setIndustriesLocales({ ...industriesLocales, [language]: industriesLocales[language].filter((_,i)=> i!==idx) })} />
                <LocaleListEditor title="Materials" items={materialsLocales[language]} onAdd={(val)=> setMaterialsLocales({ ...materialsLocales, [language]: [...materialsLocales[language], val] })} onRemove={(idx)=> setMaterialsLocales({ ...materialsLocales, [language]: materialsLocales[language].filter((_,i)=> i!==idx) })} />
                <LocaleListEditor title="Tags" items={tagsLocales[language]} onAdd={(val)=> setTagsLocales({ ...tagsLocales, [language]: [...tagsLocales[language], val] })} onRemove={(idx)=> setTagsLocales({ ...tagsLocales, [language]: tagsLocales[language].filter((_,i)=> i!==idx) })} icon />
                <div><Label>Size Info</Label><Input className="mt-2" value={sizeLocales[language]} onChange={(e)=> setSizeLocales({ ...sizeLocales, [language]: e.target.value })} /></div>
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Creating…' : 'Create Product'}</Button></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <ProductImagesEditor
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            image2Url={image2Url}
            setImage2Url={setImage2Url}
            image3Url={image3Url}
            setImage3Url={setImage3Url}
            image4Url={image4Url}
            setImage4Url={setImage4Url}
            image5Url={image5Url}
            setImage5Url={setImage5Url}
            productId="temp"
          />
          <div className="mt-4">
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Creating…' : 'Create Product'}
            </Button>
                </div>
        </TabsContent>

        <TabsContent value="safety" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Safety & Specifications</CardTitle><CardDescription>Category-specific attributes and standards</CardDescription></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Fill fields relevant to this product category.</p>
              {/* Swabs safety & specs */}
              {slug === 'industrial-swabs' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="font-medium">Pad size (EN)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label>Diameter (mm)</Label>
                          <Input type="number" value={padEnDiameter} onChange={(e)=> setPadEnDiameter(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                        <div className="space-y-1">
                          <Label>Length (mm)</Label>
                          <Input type="number" value={padEnLength} onChange={(e)=> setPadEnLength(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="font-medium">Dimensioni tampone (IT)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label>Diametro (mm)</Label>
                          <Input type="number" value={padItDiameter} onChange={(e)=> setPadItDiameter(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                        <div className="space-y-1">
                          <Label>Lunghezza (mm)</Label>
                          <Input type="number" value={padItLength} onChange={(e)=> setPadItLength(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1"><Label>Length (cm)</Label><Input type="number" value={lengthCm ?? ''} onChange={(e)=> setLengthCm(e.target.value === '' ? null : Number(e.target.value))} /></div>
                    <div className="space-y-1"><Label>CE Category</Label><Input value={ceCategory} onChange={(e)=> setCeCategory(e.target.value)} placeholder="e.g. I, II, III" /></div>
                    <div className="space-y-1"><Label>EN Standard</Label><Input value={enStandard} onChange={(e)=> setEnStandard(e.target.value)} placeholder="e.g. EN ISO 21420" /></div>
                  </div>
                </div>
              )}
              {slug === 'gloves' && (
                <GlovesSafetyStandardsEditor 
                  safety={safety} 
                  setSafety={setSafety} 
                />
              )}
              {slug === 'hearing' && (
                <HearingSafetyStandardsEditor 
                  hearingStandards={hearingStandards}
                  setHearingStandards={setHearingStandards}
                  hearingAttributes={hearingAttributes}
                  setHearingAttributes={setHearingAttributes}
                  hearingComfortFeatures={hearingComfortFeatures}
                  setHearingComfortFeatures={setHearingComfortFeatures}
                  hearingOtherDetails={hearingOtherDetails}
                  setHearingOtherDetails={setHearingOtherDetails}
                  hearingEquipment={hearingEquipment}
                  setHearingEquipment={setHearingEquipment}
                />
              )}
              {slug === 'respiratory' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><Label>Connections (comma separated)</Label><Input value={respConnections.join(', ')} onChange={(e)=> setRespConnections(e.target.value.split(',').map(s=> s.trim()).filter(Boolean))} /></div>
                    <div className="space-y-1"><Label>Filter type</Label><Input value={respFilterType} onChange={(e)=> setRespFilterType(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Protection class</Label><Input value={respProtectionClass} onChange={(e)=> setRespProtectionClass(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Protection codes (comma separated)</Label><Input value={respProtectionCodes.join(', ')} onChange={(e)=> setRespProtectionCodes(e.target.value.split(',').map(s=> s.trim()).filter(Boolean))} /></div>
                    <div className="space-y-1 md:col-span-2"><Label>Compatible with (comma separated)</Label><Input value={respCompatibleWith.join(', ')} onChange={(e)=> setRespCompatibleWith(e.target.value.split(',').map(s=> s.trim()).filter(Boolean))} /></div>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-medium">Standards</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en149?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en149: { ...(respiratoryStandards.en149||{}), enabled: !!v } })} /><span>EN 149</span></div><Input placeholder="Class e.g. FFP3" value={respiratoryStandards.en149?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en149: { ...(respiratoryStandards.en149||{}), class: e.target.value } })} /></div>
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en143?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en143: { ...(respiratoryStandards.en143||{}), enabled: !!v } })} /><span>EN 143</span></div><Input placeholder="Class e.g. P3" value={respiratoryStandards.en143?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en143: { ...(respiratoryStandards.en143||{}), class: e.target.value } })} /></div>
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en14387?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en14387: { ...(respiratoryStandards.en14387||{}), enabled: !!v } })} /><span>EN 14387</span></div><Input placeholder="Class e.g. A2B2E2K2" value={respiratoryStandards.en14387?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en14387: { ...(respiratoryStandards.en14387||{}), class: e.target.value, gases: respiratoryStandards.en14387?.gases || {} } })} /></div>
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en136?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en136: { ...(respiratoryStandards.en136||{}), enabled: !!v } })} /><span>EN 136</span></div><Input placeholder="Class" value={respiratoryStandards.en136?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en136: { ...(respiratoryStandards.en136||{}), class: e.target.value } })} /></div>
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en166?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en166: { ...(respiratoryStandards.en166||{}), enabled: !!v } })} /><span>EN 166</span></div><Input placeholder="Class" value={respiratoryStandards.en166?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en166: { ...(respiratoryStandards.en166||{}), class: e.target.value } })} /></div>
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en140?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en140: { ...(respiratoryStandards.en140||{}), enabled: !!v } })} /><span>EN 140</span></div></div>
                      <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.din_3181_3?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, din_3181_3: { ...(respiratoryStandards.din_3181_3||{}), enabled: !!v } })} /><span>DIN 3181-3</span></div></div>
                    </div>
                    <div className="space-y-1"><Label>EN 14387 gases (comma separated codes, e.g. A,B,E,K)</Label><Input value={Object.keys(respiratoryStandards.en14387?.gases || {}).filter((k)=> respiratoryStandards.en14387?.gases?.[k]).join(', ')} onChange={(e)=> { const obj: any = {}; e.target.value.split(',').map(s=> s.trim().toUpperCase()).filter(Boolean).forEach((k)=> obj[k] = true); setRespiratoryStandards({ ...respiratoryStandards, en14387: { ...(respiratoryStandards.en14387||{}), gases: obj } }); }} /></div>
                  </div>
                  <div className="space-y-3">
                    <LocaleListEditor 
                      title="Comfort features" 
                      items={respiratoryComfortFeatures[language]} 
                      onAdd={(val) => setRespiratoryComfortFeatures({ ...respiratoryComfortFeatures, [language]: [...(respiratoryComfortFeatures[language] || []), val] })} 
                      onRemove={(idx) => setRespiratoryComfortFeatures({ ...respiratoryComfortFeatures, [language]: (respiratoryComfortFeatures[language] || []).filter((_, i) => i !== idx) })} 
                    />
                    <LocaleListEditor 
                      title="Other details" 
                      items={respiratoryOtherDetails[language]} 
                      onAdd={(val) => setRespiratoryOtherDetails({ ...respiratoryOtherDetails, [language]: [...(respiratoryOtherDetails[language] || []), val] })} 
                      onRemove={(idx) => setRespiratoryOtherDetails({ ...respiratoryOtherDetails, [language]: (respiratoryOtherDetails[language] || []).filter((_, i) => i !== idx) })} 
                    />
                    <LocaleListEditor 
                      title="Equipment" 
                      items={respiratoryEquipment[language]} 
                      onAdd={(val) => setRespiratoryEquipment({ ...respiratoryEquipment, [language]: [...(respiratoryEquipment[language] || []), val] })} 
                      onRemove={(idx) => setRespiratoryEquipment({ ...respiratoryEquipment, [language]: (respiratoryEquipment[language] || []).filter((_, i) => i !== idx) })} 
                    />
                  </div>
                </div>
              )}
              {slug === 'arm-protection' && (
                <ArmSafetyStandardsEditor 
                  safety={safety}
                  setSafety={setSafety}
                  armAttributes={armAttributes}
                  setArmAttributes={setArmAttributes}
                />
              )}
              {slug === 'footwear' && (
                <FootwearSafetyStandardsEditor 
                  footwearStandards={footwearStandards}
                  setFootwearStandards={setFootwearStandards}
                  footwearAttributes={footwearAttributes}
                  setFootwearAttributes={setFootwearAttributes}
                  footwearComfortFeatures={footwearComfortFeatures}
                  setFootwearComfortFeatures={setFootwearComfortFeatures}
                />
              )}
              {slug === 'eye-face' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-medium">Attributes</Label>
                    <div className="flex items-center gap-2"><Checkbox checked={!!eyeFaceAttributes.has_ir} onCheckedChange={(v)=> setEyeFaceAttributes({ ...eyeFaceAttributes, has_ir: !!v })} /><span>IR protection</span></div>
                    <div className="flex items-center gap-2"><Checkbox checked={!!eyeFaceAttributes.has_uv} onCheckedChange={(v)=> setEyeFaceAttributes({ ...eyeFaceAttributes, has_uv: !!v })} /><span>UV protection</span></div>
                    <div className="flex items-center gap-2"><Checkbox checked={!!eyeFaceAttributes.has_arc} onCheckedChange={(v)=> setEyeFaceAttributes({ ...eyeFaceAttributes, has_arc: !!v })} /><span>Arc protection</span></div>
                    <div className="space-y-1"><Label>UV code</Label><Input value={eyeFaceAttributes.uv_code || ''} onChange={(e)=> setEyeFaceAttributes({ ...eyeFaceAttributes, uv_code: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Lens tint</Label><Input value={eyeFaceAttributes.lens_tint || ''} onChange={(e)=> setEyeFaceAttributes({ ...eyeFaceAttributes, lens_tint: e.target.value })} /></div>
                    <LocaleListEditor title="Coatings" items={eyeFaceAttributes.coatings || []} onAdd={(val)=> setEyeFaceAttributes({ ...eyeFaceAttributes, coatings: [...(eyeFaceAttributes.coatings||[]), val] })} onRemove={(idx)=> setEyeFaceAttributes({ ...eyeFaceAttributes, coatings: (eyeFaceAttributes.coatings||[]).filter((_:any,i:number)=> i!==idx) })} />
                    <LocaleListEditor title="Comfort features" items={eyeFaceComfortFeatures[language] || []} onAdd={(val)=> setEyeFaceComfortFeatures({ ...eyeFaceComfortFeatures, [language]: [...(eyeFaceComfortFeatures[language] || []), val] })} onRemove={(idx)=> setEyeFaceComfortFeatures({ ...eyeFaceComfortFeatures, [language]: (eyeFaceComfortFeatures[language] || []).filter((_,i)=> i!==idx) })} />
                    <LocaleListEditor title="Equipment" items={eyeFaceEquipment[language] || []} onAdd={(val)=> setEyeFaceEquipment({ ...eyeFaceEquipment, [language]: [...(eyeFaceEquipment[language] || []), val] })} onRemove={(idx)=> setEyeFaceEquipment({ ...eyeFaceEquipment, [language]: (eyeFaceEquipment[language] || []).filter((_,i)=> i!==idx) })} />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-medium">Standards</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1"><Label>EN 166 Optical class</Label><Input value={eyeFaceStandards.en166?.optical_class || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, optical_class: e.target.value } })} /></div>
                      <div className="space-y-1"><Label>EN 166 Mechanical strength</Label><Input value={eyeFaceStandards.en166?.mechanical_strength || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, mechanical_strength: e.target.value } })} /></div>
                      <div className="space-y-1 md:col-span-2"><Label>Frame mark</Label><Input value={eyeFaceStandards.en166?.frame_mark || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, frame_mark: e.target.value } })} /></div>
                      <div className="space-y-1 md:col-span-2"><Label>Lens mark</Label><Input value={eyeFaceStandards.en166?.lens_mark || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, lens_mark: e.target.value } })} /></div>
                      <div className="space-y-1 md:col-span-2"><Label>Additional marking</Label><Input value={eyeFaceStandards.en166?.additional_marking || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, additional_marking: e.target.value } })} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['en169','en170','en172','en175','gs_et_29'].map(code => (
                        <div key={code} className="flex items-center gap-2"><Checkbox checked={!!eyeFaceStandards[code]} onCheckedChange={(v)=> setEyeFaceStandards({ ...eyeFaceStandards, [code]: !!v })} /><span className="uppercase">{code.replace('_','-')}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {slug === 'head' && (
                <HeadSafetyStandardsEditor 
                  headStandards={headStandards}
                  setHeadStandards={setHeadStandards}
                  headAttributes={headAttributes}
                  setHeadAttributes={setHeadAttributes}
                  headComfortFeatures={headComfortFeatures}
                  setHeadComfortFeatures={setHeadComfortFeatures}
                  headOtherDetails={headOtherDetails}
                  setHeadOtherDetails={setHeadOtherDetails}
                  headEquipment={headEquipment}
                  setHeadEquipment={setHeadEquipment}
                />
              )}
              {slug === 'clothing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-medium">Attributes</Label>
                    <div className="space-y-1">
                      <Label>Clothing Type</Label>
                      <Select value={clothingType || 'none'} onValueChange={(v)=> setClothingType(v === 'none' ? '' : v)}>
                        <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="welding">Welding clothing</SelectItem>
                          <SelectItem value="high-visibility">High-visibility clothing</SelectItem>
                          <SelectItem value="safety-workwear">Safety clothing and Workwear</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Clothing Category</Label>
                      <Select disabled={!clothingType} value={clothingCategory || 'none'} onValueChange={(v)=> setClothingCategory(v === 'none' ? '' : v)}>
                        <SelectTrigger><SelectValue placeholder={!clothingType ? 'Select type first' : 'None'} /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {(clothingType && CLOTHING_TYPE_TO_CATEGORIES[clothingType as keyof typeof CLOTHING_TYPE_TO_CATEGORIES] || []).map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1"><Label>Fit</Label><Input value={clothingAttributes.fit || ''} onChange={(e)=> setClothingAttributes({ ...clothingAttributes, fit: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Size range</Label><Input value={clothingAttributes.size_range || ''} onChange={(e)=> setClothingAttributes({ ...clothingAttributes, size_range: e.target.value })} /></div>
                    <div className="flex items-center gap-2"><Checkbox checked={clothingAttributes.uv_protection === true} onCheckedChange={(v)=> setClothingAttributes({ ...clothingAttributes, uv_protection: v ? true : false })} /><span>UV protection</span></div>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-medium">Standards</Label>
                    <div className="space-y-1"><Label>Hi-Vis class</Label><Input type="number" value={clothingStandards.en_iso_20471?.class ?? ''} onChange={(e)=> setClothingStandards({ ...clothingStandards, en_iso_20471: { class: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                    <div className="space-y-1"><Label>Arc class</Label><Input type="number" value={clothingStandards.iec_61482_2?.class ?? ''} onChange={(e)=> setClothingStandards({ ...clothingStandards, iec_61482_2: { class: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                    <div className="flex items-center gap-2"><Checkbox checked={!!clothingStandards.en_1149_5} onCheckedChange={(v)=> setClothingStandards({ ...clothingStandards, en_1149_5: !!v })} /><span>EN 1149-5 Antistatic</span></div>
                    <LocaleListEditor 
                      title="Comfort features" 
                      items={clothingComfortFeatures[language]} 
                      onAdd={(val) => setClothingComfortFeatures({ ...clothingComfortFeatures, [language]: [...(clothingComfortFeatures[language] || []), val] })} 
                      onRemove={(idx) => setClothingComfortFeatures({ ...clothingComfortFeatures, [language]: (clothingComfortFeatures[language] || []).filter((_, i) => i !== idx) })} 
                    />
                    <LocaleListEditor 
                      title="Other details" 
                      items={clothingOtherDetails[language]} 
                      onAdd={(val) => setClothingOtherDetails({ ...clothingOtherDetails, [language]: [...(clothingOtherDetails[language] || []), val] })} 
                      onRemove={(idx) => setClothingOtherDetails({ ...clothingOtherDetails, [language]: (clothingOtherDetails[language] || []).filter((_, i) => i !== idx) })} 
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Creating…' : 'Create Product'}</Button></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Upload technical sheets and declarations (EN/IT)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Technical Sheets */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Sheets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Technical Sheet (EN)</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <input 
                          type="file" 
                          accept="application/pdf" 
                          onChange={async (e)=>{ 
                            const f=e.target.files?.[0]; 
                            if (!f) return; 
                            const url = await uploadPdfToBucket(f,'tech_en'); 
                            if (url) setTechnicalSheetUrl(url); 
                          }} 
                        />
                        {technicalSheetUrl && (
                          <a className="text-blue-600 hover:underline" href={technicalSheetUrl} target="_blank" rel="noreferrer">
                            Preview
                          </a>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Technical Sheet (IT)</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <input 
                          type="file" 
                          accept="application/pdf" 
                          onChange={async (e)=>{ 
                            const f=e.target.files?.[0]; 
                            if (!f) return; 
                            const url = await uploadPdfToBucket(f,'tech_it'); 
                            if (url) setTechnicalSheetUrlIt(url); 
                          }} 
                        />
                        {technicalSheetUrlIt && (
                          <a className="text-blue-600 hover:underline" href={technicalSheetUrlIt} target="_blank" rel="noreferrer">
                            Preview
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declarations of Conformity */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Declarations of Conformity</h3>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/declarations">
                        Manage Declarations
                      </Link>
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      For comprehensive declaration management with multiple languages and UKCA support, use the dedicated Declarations Management page.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Declaration (EN)</Label>
                        <div className="mt-2 flex items-center gap-2">
                          <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={async (e)=>{ 
                              const f=e.target.files?.[0]; 
                              if (!f) return; 
                              const url = await uploadPdfToBucket(f,'doc_en'); 
                              if (url) setDeclarationSheetUrl(url); 
                            }} 
                          />
                          {declarationSheetUrl && (
                            <a className="text-blue-600 hover:underline" href={declarationSheetUrl} target="_blank" rel="noreferrer">
                              Preview
                            </a>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Declaration (IT)</Label>
                        <div className="mt-2 flex items-center gap-2">
                          <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={async (e)=>{ 
                              const f=e.target.files?.[0]; 
                              if (!f) return; 
                              const url = await uploadPdfToBucket(f,'doc_it'); 
                              if (url) setDeclarationSheetUrlIt(url); 
                            }} 
                          />
                          {declarationSheetUrlIt && (
                            <a className="text-blue-600 hover:underline" href={declarationSheetUrlIt} target="_blank" rel="noreferrer">
                              Preview
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Creating…' : 'Create Product'}</Button></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LocaleListEditor({ title, items, onAdd, onRemove, icon }: { title: string; items: string[] | undefined; onAdd: (val: string)=> void; onRemove: (index: number)=> void; icon?: boolean; }) {
  const [val, setVal] = useState("");
  const safeItems = Array.isArray(items) ? items : [];
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder={`Add ${title.toLowerCase().slice(0,-1)}`} value={val} onChange={(e)=> setVal(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter' && val.trim()) { onAdd(val.trim()); setVal(''); } }} />
            <Button type="button" size="sm" onClick={()=> { if (val.trim()) { onAdd(val.trim()); setVal(''); } }}><Plus className="h-4 w-4" /></Button>
          </div>
          {safeItems.length === 0 ? (<p className="text-sm text-muted-foreground">No items added.</p>) : (
            <div className="flex flex-wrap gap-2">{safeItems.map((item, idx) => (<Badge key={`${item}-${idx}`} variant="outline" className="flex items-center gap-1">{icon && <Tag className="h-3 w-3" />}{item}<Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={()=> onRemove(idx)}><X className="h-3 w-3" /></Button></Badge>))}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


