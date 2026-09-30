type LocaleMap = Record<string, unknown> | null | undefined;

const filledText = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? value : undefined;
};

const filledList = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return items.length ? items : undefined;
};

export function pickLocaleText(locales: LocaleMap, language: string, base?: string | null): string {
  return filledText(locales?.[language]) || filledText(locales?.en) || filledText(base) || '';
}

export function pickLocaleList(locales: LocaleMap, language: string, base?: string[] | null): string[] {
  return filledList(locales?.[language]) || filledList(locales?.en) || filledList(base) || [];
}
