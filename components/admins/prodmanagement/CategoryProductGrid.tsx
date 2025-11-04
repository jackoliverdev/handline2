"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Product, getAllProducts, toggleProductFeatured, toggleProductStock, deleteProduct } from "@/lib/products-service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Plus, ShoppingBag, Edit, Trash, Star, Thermometer, Scissors, Flame, X, Filter, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Category-specific filters (reuse from website)
import { LengthFilter } from "@/components/website/products/filters/swabs/LengthFilter";
import { PadSizeFilter } from "@/components/website/products/filters/swabs/PadSizeFilter";
import { ConnectionFilter } from "@/components/website/products/filters/respiratory/ConnectionFilter";
import { FilterTypeFilter } from "@/components/website/products/filters/respiratory/FilterTypeFilter";
import { ProtectionClassFilter } from "@/components/website/products/filters/respiratory/ProtectionClassFilter";
import { ArmLengthFilter } from "@/components/website/products/filters/arms/ArmLengthFilter";
import { ThumbLoopFilter } from "@/components/website/products/filters/arms/ThumbLoopFilter";
import { ClosureTypeFilter } from "@/components/website/products/filters/arms/ClosureTypeFilter";
import { SnrFilter } from "@/components/website/products/filters/hearing/SnrFilter";
import { En352PartFilter } from "@/components/website/products/filters/hearing/En352PartFilter";
import { ReusableFilter } from "@/components/website/products/filters/hearing/ReusableFilter";
import { MountTypeFilter } from "@/components/website/products/filters/hearing/MountTypeFilter";
import { BluetoothFilter } from "@/components/website/products/filters/hearing/BluetoothFilter";
import { ClassFilter } from "@/components/website/products/filters/footwear/ClassFilter";
import { ESDFilter } from "@/components/website/products/filters/footwear/ESDFilter";
import { WidthFilter } from "@/components/website/products/filters/footwear/WidthFilter";
import { SizeRangeFilter } from "@/components/website/products/filters/footwear/SizeRangeFilter";
import { ToeCapFilter } from "@/components/website/products/filters/footwear/ToeCapFilter";
import { SoleMaterialFilter } from "@/components/website/products/filters/footwear/SoleMaterialFilter";
import { StandardCodeFilter } from "@/components/website/products/filters/footwear/StandardCodeFilter";
import { ProtectionTypeFilter } from "@/components/website/products/filters/eyeface/ProtectionTypeFilter";
import { LensTintFilter } from "@/components/website/products/filters/eyeface/LensTintFilter";
import { CoatingFilter } from "@/components/website/products/filters/eyeface/CoatingFilter";
import { UvCodeFilter } from "@/components/website/products/filters/eyeface/UvCodeFilter";
import { BrimLengthFilter } from "@/components/website/products/filters/head/BrimLengthFilter";
import { LowTemperatureFilter } from "@/components/website/products/filters/head/LowTemperatureFilter";
import { ElectricalInsulationFilter } from "@/components/website/products/filters/head/ElectricalInsulationFilter";
import { MoltenMetalFilter } from "@/components/website/products/filters/head/MoltenMetalFilter";
import { VentilationFilter } from "@/components/website/products/filters/head/VentilationFilter";
import { EnStandardFilter } from "@/components/website/products/filters/head/EnStandardFilter";

interface Props {
  slug: string;
}

const PRODUCTS_PER_ROW = 4;
const INITIAL_ROWS = 2;

export default function CategoryProductGrid({ slug }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [duplicateSearchQuery, setDuplicateSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [isExpanded, setIsExpanded] = useState(false);

  // Common filters
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("none");
  const [selectedTempRating, setSelectedTempRating] = useState<string>("none");

  // Category-specific filter state
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]); // swabs
  const [selectedPadSizes, setSelectedPadSizes] = useState<string[]>([]); // swabs
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]); // respiratory
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedArmLengths, setSelectedArmLengths] = useState<string[]>([]);
  const [selectedArmThumbLoop, setSelectedArmThumbLoop] = useState<boolean>(false);
  const [selectedArmClosures, setSelectedArmClosures] = useState<string[]>([]);
  const [selectedSnrs, setSelectedSnrs] = useState<number[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedMounts, setSelectedMounts] = useState<string[]>([]);
  const [selectedReusable, setSelectedReusable] = useState<boolean>(false);
  const [selectedBluetooth, setSelectedBluetooth] = useState<boolean>(false);
  const [selectedFwClasses, setSelectedFwClasses] = useState<string[]>([]);
  const [selectedFwEsd, setSelectedFwEsd] = useState<boolean>(false);
  const [selectedFwWidths, setSelectedFwWidths] = useState<number[]>([]);
  const [selectedFwSize, setSelectedFwSize] = useState<{ min?: number; max?: number }>({});
  const [selectedFwToes, setSelectedFwToes] = useState<string[]>([]);
  const [selectedFwSoles, setSelectedFwSoles] = useState<string[]>([]);
  const [selectedFwCodes, setSelectedFwCodes] = useState<string[]>([]);
  const [selectedEyeFaceProt, setSelectedEyeFaceProt] = useState<string[]>([]);
  const [selectedEyeFaceTints, setSelectedEyeFaceTints] = useState<string[]>([]);
  const [selectedEyeFaceCoats, setSelectedEyeFaceCoats] = useState<string[]>([]);
  const [selectedEyeFaceUv, setSelectedEyeFaceUv] = useState<string[]>([]);
  const [selectedHeadBrims, setSelectedHeadBrims] = useState<string[]>([]);
  const [selectedHeadLt, setSelectedHeadLt] = useState<boolean>(false);
  const [selectedHead50365, setSelectedHead50365] = useState<boolean>(false);
  const [selectedHeadMm, setSelectedHeadMm] = useState<boolean>(false);
  const [selectedHeadVent, setSelectedHeadVent] = useState<boolean>(false);
  const [selectedHeadStds, setSelectedHeadStds] = useState<string[]>([]);
  const [selectedHiVis, setSelectedHiVis] = useState<number[]>([]);
  const [selectedClArc, setSelectedClArc] = useState<number[]>([]);
  const [selectedClFlame, setSelectedClFlame] = useState<boolean>(false);
  const [selectedClAnti, setSelectedClAnti] = useState<boolean>(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Include unpublished products in the admin view
        const { products } = await getAllProducts(true);
        setProducts(products || []);
      } catch (e) {
        console.error("Failed to load products", e);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Category mapping mirroring the public site
  const categoryPredicate = (p: Product) => {
    const cat = (p.category || '').toLowerCase();
    const sub = (p.sub_category || '').toLowerCase();
    const isSwab = cat.includes('swab');
    const isResp = cat.includes('respir') || cat.includes('mask');
    const isArm = cat.includes('arm') || sub.includes('sleeve');
    const isHear = cat.includes('hearing') || sub.includes('ear');
    const isFw = cat.includes('footwear') || sub.includes('boot') || sub.includes('insol');
    const isEye = cat.includes('eye') || cat.includes('face') || sub.includes('glasses') || sub.includes('goggle') || sub.includes('visor') || sub.includes('face shield');
    const isHead = cat.includes('head') || sub.includes('helmet') || sub.includes('bump');
    const isCloth = cat.includes('clothing') || sub.includes('jacket');

    switch (slug) {
      case 'industrial-swabs':
        return isSwab;
      case 'respiratory':
        return isResp;
      case 'arm-protection':
        return isArm;
      case 'hearing':
        return isHear;
      case 'footwear':
        return isFw;
      case 'eye-face':
        return isEye;
      case 'head':
        return isHead;
      case 'clothing':
        return isCloth;
      case 'gloves':
      default:
        // Gloves: anything not matching the other categories OR explicitly labelled gloves
        const other = isSwab || isResp || isArm || isHear || isFw || isEye || isHead || isCloth;
        return cat.includes('glove') || (!other);
    }
  };

  const scoped = useMemo(() => products.filter(categoryPredicate), [products, slug]);

  // Derived options
  const uniqueSubCategories = useMemo(() => Array.from(new Set(scoped.map(p => p.sub_category).filter(Boolean))) as string[], [scoped]);
  const uniqueTempRatings = useMemo(() => Array.from(new Set(scoped.map(p => p.temperature_rating).filter((v): v is number => typeof v === 'number'))).sort((a,b)=>a-b), [scoped]);

  // Category-specific options
  const lengthOptions = useMemo(() => Array.from(new Set(scoped.map(p => typeof p.length_cm === 'number' ? `${p.length_cm} cm` : null).filter(Boolean))) as string[], [scoped]);
  const padOptions = useMemo(() => Array.from(new Set(scoped.map((p: any) => {
    const ps = p.pad_size_json; const d = ps?.en?.diameter_mm; const l = ps?.en?.length_mm; return typeof d === 'number' && typeof l === 'number' ? `${d}×${l} mm` : null;
  }).filter(Boolean))) as string[], [scoped]);
  const connectionOptions = useMemo(() => { const s = new Set<string>(); (scoped as any[]).forEach((p: any) => (p.connections || []).forEach((c: string)=>c&&s.add(c))); return Array.from(s).sort(); }, [scoped]);
  const typeOptions = useMemo(() => { const s = new Set<string>(); (scoped as any[]).forEach((p: any)=>p.filter_type && s.add(p.filter_type)); return Array.from(s).sort(); }, [scoped]);
  const classOptions = useMemo(() => { const s = new Set<string>(); (scoped as any[]).forEach((p: any)=>p.protection_class && s.add(p.protection_class)); return Array.from(s).sort(); }, [scoped]);
  const armLengthOptions = useMemo(() => { const s=new Set<string>(); scoped.forEach(p=>{ if (typeof p.length_cm==='number') s.add(`${p.length_cm} cm`)}); return Array.from(s).sort((a,b)=>parseInt(a)-parseInt(b)); }, [scoped]);
  const armClosureOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ const c=p.arm_attributes?.closure; if (c) s.add(String(c)); }); return Array.from(s).sort(); }, [scoped]);
  const snrOptions = useMemo(() => { const s=new Set<number>(); (scoped as any[]).forEach((p:any)=>{ const v=p.hearing_standards?.en352?.snr_db; if (typeof v==='number') s.add(v); }); return Array.from(s).sort((a,b)=>a-b); }, [scoped]);
  const partOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ (p.hearing_standards?.en352?.parts||[]).forEach((x:string)=>x&&s.add(x)); }); return Array.from(s).sort(); }, [scoped]);
  const mountOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ const m=p.hearing_attributes?.mount; if (m) s.add(String(m)); }); return Array.from(s).sort(); }, [scoped]);
  const fwClassOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ if (p.footwear_attributes?.class) s.add(String(p.footwear_attributes.class)); (p.footwear_standards?.en_iso_20345_2011||[]).forEach((c:string)=>c&&s.add(c)); (p.footwear_standards?.en_iso_20345_2022||[]).forEach((c:string)=>c&&s.add(c)); }); return Array.from(s).sort(); }, [scoped]);
  const fwWidthOptions = useMemo(() => { const s=new Set<number>(); (scoped as any[]).forEach((p:any)=> (p.footwear_attributes?.width_fit||[]).forEach((n:number)=> typeof n==='number' && s.add(n))); return Array.from(s).sort((a,b)=>a-b); }, [scoped]);
  const fwSizeBounds = useMemo(() => { let min=Infinity,max=-Infinity; (scoped as any[]).forEach((p:any)=>{ const mi=p.footwear_attributes?.size_min; const ma=p.footwear_attributes?.size_max; if (typeof mi==='number') min=Math.min(min,mi); if (typeof ma==='number') max=Math.max(max,ma); }); if (!isFinite(min)||!isFinite(max)) return null; return {min,max}; }, [scoped]);
  const fwToeOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ const v=p.footwear_attributes?.toe_cap; if (v) s.add(String(v)); }); return Array.from(s).sort(); }, [scoped]);
  const fwSoleOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ const v=p.footwear_attributes?.sole_material; if (v) s.add(String(v)); }); return Array.from(s).sort(); }, [scoped]);
  const fwCodeOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=> (p.footwear_standards?.en_iso_20345_2022||[]).forEach((c:string)=> c && s.add(c))); return Array.from(s).sort(); }, [scoped]);
  const eyeFaceTintOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ const v=p.eye_face_attributes?.lens_tint; if (v) s.add(String(v)); }); return Array.from(s).sort(); }, [scoped]);
  const eyeFaceCoatingOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ (p.eye_face_attributes?.coatings||[]).forEach((c:string)=> c && s.add(c)); }); return Array.from(s).sort(); }, [scoped]);
  const eyeFaceUvOptions = useMemo(() => { const s=new Set<string>(); (scoped as any[]).forEach((p:any)=>{ const v=p.eye_face_attributes?.uv_code; if (v) s.add(String(v)); }); return Array.from(s).sort(); }, [scoped]);

  // Filtering predicate applying common + category-specific filters
  const predicate = (p: Product) => {
    // Subcategory
    const matchesSubCategory = !selectedSubCategory || selectedSubCategory === 'none' || p.sub_category === selectedSubCategory;
    // Temp
    const matchesTempRating = !selectedTempRating || selectedTempRating === 'none' || (typeof p.temperature_rating === 'number' && p.temperature_rating.toString() === selectedTempRating);

    // Category specifics (match AllProductsGrid logic)
    const lenLabel = typeof p.length_cm === 'number' ? `${p.length_cm} cm` : undefined;
    const ps: any = (p as any).pad_size_json; const d = ps?.en?.diameter_mm as number | undefined; const l = ps?.en?.length_mm as number | undefined; const padLabel = typeof d==='number' && typeof l==='number' ? `${d}×${l} mm` : undefined;
    const lengthOk = selectedLengths.length === 0 ? true : (!!lenLabel && selectedLengths.includes(lenLabel));
    const padOk = selectedPadSizes.length === 0 ? true : (!!padLabel && selectedPadSizes.includes(padLabel));

    const connOk = selectedConnections.length === 0 ? true : (!!(p as any).connections && (p as any).connections.some((c: string)=> selectedConnections.includes(c)));
    const typeOk = selectedTypes.length === 0 ? true : (!!(p as any).filter_type && selectedTypes.includes((p as any).filter_type));
    const classOk = selectedClasses.length === 0 ? true : (!!(p as any).protection_class && selectedClasses.includes((p as any).protection_class));

    const armLenOk = selectedArmLengths.length === 0 ? true : (!!lenLabel && selectedArmLengths.includes(lenLabel));
    const armLoop = (p as any).arm_attributes?.thumb_loop as boolean | undefined;
    const armLoopOk = !selectedArmThumbLoop ? true : (typeof armLoop === 'boolean' && armLoop === selectedArmThumbLoop);
    const armClosure = (p as any).arm_attributes?.closure as string | undefined;
    const armClosureOk = selectedArmClosures.length === 0 ? true : (!!armClosure && selectedArmClosures.includes(armClosure));

    const hs: any = (p as any).hearing_standards; const ha: any = (p as any).hearing_attributes;
    const snr = hs?.en352?.snr_db as number | undefined; const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
    const pReusable: boolean | undefined = typeof ha?.reusable === 'boolean' ? ha.reusable : undefined; const pMount: string | undefined = ha?.mount; const pBt: boolean | undefined = typeof ha?.bluetooth === 'boolean' ? ha.bluetooth : undefined;
    const snrOk = selectedSnrs.length === 0 ? true : (typeof snr === 'number' && selectedSnrs.includes(snr));
    const partOk = selectedParts.length === 0 ? true : parts.some(pt => selectedParts.includes(pt));
    const reuseOk = !selectedReusable ? true : (typeof pReusable === 'boolean' && pReusable === selectedReusable);
    const mountOk = selectedMounts.length === 0 ? true : (!!pMount && selectedMounts.includes(pMount));
    const btOk = !selectedBluetooth ? true : (typeof pBt === 'boolean' && pBt === selectedBluetooth);

    const fp: any = p; const fattr = fp.footwear_attributes || {}; const fstd = fp.footwear_standards || {};
    const classes = [fattr.class, ...(fstd.en_iso_20345_2011 || []), ...(fstd.en_iso_20345_2022 || [])].filter(Boolean) as string[];
    const fwClassOk = selectedFwClasses.length === 0 ? true : classes.some((c: string)=> selectedFwClasses.includes(String(c)));
    const fwEsdOk = !selectedFwEsd ? true : (typeof fattr.esd === 'boolean' && fattr.esd === selectedFwEsd);
    const fwWidthOk = selectedFwWidths.length === 0 ? true : (Array.isArray(fattr.width_fit) && fattr.width_fit.some((n: number)=> selectedFwWidths.includes(n)));
    const fwSizeOk = (selectedFwSize.min === undefined && selectedFwSize.max === undefined) ? true : ((typeof fattr.size_min === 'number' && typeof fattr.size_max === 'number') && (selectedFwSize.min !== undefined ? fattr.size_max >= selectedFwSize.min : true) && (selectedFwSize.max !== undefined ? fattr.size_min <= selectedFwSize.max : true));
    const fwToeOk = selectedFwToes.length === 0 ? true : (!!fattr.toe_cap && selectedFwToes.includes(String(fattr.toe_cap)));
    const fwSoleOk = selectedFwSoles.length === 0 ? true : (!!fattr.sole_material && selectedFwSoles.includes(String(fattr.sole_material)));
    const codes: string[] = (fstd.en_iso_20345_2022 || []) as string[]; const fwCodeOk = selectedFwCodes.length === 0 ? true : codes.some((c)=> selectedFwCodes.includes(c));

    const ef: any = (p as any).eye_face_attributes || {};
    const efProtOk = selectedEyeFaceProt.length === 0 ? true : ((selectedEyeFaceProt.includes('IR') && !!ef.has_ir) || (selectedEyeFaceProt.includes('UV') && !!ef.has_uv) || (selectedEyeFaceProt.includes('Arc') && !!ef.has_arc));
    const efTintOk = selectedEyeFaceTints.length === 0 ? true : (!!ef.lens_tint && selectedEyeFaceTints.includes(String(ef.lens_tint)));
    const efCoatOk = selectedEyeFaceCoats.length === 0 ? true : (Array.isArray(ef.coatings) && ef.coatings.some((c: string)=> selectedEyeFaceCoats.includes(c)));
    const efUvOk = selectedEyeFaceUv.length === 0 ? true : (!!ef.uv_code && selectedEyeFaceUv.includes(String(ef.uv_code)));

    const hsHead: any = (p as any).head_standards || {}; const haHead: any = (p as any).head_attributes || {};
    const headBrim = haHead?.brim_length as string | undefined; const headLt = hsHead?.en397?.optional?.low_temperature; const headMm = hsHead?.en397?.optional?.molten_metal as boolean | undefined; const head50365 = hsHead?.en50365 as boolean | undefined; const headVent = haHead?.ventilation as boolean | undefined;
    const headStdFlags: string[] = []; if (hsHead?.en397?.present) headStdFlags.push('EN 397'); if (hsHead?.en50365) headStdFlags.push('EN 50365'); if (hsHead?.en12492) headStdFlags.push('EN 12492'); if (hsHead?.en812) headStdFlags.push('EN 812');
    const headBrimOk = selectedHeadBrims.length === 0 ? true : (!!headBrim && selectedHeadBrims.includes(headBrim));
    const headLtOk = selectedHeadLt ? !!headLt : true; const head50365Ok = selectedHead50365 ? !!head50365 : true; const headMmOk = selectedHeadMm ? !!headMm : true; const headVentOk = selectedHeadVent ? !!headVent : true; const headStdOk = selectedHeadStds.length === 0 ? true : selectedHeadStds.some(s => headStdFlags.includes(s));

    const cs: any = (p as any).clothing_standards || {}; const cVis = cs?.en_iso_20471?.class as number | undefined; const cFl = cs?.en_iso_11612 as Record<string, any> | undefined; const cArc = cs?.iec_61482_2?.class as number | undefined; const cAnti = cs?.en_1149_5 as boolean | undefined;
    const clVisOk = selectedHiVis.length === 0 ? true : (typeof cVis === 'number' && selectedHiVis.includes(cVis));
    const clFlOk = selectedClFlame ? !!cFl : true; const clArcOk = selectedClArc.length === 0 ? true : (typeof cArc === 'number' && selectedClArc.includes(cArc)); const clAntiOk = selectedClAnti ? !!cAnti : true;

    return matchesSubCategory && matchesTempRating && lengthOk && padOk && connOk && typeOk && classOk && armLenOk && armLoopOk && armClosureOk && snrOk && partOk && reuseOk && mountOk && btOk && fwClassOk && fwEsdOk && fwWidthOk && fwSizeOk && fwToeOk && fwSoleOk && fwCodeOk && efProtOk && efTintOk && efCoatOk && efUvOk && headBrimOk && headLtOk && head50365Ok && headMmOk && headVentOk && headStdOk && clVisOk && clFlOk && clArcOk && clAntiOk;
  };

  const filtered = useMemo(() => scoped.filter(predicate), [scoped, selectedSubCategory, selectedTempRating, selectedLengths, selectedPadSizes, selectedConnections, selectedTypes, selectedClasses, selectedArmLengths, selectedArmThumbLoop, selectedArmClosures, selectedSnrs, selectedParts, selectedMounts, selectedReusable, selectedBluetooth, selectedFwClasses, selectedFwEsd, selectedFwWidths, selectedFwSize, selectedFwToes, selectedFwSoles, selectedFwCodes, selectedEyeFaceProt, selectedEyeFaceTints, selectedEyeFaceCoats, selectedEyeFaceUv, selectedHeadBrims, selectedHeadLt, selectedHead50365, selectedHeadMm, selectedHeadVent, selectedHeadStds, selectedHiVis, selectedClArc, selectedClFlame, selectedClAnti]);

  // Search
  const searched = useMemo(() => filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.short_description || '').toLowerCase().includes(searchQuery.toLowerCase())), [filtered, searchQuery]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...searched];
    switch (sortOption) {
      case 'featured':
        return arr.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0) || new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'newest':
        return arr.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'name-asc':
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [searched, sortOption]);

  const initialProductsCount = INITIAL_ROWS * PRODUCTS_PER_ROW;
  const hasMoreProducts = sorted.length > initialProductsCount;
  const displayed = isExpanded || !hasMoreProducts ? sorted : sorted.slice(0, initialProductsCount);

  // Actions
  const handleToggleFeatured = async (id: string) => {
    try {
      const { product } = await toggleProductFeatured(id);
      if (!product) throw new Error("Failed to update product");
      setProducts(prev => prev.map(p => p.id === id ? { ...p, is_featured: product.is_featured } as Product : p));
      toast({ title: "Success", description: `Product ${product.is_featured ? 'marked as featured' : 'removed from featured'}.` });
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to update featured status.", variant: "destructive" });
    }
  };

  const handleToggleStock = async (id: string) => {
    try {
      const { product } = await toggleProductStock(id);
      if (!product) throw new Error("Failed to update product");
      setProducts(prev => prev.map(p => p.id === id ? { ...p, out_of_stock: product.out_of_stock } as Product : p));
      toast({ title: "Success", description: `Product ${product.out_of_stock ? 'marked as out of stock' : 'marked as in stock'}.` });
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to update stock status.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { success } = await deleteProduct(id);
      if (!success) throw new Error('Delete failed');
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Deleted', description: 'Product deleted successfully.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and create */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/prod-management">
              ← Back to Categories
            </Link>
          </Button>
        </div>
        <div className="flex-1 min-w-[240px]">
          <p className="text-muted-foreground">Manage your products in this category, add new ones, and control visibility.</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Product
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px]">
              <div className="px-2 py-2 border-b">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={duplicateSearchQuery}
                  onChange={(e) => setDuplicateSearchQuery(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {(() => {
                  const filteredProducts = scoped.filter((product) =>
                    product.name.toLowerCase().includes(duplicateSearchQuery.toLowerCase())
                  );
                  
                  if (filteredProducts.length === 0) {
                    return (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                        {duplicateSearchQuery ? "No products match your search" : "No products available to duplicate"}
                      </div>
                    );
                  }
                  
                  return filteredProducts.map((product) => (
                    <DropdownMenuItem key={product.id} asChild>
                      <Link 
                        href={`/admin/prod-management/${slug}/create?duplicate=${product.id}`}
                        className="flex items-start gap-2 cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-4 w-4 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{product.sub_category || product.category}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ));
                })()}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href={`/admin/prod-management/${slug}/create`}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters and Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px,1fr]">
        {/* Sidebar */}
        <div className="hidden md:block">
          <div className="sticky top-24 border rounded-lg overflow-hidden border-brand-primary/10 dark:border-brand-primary/20">
            <div className="bg-[#F5EFE0]/80 dark:bg-transparent p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brand-dark dark:text-white">Filters</h2>
                {(selectedSubCategory !== 'none' || selectedTempRating !== 'none') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300" 
                    onClick={() => { setSelectedSubCategory('none'); setSelectedTempRating('none'); }}
                  >
                    <X className="mr-1.5 h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </div>
              <div className="space-y-6">
                {/* Sub-Category */}
                {uniqueSubCategories.length > 0 && (
                  <Accordion type="single" collapsible defaultValue="subcategory">
                    <AccordionItem value="subcategory" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Sub-Category</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          <div 
                            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${!selectedSubCategory || selectedSubCategory === 'none' ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60'}`}
                            onClick={() => setSelectedSubCategory('none')}
                          >
                            All Sub-Categories
                          </div>
                          {uniqueSubCategories.map((sub) => (
                            <div 
                              key={sub}
                              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${selectedSubCategory === sub ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60'}`}
                              onClick={() => setSelectedSubCategory(sub)}
                            >
                              {sub}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Temperature */}
                {uniqueTempRatings.length > 0 && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="temperature" className="border-b border-brand-primary/10 dark:border-brand-primary/20">
                      <AccordionTrigger className="text-sm font-medium text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary">Temperature Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
                          <div 
                            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${!selectedTempRating || selectedTempRating === 'none' ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60'}`}
                            onClick={() => setSelectedTempRating('none')}
                          >
                            Any Temperature
                          </div>
                          {uniqueTempRatings.map((temp) => (
                            <div 
                              key={temp}
                              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 ${selectedTempRating === String(temp) ? 'bg-brand-primary/10 text-brand-primary font-medium' : 'text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60'}`}
                              onClick={() => setSelectedTempRating(String(temp))}
                            >
                              {temp}°C
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Category-specific filter blocks */}
                {slug === 'industrial-swabs' && (
                  <>
                    <LengthFilter options={lengthOptions} selected={selectedLengths} onToggle={(opt)=> setSelectedLengths(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <PadSizeFilter options={padOptions} selected={selectedPadSizes} onToggle={(opt)=> setSelectedPadSizes(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                  </>
                )}
                {slug === 'respiratory' && (
                  <>
                    <ConnectionFilter options={connectionOptions} selected={selectedConnections} onToggle={(opt)=> setSelectedConnections(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <FilterTypeFilter options={typeOptions} selected={selectedTypes} onToggle={(opt)=> setSelectedTypes(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <ProtectionClassFilter options={classOptions} selected={selectedClasses} onToggle={(opt)=> setSelectedClasses(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                  </>
                )}
                {slug === 'arm-protection' && (
                  <>
                    <ArmLengthFilter options={armLengthOptions} selected={selectedArmLengths} onToggle={(opt)=> setSelectedArmLengths(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <ThumbLoopFilter value={selectedArmThumbLoop} onChange={setSelectedArmThumbLoop} />
                    <ClosureTypeFilter options={armClosureOptions} selected={selectedArmClosures} onToggle={(opt)=> setSelectedArmClosures(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                  </>
                )}
                {slug === 'hearing' && (
                  <>
                    <SnrFilter options={snrOptions} selected={selectedSnrs} onToggle={(opt)=> setSelectedSnrs(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <En352PartFilter options={partOptions} selected={selectedParts} onToggle={(opt)=> setSelectedParts(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <ReusableFilter value={selectedReusable} onChange={setSelectedReusable} />
                    <MountTypeFilter options={mountOptions} selected={selectedMounts} onToggle={(opt)=> setSelectedMounts(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <BluetoothFilter value={selectedBluetooth} onChange={setSelectedBluetooth} />
                  </>
                )}
                {slug === 'footwear' && (
                  <>
                    <ClassFilter options={fwClassOptions} selected={selectedFwClasses} onToggle={(opt)=> setSelectedFwClasses(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <ESDFilter value={selectedFwEsd} onChange={setSelectedFwEsd} />
                    <WidthFilter options={fwWidthOptions} selected={selectedFwWidths} onToggle={(opt)=> setSelectedFwWidths(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <SizeRangeFilter bounds={fwSizeBounds} value={selectedFwSize} onChange={setSelectedFwSize} />
                    <ToeCapFilter options={fwToeOptions} selected={selectedFwToes} onToggle={(opt)=> setSelectedFwToes(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <SoleMaterialFilter options={fwSoleOptions} selected={selectedFwSoles} onToggle={(opt)=> setSelectedFwSoles(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <StandardCodeFilter options={fwCodeOptions} selected={selectedFwCodes} onToggle={(opt)=> setSelectedFwCodes(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                  </>
                )}
                {slug === 'eye-face' && (
                  <>
                    <ProtectionTypeFilter selected={selectedEyeFaceProt} onToggle={(opt)=> setSelectedEyeFaceProt(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <LensTintFilter options={eyeFaceTintOptions} selected={selectedEyeFaceTints} onToggle={(opt)=> setSelectedEyeFaceTints(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <CoatingFilter options={eyeFaceCoatingOptions} selected={selectedEyeFaceCoats} onToggle={(opt)=> setSelectedEyeFaceCoats(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <UvCodeFilter options={eyeFaceUvOptions} selected={selectedEyeFaceUv} onToggle={(opt)=> setSelectedEyeFaceUv(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                  </>
                )}
                {slug === 'head' && (
                  <>
                    <BrimLengthFilter options={selectedHeadBrims.length ? selectedHeadBrims : (Array.from(new Set((scoped as any[]).map((p:any)=> p.head_attributes?.brim_length).filter(Boolean))) as string[])} selected={selectedHeadBrims} onToggle={(opt)=> setSelectedHeadBrims(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                    <LowTemperatureFilter value={selectedHeadLt} onChange={setSelectedHeadLt} />
                    <ElectricalInsulationFilter value={selectedHead50365} onChange={setSelectedHead50365} />
                    <MoltenMetalFilter value={selectedHeadMm} onChange={setSelectedHeadMm} />
                    <VentilationFilter value={selectedHeadVent} onChange={setSelectedHeadVent} />
                    <EnStandardFilter selected={selectedHeadStds} onToggle={(opt)=> setSelectedHeadStds(prev => prev.includes(opt) ? prev.filter(x=>x!==opt) : [...prev, opt])} />
                  </>
                )}
                {slug === 'clothing' && (
                  <>
                    {/* Simple clothing controls */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-brand-dark dark:text-white">Hi-Vis Class</div>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set((scoped as any[]).map((p:any)=> p.clothing_standards?.en_iso_20471?.class).filter((v:number)=> typeof v==='number'))).sort((a:number,b:number)=>a-b).map((c:number)=> (
                          <Badge key={c} variant={selectedHiVis.includes(c) ? 'default' : 'outline'} className="cursor-pointer" onClick={()=> setSelectedHiVis(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])}>{c}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cl-flame" checked={selectedClFlame} onCheckedChange={()=> setSelectedClFlame(v=>!v)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
                      <label htmlFor="cl-flame" className="text-sm text-brand-secondary dark:text-gray-300">Flame protection present</label>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-brand-dark dark:text-white">Arc Class</div>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set((scoped as any[]).map((p:any)=> p.clothing_standards?.iec_61482_2?.class).filter((v:number)=> typeof v==='number'))).sort((a:number,b:number)=>a-b).map((c:number)=> (
                          <Badge key={c} variant={selectedClArc.includes(c) ? 'default' : 'outline'} className="cursor-pointer" onClick={()=> setSelectedClArc(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])}>{c}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cl-anti" checked={selectedClAnti} onCheckedChange={()=> setSelectedClAnti(v=>!v)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
                      <label htmlFor="cl-anti" className="text-sm text-brand-secondary dark:text-gray-300">Antistatic (EN 1149-5)</label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div>
          {/* Search & Sort */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr,auto]">
            <div className="relative">
              <Input placeholder="Search products..." value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} className="w-full" />
              {searchQuery && (
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={()=> setSearchQuery("")}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select className="h-10 rounded-md border px-3 text-sm" value={sortOption} onChange={(e)=> setSortOption(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6"><p className="text-sm text-muted-foreground">Showing {isExpanded ? sorted.length : Math.min(displayed.length, initialProductsCount)} of {sorted.length} products</p></div>

          {loading ? (
            <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>
          ) : scoped.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No products yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Get started by creating your first product.</p>
              <Button className="mt-4" asChild>
                <Link href="/admin/product/create"><Plus className="mr-2 h-4 w-4" />Create Product</Link>
              </Button>
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border rounded-lg">
              <Filter className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h3 className="mb-2 text-xl font-semibold">No products found</h3>
              <p className="text-center text-muted-foreground max-w-md">We couldn't find any products matching your filter criteria.</p>
              <Button variant="outline" className="mt-4" onClick={()=> { setSelectedSubCategory('none'); setSelectedTempRating('none'); }}>
                <X className="mr-1.5 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayed.map((product) => (
                  <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md p-2 sm:p-0">
                    <div className="relative aspect-[3/2] overflow-hidden bg-black rounded-md">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-full w-full object-contain p-1 sm:p-2" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-900"><ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/40" /></div>
                      )}
                      <div className="absolute top-1 right-1 flex flex-col gap-1">
                        {product.is_featured && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs px-1"><Star className="h-3 w-3 mr-1 fill-amber-500" />Featured</Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 border-t">
                      <div className="mb-2">
                        <h3 className="text-xs sm:text-sm font-medium line-clamp-1">{product.name}</h3>
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mb-2">{product.short_description || product.description?.substring(0, 60) || "No description"}</p>
                      <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs mb-2">
                        {product.temperature_rating && (<Badge variant="outline" className="gap-1 h-5 px-1.5 text-[10px] sm:text-xs"><Thermometer className="h-3 w-3" />{product.temperature_rating}°C</Badge>)}
                        {product.cut_resistance_level && (<Badge variant="outline" className="gap-1 h-5 px-1.5 text-[10px] sm:text-xs"><Scissors className="h-3 w-3" />{product.cut_resistance_level}</Badge>)}
                        {product.heat_resistance_level && (<Badge variant="outline" className="gap-1 h-5 px-1.5 text-[10px] sm:text-xs"><Flame className="h-3 w-3" />{product.heat_resistance_level}</Badge>)}
                      </div>
                      <div className="flex items-end justify-between gap-1 pt-2 border-t">
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center"><Button variant="ghost" size="icon" className="h-7 w-7 p-0" asChild><Link href={`/admin/prod-management/${slug}/${product.id}`}><Edit className="h-4 w-4" /><span className="sr-only">Edit</span></Link></Button></div>
                          <span className="text-[10px] text-muted-foreground mt-1">Edit</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center"><Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" onClick={()=> handleDelete(product.id)}><Trash className="h-4 w-4" /><span className="sr-only">Delete</span></Button></div>
                          <span className="text-[10px] text-muted-foreground mt-1">Delete</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center"><input type="checkbox" checked={product.is_featured} onChange={()=> handleToggleFeatured(product.id)} className="h-5 w-9 accent-amber-500" /></div>
                          <span className="text-[10px] text-muted-foreground mt-1">Featured</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-7 flex items-center"><input type="checkbox" checked={!product.out_of_stock} onChange={()=> handleToggleStock(product.id)} className="h-5 w-9 accent-green-500" /></div>
                          <span className="text-[10px] text-muted-foreground mt-1">Stock</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {hasMoreProducts && (
                <div className="flex justify-center pt-4" id="expand-toggle-button">
                  <Button variant={isExpanded ? "outline" : "default"} size="lg" className="gap-2" onClick={()=> setIsExpanded(v=>!v)}>
                    {isExpanded ? (<><span>Show Less</span><ChevronUp className="h-4 w-4" /></>) : (<><span>See More Products</span><ChevronDown className="h-4 w-4" /></>)}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


