import type { Language } from './context/language-context';
import { isLanguage } from './i18n/config';

export type ContentType = 'product' | 'industry_solution' | 'blog' | 'case_study' | 'career' | 'en_resource';

export interface SearchResult {
  content_type: ContentType;
  id: string;
  title: string;
  description: string;
  image_url?: string;
  url: string;
  category: string;
  subcategory?: string;
  relevance_score: number;
  match_type: string;
}

export interface SearchOptions {
  query?: string;
  content_filter?: ContentType[];
  category_filter?: string;
  locale_preference?: Language;
  limit_results?: number;
  min_similarity?: number;
  content_types?: ContentType[];
  category?: string;
  subcategory?: string;
  limit?: number;
  offset?: number;
  sort_by?: 'relevance' | 'newest' | 'alphabetical';
  language?: Language;
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
  total: number;
  total_count: number;
  has_more: boolean;
  offset?: number;
  limit?: number;
  filters: {
    content_filter?: ContentType[];
    category_filter?: string;
    locale_preference: string;
  };
}

// Support both advanced search suggestions and legacy format
export interface SearchSuggestion {
  // Advanced search format
  suggestion: string;
  content_type: ContentType;
  match_count: number;
  // Legacy format properties
  id?: string;
  title?: string;
  description?: string | null;
  url?: string;
  image_url?: string | null;
}

export interface SearchFilters {
  content_types: { key: ContentType; name: string; count: number }[];
  categories: { key: string; name: string; count: number }[];
}

export interface RecentSearch {
  query: string;
  timestamp: string;
  results_count: number;
}

type LocaleLabel = Record<Language, string>;

export const CONTENT_TYPE_LABELS: Record<ContentType, LocaleLabel> = {
  product: { en: 'Products', it: 'Prodotti', fr: 'Produits', de: 'Produkte', es: 'Productos' },
  industry_solution: { en: 'Industries', it: 'Settori', fr: 'Secteurs', de: 'Branchen', es: 'Sectores' },
  blog: { en: 'Articles', it: 'Articoli', fr: 'Articles', de: 'Artikel', es: 'Artículos' },
  case_study: { en: 'Case Studies', it: 'Casi di Studio', fr: 'Études de cas', de: 'Fallstudien', es: 'Casos de estudio' },
  career: { en: 'Careers', it: 'Carriere', fr: 'Carrières', de: 'Karriere', es: 'Empleo' },
  en_resource: { en: 'EN Standards', it: 'Standard EN', fr: 'Normes EN', de: 'EN-Normen', es: 'Normas EN' }
};

export const CATEGORY_LABELS: Record<string, LocaleLabel> = {
  'Heat-Resistant Gloves': { en: 'Heat-Resistant Gloves', it: 'Guanti Resistenti al Calore', fr: 'Gants résistants à la chaleur', de: 'Hitzebeständige Handschuhe', es: 'Guantes resistentes al calor' },
  'Cut-Resistant Gloves': { en: 'Cut-Resistant Gloves', it: 'Guanti Resistenti al Taglio', fr: 'Gants résistants à la coupure', de: 'Schnittfeste Handschuhe', es: 'Guantes resistentes al corte' },
  'General Purpose Gloves': { en: 'General Purpose Gloves', it: 'Guanti per Uso Generale', fr: 'Gants à usage général', de: 'Universalhandschuhe', es: 'Guantes de uso general' },
  'Industrial Swabs': { en: 'Industrial Swabs', it: 'Tamponi Industriali', fr: 'Écouvillons industriels', de: 'Industriewischer', es: 'Escobillas industriales' },
  'Respiratory Protection': { en: 'Respiratory Protection', it: 'Protezione Respiratoria', fr: 'Protection des voies respiratoires', de: 'Atemschutz', es: 'Protección respiratoria' },
  industry: { en: 'Industry Solutions', it: 'Soluzioni per Settori', fr: 'Solutions sectorielles', de: 'Branchenlösungen', es: 'Soluciones sectoriales' },
  blog: { en: 'Blog Articles', it: 'Articoli del Blog', fr: 'Articles de blog', de: 'Blogartikel', es: 'Artículos del blog' },
  case_study: { en: 'Case Studies', it: 'Casi di Studio', fr: 'Études de cas', de: 'Fallstudien', es: 'Casos de estudio' },
  career: { en: 'Career Opportunities', it: 'Opportunità di Carriera', fr: 'Opportunités de carrière', de: 'Karrieremöglichkeiten', es: 'Oportunidades profesionales' },
  en_resource: { en: 'EN Standards', it: 'Standard EN', fr: 'Norme EN', de: 'EN-Norm', es: 'Norma EN' }
};

export function labelForLanguage(labels: LocaleLabel | undefined, language: string): string {
  if (!labels) return '';
  const key = isLanguage(language) ? language : 'en';
  return labels[key] || labels.en;
} 