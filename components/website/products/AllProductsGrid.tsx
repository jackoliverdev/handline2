"use client";

import React from "react";
import { ProductGrid } from "@/components/website/products/product-grid";
import { LengthFilter } from "@/components/website/products/filters/swabs/LengthFilter";
import { PadSizeFilter } from "@/components/website/products/filters/swabs/PadSizeFilter";
import { LengthFilterMobile } from "@/components/website/products/filters/swabs/LengthFilterMobile";
import { PadSizeFilterMobile } from "@/components/website/products/filters/swabs/PadSizeFilterMobile";
import { ConnectionFilter } from "@/components/website/products/filters/respiratory/ConnectionFilter";
import { FilterTypeFilter } from "@/components/website/products/filters/respiratory/FilterTypeFilter";
import { ProtectionClassFilter } from "@/components/website/products/filters/respiratory/ProtectionClassFilter";
import { FilteredParticlesFilter } from "@/components/website/products/filters/respiratory/FilteredParticlesFilter";
import { ConnectionFilterMobile } from "@/components/website/products/filters/respiratory/ConnectionFilterMobile";
import { FilterTypeFilterMobile } from "@/components/website/products/filters/respiratory/FilterTypeFilterMobile";
import { ProtectionClassFilterMobile } from "@/components/website/products/filters/respiratory/ProtectionClassFilterMobile";
import { FilteredParticlesFilterMobile } from "@/components/website/products/filters/respiratory/FilteredParticlesFilterMobile";
import type { Product } from "@/lib/products-service";
import { SnrFilter } from "@/components/website/products/filters/hearing/SnrFilter";
import { SnrFilterMobile } from "@/components/website/products/filters/hearing/SnrFilterMobile";
import { En352PartFilter } from "@/components/website/products/filters/hearing/En352PartFilter";
import { En352PartFilterMobile } from "@/components/website/products/filters/hearing/En352PartFilterMobile";
import { ReusableFilter } from "@/components/website/products/filters/hearing/ReusableFilter";
import { ReusableFilterMobile } from "@/components/website/products/filters/hearing/ReusableFilterMobile";
import { MountTypeFilter } from "@/components/website/products/filters/hearing/MountTypeFilter";
import { MountTypeFilterMobile } from "@/components/website/products/filters/hearing/MountTypeFilterMobile";
import { BluetoothFilter } from "@/components/website/products/filters/hearing/BluetoothFilter";
import { BluetoothFilterMobile } from "@/components/website/products/filters/hearing/BluetoothFilterMobile";
import { ArmLengthFilter } from "@/components/website/products/filters/arms/ArmLengthFilter";
import { ArmLengthFilterMobile } from "@/components/website/products/filters/arms/ArmLengthFilterMobile";
import { ThumbLoopFilter } from "@/components/website/products/filters/arms/ThumbLoopFilter";
import { ThumbLoopFilterMobile } from "@/components/website/products/filters/arms/ThumbLoopFilterMobile";
import { ClosureTypeFilter } from "@/components/website/products/filters/arms/ClosureTypeFilter";
import { ClosureTypeFilterMobile } from "@/components/website/products/filters/arms/ClosureTypeFilterMobile";
// Footwear
import { ClassFilter } from "@/components/website/products/filters/footwear/ClassFilter";
import { ClassFilterMobile } from "@/components/website/products/filters/footwear/ClassFilterMobile";
import { ESDFilter } from "@/components/website/products/filters/footwear/ESDFilter";
import { ESDFilterMobile } from "@/components/website/products/filters/footwear/ESDFilterMobile";
import { WidthFilter } from "@/components/website/products/filters/footwear/WidthFilter";
import { WidthFilterMobile } from "@/components/website/products/filters/footwear/WidthFilterMobile";
import { SizeRangeFilter } from "@/components/website/products/filters/footwear/SizeRangeFilter";
import { SizeRangeFilterMobile } from "@/components/website/products/filters/footwear/SizeRangeFilterMobile";
import { ToeCapFilter } from "@/components/website/products/filters/footwear/ToeCapFilter";
import { ToeCapFilterMobile } from "@/components/website/products/filters/footwear/ToeCapFilterMobile";
import { SoleMaterialFilter } from "@/components/website/products/filters/footwear/SoleMaterialFilter";
import { SoleMaterialFilterMobile } from "@/components/website/products/filters/footwear/SoleMaterialFilterMobile";
import { StandardCodeFilter } from "@/components/website/products/filters/footwear/StandardCodeFilter";
import { StandardCodeFilterMobile } from "@/components/website/products/filters/footwear/StandardCodeFilterMobile";
// Eye & Face filters
import { ProtectionTypeFilter } from "@/components/website/products/filters/eyeface/ProtectionTypeFilter";
import { ProtectionTypeFilterMobile } from "@/components/website/products/filters/eyeface/ProtectionTypeFilterMobile";
import { LensTintFilter } from "@/components/website/products/filters/eyeface/LensTintFilter";
import { LensTintFilterMobile } from "@/components/website/products/filters/eyeface/LensTintFilterMobile";
import { CoatingFilter } from "@/components/website/products/filters/eyeface/CoatingFilter";
import { CoatingFilterMobile } from "@/components/website/products/filters/eyeface/CoatingFilterMobile";
import { UvCodeFilter } from "@/components/website/products/filters/eyeface/UvCodeFilter";
import { UvCodeFilterMobile } from "@/components/website/products/filters/eyeface/UvCodeFilterMobile";
import { EyeFaceEnStandardFilter } from "@/components/website/products/filters/eyeface/EyeFaceEnStandardFilter";
import { EyeFaceEnStandardFilterMobile } from "@/components/website/products/filters/eyeface/EyeFaceEnStandardFilterMobile";
// Head filters
import { BrimLengthFilter } from "@/components/website/products/filters/head/BrimLengthFilter";
import { BrimLengthFilterMobile } from "@/components/website/products/filters/head/BrimLengthFilterMobile";
import { LowTemperatureFilter } from "@/components/website/products/filters/head/LowTemperatureFilter";
import { LowTemperatureFilterMobile } from "@/components/website/products/filters/head/LowTemperatureFilterMobile";
import { ElectricalInsulationFilter } from "@/components/website/products/filters/head/ElectricalInsulationFilter";
import { ElectricalInsulationFilterMobile } from "@/components/website/products/filters/head/ElectricalInsulationFilterMobile";
import { MoltenMetalFilter } from "@/components/website/products/filters/head/MoltenMetalFilter";
import { MoltenMetalFilterMobile } from "@/components/website/products/filters/head/MoltenMetalFilterMobile";
import { VentilationFilter } from "@/components/website/products/filters/head/VentilationFilter";
import { VentilationFilterMobile } from "@/components/website/products/filters/head/VentilationFilterMobile";
import { EnStandardFilter } from "@/components/website/products/filters/head/EnStandardFilter";
import { EnStandardFilterMobile } from "@/components/website/products/filters/head/EnStandardFilterMobile";
import { FilterSection } from "@/components/website/products/filters/FilterSection";
import { useLanguage } from "@/lib/context/language-context";
// Protective clothing filters
import { ClothingTypeFilter } from "@/components/website/products/filters/clothing/ClothingTypeFilter";
import { ClothingCategoryFilter } from "@/components/website/products/filters/clothing/ClothingCategoryFilter";
import { HiVisClassFilter } from "@/components/website/products/filters/clothing/HiVisClassFilter";
import { FlameStandardFilter } from "@/components/website/products/filters/clothing/FlameStandardFilter";
import { ArcClassFilter } from "@/components/website/products/filters/clothing/ArcClassFilter";
import { AntistaticFilter } from "@/components/website/products/filters/clothing/AntistaticFilter";
import { ClothingTypeFilterMobile } from "@/components/website/products/filters/clothing/ClothingTypeFilterMobile";
import { ClothingCategoryFilterMobile } from "@/components/website/products/filters/clothing/ClothingCategoryFilterMobile";
import { HiVisClassFilterMobile } from "@/components/website/products/filters/clothing/HiVisClassFilterMobile";
import { FlameStandardFilterMobile } from "@/components/website/products/filters/clothing/FlameStandardFilterMobile";
import { ArcClassFilterMobile } from "@/components/website/products/filters/clothing/ArcClassFilterMobile";
import { AntistaticFilterMobile } from "@/components/website/products/filters/clothing/AntistaticFilterMobile";
import { CLOTHING_TYPE_TO_CATEGORIES } from "@/content/clothing-categories";

interface AllProductsGridProps {
  products: Product[];
}

export function AllProductsGrid({ products }: AllProductsGridProps) {
  const { t } = useLanguage();
  const swabs = React.useMemo(
    () => products.filter((p) => (p.category || "").toLowerCase().includes("swab")),
    [products]
  );
  const respiratory = React.useMemo(
    () => products.filter((p) => (p.category || "").toLowerCase().includes("respir")),
    [products]
  );
  const arms = React.useMemo(
    () => products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      return cat.includes('arm') || sub.includes('sleeve');
    }),
    [products]
  );
  const hearing = React.useMemo(
    () => products.filter((p) => (p.category || '').toLowerCase().includes('hearing') || (p.sub_category || '').toLowerCase().includes('ear')), 
    [products]
  );
  const footwear = React.useMemo(
    () => products.filter((p) => (p.category || '').toLowerCase().includes('footwear') || (p.sub_category || '').toLowerCase().includes('boot') || (p.sub_category || '').toLowerCase().includes('insol')),
    [products]
  );
  const eyeFace = React.useMemo(
    () => products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      return cat.includes('eye') || cat.includes('face') || sub.includes('glasses') || sub.includes('goggle') || sub.includes('visor') || sub.includes('face shield');
    }),
    [products]
  );
  const heads = React.useMemo(
    () => products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      return cat.includes('head') || sub.includes('helmet') || sub.includes('bump');
    }),
    [products]
  );
  const clothing = React.useMemo(
    () => products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      return cat.includes('clothing') || sub.includes('jacket');
    }),
    [products]
  );

  const lengthOptions = React.useMemo(() => {
    return Array.from(
      new Set(
        swabs
          .map((p) => (typeof p.length_cm === "number" ? `${p.length_cm} cm` : null))
          .filter(Boolean)
      )
    ) as string[];
  }, [swabs]);

  const padOptions = React.useMemo(() => {
    return Array.from(
      new Set(
        swabs
          .map((p) => {
            const ps: any = p.pad_size_json;
            const d = ps?.en?.diameter_mm;
            const l = ps?.en?.length_mm;
            return typeof d === "number" && typeof l === "number" ? `${d}×${l} mm` : null;
          })
          .filter(Boolean)
      )
    ) as string[];
  }, [swabs]);

  const [selectedLengths, setSelectedLengths] = React.useState<string[]>([]);
  const [selectedPadSizes, setSelectedPadSizes] = React.useState<string[]>([]);
  const [selectedConnections, setSelectedConnections] = React.useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = React.useState<string[]>([]);
  const [selectedFilteredParticles, setSelectedFilteredParticles] = React.useState<string[]>([]);
  const [selectedArmLengths, setSelectedArmLengths] = React.useState<string[]>([]);
  const [selectedArmThumbLoop, setSelectedArmThumbLoop] = React.useState<boolean>(false);
  const [selectedArmClosures, setSelectedArmClosures] = React.useState<string[]>([]);
  const [selectedSnrs, setSelectedSnrs] = React.useState<number[]>([]);
  const [selectedParts, setSelectedParts] = React.useState<string[]>([]);
  const [selectedMounts, setSelectedMounts] = React.useState<string[]>([]);
  const [selectedReusable, setSelectedReusable] = React.useState<boolean>(false);
  const [selectedBluetooth, setSelectedBluetooth] = React.useState<boolean>(false);
  // Footwear state
  const [selectedFwClasses, setSelectedFwClasses] = React.useState<string[]>([]);
  const [selectedFwEsd, setSelectedFwEsd] = React.useState<boolean>(false);
  const [selectedFwWidths, setSelectedFwWidths] = React.useState<number[]>([]);
  const [selectedFwSize, setSelectedFwSize] = React.useState<{ min?: number; max?: number }>({});
  const [selectedFwToes, setSelectedFwToes] = React.useState<string[]>([]);
  const [selectedFwSoles, setSelectedFwSoles] = React.useState<string[]>([]);
  const [selectedFwCodes, setSelectedFwCodes] = React.useState<string[]>([]);
  // Eye & Face state
  const [selectedEyeFaceProt, setSelectedEyeFaceProt] = React.useState<string[]>([]);
  const [selectedEyeFaceTints, setSelectedEyeFaceTints] = React.useState<string[]>([]);
  const [selectedEyeFaceCoats, setSelectedEyeFaceCoats] = React.useState<string[]>([]);
  const [selectedEyeFaceUv, setSelectedEyeFaceUv] = React.useState<string[]>([]);
  const [selectedEyeFaceEn, setSelectedEyeFaceEn] = React.useState<string[]>([]);
  // Head state
  const [selectedHeadBrims, setSelectedHeadBrims] = React.useState<string[]>([]);
  const [selectedHeadLt, setSelectedHeadLt] = React.useState<boolean>(false);
  const [selectedHead50365, setSelectedHead50365] = React.useState<boolean>(false);
  const [selectedHeadMm, setSelectedHeadMm] = React.useState<boolean>(false);
  const [selectedHeadVent, setSelectedHeadVent] = React.useState<boolean>(false);
  const [selectedHeadStds, setSelectedHeadStds] = React.useState<string[]>([]);
  // Clothing state
  const [selectedHiVis, setSelectedHiVis] = React.useState<number[]>([]);
  const [selectedClArc, setSelectedClArc] = React.useState<number[]>([]);
  const [selectedClFlame, setSelectedClFlame] = React.useState<boolean>(false);
  const [selectedClAnti, setSelectedClAnti] = React.useState<boolean>(false);
  const [selectedClTypes, setSelectedClTypes] = React.useState<string[]>([]);
  const [selectedClCats, setSelectedClCats] = React.useState<string[]>([]);

  const connectionOptions = React.useMemo(() => {
    const set = new Set<string>();
    respiratory.forEach(p => (p.connections || []).forEach(c => c && set.add(c)));
    return Array.from(set).sort();
  }, [respiratory]);
  const typeOptions = React.useMemo(() => {
    const set = new Set<string>();
    respiratory.forEach(p => p.filter_type && set.add(p.filter_type));
    return Array.from(set).sort();
  }, [respiratory]);
  const classOptions = React.useMemo(() => {
    const set = new Set<string>();
    respiratory.forEach(p => p.protection_class && set.add(p.protection_class));
    return Array.from(set).sort();
  }, [respiratory]);
  const filteredParticleOptions = React.useMemo(() => {
    const set = new Set<string>();
    respiratory.forEach(p => {
      const respiratoryStandards = p.respiratory_standards as Record<string, any>;
      if (respiratoryStandards?.en14387?.gases) {
        const gases = respiratoryStandards.en14387.gases as Record<string, boolean>;
        Object.keys(gases).forEach(gasKey => {
          if (gases[gasKey] === true) {
            set.add(gasKey.toUpperCase());
          }
        });
      }
    });
    return Array.from(set).sort();
  }, [respiratory]);
  const armLengthOptions = React.useMemo(() => {
    const set = new Set<string>();
    arms.forEach(p => { if (typeof p.length_cm === 'number') set.add(`${p.length_cm} cm`); });
    return Array.from(set).sort((a, b) => parseInt(a) - parseInt(b));
  }, [arms]);
  const armClosureOptions = React.useMemo(() => {
    const set = new Set<string>();
    (arms as any[]).forEach((p: any) => { const c = p.arm_attributes?.closure; if (c) set.add(String(c)); });
    return Array.from(set).sort();
  }, [arms]);
  const snrOptions = React.useMemo(() => {
    const set = new Set<number>();
    (hearing as any[]).forEach((p: any) => { const v = p.hearing_standards?.en352?.snr_db; if (typeof v === 'number') set.add(v); });
    return Array.from(set).sort((a,b) => a-b);
  }, [hearing]);
  const partOptions = React.useMemo(() => {
    const set = new Set<string>();
    (hearing as any[]).forEach((p: any) => { (p.hearing_standards?.en352?.parts || []).forEach((x: string) => x && set.add(x)); });
    return Array.from(set).sort();
  }, [hearing]);
  const mountOptions = React.useMemo(() => {
    const set = new Set<string>();
    (hearing as any[]).forEach((p: any) => { const m = p.hearing_attributes?.mount; if (m) set.add(String(m)); });
    return Array.from(set).sort();
  }, [hearing]);
  // Footwear options
  const fwClassOptions = React.useMemo(() => {
    const s = new Set<string>();
    (footwear as any[]).forEach((p: any) => {
      if (p.footwear_attributes?.class) s.add(String(p.footwear_attributes.class));
      (p.footwear_standards?.en_iso_20345_2011 || []).forEach((c: string) => c && s.add(c));
      (p.footwear_standards?.en_iso_20345_2022 || []).forEach((c: string) => c && s.add(c));
    });
    return Array.from(s).sort();
  }, [footwear]);
  const fwWidthOptions = React.useMemo(() => {
    const s = new Set<number>();
    (footwear as any[]).forEach((p: any) => (p.footwear_attributes?.width_fit || []).forEach((n: number) => typeof n === 'number' && s.add(n)));
    return Array.from(s).sort((a,b)=>a-b);
  }, [footwear]);
  const fwSizeBounds = React.useMemo(() => {
    let min = Infinity, max = -Infinity;
    (footwear as any[]).forEach((p: any) => { const mi = p.footwear_attributes?.size_min; const ma = p.footwear_attributes?.size_max; if (typeof mi === 'number') min = Math.min(min, mi); if (typeof ma === 'number') max = Math.max(max, ma); });
    if (!isFinite(min) || !isFinite(max)) return null;
    return { min, max };
  }, [footwear]);
  const fwToeOptions = React.useMemo(() => {
    const s = new Set<string>();
    (footwear as any[]).forEach((p: any) => { const v = p.footwear_attributes?.toe_cap; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [footwear]);
  const fwSoleOptions = React.useMemo(() => {
    const s = new Set<string>();
    (footwear as any[]).forEach((p: any) => { const v = p.footwear_attributes?.sole_material; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [footwear]);
  const fwCodeOptions = React.useMemo(() => {
    const s = new Set<string>();
    (footwear as any[]).forEach((p: any) => (p.footwear_standards?.en_iso_20345_2022 || []).forEach((c: string) => c && s.add(c)));
    return Array.from(s).sort();
  }, [footwear]);

  // Eye & Face options
  const eyeFaceTintOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => { const v = p.eye_face_attributes?.lens_tint; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [eyeFace]);
  const eyeFaceCoatingOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => { (p.eye_face_attributes?.coatings || []).forEach((c: string) => c && s.add(c)); });
    return Array.from(s).sort();
  }, [eyeFace]);
  const eyeFaceUvOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => { const v = p.eye_face_attributes?.uv_code; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [eyeFace]);
  const eyeFaceEnOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => {
      const en166 = p.eye_face_standards?.en166;
      if (!en166) return;
      const fm = en166.frame_mark as string | undefined;
      const lm = en166.lens_mark as string | undefined;
      const ms = en166.mechanical_strength as string | undefined;
      const am = en166.additional_marking as string | undefined;
      const oc = typeof en166.optical_class === 'number' ? `Optical class ${en166.optical_class}` : undefined;
      if (fm) s.add(String(fm));
      if (lm) s.add(String(lm));
      if (ms) s.add(String(ms));
      if (am) s.add(String(am));
      if (oc) s.add(oc);
    });
    return Array.from(s).sort();
  }, [eyeFace]);
  // Clothing options
  const clothingHiVisOptions = React.useMemo(() => {
    const s = new Set<number>();
    (clothing as any[]).forEach((p: any) => { const c = p.clothing_standards?.en_iso_20471?.class; if (typeof c === 'number') s.add(c); });
    return Array.from(s).sort((a,b)=>a-b);
  }, [clothing]);
  const clothingArcOptions = React.useMemo(() => {
    const s = new Set<number>();
    (clothing as any[]).forEach((p: any) => { const c = p.clothing_standards?.iec_61482_2?.class; if (typeof c === 'number') s.add(c); });
    return Array.from(s).sort((a,b)=>a-b);
  }, [clothing]);
  const clothingTypeOptions = React.useMemo(() => ['welding','high-visibility','safety-workwear'], []);
  const clothingCategoryOptions = React.useMemo(() => {
    const set = new Set<string>();
    Object.values(CLOTHING_TYPE_TO_CATEGORIES).forEach((arr) => (arr as string[]).forEach((c) => set.add(c)));
    return Array.from(set);
  }, []);

  // Head options
  const headBrimOptions = React.useMemo(() => {
    const s = new Set<string>();
    (heads as any[]).forEach((p: any) => { const v = p.head_attributes?.brim_length; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [heads]);

  const extraFilters = (
    <>
      <FilterSection title={t('navbar.industrialSwabs')} defaultExpanded={false}>
        <LengthFilter
          options={lengthOptions}
          selected={selectedLengths}
          onToggle={(opt) =>
            setSelectedLengths((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <PadSizeFilter
          options={padOptions}
          selected={selectedPadSizes}
          onToggle={(opt) =>
            setSelectedPadSizes((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
      </FilterSection>

      <FilterSection title={t('navbar.respiratoryProtection')} defaultExpanded={false}>
        <ConnectionFilter
          options={connectionOptions}
          selected={selectedConnections}
          onToggle={(opt) =>
            setSelectedConnections((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <FilterTypeFilter
          options={typeOptions}
          selected={selectedTypes}
          onToggle={(opt) =>
            setSelectedTypes((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <ProtectionClassFilter
          options={classOptions}
          selected={selectedClasses}
          onToggle={(opt) =>
            setSelectedClasses((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <FilteredParticlesFilter
          options={filteredParticleOptions}
          selected={selectedFilteredParticles}
          onToggle={(opt) =>
            setSelectedFilteredParticles((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
      </FilterSection>

      <FilterSection title={t('navbar.armProtection')} defaultExpanded={false}>
        <ArmLengthFilter
          options={armLengthOptions}
          selected={selectedArmLengths}
          onToggle={(opt) =>
            setSelectedArmLengths((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <ThumbLoopFilter value={selectedArmThumbLoop} onChange={setSelectedArmThumbLoop} />
        <ClosureTypeFilter
          options={armClosureOptions}
          selected={selectedArmClosures}
          onToggle={(opt) =>
            setSelectedArmClosures((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
      </FilterSection>

      <FilterSection title={t('navbar.hearingProtection')} defaultExpanded={false}>
        <SnrFilter options={snrOptions} selected={selectedSnrs} onToggle={(opt) => setSelectedSnrs((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <En352PartFilter options={partOptions} selected={selectedParts} onToggle={(opt) => setSelectedParts((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <ReusableFilter value={selectedReusable} onChange={setSelectedReusable} />
        <MountTypeFilter options={mountOptions} selected={selectedMounts} onToggle={(opt) => setSelectedMounts((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <BluetoothFilter value={selectedBluetooth} onChange={setSelectedBluetooth} />
      </FilterSection>

      <FilterSection title={t('navbar.safetyFootwear')} defaultExpanded={false}>
        <ClassFilter options={fwClassOptions} selected={selectedFwClasses} onToggle={(opt) => setSelectedFwClasses((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <ESDFilter value={selectedFwEsd} onChange={setSelectedFwEsd} />
        <WidthFilter options={fwWidthOptions} selected={selectedFwWidths} onToggle={(opt) => setSelectedFwWidths((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SizeRangeFilter bounds={fwSizeBounds} value={selectedFwSize} onChange={setSelectedFwSize} />
        <ToeCapFilter options={fwToeOptions} selected={selectedFwToes} onToggle={(opt) => setSelectedFwToes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SoleMaterialFilter options={fwSoleOptions} selected={selectedFwSoles} onToggle={(opt) => setSelectedFwSoles((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <StandardCodeFilter options={fwCodeOptions} selected={selectedFwCodes} onToggle={(opt) => setSelectedFwCodes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.eyeFaceProtection')} defaultExpanded={false}>
        <ProtectionTypeFilter selected={selectedEyeFaceProt} onToggle={(opt) => setSelectedEyeFaceProt((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <LensTintFilter options={eyeFaceTintOptions} selected={selectedEyeFaceTints} onToggle={(opt) => setSelectedEyeFaceTints((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <CoatingFilter options={eyeFaceCoatingOptions} selected={selectedEyeFaceCoats} onToggle={(opt) => setSelectedEyeFaceCoats((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <UvCodeFilter options={eyeFaceUvOptions} selected={selectedEyeFaceUv} onToggle={(opt) => setSelectedEyeFaceUv((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      <EyeFaceEnStandardFilter options={eyeFaceEnOptions} selected={selectedEyeFaceEn} onToggle={(opt) => setSelectedEyeFaceEn((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.headProtection')} defaultExpanded={false}>
        <BrimLengthFilter options={headBrimOptions} selected={selectedHeadBrims} onToggle={(opt) => setSelectedHeadBrims((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <LowTemperatureFilter value={selectedHeadLt} onChange={setSelectedHeadLt} />
        <ElectricalInsulationFilter value={selectedHead50365} onChange={setSelectedHead50365} />
        <MoltenMetalFilter value={selectedHeadMm} onChange={setSelectedHeadMm} />
        <VentilationFilter value={selectedHeadVent} onChange={setSelectedHeadVent} />
        <EnStandardFilter selected={selectedHeadStds} onToggle={(opt) => setSelectedHeadStds((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.protectiveClothing')} defaultExpanded={false}>
        <ClothingTypeFilter options={clothingTypeOptions} selected={selectedClTypes} onToggle={(v) => setSelectedClTypes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} />
        <ClothingCategoryFilter options={clothingCategoryOptions} selected={selectedClCats} onToggle={(v) => setSelectedClCats((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} />
        <HiVisClassFilter options={clothingHiVisOptions} selected={selectedHiVis} onToggle={(c) => setSelectedHiVis((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))} />
        <FlameStandardFilter value={selectedClFlame} onChange={setSelectedClFlame} />
        <ArcClassFilter options={clothingArcOptions} selected={selectedClArc} onToggle={(c) => setSelectedClArc((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))} />
        <AntistaticFilter value={selectedClAnti} onChange={setSelectedClAnti} />
      </FilterSection>
    </>
  );

  const extraFiltersMobile = (
    <>
      <FilterSection title={t('navbar.industrialSwabs')} defaultExpanded={false} variant="mobile">
        <LengthFilterMobile
          options={lengthOptions}
          selected={selectedLengths}
          onToggle={(opt) =>
            setSelectedLengths((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <PadSizeFilterMobile
          options={padOptions}
          selected={selectedPadSizes}
          onToggle={(opt) =>
            setSelectedPadSizes((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
      </FilterSection>

      <FilterSection title={t('navbar.respiratoryProtection')} defaultExpanded={false} variant="mobile">
        <ConnectionFilterMobile
          options={connectionOptions}
          selected={selectedConnections}
          onToggle={(opt) =>
            setSelectedConnections((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <FilterTypeFilterMobile
          options={typeOptions}
          selected={selectedTypes}
          onToggle={(opt) =>
            setSelectedTypes((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <ProtectionClassFilterMobile
          options={classOptions}
          selected={selectedClasses}
          onToggle={(opt) =>
            setSelectedClasses((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <FilteredParticlesFilterMobile
          options={filteredParticleOptions}
          selected={selectedFilteredParticles}
          onToggle={(opt) =>
            setSelectedFilteredParticles((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
      </FilterSection>

      <FilterSection title={t('navbar.armProtection')} defaultExpanded={false} variant="mobile">
        <ArmLengthFilterMobile
          options={armLengthOptions}
          selected={selectedArmLengths}
          onToggle={(opt) =>
            setSelectedArmLengths((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
        <ThumbLoopFilterMobile value={selectedArmThumbLoop} onChange={setSelectedArmThumbLoop} />
        <ClosureTypeFilterMobile
          options={armClosureOptions}
          selected={selectedArmClosures}
          onToggle={(opt) =>
            setSelectedArmClosures((prev) =>
              prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
            )
          }
        />
      </FilterSection>

      <FilterSection title={t('navbar.hearingProtection')} defaultExpanded={false} variant="mobile">
        <SnrFilterMobile options={snrOptions} selected={selectedSnrs} onToggle={(opt) => setSelectedSnrs((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <En352PartFilterMobile options={partOptions} selected={selectedParts} onToggle={(opt) => setSelectedParts((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <ReusableFilterMobile value={selectedReusable} onChange={setSelectedReusable} />
        <MountTypeFilterMobile options={mountOptions} selected={selectedMounts} onToggle={(opt) => setSelectedMounts((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <BluetoothFilterMobile value={selectedBluetooth} onChange={setSelectedBluetooth} />
      </FilterSection>

      <FilterSection title={t('navbar.safetyFootwear')} defaultExpanded={false} variant="mobile">
        <ClassFilterMobile options={fwClassOptions} selected={selectedFwClasses} onToggle={(opt) => setSelectedFwClasses((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <ESDFilterMobile value={selectedFwEsd} onChange={setSelectedFwEsd} />
        <WidthFilterMobile options={fwWidthOptions} selected={selectedFwWidths} onToggle={(opt) => setSelectedFwWidths((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SizeRangeFilterMobile bounds={fwSizeBounds} value={selectedFwSize} onChange={setSelectedFwSize} />
        <ToeCapFilterMobile options={fwToeOptions} selected={selectedFwToes} onToggle={(opt) => setSelectedFwToes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SoleMaterialFilterMobile options={fwSoleOptions} selected={selectedFwSoles} onToggle={(opt) => setSelectedFwSoles((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <StandardCodeFilterMobile options={fwCodeOptions} selected={selectedFwCodes} onToggle={(opt) => setSelectedFwCodes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.eyeFaceProtection')} defaultExpanded={false} variant="mobile">
        <ProtectionTypeFilterMobile selected={selectedEyeFaceProt} onToggle={(opt) => setSelectedEyeFaceProt((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <LensTintFilterMobile options={eyeFaceTintOptions} selected={selectedEyeFaceTints} onToggle={(opt) => setSelectedEyeFaceTints((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <CoatingFilterMobile options={eyeFaceCoatingOptions} selected={selectedEyeFaceCoats} onToggle={(opt) => setSelectedEyeFaceCoats((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <UvCodeFilterMobile options={eyeFaceUvOptions} selected={selectedEyeFaceUv} onToggle={(opt) => setSelectedEyeFaceUv((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      <EyeFaceEnStandardFilterMobile options={eyeFaceEnOptions} selected={selectedEyeFaceEn} onToggle={(opt) => setSelectedEyeFaceEn((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.headProtection')} defaultExpanded={false} variant="mobile">
        <BrimLengthFilterMobile options={headBrimOptions} selected={selectedHeadBrims} onToggle={(opt) => setSelectedHeadBrims((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <LowTemperatureFilterMobile value={selectedHeadLt} onChange={setSelectedHeadLt} />
        <ElectricalInsulationFilterMobile value={selectedHead50365} onChange={setSelectedHead50365} />
        <MoltenMetalFilterMobile value={selectedHeadMm} onChange={setSelectedHeadMm} />
        <VentilationFilterMobile value={selectedHeadVent} onChange={setSelectedHeadVent} />
        <EnStandardFilterMobile selected={selectedHeadStds} onToggle={(opt) => setSelectedHeadStds((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.protectiveClothing')} defaultExpanded={false} variant="mobile">
        <ClothingTypeFilterMobile options={clothingTypeOptions} selected={selectedClTypes} onToggle={(v) => setSelectedClTypes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} />
        <ClothingCategoryFilterMobile options={clothingCategoryOptions} selected={selectedClCats} onToggle={(v) => setSelectedClCats((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} />
        <HiVisClassFilterMobile options={clothingHiVisOptions} selected={selectedHiVis} onToggle={(c) => setSelectedHiVis((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))} />
        <FlameStandardFilterMobile value={selectedClFlame} onChange={setSelectedClFlame} />
        <ArcClassFilterMobile options={clothingArcOptions} selected={selectedClArc} onToggle={(c) => setSelectedClArc((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))} />
        <AntistaticFilterMobile value={selectedClAnti} onChange={setSelectedClAnti} />
      </FilterSection>
    </>
  );

  const predicate = (p: Product) => {
    const hasSwabSel = selectedLengths.length > 0 || selectedPadSizes.length > 0;
    const hasRespSel = selectedConnections.length > 0 || selectedTypes.length > 0 || selectedClasses.length > 0;
    const hasArmSel = selectedArmLengths.length > 0 || selectedArmThumbLoop || selectedArmClosures.length > 0;
    const hasHearSel = selectedSnrs.length > 0 || selectedParts.length > 0 || selectedMounts.length > 0 || selectedReusable || selectedBluetooth;
    const hasFwSel = selectedFwClasses.length > 0 || selectedFwEsd || selectedFwWidths.length > 0 || (selectedFwSize.min !== undefined || selectedFwSize.max !== undefined) || selectedFwToes.length > 0 || selectedFwSoles.length > 0 || selectedFwCodes.length > 0;
    const hasEyeSel = selectedEyeFaceProt.length > 0 || selectedEyeFaceTints.length > 0 || selectedEyeFaceCoats.length > 0 || selectedEyeFaceUv.length > 0 || selectedEyeFaceEn.length > 0;
    const hasHeadSel = selectedHeadBrims.length > 0 || selectedHeadLt || selectedHead50365 || selectedHeadMm || selectedHeadVent || selectedHeadStds.length > 0;
    const hasClothSel = selectedClTypes.length > 0 || selectedClCats.length > 0 || selectedHiVis.length > 0 || selectedClFlame || selectedClArc.length > 0 || selectedClAnti;
    // If no selections at all, don't filter out anything
    if (!hasSwabSel && !hasRespSel && !hasArmSel && !hasHearSel && !hasFwSel && !hasEyeSel && !hasHeadSel && !hasClothSel) return true;

    const lenLabel = typeof p.length_cm === "number" ? `${p.length_cm} cm` : undefined;
    const ps: any = p.pad_size_json;
    const d = ps?.en?.diameter_mm as number | undefined;
    const l = ps?.en?.length_mm as number | undefined;
    const padLabel = typeof d === "number" && typeof l === "number" ? `${d}×${l} mm` : undefined;

    const lengthOk = selectedLengths.length === 0 ? true : (!!lenLabel && selectedLengths.includes(lenLabel));
    const padOk = selectedPadSizes.length === 0 ? true : (!!padLabel && selectedPadSizes.includes(padLabel));
    const connOk = selectedConnections.length === 0 ? true : (!!p.connections && p.connections.some(c => selectedConnections.includes(c)));
    const typeOk = selectedTypes.length === 0 ? true : (!!p.filter_type && selectedTypes.includes(p.filter_type));
    const classOk = selectedClasses.length === 0 ? true : (!!p.protection_class && selectedClasses.includes(p.protection_class));
    const particlesOk = selectedFilteredParticles.length === 0 ? true : (() => {
      const respiratoryStandards = p.respiratory_standards as Record<string, any>;
      if (!respiratoryStandards?.en14387?.gases) return false;
      const gases = respiratoryStandards.en14387.gases as Record<string, boolean>;
      return selectedFilteredParticles.some(particle => gases[particle.toLowerCase()] === true);
    })();

    const armLenLabel = typeof p.length_cm === 'number' ? `${p.length_cm} cm` : undefined;
    const armLenOk = selectedArmLengths.length === 0 ? true : (!!armLenLabel && selectedArmLengths.includes(armLenLabel));
    const armLoop = (p as any).arm_attributes?.thumb_loop as boolean | undefined;
    const armLoopOk = !selectedArmThumbLoop ? true : (typeof armLoop === 'boolean' && armLoop === true);
    const armClosure = (p as any).arm_attributes?.closure as string | undefined;
    const armClosureOk = selectedArmClosures.length === 0 ? true : (!!armClosure && selectedArmClosures.includes(armClosure));

    const hs: any = (p as any).hearing_standards;
    const ha: any = (p as any).hearing_attributes;
    const snr = hs?.en352?.snr_db as number | undefined;
    const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
    const pReusable: boolean | undefined = typeof ha?.reusable === 'boolean' ? ha.reusable : undefined;
    const pMount: string | undefined = ha?.mount;
    const pBt: boolean | undefined = typeof ha?.bluetooth === 'boolean' ? ha.bluetooth : undefined;
    const snrOk = selectedSnrs.length === 0 ? true : (typeof snr === 'number' && selectedSnrs.includes(snr));
    const partOk = selectedParts.length === 0 ? true : parts.some(pt => selectedParts.includes(pt));
    const reuseOk = !selectedReusable ? true : (typeof pReusable === 'boolean' && pReusable === true);
    const mountOk = selectedMounts.length === 0 ? true : (!!pMount && selectedMounts.includes(pMount));
    const btOk = !selectedBluetooth ? true : (typeof pBt === 'boolean' && pBt === true);
    // Footwear checks
    const fp: any = p;
    const fattr = fp.footwear_attributes || {};
    const fstd = fp.footwear_standards || {};
    const classes = [fattr.class, ...((fstd.en_iso_20345_2011 || []) as string[]), ...((fstd.en_iso_20345_2022 || []) as string[])].filter(Boolean) as string[];
    const fwClassOk = selectedFwClasses.length === 0 ? true : classes.some((c: string) => selectedFwClasses.includes(String(c)));
    const fwEsdOk = !selectedFwEsd ? true : (typeof fattr.esd === 'boolean' && fattr.esd === true);
    const fwWidthOk = selectedFwWidths.length === 0 ? true : (Array.isArray(fattr.width_fit) && fattr.width_fit.some((n: number) => selectedFwWidths.includes(n)));
    const fwSizeOk = (selectedFwSize.min === undefined && selectedFwSize.max === undefined) ? true : (
      (typeof fattr.size_min === 'number' && typeof fattr.size_max === 'number') &&
      (selectedFwSize.min !== undefined ? fattr.size_max >= selectedFwSize.min : true) &&
      (selectedFwSize.max !== undefined ? fattr.size_min <= selectedFwSize.max : true)
    );
    const fwToeOk = selectedFwToes.length === 0 ? true : (!!fattr.toe_cap && selectedFwToes.includes(String(fattr.toe_cap)));
    const fwSoleOk = selectedFwSoles.length === 0 ? true : (!!fattr.sole_material && selectedFwSoles.includes(String(fattr.sole_material)));
    const codes: string[] = (fstd.en_iso_20345_2022 || []) as string[];
    const fwCodeOk = selectedFwCodes.length === 0 ? true : codes.some((c) => selectedFwCodes.includes(c));

    // Eye & Face checks
    const ef: any = (p as any).eye_face_attributes || {};
    const efProtOk = selectedEyeFaceProt.length === 0 ? true : (
      (selectedEyeFaceProt.includes('IR') && !!ef.has_ir) ||
      (selectedEyeFaceProt.includes('UV') && !!ef.has_uv) ||
      (selectedEyeFaceProt.includes('Arc') && !!ef.has_arc)
    );
    const efTintOk = selectedEyeFaceTints.length === 0 ? true : (!!ef.lens_tint && selectedEyeFaceTints.includes(String(ef.lens_tint)));
    const efCoatOk = selectedEyeFaceCoats.length === 0 ? true : (Array.isArray(ef.coatings) && ef.coatings.some((c: string) => selectedEyeFaceCoats.includes(c)));
    const efUvOk = selectedEyeFaceUv.length === 0 ? true : (!!ef.uv_code && selectedEyeFaceUv.includes(String(ef.uv_code)));
    const efStd: any = (p as any).eye_face_standards || {};
    const en = efStd?.en166 || {};
    const efFlags: string[] = [];
    if (en.frame_mark) efFlags.push(String(en.frame_mark));
    if (en.lens_mark) efFlags.push(String(en.lens_mark));
    if (en.mechanical_strength) efFlags.push(String(en.mechanical_strength));
    if (en.additional_marking) efFlags.push(String(en.additional_marking));
    if (typeof en.optical_class === 'number') efFlags.push(`Optical class ${en.optical_class}`);
    const efEnOk = selectedEyeFaceEn.length === 0 ? true : selectedEyeFaceEn.some(sel => efFlags.includes(sel));

    // Head checks
    const hsHead: any = (p as any).head_standards || {};
    const haHead: any = (p as any).head_attributes || {};
    const headBrim = haHead?.brim_length as string | undefined;
    const headLt = hsHead?.en397?.optional?.low_temperature;
    const headMm = hsHead?.en397?.optional?.molten_metal as boolean | undefined;
    const head50365 = hsHead?.en50365 as boolean | undefined;
    const headVent = haHead?.ventilation as boolean | undefined;
    const headStdFlags: string[] = [];
    if (hsHead?.en397?.present) headStdFlags.push('EN 397');
    if (hsHead?.en50365) headStdFlags.push('EN 50365');
    if (hsHead?.en12492) headStdFlags.push('EN 12492');
    if (hsHead?.en812) headStdFlags.push('EN 812');
    const headBrimOk = selectedHeadBrims.length === 0 ? true : (!!headBrim && selectedHeadBrims.includes(headBrim));
    const headLtOk = selectedHeadLt ? !!headLt : true;
    const head50365Ok = selectedHead50365 ? !!head50365 : true;
    const headMmOk = selectedHeadMm ? !!headMm : true;
    const headVentOk = selectedHeadVent ? !!headVent : true;
    const headStdOk = selectedHeadStds.length === 0 ? true : selectedHeadStds.some(s => headStdFlags.includes(s));

    // Clothing checks
    const cs: any = (p as any).clothing_standards || {};
    const cVis = cs?.en_iso_20471?.class as number | undefined;
    const cFl = cs?.en_iso_11612 as Record<string, any> | undefined;
    const cArc = cs?.iec_61482_2?.class as number | undefined;
    const cAnti = cs?.en_1149_5 as boolean | undefined;
    const clVisOk = selectedHiVis.length === 0 ? true : (typeof cVis === 'number' && selectedHiVis.includes(cVis));
    const clFlOk = selectedClFlame ? !!cFl : true;
    const clArcOk = selectedClArc.length === 0 ? true : (typeof cArc === 'number' && selectedClArc.includes(cArc));
    const clAntiOk = selectedClAnti ? !!cAnti : true;
    const pType = ((p as any).clothing_type || '').toLowerCase();
    const pCat = ((p as any).clothing_category || '') as string;
    const clTypeOk = selectedClTypes.length === 0 ? true : (pType && selectedClTypes.includes(pType));
    const clCatOk = selectedClCats.length === 0 ? true : (pCat && selectedClCats.includes(pCat));

    return lengthOk && padOk && connOk && typeOk && classOk && particlesOk && armLenOk && armLoopOk && armClosureOk && snrOk && partOk && reuseOk && mountOk && btOk && fwClassOk && fwEsdOk && fwWidthOk && fwSizeOk && fwToeOk && fwSoleOk && fwCodeOk && efProtOk && efTintOk && efCoatOk && efUvOk && efEnOk && headBrimOk && headLtOk && head50365Ok && headMmOk && headVentOk && headStdOk && clVisOk && clFlOk && clArcOk && clAntiOk && clTypeOk && clCatOk;
  };

  return (
    <ProductGrid
      products={products}
      extraFiltersRender={extraFilters}
      extraFiltersRenderMobile={extraFiltersMobile}
      extraFilterPredicate={predicate}
      hideDefaultFilters={false}
      categoryExpandedDefault={true}
      subCategoryExpandedDefault={false}
    />
  );
}


