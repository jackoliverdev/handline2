export type ClothingTypeKey = 'welding' | 'high-visibility' | 'safety-workwear';

export const CLOTHING_TYPE_TO_CATEGORIES: Record<ClothingTypeKey, string[]> = {
  'welding': [
    'Welding Aprons',
    'Welding Jackets',
    'Welding Coveralls',
    'Welding Trousers',
    'Accessories'
  ],
  'high-visibility': [
    'Hi-Vis Jackets',
    'Hi-Vis Trousers',
    'Hi-Vis Waistcoats',
    'Hi-Vis body warmers',
    'Hi-Vis Coveralls',
    'Hi-Vis Fleeces and sweatshirts',
    'Hi-Vis Polo and T-shirts',
    'Hi-Vis accessories'
  ],
  'safety-workwear': [
    'Safety Jackets',
    'Safety Trousers',
    'Other safety clothing',
    'Work Jackets',
    'Work Trousers',
    'Work Suits',
    'Work Aprons',
    'Other workwear'
  ]
};

// Simplified garment types for filtering
export const GARMENT_TYPES = [
  'Aprons',
  'Jackets',
  'Coveralls',
  'Trousers',
  'Waistcoats',
  'Body warmers',
  'Fleece & Sweatshirts',
  'Polo & T-shirts',
  'Other workwear',
  'Accessories'
] as const;


