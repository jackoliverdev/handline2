## PPE Standards – Sections Images & Related Products Extension (plan)

### Executive summary
- Extend PPE Standards sections so each section can include a gallery of images (multiple URLs) with bilingual captions and display them below the textual content, mirroring the blog slug gallery behaviour.
- Keep/continue using per‑section related products (already present) but ensure they render both on category blocks and section detail.
- Add admin support in the PPE Hub to upload/manage multiple images per section and edit captions in EN/IT.

---

### Current state (audit)
- Data layer (Supabase via `lib/ppe-standards/service.ts` and `types.ts`):
  - `ppe_categories` and `ppe_sections` drive the hub.
  - `ppe_sections` fields in use: `slug`, `code`, `title_locales`, `intro_locales`, `bullets_locales`, `image_url`, `related_product_ids`, `sort_order`, `published`.
  - Related products already supported and rendered in:
    - Category page blocks: `components/website/resources/en-resource/sections-blocks.tsx` (carousel tile on the right).
    - Section detail page: `components/website/resources/en-resource/section-page.tsx` (grid below content).
- Blog slug page gallery pattern:
  - `components/website/resources/blog/markdown-content.tsx` renders a horizontally scrollable image gallery at the bottom from `images: { url }[]`.

---

### Requirements
1) Allow multiple images per PPE section, each with a caption localised in EN/IT.
2) Store image metadata as JSON in `ppe_sections` (array of objects). Upload via Supabase Storage.
3) Render the gallery at the bottom of each section:
   - On category page blocks (below bullets, above the related product tile where space permits, or full‑width below the article body).
   - On section detail page (below bullets and above the existing related products grid).
   - Use the same visual behaviour as the blog gallery (horizontal scroll, snap, arrows on hover for desktop). Show caption under each image.
4) Admin: add UI in the PPE Hub edit page to manage section images: add/remove, upload to storage, reorder (optional), and edit bilingual captions.

---

### Data model (DB) – additions
Add one JSONB column on `ppe_sections` to hold the gallery entries.

```sql
-- 1) Add gallery column to sections
alter table public.ppe_sections
  add column if not exists extra_images jsonb not null default '[]'::jsonb;

-- Optional index for containment queries (future filtering/search)
create index if not exists ppe_sections_extra_images_gin on public.ppe_sections using gin (extra_images);
```

Related product captions (optional enhancement):

```sql
-- Map productId -> { en: string, it: string }
alter table public.ppe_sections
  add column if not exists related_product_captions jsonb not null default '{}'::jsonb;
```

Shape (example):

```json
[
  { "url": "https://.../ppehub/sections/<categoryId>/<sectionId>/img1.webp",
    "caption_locales": { "en": "EN 388 test rig", "it": "Banco prova EN 388" } },
  { "url": "https://.../img2.webp",
    "caption_locales": { "en": "Abrasion wheel", "it": "Ruota abrasiva" } }
]
```

Notes:
- We keep the existing `image_url` (hero per section) intact.
- `related_product_ids` remains as is.

---

### Type changes
Update `lib/ppe-standards/types.ts`:

```ts
export interface SectionImageEntry {
  url: string;
  caption_locales?: Record<string, string>; // { en?: string; it?: string }
}

export interface PPESectionRecord { /* existing fields */
  extra_images?: SectionImageEntry[]; // jsonb
  related_product_captions?: Record<string, Record<string, string>>; // { [productId]: { en?: string, it?: string } }
}

export interface PPESection { /* existing fields */
  extraImages?: SectionImageEntry[];
  relatedProductCaptions?: Record<string, Record<string, string>>;
}
```

Service mapping in `lib/ppe-standards/service.ts` (mapSection):

```ts
extraImages: Array.isArray((rec as any).extra_images) ? (rec as any).extra_images : [],
relatedProductCaptions: (rec as any).related_product_captions || {},
```

---

### Website rendering changes
1) Category page blocks (`components/website/resources/en-resource/sections-blocks.tsx`)
   - After bullets, before/after the related product tile:
     - Render a compact gallery if `s.extraImages?.length > 0`.
    - Reuse blog gallery implementation for consistency:
       - Option A (minimal): import and reuse `MarkdownContent` gallery block by extracting its gallery into a small shared component.
       - Option B (preferred): reuse `components/website/resources/blog/BlogImagesGallery.tsx` and pass `images={s.extraImages.map(({url}) => ({ url }))}`; extend it to optionally render a caption under each card when `caption_locales` present (non‑breaking for blog usage).

2) Section detail page (`components/website/resources/en-resource/section-page.tsx`)
   - After the bullets list, render the same gallery (full‑width container) using the same component and show localised caption for current UI language.

3) i18n
4) Related product captions
   - In `SectionRelatedProducts`, read caption for current product id from `section.relatedProductCaptions?.[id]?.[lang]` and render a small line under the product name when provided.
   - Captions are stored per‑image in `caption_locales`. Choose caption: `caption_locales[lang] || caption_locales.en`.

---

### Admin – PPE Hub management changes
File: `app/admin/ppe-hub/[id]/page.tsx`

1) State and types
   - Extend `PPESectionRecord` usage to include `extra_images`.

2) UI – per section card
   - Add a new "Section Images" block (below Bullets / above Related Products):
     - List current images with thumbnail preview.
     - Input for caption in current language (`currentLanguage` is already implemented for titles/intro/bullets); bind to `caption_locales[currentLanguage]`.
     - Buttons: Add image, Remove image.
     - Optional: drag/reorder; otherwise new images append at end.

 3) Upload
   - Reuse existing `uploadToBucket` helper; create a folder convention:
     - Bucket: `ppehub`
     - Path: `${category.id}/sections/${section.id}/${Date.now()}.${ext}`
   - On success, push `{ url, caption_locales: { [currentLanguage]: '' } }` into `extra_images`.

 4) Persist
   - In `handleSave`, include `extra_images` in the sections upsert payload:

```ts
extra_images: (s as any).extra_images || [],
related_product_captions: (s as any).related_product_captions || {},
```

---

### SQL seed example

```sql
update public.ppe_sections
set extra_images = '[
  {"url":"https://<public-url>/ppehub/sections/<cat>/<sec>/en388_1.webp","caption_locales":{"en":"EN 388 test rig","it":"Banco prova EN 388"}},
  {"url":"https://<public-url>/ppehub/sections/<cat>/<sec>/abrasion.webp","caption_locales":{"en":"Abrasion wheel","it":"Ruota abrasiva"}}
]'
where slug = 'hand-and-arm-protection' and category_id = '<uuid>';
```

---

### File inventory (to create/update)
- Create
  - `components/website/resources/shared/SectionImagesGallery.tsx` (or reuse/extend `BlogImagesGallery.tsx`) – shared gallery with optional caption.
- Update
  - `lib/ppe-standards/types.ts` (add `SectionImageEntry`, `extra_images/extraImages`).
  - `lib/ppe-standards/service.ts` (map `extra_images` → `extraImages`).
  - `components/website/resources/en-resource/sections-blocks.tsx` (render gallery when present).
  - `components/website/resources/en-resource/section-page.tsx` (render gallery below bullets).
  - `app/admin/ppe-hub/[id]/page.tsx` (admin UI for images + captions; include in upsert payload).
  - Optionally `components/website/resources/blog/BlogImagesGallery.tsx` to support `caption` rendering without breaking existing blog usage.

---

### UX details & styling
- Gallery cards: reuse the blog look (rounded tiles, horizontal scroll with snap, light shadow). Display caption below each tile in small text; clamp to 2 lines.
- Accessibility: add `alt` based on caption or section title.
- Performance: lazy‑load images; sizes attribute as in blog gallery.

---

### Acceptance checklist
1) DB migration applied; existing sections unaffected (empty `extra_images = []`).
2) Admin can add/remove images, set EN/IT captions, and save successfully.
3) Category page: each section shows bullets, then gallery (if any), then the related product tile/carousel.
4) Section detail page: bullets → gallery → related products grid.
5) Language switch updates captions accordingly.
6) Dark mode and responsive behaviour verified.

---

### Standard icons extension (reusable icons for sections)

#### Goal
Allow each PPE section to display a small icon before the code/title. Admins can either upload a new icon for the section or select an existing icon from a reusable library.

#### Data model (DB)
1) Create a reusable icons library table:

```sql
-- Enable if not already
-- create extension if not exists pgcrypto;

create table if not exists public.standard_icons (
  id uuid primary key default gen_random_uuid(),
  standard_name text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists standard_icons_name_idx on public.standard_icons (standard_name);
```

2) Link icons to sections and allow per‑section uploads:

```sql
alter table public.ppe_sections
  add column if not exists standard_icon_id uuid null references public.standard_icons(id) on delete set null;

alter table public.ppe_sections
  add column if not exists icon_url text null; -- resolved URL stored per section
```

Notes:
- `icon_url` allows unique icons per section without forcing a library insert.
- If `standard_icon_id` is present, the UI should prefer library icon (`standard_icons.image_url`) unless the section has `icon_url` explicitly set (local override).

#### Types
`lib/ppe-standards/types.ts` additions:

```ts
export interface StandardIconRecord {
  id: string;
  standard_name: string;
  image_url: string;
}

export interface PPESectionRecord { /* existing */
  standard_icon_id?: string | null;
  icon_url?: string | null;
}

export interface PPESection { /* existing */
  iconUrl?: string | null;          // resolved URL used by UI
  standardIconId?: string | null;   // link to library (optional)
}
```

#### Service mapping
`lib/ppe-standards/service.ts` (`mapSection`):

```ts
iconUrl: (rec as any).icon_url || null,
standardIconId: (rec as any).standard_icon_id || null,
```

If `standard_icon_id` is set and a join is later added, prefer the joined `standard_icons.image_url` when `icon_url` is null.

#### Admin UI
File: `app/admin/ppe-hub/[id]/page.tsx` and `app/admin/ppe-hub/create/page.tsx`

- Add an “Icon” block ABOVE the section Code/Title fields:
  - Preview square (48–64px) + two actions:
    - Upload icon: uploads to `ppehub/sections/<sectionId>/icon.<ext>` and sets `icon_url` on the section.
    - Select existing: dropdown listing `standard_icons` (name + thumbnail). On select, set `standard_icon_id` and also preview.
  - Optional checkbox: “Save uploaded icon to library” with a name field; on save, insert into `standard_icons` and set `standard_icon_id` to the new row.
  - Persist both `icon_url` and `standard_icon_id` in section upsert payloads.

Add a small helper in admin pages to fetch the library:
- GET: `select id, standard_name, image_url from standard_icons order by standard_name asc` (via Supabase client).

#### Website rendering
Files:
- `components/website/resources/en-resource/sections-blocks.tsx`
  - Render a 24–32px icon before the title when `section.iconUrl` is present.
- `components/website/resources/en-resource/section-page.tsx`
  - Same treatment in the section hero header (left of code/title).

Styling: keep icon crisp, `className="h-6 w-6 mr-2 object-contain"` (light/dark safe background).

#### Storage
- Bucket: `ppehub`
- Paths: `standard-icons/<slug-or-name>.<ext>` for library uploads; `sections/<sectionId>/icon.<ext>` for one‑off section icons.

#### SQL – quick seed example

```sql
insert into public.standard_icons (standard_name, image_url)
values
('EN 388', 'https://<your-public-url>/ppehub/standard-icons/en388.png'),
('EN 407', 'https://<your-public-url>/ppehub/standard-icons/en407.png');
```

#### Acceptance checklist (icons)
1) New table created and filled with at least one icon.
2) Admin can upload an icon for a section OR select an existing one.
3) Saving persists `icon_url`/`standard_icon_id`.
4) Icon renders before the section title on both listing blocks and the section page.
5) Hover/focus states remain accessible and legible in dark/light themes.


### Rollback
- Safe to revert UI changes; DB column can remain unused or be dropped via `alter table public.ppe_sections drop column extra_images;` if needed.


