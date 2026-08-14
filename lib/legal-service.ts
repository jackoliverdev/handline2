import { supabase } from './supabase';
import { legalContent } from '@/content/legal';

export type LegalSlug = 'terms' | 'privacy' | 'cookies';

export interface LegalSectionRecord {
  id: string;
  slug: string;
  sort_order: number;
  title_locales: Record<string, string>;
  content_locales: Record<string, string>;
}

export interface LegalDocumentRecord {
  id: string;
  slug: LegalSlug | string;
  sort_order: number;
  title_locales: Record<string, string>;
  last_updated_locales: Record<string, string>;
  sections: LegalSectionRecord[];
}

const DOC_ORDER: LegalSlug[] = ['terms', 'privacy', 'cookies'];

function resolveLocale(locales: Record<string, string> | undefined, language: string, fallback = ''): string {
  if (!locales) return fallback;
  return locales[language] || locales.en || fallback;
}

function documentsFromFile(): LegalDocumentRecord[] {
  return DOC_ORDER.map((slug, index) => {
    const en = legalContent.en[slug];
    const it = legalContent.it[slug];
    return {
      id: `file-${slug}`,
      slug,
      sort_order: index + 1,
      title_locales: { en: en.title, it: it.title },
      last_updated_locales: { en: en.lastUpdated, it: it.lastUpdated },
      sections: en.sections.map((section, sectionIndex) => ({
        id: `file-${slug}-${sectionIndex}`,
        slug: `${slug}-${sectionIndex + 1}`,
        sort_order: sectionIndex + 1,
        title_locales: {
          en: section.title,
          it: it.sections[sectionIndex]?.title || section.title,
        },
        content_locales: {
          en: section.content,
          it: it.sections[sectionIndex]?.content || section.content,
        },
      })),
    };
  });
}

export async function getLegalDocuments(): Promise<LegalDocumentRecord[]> {
  try {
    const { data: documents, error: documentError } = await supabase
      .from('legal_documents')
      .select('id, slug, sort_order, title_locales, last_updated_locales')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (documentError || !documents?.length) {
      return documentsFromFile();
    }

    const { data: sections, error: sectionError } = await supabase
      .from('legal_sections')
      .select('id, document_id, slug, sort_order, title_locales, content_locales')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (sectionError) {
      return documentsFromFile();
    }

    const sectionsByDocument = new Map<string, LegalSectionRecord[]>();
    for (const section of sections || []) {
      const list = sectionsByDocument.get(section.document_id) || [];
      list.push({
        id: section.id,
        slug: section.slug,
        sort_order: section.sort_order,
        title_locales: section.title_locales || {},
        content_locales: section.content_locales || {},
      });
      sectionsByDocument.set(section.document_id, list);
    }

    return documents.map((document) => ({
      id: document.id,
      slug: document.slug,
      sort_order: document.sort_order,
      title_locales: document.title_locales || {},
      last_updated_locales: document.last_updated_locales || {},
      sections: sectionsByDocument.get(document.id) || [],
    }));
  } catch {
    return documentsFromFile();
  }
}

export function resolveLegalDocument(document: LegalDocumentRecord, language: string) {
  return {
    slug: document.slug,
    title: resolveLocale(document.title_locales, language, document.slug),
    lastUpdated: resolveLocale(document.last_updated_locales, language),
    sections: document.sections.map((section) => ({
      id: section.id,
      title: resolveLocale(section.title_locales, language),
      content: resolveLocale(section.content_locales, language),
    })),
  };
}
