-- Products locale merge from docs/LanguageAddon/Translations/Products.csv
-- Data-only UPDATE. No ALTER TABLE. No published-flag changes.
-- Part 5 of 5. Run this in the Supabase SQL editor after a backup, then run the next part.
-- Merges en/it/fr/de/es into existing JSONB locale objects.
-- Skipped: blank cells, "" placeholders, empty arrays, and empty objects.
-- Warning: the admin product editor still saves only en/it. Saving a product there will wipe fr/de/es.

BEGIN;

-- hl-8808-ds
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 8808-DS"'::jsonb,
    'it', '"HL 8808-DS"'::jsonb,
    'fr', '"HL 8808-DS"'::jsonb,
    'de', '"HL 8808-DS"'::jsonb,
    'es', '"HL 8808-DS"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Knitted cut‑protection glove in nylon, HPPE & tungsten filament, 18‑gauge, with sandy‑nitrile palm. Offers excellent abrasion, cut & tear resistance, with superior grip in oils & lubricants. High blade‑cut protection, level F."'::jsonb,
    'it', '"Guanto antitaglio in nylon, HPPE e filo di tungsteno a 18 aghi, palmo sabbiato in nitrile, Taglio F. Offre eccellente resistenza all’abrasione, al taglio e allo strappo, con ottima presa in presenza di oli e lubrificanti. Alta protezione al taglio da lama."'::jsonb,
    'fr', '"Gant anticoupure en nylon, HPPE et fil de tungstène 18 jauges, paume en nitrile sablé, niveau de coupure F. Il offre une excellente résistance à l''abrasion, à la coupure et à la déchirure, avec une excellente prise en présence d''huiles et de lubrifiants. Haute protection contre la coupure par lame."'::jsonb,
    'de', '"Schnittschutzhandschuh aus Nylon, HPPE und Wolframdraht, 18 Gauge, sandig beschichtete Nitril-Handfläche, Schnittschutzklasse F. Bietet hervorragende Beständigkeit gegen Abrieb, Schnitte und Weiterreißen, mit ausgezeichneter Griffigkeit bei Ölen und Schmierstoffen. Hoher Schutz vor Schnitten durch Klingen."'::jsonb,
    'es', '"Guante anticorte de nailon, HPPE e hilo de tungsteno de 18 agujas, palma de nitrilo arenado, corte nivel F. Ofrece excelente resistencia a la abrasión, al corte y al desgarro, con excelente agarre en presencia de aceites y lubricantes. Alta protección contra el corte por cuchilla."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18‑gauge cut‑protection glove with sandy‑nitrile palm. Cut level F."'::jsonb,
    'it', '"Guanto antitaglio (F) 18 aghi con palmo sabbiato in nitrile."'::jsonb,
    'fr', '"Gant anticoupure (F) 18 jauges avec paume en nitrile sablé."'::jsonb,
    'de', '"Schnittschutzhandschuh (F) 18 Gauge mit sandig beschichteter Nitril-Handfläche."'::jsonb,
    'es', '"Guante anticorte (F) de 18 agujas con palma de nitrilo arenado."'::jsonb
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
    'en', '["Maximum dexterity", "Excellent adhesion", "Excellent grip in oily conditions", "Excellent abrasion resistance"]'::jsonb,
    'it', '["Massima destrezza", "Ottima aderenza", "Ottima presa in ambiente oleoso", "Eccellente resistenza all’abrasione"]'::jsonb,
    'fr', '["Dextérité maximale", "Excellente adhérence", "Excellente prise en milieu huileux", "Résistance exceptionnelle à l’abrasion"]'::jsonb,
    'de', '["Maximale Fingerfertigkeit", "Ausgezeichnete Griffigkeit", "Ausgezeichnete Griffigkeit in öliger Umgebung", "Hervorragende Abriebfestigkeit"]'::jsonb,
    'es', '["Máxima destreza", "Excelente adherencia", "Excelente agarre en ambientes oleosos", "Resistencia excepcional a la abrasión"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling small sharp components in mechanical, glass & steel industries", "Mechanical-shop assembly", "Mechanical work with lubricants", "Heavy industrial assembly"]'::jsonb,
    'it', '["Manipolazione piccoli componenti taglienti industria meccanica, vetro, acciaio", "Assemblaggio in officina meccanica", "Lavori meccanici con lubrificanti", "Assemblaggio industriale pesante"]'::jsonb,
    'fr', '["Manipulation de petits composants tranchants dans l''industrie mécanique, du verre et de l''acier", "Assemblage en atelier mécanique", "Travaux mécaniques avec lubrifiants", "Assemblage industriel lourd"]'::jsonb,
    'de', '["Handhabung kleiner scharfkantiger Bauteile in der Metallverarbeitung, Glas- und Stahlindustrie", "Montage in der mechanischen Werkstatt", "Mechanische Arbeiten mit Schmierstoffen", "Schwere industrielle Montage"]'::jsonb,
    'es', '["Manipulación de pequeños componentes cortantes en la industria mecánica, del vidrio y del acero", "Ensamblaje en taller mecánico", "Trabajos mecánicos con lubricantes", "Montaje industrial pesado"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive", "Precision mechanics", "Petrochemical"]'::jsonb,
    'it', '["Automotive", "Meccanica di precisione", "Industria petrolchimica"]'::jsonb,
    'fr', '["Automobile", "Mécanique de précision", "Industrie pétrochimique"]'::jsonb,
    'de', '["Automobilindustrie", "Feinmechanik", "Petrochemische Industrie"]'::jsonb,
    'es', '["Automoción", "Mecánica de precisión", "Industria petroquímica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut‑protection glove", "high dexterity", "sandy‑nitrile palm", "ANSI Cut 4", "18‑gauge"]'::jsonb,
    'it', '["guanto antitaglio", "elevata destrezza", "palmo nitrile sabbiato", "ANSI Cut 4", "18 aghi"]'::jsonb,
    'fr', '["gant anticoupure", "grande dextérité", "paume en nitrile sablé", "ANSI Cut 4", "18 jauges"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "hohe Fingerfertigkeit", "Handfläche aus sandgestrahltem Nitril", "ANSI Cut 4", "18 Nadeln"]'::jsonb,
    'es', '["guante anticorte", "alta destreza", "palma de nitrilo granulado", "ANSI Cut 4", "18 agujas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–11"'::jsonb,
    'it', '"7–11"'::jsonb,
    'fr', '"7–11"'::jsonb,
    'de', '"7–11"'::jsonb,
    'es', '"7–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["nylon", "HPPE", "tungsten"]'::jsonb,
    'it', '["nylon", "HPPE", "tungsteno"]'::jsonb,
    'fr', '["nylon", "HPPE", "tungstène"]'::jsonb,
    'de', '["Nylon", "HPPE", "Wolfram"]'::jsonb,
    'es', '["nylon", "HPPE", "tungsteno"]'::jsonb
  )
WHERE id = '0b6788dd-6d98-44ea-839d-4c63dda9d9f0';

-- hl-8808-s
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 8808-S"'::jsonb,
    'it', '"HL 8808-S"'::jsonb,
    'fr', '"HL 8808-S"'::jsonb,
    'de', '"HL 8808-S"'::jsonb,
    'es', '"HL 8808-S"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18‑gauge cotton glove with sandy‑nitrile coated palm; hypoallergenic. Delivers high dexterity, optimal grip and breathability for extended use in humid or lightly oily environments."'::jsonb,
    'it', '"Guanto in cotone 18 aghi con palmo spalmato in sandy nitrile, anallergico, con elevata destrezza, presa ottimale e traspirabilità per uso prolungato in ambienti umidi o leggermente oleosi."'::jsonb,
    'fr', '"Gant en coton 18 jauges avec paume enduite de nitrile sablé, hypoallergénique, avec une grande dextérité, une prise optimale et une bonne respirabilité pour un usage prolongé en milieux humides ou légèrement huileux."'::jsonb,
    'de', '"Baumwollhandschuh, 18 Gauge, mit sandig beschichteter Nitril-Handfläche, hypoallergen, mit hoher Fingerfertigkeit, optimaler Griffigkeit und Atmungsaktivität für den Dauereinsatz in feuchten oder leicht öligen Umgebungen."'::jsonb,
    'es', '"Guante de algodón de 18 agujas con palma recubierta de nitrilo arenado, hipoalergénico, con alta destreza, agarre óptimo y transpirabilidad para uso prolongado en ambientes húmedos o ligeramente oleosos."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18‑gauge cotton glove with sandy‑nitrile coated palm; hypoallergenic."'::jsonb,
    'it', '"Guanto in cotone 18 aghi con palmo spalmato sandy nitrile, anallergico."'::jsonb,
    'fr', '"Gant en coton 18 jauges avec paume enduite de nitrile sablé, hypoallergénique."'::jsonb,
    'de', '"Baumwollhandschuh, 18 Gauge, mit sandig beschichteter Nitril-Handfläche, hypoallergen."'::jsonb,
    'es', '"Guante de algodón de 18 agujas con palma recubierta de nitrilo arenado, hipoalergénico."'::jsonb
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
    'en', '["Excellent tactile grip", "Superior dexterity", "Excellent abrasion resistance", "Hygroscopic, breathable, anti-sweat"]'::jsonb,
    'it', '["Eccellente presa tattile", "Destrezza superiore", "Ottima resistenza all’abrasione", "Igroscopico, traspirante, antisudore"]'::jsonb,
    'fr', '["Excellente préhension tactile", "Dextérité supérieure", "Excellente résistance à l’abrasion", "Hygroscopique, respirant, anti-transpiration"]'::jsonb,
    'de', '["Ausgezeichnete taktile Griffigkeit", "Überlegene Fingerfertigkeit", "Ausgezeichnete Abriebfestigkeit", "Hygroskopisch, atmungsaktiv, schweißhemmend"]'::jsonb,
    'es', '["Excelente agarre táctil", "Destreza superior", "Excelente resistencia a la abrasión", "Higroscópico, transpirable, antisudor"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Prolonged precision assembly & small-part operations", "Handling small components", "Extended use in humid & lightly oily environments"]'::jsonb,
    'it', '["Assemblaggio prolungato di precisione, operazioni piccole parti", "Movimentazione di piccoli componenti", "Uso prolungato in ambienti umidi e oleosi"]'::jsonb,
    'fr', '["Assemblage de précision prolongé, opérations sur petites pièces", "Manutention de petits composants", "Usage prolongé en milieux humides et huileux"]'::jsonb,
    'de', '["Langandauernde Präzisionsmontage, Arbeiten mit Kleinteilen", "Handhabung kleiner Bauteile", "Dauereinsatz in feuchten und öligen Umgebungen"]'::jsonb,
    'es', '["Montaje de precisión prolongado, operaciones con piezas pequeñas", "Manipulación de pequeños componentes", "Uso prolongado en ambientes húmedos y oleosos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electronics", "Medical-device assembly", "Food industry"]'::jsonb,
    'it', '["Elettronica", "Assemblaggio medicale", "Industria alimentare"]'::jsonb,
    'fr', '["Électronique", "Assemblage médical", "Industrie alimentaire"]'::jsonb,
    'de', '["Elektronik", "Medizinische Montage", "Lebensmittelindustrie"]'::jsonb,
    'es', '["Electrónica", "Ensamblaje médico", "Industria alimentaria"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut-protection glove", "high dexterity", "hypoallergenic", "humid environments", "oily environments"]'::jsonb,
    'it', '["Guanto antitaglio", "elevata destrezza", "anallergico", "ambienti umidi", "ambienti oleosi"]'::jsonb,
    'fr', '["Gant anticoupure", "grande dextérité", "hypoallergénique", "environnements humides", "environnements huileux"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "hohe Fingerfertigkeit", "hypoallergen", "feuchte Umgebungen", "ölige Umgebungen"]'::jsonb,
    'es', '["Guante anticorte", "alta destreza", "hipoalergénico", "entornos húmedos", "entornos oleosos"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–11"'::jsonb,
    'it', '"7–11"'::jsonb,
    'fr', '"7–11"'::jsonb,
    'de', '"7–11"'::jsonb,
    'es', '"7–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton", "nitrile"]'::jsonb,
    'it', '["cotone", "nitrile"]'::jsonb,
    'fr', '["coton", "nitrile"]'::jsonb,
    'de', '["Baumwolle", "Nitril"]'::jsonb,
    'es', '["algodón", "nitrilo"]'::jsonb
  )
WHERE id = '1172eaf7-3063-42ae-94ac-ebab908ec9b8';

-- hl-dy015g
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL DY015G"'::jsonb,
    'it', '"HL DY015G"'::jsonb,
    'fr', '"HL DY015G"'::jsonb,
    'de', '"HL DY015G"'::jsonb,
    'es', '"HL DY015G"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"“Continuous-yarn HPPE multifiber cut glove (15-gauge) with goat-grain leather–reinforced palm. Ideal where maximum blade-cut protection and excellent dexterity are required.”"'::jsonb,
    'it', '"\"Guanto antitaglio a filo continuo in HPPE multifibra ad alta tenacità, finezza 15, con palmo rinforzato in pelle di ovocaprino. \nIdeale in ambiente dove necessita grande protezione dal taglio da lama e ottima destrezza\""'::jsonb,
    'fr', '"\"Gant anticoupure à fil continu en HPPE multifibre à haute ténacité, finesse 15, avec paume renforcée en cuir ovin-caprin. \nIdéal dans les environnements nécessitant une grande protection contre la coupure par lame et une excellente dextérité\""'::jsonb,
    'de', '"\"Schnittschutzhandschuh mit durchgehendem Faden aus hochfester HPPE-Multifaser, Feinheit 15, mit verstärkter Handfläche aus Schaf-/Ziegenleder. \nIdeal für Umgebungen, in denen hoher Schutz vor Schnitten durch Klingen und hervorragende Fingerfertigkeit erforderlich sind\""'::jsonb,
    'es', '"\"Guante anticorte de hilo continuo en HPPE multifibra de alta tenacidad, finura 15, con palma reforzada en cuero ovino-caprino. \nIdeal en entornos donde se necesita una gran protección contra el corte por cuchilla y una excelente destreza\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-tenacity HPPE-multifiber cut glove with goat-grain leather reinforced palm"'::jsonb,
    'it', '"Guanto antitaglio ad alta tenacità in HPPE multifibra con palmo rinforzato in pelle di ovocaprino."'::jsonb,
    'fr', '"Gant anticoupure à haute ténacité en HPPE multifibre avec paume renforcée en cuir ovin-caprin."'::jsonb,
    'de', '"Hochfester Schnittschutzhandschuh aus HPPE-Multifaser mit verstärkter Handfläche aus Schaf-/Ziegenleder."'::jsonb,
    'es', '"Guante anticorte de alta tenacidad en HPPE multifibra con palma reforzada en cuero ovino-caprino."'::jsonb
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
    'en', '["Excellent cut resistance", "Excellent tear strength", "Excellent puncture resistance"]'::jsonb,
    'it', '["Eccellente resistenza al taglio", "Eccellente tenuta allo strappo", "Ottima tenuta alla perforazione"]'::jsonb,
    'fr', '["Excellente résistance à la coupure", "Résistance exceptionnelle à la déchirure", "Excellente résistance à la perforation"]'::jsonb,
    'de', '["Ausgezeichnete Schnittfestigkeit", "Hervorragende Reißfestigkeit", "Ausgezeichneter Durchstichwiderstand"]'::jsonb,
    'es', '["Excelente resistencia al corte", "Resistencia excepcional al desgarro", "Excelente resistencia a la perforación"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["High-cut-hazard mechanical assembly", "Workshop work on glass & steel", "Mechanical operations", "Handling of sharp & abrasive objects"]'::jsonb,
    'it', '["Assemblaggio meccanico ad alto rischio di taglio", "Lavori in officina su vetro e acciaio", "Operazioni meccaniche", "Manipolazione oggetti taglienti o abrasivi"]'::jsonb,
    'fr', '["Assemblage mécanique à haut risque de coupure", "Travaux en atelier sur verre et acier", "Opérations mécaniques", "Manipulation d''objets tranchants ou abrasifs"]'::jsonb,
    'de', '["Mechanische Montage mit hohem Schnittrisiko", "Werkstattarbeiten an Glas und Stahl", "Mechanische Arbeiten", "Handhabung scharfer oder abrasiver Gegenstände"]'::jsonb,
    'es', '["Montaje mecánico con alto riesgo de corte", "Trabajos de taller en vidrio y acero", "Operaciones mecánicas", "Manipulación de objetos cortantes o abrasivos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Precision engineering", "Automotive", "Industrial assembly", "Glass"]'::jsonb,
    'it', '["Meccanica di precisione", "Automotive", "Assemblaggio industriale", "Vetro"]'::jsonb,
    'fr', '["Mécanique de précision", "Automobile", "Assemblage industriel", "Verre"]'::jsonb,
    'de', '["Feinmechanik", "Automobilindustrie", "Industriemontage", "Glas"]'::jsonb,
    'es', '["Mecánica de precisión", "Automoción", "Ensamblaje industrial", "Vidrio"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut-resistant glove", "high tenacity", "high dexterity"]'::jsonb,
    'it', '["guanto antitaglio", "tenacità", "destrezza elevata"]'::jsonb,
    'fr', '["gant anticoupure", "ténacité", "dextérité élevée"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "Zähigkeit", "hohe Fingerfertigkeit"]'::jsonb,
    'es', '["guante anticorte", "tenacidad", "destreza elevada"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7–8–9–10–11"'::jsonb,
    'it', '"7–8–9–10–11"'::jsonb,
    'fr', '"7–8–9–10–11"'::jsonb,
    'de', '"7–8–9–10–11"'::jsonb,
    'es', '"7–8–9–10–11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["HPPE", "leather"]'::jsonb,
    'it', '["HPPE", "pelle"]'::jsonb,
    'fr', '["HPPE", "cuir"]'::jsonb,
    'de', '["HPPE", "Leder"]'::jsonb,
    'es', '["HPPE", "cuero"]'::jsonb
  )
WHERE id = 'b29b342c-ca3f-4c78-903a-7ebe2a3e4d9e';

-- hl-p84
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL P84"'::jsonb,
    'it', '"HL P84"'::jsonb,
    'fr', '"HL P84"'::jsonb,
    'de', '"HL P84"'::jsonb,
    'es', '"HL P84"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cow-split leather glove with lined palm, fabric back and canvas cuff. Excellent tear & abrasion resistance."'::jsonb,
    'it', '"Guanto in pelle crosta di bovino, con palmo foderato, dorso in tela e manichetta in canvas.\nOttima resistenza a strappo e abrasione."'::jsonb,
    'fr', '"Gant en cuir croûte de bovin, avec paume doublée, dos en toile et manchette en canevas.\nExcellente résistance à la déchirure et à l''abrasion."'::jsonb,
    'de', '"Handschuh aus Rindspaltleder mit gefütterter Handfläche, Rücken aus Stoff und Stulpe aus Canvas.\nAusgezeichnete Weiterreiß- und Abriebfestigkeit."'::jsonb,
    'es', '"Guante de cuero serraje de bovino, con palma forrada, dorso de tela y manguito de lona.\nExcelente resistencia al desgarro y a la abrasión."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cow-split leather glove with lined palm, fabric back and canvas cuff"'::jsonb,
    'it', '"Guanto in pelle crosta di bovino con palmo foderato, dorso in tela e manichetta in canvas"'::jsonb,
    'fr', '"Gant en cuir croûte de bovin avec paume doublée, dos en toile et manchette en canevas"'::jsonb,
    'de', '"Handschuh aus Rindspaltleder mit gefütterter Handfläche, Rücken aus Stoff und Stulpe aus Canvas"'::jsonb,
    'es', '"Guante de cuero serraje de bovino con palma forrada, dorso de tela y manguito de lona"'::jsonb
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
    'en', '["Excellent abrasion resistance", "Excellent tear hold", "Excellent puncture hold", "Hypoallergenic"]'::jsonb,
    'it', '["Ottima resistenza all’abrasione", "Eccellente tenuta allo strappo", "Ottima tenuta alla perforazione", "Antiallergico"]'::jsonb,
    'fr', '["Excellente résistance à l’abrasion", "Résistance exceptionnelle à la déchirure", "Excellente résistance à la perforation", "Hypoallergénique"]'::jsonb,
    'de', '["Ausgezeichnete Abriebfestigkeit", "Hervorragende Reißfestigkeit", "Ausgezeichneter Durchstichwiderstand", "Hypoallergen"]'::jsonb,
    'es', '["Excelente resistencia a la abrasión", "Resistencia excepcional al desgarro", "Excelente resistencia a la perforación", "Antialérgico"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Suited for construction & light-duty work", "General medium-severity & mechanical hazards", "Handling components in dry environments"]'::jsonb,
    'it', '["Adatto all’industria edile e attività di edilizia leggera", "Operazioni generiche di media gravità e rischi meccanici"]'::jsonb,
    'fr', '["Adapté à l''industrie du bâtiment et aux activités de construction légère", "Opérations générales de gravité moyenne et risques mécaniques"]'::jsonb,
    'de', '["Geeignet für die Bauindustrie und leichte Bautätigkeiten", "Allgemeine Arbeiten mittleren Schweregrads mit mechanischen Risiken"]'::jsonb,
    'es', '["Adecuado para la industria de la construcción y actividades de edificación ligera", "Operaciones genéricas de gravedad media y riesgos mecánicos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Maintenance", "Mechanical industry"]'::jsonb,
    'it', '["Edilizia", "Manutenzioni", "Industria meccanica"]'::jsonb,
    'fr', '["Construction", "Maintenances", "Industrie mécanique"]'::jsonb,
    'de', '["Bauwesen", "Wartungsarbeiten", "Maschinenbauindustrie"]'::jsonb,
    'es', '["Construcción", "Mantenimientos", "Industria mecánica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather glove", "mechanical-hazard resistance"]'::jsonb,
    'it', '["Guanto in pelle", "resistenza meccanica"]'::jsonb,
    'fr', '["Gant en cuir", "résistance mécanique"]'::jsonb,
    'de', '["Lederhandschuh", "mechanische Festigkeit"]'::jsonb,
    'es', '["Guante de cuero", "resistencia mecánica"]'::jsonb
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
WHERE id = '7e0248ba-a127-4b03-ac31-be48d9184195';

-- i-5
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"i-5"'::jsonb,
    'it', '"i-5"'::jsonb,
    'fr', '"i-5"'::jsonb,
    'de', '"i-5"'::jsonb,
    'es', '"i-5"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welding safety glasses with the option to fit an additional optional frame, providing enhanced protection against particles, dust, and dirt"'::jsonb,
    'it', '"Occhiali protettivi da saldatura con possibilità di montaggio montatura aggiuntiva opzionale offre una maggiore protezione da particelle, polvere e sporcizia"'::jsonb,
    'fr', '"Lunettes de protection pour le soudage avec possibilité de montage d''une monture supplémentaire en option, offrant une protection accrue contre les particules, la poussière et les salissures"'::jsonb,
    'de', '"Schweißerschutzbrille mit Möglichkeit zur Montage eines optionalen Zusatzrahmens, der einen erhöhten Schutz vor Partikeln, Staub und Verschmutzung bietet"'::jsonb,
    'es', '"Gafas de protección para soldadura con posibilidad de montar una montura adicional opcional que ofrece mayor protección contra partículas, polvo y suciedad"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Metal-free UV400 glasses with IR protection"'::jsonb,
    'it', '"Ochiali in plastica UV400 con lenti IR"'::jsonb,
    'fr', '"Lunettes en plastique UV400 avec verres IR"'::jsonb,
    'de', '"Kunststoffbrille UV400 mit IR-Gläsern"'::jsonb,
    'es', '"Gafas de plástico UV400 con lentes IR"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Eye & Face protection"'::jsonb,
    'it', '"Protezione occhi e viso"'::jsonb,
    'fr', '"Protection des yeux et du visage"'::jsonb,
    'de', '"Augen- und Gesichtsschutz"'::jsonb,
    'es', '"Protección de los ojos y la cara"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety spectacles"'::jsonb,
    'it', '"Occhiali di sicurezza"'::jsonb,
    'fr', '"Lunettes de sécurité"'::jsonb,
    'de', '"Schutzbrillen"'::jsonb,
    'es', '"Gafas de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Soft seal frame technology wraps around the brow  providing protection from particle ingress", "Side shield offers additional protection from hazards", "Metal-free", "Polycarbonate lens with uvex infradur treatment - scratch resistant and anti-fog", "Enhanced protection thanks to X-tended technology"]'::jsonb,
    'it', '["Protezione maggiore grazie alla tecnologia x-tended", "Metal-free", "Robusta lente in policarbonato con trattamento uvex infradur - lente antigraffio e antiappannante"]'::jsonb,
    'fr', '["Protection accrue grâce à la technologie x-tended", "Sans métal", "Verre robuste en polycarbonate avec traitement uvex infradur - verre anti-rayures et anti-buée"]'::jsonb,
    'de', '["Erhöhter Schutz dank der x-tended-Technologie", "Metallfrei", "Robustes Polycarbonat-Glas mit uvex-infradur-Beschichtung - kratzfestes und beschlagfreies Glas"]'::jsonb,
    'es', '["Mayor protección gracias a la tecnología x-tended", "Sin metal", "Lente robusta de policarbonato con tratamiento uvex infradur - lente antirrayas y antivaho"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operation with UV and IR exposure", "Welding spectacles"]'::jsonb,
    'it', '["Operazioni di saldatura", "Operazioni in alti forni o in presenza di materiale incandescente"]'::jsonb,
    'fr', '["Opérations de soudage", "Opérations dans des hauts fourneaux ou en présence de matériaux incandescents"]'::jsonb,
    'de', '["Schweißarbeiten", "Arbeiten an Hochöfen oder bei Vorhandensein von glühendem Material"]'::jsonb,
    'es', '["Operaciones de soldadura", "Operaciones en altos hornos o en presencia de material incandescente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel processing and manufacturing", "Construction"]'::jsonb,
    'it', '["Industra del vetro", "Industria dell''Acciaio", "Metallurgia", "Edilizia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie", "Construction"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie", "Bauwesen"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia", "Construcción"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding"]'::jsonb,
    'it', '["Saldatura"]'::jsonb,
    'fr', '["Soudage"]'::jsonb,
    'de', '["Schweißen"]'::jsonb,
    'es', '["Soldadura"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["TPU", "TPE", "POM", "PC"]'::jsonb
  ),
  eye_face_comfort_features_locales = COALESCE(eye_face_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ergonomically shaped side arms with multi-incline points and length adjustment allow for a high level of individualisation to ensure a good fit  for all facial shapes and head widths", "Soft-grip temple ends provide a comfortable, secure fit without pressure", "Soft, flexible nose pad adapts to the wearer, delivering a non-slip and  pressure-free fit"]'::jsonb,
    'it', '["Stanghette ergonomiche con regolazione dell''inclinazione e della lunghezza a più livelli", "Supporto nasale anatomico per un comfort che dura tutto il giorno"]'::jsonb,
    'fr', '["Branches ergonomiques avec réglage de l''inclinaison et de la longueur à plusieurs niveaux", "Support nasal anatomique pour un confort qui dure toute la journée"]'::jsonb,
    'de', '["Ergonomische Bügel mit mehrstufiger Neigungs- und Längenverstellung", "Anatomische Nasenauflage für ganztägigen Komfort"]'::jsonb,
    'es', '["Patillas ergonómicas con regulación de la inclinación y la longitud en varios niveles", "Apoyo nasal anatómico para un confort que dura todo el día"]'::jsonb
  ),
  eye_face_equipment_locales = COALESCE(eye_face_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Optional clip-in frame seal provides extra protection against particles, dirt  and dust"]'::jsonb
  ),
  coatings_locales = COALESCE(coatings_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Anti-scratch", "Anti-fog"]'::jsonb,
    'it', '["Anti-graffio", "Anti-appannamento"]'::jsonb,
    'fr', '["Anti-rayures", "Anti-buée"]'::jsonb,
    'de', '["Kratzfest", "Beschlagfrei"]'::jsonb,
    'es', '["Antirrayaduras", "Antivaho"]'::jsonb
  ),
  eye_face_materials_locales = COALESCE(eye_face_materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"arm": "Plastic", "lens": "Polycarbonate (PC)", "frame": "Plastic", "headband": ""}'::jsonb,
    'it', '{"arm": "Plastica", "lens": "Policarbonato (PC)", "frame": "Plastica", "headband": ""}'::jsonb,
    'fr', '{"arm": "Plastique", "lens": "Polycarbonate (PC)", "frame": "Plastique", "headband": ""}'::jsonb,
    'de', '{"arm": "Kunststoff", "lens": "Polycarbonat (PC)", "frame": "Kunststoff", "headband": ""}'::jsonb,
    'es', '{"arm": "Plástico", "lens": "Policarbonato (PC)", "frame": "Plástico", "headband": ""}'::jsonb
  )
WHERE id = '59d235e4-337d-49f1-b90f-e176ddfa115c';

-- k00-845ip
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"K00-845IP"'::jsonb,
    'it', '"K00-845IP"'::jsonb,
    'fr', '"K00-845IP"'::jsonb,
    'de', '"K00-845IP"'::jsonb,
    'es', '"K00-845IP"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18G UHMWPE/ Graphene/ Nylon Liner glove, Blue Smooth Nitrile + Black Nitrile Microfoam Palm Coating with Sandy Finish, Thumb Crotch Reinforcement, PVC (TPR) Back Protection."'::jsonb,
    'it', '"Guanto 18 aghi con fodera in UHMWPE/grafene/nylon, rivestimento in nitrile liscio blu + microschiuma di nitrile nera sul palmo con finitura sabbiata, Thumb crotch rinforzato, protezione posteriore in PVC (TPR)."'::jsonb,
    'fr', '"Gant 18 jauges avec doublure en UHMWPE/graphène/nylon, enduction en nitrile lisse bleu + mousse de nitrile noire microporeuse sur la paume avec finition sablée, fourche du pouce renforcée, protection dorsale en PVC (TPR)."'::jsonb,
    'de', '"Handschuh 18 Gauge mit Futter aus UHMWPE/Graphen/Nylon, glatte blaue Nitrilbeschichtung + schwarzer Nitril-Mikroschaum auf der Handfläche mit sandiger Oberflächenstruktur, verstärkter Daumenzwickel, Handrückenschutz aus PVC (TPR)."'::jsonb,
    'es', '"Guante de 18 agujas con forro de UHMWPE/grafeno/nailon, recubrimiento de nitrilo liso azul + microespuma de nitrilo negra en la palma con acabado arenado, horquilla del pulgar reforzada, protección dorsal de PVC (TPR)."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18G Level D anti-cut impact protection glove with micro-foam nitrile coating"'::jsonb,
    'it', '"Guanto anti-impatto e antitaglio livello D spalmato in micro-schiuma di nitrile"'::jsonb,
    'fr', '"Gant anti-impact et anticoupure niveau D, enduit de micro-mousse de nitrile"'::jsonb,
    'de', '"Schlagschutz- und Schnittschutzhandschuh der Klasse D, beschichtet mit Nitril-Mikroschaum"'::jsonb,
    'es', '"Guante antiimpacto y anticorte de nivel D, recubierto de microespuma de nitrilo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Impact protection gloves"'::jsonb,
    'it', '"Guanti anti-impatto"'::jsonb,
    'fr', '"Gants anti-impact"'::jsonb,
    'de', '"Anti-Impact-Handschuhe"'::jsonb,
    'es', '"Guantes antiimpacto"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["DMF and silicone free", "No stainless steel or fiberglass", "Ergonomically shaped for superior fit", "Bacteriostatic kills harmful bacteria", "Touch Screen compatible"]'::jsonb,
    'it', '["Senza DMF e senza silicone", "Niente acciaio inossidabile o fibra di vetro", "Forma ergonomica per una vestibilità superiore", "Batteriostatico per eliminare i batteri nocivi", "Compatibile con Touch Screen"]'::jsonb,
    'fr', '["Sans DMF ni silicone", "Pas d''acier inoxydable ni de fibre de verre", "Forme ergonomique pour un ajustement supérieur", "Bactériostatique pour éliminer les bactéries nocives", "Compatible avec écran tactile"]'::jsonb,
    'de', '["Ohne DMF und ohne Silikon", "Kein Edelstahl oder Glasfaser", "Ergonomische Form für optimalen Sitz", "Bakteriostatisch zur Beseitigung schädlicher Bakterien", "Touchscreen-kompatibel"]'::jsonb,
    'es', '["Sin DMF y sin silicona", "Sin acero inoxidable ni fibra de vidrio", "Forma ergonómica para un ajuste superior", "Bacteriostático para eliminar las bacterias nocivas", "Compatible con pantalla táctil"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations in dusty and humid environments", "Impact protection in construction", "Hand protection in heavy industry"]'::jsonb,
    'it', '["Operazioni in ambienti polverosi e umidi", "Protezione da impatto in edilizia", "Protezione delle mani nell''industria pesante"]'::jsonb,
    'fr', '["Opérations en milieux poussiéreux et humides", "Protection contre les chocs dans le bâtiment", "Protection des mains dans l''industrie lourde"]'::jsonb,
    'de', '["Arbeiten in staubigen und feuchten Umgebungen", "Schlagschutz im Bauwesen", "Handschutz in der Schwerindustrie"]'::jsonb,
    'es', '["Operaciones en ambientes polvorientos y húmedos", "Protección contra impactos en la construcción", "Protección de las manos en la industria pesada"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Oil & Gas", "Mining", "Construction", "Heavy industry"]'::jsonb,
    'it', '["Oil & Gas", "Industria mineraria", "Edilizia", "Industria pesante"]'::jsonb,
    'fr', '["Pétrole et gaz", "Industrie minière", "Construction", "Industrie lourde"]'::jsonb,
    'de', '["Öl und Gas", "Bergbauindustrie", "Bauwesen", "Schwerindustrie"]'::jsonb,
    'es', '["Petróleo y gas", "Industria minera", "Construcción", "Industria pesada"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut protection level D", "anti-impact glove", "Graphene"]'::jsonb,
    'it', '["Guanto anti-impatto", "anti-taglio livello D", "Grafene"]'::jsonb,
    'fr', '["Gant anti-impact", "anticoupure niveau D", "Graphène"]'::jsonb,
    'de', '["Anti-Impact-Handschuh", "Schnittschutz Stufe D", "Graphen"]'::jsonb,
    'es', '["Guante antiimpacto", "anticorte nivel D", "Grafeno"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"7 - 11"'::jsonb,
    'it', '"7 - 11"'::jsonb,
    'fr', '"7 - 11"'::jsonb,
    'de', '"7 - 11"'::jsonb,
    'es', '"7 - 11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene"]'::jsonb,
    'it', '["Grafene"]'::jsonb,
    'fr', '["Graphène"]'::jsonb,
    'de', '["Graphen"]'::jsonb,
    'es', '["Grafeno"]'::jsonb
  )
WHERE id = 'f6138224-cace-4368-af27-1fef08173d20';

-- k01-424
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"K01-424"'::jsonb,
    'it', '"K01-424"'::jsonb,
    'fr', '"K01-424"'::jsonb,
    'de', '"K01-424"'::jsonb,
    'es', '"K01-424"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18G UHMWPE liner, blue smooth nitrile coating + black nitrile microfoam palm coating with sandy finishing glove"'::jsonb,
    'it', '"Guanto 18 aghi con fodera in UHMWPE, rivestimento in nitrile liscio blu + rivestimento in microschiuma di nitrile nero sul palmo con finitura sabbiata"'::jsonb,
    'fr', '"Gant 18 jauges avec doublure en UHMWPE, enduction en nitrile lisse bleu + enduction en mousse de nitrile noire microporeuse sur la paume avec finition sablée"'::jsonb,
    'de', '"Handschuh 18 Gauge mit UHMWPE-Futter, glatte blaue Nitrilbeschichtung + schwarze Nitril-Mikroschaumbeschichtung auf der Handfläche mit sandiger Oberflächenstruktur"'::jsonb,
    'es', '"Guante de 18 agujas con forro de UHMWPE, recubrimiento de nitrilo liso azul + recubrimiento de microespuma de nitrilo negro en la palma con acabado arenado"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut protection glove in graphene with HCT® Nitrile micro foam"'::jsonb,
    'it', '"Guanto di protezione dal taglio in grafene con microschiuma di nitrile HCT®"'::jsonb,
    'fr', '"Gant de protection contre la coupure en graphène avec mousse de nitrile microporeuse HCT®"'::jsonb,
    'de', '"Schnittschutzhandschuh aus Graphen mit HCT®-Nitril-Mikroschaum"'::jsonb,
    'es', '"Guante de protección contra el corte de grafeno con microespuma de nitrilo HCT®"'::jsonb
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
    'en', '["18 gauge grey Kyorene® Pro graphene liner", "No stainless steel or fiberglass", "Ergonomically shaped for superior fit", "Odor neutralizing to keep the gloves smelling Fresh", "Touch Screen compatible", "Food Grade glove"]'::jsonb,
    'it', '["Fodera in grafene Kyorene® Pro grigio calibro 18", "Niente acciaio inossidabile o fibra di vetro", "Forma ergonomica per una vestibilità superiore", "Neutralizzazione degli odori per mantenere i guanti con un odore fresco", "Compatibile con Touch Screen", "Guanto Food Grade"]'::jsonb,
    'fr', '["Doublure en graphène Kyorene® Pro gris, calibre 18", "Pas d''acier inoxydable ni de fibre de verre", "Forme ergonomique pour un ajustement supérieur", "Neutralisation des odeurs pour garder les gants toujours frais", "Compatible avec écran tactile", "Gant Food Grade"]'::jsonb,
    'de', '["Futter aus Kyorene® Pro Graphen, grau, Stärke 18", "Kein Edelstahl oder Glasfaser", "Ergonomische Form für optimalen Sitz", "Geruchsneutralisierung, damit die Handschuhe stets frisch riechen", "Touchscreen-kompatibel", "Food-Grade-Handschuh"]'::jsonb,
    'es', '["Forro de grafeno Kyorene® Pro gris, calibre 18", "Sin acero inoxidable ni fibra de vidrio", "Forma ergonómica para un ajuste superior", "Neutralización de olores para mantener los guantes con un olor fresco", "Compatible con pantalla táctil", "Guante Food Grade"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Fluid handling", "Engine assembly", "Operations in wet and oily environments", "Maintenance activities"]'::jsonb,
    'it', '["Protezione da liquidi", "Movimentazione liquidi", "Operazioni in ambienti umidi, bagnati e oleosi", "Assemblaggio motori"]'::jsonb,
    'fr', '["Protection contre les liquides", "Manutention de liquides", "Opérations en milieux humides, mouillés et huileux", "Assemblage de moteurs"]'::jsonb,
    'de', '["Schutz vor Flüssigkeiten", "Handhabung von Flüssigkeiten", "Arbeiten in feuchten, nassen und öligen Umgebungen", "Motormontage"]'::jsonb,
    'es', '["Protección contra líquidos", "Manipulación de líquidos", "Operaciones en ambientes húmedos, mojados y oleosos", "Montaje de motores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Aerospace", "Automotive", "Mechanical industries"]'::jsonb,
    'it', '["Automobilistica", "Aerospaziale", "Industria meccanica"]'::jsonb,
    'fr', '["Automobile", "Aérospatiale", "Industrie mécanique"]'::jsonb,
    'de', '["Automobilbranche", "Luft- und Raumfahrt", "Maschinenbauindustrie"]'::jsonb,
    'es', '["Automotriz", "Aeroespacial", "Industria mecánica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut-protection glove", "Graphene", "food grade"]'::jsonb,
    'it', '["Grafene", "guanto antitaglio", "food grade"]'::jsonb,
    'fr', '["Graphène", "gant anticoupure", "qualité alimentaire"]'::jsonb,
    'de', '["Graphen", "Schnittschutzhandschuh", "lebensmittelecht"]'::jsonb,
    'es', '["Grafeno", "guante anticorte", "grado alimentario"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"6 - 11"'::jsonb,
    'it', '"6 - 11"'::jsonb,
    'fr', '"6 - 11"'::jsonb,
    'de', '"6 - 11"'::jsonb,
    'es', '"6 - 11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene"]'::jsonb,
    'it', '["Grafene"]'::jsonb,
    'fr', '["Graphène"]'::jsonb,
    'de', '["Graphen"]'::jsonb,
    'es', '["Grafeno"]'::jsonb
  )
WHERE id = 'a8288eef-471f-4eeb-9de5-630e52933d43';

-- k01-903r
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"K01-903R"'::jsonb,
    'it', '"K01-903R"'::jsonb,
    'fr', '"K01-903R"'::jsonb,
    'de', '"K01-903R"'::jsonb,
    'es', '"K01-903R"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18 gauge grey UHMWPE/Graphene nylon liner glove, black nitrile palm coating. Reinforcement on crotch."'::jsonb,
    'it', '"Guanto 18 aghi con fodera grigia in nylon UHMWPE/Grafene, rivestimento nero sul palmo in nitrile. Thumb crotch rinforzato"'::jsonb,
    'fr', '"Gant 18 jauges avec doublure grise en nylon UHMWPE/graphène, enduction noire en nitrile sur la paume. Fourche du pouce renforcée"'::jsonb,
    'de', '"Handschuh 18 Gauge mit grauem Futter aus UHMWPE/Graphen-Nylon, schwarze Nitrilbeschichtung auf der Handfläche. Verstärkter Daumenzwickel"'::jsonb,
    'es', '"Guante de 18 agujas con forro gris de nailon UHMWPE/grafeno, recubrimiento negro de nitrilo en la palma. Horquilla del pulgar reforzada"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18 gauge grey UHMWPE/Graphene nylon liner glove, black nitrile palm coating."'::jsonb,
    'it', '"Guanto 18 aghi con fodera grigia in nylon UHMWPE/Grafene, rivestimento nero sul palmo in nitrile"'::jsonb,
    'fr', '"Gant 18 jauges avec doublure grise en nylon UHMWPE/graphène, enduction noire en nitrile sur la paume"'::jsonb,
    'de', '"Handschuh 18 Gauge mit grauem Futter aus UHMWPE/Graphen-Nylon, schwarze Nitrilbeschichtung auf der Handfläche"'::jsonb,
    'es', '"Guante de 18 agujas con forro gris de nailon UHMWPE/grafeno, recubrimiento negro de nitrilo en la palma"'::jsonb
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
    'en', '["DMF and silicone free", "No stainless steel or fiberglass", "Ergonomically shaped for superior fit", "Bacteriostatic kills harmful bacteria", "Touch screen compatible", "Black nitrile palm coating", "ANSI A9 Cut level protection"]'::jsonb,
    'it', '["Senza DMF e senza silicone", "Niente acciaio inossidabile o fibra di vetro", "Forma ergonomica per una vestibilità superiore", "Batteriostatico per eliminare i batteri nocivi", "Compatibile con Touch Screen", "Protezione al taglio F e ANSI A9", "Spalmato sul palmo in nitrile nero"]'::jsonb,
    'fr', '["Sans DMF ni silicone", "Pas d''acier inoxydable ni de fibre de verre", "Forme ergonomique pour un ajustement supérieur", "Bactériostatique pour éliminer les bactéries nocives", "Compatible avec écran tactile", "Protection contre la coupure niveau F et ANSI A9", "Paume enduite de nitrile noir"]'::jsonb,
    'de', '["Ohne DMF und ohne Silikon", "Kein Edelstahl oder Glasfaser", "Ergonomische Form für optimalen Sitz", "Bakteriostatisch zur Beseitigung schädlicher Bakterien", "Touchscreen-kompatibel", "Schnittschutz Klasse F und ANSI A9", "Handfläche mit schwarzem Nitril beschichtet"]'::jsonb,
    'es', '["Sin DMF y sin silicona", "Sin acero inoxidable ni fibra de vidrio", "Forma ergonómica para un ajuste superior", "Bacteriostático para eliminar las bacterias nocivas", "Compatible con pantalla táctil", "Protección al corte nivel F y ANSI A9", "Palma recubierta de nitrilo negro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling of sharp objects", "Handling in oily conditions", "Protection against extremely high cut risks"]'::jsonb,
    'it', '["Operazioni con elevatissimo rischio di taglio", "Operazioni in presenza di oli o grassi", "Manovre di oggetti e componenti taglienti"]'::jsonb,
    'fr', '["Opérations à très haut risque de coupure", "Opérations en présence d''huiles ou de graisses", "Manœuvre d''objets et de composants tranchants"]'::jsonb,
    'de', '["Arbeiten mit sehr hohem Schnittrisiko", "Arbeiten mit Ölen oder Fetten", "Handhabung scharfer Gegenstände und Bauteile"]'::jsonb,
    'es', '["Operaciones con riesgo de corte muy elevado", "Operaciones en presencia de aceites o grasas", "Maniobra de objetos y componentes cortantes"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Recycling"]'::jsonb,
    'it', '["Industria del vetro", "Industria mettallurgica e dell''acciaio", "Riciclaggio"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie métallurgique et sidérurgique", "Recyclage"]'::jsonb,
    'de', '["Glasindustrie", "Metall- und Stahlindustrie", "Recycling"]'::jsonb,
    'es', '["Industria del vidrio", "Industria metalúrgica y del acero", "Reciclaje"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cut protection", "Cut level F", "ANSI A9 cut"]'::jsonb,
    'it', '["Guanto antitaglio", "Antitaglio livello F", "ANSI A9"]'::jsonb,
    'fr', '["Gant anticoupure", "Anticoupure niveau F", "ANSI A9"]'::jsonb,
    'de', '["Schnittschutzhandschuh", "Schnittschutz Stufe F", "ANSI A9"]'::jsonb,
    'es', '["Guante anticorte", "Anticorte nivel F", "ANSI A9"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"6 - 11"'::jsonb,
    'it', '"6 - 11"'::jsonb,
    'fr', '"6 - 11"'::jsonb,
    'de', '"6 - 11"'::jsonb,
    'es', '"6 - 11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene"]'::jsonb,
    'it', '["Grafene"]'::jsonb,
    'fr', '["Graphène"]'::jsonb,
    'de', '["Graphen"]'::jsonb,
    'es', '["Grafeno"]'::jsonb
  )
WHERE id = '1b9e5862-01da-4335-af85-89aa0c646e0a';

-- k02-303l
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"K02-303L"'::jsonb,
    'it', '"K02-303L"'::jsonb,
    'fr', '"K02-303L"'::jsonb,
    'de', '"K02-303L"'::jsonb,
    'es', '"K02-303L"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18G super thin UHMWPE liner glove, black nitrile nanofoam palm coating"'::jsonb,
    'it', '"Guanto 18 aghi con fodera in UHMWPE super sottile, rivestimento sul palmo in nano foam di nitrile nero"'::jsonb,
    'fr', '"Gant 18 jauges avec doublure en UHMWPE ultra-fine, enduction de la paume en nano-mousse de nitrile noir"'::jsonb,
    'de', '"Handschuh 18 Gauge mit ultradünnem UHMWPE-Futter, Handflächenbeschichtung aus schwarzem Nitril-Nanoschaum"'::jsonb,
    'es', '"Guante de 18 agujas con forro de UHMWPE ultrafino, recubrimiento de la palma en nanoespuma de nitrilo negro"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut protection glove, black nitrile nanofoam palm coating, graphene"'::jsonb,
    'it', '"Guanto di protezione dal taglio, rivestimento del palmo in nano foam di nitrile nero, grafene"'::jsonb,
    'fr', '"Gant de protection contre la coupure, enduction de la paume en nano-mousse de nitrile noir, graphène"'::jsonb,
    'de', '"Schnittschutzhandschuh, Handflächenbeschichtung aus schwarzem Nitril-Nanoschaum, Graphen"'::jsonb,
    'es', '"Guante de protección contra el corte, recubrimiento de la palma en nanoespuma de nitrilo negro, grafeno"'::jsonb
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
    'en', '["18 gauge 100D grey Kyorene® Pro graphene liner", "No stainless steel or fiberglass", "Ergonomically shaped for superior fit", "Touch screen compatible", "Black nitrile nano-foam coating"]'::jsonb,
    'it', '["Fodera in grafene Kyorene® Pro grigio 100D calibro 18", "Niente acciaio inossidabile o fibra di vetro", "Forma ergonomica per una vestibilità superiore", "Compatibile con Touch Screen"]'::jsonb,
    'fr', '["Doublure en graphène Kyorene® Pro gris 100D, calibre 18", "Pas d''acier inoxydable ni de fibre de verre", "Forme ergonomique pour un ajustement supérieur", "Compatible avec écran tactile"]'::jsonb,
    'de', '["Futter aus Kyorene® Pro Graphen, grau, 100D, Stärke 18", "Kein Edelstahl oder Glasfaser", "Ergonomische Form für optimalen Sitz", "Touchscreen-kompatibel"]'::jsonb,
    'es', '["Forro de grafeno Kyorene® Pro gris 100D, calibre 18", "Sin acero inoxidable ni fibra de vidrio", "Forma ergonómica para un ajuste superior", "Compatible con pantalla táctil"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling of sharp objects", "Operations in oily and greasy environments", "Warehousing", "Construction and building activities"]'::jsonb,
    'it', '["Movimentazione di oggetti affilati e taglienti", "Magazzinaggio", "Operazioni in ambienti umidi e oleosi", "Attivita'' edilizia e di costruzione"]'::jsonb,
    'fr', '["Manutention d''objets pointus et tranchants", "Entreposage", "Opérations en milieux humides et huileux", "Activités de bâtiment et de construction"]'::jsonb,
    'de', '["Handhabung spitzer und scharfer Gegenstände", "Lagerhaltung", "Arbeiten in feuchten und öligen Umgebungen", "Bau- und Konstruktionstätigkeiten"]'::jsonb,
    'es', '["Manipulación de objetos afilados y cortantes", "Almacenamiento", "Operaciones en ambientes húmedos y oleosos", "Actividades de edificación y construcción"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive", "Metal stamping", "Metal sheet handling", "Glass manufacturing", "Warehousing", "Construction"]'::jsonb,
    'it', '["Automobilistica", "Stampaggio metalli", "Edilizia", "Industria del vetro"]'::jsonb,
    'fr', '["Automobile", "Estampage des métaux", "Construction", "Industrie du verre"]'::jsonb,
    'de', '["Automobilbranche", "Metallumformung", "Bauwesen", "Glasindustrie"]'::jsonb,
    'es', '["Automotriz", "Estampado de metales", "Construcción", "Industria del vidrio"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut-resistant glove", "Graphene"]'::jsonb,
    'it', '["Grafene", "guanto anti-taglio"]'::jsonb,
    'fr', '["Graphène", "gant anticoupure"]'::jsonb,
    'de', '["Graphen", "Schnittschutzhandschuh"]'::jsonb,
    'es', '["Grafeno", "guante anticorte"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"6 - 11"'::jsonb,
    'it', '"6 - 11"'::jsonb,
    'fr', '"6 - 11"'::jsonb,
    'de', '"6 - 11"'::jsonb,
    'es', '"6 - 11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene"]'::jsonb,
    'it', '["Grafene"]'::jsonb,
    'fr', '["Graphène"]'::jsonb,
    'de', '["Graphen"]'::jsonb,
    'es', '["Grafeno"]'::jsonb
  )
WHERE id = 'bacb7186-5845-48bb-8e51-7f7aa0175d46';

-- k30h
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"K30H"'::jsonb,
    'it', '"K30H"'::jsonb,
    'fr', '"K30H"'::jsonb,
    'de', '"K30H"'::jsonb,
    'es', '"K30H"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dielectric helmet earmuffs for 30 mm Euroslot helmet connection offering 34 dB insulation and soft foam ear cushions"'::jsonb,
    'it', '"Cuffie di protezione dell''udito da elmetto per il sistema elmetto uvex pheos. \nSuperfici morbide in memory foam, con regolazione continua della lunghezza."'::jsonb,
    'fr', '"Casque antibruit à monter sur casque de protection pour le système de casque uvex pheos. \nSurfaces souples en mousse à mémoire de forme, avec réglage continu de la longueur."'::jsonb,
    'de', '"Kapselgehörschutz für Helm für das uvex-pheos-Helmsystem. \nWeiche Oberflächen aus Memory-Schaum, mit stufenloser Längenverstellung."'::jsonb,
    'es', '"Orejeras de protección auditiva para casco para el sistema de casco uvex pheos. \nSuperficies blandas de espuma viscoelástica, con regulación continua de la longitud."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dielectric helmet earmuffs"'::jsonb,
    'it', '"Cuffie di protezione dell''udito da elmetto per il sistema elmetto uvex pheos E"'::jsonb,
    'fr', '"Casque antibruit à monter sur casque de protection pour le système de casque uvex pheos E"'::jsonb,
    'de', '"Kapselgehörschutz für Helm für das uvex-pheos-E-Helmsystem"'::jsonb,
    'es', '"Orejeras de protección auditiva para casco para el sistema de casco uvex pheos E"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hearing Protection"'::jsonb,
    'it', '"Protezione dell''udito"'::jsonb,
    'fr', '"Protection auditive"'::jsonb,
    'de', '"Gehörschutz"'::jsonb,
    'es', '"Protección auditiva"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ear defenders"'::jsonb,
    'it', '"Cuffie antirumore"'::jsonb,
    'fr', '"Casques antibruit"'::jsonb,
    'de', '"Kapselgehörschützer"'::jsonb,
    'es', '"Orejeras antirruido"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Earmuffs for mounting on safety helmets with 30mm Euroslot", "Dielectric version", "Acoustic decoupling through rubber-mounted capsules", "Mechanical attachment to the helmet for use with the uvex pheos helmet system and Eurolslot system"]'::jsonb,
    'it', '["Isolamento di 34 decibel - H: 36 dB, M: 32 dB, L: 24 dB", "Aggancio meccanico all''elmetto per la combinazione con il sistema elmetto uvex pheos e al sistema euroslot"]'::jsonb,
    'fr', '["Isolation de 34 décibels - H : 36 dB, M : 32 dB, L : 24 dB", "Fixation mécanique au casque pour la combinaison avec le système de casque uvex pheos et le système euroslot"]'::jsonb,
    'de', '["Dämmung von 34 Dezibel - H: 36 dB, M: 32 dB, L: 24 dB", "Mechanische Helmbefestigung zur Kombination mit dem uvex-pheos-Helmsystem und dem Euroslot-System"]'::jsonb,
    'es', '["Aislamiento de 34 decibelios - H: 36 dB, M: 32 dB, L: 24 dB", "Fijación mecánica al casco para la combinación con el sistema de casco uvex pheos y con el sistema euroslot"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Best suited for use in loud environments", "Hearing protection in presence of risk from falling objects (head protection required)"]'::jsonb,
    'it', '["Adatti per l''uso in ambienti con elevata rumorosità", "Protezione uditiva in ambienti con rischio di caduta oggetti (elmetto richiesto)"]'::jsonb,
    'fr', '["Adaptées à une utilisation en milieux à forte nuisance sonore", "Protection auditive en milieux à risque de chute d''objets (casque requis)"]'::jsonb,
    'de', '["Geeignet für den Einsatz in Umgebungen mit hoher Lärmbelastung", "Gehörschutz in Umgebungen mit Risiko herabfallender Gegenstände (Helm erforderlich)"]'::jsonb,
    'es', '["Adecuadas para su uso en ambientes con alto nivel de ruido", "Protección auditiva en ambientes con riesgo de caída de objetos (casco necesario)"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Heavy industries", "Aviation", "Oil&Gas", "Mining"]'::jsonb,
    'it', '["Edilizia", "Oil&Gas", "Industria pesante", "Aviazione", "Miniere"]'::jsonb,
    'fr', '["Construction", "Pétrole et gaz", "Industrie lourde", "Aviation", "Mines"]'::jsonb,
    'de', '["Bauwesen", "Öl und Gas", "Schwerindustrie", "Luftfahrt", "Bergbau"]'::jsonb,
    'es', '["Construcción", "Petróleo y gas", "Industria pesada", "Aviación", "Minas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"S / M / L"'::jsonb,
    'it', '"S / M / L"'::jsonb,
    'fr', '"S / M / L"'::jsonb,
    'de', '"S / M / L"'::jsonb,
    'es', '"S / M / L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["CAPSULES: ABS", "HELMET CONNECTION: PC", "SEALING CUSHION: PVC / PE memory foam", "FOAM INSERTS: PE"]'::jsonb,
    'it', '["Copolimeri di acrilonitrile-butadiene-stirene (ABS)", "Polietilene (PE)"]'::jsonb,
    'fr', '["Copolymères d''acrylonitrile-butadiène-styrène (ABS)", "Polyéthylène (PE)"]'::jsonb,
    'de', '["Acrylnitril-Butadien-Styrol-Copolymere (ABS)", "Polyethylen (PE)"]'::jsonb,
    'es', '["Copolímeros de acrilonitrilo-butadieno-estireno (ABS)", "Polietileno (PE)"]'::jsonb
  ),
  hearing_comfort_features_locales = COALESCE(hearing_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Continuous length adjustment for an ideal wearing position", "Color coding for easy selection and identification of hearing protection levels", "Sealing cushion made of memory foam for good sealing with high wearing comfort", "360° Rotation for standby and resting positions"]'::jsonb,
    'it', '["Le superfici morbide conferiscono alle cuffie un''adattabilità eccezionale e il peso ultraleggero garantisce un comfort ottimale", "Comfort eccezionale grazie ai cuscinetti in memory foam extra morbido, anche in caso di utilizzo prolungato", "Rotazione a 360 gradi per le modalità \"pronto all''uso\" e \"riposo\""]'::jsonb,
    'fr', '["Les surfaces souples confèrent au casque antibruit une adaptabilité exceptionnelle et son poids ultraléger garantit un confort optimal", "Confort exceptionnel grâce aux coussinets en mousse à mémoire de forme extra-souple, même en cas d''utilisation prolongée", "Rotation à 360 degrés pour les modes « prêt à l''emploi » et « repos »"]'::jsonb,
    'de', '["Die weichen Oberflächen verleihen dem Gehörschutz eine außergewöhnliche Anpassungsfähigkeit, und das ultraleichte Gewicht sorgt für optimalen Komfort", "Außergewöhnlicher Komfort dank extra weicher Memory-Schaum-Polster, auch bei längerem Tragen", "360-Grad-Drehung für die Modi „einsatzbereit\" und „Ruhestellung\""]'::jsonb,
    'es', '["Las superficies blandas confieren a las orejeras una adaptabilidad excepcional y el peso ultraligero garantiza un confort óptimo", "Confort excepcional gracias a las almohadillas de espuma viscoelástica extra blanda, incluso en caso de uso prolongado", "Rotación de 360 grados para los modos «listo para usar» y «reposo»"]'::jsonb
  ),
  hearing_other_details_locales = COALESCE(hearing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Customisation, can be printed with your company logo"]'::jsonb
  ),
  hearing_equipment_locales = COALESCE(hearing_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Attacchi euroslot 30 mm"]'::jsonb,
    'fr', '["Fixations euroslot 30 mm"]'::jsonb,
    'de', '["Euroslot-Befestigungen 30 mm"]'::jsonb,
    'es', '["Fijaciones euroslot 30 mm"]'::jsonb
  )
WHERE id = '770b9bbd-b457-4d7b-ab21-3215442a591b';

-- kaios
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"KAIOS"'::jsonb,
    'it', '"KAIOS"'::jsonb,
    'fr', '"KAIOS"'::jsonb,
    'de', '"KAIOS"'::jsonb,
    'es', '"KAIOS"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The KAIOS KASCO respirator is a powered air-purifying respirator (PAPR) system with an integrated helmet, class TH3 with P3 filtration, designed to provide full protection against dust, fumes, and aerosols."'::jsonb,
    'it', '"Il respiratore KAIOS KASCO è un sistema a ventilazione assistita (PAPR) con casco integrato di classe TH3 e filtrazione P3, progettato per offrire protezione completa contro polveri, fumi e aerosol."'::jsonb,
    'fr', '"Le respirateur KAIOS KASCO est un système à ventilation assistée (PAPR) avec casque intégré de classe TH3 et filtration P3, conçu pour offrir une protection complète contre les poussières, les fumées et les aérosols."'::jsonb,
    'de', '"Der Atemschutz KAIOS KASCO ist ein gebläseunterstütztes Atemschutzsystem (PAPR) mit integriertem Helm der Klasse TH3 und P3-Filterung, das umfassenden Schutz vor Staub, Rauch und Aerosolen bietet."'::jsonb,
    'es', '"El respirador KAIOS KASCO es un sistema de ventilación asistida (PAPR) con casco integrado de clase TH3 y filtración P3, diseñado para ofrecer una protección completa contra polvo, humos y aerosoles."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"PAPR respirator with integrated helmet, class TH3 P3, designed for full protection against dust and contaminants in high-risk industrial environments."'::jsonb,
    'it', '"Respiratore PAPR con casco integrato classe TH3 P3, progettato per protezione totale da polveri e contaminanti in ambienti industriali ad alto rischio."'::jsonb,
    'fr', '"Respirateur PAPR avec casque intégré classe TH3 P3, conçu pour une protection totale contre les poussières et les contaminants dans les environnements industriels à haut risque."'::jsonb,
    'de', '"PAPR-Atemschutzgerät mit integriertem Helm der Klasse TH3 P3, entwickelt für vollständigen Schutz vor Staub und Schadstoffen in industriellen Hochrisikoumgebungen."'::jsonb,
    'es', '"Respirador PAPR con casco integrado clase TH3 P3, diseñado para ofrecer protección total frente a polvo y contaminantes en entornos industriales de alto riesgo."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respirators"'::jsonb,
    'it', '"Respiratori"'::jsonb,
    'fr', '"Respirateurs"'::jsonb,
    'de', '"Atemschutzgeräte"'::jsonb,
    'es', '"Respiradores"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full protection with integrated helmet", "Constant airflow", "Reduced risk of contamination due to fit (also suitable for users with beards or for prolonged use)", "LED and sound filter alarm"]'::jsonb,
    'it', '["Protezione integrale con casco", "Flusso d’aria costante", "Riduzione rischio contaminazione da adattamento (adatto anche a utenti con barba o utilizzo prolungato)", "Allarme LED e acustico per saturazione filtro"]'::jsonb,
    'fr', '["Protection intégrale avec casque", "Flux d''air constant", "Réduction du risque de contamination lié à l''ajustement (adapté également aux utilisateurs barbus ou à une utilisation prolongée)", "Alarme LED et sonore de saturation du filtre"]'::jsonb,
    'de', '["Vollschutz mit Helm", "Konstanter Luftstrom", "Verringertes Kontaminationsrisiko durch Passform (auch für bärtige Anwender oder bei längerem Tragen geeignet)", "LED- und akustischer Alarm bei Filtersättigung"]'::jsonb,
    'es', '["Protección integral con casco", "Flujo de aire constante", "Reducción del riesgo de contaminación por ajuste (apto también para usuarios con barba o uso prolongado)", "Alarma LED y acústica por saturación del filtro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Remediation and asbestos work", "Heavy industry and dust protection", "Spary-painting, welding and processing"]'::jsonb,
    'it', '["Bonifiche e amianto", "Operazioni in presenza di silica", "Industria pesante e polveri", "Saldatura e lavorazioni", "Verniciature"]'::jsonb,
    'fr', '["Décontamination et amiante", "Opérations en présence de silice", "Industrie lourde et poussières", "Soudage et travaux", "Peinture"]'::jsonb,
    'de', '["Sanierung und Asbest", "Arbeiten in Gegenwart von Quarzstaub (Silika)", "Schwerindustrie und Staub", "Schweißen und Bearbeitung", "Lackierarbeiten"]'::jsonb,
    'es', '["Descontaminación y amianto", "Operaciones en presencia de sílice", "Industria pesada y polvo", "Soldadura y trabajos", "Pintura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical", "Pharma", "Glass Manufacturing"]'::jsonb,
    'it', '["Chimica", "Industria del Vetro", "Metallurgia", "Farmaceutica"]'::jsonb,
    'fr', '["Chimie", "Industrie du verre", "Métallurgie", "Pharmaceutique"]'::jsonb,
    'de', '["Chemie", "Glasindustrie", "Metallurgie", "Pharmazeutisch"]'::jsonb,
    'es', '["Química", "Industria del vidrio", "Metalurgia", "Farmacéutica"]'::jsonb
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
  respiratory_comfort_features_locales = COALESCE(respiratory_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ventilated helmet", "No pressure on the face", "Wide, integrated visor", "Ergonomic system with evenly distributed weight", "Low noise"]'::jsonb,
    'it', '["Casco ventilato", "Nessuna pressione sul viso", "Visiera ampia e integrata", "Sistema ergonomico con peso distribuito", "Silenzioso e poco rumoroso"]'::jsonb,
    'fr', '["Casque ventilé", "Aucune pression sur le visage", "Visière large et intégrée", "Système ergonomique à poids réparti", "Silencieux et peu bruyant"]'::jsonb,
    'de', '["Belüfteter Helm", "Kein Druck im Gesicht", "Großes, integriertes Visier", "Ergonomisches System mit verteiltem Gewicht", "Leise und geräuscharm"]'::jsonb,
    'es', '["Casco ventilado", "Ninguna presión sobre el rostro", "Visera amplia e integrada", "Sistema ergonómico con peso distribuido", "Silencioso y de bajo ruido"]'::jsonb
  ),
  respiratory_other_details_locales = COALESCE(respiratory_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Compatible with headset"]'::jsonb,
    'it', '["Permette l’utilizzo di cuffie nucali"]'::jsonb,
    'fr', '["Permet l''utilisation de casques antibruit à serre-nuque"]'::jsonb,
    'de', '["Ermöglicht die Verwendung von Nackenbügel-Gehörschützern"]'::jsonb,
    'es', '["Permite el uso de orejeras con banda de nuca"]'::jsonb
  )
WHERE id = '48ca70b5-2f09-468d-a89e-5ee010de24fa';

-- maccrossroad-3-0-high-meta
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Maccrossroad 3.0 high meta"'::jsonb,
    'it', '"Maccrossroad 3.0 high meta"'::jsonb,
    'fr', '"Maccrossroad 3.0 high meta"'::jsonb,
    'de', '"Maccrossroad 3.0 high meta"'::jsonb,
    'es', '"Maccrossroad 3.0 high meta"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boot S3/S3L class with rubber sole"'::jsonb,
    'it', '"Scarponcino di sicurezza classe S3/S3L con suola in gomma"'::jsonb,
    'fr', '"Chaussure montante de sécurité classe S3/S3L avec semelle en caoutchouc"'::jsonb,
    'de', '"Sicherheitsschnürstiefel der Klasse S3/S3L mit Gummisohle"'::jsonb,
    'es', '"Botín de seguridad clase S3/S3L con suela de goma"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boot S3/S3L class with rubber sole"'::jsonb,
    'it', '"Scarponcino di sicurezza classe S3/S3L con suola in gomma"'::jsonb,
    'fr', '"Chaussure montante de sécurité classe S3/S3L avec semelle en caoutchouc"'::jsonb,
    'de', '"Sicherheitsschnürstiefel der Klasse S3/S3L mit Gummisohle"'::jsonb,
    'es', '"Botín de seguridad clase S3/S3L con suela de goma"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety footwear"'::jsonb,
    'it', '"Calzature di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boots"'::jsonb,
    'it', '"Stivali di sicurezza"'::jsonb,
    'fr', '"Bottes de sécurité"'::jsonb,
    'de', '"Sicherheitsstiefel"'::jsonb,
    'es', '"Botas de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent grip (SRC)", "Oil, hydrocarbons and chemical resistant sole, up to 300°C", "Metatarsal protection 100 J integrated", "Metal-free toe cap and penetration resistant sole"]'::jsonb,
    'it', '["Eccellente aderenza (SRC)", "Suola resistente a oli, idrocarburi e sostanze chimiche, fino a 300°C", "Protezione metatarsale 100 J integrata", "Puntale e suola antiperforazione metal-free"]'::jsonb,
    'fr', '["Adhérence exceptionnelle (SRC)", "Semelle résistante aux huiles, aux hydrocarbures et aux substances chimiques, jusqu''à 300°C", "Protection métatarsienne intégrée de 100 J", "Embout et semelle anti-perforation sans métal"]'::jsonb,
    'de', '["Hervorragende Rutschhemmung (SRC)", "Sohle beständig gegen Öle, Kohlenwasserstoffe und Chemikalien, bis 300°C", "Integrierter Mittelfußschutz 100 J", "Metallfreie Zehenschutzkappe und durchtrittsichere Sohle"]'::jsonb,
    'es', '["Adherencia excepcional (SRC)", "Suela resistente a aceites, hidrocarburos y sustancias químicas, hasta 300°C", "Protección metatarsiana integrada de 100 J", "Puntera y suela antiperforación sin metal"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Activities with high risk of slipping", "Presence of chemicals and oil/hydrocarbons", "Activities with risk of objects falling on the metatarsals"]'::jsonb,
    'it', '["Attività ad alto rischio di scivolamento", "Presenza di sostanze chimiche e oli/idrocarburi", "Operazioni in presenza di rischio caduta oggetti sul metatarso"]'::jsonb,
    'fr', '["Activités à haut risque de glissade", "Présence de substances chimiques et d''huiles/hydrocarbures", "Opérations avec risque de chute d''objets sur le métatarse"]'::jsonb,
    'de', '["Tätigkeiten mit hohem Rutschgefahr-Risiko", "Vorhandensein von Chemikalien und Ölen/Kohlenwasserstoffen", "Arbeiten mit Risiko herabfallender Gegenstände auf den Mittelfußbereich"]'::jsonb,
    'es', '["Actividades con alto riesgo de resbalones", "Presencia de sustancias químicas y aceites/hidrocarburos", "Operaciones con riesgo de caída de objetos sobre el metatarso"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Utilities", "Construction", "Oil&Gas", "Heavy industry", "Rail", "Ports", "Defense", "Agriculture"]'::jsonb,
    'it', '["Servizi pubblici", "Edilizia", "Petrolio e gas", "Industria pesante", "Ferroviario", "Porti", "Difesa", "Agricoltura"]'::jsonb,
    'fr', '["Services publics", "Construction", "Pétrole et gaz", "Industrie lourde", "Ferroviaire", "Ports", "Défense", "Agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Bauwesen", "Öl und Gas", "Schwerindustrie", "Bahnwesen", "Häfen", "Verteidigung", "Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "Construcción", "Petróleo y gas", "Industria pesada", "Ferroviario", "Puertos", "Defensa", "Agricultura"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["safety boot", "S3L"]'::jsonb,
    'it', '["scarponcini", "S3L"]'::jsonb,
    'fr', '["chaussures montantes", "S3L"]'::jsonb,
    'de', '["Schnürschuhe", "S3L"]'::jsonb,
    'es', '["botines", "S3L"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"36 - 48"'::jsonb,
    'it', '"36 - 48"'::jsonb,
    'fr', '"36 - 48"'::jsonb,
    'de', '"36 - 48"'::jsonb,
    'es', '"36 - 48"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather", "Rubber", "PU"]'::jsonb,
    'it', '["Pelle", "Gomma", "PU"]'::jsonb,
    'fr', '["Cuir", "Caoutchouc", "PU"]'::jsonb,
    'de', '["Leder", "Gummi", "PU"]'::jsonb,
    'es', '["Cuero", "Caucho", "PU"]'::jsonb
  )
WHERE id = '1eece6d3-d898-4f08-9084-25dd7e5ab466';

-- megasonic-9320265
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"megasonic 9320265"'::jsonb,
    'it', '"megasonic 9320 265"'::jsonb,
    'fr', '"megasonic 9320 265"'::jsonb,
    'de', '"megasonic 9320 265"'::jsonb,
    'es', '"megasonic 9320 265"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"With revolutionary lens design and an unlimited field of view, Megasonic ensures optimal vision even in demanding situations. Sporty ergonomic design with optimal comfort."'::jsonb,
    'it', '"Con un rivoluzionario design della lente e un campo visivo illimitato, gli occhiali Megasonic assicurano una visione ottimale anche nelle situazioni più impegnative. Design sportivo ed ergonomico per un comfort ottimale."'::jsonb,
    'fr', '"Avec un design révolutionnaire de la lentille et un champ de vision illimité, les lunettes Megasonic garantissent une vision optimale même dans les situations les plus exigeantes. Design sportif et ergonomique pour un confort optimal."'::jsonb,
    'de', '"Dank eines revolutionären Scheibendesigns und eines unbegrenzten Sichtfelds gewährleistet die Schutzbrille Megasonic auch in anspruchsvollsten Situationen eine optimale Sicht. Sportliches und ergonomisches Design für optimalen Komfort."'::jsonb,
    'es', '"Con un diseño revolucionario de la lente y un campo visual ilimitado, las gafas Megasonic garantizan una visión óptima incluso en las situaciones más exigentes. Diseño deportivo y ergonómico para un confort óptimo."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Goggle-style glasses with a wide field of view and ergonomic design"'::jsonb,
    'it', '"Occhiali a mascherina con ampio campo visivo dal design ergonomico"'::jsonb,
    'fr', '"Lunettes-masque à large champ de vision et au design ergonomique"'::jsonb,
    'de', '"Vollsichtbrille mit großem Sichtfeld und ergonomischem Design"'::jsonb,
    'es', '"Gafas panorámicas de amplio campo visual y diseño ergonómico"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Eye & Face protection"'::jsonb,
    'it', '"Protezione degli occhi e del viso"'::jsonb,
    'fr', '"Protection des yeux et du visage"'::jsonb,
    'de', '"Augen- und Gesichtsschutz"'::jsonb,
    'es', '"Protección de los ojos y la cara"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety goggles"'::jsonb,
    'it', '"Occhiali protettivi a tenuta (goggles)"'::jsonb,
    'fr', '"Lunettes-masques étanches (goggles)"'::jsonb,
    'de', '"Dicht schließende Schutzbrillen (Goggles)"'::jsonb,
    'es', '"Gafas panorámicas estancas (goggles)"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Sporty ergonomic design with unlimited field of view", "Anti-fog inner lens; outer lens is scratch- and chemical-resistant", "Soft strap for secure and comfortable fit", "Compliant with EN 166 and EN 170"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Environment with risk of exposure to chemical substances"]'::jsonb,
    'it', '["Operazioni in presenza di sostanze chimiche"]'::jsonb,
    'fr', '["Opérations en présence de substances chimiques"]'::jsonb,
    'de', '["Arbeiten in Gegenwart von Chemikalien"]'::jsonb,
    'es', '["Operaciones en presencia de sustancias químicas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Manufacturing", "Chemical processing", "Laboratory"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["safety goggles", "UV400"]'::jsonb,
    'it', '["occhiali a mascherina", "UV400"]'::jsonb,
    'fr', '["lunettes-masques", "UV400"]'::jsonb,
    'de', '["Vollsichtbrille", "UV400"]'::jsonb,
    'es', '["gafas panorámicas", "UV400"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"-"'::jsonb,
    'it', '"-"'::jsonb,
    'fr', '"-"'::jsonb,
    'de', '"-"'::jsonb,
    'es', '"-"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["PC", "Plastic", "Fabric"]'::jsonb,
    'it', '["PC", "Plastica", "Tessuto"]'::jsonb,
    'fr', '["PC", "Plastique", "Tissu"]'::jsonb,
    'de', '["PC", "Kunststoff", "Stoff"]'::jsonb,
    'es', '["PC", "Plástico", "Tejido"]'::jsonb
  ),
  eye_face_comfort_features_locales = COALESCE(eye_face_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Optimized wide field of view", "Frameless lens design", "OTG function with space for eyeglass temples", "Wide headband for optimal fit"]'::jsonb,
    'it', '["Ampio campo visivo ottimizzato", "Design di lenti prive di bordatura", "Funzione OTG con spazio per le astine degli occhiali", "Fascia per la testa ampia per tenuta ottimale"]'::jsonb,
    'fr', '["Champ de vision élargi et optimisé", "Design de lentilles sans monture", "Fonction OTG avec espace pour les branches de lunettes", "Large bandeau pour une tenue optimale"]'::jsonb,
    'de', '["Erweitertes, optimiertes Sichtfeld", "Design mit rahmenlosen Scheiben", "OTG-Funktion mit Platz für Brillenbügel", "Breites Kopfband für optimalen Halt"]'::jsonb,
    'es', '["Amplio campo visual optimizado", "Diseño de lentes sin montura", "Función OTG con espacio para las patillas de las gafas", "Banda para la cabeza ancha para un ajuste óptimo"]'::jsonb
  ),
  eye_face_equipment_locales = COALESCE(eye_face_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["equipmenta"]'::jsonb,
    'it', '["equipmentb"]'::jsonb,
    'fr', '["equipmentb"]'::jsonb,
    'de', '["equipmentb"]'::jsonb,
    'es', '["equipmentb"]'::jsonb
  ),
  eye_face_attributes_locales = COALESCE(eye_face_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"uv_code": "UV400", "coatings": ["Anti Fog", "Scratch Resistant", "Chemical Resistant"], "equipment": ["Replaceable lens"], "lens_tint": "Transparent", "form_factor": "Goggles", "lens_material": "PC", "frame_material": "Plastic", "headband_material": "Fabric"}'::jsonb,
    'it', '{"uv_code": "UV400", "coatings": ["Antiappannante", "Antigraffio", "Resistente agli agenti chimici"], "equipment": ["Lente sostituibile"], "lens_tint": "Trasparente", "form_factor": "Occhiali a mascherina", "lens_material": "PC", "frame_material": "Plastica", "headband_material": "Tessuto"}'::jsonb,
    'fr', '{"uv_code": "UV400", "coatings": ["Anti-buée", "Anti-rayures", "Résistant aux agents chimiques"], "equipment": ["Lentille remplaçable"], "lens_tint": "Transparent", "form_factor": "Lunettes-masque", "lens_material": "PC", "frame_material": "Plastique", "headband_material": "Tissu"}'::jsonb,
    'de', '{"uv_code": "UV400", "coatings": ["Beschlagfrei", "Kratzfest", "Beständig gegen Chemikalien"], "equipment": ["Austauschbare Scheibe"], "lens_tint": "Transparent", "form_factor": "Vollsichtbrille", "lens_material": "PC", "frame_material": "Kunststoff", "headband_material": "Stoff"}'::jsonb,
    'es', '{"uv_code": "UV400", "coatings": ["Antivaho", "Antirrayaduras", "Resistente a los agentes químicos"], "equipment": ["Lente sustituible"], "lens_tint": "Transparente", "form_factor": "Gafas panorámicas", "lens_material": "PC", "frame_material": "Plástico", "headband_material": "Tejido"}'::jsonb
  ),
  coatings_locales = COALESCE(coatings_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Anti-fog", "Scratch resistant", "Chemical resistant"]'::jsonb,
    'it', '["Anti-appannamento", "Anti-graffio", "Resistente ai prodotti chimici"]'::jsonb,
    'fr', '["Anti-buée", "Anti-rayures", "Résistant aux produits chimiques"]'::jsonb,
    'de', '["Beschlagfrei", "Kratzfest", "Beständig gegen Chemikalien"]'::jsonb,
    'es', '["Antivaho", "Antirrayaduras", "Resistente a los productos químicos"]'::jsonb
  )
WHERE id = 'c72598c6-ad2e-4cc9-b5c9-e393c92491f4';

-- pheos-cx2
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"pheos cx2"'::jsonb,
    'it', '"pheos cx2"'::jsonb,
    'fr', '"pheos cx2"'::jsonb,
    'de', '"pheos cx2"'::jsonb,
    'es', '"pheos cx2"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Plastic safety glasses with IR protection. The IR-ex filter provides reliable IR protection while allowing optimal colour recognition of signal lights. The soft component attached to the lens offers reliable protection against dust and water."'::jsonb,
    'it', '"Occhiali di sicurezza in plastica con protezione IR. Il filtro IR-ex offre una protezione affidabile contro le radiazioni infrarosse, consentendo un ottimale riconoscimento dei colori dei segnali. Il componente morbido collegato direttamente alla lente protegge in modo affidabile da polvere e acqua."'::jsonb,
    'fr', '"Lunettes de sécurité en plastique avec protection IR. Le filtre IR-ex offre une protection fiable contre les rayonnements infrarouges, permettant une reconnaissance optimale des couleurs des signaux. Le composant souple relié directement à la lentille protège efficacement contre la poussière et l''eau."'::jsonb,
    'de', '"Kunststoff-Schutzbrille mit IR-Schutz. Der IR-ex-Filter bietet zuverlässigen Schutz vor Infrarotstrahlung und ermöglicht eine optimale Erkennung von Signalfarben. Die weiche, direkt mit der Scheibe verbundene Komponente schützt zuverlässig vor Staub und Wasser."'::jsonb,
    'es', '"Gafas de seguridad de plástico con protección IR. El filtro IR-ex ofrece una protección fiable contra las radiaciones infrarrojas, permitiendo un reconocimiento óptimo de los colores de las señales. El componente blando conectado directamente a la lente protege de forma fiable contra el polvo y el agua."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Metal-free UV400 glasses with IR protection"'::jsonb,
    'it', '"Occhiali in plastica UV400 con lenti IR"'::jsonb,
    'fr', '"Lunettes en plastique UV400 avec verres IR"'::jsonb,
    'de', '"Kunststoffbrille UV400 mit IR-Gläsern"'::jsonb,
    'es', '"Gafas de plástico UV400 con lentes IR"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Eye & Face protection"'::jsonb,
    'it', '"Protezione degli occhi e del viso"'::jsonb,
    'fr', '"Protection des yeux et du visage"'::jsonb,
    'de', '"Augen- und Gesichtsschutz"'::jsonb,
    'es', '"Protección de los ojos y la cara"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety glasses"'::jsonb,
    'it', '"Occhiali di sicurezza"'::jsonb,
    'fr', '"Lunettes de sécurité"'::jsonb,
    'de', '"Schutzbrillen"'::jsonb,
    'es', '"Gafas de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal-free", "IR-ex protective filter for IR radiation", "Soft seal component protects against dust and water", "Polycarbonate lens with uvex infradur treatment – scratch resistant and anti-fog"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding", "Operations in blast furnaces or with molten/hot material"]'::jsonb,
    'it', '["Operazioni di saldatura", "Operazioni in alti forni o in presenza di materiale incandescente"]'::jsonb,
    'fr', '["Opérations de soudage", "Opérations dans des hauts fourneaux ou en présence de matériaux incandescents"]'::jsonb,
    'de', '["Schweißarbeiten", "Arbeiten an Hochöfen oder bei Vorhandensein von glühendem Material"]'::jsonb,
    'es', '["Operaciones de soldadura", "Operaciones en altos hornos o en presencia de material incandescente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Construction"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["IR glasses", "UV400"]'::jsonb,
    'it', '["occhiali IR", "UV400"]'::jsonb,
    'fr', '["lunettes IR", "UV400"]'::jsonb,
    'de', '["IR-Brille", "UV400"]'::jsonb,
    'es', '["gafas IR", "UV400"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"-"'::jsonb,
    'it', '"-"'::jsonb,
    'fr', '"-"'::jsonb,
    'de', '"-"'::jsonb,
    'es', '"-"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["PC", "Plastic"]'::jsonb,
    'it', '["PC", "Plastica"]'::jsonb,
    'fr', '["PC", "Plastique"]'::jsonb,
    'de', '["PC", "Kunststoff"]'::jsonb,
    'es', '["PC", "Plástico"]'::jsonb
  ),
  eye_face_comfort_features_locales = COALESCE(eye_face_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Soft-seal frame technology contours the forehead and protects against particle penetration", "Soft and flexible nosepiece adapts to the wearer, providing a non-slip, pressure-free fit", "Ergonomic temples with soft tips offer a comfortable and secure hold without pressure points", "Perfect color recognition accordin to EN 172"]'::jsonb,
    'it', '["La tecnologia della montatura Soft-seal contorna la fronte e protegge dalla penetrazione di particelle", "Il nasello morbido e flessibile si adatta a chi lo indossa e permette un posizionamento antiscivolo e senza punti di pressione", "Le astine ergonomiche con estremità morbide offrono una tenuta comoda e sicura, senza punti di pressione", "Riconoscimento colori perfetto, in accordo alla EN 172"]'::jsonb,
    'fr', '["La technologie de monture Soft-seal épouse le front et protège contre la pénétration de particules", "Le pont de nez souple et flexible s''adapte au porteur et permet un positionnement antidérapant et sans points de pression", "Les branches ergonomiques aux extrémités souples offrent une tenue confortable et sûre, sans points de pression", "Reconnaissance parfaite des couleurs, conformément à la norme EN 172"]'::jsonb,
    'de', '["Die Soft-seal-Rahmentechnologie umschließt die Stirn und schützt vor dem Eindringen von Partikeln", "Der weiche, flexible Nasensteg passt sich dem Träger an und ermöglicht einen rutschfesten Sitz ohne Druckstellen", "Die ergonomischen Bügel mit weichen Enden bieten einen bequemen und sicheren Halt ohne Druckstellen", "Perfekte Farberkennung gemäß EN 172"]'::jsonb,
    'es', '["La tecnología de montura Soft-seal se ajusta a la frente y protege contra la penetración de partículas", "El puente nasal blando y flexible se adapta a quien lo lleva y permite una colocación antideslizante y sin puntos de presión", "Las patillas ergonómicas con extremos blandos ofrecen un ajuste cómodo y seguro, sin puntos de presión", "Reconocimiento perfecto de los colores, conforme a la norma EN 172"]'::jsonb
  ),
  eye_face_equipment_locales = COALESCE(eye_face_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["test"]'::jsonb,
    'fr', '["test"]'::jsonb,
    'de', '["Test"]'::jsonb,
    'es', '["prueba"]'::jsonb
  ),
  eye_face_attributes_locales = COALESCE(eye_face_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"uv_code": "UV400", "coatings": ["Anti Fog", "Scratch Resistant"], "lens_tint": "Grey", "form_factor": "Glasses", "lens_material": "PC", "frame_material": "Plastic"}'::jsonb,
    'it', '{"uv_code": "UV400", "coatings": ["Antiappannante", "Antigraffio"], "lens_tint": "Grigio", "form_factor": "Occhiali", "lens_material": "PC", "frame_material": "Plastica"}'::jsonb,
    'fr', '{"uv_code": "UV400", "coatings": ["Anti-buée", "Anti-rayures"], "lens_tint": "Gris", "form_factor": "Lunettes", "lens_material": "PC", "frame_material": "Plastique"}'::jsonb,
    'de', '{"uv_code": "UV400", "coatings": ["Beschlagfrei", "Kratzfest"], "lens_tint": "Grau", "form_factor": "Schutzbrille", "lens_material": "PC", "frame_material": "Kunststoff"}'::jsonb,
    'es', '{"uv_code": "UV400", "coatings": ["Antivaho", "Antirrayaduras"], "lens_tint": "Gris", "form_factor": "Gafas", "lens_material": "PC", "frame_material": "Plástico"}'::jsonb
  ),
  coatings_locales = COALESCE(coatings_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Anti-fog", "Scratch resistant"]'::jsonb,
    'it', '["Anti-appannamento", "Anti-graffio"]'::jsonb,
    'fr', '["Anti-buée", "Anti-rayures"]'::jsonb,
    'de', '["Beschlagfrei", "Kratzfest"]'::jsonb,
    'es', '["Antivaho", "Antirrayaduras"]'::jsonb
  ),
  eye_face_materials_locales = COALESCE(eye_face_materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"arm": "", "lens": "PC", "frame": "Plastic", "headband": ""}'::jsonb
  )
WHERE id = '95244a02-6efb-4913-9d60-24eb392e3511';

-- pheos-k2p
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Pheos K2P"'::jsonb,
    'it', '"Pheos K2P"'::jsonb,
    'fr', '"Pheos K2P"'::jsonb,
    'de', '"Pheos K2P"'::jsonb,
    'es', '"Pheos K2P"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Helmet-mounted hearing protection earmuffs for the uvex pheos helmet system. Soft surfaces give the earmuffs exceptional adaptability, and the ultra-lightweight design ensures optimal comfort."'::jsonb,
    'it', '"Cuffie di protezione dell''udito da elmetto per il sistema elmetto uvex pheos. Superfici morbide conferiscono alle cuffie un''adattabilità eccezionale e il peso ultraleggero garantisce un comfort ottimale."'::jsonb,
    'fr', '"Coquilles de protection auditive pour casque, compatibles avec le système de casque uvex pheos. Des surfaces souples confèrent aux coquilles une adaptabilité exceptionnelle et le poids ultraléger garantit un confort optimal."'::jsonb,
    'de', '"Helm-Gehörschutzkapseln für das uvex pheos Helmsystem. Weiche Oberflächen verleihen den Kapseln eine außergewöhnliche Anpassungsfähigkeit, und das ultraleichte Gewicht sorgt für optimalen Tragekomfort."'::jsonb,
    'es', '"Orejeras de protección auditiva para casco, compatibles con el sistema de casco uvex pheos. Las superficies blandas confieren a las orejeras una adaptabilidad excepcional y el peso ultraligero garantiza un confort óptimo."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Helmet-mounted hearing protection earmuffs for the uvex pheos helmet system"'::jsonb,
    'it', '"Cuffie di protezione dell''udito da elmetto per il sistema elmetto uvex pheos"'::jsonb,
    'fr', '"Coquilles de protection auditive pour casque, pour le système de casque uvex pheos"'::jsonb,
    'de', '"Helm-Gehörschutzkapseln für das uvex pheos Helmsystem"'::jsonb,
    'es', '"Orejeras de protección auditiva para casco, para el sistema de casco uvex pheos"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hearing protection"'::jsonb,
    'it', '"Protezione uditiva"'::jsonb,
    'fr', '"Protection auditive"'::jsonb,
    'de', '"Gehörschutz"'::jsonb,
    'es', '"Protección auditiva"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ear defenders"'::jsonb,
    'it', '"Cuffie antirumore"'::jsonb,
    'fr', '"Casques antibruit"'::jsonb,
    'de', '"Kapselgehörschützer"'::jsonb,
    'es', '"Orejeras antirruido"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Noise attenuation of 30 dB (H:35, M:27, L:20)", "Mechanical attachment to the uvex pheos helmet system", "Soft surfaces ensure exceptional adaptability", "Ultra-lightweight for optimal comfort"]'::jsonb,
    'it', '["Attenuazione del rumore di 30 dB (H:35, M:27, L:20)", "Attacco meccanico al sistema elmetto uvex pheos", "Superfici morbide garantiscono un''adattabilità eccezionale", "Ultraleggero per un comfort ottimale"]'::jsonb,
    'fr', '["Atténuation du bruit de 30 dB (H:35, M:27, L:20)", "Fixation mécanique au système de casque uvex pheos", "Des surfaces souples garantissent une adaptabilité exceptionnelle", "Ultraléger pour un confort optimal"]'::jsonb,
    'de', '["Geräuschdämmung von 30 dB (H:35, M:27, L:20)", "Mechanische Befestigung am uvex pheos Helmsystem", "Weiche Oberflächen sorgen für außergewöhnliche Anpassungsfähigkeit", "Ultraleicht für optimalen Komfort"]'::jsonb,
    'es', '["Atenuación del ruido de 30 dB (H:35, M:27, L:20)", "Fijación mecánica al sistema de casco uvex pheos", "Las superficies blandas garantizan una adaptabilidad excepcional", "Ultraligero para un confort óptimo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Best suited for loud environments", "Hearing protection where head protection is required (helmet)"]'::jsonb,
    'it', '["Indicato per ambienti rumorosi", "Protezione uditiva dove è richiesto l''elmetto"]'::jsonb,
    'fr', '["Adapté aux environnements bruyants", "Protection auditive là où le port du casque est requis"]'::jsonb,
    'de', '["Geeignet für laute Umgebungen", "Gehörschutz dort, wo ein Helm vorgeschrieben ist"]'::jsonb,
    'es', '["Indicado para entornos ruidosos", "Protección auditiva donde se requiere el uso de casco"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Heavy industry", "Aviation", "Oil&Gas", "Mining"]'::jsonb,
    'it', '["Edilizia", "Industria pesante", "Aviazione", "Petrolio e gas", "Miniere"]'::jsonb,
    'fr', '["Construction", "Industrie lourde", "Aviation", "Pétrole et gaz", "Mines"]'::jsonb,
    'de', '["Bauwesen", "Schwerindustrie", "Luftfahrt", "Öl und Gas", "Bergbau"]'::jsonb,
    'es', '["Construcción", "Industria pesada", "Aviación", "Petróleo y gas", "Minas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ear defenders", "earmuffs", "helmet ear protection"]'::jsonb,
    'it', '["cuffie antirumore", "per elmetto", "protezione udito"]'::jsonb,
    'fr', '["casques antibruit", "pour casque", "protection auditive"]'::jsonb,
    'de', '["Kapselgehörschützer", "für Helm", "Gehörschutz"]'::jsonb,
    'es', '["orejeras antirruido", "para casco", "protección auditiva"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"S / M / L"'::jsonb,
    'it', '"S / M / L"'::jsonb,
    'fr', '"S / M / L"'::jsonb,
    'de', '"S / M / L"'::jsonb,
    'es', '"S / M / L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ABS", "PE"]'::jsonb,
    'it', '["ABS", "PE"]'::jsonb,
    'fr', '["ABS", "PE"]'::jsonb,
    'de', '["ABS", "PE"]'::jsonb,
    'es', '["ABS", "PE"]'::jsonb
  )
WHERE id = 'b1d32f99-fdf9-46a0-9671-b39d55fc6cbd';

-- pronamic-alpine
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"pronamic alpine"'::jsonb,
    'it', '"pronamic alpine"'::jsonb,
    'fr', '"pronamic alpine"'::jsonb,
    'de', '"pronamic alpine"'::jsonb,
    'es', '"pronamic alpine"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The helmet, featuring a perfect interaction between protection and dynamics, offers seamless integration of all functional elements (ventilation, Mips® brain protection) into the helmet design, ensuring a high level of comfort."'::jsonb,
    'it', '"Casco con ''interazione perfetta tra protezione e dinamica offre un integrazione perfetta di tutti gli elementi funzionali (aerazione, protezione del cervello Mips®) nel design dell''elmetto offrendo un comfort elevato"'::jsonb,
    'fr', '"Casque offrant une interaction parfaite entre protection et dynamisme, avec une intégration parfaite de tous les éléments fonctionnels (aération, protection du cerveau Mips®) dans le design du casque, pour un confort élevé"'::jsonb,
    'de', '"Helm mit perfektem Zusammenspiel von Schutz und Dynamik, der alle funktionalen Elemente (Belüftung, Mips®-Gehirnschutz) perfekt in das Helmdesign integriert und so einen hohen Tragekomfort bietet"'::jsonb,
    'es', '"Casco con una interacción perfecta entre protección y dinamismo que ofrece una integración perfecta de todos los elementos funcionales (ventilación, protección cerebral Mips®) en el diseño del casco, proporcionando un elevado confort"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dynamic safety helmet"'::jsonb,
    'it', '"Elmetto di sicurezza dinamico"'::jsonb,
    'fr', '"Casque de sécurité dynamique"'::jsonb,
    'de', '"Dynamischer Schutzhelm"'::jsonb,
    'es', '"Casco de seguridad dinámico"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Head protection"'::jsonb,
    'it', '"Protezione della testa"'::jsonb,
    'fr', '"Protection de la tête"'::jsonb,
    'de', '"Kopfschutz"'::jsonb,
    'es', '"Protección de la cabeza"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Helmets"'::jsonb,
    'it', '"Caschi di sicurezza"'::jsonb,
    'fr', '"Casques de sécurité"'::jsonb,
    'de', '"Schutzhelme"'::jsonb,
    'es', '"Cascos de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Multi-standard helmet that meets the requirements of EN 397 and EN 12492", "Available in High-Vis colours", "Closed helmet shell for work in low-voltage areas", "Maximum field of vision due to design-optimized brim geometry"]'::jsonb,
    'it', '["Disponibile in colori Alta Visibilita''", "Elmetto multi-standard EN397 e EN12492", "Elmetto per operazioni in presenza di alta tensione"]'::jsonb,
    'fr', '["Disponible en couleurs haute visibilité", "Casque multi-normes EN397 et EN12492", "Casque pour opérations en présence de haute tension"]'::jsonb,
    'de', '["Erhältlich in Warnschutzfarben", "Multinorm-Helm EN397 und EN12492", "Helm für Arbeiten unter Hochspannung"]'::jsonb,
    'es', '["Disponible en colores de alta visibilidad", "Casco multinorma EN397 y EN12492", "Casco para operaciones en presencia de alta tensión"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations in low temperatures", "Activities in presence of electrocution risk"]'::jsonb,
    'it', '["Operazioni in luoghi a basse temperature", "Operazioni di alpinismo"]'::jsonb,
    'fr', '["Opérations dans des lieux à basse température", "Opérations d''alpinisme"]'::jsonb,
    'de', '["Einsätze an Orten mit niedrigen Temperaturen", "Einsätze beim Bergsteigen"]'::jsonb,
    'es', '["Operaciones en lugares con bajas temperaturas", "Operaciones de alpinismo"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Energy", "Electrical", "Landscaping", "Forestry"]'::jsonb,
    'it', '["Silvicoltura", "Edilizia", "Edilizia"]'::jsonb,
    'fr', '["Sylviculture", "Construction", "Construction"]'::jsonb,
    'de', '["Forstwirtschaft", "Bauwesen", "Bauwesen"]'::jsonb,
    'es', '["Silvicultura", "Construcción", "Construcción"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"51 - 63 cm"'::jsonb,
    'fr', '"51 - 63 cm"'::jsonb,
    'de', '"51 - 63 cm"'::jsonb,
    'es', '"51 - 63 cm"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["SHELL: ABS", "INTERIOR: EPS", "HEADBAND: PP", "SWEATBAND: Plastic", "PADDING: Plastic"]'::jsonb,
    'it', '["SHELL: ABS", "INTERIOR: EPS", "HEADBAND: PP", "SWEATBAND: Plastic", "PADDING: Plastic"]'::jsonb,
    'fr', '["COQUE : ABS", "INTÉRIEUR : EPS", "SERRE-TÊTE : PP", "BANDEAU ANTI-TRANSPIRATION : Plastique", "REMBOURRAGE : Plastique"]'::jsonb,
    'de', '["SCHALE: ABS", "INNENAUSSTATTUNG: EPS", "KOPFBAND: PP", "SCHWEISSBAND: Kunststoff", "POLSTERUNG: Kunststoff"]'::jsonb,
    'es', '["CARCASA: ABS", "INTERIOR: EPS", "BANDA DE CABEZA: PP", "BANDA ANTISUDOR: Plástico", "ACOLCHADO: Plástico"]'::jsonb
  ),
  head_comfort_features_locales = COALESCE(head_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Versatile and adjustable suspension harness with variable wheel ratchet system", "EPS inner shell ensures excellent fit and comfort", "Air vents for maximum ventilation"]'::jsonb,
    'it', '["Interno completamente regolabile", "Possibilità di utilizzo di diversi cinturini", "Ampio supporto della nuca e posizionamento vicino alla testa"]'::jsonb,
    'fr', '["Intérieur entièrement réglable", "Possibilité d''utiliser différentes sangles", "Large soutien de la nuque et positionnement proche de la tête"]'::jsonb,
    'de', '["Vollständig verstellbares Innenfutter", "Möglichkeit zur Verwendung verschiedener Riemen", "Breite Nackenstütze und kopfnahe Positionierung"]'::jsonb,
    'es', '["Interior completamente regulable", "Posibilidad de utilizar diferentes correas", "Amplio soporte de la nuca y posicionamiento cercano a la cabeza"]'::jsonb
  ),
  head_equipment_locales = COALESCE(head_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Side Euroslot adapters (30 mm) for attaching earmuffs", "Four retaining clips for fitting head torches or goggles", "EN 12492 forked chin strap included"]'::jsonb,
    'it', '["Attacchi Euroslot laterali (30 mm) per il fissaggio di dispositivi di protezione dell''udito a cuffia"]'::jsonb,
    'fr', '["Fixations Euroslot latérales (30 mm) pour la fixation de protections auditives à coquilles"]'::jsonb,
    'de', '["Seitliche Euroslot-Halterungen (30 mm) zur Befestigung von Kapselgehörschützern"]'::jsonb,
    'es', '["Fijaciones Euroslot laterales (30 mm) para la sujeción de protectores auditivos de orejeras"]'::jsonb
  ),
  head_tech_specs_locales = COALESCE(head_tech_specs_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"colours": ["White", "High-Vis Yellow", "High-Vis Orange"], "brim_length": "short", "form_factor": "", "additional_features": []}'::jsonb,
    'it', '{"colours": ["Bianco", "Giallo ad alta visibilità", "Arancione ad alta visibilità"], "brim_length": "Corto", "form_factor": "", "additional_features": []}'::jsonb,
    'fr', '{"colours": ["Blanc", "Jaune haute visibilité", "Orange haute visibilité"], "brim_length": "Court", "form_factor": "", "additional_features": []}'::jsonb,
    'de', '{"colours": ["Weiß", "Hochsichtbares Gelb", "Hochsichtbares Orange"], "brim_length": "Kurz", "form_factor": "", "additional_features": []}'::jsonb,
    'es', '{"colours": ["Blanco", "Amarillo de alta visibilidad", "Naranja de alta visibilidad"], "brim_length": "Corto", "form_factor": "", "additional_features": []}'::jsonb
  )
WHERE id = 'ad73f636-77ab-4a80-96f6-ec5f8b9ec498';

-- pronamic-e-s-wr
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Pronamic E-S-WR"'::jsonb,
    'it', '"Pronamic E-S-WR"'::jsonb,
    'fr', '"Pronamic E-S-WR"'::jsonb,
    'de', '"Pronamic E-S-WR"'::jsonb,
    'es', '"Pronamic E-S-WR"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Modern and sporty helmet featuring an innovative structure with closed shell. Maximum safety to EN 397 optional -30°C / MM and EN 50365 for electrical insulation."'::jsonb,
    'it', '"Elmetto moderno e sportivo con struttura innovativa e calotta chiusa. Massima sicurezza secondo EN 397 con requisiti opzionali -30°C / MM ed EN 50365 per isolamento elettrico."'::jsonb,
    'fr', '"Casque moderne et sportif à structure innovante et calotte fermée. Sécurité maximale selon la norme EN 397 avec exigences optionnelles -30°C / MM et EN 50365 pour l''isolation électrique."'::jsonb,
    'de', '"Moderner und sportlicher Helm mit innovativer Struktur und geschlossener Kalotte. Maximale Sicherheit gemäß EN 397 mit optionalen Anforderungen -30°C / MM und EN 50365 für elektrische Isolierung."'::jsonb,
    'es', '"Casco moderno y deportivo con estructura innovadora y casquete cerrado. Máxima seguridad según la norma EN 397 con requisitos opcionales -30°C / MM y EN 50365 para aislamiento eléctrico."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety helmet suitable for low temperatures, splash protection, and low-voltage environments"'::jsonb,
    'it', '"Elmetto di sicurezza adatto a basse temperature, protezione da spruzzi e ambienti a bassa tensione"'::jsonb,
    'fr', '"Casque de sécurité adapté aux basses températures, à la protection contre les éclaboussures et aux environnements basse tension"'::jsonb,
    'de', '"Schutzhelm geeignet für niedrige Temperaturen, Spritzschutz und Niederspannungsumgebungen"'::jsonb,
    'es', '"Casco de seguridad adecuado para bajas temperaturas, protección contra salpicaduras y entornos de baja tensión"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Head protection"'::jsonb,
    'it', '"Protezione della testa"'::jsonb,
    'fr', '"Protection de la tête"'::jsonb,
    'de', '"Kopfschutz"'::jsonb,
    'es', '"Protección de la cabeza"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Helmets"'::jsonb,
    'it', '"Caschi di sicurezza"'::jsonb,
    'fr', '"Casques de sécurité"'::jsonb,
    'de', '"Schutzhelme"'::jsonb,
    'es', '"Cascos de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Closed shell allows use in low-voltage environments (EN 50365)", "Euroslot lateral attachments (30 mm) for earmuffs and pronamic visor system", "Fixing clips for 4-point chinstrap", "Shortened visor for a wider field of view"]'::jsonb,
    'it', '["Calotta chiusa consente l''uso in ambienti a bassa tensione (EN 50365)", "Attacchi laterali Euroslot (30 mm) per cuffie antirumore e sistema visiera Pronamic", "Clip di fissaggio per sottogola a 4 punti", "Visiera accorciata per un campo visivo più ampio"]'::jsonb,
    'fr', '["La calotte fermée permet l''utilisation en environnements basse tension (EN 50365)", "Fixations latérales Euroslot (30 mm) pour casque antibruit et système de visière Pronamic", "Clip de fixation pour jugulaire à 4 points", "Visière raccourcie pour un champ de vision plus large"]'::jsonb,
    'de', '["Die geschlossene Kalotte ermöglicht den Einsatz in Niederspannungsumgebungen (EN 50365)", "Seitliche Euroslot-Halterungen (30 mm) für Gehörschutz und Pronamic-Visiersystem", "Befestigungsclip für 4-Punkt-Kinnriemen", "Verkürztes Visier für ein größeres Sichtfeld"]'::jsonb,
    'es', '["El casquete cerrado permite su uso en entornos de baja tensión (EN 50365)", "Fijaciones laterales Euroslot (30 mm) para orejeras antirruido y sistema de visor Pronamic", "Clip de fijación para barboquejo de 4 puntos", "Visera acortada para un campo de visión más amplio"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Low-voltage electrical work", "Head protection in low-temperature environments"]'::jsonb,
    'it', '["Operazioni in ambienti a bassa tensione", "Protezione del capo alle basse temperature"]'::jsonb,
    'fr', '["Opérations en environnements basse tension", "Protection de la tête à basse température"]'::jsonb,
    'de', '["Einsätze in Niederspannungsumgebungen", "Kopfschutz bei niedrigen Temperaturen"]'::jsonb,
    'es', '["Operaciones en entornos de baja tensión", "Protección de la cabeza a bajas temperaturas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heavy industry", "Construction"]'::jsonb,
    'it', '["Industria pesante", "Edilizia"]'::jsonb,
    'fr', '["Industrie lourde", "Construction"]'::jsonb,
    'de', '["Schwerindustrie", "Bauwesen"]'::jsonb,
    'es', '["Industria pesada", "Construcción"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["helmet"]'::jsonb,
    'it', '["casco"]'::jsonb,
    'fr', '["casque"]'::jsonb,
    'de', '["Helm"]'::jsonb,
    'es', '["casco"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"51–65 cm"'::jsonb,
    'it', '"51–65 cm"'::jsonb,
    'fr', '"51–65 cm"'::jsonb,
    'de', '"51–65 cm"'::jsonb,
    'es', '"51–65 cm"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Shell: HDPE", "Lining: Plastic"]'::jsonb,
    'it', '["Calotta: HDPE", "Fodera: Plastica"]'::jsonb,
    'fr', '["Calotte : HDPE", "Doublure : Plastique"]'::jsonb,
    'de', '["Kalotte: HDPE", "Futter: Kunststoff"]'::jsonb,
    'es', '["Casquete: HDPE", "Forro: Plástico"]'::jsonb
  ),
  head_comfort_features_locales = COALESCE(head_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  head_other_details_locales = COALESCE(head_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  head_equipment_locales = COALESCE(head_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  head_tech_specs_locales = COALESCE(head_tech_specs_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"colours": ["White", "Yellow", "Red", "Blue"], "brim_length": "short", "form_factor": "helmet", "additional_features": []}'::jsonb,
    'it', '{"colours": ["Bianco", "Giallo", "Rosso", "Blu"], "brim_length": "Corto", "form_factor": "casco", "additional_features": []}'::jsonb,
    'fr', '{"colours": ["Blanc", "Jaune", "Rouge", "Bleu"], "brim_length": "Court", "form_factor": "casque", "additional_features": []}'::jsonb,
    'de', '{"colours": ["Weiß", "Gelb", "Rot", "Blau"], "brim_length": "Kurz", "form_factor": "Helm", "additional_features": []}'::jsonb,
    'es', '{"colours": ["Blanco", "Amarillo", "Rojo", "Azul"], "brim_length": "Corto", "form_factor": "casco", "additional_features": []}'::jsonb
  )
WHERE id = 'ed2382c6-57ca-4438-b00c-4b00922226b7';

-- pronamic-s-kr
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Pronamic S-KR"'::jsonb,
    'it', '"Pronamic S-KR"'::jsonb,
    'fr', '"Pronamic S-KR"'::jsonb,
    'de', '"Pronamic S-KR"'::jsonb,
    'es', '"Pronamic S-KR"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Modern and sporty helmet featuring an innovative structure for maximum performance and ergonomics with minimal material. Provides maximum safety meeting EN 397 with optional requirements -30°C and MM."'::jsonb,
    'it', '"Elmetto moderno e sportivo con struttura innovativa per massime prestazioni ed ergonomia con minimo materiale. Massima sicurezza secondo EN 397 con requisiti opzionali -30°C e MM."'::jsonb,
    'fr', '"Casque moderne et sportif à structure innovante offrant des performances et une ergonomie maximales avec un minimum de matière. Sécurité maximale selon la norme EN 397 avec exigences optionnelles -30°C et MM."'::jsonb,
    'de', '"Moderner und sportlicher Helm mit innovativer Struktur für maximale Leistung und Ergonomie bei minimalem Materialeinsatz. Maximale Sicherheit gemäß EN 397 mit optionalen Anforderungen -30°C und MM."'::jsonb,
    'es', '"Casco moderno y deportivo con estructura innovadora para máximas prestaciones y ergonomía con un mínimo de material. Máxima seguridad según la norma EN 397 con requisitos opcionales -30°C y MM."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety helmet suitable for low temperatures and splash protection"'::jsonb,
    'it', '"Elmetto di sicurezza adatto a basse temperature e protezione da spruzzi"'::jsonb,
    'fr', '"Casque de sécurité adapté aux basses températures et à la protection contre les éclaboussures"'::jsonb,
    'de', '"Schutzhelm geeignet für niedrige Temperaturen und Spritzschutz"'::jsonb,
    'es', '"Casco de seguridad adecuado para bajas temperaturas y protección contra salpicaduras"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Head protection"'::jsonb,
    'it', '"Protezione della testa"'::jsonb,
    'fr', '"Protection de la tête"'::jsonb,
    'de', '"Kopfschutz"'::jsonb,
    'es', '"Protección de la cabeza"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Helmets"'::jsonb,
    'it', '"Caschi di sicurezza"'::jsonb,
    'fr', '"Casques de sécurité"'::jsonb,
    'de', '"Schutzhelme"'::jsonb,
    'es', '"Cascos de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Euroslot lateral attachments (30 mm) for earmuffs and pronamic visor system", "Fixing clips for 4-point chinstrap", "Shortened visor for a wider field of view", "Additional mounting elements for a wide range of accessories"]'::jsonb,
    'it', '["Attacchi laterali Euroslot (30 mm) per cuffie antirumore e sistema visiera Pronamic", "Clip di fissaggio per sottogola a 4 punti", "Visiera accorciata per un campo visivo più ampio", "Elementi di montaggio aggiuntivi per una vasta gamma di accessori"]'::jsonb,
    'fr', '["Fixations latérales Euroslot (30 mm) pour casque antibruit et système de visière Pronamic", "Clip de fixation pour jugulaire à 4 points", "Visière raccourcie pour un champ de vision plus large", "Éléments de montage supplémentaires pour une large gamme d''accessoires"]'::jsonb,
    'de', '["Seitliche Euroslot-Halterungen (30 mm) für Gehörschutz und Pronamic-Visiersystem", "Befestigungsclip für 4-Punkt-Kinnriemen", "Verkürztes Visier für ein größeres Sichtfeld", "Zusätzliche Montageelemente für eine große Auswahl an Zubehör"]'::jsonb,
    'es', '["Fijaciones laterales Euroslot (30 mm) para orejeras antirruido y sistema de visor Pronamic", "Clip de fijación para barboquejo de 4 puntos", "Visera acortada para un campo de visión más amplio", "Elementos de montaje adicionales para una amplia gama de accesorios"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Head protection in low-temperature environments", "Protection from molten metals"]'::jsonb,
    'it', '["Protezione del capo alle basse temperature", "Protezione da metalli fusi"]'::jsonb,
    'fr', '["Protection de la tête à basse température", "Protection contre les métaux en fusion"]'::jsonb,
    'de', '["Kopfschutz bei niedrigen Temperaturen", "Schutz vor geschmolzenen Metallen"]'::jsonb,
    'es', '["Protección de la cabeza a bajas temperaturas", "Protección contra metales fundidos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heavy industry", "Construction"]'::jsonb,
    'it', '["Industria pesante", "Edilizia"]'::jsonb,
    'fr', '["Industrie lourde", "Construction"]'::jsonb,
    'de', '["Schwerindustrie", "Bauwesen"]'::jsonb,
    'es', '["Industria pesada", "Construcción"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["helmet"]'::jsonb,
    'it', '["casco"]'::jsonb,
    'fr', '["casque"]'::jsonb,
    'de', '["Helm"]'::jsonb,
    'es', '["casco"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"51–65 cm"'::jsonb,
    'it', '"51–65 cm"'::jsonb,
    'fr', '"51–65 cm"'::jsonb,
    'de', '"51–65 cm"'::jsonb,
    'es', '"51–65 cm"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Shell: HDPE", "Lining: Plastic"]'::jsonb,
    'it', '["Calotta: HDPE", "Fodera: Plastica"]'::jsonb,
    'fr', '["Calotte : HDPE", "Doublure : Plastique"]'::jsonb,
    'de', '["Kalotte: HDPE", "Futter: Kunststoff"]'::jsonb,
    'es', '["Casquete: HDPE", "Forro: Plástico"]'::jsonb
  ),
  head_tech_specs_locales = COALESCE(head_tech_specs_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"colours": ["White", "Yellow", "Red", "Blue"], "brim_length": "short", "form_factor": "helmet", "additional_features": []}'::jsonb,
    'it', '{"colours": ["Bianco", "Giallo", "Rosso", "Blu"], "brim_length": "Corto", "form_factor": "casco", "additional_features": []}'::jsonb,
    'fr', '{"colours": ["Blanc", "Jaune", "Rouge", "Bleu"], "brim_length": "Court", "form_factor": "casque", "additional_features": []}'::jsonb,
    'de', '{"colours": ["Weiß", "Gelb", "Rot", "Blau"], "brim_length": "Kurz", "form_factor": "Helm", "additional_features": []}'::jsonb,
    'es', '{"colours": ["Blanco", "Amarillo", "Rojo", "Azul"], "brim_length": "Corto", "form_factor": "casco", "additional_features": []}'::jsonb
  )
WHERE id = '604b74ae-6aec-4846-a9ff-c3f4c2a14c46';

-- pronamic-visor-arc-flash-2
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"pronamic visor arc flash 2"'::jsonb,
    'it', '"pronamic visor arc flash 2"'::jsonb,
    'fr', '"pronamic visor arc flash 2"'::jsonb,
    'de', '"pronamic visor arc flash 2"'::jsonb,
    'es', '"pronamic visor arc flash 2"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Anti-fog and scratch-resistant polycarbonate visor compliant with EN 166 and EN 170. Provides protection against liquids, electric arcs, molten metals and hot solids."'::jsonb,
    'it', '"Visiera in policarbonato antiappannante e antigraffio conforme alle norme EN 166 ed EN 170. Offre protezione da sostanze liquide, archi elettrici, metalli fusi e solidi incandescenti."'::jsonb,
    'fr', '"Visière en polycarbonate anti-buée et anti-rayures conforme aux normes EN 166 et EN 170. Elle offre une protection contre les substances liquides, les arcs électriques, les métaux en fusion et les solides incandescents."'::jsonb,
    'de', '"Beschlag- und kratzfestes Visier aus Polycarbonat gemäß EN 166 und EN 170. Es bietet Schutz vor Flüssigkeiten, Lichtbögen, geschmolzenen Metallen und glühenden Feststoffen."'::jsonb,
    'es', '"Visor de policarbonato antivaho y antiarañazos conforme a las normas EN 166 y EN 170. Ofrece protección contra sustancias líquidas, arcos eléctricos, metales fundidos y sólidos incandescentes."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"PC arc flash visor class 2"'::jsonb,
    'it', '"Visore in PC arco elettrico di classe 2"'::jsonb,
    'fr', '"Visière en PC arc électrique classe 2"'::jsonb,
    'de', '"PC-Visier Lichtbogen Klasse 2"'::jsonb,
    'es', '"Visor de PC arco eléctrico clase 2"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Eye & Face protection"'::jsonb,
    'it', '"Protezione degli occhi e del viso"'::jsonb,
    'fr', '"Protection des yeux et du visage"'::jsonb,
    'de', '"Augen- und Gesichtsschutz"'::jsonb,
    'es', '"Protección de los ojos y la cara"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Face shields & Visors"'::jsonb,
    'it', '"Schermi facciali e visiere"'::jsonb,
    'fr', '"Écrans faciaux et visières"'::jsonb,
    'de', '"Gesichtsschutzschirme und Visiere"'::jsonb,
    'es', '"Pantallas faciales y viseras"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN 166 (personal eye protection) and EN 170 (UV filter) compliant", "Class 2 electric-arc protection (GS-ET 29)", "Anti-fog and scratch-resistant polycarbonate visor", "Suitable against molten metals and hot solids (marking 9)"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations with electrical risks", "Environment with risk of exposure to chemical substances"]'::jsonb,
    'it', '["Attivita'' in presenza di rischi elettrici", "Operazioni in presenza di sostanze chimiche"]'::jsonb,
    'fr', '["Activités en présence de risques électriques", "Opérations en présence de substances chimiques"]'::jsonb,
    'de', '["Tätigkeiten bei elektrischen Gefährdungen", "Arbeiten in Gegenwart von Chemikalien"]'::jsonb,
    'es', '["Actividades en presencia de riesgos eléctricos", "Operaciones en presencia de sustancias químicas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Utilities", "Construction", "Electrical maintenance"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["arc visor", "EN 166"]'::jsonb,
    'it', '["visiera arco", "EN 166"]'::jsonb,
    'fr', '["visière arc électrique", "EN 166"]'::jsonb,
    'de', '["Lichtbogen-Visier", "EN 166"]'::jsonb,
    'es', '["visera de arco eléctrico", "EN 166"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"-"'::jsonb,
    'it', '"-"'::jsonb,
    'fr', '"-"'::jsonb,
    'de', '"-"'::jsonb,
    'es', '"-"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["PC"]'::jsonb,
    'it', '["PC"]'::jsonb,
    'fr', '["PC"]'::jsonb,
    'de', '["PC"]'::jsonb,
    'es', '["PC"]'::jsonb
  ),
  eye_face_comfort_features_locales = COALESCE(eye_face_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Inner lenses with anti-fog coating, outer lenses scratch- and chemical-resistant", "With the click & pull system, the visor can be detached from the support system with a pulling movement", "Central resting position on the head to relieve the cervical area", "Hearing protection attachable via bayonet fitting"]'::jsonb,
    'it', '["Lenti interne antiappannanti, lenti esterne antigraffio e resistenti alle sostanze chimiche", "Con il sistema click & pull, la visiera può essere staccata dal sistema di supporto con un movimento di trazione", "Posizione di riposo centrale sul capo per dare sollievo alla zona cervicale", "Dispositivo di protezione per l''udito innestabile tramite attacco a baionetta"]'::jsonb,
    'fr', '["Lentilles intérieures anti-buée, lentilles extérieures anti-rayures et résistantes aux produits chimiques", "Grâce au système click & pull, la visière peut être détachée du système de support par un simple mouvement de traction", "Position de repos centrale sur la tête pour soulager la zone cervicale", "Protection auditive raccordable par fixation à baïonnette"]'::jsonb,
    'de', '["Innenscheiben beschlagfrei, Außenscheiben kratzfest und chemikalienbeständig", "Mit dem Click & Pull-System kann das Visier durch eine Zugbewegung vom Tragesystem gelöst werden", "Zentrale Ruheposition auf dem Kopf zur Entlastung der Nackenpartie", "Gehörschutz, anbringbar über Bajonettverschluss"]'::jsonb,
    'es', '["Lentes interiores antivaho, lentes exteriores antiarañazos y resistentes a sustancias químicas", "Con el sistema click & pull, el visor puede desprenderse del sistema de soporte con un simple movimiento de tracción", "Posición de reposo central en la cabeza para aliviar la zona cervical", "Protector auditivo acoplable mediante fijación de bayoneta"]'::jsonb
  ),
  eye_face_attributes_locales = COALESCE(eye_face_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"uv_code": "UV400", "coatings": ["Anti Fog", "Scratch Resistant"], "lens_tint": "Transparent", "form_factor": "Visor", "lens_material": "PC", "frame_material": "Plastic"}'::jsonb,
    'it', '{"uv_code": "UV400", "coatings": ["Antiappannante", "Antigraffio"], "lens_tint": "Trasparente", "form_factor": "Visiera", "lens_material": "PC", "frame_material": "Plastica"}'::jsonb,
    'fr', '{"uv_code": "UV400", "coatings": ["Anti-buée", "Anti-rayures"], "lens_tint": "Transparent", "form_factor": "Visière", "lens_material": "PC", "frame_material": "Plastique"}'::jsonb,
    'de', '{"uv_code": "UV400", "coatings": ["Beschlagfrei", "Kratzfest"], "lens_tint": "Transparent", "form_factor": "Visier", "lens_material": "PC", "frame_material": "Kunststoff"}'::jsonb,
    'es', '{"uv_code": "UV400", "coatings": ["Antivaho", "Antirrayaduras"], "lens_tint": "Transparente", "form_factor": "Visor", "lens_material": "PC", "frame_material": "Plástico"}'::jsonb
  ),
  coatings_locales = COALESCE(coatings_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Anti-fog", "Scratch resistant"]'::jsonb,
    'it', '["Anti-appannamento", "Anti-graffio"]'::jsonb,
    'fr', '["Anti-buée", "Anti-rayures"]'::jsonb,
    'de', '["Beschlagfrei", "Kratzfest"]'::jsonb,
    'es', '["Antivaho", "Antirrayaduras"]'::jsonb
  )
WHERE id = '0c954ed7-f2c6-40e5-9009-32702e76424f';

-- super-f-otg
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Super F OTG"'::jsonb,
    'it', '"Super F OTG"'::jsonb,
    'fr', '"Super F OTG"'::jsonb,
    'de', '"Super F OTG"'::jsonb,
    'es', '"Super F OTG"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welding safety glasses offering excellent eye protection and can be used as overspecs."'::jsonb,
    'it', '"Occhiali protettivi da saldatura che offrono un ottima protezione oculare e possono essere utilizzati come sovraocchiali"'::jsonb,
    'fr', '"Lunettes de protection pour le soudage offrant une excellente protection oculaire, pouvant être utilisées comme surlunettes"'::jsonb,
    'de', '"Schweißerschutzbrille mit ausgezeichnetem Augenschutz, die auch als Überbrille verwendet werden kann"'::jsonb,
    'es', '"Gafas de protección para soldadura que ofrecen una excelente protección ocular y pueden utilizarse como sobregafas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Metal-free UV400 glasses with IR protection"'::jsonb,
    'it', '"Ochiali in plastica UV400 con lenti IR"'::jsonb,
    'fr', '"Lunettes en plastique UV400 avec verres IR"'::jsonb,
    'de', '"Kunststoffbrille UV400 mit IR-Gläsern"'::jsonb,
    'es', '"Gafas de plástico UV400 con lentes IR"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Eye & Face protection"'::jsonb,
    'it', '"Protezione occhi e viso"'::jsonb,
    'fr', '"Protection des yeux et du visage"'::jsonb,
    'de', '"Augen- und Gesichtsschutz"'::jsonb,
    'es', '"Protección de los ojos y la cara"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety glasses"'::jsonb,
    'it', '"Occhiali di sicurezza"'::jsonb,
    'fr', '"Lunettes de sécurité"'::jsonb,
    'de', '"Schutzbrillen"'::jsonb,
    'es', '"Gafas de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Polycarbonate lens with uvex infradur plus treatment - scratch resistant and anti-fog", "Metal-free"]'::jsonb,
    'it', '["Metal-free", "Robusta lente in policarbonato con trattamento uvex infradur plus - lente antigraffio e antiappannante"]'::jsonb,
    'fr', '["Sans métal", "Verre robuste en polycarbonate avec traitement uvex infradur plus - verre anti-rayures et anti-buée"]'::jsonb,
    'de', '["Metallfrei", "Robustes Polycarbonat-Glas mit uvex infradur plus Beschichtung - kratz- und beschlagfestes Glas"]'::jsonb,
    'es', '["Sin metal", "Lente robusta de policarbonato con tratamiento uvex infradur plus: lente antiarañazos y antivaho"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding", "Operations in blast furnaces or in the presence of molten/hot material"]'::jsonb,
    'it', '["Operazioni di saldatura", "Operazioni in alti forni o in presenza di materiale incandescente"]'::jsonb,
    'fr', '["Opérations de soudage", "Opérations dans des hauts fourneaux ou en présence de matériaux incandescents"]'::jsonb,
    'de', '["Schweißarbeiten", "Arbeiten an Hochöfen oder bei Vorhandensein von glühendem Material"]'::jsonb,
    'es', '["Operaciones de soldadura", "Operaciones en altos hornos o en presencia de material incandescente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacaturing", "Steel processing and manufacturing", "Construction"]'::jsonb,
    'it', '["Industria del Vetro", "Industria dell''Acciaio", "Metallurgia", "Edilizia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie", "Construction"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie", "Bauwesen"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia", "Construcción"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding"]'::jsonb,
    'it', '["Saldatura"]'::jsonb,
    'fr', '["Soudage"]'::jsonb,
    'de', '["Schweißen"]'::jsonb,
    'es', '["Soldadura"]'::jsonb
  ),
  eye_face_comfort_features_locales = COALESCE(eye_face_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Provides unrestricted lateral visibility", "Soft temple tips for optimal comfort", "Anatomically shaped nose bridge for all-day comfort"]'::jsonb,
    'it', '["Offre una visibilità laterale illimitata", "Terminali delle astine morbide per un comfort ottimale", "Supporto nasale anatomico per un comfort che dura tutto il giorno"]'::jsonb,
    'fr', '["Offre une visibilité latérale illimitée", "Embouts de branches souples pour un confort optimal", "Support nasal anatomique pour un confort qui dure toute la journée"]'::jsonb,
    'de', '["Bietet uneingeschränkte Seitensicht", "Weiche Bügelenden für optimalen Tragekomfort", "Anatomische Nasenauflage für ganztägigen Komfort"]'::jsonb,
    'es', '["Ofrece una visibilidad lateral ilimitada", "Terminales de patillas blandas para un confort óptimo", "Apoyo nasal anatómico para un confort que dura todo el día"]'::jsonb
  ),
  coatings_locales = COALESCE(coatings_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Anti Fog", "Scratch Resistant"]'::jsonb,
    'it', '["Scratch Resistant", "Anti Fog"]'::jsonb,
    'fr', '["Résistant aux rayures", "Anti-buée"]'::jsonb,
    'de', '["Kratzfest", "Beschlagfrei"]'::jsonb,
    'es', '["Resistente a los arañazos", "Antivaho"]'::jsonb
  ),
  eye_face_materials_locales = COALESCE(eye_face_materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"arm": "Plastic", "lens": "Polycarbonate (PC)", "frame": "Plastic", "headband": ""}'::jsonb,
    'it', '{"arm": "Plastica", "lens": "Policarbonato (PC)", "frame": "Plastica", "headband": ""}'::jsonb,
    'fr', '{"arm": "Plastique", "lens": "Polycarbonate (PC)", "frame": "Plastique", "headband": ""}'::jsonb,
    'de', '{"arm": "Kunststoff", "lens": "Polycarbonat (PC)", "frame": "Kunststoff", "headband": ""}'::jsonb,
    'es', '{"arm": "Plástico", "lens": "Policarbonato (PC)", "frame": "Plástico", "headband": ""}'::jsonb
  )
WHERE id = '93233a36-942c-4b3e-a746-453a84a6b487';

-- suxxed-construction-j
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXed construction J"'::jsonb,
    'it', '"suXXed construction J"'::jsonb,
    'fr', '"suXXed construction J"'::jsonb,
    'de', '"suXXed construction J"'::jsonb,
    'es', '"suXXed construction J"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ergonomic High‑Vis work jacket with \"high‑rise\" sleeve design, reflective elements, stand‑up collar, longer back and multiple pockets (some with flaps)."'::jsonb,
    'it', '"Giacca da lavoro High‑Vis ergonomica con manica \"high‑rise\", elementi riflettenti, collo montante, parte posteriore più lunga e numerose tasche (alcune con risvolto)."'::jsonb,
    'fr', '"Veste de travail High-Vis ergonomique avec manche \"high-rise\", éléments réfléchissants, col montant, dos plus long et nombreuses poches (certaines avec rabat)."'::jsonb,
    'de', '"Ergonomische High-Vis-Arbeitsjacke mit \"High-Rise\"-Ärmel, reflektierenden Elementen, Stehkragen, verlängertem Rücken und zahlreichen Taschen (einige mit Klappe)."'::jsonb,
    'es', '"Chaqueta de trabajo de alta visibilidad ergonómica con manga \"high-rise\", elementos reflectantes, cuello alto, espalda más larga y numerosos bolsillos (algunos con solapa)."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ergonomic High‑Vis Jacket"'::jsonb,
    'it', '"Giacca alta visibilità ergonomica"'::jsonb,
    'fr', '"Veste haute visibilité ergonomique"'::jsonb,
    'de', '"Ergonomische Warnschutzjacke"'::jsonb,
    'es', '"Chaqueta de alta visibilidad ergonómica"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective clothing"'::jsonb,
    'it', '"Abbigliamento protettivo e da lavoro"'::jsonb,
    'fr', '"Vêtements de protection et de travail"'::jsonb,
    'de', '"Schutz- und Arbeitskleidung"'::jsonb,
    'es', '"Ropa de protección y de trabajo"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hi‑Vis Jackets"'::jsonb,
    'it', '"Giacche ad alta visibilità"'::jsonb,
    'fr', '"Vestes haute visibilité"'::jsonb,
    'de', '"Warnschutzjacken"'::jsonb,
    'es', '"Chaquetas de alta visibilidad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["2 reflective strips around torso and arms", "Longer back for increased protection", "UV protection", "Multiple internal/external pockets"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Visibility near moving traffic or on construction sites", "Staff operating around forklifts and heavy equipment", "Public service operators in low‑visibility conditions"]'::jsonb,
    'it', '["Visibilità vicino a traffico in movimento o cantieri", "Personale che lavora attorno a carrelli elevatori e macchinari pesanti", "Operatori dei servizi pubblici in condizioni di scarsa visibilità"]'::jsonb,
    'fr', '["Visibilité à proximité du trafic en mouvement ou des chantiers", "Personnel travaillant à proximité de chariots élévateurs et de machines lourdes", "Agents des services publics en conditions de faible visibilité"]'::jsonb,
    'de', '["Sichtbarkeit in der Nähe von fließendem Verkehr oder Baustellen", "Personal, das in der Nähe von Gabelstaplern und schweren Maschinen arbeitet", "Mitarbeiter öffentlicher Dienste bei schlechter Sicht"]'::jsonb,
    'es', '["Visibilidad cerca de tráfico en movimiento u obras", "Personal que trabaja cerca de carretillas elevadoras y maquinaria pesada", "Operarios de servicios públicos en condiciones de baja visibilidad"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Roadworks", "Warehousing", "Logistics"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["high‑visibility", "jacket"]'::jsonb,
    'it', '["alta visibilità", "giacca"]'::jsonb,
    'fr', '["haute visibilité", "veste"]'::jsonb,
    'de', '["hohe Sichtbarkeit", "Jacke"]'::jsonb,
    'es', '["alta visibilidad", "chaqueta"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"XS–4XL"'::jsonb,
    'it', '"XS–4XL"'::jsonb,
    'fr', '"XS–4XL"'::jsonb,
    'de', '"XS–4XL"'::jsonb,
    'es', '"XS–4XL"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["50% CO", "50% PES"]'::jsonb,
    'it', '["50% CO", "50% PES"]'::jsonb,
    'fr', '["50 % CO", "50 % PES"]'::jsonb,
    'de', '["50 % CO", "50 % PES"]'::jsonb,
    'es', '["50 % CO", "50 % PES"]'::jsonb
  ),
  clothing_comfort_features_locales = COALESCE(clothing_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa", "tetaa"]'::jsonb,
    'fr', '["tête", "tetaa"]'::jsonb,
    'de', '["Kopf", "tetaa"]'::jsonb,
    'es', '["cabeza", "tetaa"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Ergonomic", "size_range": "XS–4XL"}'::jsonb,
    'it', '{"fit": "Ergonomico", "size_range": "XS–4XL"}'::jsonb,
    'fr', '{"fit": "Ergonomique", "size_range": "XS–4XL"}'::jsonb,
    'de', '{"fit": "Ergonomisch", "size_range": "XS–4XL"}'::jsonb,
    'es', '{"fit": "Ergonómico", "size_range": "XS–4XL"}'::jsonb
  )
WHERE id = '95686d7e-f3b0-40e7-a7e3-125b3be944e6';

-- suxxeed-multifunction-j
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed multifunction J"'::jsonb,
    'it', '"suXXeed multifunction J"'::jsonb,
    'fr', '"suXXeed multifunction J"'::jsonb,
    'de', '"suXXeed multifunction J"'::jsonb,
    'es', '"suXXeed multifunction J"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Multi‑function jacket certified for internal arc, heat, flame and chemical protection."'::jsonb,
    'it', '"Giacca multiuso certificata per protezione da arco elettrico interno, calore, fiamma e sostanze chimiche."'::jsonb,
    'fr', '"Veste polyvalente certifiée pour la protection contre l''arc électrique interne, la chaleur, la flamme et les produits chimiques."'::jsonb,
    'de', '"Vielseitige Jacke, zertifiziert für den Schutz vor internem Störlichtbogen, Hitze, Flammen und Chemikalien."'::jsonb,
    'es', '"Chaqueta multiusos certificada para protección contra arco eléctrico interno, calor, llama y sustancias químicas."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Multi‑function jacket in fire‑retardant fabric"'::jsonb,
    'it', '"Giacca multifunzione in tessuto ignifugo"'::jsonb,
    'fr', '"Veste multifonction en tissu ignifugé"'::jsonb,
    'de', '"Multifunktionsjacke aus flammhemmendem Gewebe"'::jsonb,
    'es', '"Chaqueta multifunción en tejido ignífugo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective clothing"'::jsonb,
    'it', '"Abbigliamento protettivo e da lavoro"'::jsonb,
    'fr', '"Vêtements de protection et de travail"'::jsonb,
    'de', '"Schutz- und Arbeitskleidung"'::jsonb,
    'es', '"Ropa de protección y de trabajo"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Jackets"'::jsonb,
    'it', '"Giacche protettive"'::jsonb,
    'fr', '"Vestes de protection"'::jsonb,
    'de', '"Schutzjacken"'::jsonb,
    'es', '"Chaquetas de protección"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ergonomic fit with extended back", "Attached reflex elements", "Concealed pockets and closures", "Highly resistant and durable"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electrical installations", "Operations with low or moderate chemical hazards", "Welding work"]'::jsonb,
    'it', '["Installazioni elettriche", "Operazioni in presenza di rischi chimici bassi o moderati", "Lavori di saldatura"]'::jsonb,
    'fr', '["Installations électriques", "Opérations en présence de risques chimiques faibles ou modérés", "Travaux de soudage"]'::jsonb,
    'de', '["Elektroinstallationen", "Arbeiten bei niedrigen oder mittleren chemischen Risiken", "Schweißarbeiten"]'::jsonb,
    'es', '["Instalaciones eléctricas", "Operaciones con riesgos químicos bajos o moderados", "Trabajos de soldadura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["fr", "multi‑risk", "jacket"]'::jsonb,
    'it', '["ignifugo", "multirischio", "giacca"]'::jsonb,
    'fr', '["ignifuge", "multirisque", "veste"]'::jsonb,
    'de', '["flammhemmend", "Mehrfachschutz", "Jacke"]'::jsonb,
    'es', '["ignífugo", "multirriesgo", "chaqueta"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"S–6XL"'::jsonb,
    'it', '"S–6XL"'::jsonb,
    'fr', '"S–6XL"'::jsonb,
    'de', '"S–6XL"'::jsonb,
    'es', '"S–6XL"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["49% PPAN‑FR", "42% CO", "5% PARA‑ARAMID", "3% PA", "1% carbon"]'::jsonb,
    'it', '["49% PPAN‑FR", "42% cotone", "5% para‑aramide", "3% poliammide", "1% carbonio"]'::jsonb,
    'fr', '["49 % PPAN-FR", "42 % coton", "5 % para-aramide", "3 % polyamide", "1 % carbone"]'::jsonb,
    'de', '["49 % PPAN-FR", "42 % Baumwolle", "5 % Para-Aramid", "3 % Polyamid", "1 % Kohlenstoff"]'::jsonb,
    'es', '["49 % PPAN-FR", "42 % algodón", "5 % para-aramida", "3 % poliamida", "1 % carbono"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Ergonomic", "size_range": "S–6XL"}'::jsonb,
    'it', '{"fit": "Ergonomico", "size_range": "S–6XL"}'::jsonb,
    'fr', '{"fit": "Ergonomique", "size_range": "S–6XL"}'::jsonb,
    'de', '{"fit": "Ergonomisch", "size_range": "S–6XL"}'::jsonb,
    'es', '{"fit": "Ergonómico", "size_range": "S–6XL"}'::jsonb
  )
WHERE id = '428ac25c-d4e7-4b19-8810-47c681e8e917';

-- sv25
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SV25"'::jsonb,
    'it', '"SV25"'::jsonb,
    'fr', '"SV25"'::jsonb,
    'de', '"SV25"'::jsonb,
    'es', '"SV25"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-quality split leather sleeve for welding activities with felcro to ensure perfect fit."'::jsonb,
    'it', '"Monicotto in pelle crosta di alta qualita'' per attivita'' di saldatura. Chiusura con feltro per garantire massimo comfort e fit."'::jsonb,
    'fr', '"Manchette en cuir croûte de haute qualité pour les activités de soudage. Fermeture en feutre pour garantir un confort et un ajustement maximaux."'::jsonb,
    'de', '"Hochwertiger Schweißerärmel aus Spaltleder für Schweißarbeiten. Filzverschluss für maximalen Komfort und Passform."'::jsonb,
    'es', '"Manguito de cuero serraje de alta calidad para actividades de soldadura. Cierre de fieltro para garantizar el máximo confort y ajuste."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Split leather welding sleeve"'::jsonb,
    'it', '"Manicotto in pelle crosta per saldatore"'::jsonb,
    'fr', '"Manchette en cuir croûte pour soudeur"'::jsonb,
    'de', '"Schweißerärmel aus Spaltleder"'::jsonb,
    'es', '"Manguito de cuero serraje para soldador"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Arm protection"'::jsonb,
    'it', '"Protezione braccia"'::jsonb,
    'fr', '"Protection des bras"'::jsonb,
    'de', '"Armschutz"'::jsonb,
    'es', '"Protección de los brazos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welding sleeve"'::jsonb,
    'it', '"Manicotti da saldatore"'::jsonb,
    'fr', '"Manchettes de soudeur"'::jsonb,
    'de', '"Schweißerstulpen"'::jsonb,
    'es', '"Manguitos de soldador"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["High-quality thick leather for enhanced protection", "Felcro to ensure optimal fit and comfort"]'::jsonb,
    'it', '["Pellame di alta qualità e spessore per maggiore protezione", "Chiusura con felcro per maggior comfort e tenuta"]'::jsonb,
    'fr', '["Cuir de haute qualité et d''épaisseur pour une meilleure protection", "Fermeture velcro pour un meilleur confort et un maintien optimal"]'::jsonb,
    'de', '["Hochwertiges und dickes Leder für erhöhten Schutz", "Klettverschluss für mehr Komfort und besseren Halt"]'::jsonb,
    'es', '["Cuero de alta calidad y grosor para mayor protección", "Cierre de velcro para mayor confort y sujeción"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal fabrication welding operations", "Thermal metal cutting", "Welding maintenance and repair work"]'::jsonb,
    'it', '["Attività di saldatura in metallurgia", "Taglio termico dei metalli", "Lavorazioni di carpenteria metallica", "Manutenzione mediante saldatura"]'::jsonb,
    'fr', '["Activités de soudage en métallurgie", "Découpe thermique des métaux", "Travaux de charpente métallique", "Maintenance par soudage"]'::jsonb,
    'de', '["Schweißarbeiten in der Metallurgie", "Thermisches Schneiden von Metallen", "Metallbauarbeiten", "Wartung durch Schweißen"]'::jsonb,
    'es', '["Actividades de soldadura en metalurgia", "Corte térmico de metales", "Trabajos de carpintería metálica", "Mantenimiento mediante soldadura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal manufacturing"]'::jsonb,
    'it', '["Industria dell''Acciaio", "Metallurgia"]'::jsonb,
    'fr', '["Industrie sidérurgique", "Métallurgie"]'::jsonb,
    'de', '["Stahlindustrie", "Metallurgie"]'::jsonb,
    'es', '["Industria del acero", "Metalurgia"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding"]'::jsonb,
    'it', '["Saldatura"]'::jsonb,
    'fr', '["Soudage"]'::jsonb,
    'de', '["Schweißen"]'::jsonb,
    'es', '["Soldadura"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"45 cm"'::jsonb,
    'it', '"45 cm"'::jsonb,
    'fr', '"45 cm"'::jsonb,
    'de', '"45 cm"'::jsonb,
    'es', '"45 cm"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather"]'::jsonb,
    'it', '["Pelle"]'::jsonb,
    'fr', '["Cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["Cuero"]'::jsonb
  )
WHERE id = 'fa8234b5-c3d1-4ac9-903a-29c079d4159a';

-- swabex-o
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SWABEX O"'::jsonb,
    'it', '"SWABEX O"'::jsonb,
    'fr', '"SWABEX O"'::jsonb,
    'de', '"SWABEX O"'::jsonb,
    'es', '"SWABEX O"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant cotton swabbing tools with optional protective felt head cover, featuring a strong yet malleable metal handle for safe and precise mould maintenance in glass manufacturing, metal casting, forging, and ceramic forming."'::jsonb,
    'it', '"Scovoli in cotone resistenti al calore con copritesta protettivo in feltro opzionale, dotati di manico in metallo robusto ma flessibile per una manutenzione sicura e precisa degli stampi nella produzione del vetro, colata dei metalli, forgiatura e formatura della ceramica."'::jsonb,
    'fr', '"Écouvillons en coton résistants à la chaleur avec embout de protection en feutre en option, dotés d''un manche en métal robuste mais flexible pour un entretien sûr et précis des moules dans la production du verre, la coulée des métaux, le forgeage et le formage de la céramique."'::jsonb,
    'de', '"Hitzebeständige Baumwollwischer mit optionaler Schutzkappe aus Filz, ausgestattet mit einem robusten, aber flexiblen Metallgriff für eine sichere und präzise Formenpflege in der Glasproduktion, beim Metallguss, beim Schmieden und bei der Keramikformung."'::jsonb,
    'es', '"Escobillas de algodón resistentes al calor con protector de fieltro opcional en la punta, con mango de metal robusto pero flexible para un mantenimiento seguro y preciso de los moldes en la producción de vidrio, la colada de metales, la forja y el conformado de cerámica."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cotton swab with optional head cover and metal handle"'::jsonb,
    'it', '"Scovolo in cotone con feltro opzionale in punta e manico in metallo"'::jsonb,
    'fr', '"Écouvillon en coton avec feutre en option à l''extrémité et manche en métal"'::jsonb,
    'de', '"Baumwollwischer mit optionalem Filz an der Spitze und Metallgriff"'::jsonb,
    'es', '"Escobilla de algodón con fieltro opcional en la punta y mango de metal"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Industrial Swabs"'::jsonb,
    'it', '"Scovoli industriali"'::jsonb,
    'fr', '"Écouvillons industriels"'::jsonb,
    'de', '"Industrieputzwerkzeuge"'::jsonb,
    'es', '"Escobillas industriales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant cotton pads with optional head cover", "Strong but malleable handles designed for safe operation and precise application in hot-end environments. Available with and without ring.", "Multiple head shapes and sizes (incl. custom size)", "Durable construction. Resistant to high heat, abrasion, and repeated industrial use."]'::jsonb,
    'it', '["Scovoli in cotone resistenti al calore con feltro protettivo opzionale", "Manici robusti ma flessibili, progettati per un utilizzo sicuro e un’applicazione precisa nella zona calda. Disponibile con e senza anello.", "Varie forme e dimensioni (incluse misure personalizzate)", "Struttura durevole, resistente alle alte temperature, all’abrasione e all’uso industriale ripetuto"]'::jsonb,
    'fr', '["Écouvillons en coton résistants à la chaleur avec feutre de protection en option", "Manches robustes mais flexibles, conçus pour une utilisation sûre et une application précise en zone chaude. Disponible avec ou sans anneau.", "Diverses formes et dimensions (y compris sur mesure)", "Structure durable, résistante aux hautes températures, à l’abrasion et à un usage industriel répété"]'::jsonb,
    'de', '["Hitzebeständige Baumwollwischer mit optionalem Schutzfilz", "Robuste, aber flexible Griffe, konzipiert für einen sicheren Einsatz und eine präzise Anwendung im Heißbereich. Erhältlich mit und ohne Ring.", "Verschiedene Formen und Größen (einschließlich Sondermaße)", "Langlebige Struktur, beständig gegen hohe Temperaturen, Abrieb und wiederholten industriellen Einsatz"]'::jsonb,
    'es', '["Escobillas de algodón resistentes al calor con fieltro protector opcional", "Mangos robustos pero flexibles, diseñados para un uso seguro y una aplicación precisa en la zona caliente. Disponible con y sin anilla.", "Diversas formas y tamaños (incluidas medidas personalizadas)", "Estructura duradera, resistente a las altas temperaturas, a la abrasión y al uso industrial repetido"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Lubricating blank, neck, and blow moulds in bottle and jar production", "Mould lubrication in non-ferrous metal casting", "Hot forging"]'::jsonb,
    'it', '["Lubrificazione degli stampi nella produzione di bottiglie e vasetti", "Lubrificazione degli stampi nella colata di metalli non ferrosi", "Forgiatura a caldo"]'::jsonb,
    'fr', '["Lubrification des moules dans la production de bouteilles et de pots", "Lubrification des moules dans la coulée de métaux non ferreux", "Forgeage à chaud"]'::jsonb,
    'de', '["Formenschmierung bei der Herstellung von Flaschen und Gläsern", "Formenschmierung beim Guss von Nichteisenmetallen", "Warmschmieden"]'::jsonb,
    'es', '["Lubricación de moldes en la producción de botellas y frascos", "Lubricación de moldes en la colada de metales no férricos", "Forja en caliente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Metal casting", "Forging and pressing", "Ceramic forming"]'::jsonb,
    'it', '["Industria del vetro", "Metallurgia", "Forgiatura e stampaggio", "Ceramica"]'::jsonb,
    'fr', '["Industrie du verre", "Métallurgie", "Forge et estampage", "Céramique"]'::jsonb,
    'de', '["Glasindustrie", "Metallurgie", "Schmieden und Stanzen", "Keramik"]'::jsonb,
    'es', '["Industria del vidrio", "Metalurgia", "Forja y estampado", "Cerámica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["swabbing tools", "lubricating", "cotton swabs", "glass manufacturing"]'::jsonb,
    'it', '["scovoli in cotone", "lubrificazione stampi", "industria del vetro"]'::jsonb,
    'fr', '["écouvillons en coton", "lubrification des moules", "industrie du verre"]'::jsonb,
    'de', '["Baumwollputzwerkzeuge", "Formenschmierung", "Glasindustrie"]'::jsonb,
    'es', '["escobillas de algodón", "lubricación de moldes", "industria del vidrio"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cotton"]'::jsonb,
    'it', '["Cotone"]'::jsonb,
    'fr', '["Coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["Algodón"]'::jsonb
  )
WHERE id = 'f1c9eb49-be61-4423-9380-5203d2cbdd4f';

-- swabex-o-100x100x560
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SWABEX O 100x100x560"'::jsonb,
    'it', '"SWABEX O 100x100x560"'::jsonb,
    'fr', '"SWABEX O 100x100x560"'::jsonb,
    'de', '"SWABEX O 100x100x560"'::jsonb,
    'es', '"SWABEX O 100x100x560"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant cotton swabbing tools with optional protective felt head cover, featuring a strong yet malleable metal handle for safe and precise mould maintenance in glass manufacturing, metal casting, forging, and ceramic forming."'::jsonb,
    'it', '"Scovoli in cotone resistenti al calore con copritesta protettivo in feltro opzionale, dotati di manico in metallo robusto ma flessibile per una manutenzione sicura e precisa degli stampi nella produzione del vetro, colata dei metalli, forgiatura e formatura della ceramica."'::jsonb,
    'fr', '"Écouvillons en coton résistants à la chaleur avec embout de protection en feutre en option, dotés d''un manche en métal robuste mais flexible pour un entretien sûr et précis des moules dans la production du verre, la coulée des métaux, le forgeage et le formage de la céramique."'::jsonb,
    'de', '"Hitzebeständige Baumwollwischer mit optionaler Schutzkappe aus Filz, ausgestattet mit einem robusten, aber flexiblen Metallgriff für eine sichere und präzise Formenpflege in der Glasproduktion, beim Metallguss, beim Schmieden und bei der Keramikformung."'::jsonb,
    'es', '"Escobillas de algodón resistentes al calor con protector de fieltro opcional en la punta, con mango de metal robusto pero flexible para un mantenimiento seguro y preciso de los moldes en la producción de vidrio, la colada de metales, la forja y el conformado de cerámica."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cotton swab with optional head cover and metal handle"'::jsonb,
    'it', '"Scovolo in cotone con feltro opzionale in punta e manico in metallo"'::jsonb,
    'fr', '"Écouvillon en coton avec feutre en option à l''extrémité et manche en métal"'::jsonb,
    'de', '"Baumwollwischer mit optionalem Filz an der Spitze und Metallgriff"'::jsonb,
    'es', '"Escobilla de algodón con fieltro opcional en la punta y mango de metal"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Industrial Swabs"'::jsonb,
    'it', '"Scovoli industriali"'::jsonb,
    'fr', '"Écouvillons industriels"'::jsonb,
    'de', '"Industrieputzwerkzeuge"'::jsonb,
    'es', '"Escobillas industriales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant cotton pads with optional head cover", "Strong but malleable handles designed for safe operation and precise application in hot-end environments. Available with and without ring.", "Multiple head shapes and sizes (incl. custom size)", "Durable construction. Resistant to high heat, abrasion, and repeated industrial use."]'::jsonb,
    'it', '["Scovoli in cotone resistenti al calore con feltro protettivo opzionale", "Manici robusti ma flessibili, progettati per un utilizzo sicuro e un’applicazione precisa nella zona calda. Disponibile con e senza anello.", "Varie forme e dimensioni (incluse misure personalizzate)", "Struttura durevole, resistente alle alte temperature, all’abrasione e all’uso industriale ripetuto"]'::jsonb,
    'fr', '["Écouvillons en coton résistants à la chaleur avec feutre de protection en option", "Manches robustes mais flexibles, conçus pour une utilisation sûre et une application précise en zone chaude. Disponible avec ou sans anneau.", "Diverses formes et dimensions (y compris sur mesure)", "Structure durable, résistante aux hautes températures, à l’abrasion et à un usage industriel répété"]'::jsonb,
    'de', '["Hitzebeständige Baumwollwischer mit optionalem Schutzfilz", "Robuste, aber flexible Griffe, konzipiert für einen sicheren Einsatz und eine präzise Anwendung im Heißbereich. Erhältlich mit und ohne Ring.", "Verschiedene Formen und Größen (einschließlich Sondermaße)", "Langlebige Struktur, beständig gegen hohe Temperaturen, Abrieb und wiederholten industriellen Einsatz"]'::jsonb,
    'es', '["Escobillas de algodón resistentes al calor con fieltro protector opcional", "Mangos robustos pero flexibles, diseñados para un uso seguro y una aplicación precisa en la zona caliente. Disponible con y sin anilla.", "Diversas formas y tamaños (incluidas medidas personalizadas)", "Estructura duradera, resistente a las altas temperaturas, a la abrasión y al uso industrial repetido"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Lubricating blank, neck, and blow moulds in bottle and jar production", "Mould lubrication in non-ferrous metal casting", "Hot forging"]'::jsonb,
    'it', '["Lubrificazione degli stampi nella produzione di bottiglie e vasetti", "Lubrificazione degli stampi nella colata di metalli non ferrosi", "Forgiatura a caldo"]'::jsonb,
    'fr', '["Lubrification des moules dans la production de bouteilles et de pots", "Lubrification des moules dans la coulée de métaux non ferreux", "Forgeage à chaud"]'::jsonb,
    'de', '["Formenschmierung bei der Herstellung von Flaschen und Gläsern", "Formenschmierung beim Guss von Nichteisenmetallen", "Warmschmieden"]'::jsonb,
    'es', '["Lubricación de moldes en la producción de botellas y frascos", "Lubricación de moldes en la colada de metales no férricos", "Forja en caliente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Metal casting", "Forging and pressing", "Ceramic forming"]'::jsonb,
    'it', '["Industria del vetro", "Metallurgia", "Forgiatura e stampaggio", "Ceramica"]'::jsonb,
    'fr', '["Industrie du verre", "Métallurgie", "Forge et estampage", "Céramique"]'::jsonb,
    'de', '["Glasindustrie", "Metallurgie", "Schmieden und Stanzen", "Keramik"]'::jsonb,
    'es', '["Industria del vidrio", "Metalurgia", "Forja y estampado", "Cerámica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["swabbing tools", "lubricating", "cotton swabs", "glass manufacturing"]'::jsonb,
    'it', '["scovoli in cotone", "lubrificazione stampi", "industria del vetro"]'::jsonb,
    'fr', '["écouvillons en coton", "lubrification des moules", "industrie du verre"]'::jsonb,
    'de', '["Baumwollputzwerkzeuge", "Formenschmierung", "Glasindustrie"]'::jsonb,
    'es', '["escobillas de algodón", "lubricación de moldes", "industria del vidrio"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cotton"]'::jsonb,
    'it', '["Cotone"]'::jsonb,
    'fr', '["Coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["Algodón"]'::jsonb
  )
WHERE id = 'b4828268-dbab-4c9f-a5ea-524492f27480';

-- swabex-o-45x75x470
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SWABEX O 45x75x470"'::jsonb,
    'it', '"SWABEX O 45x75x470"'::jsonb,
    'fr', '"SWABEX O 45x75x470"'::jsonb,
    'de', '"SWABEX O 45x75x470"'::jsonb,
    'es', '"SWABEX O 45x75x470"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant cotton swabbing tools with optional protective felt head cover, featuring a strong yet malleable metal handle for safe and precise mould maintenance in glass manufacturing, metal casting, forging, and ceramic forming."'::jsonb,
    'it', '"Scovoli in cotone resistenti al calore con copritesta protettivo in feltro opzionale, dotati di manico in metallo robusto ma flessibile per una manutenzione sicura e precisa degli stampi nella produzione del vetro, colata dei metalli, forgiatura e formatura della ceramica."'::jsonb,
    'fr', '"Écouvillons en coton résistants à la chaleur avec embout de protection en feutre en option, dotés d''un manche en métal robuste mais flexible pour un entretien sûr et précis des moules dans la production du verre, la coulée des métaux, le forgeage et le formage de la céramique."'::jsonb,
    'de', '"Hitzebeständige Baumwollwischer mit optionaler Schutzkappe aus Filz, ausgestattet mit einem robusten, aber flexiblen Metallgriff für eine sichere und präzise Formenpflege in der Glasproduktion, beim Metallguss, beim Schmieden und bei der Keramikformung."'::jsonb,
    'es', '"Escobillas de algodón resistentes al calor con protector de fieltro opcional en la punta, con mango de metal robusto pero flexible para un mantenimiento seguro y preciso de los moldes en la producción de vidrio, la colada de metales, la forja y el conformado de cerámica."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cotton swab with optional head cover and metal handle"'::jsonb,
    'it', '"Scovolo in cotone con feltro opzionale in punta e manico in metallo"'::jsonb,
    'fr', '"Écouvillon en coton avec feutre en option à l''extrémité et manche en métal"'::jsonb,
    'de', '"Baumwollwischer mit optionalem Filz an der Spitze und Metallgriff"'::jsonb,
    'es', '"Escobilla de algodón con fieltro opcional en la punta y mango de metal"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Industrial Swabs"'::jsonb,
    'it', '"Scovoli industriali"'::jsonb,
    'fr', '"Écouvillons industriels"'::jsonb,
    'de', '"Industrieputzwerkzeuge"'::jsonb,
    'es', '"Escobillas industriales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant cotton pads with optional head cover", "Strong but malleable handles designed for safe operation and precise application in hot-end environments. Available with and without ring.", "Multiple head shapes and sizes (incl. custom size)", "Durable construction. Resistant to high heat, abrasion, and repeated industrial use."]'::jsonb,
    'it', '["Scovoli in cotone resistenti al calore con feltro protettivo opzionale", "Manici robusti ma flessibili, progettati per un utilizzo sicuro e un’applicazione precisa nella zona calda. Disponibile con e senza anello.", "Varie forme e dimensioni (incluse misure personalizzate)", "Struttura durevole, resistente alle alte temperature, all’abrasione e all’uso industriale ripetuto"]'::jsonb,
    'fr', '["Écouvillons en coton résistants à la chaleur avec feutre de protection en option", "Manches robustes mais flexibles, conçus pour une utilisation sûre et une application précise en zone chaude. Disponible avec ou sans anneau.", "Diverses formes et dimensions (y compris sur mesure)", "Structure durable, résistante aux hautes températures, à l’abrasion et à un usage industriel répété"]'::jsonb,
    'de', '["Hitzebeständige Baumwollwischer mit optionalem Schutzfilz", "Robuste, aber flexible Griffe, konzipiert für einen sicheren Einsatz und eine präzise Anwendung im Heißbereich. Erhältlich mit und ohne Ring.", "Verschiedene Formen und Größen (einschließlich Sondermaße)", "Langlebige Struktur, beständig gegen hohe Temperaturen, Abrieb und wiederholten industriellen Einsatz"]'::jsonb,
    'es', '["Escobillas de algodón resistentes al calor con fieltro protector opcional", "Mangos robustos pero flexibles, diseñados para un uso seguro y una aplicación precisa en la zona caliente. Disponible con y sin anilla.", "Diversas formas y tamaños (incluidas medidas personalizadas)", "Estructura duradera, resistente a las altas temperaturas, a la abrasión y al uso industrial repetido"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Lubricating blank, neck, and blow moulds in bottle and jar production", "Mould lubrication in non-ferrous metal casting", "Hot forging"]'::jsonb,
    'it', '["Lubrificazione degli stampi nella produzione di bottiglie e vasetti", "Lubrificazione degli stampi nella colata di metalli non ferrosi", "Forgiatura a caldo"]'::jsonb,
    'fr', '["Lubrification des moules dans la production de bouteilles et de pots", "Lubrification des moules dans la coulée de métaux non ferreux", "Forgeage à chaud"]'::jsonb,
    'de', '["Formenschmierung bei der Herstellung von Flaschen und Gläsern", "Formenschmierung beim Guss von Nichteisenmetallen", "Warmschmieden"]'::jsonb,
    'es', '["Lubricación de moldes en la producción de botellas y frascos", "Lubricación de moldes en la colada de metales no férricos", "Forja en caliente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Metal casting", "Forging and pressing", "Ceramic forming"]'::jsonb,
    'it', '["Industria del vetro", "Metallurgia", "Forgiatura e stampaggio", "Ceramica"]'::jsonb,
    'fr', '["Industrie du verre", "Métallurgie", "Forge et estampage", "Céramique"]'::jsonb,
    'de', '["Glasindustrie", "Metallurgie", "Schmieden und Stanzen", "Keramik"]'::jsonb,
    'es', '["Industria del vidrio", "Metalurgia", "Forja y estampado", "Cerámica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["swabbing tools", "lubricating", "cotton swabs", "glass manufacturing"]'::jsonb,
    'it', '["scovoli in cotone", "lubrificazione stampi", "industria del vetro"]'::jsonb,
    'fr', '["écouvillons en coton", "lubrification des moules", "industrie du verre"]'::jsonb,
    'de', '["Baumwollputzwerkzeuge", "Formenschmierung", "Glasindustrie"]'::jsonb,
    'es', '["escobillas de algodón", "lubricación de moldes", "industria del vidrio"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cotton"]'::jsonb,
    'it', '["Cotone"]'::jsonb,
    'fr', '["Coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["Algodón"]'::jsonb
  )
WHERE id = '4078ffef-7c99-4538-b628-0b2c191db73a';

-- swabex-o-60x70x450
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SWABEX O 60x70x450"'::jsonb,
    'it', '"SWABEX O 60x70x450"'::jsonb,
    'fr', '"SWABEX O 60x70x450"'::jsonb,
    'de', '"SWABEX O 60x70x450"'::jsonb,
    'es', '"SWABEX O 60x70x450"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant cotton swabbing tools with optional protective felt head cover, featuring a strong yet malleable metal handle for safe and precise mould maintenance in glass manufacturing, metal casting, forging, and ceramic forming."'::jsonb,
    'it', '"Scovoli in cotone resistenti al calore con copritesta protettivo in feltro opzionale, dotati di manico in metallo robusto ma flessibile per una manutenzione sicura e precisa degli stampi nella produzione del vetro, colata dei metalli, forgiatura e formatura della ceramica."'::jsonb,
    'fr', '"Écouvillons en coton résistants à la chaleur avec embout de protection en feutre en option, dotés d''un manche en métal robuste mais flexible pour un entretien sûr et précis des moules dans la production du verre, la coulée des métaux, le forgeage et le formage de la céramique."'::jsonb,
    'de', '"Hitzebeständige Baumwollwischer mit optionaler Schutzkappe aus Filz, ausgestattet mit einem robusten, aber flexiblen Metallgriff für eine sichere und präzise Formenpflege in der Glasproduktion, beim Metallguss, beim Schmieden und bei der Keramikformung."'::jsonb,
    'es', '"Escobillas de algodón resistentes al calor con protector de fieltro opcional en la punta, con mango de metal robusto pero flexible para un mantenimiento seguro y preciso de los moldes en la producción de vidrio, la colada de metales, la forja y el conformado de cerámica."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cotton swab with optional head cover and metal handle"'::jsonb,
    'it', '"Scovolo in cotone con feltro opzionale in punta e manico in metallo"'::jsonb,
    'fr', '"Écouvillon en coton avec feutre en option à l''extrémité et manche en métal"'::jsonb,
    'de', '"Baumwollwischer mit optionalem Filz an der Spitze und Metallgriff"'::jsonb,
    'es', '"Escobilla de algodón con fieltro opcional en la punta y mango de metal"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Industrial Swabs"'::jsonb,
    'it', '"Scovoli industriali"'::jsonb,
    'fr', '"Écouvillons industriels"'::jsonb,
    'de', '"Industrieputzwerkzeuge"'::jsonb,
    'es', '"Escobillas industriales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant cotton pads with optional head cover", "Strong but malleable handles designed for safe operation and precise application in hot-end environments. Available with and without ring.", "Multiple head shapes and sizes (incl. custom size)", "Durable construction. Resistant to high heat, abrasion, and repeated industrial use."]'::jsonb,
    'it', '["Scovoli in cotone resistenti al calore con feltro protettivo opzionale", "Manici robusti ma flessibili, progettati per un utilizzo sicuro e un’applicazione precisa nella zona calda. Disponibile con e senza anello.", "Varie forme e dimensioni (incluse misure personalizzate)", "Struttura durevole, resistente alle alte temperature, all’abrasione e all’uso industriale ripetuto"]'::jsonb,
    'fr', '["Écouvillons en coton résistants à la chaleur avec feutre de protection en option", "Manches robustes mais flexibles, conçus pour une utilisation sûre et une application précise en zone chaude. Disponible avec ou sans anneau.", "Diverses formes et dimensions (y compris sur mesure)", "Structure durable, résistante aux hautes températures, à l’abrasion et à un usage industriel répété"]'::jsonb,
    'de', '["Hitzebeständige Baumwollwischer mit optionalem Schutzfilz", "Robuste, aber flexible Griffe, konzipiert für einen sicheren Einsatz und eine präzise Anwendung im Heißbereich. Erhältlich mit und ohne Ring.", "Verschiedene Formen und Größen (einschließlich Sondermaße)", "Langlebige Struktur, beständig gegen hohe Temperaturen, Abrieb und wiederholten industriellen Einsatz"]'::jsonb,
    'es', '["Escobillas de algodón resistentes al calor con fieltro protector opcional", "Mangos robustos pero flexibles, diseñados para un uso seguro y una aplicación precisa en la zona caliente. Disponible con y sin anilla.", "Diversas formas y tamaños (incluidas medidas personalizadas)", "Estructura duradera, resistente a las altas temperaturas, a la abrasión y al uso industrial repetido"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Lubricating blank, neck, and blow moulds in bottle and jar production", "Mould lubrication in non-ferrous metal casting", "Hot forging"]'::jsonb,
    'it', '["Lubrificazione degli stampi nella produzione di bottiglie e vasetti", "Lubrificazione degli stampi nella colata di metalli non ferrosi", "Forgiatura a caldo"]'::jsonb,
    'fr', '["Lubrification des moules dans la production de bouteilles et de pots", "Lubrification des moules dans la coulée de métaux non ferreux", "Forgeage à chaud"]'::jsonb,
    'de', '["Formenschmierung bei der Herstellung von Flaschen und Gläsern", "Formenschmierung beim Guss von Nichteisenmetallen", "Warmschmieden"]'::jsonb,
    'es', '["Lubricación de moldes en la producción de botellas y frascos", "Lubricación de moldes en la colada de metales no férricos", "Forja en caliente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Metal casting", "Forging and pressing", "Ceramic forming"]'::jsonb,
    'it', '["Industria del vetro", "Metallurgia", "Forgiatura e stampaggio", "Ceramica"]'::jsonb,
    'fr', '["Industrie du verre", "Métallurgie", "Forge et estampage", "Céramique"]'::jsonb,
    'de', '["Glasindustrie", "Metallurgie", "Schmieden und Stanzen", "Keramik"]'::jsonb,
    'es', '["Industria del vidrio", "Metalurgia", "Forja y estampado", "Cerámica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["swabbing tools", "lubricating", "cotton swabs", "glass manufacturing"]'::jsonb,
    'it', '["scovoli in cotone", "lubrificazione stampi", "industria del vetro"]'::jsonb,
    'fr', '["écouvillons en coton", "lubrification des moules", "industrie du verre"]'::jsonb,
    'de', '["Baumwollputzwerkzeuge", "Formenschmierung", "Glasindustrie"]'::jsonb,
    'es', '["escobillas de algodón", "lubricación de moldes", "industria del vidrio"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cotton"]'::jsonb,
    'it', '["Cotone"]'::jsonb,
    'fr', '["Coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["Algodón"]'::jsonb
  )
WHERE id = 'e85c4e38-5c51-41a8-b45e-a82baa2e2041';

-- swabex-o-70x100x510
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SWABEX O 70x100x510"'::jsonb,
    'it', '"SWABEX O 70x100x510"'::jsonb,
    'fr', '"SWABEX O 70x100x510"'::jsonb,
    'de', '"SWABEX O 70x100x510"'::jsonb,
    'es', '"SWABEX O 70x100x510"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant cotton swabbing tools with optional protective felt head cover, featuring a strong yet malleable metal handle for safe and precise mould maintenance in glass manufacturing, metal casting, forging, and ceramic forming."'::jsonb,
    'it', '"Scovoli in cotone resistenti al calore con copritesta protettivo in feltro opzionale, dotati di manico in metallo robusto ma flessibile per una manutenzione sicura e precisa degli stampi nella produzione del vetro, colata dei metalli, forgiatura e formatura della ceramica."'::jsonb,
    'fr', '"Écouvillons en coton résistants à la chaleur avec embout de protection en feutre en option, dotés d''un manche en métal robuste mais flexible pour un entretien sûr et précis des moules dans la production du verre, la coulée des métaux, le forgeage et le formage de la céramique."'::jsonb,
    'de', '"Hitzebeständige Baumwollwischer mit optionaler Schutzkappe aus Filz, ausgestattet mit einem robusten, aber flexiblen Metallgriff für eine sichere und präzise Formenpflege in der Glasproduktion, beim Metallguss, beim Schmieden und bei der Keramikformung."'::jsonb,
    'es', '"Escobillas de algodón resistentes al calor con protector de fieltro opcional en la punta, con mango de metal robusto pero flexible para un mantenimiento seguro y preciso de los moldes en la producción de vidrio, la colada de metales, la forja y el conformado de cerámica."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cotton swab with optional head cover and metal handle"'::jsonb,
    'it', '"Scovolo in cotone con feltro opzionale in punta e manico in metallo"'::jsonb,
    'fr', '"Écouvillon en coton avec feutre en option à l''extrémité et manche en métal"'::jsonb,
    'de', '"Baumwollwischer mit optionalem Filz an der Spitze und Metallgriff"'::jsonb,
    'es', '"Escobilla de algodón con fieltro opcional en la punta y mango de metal"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Industrial Swabs"'::jsonb,
    'it', '"Scovoli industriali"'::jsonb,
    'fr', '"Écouvillons industriels"'::jsonb,
    'de', '"Industrieputzwerkzeuge"'::jsonb,
    'es', '"Escobillas industriales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant cotton pads with optional head cover", "Strong but malleable handles designed for safe operation and precise application in hot-end environments. Available with and without ring.", "Multiple head shapes and sizes (incl. custom size)", "Durable construction. Resistant to high heat, abrasion, and repeated industrial use."]'::jsonb,
    'it', '["Scovoli in cotone resistenti al calore con feltro protettivo opzionale", "Manici robusti ma flessibili, progettati per un utilizzo sicuro e un’applicazione precisa nella zona calda. Disponibile con e senza anello.", "Varie forme e dimensioni (incluse misure personalizzate)", "Struttura durevole, resistente alle alte temperature, all’abrasione e all’uso industriale ripetuto"]'::jsonb,
    'fr', '["Écouvillons en coton résistants à la chaleur avec feutre de protection en option", "Manches robustes mais flexibles, conçus pour une utilisation sûre et une application précise en zone chaude. Disponible avec ou sans anneau.", "Diverses formes et dimensions (y compris sur mesure)", "Structure durable, résistante aux hautes températures, à l’abrasion et à un usage industriel répété"]'::jsonb,
    'de', '["Hitzebeständige Baumwollwischer mit optionalem Schutzfilz", "Robuste, aber flexible Griffe, konzipiert für einen sicheren Einsatz und eine präzise Anwendung im Heißbereich. Erhältlich mit und ohne Ring.", "Verschiedene Formen und Größen (einschließlich Sondermaße)", "Langlebige Struktur, beständig gegen hohe Temperaturen, Abrieb und wiederholten industriellen Einsatz"]'::jsonb,
    'es', '["Escobillas de algodón resistentes al calor con fieltro protector opcional", "Mangos robustos pero flexibles, diseñados para un uso seguro y una aplicación precisa en la zona caliente. Disponible con y sin anilla.", "Diversas formas y tamaños (incluidas medidas personalizadas)", "Estructura duradera, resistente a las altas temperaturas, a la abrasión y al uso industrial repetido"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Lubricating blank, neck, and blow moulds in bottle and jar production", "Mould lubrication in non-ferrous metal casting", "Hot forging"]'::jsonb,
    'it', '["Lubrificazione degli stampi nella produzione di bottiglie e vasetti", "Lubrificazione degli stampi nella colata di metalli non ferrosi", "Forgiatura a caldo"]'::jsonb,
    'fr', '["Lubrification des moules dans la production de bouteilles et de pots", "Lubrification des moules dans la coulée de métaux non ferreux", "Forgeage à chaud"]'::jsonb,
    'de', '["Formenschmierung bei der Herstellung von Flaschen und Gläsern", "Formenschmierung beim Guss von Nichteisenmetallen", "Warmschmieden"]'::jsonb,
    'es', '["Lubricación de moldes en la producción de botellas y frascos", "Lubricación de moldes en la colada de metales no férricos", "Forja en caliente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Metal casting", "Forging and pressing", "Ceramic forming"]'::jsonb,
    'it', '["Industria del vetro", "Metallurgia", "Forgiatura e stampaggio", "Ceramica"]'::jsonb,
    'fr', '["Industrie du verre", "Métallurgie", "Forge et estampage", "Céramique"]'::jsonb,
    'de', '["Glasindustrie", "Metallurgie", "Schmieden und Stanzen", "Keramik"]'::jsonb,
    'es', '["Industria del vidrio", "Metalurgia", "Forja y estampado", "Cerámica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["swabbing tools", "lubricating", "cotton swabs", "glass manufacturing"]'::jsonb,
    'it', '["scovoli in cotone", "lubrificazione stampi", "industria del vetro"]'::jsonb,
    'fr', '["écouvillons en coton", "lubrification des moules", "industrie du verre"]'::jsonb,
    'de', '["Baumwollputzwerkzeuge", "Formenschmierung", "Glasindustrie"]'::jsonb,
    'es', '["escobillas de algodón", "lubricación de moldes", "industria del vidrio"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cotton"]'::jsonb,
    'it', '["Cotone"]'::jsonb,
    'fr', '["Coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["Algodón"]'::jsonb
  )
WHERE id = 'a18d1e82-6196-4266-8a67-f93dfaaea43d';

-- thermo-boss
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Thermo Boss"'::jsonb,
    'it', '"Thermo Boss"'::jsonb,
    'fr', '"Thermo Boss"'::jsonb,
    'de', '"Thermo Boss"'::jsonb,
    'es', '"Thermo Boss"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The helmet, with optimized weight, is suitable for use in very high ambient temperatures. It complies with EN 397 and additional requirements for 440 V AC and very high temperatures, and features side Euroslot attachments for mounting earmuff hearing protection."'::jsonb,
    'it', '"Il casco con peso ottimizzato è adatto per l''uso a temperature ambiente molto elevate.Conforme alla norma EN 397 e ai requisiti supplementari per 440 V CA e temperature molto alte, con attacchi Euroslot laterali per il supporto del dispositivo di protezione dell''udito a cuffia"'::jsonb,
    'fr', '"Le casque au poids optimisé convient à une utilisation à des températures ambiantes très élevées. Conforme à la norme EN 397 et aux exigences supplémentaires pour 440 V CA et des températures très élevées, avec des fixations Euroslot latérales pour le support de la protection auditive à coquilles"'::jsonb,
    'de', '"Der gewichtsoptimierte Helm eignet sich für den Einsatz bei sehr hohen Umgebungstemperaturen. Er entspricht der Norm EN 397 sowie den Zusatzanforderungen für 440 V AC und sehr hohe Temperaturen und verfügt über seitliche Euroslot-Halterungen zur Aufnahme von Kapselgehörschützern"'::jsonb,
    'es', '"El casco de peso optimizado es adecuado para su uso a temperaturas ambiente muy elevadas. Conforme a la norma EN 397 y a los requisitos adicionales para 440 V CA y temperaturas muy altas, con fijaciones Euroslot laterales para el soporte del protector auditivo de orejeras"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety helmet suitable for high temperatures"'::jsonb,
    'it', '"Elmetto di sicurezza adatto a elevate temperature"'::jsonb,
    'fr', '"Casque de sécurité adapté aux températures élevées"'::jsonb,
    'de', '"Schutzhelm geeignet für hohe Temperaturen"'::jsonb,
    'es', '"Casco de seguridad adecuado para temperaturas elevadas"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Head protection"'::jsonb,
    'it', '"Protezione della testa"'::jsonb,
    'fr', '"Protection de la tête"'::jsonb,
    'de', '"Kopfschutz"'::jsonb,
    'es', '"Protección de la cabeza"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Helmets"'::jsonb,
    'it', '"Caschi di sicurezza"'::jsonb,
    'fr', '"Casques de sécurité"'::jsonb,
    'de', '"Schutzhelme"'::jsonb,
    'es', '"Cascos de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Lateral Euroslot attachments (30 mm) for securing earmuff hearing protection devices and the Pronamic visor system", "Electrical insulation up to 440 V", "Long visor to protect against splashes and potential hazards"]'::jsonb,
    'it', '["Attacchi Euroslot laterali (30 mm) per il fissaggio di dispositivi di protezione dell''udito a cuffia e del sistema di visiera pronamic", "Isolamento elettrico 440 V", "Visiera lunga per proteggere da schizzi ed eventuali"]'::jsonb,
    'fr', '["Fixations Euroslot latérales (30 mm) pour la fixation de protections auditives à coquilles et du système de visière pronamic", "Isolation électrique 440 V", "Visière longue pour protéger contre les éclaboussures et autres projections"]'::jsonb,
    'de', '["Seitliche Euroslot-Halterungen (30 mm) zur Befestigung von Kapselgehörschützern und dem pronamic-Visiersystem", "Elektrische Isolierung 440 V", "Langes Visier zum Schutz vor Spritzern und sonstigen Partikeln"]'::jsonb,
    'es', '["Fijaciones Euroslot laterales (30 mm) para la sujeción de protectores auditivos de orejeras y del sistema de visor pronamic", "Aislamiento eléctrico 440 V", "Visor largo para proteger contra salpicaduras y posibles proyecciones"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations in low temperatures", "Operations in high-voltage environments", "Head protection at temperatures equal to or exceeding 150°C", "Operations in presence of flames"]'::jsonb,
    'it', '["Operazioni in ambienti ad alta tensione", "Protezione del capo a temperature uguali o superiori a 150°c", "Operazioni in presenza di fiamma"]'::jsonb,
    'fr', '["Opérations en environnements haute tension", "Protection de la tête à des températures égales ou supérieures à 150°C", "Opérations en présence de flamme"]'::jsonb,
    'de', '["Einsätze in Hochspannungsumgebungen", "Kopfschutz bei Temperaturen von 150°C oder mehr", "Einsätze bei Flammeneinwirkung"]'::jsonb,
    'es', '["Operaciones en entornos de alta tensión", "Protección de la cabeza a temperaturas iguales o superiores a 150°C", "Operaciones en presencia de llama"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "Energy", "Forestry", "Logistcs", "Heavy industries"]'::jsonb,
    'it', '["Fonderie", "Industria pesante", "Logistica"]'::jsonb,
    'fr', '["Fonderies", "Industrie lourde", "Logistique"]'::jsonb,
    'de', '["Gießereien", "Schwerindustrie", "Logistik"]'::jsonb,
    'es', '["Fundiciones", "Industria pesada", "Logística"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["helmet"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"52 - 61 cm"'::jsonb,
    'fr', '"52 - 61 cm"'::jsonb,
    'de', '"52 - 61 cm"'::jsonb,
    'es', '"52 - 61 cm"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Polycarbonate (PC)", "Plastic"]'::jsonb,
    'it', '["Policarbonato (PC)", "Plastica"]'::jsonb,
    'fr', '["Polycarbonate (PC)", "Plastique"]'::jsonb,
    'de', '["Polycarbonat (PC)", "Kunststoff"]'::jsonb,
    'es', '["Policarbonato (PC)", "Plástico"]'::jsonb
  ),
  head_comfort_features_locales = COALESCE(head_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Integrated sweatband", "Rain drain around the entire perimeter", "Wide neck support and close-fitting design"]'::jsonb,
    'it', '["Fascia antisudore integrata", "Canalina di scolo per la pioggia su tutto il perimetro", "Ampio supporto della nuca e posizionamento vicino alla testa"]'::jsonb,
    'fr', '["Bandeau antisudation intégré", "Gouttière d''évacuation de l''eau de pluie sur tout le pourtour", "Large soutien de la nuque et positionnement proche de la tête"]'::jsonb,
    'de', '["Integriertes Schweißband", "Umlaufende Regenrinne", "Breite Nackenstütze und kopfnahe Positionierung"]'::jsonb,
    'es', '["Banda antisudor integrada", "Canal de desagüe para la lluvia en todo el perímetro", "Amplio soporte de la nuca y posicionamiento cercano a la cabeza"]'::jsonb
  ),
  head_equipment_locales = COALESCE(head_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Side Euroslot adapters (30 mm) for attaching earmuffs", "Four retaining clips for fitting head torches or goggles", "EN 12492 forked chin strap included"]'::jsonb
  )
WHERE id = '05f43560-fafa-4b13-be93-11abd77c0746';

-- tune-up-insole
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"tune-up insole"'::jsonb,
    'it', '"tune-up insole"'::jsonb,
    'fr', '"tune-up insole"'::jsonb,
    'de', '"tune-up insole"'::jsonb,
    'es', '"tune-up insole"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Antistatic insole for use in safety footwear. Designed to reduce fatigue by increasing comfort and improving ergonomics with optimal arch support. Available with three levels: High, Medium, Low."'::jsonb,
    'it', '"Sottopiede antistatico per utilizzo nelle calzature di sicurezza. Progettato per ridurre l’affaticamento aumentando il comfort e migliorando l’ergonomia grazie al supporto ottimale dell’arco plantare. Disponibile con 3 livelli: Alto, Medio, Basso"'::jsonb,
    'fr', '"Semelle intérieure antistatique pour chaussures de sécurité. Conçue pour réduire la fatigue en augmentant le confort et en améliorant l''ergonomie grâce à un soutien optimal de la voûte plantaire. Disponible en 3 niveaux : Haut, Moyen, Bas"'::jsonb,
    'de', '"Antistatische Einlegesohle für Sicherheitsschuhe. Entwickelt, um durch optimale Unterstützung des Fußgewölbes die Ermüdung zu reduzieren, den Komfort zu erhöhen und die Ergonomie zu verbessern. Erhältlich in 3 Stufen: Hoch, Mittel, Niedrig"'::jsonb,
    'es', '"Plantilla antiestática para calzado de seguridad. Diseñada para reducir la fatiga aumentando el confort y mejorando la ergonomía gracias al soporte óptimo del arco plantar. Disponible en 3 niveles: Alto, Medio, Bajo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Antistatic insole for safety footwear"'::jsonb,
    'it', '"Suoletta antistatica per calzature antinfortunistiche"'::jsonb,
    'fr', '"Semelle intérieure antistatique pour chaussures de sécurité"'::jsonb,
    'de', '"Antistatische Einlegesohle für Sicherheitsschuhe"'::jsonb,
    'es', '"Plantilla antiestática para calzado de seguridad"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety footwear"'::jsonb,
    'it', '"Calzature di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Insoles and accessories"'::jsonb,
    'it', '"Plantari e accessori"'::jsonb,
    'fr', '"Semelles et accessoires"'::jsonb,
    'de', '"Einlegesohlen und Zubehör"'::jsonb,
    'es', '"Plantillas y accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Certified with the corresponding safety shoe (EN ISO 20345)", "Breathable, moisture-absorbing insole", "Usable for ESD-footwear", "Very good cushioning to reduce fatigue"]'::jsonb,
    'it', '["Certificato con la corrispondente calzatura antinfortunistica (EN ISO 20345)", "Sottopiede traspirante e assorbente", "Utilizzabile per calzature ESD", "Ottimo ammortizzamento per ridurre l''affaticamento"]'::jsonb,
    'fr', '["Certifiée avec la chaussure de sécurité correspondante (EN ISO 20345)", "Semelle intérieure respirante et absorbante", "Utilisable pour chaussures ESD", "Excellent amortissement pour réduire la fatigue"]'::jsonb,
    'de', '["Zertifiziert mit dem entsprechenden Sicherheitsschuh (EN ISO 20345)", "Atmungsaktive und saugfähige Einlegesohle", "Verwendbar für ESD-Schuhe", "Hervorragende Dämpfung zur Reduzierung der Ermüdung"]'::jsonb,
    'es', '["Certificada con el calzado de seguridad correspondiente (EN ISO 20345)", "Plantilla transpirable y absorbente", "Utilizable para calzado ESD", "Excelente amortiguación para reducir la fatiga"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Comfort enhancement and fatigue reduction", "Use with certified safety footwear", "ESD-compatible footwear applications"]'::jsonb,
    'it', '["Maggiore comfort e riduzione dell’affaticamento", "Utilizzo con la corrispondente calzatura di sicurezza certificata", "Applicazioni con calzature ESD"]'::jsonb,
    'fr', '["Plus grand confort et réduction de la fatigue", "Utilisation avec la chaussure de sécurité certifiée correspondante", "Applications avec chaussures ESD"]'::jsonb,
    'de', '["Mehr Komfort und weniger Ermüdung", "Verwendung mit dem entsprechenden zertifizierten Sicherheitsschuh", "Anwendungen mit ESD-Schuhen"]'::jsonb,
    'es', '["Mayor confort y reducción de la fatiga", "Uso con el calzado de seguridad certificado correspondiente", "Aplicaciones con calzado ESD"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Utilities", "Construction", "Oil&Gas", "Heavy industry", "Rail", "Ports", "Defense", "Agriculture"]'::jsonb,
    'it', '["Servizi pubblici", "Edilizia", "Petrolio e gas", "Industria pesante", "Ferroviario", "Porti", "Difesa", "Agricoltura"]'::jsonb,
    'fr', '["Services publics", "Construction", "Pétrole et gaz", "Industrie lourde", "Ferroviaire", "Ports", "Défense", "Agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Bauwesen", "Öl und Gas", "Schwerindustrie", "Bahnwesen", "Häfen", "Verteidigung", "Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "Construcción", "Petróleo y gas", "Industria pesada", "Ferroviario", "Puertos", "Defensa", "Agricultura"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["insole", "accessory"]'::jsonb,
    'it', '["plantare", "accessori"]'::jsonb,
    'fr', '["semelle intérieure", "accessoires"]'::jsonb,
    'de', '["Einlegesohle", "Zubehör"]'::jsonb,
    'es', '["plantilla", "accesorios"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"35 - 52"'::jsonb,
    'it', '"35 - 52"'::jsonb,
    'fr', '"35 - 52"'::jsonb,
    'de', '"35 - 52"'::jsonb,
    'es', '"35 - 52"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["PU"]'::jsonb,
    'it', '["PU"]'::jsonb,
    'fr', '["PU"]'::jsonb,
    'de', '["PU"]'::jsonb,
    'es', '["PU"]'::jsonb
  )
WHERE id = 'ca6a4f05-e917-4418-8e26-d0d5b4dc8f0f';

-- u-cap-sport
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"u-cap sport"'::jsonb,
    'it', '"u-cap sport"'::jsonb,
    'fr', '"u-cap sport"'::jsonb,
    'de', '"u-cap sport"'::jsonb,
    'es', '"u-cap sport"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Bump cap with plastic shell for protection against grazes and bumps. Integrated shock-absorbing elements and sweat band. Customisable with logo."'::jsonb,
    'it', '"Berretto antiurto con calotta in plastica per protezione da graffi e urti. Elementi ammortizzanti integrati e fascia antisudore. Personalizzabile con logo."'::jsonb,
    'fr', '"Casquette anti-choc avec calotte en plastique pour protéger contre les rayures et les chocs. Éléments amortissants intégrés et bandeau antisudation. Personnalisable avec logo."'::jsonb,
    'de', '"Stoßschutzkappe mit Kunststoffschale zum Schutz vor Kratzern und Stößen. Integrierte Dämpfungselemente und Schweißband. Mit Logo personalisierbar."'::jsonb,
    'es', '"Gorra antigolpes con casquete de plástico para protección contra arañazos y golpes. Elementos amortiguadores integrados y banda antisudor. Personalizable con logotipo."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Sporty bumper cap"'::jsonb,
    'it', '"Berretto antiurto sportivo"'::jsonb,
    'fr', '"Casquette anti-choc sportive"'::jsonb,
    'de', '"Sportliche Stoßschutzkappe"'::jsonb,
    'es', '"Gorra antigolpes deportiva"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Head protection"'::jsonb,
    'it', '"Protezione della testa"'::jsonb,
    'fr', '"Protection de la tête"'::jsonb,
    'de', '"Kopfschutz"'::jsonb,
    'es', '"Protección de la cabeza"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Bump Cap"'::jsonb,
    'it', '"Berretti antiurto"'::jsonb,
    'fr', '"Casquettes anti-heurt"'::jsonb,
    'de', '"Anstoßkappen"'::jsonb,
    'es', '"Gorras antigolpes"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Innovative hard “armadillo” shell with honeycomb structure and shock-absorbing elements", "Cold resistance up to -30°C", "Shortened visor for a wider field of view", "Available with mesh interior for high comfort"]'::jsonb,
    'it', '["Innovativa calotta rigida \"armadillo\" con struttura a nido d''ape ed elementi ammortizzanti", "Resistenza al freddo fino a -30°C", "Visiera accorciata per un campo visivo più ampio", "Disponibile con interno in rete per il massimo comfort"]'::jsonb,
    'fr', '["Calotte rigide innovante \"armadillo\" à structure en nid d''abeille et éléments amortissants", "Résistance au froid jusqu''à -30°C", "Visière raccourcie pour un champ de vision plus large", "Disponible avec intérieur en filet pour un confort maximal"]'::jsonb,
    'de', '["Innovative starre \"Armadillo\"-Schale mit Wabenstruktur und Dämpfungselementen", "Kältebeständigkeit bis -30°C", "Verkürztes Visier für ein größeres Sichtfeld", "Erhältlich mit Netzinnenfutter für maximalen Komfort"]'::jsonb,
    'es', '["Innovador casquete rígido \"armadillo\" con estructura de panal y elementos amortiguadores", "Resistencia al frío hasta -30°C", "Visera acortada para un campo de visión más amplio", "Disponible con interior de malla para el máximo confort"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Activities in work environments without falling object risks", "Prolonged use in hot or cold environments"]'::jsonb,
    'it', '["Operazioni in ambienti di lavoro senza rischi di caduta oggetti", "Utilizzo prolungato in ambienti caldi o freddi"]'::jsonb,
    'fr', '["Opérations dans des environnements de travail sans risque de chute d''objets", "Utilisation prolongée dans des environnements chauds ou froids"]'::jsonb,
    'de', '["Einsätze in Arbeitsumgebungen ohne Risiko herabfallender Gegenstände", "Längerer Einsatz in warmen oder kalten Umgebungen"]'::jsonb,
    'es', '["Operaciones en entornos de trabajo sin riesgo de caída de objetos", "Uso prolongado en entornos cálidos o fríos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Storage and logistics", "Construction"]'::jsonb,
    'it', '["Magazzinaggio e logistica", "Edilizia"]'::jsonb,
    'fr', '["Entreposage et logistique", "Construction"]'::jsonb,
    'de', '["Lagerhaltung und Logistik", "Bauwesen"]'::jsonb,
    'es', '["Almacenamiento y logística", "Construcción"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["bump cap"]'::jsonb,
    'it', '["berretto antiurto"]'::jsonb,
    'fr', '["casquette anti-heurt"]'::jsonb,
    'de', '["Anstoßkappe"]'::jsonb,
    'es', '["gorra antigolpes"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"52–54 / 55–59 / 60–63 cm"'::jsonb,
    'it', '"52–54 / 55–59 / 60–63 cm"'::jsonb,
    'fr', '"52–54 / 55–59 / 60–63 cm"'::jsonb,
    'de', '"52–54 / 55–59 / 60–63 cm"'::jsonb,
    'es', '"52–54 / 55–59 / 60–63 cm"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Shell: ABS", "Lining: Cotton/Mesh"]'::jsonb,
    'it', '["Calotta: ABS", "Fodera: Tessuto/retata"]'::jsonb,
    'fr', '["Calotte : ABS", "Doublure : Tissu/filet"]'::jsonb,
    'de', '["Kalotte: ABS", "Futter: Stoff/Netz"]'::jsonb,
    'es', '["Casquete: ABS", "Forro: Tejido/malla"]'::jsonb
  ),
  head_tech_specs_locales = COALESCE(head_tech_specs_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"colours": [], "brim_length": "short", "form_factor": "bump_cap", "additional_features": []}'::jsonb,
    'it', '{"colours": null, "brim_length": "Corto", "form_factor": "berretto antiurto", "additional_features": []}'::jsonb,
    'fr', '{"colours": null, "brim_length": "Court", "form_factor": "casquette anti-heurt", "additional_features": []}'::jsonb,
    'de', '{"colours": null, "brim_length": "Kurz", "form_factor": "Anstoßkappe", "additional_features": []}'::jsonb,
    'es', '{"colours": null, "brim_length": "Corto", "form_factor": "gorra antigolpes", "additional_features": []}'::jsonb
  )
WHERE id = 'd6b02876-2420-445d-a14a-1d1822d3357a';

-- unidur-sleeve-tl
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"unidur sleeve TL"'::jsonb,
    'it', '"unidur sleeve TL"'::jsonb,
    'fr', '"unidur sleeve TL"'::jsonb,
    'de', '"unidur sleeve TL"'::jsonb,
    'es', '"unidur sleeve TL"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant sleeve (Level C) with thumb loop. HPPE, fibreglass and polyamide outer layer for durable yet flexible forearm protection. Velcro closure ensures perfect fit; thumb loop for extra grip"'::jsonb,
    'it', '"Manichetta antitaglio (livello C) con passante per pollice. HPPE, fibre di vetro e poliammide per elevata resistenza e flessibilità. Chiusura in velcro per vestibilità perfetta; passante per maggiore presa"'::jsonb,
    'fr', '"Manchette anticoupure (niveau C) avec passe-pouce. HPPE, fibres de verre et polyamide pour une résistance et une flexibilité élevées. Fermeture velcro pour un ajustement parfait ; passe-pouce pour une meilleure prise"'::jsonb,
    'de', '"Schnittschutzstulpe (Stufe C) mit Daumenschlaufe. HPPE, Glasfasern und Polyamid für hohe Festigkeit und Flexibilität. Klettverschluss für perfekten Sitz; Daumenschlaufe für besseren Halt"'::jsonb,
    'es', '"Manguito anticorte (nivel C) con presilla para el pulgar. HPPE, fibra de vidrio y poliamida para una elevada resistencia y flexibilidad. Cierre de velcro para un ajuste perfecto; presilla para mayor sujeción"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"This cut level C sleeve for arm protection"'::jsonb,
    'it', '"Manichetta antitaglio livello C per protezione avambraccio"'::jsonb,
    'fr', '"Manchette anticoupure niveau C pour la protection de l''avant-bras"'::jsonb,
    'de', '"Schnittschutzstulpe Stufe C für Unterarmschutz"'::jsonb,
    'es', '"Manguito anticorte nivel C para protección del antebrazo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Arm protection"'::jsonb,
    'it', '"Protezione delle braccia"'::jsonb,
    'fr', '"Protection des bras"'::jsonb,
    'de', '"Armschutz"'::jsonb,
    'es', '"Protección de los brazos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut resistant sleeves"'::jsonb,
    'it', '"Maniche resistenti al taglio"'::jsonb,
    'fr', '"Manches résistantes aux coupures"'::jsonb,
    'de', '"Schnittfeste Ärmel"'::jsonb,
    'es', '"Mangas resistentes al corte"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["High cut resistance (Level C)", "Flexible, thin forearm protection", "Velcro closure and thumb loop for secure fit"]'::jsonb,
    'it', '["Alta resistenza al taglio (Livello C)", "Protezione flessibile e sottile per avambraccio", "Chiusura in velcro e passante per pollice per vestibilità sicura"]'::jsonb,
    'fr', '["Haute résistance à la coupure (niveau C)", "Protection flexible et fine pour l''avant-bras", "Fermeture velcro et passe-pouce pour un ajustement sécurisé"]'::jsonb,
    'de', '["Hohe Schnittfestigkeit (Stufe C)", "Flexibler und dünner Unterarmschutz", "Klettverschluss und Daumenschlaufe für sicheren Sitz"]'::jsonb,
    'es', '["Alta resistencia al corte (nivel C)", "Protección flexible y fina para el antebrazo", "Cierre de velcro y presilla para el pulgar para un ajuste seguro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling sharp sheet metal; stamping, bending, cutting", "Cutting, transporting or installing glass panes and bottles", "Sawing, planing and working with sharp tools", "Working with sharp components, stamped parts or metal edges"]'::jsonb,
    'it', '["Manipolazione di lamiere affilate; stampaggio, piegatura, taglio", "Taglio, trasporto o installazione di lastre di vetro e bottiglie", "Segatura, piallatura e lavoro con utensili affilati", "Lavoro con componenti affilati, parti stampate o bordi metallici"]'::jsonb,
    'fr', '["Manipulation de tôles tranchantes ; emboutissage, pliage, découpe", "Découpe, transport ou installation de plaques de verre et de bouteilles", "Sciage, rabotage et travail avec des outils tranchants", "Travail avec des composants tranchants, des pièces embouties ou des bords métalliques"]'::jsonb,
    'de', '["Handhabung scharfkantiger Bleche; Stanzen, Biegen, Schneiden", "Schneiden, Transportieren oder Einbauen von Glasplatten und Flaschen", "Sägen, Hobeln und Arbeiten mit scharfen Werkzeugen", "Arbeiten mit scharfkantigen Bauteilen, Stanzteilen oder Metallkanten"]'::jsonb,
    'es', '["Manipulación de chapas afiladas; estampación, plegado, corte", "Corte, transporte o instalación de placas de vidrio y botellas", "Aserrado, cepillado y trabajo con herramientas afiladas", "Trabajo con componentes afilados, piezas estampadas o bordes metálicos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metalworking", "Glass manufacturing", "Construction", "Carpentry", "Automotive", "Aerospace", "Recycling", "Waste management"]'::jsonb,
    'it', '["Lavorazione metalli", "Produzione vetro", "Edilizia", "Carpenteria", "Automotive", "Aerospaziale", "Riciclaggio", "Gestione rifiuti"]'::jsonb,
    'fr', '["Travail des métaux", "Production de verre", "Construction", "Charpente métallique", "Automobile", "Aérospatiale", "Recyclage", "Gestion des déchets"]'::jsonb,
    'de', '["Metallverarbeitung", "Glasproduktion", "Bauwesen", "Stahlbau", "Automobilindustrie", "Luft- und Raumfahrt", "Recycling", "Abfallmanagement"]'::jsonb,
    'es', '["Trabajo de metales", "Producción de vidrio", "Construcción", "Carpintería metálica", "Automoción", "Aeroespacial", "Reciclaje", "Gestión de residuos"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["anti-cut sleeve", "arm protection"]'::jsonb,
    'it', '["manichetta antitaglio", "protezione avambraccio"]'::jsonb,
    'fr', '["manchette anticoupure", "protection de l''avant-bras"]'::jsonb,
    'de', '["Schnittschutzstulpe", "Unterarmschutz"]'::jsonb,
    'es', '["manguito anticorte", "protección del antebrazo"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"M / L"'::jsonb,
    'it', '"M / L"'::jsonb,
    'fr', '"M / L"'::jsonb,
    'de', '"M / L"'::jsonb,
    'es', '"M / L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Fibreglass", "High-Performance Polyethylene (HPPE)", "Kevlar®", "Polyamide (PA)"]'::jsonb,
    'it', '["Fibra di vetro", "Polietilene ad alte prestazioni (HPPE)", "Kevlar®", "Poliammide (PA)"]'::jsonb,
    'fr', '["Fibre de verre", "Polyéthylène haute performance (HPPE)", "Kevlar®", "Polyamide (PA)"]'::jsonb,
    'de', '["Glasfaser", "Hochleistungspolyethylen (HPPE)", "Kevlar®", "Polyamid (PA)"]'::jsonb,
    'es', '["Fibra de vidrio", "Polietileno de alto rendimiento (HPPE)", "Kevlar®", "Poliamida (PA)"]'::jsonb
  )
WHERE id = 'a63186a8-745c-44f5-ab3d-be8190f81658';

COMMIT;
