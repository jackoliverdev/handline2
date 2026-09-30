# Hand Line Language Expansion

## Commercial agreement

- Fixed price: **£500**.
- Scope: French, German and Spanish in addition to the existing English and Italian website languages.
- Any extra language, new feature, unrelated bug or change outside this brief must be agreed and priced separately before work starts.

## Agreed outcome

The public website and relevant admin content areas will support five languages:

| Code | Language |
| --- | --- |
| `en` | English — default and fallback |
| `it` | Italian |
| `fr` | French |
| `de` | German |
| `es` | Spanish |

Where a translation does not exist, the website must show the English content rather than a blank field or unavailable page.

## Features included

### 1. Website user-interface translations

- Extend the existing English/Italian language system to French, German and Spanish.
- Update language selectors so visitors can choose any of the five supported languages.
- Prepare template translation files from the existing English and Italian copy.
- Load the chosen language consistently and default to English when the saved selection is invalid or unavailable.

### 2. Admin portal language entry

Make the following existing admin content areas capable of storing and editing content in all five languages:

- Products
- Blogs
- Careers
- Industries
- PPE Hub

The declarations area is excluded from new language work because its separate, compliance-focused document-locale system already exists and Luca does not want it changed.

### 3. English fallback

- UI text falls back to English.
- Product, blog, career, industry and PPE Hub text falls back to English when its selected-language value is absent.
- The fallback must be applied to existing content, including products that have only English data while translations are being prepared.

### 4. Product documentation

For each product, technical data sheets (TDS) and manufacturer instructions will be displayed through a language dropdown:

- Show all available document languages, independent of the website language currently selected.
- Prefer the visitor's selected language if its file exists.
- Otherwise default the document selection/download to English.
- Keep the existing EU Declaration of Conformity system unchanged.

This scope supports adding document files in the five website languages. Translating, writing, designing or creating the PDF documents is Luca's responsibility unless separately agreed.

### 5. AI translation prefill

Add an optional “Generate with AI from English” prefill action for:

- Products
- Blogs
- Industries
- PPE Hub

Careers must support manual entry in five languages but AI prefill is excluded unless it proves to be no additional effort.

The action creates an editable draft only. It must never silently publish, overwrite an existing translation or replace human review.

## Luca's responsibilities

1. Supply reviewed French, German and Spanish website UI translations in the exact template format provided.
2. Preserve all translation-file keys, nesting, placeholders such as `{count}`, HTML/Markdown formatting, URLs, product codes and EN/ISO standards.
3. Provide translated TDS and manufacturer-instruction PDFs when required.
4. Obtain native-speaker review before translated content or documents are treated as approved.
5. Create an OpenAI Platform account, add pay-as-you-go credit, and supply an API key through the agreed secure method.
6. Enter, review and approve translated CMS content after the five-language admin support is deployed.

## Jack's responsibilities

1. Extend the language infrastructure and selectors from two languages to five.
2. Create and send translation templates and the content/document inventory.
3. Build English fallback behaviour.
4. Update the selected admin interfaces for the five supported languages.
5. Build the product-document language picker.
6. Implement the optional AI prefill action using Luca's OpenAI API key.
7. Validate translation-file structure, import returned UI translations and complete implementation QA.

## Immediate next actions

### Jack — prepare and send

1. `en.json` — source website UI translation file.
2. `it.json` — reference translation file.
3. New copies/templates for `fr.json`, `de.json` and `es.json`.
4. Translation instructions:
   - edit values only;
   - do not rename, delete or reorder keys;
   - preserve placeholders, technical standards, URLs, emails, product names/model numbers and formatting;
   - use concise wording where possible to minimise layout changes.
5. Product-document inventory with one row per product and columns for TDS and manufacturer instructions in EN/IT/FR/DE/ES.
6. Content-locales export for reference and future bulk translation work.

### Luca — return

1. Completed and proofread `fr.json`, `de.json` and `es.json`.
2. Product document files/links as they are translated and approved.
3. OpenAI API key supplied securely, not by email or chat.
4. Confirmation of the translation-return format before bulk content is prepared.

## Content export and return format

### Translation files

Use one JSON file per language:

- `fr.json`
- `de.json`
- `es.json`

Each must exactly match the structure of `en.json`. Jack will run a key-parity check before import.

### Database content

The content export must use one row per record/field with:

- source table;
- record ID;
- slug;
- localised field name;
- English value;
- Italian value;
- French value;
- German value;
- Spanish value.

Do not edit IDs, slugs, source-table names or field names. Luca's team should complete the target-language columns only. Complex values may appear as JSON; their internal structure must be preserved.

## Planned code changes

### Language infrastructure

- `lib/context/language-context.tsx`
  - extend the language type from `en | it` to `en | it | fr | de | es`;
  - import all five translation files;
  - centralise supported-language configuration;
  - persist the selected language consistently;
  - retain English fallback.
- Update desktop, mobile and admin language selectors to use the same supported-language configuration instead of hard-coded English/Italian controls.
- Add French, German and Spanish translation JSON files.

### Localised content and admin

- Replace English/Italian-only admin locale state with language-keyed locale records in the included admin areas.
- Ensure content services resolve selected-language content first, then English, then existing base content where appropriate.
- Keep existing English slugs and URLs; locale-specific URL routing is not included.

### Product documents

- Replace the current English/Italian document-column display condition in `components/website/products/slug/ProductDetail.tsx`.
- Store/read TDS and manufacturer-instruction files through a multi-language document structure.
- Reuse the current declaration dropdown interaction pattern where practical, without changing the declaration system itself.

### AI prefill

- Add a server-side endpoint that receives an approved source-language payload and target language.
- Use the OpenAI API key only on the server; never expose it in browser code.
- Return structured, editable fields to the relevant admin form.
- Preserve existing translations unless an editor explicitly chooses to regenerate/replace them.

## Acceptance checks

1. Visitors can switch among EN, IT, FR, DE and ES.
2. Every UI translation file has matching keys.
3. Missing UI/CMS translations display English rather than a blank value.
4. Products, blogs, careers, industries and PPE Hub content can be entered in all five languages.
5. Technical sheets and manufacturer instructions show all available languages and select the visitor language or English fallback.
6. Existing declaration downloads remain unchanged.
7. AI prefill creates editable drafts and does not overwrite content automatically.
8. Existing English/Italian pages continue to work.

## Explicit exclusions

- Translation writing, proofing, legal review and PDF production.
- New languages beyond French, German and Spanish.
- Locale-prefixed URLs, full multilingual SEO routing, hreflang/sitemap work and translated metadata beyond the existing URL structure.
- Changes to the existing declaration compliance system.
- Unrelated bug fixes or feature requests.

## Scope-change process

If Luca requests an additional language, new content area, new document workflow, different SEO route structure, expanded AI functionality or unrelated work, pause and agree a separate estimate before implementation.
