## Clothing – Comfort features and Other details (plan)

### Executive summary
- Add two dedicated, localised bullet list sections for Clothing products in the Features tab: "Comfort features" and "Other details".
- Website: In the Features tab, render these sections in order: Comfort features, Safety features (renamed from existing features), Other details.
- Admin: Extend Clothing → Safety & Specs tab with bilingual list editors for both new sections.
- Data: Store in JSONB columns with EN/IT locales, mirroring the Head, Eye & Face, Hearing, and Respiratory implementation patterns.
- Note: Unlike other categories, Clothing does NOT need an Equipment section.

---

### Data model (DB)
Add two flexible JSONB columns and GIN indexes.

```sql
-- Add Clothing comfort features and other details locale columns
alter table public.products
  add column if not exists clothing_comfort_features_locales jsonb not null default '{}'::jsonb,
  add column if not exists clothing_other_details_locales jsonb not null default '{}'::jsonb;

-- GIN indexes for future containment queries
create index if not exists products_clothing_comfort_features_gin
  on public.products using gin (clothing_comfort_features_locales);
create index if not exists products_clothing_other_details_gin
  on public.products using gin (clothing_other_details_locales);
```

Shape stored in each column:

```json
{
  "en": ["Feature item 1", "Feature item 2"],
  "it": ["Voce caratteristica 1", "Voce caratteristica 2"]
}
```

---

### Types (frontend)
Extend the product contract in `lib/products-service.ts`:

```ts
// lib/products-service.ts
export interface Product {
  // ...existing fields
  clothing_comfort_features_locales?: Record<string, string[]> | null;
  clothing_other_details_locales?: Record<string, string[]> | null;
}
```

No API changes are required beyond passing these fields through create/update payloads.

---

### Website – rendering changes
Create two new components mirroring the Head, Eye & Face, Hearing, and Respiratory pattern:

1) `components/website/products/slug/ClothingComfortFeatures.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";
import type { Product } from "@/lib/products-service";
import { ListChecks } from "lucide-react";

export function ClothingComfortFeatures({ product }: { product: Product }) {
  const { t, language } = useLanguage();

  const items = (product as any)?.clothing_comfort_features_locales?.[language]
    || (product as any)?.clothing_comfort_features_locales?.en
    || [];

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <ListChecks className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.comfortFeatures')}</h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {items.map((feature: string, idx: number) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
```

2) `components/website/products/slug/ClothingOtherDetails.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";
import type { Product } from "@/lib/products-service";
import { Info } from "lucide-react";

export function ClothingOtherDetails({ product }: { product: Product }) {
  const { t, language } = useLanguage();

  const items = (product as any)?.clothing_other_details_locales?.[language]
    || (product as any)?.clothing_other_details_locales?.en
    || [];

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.otherDetails')}</h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {items.map((detail: string, idx: number) => (
          <li key={idx}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
```

3) Define clothing product detection in `ProductDetail.tsx`:

Add variable definition (around line 198):
```tsx
const isClothing = ((product.category || '').toLowerCase().includes('cloth') || (product.sub_category || '').toLowerCase().includes('jacket'));
```

4) Add imports to `ProductDetail.tsx`:

```tsx
import { ClothingComfortFeatures } from "@/components/website/products/slug/ClothingComfortFeatures";
import { ClothingOtherDetails } from "@/components/website/products/slug/ClothingOtherDetails";
```

5) Update the Features tab content to include clothing products:

```tsx
<TabsContent value="features" className="mt-0">
  <div className="space-y-4">
    {/* Comfort & fit features: Eye & Face, Head, Footwear, Hearing, Respiratory, Clothing */}
    {isEyeFace && (<EyeFaceComfortFeatures product={product} />)}
    {((product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol')) && (
      <FootwearComfortFeatures product={product} />
    )}
    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
      <HeadComfortFeatures product={product} />
    )}
    {isHearing && (
      <HearingComfortFeatures product={product} />
    )}
    {isRespiratory && (
      <RespiratoryComfortFeatures product={product} />
    )}
    {isClothing && (
      <ClothingComfortFeatures product={product} />
    )}

    {/* Equipment blocks */}
    {isEyeFace && (
      <EyeFaceEquipment product={product} />
    )}
    {isHearing && (
      <HearingEquipment product={product} />
    )}
    {isRespiratory && (
      <RespiratoryEquipment product={product} />
    )}

    {/* Features list - rename to "Safety features" for Eye & Face, Head, Hearing, Respiratory, and Clothing */}
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <ListChecks className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">
          {(isEyeFace ||
            ((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) ||
            isHearing ||
            isRespiratory ||
            isClothing ||
            ((product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol'))
          ) ? t('productPage.safetyFeatures') : t('productPage.features')}
        </h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {currentFeatures && currentFeatures.length > 0 ? (
          currentFeatures.map((feature: string, idx: number) => (
            <li key={idx}>{feature}</li>
          ))
        ) : (
          <li>-</li>
        )}
      </ul>
    </div>

    {/* Other details blocks - after Safety features */}
    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
      <HeadOtherDetails product={product} />
    )}
    {isHearing && (
      <HearingOtherDetails product={product} />
    )}
    {isRespiratory && (
      <RespiratoryOtherDetails product={product} />
    )}
    {isClothing && (
      <ClothingOtherDetails product={product} />
    )}

    {/* Equipment blocks - last */}
    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
      <HeadEquipment product={product} />
    )}
  </div>
</TabsContent>
```

---

### Admin – create/edit changes
Files: `components/admins/prodmanagement/CategoryProductCreate.tsx` and `components/admins/prodmanagement/CategoryProductEdit.tsx`.

**Note**: Based on the current admin form structure, clothing products don't have a dedicated section yet. We need to add a clothing section to the Safety & Specs tab.

1) State (add to both files):

```ts
const [clothingComfortFeatures, setClothingComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
const [clothingOtherDetails, setClothingOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
```

2) Load/Prefill (Edit only) - add to `CategoryProductEdit.tsx`:

```ts
setClothingComfortFeatures((product as any).clothing_comfort_features_locales || { en: [], it: [] });
setClothingOtherDetails((product as any).clothing_other_details_locales || { en: [], it: [] });
```

3) Safety & Specs tab → Add Clothing section (add to both files):

Add after the existing category sections (around line 525 in CategoryProductCreate.tsx):

```tsx
{slug === 'clothing' && (
  <div className="space-y-6">
    <div className="space-y-3">
      <LocaleListEditor
        title="Comfort features"
        items={clothingComfortFeatures[language]}
        onAdd={(val) => setClothingComfortFeatures({ ...clothingComfortFeatures, [language]: [...(clothingComfortFeatures[language] || []), val] })}
        onRemove={(idx) => setClothingComfortFeatures({ ...clothingComfortFeatures, [language]: (clothingComfortFeatures[language] || []).filter((_, i) => i !== idx) })}
      />
      <LocaleListEditor
        title="Other details"
        items={clothingOtherDetails[language]}
        onAdd={(val) => setClothingOtherDetails({ ...clothingOtherDetails, [language]: [...(clothingOtherDetails[language] || []), val] })}
        onRemove={(idx) => setClothingOtherDetails({ ...clothingOtherDetails, [language]: (clothingOtherDetails[language] || []).filter((_, i) => i !== idx) })}
      />
    </div>
  </div>
)}
```

4) Save payloads:

**CategoryProductCreate.tsx** - add to the payload object:
```ts
clothing_comfort_features_locales: slug === 'clothing' ? clothingComfortFeatures : undefined,
clothing_other_details_locales: slug === 'clothing' ? clothingOtherDetails : undefined,
```

**CategoryProductEdit.tsx** - add to the payload object:
```ts
clothing_comfort_features_locales: clothingComfortFeatures,
clothing_other_details_locales: clothingOtherDetails,
```

---

### i18n (EN/IT)
Ensure the following keys exist under `productPage` in both `lib/translations/en.json` and `lib/translations/it.json`:

**Already exist (verify presence):**
```json
// en.json
"comfortFeatures": "Comfort & fit features",
"safetyFeatures": "Safety features",
"otherDetails": "Other details"

// it.json
"comfortFeatures": "Comfort e vestibilità", 
"safetyFeatures": "Caratteristiche di sicurezza",
"otherDetails": "Altri dettagli"
```

No new translation keys are required as these already exist from Head, Eye & Face, Hearing, and Respiratory implementations.

---

### Acceptance checklist
1) **DB columns exist** and are indexed correctly.
2) **Website**: Clothing products show the three sections in correct order: Comfort features, Safety features (renamed), Other details. Other categories remain unaffected.
3) **Admin Create/Edit**: Clothing → Safety & Specs supports adding/removing EN/IT lines for both new sections, persists correctly, and reloads on edit.
4) **Language support**: Language toggle switches content; EN fallback when IT is empty.
5) **Visual consistency**: Dark mode and responsive layouts match existing card/list styling from Head, Eye & Face, Hearing, and Respiratory components.
6) **Type safety**: Product interface extended with new fields; no TypeScript errors.
7) **Safety features title**: Existing features section is renamed to "Safety features" for clothing products.

---

### Rollout
1) **Apply SQL migration** in production to add the two new JSONB columns and indexes.
2) **Deploy admin changes** first to allow content creation.
3) **Deploy website changes** to render the new sections.
4) **Test end-to-end**: Create/edit clothing products in admin, verify display on website in both languages.

---

### Implementation order
1) Run SQL migration
2) Extend Product interface in `lib/products-service.ts`
3) Create the two new component files (`ClothingComfortFeatures.tsx`, `ClothingOtherDetails.tsx`)
4) Update `ProductDetail.tsx` imports, add `isClothing` detection, and update Features tab logic
5) Update admin Create/Edit forms with state, loaders, and LocaleListEditor components for clothing section
6) Update save payloads in both admin files
7) Test in both English and Italian

---

### Key differences from other categories
- **No Equipment section**: Unlike Head, Eye & Face, Hearing, and Respiratory, Clothing products do not need an Equipment section.
- **Simple admin section**: The clothing admin section is simpler, containing only the two LocaleListEditor components without complex standards or attributes.
- **Detection logic**: Uses `cloth` in category or `jacket` in sub_category for detection.
- **Safety features**: The existing features list is renamed to "Safety features" for clothing products, consistent with other protective equipment categories.
