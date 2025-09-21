## Head Protection – Implementation Plan

### Executive summary
- Introduce a dedicated Head Protection catalogue, mirroring Respirators, Industrial Swabs, Arm, Hearing, Footwear and Eye & Face: its own page/section, category‑specific filters (desktop + mobile parity), an isolated specs component, compact preview chips, and translations in EN/IT.
- Schema: add `head_standards` JSONB to capture EN 397/50365/12492/812 and options (−30°C, MM, LD); add `head_attributes` JSONB for brim length, weight, colours, ventilation, harness/chinstrap points, closed shell, accessories, and size range. Keep changes minimal and GIN‑indexed.
- Data: seed three uvex products from `docs/headinfo.txt` with complete EN/IT locales, shared related product UUIDs, and the image URLs you supplied.

---

### Current state (reference & constraints)
- Follow the category pattern used for Hearing/Footwear/EyeFace: language‑agnostic product scoping, isolated specs component, strict desktop/mobile filter parity, compact hero (no pill/subtitle), and EN/IT translation keys added before wiring UI.
- The `public.products` table already supports general fields (locales, CE category, brands, features/applications/industries, images). Helmet/bump‑cap standards are not covered by the `en_standard` check (which is limited to EN388/EN407), so we use a new JSONB `head_standards` similar to hearing/footwear.

---

### Data model (DB) – additions
Add two flexible JSONB columns and indexes:

```sql
begin;

alter table public.products
  add column if not exists head_standards jsonb not null default '{}'::jsonb,
  add column if not exists head_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_head_standards_gin on public.products using gin (head_standards);
create index if not exists products_head_attributes_gin on public.products using gin (head_attributes);

commit;
```

Schema intent
- `head_standards` example structure:

```json
{
  "en397": {
    "present": true,
    "optional": {
      "low_temperature": "-30°C",
      "molten_metal": true,
      "lateral_deformation": true
    }
  },
  "en50365": true,
  "en12492": false,
  "en812": false,
  "en_iso_20471": false
}
```

- `head_attributes` example structure:

```json
{
  "form_factor": "helmet",                // helmet | bump_cap
  "brim_length": "short",                 // short | long
  "size_min_cm": 51,
  "size_max_cm": 65,
  "weight_g": 446,
  "colours": ["white","yellow","red","blue"],
  "ventilation": true,
  "harness_points": 6,
  "chinstrap_points": 4,
  "sweatband": true,
  "closed_shell": false,                   // true for low‑voltage compliant shells
  "euroslot_mm": 30,
  "accessories": ["helmet lamp","earmuffs","visor"]
}
```

Notes
- Leave `en_standard` null for head products. All head EN data lives in `head_standards`.
- Reuse `*_locales` for name/description/short/category/subcategory/materials/size/tags.

---

### Data mapping from `docs/headinfo.txt`

Common
- Category: `Head protection` (EN) / `Protezione della testa` (IT)
- Sub‑categories: `Safety Helmets` / `Caschi di sicurezza`; `Bump Cap` / `Berretti antiurto`
- CE Category: `II` (typical; keep in sync with future data)

Product specific (uvex)
- Pronamic S‑KR (helmet)
  - EN 397 present; options: −30°C, MM; LD available per table; EN 50365 false
  - Size: 51–65 cm; Weight: 446 g; Brim: short; Ventilation: yes; Harness: 6‑point; Chinstrap: 4‑point; Sweatband: yes
  - Materials: Shell HDPE; Lining Plastic
  - Colours: White, Yellow, Red, Blue
  - Accessories: lamp, earmuffs, visor

- Pronamic E‑S‑WR (helmet)
  - EN 397 present; options: −30°C, MM; EN 50365 true; closed shell for low‑voltage
  - Size: 51–65 cm; Weight: 394 g; Brim: short; Ventilation: yes; Harness: 6‑point; Chinstrap: 4‑point; Sweatband: yes
  - Materials: Shell HDPE; Lining Plastic
  - Colours: White, Yellow, Red, Blue
  - Accessories: lamp, earmuffs, visor

- u‑cap sport (bump cap)
  - EN 812 present; Size: 52–54 / 55–59 / 60–63 cm; Weight: 185 g
  - Brim: short; Materials: Shell ABS; Lining cotton/mesh; Accessories: LED torch, interior mesh

---

### Front‑end changes
1) Section component
   - Create `app/(main)/products/head/page.tsx` rendering `HeadProductsSection` with compact header (`ProductsHero` without description + `CategoryInfo categoryType="head"`).
   - Create `app/(main)/products/head/HeadProductsSection.tsx`:
     - Scope dataset language‑agnostically to head using EN/IT category/subcategory: `(category EN includes "head") OR (subcategory EN includes "helmet" OR "bump")` and IT equivalents (`protezione della testa`, `caschi`, `berretti`).
     - `hideDefaultFilters=true` on the head page.
     - Inject desktop/mobile filters and AND‑merge them with the base predicate.

2) Filters (desktop + mobile parity)
   - Directory: `components/website/products/filters/head/`
     - `BrimLengthFilter.tsx` + `BrimLengthFilterMobile.tsx` (short/long → `head_attributes.brim_length`)
     - `LowTemperatureFilter.tsx` + `LowTemperatureFilterMobile.tsx` (toggle → `head_standards.en397.optional.low_temperature` present)
     - `ElectricalInsulationFilter.tsx` + `ElectricalInsulationFilterMobile.tsx` (toggle → `head_standards.en50365`)
     - `MoltenMetalFilter.tsx` + `MoltenMetalFilterMobile.tsx` (toggle → `head_standards.en397.optional.molten_metal`)
     - `VentilationFilter.tsx` + `VentilationFilterMobile.tsx` (toggle → `head_attributes.ventilation`)
     - `EnStandardFilter.tsx` + `EnStandardFilterMobile.tsx` (multi‑select chips: EN 397, EN 50365, EN 12492, EN 812)
   - Extend `components/website/products/AllProductsGrid.tsx` to register the same head filters and merge the predicate with existing categories (Respiratory/Swabs/Arm/Hearing/Footwear/EyeFace).

3) Product detail and preview
   - Add `components/website/products/slug/HeadSpecs.tsx`:
     - Row 1: Materials | Size | Weight
     - Row 2: CE Category | Right tile priority → EN 397/50365/12492/812 chips → attributes chips (−30°C, MM, LD, Ventilated, Closed shell) → else standards string
     - Hide empty tiles; keep grid alignment mirroring Arm/Hearing/EyeFace.
   - Update `components/website/products/slug/ProductDetail.tsx` to render `HeadSpecs` for head products only (strict conditional; leave other categories untouched).
   - Update `components/website/products/product-preview-modal.tsx` to show compact chips: EN 397/50365/812/12492 and optional (−30°C, MM, LD).

4) Category image & copy
   - Update `components/website/products/category-info.tsx` image map to include:
     - `head: "/images/products/categories/Safety helmet suitable for low temperatures and splash protection.webp"`
   - Add EN/IT copy under `products.categories.main.head` (badge/title/description/detailedDescription) inspired by Hearing/Respiratory tone.

5) Navigation (desktop + mobile)
   - Add navbar/side‑drawer links using `navbar.headProtection` (EN: "Head Protection"; IT: "Protezione della testa") pointing to `/products/head`.

---

### Translations (EN/IT)
Add to `lib/translations/{en,it}.json`:
- `navbar.headProtection`
- `products.categories.main.head` object with: `badge`, `title`, `description`, `detailedDescription`
- `products.filters` additions:
  - `brimLength` (EN: "Brim length", IT: "Lunghezza visiera") with options `short`/`long` (labels in code)
  - `lowTemperature` (EN: "Low‑temperature performance", IT: "Prestazioni a bassa temperatura")
  - `electricalInsulation` (EN: "Electrical insulation (EN 50365)", IT: "Isolamento elettrico (EN 50365)")
  - `moltenMetalSplash` (EN: "Molten metal splash (MM)", IT: "Schizzi di metallo fuso (MM)")
  - `ventilation` (EN: "Ventilation", IT: "Ventilazione")
  - Optionally `weight`/`weightRange` if later required (not wired in v1 to keep UI concise)

---

### SQL – schema changes and seed data

Run schema first:

```sql
begin;

alter table public.products
  add column if not exists head_standards jsonb not null default '{}'::jsonb,
  add column if not exists head_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_head_standards_gin on public.products using gin (head_standards);
create index if not exists products_head_attributes_gin on public.products using gin (head_attributes);

commit;
```

Seed inserts (using the same related product UUID placeholders used elsewhere: `b4828268-dbab-4c9f-a5ea-524492f27480`, `a18d1e82-6196-4266-8a67-f93dfaaea43d`, `4078ffef-7c99-4538-b628-0b2c191db73a`, `e85c4e38-5c51-41a8-b45e-a82baa2e2041`):

```sql
begin;

-- 1) Pronamic S-KR (Safety Helmet)
insert into public.products (
  name, description, short_description,
  category, sub_category,
  features, applications, industries,
  image_url, image2_url,
  out_of_stock, is_featured, order_priority,
  brands, tags_locales,
  name_locales, description_locales, short_description_locales,
  category_locales, sub_category_locales,
  size_locales, materials_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  head_standards, head_attributes,
  environment_pictograms
) values (
  'Pronamic S-KR',
  'Modern, sporty helmet with innovative structure delivering maximum performance and ergonomics with minimal material. Meets EN 397 with optional requirements “-30°C” and “MM”.',
  'Safety helmet suitable for low temperatures and splash protection',
  'Head protection', 'Safety Helmets',
  array[
    'Euroslot lateral attachments (30 mm) for earmuffs and pronamic visor system',
    'Fixing clips for 4-point chinstrap',
    'Shortened visor for a wider field of view',
    'Additional mounting elements for a wide range of accessories'
  ],
  array[
    'Head protection in low-temperature environments',
    'Protection from molten metals'
  ],
  array['Heavy industry','Construction'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/head/Safety%20helmet%20suitable%20for%20low%20temperatures%20and%20splash%20protection.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/head/Safety%20helmet%20suitable%20for%20low%20temperatures%20and%20splash%20protection2.jpg',
  false, false, 0,
  array['uvex'],
  '{"en":["helmet"],"it":["casco"]}'::jsonb,
  '{"en":"Pronamic S-KR","it":"Pronamic S-KR"}'::jsonb,
  '{"en":"Modern and sporty helmet featuring an innovative structure for maximum performance and ergonomics with minimal material. Provides maximum safety meeting EN 397 with optional requirements -30°C and MM.","it":"Elmetto moderno e sportivo con struttura innovativa per massime prestazioni ed ergonomia con minimo materiale. Massima sicurezza secondo EN 397 con requisiti opzionali -30°C e MM."}'::jsonb,
  '{"en":"Safety helmet suitable for low temperatures and splash protection","it":"Elmetto di sicurezza adatto a basse temperature e protezione da spruzzi"}'::jsonb,
  '{"en":"Head protection","it":"Protezione della testa"}'::jsonb,
  '{"en":"Safety Helmets","it":"Caschi di sicurezza"}'::jsonb,
  '{"en":"51–65 cm","it":"51–65 cm"}'::jsonb,
  '{"en":["Shell: HDPE","Lining: Plastic"],"it":["Calotta: HDPE","Fodera: Plastica"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en397":{"present":true,"optional":{"low_temperature":"-30°C","molten_metal":true,"lateral_deformation":true}},"en50365":false,"en12492":false,"en812":false}'::jsonb,
  '{"form_factor":"helmet","brim_length":"short","size_min_cm":51,"size_max_cm":65,"weight_g":446,"colours":["White","Yellow","Red","Blue"],"ventilation":true,"harness_points":6,"chinstrap_points":4,"sweatband":true,"euroslot_mm":30,"accessories":["helmet lamp","earmuffs","visor"]}'::jsonb,
  '{}'::jsonb
);

-- 2) Pronamic E-S-WR (Safety Helmet, low-voltage capable)
insert into public.products (
  name, description, short_description,
  category, sub_category,
  features, applications, industries,
  image_url, image2_url,
  out_of_stock, is_featured, order_priority,
  brands, tags_locales,
  name_locales, description_locales, short_description_locales,
  category_locales, sub_category_locales,
  size_locales, materials_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  head_standards, head_attributes,
  environment_pictograms
) values (
  'Pronamic E-S-WR',
  'Modern, sporty helmet with closed shell suitable for low-voltage environments. Meets EN 397 (−30°C, MM) and EN 50365.',
  'Safety helmet suitable for low temperatures, splash protection, and low-voltage environments',
  'Head protection', 'Safety Helmets',
  array[
    'Closed shell allows use in low-voltage environments (EN 50365)',
    'Euroslot lateral attachments (30 mm) for earmuffs and pronamic visor system',
    'Fixing clips for 4-point chinstrap',
    'Shortened visor for a wider field of view'
  ],
  array[
    'Low-voltage electrical work',
    'Head protection in low-temperature environments'
  ],
  array['Heavy industry','Construction'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/head/Safety%20helmet%20suitable%20for%20low%20temperatures,%20splash%20protection,%20and%20low-voltage%20environments.jpg',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/head/Safety%20helmet%20suitable%20for%20low%20temperatures,%20splash%20protection,%20and%20low-voltage%20environments2.jpg',
  false, false, 0,
  array['uvex'],
  '{"en":["helmet"],"it":["casco"]}'::jsonb,
  '{"en":"Pronamic E-S-WR","it":"Pronamic E-S-WR"}'::jsonb,
  '{"en":"Modern and sporty helmet featuring an innovative structure with closed shell. Maximum safety to EN 397 optional -30°C / MM and EN 50365 for electrical insulation.","it":"Elmetto moderno e sportivo con struttura innovativa e calotta chiusa. Massima sicurezza secondo EN 397 con requisiti opzionali -30°C / MM ed EN 50365 per isolamento elettrico."}'::jsonb,
  '{"en":"Safety helmet suitable for low temperatures, splash protection, and low-voltage environments","it":"Elmetto di sicurezza adatto a basse temperature, protezione da spruzzi e ambienti a bassa tensione"}'::jsonb,
  '{"en":"Head protection","it":"Protezione della testa"}'::jsonb,
  '{"en":"Safety Helmets","it":"Caschi di sicurezza"}'::jsonb,
  '{"en":"51–65 cm","it":"51–65 cm"}'::jsonb,
  '{"en":["Shell: HDPE","Lining: Plastic"],"it":["Calotta: HDPE","Fodera: Plastica"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en397":{"present":true,"optional":{"low_temperature":"-30°C","molten_metal":true}},"en50365":true,"en12492":false,"en812":false}'::jsonb,
  '{"form_factor":"helmet","brim_length":"short","size_min_cm":51,"size_max_cm":65,"weight_g":394,"colours":["White","Yellow","Red","Blue"],"ventilation":true,"harness_points":6,"chinstrap_points":4,"sweatband":true,"closed_shell":true,"euroslot_mm":30,"accessories":["helmet lamp","earmuffs","visor"]}'::jsonb,
  '{}'::jsonb
);

-- 3) u-cap sport (Bump cap)
insert into public.products (
  name, description, short_description,
  category, sub_category,
  features, applications, industries,
  image_url, image2_url,
  out_of_stock, is_featured, order_priority,
  brands, tags_locales,
  name_locales, description_locales, short_description_locales,
  category_locales, sub_category_locales,
  size_locales, materials_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  head_standards, head_attributes,
  environment_pictograms
) values (
  'u-cap sport',
  'Sporty bump cap with plastic shell, integrated shock-absorbing elements and sweat band. Customisable with logo.',
  'Sporty bumper cap',
  'Head protection', 'Bump Cap',
  array[
    'Innovative hard “armadillo” shell with honeycomb structure and shock-absorbing elements',
    'Cold resistance up to -30°C',
    'Shortened visor for a wider field of view',
    'Available with mesh interior for high comfort'
  ],
  array[
    'Activities in work environments without falling object risks',
    'Prolonged use in hot or cold environments'
  ],
  array['Storage and logistics','Construction'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/head/sportybumpercap2.jpg',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/head/sportybumpercap3.jpg',
  false, false, 0,
  array['uvex'],
  '{"en":["bump cap"],"it":["berretto antiurto"]}'::jsonb,
  '{"en":"u-cap sport","it":"u-cap sport"}'::jsonb,
  '{"en":"Bump cap with plastic shell for protection against grazes and bumps. Integrated shock-absorbing elements and sweat band. Customisable with logo.","it":"Berretto antiurto con calotta in plastica per protezione da graffi e urti. Elementi ammortizzanti integrati e fascia antisudore. Personalizzabile con logo."}'::jsonb,
  '{"en":"Sporty bumper cap","it":"Berretto antiurto sportivo"}'::jsonb,
  '{"en":"Head protection","it":"Protezione della testa"}'::jsonb,
  '{"en":"Bump Cap","it":"Berretti antiurto"}'::jsonb,
  '{"en":"52–54 / 55–59 / 60–63 cm","it":"52–54 / 55–59 / 60–63 cm"}'::jsonb,
  '{"en":["Shell: ABS","Lining: Cotton/Mesh"],"it":["Calotta: ABS","Fodera: Tessuto/retata"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en397":{"present":false},"en50365":false,"en12492":false,"en812":true}'::jsonb,
  '{"form_factor":"bump_cap","brim_length":"short","weight_g":185,"ventilation":true,"sweatband":true,"accessories":["LED torch","interior mesh"]}'::jsonb,
  '{}'::jsonb
);

commit;
```

---

### Wiring patterns (desktop + mobile parity)
- Desktop filters live in the left sidebar; inject Head filters via `extraFiltersRender`.
- Mobile filters use `MobileFilterSheet`; pass `extraFiltersRenderMobile` to mirror the desktop set and order.
- `extraFilterPredicate(product)` AND‑matches on selected values:
  - Brim length → `head_attributes.brim_length`
  - Low‑temperature → presence/value under `head_standards.en397.optional.low_temperature`
  - Electrical insulation → `head_standards.en50365`
  - Molten metal splash (MM) → `head_standards.en397.optional.molten_metal`
  - Ventilation → `head_attributes.ventilation`
  - EN standards → any‑match among requested standard flags

---

### Delivery checklist
1) Run schema additions and create GIN indexes.
2) Create `app/(main)/products/head/page.tsx` and `HeadProductsSection.tsx` (compact header, `hideDefaultFilters=true`).
3) Implement Head filters (desktop + mobile) and wire predicate into `ProductGrid`. Extend `AllProductsGrid.tsx` and merge predicate.
4) Add `HeadSpecs.tsx` and wire into `ProductDetail.tsx`; add compact chips to the preview modal.
5) Extend `lib/products-service.ts` with `head_standards`/`head_attributes` types.
6) Add translation keys (EN/IT) for category and filters; verify language switcher.
7) Update category image mapping to the supplied helmet image.
8) Add navbar/side‑drawer entries pointing to `/products/head`.
9) Validate both locales: products visible, filters translated, slugs stable (URLs from EN names).
10) Spot‑check performance, responsiveness and dark mode.

---

### Retrospective rules applied (from Arm/Hearing/Footwear/EyeFace)
- Language‑agnostic dataset scoping; never rely on current UI language for filtering or product selection.
- Isolated specs components to avoid regressions on Gloves/Swabs/other categories.
- Single JSONB columns for category‑specific attributes + GIN indexes for speed and minimal schema churn.
- Define translation keys before wiring filters to avoid raw keys in the UI.
- Build product links from EN names to keep slugs stable across locales.


