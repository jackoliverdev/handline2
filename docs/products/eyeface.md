## Eye & Face Protection – Implementation Plan

### Executive summary
- Introduce a dedicated Eye & Face Protection catalogue experience mirroring Hearing/Footwear: its own page/section, a small set of high‑signal filters (desktop + mobile parity), and an isolated specs component on the product detail page.
- Schema: add two flexible JSONB columns to capture EN 166/169/170/172/GS‑ET 29 and core lens/frame attributes without schema churn. Keep both columns GIN‑indexed for fast client filtering.
- Data: seed three products from `docs/eye-face info.txt` with complete EN/IT locales (including `applications_locales`) and shared related‑product UUID placeholders; use the image URLs provided below.

---

### Current state (reference & constraints)
- Follow the established pattern from Hearing and Footwear: language‑agnostic dataset scoping, isolated specs component, mobile/desktop filter parity, translation keys in EN/IT, and concise materials chips (e.g., PC, Plastic, Fabric).
- Keep filters focused and relevant: avoid a long list; prefer 3–4 highly targeted facets.

---

### Data model (DB) – additions

Add two JSONB columns + indexes for eye/face standards and attributes:

```sql
begin;

alter table public.products
  add column if not exists eye_face_standards jsonb not null default '{}'::jsonb,
  add column if not exists eye_face_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_eye_face_standards_gin on public.products using gin (eye_face_standards);
create index if not exists products_eye_face_attributes_gin on public.products using gin (eye_face_attributes);

commit;
```

Schema intent
- `eye_face_standards` captures EN/marking and protection codes concisely:

```json
{
  "en166": {
    "frame_mark": "W 166 FT CE",
    "lens_mark": "2C-5 W1 FTKN CE",
    "mechanical_strength": "FT",    
    "optical_class": 1,
    "additional_marking": "34"
  },
  "en169": true,
  "en170": true,
  "en172": false,
  "en175": false,
  "gs_et_29": false
}
```

- `eye_face_attributes` captures filterable attributes:

```json
{
  "form_factor": "glasses",              
  "lens_tint": "grey",
  "lens_material": "PC",
  "frame_material": "plastic",
  "arm_material": "plastic",
  "headband_material": "fabric",
  "coatings": ["anti_fog","scratch_resistant","chemical_resistant"],
  "uv_code": "UV400",
  "transmission_percent": 2,
  "equipment": ["adjustable_headband","replaceable_lens"],
  "has_ir": true,
  "has_uv": true,
  "has_arc": false
}
```

Notes
- Keep environment pictograms in `environment_pictograms` (already present) for Dry/Wet/Chemical/Dust/Electrical.
- Leave the legacy `en_standard` column null; EN 166/169/170/172 live solely inside `eye_face_standards`.

---

### Front‑end changes (files to add/update)

1) Page & Section
- Add `app/(main)/products/eye-face/page.tsx` rendering `EyeFaceProductsSection` (compact header – no pill/subtitle – consistent with Hearing/Footwear).
- Add `app/(main)/products/eye-face/EyeFaceProductsSection.tsx`:
  - Language‑agnostic scoping to eye/face using EN/IT category/subcategory:
    - EN includes: category contains "eye"/"face" OR sub_category contains "glasses"/"goggles"/"visor"/"face shield"
    - IT includes: category contains "occhi"/"viso" OR sub_category contains "occhiali"/"visiera"/"schermo"
  - Inject category‑specific filters via `extraFiltersRender` and `extraFiltersRenderMobile`.
  - Set `hideDefaultFilters=true`.
  - Ensure the grid only scopes and shows items that match these eye/face categories or sub‑categories (both EN and IT), mirroring the strict scoping used for Hearing/Footwear.

2) Filters (desktop + mobile parity) – keep focused
- Directory: `components/website/products/filters/eyeface/`
  - `ProtectionTypeFilter.tsx` / `ProtectionTypeFilterMobile.tsx` (multi‑select from attributes: IR, UV, Arc)
  - `LensTintFilter.tsx` / `LensTintFilterMobile.tsx` (chips from `eye_face_attributes.lens_tint`)
  - `CoatingFilter.tsx` / `CoatingFilterMobile.tsx` (multi‑select from `coatings` – anti‑fog, scratch‑resistant, chemical‑resistant)
  - `UvCodeFilter.tsx` / `UvCodeFilterMobile.tsx` (chips e.g., UV400) – optional but included for this dataset

Predicate
- AND‑match on selected facets; ignore facets with no selection. Derive booleans from `eye_face_attributes.has_ir/has_uv/has_arc` and chips from `coatings`, `lens_tint`, `uv_code`.

3) Product detail & preview
- Add `components/website/products/slug/EyeFaceSpecs.tsx`:
  - Row 1: Materials (concise: PC, Plastic, Fabric) | Optical class | Mechanical strength
  - Row 2: CE Category | Standards chips (EN 166 / EN 169 / EN 170 / EN 172 / GS‑ET 29) | Protection chips (IR / UV / Arc) – show only what exists.
  - Suppress empty chips; keep three‑tile grid alignment (mirror Footwear/Hearing approach).
- Update `components/website/products/slug/ProductDetail.tsx` to render `EyeFaceSpecs` when category/subcategory matches Eye & Face (as above). Keep other categories unaffected.
- Update `components/website/products/product-preview-modal.tsx` to show compact chips: `UV400`, `IR`, `Arc`, and the primary EN standard (EN 166 / EN 170 if UV only).

4) All products grid
- Extend `components/website/products/AllProductsGrid.tsx` to include the Eye/Face filters and merge the predicate with existing categories. Only inject the filters at the top for desktop & mobile when eye/face products are in scope.

5) Navigation & Category UI
- Add desktop navbar and mobile side‑drawer links using `navbar.eyeFaceProtection` pointing to `/products/eye-face`.
- Files: update `components/navbar/navbar.tsx` and `components/website/sidebar.tsx`.
- Update `components/website/products/category-info.tsx` image map with `eyeFace: "/images/products/categories/metalfreeglasses.jpg"` and ensure `categoryType="eyeFace"` is supported.

6) Translations (EN/IT)
- `lib/translations/{en,it}.json`:
  - Navbar: `navbar.eyeFaceProtection` (EN: "Eye & Face Protection", IT: "Protezione occhi e viso").
  - Category copy under `products.categories.main.eyeFace` (badge/title/description/detailedDescription) – tone matching Hearing/Arm.
  - Filters under `products.filters`: `protectionType`, `lensTint`, `coating`, `uvCode`.
  - `productPage` keys already present (materials, size/attributes not needed to change).
  - Confirm parity for desktop/mobile UI and ensure keys are added before wiring filters to avoid raw keys in the interface.

---

### Translations – suggested copy

Category (EN)
- badge: Eye & Face Protection
- title: Eye & Face Protection
- description: Protective eyewear and visors for industrial environments
- detailedDescription: Our eye & face protection range covers safety glasses, sealed goggles and arc‑rated visors designed to EN 166 and related standards. Built for clarity, comfort and reliability with anti‑fog and scratch‑resistant coatings, UV filtering and infrared protection options. Ideal for manufacturing, construction and electrical maintenance.

Category (IT)
- badge: Protezione occhi e viso
- title: Protezione occhi e viso
- description: Occhiali e visiere protettive per ambienti industriali
- detailedDescription: La nostra gamma per la protezione di occhi e viso include occhiali di sicurezza, occhiali a mascherina e visiere con protezione da arco elettrico, progettati secondo la EN 166 e standard correlati. Massima chiarezza e comfort con trattamenti antiappannanti e antigraffio, filtri UV e opzioni per protezione IR. Ideale per manifattura, edilizia e manutenzione elettrica.

Filters (EN)
- `protectionType`: Protection type (IR / UV / Arc)
- `lensTint`: Lens tint
- `coating`: Coating
- `uvCode`: UV code

Filters (IT)
- `protectionType`: Tipo di protezione (IR / UV / Arco)
- `lensTint`: Colore lente
- `coating`: Trattamento
- `uvCode`: Codice UV

---

### SQL – schema + seed

Run schema additions first (idempotent):

```sql
begin;

alter table public.products
  add column if not exists eye_face_standards jsonb not null default '{}'::jsonb,
  add column if not exists eye_face_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_eye_face_standards_gin on public.products using gin (eye_face_standards);
create index if not exists products_eye_face_attributes_gin on public.products using gin (eye_face_attributes);

commit;
```

Shared related product UUID placeholders (same as other categories)
```
b4828268-dbab-4c9f-a5ea-524492f27480
a18d1e82-6196-4266-8a67-f93dfaaea43d
4078ffef-7c99-4538-b628-0b2c191db73a
e85c4e38-5c51-41a8-b45e-a82baa2e2041
```

Image placeholders (Supabase)
```
https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/arc%20flash%202.jpeg
https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/arc%20flash%20.jpg

https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/Goggle-style%20glasses2.webp
https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/Goggle-style%20glasses.webp

https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/metalfreeglasses2.jpg
https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/metalfreeglasses.jpg
```

Seed inserts (3 products; EN/IT locales complete):

```sql
begin;

-- 1) uvex pheos cx2 (Safety glasses, IR + UV, UV400)
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
  applications_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  eye_face_standards, eye_face_attributes,
  environment_pictograms
) values (
  'pheos cx2',
  'Plastic safety glasses with IR protection and UV400 filter. Soft component bonded to the lens for reliable sealing against dust and water.',
  'Metal-free UV400 glasses with IR protection',
  'Eye & Face protection', 'Safety glasses',
  array[
    'Metal-free',
    'IR-ex protective filter for IR radiation',
    'Soft seal component protects against dust and water',
    'Polycarbonate lens with uvex infradur treatment – scratch resistant and anti-fog'
  ],
  array[
    'Welding and hot work',
    'Operations in blast furnaces or with molten/hot material'
  ],
  array['Glass manufacturing','Steel manufacturing','Construction'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/metalfreeglasses2.jpg',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/metalfreeglasses.jpg',
  false, false, 0,
  array['uvex'],
  '{"en":["IR glasses","UV400"],"it":["occhiali IR","UV400"]}'::jsonb,
  '{"en":"pheos cx2","it":"pheos cx2"}'::jsonb,
  '{"en":"Plastic safety glasses with IR protection. The IR-ex filter provides reliable IR protection while allowing optimal colour recognition of signal lights. The soft component attached to the lens offers reliable protection against dust and water.","it":"Occhiali di sicurezza in plastica con protezione IR. Il filtro IR-ex offre una protezione affidabile contro le radiazioni infrarosse, consentendo un ottimale riconoscimento dei colori dei segnali. Il componente morbido collegato direttamente alla lente protegge in modo affidabile da polvere e acqua."}'::jsonb,
  '{"en":"Metal-free UV400 glasses with IR protection","it":"Occhiali in plastica UV400 con lenti IR"}'::jsonb,
  '{"en":"Eye & Face protection","it":"Protezione degli occhi e del viso"}'::jsonb,
  '{"en":"Safety glasses","it":"Occhiali di sicurezza"}'::jsonb,
  '{"en":"-","it":"-"}'::jsonb,
  '{"en":["PC","Plastic"],"it":["PC","Plastica"]}'::jsonb,
  '{"en":["Welding","Operations in blast furnaces or with molten/hot material"],"it":["Operazioni di saldatura","Operazioni in alti forni o in presenza di materiale incandescente"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en166":{"frame_mark":"W 166 FT CE","lens_mark":"2C-5 W1 FTKN CE","mechanical_strength":"FT","optical_class":1},"en169":true,"en170":true,"en172":false,"en175":false,"gs_et_29":false}'::jsonb,
  '{"form_factor":"glasses","lens_tint":"grey","lens_material":"PC","frame_material":"plastic","coatings":["anti_fog","scratch_resistant"],"uv_code":"UV400","transmission_percent":2,"equipment":[],"has_ir":true,"has_uv":true,"has_arc":false}'::jsonb,
  '{"dry":true,"wet":true,"dust":true}'::jsonb
);

-- 2) uvex megasonic 9320 265 (Safety goggles, UV400, chemical resistant)
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
  applications_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  eye_face_standards, eye_face_attributes,
  environment_pictograms
) values (
  'megasonic 9320 265',
  'Goggle-style protective glasses offering a wide field of view and ergonomic design. Anti-fog inner lens and high scratch/chemical resistance on the outer lens.',
  'Goggle-style glasses with a wide field of view and ergonomic design',
  'Eye & Face protection', 'Safety goggles',
  array[
    'Sporty ergonomic design with unlimited field of view',
    'Anti-fog inner lens; outer lens is scratch- and chemical-resistant',
    'Soft strap for secure and comfortable fit',
    'Compliant with EN 166 and EN 170'
  ],
  array[
    'Environments with risk of exposure to chemical substances'
  ],
  array['Manufacturing','Chemical processing','Laboratory'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/Goggle-style%20glasses2.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/Goggle-style%20glasses.webp',
  false, false, 0,
  array['uvex'],
  '{"en":["safety goggles","UV400"],"it":["occhiali a mascherina","UV400"]}'::jsonb,
  '{"en":"megasonic 9320 265","it":"megasonic 9320 265"}'::jsonb,
  '{"en":"With revolutionary lens design and an unlimited field of view, Megasonic ensures optimal vision even in demanding situations. Sporty ergonomic design with optimal comfort.","it":"Con un rivoluzionario design della lente e un campo visivo illimitato, gli occhiali Megasonic assicurano una visione ottimale anche nelle situazioni più impegnative. Design sportivo ed ergonomico per un comfort ottimale."}'::jsonb,
  '{"en":"Goggle-style glasses with a wide field of view and ergonomic design","it":"Occhiali a mascherina con ampio campo visivo dal design ergonomico"}'::jsonb,
  '{"en":"Eye & Face protection","it":"Protezione degli occhi e del viso"}'::jsonb,
  '{"en":"Safety goggles","it":"Occhiali protettivi a tenuta (goggles)"}'::jsonb,
  '{"en":"-","it":"-"}'::jsonb,
  '{"en":["PC","Plastic","Fabric"],"it":["PC","Plastica","Tessuto"]}'::jsonb,
  '{"en":["Environment with risk of exposure to chemical substances"],"it":["Operazioni in presenza di sostanze chimiche"]}'::jsonb,
  'II', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en166":{"frame_mark":"W 166 34 BT CE","lens_mark":"2C-1,2 W 1 BT KN CE","mechanical_strength":"BT","optical_class":1,"additional_marking":"34"},"en169":false,"en170":true,"en172":false,"en175":false,"gs_et_29":false}'::jsonb,
  '{"form_factor":"goggles","lens_tint":"transparent","lens_material":"PC","frame_material":"plastic","headband_material":"fabric","coatings":["anti_fog","scratch_resistant","chemical_resistant"],"uv_code":"UV400","transmission_percent":91,"equipment":["replaceable_lens"],"has_ir":false,"has_uv":true,"has_arc":false}'::jsonb,
  '{"dry":true,"wet":true,"chemical":true,"dust":true}'::jsonb
);

-- 3) uvex pronamic visor arc flash 2 (Visor, electric arc class 2)
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
  applications_locales,
  ce_category, published,
  related_product_id_1, related_product_id_2, related_product_id_3, related_product_id_4,
  eye_face_standards, eye_face_attributes,
  environment_pictograms
) values (
  'pronamic visor arc flash 2',
  'Anti-fog and scratch-resistant polycarbonate visor compliant with EN 166 and EN 170. Protection against liquids, electric arcs, molten metals and hot solids.',
  'PC arc flash visor class 2',
  'Eye & Face protection', 'Face shields & Visors',
  array[
    'EN 166 (personal eye protection) and EN 170 (UV filter) compliant',
    'Class 2 electric-arc protection (GS-ET 29)',
    'Anti-fog and scratch-resistant polycarbonate visor',
    'Suitable against molten metals and hot solids (marking 9)'
  ],
  array[
    'Operations with electrical risks',
    'Environments with risk of chemical splashes'
  ],
  array['Utilities','Construction','Electrical maintenance'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/arc%20flash%202.jpeg',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/eyeface/arc%20flash%20.jpg',
  false, false, 0,
  array['uvex'],
  '{"en":["arc visor","EN 166"],"it":["visiera arco","EN 166"]}'::jsonb,
  '{"en":"pronamic visor arc flash 2","it":"pronamic visor arc flash 2"}'::jsonb,
  '{"en":"Anti-fog and scratch-resistant polycarbonate visor compliant with EN 166 and EN 170. Provides protection against liquids, electric arcs, molten metals and hot solids.","it":"Visiera in policarbonato antiappannante e antigraffio conforme alle norme EN 166 ed EN 170. Offre protezione da sostanze liquide, archi elettrici, metalli fusi e solidi incandescenti."}'::jsonb,
  '{"en":"PC arc flash visor class 2","it":"Visore in PC arco elettrico di classe 2"}'::jsonb,
  '{"en":"Eye & Face protection","it":"Protezione degli occhi e del viso"}'::jsonb,
  '{"en":"Face shields & Visors","it":"Schermi facciali e visiere"}'::jsonb,
  '{"en":"-","it":"-"}'::jsonb,
  '{"en":["PC"],"it":["PC"]}'::jsonb,
  '{"en":["Operations with electrical risks","Environment with risk of exposure to chemical substances"],"it":["Attivita' in presenza di rischi elettrici","Operazioni in presenza di sostanze chimiche"]}'::jsonb,
  'III', true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{"en166":{"frame_mark":"W 166 3 8-2 9 B CE 0196","lens_mark":"2C-1,2 W 1 B 8-2-0 9 KN CE 0196","mechanical_strength":"B","optical_class":1,"additional_marking":"3 8-2 9"},"en169":false,"en170":true,"en172":false,"en175":false,"gs_et_29":true}'::jsonb,
  '{"form_factor":"visor","lens_tint":"transparent","lens_material":"PC","frame_material":"plastic","coatings":["anti_fog","scratch_resistant"],"uv_code":"UV400","transmission_percent":80,"equipment":[],"has_ir":false,"has_uv":true,"has_arc":true}'::jsonb,
  '{"dry":true,"wet":true,"electrical":true}'::jsonb
);

commit;
```

---

### Delivery checklist
1) Run schema additions and create GIN indexes.
2) Create `page.tsx` and `EyeFaceProductsSection.tsx` (compact header, no pill/subtitle) under `app/(main)/products/eye-face/`.
3) Implement Eye/Face filters (desktop + mobile) listed above; inject via `extraFiltersRender` / `extraFiltersRenderMobile`; AND‑match across selections.
4) Extend `AllProductsGrid.tsx` to add Eye/Face filters and merge predicate with existing categories.
5) Add `EyeFaceSpecs.tsx` and wire into `ProductDetail.tsx`; add compact chips to preview modal (UV400 / IR / Arc / primary EN code).
6) Add translation keys (EN/IT) for category and filters; verify language switcher.
7) Add navbar/side‑drawer entries using EN/IT keys; point to `/products/eye-face`.
8) Validate both locales: products visible, filters translated, slugs stable (URLs built from EN names as per pattern).
9) Spot‑check performance, responsiveness and dark mode.

---

### Retrospective rules applied
- Language‑agnostic scoping; never rely on current UI language for dataset selection.
- Isolated specs components to avoid regressions on other categories.
- Minimal, high‑signal filters only.
- Single JSONB columns for category attributes + GIN indexes for speed.
- Define translation keys before wiring filters to avoid raw keys in the UI.
- Build product links from EN names to keep slugs stable across locales.


