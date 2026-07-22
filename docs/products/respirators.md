## Respiratory Protection - Implementation Plan

### Executive summary
- Create a dedicated Respiratory catalogue experience mirroring the Industrial Swabs pattern: its own section component with category-specific filters, plugged into the shared `ProductGrid` via `extraFiltersRender` (desktop) and `extraFiltersRenderMobile` (mobile), and `extraFilterPredicate` for the logic.
- Extend database with respirator-specific attributes using JSON-first fields to keep the schema future-proof, plus a few simple scalar columns for common facets (connections, filter type, protection class, protection codes, EAN).
- Reuse the existing product detail and preview flows; add optional respirator standards rendering alongside the current `safety` tiles.
- Ensure translations and styling match brand guidelines (Primary Orange #F28C38, Dark Grey #1E1E1E, Light Beige #F5EFE0, White #FFFFFF, Secondary Grey #5A5A5A; Montserrat headings, Open Sans body). Keep responsive and performant.

---

### Current state (audit)
- Pages present:
  - `app/(main)/products/respiratory/page.tsx` → uses `RespiratoryProductsSection` and shared `ProductGrid`.
  - `app/(main)/products/respiratory/[slug]/page.tsx` → renders `ProductDetail` + `RelatedProducts`, filters relateds to respiratory/masks terms.
  - `app/(main)/products/respiratory/RespiratoryProductsSection.tsx` → strict filter to respiratory products; currently no category-specific filters hooked in.
- Shared catalogue capabilities:
  - `components/website/products/product-grid.tsx` supports:
    - Desktop filters: Category, Sub-Category, Temperature, Hazard Protection, Work Environment, Industries.
    - Mobile filter sheet: `components/website/products/filters/MobileFilterSheet.tsx` exposes the same plus accepts `extraFiltersRender` and `hideDefaultFilters`.
    - Extension points for category-specific filters via `extraFiltersRender`, `extraFiltersRenderMobile`, and `extraFilterPredicate` (used by swabs).
  - Detail and preview:
    - `ProductDetail` renders materials/size/length; safety standards via `safety` JSON; swab pad size when present; documentation (EN/IT + `declaration_docs_locales`).
    - `ProductPreviewModal` shows condensed specs and safety; no respirator standards UI yet.
  - Swabs precedent:
    - `IndustrialSwabsProductsSection.tsx` composes extra filters (Length, Pad Size) and predicate; hides default filters as needed; mobile parity via `extraFiltersRenderMobile`.

---

### Requirements for Respiratory
1) Dedicated section component (mirrors swabs):
   - New `RespiratoryProductsSection` variant that injects respirator-specific filters into `ProductGrid`.
   - Keep existing strict selection of respiratory items (EN/IT terms) as baseline.
2) Filters (desktop + mobile parity):
   - Connection: multi-select (e.g. `B-Lock`, `RD40`).
   - Type: `filter_type` multi-select (`Dust`, `Gasses & Vapours`, `Combined`).
   - Protection class: multi-select (e.g. `FFP1/2/3`, `Class 1/2/3`).
   - EN facets (optional stage 2):
     - EN149 (FFP class, NR/R/D toggles)
     - EN143 (P-class, NR/R toggles)
     - EN14387 (Class 1/2 and gas codes A/B/E/K/AX/Hg/NO/SX/…)
   - Note: initial UI focuses on Connection, Type, Protection class; EN facets can follow once data is populated.
3) Data model (DB) additions:
   - Scalars:
     - `protection_class text null`
     - `npf text null`
     - `connections text[] null`
     - `compatible_with text[] null`
     - `filter_type text null`
     - `protection_codes text[] null`
     - `ean text null`
   - JSON:
     - `respiratory_standards jsonb not null default '{}'::jsonb`
       Example:
       {
         "en149": { "enabled": true, "class": "FFP3", "nr": false, "r": true, "d": true },
         "en136": { "enabled": true, "class": "Class 2" },
         "en140": { "enabled": true },
         "en166": { "enabled": true, "class": "1" },
         "en143": { "enabled": true, "class": "P3", "nr": true, "r": true },
         "en14387": { "enabled": true, "class": "Class 2", "gases": { "a": true, "b": true, "e": true, "k": true, "ax": true, "hg": false, "no": false, "sx": false } },
         "din_3181_3": { "enabled": false }
       }

---

### SQL (Supabase/Postgres)
```sql
alter table public.products
  add column if not exists protection_class text null,
  add column if not exists npf text null,
  add column if not exists connections text[] null,
  add column if not exists compatible_with text[] null,
  add column if not exists filter_type text null,
  add column if not exists protection_codes text[] null,
  add column if not exists ean text null,
  add column if not exists respiratory_standards jsonb not null default '{}'::jsonb;

create index if not exists products_connections_gin on public.products using gin (connections);
create index if not exists products_compatible_with_gin on public.products using gin (compatible_with);
create index if not exists products_respiratory_standards_gin on public.products using gin (respiratory_standards);
```

---

### Front-end changes
1) Section
   - Create `app/(main)/products/respiratory/RespiratoryProductsSection.tsx` (new variant) that:
     - Keeps current strict respiratory selection logic.
     - Computes distinct facets from products: `connections`, `filter_type`, `protection_class`.
     - Renders extra desktop filters and mobile filters via `extraFiltersRender` and `extraFiltersRenderMobile`.
     - Applies `extraFilterPredicate` to AND-match selected connection/type/class.
     - Leave default grid filters visible (industries etc.) unless we decide to hide them.

2) Filters (components)
   - New in `components/website/products/filters/respiratory/`:
     - `ConnectionFilter.tsx` and `ConnectionFilterMobile.tsx` (checkbox lists like swab filters).
     - `FilterTypeFilter.tsx` and `FilterTypeFilterMobile.tsx`.
     - `ProtectionClassFilter.tsx` and `ProtectionClassFilterMobile.tsx`.
   - Styling, spacing, headings, and badges match existing filter components; mobile sheet places these at the end (same as swabs) to mirror desktop order.

3) Product detail / preview
   - Optional phase: add a compact Respiratory Standards tile block:
     - If `respiratory_standards.en149.enabled`, show EN149 chip with class and NR/R/D.
     - If `en143` or `en14387` present, render class and, for EN14387, gas codes (A/B/E/K/AX/Hg/NO/SX) with yes/no markers.
   - Keep existing `safety` and pad/length tiles behaviour; respirator tiles only appear when respirator data exists.

4) Related products
   - Keep category term filtering used in `[slug]/page.tsx` for respiratory.
   - Optional improvement: if a product has `connections` or `filter_type`, prioritise relateds sharing at least one value.

---

### Wiring patterns (desktop + mobile parity)
- Desktop filters live in `ProductGrid` left sidebar; category-specific filters are composed in the section and injected via `extraFiltersRender`.
- Mobile filters use `MobileFilterSheet` and accept `extraFiltersRender` + `hideDefaultFilters` flags. For respirators, we’ll supply the mobile counterparts to ensure parity (as done for swabs).
- Predicate: the section passes an `extraFilterPredicate(product)` that evaluates selected connection/type/class; this is combined with default filters in `ProductGrid`.

---

### Data mapping for initial BLS seed
- Disposable masks (Zer032 Active/C Active):
  - `category`/`sub_category`: Respiratory protection / Disposable masks
  - `protection_class`: `FFP3`
  - `connections`: []
  - `size_locales`: `{"en":"Universal","it":"Unica"}`
  - `respiratory_standards.en149`: `{ enabled: true, class: "FFP3", nr: false, r: true, d: true }`
  - `npf`: `50`
- Full-face masks (BLS 5600/5700):
  - `sub_category`: Full face masks
  - `protection_class`: `Class 1` / `Class 2`
  - `connections`: [`B-Lock`]
  - `compatible_with`: [`BLS 200 Filters`, `BLS 201 Filters`]
  - `respiratory_standards.en136`: `{ enabled: true, class: "Class 2" }`
  - `size_locales`: `{"en":"Universal"}` or `{"en":"S - M - L"}` per product
- Filters/cartridges (BLS 201-3 … 442):
  - `sub_category`: Filters, Cartridges and accessories
  - `filter_type`: `Dust` | `Gasses & Vapours` | `Combined`
  - `connections`: [`B-Lock`] or [`RD40`]
  - `protection_codes`: e.g. [`A2`], [`ABE1P3 R`], [`AXP3 NR`], [`ABEK2HgP3 R`], etc.
  - `respiratory_standards.en143` and/or `.en14387` with `class` and gas code flags.
  - `npf`: values per table for half/full masks where provided.

---

### Translations
- Add strings under `products.categories.pages.respiratory` as already scaffolded (badge/title/description). Ensure any filter labels (Connection, Filter type, Protection class) exist in `lib/translations/{en,it}.json`.

---

### Performance & accessibility
- Keep client-side filtering only; derive option lists from the currently scoped respiratory products.
- Use memoisation for derived sets; avoid re-computation on every render.
- Match keyboard/focus behaviour of existing filters; ensure adequate contrast in dark mode.

---

### Delivery checklist
1) Run SQL migrations for new columns and GIN indexes.
2) Create respiratory filter components (desktop/mobile) and export.
3) Update `RespiratoryProductsSection` to compute options, render filters, and provide predicate.
4) Optional: add respirator standards block to `ProductDetail`/`ProductPreviewModal` behind presence checks.
5) Add translations for new filter labels.
6) Seed initial BLS products with new attributes (`respiratory_standards`, `connections`, `filter_type`, `protection_codes`, `protection_class`, `npf`).

Prepared for immediate implementation.


