## Hearing Protection – Implementation Plan

### Executive summary
- Introduce a dedicated Hearing Protection catalogue, mirroring the successful pattern used for Respirators, Industrial Swabs and Arm Protection.
- Schema: add `hearing_standards` JSONB to capture EN 352 SNR/HML/parts and additional requirement flags; add `hearing_attributes` JSONB for usability/mount/accessories/bluetooth/compatibility. Keep changes minimal and indexed.
- UI: create an isolated `HearingSpecs.tsx`; add a dedicated section `HearingProductsSection.tsx` that injects category‑specific filters for desktop/mobile; extend the all‑products grid with hearing filters.
- Data: seed two products from `docs/hearinginfo.txt` using the same related product UUIDs and placeholder image URLs pattern used for Respirators/Arm.

---

### Current state (reference & constraints)
- Follow the Arm pattern: language‑agnostic scoping, isolated specs component, mobile/desktop filter parity, and translation keys in EN/IT.
- `public.products` currently includes glove, swab and respiratory fields, plus `arm_attributes`. We will add hearing-specific JSONB columns to avoid schema churn.

---

### Data model (DB) – additions
Add two flexible JSONB columns and indexes:

```sql
alter table public.products
  add column if not exists hearing_standards jsonb not null default '{}'::jsonb,
  add column if not exists hearing_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_hearing_standards_gin on public.products using gin (hearing_standards);
create index if not exists products_hearing_attributes_gin on public.products using gin (hearing_attributes);
```

Schema intent
- `hearing_standards` JSONB structure (example):

```json
{
  "en352": {
    "parts": ["EN 352-2"],
    "snr_db": 37,
    "hml": { "h": 36, "m": 35, "l": 34 },
    "additional": ["S","V","W","E1"]
  }
}
```

- `hearing_attributes` JSONB structure (example):

```json
{
  "reusable": false,               // true => R, false => NR
  "mount": "helmet",              // "headband" | "helmet" | "banded" | "none"
  "bluetooth": false,
  "compatible_with": ["Visor pheos 9906"],
  "accessories": ["Replaceable pads","Padded headband","Length-adjustable headband"]
}
```

Notes
- Leave `en_standard` null for hearing products (table check only whitelists EN388/EN407). All EN 352 data lives in `hearing_standards`.
- Reuse existing locales fields for name/description/category/subcategory/materials/size/tags.

---

### Data mapping from `docs/hearinginfo.txt`

Common
- Category: `Hearing protection` (EN) / `Protezione uditiva` (IT)
- Sub‑categories: `Ear plugs` / `Tappi per le orecchie`; `Ear defenders` / `Cuffie antirumore`
- CE Category: `II`

Product specific
- Ear Plugs (uvex)
  - Reusable: NR Yes ➔ `reusable: false`
  - SNR: 37 dB; HML: H 36 / M 35 / L 34
  - EN 352 parts: EN 352‑2
  - Additional requirements Yes: W, S, V, W (already), E1 (from table) – include distinct codes: ["S","V","W","E1"]
  - Materials: Polyurethane (PU)
  - Size: M
  - Colour: Lime (we won’t persist colour at this stage – can be added later if needed as `hearing_attributes.colour`)

- Pheos K2P (uvex)
  - Reusable: R Yes ➔ `reusable: true`
  - Mount: helmet
  - Bluetooth: No
  - Compatible with: Visor pheos 9906
  - Accessories: Replaceable pads, padded headband, length‑adjustable headband
  - SNR: 30 dB; HML: H 35 / M 27 / L 20
  - EN 352 parts: EN 352‑1, EN 352‑3
  - Materials: ABS copolymers, PE
  - Size: S / M / L

---

### Front‑end changes
1) Section component
   - Create `app/(main)/products/hearing/HearingProductsSection.tsx`.
   - Scope dataset to hearing products using a locale‑agnostic predicate: `(category EN includes "hearing" OR sub_category EN includes "ear plug"/"defender")` – do not rely on current UI language.
   - Inject filters via `extraFiltersRender` and `extraFiltersRenderMobile`.
   - Use compact category header (no pill/long subtitle) consistent with Swabs/Respiratory/Arm.

2) Filters (desktop + mobile parity)
   - Directory: `components/website/products/filters/hearing/`
     - `SnrFilter.tsx` + `SnrFilterMobile.tsx` (discrete chips from distinct SNRs in scope; optional min/max slider later)
     - `En352PartFilter.tsx` + `En352PartFilterMobile.tsx` (multi‑select: 352‑1/2/3/... from `hearing_standards.en352.parts`)
     - `ReusableFilter.tsx` + `ReusableFilterMobile.tsx` (three‑state: All / R / NR)
     - `MountTypeFilter.tsx` + `MountTypeFilterMobile.tsx` (multi‑select: headband/helmet/banded)
     - `BluetoothFilter.tsx` + `BluetoothFilterMobile.tsx` (toggle)
   - Extend `components/website/products/AllProductsGrid.tsx` to include the hearing filters alongside existing swab/respiratory/arm filters with a combined AND predicate.

3) Product detail and preview
   - Add `components/website/products/slug/HearingSpecs.tsx`:
     - Row 1: Materials | Size | SNR (from standards)
     - Row 2: CE Category | Right tile showing priority → EN 352 parts chips → Reusable (R/NR) → Mount/Bluetooth chips → else EN standards string
     - Hide empty tiles; keep grid alignment (mirror Arm/Swabs approach)
   - Update `ProductDetail.tsx` to render `HearingSpecs` for hearing products only (keep other categories unaffected).
   - Update `product-preview-modal.tsx` to show compact chips: SNR, EN352 part(s), R/NR.

4) Translations
   - Add to `lib/translations/{en,it}.json` under `products.filters.*`:
     - `snr` (EN: "SNR", IT: "SNR")
     - `en352Part` (EN: "EN 352 part", IT: "Parte EN 352")
     - `reusable` (EN: "Reusable", IT: "Riutilizzabile") with options `r` (Reusable) / `nr` (Monouso)
     - `mountType` (EN: "Mount type", IT: "Tipo di montaggio") with `headband`/`helmet`/`banded`
     - `bluetooth` (EN: "Bluetooth", IT: "Bluetooth")
   - Add `products.categories.main.hearing` and page copy keys (badge/title/description/detailedDescription) similar to Respiratory/Arm.

---

### SQL – schema changes and seed data

Run schema first:

```sql
begin;

alter table public.products
  add column if not exists hearing_standards jsonb not null default '{}'::jsonb,
  add column if not exists hearing_attributes jsonb not null default '{}'::jsonb;

create index if not exists products_hearing_standards_gin on public.products using gin (hearing_standards);
create index if not exists products_hearing_attributes_gin on public.products using gin (hearing_attributes);

commit;
```

Seed inserts (using the same related product UUIDs as Respirators/Arm and placeholder Supabase image URLs):

```sql
begin;

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
  ce_category,
  published,
  related_product_id_1,
  related_product_id_2,
  related_product_id_3,
  related_product_id_4,
  safety,
  environment_pictograms,
  hearing_standards,
  hearing_attributes
) values (
  -- Ear Plugs (uvex)
  'Ear Plugs',
  'Preformed, single-use protective earplugs with ergonomic design providing very high noise isolation. Soft expanded polyurethane foam for exceptional comfort in extended use.',
  'Disposable protective ear plugs',
  'Hearing protection',
  'Ear plugs',
  array[
    'Noise attenuation of 37 dB (H:36, M:35, L:34)',
    'Compliant with EN 352-2 and additional requirements (S,V,W,E1)',
    'Bright lime colour improves visibility in production areas',
    'Sealed surface prevents ingress of foreign bodies'
  ],
  array[
    'Best suited for very loud environments'
  ],
  array['Glass manufacturing','Steel manufacturing','Automotive','Assembly'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Hearing/earplugs.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Hearing/earplugs2.webp',
  false,
  false,
  0,
  array['uvex'],
  '{"en":["single use ear plugs"],"it":["monouso","tappi auricolari"]}'::jsonb,
  '{"en":"Ear Plugs","it":"Tappi auricolari"}'::jsonb,
  '{"en":"Preformed, single-use protective earplugs with ergonomic design provide very high levels of noise isolation, suitable for high-noise environments. Made from soft expanded polyurethane foam for exceptional comfort during extended use.","it":"Tappi auricolari protettivi monouso preformati dal design ergonomico offrono livelli molto alti di isolamento, adatti per ambienti con elevata rumorosità. Realizzati in morbida schiuma espansa di poliuretano, offrono comfort straordinario anche in caso di uso prolungato."}'::jsonb,
  '{"en":"Disposable protective ear plugs","it":"Tappi auricolari protettivi monouso"}'::jsonb,
  '{"en":"Hearing protection","it":"Protezione uditiva"}'::jsonb,
  '{"en":"Ear plugs","it":"Tappi per le orecchie"}'::jsonb,
  '{"en":"M","it":"M"}'::jsonb,
  '{"en":["Polyurethane (PU)"],"it":["Poliuretano (PU)"]}'::jsonb,
  'II',
  true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{}'::jsonb,
  '{}'::jsonb,
  '{"en352":{"parts":["EN 352-2"],"snr_db":37,"hml":{"h":36,"m":35,"l":34},"additional":["S","V","W","E1"]}}'::jsonb,
  '{"reusable":false,"mount":"none","bluetooth":false,"compatible_with":[],"accessories":[]}'::jsonb
), (
  -- Pheos K2P (uvex)
  'Pheos K2P',
  'Helmet-mounted hearing protection earmuffs for the uvex pheos helmet system. Soft surfaces provide exceptional adaptability; ultra-lightweight design ensures optimal comfort.',
  'Helmet-mounted hearing protection earmuffs for the uvex pheos helmet system',
  'Hearing protection',
  'Ear defenders',
  array[
    'Noise attenuation of 30 dB (H:35, M:27, L:20)',
    'Mechanical attachment to the uvex pheos helmet system',
    'Soft surfaces ensure exceptional adaptability',
    'Ultra-lightweight for optimal comfort'
  ],
  array[
    'Best suited for loud environments',
    'Hearing protection where head protection is required (helmet)'
  ],
  array['Construction','Heavy industry','Aviation','Oil&Gas','Mining'],
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Hearing/pheos-k2p.webp',
  'https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Hearing/pheos-k2p2.webp',
  false,
  false,
  0,
  array['uvex'],
  '{"en":["ear defenders","earmuffs","helmet ear protection"],"it":["cuffie antirumore","per elmetto","protezione udito"]}'::jsonb,
  '{"en":"Pheos K2P","it":"Pheos K2P"}'::jsonb,
  '{"en":"Helmet-mounted hearing protection earmuffs for the uvex pheos helmet system. Soft surfaces give the earmuffs exceptional adaptability, and the ultra-lightweight design ensures optimal comfort.","it":"Cuffie di protezione dell'udito da elmetto per il sistema elmetto uvex pheos. Superfici morbide conferiscono alle cuffie un'adattabilità eccezionale e il peso ultraleggero garantisce un comfort ottimale."}'::jsonb,
  '{"en":"Helmet-mounted hearing protection earmuffs for the uvex pheos helmet system","it":"Cuffie di protezione dell'udito da elmetto per il sistema elmetto uvex pheos"}'::jsonb,
  '{"en":"Hearing protection","it":"Protezione uditiva"}'::jsonb,
  '{"en":"Ear defenders","it":"Cuffie antirumore"}'::jsonb,
  '{"en":"S / M / L","it":"S / M / L"}'::jsonb,
  '{"en":["Acrylonitrile-butadiene-styrene (ABS) copolymers","Polyethylene (PE)"],"it":["Copolimeri di acrilonitrile-butadiene-stirene (ABS)","Polietilene (PE)"]}'::jsonb,
  'II',
  true,
  'b4828268-dbab-4c9f-a5ea-524492f27480',
  'a18d1e82-6196-4266-8a67-f93dfaaea43d',
  '4078ffef-7c99-4538-b628-0b2c191db73a',
  'e85c4e38-5c51-41a8-b45e-a82baa2e2041',
  '{}'::jsonb,
  '{}'::jsonb,
  '{"en352":{"parts":["EN 352-1","EN 352-3"],"snr_db":30,"hml":{"h":35,"m":27,"l":20},"additional":[]}}'::jsonb,
  '{"reusable":true,"mount":"helmet","bluetooth":false,"compatible_with":["Visor pheos 9906"],"accessories":["Replaceable pads","Padded headband","Length-adjustable headband"]}'::jsonb
);

commit;
```

---

### Wiring patterns (desktop + mobile parity)
- Desktop filters live in the left sidebar; inject Hearing filters via `extraFiltersRender`.
- Mobile filters use `MobileFilterSheet`; pass `extraFiltersRenderMobile` to mirror the desktop set and order.
- `extraFilterPredicate(product)` should AND‑match on selected values:
  - SNR chips → match `hearing_standards.en352.snr_db`
  - EN352 parts → any‑match within `hearing_standards.en352.parts`
  - Reusable → match `hearing_attributes.reusable`
  - Mount → any‑match within `hearing_attributes.mount`
  - Bluetooth → match `hearing_attributes.bluetooth`

---

### Delivery checklist
1) Run schema additions and create GIN indexes.
2) Create `app/(main)/products/hearing/page.tsx` and `HearingProductsSection.tsx` (compact header).
3) Implement Hearing filters (desktop + mobile) and wire predicate into `ProductGrid`.
4) Add `HearingSpecs.tsx`; update `ProductDetail.tsx`; update `product-preview-modal.tsx` for SNR/EN352/R‑NR chips.
5) Extend `AllProductsGrid.tsx` to integrate Hearing filters and predicate.
6) Extend `lib/products-service.ts` with `hearing_standards`/`hearing_attributes` types.
7) Add translation keys (EN/IT) and verify language switcher.
8) Seed initial Hearing products (this file) using shared related UUIDs and placeholder images; validate in both languages.
9) Validate Core Web Vitals, responsiveness and dark mode.

---

### Retrospective rules applied from Arm/Respiratory
- Language‑agnostic category scoping; don’t rely on current UI language for filters or dataset selection.
- Keep category‑specific specs isolated; never touch gloves/swabs layouts.
- Add translation keys before wiring filters to avoid raw keys in the UI.
- Prefer single JSONB columns for category attributes + GIN indexes to keep schema stable.


