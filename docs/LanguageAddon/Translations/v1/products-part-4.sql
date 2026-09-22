-- Products locale merge from docs/LanguageAddon/Translations/Products.csv
-- Data-only UPDATE. No ALTER TABLE. No published-flag changes.
-- Part 4 of 5. Run this in the Supabase SQL editor after a backup, then run the next part.
-- Merges en/it/fr/de/es into existing JSONB locale objects.
-- Skipped: blank cells, "" placeholders, empty arrays, and empty objects.
-- Warning: the admin product editor still saves only en/it. Saving a product there will wipe fr/de/es.

BEGIN;

-- bls-411
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 411"'::jsonb,
    'it', '"BLS 411"'::jsonb,
    'fr', '"BLS 411"'::jsonb,
    'de', '"BLS 411"'::jsonb,
    'es', '"BLS 411"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit RD40-Universalanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión universal RD40 y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = '98f0e0c0-2ca7-40d0-ae05-9a4cb701c10d';

-- bls-412
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 412"'::jsonb,
    'it', '"BLS 412"'::jsonb,
    'fr', '"BLS 412"'::jsonb,
    'de', '"BLS 412"'::jsonb,
    'es', '"BLS 412"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco universale RD40 b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour Gaz et Vapeurs avec raccord universel RD40 b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit universellem RD40-b-lock-Anschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para Gases y Vapores con conexión universal RD40 b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = '5989b386-e80b-4d52-aa1c-3d36f9102836';

-- bls-413
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 413"'::jsonb,
    'it', '"BLS 413"'::jsonb,
    'fr', '"BLS 413"'::jsonb,
    'de', '"BLS 413"'::jsonb,
    'es', '"BLS 413"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit RD40-Universalanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión universal RD40 y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = '5b0231d0-5b00-4b9e-be89-a68ee6fa2444';

-- bls-414
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 414"'::jsonb,
    'it', '"BLS 414"'::jsonb,
    'fr', '"BLS 414"'::jsonb,
    'de', '"BLS 414"'::jsonb,
    'es', '"BLS 414"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit RD40-Universalanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión universal RD40 y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = 'ac2c29c8-5a77-4376-9906-8db2063a14ee';

-- bls-415
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 415"'::jsonb,
    'it', '"BLS 415"'::jsonb,
    'fr', '"BLS 415"'::jsonb,
    'de', '"BLS 415"'::jsonb,
    'es', '"BLS 415"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit RD40-Universalanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión universal RD40 y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = 'a55ed9be-cf59-4daa-b3b8-004feb998008';

-- bls-421
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 421"'::jsonb,
    'it', '"BLS 421"'::jsonb,
    'fr', '"BLS 421"'::jsonb,
    'de', '"BLS 421"'::jsonb,
    'es', '"BLS 421"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro combinato con attacco universale RD40 b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 b-lock et charbons actifs"'::jsonb,
    'de', '"Kombifilter mit universellem RD40-b-lock-Anschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = '238715b9-c13d-49e8-b9f0-645560523cc3';

-- bls-422
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 422"'::jsonb,
    'it', '"BLS 422"'::jsonb,
    'fr', '"BLS 422"'::jsonb,
    'de', '"BLS 422"'::jsonb,
    'es', '"BLS 422"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro combinato con attacco universale RD40 b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 b-lock et charbons actifs"'::jsonb,
    'de', '"Kombifilter mit universellem RD40-b-lock-Anschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = 'c736af79-7d80-4741-95ca-d16bfeb3526f';

-- bls-423
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 423"'::jsonb,
    'it', '"BLS 423"'::jsonb,
    'fr', '"BLS 423"'::jsonb,
    'de', '"BLS 423"'::jsonb,
    'es', '"BLS 423"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro combinato con attacco universale RD40 per maschere facciali integrali"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 pour masques faciaux complets"'::jsonb,
    'de', '"Kombinationsfilter mit RD40-Universalanschluss für Vollmasken"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 para máscaras faciales completas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full masks"]'::jsonb,
    'it', '["Maschere integrali"]'::jsonb,
    'fr', '["Masques intégraux"]'::jsonb,
    'de', '["Vollmasken"]'::jsonb,
    'es', '["Máscaras integrales"]'::jsonb
  )
WHERE id = 'dc88fbbd-00ca-4c5a-8ab6-f79029e46aec';

-- bls-424
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 424"'::jsonb,
    'it', '"BLS 424"'::jsonb,
    'fr', '"BLS 424"'::jsonb,
    'de', '"BLS 424"'::jsonb,
    'es', '"BLS 424"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro combinato con attacco universale RD40 per maschere facciali integrali"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 pour masques faciaux complets"'::jsonb,
    'de', '"Kombinationsfilter mit RD40-Universalanschluss für Vollmasken"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 para máscaras faciales completas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full masks"]'::jsonb,
    'it', '["Maschere integrali"]'::jsonb,
    'fr', '["Masques intégraux"]'::jsonb,
    'de', '["Vollmasken"]'::jsonb,
    'es', '["Máscaras integrales"]'::jsonb
  )
WHERE id = '35ad5070-bf2c-4fd5-a06f-d1236398ef47';

-- bls-425
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 425"'::jsonb,
    'it', '"BLS 425"'::jsonb,
    'fr', '"BLS 425"'::jsonb,
    'de', '"BLS 425"'::jsonb,
    'es', '"BLS 425"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro combinato con attacco universale RD40 per maschere facciali integrali"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 pour masques faciaux complets"'::jsonb,
    'de', '"Kombinationsfilter mit RD40-Universalanschluss für Vollmasken"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 para máscaras faciales completas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection and activated carbons."'::jsonb,
    'it', '"Filtro combinato con attacco universale RD40 per maschere facciali integrali"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 pour masques faciaux complets"'::jsonb,
    'de', '"Kombinationsfilter mit RD40-Universalanschluss für Vollmasken"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 para máscaras faciales completas"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Alluminium with plastic caps", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["Alluminio con copertura in plastica", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["Aluminium avec revêtement plastique", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["Aluminium mit Kunststoffbeschichtung", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["Aluminio con recubrimiento de plástico", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full masks"]'::jsonb,
    'it', '["Maschere integrali"]'::jsonb,
    'fr', '["Masques intégraux"]'::jsonb,
    'de', '["Vollmasken"]'::jsonb,
    'es', '["Máscaras integrales"]'::jsonb
  )
WHERE id = '1e30fd92-6bf2-41ff-b759-50c54a6ba413';

-- bls-430
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 430"'::jsonb,
    'it', '"BLS 430"'::jsonb,
    'fr', '"BLS 430"'::jsonb,
    'de', '"BLS 430"'::jsonb,
    'es', '"BLS 430"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with universal RD40 connection for full masks"'::jsonb,
    'it', '"Filtro combinato con aggancio universale RD40 per maschere facciali integrali"'::jsonb,
    'fr', '"Filtre combiné avec raccord universel RD40 pour masques faciaux intégraux"'::jsonb,
    'de', '"Kombinationsfilter mit universellem RD40-Anschluss für Vollgesichtsmasken"'::jsonb,
    'es', '"Filtro combinado con conexión universal RD40 para máscaras faciales integrales"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Aluminium with plastic caps", "Pleated fibre mesh", "Activated carbons grains"]'::jsonb,
    'it', '["Alluminio con copertura in plastica", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["Aluminium avec revêtement plastique", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["Aluminium mit Kunststoffbeschichtung", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["Aluminio con recubrimiento de plástico", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full masks"]'::jsonb,
    'it', '["Maschere integrali"]'::jsonb,
    'fr', '["Masques intégraux"]'::jsonb,
    'de', '["Vollmasken"]'::jsonb,
    'es', '["Máscaras integrales"]'::jsonb
  )
WHERE id = 'eba7e505-193a-402c-a330-8a2e4d4ad6c1';

-- bls-441
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 441"'::jsonb,
    'it', '"BLS 441"'::jsonb,
    'fr', '"BLS 441"'::jsonb,
    'de', '"BLS 441"'::jsonb,
    'es', '"BLS 441"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dust filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Polveri con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre à poussières avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Partikelfilter mit universellem RD40-Anschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para polvo con conexión universal RD40 y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dust filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Polveri con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre à poussières avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Partikelfilter mit universellem RD40-Anschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para polvo con conexión universal RD40 y carbón activo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices", "Aluminium casing to ensure mechanical and heat resistence"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria", "Contenitore in alluminio per garantire resistenza meccanica e al calore"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire", "Boîtier en aluminium pour garantir une résistance mécanique et à la chaleur"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte", "Aluminiumgehäuse für mechanische Festigkeit und Hitzebeständigkeit"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria", "Contenedor de aluminio para garantizar resistencia mecánica y al calor"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Alluminium with plastic caps", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["Alluminio con copertura in plastica", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["Aluminium avec revêtement plastique", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["Aluminium mit Kunststoffbeschichtung", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["Aluminio con recubrimiento de plástico", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full masks"]'::jsonb,
    'it', '["Maschere integrali"]'::jsonb,
    'fr', '["Masques intégraux"]'::jsonb,
    'de', '["Vollmasken"]'::jsonb,
    'es', '["Máscaras integrales"]'::jsonb
  )
WHERE id = 'ce1e8616-ccf4-4385-b1a3-6bae68f3333f';

-- bls-442
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 442"'::jsonb,
    'it', '"BLS 442"'::jsonb,
    'fr', '"BLS 442"'::jsonb,
    'de', '"BLS 442"'::jsonb,
    'es', '"BLS 442"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with universal RD40 connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco universale RD40 e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord universel RD40 et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit RD40-Universalanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión universal RD40 y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal RD40 filter"'::jsonb,
    'it', '"Filtro con aggancio universale RD40"'::jsonb,
    'fr', '"Filtre à raccord universel RD40"'::jsonb,
    'de', '"Filter mit universellem RD40-Anschluss"'::jsonb,
    'es', '"Filtro con conexión universal RD40"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters, Cartridges and accessories"'::jsonb,
    'it', '"Filtri, cartucce e accessori"'::jsonb,
    'fr', '"Filtres, cartouches et accessoires"'::jsonb,
    'de', '"Filter, Filterpatronen und Zubehör"'::jsonb,
    'es', '"Filtros, cartuchos y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Standard thread connection according to EN 148-1, universal across all respiratory protection devices", "Aluminium casing to ensure mechanical and heat resistence"]'::jsonb,
    'it', '["Connessione filettata standard secondo EN 148-1, universale per tutti i dispositivi di protezione respiratoria", "Contenitore in alluminio per garantire resistenza meccanica e al calore"]'::jsonb,
    'fr', '["Raccord fileté standard selon EN 148-1, universel pour tous les appareils de protection respiratoire", "Boîtier en aluminium pour garantir une résistance mécanique et à la chaleur"]'::jsonb,
    'de', '["Standard-Gewindeanschluss nach EN 148-1, universell für alle Atemschutzgeräte", "Aluminiumgehäuse für mechanische Festigkeit und Hitzebeständigkeit"]'::jsonb,
    'es', '["Conexión roscada estándar según la norma EN 148-1, universal para todos los equipos de protección respiratoria", "Contenedor de aluminio para garantizar resistencia mecánica y al calor"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapour, particulate, combined, etc.)"]'::jsonb,
    'it', '["L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Alluminium with plastic caps", "Pleated fiber mesh", "Activated carbons grains"]'::jsonb,
    'it', '["Alluminio con copertura in plastica", "rete a fibre plissettate", "granuli di carbone attivo"]'::jsonb,
    'fr', '["Aluminium avec revêtement plastique", "toile en fibres plissées", "granulés de charbon actif"]'::jsonb,
    'de', '["Aluminium mit Kunststoffbeschichtung", "gefaltetes Fasergewebe", "Aktivkohlegranulat"]'::jsonb,
    'es', '["Aluminio con recubrimiento de plástico", "malla de fibras plisadas", "gránulos de carbón activo"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Universal (RD40)"]'::jsonb,
    'it', '["Universal (RD40)"]'::jsonb,
    'fr', '["Universel (RD40)"]'::jsonb,
    'de', '["Universal (RD40)"]'::jsonb,
    'es', '["Universal (RD40)"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full masks"]'::jsonb,
    'it', '["Maschere integrali"]'::jsonb,
    'fr', '["Masques intégraux"]'::jsonb,
    'de', '["Vollmasken"]'::jsonb,
    'es', '["Máscaras integrales"]'::jsonb
  )
WHERE id = '24972c1c-0e10-4e97-b2dc-c3538674dfd6';

-- bls-5600
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 5600"'::jsonb,
    'it', '"BLS 5600"'::jsonb,
    'fr', '"BLS 5600"'::jsonb,
    'de', '"BLS 5600"'::jsonb,
    'es', '"BLS 5600"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full-face masks with thermoplastic rubber face seal and B-lock bayonet connection. Compatible with the BLS 200 filter range, for protection against gases/vapors and toxic particulates"'::jsonb,
    'it', '"Maschere intera con guarnizione facciale in gomma termoplastica e raccordo a baionetta b-lock. Compatibili con la gamma di filtri BLS 200, per protezione da gas/vapori e particolati tossici"'::jsonb,
    'fr', '"Masques complets avec joint facial en caoutchouc thermoplastique et raccord à baïonnette b-lock. Compatibles avec la gamme de filtres BLS 200, pour la protection contre les gaz/vapeurs et les particules toxiques"'::jsonb,
    'de', '"Vollmasken mit Gesichtsdichtung aus thermoplastischem Kautschuk und b-lock-Bajonettanschluss. Kompatibel mit der BLS 200 Filterserie, zum Schutz vor Gasen/Dämpfen und toxischen Partikeln"'::jsonb,
    'es', '"Máscaras completas con junta facial de caucho termoplástico y conexión de bayoneta b-lock. Compatibles con la gama de filtros BLS 200, para protección frente a gases/vapores y partículas tóxicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full-face mask with b-lock connection"'::jsonb,
    'it', '"Maschera intera facciale con connessione a baionetta b-lock"'::jsonb,
    'fr', '"Masque facial complet avec raccord à baïonnette b-lock"'::jsonb,
    'de', '"Vollgesichtsmaske mit b-lock-Bajonettanschluss"'::jsonb,
    'es', '"Máscara facial completa con conexión de bayoneta b-lock"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full face masks"'::jsonb,
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Scratch resistant visor (Live visor), optical class 1 (EN166)", "Wide range of spare parts to extend use and lifespan of the mask", "6-point harness for precise adjustment and pressure distribution on the face", "Anallergic", "Thermoplastic face seal for added comfort", "Anti-fog visor"]'::jsonb,
    'it', '["Visiera antigraffio (Live visor), classe ottica 1 (EN166)", "Ampia gamma di ricambi per prolungare l’uso e la durata della maschera", "Bardatura a 6 punti per una regolazione precisa e una distribuzione uniforme della pressione sul viso", "Anallergico", "Guarnizione facciale in termoplastica per maggiore comfort", "Visiera antiappannamento"]'::jsonb,
    'fr', '["Visière anti-rayures (Live visor), classe optique 1 (EN166)", "Large gamme de pièces de rechange pour prolonger l''utilisation et la durée de vie du masque", "Harnais 6 points pour un réglage précis et une répartition uniforme de la pression sur le visage", "Hypoallergénique", "Joint facial en thermoplastique pour un meilleur confort", "Visière anti-buée"]'::jsonb,
    'de', '["Kratzfestes Visier (Live Visor), optische Klasse 1 (EN166)", "Breites Ersatzteilsortiment zur Verlängerung von Nutzung und Lebensdauer der Maske", "6-Punkt-Kopfbändergeschirr für präzise Einstellung und gleichmäßige Druckverteilung im Gesicht", "Hypoallergen", "Gesichtsdichtung aus Thermoplast für mehr Komfort", "Beschlagfreies Visier"]'::jsonb,
    'es', '["Visor antirrayaduras (Live visor), clase óptica 1 (EN166)", "Amplia gama de repuestos para prolongar el uso y la vida útil de la máscara", "Arnés de 6 puntos para un ajuste preciso y una distribución uniforme de la presión en el rostro", "Hipoalergénico", "Junta facial de termoplástico para mayor comodidad", "Visor antivaho"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against aerial contaminants and particles combined with eye protection", "Application depends on the filter used (gas, vapor, particulate, combined, etc.)"]'::jsonb,
    'it', '["Protezione contro contaminanti e particelle presenti nell’aria, combinata con protezione degli occhi", "L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["Protection contre les contaminants et les particules présents dans l''air, combinée à une protection des yeux", "L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Schutz vor Schadstoffen und Partikeln in der Luft, kombiniert mit Augenschutz", "Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["Protección frente a contaminantes y partículas presentes en el aire, combinada con protección ocular", "La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["full-face mask", "B-Lock"]'::jsonb,
    'it', '["maschera intera facciale", "B-lock"]'::jsonb,
    'fr', '["masque facial intégral", "B-lock"]'::jsonb,
    'de', '["Vollgesichtsmaske", "B-Lock"]'::jsonb,
    'es', '["máscara facial completa", "B-lock"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"S - M - L"'::jsonb,
    'it', '"S - M - L"'::jsonb,
    'fr', '"S - M - L"'::jsonb,
    'de', '"S - M - L"'::jsonb,
    'es', '"S - M - L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Thermoplasticelastomer (TPE)", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Elastomero termoplastico (TPE)", "Policarbonato (PC)", "Altro"]'::jsonb,
    'fr', '["Élastomère thermoplastique (TPE)", "Polycarbonate (PC)", "Autre"]'::jsonb,
    'de', '["Thermoplastisches Elastomer (TPE)", "Polycarbonat (PC)", "Andere"]'::jsonb,
    'es', '["Elastómero termoplástico (TPE)", "Policarbonato (PC)", "Otro"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["B-Lock"]'::jsonb,
    'it', '["B-Lock"]'::jsonb,
    'fr', '["B-Lock"]'::jsonb,
    'de', '["B-Lock"]'::jsonb,
    'es', '["B-Lock"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["BLS 200 Filters", "BLS 201 Filters"]'::jsonb,
    'it', '["Filtri BLS 200", "Filtri BLS 201"]'::jsonb,
    'fr', '["Filtres BLS 200", "Filtres BLS 201"]'::jsonb,
    'de', '["BLS 200-Filter", "BLS 201-Filter"]'::jsonb,
    'es', '["Filtros BLS 200", "Filtros BLS 201"]'::jsonb
  )
WHERE id = '5d0e1e01-5fc2-45f3-a88c-f1714190a9d6';

-- bls-5700
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 5700"'::jsonb,
    'it', '"BLS 5700"'::jsonb,
    'fr', '"BLS 5700"'::jsonb,
    'de', '"BLS 5700"'::jsonb,
    'es', '"BLS 5700"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full-face masks with silicone face seal and B-lock bayonet connection. Compatible with the BLS 200 filter range, for protection against gases/vapors and toxic particulates"'::jsonb,
    'it', '"Maschere intera con guarnizione facciale in silicone e raccordo a baionetta b-lock. Compatibili con la gamma di filtri BLS 200, per protezione da gas/vapori e particolati tossici"'::jsonb,
    'fr', '"Masques complets avec joint facial en silicone et raccord à baïonnette b-lock. Compatibles avec la gamme de filtres BLS 200, pour la protection contre les gaz/vapeurs et les particules toxiques"'::jsonb,
    'de', '"Vollmasken mit Gesichtsdichtung aus Silikon und b-lock-Bajonettanschluss. Kompatibel mit der BLS 200 Filterserie, zum Schutz vor Gasen/Dämpfen und toxischen Partikeln"'::jsonb,
    'es', '"Máscaras completas con junta facial de silicona y conexión de bayoneta b-lock. Compatibles con la gama de filtros BLS 200, para protección frente a gases/vapores y partículas tóxicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full-face mask with b-lock connection"'::jsonb,
    'it', '"Maschera intera facciale con connessione a baionetta b-lock"'::jsonb,
    'fr', '"Masque facial complet avec raccord à baïonnette b-lock"'::jsonb,
    'de', '"Vollgesichtsmaske mit b-lock-Bajonettanschluss"'::jsonb,
    'es', '"Máscara facial completa con conexión de bayoneta b-lock"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full face masks"'::jsonb,
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Scratch resistant visor (Live visor), optical class 1 (EN166)", "Wide range of spare parts to extend use and lifespan of the mask", "6-point harness for precise adjustment and pressure distribution on the face", "Anallergic", "Silicone face seal for added comfort", "Available in three sizes", "Anti-fog visor", "Transmission of vocal sound with aluminium layer inside the breathing unit"]'::jsonb,
    'it', '["Visiera antigraffio (Live visor), classe ottica 1 (EN166)", "Ampia gamma di ricambi per prolungare l’uso e la durata della maschera", "Bardatura a 6 punti per una regolazione precisa e una distribuzione uniforme della pressione sul viso", "Anallergico", "Guarnizione facciale in silicone per maggiore comfort", "Disponibile in tre misure", "Visiera antiappannamento", "Trasmissione del suono vocale con strato di alluminio all’interno dell’unità respiratoria"]'::jsonb,
    'fr', '["Visière anti-rayures (Live visor), classe optique 1 (EN166)", "Large gamme de pièces de rechange pour prolonger l''utilisation et la durée de vie du masque", "Harnais 6 points pour un réglage précis et une répartition uniforme de la pression sur le visage", "Hypoallergénique", "Joint facial en silicone pour un meilleur confort", "Disponible en trois tailles", "Visière anti-buée", "Transmission de la voix grâce à une couche d''aluminium à l''intérieur de l''unité respiratoire"]'::jsonb,
    'de', '["Kratzfestes Visier (Live Visor), optische Klasse 1 (EN166)", "Breites Ersatzteilsortiment zur Verlängerung von Nutzung und Lebensdauer der Maske", "6-Punkt-Kopfbändergeschirr für präzise Einstellung und gleichmäßige Druckverteilung im Gesicht", "Hypoallergen", "Gesichtsdichtung aus Silikon für mehr Komfort", "Erhältlich in drei Größen", "Beschlagfreies Visier", "Sprachübertragung durch eine Aluminiumschicht im Inneren der Atemschutzeinheit"]'::jsonb,
    'es', '["Visor antirrayaduras (Live visor), clase óptica 1 (EN166)", "Amplia gama de repuestos para prolongar el uso y la vida útil de la máscara", "Arnés de 6 puntos para un ajuste preciso y una distribución uniforme de la presión en el rostro", "Hipoalergénico", "Junta facial de silicona para mayor comodidad", "Disponible en tres tallas", "Visor antivaho", "Transmisión de la voz mediante una capa de aluminio en el interior de la unidad respiratoria"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against aerial contaminants and particles combined with eye protection", "Application depends on the filter used (gas, vapor, particulate, combined, etc.)"]'::jsonb,
    'it', '["Protezione contro contaminanti e particelle presenti nell’aria, combinata con protezione degli occhi", "L’applicazione dipende dal filtro utilizzato (gas, vapori, particolato, combinato, ecc.)"]'::jsonb,
    'fr', '["Protection contre les contaminants et les particules présents dans l''air, combinée à une protection des yeux", "L’application dépend du filtre utilisé (gaz, vapeurs, particules, combiné, etc.)"]'::jsonb,
    'de', '["Schutz vor Schadstoffen und Partikeln in der Luft, kombiniert mit Augenschutz", "Die Anwendung hängt vom verwendeten Filter ab (Gas, Dämpfe, Partikel, kombiniert usw.)"]'::jsonb,
    'es', '["Protección frente a contaminantes y partículas presentes en el aire, combinada con protección ocular", "La aplicación depende del filtro utilizado (gases, vapores, partículas, combinado, etc.)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["full-face mask", "B-Lock"]'::jsonb,
    'it', '["maschera intera facciale", "B-lock"]'::jsonb,
    'fr', '["masque facial intégral", "B-lock"]'::jsonb,
    'de', '["Vollgesichtsmaske", "B-Lock"]'::jsonb,
    'es', '["máscara facial completa", "B-lock"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Silicone", "Policarbonato (PC)", "Altro"]'::jsonb,
    'fr', '["Silicone", "Polycarbonate (PC)", "Autre"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "Andere"]'::jsonb,
    'es', '["Silicona", "Policarbonato (PC)", "Otro"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["B-Lock"]'::jsonb,
    'it', '["B-Lock"]'::jsonb,
    'fr', '["B-Lock"]'::jsonb,
    'de', '["B-Lock"]'::jsonb,
    'es', '["B-Lock"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["BLS 200 Filters", "BLS 201 Filters"]'::jsonb,
    'it', '["Filtri BLS 200", "Filtri BLS 201"]'::jsonb,
    'fr', '["Filtres BLS 200", "Filtres BLS 201"]'::jsonb,
    'de', '["BLS 200-Filter", "BLS 201-Filter"]'::jsonb,
    'es', '["Filtros BLS 200", "Filtros BLS 201"]'::jsonb
  )
WHERE id = '8a464614-1343-4b2f-a728-2416d196cffc';

-- bls-680next
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 680next"'::jsonb,
    'fr', '"BLS 680next"'::jsonb,
    'de', '"BLS 680next"'::jsonb,
    'es', '"BLS 680next"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP2 three-flap flat filtering disposable mask"'::jsonb,
    'fr', '"Masque filtrant jetable plat FFP2 à trois volets"'::jsonb,
    'de', '"FFP2 Flachfaltmaske, Einweg, mit drei Klappen"'::jsonb,
    'es', '"Mascarilla filtrante desechable plana FFP2 de tres pliegues"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"S - M/L"'::jsonb,
    'fr', '"S - M/L"'::jsonb,
    'de', '"S - M/L"'::jsonb,
    'es', '"S - M/L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ELASTICS: synthetic polysoprene", "NOSE CLIP: PP reinforced with metal", "GASKET: PE", "FILTERS: PP"]'::jsonb
  )
WHERE id = 'b60c1fad-532e-4bfb-af0c-e6a0bc363f98';

-- bls-zer032-active
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS Zer032 Active"'::jsonb,
    'it', '"BLS Zer032 Active"'::jsonb,
    'fr', '"BLS Zer032 Active"'::jsonb,
    'de', '"BLS Zer032 Active"'::jsonb,
    'es', '"BLS Zer032 Active"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP3 cup shaped filtering facepieces with Active Shield electronic valve"'::jsonb,
    'it', '"Facciali filtranti FFP3 a coppa con valvola elettronica Active Shield"'::jsonb,
    'fr', '"Masques filtrants FFP3 en forme de coque avec valve électronique Active Shield"'::jsonb,
    'de', '"FFP3-Formmasken (Schalenform) mit elektronischem Active Shield-Ventil"'::jsonb,
    'es', '"Mascarillas autofiltrantes FFP3 con forma de copa y válvula electrónica Active Shield"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP3 cup shaped filtering facepieces with Active Shield electronic valve"'::jsonb,
    'it', '"Facciali filtranti FFP3 a coppa con valvola elettronica Active Shield"'::jsonb,
    'fr', '"Masques filtrants FFP3 en forme de coque avec valve électronique Active Shield"'::jsonb,
    'de', '"FFP3-Formmasken (Schalenform) mit elektronischem Active Shield-Ventil"'::jsonb,
    'es', '"Mascarillas autofiltrantes FFP3 con forma de copa y válvula electrónica Active Shield"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Disposable masks"'::jsonb,
    'it', '"Mascherine monouso"'::jsonb,
    'fr', '"Masques jetables"'::jsonb,
    'de', '"Einwegmasken"'::jsonb,
    'es', '"Mascarillas desechables"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Smart breathing valve (Narvalo Active Shield) with adaptive fan to enhance comfort and lithium battery", "External protective layer against dirt, dust, and liquids", "Nano filtration (tested down to 0.001 micron)", "Usage and safety monitoring via IoT", "Anatomical mask", "High comfort thanks to soft gasket ensuring fit on all face shapes", "Internal nose clip", "Adjustable straps"]'::jsonb,
    'it', '["Valvola di respirazione intelligente (Narvalo Active Shield) con ventola adattiva che incrementa il comfort e batteria al litio", "Strato protettivo esterno di protezione verso sporco, polveri e liquidi", "Nano filtrazione (testato fino 0.001 micron)", "Monitoraggio uso e sicurezza tramite IoT", "Mascherina anatomica", "Elevato comfort grazie a guarnizione morbida che garantisce fit su tutti i volti", "Barretta stringinaso interna", "Elastici regolabili"]'::jsonb,
    'fr', '["Valve respiratoire intelligente (Narvalo Active Shield) avec ventilateur adaptatif qui augmente le confort et batterie au lithium", "Couche de protection extérieure contre la saleté, la poussière et les liquides", "Nano-filtration (testée jusqu''à 0,001 micron)", "Suivi de l''utilisation et de la sécurité via IoT", "Masque anatomique", "Grand confort grâce à un joint souple garantissant un ajustement sur tous les visages", "Barrette pince-nez interne", "Élastiques réglables"]'::jsonb,
    'de', '["Intelligentes Atemventil (Narvalo Active Shield) mit adaptivem Gebläse, das den Komfort erhöht, und Lithiumbatterie", "Äußere Schutzschicht gegen Schmutz, Staub und Flüssigkeiten", "Nanofiltration (getestet bis 0,001 Mikron)", "Nutzungs- und Sicherheitsüberwachung über IoT", "Anatomische Maske", "Hoher Tragekomfort dank weicher Dichtung, die auf allen Gesichtsformen passt", "Innenliegender Nasenbügel", "Verstellbare Gummibänder"]'::jsonb,
    'es', '["Válvula de respiración inteligente (Narvalo Active Shield) con ventilador adaptativo que aumenta la comodidad y batería de litio", "Capa protectora exterior contra suciedad, polvo y líquidos", "Nanofiltración (probada hasta 0,001 micras)", "Monitorización de uso y seguridad mediante IoT", "Mascarilla anatómica", "Alto confort gracias a una junta suave que garantiza un ajuste en todo tipo de rostros", "Barra de ajuste nasal interna", "Elásticos ajustables"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against medicines and active pharmaceutical ingredients in pharmaceutical and laboratory environments", "Protection against dusts and particles in construction", "Protection during sanding activities", "Protection against emulsions of fertilizers or other chemical or biological agents"]'::jsonb,
    'it', '["Protezione da medicinali e principi attivi in farmaceutico e laboratori", "Protezione da polveri e particelle in edilizia", "Protezione durante attivita'' di carteggiatura", "Protezione da emulsioni di fertilizzanti o altri agenti chimici o biologici"]'::jsonb,
    'fr', '["Protection contre les médicaments et les principes actifs dans l''industrie pharmaceutique et les laboratoires", "Protection contre les poussières et particules dans la construction", "Protection pendant les activités de ponçage", "Protection contre les émulsions d''engrais ou d''autres agents chimiques ou biologiques"]'::jsonb,
    'de', '["Schutz vor Arzneimitteln und Wirkstoffen in der pharmazeutischen Industrie und in Laboren", "Schutz vor Staub und Partikeln im Bauwesen", "Schutz bei Schleifarbeiten", "Schutz vor Düngemittelemulsionen oder anderen chemischen oder biologischen Wirkstoffen"]'::jsonb,
    'es', '["Protección frente a medicamentos y principios activos en la industria farmacéutica y laboratorios", "Protección frente a polvo y partículas en la construcción", "Protección durante las actividades de lijado", "Protección frente a emulsiones de fertilizantes u otros agentes químicos o biológicos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Pharmaceutical", "research", "construction", "automotive", "manufacturing", "agriculture"]'::jsonb,
    'it', '["Farmaceutico", "ricerca", "edilizio", "automobilistico", "manufatturiero", "agricolo"]'::jsonb,
    'fr', '["Pharmaceutique", "recherche", "du bâtiment", "automobile", "manufacturier", "agricole"]'::jsonb,
    'de', '["Pharmazeutisch", "Forschung", "Bau-", "Automobilbranche", "verarbeitendes Gewerbe", "landwirtschaftlich"]'::jsonb,
    'es', '["Farmacéutico", "investigación", "de la construcción", "automotriz", "manufacturero", "agrícola"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["disposable mask", "smart", "IoT", "FFP3"]'::jsonb,
    'it', '["mascherina monouso", "smart", "IoT", "FFP3"]'::jsonb,
    'fr', '["masque jetable", "smart", "IoT", "FFP3"]'::jsonb,
    'de', '["Einwegmaske", "smart", "IoT", "FFP3"]'::jsonb,
    'es', '["mascarilla desechable", "inteligente", "IoT", "FFP3"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Polypropylene (PP)", "Polyethylene (PE)", "Other"]'::jsonb,
    'it', '["Polipropilene (PP)", "Polietilene (PE)", "Altro"]'::jsonb,
    'fr', '["Polypropylène (PP)", "Polyéthylène (PE)", "Autre"]'::jsonb,
    'de', '["Polypropylen (PP)", "Polyethylen (PE)", "Andere"]'::jsonb,
    'es', '["Polipropileno (PP)", "Polietileno (PE)", "Otro"]'::jsonb
  )
WHERE id = '1710d73c-769c-43fe-bc0e-afcecf8f386a';

-- bls-zer032-c-active
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS Zer032 C Active"'::jsonb,
    'it', '"BLS Zer032 C Active"'::jsonb,
    'fr', '"BLS Zer032 C Active"'::jsonb,
    'de', '"BLS Zer032 C Active"'::jsonb,
    'es', '"BLS Zer032 C Active"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP3 cup shaped filtering facepieces with Active Shield electronic valve and active carbon layer"'::jsonb,
    'it', '"Facciali filtranti FFP3 a coppa con valvola elettronica Active Shield e strato di Carboni Attivi"'::jsonb,
    'fr', '"Masques filtrants FFP3 en coque avec valve électronique Active Shield et couche de charbons actifs"'::jsonb,
    'de', '"FFP3-Formmasken mit elektronischem Active Shield-Ventil und Aktivkohleschicht"'::jsonb,
    'es', '"Mascarillas filtrantes FFP3 de copa con válvula electrónica Active Shield y capa de carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP3 cup shaped filtering facepieces with Active Shield electronic valve"'::jsonb,
    'it', '"Facciali filtranti FFP3 a coppa con valvola elettronica Active Shield"'::jsonb,
    'fr', '"Masques filtrants FFP3 en forme de coque avec valve électronique Active Shield"'::jsonb,
    'de', '"FFP3-Formmasken (Schalenform) mit elektronischem Active Shield-Ventil"'::jsonb,
    'es', '"Mascarillas autofiltrantes FFP3 con forma de copa y válvula electrónica Active Shield"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory protection"'::jsonb,
    'it', '"Protezione vie respiratorie"'::jsonb,
    'fr', '"Protection des voies respiratoires"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección de las vías respiratorias"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Disposable masks"'::jsonb,
    'it', '"Mascherine monouso"'::jsonb,
    'fr', '"Masques jetables"'::jsonb,
    'de', '"Einwegmasken"'::jsonb,
    'es', '"Mascarillas desechables"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Smart breathing valve (Narvalo Active Shield) with adaptive fan to enhance comfort and lithium battery. Usage and safety monitoring via IoT.", "Activated carbon layer to remove unpleasant odours", "External protective layer against dirt, dust, and liquids", "Nano filtration (tested down to 0.001 micron)", "Anatomical mask", "High comfort thanks to soft gasket ensuring fit on all face shapes", "Internal nose clip", "Adjustable straps"]'::jsonb,
    'it', '["Valvola di respirazione intelligente (Narvalo Active Shield) con ventola adattiva che incrementa il comfort e batteria al litio. Monitoraggio uso e sicurezza tramite IoT.", "Strato di carbone attivo per rimuovere odori fastidiosi", "Strato protettivo esterno di protezione verso sporco, polveri e liquidi", "Nano filtrazione (testato fino 0.001 micron)", "Mascherina anatomica", "Elevato comfort grazie a guarnizione morbida che garantisce fit su tutti i volti", "Barretta stringinaso interna", "Elastici regolabili"]'::jsonb,
    'fr', '["Valve respiratoire intelligente (Narvalo Active Shield) avec ventilateur adaptatif qui augmente le confort et batterie au lithium. Suivi de l''utilisation et de la sécurité via IoT.", "Couche de charbon actif pour éliminer les odeurs désagréables", "Couche de protection extérieure contre la saleté, la poussière et les liquides", "Nano-filtration (testée jusqu''à 0,001 micron)", "Masque anatomique", "Grand confort grâce à un joint souple garantissant un ajustement sur tous les visages", "Barrette pince-nez interne", "Élastiques réglables"]'::jsonb,
    'de', '["Intelligentes Atemventil (Narvalo Active Shield) mit adaptivem Gebläse, das den Komfort erhöht, und Lithiumbatterie. Nutzungs- und Sicherheitsüberwachung über IoT.", "Aktivkohleschicht zur Beseitigung unangenehmer Gerüche", "Äußere Schutzschicht gegen Schmutz, Staub und Flüssigkeiten", "Nanofiltration (getestet bis 0,001 Mikron)", "Anatomische Maske", "Hoher Tragekomfort dank weicher Dichtung, die auf allen Gesichtsformen passt", "Innenliegender Nasenbügel", "Verstellbare Gummibänder"]'::jsonb,
    'es', '["Válvula de respiración inteligente (Narvalo Active Shield) con ventilador adaptativo que aumenta la comodidad y batería de litio. Monitorización de uso y seguridad mediante IoT.", "Capa de carbón activo para eliminar olores molestos", "Capa protectora exterior contra suciedad, polvo y líquidos", "Nanofiltración (probada hasta 0,001 micras)", "Mascarilla anatómica", "Alto confort gracias a una junta suave que garantiza un ajuste en todo tipo de rostros", "Barra de ajuste nasal interna", "Elásticos ajustables"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against medicines and active pharmaceutical ingredients in pharmaceutical and laboratory environments", "Protection against dusts and particles in construction", "Protection during sanding activities", "Protection against emulsions of fertilizers or other chemical or biological agents"]'::jsonb,
    'it', '["Protezione da medicinali e principi attivi in farmaceutico e laboratori", "Protezione da polveri e particelle in edilizia", "Protezione durante attivita'' di carteggiatura", "Protezione da emulsioni di fertilizzanti o altri agenti chimici o biologici"]'::jsonb,
    'fr', '["Protection contre les médicaments et les principes actifs dans l''industrie pharmaceutique et les laboratoires", "Protection contre les poussières et particules dans la construction", "Protection pendant les activités de ponçage", "Protection contre les émulsions d''engrais ou d''autres agents chimiques ou biologiques"]'::jsonb,
    'de', '["Schutz vor Arzneimitteln und Wirkstoffen in der pharmazeutischen Industrie und in Laboren", "Schutz vor Staub und Partikeln im Bauwesen", "Schutz bei Schleifarbeiten", "Schutz vor Düngemittelemulsionen oder anderen chemischen oder biologischen Wirkstoffen"]'::jsonb,
    'es', '["Protección frente a medicamentos y principios activos en la industria farmacéutica y laboratorios", "Protección frente a polvo y partículas en la construcción", "Protección durante las actividades de lijado", "Protección frente a emulsiones de fertilizantes u otros agentes químicos o biológicos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Pharmaceutical", "research", "construction", "automotive", "manufacturing", "agriculture"]'::jsonb,
    'it', '["Farmaceutico", "ricerca", "edilizio", "automobilistico", "manufatturiero", "agricolo"]'::jsonb,
    'fr', '["Pharmaceutique", "recherche", "du bâtiment", "automobile", "manufacturier", "agricole"]'::jsonb,
    'de', '["Pharmazeutisch", "Forschung", "Bau-", "Automobilbranche", "verarbeitendes Gewerbe", "landwirtschaftlich"]'::jsonb,
    'es', '["Farmacéutico", "investigación", "de la construcción", "automotriz", "manufacturero", "agrícola"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["disposable mask", "smart", "IoT", "FFP3"]'::jsonb,
    'it', '["mascherina monouso", "smart", "IoT", "FFP3"]'::jsonb,
    'fr', '["masque jetable", "smart", "IoT", "FFP3"]'::jsonb,
    'de', '["Einwegmaske", "smart", "IoT", "FFP3"]'::jsonb,
    'es', '["mascarilla desechable", "inteligente", "IoT", "FFP3"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Polypropylene (PP)", "Polyethylene (PE)", "Other"]'::jsonb,
    'it', '["Polipropilene (PP)", "Polietilene (PE)", "Altro"]'::jsonb,
    'fr', '["Polypropylène (PP)", "Polyéthylène (PE)", "Autre"]'::jsonb,
    'de', '["Polypropylen (PP)", "Polyethylen (PE)", "Andere"]'::jsonb,
    'es', '["Polipropileno (PP)", "Polietileno (PE)", "Otro"]'::jsonb
  )
WHERE id = '8fd49263-957a-4b5d-bfd0-3528b89c381c';

-- c500
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"C500"'::jsonb,
    'fr', '"C500"'::jsonb,
    'de', '"C500"'::jsonb,
    'es', '"C500"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant sleeve for arm protection. Cut protection fibre on the outside and bamboo comfort fibre on the inside, to give excellent comfort and climate characteristics and extremely good cut protection"'::jsonb,
    'fr', '"Manchon anticoupure pour la protection du bras. Fibre anticoupure à l''extérieur et fibre de bambou pour le confort à l''intérieur, offrant un excellent confort, de bonnes propriétés climatiques et une protection anticoupure extrêmement élevée"'::jsonb,
    'de', '"Schnittschutzärmel zum Schutz des Arms. Schnittschutzfaser außen und komfortable Bambusfaser innen, für hervorragenden Komfort, gute Klimaeigenschaften und extrem guten Schnittschutz"'::jsonb,
    'es', '"Manguito anticorte para protección del brazo. Fibra anticorte en el exterior y fibra de bambú confortable en el interior, que proporciona un excelente confort y propiedades climáticas, además de una protección anticorte extremadamente alta"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lower arm protection with good cut protection"'::jsonb,
    'fr', '"Protection de l''avant-bras avec une bonne résistance à la coupure"'::jsonb,
    'de', '"Unterarmschutz mit gutem Schnittschutz"'::jsonb,
    'es', '"Protección del antebrazo con buena resistencia al corte"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Arm protection"'::jsonb,
    'it', '"Protezione braccia"'::jsonb,
    'fr', '"Protection des bras"'::jsonb,
    'de', '"Armschutz"'::jsonb,
    'es', '"Protección de los brazos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant sleeves"'::jsonb,
    'fr', '"Manches anticoupure"'::jsonb,
    'de', '"Schnittschutzärmel"'::jsonb,
    'es', '"Mangas anticorte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Very good breathability", "Long service life", "Cut protection level 5/C"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["arm protection with medium cut risks", "Suitable for dry and slightly damp work environments"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"M, L"'::jsonb,
    'fr', '"M, L"'::jsonb,
    'de', '"M, L"'::jsonb,
    'es', '"M, L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Bamboo viscose", "Fibreglass", "HPPE"]'::jsonb
  )
WHERE id = '76ad7afe-9d46-4a8e-a13d-1f6a36c4619a';

-- ear-plugs
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ear Plugs"'::jsonb,
    'it', '"Tappi auricolari"'::jsonb,
    'fr', '"Bouchons d''oreilles"'::jsonb,
    'de', '"Gehörschutzstöpsel"'::jsonb,
    'es', '"Tapones para los oídos"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Preformed, single-use protective earplugs with ergonomic design provide very high levels of noise isolation, suitable for high-noise environments. Made from soft expanded polyurethane foam for exceptional comfort during extended use."'::jsonb,
    'it', '"Tappi auricolari protettivi monouso preformati dal design ergonomico offrono livelli molto alti di isolamento, adatti per ambienti con elevata rumorosità. Realizzati in morbida schiuma espansa di poliuretano, offrono comfort straordinario anche in caso di uso prolungato."'::jsonb,
    'fr', '"Les bouchons d''oreilles de protection à usage unique préformés, au design ergonomique, offrent des niveaux d''isolation très élevés, adaptés aux environnements à forte nuisance sonore. Réalisés en mousse de polyuréthane souple, ils offrent un confort exceptionnel même en cas d''utilisation prolongée."'::jsonb,
    'de', '"Die vorgeformten Einweg-Gehörschutzstöpsel mit ergonomischem Design bieten ein sehr hohes Maß an Schalldämmung und eignen sich für Umgebungen mit hoher Lärmbelastung. Sie bestehen aus weichem Polyurethan-Schaumstoff und bieten auch bei längerem Gebrauch außergewöhnlichen Komfort."'::jsonb,
    'es', '"Los tapones auriculares de protección desechables, preformados y de diseño ergonómico, ofrecen niveles muy altos de aislamiento, adecuados para entornos con alto nivel de ruido. Fabricados en espuma blanda de poliuretano expandido, ofrecen una comodidad extraordinaria incluso en caso de uso prolongado."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Disposable protective ear plugs"'::jsonb,
    'it', '"Tappi auricolari protettivi monouso"'::jsonb,
    'fr', '"Bouchons d''oreilles de protection à usage unique"'::jsonb,
    'de', '"Einweg-Gehörschutzstöpsel"'::jsonb,
    'es', '"Tapones auriculares de protección desechables"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hearing protection"'::jsonb,
    'it', '"Protezione uditiva"'::jsonb,
    'fr', '"Protection auditive"'::jsonb,
    'de', '"Gehörschutz"'::jsonb,
    'es', '"Protección auditiva"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ear plugs"'::jsonb,
    'it', '"Tappi per le orecchie"'::jsonb,
    'fr', '"Bouchons d''oreilles"'::jsonb,
    'de', '"Ohrstöpsel"'::jsonb,
    'es', '"Tapones para los oídos"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Noise attenuation of 37 dB (H:36, M:35, L:34)", "Compliant with EN 352-2 and additional requirements (S,V,W,E1)", "Bright lime colour improves visibility in production areas", "Sealed surface prevents ingress of foreign bodies"]'::jsonb,
    'it', '["Attenuazione del rumore di 37 dB (H:36, M:35, L:34)", "Conforme a EN 352-2 e requisiti aggiuntivi (S,V,W,E1)", "Colore lime brillante migliora la visibilità nelle aree di produzione", "Superficie sigillata previene l''ingresso di corpi estranei"]'::jsonb,
    'fr', '["Atténuation du bruit de 37 dB (H:36, M:35, L:34)", "Conforme à la norme EN 352-2 et aux exigences supplémentaires (S,V,W,E1)", "La couleur vert citron vif améliore la visibilité dans les zones de production", "La surface scellée empêche la pénétration de corps étrangers"]'::jsonb,
    'de', '["Geräuschdämmung von 37 dB (H:36, M:35, L:34)", "Konform mit EN 352-2 und zusätzlichen Anforderungen (S,V,W,E1)", "Leuchtend limettengrüne Farbe verbessert die Sichtbarkeit in Produktionsbereichen", "Die versiegelte Oberfläche verhindert das Eindringen von Fremdkörpern"]'::jsonb,
    'es', '["Atenuación del ruido de 37 dB (H:36, M:35, L:34)", "Conforme a la norma EN 352-2 y a los requisitos adicionales (S,V,W,E1)", "El color lima brillante mejora la visibilidad en las áreas de producción", "La superficie sellada evita la entrada de cuerpos extraños"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Best suited for very loud environments"]'::jsonb,
    'it', '["Indicato per ambienti molto rumorosi"]'::jsonb,
    'fr', '["Indiqué pour les environnements très bruyants"]'::jsonb,
    'de', '["Geeignet für sehr laute Umgebungen"]'::jsonb,
    'es', '["Indicado para entornos muy ruidosos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Automotive", "Assembly"]'::jsonb,
    'it', '["Produzione vetro", "Produzione acciaio", "Automotive", "Assemblaggio"]'::jsonb,
    'fr', '["Production de verre", "Production d''acier", "Automobile", "Assemblage"]'::jsonb,
    'de', '["Glasproduktion", "Stahlproduktion", "Automobilindustrie", "Montage"]'::jsonb,
    'es', '["Producción de vidrio", "Producción de acero", "Automoción", "Ensamblaje"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["single use ear plugs"]'::jsonb,
    'it', '["monouso", "tappi auricolari"]'::jsonb,
    'fr', '["jetable", "bouchons d''oreilles"]'::jsonb,
    'de', '["Einweg-", "Gehörschutzstöpsel"]'::jsonb,
    'es', '["desechable", "tapones auditivos"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"M"'::jsonb,
    'it', '"M"'::jsonb,
    'fr', '"M"'::jsonb,
    'de', '"M"'::jsonb,
    'es', '"M"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["PU"]'::jsonb,
    'it', '["PU"]'::jsonb,
    'fr', '["PU"]'::jsonb,
    'de', '["PU"]'::jsonb,
    'es', '["PU"]'::jsonb
  ),
  hearing_comfort_features_locales = COALESCE(hearing_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  hearing_other_details_locales = COALESCE(hearing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  hearing_equipment_locales = COALESCE(hearing_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  )
WHERE id = '59b938cb-6d1f-4aef-9aab-7d8afcb53f97';

-- gw7500acsc5
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"GW7500ACSC5"'::jsonb,
    'it', '"GW7500ACSC5"'::jsonb,
    'fr', '"GW7500ACSC5"'::jsonb,
    'de', '"GW7500ACSC5"'::jsonb,
    'es', '"GW7500ACSC5"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"“Cut- and heat-resistant glove in flame-retardant cowhide; split-leather palm, aluminized back, fully lined with Kevlar® knit.”"'::jsonb,
    'it', '"Guanto antitaglio in pelle bovina ignifugo anticalore, palmo in crosta, dorso alluminizzato, totalmente foderato in maglia Kevlar®."'::jsonb,
    'fr', '"Gant anticoupure en cuir bovin ignifuge et anti-chaleur, paume en croûte de cuir, dos aluminisé, entièrement doublé de tricot Kevlar®."'::jsonb,
    'de', '"Schnittschutzhandschuh aus flammhemmendem, hitzebeständigem Rindsleder, Handfläche aus Spaltleder, aluminisierter Handrücken, vollständig mit Kevlar®-Gestrick gefüttert."'::jsonb,
    'es', '"Guante anticorte en cuero bovino ignífugo resistente al calor, palma en serraje, dorso aluminizado, totalmente forrado con malla de Kevlar®."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-retardant cowhide leather cut-&-heat glove with aluminized back and Kevlar® lining"'::jsonb,
    'it', '"Guanto antitaglio e termico in pelle bovina ignifugo con dorso alluminizzato e fodera Kevlar."'::jsonb,
    'fr', '"Gant anticoupure et thermique en cuir bovin ignifuge avec dos aluminisé et doublure Kevlar."'::jsonb,
    'de', '"Schnittschutz- und Hitzeschutzhandschuh aus flammhemmendem Rindsleder mit aluminisiertem Handrücken und Kevlar-Futter."'::jsonb,
    'es', '"Guante anticorte y térmico en cuero bovino ignífugo con dorso aluminizado y forro de Kevlar."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welding gloves"'::jsonb,
    'it', '"Guanti per saldatura"'::jsonb,
    'fr', '"Gants de soudage"'::jsonb,
    'de', '"Schweißerhandschuhe"'::jsonb,
    'es', '"Guantes de soldadura"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["High flame-resistance", "High molten-metal splash protection", "High abrasion resistance", "Excellent tear resistance"]'::jsonb,
    'it', '["Elevata resistenza all’infiammabilità", "Elevata protezione da spruzzi metallo fuso", "Elevata resistenza all’abrasione", "Elevata resistenza strappo"]'::jsonb,
    'fr', '["Haute résistance à l’inflammabilité", "Protection élevée contre les projections de métal en fusion", "Résistance élevée à l''abrasion", "Résistance élevée à la déchirure"]'::jsonb,
    'de', '["Hohe Beständigkeit gegen Entflammbarkeit", "Hoher Schutz vor Spritzern von geschmolzenem Metall", "Hohe Abriebfestigkeit", "Hohe Weiterreißfestigkeit"]'::jsonb,
    'es', '["Alta resistencia a la inflamabilidad", "Alta protección frente a salpicaduras de metal fundido", "Alta resistencia a la abrasión", "Alta resistencia al desgarro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heavy-metal welding", "Handling of slags & molten-metal splashes", "Heavy-duty operations", "Maintenance in thermo-mechanical risk environments"]'::jsonb,
    'it', '["Saldatura di metalli pesanti", "Movimentazione di scorie e spruzzi di metallo fuso", "Lavorazioni gravose", "Manutenzione in ambienti a rischio termico e meccanico"]'::jsonb,
    'fr', '["Soudage de métaux lourds", "Manutention de scories et de projections de métal en fusion", "Travaux exigeants", "Maintenance dans des environnements à risque thermique et mécanique"]'::jsonb,
    'de', '["Schweißen von Schwermetallen", "Handhabung von Schlacke und Spritzern von geschmolzenem Metall", "Schwere Arbeiten", "Wartung in Umgebungen mit thermischen und mechanischen Risiken"]'::jsonb,
    'es', '["Soldadura de metales pesados", "Manipulación de escorias y salpicaduras de metal fundido", "Trabajos exigentes", "Mantenimiento en entornos con riesgo térmico y mecánico"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial welding", "Foundry", "Metallurgical industry"]'::jsonb,
    'it', '["Saldatura industriale", "Fonderia", "Industria metallurgica"]'::jsonb,
    'fr', '["Soudage industriel", "Fonderie", "Industrie métallurgique"]'::jsonb,
    'de', '["Industrielles Schweißen", "Gießerei", "Metallurgische Industrie"]'::jsonb,
    'es', '["Soldadura industrial", "Fundición", "Industria metalúrgica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "cut-resistant", "leather glove", "Kevlar"]'::jsonb,
    'it', '["Guanto anticalore", "guanto antitaglio", "guanto in pelle", "Kevlar"]'::jsonb,
    'fr', '["Gant anti-chaleur", "gant anticoupure", "gant en cuir", "Kevlar"]'::jsonb,
    'de', '["Hitzeschutzhandschuh", "Schnittschutzhandschuh", "Lederhandschuh", "Kevlar"]'::jsonb,
    'es', '["Guante resistente al calor", "guante anticorte", "guante de cuero", "Kevlar"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"9–11"'::jsonb,
    'it', '"9–11"'::jsonb,
    'fr', '"9–11"'::jsonb,
    'de', '"9–11"'::jsonb,
    'es', '"9–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["leather", "Kevlar"]'::jsonb,
    'it', '["pelle", "Kevlar"]'::jsonb,
    'fr', '["cuir", "Kevlar"]'::jsonb,
    'de', '["Leder", "Kevlar"]'::jsonb,
    'es', '["cuero", "Kevlar"]'::jsonb
  )
WHERE id = '4027f97e-fa2a-4eaa-8d8d-ff6a87f3ab84';

-- hl-099
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 099"'::jsonb,
    'it', '"HL 099"'::jsonb,
    'fr', '"HL 099"'::jsonb,
    'de', '"HL 099"'::jsonb,
    'es', '"HL 099"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Driver glove in full‑grain bovine leather, lined, with an 8 cm cuff. Offers high abrasion, tear and puncture resistance for medium‑duty general‑purpose tasks."'::jsonb,
    'it', '"Guanto Driver in pelle fiore di bovino, foderato e con manichetta da 8 cm. Offre elevata resistenza ad abrasione, strappo e perforazione per impieghi generici di media gravosità."'::jsonb,
    'fr', '"Gant Driver en cuir pleine fleur de bovin, doublé et avec manchette de 8 cm. Il offre une résistance élevée à l''abrasion, à la déchirure et à la perforation pour des usages généraux de gravité moyenne."'::jsonb,
    'de', '"Driver-Handschuh aus Rindsnarbenleder, gefüttert und mit 8 cm langer Stulpe. Bietet hohe Beständigkeit gegen Abrieb, Weiterreißen und Durchstich für allgemeine Anwendungen mittlerer Beanspruchung."'::jsonb,
    'es', '"Guante Driver en cuero flor de bovino, forrado y con puño de 8 cm. Ofrece alta resistencia a la abrasión, al desgarro y a la perforación para usos generales de gravedad media."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full‑grain bovine leather Driver glove, lined, with 8 cm split‑leather cuff."'::jsonb,
    'it', '"Guanto in pelle fiore di bovino con palmo foderato e manichetta in crosta da 8 cm."'::jsonb,
    'fr', '"Gant en cuir pleine fleur de bovin avec paume doublée et manchette en croûte de cuir de 8 cm."'::jsonb,
    'de', '"Handschuh aus Rindsnarbenleder mit gefütterter Handfläche und 8 cm langer Stulpe aus Spaltleder."'::jsonb,
    'es', '"Guante en cuero flor de bovino con palma forrada y puño de serraje de 8 cm."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gloves for general use"'::jsonb,
    'it', '"Guanti per uso generico"'::jsonb,
    'fr', '"Gants à usage général"'::jsonb,
    'de', '"Universalhandschuhe"'::jsonb,
    'es', '"Guantes de uso general"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent abrasion resistance", "Excellent tear resistance", "Excellent puncture resistance"]'::jsonb,
    'it', '["Ottima resistenza all’abrasione", "Eccellente tenuta allo strappo", "Ottima tenuta alla perforazione"]'::jsonb,
    'fr', '["Excellente résistance à l’abrasion", "Résistance exceptionnelle à la déchirure", "Excellente résistance à la perforation"]'::jsonb,
    'de', '["Ausgezeichnete Abriebfestigkeit", "Hervorragende Reißfestigkeit", "Ausgezeichneter Durchstichwiderstand"]'::jsonb,
    'es', '["Excelente resistencia a la abrasión", "Resistencia excepcional al desgarro", "Excelente resistencia a la perforación"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction & building activities", "General assembly", "General-purpose medium-duty operations", "Handling hot parts up to 100 °C"]'::jsonb,
    'it', '["Attività edilizie e costruzioni", "Montaggi generali", "Operazioni generiche di media gravosità"]'::jsonb,
    'fr', '["Activités de bâtiment et de construction", "Montages généraux", "Opérations générales de gravité moyenne"]'::jsonb,
    'de', '["Bau- und Konstruktionstätigkeiten", "Allgemeine Montagearbeiten", "Allgemeine Arbeiten mittlerer Beanspruchung"]'::jsonb,
    'es', '["Actividades de construcción y obras", "Montajes generales", "Operaciones generales de gravedad media"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Plant maintenance", "Carpentry"]'::jsonb,
    'it', '["Edilizia", "Manutenzione impianti", "Carpenteria"]'::jsonb,
    'fr', '["Construction", "Maintenance des installations", "Charpente métallique"]'::jsonb,
    'de', '["Bauwesen", "Anlagenwartung", "Stahlbau"]'::jsonb,
    'es', '["Construcción", "Mantenimiento de instalaciones", "Carpintería metálica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather glove", "high dexterity", "general‑purpose uses"]'::jsonb,
    'it', '["Guanto in pelle", "elevata destrezza", "usi generici"]'::jsonb,
    'fr', '["Gant en cuir", "grande dextérité", "usages généraux"]'::jsonb,
    'de', '["Lederhandschuh", "hohe Fingerfertigkeit", "allgemeine Anwendungen"]'::jsonb,
    'es', '["Guante de cuero", "alta destreza", "usos generales"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"10"'::jsonb,
    'it', '"10"'::jsonb,
    'fr', '"10"'::jsonb,
    'de', '"10"'::jsonb,
    'es', '"10"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["leather"]'::jsonb,
    'it', '["pelle"]'::jsonb,
    'fr', '["cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["cuero"]'::jsonb
  )
WHERE id = '70e457d3-5fac-42c7-970d-7fa034125811';

-- hl-1001b
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 1001B"'::jsonb,
    'it', '"HL 1001B"'::jsonb,
    'fr', '"HL 1001B"'::jsonb,
    'de', '"HL 1001B"'::jsonb,
    'es', '"HL 1001B"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13-needle seamless black PU-coated polyester glove. Outstanding dexterity and dry grip; excellent abrasion & tear resistance."'::jsonb,
    'it', '"Guanto in poliestere spalmato in PU 13 Aghi senza cuciture.\nElevatissima destrezza, presa in ambiente asciutto, ottima resistenza all''abrasione e strappo."'::jsonb,
    'fr', '"Gant en polyester enduit de PU, 13 jauges, sans couture.\nDextérité extrêmement élevée, bonne prise en milieu sec, excellente résistance à l''abrasion et à la déchirure."'::jsonb,
    'de', '"Handschuh aus Polyester mit PU-Beschichtung, 13-Gauge, nahtlos.\nSehr hohe Fingerfertigkeit, Griffigkeit im trockenen Bereich, hervorragende Abrieb- und Weiterreißfestigkeit."'::jsonb,
    'es', '"Guante de poliéster recubierto de PU, 13 galgas, sin costuras.\nDestreza muy elevada, agarre en ambiente seco, excelente resistencia a la abrasión y al desgarro."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Black PU-coated polyester glove, seamless 13-needle knit; exceptional dexterity, dry-grip performance, very high abrasion & tear resistance"'::jsonb,
    'it', '"Guanto in poliestere spalmato in PU nero, senza cuciture, 13 aghi"'::jsonb,
    'fr', '"Gant en polyester enduit de PU noir, sans couture, 13 jauges"'::jsonb,
    'de', '"Handschuh aus Polyester mit schwarzer PU-Beschichtung, nahtlos, 13-Gauge"'::jsonb,
    'es', '"Guante de poliéster recubierto de PU negro, sin costuras, 13 galgas"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Mechanical hazards gloves"'::jsonb,
    'it', '"Guanti per rischi meccanici"'::jsonb,
    'fr', '"Gants contre les risques mécaniques"'::jsonb,
    'de', '"Handschuhe gegen mechanische Risiken"'::jsonb,
    'es', '"Guantes contra riesgos mecánicos"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Touch-screen compatible", "Superior dry-grip dexterity", "Excellent abrasion resistance", "Excellent tear resistance"]'::jsonb,
    'it', '["Compatibile con touch screen", "Massima destrezza e ottima presa sull’asciutto", "Eccellente resistenza all’abrasione", "Ottima resistenza allo strappo"]'::jsonb,
    'fr', '["Compatible avec écran tactile", "Dextérité maximale et excellente prise en milieu sec", "Résistance exceptionnelle à l’abrasion", "Excellente résistance à la déchirure"]'::jsonb,
    'de', '["Kompatibel mit Touchscreens", "Maximale Fingerfertigkeit und hervorragende Griffigkeit im Trockenen", "Hervorragende Abriebfestigkeit", "Ausgezeichnete Reißfestigkeit"]'::jsonb,
    'es', '["Compatible con pantalla táctil", "Máxima destreza y excelente agarre en seco", "Resistencia excepcional a la abrasión", "Excelente resistencia al desgarro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Precision-mechanics industry: excellent grip", "General light mechanical hazards"]'::jsonb,
    'it', '["Industria meccanica in operazione di precisione. Presa eccellente.", "Operazioni generiche con rischi meccanici non gravosi", "Movimentazione di componentistica in ambienti asciutti", "Assemblaggio industriale"]'::jsonb,
    'fr', '["Industrie mécanique pour des opérations de précision. Excellente prise.", "Opérations générales avec risques mécaniques non lourds", "Manutention de composants en milieux secs", "Assemblage industriel"]'::jsonb,
    'de', '["Maschinenbauindustrie für Präzisionsarbeiten. Ausgezeichnete Griffigkeit.", "Allgemeine Arbeiten mit geringen mechanischen Risiken", "Handhabung von Bauteilen in trockenen Umgebungen", "Industriemontage"]'::jsonb,
    'es', '["Industria mecánica en operaciones de precisión. Agarre excelente.", "Operaciones generales con riesgos mecánicos no severos", "Manipulación de componentes en entornos secos", "Ensamblaje industrial"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive", "Logistics", "Manufacturing"]'::jsonb,
    'it', '["Automotive", "Logistica", "Manifatturiero"]'::jsonb,
    'fr', '["Automobile", "Logistique", "Manufacturier"]'::jsonb,
    'de', '["Automobilindustrie", "Logistik", "Verarbeitendes Gewerbe"]'::jsonb,
    'es', '["Automoción", "Logística", "Manufacturero"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Anti-abrasion glove", "touchscreen-compatible", "assembly", "dexterity"]'::jsonb,
    'it', '["Guanto anti abrasione", "touch screen", "assemblaggio", "destrezza"]'::jsonb,
    'fr', '["Gant anti-abrasion", "écran tactile", "assemblage", "dextérité"]'::jsonb,
    'de', '["Handschuh mit Abriebschutz", "Touchscreen", "Montage", "Fingerfertigkeit"]'::jsonb,
    'es', '["Guante antiabrasión", "pantalla táctil", "ensamblaje", "destreza"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7-11"'::jsonb,
    'it', '"7-11"'::jsonb,
    'fr', '"2026-11-07 00:00:00"'::jsonb,
    'de', '"2026-11-07 00:00:00"'::jsonb,
    'es', '"2026-11-07 00:00:00"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["polyester", "PU"]'::jsonb,
    'it', '["poliestere", "PU"]'::jsonb,
    'fr', '["polyester", "PU"]'::jsonb,
    'de', '["Polyester", "PU"]'::jsonb,
    'es', '["poliéster", "PU"]'::jsonb
  )
WHERE id = '2cf03055-046f-4a8c-8e0d-5401dab26422';

-- hl-103-d
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 103 D"'::jsonb,
    'it', '"HL 103 D"'::jsonb,
    'fr', '"HL 103 D"'::jsonb,
    'de', '"HL 103 D"'::jsonb,
    'es', '"HL 103 D"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"“Driver glove in full-grain bovine leather with split-leather back. High comfort & protection for continuous use in construction and light mechanical work.”"'::jsonb,
    'it', '"\"Guanto Driver in Pelle Fior di Bovino e dorso in crosta. \nElevato comfort e protezione per uso continuo in edilizia e meccanica leggera.\""'::jsonb,
    'fr', '"\"Gant Driver en cuir pleine fleur de bovin et dos en croûte de cuir. \nConfort et protection élevés pour un usage continu dans le bâtiment et la mécanique légère.\""'::jsonb,
    'de', '"\"Driver-Handschuh aus Rindsnarbenleder mit Handrücken aus Spaltleder. \nHoher Komfort und Schutz für den Dauereinsatz im Bauwesen und in der Leichtmechanik.\""'::jsonb,
    'es', '"\"Guante Driver en cuero flor de bovino y dorso en serraje. \nElevado confort y protección para uso continuo en construcción y mecánica ligera.\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full-grain leather palm, split-leather back – Driver model"'::jsonb,
    'it', '"Guanto in pelle palmo fiore, dorso crosta di bovino modello Driver"'::jsonb,
    'fr', '"Gant en cuir, paume pleine fleur, dos en croûte de bovin, modèle Driver"'::jsonb,
    'de', '"Handschuh aus Leder, Handfläche aus Narbenleder, Handrücken aus Spaltleder vom Rind, Modell Driver"'::jsonb,
    'es', '"Guante en cuero, palma flor, dorso serraje de bovino, modelo Driver"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"General use gloves"'::jsonb,
    'it', '"Guanti per uso generico"'::jsonb,
    'fr', '"Gants à usage général"'::jsonb,
    'de', '"Universalhandschuhe"'::jsonb,
    'es', '"Guantes de uso general"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Good abrasion resistance", "Excellent tear resistance", "Good puncture resistance", "Driver model"]'::jsonb,
    'it', '["Buona resistenza all’abrasione", "Ottima resistenza allo strappo", "Buona resistenza alla perforazione", "Driver model"]'::jsonb,
    'fr', '["Bonne résistance à l''abrasion", "Excellente résistance à la déchirure", "Bonne résistance à la perforation", "Modèle Driver"]'::jsonb,
    'de', '["Gute Abriebfestigkeit", "Ausgezeichnete Reißfestigkeit", "Gute Durchstichfestigkeit", "Modell Driver"]'::jsonb,
    'es', '["Buena resistencia a la abrasión", "Excelente resistencia al desgarro", "Buena resistencia a la perforación", "Modelo Driver"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction & building activities", "General mechanical operations", "Dry-materials handling"]'::jsonb,
    'it', '["Attività edili e costruzioni", "Operazioni meccaniche generiche", "Movimentazione materiali secchi"]'::jsonb,
    'fr', '["Activités de bâtiment et de construction", "Opérations mécaniques générales", "Manutention de matériaux secs"]'::jsonb,
    'de', '["Bau- und Konstruktionstätigkeiten", "Allgemeine mechanische Arbeiten", "Handhabung von trockenem Material"]'::jsonb,
    'es', '["Actividades de construcción y obras", "Operaciones mecánicas generales", "Manipulación de materiales secos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Manufacturing", "Carpentry", "Mechanical engineering", "Automotive", "Glass", "Steel"]'::jsonb,
    'it', '["Edile", "Manufatturiero", "Carpenteria", "Meccanica", "Automotive", "Industria del vetro", "Industria dell''acciaio"]'::jsonb,
    'fr', '["Bâtiment", "Manufacturier", "Charpente métallique", "Mécanique", "Automobile", "Industrie du verre", "Industrie sidérurgique"]'::jsonb,
    'de', '["Bau", "Verarbeitendes Gewerbe", "Stahlbau", "Mechanik", "Automobilindustrie", "Glasindustrie", "Stahlindustrie"]'::jsonb,
    'es', '["Construcción", "Manufacturero", "Carpintería metálica", "Mecánica", "Automoción", "Industria del vidrio", "Industria del acero"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather Driver glove", "mechanical-hazard protection"]'::jsonb,
    'it', '["Guanto in pelle", "Driver", "resistenza meccanica"]'::jsonb,
    'fr', '["Gant en cuir", "Conducteurs", "résistance mécanique"]'::jsonb,
    'de', '["Lederhandschuh", "Fahrer", "mechanische Festigkeit"]'::jsonb,
    'es', '["Guante de cuero", "Conductores", "resistencia mecánica"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"9-11"'::jsonb,
    'it', '"9-11"'::jsonb,
    'fr', '"2026-11-09 00:00:00"'::jsonb,
    'de', '"2026-11-09 00:00:00"'::jsonb,
    'es', '"2026-11-09 00:00:00"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["leather"]'::jsonb,
    'it', '["pelle"]'::jsonb,
    'fr', '["cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["cuero"]'::jsonb
  )
WHERE id = '000066f4-47cc-4417-a062-a5b4e105ff56';

-- hl-1370
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 1370"'::jsonb,
    'it', '"HL 1370"'::jsonb,
    'fr', '"HL 1370"'::jsonb,
    'de', '"HL 1370"'::jsonb,
    'es', '"HL 1370"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13‑gauge nylon glove with nitrile‑coated palm. Offers superior dexterity, breathability, excellent grip and abrasion resistance—ideal for precision tasks and small‑component handling."'::jsonb,
    'it', '"Guanto in Nylon costruito con maglia a 13 aghi e palmo in nitrile.\nOffre destrezza e traspirabilità superiori, ottima presa e resistenza all’abrasione, ideale per lavori di precisione e manipolazione di piccoli componenti."'::jsonb,
    'fr', '"Gant en nylon tricoté à 13 jauges avec paume en nitrile.\nOffre une dextérité et une respirabilité supérieures, une excellente prise et une bonne résistance à l''abrasion, idéal pour les travaux de précision et la manipulation de petits composants."'::jsonb,
    'de', '"Nylonhandschuh, 13-Gauge-Gestrick, mit Nitril-Handfläche.\nBietet überlegene Fingerfertigkeit und Atmungsaktivität, hervorragende Griffigkeit und Abriebfestigkeit, ideal für Präzisionsarbeiten und die Handhabung kleiner Bauteile."'::jsonb,
    'es', '"Guante de nailon con tejido de 13 galgas y palma de nitrilo.\nOfrece destreza y transpirabilidad superiores, excelente agarre y resistencia a la abrasión, ideal para trabajos de precisión y manipulación de componentes pequeños."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13-gauge nylon glove with nitrile-coated palm; superior dexterity and dry-grip."'::jsonb,
    'it', '"Guanto in nylon 13 aghi con palmo spalmato in nitrile; elevata destrezza e presa."'::jsonb,
    'fr', '"Gant en nylon 13 jauges avec paume enduite de nitrile ; dextérité et prise élevées."'::jsonb,
    'de', '"Nylonhandschuh, 13-Gauge, mit nitrilbeschichteter Handfläche; hohe Fingerfertigkeit und Griffigkeit."'::jsonb,
    'es', '"Guante de nailon 13 galgas con palma recubierta de nitrilo; alta destreza y agarre."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gloves for general use"'::jsonb,
    'it', '"Guanti per uso generico"'::jsonb,
    'fr', '"Gants à usage général"'::jsonb,
    'de', '"Universalhandschuhe"'::jsonb,
    'es', '"Guantes de uso general"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent tactile feel", "Excellent grip", "Excellent abrasion resistance", "Oil resistant"]'::jsonb,
    'it', '["Eccellente presa tattile", "Eccellente destrezza", "Ottima resistenza all’abrasione", "Resistente agli oli"]'::jsonb,
    'fr', '["Excellente préhension tactile", "Excellente dextérité", "Excellente résistance à l’abrasion", "Résistant aux huiles"]'::jsonb,
    'de', '["Ausgezeichnete taktile Griffigkeit", "Hervorragende Fingerfertigkeit", "Ausgezeichnete Abriebfestigkeit", "Ölbeständig"]'::jsonb,
    'es', '["Excelente agarre táctil", "Excelente destreza", "Excelente resistencia a la abrasión", "Resistente a los aceites"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electronics assembly & micro-component work", "Precision work in glass & steel", "Maintenance tasks with abrasion risk", "Precision-machine operations (high-tactile sensitivity)"]'::jsonb,
    'it', '["Montaggio elettronico e assemblaggio di microcomponenti", "Lavorazioni di precisione in vetro e acciaio", "Lavori di manutenzione con rischio di abrasione"]'::jsonb,
    'fr', '["Montage électronique et assemblage de microcomposants", "Travaux de précision sur le verre et l''acier", "Travaux de maintenance avec risque d''abrasion"]'::jsonb,
    'de', '["Elektronikmontage und Montage von Mikrobauteilen", "Präzisionsarbeiten an Glas und Stahl", "Wartungsarbeiten mit Abriebrisiko"]'::jsonb,
    'es', '["Montaje electrónico y ensamblaje de microcomponentes", "Trabajos de precisión en vidrio y acero", "Trabajos de mantenimiento con riesgo de abrasión"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electronics", "Glass industry", "Pharmaceutical sector"]'::jsonb,
    'it', '["Elettronica", "Vetrario", "Settore farmaceutico"]'::jsonb,
    'fr', '["Électronique", "Verrier", "Secteur pharmaceutique"]'::jsonb,
    'de', '["Elektronik", "Glasbranche", "Pharmasektor"]'::jsonb,
    'es', '["Electrónica", "Vidriero", "Sector farmacéutico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut-resistant glove", "high dexterity", "nitrile palm", "13-gauge"]'::jsonb,
    'it', '["Guanto antitaglio", "elevata destrezza", "palmo in nitrile", "13 aghi"]'::jsonb,
    'fr', '["Gant anticoupure", "grande dextérité", "paume en nitrile", "13 jauges"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "hohe Fingerfertigkeit", "Handfläche aus Nitril", "13 Nadeln"]'::jsonb,
    'es', '["Guante anticorte", "alta destreza", "palma de nitrilo", "13 agujas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7-11"'::jsonb,
    'it', '"7-11"'::jsonb,
    'fr', '"2026-11-07 00:00:00"'::jsonb,
    'de', '"2026-11-07 00:00:00"'::jsonb,
    'es', '"2026-11-07 00:00:00"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["nylon", "nitrile"]'::jsonb,
    'it', '["nylon", "nitrile"]'::jsonb,
    'fr', '["nylon", "nitrile"]'::jsonb,
    'de', '["Nylon", "Nitril"]'::jsonb,
    'es', '["nylon", "nitrilo"]'::jsonb
  )
WHERE id = 'fdaaee9d-e9ca-4863-b9b0-f3424f2c84f8';

-- hl-231
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 231"'::jsonb,
    'it', '"HL 231"'::jsonb,
    'fr', '"HL 231"'::jsonb,
    'de', '"HL 231"'::jsonb,
    'es', '"HL 231"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% cotton, continuous-yarn glove, five fingers with elasticated wrist for maintenance, assembly & delicate handling of dry, clean items."'::jsonb,
    'it', '"Guanto in cotone 100% a filo continuo, cinque dita con polso elasticizzato per uso in manutenzione, assemblaggio e manipolazioni delicate di oggetti asciutti e puliti."'::jsonb,
    'fr', '"Gant en coton 100% fil continu, cinq doigts avec poignet élastiqué, pour un usage en maintenance, assemblage et manipulation délicate d''objets secs et propres."'::jsonb,
    'de', '"Handschuh aus 100% Baumwolle, Endlosfaser, fünf Finger mit elastischem Bund, für Wartung, Montage und die vorsichtige Handhabung trockener und sauberer Gegenstände."'::jsonb,
    'es', '"Guante de algodón 100% hilo continuo, cinco dedos con puño elástico, para uso en mantenimiento, ensamblaje y manipulación delicada de objetos secos y limpios."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% continuous-yarn cotton glove, five fingers, elasticated wrist"'::jsonb,
    'it', '"Guanto in cotone 100% a filo continuo, cinque dita con polso elasticizzato."'::jsonb,
    'fr', '"Gant en coton 100% fil continu, cinq doigts avec poignet élastiqué."'::jsonb,
    'de', '"Handschuh aus 100% Baumwolle, Endlosfaser, fünf Finger mit elastischem Bund."'::jsonb,
    'es', '"Guante de algodón 100% hilo continuo, cinco dedos con puño elástico."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gloves for general use"'::jsonb,
    'it', '"Guanti per uso generico"'::jsonb,
    'fr', '"Gants à usage général"'::jsonb,
    'de', '"Universalhandschuhe"'::jsonb,
    'es', '"Guantes de uso general"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Seamless glove", "Excellent dexterity in low-risk environments", "High comfort for prolonged use"]'::jsonb,
    'it', '["Privo di cuciture", "Ottima destrezza in ambienti a minimi rischi", "Elevato comfort per uso prolungato"]'::jsonb,
    'fr', '["Sans couture", "Excellente dextérité dans des environnements à risques minimes", "Grand confort pour une utilisation prolongée"]'::jsonb,
    'de', '["Nahtlos", "Ausgezeichnete Fingerfertigkeit in Umgebungen mit minimalen Risiken", "Hoher Komfort bei längerem Gebrauch"]'::jsonb,
    'es', '["Sin costuras", "Excelente destreza en entornos con riesgos mínimos", "Alto confort para un uso prolongado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Assembly and general maintenance in clean environments", "Packaging & packing", "Delicate handling of dry items"]'::jsonb,
    'it', '["Montaggio, assemblaggio, manutenzione", "Manipolazioni delicate oggetti asciutti e puliti", "Confezionamento, imballaggio", "Industria elettronica e farmaceutica"]'::jsonb,
    'fr', '["Montage, assemblage, maintenance", "Manipulations délicates d''objets secs et propres", "Conditionnement, emballage", "Industrie électronique et pharmaceutique"]'::jsonb,
    'de', '["Montage, Zusammenbau, Wartung", "Feinfühlige Handhabung trockener und sauberer Gegenstände", "Konfektionierung, Verpackung", "Elektronik- und pharmazeutische Industrie"]'::jsonb,
    'es', '["Montaje, ensamblaje, mantenimiento", "Manipulación delicada de objetos secos y limpios", "Confección, embalaje", "Industria electrónica y farmacéutica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Logistics", "Packaging", "Data-center/server maintenance"]'::jsonb,
    'it', '["Logistica", "Imballaggio", "Manutenzione server"]'::jsonb,
    'fr', '["Logistique", "Emballage", "Maintenance des serveurs"]'::jsonb,
    'de', '["Logistik", "Verpackung", "Serverwartung"]'::jsonb,
    'es', '["Logística", "Embalaje", "Mantenimiento de servidores"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Minimal hazards", "high dexterity", "comfort"]'::jsonb,
    'it', '["rischi minimi", "elevata destrezza", "comfort"]'::jsonb,
    'fr', '["risques minimes", "grande dextérité", "confort"]'::jsonb,
    'de', '["geringe Risiken", "hohe Fingerfertigkeit", "Komfort"]'::jsonb,
    'es', '["riesgos mínimos", "alta destreza", "confort"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–9"'::jsonb,
    'it', '"7–9"'::jsonb,
    'fr', '"7–9"'::jsonb,
    'de', '"7–9"'::jsonb,
    'es', '"7–9"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '6431b065-85e8-4369-bc41-f5aa187eadbc';

-- hl-231-3
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 231/3"'::jsonb,
    'it', '"HL 231/3"'::jsonb,
    'fr', '"HL 231/3"'::jsonb,
    'de', '"HL 231/3"'::jsonb,
    'es', '"HL 231/3"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% cotton, 3-ply continuous-yarn glove, five fingers with elasticated wrist. Provides excellent dexterity for assembly & delicate handling."'::jsonb,
    'it', '"Guanto in cotone 100% a 3 capi a filo continuo, cinque dita con polso elasticizzato. \nGarantisce ottima destrezza, ideale per montaggi e manipolazioni delicate."'::jsonb,
    'fr', '"Gant en coton 100% à 3 fils continus, cinq doigts avec poignet élastiqué. \nGarantit une excellente dextérité, idéal pour les montages et manipulations délicates."'::jsonb,
    'de', '"Handschuh aus 100% Baumwolle, 3-fädig, Endlosfaser, fünf Finger mit elastischem Bund. \nGewährleistet hervorragende Fingerfertigkeit, ideal für Montagearbeiten und die vorsichtige Handhabung."'::jsonb,
    'es', '"Guante de algodón 100% de 3 hilos continuos, cinco dedos con puño elástico. \nGarantiza una excelente destreza, ideal para montajes y manipulaciones delicadas."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% 3-ply continuous-yarn cotton glove, five fingers, elasticated wrist"'::jsonb,
    'it', '"Guanto in cotone 100% a 3 capi a filo continuo, cinque dita con polso elasticizzato."'::jsonb,
    'fr', '"Gant en coton 100% à 3 fils continus, cinq doigts avec poignet élastiqué."'::jsonb,
    'de', '"Handschuh aus 100% Baumwolle, 3-fädig, Endlosfaser, fünf Finger mit elastischem Bund."'::jsonb,
    'es', '"Guante de algodón 100% de 3 hilos continuos, cinco dedos con puño elástico."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gloves for general use"'::jsonb,
    'it', '"Guanti per uso generico"'::jsonb,
    'fr', '"Gants à usage général"'::jsonb,
    'de', '"Universalhandschuhe"'::jsonb,
    'es', '"Guantes de uso general"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["3-ply seamless glove", "Excellent dexterity in low-risk environments", "High comfort for prolonged use"]'::jsonb,
    'it', '["Guanto a 3 capi privo di cuciture", "Ottima destrezza in ambienti a minimi rischi", "Elevato comfort per uso prolungato"]'::jsonb,
    'fr', '["Gant à 3 fils sans couture", "Excellente dextérité dans des environnements à risques minimes", "Grand confort pour une utilisation prolongée"]'::jsonb,
    'de', '["3-fädiger, nahtloser Handschuh", "Ausgezeichnete Fingerfertigkeit in Umgebungen mit minimalen Risiken", "Hoher Komfort bei längerem Gebrauch"]'::jsonb,
    'es', '["Guante de 3 hilos sin costuras", "Excelente destreza en entornos con riesgos mínimos", "Alto confort para un uso prolongado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Assembly and general maintenance in clean environments", "Packaging & packing", "Delicate handling of dry items"]'::jsonb,
    'it', '["Montaggio, assemblaggio, manutenzione", "Confezionamento, imballaggio", "Manipolazioni delicate oggetti asciutti e puliti", "Industria elettronica e farmaceutica"]'::jsonb,
    'fr', '["Montage, assemblage, maintenance", "Conditionnement, emballage", "Manipulations délicates d''objets secs et propres", "Industrie électronique et pharmaceutique"]'::jsonb,
    'de', '["Montage, Zusammenbau, Wartung", "Konfektionierung, Verpackung", "Feinfühlige Handhabung trockener und sauberer Gegenstände", "Elektronik- und pharmazeutische Industrie"]'::jsonb,
    'es', '["Montaje, ensamblaje, mantenimiento", "Confección, embalaje", "Manipulación delicada de objetos secos y limpios", "Industria electrónica y farmacéutica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electronics", "Assembly", "Pharmaceutical"]'::jsonb,
    'it', '["Elettronica", "Assemblaggio", "Farmaceutico"]'::jsonb,
    'fr', '["Électronique", "Assemblage", "Pharmaceutique"]'::jsonb,
    'de', '["Elektronik", "Montage", "Pharmazeutisch"]'::jsonb,
    'es', '["Electrónica", "Ensamblaje", "Farmacéutico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Minimal hazards", "high dexterity", "comfort"]'::jsonb,
    'it', '["rischi minimi", "elevata destrezza", "comfort"]'::jsonb,
    'fr', '["risques minimes", "grande dextérité", "confort"]'::jsonb,
    'de', '["geringe Risiken", "hohe Fingerfertigkeit", "Komfort"]'::jsonb,
    'es', '["riesgos mínimos", "alta destreza", "confort"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–9"'::jsonb,
    'it', '"7–9"'::jsonb,
    'fr', '"7–9"'::jsonb,
    'de', '"7–9"'::jsonb,
    'es', '"7–9"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '4a70b316-5ad1-45f9-abbe-2a123edac332';

-- hl-3801-d
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 3801-D"'::jsonb,
    'it', '"HL 3801-D"'::jsonb,
    'fr', '"HL 3801-D"'::jsonb,
    'de', '"HL 3801-D"'::jsonb,
    'es', '"HL 3801-D"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HPPE knit glove with PU-coated palm, 13-gauge. Delivers outstanding tactile sensitivity and abrasion resistance, ideal for handling sharp mechanical, glass or steel components."'::jsonb,
    'it', '"Guanto anti-taglio ad elevata destrezza lavorato in HPPE con palmo spalmato in PU, 13 aghi.\nGarantisce eccellente sensibilità tattile e resistenza all’abrasione, ideale per manipolazione componenti taglienti."'::jsonb,
    'fr', '"Gant anticoupure à haute dextérité, tricoté en HPPE avec paume enduite de PU, 13 jauges.\nGarantit une excellente sensibilité tactile et une bonne résistance à l''abrasion, idéal pour la manipulation de composants tranchants."'::jsonb,
    'de', '"Hochgradig fingerfertiger Schnittschutzhandschuh aus HPPE-Gestrick mit PU-beschichteter Handfläche, 13-Gauge.\nGewährleistet exzellentes Tastempfinden und Abriebfestigkeit, ideal für die Handhabung scharfkantiger Bauteile."'::jsonb,
    'es', '"Guante anticorte de alta destreza tejido en HPPE con palma recubierta de PU, 13 galgas.\nGarantiza una excelente sensibilidad táctil y resistencia a la abrasión, ideal para la manipulación de componentes cortantes."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HPPE & PU palm cut glove (13-gauge); outstanding dexterity and abrasion resistance."'::jsonb,
    'it', '"Guanto antitaglio HPPE con palmo spalmato PU, 13 aghi; elevata destrezza e resistenza all’abrasione."'::jsonb,
    'fr', '"Gant anticoupure en HPPE avec paume enduite de PU, 13 jauges ; dextérité élevée et résistance à l''abrasion."'::jsonb,
    'de', '"Schnittschutzhandschuh aus HPPE mit PU-beschichteter Handfläche, 13-Gauge; hohe Fingerfertigkeit und Abriebfestigkeit."'::jsonb,
    'es', '"Guante anticorte de HPPE con palma recubierta de PU, 13 galgas; alta destreza y resistencia a la abrasión."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant gloves"'::jsonb,
    'it', '"Guanti antitaglio"'::jsonb,
    'fr', '"Gants anticoupure"'::jsonb,
    'de', '"Schnittschutzhandschuhe"'::jsonb,
    'es', '"Guantes anticorte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Maximum dexterity & sensitivity", "Superior dry-grip performance", "Excellent mechanical resistance", "Breathable back to ensure comfort during prolonged use"]'::jsonb,
    'it', '["Massima destrezza e sensibilità", "Presa superiore in asciutto", "Eccellente resistenza meccanica", "Dorso traspirante per comfort in uso prolungato"]'::jsonb,
    'fr', '["Dextérité et sensibilité maximales", "Prise supérieure en milieu sec", "Excellente résistance mécanique", "Dos respirant pour un confort optimal en usage prolongé"]'::jsonb,
    'de', '["Maximale Fingerfertigkeit und Sensibilität", "Überlegene Griffigkeit im Trockenen", "Ausgezeichnete mechanische Festigkeit", "Atmungsaktiver Handrücken für Komfort bei längerem Tragen"]'::jsonb,
    'es', '["Máxima destreza y sensibilidad", "Agarre superior en seco", "Excelente resistencia mecánica", "Dorso transpirable para mayor comodidad en uso prolongado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling sharp mechanical, glass & steel components", "Mechanical-shop assembly", "Precision work in dry environments"]'::jsonb,
    'it', '["Manipolazione componenti taglienti nell''industria meccanica, del vetro, dell''acciaio", "Assemblaggio in officina meccanica", "Lavori di precisione in ambienti secchi"]'::jsonb,
    'fr', '["Manipulation de composants tranchants dans l''industrie mécanique, du verre et de l''acier", "Assemblage en atelier mécanique", "Travaux de précision en milieux secs"]'::jsonb,
    'de', '["Handhabung scharfkantiger Bauteile in der Metall-, Glas- und Stahlindustrie", "Montage in der mechanischen Werkstatt", "Präzisionsarbeiten in trockenen Umgebungen"]'::jsonb,
    'es', '["Manipulación de componentes cortantes en la industria mecánica, del vidrio y del acero", "Ensamblaje en taller mecánico", "Trabajos de precisión en entornos secos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["General mechanical", "Assembly", "Logistics"]'::jsonb,
    'it', '["Meccanica generale", "Assemblaggio", "Logistica"]'::jsonb,
    'fr', '["Mécanique générale", "Assemblage", "Logistique"]'::jsonb,
    'de', '["Allgemeiner Maschinenbau", "Montage", "Logistik"]'::jsonb,
    'es', '["Mecánica general", "Ensamblaje", "Logística"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut-resistant glove", "high dexterity", "HPPE", "PU palm", "13-gauge"]'::jsonb,
    'it', '["Guanto antitaglio", "elevata destrezza", "HPPE", "palmo PU", "13 aghi"]'::jsonb,
    'fr', '["Gant anticoupure", "grande dextérité", "HPPE", "paume en PU", "13 jauges"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "hohe Fingerfertigkeit", "HPPE", "Handfläche aus PU", "13 Nadeln"]'::jsonb,
    'es', '["Guante anticorte", "alta destreza", "HPPE", "palma de PU", "13 agujas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7-11"'::jsonb,
    'it', '"7-11"'::jsonb,
    'fr', '"2026-11-07 00:00:00"'::jsonb,
    'de', '"2026-11-07 00:00:00"'::jsonb,
    'es', '"2026-11-07 00:00:00"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["HPPE", "PU"]'::jsonb,
    'it', '["HPPE", "PU"]'::jsonb,
    'fr', '["HPPE", "PU"]'::jsonb,
    'de', '["HPPE", "PU"]'::jsonb,
    'es', '["HPPE", "PU"]'::jsonb
  )
WHERE id = '2195bb6d-f063-47e5-bbe6-b3f46936a80b';

-- hl-3808-d
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 3808-D"'::jsonb,
    'it', '"HL 3808-D"'::jsonb,
    'fr', '"HL 3808-D"'::jsonb,
    'de', '"HL 3808-D"'::jsonb,
    'es', '"HL 3808-D"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant glove with PU-coated palm, 18-gauge construction using tungsten, HPPE, nylon & spandex. Provides superior dexterity and maximum cut & abrasion protection in dry and slightly oily environments."'::jsonb,
    'it', '"Guanto antitaglio con palmo spalmato in poliuretano, 18 aghi costruito con filati di tungsteno, HPPE, nylon e spandex.\nFornisce destrezza superiore e massima protezione da taglio e abrasione anche in ambienti lievemente oleosi."'::jsonb,
    'fr', '"Gant anticoupure avec paume enduite de polyuréthane, 18 jauges, tricoté avec des fils de tungstène, HPPE, nylon et spandex.\nOffre une dextérité supérieure et une protection maximale contre la coupure et l''abrasion, même en environnements légèrement huileux."'::jsonb,
    'de', '"Schnittschutzhandschuh mit polyurethanbeschichteter Handfläche, 18-Gauge, gestrickt aus Wolfram-, HPPE-, Nylon- und Spandexfäden.\nBietet überlegene Fingerfertigkeit und maximalen Schnitt- und Abriebschutz auch in leicht öligen Umgebungen."'::jsonb,
    'es', '"Guante anticorte con palma recubierta de poliuretano, 18 galgas, confeccionado con hilos de tungsteno, HPPE, nailon y spandex.\nProporciona una destreza superior y máxima protección frente al corte y la abrasión, incluso en entornos ligeramente aceitosos."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18-gauge HPPE/tungsten cut glove with PU palm; superior dexterity and dry/light‑oil grip."'::jsonb,
    'it', '"Guanto antitaglio 18 aghi con palmo spalmato PU; destrezza superiore e presa in asciutto/olio leggero."'::jsonb,
    'fr', '"Gant anticoupure 18 jauges avec paume enduite de PU ; dextérité supérieure et prise en milieu sec/légèrement huileux."'::jsonb,
    'de', '"Schnittschutzhandschuh, 18-Gauge, mit PU-beschichteter Handfläche; überlegene Fingerfertigkeit und Griffigkeit im Trockenen/leicht Öligen."'::jsonb,
    'es', '"Guante anticorte 18 galgas con palma recubierta de PU; destreza superior y agarre en seco/aceite ligero."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant gloves"'::jsonb,
    'it', '"Guanti antitaglio"'::jsonb,
    'fr', '"Gants anticoupure"'::jsonb,
    'de', '"Schnittschutzhandschuhe"'::jsonb,
    'es', '"Guantes anticorte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Superior dexterity & sensitivity", "Excellent dry-grip performance", "Excellent abrasion resistance", "Breathable back to ensure comfort during prolonged use"]'::jsonb,
    'it', '["Destrezza e sensibilità superiore", "Presa ottima in asciutto", "Eccellente resistenza all’abrasione", "Dorso traspirante per comfort in uso prolungato"]'::jsonb,
    'fr', '["Dextérité et sensibilité supérieures", "Excellente prise en milieu sec", "Résistance exceptionnelle à l’abrasion", "Dos respirant pour un confort optimal en usage prolongé"]'::jsonb,
    'de', '["Überlegene Fingerfertigkeit und Sensibilität", "Optimaler Griff im Trockenen", "Hervorragende Abriebfestigkeit", "Atmungsaktiver Handrücken für Komfort bei längerem Tragen"]'::jsonb,
    'es', '["Destreza y sensibilidad superiores", "Excelente agarre en seco", "Resistencia excepcional a la abrasión", "Dorso transpirable para mayor comodidad en uso prolongado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling high-cut-risk components", "Mechanical, glass & steel industry", "Maintenance in oily environments", "High-precision mechanical work; maximum tactile sensitivity"]'::jsonb,
    'it', '["Manipolazione componenti ad alto rischio taglio", "Industria meccanica, vetro, acciaio", "Manutenzione in ambienti oleosi", "Lavorazioni meccaniche di alta precisione; massima sensibilità tattile"]'::jsonb,
    'fr', '["Manipulation de composants à haut risque de coupure", "Industrie mécanique, verre, acier", "Maintenance en milieux huileux", "Travaux mécaniques de haute précision ; sensibilité tactile maximale"]'::jsonb,
    'de', '["Handhabung von Bauteilen mit hohem Schnittrisiko", "Mechanik, Glas, Stahl", "Wartung in öligen Umgebungen", "Hochpräzise mechanische Arbeiten; maximale Tastempfindlichkeit"]'::jsonb,
    'es', '["Manipulación de componentes con alto riesgo de corte", "Industria mecánica, vidrio, acero", "Mantenimiento en entornos aceitosos", "Trabajos mecánicos de alta precisión; máxima sensibilidad táctil"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Petrochemical", "Machinery maintenance", "Chemical industry"]'::jsonb,
    'it', '["Settore petrolchimico", "Manutenzione macchinari", "Industria chimica"]'::jsonb,
    'fr', '["Secteur pétrochimique", "Maintenance des machines", "Industrie chimique"]'::jsonb,
    'de', '["Petrochemischer Sektor", "Maschinenwartung", "Chemische Industrie"]'::jsonb,
    'es', '["Sector petroquímico", "Mantenimiento de maquinaria", "Industria química"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut-resistant glove", "high dexterity", "light-oil environment", "PU palm", "18-gauge", "HPPE", "tungsten"]'::jsonb,
    'it', '["Guanto antitaglio", "elevata destrezza", "ambiente oleoso leggero", "palmo PU", "18 aghi", "HPPE", "tungsteno"]'::jsonb,
    'fr', '["Gant anticoupure", "grande dextérité", "environnement légèrement huileux", "paume en PU", "18 jauges", "HPPE", "tungstène"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "hohe Fingerfertigkeit", "leicht ölige Umgebung", "Handfläche aus PU", "18 Nadeln", "HPPE", "Wolfram"]'::jsonb,
    'es', '["Guante anticorte", "alta destreza", "entorno ligeramente oleoso", "palma de PU", "18 agujas", "HPPE", "tungsteno"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–11"'::jsonb,
    'it', '"7–11"'::jsonb,
    'fr', '"7–11"'::jsonb,
    'de', '"7–11"'::jsonb,
    'es', '"7–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["PU", "tungsten", "HPPE", "nylon", "spandex"]'::jsonb,
    'it', '["PU", "tungsteno", "HPPE", "nylon", "spandex"]'::jsonb,
    'fr', '["PU", "tungstène", "HPPE", "nylon", "spandex"]'::jsonb,
    'de', '["PU", "Wolfram", "HPPE", "Nylon", "Spandex"]'::jsonb,
    'es', '["PU", "tungsteno", "HPPE", "nylon", "spandex"]'::jsonb
  )
WHERE id = 'c5c04483-1872-4067-bb20-4e6b52bdacaf';

-- hl-4101gfrb
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 4101GFRB"'::jsonb,
    'it', '"HL 4101GFRB"'::jsonb,
    'fr', '"HL 4101GFRB"'::jsonb,
    'de', '"HL 4101GFRB"'::jsonb,
    'es', '"HL 4101GFRB"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HPPE fibre & stainless-steel cut-resistant glove with PU-coated palm and nitrile reinforcement between thumb & index. Exceptional dexterity & sensitivity for handling sharp objects. Certified for maximum cut protection."'::jsonb,
    'it', '"Guanto antitaglio in fibra HPPE e filo di acciaio inossidabile spalmato in poliuretano e dotato di rinforzo in nitrile tra pollice e indice. Elevata destrezza e sensibilità per componenti taglienti. Certificato per il massimo livello di protezione al taglio e la manipolazione di oggetti taglienti."'::jsonb,
    'fr', '"Gant anticoupure en fibre HPPE et fil d''acier inoxydable, enduit de polyuréthane et doté d''un renfort en nitrile entre le pouce et l''index. Grande dextérité et sensibilité pour les composants coupants. Certifié pour le niveau maximal de protection contre la coupure et la manipulation d''objets tranchants."'::jsonb,
    'de', '"Schnittschutzhandschuh aus HPPE-Faser und Edelstahldraht, mit Polyurethan beschichtet und mit einer Nitrilverstärkung zwischen Daumen und Zeigefinger. Hohe Fingerfertigkeit und Sensibilität für scharfkantige Bauteile. Zertifiziert für das höchste Schnittschutzniveau und die Handhabung scharfer Gegenstände."'::jsonb,
    'es', '"Guante anticorte de fibra HPPE e hilo de acero inoxidable, recubierto de poliuretano y dotado de refuerzo de nitrilo entre el pulgar y el índice. Alta destreza y sensibilidad para componentes cortantes. Certificado para el máximo nivel de protección al corte y la manipulación de objetos cortantes."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HPPE & stainless-steel cut glove, PU-coated palm"'::jsonb,
    'it', '"Guanto antitaglio di livello F in HPPE e acciaio, palmo spalmato PU"'::jsonb,
    'fr', '"Gant anticoupure de niveau F en HPPE et acier, paume enduite de PU"'::jsonb,
    'de', '"Schnittschutzhandschuh der Klasse F aus HPPE und Stahl, PU-beschichtete Handfläche"'::jsonb,
    'es', '"Guante anticorte de nivel F en HPPE y acero, palma recubierta de PU"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant gloves"'::jsonb,
    'it', '"Guanti antitaglio"'::jsonb,
    'fr', '"Gants anticoupure"'::jsonb,
    'de', '"Schnittschutzhandschuhe"'::jsonb,
    'es', '"Guantes anticorte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Superior dexterity, sensitivity and dry-grip performance", "Reinforced between palm thumb and index", "Maximum cut protection", "Breathable back to ensure comfort during prolonged use"]'::jsonb,
    'it', '["Destrezza, sensibilità e presa in asciutto superiore", "Rinforzo tra pollice ed indice", "Massima protezione da taglio", "Ottima resistenza allo strappo"]'::jsonb,
    'fr', '["Dextérité, sensibilité et prise en milieu sec supérieures", "Renfort entre le pouce et l''index", "Protection maximale contre la coupure", "Excellente résistance à la déchirure"]'::jsonb,
    'de', '["Überlegene Fingerfertigkeit, Sensibilität und Trockengriffigkeit", "Verstärkung zwischen Daumen und Zeigefinger", "Maximaler Schnittschutz", "Ausgezeichnete Reißfestigkeit"]'::jsonb,
    'es', '["Destreza, sensibilidad y agarre en seco superiores", "Refuerzo entre el pulgar y el índice", "Máxima protección contra el corte", "Excelente resistencia al desgarro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling sharp parts & components", "Precision engineering, glassworks & automotive (blade-cut protection essential)", "Cutting-room & workshop operations"]'::jsonb,
    'it', '["Manipolazione componenti taglienti", "Industria meccanica, vetro, acciaio dove è indispensabile la massima protezione al taglio da lama", "Operazioni in reparto taglio e officina"]'::jsonb,
    'fr', '["Manipulation de composants tranchants", "Industrie mécanique, verre, acier, où la protection maximale contre la coupure par lame est indispensable", "Opérations dans les ateliers de découpe et de mécanique"]'::jsonb,
    'de', '["Handhabung scharfkantiger Bauteile", "Metallverarbeitung, Glas- und Stahlindustrie, in denen maximaler Schnittschutz gegen Klingen unerlässlich ist", "Arbeiten in Schneidabteilung und Werkstatt"]'::jsonb,
    'es', '["Manipulación de componentes cortantes", "Industria mecánica, del vidrio y del acero, donde es indispensable la máxima protección contra el corte por cuchilla", "Operaciones en el departamento de corte y en el taller"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Precision engineering", "Glassworks", "Automotive"]'::jsonb,
    'it', '["Meccanica di precisione", "Vetreria", "Automotive"]'::jsonb,
    'fr', '["Mécanique de précision", "Verrerie", "Automobile"]'::jsonb,
    'de', '["Feinmechanik", "Glasproduktion", "Automobilindustrie"]'::jsonb,
    'es', '["Mecánica de precisión", "Vidriería", "Automoción"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut-resistance level F", "dexterity"]'::jsonb,
    'it', '["Antitaglio livello F", "destrezza"]'::jsonb,
    'fr', '["Anticoupure niveau F", "dextérité"]'::jsonb,
    'de', '["Schnittschutz Stufe F", "Fingerfertigkeit"]'::jsonb,
    'es', '["Anticorte nivel F", "destreza"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7-11"'::jsonb,
    'it', '"7-11"'::jsonb,
    'fr', '"2026-11-07 00:00:00"'::jsonb,
    'de', '"2026-11-07 00:00:00"'::jsonb,
    'es', '"2026-11-07 00:00:00"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["HPPE", "stainless-steel", "PU", "nitrile"]'::jsonb,
    'it', '["HPPE", "acciaio inox", "PU", "nitrile"]'::jsonb,
    'fr', '["HPPE", "acier inoxydable", "PU", "nitrile"]'::jsonb,
    'de', '["HPPE", "Edelstahl", "PU", "Nitril"]'::jsonb,
    'es', '["HPPE", "acero inoxidable", "PU", "nitrilo"]'::jsonb
  )
WHERE id = '34107be2-b906-4086-a80f-458a8f861d4b';

-- hl-5301-d
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 5301-D"'::jsonb,
    'it', '"HL 5301-D"'::jsonb,
    'fr', '"HL 5301-D"'::jsonb,
    'de', '"HL 5301-D"'::jsonb,
    'es', '"HL 5301-D"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-protection glove with double micro‑foam nitrile palm coating, 13‑gauge. Composition: fiberglass, HPPE, nylon, spandex with NBR finish. Ideal for grip in oily conditions, abrasion resistance and mechanical protection."'::jsonb,
    'it', '"Guanto antitaglio con palmo in doppia spalmatura di microschiuma di nitrile, 13 aghi. Composizione: fibra di vetro, HPPE, nylon, spandex spalmato NBR. Indicato per presa in oli, resistenza all’abrasione e protezione meccanica."'::jsonb,
    'fr', '"Gant anticoupure avec paume à double enduction en mousse de nitrile microporeuse, 13 jauges. Composition : fibre de verre, HPPE, nylon, spandex enduit de NBR. Indiqué pour la prise en présence d''huiles, la résistance à l''abrasion et la protection mécanique."'::jsonb,
    'de', '"Schnittschutzhandschuh mit doppelt beschichteter Handfläche aus Nitril-Mikroschaum, 13 Gauge. Zusammensetzung: Glasfaser, HPPE, Nylon, mit NBR beschichtetes Spandex. Geeignet für Griffsicherheit bei Öl, Abriebfestigkeit und mechanischen Schutz."'::jsonb,
    'es', '"Guante anticorte con palma de doble recubrimiento de microespuma de nitrilo, 13 agujas. Composición: fibra de vidrio, HPPE, nailon, spandex recubierto de NBR. Indicado para agarre en presencia de aceites, resistencia a la abrasión y protección mecánica."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HPPE/glass‑fiber cut glove with double micro‑foam nitrile palm; excellent grip in oils."'::jsonb,
    'it', '"Guanto antitaglio HPPE/fibra di vetro con doppia microschiuma di nitrile sul palmo; ottima presa in oli."'::jsonb,
    'fr', '"Gant anticoupure HPPE/fibre de verre avec double mousse de nitrile microporeuse sur la paume ; excellente prise en présence d''huiles."'::jsonb,
    'de', '"Schnittschutzhandschuh aus HPPE/Glasfaser mit doppeltem Nitril-Mikroschaum auf der Handfläche; ausgezeichnete Griffigkeit bei Öl."'::jsonb,
    'es', '"Guante anticorte de HPPE/fibra de vidrio con doble microespuma de nitrilo en la palma; excelente agarre en aceites."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant gloves"'::jsonb,
    'it', '"Guanti antitaglio"'::jsonb,
    'fr', '"Gants anticoupure"'::jsonb,
    'de', '"Schnittschutzhandschuhe"'::jsonb,
    'es', '"Guantes anticorte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Superior dexterity & sensitivity", "Excellent dry-grip performance", "Excellent abrasion resistance", "Breathable back to ensure comfort during prolonged use"]'::jsonb,
    'it', '["Destrezza e sensibilità superiore", "Presa ottima in asciutto", "Eccellente resistenza all’abrasione", "Dorso traspirante per comfort in uso prolungato"]'::jsonb,
    'fr', '["Dextérité et sensibilité supérieures", "Excellente prise en milieu sec", "Résistance exceptionnelle à l’abrasion", "Dos respirant pour un confort optimal en usage prolongé"]'::jsonb,
    'de', '["Überlegene Fingerfertigkeit und Sensibilität", "Optimaler Griff im Trockenen", "Hervorragende Abriebfestigkeit", "Atmungsaktiver Handrücken für Komfort bei längerem Tragen"]'::jsonb,
    'es', '["Destreza y sensibilidad superiores", "Excelente agarre en seco", "Resistencia excepcional a la abrasión", "Dorso transpirable para mayor comodidad en uso prolongado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling high-cut-risk components in mechanical, glass & steel industries", "Handling oily parts", "Industrial assembly", "Quality-control operations"]'::jsonb,
    'it', '["Manipolazione componenti ad alto rischio taglio in industria meccanica, vetro, acciaio", "Movimentazione pezzi oleosi", "Assemblaggio industriale", "Operazioni di controllo qualità"]'::jsonb,
    'fr', '["Manipulation de composants à haut risque de coupure dans l''industrie mécanique, du verre et de l''acier", "Manutention de pièces huileuses", "Assemblage industriel", "Opérations de contrôle qualité"]'::jsonb,
    'de', '["Handhabung von Bauteilen mit hohem Schnittrisiko in der Metallverarbeitung, Glas- und Stahlindustrie", "Handhabung öliger Werkstücke", "Industriemontage", "Qualitätskontrollarbeiten"]'::jsonb,
    'es', '["Manipulación de componentes con alto riesgo de corte en la industria mecánica, del vidrio y del acero", "Manipulación de piezas oleosas", "Ensamblaje industrial", "Operaciones de control de calidad"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive", "Metallurgical industry", "Logistics"]'::jsonb,
    'it', '["Automotive", "Industria metallurgica", "Logistica"]'::jsonb,
    'fr', '["Automobile", "Industrie métallurgique", "Logistique"]'::jsonb,
    'de', '["Automobilindustrie", "Metallurgische Industrie", "Logistik"]'::jsonb,
    'es', '["Automoción", "Industria metalúrgica", "Logística"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut-protection glove", "oily environment", "HPPE", "glass fiber", "nitrile palm", "13-gauge"]'::jsonb,
    'it', '["guanto antitaglio", "ambiente oleoso", "HPPE", "fibra di vetro", "palmo nitrile", "13 aghi"]'::jsonb,
    'fr', '["gant anticoupure", "environnement huileux", "HPPE", "fibre de verre", "paume en nitrile", "13 jauges"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "ölige Umgebung", "HPPE", "Glasfaser", "Handfläche aus Nitril", "13 Nadeln"]'::jsonb,
    'es', '["guante anticorte", "entorno oleoso", "HPPE", "fibra de vidrio", "palma de nitrilo", "13 agujas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–11"'::jsonb,
    'it', '"7–11"'::jsonb,
    'fr', '"7–11"'::jsonb,
    'de', '"7–11"'::jsonb,
    'es', '"7–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["fiberglass", "HPPE", "nylon"]'::jsonb,
    'it', '["fibra di vetro", "HPPE", "nylon"]'::jsonb,
    'fr', '["fibre de verre", "HPPE", "nylon"]'::jsonb,
    'de', '["Glasfaser", "HPPE", "Nylon"]'::jsonb,
    'es', '["fibra de vidrio", "HPPE", "nylon"]'::jsonb
  )
WHERE id = '9e1f43c2-9bd6-4074-85a6-e0b802a38ff9';

-- hl-6wwg
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 6WWG"'::jsonb,
    'it', '"HL 6WWG"'::jsonb,
    'fr', '"HL 6WWG"'::jsonb,
    'de', '"HL 6WWG"'::jsonb,
    'es', '"HL 6WWG"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Premium full‑grain bovine leather Driver glove. Offers maximum abrasion, tear and puncture resistance while maintaining excellent comfort and fit. Handles hot parts up to ~100 °C."'::jsonb,
    'it', '"Guanto driver in pelle fiore di bovino di prima qualità. Offre massima resistenza ad abrasione, strappo e perforazione mantenendo comfort e vestibilità eccellenti."'::jsonb,
    'fr', '"Gant driver en cuir pleine fleur de bovin de première qualité. Il offre une résistance maximale à l''abrasion, à la déchirure et à la perforation, tout en garantissant un confort et un ajustement excellents."'::jsonb,
    'de', '"Driver-Handschuh aus hochwertigem Rindsnarbenleder. Bietet maximale Beständigkeit gegen Abrieb, Weiterreißen und Durchstich bei ausgezeichnetem Tragekomfort und Passform."'::jsonb,
    'es', '"Guante driver de cuero flor de bovino de primera calidad. Ofrece máxima resistencia a la abrasión, al desgarro y a la perforación, manteniendo un confort y un ajuste excelentes."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full‑grain bovine‑leather Driver glove; heat‑resistant with high dexterity."'::jsonb,
    'it', '"Guanto in pelle fiore di bovino driver, con resistenza EN407."'::jsonb,
    'fr', '"Gant driver en cuir pleine fleur de bovin, avec résistance EN407."'::jsonb,
    'de', '"Driver-Handschuh aus Rindsnarbenleder mit EN407-Beständigkeit."'::jsonb,
    'es', '"Guante driver de cuero flor de bovino, con resistencia EN407."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gloves for general use"'::jsonb,
    'it', '"Guanti per uso generico"'::jsonb,
    'fr', '"Gants à usage général"'::jsonb,
    'de', '"Universalhandschuhe"'::jsonb,
    'es', '"Guantes de uso general"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent abrasion resistance", "Excellent tear resistance", "Excellent puncture resistance"]'::jsonb,
    'it', '["Ottima resistenza all’abrasione", "Ottima tenuta allo strappo", "Ottima tenuta alla perforazione"]'::jsonb,
    'fr', '["Excellente résistance à l’abrasion", "Excellente résistance à la déchirure", "Excellente résistance à la perforation"]'::jsonb,
    'de', '["Ausgezeichnete Abriebfestigkeit", "Ausgezeichnete Weiterreißfestigkeit", "Ausgezeichneter Durchstichwiderstand"]'::jsonb,
    'es', '["Excelente resistencia a la abrasión", "Excelente resistencia al desgarro", "Excelente resistencia a la perforación"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction, light‑duty building & warehousing, agriculture", "Mechanical operations", "General‑purpose medium‑duty operations", "Handling hot parts up to 100 °C"]'::jsonb,
    'it', '["Attività edilizie e costruzioni, magazzinaggio, agricoltura per lavori di media protezione.", "Operazioni meccaniche", "Operazioni generiche media gravosità", "Manipolazione di pezzi caldi fino a 100°C"]'::jsonb,
    'fr', '["Activités de bâtiment et de construction, entreposage, agriculture pour des travaux de protection moyenne.", "Opérations mécaniques", "Opérations générales de gravité moyenne", "Manipulation de pièces chaudes jusqu''à 100 °C"]'::jsonb,
    'de', '["Bau- und Konstruktionstätigkeiten, Lagerhaltung, Landwirtschaft für Arbeiten mit mittlerem Schutzniveau.", "Mechanische Arbeiten", "Allgemeine Arbeiten mittlerer Beanspruchung", "Handhabung heißer Teile bis zu 100 °C"]'::jsonb,
    'es', '["Actividades de edificación y construcción, almacenaje, agricultura para trabajos de protección media.", "Operaciones mecánicas", "Operaciones genéricas de gravedad media", "Manipulación de piezas calientes hasta 100 °C"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Light building", "Logistics"]'::jsonb,
    'it', '["Edile", "Costruzioni leggere", "Logistica"]'::jsonb,
    'fr', '["Bâtiment", "Constructions légères", "Logistique"]'::jsonb,
    'de', '["Bau", "Leichtbau", "Logistik"]'::jsonb,
    'es', '["Construcción", "Construcciones ligeras", "Logística"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Driver glove", "leather", "heat‑resistant", "high dexterity"]'::jsonb,
    'it', '["Guanto in pelle", "Driver", "anticalore", "destrezza elevata"]'::jsonb,
    'fr', '["Gant en cuir", "Conducteurs", "anti-chaleur", "dextérité élevée"]'::jsonb,
    'de', '["Lederhandschuh", "Fahrer", "hitzebeständig", "hohe Fingerfertigkeit"]'::jsonb,
    'es', '["Guante de cuero", "Conductores", "resistente al calor", "destreza elevada"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"8–11"'::jsonb,
    'it', '"8–11"'::jsonb,
    'fr', '"8–11"'::jsonb,
    'de', '"8–11"'::jsonb,
    'es', '"8–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["leather"]'::jsonb,
    'it', '["pelle"]'::jsonb,
    'fr', '["cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["cuero"]'::jsonb
  )
WHERE id = '85049ea3-1e41-4d57-bf17-a34e312138db';

-- hl-8801-dsr
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 8801-DSR"'::jsonb,
    'it', '"HL 8801-DSR"'::jsonb,
    'fr', '"HL 8801-DSR"'::jsonb,
    'de', '"HL 8801-DSR"'::jsonb,
    'es', '"HL 8801-DSR"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Knitted cut‑protection glove in nylon, HPPE, tungsten & spandex, with sandy‑nitrile palm coating, reinforced between thumb & index. Protects critical cut zones while maintaining comfort & dexterity."'::jsonb,
    'it', '"Guanto antitaglio in nylon, HPPE, tungsteno e spandex con spalmatura in nitrile sabbiato, rinforzato tra pollice e indice. Protegge aree critiche da taglio mantenendo comfort e destrezza."'::jsonb,
    'fr', '"Gant anticoupure en nylon, HPPE, tungstène et spandex avec enduction en nitrile sablé, renforcé entre le pouce et l''index. Il protège les zones critiques contre la coupure tout en préservant confort et dextérité."'::jsonb,
    'de', '"Schnittschutzhandschuh aus Nylon, HPPE, Wolfram und Spandex mit sandiger Nitrilbeschichtung, verstärkt zwischen Daumen und Zeigefinger. Schützt kritische Bereiche vor Schnitten bei gleichzeitigem Komfort und Fingerfertigkeit."'::jsonb,
    'es', '"Guante anticorte de nailon, HPPE, tungsteno y spandex con recubrimiento de nitrilo arenado, reforzado entre el pulgar y el índice. Protege las zonas críticas del corte manteniendo confort y destreza."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13‑gauge cut‑protection glove with sandy‑nitrile palm and thumb–index reinforcement."'::jsonb,
    'it', '"Guanto antitaglio 13 aghi con palmo sabbiato in nitrile e rinforzo tra pollice‑indice."'::jsonb,
    'fr', '"Gant anticoupure 13 jauges avec paume en nitrile sablé et renfort entre le pouce et l''index."'::jsonb,
    'de', '"Schnittschutzhandschuh 13 Gauge mit sandig beschichteter Nitril-Handfläche und Verstärkung zwischen Daumen und Zeigefinger."'::jsonb,
    'es', '"Guante anticorte de 13 agujas con palma de nitrilo arenado y refuerzo entre el pulgar y el índice."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant gloves"'::jsonb,
    'it', '"Guanti antitaglio"'::jsonb,
    'fr', '"Gants anticoupure"'::jsonb,
    'de', '"Schnittschutzhandschuhe"'::jsonb,
    'es', '"Guantes anticorte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Maximum dexterity", "Excellent adhesion", "Excellent abrasion resistance", "Excellent grip in slightly oily conditions"]'::jsonb,
    'it', '["Massima destrezza", "Ottima aderenza", "Eccellente resistenza all’abrasione", "Ottima presa in ambiente leggermente oleoso"]'::jsonb,
    'fr', '["Dextérité maximale", "Excellente adhérence", "Résistance exceptionnelle à l’abrasion", "Excellente prise en milieu légèrement huileux"]'::jsonb,
    'de', '["Maximale Fingerfertigkeit", "Ausgezeichnete Griffigkeit", "Hervorragende Abriebfestigkeit", "Ausgezeichnete Griffigkeit in leicht öliger Umgebung"]'::jsonb,
    'es', '["Máxima destreza", "Excelente adherencia", "Resistencia excepcional a la abrasión", "Excelente agarre en ambientes ligeramente oleosos"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling small sharp components in mechanical, glass & steel industries", "Assembly of sensitive components", "Electronic sector", "Delicate mechanical operations"]'::jsonb,
    'it', '["Manipolazione piccoli componenti taglienti in industria meccanica, vetro, acciaio", "Montaggio componenti sensibili", "Settore elettronico", "Operazioni meccaniche delicate"]'::jsonb,
    'fr', '["Manipulation de petits composants tranchants dans l''industrie mécanique, du verre et de l''acier", "Montage de composants sensibles", "Secteur électronique", "Opérations mécaniques délicates"]'::jsonb,
    'de', '["Handhabung kleiner scharfkantiger Bauteile in der Metallverarbeitung, Glas- und Stahlindustrie", "Montage empfindlicher Bauteile", "Elektronikbranche", "Empfindliche mechanische Arbeiten"]'::jsonb,
    'es', '["Manipulación de pequeños componentes cortantes en la industria mecánica, del vidrio y del acero", "Montaje de componentes sensibles", "Sector electrónico", "Operaciones mecánicas delicadas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electronics", "Micro‑component assembly", "Pharmaceutical"]'::jsonb,
    'it', '["Elettronica", "Assemblaggio microcomponenti", "Farmaceutico"]'::jsonb,
    'fr', '["Électronique", "Assemblage de microcomposants", "Pharmaceutique"]'::jsonb,
    'de', '["Elektronik", "Montage von Mikrokomponenten", "Pharmazeutisch"]'::jsonb,
    'es', '["Electrónica", "Ensamblaje de microcomponentes", "Farmacéutico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut‑protection glove", "high dexterity", "sandy‑nitrile palm", "thumb‑index reinforcement", "13‑gauge"]'::jsonb,
    'it', '["guanto antitaglio", "elevata destrezza", "palmo nitrile sabbiato", "rinforzo pollice‑indice", "13 aghi"]'::jsonb,
    'fr', '["gant anticoupure", "grande dextérité", "paume en nitrile sablé", "renfort pouce-index", "13 jauges"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "hohe Fingerfertigkeit", "Handfläche aus sandgestrahltem Nitril", "Verstärkung Daumen-Zeigefinger", "13 Nadeln"]'::jsonb,
    'es', '["guante anticorte", "alta destreza", "palma de nitrilo granulado", "refuerzo pulgar-índice", "13 agujas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"6–11"'::jsonb,
    'it', '"6–11"'::jsonb,
    'fr', '"6–11"'::jsonb,
    'de', '"6–11"'::jsonb,
    'es', '"6–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["nylon", "HPPE", "tungsten", "spandex", "nitrile"]'::jsonb,
    'it', '["nylon", "HPPE", "tungsteno", "spandex", "nitrile"]'::jsonb,
    'fr', '["nylon", "HPPE", "tungstène", "spandex", "nitrile"]'::jsonb,
    'de', '["Nylon", "HPPE", "Wolfram", "Spandex", "Nitril"]'::jsonb,
    'es', '["nylon", "HPPE", "tungsteno", "spandex", "nitrilo"]'::jsonb
  )
WHERE id = '70768028-d532-43ba-901e-7f9ce31284cd';

COMMIT;
