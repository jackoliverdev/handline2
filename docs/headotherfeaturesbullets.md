## Head – Additional features sections (plan)

Goal: In the Features tab for Head products, add two new bullet-list sections mirroring the Eye & Face pattern:
- Other details (bullet list)
- Equipment (bullet list)

Keep the existing order:
1) Comfort features (already implemented)
2) Safety features (existing generic features list renamed for Head)
3) Other details (new)
4) Equipment (new)

---

### Data model (DB)
Add two JSONB locale columns with EN/IT arrays. These mirror `eye_face_comfort_features_locales` and `eye_face_equipment_locales` used in Eye & Face.

```sql
alter table public.products
  add column if not exists head_other_details_locales jsonb not null default '{}'::jsonb,
  add column if not exists head_equipment_locales jsonb not null default '{}'::jsonb;

create index if not exists products_head_other_details_gin on public.products using gin (head_other_details_locales);
create index if not exists products_head_equipment_gin on public.products using gin (head_equipment_locales);
```

Optional backfill helpers if desired (seed with existing `features_locales` just for testing):

```sql
update public.products p
set head_other_details_locales = jsonb_build_object(
      'en', coalesce((p.features_locales->'en')::jsonb, '[]'::jsonb),
      'it', coalesce((p.features_locales->'it')::jsonb, '[]'::jsonb)
    )
where lower(coalesce(p.category,'')) like '%head%'
   or lower(coalesce(p.sub_category,'')) like '%helmet%'
   or lower(coalesce(p.sub_category,'')) like '%bump%';

update public.products p
set head_equipment_locales = jsonb_build_object(
      'en', '[]'::jsonb,
      'it', '[]'::jsonb
    )
where lower(coalesce(p.category,'')) like '%head%'
   or lower(coalesce(p.sub_category,'')) like '%helmet%'
   or lower(coalesce(p.sub_category,'')) like '%bump%';
```

Shape:

```json
{
  "en": ["Item 1", "Item 2"],
  "it": ["Voce 1", "Voce 2"]
}
```

---

### Types (frontend)
Extend `Product` in `lib/products-service.ts`:

```ts
head_other_details_locales?: Record<string, string[]> | null;
head_equipment_locales?: Record<string, string[]> | null;
```

---

### Website – components & wiring
Create two small components cloned from `HeadComfortFeatures.tsx` with the same card style and icon/title row:

1) `components/website/products/slug/HeadOtherDetails.tsx`
- Title: `t('productPage.otherDetails')` (add i18n keys below)
- Items source: `product.head_other_details_locales?.[language] || product.head_other_details_locales?.en || []`

2) `components/website/products/slug/HeadEquipment.tsx`
- Title: `t('productPage.equipment')`
- Items source: `product.head_equipment_locales?.[language] || product.head_equipment_locales?.en || []`

Inject both into `ProductDetail.tsx` Features tab for Head products, after Safety features, in this order: Other details, then Equipment.

---

### i18n
Add (if missing) to `productPage` in both `en.json` and `it.json`:

```json
// en.json
"otherDetails": "Other details",
"equipment": "Equipment"

// it.json
"otherDetails": "Altri dettagli",
"equipment": "Attrezzatura"
```

These already include `equipment`; only `otherDetails` may need adding.

---

### Admin – create/edit UI
Extend Head → Safety & Specs in both files:
- Create state:
```ts
const [headOtherDetails, setHeadOtherDetails] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
const [headEquipment, setHeadEquipment] = useState<{ en: string[]; it: string[] }>({ en: [], it: [] });
```
- Load on Edit:
```ts
setHeadOtherDetails((product as any).head_other_details_locales || { en: [], it: [] });
setHeadEquipment((product as any).head_equipment_locales || { en: [], it: [] });
```
- Editors (use `LocaleListEditor` like Eye & Face):
```tsx
<LocaleListEditor title="Other details" items={headOtherDetails[language]}
  onAdd={(v)=> setHeadOtherDetails({ ...headOtherDetails, [language]: [...(headOtherDetails[language]||[]), v] })}
  onRemove={(i)=> setHeadOtherDetails({ ...headOtherDetails, [language]: (headOtherDetails[language]||[]).filter((_,idx)=> idx!==i) })}
/>
<LocaleListEditor title="Equipment" items={headEquipment[language]}
  onAdd={(v)=> setHeadEquipment({ ...headEquipment, [language]: [...(headEquipment[language]||[]), v] })}
  onRemove={(i)=> setHeadEquipment({ ...headEquipment, [language]: (headEquipment[language]||[]).filter((_,idx)=> idx!==i) })}
/>
```
- Save payloads:
```ts
head_other_details_locales: headOtherDetails,
head_equipment_locales: headEquipment,
```

---

### Acceptance checklist
1) DB migration applied; new columns visible.
2) Admin supports adding/removing EN/IT for both lists; values persist and reload on Edit.
3) Product detail shows two new cards for Head products under Safety features; hidden when lists are empty.
4) i18n is correct in EN/IT; Eye & Face and other categories unaffected.
5) Dark mode and responsiveness match existing card components.


