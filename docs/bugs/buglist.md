# HandLine bug tracker

Last updated: 22/07/2026

## Status summary

| ID | Issue | Priority | Status |
| --- | --- | --- | --- |
| 6 | Admin user management | High | Ready for database hardening |
| 7 | Coming Soon badge | Medium | Fixed |
| 8 | Admin portal login | High | Fixed |
| 9 | Website access blocked | Very High | External issue |
| 10 | Clothing sub-category filtering | Medium | Fixed |
| 11 | Clothing product size | Medium | Fixed |
| 12 | Clothing work-environment filtering | Medium | Fixed |
| 13 | Respiratory protection standards | Medium | Fixed |
| 14 | Clothing safety details in preview | Medium | Fixed |
| 15 | Eye-category coating filter | Medium | Fixed |
| 16 | Head-category filters | Medium | Fixed |
| 17 | Head and footwear safety standards | High | Fixed |
| 18 | Arm-protection length | Medium | Fixed |
| 19 | Arm-protection Italian translation | Medium–Low | Fixed |
| 20 | Footer sectors | Medium–Low | Fixed |

---

## 6. Admin user management

**Priority:** High  
**Status:** Ready for database hardening

**Reported issue**  
Administrators need to invite a separate user, control their access, reset their password and remove their account if necessary.

**Notes**  
Secure multi-admin management is implemented through authenticated server APIs. Administrators can invite a user, assign the Admin or User role, send password-reset emails, suspend or reactivate access, and permanently delete accounts. Role changes synchronise Firebase claims and Supabase profiles; suspension disables Firebase access and revokes refresh tokens; destructive actions protect the final remaining administrator and are audit logged.

**Manual database update required**  
Run `docs/bugs/20260722-user-management-hardening.sql` in the Supabase SQL editor. Before production use, set `NEXT_PUBLIC_SITE_URL` in the deployment environment to `https://www.handlineco.com` so invitation and password-reset links return to the live login page.

---

## 7. Coming Soon badge

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
Products marked as Coming Soon in the admin portal did not show a Coming Soon badge on the website. This prevented publishing late-stage products that are not yet available for sale.

**Notes**  
The Published toggle controls whether a product is visible on the website. Coming Soon is an availability label and does not publish a product by itself.

**Jack update**  
Following feedback, products marked as Coming Soon now show that badge instead of the automatic New badge.

---

## 8. Admin portal login

**Priority:** High  
**Status:** Fixed

**Reported issue**  
In a new browser or after logging out, visiting the admin area briefly showed the dashboard before returning to the main website. There was no clear route back to sign in.

**Notes**  
Signed-out visitors to `/admin` now go to the login page and retain their intended admin destination. Admin pages remain hidden until access is verified, logging out takes users directly to login, and signed-in users are routed by their stored role.

---

## 9. Website access blocked

**Priority:** Very High  
**Status:** External issue

**Reported issue**  
Some customers in the UK and Europe cannot access the website because their corporate security system categorises it as Miscellaneous or Unknown.

**Notes**  
The live website and the affected product URL both return HTTP 200 with valid TLS, so this is not a HandLine availability or code issue. The supplied screenshot shows a Zscaler web-filter block caused by the domain not having a recognised category in that service.

**Recommended action**  
- Ask the affected customer’s IT team to allowlist `handlineco.com` and `www.handlineco.com` for immediate access.
- Submit `https://www.handlineco.com` to Zscaler Site Review and request an appropriate business or industrial-manufacturing category.
- Zscaler’s categorisation result can only be confirmed from a customer environment that uses Zscaler.

---

## 10. Clothing sub-category filtering

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
Selecting a clothing sub-category does not filter products correctly on the website, although it works in the admin portal.

**Additional context**  
JK10 is currently the only welding product, but products appear across all clothing sub-categories.

**Notes**  
Public clothing sub-category pages now use the existing product-category mapping, so they display only the products assigned to their relevant clothing type.

---

## 11. Clothing product size

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
The size entered for a new clothing product does not appear on the published product page.

**Example**  
Article JK10.

**Notes**  
The published clothing specification now derives its display value from the saved minimum and maximum clothing sizes, for example `XS–XL`, while retaining the legacy text field as a fallback.

---

## 12. Clothing work-environment filtering

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
Using the Work Environment filter in the clothing category causes all products to disappear. Other filters work correctly.

**Notes**  
The filter now uses the correct environment-pictogram data. Work Environment controls are also available when creating and editing clothing products. Existing clothing products must have their applicable environments selected and saved before they can match the filter.

---

## 13. Respiratory protection standards

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
EN 12941 is missing and needs a text display similar to EN 166. EN 397 is also missing; no text display is required for that standard.

**Notes**  
EN 12941 is now supported in respiratory product creation and editing, product cards, preview modals, full safety details and shared standard filtering. The available class value is free text, intended for `TH1`, `TH2` or `TH3`.

The shared respiratory-standard helper now uses the current field names such as `en149` instead of obsolete underscore variants.

**Data update completed**  
`docs/bugs/20260722-backfill-kaios-en12941.sql` has been run and verified. KAIOS now has EN 12941 `TH3` and EN 143 `P3` without replacing its other standards. EN 397 was verified as already present on Thermo Boss.

---

## 14. Clothing safety details in preview

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
Clothing safety features are missing from product-list previews on the homepage. The preview in the category product grid works correctly.

**Notes**  
The homepage featured-product card now displays clothing safety standards, including high-visibility, flame, welding, arc, antistatic, chemical, weather and UV standards.

---

## 15. Eye-category coating filter

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
The coating filter does not use values from the database and filters only pre-loaded products. Other category filters work correctly.

**Notes**  
The filter now reads the localised coatings saved by the current admin form, with English and legacy-data fallbacks. Its available options and matching logic now use the same data source as the published product specification.

---

## 16. Head-category filters

**Priority:** Medium  
**Status:** Fixed

**Reported issues**  
- Brim Length is duplicated.
- The filter does not use values in all available languages.
- The EN 812 filter could not initially be selected, although it began working after other filters were selected. This behaviour could not be reproduced.

**Notes**  
Brim Length now uses the saved localised Head technical-specification value, with legacy data retained as a fallback. Values are normalised before options are generated, preventing duplicates caused by casing or whitespace. New Head products now save their technical specifications when created.

The EN 812 filter uses the same selection logic as the other Head standards and no repeatable fault was found. This should be monitored and revisited if a reproducible case is provided.

---

## 17. Head and footwear safety standards

**Priority:** High  
**Status:** Fixed

**Reported issue**  
The safety tab crashes in the admin portal for the Thermo Boss head-protection product, and the website does not show the correct safety standards.

**Related reports**  
- The same error occurs for the MACSOLE footwear product.
- The same error occurs for the 1 x-craft S3 footwear product after saving and returning to the Safety tab.

**Notes**  
The Safety editors now normalise incomplete or empty legacy locale data before rendering, preventing missing English or Italian data from crashing Head or Footwear product forms. The editors also safely handle legacy footwear standard values that are not arrays.

Public product pages now recognise category-specific safety standards, retain legacy Head technical-specification data as a fallback, and recognise metatarsal protection saved through the legacy footwear special-features field.

---

## 18. Arm-protection length

**Priority:** Medium  
**Status:** Fixed

**Reported issue**  
Length data does not appear to be pulled through or displayed on the product page.

**Notes**  
Arm Protection length is now mirrored to the shared length field whenever an Arm product is created or saved. Published Arm pages and length filters also retain the arm-specific value as a fallback for existing products.

---

## 19. Arm-protection Italian translation

**Priority:** Medium–Low  
**Status:** Fixed

**Reported issue**  
Arm-protection product specifications and attributes do not translate into Italian.

**Notes**  
Arm Protection attribute labels, Yes/No values and closure types now use the site translation system. Italian closure values are displayed as `Velcro`, `Elastico` and `Nessuno`. Arm materials also now fall back to English when an Italian value has not yet been supplied.

---

## 20. Footer sectors

**Priority:** Medium–Low  
**Status:** Fixed

**Reported issue**  
The footer’s sectors list does not include all sectors.

**Notes**  
The footer now loads and displays every industry managed in the industry database, using the active site language. New sectors added through the admin portal will appear automatically, alongside a link to the full Industries page.
