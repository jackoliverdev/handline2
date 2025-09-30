## Hearing – Comfort features, Safety features, Other details, and Equipment (plan)

### Executive summary
- Add three dedicated, localised bullet list sections for Hearing products in the Features tab: "Comfort & fit features", "Other details", and "Equipment".
- Website: In the Features tab, render these sections in order: Comfort features, Safety features (renamed from existing features), Other details, Equipment.
- Admin: Extend Hearing → Safety & Specs tab with bilingual list editors for all three new sections.
- Data: Store in JSONB columns with EN/IT locales, mirroring the Head and Eye & Face implementation patterns.

---

### Data model (DB)
Add three flexible JSONB columns and GIN indexes.

```sql
-- Add Hearing comfort features, other details, and equipment locale columns
alter table public.products
  add column if not exists hearing_comfort_features_locales jsonb not null default '{}'::jsonb,
  add column if not exists hearing_other_details_locales jsonb not null default '{}'::jsonb,
  add column if not exists hearing_equipment_locales jsonb not null default '{}'::jsonb;

-- GIN indexes for future containment queries
create index if not exists products_hearing_comfort_features_gin
  on public.products using gin (hearing_comfort_features_locales);
create index if not exists products_hearing_other_details_gin
  on public.products using gin (hearing_other_details_locales);
create index if not exists products_hearing_equipment_gin
  on public.products using gin (hearing_equipment_locales);
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
  hearing_comfort_features_locales?: Record<string, string[]> | null;
  hearing_other_details_locales?: Record<string, string[]> | null;
  hearing_equipment_locales?: Record<string, string[]> | null;
}
```

No API changes are required beyond passing these fields through create/update payloads.

---

### Website – rendering changes
Create three new components mirroring the Head and Eye & Face pattern:

1) `components/website/products/slug/HearingComfortFeatures.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";
import type { Product } from "@/lib/products-service";
import { ListChecks } from "lucide-react";

export function HearingComfortFeatures({ product }: { product: Product }) {
  const { t, language } = useLanguage();

  const items = (product as any)?.hearing_comfort_features_locales?.[language]
    || (product as any)?.hearing_comfort_features_locales?.en
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

2) `components/website/products/slug/HearingOtherDetails.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";
import type { Product } from "@/lib/products-service";
import { Info } from "lucide-react";

export function HearingOtherDetails({ product }: { product: Product }) {
  const { t, language } = useLanguage();

  const items = (product as any)?.hearing_other_details_locales?.[language]
    || (product as any)?.hearing_other_details_locales?.en
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

3) `components/website/products/slug/HearingEquipment.tsx`

```tsx
"use client";

import { useLanguage } from "@/lib/context/language-context";
import type { Product } from "@/lib/products-service";
import { Settings } from "lucide-react";

export function HearingEquipment({ product }: { product: Product }) {
  const { t, language } = useLanguage();

  const items = (product as any)?.hearing_equipment_locales?.[language]
    || (product as any)?.hearing_equipment_locales?.en
    || [];

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.equipment')}</h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {items.map((equipment: string, idx: number) => (
          <li key={idx}>{equipment}</li>
        ))}
      </ul>
    </div>
  );
}
```

4) Inject into `ProductDetail.tsx` – Features tab:

Add imports:
```tsx
import { HearingComfortFeatures } from "@/components/website/products/slug/HearingComfortFeatures";
import { HearingOtherDetails } from "@/components/website/products/slug/HearingOtherDetails";
import { HearingEquipment } from "@/components/website/products/slug/HearingEquipment";
```

Update the Features tab content to include hearing products:
```tsx
<TabsContent value="features" className="mt-0">
  <div className="space-y-4">
    {/* Comfort & fit features: Eye & Face, Head, Footwear, Hearing */}
    {isEyeFace && (<EyeFaceComfortFeatures product={product} />)}
    {((product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol')) && (
      <FootwearComfortFeatures product={product} />
    )}
    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
      <HeadComfortFeatures product={product} />
    )}
    {((product.category || '').toLowerCase().includes('hearing') || (product.sub_category || '').toLowerCase().includes('ear plug') || (product.sub_category || '').toLowerCase().includes('defender')) && (
      <HearingComfortFeatures product={product} />
    )}

    {/* Equipment blocks */}
    {isEyeFace && (
      <EyeFaceEquipment product={product} />
    )}
    {((product.category || '').toLowerCase().includes('hearing') || (product.sub_category || '').toLowerCase().includes('ear plug') || (product.sub_category || '').toLowerCase().includes('defender')) && (
      <HearingEquipment product={product} />
    )}

    {/* Features list - rename to "Safety features" for Eye & Face, Head, and Hearing */}
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <h3 className="font-medium text-brand-dark dark:text-white mb-2">
        {(isEyeFace || 
          ((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) ||
          ((product.category || '').toLowerCase().includes('hearing') || (product.sub_category || '').toLowerCase().includes('ear plug') || (product.sub_category || '').toLowerCase().includes('defender'))
        ) ? t('productPage.safetyFeatures') : t('productPage.features')}
      </h3>
      {/* existing features rendering logic */}
    </div>

    {/* Other details blocks - after Safety features */}
    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
      <HeadOtherDetails product={product} />
    )}
    {((product.category || '').toLowerCase().includes('hearing') || (product.sub_category || '').toLowerCase().includes('ear plug') || (product.sub_category || '').toLowerCase().includes('defender')) && (
      <HearingOtherDetails product={product} />
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

1) State (add to both files):

```ts
const [hearingComfortFeatures, setHearingComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
const [hearingOtherDetails, setHearingOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
const [hearingEquipment, setHearingEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
```

2) Load/Prefill (Edit only) - add to `CategoryProductEdit.tsx`:

```ts
setHearingComfortFeatures((product as any).hearing_comfort_features_locales || { en: [], it: [] });
setHearingOtherDetails((product as any).hearing_other_details_locales || { en: [], it: [] });
setHearingEquipment((product as any).hearing_equipment_locales || { en: [], it: [] });
```

3) Safety & Specs tab → Hearing section (add to both files):

Find the hearing section in the Safety & Specs tab and add the list editors:

```tsx
{slug === 'hearing' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-3">
      <Label className="font-medium">Standards</Label>
      {/* existing hearing standards fields */}
    </div>
    <div className="md:col-span-2">
      <LocaleListEditor 
        title="Comfort features" 
        items={hearingComfortFeatures[language]} 
        onAdd={(val) => setHearingComfortFeatures({ ...hearingComfortFeatures, [language]: [...(hearingComfortFeatures[language] || []), val] })} 
        onRemove={(idx) => setHearingComfortFeatures({ ...hearingComfortFeatures, [language]: (hearingComfortFeatures[language] || []).filter((_, i) => i !== idx) })} 
      />
      <LocaleListEditor 
        title="Other details" 
        items={hearingOtherDetails[language]} 
        onAdd={(val) => setHearingOtherDetails({ ...hearingOtherDetails, [language]: [...(hearingOtherDetails[language] || []), val] })} 
        onRemove={(idx) => setHearingOtherDetails({ ...hearingOtherDetails, [language]: (hearingOtherDetails[language] || []).filter((_, i) => i !== idx) })} 
      />
      <LocaleListEditor 
        title="Equipment" 
        items={hearingEquipment[language]} 
        onAdd={(val) => setHearingEquipment({ ...hearingEquipment, [language]: [...(hearingEquipment[language] || []), val] })} 
        onRemove={(idx) => setHearingEquipment({ ...hearingEquipment, [language]: (hearingEquipment[language] || []).filter((_, i) => i !== idx) })} 
      />
    </div>
  </div>
)}
```

4) Save payloads:

**CategoryProductCreate.tsx** - add to the payload object:
```ts
hearing_comfort_features_locales: slug === 'hearing' ? hearingComfortFeatures : undefined,
hearing_other_details_locales: slug === 'hearing' ? hearingOtherDetails : undefined,
hearing_equipment_locales: slug === 'hearing' ? hearingEquipment : undefined,
```

**CategoryProductEdit.tsx** - add to the payload object:
```ts
hearing_comfort_features_locales: hearingComfortFeatures,
hearing_other_details_locales: hearingOtherDetails,
hearing_equipment_locales: hearingEquipment,
```

---

### i18n (EN/IT)
Ensure the following keys exist under `productPage` in both `lib/translations/en.json` and `lib/translations/it.json`:

**Already exist (verify presence):**
```json
// en.json
"comfortFeatures": "Comfort & fit features",
"safetyFeatures": "Safety features",
"otherDetails": "Other details",
"equipment": "Equipment"

// it.json
"comfortFeatures": "Comfort e vestibilità", 
"safetyFeatures": "Caratteristiche di sicurezza",
"otherDetails": "Altri dettagli",
"equipment": "Attrezzatura"
```

No new translation keys are required as these already exist from Head and Eye & Face implementations.

---

### Acceptance checklist
1) **DB columns exist** and are indexed correctly.
2) **Website**: Hearing products show the four sections in correct order: Comfort features, Safety features (renamed), Other details, Equipment. Other categories remain unaffected.
3) **Admin Create/Edit**: Hearing → Safety & Specs supports adding/removing EN/IT lines for all three new sections, persists correctly, and reloads on edit.
4) **Language support**: Language toggle switches content; EN fallback when IT is empty.
5) **Visual consistency**: Dark mode and responsive layouts match existing card/list styling from Head and Eye & Face components.
6) **Type safety**: Product interface extended with new fields; no TypeScript errors.

---

### Rollout
1) **Apply SQL migration** in production to add the three new JSONB columns and indexes.
2) **Deploy admin changes** first to allow content creation.
3) **Deploy website changes** to render the new sections.
4) **Test end-to-end**: Create/edit hearing products in admin, verify display on website in both languages.

---

### Implementation order
1) Run SQL migration
2) Extend Product interface in `lib/products-service.ts`
3) Create the three new component files
4) Update `ProductDetail.tsx` imports and Features tab logic
5) Update admin Create/Edit forms with state, loaders, and LocaleListEditor components
6) Update save payloads in both admin files
7) Test in both English and Italian
