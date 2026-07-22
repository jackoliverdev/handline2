## Head – Comfort & fit features (plan)

### Executive summary
- Add a dedicated, localised bullet list for “Comfort & fit features” on Head products (helmets and bump caps).
- Website: in the Features tab, render a compact Comfort & fit card above the existing features list. For Head products, rename the existing features list heading to “Safety features”.
- Admin: extend Head → Safety & Specs tab with a bilingual list editor for these comfort items.
- Data: store in a JSONB column with EN/IT locales, mirroring the Eye & Face implementation.

---

### Data model (DB)
Add one flexible JSONB column and a GIN index.

```sql
-- 1) Add Head comfort features locales column
alter table public.products
  add column if not exists head_comfort_features_locales jsonb not null default '{}'::jsonb;

-- 2) Optional GIN index (useful for future containment queries)
create index if not exists products_head_comfort_features_gin
  on public.products using gin (head_comfort_features_locales);

-- 3) Optional backfill helper (seed from existing features lists for testing)
update public.products p
set head_comfort_features_locales = jsonb_build_object(
  'en', coalesce((p.features_locales -> 'en')::jsonb, '[]'::jsonb),
  'it', coalesce((p.features_locales -> 'it')::jsonb, '[]'::jsonb)
)
where lower(coalesce(p.category,'')) like '%head%'
   or lower(coalesce(p.sub_category,'')) like '%helmet%'
   or lower(coalesce(p.sub_category,'')) like '%bump%';
```

Shape stored in the column:

```json
{
  "en": ["Comfort item 1", "Comfort item 2"],
  "it": ["Voce comfort 1", "Voce comfort 2"]
}
```

---

### Types (frontend)
Extend the product contract.

```ts
// lib/products-service.ts
export interface Product {
  // ...existing fields
  head_comfort_features_locales?: Record<string, string[]> | null;
}
```

No API changes are required beyond passing this field through create/update payloads.

---

### Website – rendering changes
1) Create component `components/website/products/slug/HeadComfortFeatures.tsx` (clone of EyeFaceComfortFeatures).

Pseudocode outline:

```tsx
import { useLanguage } from '@/lib/context/language-context';
import { Product } from '@/lib/products-service';

export function HeadComfortFeatures({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const items = (product.head_comfort_features_locales as any)?.[language]
    || (product.head_comfort_features_locales as any)?.en || [];
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <h3 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.comfortFeatures')}</h3>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {items.map((it: string, i: number) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}
```

2) Inject into `components/website/products/slug/ProductDetail.tsx` – Features tab:
- Detect Head products (same predicate used elsewhere for Head).
- Render `<HeadComfortFeatures product={product} />` above the generic features card.
- Rename the existing features card title to “Safety features” when `isHead === true` (the Eye & Face path already switches to `safetyFeatures`; extend the condition to include Head).

Resulting order for Head:
- Comfort & fit features
- Safety features (existing `features_locales` rendering)

Other categories remain unchanged.

---

### Admin – create/edit changes
Files: `components/admins/prodmanagement/CategoryProductCreate.tsx` and `components/admins/prodmanagement/CategoryProductEdit.tsx`.

1) State

```ts
const [headComfortFeatures, setHeadComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
```

2) Load/Prefill (Edit only)

```ts
setHeadComfortFeatures((product as any).head_comfort_features_locales || { en: [], it: [] });
```

3) Safety & Specs tab → Head section (desktop + mobile parity)

```tsx
<LocaleListEditor
  title={t ? t('productPage.comfortFeatures') : 'Comfort & fit features'}
  items={headComfortFeatures[language]}
  onAdd={(val) => setHeadComfortFeatures({ ...headComfortFeatures, [language]: [...headComfortFeatures[language], val] })}
  onRemove={(idx) => setHeadComfortFeatures({ ...headComfortFeatures, [language]: headComfortFeatures[language].filter((_, i) => i !== idx) })}
/>
```

4) Save payloads

```ts
// Create: include when the selected category is Head
head_comfort_features_locales: slug === 'head' ? headComfortFeatures : undefined,

// Edit: include unconditionally (the editor is visible only on Head products)
head_comfort_features_locales: headComfortFeatures,
```

---

### i18n (EN/IT)
Ensure the following keys exist under `productPage` (already introduced for Eye & Face; add if missing):

```json
// en.json
"comfortFeatures": "Comfort & fit features",
"safetyFeatures": "Safety features"

// it.json
"comfortFeatures": "Comfort e vestibilità",
"safetyFeatures": "Caratteristiche di sicurezza"
```

No other label changes are required.

---

### Acceptance checklist
1) DB column exists and is populated (optionally via backfill) for selected products.
2) Website Head products show the Comfort & fit card above Safety features; other categories unaffected.
3) Admin Create/Edit (Head → Safety & Specs) supports adding/removing EN/IT comfort lines, persists, and reloads correctly.
4) Language toggle switches content; EN fallback when IT is empty.
5) Dark mode and responsive layouts are consistent with the existing card/list styling.

---

### Rollout
1) Apply SQL migration in production.
2) Deploy admin changes, then website changes.
3) Optionally run the backfill to seed initial content; edit per‑product via Admin thereafter.


