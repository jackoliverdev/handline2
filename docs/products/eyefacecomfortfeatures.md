## Eye & Face – Comfort Features Extension (plan)

### Executive summary
- Introduce a dedicated, localised bullet-list for “Comfort & fit features” on Eye & Face products.
- Website: render a compact `EyeFaceComfortFeatures` block above the existing generic Features list, but only for Eye & Face products.
- Admin: add a bilingual bullet-list editor under the Safety & Specs tab for Eye & Face, matching existing list-editor UX.
- Data: store in a new JSONB column on `public.products` with the same locales shape used across the site `{ en: string[], it: string[] }`.

---

### Current state (audit)
- Frontend product specs:
  - `components/website/products/slug/EyeFaceSpecs.tsx` shows materials, EN 166 attributes, and protection chips.
  - `components/website/products/slug/ProductDetail.tsx` Features tab renders the generic features list from `features_locales`.
- Admin product management:
  - `components/admins/prodmanagement/CategoryProductCreate.tsx` and `.../CategoryProductEdit.tsx` provide `LocaleListEditor` controls for features/applications/industries/materials, plus category-specific Safety & Specs blocks.
- Data/contracts:
  - `lib/products-service.ts` defines `Product` and utilities. No dedicated field for Eye & Face “comfort features”.
  - API layer posts/updates directly to Supabase; adding a column + payload passthrough is sufficient.

---

### Requirements
1) Add a new localised list for Eye & Face comfort features:
   - JSON shape: `{ en: string[], it: string[] }`.
   - Column name: `eye_face_comfort_features_locales` (scoped to category to avoid ambiguity).
2) Website display:
   - New component `EyeFaceComfortFeatures` renders above the existing Features list within the Features tab, only for Eye & Face products.
   - Uses current UI language; falls back to EN when the current language has no entries.
3) Admin authoring:
   - In Safety & Specs tab (Eye & Face section), add `LocaleListEditor` for Comfort features (same UX as Features/Applications), switching with the admin language toggle.
4) i18n:
   - Add translation key for the label in EN/IT.
5) Performance/UX:
   - Mobile/desktop responsive; dark-mode compatible; consistent with card/list styling across product detail.

---

### Data model (DB) – additions
Add one JSONB column on `public.products` to store localised comfort features for Eye & Face products.

```sql
-- 1) Add Eye & Face comfort features locales column
alter table public.products
  add column if not exists eye_face_comfort_features_locales jsonb not null default '{}'::jsonb;

-- Optional GIN index to support future containment queries
create index if not exists products_ef_comfort_features_gin
  on public.products using gin (eye_face_comfort_features_locales);
```

Optional backfill helper (if you want to seed from existing features for testing):

```sql
update public.products
set eye_face_comfort_features_locales = jsonb_build_object(
  'en', coalesce((features_locales->'en')::jsonb, '[]'::jsonb),
  'it', coalesce((features_locales->'it')::jsonb, '[]'::jsonb)
)
where lower(category) like '%eye%' or lower(category) like '%face%';
```

---

### Type changes
Update `lib/products-service.ts` to expose the new field.

```ts
// In Product interface
eye_face_comfort_features_locales?: Record<string, string[]> | null;

// Optionally extend localiseProduct if you prefer a derived field:
// comfortFeatures: product.eye_face_comfort_features_locales?.[language]
//                 || product.eye_face_comfort_features_locales?.en || []
```

Note: The API functions are passthrough to Supabase and will include this field once present in payloads.

---

### Website rendering changes
1) Create new component: `components/website/products/slug/EyeFaceComfortFeatures.tsx`
   - Props: `{ product: Product }`
   - Use `useLanguage()` to select the current language.
   - Compute `items = product.eye_face_comfort_features_locales?.[language]
                || product.eye_face_comfort_features_locales?.en || []`.
   - If `items.length === 0`, render nothing.
   - Styling: one card with title from `t('productPage.comfortFeatures')` and a compact bullet list. Match the card pattern used in product detail Features.

```tsx
// Pseudocode outline
export function EyeFaceComfortFeatures({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const items = product.eye_face_comfort_features_locales?.[language]
    || product.eye_face_comfort_features_locales?.en || [];
  if (!Array.isArray(items) || items.length === 0) return null;
  return (<div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
    <h3 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.comfortFeatures')}</h3>
    <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  </div>);
}
```

2) Inject into product detail:
   - File: `components/website/products/slug/ProductDetail.tsx`
   - In `<TabsContent value="features">`, above the existing generic Features card, conditionally render `EyeFaceComfortFeatures` when the product is Eye & Face (same category detection used for specs).
   - Ensure import and no-op for other categories.

---

### Admin – product management changes
Files: `components/admins/prodmanagement/CategoryProductCreate.tsx` and `.../CategoryProductEdit.tsx`.

1) State
```ts
// New state mirroring other locales lists
const [eyeFaceComfortFeatures, setEyeFaceComfortFeatures] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
```

2) Load/Prefill (Edit only)
```ts
setEyeFaceComfortFeatures((product as any).eye_face_comfort_features_locales || { en: [], it: [] });
```

3) Safety & Specs tab (within Eye & Face block)
```tsx
<LocaleListEditor
  title="Comfort features"
  items={eyeFaceComfortFeatures[language]}
  onAdd={(val)=> setEyeFaceComfortFeatures({ ...eyeFaceComfortFeatures, [language]: [...eyeFaceComfortFeatures[language], val] })}
  onRemove={(idx)=> setEyeFaceComfortFeatures({ ...eyeFaceComfortFeatures, [language]: eyeFaceComfortFeatures[language].filter((_,i)=> i!==idx) })}
/>
```

4) Save payloads
```ts
// Create: include only for Eye & Face
eye_face_comfort_features_locales: slug==='eye-face' ? eyeFaceComfortFeatures : undefined,

// Edit: always include (the section is visible only for Eye & Face pages)
eye_face_comfort_features_locales: eyeFaceComfortFeatures,
```

---

### i18n changes
Add keys in both `lib/translations/en.json` and `lib/translations/it.json` under `productPage`:

```json
// en.json
"comfortFeatures": "Comfort & fit features"

// it.json
"comfortFeatures": "Comfort e vestibilità"
```

Optionally, add an admin-only label is not necessary since the admin UI uses plain labels.

---

### Acceptance checklist
1) DB migration applied; new column visible, default `{}` and accepts `en`/`it` arrays.
2) Admin (Create/Edit): can add/remove Eye & Face comfort features per language, persist, and reload correctly.
3) Product detail: Eye & Face products render the `EyeFaceComfortFeatures` block above the generic Features list; other categories unaffected.
4) Language toggle switches content correctly; EN fallback when the current language list is empty.
5) Responsive, accessible, dark-mode compatible; consistent with brand styling and card patterns.

---

### Rollout & rollback
- Rollout: apply SQL migration first, deploy admin changes, then website changes. Safe to ship incrementally; absent data simply hides the block.
- Rollback: remove the component render and admin controls; column can remain unused or be dropped via:

```sql
alter table public.products drop column if exists eye_face_comfort_features_locales;
drop index if exists products_ef_comfort_features_gin;
```

---

### Notes & future enhancements
- Consider extending to Head/Hearing categories later using the same pattern if comfort features are relevant.
- Add search/filter support in the future by extracting common comfort keywords (e.g., “anti-fog”, “foam padding”, “wide strap”).

---

### ____extension____: Eye & Face – Equipment Section

Goal: Add an Equipment bullet list (localised) to the Features tab for Eye & Face products, rendered as a separate card just like the comfort list.

#### Data model (DB)

```sql
alter table public.products
  add column if not exists eye_face_equipment_locales jsonb not null default '{}'::jsonb;

create index if not exists products_ef_equipment_gin
  on public.products using gin (eye_face_equipment_locales);
```

Shape: `{ en: string[], it: string[] }`.

#### Types
In `lib/products-service.ts` add:

```ts
eye_face_equipment_locales?: Record<string, string[]> | null;
```

#### Website
1) Create `components/website/products/slug/EyeFaceEquipment.tsx` – same structure/styling as Comfort block, label `t('productPage.equipment')`.
2) Inject above the “Safety features” card in the Features tab for Eye & Face only, order:
   - Comfort & fit features
   - Equipment
   - Safety features

#### Admin (Create/Edit)
1) Add state `{ en: string[]; it: string[] }`.
2) Under Eye & Face in Safety & Specs, add `LocaleListEditor title="Equipment"` (bilingual via admin language switch).
3) Include `eye_face_equipment_locales` in create/update payloads and load from product in Edit.

#### i18n
Add to `productPage`:

```json
// en.json
"equipment": "Equipment"

// it.json
"equipment": "Attrezzatura"
```

#### Acceptance
- DB column created; admin can add/remove per language; website renders the list for Eye & Face products above safety features; other categories unchanged.


