## Protective Clothing – Categories & Sub‑pages Extension (plan)

### Executive summary
- Update the clothing catalogue to mirror the gloves experience: a top “Clothing Categories” grid leading to three sub‑sections and dedicated sub‑pages with pre‑filtered product grids.
- Introduce a `clothing_type` field on products (nullable text) and wire it across admin create/edit, filters (desktop/mobile), and grid predicates.
- Add a reusable `ClothingCategories` component visually aligned with `GlovesCategories`, using provided images and bilingual copy.
- Implement three sub‑routes under `/products/clothing/` with compact headers, category info, and product grids filtered by `clothing_type`.

---

### Current state (audit)
- Public pages
  - `app/(main)/products/clothing/page.tsx` already exists and renders `CategoryInfo` + `ClothingProductsSection` with focused standards filters.
  - There is no clothing categories grid nor sub‑pages comparable to the gloves structure.
- Components
  - Gloves category cards are implemented in `components/website/products/gloves-categories.tsx` and used by `app/(main)/products/gloves/page.tsx`.
  - Product grids and extra filter injection follow `components/website/products/product-grid.tsx` conventions.
- Admin
  - Create/Edit live in `components/admins/prodmanagement/CategoryProductCreate.tsx` and `CategoryProductEdit.tsx` with a Safety & Specs tab for `clothing_standards` and `clothing_attributes`.
  - No field exists for a normalised clothing category; we’ll add `clothing_type`.
- Types/service
  - `lib/products-service.ts` defines `Product` including clothing JSON fields; will be extended with `clothing_type?: string | null` and included in fetch/create/update parsing.

---

### Requirements
1) Add a prominent clothing categories grid with three entries:
   - Welding clothing
   - High‑visibility clothing
   - Safety clothing and Workwear
   Images (from `public/images/clothingcats/`):
   - `High-visibility clothing.jpeg`
   - `Safety clothing and Workwear.jpeg`
   - `Welding clothing.jpeg`
2) Each card links to a sub‑page under `/products/clothing/{slug}` with a compact header, `CategoryInfo`, and a product grid pre‑filtered by `clothing_type`.
3) Admin create/edit: add `clothing_type` dropdown (nullable) in Safety & Specs → Clothing block with fixed options matching the three categories.
4) Filters: add a “Clothing Type” filter to the clothing grid (desktop + mobile) mirroring existing compact filter patterns; also used on All‑products when scoping clothing.
5) Translations: add EN/IT labels for the three category names, the grid title/description, and the filter labels.

---

### Data model (DB) – additions
```sql
begin;

alter table public.products
  add column if not exists clothing_type text null;

-- Optional index for faster filtering on sub‑pages
create index if not exists products_clothing_type_idx on public.products (clothing_type);

commit;
```

Allowed values (UI‑controlled, not constrained at DB level):
- `welding`
- `high-visibility`
- `safety-workwear`

---

### Types/service – additions
File: `lib/products-service.ts`

1) Extend `Product`:
```ts
// Clothing specific
clothing_type?: string | null; // 'welding' | 'high-visibility' | 'safety-workwear'
```

2) Parse/propagate in service functions that map Supabase rows (no special parsing needed, but ensure the field survives round‑trips in `getAllProducts`, `getProductById`, `getProductBySlug`, `createProduct`, `updateProduct`).

3) Optional helper:
```ts
export function isClothing(product: Product): boolean {
  const cat = (product.category || '').toLowerCase();
  const sub = (product.sub_category || '').toLowerCase();
  return cat.includes('clothing') || sub.includes('jacket');
}
```

---

### Website – components & routes

1) Clothing categories grid
File: `components/website/products/ClothingCategories.tsx`
Behaviour and styling match `GlovesCategories`:
- Same tile layout, rounded images, subtle shadow, hover lift, Montserrat headings and Open Sans body.
- Uses brand palette: Primary Orange (#F28C38) for accents, Dark Grey (#1E1E1E) text, Light Beige (#F5EFE0) backgrounds where applicable.
- Entries (localised via `lib/translations/*.json`):
  - title/description and `href` mapping:
    - Welding clothing → `/products/clothing/welding`
    - High‑visibility clothing → `/products/clothing/high-visibility`
    - Safety clothing and Workwear → `/products/clothing/safety-workwear`
  - `imageSrc` paths from `public/images/clothingcats/` as provided.

2) Wire grid on clothing landing
File: `app/(main)/products/clothing/page.tsx`
- Insert `<ClothingCategories />` below `CategoryInfo` and above `ClothingProductsSection`.

3) Sub‑pages
Files:
- `app/(main)/products/clothing/welding/page.tsx`
- `app/(main)/products/clothing/high-visibility/page.tsx`
- `app/(main)/products/clothing/safety-workwear/page.tsx`

Each page:
- Compact hero: reuse `ProductsHero` with `showDescription={false}`.
- `CategoryInfo` with a new `categoryType` key: `clothing-welding` | `clothing-high-visibility` | `clothing-safety-workwear`.
- Product grid: reuse `ClothingProductsSection` but pass an extra predicate to pin `clothing_type` to the page’s type or filter input to preselect it.
- SEO: set title/description accordingly.

4) ClothingProductsSection extension
File: `app/(main)/products/clothing/ClothingProductsSection.tsx`
- Add optional `pinnedClothingType?: 'welding' | 'high-visibility' | 'safety-workwear'` prop.
- Predicate ensures: when `pinnedClothingType` present → only products where `(p.clothing_type || '').toLowerCase() === pinnedClothingType` are displayed.
- When not pinned, show all clothing; the new Clothing Type filter allows narrowing.
- Maintain current focused standards filters; preserve `hideDefaultFilters=true` for speed and clarity.

5) All‑products grid (optional)
File: `components/website/products/AllProductsGrid.tsx`
- When the active high‑level category scope is clothing (same scoping as existing), expose the “Clothing Type” desktop/mobile filters and include the predicate in the combined filter function.

---

### Filters – Clothing Type (desktop + mobile)
Files:
- `components/website/products/filters/clothing/ClothingTypeFilter.tsx`
- `components/website/products/filters/clothing/ClothingTypeFilterMobile.tsx`

Pattern:
- Mirrors control API of other filters: accepts `options`, `selectedTypes: string[]`, `toggleType(type)`, accordions expand/collapse, and uses brand orange for active states.
- Options fixed to `['welding','high-visibility','safety-workwear']` with localised labels.
- Mobile version reuses the sheet/drawer pattern used by other clothing filters.

Integration:
- In `ClothingProductsSection`, render both components and wire into `extraFilterPredicate`.

---

### Admin – create/edit updates
Files:
- `components/admins/prodmanagement/CategoryProductCreate.tsx`
- `components/admins/prodmanagement/CategoryProductEdit.tsx`

Changes (Safety & Specs → Clothing block):
- Add a `Select` labelled “Clothing Type” with placeholder “None”.
- Options:
  - Welding clothing → value `welding`
  - High‑visibility clothing → value `high-visibility`
  - Safety clothing and Workwear → value `safety-workwear`
- Persist to `clothing_type` (nullable) in payloads:
  - Create: include `clothing_type: slug==='clothing' ? (clothingType || null) : undefined`.
  - Edit: include `clothing_type: clothingType || null`.

UX details:
- Place the dropdown at the top of the Clothing block, above standards. Keep spacing consistent with existing label/input stack. Use concise helper text: “Used for clothing category pages and filters.”

---

### Translations (EN/IT)
Files: `lib/translations/en.json`, `lib/translations/it.json`
- Navigation (if needed): `navbar.protectiveClothing` already exists; add sub‑page hero strings if using `CategoryInfo` variants.
- Product categories panel:
  - `products.categories.main.clothing.subcategories.welding.{title,description}`
  - `products.categories.main.clothing.subcategories.highVisibility.{title,description}`
  - `products.categories.main.clothing.subcategories.safetyWorkwear.{title,description}`
- Filters:
  - `products.filters.clothingType.title`
  - Option labels under `products.filters.clothingType.options.{welding,highVisibility,safetyWorkwear}`

Copy guidance: B2B tone, “We speak SAFETY”, “Evolution, not revolution”.

---

### Styling & accessibility
- Match `GlovesCategories` visual style: three cards in a responsive grid, hover lift, rounded corners, subtle shadow. Accent with #F28C38 for focus/active. Headers use Montserrat; supporting text Open Sans.
- Images from `/public/images/clothingcats/` with descriptive `alt` derived from localised titles.
- WCAG: contrast verified on light/dark; focus rings visible; captions concise.
- Performance: lazy‑load images; compress JPEGs; specify `sizes` for responsive loading; ensure Core Web Vitals budgets.

---

### SQL – quick seed/check (optional)
```sql
-- Example: assign clothing_type to existing rows by heuristic
update public.products
set clothing_type = 'high-visibility'
where lower(category) like '%clothing%' and (
  lower(description) like '%high-vis%' or lower(description) like '%hi-vis%'
);
```

---

### File inventory (to create/update)
- Create
  - `components/website/products/ClothingCategories.tsx`
  - `components/website/products/filters/clothing/ClothingTypeFilter.tsx`
  - `components/website/products/filters/clothing/ClothingTypeFilterMobile.tsx`
  - `app/(main)/products/clothing/welding/page.tsx`
  - `app/(main)/products/clothing/high-visibility/page.tsx`
  - `app/(main)/products/clothing/safety-workwear/page.tsx`
- Update
  - `app/(main)/products/clothing/page.tsx` (insert `<ClothingCategories />`)
  - `app/(main)/products/clothing/ClothingProductsSection.tsx` (add Clothing Type filter + pinned type prop)
  - `components/website/products/AllProductsGrid.tsx` (optional: expose Clothing Type when scoping clothing)
  - `lib/products-service.ts` (add `clothing_type` in `Product` + ensure round‑trip)
  - `components/admins/prodmanagement/CategoryProductCreate.tsx` (add dropdown + payload)
  - `components/admins/prodmanagement/CategoryProductEdit.tsx` (add dropdown + payload)
  - `lib/translations/en.json` and `it.json` (strings as above)
  - Ensure assets exist under `public/images/clothingcats/` with filenames provided.

---

### Acceptance checklist
1) DB migration applied; index created; existing rows unaffected (null `clothing_type`).
2) Clothing landing shows a three‑card categories grid with provided images and correct links.
3) Each sub‑page loads with compact header, correct `CategoryInfo`, and a product grid filtered to its `clothing_type`.
4) Clothing grid exposes a Clothing Type filter (desktop/mobile); selection updates results instantly on client without server calls.
5) Admin create/edit surfaces a Clothing Type dropdown under Safety & Specs → Clothing; saving persists correctly.
6) Translations display correctly in EN/IT; language toggle updates all labels.
7) Layouts are responsive and performant; dark mode supported; Core Web Vitals healthy.

---

### Notes & rollback
- The `clothing_type` column is additive and nullable. UI changes are safe to disable; the column can remain unused or be dropped with `alter table public.products drop column clothing_type;` if required.

// Styling notes (dev hints co‑located with files)
// components/website/products/ClothingCategories.tsx
// - Mirror `GlovesCategories` structure, use brand palette, card hover lift via small translateY and shadow.
// app/(main)/products/clothing/*/page.tsx
// - Use `revalidate = 0`, `dynamic = 'force-dynamic'` like existing pages; titles in Montserrat.
// ClothingTypeFilter(.tsx|Mobile.tsx)
// - Follow existing clothing filters’ accordion/drawer patterns; keep controls compact and tabbable.

---

## Clothing categories extension (plan)

Goal
- Add a second taxonomy for clothing: `clothing_category` scoped under the already‑added `clothing_type`.
- Enable admins to pick a clothing category (dropdown) on create/edit next to Clothing Type.
- Surface a Clothing Category filter on the clothing grid and on all three clothing sub‑pages, showing only categories relevant to the current clothing type.

### Data model (DB)
```sql
begin;

alter table public.products
  add column if not exists clothing_category text null;

create index if not exists products_clothing_category_idx on public.products (clothing_category);

commit;
```

Allowed values (driven by UI; no hard DB constraint):
- Welding clothing → ["Welding Aprons","Welding Jackets","Welding Coveralls","Welding Trousers","Accessories"]
- High‑visibility clothing → ["Hi‑Vis Jackets","Hi‑Vis Trousers","Hi‑Vis Waistcoats","Hi‑Vis body warmers","Hi‑Vis Coveralls","Hi‑Vis Fleeces and sweatshirts","Hi‑Vis Polo and T‑shirts","Hi‑Vis accessories"]
- Safety clothing and Workwear → ["Safety Jackets","Safety Trousers","Other safety clothing","Work Jackets","Work Trousers","Work Suits","Work Aprons","Other workwear"]

### Types/service – additions
File: `lib/products-service.ts`
- Extend `Product` with:
```ts
clothing_category?: string | null;
```
- No special parsing needed; ensure field is preserved through `getAllProducts`, `getProductById`, `getProductBySlug`, `createProduct`, `updateProduct` round‑trips.

Optional shared constants
- Create `content/clothing-categories.ts` with a typed mapping used by admin and filters:
```ts
export const CLOTHING_TYPE_TO_CATEGORIES: Record<'welding'|'high-visibility'|'safety-workwear', string[]> = {
  'welding': [
    'Welding Aprons','Welding Jackets','Welding Coveralls','Welding Trousers','Accessories'
  ],
  'high-visibility': [
    'Hi-Vis Jackets','Hi-Vis Trousers','Hi-Vis Waistcoats','Hi-Vis body warmers','Hi-Vis Coveralls','Hi-Vis Fleeces and sweatshirts','Hi-Vis Polo and T-shirts','Hi-Vis accessories'
  ],
  'safety-workwear': [
    'Safety Jackets','Safety Trousers','Other safety clothing','Work Jackets','Work Trousers','Work Suits','Work Aprons','Other workwear'
  ]
};
```

### Admin – create/edit updates
Files:
- `components/admins/prodmanagement/CategoryProductCreate.tsx`
- `components/admins/prodmanagement/CategoryProductEdit.tsx`

Changes (Safety & Specs → Clothing block):
- Add a “Clothing Category” `Select` positioned next to Clothing Type.
- Behaviour:
  - Disabled until a `clothing_type` is selected.
  - Options are `CLOTHING_TYPE_TO_CATEGORIES[clothing_type]`.
  - Include a clearable sentinel `none` (maps to `null`) to match the Radix Select behaviour we use for Clothing Type.
- Persist in payloads:
  - Create: `clothing_category: slug==='clothing' ? (clothingCategory || null) : undefined`.
  - Edit: `clothing_category: clothingCategory || null`.
- On load in Edit: initialise `clothingCategory` from `(product as any).clothing_category || ''`.

UX
- Helper text: “Used for clothing pages and filters. Options depend on Clothing Type.”
- Keep control width aligned; reuse the same sentinel approach (`none`).

### Website – filters & pages

1) New filters
- Create:
  - `components/website/products/filters/clothing/ClothingCategoryFilter.tsx`
  - `components/website/products/filters/clothing/ClothingCategoryFilterMobile.tsx`
- Mirror structure of Clothing Type filters; accepts:
  - `options: string[]`, `selected: string[]`, `onToggle(value: string)`; accordion header titled from i18n.

2) ClothingProductsSection update
File: `app/(main)/products/clothing/ClothingProductsSection.tsx`
- Derive `categoryOptions` from:
  - If `pinnedClothingType` present → `CLOTHING_TYPE_TO_CATEGORIES[pinnedClothingType]`.
  - Else from union of categories inferred from dataset by grouping per `p.clothing_type` and mapping constants.
- Add state `clothingCategories: string[]` and render `ClothingCategoryFilter` (desktop) + `ClothingCategoryFilterMobile` inside `extraFiltersRender(Mobile)` above other clothing filters.
- Predicate: add `const catOk = clothingCategories.length===0 || clothingCategories.includes(((p as any).clothing_category || ''));` and require `catOk`.
- On sub‑pages with `pinnedClothingType`, pass the corresponding options only. Keep Category/Sub‑Category hidden (already done) and default the Clothing Type group to open; same for Clothing Category.

3) ProductGrid integration
- No core changes needed beyond current `extraFiltersRender` usage; mobile uses `extraFiltersRenderMobile` (already wired). Ensure both clothing filters are included in mobile content.

### Translations (EN/IT)
Files: `lib/translations/en.json`, `lib/translations/it.json`
- Add:
```json
products.filters.clothingCategory.title
products.filters.clothingCategory.options // optional; we can display raw strings
```
Copy examples (EN): “Clothing Category”; (IT): “Categoria abbigliamento”.

### File inventory (to create/update)
- Create
  - `content/clothing-categories.ts`
  - `components/website/products/filters/clothing/ClothingCategoryFilter.tsx`
  - `components/website/products/filters/clothing/ClothingCategoryFilterMobile.tsx`
- Update
  - `lib/products-service.ts` (add `clothing_category`)
  - `components/admins/prodmanagement/CategoryProductCreate.tsx`
  - `components/admins/prodmanagement/CategoryProductEdit.tsx`
  - `app/(main)/products/clothing/ClothingProductsSection.tsx` (state, options, predicate, filters order)
  - `lib/translations/en.json` & `it.json` (filter title)

### SQL – examples
```sql
-- Set null initially for all rows (safe reset)
update public.products set clothing_category = null where clothing_category is distinct from null;

-- Example one‑off backfill (optional): mark obvious hi‑vis jackets
update public.products
set clothing_category = 'Hi-Vis Jackets'
where clothing_type = 'high-visibility' and (
  lower(name) like '%jacket%' or lower(sub_category) like '%jacket%'
);
```

### Acceptance checklist
1) DB migration applied; column indexed.
2) Admin create/edit shows Clothing Category next to Clothing Type; disabling/enabling and options respect selected type; sentinel works; values persist.
3) Clothing grid shows Clothing Category filter (desktop/mobile) and filters results instantly on client.
4) Sub‑pages show only Clothing Category options for the `pinnedClothingType` and default both type and category accordions to open.
5) EN/IT labels present; language switch respected.
6) Performance/responsiveness/dark mode verified.


