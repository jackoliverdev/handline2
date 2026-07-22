# PPE Standards Hub - Full Implementation Plan

## Executive Summary
- Replace legacy EN resource listing with a structured PPE Standards Hub that mirrors the UVEX examples: clean overview, category-driven navigation, readable standard sections, and product callouts.
- Data model prepared for Supabase from day one (JSON locales, relational categories, standards, sections, and related products), but we’ll start with a local `lib/ppe-standards` service to fetch the same shapes. Drop-in swap to Supabase later.
- Admin pages to manage standards and categories with multilingual fields using `*_locales` JSON.
- UX: Breadcrumbs like product pages, category overview “buckets”, detailed pages with hero, sectioned standards content, related product tiles, and a footer CTA to Blog and Contact.

---

## Database Schema (SQL, no RLS)
Only TWO tables as requested: categories and sections. Sections own related products and localised bullets.

```sql
-- PPE Standards Hub (2 tables)

-- 1) Categories
CREATE TABLE IF NOT EXISTS public.ppe_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  summary_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  hero_image_url text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ppe_categories_slug_idx ON public.ppe_categories (slug);
CREATE INDEX IF NOT EXISTS ppe_categories_sort_idx ON public.ppe_categories (sort_order);

-- 2) Sections (belong to a category). Each section is a readable chunk (like a standard or sub-topic)
CREATE TABLE IF NOT EXISTS public.ppe_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.ppe_categories(id) ON DELETE CASCADE,
  slug text NOT NULL,
  code text,
  title_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  intro_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  bullets_locales jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  related_product_ids uuid[] NOT NULL DEFAULT ARRAY[]::uuid[],
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category_id, slug)
);
CREATE INDEX IF NOT EXISTS ppe_sections_category_idx ON public.ppe_sections (category_id);
CREATE INDEX IF NOT EXISTS ppe_sections_slug_idx     ON public.ppe_sections (slug);
CREATE INDEX IF NOT EXISTS ppe_sections_sort_idx     ON public.ppe_sections (sort_order);
```

Notes:
- Exactly two tables. Sections own related product IDs and localised bullet arrays.
- `*_locales` follow our JSON locales convention.
- Slugs give URLs like `/resources/en-resource-centre/[category]/[section]`.

---

## Front-end Architecture

### URLs
- Hub: `/resources/en-resource-centre` (already exists)
- Category list grid (on Hub page)
- Category page: `/resources/en-resource-centre/[categorySlug]`
- Standard page: `/resources/en-resource-centre/[categorySlug]/[standardSlug]`

### Components (new)
- `components/website/resources/en-resource/overview-buckets.tsx` (done)
- `components/website/resources/en-resource/category-grid.tsx` – shows categories in a grid consistent with the product catalogue style.
- `components/website/resources/en-resource/category-hero.tsx` – hero for category pages, with breadcrumb.
- `components/website/resources/en-resource/section-page.tsx` – full section page layout: hero image, breadcrumb, intro, bullets, and related products tiles.
- `components/website/resources/en-resource/footer-cta.tsx` – “Stay in touch” CTA (Blog + Contact) matching careers page style.

### Pages (new)
- `app/(main)/resources/en-resource-centre/[category]/page.tsx`
- `app/(main)/resources/en-resource-centre/[category]/[section]/page.tsx`

### Breadcrumbs
- Use same breadcrumb style as products with structure: Hub → Category → Standard.

---

## Data Access Layer (start local; swappable to Supabase)
Create a façade in `lib/ppe-standards/` that the pages import. Start with local JSON or mock adapters; later, swap to Supabase by changing provider functions only.

Structure:
- `lib/ppe-standards/types.ts` – TS types mirroring DB schema.
- `lib/ppe-standards/local-data.ts` – Temporary in-memory/JSON seed for development.
- `lib/ppe-standards/service.ts` – functions used by UI: `getCategories`, `getCategory`, `getSectionsByCategory`, `getSection`.
- `lib/ppe-standards/supabase.ts` – future adapter implementing the same interface using Supabase queries.

Interface (service.ts):
```ts
export interface PPEStandardsService {
  getCategories(lang: 'en'|'it'): Promise<PPECategory[]>;
  getCategory(slug: string, lang: 'en'|'it'): Promise<PPECategory | null>;
  getSectionsByCategory(slug: string, lang: 'en'|'it'): Promise<PPESection[]>;
  getSection(categorySlug: string, sectionSlug: string, lang: 'en'|'it'): Promise<PPESectionDetail | null>;
}
```
Swapping provider:
- Export `getService()` from `service.ts` that returns local or supabase implementation based on env var.

---

## Admin
- New Admin section: `app/admin/ppe-standards/`
  - `page.tsx` – list categories and sections; quick filters.
  - `categories/page.tsx` – CRUD categories.
  - `sections/page.tsx` – CRUD sections (code/title/intro/bullets/image/related products/sort/published).
- Reuse existing `components/ui` primitives. Multilingual inputs use two-tab JSON editors (EN/IT) like existing blog forms.

---

## Translations
Add to `lib/translations/{en,it}.json` under `standards`:
- `categories.navTitle`
- `footerCta.badge`, `footerCta.title`, `footerCta.text`, `footerCta.buttons.blog`, `footerCta.buttons.contact`
- Labels for breadcrumbs, category headings, and admin labels if needed.

Sample (EN):
```json
"standards": {
  "categories": { "navTitle": "Categories" },
  "footerCta": {
    "badge": "Keep up to date",
    "title": "Stay in touch for the latest updates",
    "text": "PPE Regulation is constantly in motion...",
    "buttons": { "blog": "Hand Line Insights", "contact": "Contact Us" }
  }
}
```

---

## File Overview (creation/edit order)
1) SQL: Create tables in Supabase
2) `lib/ppe-standards/types.ts`
3) `lib/ppe-standards/local-data.ts`
4) `lib/ppe-standards/service.ts`
5) `components/website/resources/en-resource/category-grid.tsx`
6) `app/(main)/resources/en-resource-centre/[category]/page.tsx`
7) `components/website/resources/en-resource/category-hero.tsx`
8) `app/(main)/resources/en-resource-centre/[category]/[section]/page.tsx`
9) `components/website/resources/en-resource/section-page.tsx`
10) `components/website/resources/en-resource/footer-cta.tsx`
11) `components/website/resources/en-resource/root.tsx` (wire category grid + footer CTA)
12) Admin pages under `app/admin/ppe-standards/` (list, categories, standards, sections)
13) Translations update for new strings

---

## Detailed File Notes

- `lib/ppe-standards/types.ts`
  - Define `PPECategory`, `PPESection`, and `PPESectionDetail`.
  - Include resolved fields for the active language and retain raw locales for admin.

- `lib/ppe-standards/local-data.ts`
  - Provide seed examples for the seven categories listed (Hand & Arm, Footwear, Respiratory, Eye & Face, Hearing, Head, Protective Clothing) with 1–2 standards each.
  - Keep slugs simple: `hand-and-arm`, `footwear`, etc.

- `lib/ppe-standards/service.ts`
  - Export `getService()` that decides between local or supabase.
  - Implement local provider first; ensure functions return localised strings.

- `components/website/resources/en-resource/category-grid.tsx`
  - Grid of categories with hero-style visuals (reusing product catalogue aesthetics).
  - Each card shows category title and brief summary; links to category page.

- `app/(main)/resources/en-resource-centre/[category]/page.tsx`
  - Server component. Fetch category + standards by `getService()`.
  - Renders `category-hero` then a list of standards as tiles linking to the standard page.
  - Breadcrumb: Hub → Category.

- `components/website/resources/en-resource/category-hero.tsx`
  - Large banner with `hero_image_url`, title, summary, and the categories nav (to jump across categories).

- `app/(main)/resources/en-resource-centre/[category]/[section]/page.tsx`
  - Server component. Renders `section-page` with hero image (if any), `code — title`, intro, bullet list, and related product mini-cards.
  - Breadcrumb: Hub → Category → Section.

- `components/website/resources/en-resource/section-page.tsx`
  - Handles animated reveal and related product tiles; renders intro + bullet list from locales.

- `components/website/resources/en-resource/footer-cta.tsx`
  - Implements the “Keep up to date” CTA with two buttons to Blog and Contact.
  - Style references careers footer.

- `components/website/resources/en-resource/root.tsx`
  - After hero and existing overview buckets, render `category-grid` and the `footer-cta`.

- Admin (`app/admin/ppe-standards/`)
  - `page.tsx`: consolidated view and quick links.
  - `categories/page.tsx`: CRUD with title/summary locales and hero image.
  - `standards/page.tsx`: CRUD with status, code, hero, intro locales, category selector.
  - `sections/[standardId]/page.tsx`: sortable sections; add related products (UUIDs); note locales.

---

## Footer CTA Copy (Translations)
- EN:
  - Badge: Keep up to date
  - Title: Stay in touch for the latest updates
  - Text: PPE Regulation is constantly in motion and can be difficult to navigate. We have started a section in our Hand Line Insights Blog dedicated to compliance and regulation updates. You have more questions or want to discuss further, we are one click away.
  - Buttons: Hand Line Insights (Blog), Contact Us
- IT:
  - Badge: Aggiornamenti
  - Title: Resta in contatto per gli ultimi aggiornamenti
  - Text: Le normative sui DPI sono in continua evoluzione e possono essere difficili da navigare. Abbiamo creato una sezione dedicata del nostro blog Hand Line Insights con aggiornamenti su conformità e regolamentazione. Hai altre domande o vuoi approfondire temi specifici? Siamo a un clic di distanza.
  - Buttons: Hand Line Insights (Blog), Contattaci

---

## Future Enhancements
- Add search and filters per category (by hazard, standard code).
- Track view analytics per standard (existing analytics hooks).
- Optional RLS policies once admin CRUD is live.

``` 
Prepared for immediate implementation. 
```
