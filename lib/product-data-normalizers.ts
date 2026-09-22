import { SUPPORTED_LANGUAGES, type Language } from '@/lib/i18n/config';

type LocaleRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is LocaleRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const EMPTY_FOOTWEAR_MATERIALS = {
  upper: '',
  lining: '',
  sole: '',
  insole: '',
  toe_cap: '',
};

const EMPTY_HEAD_TECHNICAL_SPECS = {
  form_factor: '',
  brim_length: '',
  colours: [] as string[],
  additional_features: [] as string[],
};

export type FootwearMaterials = typeof EMPTY_FOOTWEAR_MATERIALS;
export type HeadTechnicalSpecs = typeof EMPTY_HEAD_TECHNICAL_SPECS;

export const normaliseFootwearMaterialsLocales = (
  value: unknown
): Record<Language, FootwearMaterials> => {
  const source = isRecord(value) ? value : {};
  const result = {} as Record<Language, FootwearMaterials>;

  for (const lang of SUPPORTED_LANGUAGES) {
    const raw = source[lang];
    const localeData: LocaleRecord = isRecord(raw) ? raw : {};
    result[lang] = {
      ...EMPTY_FOOTWEAR_MATERIALS,
      ...localeData,
    };
  }

  return result;
};

export const normaliseHeadTechnicalSpecsLocales = (
  value: unknown
): Record<Language, HeadTechnicalSpecs> => {
  const source = isRecord(value) ? value : {};
  const result = {} as Record<Language, HeadTechnicalSpecs>;

  for (const lang of SUPPORTED_LANGUAGES) {
    const raw = source[lang];
    const localeData: LocaleRecord = isRecord(raw) ? raw : {};

    result[lang] = {
      ...EMPTY_HEAD_TECHNICAL_SPECS,
      ...localeData,
      colours: Array.isArray(localeData.colours) ? localeData.colours : [],
      additional_features: Array.isArray(localeData.additional_features)
        ? localeData.additional_features
        : [],
    };
  }

  return result;
};

export const normaliseFootwearStandards = (value: unknown) => {
  const standards = isRecord(value) ? value : {};

  return {
    ...standards,
    en_iso_20345_2011: Array.isArray(standards.en_iso_20345_2011) ? standards.en_iso_20345_2011 : [],
    en_iso_20345_2022: Array.isArray(standards.en_iso_20345_2022) ? standards.en_iso_20345_2022 : [],
    slip_resistance: typeof standards.slip_resistance === 'string' ? standards.slip_resistance : '',
  };
};
