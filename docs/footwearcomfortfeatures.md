## Safety Footwear – Comfort Features Extension (plan)

### Executive summary
- Add a dedicated, localised bullet list for “Comfort & fit features” on Safety Footwear products (max ~4 bullets shown on the website).
- Website: render a compact `FootwearComfortFeatures` block above the existing Features list on the Features tab, but only for Safety Footwear. Rename the default “Features” card to “Safety features” for footwear (consistent with Eye & Face and Head).
- Admin: add a bilingual list-editor under the Safety & Specs tab for Footwear, mirroring existing list-editor UX.
- Data: store in a new JSONB column on `public.products` with the same locales shape used elsewhere `{ en: string[], it: string[] }`.

---

### Current state (audit)
- Product detail Features tab already conditionally labels some categories as “Safety features”. We will extend the condition to include Footwear, and inject a footwear-only Comfort block above it.
- Admin Create/Edit already has category-specific sections; we will add a Footwear block with a `LocaleListEditor` for this list.
- Data/contracts: `lib/products-service.ts` defines the `Product` type and is a pass-through to Supabase.

---

### Requirements
1) Add a new localised list for Footwear comfort features:
   - JSON shape: `{ en: string[], it: string[] }`.
   - Column name: `footwear_comfort_features_locales`.
2) Website display:
   - New component `components/website/products/slug/FootwearComfortFeatures.tsx` renders above the existing Features list within the Features tab, only for Safety Footwear products (category includes "footwear" or sub-category includes "boot"/"insol").
   - Uses current UI language; falls back to EN when the current language has no entries.
   - Show up to 4 bullets by default (design intent), but render all if provided.
3) Features tab wording:
   - In `components/website/products/slug/ProductDetail.tsx`, extend the existing condition to label the default card as `t('productPage.safetyFeatures')` for footwear too (currently used for Eye & Face and Head).
4) Admin authoring (Create/Edit):
   - Add a bilingual `LocaleListEditor` under the Footwear section in the Safety & Specs tab.
   - Persist to Supabase using the new column.

---

### Data model (DB) – additions
Add one JSONB column on `public.products` to store localised comfort features for Safety Footwear products and an optional GIN index.

```sql
-- 1) Add Safety Footwear comfort features locales column
alter table public.products
  add column if not exists footwear_comfort_features_locales jsonb not null default '{}'::jsonb;

-- Optional GIN index to support future containment queries
create index if not exists products_footwear_comfort_features_gin
  on public.products using gin (footwear_comfort_features_locales);
```

---

### Type changes
Update `lib/products-service.ts` to expose the new field.

```ts
// In Product interface
footwear_comfort_features_locales?: Record<string, string[]> | null;
```

Optionally extend any helper that localises product fields, e.g.:

```ts
// comfortFeatures: product.footwear_comfort_features_locales?.[language]
//               || product.footwear_comfort_features_locales?.en || []
```

---

### Website rendering changes
1) Create new component: `components/website/products/slug/FootwearComfortFeatures.tsx`

```tsx
import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

export function FootwearComfortFeatures({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const items = (product as any).footwear_comfort_features_locales?.[language]
    || (product as any).footwear_comfort_features_locales?.en || [];
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

2) Inject into product detail (Features tab):
   - File: `components/website/products/slug/ProductDetail.tsx`
   - In `<TabsContent value="features">`, above the existing generic Features card, conditionally render `<FootwearComfortFeatures product={product} />` when the product is Safety Footwear (category includes "footwear" or sub-category includes "boot"/"insol").
   - Update the Features card title condition to include footwear so it reads `t('productPage.safetyFeatures')` for footwear as well.

---

### Admin – product management changes
Files: `components/admins/prodmanagement/CategoryProductCreate.tsx` and `components/admins/prodmanagement/CategoryProductEdit.tsx`.

1) State
```ts
const [footwearComfortFeatures, setFootwearComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
```

2) Load/Prefill (Edit only)
```ts
setFootwearComfortFeatures((product as any).footwear_comfort_features_locales || { en: [], it: [] });
```

3) Safety & Specs tab (within Footwear block)
```tsx
<LocaleListEditor
  title="Comfort features"
  items={footwearComfortFeatures[language]}
  onAdd={(val)=> setFootwearComfortFeatures({ ...footwearComfortFeatures, [language]: [...footwearComfortFeatures[language], val] })}
  onRemove={(idx)=> setFootwearComfortFeatures({ ...footwearComfortFeatures, [language]: footwearComfortFeatures[language].filter((_,i)=> i!==idx) })}
/>
```

4) Save payloads
```ts
// Create: include only for Footwear section
footwear_comfort_features_locales: slug==='footwear' ? footwearComfortFeatures : undefined,

// Edit: always include (the section is visible only for Footwear pages)
footwear_comfort_features_locales: footwearComfortFeatures,
```

---

### i18n changes
Use existing keys in both `lib/translations/{en,it}.json` under `productPage`:
- `comfortFeatures` (already present from Eye & Face work)
- `safetyFeatures` (already present)

If they were missing in IT, add:

```json
// en.json
"comfortFeatures": "Comfort & fit features",

// it.json
"comfortFeatures": "Comfort e vestibilità"
```

---

### Acceptance checklist
1) DB migration applied; new column visible, default `{}` and accepts `en`/`it` arrays.
2) Admin (Create/Edit): can add/remove Footwear comfort features per language, persist, and reload correctly.
3) Product detail: Footwear products render the `FootwearComfortFeatures` block above “Safety features”; other categories unaffected.
4) Features tab title reads “Safety features” for footwear products.
5) Language toggle switches content correctly; EN fallback when the current language list is empty.
6) Responsive, accessible, dark-mode compatible; consistent with site card/list styling.

---

### Rollout & rollback
- Rollout: apply SQL migration first, deploy admin changes, then website changes. Safe to ship incrementally; absent data simply hides the block.
- Rollback: remove the component render and admin controls; column can remain unused or be dropped via:

```sql
alter table public.products drop column if exists footwear_comfort_features_locales;
drop index if exists products_footwear_comfort_features_gin;
```


