export interface HazardProtectionFilter {
  id: string;
  name: string;
  description: string;
  logic: (safety: any) => boolean;
}

export const hazardProtectionFilters: HazardProtectionFilter[] = [
  {
    id: 'general_mechanical',
    name: 'General mechanical risks',
    description: 'Abrasion, tear and puncture >= 2 AND either cut >=2 or ISO cut >= C',
    logic: (safety) => {
      if (!safety?.en_388?.enabled) return false;
      
      const abrasion = safety.en_388.abrasion || 0;
      const tear = safety.en_388.tear || 0;
      const puncture = safety.en_388.puncture === 'X' ? 0 : (safety.en_388.puncture || 0);
      const cut = safety.en_388.cut === 'X' ? 0 : (safety.en_388.cut || 0);
      const isoCut = safety.en_388.iso_13997;
      
      const mechanicalRisk = abrasion >= 2 && tear >= 2 && puncture >= 2;
      const cutRisk = cut >= 2 || (isoCut && ['C', 'D', 'E', 'F'].includes(isoCut));
      
      return mechanicalRisk && cutRisk;
    }
  },
  {
    id: 'high_cut_risks',
    name: 'High cut risks',
    description: 'Cut >= 3 OR ISO cut >= C',
    logic: (safety) => {
      if (!safety?.en_388?.enabled) return false;
      
      const cut = safety.en_388.cut === 'X' ? 0 : (safety.en_388.cut || 0);
      const isoCut = safety.en_388.iso_13997;
      
      return cut >= 3 || (isoCut && ['C', 'D', 'E', 'F'].includes(isoCut));
    }
  },
  {
    id: 'abrasion_protection',
    name: 'Abrasion protection',
    description: 'Abrasion >= 3',
    logic: (safety) => {
      if (!safety?.en_388?.enabled) return false;
      
      const abrasion = safety.en_388.abrasion || 0;
      return abrasion >= 3;
    }
  },
  {
    id: 'high_contact_temperature',
    name: 'High contact temperature',
    description: 'EN407 contact heat >= 2',
    logic: (safety) => {
      if (!safety?.en_407?.enabled) return false;
      
      const contactHeat = safety.en_407.contact_heat === 'X' ? 0 : (safety.en_407.contact_heat || 0);
      return contactHeat >= 2;
    }
  },
  {
    id: 'high_heat_temperature',
    name: 'High heat/temperature',
    description: 'ALL first 4 values of EN407 >= 2',
    logic: (safety) => {
      if (!safety?.en_407?.enabled) return false;
      
      const contactHeat = safety.en_407.contact_heat === 'X' ? 0 : (safety.en_407.contact_heat || 0);
      const radiantHeat = safety.en_407.radiant_heat === 'X' ? 0 : (safety.en_407.radiant_heat || 0);
      const convectiveHeat = safety.en_407.convective_heat === 'X' ? 0 : (safety.en_407.convective_heat || 0);
      const flameSpread = safety.en_407.limited_flame_spread === 'X' ? 0 : (safety.en_407.limited_flame_spread || 0);
      
      return contactHeat >= 2 && radiantHeat >= 2 && convectiveHeat >= 2 && flameSpread >= 2;
    }
  },
  {
    id: 'hot_splashes',
    name: 'Hot splashes',
    description: 'EITHER small or large splashes (EN407) values >= 3',
    logic: (safety) => {
      if (!safety?.en_407?.enabled) return false;
      
      const smallSplashes = safety.en_407.small_splashes_molten_metal === 'X' ? 0 : (safety.en_407.small_splashes_molten_metal || 0);
      const largeSplashes = safety.en_407.large_quantities_molten_metal === 'X' ? 0 : (safety.en_407.large_quantities_molten_metal || 0);
      
      return smallSplashes >= 3 || largeSplashes >= 3;
    }
  },
  {
    id: 'high_cut_and_heat',
    name: 'High Cut and Heat',
    description: 'BOTH cut >=3 (or ISO cut >=D) AND flame (EN407) >=3 AND contact (EN407) >=2',
    logic: (safety) => {
      if (!safety?.en_388?.enabled || !safety?.en_407?.enabled) return false;
      
      // Cut protection
      const cut = safety.en_388.cut === 'X' ? 0 : (safety.en_388.cut || 0);
      const isoCut = safety.en_388.iso_13997;
      const cutProtection = cut >= 3 || (isoCut && ['D', 'E', 'F'].includes(isoCut));
      
      // Heat protection
      const flameSpread = safety.en_407.limited_flame_spread === 'X' ? 0 : (safety.en_407.limited_flame_spread || 0);
      const contactHeat = safety.en_407.contact_heat === 'X' ? 0 : (safety.en_407.contact_heat || 0);
      const heatProtection = flameSpread >= 3 && contactHeat >= 2;
      
      return cutProtection && heatProtection;
    }
  },
  {
    id: 'heavy_duty_welding',
    name: 'Heavy-duty welding',
    description: '(EN388) Abrasion, tear and puncture >=2, cut >=1 AND (EN407) flame and small splashes >=3, contact >=1, convective >=2',
    logic: (safety) => {
      if (!safety?.en_388?.enabled || !safety?.en_407?.enabled) return false;
      
      // EN388 requirements
      const abrasion = safety.en_388.abrasion || 0;
      const tear = safety.en_388.tear || 0;
      const puncture = safety.en_388.puncture === 'X' ? 0 : (safety.en_388.puncture || 0);
      const cut = safety.en_388.cut === 'X' ? 0 : (safety.en_388.cut || 0);
      const en388Check = abrasion >= 2 && tear >= 2 && puncture >= 2 && cut >= 1;
      
      // EN407 requirements
      const flameSpread = safety.en_407.limited_flame_spread === 'X' ? 0 : (safety.en_407.limited_flame_spread || 0);
      const smallSplashes = safety.en_407.small_splashes_molten_metal === 'X' ? 0 : (safety.en_407.small_splashes_molten_metal || 0);
      const contactHeat = safety.en_407.contact_heat === 'X' ? 0 : (safety.en_407.contact_heat || 0);
      const convectiveHeat = safety.en_407.convective_heat === 'X' ? 0 : (safety.en_407.convective_heat || 0);
      const en407Check = flameSpread >= 3 && smallSplashes >= 3 && contactHeat >= 1 && convectiveHeat >= 2;
      
      return en388Check && en407Check;
    }
  },
  {
    id: 'precision_welding',
    name: 'Precision welding',
    description: '(EN388) Abrasion, cut, tear, puncture >=1, cut >=1 AND (EN407) flame >=3, contact and convective >=1, small splashes >=2',
    logic: (safety) => {
      if (!safety?.en_388?.enabled || !safety?.en_407?.enabled) return false;
      
      // EN388 requirements
      const abrasion = safety.en_388.abrasion || 0;
      const tear = safety.en_388.tear || 0;
      const puncture = safety.en_388.puncture === 'X' ? 0 : (safety.en_388.puncture || 0);
      const cut = safety.en_388.cut === 'X' ? 0 : (safety.en_388.cut || 0);
      const en388Check = abrasion >= 1 && tear >= 1 && puncture >= 1 && cut >= 1;
      
      // EN407 requirements
      const flameSpread = safety.en_407.limited_flame_spread === 'X' ? 0 : (safety.en_407.limited_flame_spread || 0);
      const contactHeat = safety.en_407.contact_heat === 'X' ? 0 : (safety.en_407.contact_heat || 0);
      const convectiveHeat = safety.en_407.convective_heat === 'X' ? 0 : (safety.en_407.convective_heat || 0);
      const smallSplashes = safety.en_407.small_splashes_molten_metal === 'X' ? 0 : (safety.en_407.small_splashes_molten_metal || 0);
      const en407Check = flameSpread >= 3 && contactHeat >= 1 && convectiveHeat >= 1 && smallSplashes >= 2;
      
      return en388Check && en407Check;
    }
  }
];

// Helper function to get applicable hazard protections for a product
export function getApplicableHazardProtections(safety: any): string[] {
  return hazardProtectionFilters
    .filter(filter => filter.logic(safety))
    .map(filter => filter.name);
}

// Helper function to check if a product matches a specific hazard protection
export function matchesHazardProtection(safety: any, hazardId: string): boolean {
  const filter = hazardProtectionFilters.find(f => f.id === hazardId);
  return filter ? filter.logic(safety) : false;
} 