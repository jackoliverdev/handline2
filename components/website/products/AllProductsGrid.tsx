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
import { WorkEnvironmentFilter as EyeFaceWorkEnvironmentFilter } from "@/components/website/products/filters/eyeface/WorkEnvironmentFilter";
import { WorkEnvironmentFilterMobile as EyeFaceWorkEnvironmentFilterMobile } from "@/components/website/products/filters/eyeface/WorkEnvironmentFilterMobile";
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
import { HiVisClassFilter } from "@/components/website/products/filters/clothing/HiVisClassFilter";
import { ClothingTypeFilterMobile } from "@/components/website/products/filters/clothing/ClothingTypeFilterMobile";
import { HiVisClassFilterMobile } from "@/components/website/products/filters/clothing/HiVisClassFilterMobile";
import { ClothingSizeRangeFilter } from "@/components/website/products/filters/clothing/ClothingSizeRangeFilter";
import { ClothingSizeRangeFilterMobile } from "@/components/website/products/filters/clothing/ClothingSizeRangeFilterMobile";
import { ENStandardFilter } from "@/components/website/products/filters/ENStandardFilter";
import { ENStandardFilterMobile } from "@/components/website/products/filters/ENStandardFilterMobile";
import { WorkEnvironmentFilter } from "@/components/website/products/filters/WorkEnvironmentFilter";
import { WorkEnvironmentFilterMobile } from "@/components/website/products/filters/WorkEnvironmentFilterMobile";
import { GARMENT_TYPES } from "@/content/clothing-categories";
import { getUniqueENStandards, matchesENStandards } from "@/lib/product-utils";

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
  const [selectedEyeFaceWorkEnv, setSelectedEyeFaceWorkEnv] = React.useState<string[]>([]);
  // Head state
  const [selectedHeadBrims, setSelectedHeadBrims] = React.useState<string[]>([]);
  const [selectedHeadLt, setSelectedHeadLt] = React.useState<boolean>(false);
  const [selectedHead50365, setSelectedHead50365] = React.useState<boolean>(false);
  const [selectedHeadMm, setSelectedHeadMm] = React.useState<boolean>(false);
  const [selectedHeadVent, setSelectedHeadVent] = React.useState<boolean>(false);
  const [selectedHeadStds, setSelectedHeadStds] = React.useState<string[]>([]);
  // Clothing state
  const [selectedClTypes, setSelectedClTypes] = React.useState<string[]>([]);
  const [selectedHiVis, setSelectedHiVis] = React.useState<number[]>([]);
  const [selectedClENStandards, setSelectedClENStandards] = React.useState<string[]>([]);
  const [selectedClWorkEnv, setSelectedClWorkEnv] = React.useState<string[]>([]);
  const [selectedClSizeRange, setSelectedClSizeRange] = React.useState<{ min?: number; max?: number }>({});
  const [clEnStandardExpanded, setClEnStandardExpanded] = React.useState<boolean>(false);
  const [clWorkEnvExpanded, setClWorkEnvExpanded] = React.useState<boolean>(false);
  const [clSizeExpanded, setClSizeExpanded] = React.useState<boolean>(false);

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
            // Special case for mercury - normalize all variations (hg, HG, Hg) to 'Hg' (proper chemical symbol)
            const displayKey = gasKey.toLowerCase() === 'hg' ? 'Hg' : gasKey.toUpperCase();
            set.add(displayKey);
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
      const c2011: string[] = p.footwear_standards?.en_iso_20345_2011 || [];
      const c2022: string[] = p.footwear_standards?.en_iso_20345_2022 || [];
      // Only include actual safety classes (SB, S1-S5), not slip resistance codes (SC, SR, SRC)
      [...c2011, ...c2022].forEach((c: string) => {
        if (c && String(c).match(/^S[B1-5]$/i)) s.add(c);
      });
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
    (footwear as any[]).forEach((p: any) => {
      const c2011: string[] = p.footwear_standards?.en_iso_20345_2011 || [];
      const c2022: string[] = p.footwear_standards?.en_iso_20345_2022 || [];
      // Include slip resistance codes (SC, SR, SRC) and other additional codes (PL, HI, CI, etc.)
      [...c2011, ...c2022].forEach((c: string) => {
        if (c && !String(c).match(/^S[B1-5]$/i)) s.add(c);
      });
    });
    return Array.from(s).sort();
  }, [footwear]);

  // Eye & Face options
  const eyeFaceTintOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => { const v = p.eye_face_attributes?.lens_tint; if (v) s.add(String(v).toLowerCase()); });
    return Array.from(s).sort();
  }, [eyeFace]);
  const eyeFaceCoatingOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => { (p.eye_face_attributes?.coatings || []).forEach((c: string) => c && s.add(String(c).toLowerCase())); });
    return Array.from(s).sort();
  }, [eyeFace]);
  const eyeFaceUvOptions = React.useMemo(() => {
    const s = new Set<string>();
    (eyeFace as any[]).forEach((p: any) => { const v = p.eye_face_attributes?.uv_code; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [eyeFace]);
  const eyeFaceWorkEnvOptions = React.useMemo(() => {
    // Always show all 3 options regardless of product data
    return ['biological', 'chemical', 'electrical'];
  }, []);
  // Clothing options
  const clothingTypeOptions = React.useMemo(() => Array.from(GARMENT_TYPES), []);
  const clothingHiVisOptions = React.useMemo(() => {
    const s = new Set<number>();
    (clothing as any[]).forEach((p: any) => { const c = p.clothing_standards?.en_iso_20471?.class; if (typeof c === 'number') s.add(c); });
    return Array.from(s).sort((a,b)=>a-b);
  }, [clothing]);
  const clothingENStandards = React.useMemo(() => getUniqueENStandards(clothing), [clothing]);
  const clothingSizeBounds = React.useMemo(() => {
    let min = Infinity, max = -Infinity;
    (clothing as any[]).forEach((p: any) => {
      const sizeMin = p.clothing_attributes?.size_min;
      const sizeMax = p.clothing_attributes?.size_max;
      if (typeof sizeMin === 'number') min = Math.min(min, sizeMin);
      if (typeof sizeMax === 'number') max = Math.max(max, sizeMax);
    });
    if (!isFinite(min) || !isFinite(max)) return null;
    return { min, max };
  }, [clothing]);

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
        <StandardCodeFilter options={fwCodeOptions} selected={selectedFwCodes} onToggle={(opt) => setSelectedFwCodes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <ESDFilter value={selectedFwEsd} onChange={setSelectedFwEsd} />
        <WidthFilter options={fwWidthOptions} selected={selectedFwWidths} onToggle={(opt) => setSelectedFwWidths((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SizeRangeFilter bounds={fwSizeBounds} value={selectedFwSize} onChange={setSelectedFwSize} />
        <ToeCapFilter options={fwToeOptions} selected={selectedFwToes} onToggle={(opt) => setSelectedFwToes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SoleMaterialFilter options={fwSoleOptions} selected={selectedFwSoles} onToggle={(opt) => setSelectedFwSoles((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.eyeFaceProtection')} defaultExpanded={false}>
        <ProtectionTypeFilter selected={selectedEyeFaceProt} onToggle={(opt) => setSelectedEyeFaceProt((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <LensTintFilter options={eyeFaceTintOptions} selected={selectedEyeFaceTints} onToggle={(opt) => setSelectedEyeFaceTints((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <CoatingFilter options={eyeFaceCoatingOptions} selected={selectedEyeFaceCoats} onToggle={(opt) => setSelectedEyeFaceCoats((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <EyeFaceWorkEnvironmentFilter options={eyeFaceWorkEnvOptions} selected={selectedEyeFaceWorkEnv} onToggle={(opt) => setSelectedEyeFaceWorkEnv((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <UvCodeFilter options={eyeFaceUvOptions} selected={selectedEyeFaceUv} onToggle={(opt) => setSelectedEyeFaceUv((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
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
        <ClothingTypeFilter options={clothingTypeOptions} selected={selectedClTypes} onToggle={(v: string) => setSelectedClTypes((prev) => (prev.includes(v) ? prev.filter((x: string) => x !== v) : [...prev, v]))} defaultOpen={false} />
        <HiVisClassFilter options={clothingHiVisOptions} selected={selectedHiVis} onToggle={(c) => setSelectedHiVis((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))} />
        <ENStandardFilter standards={clothingENStandards} selectedStandards={selectedClENStandards} toggleStandard={(v) => setSelectedClENStandards((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} isExpanded={clEnStandardExpanded} toggleSection={() => setClEnStandardExpanded(!clEnStandardExpanded)} />
        <WorkEnvironmentFilter selectedWorkEnvironments={selectedClWorkEnv} toggleWorkEnvironment={(v) => setSelectedClWorkEnv((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} isExpanded={clWorkEnvExpanded} toggleSection={() => setClWorkEnvExpanded(!clWorkEnvExpanded)} />
        <ClothingSizeRangeFilter bounds={clothingSizeBounds} value={selectedClSizeRange} onChange={setSelectedClSizeRange} isExpanded={clSizeExpanded} toggleSection={() => setClSizeExpanded(!clSizeExpanded)} />
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
        <StandardCodeFilterMobile options={fwCodeOptions} selected={selectedFwCodes} onToggle={(opt) => setSelectedFwCodes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <ESDFilterMobile value={selectedFwEsd} onChange={setSelectedFwEsd} />
        <WidthFilterMobile options={fwWidthOptions} selected={selectedFwWidths} onToggle={(opt) => setSelectedFwWidths((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SizeRangeFilterMobile bounds={fwSizeBounds} value={selectedFwSize} onChange={setSelectedFwSize} />
        <ToeCapFilterMobile options={fwToeOptions} selected={selectedFwToes} onToggle={(opt) => setSelectedFwToes((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <SoleMaterialFilterMobile options={fwSoleOptions} selected={selectedFwSoles} onToggle={(opt) => setSelectedFwSoles((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
      </FilterSection>

      <FilterSection title={t('navbar.eyeFaceProtection')} defaultExpanded={false} variant="mobile">
        <ProtectionTypeFilterMobile selected={selectedEyeFaceProt} onToggle={(opt) => setSelectedEyeFaceProt((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <LensTintFilterMobile options={eyeFaceTintOptions} selected={selectedEyeFaceTints} onToggle={(opt) => setSelectedEyeFaceTints((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <CoatingFilterMobile options={eyeFaceCoatingOptions} selected={selectedEyeFaceCoats} onToggle={(opt) => setSelectedEyeFaceCoats((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <EyeFaceWorkEnvironmentFilterMobile options={eyeFaceWorkEnvOptions} selected={selectedEyeFaceWorkEnv} onToggle={(opt) => setSelectedEyeFaceWorkEnv((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
        <UvCodeFilterMobile options={eyeFaceUvOptions} selected={selectedEyeFaceUv} onToggle={(opt) => setSelectedEyeFaceUv((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))} />
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
        <ClothingTypeFilterMobile options={clothingTypeOptions} selected={selectedClTypes} onToggle={(v: string) => setSelectedClTypes((prev) => (prev.includes(v) ? prev.filter((x: string) => x !== v) : [...prev, v]))} />
        <HiVisClassFilterMobile options={clothingHiVisOptions} selected={selectedHiVis} onToggle={(c) => setSelectedHiVis((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))} />
        <ENStandardFilterMobile standards={clothingENStandards} selectedStandards={selectedClENStandards} toggleStandard={(v: string) => setSelectedClENStandards((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} isExpanded={clEnStandardExpanded} toggleSection={() => setClEnStandardExpanded(!clEnStandardExpanded)} />
        <WorkEnvironmentFilterMobile selectedWorkEnvironments={selectedClWorkEnv} toggleWorkEnvironment={(v: string) => setSelectedClWorkEnv((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))} />
        <ClothingSizeRangeFilterMobile bounds={clothingSizeBounds} value={selectedClSizeRange} onChange={setSelectedClSizeRange} />
      </FilterSection>
    </>
  );

  const predicate = (p: Product) => {
    const hasSwabSel = selectedLengths.length > 0 || selectedPadSizes.length > 0;
    const hasRespSel = selectedConnections.length > 0 || selectedTypes.length > 0 || selectedClasses.length > 0;
    const hasArmSel = selectedArmLengths.length > 0 || selectedArmThumbLoop || selectedArmClosures.length > 0;
    const hasHearSel = selectedSnrs.length > 0 || selectedParts.length > 0 || selectedMounts.length > 0 || selectedReusable || selectedBluetooth;
    const hasFwSel = selectedFwClasses.length > 0 || selectedFwEsd || selectedFwWidths.length > 0 || (selectedFwSize.min !== undefined || selectedFwSize.max !== undefined) || selectedFwToes.length > 0 || selectedFwSoles.length > 0 || selectedFwCodes.length > 0;
    const hasEyeSel = selectedEyeFaceProt.length > 0 || selectedEyeFaceTints.length > 0 || selectedEyeFaceCoats.length > 0 || selectedEyeFaceUv.length > 0 || selectedEyeFaceWorkEnv.length > 0;
    const hasHeadSel = selectedHeadBrims.length > 0 || selectedHeadLt || selectedHead50365 || selectedHeadMm || selectedHeadVent || selectedHeadStds.length > 0;
    const hasClothSel = selectedClTypes.length > 0 || selectedHiVis.length > 0 || selectedClENStandards.length > 0 || selectedClWorkEnv.length > 0 || (selectedClSizeRange.min !== undefined || selectedClSizeRange.max !== undefined);
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
      return selectedFilteredParticles.some(particle => {
        const lower = particle.toLowerCase();
        // Check both lowercase and uppercase keys in database (handles hg/HG/Hg variations)
        return gases[lower] === true || gases[lower.toUpperCase()] === true;
      });
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
    const codes: string[] = [...((fstd.en_iso_20345_2011 || []) as string[]), ...((fstd.en_iso_20345_2022 || []) as string[])];
    const fwCodeOk = selectedFwCodes.length === 0 ? true : codes.some((c) => selectedFwCodes.includes(c));

    // Eye & Face checks
    const ef: any = (p as any).eye_face_attributes || {};
    const efProtOk = selectedEyeFaceProt.length === 0 ? true : (
      (selectedEyeFaceProt.includes('IR') && !!ef.has_ir) ||
      (selectedEyeFaceProt.includes('UV') && !!ef.has_uv) ||
      (selectedEyeFaceProt.includes('Arc') && !!ef.has_arc)
    );
    const efTintOk = selectedEyeFaceTints.length === 0 ? true : (!!ef.lens_tint && selectedEyeFaceTints.includes(String(ef.lens_tint).toLowerCase()));
    const efCoatingsArr: string[] = Array.isArray(ef.coatings) ? ef.coatings : [];
    const efCoatingsArrLower = efCoatingsArr.map(c => String(c).toLowerCase());
    const efCoatOk = selectedEyeFaceCoats.length === 0 ? true : selectedEyeFaceCoats.some(c => efCoatingsArrLower.includes(c));
    const efUvOk = selectedEyeFaceUv.length === 0 ? true : (!!ef.uv_code && selectedEyeFaceUv.includes(String(ef.uv_code)));
    // Work environment filtering
    const efEnvPictograms: any = (p as any).environment_pictograms || {};
    const efWorkEnvOk = selectedEyeFaceWorkEnv.length === 0 ? true : selectedEyeFaceWorkEnv.every(sel => {
      if (sel === 'chemical') return !!efEnvPictograms.chemical;
      if (sel === 'biological') return !!efEnvPictograms.biological;
      if (sel === 'electrical') return !!efEnvPictograms.electrical;
      return false;
    });

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
    const clTypeOk = selectedClTypes.length === 0 ? true : (() => {
      const sub = (p.sub_category || '').toLowerCase();
      return selectedClTypes.some(ct => sub.includes(ct.toLowerCase()));
    })();
    const clVisOk = selectedHiVis.length === 0 ? true : (typeof cVis === 'number' && selectedHiVis.includes(cVis));
    const clENStdOk = selectedClENStandards.length === 0 ? true : matchesENStandards(p, selectedClENStandards);
    const clWorkEnvOk = selectedClWorkEnv.length === 0 ? true : (() => {
      const envs = (p as any).work_environment_suitability || [];
      return selectedClWorkEnv.some((env: string) => envs.includes(env));
    })();
    const clSizeOk = (selectedClSizeRange.min === undefined && selectedClSizeRange.max === undefined) ? true : (
      (typeof (p as any).clothing_attributes?.size_min === 'number' && 
       typeof (p as any).clothing_attributes?.size_max === 'number') &&
      (selectedClSizeRange.min !== undefined ? (p as any).clothing_attributes.size_max >= selectedClSizeRange.min : true) &&
      (selectedClSizeRange.max !== undefined ? (p as any).clothing_attributes.size_min <= selectedClSizeRange.max : true)
    );

    return lengthOk && padOk && connOk && typeOk && classOk && particlesOk && armLenOk && armLoopOk && armClosureOk && snrOk && partOk && reuseOk && mountOk && btOk && fwClassOk && fwEsdOk && fwWidthOk && fwSizeOk && fwToeOk && fwSoleOk && fwCodeOk && efProtOk && efTintOk && efCoatOk && efUvOk && efWorkEnvOk && headBrimOk && headLtOk && head50365Ok && headMmOk && headVentOk && headStdOk && clTypeOk && clVisOk && clENStdOk && clWorkEnvOk && clSizeOk;
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


