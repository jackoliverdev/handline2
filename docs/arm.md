## Arm Protection – Implementation Plan (final)

### Executive summary
- Create a dedicated Arm Protection catalogue experience that mirrors the pattern used for Respirators and Industrial Swabs: its own section component, category‑specific filters (desktop and mobile parity), and a scoped predicate injected into the shared `ProductGrid`.
- Schema: a single, flexible JSON column `arm_attributes` (thumb loop, closure), while reusing existing fields for EN388, materials, sizes, length, industries and environment pictograms.
- UI composition follows our latest approach: isolated specifications components per category. Add a new `ArmSpecs` and render it conditionally in `ProductDetail` (as we now do for Gloves/Swabs/Respirators).
- Seed the initial sleeve product(s) with EN/IT locales from `docs/armnfo.txt`. Use the same placeholder images and related product UUIDs pattern as Respirators.

---

### Current state (audit)
- Shared catalogue stack supports:
  - Desktop filters in the left sidebar; mobile parity via `MobileFilterSheet`.
  - Extension points on `ProductGrid`: `extraFiltersRender`, `extraFiltersRenderMobile`, `extraFilterPredicate`.
  - Product detail uses isolated specs components: `GlovesSpecs`, `SwabsSpecs`, `RespiratorSpecs` (now live). Arm will add a fourth specs component and plug in identically.
  - Preview modal supports compact spec chips (respiratory standards already wired; we will add sleeve chips similarly).
- Swabs and Respirators are the reference for section composition, filter injection, and the compact page header (no pill/long subtitle).

---

### Requirements for Arm Protection
1) Dedicated section and pages
   - Route: `app/(main)/products/arm-protection/page.tsx` → renders `ArmProductsSection` (compact header, no pill badge/subtitle; same spacing as Respirators/Swabs now).
   - Detail: reuse the existing generic product slug page and `components/website/products/slug/ProductDetail.tsx` (no new slug route required).
   - Section component: `app/(main)/products/arm-protection/ArmProductsSection.tsx` to scope the dataset to Arm Protection and inject arm‑specific filters and predicate.

2) Category-specific filters (desktop + mobile parity)
   - Sleeve length (cm): single/multi-select list derived from distinct `length_cm` values in-scope.
   - Thumb loop: boolean derived from attributes; values: Yes/No.
   - Closure type: multi-select: `Velcro`, `Elastic`, `None` (derived from attributes).
   - Materials: multi-select, options derived from `materials_locales` (English labels).
   - Existing global filters remain available (industries, work environment, hazards, etc.).

3) Data mapping from `docs/armnfo.txt`
   - Category: `Arm protection` (EN) / `Protezione delle braccia` (IT)
   - Sub-category: `Cut resistant sleeves` (EN) / `Maniche resistenti al taglio` (IT)  
     Note: fix source typo “Cut resistand sleeves”.
   - EN388: Abrasion 2, Cut (Coupe) X, Tear 4, Puncture X, ISO 13997 Cut C
   - EN ISO 21420: true
   - Size: `M / L`
   - Length: e.g. `40` → `length_cm = 40`
   - Materials (EN/IT): per file (HPPE, Fibreglass, Kevlar®, Polyamide)  
     Note: standardise spelling to British English “Fibreglass”.
   - Environments: Dry = Yes, Dust = Yes; others = No → map to `environment_pictograms`
   - CE Category: `II`

---

### Data model (DB) – minimal additions
The existing `public.products` table already covers all arm sleeve core data via:
- `category`, `sub_category`, `name_locales`, `description_locales`, `short_description_locales`
- `materials_locales`, `size_locales`, `length_cm`, `ce_category`, `brands`, `tags_locales`
- `safety` JSON for EN metrics, `environment_pictograms` JSON for environments

To enable precise UI filters for “Thumb loop” and “Closure type” without overfitting the schema, add a flexible JSON column:

```sql
alter table public.products
  add column if not exists arm_attributes jsonb not null default '{}'::jsonb;

-- Optional but recommended for filtering performance
create index if not exists products_arm_attributes_gin on public.products using gin (arm_attributes);
```

Example `arm_attributes` payload:

```json
{
  "thumb_loop": true,
  "closure": "velcro"  // allowed: "velcro" | "elastic" | "none"
}
``;

Safety JSON (example for EN388 and EN ISO 21420):

```json
{
  "en_iso_21420": { "enabled": true },
  "en388": { "enabled": true, "abrasion": 2, "cut": "X", "tear": 4, "puncture": "X", "iso_cut": "C" }
}
```

Environment JSON (example):

```json
{ "dry": true, "wet": false, "oily": false, "chemical": false, "dust": true, "biological": false }
```

Notes:
- Keep existing `products_en_standard_check` satisfied by setting `en_standard = 'EN388'` where applicable.
- Leave `arm_attributes` open for future attributes without further schema churn.

---

### Front-end changes
1) Section component
   - `app/(main)/products/arm-protection/ArmProductsSection.tsx`:
     - Scope dataset to Arm Protection (category/sub-category match in EN/IT locales).
     - Derive distinct facet options: `length_cm`, `arm_attributes.thumb_loop`, `arm_attributes.closure`, `materials_locales` (EN labels).
     - Inject `extraFiltersRender`, `extraFiltersRenderMobile`, and `extraFilterPredicate` into `ProductGrid`.
     - Header: compact (no pill, no subtitle) to match Respirators/Swabs pages.

2) Filters (components)
   - Directory: `components/website/products/filters/arms/`
     - `ArmLengthFilter.tsx` + `ArmLengthFilterMobile.tsx`
     - `ThumbLoopFilter.tsx` + `ThumbLoopFilterMobile.tsx`
     - `ClosureTypeFilter.tsx` + `ClosureTypeFilterMobile.tsx`
     - `ArmMaterialFilter.tsx` + `ArmMaterialFilterMobile.tsx` (optional if materials facet is useful)
   - Mirror Swabs styling (checkbox lists with badges; collapsible on mobile). Follow brand palette (Primary Orange #F28C38, greys) and typography (Montserrat/Open Sans).

3) Product detail (specs) and preview
   - Add `components/website/products/slug/ArmSpecs.tsx` as an isolated specs component (parallel to Gloves/Swabs/Respirators). Layout:
     - Row 1: Materials | Size | Length
     - Row 2: CE Category | Right tile showing priority → EN388 chips (from `safety`) → else Sleeve features chips (Thumb loop / Closure) → else EN Standard string
     - Hide empty tiles; keep grid stable.
   - Update `components/website/products/slug/ProductDetail.tsx` to render `ArmSpecs` when category/sub-category matches Arm; keep other categories unaffected.
   - Update `components/website/products/product-preview-modal.tsx`:
     - Add compact chips for sleeves: if `length_cm` present show “Length: X cm”; if `arm_attributes.thumb_loop` or `closure` present, show small chips; continue to show EN388 chip when available.

4) All products grid
   - Update `components/website/products/AllProductsGrid.tsx` to include Arm filters alongside Swabs and Respiratory (desktop and mobile parity) and extend the combined `extraFilterPredicate` to AND‑match Arm selections with existing ones.

5) Related products
   - Reuse existing related logic. Initially seed with the same four UUIDs scheme to guarantee content; later refine by `length_cm` or `cut_resistance_level`.

---

### SQL – seed example (placeholders + same related IDs)
Use the same placeholder images and the same related product UUIDs from `docs/respirators.sql`.

```sql
insert into public.products (
  name,
  description,
  short_description,
  category,
  sub_category,
  features,
  applications,
  industries,
  image_url,
  image2_url,
  out_of_stock,
  is_featured,
  order_priority,
  brands,
  tags_locales,
  name_locales,
  description_locales,
  short_description_locales,
  category_locales,
  sub_category_locales,
  size_locales,
  materials_locales,
  length_cm,
  ce_category,
  published,
  related_product_id_1,
  related_product_id_2,
  related_product_id_3,
  related_product_id_4,
  en_standard,
  safety,
  environment_pictograms,
  arm_attributes
) values (
  'unidur sleeve TL',
  'Cut-resistant sleeve (Level C) with thumb loop. HPPE, fibreglass and polyamide outer layer for durable, flexible forearm protection. Velcro closure ensures a perfect fit; thumb loop enhances grip and wrist protection.',
  'Cut level C sleeve for arm protection',
  'Arm protection',
  'Cut resistant sleeves',
  array[
    'High cut resistance (Level C)',
    'Flexible, thin forearm protection',
    'Velcro closure and thumb loop for secure fit'
  ],
  array[
    'Handling sharp sheet metal; stamping, bending, cutting',
    'Cutting, transporting or installing glass panes and bottles',
    'Sawing, planing and working with sharp tools',
    'Working with sharp components, stamped parts or metal edges'
  ],
  array['Metalworking','Glass manufacturing','Construction','Carpentry','Automotive','Aerospace','Recycling','Waste management'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Arm/armppe2.webp,
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Arm/armppe.webp',
  false,
  false,
  0,
  array['uvex'],
  '{"en":["anti-cut sleeve","arm protection"],"it":["manichetta antitaglio","protezione avambraccio"]}'::jsonb,
  '{"en":"unidur sleeve TL","it":"unidur sleeve TL"}'::jsonb,
  '{"en":"Cut-resistant sleeve (Level C) with thumb loop. HPPE, fibreglass and polyamide outer layer for durable yet flexible forearm protection. Velcro closure ensures perfect fit; thumb loop for extra grip","it":"Manichetta antitaglio (livello C) con passante per pollice. HPPE, fibre di vetro e poliammide per elevata resistenza e flessibilità. Chiusura in velcro per vestibilità perfetta; passante per maggiore presa"}'::jsonb,
  '{"en":"This cut level C sleeve for arm protection","it":"Manichetta antitaglio livello C per protezione avambraccio"}'::jsonb,
  '{"en":"Arm protection","it":"Protezione delle braccia"}'::jsonb,
  '{"en":"Cut resistant sleeves","it":"Maniche resistenti al taglio"}'::jsonb,
  '{"en":"M / L","it":"M / L"}'::jsonb,
  '{"en":["Fibreglass","High-Performance Polyethylene (HPPE)","Kevlar®","Polyamide (PA)"],"it":["Fibra di vetro","Polietilene ad alte prestazioni (HPPE)","Kevlar®","Poliammide (PA)"]}'::jsonb,
  40,
  'II',
  true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  'EN388',
  '{"en_iso_21420":{"enabled":true},"en388":{"enabled":true,"abrasion":2,"cut":"X","tear":4,"puncture":"X","iso_cut":"C"}}'::jsonb,
  '{"dry":true,"wet":false,"oily":false,"chemical":false,"dust":true,"biological":false}'::jsonb,
  '{"thumb_loop":true,"closure":"velcro"}'::jsonb
);
```

---

### Wiring patterns (desktop + mobile parity)
- Desktop filters live in the left sidebar; inject Arm filters via `extraFiltersRender`.
- Mobile filters use `MobileFilterSheet`; pass `extraFiltersRenderMobile` to mirror the desktop filter set and order.
- `extraFilterPredicate(product)` should AND-match on selected values:
  - When any lengths selected → match `product.length_cm` in the selected set.
  - Thumb loop toggle → match `arm_attributes.thumb_loop` truthiness when set.
  - Closure types selected → match any in `arm_attributes.closure`.
  - Materials selected → match intersection with `materials_locales.en` values.

---

### Translations
- Add keys in `lib/translations/{en,it}.json`:
  - `products.filters.sleeveLength`
  - `products.filters.thumbLoop`
  - `products.filters.closureType`
  - `products.filters.materials`
  - Category page labels under `products.categories.pages.armProtection`  
    Note: the Arm category page uses the compact header (no badge/subtitle), but copy keys are still added for future reuse.

---

### Performance & accessibility
- Client-side filtering with memoised derived sets and predicates.
- Keep option lists small and alphabetised; cap material list height with scroll on mobile (as per Swabs filters).
- Ensure keyboard navigation and focus states match existing components; maintain brand contrast in light/dark themes.

---

### Delivery checklist
1) Run the schema addition for `arm_attributes` and create the GIN index.
2) Create `app/(main)/products/arm-protection/page.tsx` and `ArmProductsSection.tsx` with compact header.
3) Implement Arm filters (desktop and mobile) and wire predicate into `ProductGrid`.
4) Add `ArmSpecs.tsx`; update `ProductDetail.tsx` to render it; update `product-preview-modal.tsx` for sleeve chips.
5) Update `AllProductsGrid.tsx` to integrate Arm filters and predicate.
6) Extend `lib/products-service.ts` types with `arm_attributes` and ensure fetch/update paths map cleanly.
7) Add translation keys (EN/IT) and verify language switcher.
8) Seed initial Arm product(s) using placeholders and related UUIDs from Respiratory (`docs/arm.sql`).
9) Validate Core Web Vitals, responsiveness and dark mode across breakpoints.

Prepared for implementation.

---

### File inventory (to create/update)
- Create
  - `app/(main)/products/arm-protection/page.tsx`
  - `app/(main)/products/arm-protection/ArmProductsSection.tsx`
  - `components/website/products/slug/ArmSpecs.tsx`
  - `components/website/products/filters/arms/ArmLengthFilter.tsx`
  - `components/website/products/filters/arms/ArmLengthFilterMobile.tsx`
  - `components/website/products/filters/arms/ThumbLoopFilter.tsx`
  - `components/website/products/filters/arms/ThumbLoopFilterMobile.tsx`
  - `components/website/products/filters/arms/ClosureTypeFilter.tsx`
  - `components/website/products/filters/arms/ClosureTypeFilterMobile.tsx`
  - `components/website/products/filters/arms/ArmMaterialFilter.tsx` (optional)
  - `components/website/products/filters/arms/ArmMaterialFilterMobile.tsx` (optional)
  - `docs/arm.sql` (seed inserts)
- Update
  - `components/website/products/slug/ProductDetail.tsx` (render `ArmSpecs`)
  - `components/website/products/product-preview-modal.tsx` (sleeve chips)
  - `components/website/products/AllProductsGrid.tsx` (filters + predicate)
  - `lib/products-service.ts` (add `arm_attributes` type), ensure queries are typed
  - `lib/translations/en.json`, `lib/translations/it.json` (new keys)




---

### Post‑implementation notes (retrospective)

What went wrong (and fixes applied)
- Missing Italian translations for Arm filters: the keys `products.filters.sleeveLength`, `products.filters.thumbLoop`, `products.filters.closureType` were not present in `it.json`, so labels appeared as raw keys. Fix: added Italian strings and verified English keys.
- Category match broke in Italian: `ProductGrid` compared the selected category against the localised `category`, so when the UI language switched to Italian the scoped category failed to match. Fix: `ProductGrid` now also matches against the original English category via `original_category`, ensuring stable scoping across languages.
- Arm filters absent on the all‑products grid: only Swab and Respiratory filters were injected. Fix: added Arm Length, Thumb Loop and Closure filters to `components/website/products/AllProductsGrid.tsx` for both desktop and mobile, and extended the combined predicate.

What went well (keep doing this)
- Isolated specs components: using `ArmSpecs.tsx` keeps `ProductDetail.tsx` clean and non‑regressive for other categories.
- Minimal schema change: `arm_attributes` JSONB allows future growth (e.g., coatings) without further migrations; GIN index keeps filters snappy.
- Consistent section pattern: `ArmProductsSection.tsx` injects filters via `extraFiltersRender`/`extraFiltersRenderMobile` and scopes the dataset with a language‑agnostic predicate.
- Mobile/desktop parity: identical filter capabilities and order between sidebar and sheet.

Checklist to get every step right for the next product category
1) Schema and types
   - Add only necessary columns (prefer a single JSONB for category‑specific attributes + GIN index).
   - Extend `Product` type in `lib/products-service.ts` accordingly.
2) Data and translations
   - Seed with full EN/IT locales for: name, descriptions, category, sub‑category, materials, size, tags.
   - Add new filter labels in `lib/translations/{en,it}.json` under `products.filters.*` before wiring UI.
3) Section and filters
   - Create `app/(main)/products/<category>/<Category>ProductsSection.tsx`.
   - Scope dataset using a locale‑agnostic check (match English base strings or attribute flags; don’t rely on current UI language).
   - Inject `extraFiltersRender` and `extraFiltersRenderMobile`; implement a single `extraFilterPredicate` that AND‑matches all selections.
   - For category pages that only need custom filters, set `hideDefaultFilters=true`.
4) All‑products grid
   - Mirror filter components (desktop + mobile) and extend the combined predicate so selections across categories work together.
5) Product detail and preview
   - Add a dedicated `<Category>Specs.tsx` and render conditionally in `ProductDetail.tsx`.
   - Add compact chips to `product-preview-modal.tsx` for the category’s key specs.
6) Navigation and category visuals
   - Add navbar/side‑drawer entries (desktop + mobile) using translation keys.
   - Update `components/website/products/category-info.tsx` default image mapping for the new category.
7) Validation (DoC‑ready)
   - IT/EN switch: verify products appear in both languages and filter labels are translated.
   - All‑products grid: confirm filters for Swabs, Respiratory and the new category all work together.
   - Detail page: specs tiles show only available values; CE and right‑hand tile alignment preserved.
   - Run a quick linter pass on edited files; spot‑check Core Web Vitals locally.

This section should be reused as a template for future categories to avoid regressions and ensure smooth delivery.
