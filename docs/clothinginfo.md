## Protective Clothing – Implementation Plan

### Executive summary
- Introduce a dedicated Protective Clothing catalogue, mirroring Hearing/Footwear/Eye & Face/Arm/Respiratory: its own page/section, targeted desktop/mobile filters, an isolated specs component, compact preview chips, EN/IT translations, and integration in the all‑products grid.
- Schema: add `clothing_standards` JSONB for EN ISO 20471 (hi‑vis classes), EN ISO 11612 (A/B/C/D/E/F), IEC 61482‑2 (arc class), EN 1149‑5 (antistatic), EN 13034 (type), EN 343 (water/breathability) and flags like UV 801; add `clothing_attributes` JSONB for fit, gender, size range, colours, and ergonomics. GIN‑index both.
- Data: seed two uvex jackets from `docs/clothinginfo.txt` with complete EN/IT locales, shared related product UUID placeholders, and your supplied image URLs.

---

### Current state (reference & constraints)
- Follow the pattern used for Hearing/Footwear/EyeFace: language‑agnostic scoping, isolated specs component, strict desktop/mobile filter parity, compact hero (no pill/subtitle), and EN/IT translations added before wiring UI.
- Clothing EN data will live in `clothing_standards`; keep `en_standard` null.

---

### Data model (DB) – additions
```sql
begin;

alter table public.products
  add column if not exists clothing_standards jsonb not null default '{}'::jsonb,
  add column if not exists clothing_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_clothing_standards_gin on public.products using gin (clothing_standards);
create index if not exists products_clothing_attributes_gin on public.products using gin (clothing_attributes);

commit;
```

Schema intent
```json
{
  "en_iso_20471": { "class": 2 },
  "en_iso_11612": { "a1": true, "b": 1, "c": 1, "e": 2, "f": 1 },
  "iec_61482_2": { "class": 1 },
  "en_1149_5": true,
  "en_13034": "Type 6",
  "en_343": { "water": 2, "breath": 2 },
  "uv_standard_801": true
}
```

```json
{
  "fit": "ergonomic",
  "gender": "men",
  "size_range": "XS–4XL",
  "colours": ["yellow/dark blue","orange/dark blue"],
  "uv_protection": true
}
```

---

### Data mapping from `docs/clothinginfo.txt`

- Category: `Protective clothing` (EN) / `Abbigliamento protettivo e da lavoro` (IT)
- Sub‑categories: `Hi‑Vis Jackets` / `Giacche ad alta visibilità`; `Safety Jackets` / `Giacche protettive`

Products
1) suXXed construction J (High‑Vis Jacket)
- Size: XS–4XL; Fit: ergonomic; Gender: Men
- Colours: Yellow/Dark Blue, Orange/Dark Blue
- Materials (concise): 50% CO, 50% PES
- EN: EN ISO 20471 Class 2; UV 801 Yes; CE II
- Applications EN/IT from file (visibility near traffic, logistics, public service)

2) suXXeed multifunction J (FR, multi‑risk Jacket)
- Size: S–6XL; Fit: ergonomic; Gender: Unisex
- Materials (concise): 49% PPAN‑FR, 42% CO, 5% PARA‑ARAMID, 3% PA, 1% carbon
- EN: EN ISO 11612 A1/B1/C1/E2/F1; EN ISO 11611 Class 1; IEC 61482‑2 Class 1; EN 1149‑5; EN 13034 Type 6; CE III
- Applications EN/IT from file (electrical installations, low/mod chemicals, welding)

---

### Front‑end changes
1) Section component
- Create `app/(main)/products/clothing/page.tsx` with compact header and `CategoryInfo categoryType="clothing"`.
- Create `app/(main)/products/clothing/ClothingProductsSection.tsx`:
  - Scope dataset language‑agnostically: category/subcategory contains clothing/jacket (EN/IT).
  - `hideDefaultFilters=true`.
  - Inject filters (desktop/mobile) and predicate.

2) Filters (few, targeted) – `components/website/products/filters/clothing/`
- `HiVisClassFilter(.tsx|Mobile.tsx)` → `clothing_standards.en_iso_20471.class`
- `FlameStandardFilter(.tsx|Mobile.tsx)` (toggle) → presence of `clothing_standards.en_iso_11612`
- `ArcClassFilter(.tsx|Mobile.tsx)` → `clothing_standards.iec_61482_2.class`
- `AntistaticFilter(.tsx|Mobile.tsx)` (toggle) → `clothing_standards.en_1149_5`

3) Product detail and preview
- `components/website/products/slug/ClothingSpecs.tsx`:
  - Row 1: Materials | Size | Fit/Gender
  - Row 2: CE Category | EN chips (20471/11612/11611/61482‑2/1149‑5/13034)
- `ProductDetail.tsx` → add `ClothingSpecs` conditionally for clothing
- `product-preview-modal.tsx` → compact chips: `Hi‑Vis C{n}`, `A1/B1/C1/E2/F1`, `IEC 61482‑2 C1`, `EN 1149‑5`

4) Category & navigation
- `components/website/products/category-info.tsx` → add `clothing` image key `/images/products/categories/High-Vis, Jacket High-Vis.webp`.
- `components/navbar/navbar.tsx` & `components/website/sidebar.tsx` → add `/products/clothing` using `navbar.protectiveClothing`.

5) Translations (EN/IT)
- `navbar.protectiveClothing`
- `products.categories.main.clothing` (badge/title/description/detailedDescription) – focus on visibility, multi‑risk, arc/heat/chem.
- `products.filters.hiVisClass`, `products.filters.flameStandard`, `products.filters.arcClass`, `products.filters.antistatic`.

6) All‑products grid
- Extend `components/website/products/AllProductsGrid.tsx` to add clothing options/state, render filters (desktop/mobile), and integrate predicate.

---

### SQL – schema changes and seed data

```sql
begin;

alter table public.products
  add column if not exists clothing_standards jsonb not null default '{}'::jsonb,
  add column if not exists clothing_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_clothing_standards_gin on public.products using gin (clothing_standards);
create index if not exists products_clothing_attributes_gin on public.products using gin (clothing_attributes);

commit;
```

```sql
begin;

-- suXXed construction J (High‑Vis)
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
  clothing_standards, clothing_attributes
) values (
  'suXXed construction J',
  'Ergonomic High‑Vis work jacket with reflective elements, stand‑up collar, longer back and multiple pockets.',
  'Ergonomic High‑Vis Jacket',
  'Protective clothing', 'Hi‑Vis Jackets',
  array['2 reflective strips around torso and arms','Longer back for increased protection','UV protection','Multiple internal/external pockets'],
  array['Visibility near moving traffic or on construction sites','Staff operating around forklifts and heavy equipment','Public service operators in low‑visibility conditions'],
  array['Construction','Roadworks','Warehousing','Logistics'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/clothes/High-Vis,%20Jacket%20High-Vis.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/clothes/High-Vis,%20Jacket%20High-Vis2.webp',
  false, false, 0,
  array['uvex'],
  '{"en":["high‑visibility","jacket"],"it":["alta visibilità","giacca"]}'::jsonb,
  '{"en":"suXXed construction J","it":"suXXed construction J"}'::jsonb,
  '{"en":"Ergonomic High‑Vis work jacket with \"high‑rise\" sleeve design, reflective elements, stand‑up collar, longer back and multiple pockets (some with flaps).","it":"Giacca da lavoro High‑Vis ergonomica con manica \"high‑rise\", elementi riflettenti, collo montante, parte posteriore più lunga e numerose tasche (alcune con risvolto)."}'::jsonb,
  '{"en":"Ergonomic High‑Vis Jacket","it":"Giacca alta visibilità ergonomica"}'::jsonb,
  '{"en":"Protective clothing","it":"Abbigliamento protettivo e da lavoro"}'::jsonb,
  '{"en":"Hi‑Vis Jackets","it":"Giacche ad alta visibilità"}'::jsonb,
  '{"en":"XS–4XL","it":"XS–4XL"}'::jsonb,
  '{"en":["50% CO","50% PES"],"it":["50% CO","50% PES"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480','a18d1e82-6196-4266-8a67-f93dfaaea43d','4078ffef-7c99-4538-b628-0b2c191db73a','e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en_iso_20471":{"class":2},"uv_standard_801":true}'::jsonb,
  '{"fit":"ergonomic","gender":"men","size_range":"XS–4XL","colours":["yellow/dark blue","orange/dark blue"],"uv_protection":true}'::jsonb
);

update public.products set applications_locales = jsonb_build_object(
  'en', array['Visibility near moving traffic or on construction sites','Staff operating around forklifts and heavy equipment','Public service operators in low‑visibility conditions']::text[],
  'it', array['Visibilità vicino a traffico in movimento o cantieri','Personale che lavora attorno a carrelli elevatori e macchinari pesanti','Operatori dei servizi pubblici in condizioni di scarsa visibilità']::text[]
) where name = 'suXXed construction J';

-- suXXeed multifunction J (FR / multi‑risk)
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
  clothing_standards, clothing_attributes
) values (
  'suXXeed multifunction J',
  'Multi‑function jacket in fire‑retardant fabric certified for internal arc, heat, flame and selected chemical protection.',
  'Multi‑function FR jacket',
  'Protective clothing', 'Safety Jackets',
  array['Ergonomic fit with extended back','Attached reflex elements','Concealed pockets and closures','Highly resistant and durable'],
  array['Electrical installations','Operations with low or moderate chemical hazards','Welding work'],
  array['Steel production','Utilities','Automotive','Chemicals'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/clothes/Jacket,%20fire-retardant%20.jpg',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/clothes/Jacket,%20fire-retardant%202.webp',
  false, false, 0,
  array['uvex'],
  '{"en":["fr","multi‑risk","jacket"],"it":["ignifugo","multirischio","giacca"]}'::jsonb,
  '{"en":"suXXeed multifunction J","it":"suXXeed multifunction J"}'::jsonb,
  '{"en":"Multi‑function jacket certified for internal arc, heat, flame and chemical protection.","it":"Giacca multiuso certificata per protezione da arco elettrico interno, calore, fiamma e sostanze chimiche."}'::jsonb,
  '{"en":"Multi‑function jacket in fire‑retardant fabric","it":"Giacca multifunzione in tessuto ignifugo"}'::jsonb,
  '{"en":"Protective clothing","it":"Abbigliamento protettivo e da lavoro"}'::jsonb,
  '{"en":"Safety Jackets","it":"Giacche protettive"}'::jsonb,
  '{"en":"S–6XL","it":"S–6XL"}'::jsonb,
  '{"en":["49% PPAN‑FR","42% CO","5% PARA‑ARAMID","3% PA","1% carbon"],"it":["49% PPAN‑FR","42% cotone","5% para‑aramide","3% poliammide","1% carbonio"]}'::jsonb,
  'III', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480','a18d1e82-6196-4266-8a67-f93dfaaea43d','4078ffef-7c99-4538-b628-0b2c191db73a','e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en_iso_11612":{"a1":true,"b":1,"c":1,"e":2,"f":1},"en_iso_11611":{"class":1},"iec_61482_2":{"class":1},"en_1149_5":true,"en_13034":"Type 6"}'::jsonb,
  '{"fit":"ergonomic","gender":"unisex","size_range":"S–6XL"}'::jsonb
);

update public.products set applications_locales = jsonb_build_object(
  'en', array['Electrical installations','Operations with low or moderate chemical hazards','Welding work']::text[],
  'it', array['Installazioni elettriche','Operazioni in presenza di rischi chimici bassi o moderati','Lavori di saldatura']::text[]
) where name = 'suXXeed multifunction J';

commit;
```

---

### Files to create/update (exhaustive)
Back‑end/types
- `lib/products-service.ts` – add optional `clothing_standards` and `clothing_attributes` to `Product`.

Pages/sections
- Create `app/(main)/products/clothing/page.tsx`
- Create `app/(main)/products/clothing/ClothingProductsSection.tsx`

Filters (desktop + mobile)
- Create `components/website/products/filters/clothing/HiVisClassFilter(.tsx|Mobile.tsx)`
- Create `components/website/products/filters/clothing/FlameStandardFilter(.tsx|Mobile.tsx)`
- Create `components/website/products/filters/clothing/ArcClassFilter(.tsx|Mobile.tsx)`
- Create `components/website/products/filters/clothing/AntistaticFilter(.tsx|Mobile.tsx)`

Specs & preview
- Create `components/website/products/slug/ClothingSpecs.tsx`
- Update `components/website/products/slug/ProductDetail.tsx` to call `ClothingSpecs`
- Update `components/website/products/product-preview-modal.tsx` to add clothing chips

Grids
- Update `components/website/products/AllProductsGrid.tsx` – add clothing filters and predicate

Category & nav
- Update `components/website/products/category-info.tsx` – add clothing image key and image
- Update `components/navbar/navbar.tsx` and `components/website/sidebar.tsx` – add `/products/clothing`

Translations
- Update `lib/translations/en.json` & `lib/translations/it.json` with:
  - `navbar.protectiveClothing`
  - `products.categories.main.clothing` copy
  - `products.filters.hiVisClass`, `flameStandard`, `arcClass`, `antistatic`

Assets
- Ensure `/public/images/products/categories/High-Vis, Jacket High-Vis.webp` exists.

---

### Delivery checklist
1) Run schema & indexes.
2) Create clothing page/section with compact header and `hideDefaultFilters=true`.
3) Implement targeted filters (desktop/mobile) and wire predicates.
4) Add `ClothingSpecs.tsx` and wire into detail; add preview chips.
5) Extend `Product` type.
6) Add translations EN/IT; verify language switcher.
7) Add navbar/side‑drawer links.
8) Validate locales, filters, slugs.
9) Performance/responsiveness/dark mode checks.


