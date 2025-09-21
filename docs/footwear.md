## Safety Footwear – Implementation Plan

### Executive summary
- Introduce a dedicated Safety Footwear catalogue experience mirroring Respirators, Industrial Swabs, Arm and Hearing: its own page/section, category‑specific filters (desktop + mobile parity), and an isolated specs component when we move to detail.
- Schema: add two flexible JSONB columns for footwear to capture EN ISO 20345:2011/2022 codes and product attributes without schema churn. Keep them GIN‑indexed for fast client filtering.
- Data: seed two safety boots and one insole from `docs/footwearinfo.txt`, with complete EN/IT locales, shared related product UUIDs, and Supabase image URLs.

---

### Current state (reference & constraints)
- We follow the Arm/Hearing pattern: language‑agnostic dataset scoping, isolated specs components, mobile/desktop filter parity, and translation keys in EN/IT.
- `public.products` already supports general fields (locales, brands, materials, size, CE, features/applications/industries, images). EN standard table check only allows EN388/EN407, so footwear EN ISO 20345 data must live in a new JSONB column (leave `en_standard` null).

---

### Data model (DB) – additions

Add two JSONB columns + indexes for footwear standards/attributes (minimal, future‑proof):

```sql
begin;

alter table public.products
  add column if not exists footwear_standards jsonb not null default '{}'::jsonb,
  add column if not exists footwear_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_footwear_standards_gin on public.products using gin (footwear_standards);
create index if not exists products_footwear_attributes_gin on public.products using gin (footwear_attributes);

commit;
```

Schema intent
- `footwear_standards` captures EN ISO 20345 codes (2011, 2022), slip resistance and extras in a structured way:

```json
{
  "en_iso_20345_2011": ["S3"],
  "en_iso_20345_2022": ["S3L","FO","HI","HRO","SC","SR","M","CI"],
  "slip_resistance": "SRC"
}
```

- `footwear_attributes` captures filterable attributes beyond standards:

```json
{
  "class": "S3L",                 // S1/S1P/S2/S3/S3L etc.
  "esd": true,                     // ESD capability
  "metal_free": true,              // toe/plate
  "width_fit": [10,11,12,14],      // available widths
  "size_min": 35,
  "size_max": 52,
  "gender": "unisex",
  "weight_grams": 700,
  "weight_ref_size": 42,
  "special": ["metatarsal_protection","ladder_grip"],
  "toe_cap": "metal_free",       // metal_free | steel | alu | composite
  "sole_material": "rubber"      // quick facet; materials_locales keeps full text
}
```

Notes
- Keep detailed text materials in `materials_locales`. For filtering, also duplicate key material signals (e.g., sole_material) inside `footwear_attributes` to avoid heavy text parsing.
- Do not set `en_standard` for footwear; all EN ISO 20345 codes live in `footwear_standards`.

---

### Front‑end changes

1) Section component
- Create `app/(main)/products/footwear/page.tsx` rendering `FootwearProductsSection` (compact header – no pill/subtitle – matching Swabs/Respirators/Hearing).
- Create `app/(main)/products/footwear/FootwearProductsSection.tsx`:
  - Scope dataset language‑agnostically to footwear using base EN/IT category/sub‑category: `(category EN includes "footwear") OR (sub_category EN includes "boot" OR "insoles")` and IT equivalents (`calzature`, `stivali`, `plantari`).
  - Inject category‑specific filters (see below) into `ProductGrid` via `extraFiltersRender` and `extraFiltersRenderMobile`.
  - Set `hideDefaultFilters=true` (only category, sub‑category and footwear filters visible on the page).

2) Filters (desktop + mobile parity)
- Directory: `components/website/products/filters/footwear/`
  - `ClassFilter.tsx` + `ClassFilterMobile.tsx` (multi‑select from `footwear_attributes.class` and `footwear_standards.en_iso_20345_2011/2022` – show unique values e.g., S3, S3L)
  - `ESDFilter.tsx` + `ESDFilterMobile.tsx` (three‑state: All / Yes / No)
  - `WidthFilter.tsx` + `WidthFilterMobile.tsx` (multi‑select: 10, 11, 12, 14)
  - `SizeRangeFilter.tsx` + `SizeRangeFilterMobile.tsx` (min/max or discrete chips from `size_min/size_max`)
  - `ToeCapFilter.tsx` + `ToeCapFilterMobile.tsx` (multi‑select: metal_free, steel, alu, composite)
  - `SoleMaterialFilter.tsx` + `SoleMaterialFilterMobile.tsx` (multi‑select: rubber, PU/rubber, etc., sourced from `footwear_attributes.sole_material`)
  - `StandardCodeFilter.tsx` + `StandardCodeFilterMobile.tsx` (multi‑select of 20345 codes: FO, HI, HRO, CI, M, SC, SR, WPA; match within `footwear_standards.en_iso_20345_2022`)

Predicate (AND‑match) uses `footwear_attributes` + `footwear_standards` and ignores absent filters. Map mobile components into `MobileFilterSheet` the same way as Swabs/Respirators/Arm/Hearing.

3) All products grid
- Extend `components/website/products/AllProductsGrid.tsx` to:
  - Derive hearing/respiratory/arm filters (existing) and add footwear filters above (desktop + mobile) with a unified predicate. Ensure the combined predicate AND‑matches all selected facets across categories.

4) Detail & preview (follow‑up after plan sign‑off)
- Add `components/website/products/slug/FootwearSpecs.tsx` (Row 1: Materials | Size | Class; Row 2: CE Category | Right tile priority: EN ISO 20345 chips (from codes) → ESD/Toe‑cap chips → else standards string). Wire in `ProductDetail.tsx` using the same conditional category checks as other categories.
- Add compact spec chips for class/ESD/codes in `product-preview-modal.tsx`.

5) Category header (copy + image)
- Update `components/website/products/category-info.tsx` image map with `footwear: "/images/products/categories/safetyboot.png"`.
- Add EN/IT copy under `products.categories.main.footwear`:
  - EN badge: "Safety Footwear"; title: "Safety Footwear"; description: "Professional safety boots and accessories"; detailedDescription: 2–3 lines inspired by Hearing/Respiratory copies.
  - IT badge: "Calzature di sicurezza"; title: "Calzature di sicurezza"; description: "Scarponcini e accessori professionali"; detailedDescription mirroring EN tone.

6) Navigation (desktop + mobile)
- Add navbar/side‑drawer links using `navbar.safetyFootwear` keys in EN/IT pointing to `/products/footwear`.

---

### Translations (EN/IT)
Add to `lib/translations/{en,it}.json`:
- `navbar.safetyFootwear`: EN "Safety Footwear"; IT "Calzature di sicurezza".
- `products.categories.main.footwear` (badge/title/description/detailedDescription) as above.
- `products.filters` additions:
  - `footwearClass`, `esd`, `widthFit`, `sizeRange`, `toeCap`, `soleMaterial`, `standardCodes`.

---

### SQL – seed data
Use the same related product UUID placeholders used elsewhere:
`b4828268-dbab-4c9f-a5ea-524492f27480`, `a18d1e82-6196-4266-8a67-f93dfaaea43d`, `4078ffef-7c99-4538-b628-0b2c191db73a`, `e85c4e38-5c51-41a8-b45e-a82baa2e2041`.

Image URLs
- Boots (both):
  - `https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/safetyboot2.webp`
  - `https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/safetyboot.png`
- Insole:
  - `https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/insole.jpg`
  - `https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/insole2.jpg`

Seed inserts (3 products; EN/IT locales complete):

```sql
begin;

-- 1) Heckel Maccrossroad 3.0 high meta (Safety boot)
insert into public.products (
  name, description, short_description,
  category, sub_category,
  features, applications, industries,
  image_url, image2_url,
  out_of_stock, is_featured, order_priority,
  brands,
  tags_locales,
  name_locales, description_locales, short_description_locales,
  category_locales, sub_category_locales,
  size_locales, materials_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  footwear_standards, footwear_attributes,
  environment_pictograms
) values (
  'Maccrossroad 3.0 high meta',
  'Safety boot S3/S3L class with rubber sole.',
  'Safety boot S3/S3L class with rubber sole',
  'Safety footwear', 'Safety boots',
  array[
    'Excellent grip (SRC)',
    'Oil, hydrocarbons and chemical resistant sole, up to 300°C',
    'Metatarsal protection 100 J integrated',
    'Metal-free toe cap and penetration resistant sole'
  ],
  array[
    'Activities with high risk of slipping',
    'Presence of chemicals and oil/hydrocarbons',
    'Activities with risk of objects falling on the metatarsals'
  ],
  array['Utilities','Construction','Oil&Gas','Heavy industry','Rail','Ports','Defense','Agriculture'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/safetyboot2.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/safetyboot.png',
  false, false, 0,
  array['Heckel'],
  '{"en":["safety boot","S3L"],"it":["scarponcini","S3L"]}'::jsonb,
  '{"en":"Maccrossroad 3.0 high meta","it":"Maccrossroad 3.0 high meta"}'::jsonb,
  '{"en":"Safety boot S3/S3L class with rubber sole","it":"Scarponcino di sicurezza classe S3/S3L con suola in gomma"}'::jsonb,
  '{"en":"Safety boot S3/S3L class with rubber sole","it":"Scarponcino di sicurezza classe S3/S3L con suola in gomma"}'::jsonb,
  '{"en":"Safety footwear","it":"Calzature di sicurezza"}'::jsonb,
  '{"en":"Safety boots","it":"Stivali di sicurezza"}'::jsonb,
  '{"en":"36 - 48","it":"36 - 48"}'::jsonb,
  '{"en":["Upper: Full-grain leather","Lining: 3D mesh","Sole: Rubber","Insole: Microfibre + PU foam","Toe cap: Rubber-coated"],"it":["Tomaia: Pelle","Fodera: maglia 3D","Suola: Gomma","Sottopiede: Microfibra + schiuma di PU","Punta: Rivestita in gomma"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en_iso_20345_2011":["S3"],"en_iso_20345_2022":["S3L","HI","HRO","SRC","FO"],"slip_resistance":"SRC"}'::jsonb,
  '{"class":"S3L","esd":false,"metal_free":true,"width_fit":[11],"size_min":36,"size_max":48,"gender":"unisex","toe_cap":"metal_free","sole_material":"rubber","special":["metatarsal_protection"]}'::jsonb,
  '{"dry":true,"wet":true,"oily_grease":true,"chemical":true,"dust":true}'::jsonb
);

-- 2) uvex 2 MACSOLE 6523 1-4 (Safety boot)
insert into public.products (
  name, description, short_description,
  category, sub_category,
  features, applications, industries,
  image_url, image2_url,
  out_of_stock, is_featured, order_priority,
  brands,
  tags_locales,
  name_locales, description_locales, short_description_locales,
  category_locales, sub_category_locales,
  size_locales, materials_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  footwear_standards, footwear_attributes,
  environment_pictograms
) values (
  '2 MACSOLE 6523 1-4',
  'Lightweight and flexible safety boot S3L class with rubber sole resistant to heat, cut and chemicals.',
  'Lightweight and flexible safety boot S3L with rubber sole',
  'Safety footwear', 'Safety boots',
  array[
    'Protection class S3L (EN ISO 20345:2022) with SRC slip resistance and heat resistance up to +300°C (HI HRO)',
    'Stable posture even on ladders thanks to the stabilising footbed support',
    'Antistatic, shock‑absorbing PU midsole',
    'Slip, contact‑heat and oil/fuel‑resistant sole'
  ],
  array[
    'Moderate applications requiring high sole durability',
    'Activities in indoor and outdoor environments',
    'Operations in challenging ground conditions'
  ],
  array['Utilities','Construction','Oil&Gas','Heavy industry','Rail','Ports','Defense','Agriculture'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/safetyboot2.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/safetyboot.png',
  false, false, 0,
  array['uvex'],
  '{"en":["safety boot","S3L"],"it":["scarponcini","S3L"]}'::jsonb,
  '{"en":"2 MACSOLE 6523 1-4","it":"2 MACSOLE 6523 1-4"}'::jsonb,
  '{"en":"Lightweight and flexible safety boot S3L class with rubber sole resistant to heat, cut and chemicals","it":"Scarponcini S3L leggeri e flessibili con suola in gomma resistente al calore, taglio e sostanze chimiche"}'::jsonb,
  '{"en":"Lightweight and flexible safety boot S3L class with rubber sole","it":"Scarponcini S3L leggeri e flessibili con suola in gomma"}'::jsonb,
  '{"en":"Safety footwear","it":"Calzature di sicurezza"}'::jsonb,
  '{"en":"Safety boots","it":"Stivali di sicurezza"}'::jsonb,
  '{"en":"35 - 52","it":"35 - 52"}'::jsonb,
  '{"en":["Upper: Hydrophobic leather","Lining: Textile mesh","Sole: Rubber","Insole: Microfibre + PU foam","Toe cap: PU foam, Plastic"],"it":["Tomaia: Pelle idrofoba","Fodera: Maglia di tessuto","Suola: Gomma","Sottopiede: Microfibra + schiuma di PU","Punta: Schiuma di poliuretano, Plastica"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en_iso_20345_2011":[],"en_iso_20345_2022":["S3L","FO","M","CI","HI","HRO","SC","SR"],"slip_resistance":"SRC"}'::jsonb,
  '{"class":"S3L","esd":true,"metal_free":false,"width_fit":[10,11,12,14],"size_min":35,"size_max":52,"gender":"unisex","toe_cap":"composite","sole_material":"rubber"}'::jsonb,
  '{"dry":true,"wet":true,"oily_grease":true,"chemical":true}'::jsonb
);

-- 3) tune-up insole (accessory)
insert into public.products (
  name, description, short_description,
  category, sub_category,
  features, applications, industries,
  image_url, image2_url,
  out_of_stock, is_featured, order_priority,
  brands,
  tags_locales,
  name_locales, description_locales, short_description_locales,
  category_locales, sub_category_locales,
  size_locales, materials_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  footwear_standards, footwear_attributes
) values (
  'tune-up insole',
  'Antistatic insole for safety footwear. Designed to reduce fatigue by enhancing comfort and ergonomics with arch support. Available with three arch support levels: High, Medium, Low.',
  'Antistatic insole for safety footwear',
  'Safety footwear', 'Insoles and accessories',
  array[
    'Certified with the corresponding safety shoe (EN ISO 20345)',
    'Breathable, moisture‑absorbing insole',
    'Usable for ESD‑footwear',
    'Very good cushioning to reduce fatigue'
  ],
  array[],
  array['Utilities','Construction','Oil&Gas','Heavy industry','Rail','Ports','Defense','Agriculture'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/insole.jpg',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/footwear/insole2.jpg',
  false, false, 0,
  array['uvex'],
  '{"en":["insole","accessory"],"it":["plantare","accessori"]}'::jsonb,
  '{"en":"tune-up insole","it":"tune-up insole"}'::jsonb,
  '{"en":"Antistatic insole for use in safety footwear. Designed to reduce fatigue by increasing comfort and improving ergonomics with optimal arch support. Available with three levels: High, Medium, Low.","it":"Sottopiede antistatico per utilizzo nelle calzature di sicurezza. Progettato per ridurre l’affaticamento aumentando il comfort e migliorando l’ergonomia grazie al supporto ottimale dell’arco plantare. Disponibile con 3 livelli: Alto, Medio, Basso"}'::jsonb,
  '{"en":"Antistatic insole for safety footwear","it":"Suoletta antistatica per calzature antinfortunistiche"}'::jsonb,
  '{"en":"Safety footwear","it":"Calzature di sicurezza"}'::jsonb,
  '{"en":"Insoles and accessories","it":"Plantari e accessori"}'::jsonb,
  '{"en":"35 - 52","it":"35 - 52"}'::jsonb,
  '{"en":["Micro‑velvet","PU"],"it":["Microvelluto","PU"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en_iso_20345_2011":[],"en_iso_20345_2022":[],"slip_resistance":null}'::jsonb,
  '{"class":null,"esd":true,"metal_free":true,"width_fit":[11],"size_min":35,"size_max":52,"gender":"unisex","toe_cap":null,"sole_material":null}'::jsonb
);

commit;
```

---

### Delivery checklist
1) Run schema additions and create GIN indexes.
2) Create `app/(main)/products/footwear/page.tsx` and `FootwearProductsSection.tsx` (compact header, no pill/subtitle).
3) Implement Footwear filters (desktop + mobile) listed above; inject via `extraFiltersRender`/`extraFiltersRenderMobile`; predicate AND‑matches across selections.
4) Extend `AllProductsGrid.tsx` to add Footwear filters and merge the predicate with existing categories.
5) Add `FootwearSpecs.tsx` and wire into `ProductDetail.tsx` (like Arm/Hearing/Respiratory); add compact chips to the preview modal.
6) Add translation keys (EN/IT) for category and filters; verify language switcher.
7) Add navbar/side‑drawer entries using EN/IT keys; point to `/products/footwear`.
8) Validate both locales: products visible, filters translated, slugs stable (always use EN name for URLs as per current pattern).
9) Spot‑check performance, responsiveness and dark mode.

---

### Retrospective rules applied (from Arm/Hearing)
- Language‑agnostic scoping; never rely on current UI language for dataset selection.
- Isolated specs components to avoid regressions on Gloves/Swabs.
- Single JSONB columns for category‑specific attributes + GIN indexes for speed.
- Define translation keys before wiring filters to avoid raw keys in the UI.
- Build product links from EN names to keep slugs stable across locales.


