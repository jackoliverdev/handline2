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

export const normaliseFootwearMaterialsLocales = (value: unknown) => {
  const source = isRecord(value) ? value : {};

  return {
    en: { ...EMPTY_FOOTWEAR_MATERIALS, ...(isRecord(source.en) ? source.en : {}) },
    it: { ...EMPTY_FOOTWEAR_MATERIALS, ...(isRecord(source.it) ? source.it : {}) },
  };
};

export const normaliseHeadTechnicalSpecsLocales = (value: unknown) => {
  const source = isRecord(value) ? value : {};
  const normaliseLocale = (locale: unknown) => {
    const localeData = isRecord(locale) ? locale : {};

    return {
      ...EMPTY_HEAD_TECHNICAL_SPECS,
      ...localeData,
      colours: Array.isArray(localeData.colours) ? localeData.colours : [],
      additional_features: Array.isArray(localeData.additional_features) ? localeData.additional_features : [],
    };
  };

  return {
    en: normaliseLocale(source.en),
    it: normaliseLocale(source.it),
  };
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
