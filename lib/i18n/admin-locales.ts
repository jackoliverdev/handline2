import { SUPPORTED_LANGUAGES, type Language } from './config';

export type StringLocales = Record<Language, string>;
export type ArrayLocales = Record<Language, string[]>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function emptyStringLocales(): StringLocales {
  return { en: '', it: '', fr: '', de: '', es: '' };
}

export function emptyArrayLocales(): ArrayLocales {
  return { en: [], it: [], fr: [], de: [], es: [] };
}

export function withCurrentOption(
  options: { value: string; label: string }[],
  current: string
): { value: string; label: string }[] {
  if (!current || options.some((option) => option.value === current)) return options;
  return [...options, { value: current, label: current }];
}

export function hydrateStringLocales(
  record: Record<string, string> | null | undefined,
  englishFallback = ''
): StringLocales {
  return {
    en: record?.en || englishFallback || '',
    it: record?.it || '',
    fr: record?.fr || '',
    de: record?.de || '',
    es: record?.es || '',
  };
}

export function hydrateArrayLocales(
  record: Record<string, string[]> | null | undefined,
  englishFallback: string[] = []
): ArrayLocales {
  const source = record ?? {};
  return {
    en: Array.isArray(source.en) ? source.en : englishFallback,
    it: Array.isArray(source.it) ? source.it : [],
    fr: Array.isArray(source.fr) ? source.fr : [],
    de: Array.isArray(source.de) ? source.de : [],
    es: Array.isArray(source.es) ? source.es : [],
  };
}

export function hydrateObjectLocales<T extends Record<string, unknown>>(
  record: unknown,
  empty: T
): Record<Language, T> {
  const source = isRecord(record) ? record : {};
  const result = {} as Record<Language, T>;

  for (const lang of SUPPORTED_LANGUAGES) {
    const locale = source[lang];
    result[lang] = {
      ...empty,
      ...(isRecord(locale) ? locale : {}),
    } as T;
  }

  return result;
}

export function localeString(locales: StringLocales, lang: Language): string {
  return locales[lang] ?? '';
}

export function localeList(locales: ArrayLocales, lang: Language): string[] {
  return locales[lang] ?? [];
}

export type GenerateApplyMode = 'fill-empty' | 'replace';

export function localeHasContent(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.some((item) => localeHasContent(item));
  if (isRecord(value)) return Object.values(value).some((item) => localeHasContent(item));
  return false;
}

function cleanSourceValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim() ? value : undefined;
  }

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === 'string')) {
      const next = value.filter((item) => item.trim());
      return next.length ? next : undefined;
    }

    if (value.every((item) => isRecord(item) || item == null)) {
      const next = value.map((item) => {
        const cleaned = isRecord(item) ? cleanSourceValue(item) : undefined;
        return isRecord(cleaned) ? cleaned : {};
      });
      return next.some((item) => Object.keys(item).length > 0) ? next : undefined;
    }

    return undefined;
  }

  if (isRecord(value)) {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      const cleaned = cleanSourceValue(child);
      if (cleaned !== undefined) next[key] = cleaned;
    }
    return Object.keys(next).length ? next : undefined;
  }

  return undefined;
}

export function pickEnglishSource(map: Record<string, unknown>): Record<string, unknown> {
  const cleaned = cleanSourceValue(map);
  return isRecord(cleaned) ? cleaned : {};
}

function coerceLocaleValue(current: unknown, incoming: unknown): unknown {
  if (incoming === undefined) return current;

  if (typeof current === 'string') {
    return typeof incoming === 'string' ? incoming : current;
  }

  if (Array.isArray(current)) {
    if (!Array.isArray(incoming)) return current;
    if (incoming.every((item) => typeof item === 'string')) return incoming;
    if (incoming.every((item) => isRecord(item))) return incoming;
    return incoming;
  }

  if (isRecord(current) && isRecord(incoming)) {
    const next: Record<string, unknown> = { ...current };
    const keys = Object.keys({ ...current, ...incoming });
    for (const key of keys) {
      next[key] = coerceLocaleValue(current[key], incoming[key]);
    }
    return next;
  }

  if (current === undefined || current === null) return incoming;
  return current;
}

function mergeLocaleValue(current: unknown, incoming: unknown, mode: GenerateApplyMode): unknown {
  if (incoming === undefined) return current;
  if (mode === 'replace' || !localeHasContent(current)) {
    return coerceLocaleValue(current, incoming);
  }

  if (Array.isArray(current) && Array.isArray(incoming) && current.every(isRecord) && incoming.every(isRecord)) {
    return current.map((item, index) => mergeLocaleValue(item, incoming[index], mode));
  }

  if (isRecord(current) && isRecord(incoming)) {
    const next: Record<string, unknown> = { ...current };
    const keys = Object.keys({ ...current, ...incoming });
    for (const key of keys) {
      next[key] = mergeLocaleValue(current[key], incoming[key], mode);
    }
    return next;
  }

  return current;
}

export function applyLocaleFields<T>(
  prev: Record<Language, T>,
  lang: Language,
  incoming: unknown,
  mode: GenerateApplyMode
): Record<Language, T> {
  return {
    ...prev,
    [lang]: mergeLocaleValue(prev[lang], incoming, mode) as T,
  };
}

export const BLOG_CATEGORY_KEYS = [
  'productsInnovation',
  'industrySustainability',
  'safetyCompliance',
  'other',
] as const;

export type BlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

export const BLOG_CATEGORY_LABELS: Record<BlogCategoryKey, StringLocales> = {
  productsInnovation: {
    en: 'Products & Innovation',
    it: 'Prodotti & Innovazione',
    fr: 'Produits & Innovation',
    de: 'Produkte & Innovation',
    es: 'Productos e Innovación',
  },
  industrySustainability: {
    en: 'Industry & Sustainability',
    it: 'Industria & Sostenibilità',
    fr: 'Industrie et durabilité',
    de: 'Industrie & Nachhaltigkeit',
    es: 'Industria y sostenibilidad',
  },
  safetyCompliance: {
    en: 'Safety & Compliance',
    it: 'Sicurezza & Conformità',
    fr: 'Sécurité et conformité',
    de: 'Sicherheit & Konformität',
    es: 'Seguridad y conformidad',
  },
  other: {
    en: 'Other Insights',
    it: 'Altri Approfondimenti',
    fr: 'Autres Analyses',
    de: 'Weitere Einblicke',
    es: 'Otros Análisis',
  },
};

export function matchBlogCategoryKey(
  locales: Partial<Record<string, string>> | null | undefined
): BlogCategoryKey | null {
  if (!locales) return null;

  const englishTitle = locales.en?.trim();
  if (englishTitle) {
    const englishMatch = BLOG_CATEGORY_KEYS.find(
      (key) => BLOG_CATEGORY_LABELS[key].en === englishTitle
    );
    if (englishMatch) return englishMatch;
  }

  for (const lang of SUPPORTED_LANGUAGES) {
    const title = locales[lang]?.trim();
    if (!title) continue;
    const match = BLOG_CATEGORY_KEYS.find((key) =>
      SUPPORTED_LANGUAGES.some((code) => BLOG_CATEGORY_LABELS[key][code] === title)
    );
    if (match) return match;
  }

  return null;
}
