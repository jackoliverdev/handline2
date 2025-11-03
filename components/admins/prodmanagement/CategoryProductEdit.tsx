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
import { getProductById, updateProduct, deleteProduct, uploadProductImage, Product, EnvironmentPictograms } from "@/lib/products-service";
import { ArrowLeft, Save, Trash, Upload, X, Plus, Tag, Sun, Droplets, Wind, FlaskConical, Bug, Zap, Shield, Eye } from "lucide-react";
import Link from "next/link";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props { id: string; slug: string; }

export default function CategoryProductEdit({ id, slug }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient();
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
  const [availableBrands, setAvailableBrands] = useState<Brand[]>([]);
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
  const [manufacturersInstructionUrl, setManufacturersInstructionUrl] = useState<string | null>(null);
  const [manufacturersInstructionUrlIt, setManufacturersInstructionUrlIt] = useState<string | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Related products
  const [relatedProductId1, setRelatedProductId1] = useState<string | null>(null);
  const [relatedProductId2, setRelatedProductId2] = useState<string | null>(null);
  const [relatedProductId3, setRelatedProductId3] = useState<string | null>(null);
  const [relatedProductId4, setRelatedProductId4] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);

  // Category-specific states (mirror public schema)
  const [eyeFaceAttributes, setEyeFaceAttributes] = useState<any>({ has_ir: false, has_uv: false, has_arc: false, has_sun: false, has_glare: false, has_welding: false, uv_code: '', lens_tint: '' });
  const [eyeFaceStandards, setEyeFaceStandards] = useState<any>({ en166: { optical_class: '', mechanical_strength: '', frame_mark: '', lens_mark: '', additional_marking: '' }, en169: false, en170: false, en172: false, en175: false, gs_et_29: false });
  const [eyeFaceCoatingsLocales, setEyeFaceCoatingsLocales] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [eyeFaceMaterialsLocales, setEyeFaceMaterialsLocales] = useState<{ en: { lens: string; frame: string; arm: string; headband: string }; it: { lens: string; frame: string; arm: string; headband: string } }>({ en: { lens: '', frame: '', arm: '', headband: '' }, it: { lens: '', frame: '', arm: '', headband: '' } });
  const [eyeFaceComfortFeatures, setEyeFaceComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [eyeFaceEquipment, setEyeFaceEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingStandards, setHearingStandards] = useState<any>({ en352: { parts: [], snr_db: null, hml: { h: null, m: null, l: null }, additional: [] } });
  const [hearingAttributes, setHearingAttributes] = useState<any>({ reusable: null, mount: '', bluetooth: null, materials: [], size: '', ce_category: '', water_resistance: null, extreme_temperature: null, electrical_insulation: null });
  const [hearingCompatibleWithLocales, setHearingCompatibleWithLocales] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingAccessoriesLocales, setHearingAccessoriesLocales] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingComfortFeatures, setHearingComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingOtherDetails, setHearingOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [hearingEquipment, setHearingEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respiratoryComfortFeatures, setRespiratoryComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respiratoryOtherDetails, setRespiratoryOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respiratoryEquipment, setRespiratoryEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [footwearStandards, setFootwearStandards] = useState<any>({ en_iso_20345_2011: [], en_iso_20345_2022: [], slip_resistance: '' });
  const [footwearAttributes, setFootwearAttributes] = useState<any>({ class: '', esd: null, metal_free: null, width_fit: [], size_min: null, size_max: null, gender: '', weight_grams: null, weight_ref_size: null, special: [], toe_cap: '', sole_material: '', upper_material: '', lining_material: '', insole_material: '', metatarsal_protection: null });
  const [footwearMaterialsLocales, setFootwearMaterialsLocales] = useState<{ en: { upper: string; lining: string; sole: string; insole: string; toe_cap: string }; it: { upper: string; lining: string; sole: string; insole: string; toe_cap: string } }>({ en: { upper: '', lining: '', sole: '', insole: '', toe_cap: '' }, it: { upper: '', lining: '', sole: '', insole: '', toe_cap: '' } });
  const [footwearComfortFeatures, setFootwearComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [footwearSpecialFeatures, setFootwearSpecialFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headStandards, setHeadStandards] = useState<any>({ en397: { present: false, optional: { low_temperature: false, molten_metal: false } }, en50365: false, en12492: false, en812: false });
  const [headComfortFeatures, setHeadComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headOtherDetails, setHeadOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headEquipment, setHeadEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [headTechSpecsLocales, setHeadTechSpecsLocales] = useState<{ en: { form_factor: string; brim_length: string; colours: string[]; additional_features: string[] }; it: { form_factor: string; brim_length: string; colours: string[]; additional_features: string[] } }>({ en: { form_factor: '', brim_length: '', colours: [], additional_features: [] }, it: { form_factor: '', brim_length: '', colours: [], additional_features: [] } });
  const [headAttributes, setHeadAttributes] = useState<any>({ form_factor: '', brim_length: '', size_min_cm: null, size_max_cm: null, weight_g: null, colours: [], ventilation: null, harness_points: null, chinstrap_points: null, sweatband: null, closed_shell: null, euroslot_mm: null, accessories: [] });
  const [clothingStandards, setClothingStandards] = useState<any>({ en_iso_20471: { class: null }, en_iso_11612: {}, iec_61482_2: { class: null }, en_1149_5: false });
  const [clothingAttributes, setClothingAttributes] = useState<any>({ fit: '', gender: '', size_range: '', colours: [], uv_protection: null });
  const [clothingAttributesLocales, setClothingAttributesLocales] = useState<{ en: { fit: string; size_range: string }; it: { fit: string; size_range: string } }>({ en: { fit: '', size_range: '' }, it: { fit: '', size_range: '' } });
  const [clothingType, setClothingType] = useState<string>('');
  const [clothingCategory, setClothingCategory] = useState<string>('');
  const [armAttributes, setArmAttributes] = useState<any>({ thumb_loop: null, closure: '', size: '', length_cm: null, ce_category: '' });
  const [armMaterialsLocales, setArmMaterialsLocales] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  // Gloves safety JSON
  const defaultSafety: any = { en_388: { enabled: false, abrasion: null, cut: null, tear: null, puncture: null, iso_13997: null, impact_en_13594: null }, en_407: { enabled: false, contact_heat: null, radiant_heat: null, convective_heat: null, limited_flame_spread: null, small_splashes_molten_metal: null, large_quantities_molten_metal: null }, en_511: { enabled: false, contact_cold: null, convective_cold: null, water_permeability: null } };
  const [safety, setSafety] = useState<any>(defaultSafety);
  // Respiratory-specific
  const [respiratoryStandards, setRespiratoryStandards] = useState<any>({ en149: { enabled: false, class: '', r: false, nr: false, d: false }, en14387: { enabled: false, class: '', gases: {} }, en143: { enabled: false, class: '', r: false, nr: false }, en136: { enabled: false, class: '' }, en140: { enabled: false }, en166: { enabled: false, class: '' }, din_3181_3: { enabled: false }, has_dust: false, has_gases_vapours: false, has_combined: false });
  const [respConnectionsLocales, setRespConnectionsLocales] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [respFilterType, setRespFilterType] = useState<string>('');
  const [respProtectionClass, setRespProtectionClass] = useState<string>('');
  const [respNpf, setRespNpf] = useState<string>('');
  const [respProtectionCodes, setRespProtectionCodes] = useState<string[]>([]);
  const [respCompatibleWithLocales, setRespCompatibleWithLocales] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  // Swabs-specific pad size JSON
  const [padEnDiameter, setPadEnDiameter] = useState<number | ''>('');
  const [padEnLength, setPadEnLength] = useState<number | ''>('');
  const [padItDiameter, setPadItDiameter] = useState<number | ''>('');
  const [padItLength, setPadItLength] = useState<number | ''>('');
  const [clothingComfortFeatures, setClothingComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
  const [clothingOtherDetails, setClothingOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
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
        setManufacturersInstructionUrl((product as any).manufacturers_instruction_url || null);
        setManufacturersInstructionUrlIt((product as any).manufacturers_instruction_url_it || null);
        setRelatedProductId1((product as any).related_product_id_1 || null);
        setRelatedProductId2((product as any).related_product_id_2 || null);
        setRelatedProductId3((product as any).related_product_id_3 || null);
        setRelatedProductId4((product as any).related_product_id_4 || null);

        // Category-specific blocks
        setEyeFaceAttributes((product as any).eye_face_attributes || { has_ir: false, has_uv: false, has_arc: false, has_sun: false, has_glare: false, has_welding: false, uv_code: '', lens_tint: '' });
        setEyeFaceStandards((product as any).eye_face_standards || { en166: { optical_class: '', mechanical_strength: '', frame_mark: '', lens_mark: '', additional_marking: '' }, en169: false, en170: false, en172: false, en175: false, gs_et_29: false });
        setEyeFaceCoatingsLocales((product as any).coatings_locales || { en: [], it: [] });
        setEyeFaceMaterialsLocales((product as any).eye_face_materials_locales || { en: { lens: '', frame: '', arm: '', headband: '' }, it: { lens: '', frame: '', arm: '', headband: '' } });
        setEyeFaceComfortFeatures((product as any).eye_face_comfort_features_locales || { en: [], it: [] });
        setEyeFaceEquipment((product as any).eye_face_equipment_locales || { en: [], it: [] });
        setHearingStandards((product as any).hearing_standards || { en352: { parts: [], snr_db: null, hml: { h: null, m: null, l: null }, additional: [] } });
        const ha = (product as any).hearing_attributes || {};
        setHearingAttributes({ reusable: ha.reusable ?? null, mount: ha.mount ?? '', bluetooth: ha.bluetooth ?? null, materials: ha.materials ?? [], size: ha.size ?? '', ce_category: ha.ce_category ?? '', water_resistance: ha.water_resistance ?? null, extreme_temperature: ha.extreme_temperature ?? null, electrical_insulation: ha.electrical_insulation ?? null });
        setHearingCompatibleWithLocales(ha.compatible_with_locales || { en: [], it: [] });
        setHearingAccessoriesLocales(ha.accessories_locales || { en: [], it: [] });
        setHearingComfortFeatures((product as any).hearing_comfort_features_locales || { en: [], it: [] });
        setHearingOtherDetails((product as any).hearing_other_details_locales || { en: [], it: [] });
        setHearingEquipment((product as any).hearing_equipment_locales || { en: [], it: [] });
        setRespiratoryComfortFeatures((product as any).respiratory_comfort_features_locales || { en: [], it: [] });
        setRespiratoryOtherDetails((product as any).respiratory_other_details_locales || { en: [], it: [] });
        setRespiratoryEquipment((product as any).respiratory_equipment_locales || { en: [], it: [] });
        setClothingComfortFeatures((product as any).clothing_comfort_features_locales || { en: [], it: [] });
        setClothingOtherDetails((product as any).clothing_other_details_locales || { en: [], it: [] });
        setFootwearStandards((product as any).footwear_standards || { en_iso_20345_2011: [], en_iso_20345_2022: [], slip_resistance: '' });
        setFootwearAttributes((product as any).footwear_attributes || { class: '', esd: null, metal_free: null, width_fit: [], size_min: null, size_max: null, gender: '', weight_grams: null, weight_ref_size: null, special: [], toe_cap: '', sole_material: '', upper_material: '', lining_material: '', insole_material: '', metatarsal_protection: null });
        setFootwearMaterialsLocales((product as any).footwear_materials_locales || { en: { upper: '', lining: '', sole: '', insole: '', toe_cap: '' }, it: { upper: '', lining: '', sole: '', insole: '', toe_cap: '' } });
        setFootwearComfortFeatures((product as any).footwear_comfort_features_locales || { en: [], it: [] });
        setFootwearSpecialFeatures((product as any).footwear_special_features_locales || { en: [], it: [] });
        setHeadStandards((product as any).head_standards || { en397: { present: false, optional: { low_temperature: false, molten_metal: false } }, en50365: false, en12492: false, en812: false });
        setHeadComfortFeatures((product as any).head_comfort_features_locales || { en: [], it: [] });
        setHeadOtherDetails((product as any).head_other_details_locales || { en: [], it: [] });
        setHeadEquipment((product as any).head_equipment_locales || { en: [], it: [] });
        setHeadTechSpecsLocales((product as any).head_tech_specs_locales || { en: { form_factor: '', brim_length: '', colours: [], additional_features: [] }, it: { form_factor: '', brim_length: '', colours: [], additional_features: [] } });
        setHeadAttributes((product as any).head_attributes || { form_factor: '', brim_length: '', size_min_cm: null, size_max_cm: null, weight_g: null, colours: [], ventilation: null, harness_points: null, chinstrap_points: null, sweatband: null, closed_shell: null, euroslot_mm: null, accessories: [] });
        setClothingStandards((product as any).clothing_standards || { en_iso_20471: { class: null }, en_iso_11612: {}, iec_61482_2: { class: null }, en_1149_5: false });
        setClothingAttributes((product as any).clothing_attributes || { fit: '', gender: '', size_range: '', colours: [], uv_protection: null });
        setClothingAttributesLocales((product as any).clothing_attributes_locales || { en: { fit: '', size_range: '' }, it: { fit: '', size_range: '' } });
        setClothingType((product as any).clothing_type || '');
        setClothingCategory((product as any).clothing_category || '');
        const aa = (product as any).arm_attributes || {};
        setArmAttributes({ thumb_loop: aa.thumb_loop ?? null, closure: aa.closure ?? '', size: aa.size ?? '', length_cm: aa.length_cm ?? null, ce_category: aa.ce_category ?? '' });
        setArmMaterialsLocales(aa.materials_locales || { en: [], it: [] });
        setSafety((product as any).safety && typeof (product as any).safety === 'object' ? (product as any).safety : defaultSafety);
        // Respiratory
        setRespiratoryStandards((product as any).respiratory_standards || { en149: { enabled: false, class: '', r: false, nr: false, d: false }, en14387: { enabled: false, class: '', gases: {} }, en143: { enabled: false, class: '', r: false, nr: false }, en136: { enabled: false, class: '' }, en140: { enabled: false }, en166: { enabled: false, class: '' }, din_3181_3: { enabled: false }, has_dust: false, has_gases_vapours: false, has_combined: false });
        setRespConnectionsLocales((product as any).connections_locales || { en: [], it: [] });
        setRespFilterType((product as any).filter_type || '');
        setRespProtectionClass((product as any).protection_class || '');
        setRespNpf((product as any).npf || '');
        setRespProtectionCodes(Array.isArray((product as any).protection_codes) ? (product as any).protection_codes : []);
        setRespCompatibleWithLocales((product as any).compatible_with_locales || { en: [], it: [] });
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
        setEnvironmentPictograms((product as any).environment_pictograms || {
          dry: false,
          wet: false,
          dust: false,
          chemical: false,
          biological: false,
          oily_grease: false
        });
      } catch (e) {
        console.error(e);
        toast({ title: 'Error', description: 'Failed to load product', variant: 'destructive' });
        router.push(`/admin/prod-management/${slug}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, slug, router]);

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

  // Load available products for related products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, image_url, category, sub_category')
          .eq('published', true)
          .order('name');
        if (error) throw error;
        setAvailableProducts(data || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    loadProducts();
  }, [supabase]);

  async function uploadPdfToBucket(file: File, prefix: string) {
    try {
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
    }
  }

  // Related products helpers
  const getRelatedProductIds = () => {
    return [relatedProductId1, relatedProductId2, relatedProductId3, relatedProductId4].filter(Boolean) as string[];
  };

  const addRelatedProduct = (productId: string) => {
    if (!relatedProductId1) {
      setRelatedProductId1(productId);
    } else if (!relatedProductId2) {
      setRelatedProductId2(productId);
    } else if (!relatedProductId3) {
      setRelatedProductId3(productId);
    } else if (!relatedProductId4) {
      setRelatedProductId4(productId);
    }
  };

  const removeRelatedProduct = (productId: string) => {
    if (relatedProductId1 === productId) setRelatedProductId1(null);
    else if (relatedProductId2 === productId) setRelatedProductId2(null);
    else if (relatedProductId3 === productId) setRelatedProductId3(null);
    else if (relatedProductId4 === productId) setRelatedProductId4(null);
  };

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
        environment_pictograms: environmentPictograms,
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
        manufacturers_instruction_url: manufacturersInstructionUrl,
        manufacturers_instruction_url_it: manufacturersInstructionUrlIt,
        related_product_id_1: relatedProductId1,
        related_product_id_2: relatedProductId2,
        related_product_id_3: relatedProductId3,
        related_product_id_4: relatedProductId4,
        updated_at: new Date().toISOString(),
        // Category-specific payloads
        safety: (slug === 'gloves' || slug === 'arm-protection') ? safety : (undefined as any),
        eye_face_attributes: eyeFaceAttributes,
        eye_face_standards: eyeFaceStandards,
        coatings_locales: eyeFaceCoatingsLocales,
        eye_face_materials_locales: eyeFaceMaterialsLocales,
        hearing_standards: hearingStandards,
        hearing_attributes: {
          ...hearingAttributes,
          compatible_with_locales: hearingCompatibleWithLocales,
          accessories_locales: hearingAccessoriesLocales
        },
        hearing_comfort_features_locales: hearingComfortFeatures,
        hearing_other_details_locales: hearingOtherDetails,
        hearing_equipment_locales: hearingEquipment,
        respiratory_comfort_features_locales: respiratoryComfortFeatures,
        respiratory_other_details_locales: respiratoryOtherDetails,
        respiratory_equipment_locales: respiratoryEquipment,
        footwear_standards: footwearStandards,
        footwear_attributes: footwearAttributes,
        footwear_materials_locales: footwearMaterialsLocales,
        footwear_comfort_features_locales: footwearComfortFeatures,
        footwear_special_features_locales: footwearSpecialFeatures,
        head_standards: headStandards,
        head_attributes: headAttributes,
        head_tech_specs_locales: headTechSpecsLocales,
        head_other_details_locales: headOtherDetails,
        head_equipment_locales: headEquipment,
        head_comfort_features_locales: headComfortFeatures,
        clothing_standards: clothingStandards,
        clothing_attributes: clothingAttributes,
        clothing_attributes_locales: clothingAttributesLocales,
        clothing_type: clothingType || null,
        clothing_category: clothingCategory || null,
        clothing_comfort_features_locales: clothingComfortFeatures,
        clothing_other_details_locales: clothingOtherDetails,
        arm_attributes: {
          ...armAttributes,
          materials_locales: armMaterialsLocales
        },
        eye_face_comfort_features_locales: eyeFaceComfortFeatures,
        eye_face_equipment_locales: eyeFaceEquipment,
        respiratory_standards: respiratoryStandards,
        connections_locales: respConnectionsLocales,
        filter_type: respFilterType || undefined,
        protection_class: respProtectionClass || undefined,
        npf: respNpf || undefined,
        protection_codes: respProtectionCodes,
        compatible_with_locales: respCompatibleWithLocales,
        pad_size_json: ((): any => {
          const en = { diameter_mm: typeof padEnDiameter === 'number' ? padEnDiameter : undefined, length_mm: typeof padEnLength === 'number' ? padEnLength : undefined };
          const it = { diametro_mm: typeof padItDiameter === 'number' ? padItDiameter : undefined, lunghezza_mm: typeof padItLength === 'number' ? padItLength : undefined };
          const hasEn = typeof en.diameter_mm === 'number' || typeof en.length_mm === 'number';
          const hasIt = typeof it.diametro_mm === 'number' || typeof it.lunghezza_mm === 'number';
          if (!hasEn && !hasIt) return undefined;
          return { ...(hasEn ? { en } : {}), ...(hasIt ? { it } : {}) };
        })(),
        length_cm: (slug === 'industrial-swabs' || slug === 'gloves') ? (lengthCm ?? null) : undefined,
        ce_category: (slug === 'industrial-swabs' || slug === 'gloves' || slug === 'hearing' || slug === 'clothing' || slug === 'respiratory' || slug === 'footwear' || slug === 'head' || slug === 'arm-protection') ? (ceCategory || null) : undefined,
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
          <TabsTrigger value="related">Related Products</TabsTrigger>
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
                  <CardDescription className="text-xs sm:text-sm">Configure technical specifications and standards.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    {slug !== 'respiratory' && (
                      <>
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
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Length (cm)</Label>
                      <Input type="number" value={lengthCm === null ? '' : lengthCm} onChange={(e)=> setLengthCm(e.target.value === '' ? null : Number(e.target.value))} />
                    </div>
                      </>
                    )}
                    <div className="space-y-1 sm:space-y-2">
                      <Label>Size</Label>
                      <Input value={sizeLocales.en} onChange={(e)=> setSizeLocales({...sizeLocales, en: e.target.value})} placeholder="e.g. One size, S, M, L, XL" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label>CE Category</Label>
                      <Input value={ceCategory} onChange={(e)=> setCeCategory(e.target.value)} placeholder="e.g. I, II, III" />
                    </div>
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
                {/* Features / Safety Features */}
                <LocaleListEditor title={(slug === 'hearing' || slug === 'footwear') ? 'Safety Features' : 'Features'} items={featuresLocales[language]} onAdd={(val)=> setFeaturesLocales({ ...featuresLocales, [language]: [...featuresLocales[language], val] })} onRemove={(idx)=> setFeaturesLocales({ ...featuresLocales, [language]: featuresLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Applications */}
                <LocaleListEditor title="Applications" items={applicationsLocales[language]} onAdd={(val)=> setApplicationsLocales({ ...applicationsLocales, [language]: [...applicationsLocales[language], val] })} onRemove={(idx)=> setApplicationsLocales({ ...applicationsLocales, [language]: applicationsLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Industries */}
                <LocaleListEditor title="Industries" items={industriesLocales[language]} onAdd={(val)=> setIndustriesLocales({ ...industriesLocales, [language]: [...industriesLocales[language], val] })} onRemove={(idx)=> setIndustriesLocales({ ...industriesLocales, [language]: industriesLocales[language].filter((_,i)=> i!==idx) })} />
                {/* Materials */}
                {slug === 'footwear' ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Materials for footwear products are managed in the <strong>Safety & Specs</strong> tab with detailed breakdown (Upper, Lining, Sole, Insole, Toe Cap).
                      </p>
                    </CardContent>
                  </Card>
                ) : slug === 'eye-face' ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Materials for eye-face products are managed in the <strong>Safety & Specs</strong> tab with detailed breakdown (Lens, Frame, Arm, Headband).
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                <LocaleListEditor title="Materials" items={materialsLocales[language]} onAdd={(val)=> setMaterialsLocales({ ...materialsLocales, [language]: [...materialsLocales[language], val] })} onRemove={(idx)=> setMaterialsLocales({ ...materialsLocales, [language]: materialsLocales[language].filter((_,i)=> i!==idx) })} />
                )}
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
            productId={id}
          />
          <div className="mt-4">
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
                  </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Technical sheets and declarations (EN/IT).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Technical Sheets */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Sheets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Technical Sheet (EN)</Label>
                  {technicalSheetUrl ? (
                        <div className="flex items-center justify-between mt-2 border rounded p-3 bg-white dark:bg-gray-900">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {decodeURIComponent(technicalSheetUrl.split('/').pop() || 'Technical Sheet')}
                            </p>
                            <a href={technicalSheetUrl} className="text-xs text-blue-600 hover:underline" target="_blank" rel="noreferrer">Download</a>
                          </div>
                          <Button variant="destructive" size="sm" onClick={()=> setTechnicalSheetUrl(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2 space-y-2">
                          <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={async (e)=>{ 
                              const f=e.target.files?.[0]; 
                              if (!f) return; 
                              const url = await uploadPdfToBucket(f,'tech_en'); 
                              if (url) setTechnicalSheetUrl(url); 
                            }} 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary/90"
                          />
                        </div>
                  )}
                </div>
                <div>
                  <Label>Technical Sheet (IT)</Label>
                  {technicalSheetUrlIt ? (
                        <div className="flex items-center justify-between mt-2 border rounded p-3 bg-white dark:bg-gray-900">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {decodeURIComponent(technicalSheetUrlIt.split('/').pop() || 'Technical Sheet')}
                            </p>
                            <a href={technicalSheetUrlIt} className="text-xs text-blue-600 hover:underline" target="_blank" rel="noreferrer">Download</a>
                          </div>
                          <Button variant="destructive" size="sm" onClick={()=> setTechnicalSheetUrlIt(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2 space-y-2">
                          <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={async (e)=>{ 
                              const f=e.target.files?.[0]; 
                              if (!f) return; 
                              const url = await uploadPdfToBucket(f,'tech_it'); 
                              if (url) setTechnicalSheetUrlIt(url); 
                            }} 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary/90"
                          />
                        </div>
                  )}
                </div>
                  </div>
                </div>

                {/* Manufacturers Instructions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Manufacturers Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Manufacturers Instruction (EN)</Label>
                      {manufacturersInstructionUrl ? (
                        <div className="flex items-center justify-between mt-2 border rounded p-3 bg-white dark:bg-gray-900">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {decodeURIComponent(manufacturersInstructionUrl.split('/').pop() || 'Manufacturers Instruction')}
                            </p>
                            <a href={manufacturersInstructionUrl} className="text-xs text-blue-600 hover:underline" target="_blank" rel="noreferrer">Download</a>
                          </div>
                          <Button variant="destructive" size="sm" onClick={()=> setManufacturersInstructionUrl(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2 space-y-2">
                          <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={async (e)=>{ 
                              const f=e.target.files?.[0]; 
                              if (!f) return; 
                              const url = await uploadPdfToBucket(f,'manu_en'); 
                              if (url) setManufacturersInstructionUrl(url); 
                            }} 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary/90"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label>Manufacturers Instruction (IT)</Label>
                      {manufacturersInstructionUrlIt ? (
                        <div className="flex items-center justify-between mt-2 border rounded p-3 bg-white dark:bg-gray-900">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {decodeURIComponent(manufacturersInstructionUrlIt.split('/').pop() || 'Manufacturers Instruction')}
                            </p>
                            <a href={manufacturersInstructionUrlIt} className="text-xs text-blue-600 hover:underline" target="_blank" rel="noreferrer">Download</a>
                          </div>
                          <Button variant="destructive" size="sm" onClick={()=> setManufacturersInstructionUrlIt(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2 space-y-2">
                          <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={async (e)=>{ 
                              const f=e.target.files?.[0]; 
                              if (!f) return; 
                              const url = await uploadPdfToBucket(f,'manu_it'); 
                              if (url) setManufacturersInstructionUrlIt(url); 
                            }} 
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary/90"
                          />
                        </div>
                      )}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      For comprehensive declaration management with multiple languages and UKCA support, use the dedicated{' '}
                      <Link href="/admin/declarations" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        Declarations Management page
                      </Link>
                      .
                    </p>
                  </div>
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
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Attributes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Checkbox checked={!!eyeFaceAttributes.has_ir} onCheckedChange={(v)=> setEyeFaceAttributes({ ...eyeFaceAttributes, has_ir: !!v })} />
                            <Label className="font-normal">IR protection</Label>
                    </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={!!eyeFaceAttributes.has_uv} onCheckedChange={(v)=> setEyeFaceAttributes({ ...eyeFaceAttributes, has_uv: !!v })} />
                            <Label className="font-normal">UV protection</Label>
                      </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={!!eyeFaceAttributes.has_arc} onCheckedChange={(v)=> setEyeFaceAttributes({ ...eyeFaceAttributes, has_arc: !!v })} />
                            <Label className="font-normal">Arc protection</Label>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label>UV code</Label>
                            <Input value={eyeFaceAttributes.uv_code || ''} onChange={(e)=> setEyeFaceAttributes({ ...eyeFaceAttributes, uv_code: e.target.value })} />
                          </div>
                          <div className="space-y-1">
                            <Label>Lens tint</Label>
                            <Input value={eyeFaceAttributes.lens_tint || ''} onChange={(e)=> setEyeFaceAttributes({ ...eyeFaceAttributes, lens_tint: e.target.value })} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Coatings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <LocaleListEditor 
                          title="" 
                          items={eyeFaceCoatingsLocales[language] || []} 
                          onAdd={(val)=> setEyeFaceCoatingsLocales({ ...eyeFaceCoatingsLocales, [language]: [...(eyeFaceCoatingsLocales[language] || []), val] })} 
                          onRemove={(idx)=> setEyeFaceCoatingsLocales({ ...eyeFaceCoatingsLocales, [language]: (eyeFaceCoatingsLocales[language] || []).filter((_,i)=> i!==idx) })} 
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Materials</CardTitle>
                      </CardHeader>
                      <CardContent>
                    <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-gray-600">Lens Material</Label>
                            <Input 
                              value={eyeFaceMaterialsLocales[language].lens || ''} 
                              onChange={(e) => setEyeFaceMaterialsLocales({ ...eyeFaceMaterialsLocales, [language]: { ...eyeFaceMaterialsLocales[language], lens: e.target.value } })} 
                              placeholder="e.g. PC, Polycarbonate"
                            />
                      </div>
                          <div>
                            <Label className="text-xs text-gray-600">Frame Material</Label>
                            <Input 
                              value={eyeFaceMaterialsLocales[language].frame || ''} 
                              onChange={(e) => setEyeFaceMaterialsLocales({ ...eyeFaceMaterialsLocales, [language]: { ...eyeFaceMaterialsLocales[language], frame: e.target.value } })} 
                              placeholder="e.g. Plastic, Nylon"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Arm Material</Label>
                            <Input 
                              value={eyeFaceMaterialsLocales[language].arm || ''} 
                              onChange={(e) => setEyeFaceMaterialsLocales({ ...eyeFaceMaterialsLocales, [language]: { ...eyeFaceMaterialsLocales[language], arm: e.target.value } })} 
                              placeholder="e.g. Plastic, Rubber"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Headband Material</Label>
                            <Input 
                              value={eyeFaceMaterialsLocales[language].headband || ''} 
                              onChange={(e) => setEyeFaceMaterialsLocales({ ...eyeFaceMaterialsLocales, [language]: { ...eyeFaceMaterialsLocales[language], headband: e.target.value } })} 
                              placeholder="e.g. Fabric, Elastic"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Standards</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-base font-medium mb-3 block">EN 166</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label>Optical class</Label>
                              <Input value={eyeFaceStandards.en166?.optical_class || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, optical_class: e.target.value } })} />
                            </div>
                            <div className="space-y-1">
                              <Label>Mechanical strength</Label>
                              <Input value={eyeFaceStandards.en166?.mechanical_strength || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, mechanical_strength: e.target.value } })} />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <Label>Frame mark</Label>
                              <Input value={eyeFaceStandards.en166?.frame_mark || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, frame_mark: e.target.value } })} />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <Label>Lens mark</Label>
                              <Input value={eyeFaceStandards.en166?.lens_mark || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, lens_mark: e.target.value } })} />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <Label>Additional marking</Label>
                              <Input value={eyeFaceStandards.en166?.additional_marking || ''} onChange={(e)=> setEyeFaceStandards({ ...eyeFaceStandards, en166: { ...eyeFaceStandards.en166, additional_marking: e.target.value } })} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label className="text-base font-medium mb-3 block">Additional Standards</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['en169','en170','en172','en175','gs_et_29'].map(code => (
                              <div key={code} className="flex items-center gap-2">
                                <Checkbox checked={!!eyeFaceStandards[code]} onCheckedChange={(v)=> setEyeFaceStandards({ ...eyeFaceStandards, [code]: !!v })} />
                                <Label className="font-normal uppercase">{code.replace('_','-')}</Label>
                              </div>
                        ))}
                      </div>
                    </div>
                      </CardContent>
                    </Card>

                    <LocaleListEditor 
                      title="Comfort features" 
                      items={eyeFaceComfortFeatures[language] || []} 
                      onAdd={(val)=> setEyeFaceComfortFeatures({ ...eyeFaceComfortFeatures, [language]: [...(eyeFaceComfortFeatures[language] || []), val] })} 
                      onRemove={(idx)=> setEyeFaceComfortFeatures({ ...eyeFaceComfortFeatures, [language]: (eyeFaceComfortFeatures[language] || []).filter((_,i)=> i!==idx) })} 
                    />

                    <LocaleListEditor 
                      title="Equipment" 
                      items={eyeFaceEquipment[language] || []} 
                      onAdd={(val)=> setEyeFaceEquipment({ ...eyeFaceEquipment, [language]: [...(eyeFaceEquipment[language] || []), val] })} 
                      onRemove={(idx)=> setEyeFaceEquipment({ ...eyeFaceEquipment, [language]: (eyeFaceEquipment[language] || []).filter((_,i)=> i!==idx) })} 
                    />
                  </>
                )}

                {slug === 'eye-face' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Protective Filters</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Configure which protective filters this eye/face protection provides
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                          { 
                            key: 'has_sun' as const, 
                            icon: 'Sun', 
                            label: 'Sun',
                            description: 'Sun protection'
                          },
                          { 
                            key: 'has_glare' as const, 
                            icon: 'Eye', 
                            label: 'Glare',
                            description: 'Anti-glare protection'
                          },
                          { 
                            key: 'has_ir' as const, 
                            icon: 'Flame', 
                            label: 'IR',
                            description: 'Infrared protection'
                          },
                          { 
                            key: 'has_welding' as const, 
                            icon: 'Zap', 
                            label: 'Welding',
                            description: 'Welding protection'
                          },
                          { 
                            key: 'has_uv' as const, 
                            icon: 'Sun', 
                            label: 'UV',
                            description: 'UV protection'
                          },
                        ].map((item) => {
                          const isEnabled = eyeFaceAttributes[item.key] || false;
                          
                          return (
                            <div
                              key={item.key}
                              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-4 ${
                                isEnabled
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {item.icon === 'Sun' && <Sun className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Eye' && <Eye className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Flame' && <Shield className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Zap' && <Zap className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  <div>
                                    <Label className={`font-medium text-sm ${
                                      isEnabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                                    }`}>
                                      {item.label}
                                    </Label>
                  </div>
                                </div>
                                <Switch
                                  checked={isEnabled}
                                  onCheckedChange={(checked) => setEyeFaceAttributes({
                                    ...eyeFaceAttributes,
                                    [item.key]: checked
                                  })}
                                  className="data-[state=checked]:bg-green-600"
                                />
                              </div>
                              
                              <p className={`text-xs ${
                                isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {slug === 'eye-face' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Work Environment Suitability</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Configure which work environments this eye/face protection is suitable for
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { 
                            key: 'chemical' as const, 
                            icon: 'FlaskConical', 
                            label: 'Chemical Exposure',
                            description: 'Suitable for chemical exposure'
                          },
                          { 
                            key: 'biological' as const, 
                            icon: 'Bug', 
                            label: 'Biological Hazards',
                            description: 'Suitable for biological hazards'
                          },
                          { 
                            key: 'electrical' as const, 
                            icon: 'Zap', 
                            label: 'Electrical risk',
                            description: 'Suitable for electrical risk'
                          },
                        ].map((item) => {
                          const isEnabled = environmentPictograms[item.key] || false;
                          
                          return (
                            <div
                              key={item.key}
                              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-4 ${
                                isEnabled
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {item.icon === 'FlaskConical' && <FlaskConical className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Bug' && <Bug className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Zap' && <Zap className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  <div>
                                    <Label className={`font-medium text-sm ${
                                      isEnabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                                    }`}>
                                      {item.label}
                                    </Label>
                                  </div>
                                </div>
                                <Switch
                                  checked={isEnabled}
                                  onCheckedChange={(checked) => setEnvironmentPictograms({
                                    ...environmentPictograms,
                                    [item.key]: checked
                                  })}
                                  className="data-[state=checked]:bg-green-600"
                                />
                              </div>
                              
                              <p className={`text-xs ${
                                isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {slug === 'hearing' && (
                  <HearingSafetyStandardsEditor 
                    language={language}
                    hearingStandards={hearingStandards}
                    setHearingStandards={setHearingStandards}
                    hearingAttributes={hearingAttributes}
                    setHearingAttributes={setHearingAttributes}
                    hearingCompatibleWithLocales={hearingCompatibleWithLocales}
                    setHearingCompatibleWithLocales={setHearingCompatibleWithLocales}
                    hearingAccessoriesLocales={hearingAccessoriesLocales}
                    setHearingAccessoriesLocales={setHearingAccessoriesLocales}
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
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Standards</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en149?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en149: { ...(respiratoryStandards.en149||{}), enabled: !!v } })} /><span>EN 149</span></div><Input placeholder="Class e.g. FFP3" value={respiratoryStandards.en149?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en149: { ...(respiratoryStandards.en149||{}), class: e.target.value } })} /></div>
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en143?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en143: { ...(respiratoryStandards.en143||{}), enabled: !!v } })} /><span>EN 143</span></div><Input placeholder="Class e.g. P3" value={respiratoryStandards.en143?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en143: { ...(respiratoryStandards.en143||{}), class: e.target.value } })} /></div>
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en14387?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en14387: { ...(respiratoryStandards.en14387||{}), enabled: !!v } })} /><span>EN 14387</span></div><Input placeholder="Class e.g. A2B2E2K2" value={respiratoryStandards.en14387?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en14387: { ...(respiratoryStandards.en14387||{}), class: e.target.value, gases: respiratoryStandards.en14387?.gases || {} } })} /></div>
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en136?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en136: { ...(respiratoryStandards.en136||{}), enabled: !!v } })} /><span>EN 136</span></div><Input placeholder="Class" value={respiratoryStandards.en136?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en136: { ...(respiratoryStandards.en136||{}), class: e.target.value } })} /></div>
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en166?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en166: { ...(respiratoryStandards.en166||{}), enabled: !!v } })} /><span>EN 166</span></div><Input placeholder="Class" value={respiratoryStandards.en166?.class || ''} onChange={(e)=> setRespiratoryStandards({ ...respiratoryStandards, en166: { ...(respiratoryStandards.en166||{}), class: e.target.value } })} /></div>
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.en140?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, en140: { ...(respiratoryStandards.en140||{}), enabled: !!v } })} /><span>EN 140</span></div></div>
                          <div className="space-y-1"><div className="flex items-center gap-2"><Checkbox checked={!!respiratoryStandards.din_3181_3?.enabled} onCheckedChange={(v)=> setRespiratoryStandards({ ...respiratoryStandards, din_3181_3: { ...(respiratoryStandards.din_3181_3||{}), enabled: !!v } })} /><span>DIN 3181-3</span></div></div>
                      </div>

                        {respiratoryStandards.en149?.enabled && (
                          <div className="space-y-2">
                            <Label>EN 149 Attributes</Label>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="flex items-center gap-2">
                                <Checkbox 
                                  checked={!!respiratoryStandards.en149?.nr} 
                                  onCheckedChange={(v) => setRespiratoryStandards({ 
                                    ...respiratoryStandards, 
                                    en149: { ...(respiratoryStandards.en149 || {}), nr: !!v } 
                                  })} 
                                />
                                <Label className="font-normal">NR (Non-reusable)</Label>
                    </div>
                              <div className="flex items-center gap-2">
                                <Checkbox 
                                  checked={!!respiratoryStandards.en149?.r} 
                                  onCheckedChange={(v) => setRespiratoryStandards({ 
                                    ...respiratoryStandards, 
                                    en149: { ...(respiratoryStandards.en149 || {}), r: !!v } 
                                  })} 
                                />
                                <Label className="font-normal">R (Reusable)</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox 
                                  checked={!!respiratoryStandards.en149?.d} 
                                  onCheckedChange={(v) => setRespiratoryStandards({ 
                                    ...respiratoryStandards, 
                                    en149: { ...(respiratoryStandards.en149 || {}), d: !!v } 
                                  })} 
                                />
                                <Label className="font-normal">D (High dust)</Label>
                              </div>
                            </div>
                          </div>
                        )}

                        {respiratoryStandards.en14387?.enabled && (
                          <div className="space-y-2">
                            <Label>EN 14387 Gas Filters (click tiles to toggle)</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {[
                                { code: 'a', label: 'Organic gases', color: 'bg-amber-700', textColor: 'text-white' },
                                { code: 'b', label: 'Inorganic gases', color: 'bg-gray-500', textColor: 'text-white' },
                                { code: 'e', label: 'Acid gases', color: 'bg-yellow-500', textColor: 'text-black' },
                                { code: 'k', label: 'Ammonia', color: 'bg-green-600', textColor: 'text-white' },
                                { code: 'ax', label: 'Organic gas < 65°C', color: 'bg-amber-600', textColor: 'text-white' },
                                { code: 'hg', label: 'Mercury', color: 'bg-red-600', textColor: 'text-white' },
                                { code: 'no', label: 'Nitrous gas', color: 'bg-blue-600', textColor: 'text-white' },
                                { code: 'sx', label: 'Specific gas', color: 'bg-orange-600', textColor: 'text-white' },
                                { code: 'co', label: 'Carbon monoxide', color: 'bg-black', textColor: 'text-white' },
                                { code: 'p', label: 'Dust', color: 'bg-gray-100', textColor: 'text-black' },
                              ].map((gas) => {
                                const currentGases = respiratoryStandards.en14387?.gases || {};
                                // Check both lowercase and uppercase versions
                                const isActive = !!(currentGases[gas.code] || currentGases[gas.code.toUpperCase()]);
                                const displayCode = gas.code === 'hg' ? 'Hg' : gas.code.toUpperCase();
                                
                                return (
                                  <div 
                                    key={gas.code}
                                    onClick={() => {
                                      const newGases = { ...currentGases };
                                      // Remove both uppercase and lowercase versions
                                      delete newGases[gas.code];
                                      delete newGases[gas.code.toUpperCase()];
                                      // If was inactive, add it as lowercase
                                      if (!isActive) {
                                        newGases[gas.code] = true;
                                      }
                                      setRespiratoryStandards({
                                        ...respiratoryStandards,
                                        en14387: {
                                          ...(respiratoryStandards.en14387 || {}),
                                          gases: newGases
                                        }
                                      });
                                    }}
                                    className={`cursor-pointer rounded-lg border-2 p-2.5 transition-all ${
                                      isActive 
                                        ? `${gas.color} ${gas.textColor} border-gray-700 shadow-md` 
                                        : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                                    }`}
                                  >
                                    <div className="text-center">
                                      <div className={`text-sm font-bold font-mono mb-0.5 ${isActive ? '' : 'text-gray-900'}`}>
                                        {displayCode}
                                      </div>
                                      <div className={`text-xs ${isActive ? '' : 'text-gray-600'}`}>
                                        {gas.label}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                      </CardContent>
                    </Card>
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
                )}

                {slug === 'respiratory' && (
                  <Card className="mt-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Protection (filters fitted)</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Configure which protection this respiratory product provides
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { 
                            key: 'has_dust' as const, 
                            icon: 'Wind', 
                            label: 'Dust',
                            description: 'Dust protection'
                          },
                          { 
                            key: 'has_gases_vapours' as const, 
                            icon: 'FlaskConical', 
                            label: 'Gases & Vapours',
                            description: 'Gases & Vapours protection'
                          },
                          { 
                            key: 'has_combined' as const, 
                            icon: 'Zap', 
                            label: 'Combined',
                            description: 'Combined protection'
                          },
                        ].map((item) => {
                          const isEnabled = respiratoryStandards[item.key] || false;
                          
                          return (
                            <div
                              key={item.key}
                              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-4 ${
                                isEnabled
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {item.icon === 'Wind' && <Wind className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'FlaskConical' && <FlaskConical className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Zap' && <Zap className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  <div>
                                    <Label className={`font-medium text-sm ${
                                      isEnabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                                    }`}>
                                      {item.label}
                                    </Label>
                    </div>
                  </div>
                                <Switch
                                  checked={isEnabled}
                                  onCheckedChange={(checked) => setRespiratoryStandards({
                                    ...respiratoryStandards,
                                    [item.key]: checked
                                  })}
                                  className="data-[state=checked]:bg-green-600"
                                />
                              </div>
                              
                              <p className={`text-xs ${
                                isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {slug === 'footwear' && (
                  <FootwearSafetyStandardsEditor 
                    language={language}
                    footwearStandards={footwearStandards}
                    setFootwearStandards={setFootwearStandards}
                    footwearAttributes={footwearAttributes}
                    setFootwearAttributes={setFootwearAttributes}
                    footwearMaterialsLocales={footwearMaterialsLocales}
                    setFootwearMaterialsLocales={setFootwearMaterialsLocales}
                    footwearComfortFeatures={footwearComfortFeatures}
                    setFootwearComfortFeatures={setFootwearComfortFeatures}
                    footwearSpecialFeatures={footwearSpecialFeatures}
                    setFootwearSpecialFeatures={setFootwearSpecialFeatures}
                  />
                )}

                {slug === 'head' && (
                  <HeadSafetyStandardsEditor 
                    language={language}
                    headStandards={headStandards}
                    setHeadStandards={setHeadStandards}
                    headAttributes={headAttributes}
                    setHeadAttributes={setHeadAttributes}
                    headTechSpecsLocales={headTechSpecsLocales}
                    setHeadTechSpecsLocales={setHeadTechSpecsLocales}
                    headComfortFeatures={headComfortFeatures}
                    setHeadComfortFeatures={setHeadComfortFeatures}
                    headOtherDetails={headOtherDetails}
                    setHeadOtherDetails={setHeadOtherDetails}
                    headEquipment={headEquipment}
                    setHeadEquipment={setHeadEquipment}
                  />
                )}

                {slug === 'arm-protection' && (
                  <ArmSafetyStandardsEditor 
                    language={language}
                    safety={safety}
                    setSafety={setSafety}
                    armAttributes={armAttributes}
                    setArmAttributes={setArmAttributes}
                    materialsLocales={armMaterialsLocales}
                    setMaterialsLocales={setArmMaterialsLocales}
                    environmentPictograms={environmentPictograms}
                    onEnvironmentChange={setEnvironmentPictograms}
                  />
                )}

                {slug === 'clothing' && (
                  <div className="space-y-6">
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
                      <div className="space-y-1"><Label>Fit</Label><Input value={clothingAttributesLocales[language].fit || ''} onChange={(e)=> setClothingAttributesLocales({ ...clothingAttributesLocales, [language]: { ...clothingAttributesLocales[language], fit: e.target.value } })} /></div>
                      <div className="space-y-1"><Label>Size range</Label><Input value={clothingAttributesLocales[language].size_range || ''} onChange={(e)=> setClothingAttributesLocales({ ...clothingAttributesLocales, [language]: { ...clothingAttributesLocales[language], size_range: e.target.value } })} /></div>
                      <div className="flex items-center gap-2"><Checkbox checked={clothingAttributes.uv_protection === true} onCheckedChange={(v)=> setClothingAttributes({ ...clothingAttributes, uv_protection: v ? true : false })} /><span>UV protection</span></div>
                    </div>
                    {/* EN ISO 20471 - Hi-Vis */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">EN ISO 20471 - High Visibility</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Class</Label>
                          <Input 
                            placeholder="e.g. 2"
                            value={clothingStandards.en_iso_20471?.class ?? ''} 
                            onChange={(e)=> setClothingStandards({ ...clothingStandards, en_iso_20471: { class: e.target.value || null } })} 
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* EN ISO 11612 - Heat & Flame */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">EN ISO 11612 - Heat & Flame Protection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>A1 - Flame spread</Label>
                            <Input 
                              placeholder="e.g. A1"
                              value={clothingStandards.en_iso_11612?.a1 ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), a1: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>A2 - Flame spread</Label>
                            <Input 
                              placeholder="e.g. A2"
                              value={clothingStandards.en_iso_11612?.a2 ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), a2: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>B - Convective heat</Label>
                            <Input 
                              placeholder="e.g. B1"
                              value={clothingStandards.en_iso_11612?.b ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), b: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>C - Radiant heat</Label>
                            <Input 
                              placeholder="e.g. C1"
                              value={clothingStandards.en_iso_11612?.c ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), c: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>D - Aluminium splash</Label>
                            <Input 
                              placeholder="e.g. D1"
                              value={clothingStandards.en_iso_11612?.d ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), d: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>E - Iron splash</Label>
                            <Input 
                              placeholder="e.g. E2"
                              value={clothingStandards.en_iso_11612?.e ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), e: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>F - Contact heat</Label>
                            <Input 
                              placeholder="e.g. F1"
                              value={clothingStandards.en_iso_11612?.f ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_iso_11612: { ...(clothingStandards.en_iso_11612 || {}), f: e.target.value || null } 
                              })} 
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* EN ISO 11611 - Welding */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">EN ISO 11611 - Welding</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Class</Label>
                          <Input 
                            placeholder="e.g. Class 1"
                            value={clothingStandards.en_iso_11611?.class ?? ''} 
                            onChange={(e)=> setClothingStandards({ ...clothingStandards, en_iso_11611: { class: e.target.value || null } })} 
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* IEC 61482-2 - Arc */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">IEC 61482-2 - Arc Protection</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Class</Label>
                          <Input 
                            placeholder="e.g. Class 1"
                            value={clothingStandards.iec_61482_2?.class ?? ''} 
                            onChange={(e)=> setClothingStandards({ ...clothingStandards, iec_61482_2: { class: e.target.value || null } })} 
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* EN 343 - Weather Protection */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">EN 343 - Weather Protection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Water resistance</Label>
                            <Input 
                              placeholder="e.g. 2"
                              value={clothingStandards.en_343?.water ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_343: { ...(clothingStandards.en_343 || {}), water: e.target.value || null } 
                              })} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Breathability</Label>
                            <Input 
                              placeholder="e.g. 2"
                              value={clothingStandards.en_343?.breath ?? ''} 
                              onChange={(e)=> setClothingStandards({ 
                                ...clothingStandards, 
                                en_343: { ...(clothingStandards.en_343 || {}), breath: e.target.value || null } 
                              })} 
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Other Standards */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Other Standards</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={!!clothingStandards.en_1149_5} 
                            onCheckedChange={(v)=> setClothingStandards({ ...clothingStandards, en_1149_5: !!v })} 
                          />
                          <Label>EN 1149-5 - Antistatic</Label>
                        </div>
                        <div className="space-y-2">
                          <Label>EN 13034 - Chemical splash protection</Label>
                          <Input 
                            placeholder="e.g. Type 6"
                            value={clothingStandards.en_13034 ?? ''} 
                            onChange={(e)=> setClothingStandards({ ...clothingStandards, en_13034: e.target.value || null })} 
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={!!clothingStandards.uv_standard_801} 
                            onCheckedChange={(v)=> setClothingStandards({ ...clothingStandards, uv_standard_801: !!v })} 
                          />
                          <Label>UV Standard 801</Label>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="space-y-3">
                      <LocaleListEditor 
                        title="Comfort features" 
                        items={clothingComfortFeatures[language]} 
                        onAdd={(val) => setClothingComfortFeatures({ ...clothingComfortFeatures, [language]: [...(clothingComfortFeatures[language] || []), val] })} 
                        onRemove={(idx) => setClothingComfortFeatures({ ...clothingComfortFeatures, [language]: (clothingComfortFeatures[language] || []).filter((_, i) => i !== idx) })} 
                      />
                    </div>
                    <div className="space-y-3">
                      <LocaleListEditor 
                        title="Other details" 
                        items={clothingOtherDetails[language]} 
                        onAdd={(val) => setClothingOtherDetails({ ...clothingOtherDetails, [language]: [...(clothingOtherDetails[language] || []), val] })} 
                        onRemove={(idx) => setClothingOtherDetails({ ...clothingOtherDetails, [language]: (clothingOtherDetails[language] || []).filter((_, i) => i !== idx) })} 
                      />
                    </div>
                  </div>
                )}

                {slug === 'clothing' && (
                  <Card className="mt-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Work Environment Suitability</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Configure which work environments this clothing is suitable for
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { 
                            key: 'dry' as const, 
                            icon: 'Sun', 
                            label: 'Dry Conditions',
                            description: 'Suitable for dry conditions'
                          },
                          { 
                            key: 'wet' as const, 
                            icon: 'Droplets', 
                            label: 'Wet Conditions',
                            description: 'Suitable for wet conditions'
                          },
                          { 
                            key: 'dust' as const, 
                            icon: 'Wind', 
                            label: 'Dusty Conditions',
                            description: 'Suitable for dusty conditions'
                          },
                          { 
                            key: 'chemical' as const, 
                            icon: 'FlaskConical', 
                            label: 'Chemical Exposure',
                            description: 'Suitable for chemical exposure'
                          },
                          { 
                            key: 'biological' as const, 
                            icon: 'Bug', 
                            label: 'Biological Hazards',
                            description: 'Suitable for biological hazards'
                          },
                          { 
                            key: 'oily_grease' as const, 
                            icon: 'Zap', 
                            label: 'Oily / Greasy',
                            description: 'Suitable for oily / greasy'
                          },
                          { 
                            key: 'electrical' as const, 
                            icon: 'Zap', 
                            label: 'Electrical risks',
                            description: 'Suitable for electrical risks'
                          },
                          { 
                            key: 'radiation' as const, 
                            icon: 'Shield', 
                            label: 'Radiation',
                            description: 'Suitable for radiation'
                          },
                          { 
                            key: 'low_visibility' as const, 
                            icon: 'Eye', 
                            label: 'Low visibility',
                            description: 'Suitable for low visibility'
                          },
                        ].map((item) => {
                          const isEnabled = environmentPictograms[item.key] || false;
                          
                          return (
                            <div
                              key={item.key}
                              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-4 ${
                                isEnabled
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {item.icon === 'Sun' && <Sun className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Droplets' && <Droplets className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Wind' && <Wind className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'FlaskConical' && <FlaskConical className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Bug' && <Bug className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Zap' && <Zap className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Shield' && <Shield className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  {item.icon === 'Eye' && <Eye className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />}
                                  <div>
                                    <Label className={`font-medium text-sm ${
                                      isEnabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                                    }`}>
                                      {item.label}
                                    </Label>
                                  </div>
                                </div>
                                <Switch
                                  checked={isEnabled}
                                  onCheckedChange={(checked) => setEnvironmentPictograms({
                                    ...environmentPictograms,
                                    [item.key]: checked
                                  })}
                                  className="data-[state=checked]:bg-green-600"
                                />
                              </div>
                              
                              <p className={`text-xs ${
                                isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
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
                  <GlovesSafetyStandardsEditor 
                    safety={safety} 
                    setSafety={setSafety} 
                  />
                )}
                {slug === 'respiratory' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1"><Label>Filter type</Label><Input value={respFilterType} onChange={(e)=> setRespFilterType(e.target.value)} /></div>
                      <div className="space-y-1"><Label>Protection class</Label><Input value={respProtectionClass} onChange={(e)=> setRespProtectionClass(e.target.value)} /></div>
                      <div className="space-y-1"><Label>NPF</Label><Input value={respNpf} onChange={(e)=> setRespNpf(e.target.value)} placeholder="e.g. 20" /></div>
                      <div className="space-y-1"><Label>Protection codes (comma separated)</Label><Input value={respProtectionCodes.join(', ')} onChange={(e)=> setRespProtectionCodes(e.target.value.split(',').map(s=> s.trim()).filter(Boolean))} /></div>
                    </div>
                    
                    {/* Connections Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Connections</CardTitle>
                        <CardDescription className="text-sm">Select respiratory products or add custom connection types (e.g. B-Lock)</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Display Selected Connections */}
                        {respConnectionsLocales[language].length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {respConnectionsLocales[language].map((conn, idx) => (
                              <Badge key={`conn-${idx}`} variant="outline" className="flex items-center gap-1 px-3 py-1">
                                {conn}
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => setRespConnectionsLocales({ ...respConnectionsLocales, [language]: respConnectionsLocales[language].filter((_, i) => i !== idx) })}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                      </div>
                        )}
                        
                        {/* Add from Products Dropdown */}
                        <div className="space-y-2">
                          <Label className="text-sm">Select from respiratory products:</Label>
                          <Select onValueChange={(value) => {
                            if (value && !respConnectionsLocales[language].includes(value)) {
                              setRespConnectionsLocales({ ...respConnectionsLocales, [language]: [...respConnectionsLocales[language], value] });
                            }
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product..." />
                            </SelectTrigger>
                            <SelectContent>
                              {availableProducts
                                .filter(p => {
                                  const cat = (p.category || '').toLowerCase();
                                  const sub = (p.sub_category || '').toLowerCase();
                                  return cat.includes('respiratory') || sub.includes('mask') || sub.includes('filter') || sub.includes('respirator');
                                })
                                .map((product) => (
                                  <SelectItem key={product.id} value={product.name}>
                                    {product.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                    </div>
                        
                        {/* Add Custom Text */}
                        <div className="space-y-2">
                          <Label className="text-sm">Or add custom connection type:</Label>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="e.g. B-Lock, RD40..." 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const val = e.currentTarget.value.trim();
                                  if (val && !respConnectionsLocales[language].includes(val)) {
                                    setRespConnectionsLocales({ ...respConnectionsLocales, [language]: [...respConnectionsLocales[language], val] });
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              size="sm" 
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                const val = input?.value.trim();
                                if (val && !respConnectionsLocales[language].includes(val)) {
                                  setRespConnectionsLocales({ ...respConnectionsLocales, [language]: [...respConnectionsLocales[language], val] });
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Compatible With Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Compatible With</CardTitle>
                        <CardDescription className="text-sm">Select respiratory products or add custom compatibility info (e.g. BLS200Filters)</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Display Selected Compatible Items */}
                        {respCompatibleWithLocales[language].length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {respCompatibleWithLocales[language].map((item, idx) => (
                              <Badge key={`comp-${idx}`} variant="outline" className="flex items-center gap-1 px-3 py-1">
                                {item}
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => setRespCompatibleWithLocales({ ...respCompatibleWithLocales, [language]: respCompatibleWithLocales[language].filter((_, i) => i !== idx) })}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {/* Add from Products Dropdown */}
                        <div className="space-y-2">
                          <Label className="text-sm">Select from respiratory products:</Label>
                          <Select onValueChange={(value) => {
                            if (value && !respCompatibleWithLocales[language].includes(value)) {
                              setRespCompatibleWithLocales({ ...respCompatibleWithLocales, [language]: [...respCompatibleWithLocales[language], value] });
                            }
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product..." />
                            </SelectTrigger>
                            <SelectContent>
                              {availableProducts
                                .filter(p => {
                                  const cat = (p.category || '').toLowerCase();
                                  const sub = (p.sub_category || '').toLowerCase();
                                  return cat.includes('respiratory') || sub.includes('mask') || sub.includes('filter') || sub.includes('respirator');
                                })
                                .map((product) => (
                                  <SelectItem key={product.id} value={product.name}>
                                    {product.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Add Custom Text */}
                        <div className="space-y-2">
                          <Label className="text-sm">Or add custom compatibility info:</Label>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="e.g. BLS200Filters, A2P3..." 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const val = e.currentTarget.value.trim();
                                  if (val && !respCompatibleWithLocales[language].includes(val)) {
                                    setRespCompatibleWithLocales({ ...respCompatibleWithLocales, [language]: [...respCompatibleWithLocales[language], val] });
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              size="sm" 
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                const val = input?.value.trim();
                                if (val && !respCompatibleWithLocales[language].includes(val)) {
                                  setRespCompatibleWithLocales({ ...respCompatibleWithLocales, [language]: [...respCompatibleWithLocales[language], val] });
                                  input.value = '';
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                    </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button></CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Products</CardTitle>
              <CardDescription>Link this product to other related products (up to 4)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Currently Selected */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Currently Selected Related Products</Label>
                  <div className="grid gap-2">
                    {getRelatedProductIds().length > 0 ? (
                      getRelatedProductIds().map(productId => {
                        const product = availableProducts.find(p => p.id === productId);
                        return product ? (
                          <div key={productId} className="flex items-center justify-between border rounded p-3 bg-white dark:bg-gray-900">
                            <div className="flex items-center gap-3">
                              {product.image_url && (
                                <div className="w-12 h-12 rounded border bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                  <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.sub_category || product.category}</p>
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeRelatedProduct(productId)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : null;
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No related products selected. Add some below.
                      </p>
                    )}
                  </div>
                </div>

                {/* Add Related Product */}
                {getRelatedProductIds().length < 4 && (
                  <div className="space-y-2">
                    <Label htmlFor="product-select-edit">Add a related product:</Label>
                    <Select
                      onValueChange={(value) => {
                        if (value) {
                          addRelatedProduct(value);
                        }
                      }}
                    >
                      <SelectTrigger id="product-select-edit">
                        <SelectValue placeholder="Select a product to add..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts
                          .filter(product => product.id !== id && !getRelatedProductIds().includes(product.id))
                          .map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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

function LocaleListEditor({ title, items, onAdd, onRemove, icon }: { title: string; items: string[] | undefined; onAdd: (val: string)=> void; onRemove: (index: number)=> void; icon?: boolean; }) {
  const [val, setVal] = useState("");
  const safeItems = Array.isArray(items) ? items : [];
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
          {safeItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items added.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {safeItems.map((item, idx) => (
                <Badge key={`${item}-${idx}`} variant="outline" className="flex items-center gap-1">{icon && <Tag className="h-3 w-3" />}{item}<Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={()=> onRemove(idx)}><X className="h-3 w-3" /></Button></Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


