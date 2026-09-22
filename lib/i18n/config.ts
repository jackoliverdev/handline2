export const SUPPORTED_LANGUAGES = ['en', 'it', 'fr', 'de', 'es'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type FlagCountry = 'GB' | 'IT' | 'FR' | 'DE' | 'ES';

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_META: Record<
  Language,
  {
    labelKey: string;
    nativeName: string;
    flag: FlagCountry;
    intlLocale: string;
    openGraphLocale: string;
  }
> = {
  en: {
    labelKey: 'navbar.language.en',
    nativeName: 'English',
    flag: 'GB',
    intlLocale: 'en-GB',
    openGraphLocale: 'en_GB',
  },
  it: {
    labelKey: 'navbar.language.it',
    nativeName: 'Italiano',
    flag: 'IT',
    intlLocale: 'it-IT',
    openGraphLocale: 'it_IT',
  },
  fr: {
    labelKey: 'navbar.language.fr',
    nativeName: 'Français',
    flag: 'FR',
    intlLocale: 'fr-FR',
    openGraphLocale: 'fr_FR',
  },
  de: {
    labelKey: 'navbar.language.de',
    nativeName: 'Deutsch',
    flag: 'DE',
    intlLocale: 'de-DE',
    openGraphLocale: 'de_DE',
  },
  es: {
    labelKey: 'navbar.language.es',
    nativeName: 'Español',
    flag: 'ES',
    intlLocale: 'es-ES',
    openGraphLocale: 'es_ES',
  },
};

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function parseLanguage(value?: string | null): Language {
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export function getIntlLocale(language: string): string {
  return isLanguage(language) ? LANGUAGE_META[language].intlLocale : LANGUAGE_META.en.intlLocale;
}

export function getOpenGraphLocale(language: string): string {
  return isLanguage(language) ? LANGUAGE_META[language].openGraphLocale : LANGUAGE_META.en.openGraphLocale;
}

export function persistLanguageCookie(language: Language): void {
  if (typeof document === 'undefined') return;
  document.cookie = `language=${language}; path=/`;
}
