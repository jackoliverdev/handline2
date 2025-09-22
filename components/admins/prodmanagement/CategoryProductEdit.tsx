"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { getProductById, updateProduct, deleteProduct, uploadProductImage, Product } from "@/lib/products-service";
import { ArrowLeft, Save, Trash, Upload, X, Plus, Tag } from "lucide-react";
import Link from "next/link";
import { CLOTHING_TYPE_TO_CATEGORIES } from "@/content/clothing-categories";

interface Props { id: string; slug: string; }

export default function CategoryProductEdit({ id, slug }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'it'>('en');

  // Common locale fields
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

  // Common non-locale
  const [temperatureRating, setTemperatureRating] = useState<number | null>(null);
  const [cutResistanceLevel, setCutResistanceLevel] = useState<string>('');
  const [heatResistanceLevel, setHeatResistanceLevel] = useState<string>('');
  const [published, setPublished] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'in_stock' | 'out_of_stock' | 'coming_soon' | 'made_to_order'>('in_stock');
  const [brands, setBrands] = useState<string[]>([]);
  const [orderPriority, setOrderPriority] = useState<number>(0);

  // Images/docs
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [image2Url, setImage2Url] = useState<string | null>(null);
  const [image3Url, setImage3Url] = useState<string | null>(null);
  const [image4Url, setImage4Url] = useState<string | null>(null);
  const [image5Url, setImage5Url] = useState<string | null>(null);
  const [technicalSheetUrl, setTechnicalSheetUrl] = useState<string | null>(null);
  const [technicalSheetUrlIt, setTechnicalSheetUrlIt] = useState<string | null>(null);
  const [declarationSheetUrl, setDeclarationSheetUrl] = useState<string | null>(null);
  const [declarationSheetUrlIt, setDeclarationSheetUrlIt] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Category-specific states (mirror public schema)
  const [eyeFaceAttributes, setEyeFaceAttributes] = useState<any>({ has_ir: false, has_uv: false, has_arc: false, uv_code: '', lens_tint: '', coatings: [] });
  const [eyeFaceStandards, setEyeFaceStandards] = useState<any>({ en166: { optical_class: '', mechanical_strength: '', frame_mark: '', lens_mark: '', additional_marking: '' }, en169: false, en170: false, en172: false, en175: false, gs_et_29: false });
  const [hearingStandards, setHearingStandards] = useState<any>({ en352: { parts: [], snr_db: null, hml: { h: null, m: null, l: null }, additional: [] } });
  const [hearingAttributes, setHearingAttributes] = useState<any>({ reusable: null, mount: '', bluetooth: null, compatible_with: [], accessories: [] });
  const [footwearStandards, setFootwearStandards] = useState<any>({ en_iso_20345_2011: [], en_iso_20345_2022: [], slip_resistance: '' });
  const [footwearAttributes, setFootwearAttributes] = useState<any>({ class: '', esd: null, metal_free: null, width_fit: [], size_min: null, size_max: null, gender: '', weight_grams: null, weight_ref_size: null, special: [], toe_cap: '', sole_material: '' });
  const [headStandards, setHeadStandards] = useState<any>({ en397: { present: false, optional: { low_temperature: false, molten_metal: false } }, en50365: false, en12492: false, en812: false });
  const [headAttributes, setHeadAttributes] = useState<any>({ form_factor: '', brim_length: '', size_min_cm: null, size_max_cm: null, weight_g: null, colours: [], ventilation: null, harness_points: null, chinstrap_points: null, sweatband: null, closed_shell: null, euroslot_mm: null, accessories: [] });
  const [clothingStandards, setClothingStandards] = useState<any>({ en_iso_20471: { class: null }, en_iso_11612: {}, iec_61482_2: { class: null }, en_1149_5: false });
  const [clothingAttributes, setClothingAttributes] = useState<any>({ fit: '', gender: '', size_range: '', colours: [], uv_protection: null });
  const [clothingType, setClothingType] = useState<string>('');
  const [clothingCategory, setClothingCategory] = useState<string>('');
  const [armAttributes, setArmAttributes] = useState<any>({ thumb_loop: null, closure: '' });
  // Gloves safety JSON
  const defaultSafety: any = { en_388: { enabled: false, abrasion: null, cut: null, tear: null, puncture: null, iso_13997: null, impact_en_13594: null }, en_407: { enabled: false, contact_heat: null, radiant_heat: null, convective_heat: null, limited_flame_spread: null, small_splashes_molten_metal: null, large_quantities_molten_metal: null }, en_511: { enabled: false, contact_cold: null, convective_cold: null, water_permeability: null } };
  const [safety, setSafety] = useState<any>(defaultSafety);
  // Respiratory-specific
  const [respiratoryStandards, setRespiratoryStandards] = useState<any>({ en149: { enabled: false, class: '', r: false, nr: false, d: false }, en14387: { enabled: false, class: '', gases: {} }, en143: { enabled: false, class: '', r: false, nr: false }, en136: { enabled: false, class: '' }, en140: { enabled: false }, en166: { enabled: false, class: '' }, din_3181_3: { enabled: false } });
  const [respConnections, setRespConnections] = useState<string[]>([]);
  const [respFilterType, setRespFilterType] = useState<string>('');
  const [respProtectionClass, setRespProtectionClass] = useState<string>('');
  const [respProtectionCodes, setRespProtectionCodes] = useState<string[]>([]);
  const [respCompatibleWith, setRespCompatibleWith] = useState<string[]>([]);
  // Swabs-specific pad size JSON
  const [padEnDiameter, setPadEnDiameter] = useState<number | ''>('');
  const [padEnLength, setPadEnLength] = useState<number | ''>('');
  const [padItDiameter, setPadItDiameter] = useState<number | ''>('');
  const [padItLength, setPadItLength] = useState<number | ''>('');
  // Swabs generic specs
  const [lengthCm, setLengthCm] = useState<number | null>(null);
  const [ceCategory, setCeCategory] = useState<string>('');
  const [enStandard, setEnStandard] = useState<string>('');

  // Load existing product
  useEffect(() => {
    (async () => {
      try {
        const { product } = await getProductById(id);
        if (!product) throw new Error('Not found');
        setNameLocales({ en: product.name_locales?.en || product.name || '', it: product.name_locales?.it || '' });
        setShortDescriptionLocales({ en: product.short_description_locales?.en || product.short_description || '', it: product.short_description_locales?.it || '' });
        setDescriptionLocales({ en: product.description_locales?.en || product.description || '', it: product.description_locales?.it || '' });
        setCategoryLocales({ en: product.category_locales?.en || product.category || '', it: product.category_locales?.it || '' });
        setSubCategoryLocales({ en: product.sub_category_locales?.en || product.sub_category || '', it: product.sub_category_locales?.it || '' });
        setFeaturesLocales({ en: product.features_locales?.en || product.features || [], it: product.features_locales?.it || [] });
        setApplicationsLocales({ en: product.applications_locales?.en || product.applications || [], it: product.applications_locales?.it || [] });
        setIndustriesLocales({ en: product.industries_locales?.en || product.industries || [], it: product.industries_locales?.it || [] });
        setMaterialsLocales({ en: product.materials_locales?.en || [], it: product.materials_locales?.it || [] });
        setTagsLocales({ en: product.tags_locales?.en || [], it: product.tags_locales?.it || [] });
        setSizeLocales({ en: product.size_locales?.en || '', it: product.size_locales?.it || '' });
        setTemperatureRating(product.temperature_rating ?? null);
        setCutResistanceLevel(product.cut_resistance_level || '');
        setHeatResistanceLevel(product.heat_resistance_level || '');
        setPublished(product.published || false);
        setIsFeatured(product.is_featured || false);
        setOutOfStock(product.out_of_stock || false);
        setAvailabilityStatus(product.availability_status || 'in_stock');
        setBrands(product.brands || []);
        setOrderPriority(product.order_priority || 0);
        setImageUrl(product.image_url || null);
        setImage2Url(product.image2_url || null);
        setImage3Url(product.image3_url || null);
        setImage4Url(product.image4_url || null);
        setImage5Url(product.image5_url || null);
        setTechnicalSheetUrl(product.technical_sheet_url || null);
        setTechnicalSheetUrlIt(product.technical_sheet_url_it || null);
        setDeclarationSheetUrl(product.declaration_sheet_url || null);
        setDeclarationSheetUrlIt(product.declaration_sheet_url_it || null);

        // Category-specific blocks
        setEyeFaceAttributes((product as any).eye_face_attributes || { has_ir: false, has_uv: false, has_arc: false, uv_code: '', lens_tint: '', coatings: [] });
        setEyeFaceStandards((product as any).eye_face_standards || { en166: { optical_class: '', mechanical_strength: '', frame_mark: '', lens_mark: '', additional_marking: '' }, en169: false, en170: false, en172: false, en175: false, gs_et_29: false });
        setHearingStandards((product as any).hearing_standards || { en352: { parts: [], snr_db: null, hml: { h: null, m: null, l: null }, additional: [] } });
        setHearingAttributes((product as any).hearing_attributes || { reusable: null, mount: '', bluetooth: null, compatible_with: [], accessories: [] });
        setFootwearStandards((product as any).footwear_standards || { en_iso_20345_2011: [], en_iso_20345_2022: [], slip_resistance: '' });
        setFootwearAttributes((product as any).footwear_attributes || { class: '', esd: null, metal_free: null, width_fit: [], size_min: null, size_max: null, gender: '', weight_grams: null, weight_ref_size: null, special: [], toe_cap: '', sole_material: '' });
        setHeadStandards((product as any).head_standards || { en397: { present: false, optional: { low_temperature: false, molten_metal: false } }, en50365: false, en12492: false, en812: false });
        setHeadAttributes((product as any).head_attributes || { form_factor: '', brim_length: '', size_min_cm: null, size_max_cm: null, weight_g: null, colours: [], ventilation: null, harness_points: null, chinstrap_points: null, sweatband: null, closed_shell: null, euroslot_mm: null, accessories: [] });
        setClothingStandards((product as any).clothing_standards || { en_iso_20471: { class: null }, en_iso_11612: {}, iec_61482_2: { class: null }, en_1149_5: false });
        setClothingAttributes((product as any).clothing_attributes || { fit: '', gender: '', size_range: '', colours: [], uv_protection: null });
        setClothingType((product as any).clothing_type || '');
        setClothingCategory((product as any).clothing_category || '');
        setArmAttributes((product as any).arm_attributes || { thumb_loop: null, closure: '' });
        setSafety((product as any).safety && typeof (product as any).safety === 'object' ? (product as any).safety : defaultSafety);
        // Respiratory
        setRespiratoryStandards((product as any).respiratory_standards || { en149: { enabled: false, class: '', r: false, nr: false, d: false }, en14387: { enabled: false, class: '', gases: {} }, en143: { enabled: false, class: '', r: false, nr: false }, en136: { enabled: false, class: '' }, en140: { enabled: false }, en166: { enabled: false, class: '' }, din_3181_3: { enabled: false } });
        setRespConnections(Array.isArray((product as any).connections) ? (product as any).connections : []);
        setRespFilterType((product as any).filter_type || '');
        setRespProtectionClass((product as any).protection_class || '');
        setRespProtectionCodes(Array.isArray((product as any).protection_codes) ? (product as any).protection_codes : []);
        setRespCompatibleWith(Array.isArray((product as any).compatible_with) ? (product as any).compatible_with : []);
        // Swabs pad size
        const ps: any = (product as any).pad_size_json || {};
        setPadEnDiameter(typeof ps?.en?.diameter_mm === 'number' ? ps.en.diameter_mm : '');
        setPadEnLength(typeof ps?.en?.length_mm === 'number' ? ps.en.length_mm : '');
        setPadItDiameter(typeof ps?.it?.diametro_mm === 'number' ? ps.it.diametro_mm : '');
        setPadItLength(typeof ps?.it?.lunghezza_mm === 'number' ? ps.it.lunghezza_mm : '');
        // Swabs generic specs
        setLengthCm((product as any).length_cm ?? null);
        setCeCategory((product as any).ce_category || '');
        setEnStandard((product as any).en_standard || '');
      } catch (e) {
        console.error(e);
        toast({ title: 'Error', description: 'Failed to load product', variant: 'destructive' });
        router.push(`/admin/prod-management/${slug}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, slug, router]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: Partial<Product> = {
        name: nameLocales.en,
        description: descriptionLocales.en,
        short_description: shortDescriptionLocales.en || shortDescriptionLocales.it || '',
        category: categoryLocales.en || categoryLocales.it || '',
        sub_category: subCategoryLocales.en || subCategoryLocales.it || '',
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
        published,
        is_featured: isFeatured,
        out_of_stock: outOfStock,
        availability_status: availabilityStatus,
        brands,
        order_priority: orderPriority,
        image_url: imageUrl,
        image2_url: image2Url,
        image3_url: image3Url,
        image4_url: image4Url,
        image5_url: image5Url,
        technical_sheet_url: technicalSheetUrl,
        technical_sheet_url_it: technicalSheetUrlIt,
        declaration_sheet_url: declarationSheetUrl,
        declaration_sheet_url_it: declarationSheetUrlIt,
        updated_at: new Date().toISOString(),
        // Category-specific payloads
        safety: slug === 'gloves' ? safety : (undefined as any),
        eye_face_attributes: eyeFaceAttributes,
        eye_face_standards: eyeFaceStandards,
        hearing_standards: hearingStandards,
        hearing_attributes: hearingAttributes,
        footwear_standards: footwearStandards,
        footwear_attributes: footwearAttributes,
        head_standards: headStandards,
        head_attributes: headAttributes,
        clothing_standards: clothingStandards,
        clothing_attributes: clothingAttributes,
        clothing_type: clothingType || null,
        clothing_category: clothingCategory || null,
        arm_attributes: armAttributes,
        respiratory_standards: respiratoryStandards,
        connections: respConnections,
        filter_type: respFilterType || undefined,
        protection_class: respProtectionClass || undefined,
        protection_codes: respProtectionCodes,
        compatible_with: respCompatibleWith,
        pad_size_json: ((): any => {
          const en = { diameter_mm: typeof padEnDiameter === 'number' ? padEnDiameter : undefined, length_mm: typeof padEnLength === 'number' ? padEnLength : undefined };
          const it = { diametro_mm: typeof padItDiameter === 'number' ? padItDiameter : undefined, lunghezza_mm: typeof padItLength === 'number' ? padItLength : undefined };
          const hasEn = typeof en.diameter_mm === 'number' || typeof en.length_mm === 'number';
          const hasIt = typeof it.diametro_mm === 'number' || typeof it.lunghezza_mm === 'number';
          if (!hasEn && !hasIt) return undefined;
          return { ...(hasEn ? { en } : {}), ...(hasIt ? { it } : {}) };
        })(),
        length_cm: slug === 'industrial-swabs' ? (lengthCm ?? null) : undefined,
        ce_category: slug === 'industrial-swabs' ? (ceCategory || null) : undefined,
        en_standard: slug === 'industrial-swabs' ? (enStandard || null) : undefined,
      } as any;

      const { product } = await updateProduct(id, payload);
      if (!product) throw new Error('Update failed');
      toast({ title: 'Saved', description: 'Product updated successfully.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Failed to save product.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const { success } = await deleteProduct(id);
      if (!success) throw new Error('Delete failed');
      toast({ title: 'Deleted', description: 'Product deleted.' });
      router.push(`/admin/prod-management/${slug}`);
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" asChild className="mr-2">
          <Link href={`/admin/prod-management/${slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {slug}
          </Link>
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
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="safety">Safety & Specs</TabsTrigger>
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
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Product Name</Label>
                      <Input value={nameLocales[language]} onChange={(e)=> setNameLocales({ ...nameLocales, [language]: e.target.value })} />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Short Description</Label>
                      <Input value={shortDescriptionLocales[language]} onChange={(e)=> setShortDescriptionLocales({ ...shortDescriptionLocales, [language]: e.target.value })} />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Full Description</Label>
                      <Textarea rows={4} value={descriptionLocales[language]} onChange={(e)=> setDescriptionLocales({ ...descriptionLocales, [language]: e.target.value })} />
                    </div>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div className="space-y-1 sm:space-y-2">
                        <Label>Category</Label>
                        <Input value={categoryLocales[language]} onChange={(e)=> setCategoryLocales({ ...categoryLocales, [language]: e.target.value })} />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label>Sub-Category</Label>
                        <Input value={subCategoryLocales[language]} onChange={(e)=> setSubCategoryLocales({ ...subCategoryLocales, [language]: e.target.value })} />
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
                      <Label>Temperature Rating (°C)</Label>
                      <Input type="number" value={temperatureRating === null ? '' : temperatureRating} onChange={(e)=> setTemperatureRating(e.target.value === '' ? null : Number(e.target.value))} />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Cut Resistance Level</Label>
                      <Input value={cutResistanceLevel} onChange={(e)=> setCutResistanceLevel(e.target.value)} />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Heat Resistance Level</Label>
                      <Input value={heatResistanceLevel} onChange={(e)=> setHeatResistanceLevel(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                  <CardDescription>Configure visibility and status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5"><Label>Published</Label><p className="text-xs text-muted-foreground">Visible on the website</p></div>
                      <Switch checked={published} onCheckedChange={setPublished} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5"><Label>Featured</Label><p className="text-xs text-muted-foreground">Show in featured sections</p></div>
                      <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5"><Label>Out of stock</Label><p className="text-xs text-muted-foreground">Temporarily unavailable</p></div>
                      <Switch checked={outOfStock} onCheckedChange={setOutOfStock} />
                    </div>
                    <div className="space-y-2">
                      <Label>Availability Status</Label>
                      <Select value={availabilityStatus} onValueChange={(v:any)=> setAvailabilityStatus(v)}>
                        <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_stock">In Stock</SelectItem>
                          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                          <SelectItem value="coming_soon">Coming Soon</SelectItem>
                          <SelectItem value="made_to_order">Made to Order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Order Priority</Label>
                      <Input type="number" value={orderPriority} onChange={(e)=> setOrderPriority(Number(e.target.value))} />
                      <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" asChild><Link href={`/admin/prod-management/${slug}`}>Cancel</Link></Button>
                  <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Content & Lists</CardTitle>
              <CardDescription>Manage features, applications, industries, materials, tags, and size information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Features */}
                <LocaleListEditor title="Features" items={featuresLocales[language]} onAdd={(val)=> setFeaturesLocales({ ...featuresLocales, [language]: [...featuresLocales[language], val] })} onRemove={(idx)=> setFeaturesLocales({ ...featuresLocales, [language]: featuresLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Applications */}
                <LocaleListEditor title="Applications" items={applicationsLocales[language]} onAdd={(val)=> setApplicationsLocales({ ...applicationsLocales, [language]: [...applicationsLocales[language], val] })} onRemove={(idx)=> setApplicationsLocales({ ...applicationsLocales, [language]: applicationsLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Industries */}
                <LocaleListEditor title="Industries" items={industriesLocales[language]} onAdd={(val)=> setIndustriesLocales({ ...industriesLocales, [language]: [...industriesLocales[language], val] })} onRemove={(idx)=> setIndustriesLocales({ ...industriesLocales, [language]: industriesLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Materials */}
                <LocaleListEditor title="Materials" items={materialsLocales[language]} onAdd={(val)=> setMaterialsLocales({ ...materialsLocales, [language]: [...materialsLocales[language], val] })} onRemove={(idx)=> setMaterialsLocales({ ...materialsLocales, [language]: materialsLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Tags */}
                <LocaleListEditor title="Tags" items={tagsLocales[language]} onAdd={(val)=> setTagsLocales({ ...tagsLocales, [language]: [...tagsLocales[language], val] })} onRemove={(idx)=> setTagsLocales({ ...tagsLocales, [language]: tagsLocales[language].filter((_,i)=> i!==idx) })} icon />
                {/* Size */}
                <div>
                  <Label>Size Info</Label>
                  <Input className="mt-2" value={sizeLocales[language]} onChange={(e)=> setSizeLocales({ ...sizeLocales, [language]: e.target.value })} />
                </div>
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>Upload up to 5 images (first is the main image).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {[{url:imageUrl,label:'Main Image',setter:setImageUrl},{url:image2Url,label:'Image 2',setter:setImage2Url},{url:image3Url,label:'Image 3',setter:setImage3Url},{url:image4Url,label:'Image 4',setter:setImage4Url},{url:image5Url,label:'Image 5',setter:setImage5Url}].map((img,idx)=> (
                  <div key={idx} className={`relative border rounded-md overflow-hidden ${!img.url ? 'border-dashed p-4 h-32 flex items-center justify-center' : 'h-32'}`}>
                    {img.url ? (
                      <>
                        <img src={img.url} alt={`Product image ${idx+1}`} className="w-full h-full object-cover" />
                        <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1" onClick={()=> img.setter(null)}><X className="h-4 w-4" /></Button>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">{img.label}</span>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <Label>Upload Main Image</Label>
                <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={async (e)=>{
                  const file = e.target.files?.[0]; if (!file) return; const url = await uploadProductImage(id, file); if (url.url) setImageUrl(url.url);
                }} />
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors mt-2" onClick={()=> coverInputRef.current?.click()}>
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to upload</p>
                </div>
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Technical sheets and declarations (EN/IT).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Technical Sheet (EN)</Label>
                  {technicalSheetUrl ? (
                    <div className="flex items-center justify-between mt-2 border rounded p-2"><a href={technicalSheetUrl} className="text-blue-600" target="_blank" rel="noreferrer">Download</a><Button variant="destructive" size="sm" onClick={()=> setTechnicalSheetUrl(null)}><X className="h-4 w-4" /></Button></div>
                  ) : (
                    <Button variant="outline" className="mt-2" asChild><a href="#" onClick={(e)=> e.preventDefault()}>Upload via product detail editor</a></Button>
                  )}
                </div>
                <div>
                  <Label>Technical Sheet (IT)</Label>
                  {technicalSheetUrlIt ? (
                    <div className="flex items-center justify-between mt-2 border rounded p-2"><a href={technicalSheetUrlIt} className="text-blue-600" target="_blank" rel="noreferrer">Download</a><Button variant="destructive" size="sm" onClick={()=> setTechnicalSheetUrlIt(null)}><X className="h-4 w-4" /></Button></div>
                  ) : (
                    <Button variant="outline" className="mt-2" asChild><a href="#" onClick={(e)=> e.preventDefault()}>Upload via product detail editor</a></Button>
                  )}
                </div>
                <div>
                  <Label>Declaration (EN)</Label>
                  {declarationSheetUrl ? (
                    <div className="flex items-center justify-between mt-2 border rounded p-2"><a href={declarationSheetUrl} className="text-blue-600" target="_blank" rel="noreferrer">Download</a><Button variant="destructive" size="sm" onClick={()=> setDeclarationSheetUrl(null)}><X className="h-4 w-4" /></Button></div>
                  ) : (
                    <Button variant="outline" className="mt-2" asChild><a href="#" onClick={(e)=> e.preventDefault()}>Upload via declarations tool</a></Button>
                  )}
                </div>
                <div>
                  <Label>Declaration (IT)</Label>
                  {declarationSheetUrlIt ? (
                    <div className="flex items-center justify-between mt-2 border rounded p-2"><a href={declarationSheetUrlIt} className="text-blue-600" target="_blank" rel="noreferrer">Download</a><Button variant="destructive" size="sm" onClick={()=> setDeclarationSheetUrlIt(null)}><X className="h-4 w-4" /></Button></div>
                  ) : (
                    <Button variant="outline" className="mt-2" asChild><a href="#" onClick={(e)=> e.preventDefault()}>Upload via declarations tool</a></Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety & Specifications</CardTitle>
              <CardDescription>Category-specific attributes and standards.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
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

                {slug === 'hearing' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="font-medium">EN 352</Label>
                      <div className="space-y-1"><Label>SNR (dB)</Label><Input type="number" value={hearingStandards.en352?.snr_db ?? ''} onChange={(e)=> setHearingStandards({ ...hearingStandards, en352: { ...hearingStandards.en352, snr_db: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['h','m','l'] as const).map(k => (
                          <div key={k} className="space-y-1"><Label className="uppercase">{k}</Label><Input type="number" value={hearingStandards.en352?.hml?.[k] ?? ''} onChange={(e)=> setHearingStandards({ ...hearingStandards, en352: { ...hearingStandards.en352, hml: { ...(hearingStandards.en352?.hml||{}), [k]: e.target.value === '' ? null : Number(e.target.value) } } })} /></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="font-medium">Attributes</Label>
                      <div className="flex items-center gap-2"><Checkbox checked={hearingAttributes.reusable === true} onCheckedChange={(v)=> setHearingAttributes({ ...hearingAttributes, reusable: v ? true : false })} /><span>Reusable</span></div>
                      <div className="flex items-center gap-2"><Checkbox checked={hearingAttributes.bluetooth === true} onCheckedChange={(v)=> setHearingAttributes({ ...hearingAttributes, bluetooth: v ? true : false })} /><span>Bluetooth</span></div>
                      <div className="space-y-1"><Label>Mount</Label><Input value={hearingAttributes.mount || ''} onChange={(e)=> setHearingAttributes({ ...hearingAttributes, mount: e.target.value })} /></div>
                    </div>
                  </div>
                )}

                {slug === 'footwear' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="font-medium">Attributes</Label>
                      <div className="space-y-1"><Label>Class</Label><Input value={footwearAttributes.class || ''} onChange={(e)=> setFootwearAttributes({ ...footwearAttributes, class: e.target.value })} /></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2"><Checkbox checked={footwearAttributes.esd === true} onCheckedChange={(v)=> setFootwearAttributes({ ...footwearAttributes, esd: v ? true : false })} /><span>ESD</span></div>
                        <div className="flex items-center gap-2"><Checkbox checked={footwearAttributes.metal_free === true} onCheckedChange={(v)=> setFootwearAttributes({ ...footwearAttributes, metal_free: v ? true : false })} /><span>Metal free</span></div>
                      </div>
                      <div className="space-y-1"><Label>Toe cap</Label><Input value={footwearAttributes.toe_cap || ''} onChange={(e)=> setFootwearAttributes({ ...footwearAttributes, toe_cap: e.target.value })} /></div>
                      <div className="space-y-1"><Label>Sole material</Label><Input value={footwearAttributes.sole_material || ''} onChange={(e)=> setFootwearAttributes({ ...footwearAttributes, sole_material: e.target.value })} /></div>
                    </div>
                    <div className="space-y-3">
                      <Label className="font-medium">Standards</Label>
                      <div className="space-y-1"><Label>EN ISO 20345:2011 codes (comma separated)</Label><Input value={(footwearStandards.en_iso_20345_2011||[]).join(', ')} onChange={(e)=> setFootwearStandards({ ...footwearStandards, en_iso_20345_2011: e.target.value.split(',').map(s=> s.trim()).filter(Boolean) })} /></div>
                      <div className="space-y-1"><Label>EN ISO 20345:2022 codes (comma separated)</Label><Input value={(footwearStandards.en_iso_20345_2022||[]).join(', ')} onChange={(e)=> setFootwearStandards({ ...footwearStandards, en_iso_20345_2022: e.target.value.split(',').map(s=> s.trim()).filter(Boolean) })} /></div>
                      <div className="space-y-1"><Label>Slip resistance</Label><Input value={footwearStandards.slip_resistance || ''} onChange={(e)=> setFootwearStandards({ ...footwearStandards, slip_resistance: e.target.value })} /></div>
                    </div>
                  </div>
                )}

                {slug === 'head' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="font-medium">Attributes</Label>
                      <div className="space-y-1"><Label>Form factor</Label><Input value={headAttributes.form_factor || ''} onChange={(e)=> setHeadAttributes({ ...headAttributes, form_factor: e.target.value })} /></div>
                      <div className="space-y-1"><Label>Brim length</Label><Input value={headAttributes.brim_length || ''} onChange={(e)=> setHeadAttributes({ ...headAttributes, brim_length: e.target.value })} /></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1"><Label>Size min (cm)</Label><Input type="number" value={headAttributes.size_min_cm ?? ''} onChange={(e)=> setHeadAttributes({ ...headAttributes, size_min_cm: e.target.value === '' ? null : Number(e.target.value) })} /></div>
                        <div className="space-y-1"><Label>Size max (cm)</Label><Input type="number" value={headAttributes.size_max_cm ?? ''} onChange={(e)=> setHeadAttributes({ ...headAttributes, size_max_cm: e.target.value === '' ? null : Number(e.target.value) })} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2"><Checkbox checked={headAttributes.ventilation === true} onCheckedChange={(v)=> setHeadAttributes({ ...headAttributes, ventilation: v ? true : false })} /><span>Ventilation</span></div>
                        <div className="flex items-center gap-2"><Checkbox checked={headAttributes.closed_shell === true} onCheckedChange={(v)=> setHeadAttributes({ ...headAttributes, closed_shell: v ? true : false })} /><span>Closed shell</span></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="font-medium">Standards</Label>
                      <div className="flex items-center gap-2"><Checkbox checked={!!headStandards.en397?.present} onCheckedChange={(v)=> setHeadStandards({ ...headStandards, en397: { ...(headStandards.en397||{}), present: !!v, optional: headStandards.en397?.optional || { low_temperature: false, molten_metal: false } } })} /><span>EN 397</span></div>
                      <div className="grid grid-cols-2 gap-2 pl-6">
                        <div className="flex items-center gap-2"><Checkbox checked={!!headStandards.en397?.optional?.low_temperature} onCheckedChange={(v)=> setHeadStandards({ ...headStandards, en397: { ...(headStandards.en397||{}), optional: { ...(headStandards.en397?.optional||{}), low_temperature: !!v } } })} /><span>Low temperature</span></div>
                        <div className="flex items-center gap-2"><Checkbox checked={!!headStandards.en397?.optional?.molten_metal} onCheckedChange={(v)=> setHeadStandards({ ...headStandards, en397: { ...(headStandards.en397||{}), optional: { ...(headStandards.en397?.optional||{}), molten_metal: !!v } } })} /><span>Molten metal</span></div>
                      </div>
                      <div className="flex items-center gap-2"><Checkbox checked={!!headStandards.en50365} onCheckedChange={(v)=> setHeadStandards({ ...headStandards, en50365: !!v })} /><span>EN 50365</span></div>
                      <div className="flex items-center gap-2"><Checkbox checked={!!headStandards.en12492} onCheckedChange={(v)=> setHeadStandards({ ...headStandards, en12492: !!v })} /><span>EN 12492</span></div>
                      <div className="flex items-center gap-2"><Checkbox checked={!!headStandards.en812} onCheckedChange={(v)=> setHeadStandards({ ...headStandards, en812: !!v })} /><span>EN 812</span></div>
                    </div>
                  </div>
                )}

                {slug === 'arm-protection' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="font-medium">Attributes</Label>
                      <div className="flex items-center gap-2"><Checkbox checked={armAttributes.thumb_loop === true} onCheckedChange={(v)=> setArmAttributes({ ...armAttributes, thumb_loop: v ? true : false })} /><span>Thumb loop</span></div>
                      <div className="space-y-1"><Label>Closure</Label><Input value={armAttributes.closure || ''} onChange={(e)=> setArmAttributes({ ...armAttributes, closure: e.target.value })} /></div>
                    </div>
                  </div>
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
                    </div>
                  </div>
                )}

                {slug === 'industrial-swabs' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="font-medium">Pad size (EN)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1"><Label>Diameter (mm)</Label><Input type="number" value={padEnDiameter} onChange={(e)=> setPadEnDiameter(e.target.value === '' ? '' : Number(e.target.value))} /></div>
                          <div className="space-y-1"><Label>Length (mm)</Label><Input type="number" value={padEnLength} onChange={(e)=> setPadEnLength(e.target.value === '' ? '' : Number(e.target.value))} /></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="font-medium">Dimensioni tampone (IT)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1"><Label>Diametro (mm)</Label><Input type="number" value={padItDiameter} onChange={(e)=> setPadItDiameter(e.target.value === '' ? '' : Number(e.target.value))} /></div>
                          <div className="space-y-1"><Label>Lunghezza (mm)</Label><Input type="number" value={padItLength} onChange={(e)=> setPadItLength(e.target.value === '' ? '' : Number(e.target.value))} /></div>
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
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2 p-4 rounded-md border">
                        <Label className="font-medium">EN 388</Label>
                        <div className="flex items-center gap-2"><Checkbox checked={!!safety.en_388?.enabled} onCheckedChange={(v)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), enabled: !!v } })} /><span>Enabled</span></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1"><Label>Abrasion</Label><Input type="number" value={safety.en_388?.abrasion ?? ''} onChange={(e)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), abrasion: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Cut</Label><Input type="number" value={safety.en_388?.cut ?? ''} onChange={(e)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), cut: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Tear</Label><Input type="number" value={safety.en_388?.tear ?? ''} onChange={(e)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), tear: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Puncture</Label><Input type="number" value={safety.en_388?.puncture ?? ''} onChange={(e)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), puncture: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1 md:col-span-2"><Label>ISO 13997 (A–F)</Label><Input value={safety.en_388?.iso_13997 ?? ''} onChange={(e)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), iso_13997: e.target.value || null } })} /></div>
                          <div className="space-y-1 md:col-span-2"><Label>Impact EN 13594</Label><Input value={safety.en_388?.impact_en_13594 ?? ''} onChange={(e)=> setSafety({ ...safety, en_388: { ...(safety.en_388||{}), impact_en_13594: e.target.value || null } })} /></div>
                        </div>
                      </div>

                      <div className="space-y-2 p-4 rounded-md border">
                        <Label className="font-medium">EN 407</Label>
                        <div className="flex items-center gap-2"><Checkbox checked={!!safety.en_407?.enabled} onCheckedChange={(v)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), enabled: !!v } })} /><span>Enabled</span></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1"><Label>Contact heat</Label><Input type="number" value={safety.en_407?.contact_heat ?? ''} onChange={(e)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), contact_heat: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Radiant heat</Label><Input type="number" value={safety.en_407?.radiant_heat ?? ''} onChange={(e)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), radiant_heat: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Convective heat</Label><Input type="number" value={safety.en_407?.convective_heat ?? ''} onChange={(e)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), convective_heat: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Limited flame</Label><Input type="number" value={safety.en_407?.limited_flame_spread ?? ''} onChange={(e)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), limited_flame_spread: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Molten metal (small)</Label><Input type="number" value={safety.en_407?.small_splashes_molten_metal ?? ''} onChange={(e)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), small_splashes_molten_metal: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Molten metal (large)</Label><Input value={safety.en_407?.large_quantities_molten_metal ?? ''} onChange={(e)=> setSafety({ ...safety, en_407: { ...(safety.en_407||{}), large_quantities_molten_metal: e.target.value || null } })} /></div>
                        </div>
                      </div>

                      <div className="space-y-2 p-4 rounded-md border">
                        <Label className="font-medium">EN 511</Label>
                        <div className="flex items-center gap-2"><Checkbox checked={!!safety.en_511?.enabled} onCheckedChange={(v)=> setSafety({ ...safety, en_511: { ...(safety.en_511||{}), enabled: !!v } })} /><span>Enabled</span></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1"><Label>Contact cold</Label><Input type="number" value={safety.en_511?.contact_cold ?? ''} onChange={(e)=> setSafety({ ...safety, en_511: { ...(safety.en_511||{}), contact_cold: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1"><Label>Convective cold</Label><Input type="number" value={safety.en_511?.convective_cold ?? ''} onChange={(e)=> setSafety({ ...safety, en_511: { ...(safety.en_511||{}), convective_cold: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                          <div className="space-y-1 md:col-span-2"><Label>Water permeability</Label><Input type="number" value={safety.en_511?.water_permeability ?? ''} onChange={(e)=> setSafety({ ...safety, en_511: { ...(safety.en_511||{}), water_permeability: e.target.value === '' ? null : Number(e.target.value) } })} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div className="space-y-1"><Label>EN 14387 gases (comma separated codes, e.g. A,B,E,K)</Label><Input value={Object.keys(respiratoryStandards.en14387?.gases || {}).filter((k)=> respiratoryStandards.en14387?.gases?.[k]).join(', ')} onChange={(e)=> {
                        const obj: any = {}; e.target.value.split(',').map(s=> s.trim().toUpperCase()).filter(Boolean).forEach((k)=> obj[k] = true);
                        setRespiratoryStandards({ ...respiratoryStandards, en14387: { ...(respiratoryStandards.en14387||{}), gases: obj } });
                      }} /></div>
                    </div>
                  </div>
                )}
                
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>This will permanently delete the product.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={()=> setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting…' : 'Delete'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LocaleListEditor({ title, items, onAdd, onRemove, icon }: { title: string; items: string[]; onAdd: (val: string)=> void; onRemove: (index: number)=> void; icon?: boolean; }) {
  const [val, setVal] = useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder={`Add ${title.toLowerCase().slice(0,-1)}`} value={val} onChange={(e)=> setVal(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter' && val.trim()) { onAdd(val.trim()); setVal(''); } }} />
            <Button type="button" size="sm" onClick={()=> { if (val.trim()) { onAdd(val.trim()); setVal(''); } }}><Plus className="h-4 w-4" /></Button>
          </div>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items added.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => (
                <Badge key={`${item}-${idx}`} variant="outline" className="flex items-center gap-1">{icon && <Tag className="h-3 w-3" />}{item}<Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={()=> onRemove(idx)}><X className="h-3 w-3" /></Button></Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


