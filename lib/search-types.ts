import type { Language } from './context/language-context';

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

// Content type display names for UI
export const CONTENT_TYPE_LABELS: Record<ContentType, { en: string; it: string }> = {
  product: { en: 'Products', it: 'Prodotti' },
  industry_solution: { en: 'Industries', it: 'Settori' },
  blog: { en: 'Articles', it: 'Articoli' },
  case_study: { en: 'Case Studies', it: 'Casi di Studio' },
  career: { en: 'Careers', it: 'Carriere' },
  en_resource: { en: 'EN Standards', it: 'Standard EN' }
};

// Category mappings for localization
export const CATEGORY_LABELS: Record<string, { en: string; it: string }> = {
  'Heat-Resistant Gloves': { en: 'Heat-Resistant Gloves', it: 'Guanti Resistenti al Calore' },
  'Cut-Resistant Gloves': { en: 'Cut-Resistant Gloves', it: 'Guanti Resistenti al Taglio' },
  'General Purpose Gloves': { en: 'General Purpose Gloves', it: 'Guanti per Uso Generale' },
  'Industrial Swabs': { en: 'Industrial Swabs', it: 'Tamponi Industriali' },
  'Respiratory Protection': { en: 'Respiratory Protection', it: 'Protezione Respiratoria' },
  industry: { en: 'Industry Solutions', it: 'Soluzioni per Settori' },
  blog: { en: 'Blog Articles', it: 'Articoli del Blog' },
  case_study: { en: 'Case Studies', it: 'Casi di Studio' },
  career: { en: 'Career Opportunities', it: 'Opportunità di Carriera' },
  en_resource: { en: 'EN Standards', it: 'Standard EN' }
}; 