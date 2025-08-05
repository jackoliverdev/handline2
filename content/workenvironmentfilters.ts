export interface WorkEnvironmentFilter {
  id: string;
  name: string;
  translationKey: string;
  description: string;
  logic: (environment_pictograms: any) => boolean;
}

export const workEnvironmentFilters: WorkEnvironmentFilter[] = [
  {
    id: 'dry',
    name: 'Dry Conditions', // Fallback for backwards compatibility
    translationKey: 'productPage.dryConditions',
    description: 'Suitable for dry conditions work environments',
    logic: (environment_pictograms) => {
      return environment_pictograms?.dry === true;
    }
  },
  {
    id: 'wet',
    name: 'Wet Conditions',
    translationKey: 'productPage.wetConditions',
    description: 'Suitable for wet conditions work environments',
    logic: (environment_pictograms) => {
      return environment_pictograms?.wet === true;
    }
  },
  {
    id: 'dust',
    name: 'Dusty Conditions',
    translationKey: 'productPage.dustyConditions',
    description: 'Suitable for dusty conditions work environments',
    logic: (environment_pictograms) => {
      return environment_pictograms?.dust === true;
    }
  },
  {
    id: 'chemical',
    name: 'Chemical Exposure',
    translationKey: 'productPage.chemicalExposure',
    description: 'Suitable for chemical exposure work environments',
    logic: (environment_pictograms) => {
      return environment_pictograms?.chemical === true;
    }
  },
  {
    id: 'biological',
    name: 'Biological Hazards',
    translationKey: 'productPage.biologicalHazards',
    description: 'Suitable for biological hazards work environments',
    logic: (environment_pictograms) => {
      return environment_pictograms?.biological === true;
    }
  },
  {
    id: 'oily_grease',
    name: 'Oily / Greasy',
    translationKey: 'productPage.oilyGreasy',
    description: 'Suitable for oily / greasy work environments',
    logic: (environment_pictograms) => {
      return environment_pictograms?.oily_grease === true;
    }
  }
];

// Helper function to get applicable work environments for a product
export function getApplicableWorkEnvironments(environment_pictograms: any): string[] {
  return workEnvironmentFilters
    .filter(filter => filter.logic(environment_pictograms))
    .map(filter => filter.name);
}

// Helper function to check if a product matches a specific work environment
export function matchesWorkEnvironment(environment_pictograms: any, environmentId: string): boolean {
  const filter = workEnvironmentFilters.find(f => f.id === environmentId);
  return filter ? filter.logic(environment_pictograms) : false;
} 