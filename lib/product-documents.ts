import { LANGUAGE_META, SUPPORTED_LANGUAGES, isLanguage, type Language } from '@/lib/i18n/config';

export type DocumentLocales = Record<Language, string>;

const cleanUrl = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

export function emptyDocumentLocales(): DocumentLocales {
  return { en: '', it: '', fr: '', de: '', es: '' };
}

export function mergeDocumentLocales(
  json: unknown,
  englishUrl?: string | null,
  italianUrl?: string | null
): DocumentLocales {
  const source =
    json && typeof json === 'object' && !Array.isArray(json)
      ? (json as Record<string, unknown>)
      : {};
  const merged = emptyDocumentLocales();
  merged.en = cleanUrl(englishUrl);
  merged.it = cleanUrl(italianUrl);

  for (const lang of SUPPORTED_LANGUAGES) {
    const fromJson = cleanUrl(source[lang]);
    if (fromJson) merged[lang] = fromJson;
  }

  return merged;
}

export function availableDocumentLanguages(map: DocumentLocales): Language[] {
  return SUPPORTED_LANGUAGES.filter((lang) => map[lang].trim().length > 0);
}

export function defaultDocumentLanguage(
  browsingLanguage: string,
  map: DocumentLocales
): Language | null {
  const available = availableDocumentLanguages(map);
  if (available.length === 0) return null;
  if (isLanguage(browsingLanguage) && available.includes(browsingLanguage)) return browsingLanguage;
  if (available.includes('en')) return 'en';
  return available[0];
}

export function withDocumentLocale(
  map: DocumentLocales,
  lang: Language,
  url: string | null
): DocumentLocales {
  return { ...map, [lang]: cleanUrl(url) };
}

export function documentLanguageLabel(lang: Language): string {
  return `${lang.toUpperCase()} ${LANGUAGE_META[lang].nativeName}`;
}

export function legacyDocumentColumns(map: DocumentLocales): { en: string | null; it: string | null } {
  return {
    en: map.en.trim() || null,
    it: map.it.trim() || null,
  };
}
