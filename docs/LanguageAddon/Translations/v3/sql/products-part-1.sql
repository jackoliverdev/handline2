-- Products locale merge — part 1 of 5
-- Source: Translations Spreadsheet_v3.xlsx - products-locales.csv
-- Data-only UPDATE. No ALTER TABLE. No published-flag changes.
-- Run in the Supabase SQL editor. One file at a time.
-- Merges en/it/fr/de/es into existing JSONB locale objects.
-- Skipped: blank cells, "" placeholders, empty arrays, empty objects, and lone "." cells.
-- Warning: admin editors still save only en/it. Saving there will wipe fr/de/es.

BEGIN;

-- products jk10
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"JK10"'::jsonb,
    'it', '"JK10"'::jsonb,
    'fr', '"JK10"'::jsonb,
    'de', '"JK10"'::jsonb,
    'es', '"JK10"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-quality split cowhide leather welding jacket made from 1.3 mm thick leather, providing enhanced durability and protection, including against molten metal splashes."'::jsonb,
    'it', '"Giacca da saldatore in pelle crosta di bovino di \nalta qualità con spessore 1.3mm per una \nmaggiore resistenza e protezione anche dagli \nschizzi di metallo fuso"'::jsonb,
    'fr', '"Veste de soudeur en croûte de cuir bovin de haute qualité, avec une épaisseur de 1,3 mm pour une résistance et une protection accrues, y compris contre les projections de métal en fusion"'::jsonb,
    'de', '"Schweißerjacke aus hochwertigem Rindspaltleder mit 1,3 mm Stärke für erhöhte Festigkeit und Schutz, auch vor Spritzern von geschmolzenem Metall"'::jsonb,
    'es', '"Chaqueta de soldador en cuero dividido de bovino de alta calidad con un espesor de 1,3 mm para mayor resistencia y protección, incluso frente a las salpicaduras de metal fundido"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Split leather welding jacket"'::jsonb,
    'it', '"Giacca da saldatore in pelle"'::jsonb,
    'fr', '"Veste de soudeur en cuir"'::jsonb,
    'de', '"Schweißerjacke aus Leder"'::jsonb,
    'es', '"Chaqueta de soldador de cuero"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welding clothing"'::jsonb,
    'it', '"Giacche da saldatore"'::jsonb,
    'fr', '"Vestes de soudeur"'::jsonb,
    'de', '"Schweißerjacken"'::jsonb,
    'es', '"Chaquetas de soldador"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["High-quality, thick leather for enhanced protection", "Double stitching and overlapping seams for improved durability and fit", "Hook-and-loop (Velcro) and snap button closures", "Grain leather inner collar for enhanced comfort"]'::jsonb,
    'it', '["Pellame di alta qualità e spessore per  maggiore protezione", "Doppie cuciture e giunture sormontate  per una maggiore vestibilità", "Chiusure con velcro e bottoni", "Collo interno in pelle fiore per maggiore  comfort"]'::jsonb,
    'fr', '["Cuir de haute qualité et d''épaisseur adaptée pour une protection accrue", "Doubles coutures et jonctions superposées pour un meilleur ajustement", "Fermetures à velcro et boutons", "Col intérieur en cuir pleine fleur pour plus de confort"]'::jsonb,
    'de', '["Hochwertiges und dickes Leder für mehr Schutz", "Doppelte Nähte und überlappende Verbindungen für eine bessere Passform", "Verschlüsse mit Klettverschluss und Knöpfen", "Innenkragen aus Vollnarbenleder für mehr Komfort"]'::jsonb,
    'es', '["Cuero de alta calidad y grosor para una mayor protección", "Dobles costuras y uniones solapadas para un mejor ajuste", "Cierres con velcro y botones", "Cuello interior en piel flor para mayor confort"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal fabrication welding operations", "Thermal metal cutting", "Grinding operations", "Structural steel fabrication", "Welding maintenance and repair work"]'::jsonb,
    'it', '["Attività di saldatura in metallurgia", "Taglio termico dei metalli", "Operazioni di molatura", "Lavorazioni di carpenteria metallica", "Manutenzione mediante saldatura"]'::jsonb,
    'fr', '["Activités de soudage en métallurgie", "Découpe thermique des métaux", "Opérations de meulage", "Travaux de charpente métallique", "Maintenance par soudage"]'::jsonb,
    'de', '["Schweißarbeiten in der Metallurgie", "Thermisches Schneiden von Metallen", "Schleifarbeiten", "Metallbauarbeiten", "Wartung durch Schweißen"]'::jsonb,
    'es', '["Actividades de soldadura en metalurgia", "Corte térmico de metales", "Operaciones de esmerilado", "Trabajos de carpintería metálica", "Mantenimiento mediante soldadura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal", "Steel manufacturing"]'::jsonb,
    'it', '["Metallurgia", "Industria dell''Acciaio"]'::jsonb,
    'fr', '["Métallurgie", "Industrie sidérurgique"]'::jsonb,
    'de', '["Metallurgie", "Stahlindustrie"]'::jsonb,
    'es', '["Metalurgia", "Industria del acero"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding", "Leather jacket"]'::jsonb,
    'it', '["Giacca in pelle", "Saldatura"]'::jsonb,
    'fr', '["Veste en cuir", "Soudage"]'::jsonb,
    'de', '["Lederjacke", "Schweißen"]'::jsonb,
    'es', '["Chaqueta de cuero", "Soldadura"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather"]'::jsonb,
    'it', '["Pelle"]'::jsonb,
    'fr', '["Cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["Cuero"]'::jsonb
  ),
  clothing_comfort_features_locales = COALESCE(clothing_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Collo interno in pelle fiore per maggiore  comfort"]'::jsonb,
    'fr', '["Col intérieur en cuir pleine fleur pour plus de confort"]'::jsonb,
    'de', '["Innenkragen aus Vollnarbenleder für mehr Komfort"]'::jsonb,
    'es', '["Cuello interior en piel flor para mayor confort"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Straight", "size_range": ""}'::jsonb,
    'it', '{"fit": "Standard", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Standard", "size_range": ""}'::jsonb,
    'de', '{"fit": "Standard", "size_range": ""}'::jsonb,
    'es', '{"fit": "Estándar", "size_range": ""}'::jsonb
  )
WHERE id = '91ee9e5f-891b-4489-99ab-a3774a20c3ca';


-- products suxxeed-construction-trousers
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed construction Trousers"'::jsonb,
    'it', '"suXXeed construction PANTALONI"'::jsonb,
    'fr', '"suXXeed construction PANTALONI"'::jsonb,
    'de', '"suXXeed construction PANTALONI"'::jsonb,
    'es', '"suXXeed construction PANTALONI"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility work trousers that ensure excellent freedom of movement."'::jsonb,
    'it', '"Pantaloni da lavoro ad alta visibilità che garantisce ottima libertà nei movimenti."'::jsonb,
    'fr', '"Pantalon de travail haute visibilité garantissant une excellente liberté de mouvement."'::jsonb,
    'de', '"Warnschutz-Arbeitshose, die eine hervorragende Bewegungsfreiheit gewährleistet."'::jsonb,
    'es', '"Pantalón de trabajo de alta visibilidad que garantiza una excelente libertad de movimiento."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility work trousers"'::jsonb,
    'it', '"Pantaloni da lavoro ad alta visibilità"'::jsonb,
    'fr', '"Pantalon de travail haute visibilité"'::jsonb,
    'de', '"Warnschutz-Arbeitshose"'::jsonb,
    'es', '"Pantalón de trabajo de alta visibilidad"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hi-Vis Trousers"'::jsonb,
    'it', '"Giacca alta visibilità"'::jsonb,
    'fr', '"Veste haute visibilité"'::jsonb,
    'de', '"Warnschutzjacke"'::jsonb,
    'es', '"Chaqueta de alta visibilidad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ensures excellent visibility thanks to reflective components", "Provides UV protection", "Certified in accordance with OEKO-TEX® Standard 100", "Elastic with snap button", "Gusset for greater freedom of movement", "Left and right side pockets with flap and snap-button closure, plus a pen holder on the chest"]'::jsonb,
    'it', '["Garantisce ottima visibilità, con componenti reflex", "Garantisce protezione uv", "Certificazione secondo OEKO-TEX® Standard 100", "Elastico con bottone automatico", "Gherone per una maggiore libertà di movimento", "A sinistra e a destra una tasca laterale con patta e chiusura con bottoni a pressione e sul petto portapenne"]'::jsonb,
    'fr', '["Garantit une excellente visibilité, avec des éléments réfléchissants", "Garantit une protection UV", "Certification selon OEKO-TEX® Standard 100", "Élastique avec bouton-pression", "Gousset pour une plus grande liberté de mouvement", "À gauche et à droite, une poche latérale avec rabat et fermeture par boutons-pression, ainsi qu''une poche porte-stylo sur la poitrine"]'::jsonb,
    'de', '["Gewährleistet ausgezeichnete Sichtbarkeit dank reflektierender Elemente", "Gewährleistet UV-Schutz", "Zertifizierung nach OEKO-TEX® Standard 100", "Gummizug mit Druckknopf", "Zwickel für mehr Bewegungsfreiheit", "Links und rechts eine Seitentasche mit Klappe und Druckknopfverschluss sowie eine Stifttasche auf der Brust"]'::jsonb,
    'es', '["Garantiza una excelente visibilidad, con componentes reflectantes", "Garantiza protección UV", "Certificación según OEKO-TEX® Standard 100", "Elástico con botón automático", "Cuña para una mayor libertad de movimiento", "A la izquierda y a la derecha, un bolsillo lateral con solapa y cierre de botones a presión, y en el pecho un bolsillo portabolígrafos"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Road works", "Work in low-visibility conditions"]'::jsonb,
    'it', '["Lavori stradali", "Lavori con scarsa visibilità"]'::jsonb,
    'fr', '["Travaux routiers", "Travaux en faible visibilité"]'::jsonb,
    'de', '["Straßenarbeiten", "Arbeiten bei schlechter Sicht"]'::jsonb,
    'es', '["Trabajos viales", "Trabajos con baja visibilidad"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Public services", "roadside assistance", "construction sites"]'::jsonb,
    'it', '["Servizi pubblici", "Assistenza stradale", "Cantieri"]'::jsonb,
    'fr', '["Services publics", "Assistance routière", "Chantiers"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Straßenverkehrshilfe", "Baustellen"]'::jsonb,
    'es', '["Servicios públicos", "Asistencia en carretera", "Obras"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work jacket"]'::jsonb,
    'it', '["Giacca da lavoro"]'::jsonb,
    'fr', '["Veste de travail"]'::jsonb,
    'de', '["Arbeitsjacke"]'::jsonb,
    'es', '["Chaqueta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["50% polyester, 50% cotton"]'::jsonb,
    'it', '["50% poliestere, 50% cotone"]'::jsonb,
    'fr', '["50 % polyester, 50 % coton"]'::jsonb,
    'de', '["50 % Polyester, 50 % Baumwolle"]'::jsonb,
    'es', '["50 % poliéster, 50 % algodón"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN ISO 13688: Yes"]'::jsonb,
    'it', '["EN ISO 13688: Yes"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui"]'::jsonb,
    'de', '["EN ISO 13688: Ja"]'::jsonb,
    'es', '["EN ISO 13688: Sí"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb
  )
WHERE id = 'a041d20e-730d-4e95-9022-8c3841e37b6b';


-- products 06-p212-36-350
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"06 P212 36-350°"'::jsonb,
    'it', '"06 P212 36-350°"'::jsonb,
    'fr', '"06 P212 36-350°"'::jsonb,
    'de', '"06 P212 36-350°"'::jsonb,
    'es', '"06 P212 36-350°"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"ProGloves® 350 °C in 212 g continuous‑yarn cotton. Double‑layer construction for superior comfort and thermal protection."'::jsonb,
    'it', '"\"ProGloves® 350°C in Cotone 212g.\nGuanto anticalore in doppio strato di cotone 100% in filo continuo da 212 g.\nGuanto ad elevato comfort con elevata protezione termica.\""'::jsonb,
    'fr', '"\"ProGloves® 350°C en coton 212g.\nGant anti-chaleur à double couche de coton 100 % en fil continu de 212 g.\nGant à confort élevé avec une protection thermique élevée.\""'::jsonb,
    'de', '"\"ProGloves® 350°C aus Baumwolle 212g.\nHitzeschutzhandschuh aus doppellagiger 100 % Baumwolle mit durchgehendem Faden, 212 g.\nHandschuh mit hohem Komfort und hohem Hitzeschutz.\""'::jsonb,
    'es', '"\"ProGloves® 350°C en algodón 212g.\nGuante resistente al calor de doble capa de algodón 100 % de hilo continuo de 212 g.\nGuante de alto confort con elevada protección térmica.\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double glove with long cuff, designed for high dexterity in operations up to 350 °C"'::jsonb,
    'it', '"Doppio guanto anticalore con polso lungo ad elevata destrezza per operazioni fino a 350C"'::jsonb,
    'fr', '"Gant anti-chaleur double couche avec poignet long et grande dextérité pour des opérations jusqu''à 350 °C"'::jsonb,
    'de', '"Doppellagiger Hitzeschutzhandschuh mit langer Stulpe und hoher Fingerfertigkeit für Arbeiten bis 350 °C"'::jsonb,
    'es', '"Guante doble resistente al calor con puño largo y alta destreza para operaciones de hasta 350 °C"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Seamless continuous-yarn", "Ergonomic design for prolonged use", "Certified for contact up to 350 °C", "Weight: 212 g"]'::jsonb,
    'it', '["Filo continuo, senza cuciture", "Design ergonomico per uso prolungato", "Certificato per contatto da 350C", "Peso 212 g"]'::jsonb,
    'fr', '["Fil continu, sans couture", "Design ergonomique pour un usage prolongé", "Certifié pour un contact à 350 °C", "Poids 212 g"]'::jsonb,
    'de', '["Durchgehender Faden, nahtlos", "Ergonomisches Design für den Dauereinsatz", "Zertifiziert für Kontakt bei 350 °C", "Gewicht 212 g"]'::jsonb,
    'es', '["Hilo continuo, sin costuras", "Diseño ergonómico para un uso prolongado", "Certificado para contacto a 350 °C", "Peso 212 g"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling in plastic & glass molding processes up to 350 °C", "Industrial-oven work & thermal-resistance testing", "Extended forearm exposure operations (furnaces & brazing)"]'::jsonb,
    'it', '["Manipolazione in processi di stampaggio plastico e del vetro fino a 350 °C", "Operazioni con avambraccio esposto – forni e brasatura", "Prove di resistenza termica"]'::jsonb,
    'fr', '["Manipulation dans les procédés de moulage du plastique et du verre jusqu''à 350 °C", "Opérations avec avant-bras exposé – fours et brasage", "Essais de résistance thermique"]'::jsonb,
    'de', '["Handhabung bei Kunststoff- und Glasformprozessen bis 350 °C", "Arbeiten mit freiliegendem Unterarm – Öfen und Hartlöten", "Wärmebeständigkeitsprüfungen"]'::jsonb,
    'es', '["Manipulación en procesos de moldeo de plástico y vidrio de hasta 350 °C", "Operaciones con antebrazo expuesto: hornos y soldadura fuerte", "Ensayos de resistencia térmica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Hot-glass & plastic molding", "R&D"]'::jsonb,
    'it', '["Vetrerie", "Stamperie a caldo", "Industria plastica", "Ricerca e sviluppo termico"]'::jsonb,
    'fr', '["Verreries", "Ateliers d''estampage à chaud", "Industrie plastique", "Recherche et développement thermique"]'::jsonb,
    'de', '["Glashütten", "Warmumformbetriebe", "Kunststoffindustrie", "Thermische Forschung und Entwicklung"]'::jsonb,
    'es', '["Vidrierías", "Talleres de estampado en caliente", "Industria del plástico", "Investigación y desarrollo térmico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant glove", "350 °C", "cotton", "high-temperature", "cut protection", "seamless continuous-yarn"]'::jsonb,
    'it', '["Guanto anticalore", "350C", "cotone", "elevate temperature", "protezione taglio", "filo continuo", "senza cuciture"]'::jsonb,
    'fr', '["Gant anti-chaleur", "350 °C", "coton", "températures élevées", "protection contre les coupures", "fil continu", "sans couture"]'::jsonb,
    'de', '["Hitzeschutzhandschuh", "350 °C", "Baumwolle", "hohe Temperaturen", "Schnittschutz", "Endlosfaden", "nahtlos"]'::jsonb,
    'es', '["Guante resistente al calor", "350 °C", "algodón", "temperaturas elevadas", "protección contra cortes", "hilo continuo", "sin costuras"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '574319b2-d5b3-4808-83be-0df47c19e103';


-- products hl-1000
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"HL 1000"'::jsonb,
    'it', '"HL 1000"'::jsonb,
    'fr', '"HL 1000"'::jsonb,
    'de', '"HL 1000"'::jsonb,
    'es', '"HL 1000"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Three‑finger heat‑resistant glove of multilayer silica‑ceramic fabric with double felts, Nomex and silica pads. Aluminum‑reflective. CE Category III PPE with high protection against cut & puncture plus thermal protection up to 1,000 °C."'::jsonb,
    'it', '"Guanto anticalore a tre dita in tessuto di fibra di silice e ceramica multistrato con doppio feltro, Nomex e materassino silice. Riflettente alluminizzato. Dispositivo di Categoria CE III con elevata resistenza al taglio e alla perforazione e protezione fino a 1,000°C."'::jsonb,
    'fr', '"Gant anti-chaleur à trois doigts en tissu de fibre de silice et céramique multicouche avec double feutre, Nomex et matelas de silice. Réfléchissant aluminisé. Équipement de catégorie CE III avec haute résistance à la coupure et à la perforation, offrant une protection jusqu''à 1 000 °C."'::jsonb,
    'de', '"Dreifinger-Hitzeschutzhandschuh aus mehrlagigem Silica- und Keramikfasergewebe mit doppeltem Filz, Nomex und Silica-Matte. Aluminisiert reflektierend. PSA der Kategorie III (CE) mit hoher Schnitt- und Durchstichfestigkeit und Schutz bis 1.000 °C."'::jsonb,
    'es', '"Guante resistente al calor de tres dedos en tejido de fibra de sílice y cerámica multicapa con doble fieltro, Nomex y colchoneta de sílice. Reflectante aluminizado. Equipo de protección de categoría CE III con alta resistencia al corte y a la perforación y protección de hasta 1.000 °C."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Three‑finger heat‑resistant glove in multilayer silica‑ceramic fabric. Protection up to 1000 °C."'::jsonb,
    'it', '"Guanto anticalore a tre dita in tessuto silice e ceramica, multistrato. Protezione fino a 1,000C."'::jsonb,
    'fr', '"Gant anti-chaleur à trois doigts en tissu silice et céramique, multicouche. Protection jusqu''à 1 000 °C."'::jsonb,
    'de', '"Dreifinger-Hitzeschutzhandschuh aus mehrlagigem Silica- und Keramikgewebe. Schutz bis 1.000 °C."'::jsonb,
    'es', '"Guante resistente al calor de tres dedos en tejido de sílice y cerámica, multicapa. Protección de hasta 1.000 °C."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["CE Category III personal protection equipment", "Certified for extremely high temperatures (> 500°C), protects up to 1000°C", "Excellent mechanical strength", "Protection against molten‑metal splashes for hand and forearm"]'::jsonb,
    'it', '["Dispositivo di protezione individuale di Categoria III", "Certificato per temperature elevatissime (> 500°C), offre protezione fino a 1,000°C", "Eccellente resistenza meccanica", "Protezione spruzzi metallo fuso per mano e avanbraccio"]'::jsonb,
    'fr', '["Équipement de protection individuelle de catégorie III", "Certifié pour des températures très élevées (> 500 °C), offre une protection jusqu''à 1 000 °C", "Excellente résistance mécanique", "Protection contre les projections de métal en fusion pour la main et l''avant-bras"]'::jsonb,
    'de', '["Persönliche Schutzausrüstung der Kategorie III", "Zertifiziert für sehr hohe Temperaturen (> 500 °C), bietet Schutz bis 1.000 °C", "Ausgezeichnete mechanische Festigkeit", "Schutz vor Spritzern von geschmolzenem Metall für Hand und Unterarm"]'::jsonb,
    'es', '["Equipo de protección individual de categoría III", "Certificado para temperaturas muy elevadas (> 500 °C), ofrece protección de hasta 1.000 °C", "Excelente resistencia mecánica", "Protección contra salpicaduras de metal fundido para la mano y el antebrazo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling of incandescent parts", "Extreme temperature applications", "Metallurgical processes"]'::jsonb,
    'it', '["Manipolazione di pezzi incandescenti", "Applicazioni in ambienti a temperature estreme (es: fonderie)", "Processi metallurgici"]'::jsonb,
    'fr', '["Manipulation de pièces incandescentes", "Applications dans des environnements à températures extrêmes (ex. : fonderies)", "Procédés métallurgiques"]'::jsonb,
    'de', '["Handhabung glühender Werkstücke", "Anwendungen in Umgebungen mit extremen Temperaturen (z. B. Gießereien)", "Metallurgische Prozesse"]'::jsonb,
    'es', '["Manipulación de piezas incandescentes", "Aplicaciones en entornos con temperaturas extremas (p. ej.: fundiciones)", "Procesos metalúrgicos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metallurgy", "Glass industry", "Aerospace"]'::jsonb,
    'it', '["Metallurgia", "Industria del vetro", "Aerospace"]'::jsonb,
    'fr', '["Métallurgie", "Industrie du verre", "Aérospatiale"]'::jsonb,
    'de', '["Metallurgie", "Glasindustrie", "Luft- und Raumfahrt"]'::jsonb,
    'es', '["Metalurgia", "Industria del vidrio", "Aeroespacial"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat‑resistant glove", "extremely high temperatures", "800°C", "1000°C"]'::jsonb,
    'it', '["Guanto anticalore", "elevatissime temperature", "800C", "1000C"]'::jsonb,
    'fr', '["Gant anti-chaleur", "températures très élevées", "800 °C", "1000 °C"]'::jsonb,
    'de', '["Hitzeschutzhandschuh", "sehr hohe Temperaturen", "800 °C", "1000 °C"]'::jsonb,
    'es', '["Guante resistente al calor", "temperaturas muy elevadas", "800 °C", "1000 °C"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["silica-ceramic", "Nomex", "silica"]'::jsonb,
    'it', '["silice-ceramica", "Nomex", "silice"]'::jsonb,
    'fr', '["silice-céramique", "Nomex", "silice"]'::jsonb,
    'de', '["Silika-Keramik", "Nomex", "Silika"]'::jsonb,
    'es', '["sílice-cerámica", "Nomex", "sílice"]'::jsonb
  )
WHERE id = '5b3b8817-98f7-4da7-8d6c-9000bcfa76a1';


-- products 152-12
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/12"'::jsonb,
    'it', '"152/12"'::jsonb,
    'fr', '"152/12"'::jsonb,
    'de', '"152/12"'::jsonb,
    'es', '"152/12"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Five-finger 100 % cotton 12 oz glove with double-knit palm brushed inside/outside and full knuckle guard. Adjustable cuff (7/13/15 cm). Excellent comfort & dexterity handling hot materials."'::jsonb,
    'it', '"\"Guanto a cinque dita in 100% cotone 12 oz con palmo doppio garzato interno/esterno e paranocche intero.\nLunghezza manichetta adattabile (7/13/15cm).\nComfort e destrezza eccellente durante la movimentazione di materiali caldi.\""'::jsonb,
    'fr', '"\"Gant à cinq doigts en coton 100 % 12 oz avec paume double, gratté intérieur/extérieur, et protection intégrale des jointures.\nLongueur de la manchette réglable (7/13/15 cm).\nConfort et excellente dextérité lors de la manipulation de matériaux chauds.\""'::jsonb,
    'de', '"\"Fünffingerhandschuh aus 100 % Baumwolle, 12 oz, mit doppelter, innen/außen aufgerauter Handfläche und vollständigem Knöchelschutz.\nAnpassbare Stulpenlänge (7/13/15 cm).\nHoher Komfort und ausgezeichnete Fingerfertigkeit bei der Handhabung heißer Materialien.\""'::jsonb,
    'es', '"\"Guante de cinco dedos en algodón 100 % de 12 oz con palma doble afelpada interior/exterior y protección completa de nudillos.\nLongitud de puño adaptable (7/13/15 cm).\nExcelente confort y destreza durante la manipulación de materiales calientes.\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant 12 oz cotton glove, certified reference at 250 °C with knuckle protection"'::jsonb,
    'it', '"Guanto anticalore in cotone di riferimento certificato a 250C con protezione delle nocche"'::jsonb,
    'fr', '"Gant anti-chaleur en coton de référence, certifié à 250 °C, avec protection des jointures"'::jsonb,
    'de', '"Referenz-Hitzeschutzhandschuh aus Baumwolle, zertifiziert bis 250 °C, mit Knöchelschutz"'::jsonb,
    'es', '"Guante resistente al calor de algodón de referencia, certificado a 250 °C, con protección de nudillos"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Great protection in high temperature environment, against contact, radiant and convective heat", "Excellent tear resistance", "Excellent convective-heat resistance", "Reinforced leather seams between palm & thumb"]'::jsonb,
    'it', '["Buona resistenza al calore da contatto", "Eccellente resistenza allo strappo", "Ottima resistenza al calore convettivo", "Salva cuciture in pelle tra palmo e pollice"]'::jsonb,
    'fr', '["Bonne résistance à la chaleur de contact", "Résistance exceptionnelle à la déchirure", "Excellente résistance à la chaleur par convection", "Renfort de couture en cuir entre la paume et le pouce"]'::jsonb,
    'de', '["Gute Beständigkeit gegen Kontakthitze", "Hervorragende Reißfestigkeit", "Ausgezeichnete Beständigkeit gegen konvektive Hitze", "Lederverstärkung an der Naht zwischen Handfläche und Daumen"]'::jsonb,
    'es', '["Buena resistencia al calor de contacto", "Resistencia excepcional al desgarro", "Excelente resistencia al calor convectivo", "Refuerzo de costura de cuero entre la palma y el pulgar"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 250 °C", "Plastic molding line operations", "Light sheet-metal handling"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250°C", "Lavorazioni in linee di stampaggio plastico", "Movimentazione lamiera leggera"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250°C", "Travaux sur lignes de moulage plastique", "Manutention de tôle légère"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250°C", "Arbeiten an Kunststoff-Formlinien", "Handhabung von leichtem Blech"]'::jsonb,
    'es', '["Manipulación de piezas hasta 250°C", "Trabajos en líneas de moldeo de plástico", "Manipulación de chapa ligera"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glassworks", "Plastics", "Light construction"]'::jsonb,
    'it', '["Vetreria", "Plastica", "Edile leggero"]'::jsonb,
    'fr', '["Verrerie", "Plastique", "Bâtiment léger"]'::jsonb,
    'de', '["Glasproduktion", "Kunststoff", "Leichtbau"]'::jsonb,
    'es', '["Vidriería", "Plástico", "Construcción ligera"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "250 °C"]'::jsonb,
    'it', '["anticalore", "250C"]'::jsonb,
    'fr', '["anti-chaleur", "250 °C"]'::jsonb,
    'de', '["hitzebeständig", "250 °C"]'::jsonb,
    'es', '["resistente al calor", "250 °C"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '7c15d277-9493-4b37-b70f-44a15577b629';


-- products suxxeed-construction-short-sleeve-polo
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed construction short sleeve polo"'::jsonb,
    'it', '"suXXeed construction POLO CORTA"'::jsonb,
    'fr', '"suXXeed construction POLO CORTA"'::jsonb,
    'de', '"suXXeed construction POLO CORTA"'::jsonb,
    'es', '"suXXeed construction POLO CORTA"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility short-sleeve work shirt, ensuring excellent breathability and comfort."'::jsonb,
    'it', '"Maglia da lavoro ad alta visibilità a maniche corte, che garantisce ottima traspirabilità e comodità."'::jsonb,
    'fr', '"Polo de travail haute visibilité à manches courtes, garantissant une excellente respirabilité et un grand confort."'::jsonb,
    'de', '"Warnschutz-Arbeitsshirt mit kurzen Ärmeln, das eine hervorragende Atmungsaktivität und Komfort gewährleistet."'::jsonb,
    'es', '"Camiseta de trabajo de alta visibilidad de manga corta, que garantiza una excelente transpirabilidad y comodidad."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility work shirt"'::jsonb,
    'it', '"Maglia da lavoro ad alta visibilità"'::jsonb,
    'fr', '"Maillot de travail haute visibilité"'::jsonb,
    'de', '"Warnschutz-Arbeitsshirt mit hoher Sichtbarkeit"'::jsonb,
    'es', '"Camiseta de trabajo de alta visibilidad"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hi-Vis Polo and T-shirts"'::jsonb,
    'it', '"Giacca alta visibilità"'::jsonb,
    'fr', '"Veste haute visibilité"'::jsonb,
    'de', '"Warnschutzjacke"'::jsonb,
    'es', '"Chaqueta de alta visibilidad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ensures excellent visibility thanks to reflective components", "Provides UV protection", "Certified in accordance with OEKO-TEX® Standard 100", "Short sleeves", "Polo collar with buttons", "Breathable materials"]'::jsonb,
    'it', '["Garantisce ottima visibilità, con componenti reflex", "Garantisce protezione uv", "Certificazione secondo OEKO-TEX® Standard 100", "Manica corta", "Coletto polo con bottini", "Materiali traspiranti"]'::jsonb,
    'fr', '["Garantit une excellente visibilité, avec des éléments réfléchissants", "Garantit une protection UV", "Certification selon OEKO-TEX® Standard 100", "Manche courte", "Col polo avec boutons", "Matériaux respirants"]'::jsonb,
    'de', '["Gewährleistet ausgezeichnete Sichtbarkeit dank reflektierender Elemente", "Gewährleistet UV-Schutz", "Zertifizierung nach OEKO-TEX® Standard 100", "Kurzarm", "Polokragen mit Knöpfen", "Atmungsaktive Materialien"]'::jsonb,
    'es', '["Garantiza una excelente visibilidad, con componentes reflectantes", "Garantiza protección UV", "Certificación según OEKO-TEX® Standard 100", "Manga corta", "Cuello polo con botones", "Materiales transpirables"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Road works", "Work in low-visibility conditions"]'::jsonb,
    'it', '["Lavori stradali", "Lavori con scarsa visibilità"]'::jsonb,
    'fr', '["Travaux routiers", "Travaux en faible visibilité"]'::jsonb,
    'de', '["Straßenarbeiten", "Arbeiten bei schlechter Sicht"]'::jsonb,
    'es', '["Trabajos viales", "Trabajos con baja visibilidad"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Public services", "roadside assistance", "construction sites"]'::jsonb,
    'it', '["Servizi pubblici", "Assistenza stradale", "Cantieri"]'::jsonb,
    'fr', '["Services publics", "Assistance routière", "Chantiers"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Straßenverkehrshilfe", "Baustellen"]'::jsonb,
    'es', '["Servicios públicos", "Asistencia en carretera", "Obras"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work jacket"]'::jsonb,
    'it', '["Giacca da lavoro"]'::jsonb,
    'fr', '["Veste de travail"]'::jsonb,
    'de', '["Arbeitsjacke"]'::jsonb,
    'es', '["Chaqueta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["50% polyester, 50% cotton"]'::jsonb,
    'it', '["50% poliestere, 50% cotone"]'::jsonb,
    'fr', '["50 % polyester, 50 % coton"]'::jsonb,
    'de', '["50 % Polyester, 50 % Baumwolle"]'::jsonb,
    'es', '["50 % poliéster, 50 % algodón"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN ISO 13688: Yes"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb
  )
WHERE id = '9393add3-c5b7-4d42-99fa-3d33f0793a92';


-- products suxxeed-construction-long-sleeve-polo-2
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed construction Long sleeve polo (2)"'::jsonb,
    'it', '"suXXeed construction POLO LUNGA"'::jsonb,
    'fr', '"suXXeed construction POLO LUNGA"'::jsonb,
    'de', '"suXXeed construction POLO LUNGA"'::jsonb,
    'es', '"suXXeed construction POLO LUNGA"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility Long-sleeve work shirt, ensuring excellent breathability and comfort."'::jsonb,
    'it', '"Maglia da lavoro ad alta visibilità a maniche lunghe, che garantisce ottima traspirabilità e comodità."'::jsonb,
    'fr', '"Polo de travail haute visibilité à manches longues, garantissant une excellente respirabilité et un grand confort."'::jsonb,
    'de', '"Warnschutz-Arbeitsshirt mit langen Ärmeln, das eine hervorragende Atmungsaktivität und Komfort gewährleistet."'::jsonb,
    'es', '"Camiseta de trabajo de alta visibilidad de manga larga, que garantiza una excelente transpirabilidad y comodidad."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility work shirt"'::jsonb,
    'it', '"Maglia da lavoro ad alta visibilità"'::jsonb,
    'fr', '"Maillot de travail haute visibilité"'::jsonb,
    'de', '"Warnschutz-Arbeitsshirt mit hoher Sichtbarkeit"'::jsonb,
    'es', '"Camiseta de trabajo de alta visibilidad"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hi-Vis Polo and T-shirts"'::jsonb,
    'it', '"Giacca alta visibilità"'::jsonb,
    'fr', '"Veste haute visibilité"'::jsonb,
    'de', '"Warnschutzjacke"'::jsonb,
    'es', '"Chaqueta de alta visibilidad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ensures excellent visibility thanks to reflective components", "Provides UV protection", "Certified in accordance with OEKO-TEX® Standard 100", "Polo collar with buttons", "Breathable materials", "Long sleeves"]'::jsonb,
    'it', '["Garantisce ottima visibilità, con componenti reflex", "Garantisce protezione uv", "Certificazione secondo OEKO-TEX® Standard 100", "Manica lunga", "Coletto polo con bottini", "Materiali traspiranti"]'::jsonb,
    'fr', '["Garantit une excellente visibilité, avec des éléments réfléchissants", "Garantit une protection UV", "Certification selon OEKO-TEX® Standard 100", "Manche longue", "Col polo avec boutons", "Matériaux respirants"]'::jsonb,
    'de', '["Gewährleistet ausgezeichnete Sichtbarkeit dank reflektierender Elemente", "Gewährleistet UV-Schutz", "Zertifizierung nach OEKO-TEX® Standard 100", "Langarm", "Polokragen mit Knöpfen", "Atmungsaktive Materialien"]'::jsonb,
    'es', '["Garantiza una excelente visibilidad, con componentes reflectantes", "Garantiza protección UV", "Certificación según OEKO-TEX® Standard 100", "Manga larga", "Cuello polo con botones", "Materiales transpirables"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Road works", "Work in low-visibility conditions"]'::jsonb,
    'it', '["Lavori stradali", "Lavori con scarsa visibilità"]'::jsonb,
    'fr', '["Travaux routiers", "Travaux en faible visibilité"]'::jsonb,
    'de', '["Straßenarbeiten", "Arbeiten bei schlechter Sicht"]'::jsonb,
    'es', '["Trabajos viales", "Trabajos con baja visibilidad"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Public services", "roadside assistance", "construction sites"]'::jsonb,
    'it', '["Servizi pubblici", "Assistenza stradale", "Cantieri"]'::jsonb,
    'fr', '["Services publics", "Assistance routière", "Chantiers"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Straßenverkehrshilfe", "Baustellen"]'::jsonb,
    'es', '["Servicios públicos", "Asistencia en carretera", "Obras"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work jacket"]'::jsonb,
    'it', '["Giacca da lavoro"]'::jsonb,
    'fr', '["Veste de travail"]'::jsonb,
    'de', '["Arbeitsjacke"]'::jsonb,
    'es', '["Chaqueta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["50% polyester, 50% cotton"]'::jsonb,
    'it', '["50% poliestere, 50% cotone"]'::jsonb,
    'fr', '["50 % polyester, 50 % coton"]'::jsonb,
    'de', '["50 % Polyester, 50 % Baumwolle"]'::jsonb,
    'es', '["50 % poliéster, 50 % algodón"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN ISO 13688: Yes"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '2c78d51d-b6f8-4d83-a61e-2f8c0e994d4d';


-- products 100-a
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100/A"'::jsonb,
    'it', '"100/A"'::jsonb,
    'fr', '"100/A"'::jsonb,
    'de', '"100/A"'::jsonb,
    'es', '"100/A"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% cotton heat-resistant mitten glove with jute reinforcement."'::jsonb,
    'it', '"Manopola Anticalore in cotone 100% con rinforzo in Juta."'::jsonb,
    'fr', '"Moufle anti-chaleur en coton 100 % avec renfort en jute."'::jsonb,
    'de', '"Hitzeschutz-Fausthandschuh aus 100 % Baumwolle mit Jute-Verstärkung."'::jsonb,
    'es', '"Manopla resistente al calor de algodón 100 % con refuerzo de yute."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant mitten with reinforced jute-palm"'::jsonb,
    'it', '"Guanto manopola anticalore con palmo rinforzato in juta."'::jsonb,
    'fr', '"Gant moufle anti-chaleur avec paume renforcée en jute."'::jsonb,
    'de', '"Hitzeschutz-Fausthandschuh mit jute-verstärkter Handfläche."'::jsonb,
    'es', '"Guante tipo manopla resistente al calor con palma reforzada en yute."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Jute inlay to increase contact heat protection up to 250°C", "High protection against mechanical hazards", "Hand and forearm protection"]'::jsonb,
    'it', '["Strato in Juta per garantire protezione al contatto fino a 250°C", "Ottima protezione dai rischi meccanici", "Copertura della mano e avambraccio"]'::jsonb,
    'fr', '["Couche en jute pour garantir une protection au contact jusqu''à 250°C", "Excellente protection contre les risques mécaniques", "Couverture de la main et de l''avant-bras"]'::jsonb,
    'de', '["Jute-Schicht für Kontaktschutz bis 250°C", "Hervorragender Schutz vor mechanischen Risiken", "Abdeckung von Hand und Unterarm"]'::jsonb,
    'es', '["Capa de yute para garantizar protección al contacto hasta 250°C", "Excelente protección frente a riesgos mecánicos", "Cobertura de la mano y el antebrazo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling hot parts up to 250 °C", "Glassworks & mold shops", "Hand & wrist protection in light operations"]'::jsonb,
    'it', '["Movimentazione  di pezzi caldi fino a 250 °C", "Lavorazioni in vetrerie e stamperie", "Protezione mani e polso in operazioni leggere"]'::jsonb,
    'fr', '["Manutention de pièces chaudes jusqu''à 250 °C", "Travaux en verreries et ateliers de moulage", "Protection des mains et du poignet lors d''opérations légères"]'::jsonb,
    'de', '["Handhabung heißer Werkstücke bis 250 °C", "Arbeiten in Glashütten und Presswerken", "Schutz von Händen und Handgelenk bei leichten Arbeiten"]'::jsonb,
    'es', '["Manipulación de piezas calientes de hasta 250 °C", "Trabajos en vidrierías y talleres de estampado", "Protección de manos y muñeca en operaciones ligeras"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glassworks", "Plastics", "Industrial molding"]'::jsonb,
    'it', '["Vetreria", "Plastica", "Stampa industriale"]'::jsonb,
    'fr', '["Verrerie", "Plastique", "Impression industrielle"]'::jsonb,
    'de', '["Glasproduktion", "Kunststoff", "Industrieller Druck"]'::jsonb,
    'es', '["Vidriería", "Plástico", "Impresión industrial"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant mitten glove", "cut-resistant", "250 °C"]'::jsonb,
    'it', '["Manopola anticalore", "resistenza al taglio", "250C"]'::jsonb,
    'fr', '["Moufle anti-chaleur", "résistance à la coupure", "250 °C"]'::jsonb,
    'de', '["Hitzeschutzfäustling", "Schnittfestigkeit", "250 °C"]'::jsonb,
    'es', '["Manopla resistente al calor", "resistencia al corte", "250 °C"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton", "jute"]'::jsonb,
    'it', '["cotone", "juta"]'::jsonb,
    'fr', '["coton", "jute"]'::jsonb,
    'de', '["Baumwolle", "Jute"]'::jsonb,
    'es', '["algodón", "yute"]'::jsonb
  )
WHERE id = '5a229593-c274-4576-ab54-b8bb114bde83';


-- products bls-zer030
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS Zer030"'::jsonb,
    'it', '"BLS Zer030"'::jsonb,
    'fr', '"BLS Zer030"'::jsonb,
    'de', '"BLS Zer030"'::jsonb,
    'es', '"BLS Zer030"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Category III FFP3 filtering facepiece respirator, designed to provide maximum respiratory protection against dust, aerosols, and nanoparticles."'::jsonb,
    'it', '"Facciali filtranti FFP3 di categoria III progettato per offrire la massima protezione respiratoria contro polveri, aerosol e nanoparticelle."'::jsonb,
    'fr', '"Masques filtrants FFP3 de catégorie III conçus pour offrir la protection respiratoire maximale contre les poussières, les aérosols et les nanoparticules."'::jsonb,
    'de', '"FFP3-Filtermasken der Kategorie III, entwickelt, um maximalen Atemschutz vor Stäuben, Aerosolen und Nanopartikeln zu bieten."'::jsonb,
    'es', '"Mascarillas filtrantes FFP3 de categoría III diseñadas para ofrecer la máxima protección respiratoria frente a polvo, aerosoles y nanopartículas."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filtering facepiece respirator FFP3 with advanced protection against particles and aerosols"'::jsonb,
    'it', '"Facciale filtrante FFP3 con protezione avanzata contro particelle e aerosol"'::jsonb,
    'fr', '"Masque filtrant FFP3 avec protection avancée contre les particules et les aérosols"'::jsonb,
    'de', '"FFP3-Filtermaske mit fortschrittlichem Schutz vor Partikeln und Aerosolen"'::jsonb,
    'es', '"Mascarilla filtrante FFP3 con protección avanzada contra partículas y aerosoles"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dispopsable masks, Full face Masks, Half Masks, Filters, Cartidges & Accessories"'::jsonb,
    'it', '"Mascherine monouso"'::jsonb,
    'fr', '"Masques jetables"'::jsonb,
    'de', '"Einwegmasken"'::jsonb,
    'es', '"Mascarillas desechables"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Very low breathing resistance (comparable to an FFP1)", "Ultra-high efficiency filtration", "Protective outer layer (Armor®) for complete protection", "High face seal to reduce leakage and infiltration", "High breathability", "Soft internal nose clip"]'::jsonb,
    'it', '["Filtrazione ad altissima efficienza", "Strato protettivo esterno (Armor®) per protezione completa", "Tenuta facciale elevata che ne riduce perdite e infiltrazioni", "Bassissima resistenza respiratoria (paragonabile ad un FFP1)", "Alta traspirabilità", "Barretta stringinaso interna morbida"]'::jsonb,
    'fr', '["Filtration à très haute efficacité", "Couche de protection extérieure (Armor®) pour une protection complète", "Étanchéité faciale élevée réduisant les fuites et les infiltrations", "Résistance respiratoire très faible (comparable à un FFP1)", "Haute respirabilité", "Barrette pince-nez interne souple"]'::jsonb,
    'de', '["Filterung mit sehr hoher Effizienz", "Äußere Schutzschicht (Armor®) für vollständigen Schutz", "Hohe Gesichtsabdichtung, die Leckagen und Undichtigkeiten reduziert", "Sehr geringer Atemwiderstand (vergleichbar mit einer FFP1)", "Hohe Atmungsaktivität", "Weicher innenliegender Nasenbügel"]'::jsonb,
    'es', '["Filtración de muy alta eficiencia", "Capa protectora exterior (Armor®) para una protección completa", "Alto sellado facial que reduce las fugas y filtraciones", "Resistencia respiratoria muy baja (comparable a una FFP1)", "Alta transpirabilidad", "Barra pinza nasal interna blanda"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against welding fumes", "Protection against fine dust"]'::jsonb,
    'it', '["Protezione da fumi di saldatura", "Protezione da polveri fini"]'::jsonb,
    'fr', '["Protection contre les fumées de soudage", "Protection contre les poussières fines"]'::jsonb,
    'de', '["Schutz vor Schweißrauch", "Schutz vor Feinstaub"]'::jsonb,
    'es', '["Protección contra los humos de soldadura", "Protección contra polvo fino"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Pharmaceutical", "research", "Construction", "Automotive", "Manufacturing", "Agriculture"]'::jsonb,
    'it', '["Farmaceutico", "ricerca", "edilizio", "automobilistico", "manufatturiero", "agricolo"]'::jsonb,
    'fr', '["Pharmaceutique", "recherche", "du bâtiment", "automobile", "manufacturier", "agricole"]'::jsonb,
    'de', '["Pharmazeutisch", "Forschung", "Bau-", "Automobilbranche", "verarbeitendes Gewerbe", "landwirtschaftlich"]'::jsonb,
    'es', '["Farmacéutico", "investigación", "de la construcción", "automotriz", "manufacturero", "agrícola"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
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
WHERE id = '30de76e2-50f6-4e50-ab5d-389612e8c01d';


-- products 152-14-4lj15
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/14 4LJ15"'::jsonb,
    'it', '"152/14 4LJ15"'::jsonb,
    'fr', '"152/14 4LJ15"'::jsonb,
    'de', '"152/14 4LJ15"'::jsonb,
    'es', '"152/14 4LJ15"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove certified for 350°C and tested for 20 seconds at 350°C and 10 seconds at 500°C. \n\nPalm protected by four-layer and back by double-layer 14 oz cotton knit (brushed inside/outside) plus full knuckle guard. 17.5 cm double-layered cotton cuff. Guards against molten-material hazards and provides Level 3 cut resistance."'::jsonb,
    'it', '"Guanto anticalore certificato per 350°C con resistenza al contatto di 20 secondi a 350°C e 10 secondi a 500°C. Protezione del palmo con quadruplo strato e del dorso con doppio strato in cotone 14 oz garzato interno/esterno e paranocche intero. Manichetta in doppio strato di cotone da 17.5 cm.\nCopertura da rischi da materiale fuso e protezione al taglio di livello 3."'::jsonb,
    'fr', '"Gant anti-chaleur certifié pour 350 °C avec une résistance au contact de 20 secondes à 350 °C et de 10 secondes à 500 °C. Protection de la paume à quadruple couche et du dos à double couche en coton 14 oz gratté intérieur/extérieur, avec protection intégrale des jointures. Manchette en coton double couche de 17,5 cm.\nCouverture contre les risques liés au métal en fusion et protection contre la coupure de niveau 3."'::jsonb,
    'de', '"Hitzeschutzhandschuh zertifiziert für 350 °C mit einer Kontaktbeständigkeit von 20 Sekunden bei 350 °C und 10 Sekunden bei 500 °C. Vierlagiger Schutz der Handfläche und zweilagiger Schutz des Handrückens aus innen/außen aufgerauter 14-oz-Baumwolle mit vollständigem Knöchelschutz. Doppellagige Baumwollstulpe von 17,5 cm.\nSchutz vor Risiken durch geschmolzenes Material und Schnittschutzstufe 3."'::jsonb,
    'es', '"Guante resistente al calor certificado para 350 °C con resistencia al contacto de 20 segundos a 350 °C y 10 segundos a 500 °C. Protección de la palma con cuádruple capa y del dorso con doble capa en algodón de 14 oz afelpado interior/exterior y protección completa de nudillos. Puño de doble capa de algodón de 17,5 cm.\nCobertura frente a riesgos de material fundido y protección al corte de nivel 3."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove in cotton with four layers and back-of-hand reinforcement for high-temperature operations and mechanical hazards"'::jsonb,
    'it', '"Guanto anticalore in cotone con quattro strati e protezione del dorso per operazioni ad elevate temperature e con rischi meccanici"'::jsonb,
    'fr', '"Gant anti-chaleur en coton à quatre couches avec protection du dos de la main pour des opérations à températures élevées et avec des risques mécaniques"'::jsonb,
    'de', '"Vierlagiger Hitzeschutzhandschuh aus Baumwolle mit Handrückenschutz für Arbeiten bei hohen Temperaturen und mechanischen Risiken"'::jsonb,
    'es', '"Guante resistente al calor de algodón con cuatro capas y protección del dorso para operaciones a altas temperaturas y con riesgos mecánicos"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against mechanical hazards", "Reinforced leather seams between palm & thumb", "4-layer palm with two thermal layers.", "20 seconds contact heat resistance at 350°C and 10 seconds at 500°C"]'::jsonb,
    'it', '["Resistenza alle sollecitazioni meccaniche", "Salva cuciture in pelle tra palmo e pollice", "Quattro strati di protezione con doppio strato termico per prolungata resistenza alle alte temperature", "Resistenza al contatto 20 secondi a 350°C e 10 secondi a 500°C"]'::jsonb,
    'fr', '["Résistance aux contraintes mécaniques", "Renfort de couture en cuir entre la paume et le pouce", "Quatre couches de protection avec double couche thermique pour une résistance prolongée aux hautes températures", "Résistance au contact de 20 secondes à 350 °C et de 10 secondes à 500 °C"]'::jsonb,
    'de', '["Beständigkeit gegen mechanische Beanspruchung", "Lederverstärkung an der Naht zwischen Handfläche und Daumen", "Vier Schutzschichten mit doppelter Wärmeschutzschicht für eine verlängerte Beständigkeit gegen hohe Temperaturen", "Kontaktbeständigkeit von 20 Sekunden bei 350 °C und 10 Sekunden bei 500 °C"]'::jsonb,
    'es', '["Resistencia a los esfuerzos mecánicos", "Refuerzo de costura de cuero entre la palma y el pulgar", "Cuatro capas de protección con doble capa térmica para una resistencia prolongada a las altas temperaturas", "Resistencia al contacto de 20 segundos a 350 °C y 10 segundos a 500 °C"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for glass industry: handling hot objects up to 350 °C & hot-zone operations", "Hot-plastic printing & thermoforming", "Handling heated components in ceramic production lines", "Swabbing and lubricating activities"]'::jsonb,
    'it', '["Studiato per l’industria del vetro per manipolazione di oggetti caldi fino a 350C e operazioni in zona calda", "Operazioni di stampa e termoformatura di plastiche calde", "Movimentazione di componenti riscaldati in linee di produzione ceramica"]'::jsonb,
    'fr', '["Conçu pour l''industrie du verre, pour la manipulation d''objets chauds jusqu''à 350C et les opérations en zone chaude", "Opérations de moulage et de thermoformage de plastiques chauds", "Manutention de composants chauffés sur les lignes de production céramique"]'::jsonb,
    'de', '["Entwickelt für die Glasindustrie, zur Handhabung heißer Gegenstände bis 350C und für Arbeiten im Heißbereich", "Form- und Thermoformarbeiten mit heißen Kunststoffen", "Handhabung erhitzter Bauteile in Keramik-Produktionslinien"]'::jsonb,
    'es', '["Diseñado para la industria del vidrio, para la manipulación de objetos calientes hasta 350C y operaciones en zona caliente", "Operaciones de moldeo y termoformado de plásticos calientes", "Manipulación de componentes calentados en líneas de producción cerámica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass", "Ceramic", "Plastic-moulding", "Cement"]'::jsonb,
    'it', '["Industria del vetro", "Stampaggio plastico", "Industria ceramica", "Industria del cemento"]'::jsonb,
    'fr', '["Industrie du verre", "Moulage plastique", "Industrie céramique", "Industrie du ciment"]'::jsonb,
    'de', '["Glasindustrie", "Kunststoffspritzguss", "Keramikindustrie", "Zementindustrie"]'::jsonb,
    'es', '["Industria del vidrio", "Moldeo de plástico", "Industria cerámica", "Industria del cemento"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["back‐of‐hand protection", "heat resistant glove", "350C", "cut protection"]'::jsonb,
    'it', '["350°C", "guanti anticalore", "protezione meccanica", "zona calda del vetro"]'::jsonb,
    'fr', '["350 °C", "gants anti-chaleur", "protection mécanique", "zone chaude du verre"]'::jsonb,
    'de', '["350 °C", "Hitzeschutzhandschuhe", "mechanischer Schutz", "Heißbereich der Glasproduktion"]'::jsonb,
    'es', '["350 °C", "guantes resistentes al calor", "protección mecánica", "zona caliente del vidrio"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Cotton", "Two insulating layers"]'::jsonb,
    'it', '["Cotone", "Doppio strato isolante"]'::jsonb,
    'fr', '["Coton", "Double couche isolante"]'::jsonb,
    'de', '["Baumwolle", "Doppelte Isolierschicht"]'::jsonb,
    'es', '["Algodón", "Doble capa aislante"]'::jsonb
  )
WHERE id = '26454fd8-92e1-4a8a-add9-6109b079be65';


-- products sv25-2
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"SV25"'::jsonb,
    'it', '"SV25"'::jsonb,
    'fr', '"SV25"'::jsonb,
    'de', '"SV25"'::jsonb,
    'es', '"SV25"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Split cowhide leather sleeves with para-aramid stitching, certified EN ISO 11611 Class 2. Designed to protect the forearm and elbow from sparks, heat, and molten metal splashes, they ensure high durability, comfort, and a secure fit."'::jsonb,
    'it', '"Manicotti in pelle crosta bovina con cuciture in para-aramide, certificate EN ISO 11611 Classe 2. Progettate per proteggere avambraccio e gomito da scintille, calore e schizzi di metallo fuso, garantiscono elevata resistenza, comfort e vestibilità"'::jsonb,
    'fr', '"Manchettes en croûte de cuir bovin avec coutures en para-aramide, certifiées EN ISO 11611 Classe 2. Conçues pour protéger l''avant-bras et le coude contre les étincelles, la chaleur et les projections de métal en fusion, elles garantissent une résistance, un confort et un ajustement élevés"'::jsonb,
    'de', '"Armstulpen aus Rindspaltleder mit Nähten aus Para-Aramid, zertifiziert nach EN ISO 11611 Klasse 2. Sie wurden entwickelt, um Unterarm und Ellenbogen vor Funken, Hitze und Spritzern von geschmolzenem Metall zu schützen, und bieten hohe Beständigkeit, Komfort und Passform"'::jsonb,
    'es', '"Manguitos de cuero dividido de bovino con costuras de para-aramida, certificados según EN ISO 11611 Clase 2. Diseñados para proteger el antebrazo y el codo de chispas, calor y salpicaduras de metal fundido, garantizan una elevada resistencia, confort y ajuste"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Fire-resistant leather welding sleeves, Class 2 EN ISO 11611, designed to protect the forearm and elbow from sparks, heat, and molten metal during welding."'::jsonb,
    'it', '"Manichette in pelle ignifuga Classe 2 EN ISO 11611 che proteggono avambraccio e gomito da scintille, calore e metallo fuso durante la saldatura."'::jsonb,
    'fr', '"Manchettes en cuir ignifuge Classe 2 EN ISO 11611 protégeant l''avant-bras et le coude contre les étincelles, la chaleur et le métal en fusion pendant le soudage."'::jsonb,
    'de', '"Armstulpen aus flammhemmendem Leder, Klasse 2 EN ISO 11611, die Unterarm und Ellenbogen beim Schweißen vor Funken, Hitze und geschmolzenem Metall schützen."'::jsonb,
    'es', '"Manguitos de cuero ignífugo Clase 2 EN ISO 11611 que protegen el antebrazo y el codo de chispas, calor y metal fundido durante la soldadura."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Accessories"'::jsonb,
    'it', '"Manicotti da saldatura"'::jsonb,
    'fr', '"Manchettes de soudage"'::jsonb,
    'de', '"Schweißerstulpen"'::jsonb,
    'es', '"Manguitos de soldadura"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against sparks and molten metal", "Heat and flame resistance", "Coverage and protection of critical areas", "Elasticated cuffs", "Excellent fit", "Soft material"]'::jsonb,
    'it', '["Protezione da scintille e metallo fuso", "Resistenza al calore e alla fiamma", "Copertura e protezione di aree critiche", "Polsini Elasticizzati", "Ottima vestibilità", "Materiale morbido"]'::jsonb,
    'fr', '["Protection contre les étincelles et les projections de métal en fusion", "Résistance à la chaleur et à la flamme", "Couverture et protection des zones critiques", "Poignets élastiqués", "Excellent ajustement", "Matériau souple"]'::jsonb,
    'de', '["Schutz vor Funken und geschmolzenem Metall", "Hitze- und Flammbeständigkeit", "Abdeckung und Schutz kritischer Bereiche", "Elastische Bündchen", "Hervorragende Passform", "Weiches Material"]'::jsonb,
    'es', '["Protección contra chispas y metal fundido", "Resistencia al calor y a la llama", "Cobertura y protección de zonas críticas", "Puños elásticos", "Excelente ajuste", "Material suave"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Manual and industrial welding", "Thermal cutting", "Metal fabrication"]'::jsonb,
    'it', '["Saldatura manuale e industriale", "Taglio termico", "Carpenteria metallica"]'::jsonb,
    'fr', '["Soudage manuel et industriel", "Découpe thermique", "Charpente métallique"]'::jsonb,
    'de', '["Manuelles und industrielles Schweißen", "Thermisches Schneiden", "Metallbau"]'::jsonb,
    'es', '["Soldadura manual e industrial", "Corte térmico", "Carpintería metálica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metalworking Fabrication", "structural steelwork"]'::jsonb,
    'it', '["Metalmeccanico", "Carpenteria"]'::jsonb,
    'fr', '["Métallo-mécanique", "Charpente métallique"]'::jsonb,
    'de', '["Metallverarbeitende Industrie", "Stahlbau"]'::jsonb,
    'es', '["Metalmecánico", "Carpintería metálica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather"]'::jsonb,
    'it', '["Pelle"]'::jsonb,
    'fr', '["Cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["Cuero"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Unisex", "size_range": ""}'::jsonb
  )
WHERE id = 'c8bf3c3e-2526-4332-a48d-21edc27996e0';


-- products bls-zer032
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS Zer032"'::jsonb,
    'it', '"BLS Zer030 (2)"'::jsonb,
    'fr', '"BLS Zer030 (2)"'::jsonb,
    'de', '"BLS Zer030 (2)"'::jsonb,
    'es', '"BLS Zer030 (2)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Category III FFP3 filtering facepiece respirator designed to provide the highest level of protection and comfort in the BLS range. It incorporates advanced filtration, including against nanoparticles, a full-face seal for a perfect fit, and an Armor® protective layer that extends the filter’s lifespan."'::jsonb,
    'it', '"Facciale filtrante FFP3 di categoria III progettato per offrire il massimo livello di protezione e comfort nella gamma BLS. Integra filtrazione avanzata anche contro nanoparticelle, guarnizione completa per una perfetta tenuta e strato protettivo Armor® che prolunga la durata del filtro"'::jsonb,
    'fr', '"Masque filtrant FFP3 de catégorie III conçu pour offrir le plus haut niveau de protection et de confort de la gamme BLS. Il intègre une filtration avancée, y compris contre les nanoparticules, un joint complet pour une étanchéité parfaite et une couche protectrice Armor® qui prolonge la durée de vie du filtre"'::jsonb,
    'de', '"FFP3-Filtermaske der Kategorie III, entwickelt, um das höchste Schutz- und Komfortniveau der BLS-Reihe zu bieten. Sie integriert eine fortschrittliche Filterung, auch gegen Nanopartikel, eine vollständige Dichtung für perfekten Sitz und eine schützende Armor®-Schicht, die die Lebensdauer des Filters verlängert"'::jsonb,
    'es', '"Mascarilla filtrante FFP3 de categoría III diseñada para ofrecer el máximo nivel de protección y confort de la gama BLS. Integra filtración avanzada también contra nanopartículas, una junta completa para un sellado perfecto y una capa protectora Armor® que prolonga la vida útil del filtro"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP3 filtering facepiece with full seal, offering maximum levels of protection, comfort, and adaptability."'::jsonb,
    'it', '"Facciale filtrante FFP3 con guarnizione completa e massimo livello di protezione, comfort e adattabilità."'::jsonb,
    'fr', '"Masque filtrant FFP3 avec joint complet et niveau maximal de protection, de confort et d''adaptabilité."'::jsonb,
    'de', '"FFP3-Filtermaske mit vollständiger Dichtung und maximalem Schutz-, Komfort- und Anpassungsniveau."'::jsonb,
    'es', '"Mascarilla filtrante FFP3 con junta completa y máximo nivel de protección, confort y adaptabilidad."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Disposable masks"'::jsonb,
    'it', '"Mascherine monouso"'::jsonb,
    'fr', '"Masques jetables"'::jsonb,
    'de', '"Einwegmasken"'::jsonb,
    'es', '"Mascarillas desechables"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Very low breathing resistance (comparable to an FFP1)", "Protective outer layer (Armor®) for complete protection", "High breathability", "Soft internal nose clip", "Advanced filtration capable of filtering nanoparticles (~0.001 μm)", "Seal ensuring a perfect fit"]'::jsonb,
    'it', '["Strato protettivo esterno (Armor®) per protezione completa", "Bassissima resistenza respiratoria (paragonabile ad un FFP1)", "Alta traspirabilità", "Barretta stringinaso interna morbida", "Filtrazione avanzata che permette di filtrare nanoparticelle (~0,001 μm)", "Guarnizione per mantenere una tenuta perfetta"]'::jsonb,
    'fr', '["Couche de protection extérieure (Armor®) pour une protection complète", "Résistance respiratoire très faible (comparable à un FFP1)", "Haute respirabilité", "Barrette pince-nez interne souple", "Filtration avancée permettant de filtrer les nanoparticules (~0,001 μm)", "Joint permettant de garantir une étanchéité parfaite"]'::jsonb,
    'de', '["Äußere Schutzschicht (Armor®) für vollständigen Schutz", "Sehr geringer Atemwiderstand (vergleichbar mit einer FFP1)", "Hohe Atmungsaktivität", "Weicher innenliegender Nasenbügel", "Fortschrittliche Filterung, die das Filtern von Nanopartikeln (~0,001 μm) ermöglicht", "Dichtung zur Gewährleistung eines perfekten Sitzes"]'::jsonb,
    'es', '["Capa protectora exterior (Armor®) para una protección completa", "Resistencia respiratoria muy baja (comparable a una FFP1)", "Alta transpirabilidad", "Barra pinza nasal interna blanda", "Filtración avanzada que permite filtrar nanopartículas (~0,001 μm)", "Junta para mantener un sellado perfecto"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["High dust concentration environments", "Construction and critical demolition work"]'::jsonb,
    'it', '["Protezione da fumi di saldatura", "Protezione da polveri fini"]'::jsonb,
    'fr', '["Protection contre les fumées de soudage", "Protection contre les poussières fines"]'::jsonb,
    'de', '["Schutz vor Schweißrauch", "Schutz vor Feinstaub"]'::jsonb,
    'es', '["Protección contra los humos de soldadura", "Protección contra polvo fino"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Pharmaceutical", "research", "Construction", "Automotive", "Manufacturing", "Agriculture"]'::jsonb,
    'it', '["Farmaceutico", "ricerca", "edilizio", "automobilistico", "manufatturiero", "agricolo"]'::jsonb,
    'fr', '["Pharmaceutique", "recherche", "du bâtiment", "automobile", "manufacturier", "agricole"]'::jsonb,
    'de', '["Pharmazeutisch", "Forschung", "Bau-", "Automobilbranche", "verarbeitendes Gewerbe", "landwirtschaftlich"]'::jsonb,
    'es', '["Farmacéutico", "investigación", "de la construcción", "automotriz", "manufacturero", "agrícola"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["disposable mask", "FFP3"]'::jsonb,
    'it', '["mascherina monouso", "FFP3"]'::jsonb,
    'fr', '["masque jetable", "FFP3"]'::jsonb,
    'de', '["Einwegmaske", "FFP3"]'::jsonb,
    'es', '["mascarilla desechable", "FFP3"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
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
WHERE id = '52ed1101-5afd-4173-aa50-f2411c0cfc25';


-- products lg20
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"LG20"'::jsonb,
    'it', '"LG20"'::jsonb,
    'fr', '"LG20"'::jsonb,
    'de', '"LG20"'::jsonb,
    'es', '"LG20"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Fire-resistant split cowhide leather gaiters, certified EN ISO 11611 Class 2 for welding activities. They provide high protection against sparks, molten metal, and heat, covering the foot and ankle while ensuring durability, comfort, and ease of use in demanding industrial environments."'::jsonb,
    'it', '"Ghette realizzati in pelle crosta bovina ignifuga, certificati EN ISO 11611 Classe 2 per attività di saldatura. Offrono protezione elevata contro scintille, metallo fuso e calore, coprendo piede e caviglia e garantendo resistenza, comfort e facilità d’uso in ambienti industriali impegnativi."'::jsonb,
    'fr', '"Guêtres en croûte de cuir bovin ignifuge, certifiées EN ISO 11611 Classe 2 pour les activités de soudage. Elles offrent une protection élevée contre les étincelles, le métal en fusion et la chaleur, en couvrant le pied et la cheville, tout en garantissant résistance, confort et facilité d''utilisation dans des environnements industriels exigeants."'::jsonb,
    'de', '"Gamaschen aus flammhemmendem Rindspaltleder, zertifiziert nach EN ISO 11611 Klasse 2 für Schweißarbeiten. Sie bieten hohen Schutz vor Funken, geschmolzenem Metall und Hitze, bedecken Fuß und Knöchel und gewährleisten Beständigkeit, Komfort und einfache Handhabung in anspruchsvollen industriellen Umgebungen."'::jsonb,
    'es', '"Polainas fabricadas en cuero dividido de bovino ignífugo, certificadas según EN ISO 11611 Clase 2 para actividades de soldadura. Ofrecen una elevada protección contra chispas, metal fundido y calor, cubriendo el pie y el tobillo y garantizando resistencia, confort y facilidad de uso en entornos industriales exigentes."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Fire-resistant leather boot covers, Class 2 EN ISO 11611, designed to protect feet and footwear from heat."'::jsonb,
    'it', '"Copri stivali in pelle ignifuga classe 2 EN ISO 11611, progettati per proteggere piedi e calzature da calore."'::jsonb,
    'fr', '"Couvre-bottes en cuir ignifuge classe 2 EN ISO 11611, conçus pour protéger les pieds et les chaussures de la chaleur."'::jsonb,
    'de', '"Stiefelüberzüge aus flammhemmendem Leder, Klasse 2 EN ISO 11611, entwickelt, um Füße und Schuhwerk vor Hitze zu schützen."'::jsonb,
    'es', '"Cubrebotas de cuero ignífugo clase 2 EN ISO 11611, diseñados para proteger los pies y el calzado del calor."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Accessories"'::jsonb,
    'it', '"Accessories"'::jsonb,
    'fr', '"Accessoires"'::jsonb,
    'de', '"Zubehör"'::jsonb,
    'es', '"Accesorios"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against sparks and molten metal", "Heat and flame resistance", "Extended coverage of foot and ankle", "Comfortable fit", "Secure fastening system (straps/buckles/Velcro)", "Soft material"]'::jsonb,
    'it', '["Protezione da scintille e metallo fuso", "Resistenza al calore e alla fiamma", "Copertura estesa piede + caviglia", "Vestibilità comoda", "Sistema di fissaggio (cinghie/fibbie/velcro)", "Materiale morbido"]'::jsonb,
    'fr', '["Protection contre les étincelles et les projections de métal en fusion", "Résistance à la chaleur et à la flamme", "Couverture étendue pied + cheville", "Ajustement confortable", "Système de fixation (sangles/boucles/velcro)", "Matériau souple"]'::jsonb,
    'de', '["Schutz vor Funken und geschmolzenem Metall", "Hitze- und Flammbeständigkeit", "Erweiterte Abdeckung von Fuß und Knöchel", "Bequeme Passform", "Befestigungssystem (Riemen/Schnallen/Klettverschluss)", "Weiches Material"]'::jsonb,
    'es', '["Protección contra chispas y metal fundido", "Resistencia al calor y a la llama", "Cobertura extendida de pie y tobillo", "Ajuste cómodo", "Sistema de fijación (correas/hebillas/velcro)", "Material suave"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Manual and industrial welding", "Thermal cutting", "Metal fabrication"]'::jsonb,
    'it', '["Saldatura manuale e industriale", "Taglio termico", "Carpenteria metallica"]'::jsonb,
    'fr', '["Soudage manuel et industriel", "Découpe thermique", "Charpente métallique"]'::jsonb,
    'de', '["Manuelles und industrielles Schweißen", "Thermisches Schneiden", "Metallbau"]'::jsonb,
    'es', '["Soldadura manual e industrial", "Corte térmico", "Carpintería metálica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metalworking Fabrication", "structural steelwork"]'::jsonb,
    'it', '["Metalmeccanico", "Carpenteria"]'::jsonb,
    'fr', '["Métallo-mécanique", "Charpente métallique"]'::jsonb,
    'de', '["Metallverarbeitende Industrie", "Stahlbau"]'::jsonb,
    'es', '["Metalmecánico", "Carpintería metálica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Copri stivali"]'::jsonb,
    'fr', '["Couvre-bottes"]'::jsonb,
    'de', '["Stiefelüberzieher"]'::jsonb,
    'es', '["Cubrebotas"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Pelle"]'::jsonb,
    'fr', '["Cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["Cuero"]'::jsonb
  )
WHERE id = '0ebff2ff-9980-489d-be6c-ba48631dc612';


-- products bls-zer030-c
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS Zer030 C"'::jsonb,
    'it', '"BLS Zer030 C"'::jsonb,
    'fr', '"BLS Zer030 C"'::jsonb,
    'de', '"BLS Zer030 C"'::jsonb,
    'es', '"BLS Zer030 C"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Category III FFP3 filtering facepiece respirator, designed to protect against dust, aerosols, and nanoparticles. It incorporates an activated carbon layer that helps reduce odors and low concentrations of organic or acidic vapors."'::jsonb,
    'it', '"Facciale filtrante FFP3 di categoria III, progettato per proteggere da polveri, aerosol e nanoparticelle. Integra uno strato di carboni attivi che consente la riduzione di odori e vapori organici o acidi a bassa concentrazione"'::jsonb,
    'fr', '"Masque filtrant FFP3 de catégorie III, conçu pour protéger contre les poussières, les aérosols et les nanoparticules. Il intègre une couche de charbon actif permettant de réduire les odeurs et les vapeurs organiques ou acides à faible concentration"'::jsonb,
    'de', '"FFP3-Filtermaske der Kategorie III, entwickelt, um vor Stäuben, Aerosolen und Nanopartikeln zu schützen. Sie enthält eine Aktivkohleschicht, die die Reduzierung von Gerüchen sowie organischen oder sauren Dämpfen in niedriger Konzentration ermöglicht"'::jsonb,
    'es', '"Mascarilla filtrante FFP3 de categoría III, diseñada para proteger frente a polvo, aerosoles y nanopartículas. Integra una capa de carbón activo que permite la reducción de olores y vapores orgánicos o ácidos en baja concentración"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"FFP3 filtering facepiece respirator with activated carbon"'::jsonb,
    'it', '"Facciale filtrante FFP3 con  carboni attivi"'::jsonb,
    'fr', '"Masque filtrant FFP3 avec charbon actif"'::jsonb,
    'de', '"FFP3-Filtermaske mit Aktivkohle"'::jsonb,
    'es', '"Mascarilla filtrante FFP3 con carbón activo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Disposable masks"'::jsonb,
    'it', '"Mascherine monouso"'::jsonb,
    'fr', '"Masques jetables"'::jsonb,
    'de', '"Einwegmasken"'::jsonb,
    'es', '"Mascarillas desechables"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Very low breathing resistance (comparable to an FFP1)", "Protective outer layer (Armor®) for complete protection", "High breathability", "Seal ensuring a perfect fit", "Advanced filtration", "Activated carbon filter"]'::jsonb,
    'it', '["Strato protettivo esterno (Armor®) per protezione completa", "Bassissima resistenza respiratoria (paragonabile ad un FFP1)", "Alta traspirabilità", "Barretta stringinaso interna morbida", "Filtro con carboni attivi", "Filtrazione avanzata"]'::jsonb,
    'fr', '["Couche de protection extérieure (Armor®) pour une protection complète", "Résistance respiratoire très faible (comparable à un FFP1)", "Haute respirabilité", "Barrette pince-nez interne souple", "Filtre avec charbon actif", "Filtration avancée"]'::jsonb,
    'de', '["Äußere Schutzschicht (Armor®) für vollständigen Schutz", "Sehr geringer Atemwiderstand (vergleichbar mit einer FFP1)", "Hohe Atmungsaktivität", "Weicher innenliegender Nasenbügel", "Filter mit Aktivkohle", "Fortschrittliche Filterung"]'::jsonb,
    'es', '["Capa protectora exterior (Armor®) para una protección completa", "Resistencia respiratoria muy baja (comparable a una FFP1)", "Alta transpirabilidad", "Barra pinza nasal interna blanda", "Filtro con carbón activo", "Filtración avanzada"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Painting", "Protection against welding fumes", "Maintenance and cleaning"]'::jsonb,
    'it', '["Verniciatura", "Protezione da fumi di saldatura", "Manutenzione e pulizia"]'::jsonb,
    'fr', '["Peinture", "Protection contre les fumées de soudage", "Entretien et nettoyage"]'::jsonb,
    'de', '["Lackieren", "Schutz vor Schweißrauch", "Wartung und Reinigung"]'::jsonb,
    'es', '["Pintura", "Protección contra los humos de soldadura", "Mantenimiento y limpieza"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Pharmaceutical", "research", "Construction", "Automotive", "Manufacturing", "Agriculture"]'::jsonb,
    'it', '["Farmaceutico", "ricerca", "edilizio", "automobilistico", "manufatturiero", "agricolo"]'::jsonb,
    'fr', '["Pharmaceutique", "recherche", "du bâtiment", "automobile", "manufacturier", "agricole"]'::jsonb,
    'de', '["Pharmazeutisch", "Forschung", "Bau-", "Automobilbranche", "verarbeitendes Gewerbe", "landwirtschaftlich"]'::jsonb,
    'es', '["Farmacéutico", "investigación", "de la construcción", "automotriz", "manufacturero", "agrícola"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["disposable mask", "FFP3"]'::jsonb,
    'it', '["mascherina monouso", "FFP3"]'::jsonb,
    'fr', '["masque jetable", "FFP3"]'::jsonb,
    'de', '["Einwegmaske", "FFP3"]'::jsonb,
    'es', '["mascarilla desechable", "FFP3"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
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
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '[" BLS Zer032 ", "BLS Zer030 ", "BLS Zer032 Active", "BLS Zer032 C Active"]'::jsonb
  )
WHERE id = 'b59c2bee-5a3d-4215-9a45-64a11ba6af4d';


-- products ap15
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"AP15"'::jsonb,
    'it', '"AP15"'::jsonb,
    'fr', '"AP15"'::jsonb,
    'de', '"AP15"'::jsonb,
    'es', '"AP15"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Split leather apron with para-aramid stitching, certified EN ISO 11611 Class 2. Designed to protect the chest and upper legs from heat, sparks, and molten metal, it features a quick-release buckle and adjustable straps."'::jsonb,
    'it', '"Grembiule in pelle crosta bovina con cuciture in para-aramide, certificato EN ISO 11611 Classe 2. Progettato per proteggere torace e parte superiore delle gambe da calore, scintille e metallo fuso, è dotato di fibbia a sgancio rapido, strap regolabili."'::jsonb,
    'fr', '"Tablier en croûte de cuir bovin avec coutures en para-aramide, certifié EN ISO 11611 Classe 2. Conçu pour protéger le torse et le haut des jambes contre la chaleur, les étincelles et le métal en fusion, il est équipé d''une boucle à déclenchement rapide et de sangles réglables."'::jsonb,
    'de', '"Schürze aus Rindspaltleder mit Nähten aus Para-Aramid, zertifiziert nach EN ISO 11611 Klasse 2. Sie wurde entwickelt, um Brust und Oberschenkel vor Hitze, Funken und geschmolzenem Metall zu schützen, und ist mit einer Schnellverschlussschnalle und verstellbaren Riemen ausgestattet."'::jsonb,
    'es', '"Delantal de cuero dividido de bovino con costuras de para-aramida, certificado según EN ISO 11611 Clase 2. Diseñado para proteger el torso y la parte superior de las piernas del calor, las chispas y el metal fundido, cuenta con una hebilla de liberación rápida y correas regulables."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Leather welding apron, Class 2 EN ISO 11611, designed to protect the chest and legs from heat and molten metal splashes."'::jsonb,
    'it', '"Grembiule da saldatura in pelle Classe 2 EN ISO 11611 che protegge torace e gambe da calore e schizzi di metallo fuso."'::jsonb,
    'fr', '"Tablier de soudage en cuir Classe 2 EN ISO 11611 protégeant le torse et les jambes contre la chaleur et les projections de métal en fusion."'::jsonb,
    'de', '"Schweißerschürze aus Leder, Klasse 2 EN ISO 11611, die Brust und Beine vor Hitze und Spritzern von geschmolzenem Metall schützt."'::jsonb,
    'es', '"Delantal de soldadura de cuero Clase 2 EN ISO 11611 que protege el torso y las piernas del calor y las salpicaduras de metal fundido."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welding Aprons"'::jsonb,
    'it', '"Grembiule da saldatura"'::jsonb,
    'fr', '"Tablier de soudage"'::jsonb,
    'de', '"Schweißerschürze"'::jsonb,
    'es', '"Delantal de soldadura"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Full torso protection", "High thermal resistance material", "Protection against heat and molten metal", "Protected closures and adjustable fittings", "Quick-release buckle", "Freedom of movement"]'::jsonb,
    'it', '["Protezione completa del busto", "Materiale ad alta resistenza termica", "Protezione da calore e metallo fuso", "Chiusure protette e regolazioni", "Fibia a sgancio rapido", "Libertà di movimento"]'::jsonb,
    'fr', '["Protection complète du buste", "Matériau à haute résistance thermique", "Protection contre la chaleur et le métal en fusion", "Fermetures protégées et réglages", "Boucle à déclenchement rapide", "Liberté de mouvement"]'::jsonb,
    'de', '["Vollständiger Schutz des Oberkörpers", "Material mit hoher Wärmebeständigkeit", "Schutz vor Hitze und geschmolzenem Metall", "Geschützte Verschlüsse und Einstellmöglichkeiten", "Schnellverschlussschnalle", "Bewegungsfreiheit"]'::jsonb,
    'es', '["Protección completa del torso", "Material de alta resistencia térmica", "Protección contra el calor y el metal fundido", "Cierres protegidos y ajustes", "Hebilla de liberación rápida", "Libertad de movimiento"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Manual and industrial welding", "Thermal cutting", "Metal fabrication"]'::jsonb,
    'it', '["Saldatura manuale e industriale", "Taglio termico", "Carpenteria metallica"]'::jsonb,
    'fr', '["Soudage manuel et industriel", "Découpe thermique", "Charpente métallique"]'::jsonb,
    'de', '["Manuelles und industrielles Schweißen", "Thermisches Schneiden", "Metallbau"]'::jsonb,
    'es', '["Soldadura manual e industrial", "Corte térmico", "Carpintería metálica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metalworking Fabrication", "structural steelwork"]'::jsonb,
    'it', '["Metalmeccanico", "Carpenteria"]'::jsonb,
    'fr', '["Métallo-mécanique", "Charpente métallique"]'::jsonb,
    'de', '["Metallverarbeitende Industrie", "Stahlbau"]'::jsonb,
    'es', '["Metalmecánico", "Carpintería metálica"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Pelle"]'::jsonb,
    'fr', '["Cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["Cuero"]'::jsonb
  )
WHERE id = '88d53177-f9ed-4b3f-a608-e1f3844cffd9';


-- products bls-2700-next
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 2700 next"'::jsonb,
    'it', '"BLS 2700 next"'::jsonb,
    'fr', '"BLS 2700 next"'::jsonb,
    'de', '"BLS 2700 next"'::jsonb,
    'es', '"BLS 2700 next"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"PAPR powered air system, designed to ensure maximum respiratory protection in highly contaminated environments. The motor draws air through P3 or combined filters (gas + particles) and delivers it to the user with a constant airflow."'::jsonb,
    'it', '"Sistema elettroventilato PAPR, progettato per garantire la massima protezione respiratoria in ambienti altamente contaminati. Il motore aspira l’aria attraverso filtri P3 o combinati (gas + particelle) e la fornisce all’utilizzatore con flusso costante"'::jsonb,
    'fr', '"Système à ventilation assistée PAPR, conçu pour garantir la protection respiratoire maximale dans des environnements fortement contaminés. Le moteur aspire l''air à travers des filtres P3 ou combinés (gaz + particules) et le fournit à l''utilisateur avec un débit constant"'::jsonb,
    'de', '"Gebläseunterstütztes PAPR-System, entwickelt, um maximalen Atemschutz in stark kontaminierten Umgebungen zu gewährleisten. Das Gebläse saugt die Luft durch P3- oder Kombinationsfilter (Gas + Partikel) an und liefert sie dem Anwender mit konstantem Luftstrom"'::jsonb,
    'es', '"Sistema de ventilación asistida PAPR, diseñado para garantizar la máxima protección respiratoria en entornos altamente contaminados. El motor aspira el aire a través de filtros P3 o combinados (gas + partículas) y lo suministra al usuario con un flujo constante"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full face mask, class TH3 P3, designed for full protection against dust and contaminants in high-risk industrial environments"'::jsonb,
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
    'en', '"Full Face Masks"'::jsonb,
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["TH3 protection ensuring optimal safety", "Forced airflow", "Active safety monitoring", "Option to use different types of filters", "Zero breathing resistance", "Continuous cooling airflow", "Ultra-lightweight and ergonomic design", "Long battery life"]'::jsonb,
    'it', '["Zero resistenza respiratoria", "Flusso continuo raffrescante", "Design ultraleggero ed ergonomico", "Elevata autonomia", "Protezione TH3 che garantisce una protezione ottimale", "Flusso d’aria forzato", "Monitoraggio attivo di sicurezza", "Possibilità di montaggio di differenti tipi di filtro"]'::jsonb,
    'fr', '["Résistance respiratoire nulle", "Flux continu rafraîchissant", "Design ultraléger et ergonomique", "Autonomie élevée", "Protection TH3 garantissant une protection optimale", "Flux d''air forcé", "Surveillance active de sécurité", "Possibilité de montage de différents types de filtres"]'::jsonb,
    'de', '["Kein Atemwiderstand", "Kontinuierlicher kühlender Luftstrom", "Ultraleichtes und ergonomisches Design", "Hohe Autonomie", "TH3-Schutz, der einen optimalen Schutz gewährleistet", "Erzwungener Luftstrom", "Aktive Sicherheitsüberwachung", "Möglichkeit zur Montage verschiedener Filtertypen"]'::jsonb,
    'es', '["Resistencia respiratoria nula", "Flujo continuo refrescante", "Diseño ultraligero y ergonómico", "Alta autonomía", "Protección TH3 que garantiza una protección óptima", "Flujo de aire forzado", "Monitorización activa de seguridad", "Posibilidad de montaje de diferentes tipos de filtro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against heavy welding fumes", "Chemical and petrochemical industry", "Heavy industrial maintenance and cleaning"]'::jsonb,
    'it', '["Bonifiche e amianto", "Industria pesante e polveri", "Saldatura e lavorazioni", "Industria chimica / farmaceutica"]'::jsonb,
    'fr', '["Décontamination et amiante", "Industrie lourde et poussières", "Soudage et travaux", "Industrie chimique / pharmaceutique"]'::jsonb,
    'de', '["Sanierung und Asbest", "Schwerindustrie und Staub", "Schweißen und Bearbeitung", "Chemische / pharmazeutische Industrie"]'::jsonb,
    'es', '["Descontaminación y amianto", "Industria pesada y polvo", "Soldadura y trabajos", "Industria química / farmacéutica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/Spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Casco con respiratore"]'::jsonb,
    'fr', '["Casque avec respirateur"]'::jsonb,
    'de', '["Helm mit Atemschutzgerät"]'::jsonb,
    'es', '["Casco con respirador"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = '7147fbaa-1d20-4e40-b44d-ccd37a86ce8c';


-- products bls-8100
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 8100"'::jsonb,
    'it', '"BLS 8100"'::jsonb,
    'fr', '"BLS 8100"'::jsonb,
    'de', '"BLS 8100"'::jsonb,
    'es', '"BLS 8100"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half mask with integrated filters, designed to provide combined protection against gases, organic vapors, and particulate matter. The activated carbon system and dual-filter design ensure high efficiency and low breathing resistance."'::jsonb,
    'it', '"Semimaschera con filtri integrati, progettata per offrire protezione combinata contro gas, vapori organici e particolato. Il sistema con carboni attivi e doppio filtro garantisce elevata efficienza e bassa resistenza respiratoria"'::jsonb,
    'fr', '"Demi-masque avec filtres intégrés, conçu pour offrir une protection combinée contre les gaz, les vapeurs organiques et les particules. Le système à charbon actif et double filtre garantit une efficacité élevée et une faible résistance respiratoire"'::jsonb,
    'de', '"Halbmaske mit integrierten Filtern, entwickelt, um kombinierten Schutz vor Gasen, organischen Dämpfen und Partikeln zu bieten. Das System mit Aktivkohle und Doppelfilter gewährleistet hohe Effizienz und geringen Atemwiderstand"'::jsonb,
    'es', '"Semimáscara con filtros integrados, diseñada para ofrecer protección combinada contra gases, vapores orgánicos y partículas. El sistema con carbón activo y doble filtro garantiza alta eficiencia y baja resistencia respiratoria"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dual-filter half mask with integrated A1P2 filters"'::jsonb,
    'it', '"Semimaschera bifiltro con filtri integrati A1P2"'::jsonb,
    'fr', '"Demi-masque bifiltre avec filtres intégrés A1P2"'::jsonb,
    'de', '"Doppelfilter-Halbmaske mit integrierten A1P2-Filtern"'::jsonb,
    'es', '"Semimáscara de doble filtro con filtros integrados A1P2"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half masks"'::jsonb,
    'it', '"Half masks"'::jsonb,
    'fr', '"Demi-masques"'::jsonb,
    'de', '"Halbmasken"'::jsonb,
    'es', '"Semimáscaras"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN405: A1P2 R D", "Combined gas and particle protection", "Integrated filters with activated carbon", "Protective micro-mesh", "“Ready-to-use” design for zero maintenance", "Hypoallergenic elastomer", "Balanced dual-filter system for optimal weight distribution", "Drop-off system to lower the mask without removing it"]'::jsonb,
    'it', '["Protezione combinata gas e particelle", "Filtri integrati con carboni attivi", "Microrete protettiva", "Design “ready to use” per zero manutenzione", "Elastomero ipoallergenico", "Bifiltro bilanciato per un ottima distribuzione dei pesi", "Sistema Drop‑off per abbassare la maschera senza toglierla"]'::jsonb,
    'fr', '["Protection combinée contre les gaz et les particules", "Filtres intégrés au charbon actif", "Micro-grille de protection", "Design « prêt à l''emploi » pour une maintenance nulle", "Élastomère hypoallergénique", "Double filtre équilibré pour une excellente répartition du poids", "Système Drop‑off pour abaisser le masque sans l''enlever"]'::jsonb,
    'de', '["Kombinierter Schutz vor Gas und Partikeln", "Integrierte Aktivkohlefilter", "Schutz-Mikronetz", "„Ready-to-use“-Design für null Wartungsaufwand", "Hypoallergenes Elastomer", "Ausgeglichenes Doppelfiltersystem für eine ausgezeichnete Gewichtsverteilung", "Drop‑off-System zum Absenken der Maske, ohne sie abzunehmen"]'::jsonb,
    'es', '["Protección combinada frente a gases y partículas", "Filtros integrados con carbón activo", "Microrred protectora", "Diseño «listo para usar» para cero mantenimiento", "Elastómero hipoalergénico", "Doble filtro equilibrado para una excelente distribución del peso", "Sistema Drop‑off para bajar la máscara sin quitársela"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Painting", "Maintenance and cleaning with solvents"]'::jsonb,
    'it', '["Verniciatura", "Manutenzione e pulizia con solventi"]'::jsonb,
    'fr', '["Peinture", "Entretien et nettoyage avec des solvants"]'::jsonb,
    'de', '["Lackieren", "Wartung und Reinigung mit Lösungsmitteln"]'::jsonb,
    'es', '["Pintura", "Mantenimiento y limpieza con disolventes"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Semimaschera bifiltro con filtri integrati"]'::jsonb,
    'fr', '["Demi-masque bifiltre avec filtres intégrés"]'::jsonb,
    'de', '["Zweifilter-Halbmaske mit integrierten Filtern"]'::jsonb,
    'es', '["Semimáscara de dos filtros con filtros integrados"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Universal"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone, Polycarbonate (PC), Other"]'::jsonb,
    'it', '["Silicone, policarbonato (PC), altri"]'::jsonb,
    'fr', '["Silicone, polycarbonate (PC), autres"]'::jsonb,
    'de', '["Silikon, Polycarbonat (PC), andere"]'::jsonb,
    'es', '["Silicona, policarbonato (PC), otros"]'::jsonb
  )
WHERE id = '9b8608fb-9546-4df7-8650-6c0e2428ef5b';


-- products bls-401
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 401"'::jsonb,
    'it', '"BLS 401"'::jsonb,
    'fr', '"BLS 401"'::jsonb,
    'de', '"BLS 401"'::jsonb,
    'es', '"BLS 401"'::jsonb
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
    'en', '["Non deformable ABS filter canister allows control over the compression of the activated carbons within", "Dust filtering efficiency 99.99%"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile permette di controllare la compressione dei carboni attivi al suo interno", "Efficienza di filtrazione delle polveri 99,99%"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable permet de contrôler la compression du charbon actif à l''intérieur", "Efficacité de filtration des poussières de 99,99%"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS ermöglicht die Kontrolle der Verdichtung der darin enthaltenen Aktivkohle", "Filterleistung für Staub von 99,99%"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable permite controlar la compresión del carbón activo en su interior", "Eficiencia de filtración de partículas del 99,99%"]'::jsonb
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
WHERE id = '02fc33fd-c712-45f8-9de0-a2ef41b6a522';


-- products bls-8400next-abek1-p3
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 8400next ABEK1 P3"'::jsonb,
    'it', '"BLS 8400next ABEK1 P3"'::jsonb,
    'fr', '"BLS 8400next ABEK1 P3"'::jsonb,
    'de', '"BLS 8400next ABEK1 P3"'::jsonb,
    'es', '"BLS 8400next ABEK1 P3"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Maintenance-free filtering half mask, designed to provide complete protection against organic, inorganic, acidic gases, ammonia, and high-efficiency particulate matter"'::jsonb,
    'it', '"Semimaschera filtrante senza manutenzione, progettata per offrire protezione completa contro gas organici, inorganici, acidi, ammoniaca e particolato ad alta efficienza"'::jsonb,
    'fr', '"Demi-masque filtrant sans entretien, conçu pour offrir une protection complète contre les gaz organiques, inorganiques, acides, l''ammoniac et les particules à haute efficacité"'::jsonb,
    'de', '"Wartungsfreie Halbmaske, entwickelt, um vollständigen Schutz vor organischen, anorganischen und sauren Gasen, Ammoniak sowie Partikeln mit hoher Effizienz zu bieten"'::jsonb,
    'es', '"Semimáscara filtrante sin mantenimiento, diseñada para ofrecer protección completa frente a gases orgánicos, inorgánicos, ácidos, amoníaco y partículas de alta eficiencia"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half mask with integrated ABEK1 P3 filters"'::jsonb,
    'it', '"Semimaschera con filtri ABEK1 P3 integrati"'::jsonb,
    'fr', '"Demi-masque avec filtres ABEK1 P3 intégrés"'::jsonb,
    'de', '"Halbmaske mit integrierten ABEK1-P3-Filtern"'::jsonb,
    'es', '"Semimáscara con filtros ABEK1 P3 integrados"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half masks"'::jsonb,
    'it', '"semimaschere facciali"'::jsonb,
    'fr', '"demi-masques faciaux"'::jsonb,
    'de', '"Halbmasken"'::jsonb,
    'es', '"semimáscaras faciales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Integrated filters with activated carbon", "Protective micro-mesh", "“Ready-to-use” design for zero maintenance", "Hypoallergenic elastomer", "Balanced dual-filter system for optimal weight distribution", "Drop-off system to lower the mask without removing it", "Integrated combined filters", "Presence of activated carbon", "Advanced P3 filtration", "EN405:ABEK1 + P3"]'::jsonb,
    'it', '["Filtri combinati integrati", "Presenza di carboni attivi", "Filtrazione P3 avanzata", "Elastomero ipoallergenico", "Bifiltro bilanciato per un ottima distribuzione dei pesi", "Sistema Drop‑off per abbassare la maschera senza toglierla"]'::jsonb,
    'fr', '["Filtres combinés intégrés", "Présence de charbon actif", "Filtration P3 avancée", "Élastomère hypoallergénique", "Double filtre équilibré pour une excellente répartition du poids", "Système Drop‑off pour abaisser le masque sans l''enlever"]'::jsonb,
    'de', '["Integrierte Kombinationsfilter", "Vorhandensein von Aktivkohle", "Fortschrittliche P3-Filtration", "Hypoallergenes Elastomer", "Ausgeglichenes Doppelfiltersystem für eine ausgezeichnete Gewichtsverteilung", "Drop‑off-System zum Absenken der Maske, ohne sie abzunehmen"]'::jsonb,
    'es', '["Filtros combinados integrados", "Presencia de carbón activo", "Filtración P3 avanzada", "Elastómero hipoalergénico", "Doble filtro equilibrado para una excelente distribución del peso", "Sistema Drop‑off para bajar la máscara sin quitársela"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Painting", "Maintenance and cleaning with solvents", "Agriculture with pesticides"]'::jsonb,
    'it', '["Verniciatura", "Manutenzione e pulizia con solventi", "Agricoltura con pesticidi"]'::jsonb,
    'fr', '["Peinture", "Entretien et nettoyage avec des solvants", "Agriculture avec pesticides"]'::jsonb,
    'de', '["Lackieren", "Wartung und Reinigung mit Lösungsmitteln", "Landwirtschaft mit Pestiziden"]'::jsonb,
    'es', '["Pintura", "Mantenimiento y limpieza con disolventes", "Agricultura con pesticidas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Semimaschera bifiltro con filtri integrati"]'::jsonb,
    'fr', '["Demi-masque bifiltre avec filtres intégrés"]'::jsonb,
    'de', '["Zweifilter-Halbmaske mit integrierten Filtern"]'::jsonb,
    'es', '["Semimáscara de dos filtros con filtros integrados"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone, Polycarbonate (PC), Other"]'::jsonb,
    'it', '["Silicone, policarbonato (PC), altri"]'::jsonb,
    'fr', '["Silicone, polycarbonate (PC), autres"]'::jsonb,
    'de', '["Silikon, Polycarbonat (PC), andere"]'::jsonb,
    'es', '["Silicona, policarbonato (PC), otros"]'::jsonb
  )
WHERE id = '145ab845-f8fb-46c8-8a57-84c0eefdde85';


-- products bls-4500
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 4500"'::jsonb,
    'it', '"BLS 4500"'::jsonb,
    'fr', '"BLS 4500"'::jsonb,
    'de', '"BLS 4500"'::jsonb,
    'es', '"BLS 4500"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Reusable half mask designed to provide professional protection in high-risk environments. Equipped with a B‑Lock bayonet connection, it is compatible with a wide range of BLS filters (dust, gas, and combined), allowing a customized configuration based on the risk."'::jsonb,
    'it', '"Semimaschera riutilizzabile progettata per offrire protezione professionale in ambienti a rischio. Dotata di attacco a baionetta B‑Lock, è compatibile con un’ampia gamma di filtri BLS (polveri, gas e combinati), permettendo una configurazione personalizzata in base al rischio."'::jsonb,
    'fr', '"Demi-masque réutilisable conçu pour offrir une protection professionnelle dans les environnements à risque. Équipé d''un raccord à baïonnette B-Lock, il est compatible avec une large gamme de filtres BLS (poussières, gaz et combinés), permettant une configuration personnalisée selon le risque."'::jsonb,
    'de', '"Wiederverwendbare Halbmaske, konzipiert für professionellen Schutz in Risikoumgebungen. Dank des B-Lock-Bajonettanschlusses ist sie mit einer breiten Palette von BLS-Filtern (Partikel, Gas und Kombifilter) kompatibel und ermöglicht eine risikogerechte, individuelle Konfiguration."'::jsonb,
    'es', '"Semimáscara reutilizable diseñada para ofrecer protección profesional en entornos de riesgo. Equipada con conexión de bayoneta B-Lock, es compatible con una amplia gama de filtros BLS (partículas, gases y combinados), permitiendo una configuración personalizada según el riesgo."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Reusable silicone half mask"'::jsonb,
    'it', '"Semimaschera riutilizzabile in silicone"'::jsonb,
    'fr', '"Demi-masque réutilisable en silicone"'::jsonb,
    'de', '"Wiederverwendbare Halbmaske aus Silikon"'::jsonb,
    'es', '"Semimáscara reutilizable de silicona"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half masks"'::jsonb,
    'it', '"semimaschere facciali"'::jsonb,
    'fr', '"demi-masques faciaux"'::jsonb,
    'de', '"Halbmasken"'::jsonb,
    'es', '"semimáscaras faciales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent fit", "Quick filter removal", "Advanced P3 filtration", "Hypoallergenic elastomer", "Balanced dual-filter system for optimal weight distribution", "Drop-off system to lower the mask without removing it", "Compatible with eyewear"]'::jsonb,
    'it', '["Ottima aderenza", "Smontaggio rapido dei filtri", "Bardatura regolabile", "Elastomero ipoallergenico", "Bifiltro bilanciato per un ottima distribuzione dei pesi", "Sistema Drop‑off per abbassare la maschera senza toglierla"]'::jsonb,
    'fr', '["Excellente adhérence", "Démontage rapide des filtres", "Harnais réglable", "Élastomère hypoallergénique", "Double filtre équilibré pour une excellente répartition du poids", "Système Drop‑off pour abaisser le masque sans l''enlever"]'::jsonb,
    'de', '["Ausgezeichnete Griffigkeit", "Schnelle Demontage der Filter", "Verstellbares Kopfband", "Hypoallergenes Elastomer", "Ausgeglichenes Doppelfiltersystem für eine ausgezeichnete Gewichtsverteilung", "Drop‑off-System zum Absenken der Maske, ohne sie abzunehmen"]'::jsonb,
    'es', '["Excelente adherencia", "Desmontaje rápido de los filtros", "Arnés ajustable", "Elastómero hipoalergénico", "Doble filtro equilibrado para una excelente distribución del peso", "Sistema Drop‑off para bajar la máscara sin quitársela"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Painting", "Maintenance and cleaning with solvents", "Agriculture with pesticides"]'::jsonb,
    'it', '["Verniciatura", "Manutenzione e pulizia con solventi", "Agricoltura con pesticidi", "Protezione da fumi di saldatura"]'::jsonb,
    'fr', '["Peinture", "Entretien et nettoyage avec des solvants", "Agriculture avec pesticides", "Protection contre les fumées de soudage"]'::jsonb,
    'de', '["Lackieren", "Wartung und Reinigung mit Lösungsmitteln", "Landwirtschaft mit Pestiziden", "Schutz vor Schweißrauch"]'::jsonb,
    'es', '["Pintura", "Mantenimiento y limpieza con disolventes", "Agricultura con pesticidas", "Protección contra los humos de soldadura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Reusable half mask with replaceable filters"]'::jsonb,
    'it', '["Semimaschera riutilizzabile con filtri intercambiabili"]'::jsonb,
    'fr', '["Demi-masque réutilisable avec filtres interchangeables"]'::jsonb,
    'de', '["Wiederverwendbare Halbmaske mit auswechselbaren Filtern"]'::jsonb,
    'es', '["Semimáscara reutilizable con filtros intercambiables"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Polycarbonate (PC)", "Silicone", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = 'dce44783-0074-453a-bac5-1ffb0b2fe902';


-- products 152-12-juta
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/12 JUTA"'::jsonb,
    'it', '"152/12 JUTA"'::jsonb,
    'fr', '"152/12 JUTA"'::jsonb,
    'de', '"152/12 JUTA"'::jsonb,
    'es', '"152/12 JUTA"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-grip cotton & jute thermal glove, ideal for handling hot molds up to 350°C in glass, steel & plastic foundries. \n12 oz cotton with double-knit palm brushed inside/outside and jute insert for increased contact-heat resistance. 15 cm adjustable cuff."'::jsonb,
    'it', '"\"Guanto termico in cotone e Juta ad alta presa – Ideale per la movimentazione degli stampi caldi fino a 350°C nell''industria del vetro, dell''acciaio e nelle fusioni della plastica. \nGuanto in cotone 12 oz con palmo doppio garzato interno/esterno e inserto in juta per elevata tenuta alla temperatura da contatto. \nManichetta da 15cm (adattabile).\""'::jsonb,
    'fr', '"\"Gant thermique en coton et jute à haute adhérence – Idéal pour la manipulation de moules chauds jusqu''à 350 °C dans l''industrie du verre, de l''acier et dans le moulage du plastique. \nGant en coton 12 oz avec paume doublée grattée intérieur/extérieur et insert en jute pour une excellente résistance à la chaleur de contact. \nManchette de 15 cm (ajustable).\""'::jsonb,
    'de', '"\"Hitzeschutzhandschuh aus Baumwolle und Jute mit hohem Grip – Ideal für das Handhaben heißer Formen bis 350 °C in der Glasindustrie, der Stahlindustrie und beim Kunststoffgießen. \nHandschuh aus Baumwolle 12 oz mit innen/außen aufgerauter Doppelpalme und Juteeinsatz für hohe Kontakthitzebeständigkeit. \nStulpe 15 cm (anpassbar).\""'::jsonb,
    'es', '"\"Guante térmico de algodón y yute de alto agarre – Ideal para la manipulación de moldes calientes hasta 350 °C en la industria del vidrio, del acero y en la fundición de plástico. \nGuante de algodón 12 oz con palma doble afelpada interior/exterior e inserto de yute para una elevada resistencia al calor de contacto. \nManguito de 15 cm (adaptable).\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"12 oz cotton glove with double-layer palm and jute insert"'::jsonb,
    'it', '"Guanto in cotone 12 oz con palmo doppio e inserto in juta."'::jsonb,
    'fr', '"Gant en coton 12 oz avec paume double et insert en jute."'::jsonb,
    'de', '"Handschuh aus Baumwolle 12 oz mit Doppelpalme und Juteeinsatz."'::jsonb,
    'es', '"Guante de algodón 12 oz con palma doble e inserto de yute."'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Jute layer raised contact heat temperature protection over 350°C retaining high manoeuvrability and comfort", "Great protection in high temperature environment, against contact, radiant and convective heat", "Reinforced leather seams between palm & thumb", "Excellent tear resistance"]'::jsonb,
    'it', '["Strato in juta aggiuntivo che garantisce protezione termica da contatto oltre i 350 °C mantenendo elevata manovrabilità e comfort", "Ottima protezione in ambienti ad alta temperatura, contro calore da contatto, radiante e convettivo", "Cuciture rinforzate in pelle tra palmo e pollice", "Resistenza alle sollecitazioni meccaniche"]'::jsonb,
    'fr', '["Couche supplémentaire en jute garantissant une protection thermique de contact au-delà de 350 °C tout en conservant une grande maniabilité et un excellent confort", "Excellente protection dans les environnements à haute température, contre la chaleur de contact, radiante et convective", "Coutures renforcées en cuir entre la paume et le pouce", "Résistance aux contraintes mécaniques"]'::jsonb,
    'de', '["Zusätzliche Jute-Schicht, die thermischen Kontaktschutz über 350 °C hinaus gewährleistet und dabei hohe Beweglichkeit und Komfort bietet", "Hervorragender Schutz in Umgebungen mit hoher Temperatur gegen Kontakt-, Strahlungs- und Konvektionshitze", "Verstärkte Nähte aus Leder zwischen Handfläche und Daumen", "Beständigkeit gegen mechanische Beanspruchung"]'::jsonb,
    'es', '["Capa adicional de yute que garantiza protección térmica de contacto por encima de 350 °C manteniendo una elevada manejabilidad y comodidad", "Excelente protección en entornos de alta temperatura, frente al calor de contacto, radiante y convectivo", "Costuras reforzadas de cuero entre la palma y el pulgar", "Resistencia a los esfuerzos mecánicos"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass industry: handling hot objects up to 350 °C", "Glassworks, mold shops & hot-plastic operations", "Ceramic processing"]'::jsonb,
    'it', '["Industria del vetro: manipolazione oggetti caldi fino a 350°C", "Vetrerie, stamperie e operazioni con materiale plastico a caldo", "Lavorazioni ceramiche"]'::jsonb,
    'fr', '["Industrie du verre : manipulation d''objets chauds jusqu''à 350 °C", "Verreries, ateliers d''estampage et opérations avec du plastique chaud", "Travaux céramiques"]'::jsonb,
    'de', '["Glasindustrie: Handhabung heißer Objekte bis 350 °C", "Glashütten, Stanzereien und Arbeiten mit heißem Kunststoff", "Keramikverarbeitung"]'::jsonb,
    'es', '["Industria del vidrio: manipulación de objetos calientes hasta 350 °C", "Vidrierías, talleres de estampación y operaciones con plástico caliente", "Trabajos cerámicos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glassworks", "Plastics", "Ceramics"]'::jsonb,
    'it', '["Vetreria", "Plastica", "Ceramica"]'::jsonb,
    'fr', '["Verrerie", "Plastique", "Céramique"]'::jsonb,
    'de', '["Glasproduktion", "Kunststoff", "Keramik"]'::jsonb,
    'es', '["Vidriería", "Plástico", "Cerámica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "350 °C", "dexterity"]'::jsonb,
    'it', '["anticalore", "350C", "destrezza"]'::jsonb,
    'fr', '["anti-chaleur", "350 °C", "dextérité"]'::jsonb,
    'de', '["hitzebeständig", "350 °C", "Fingerfertigkeit"]'::jsonb,
    'es', '["resistente al calor", "350 °C", "destreza"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton", "jute"]'::jsonb,
    'it', '["cotone", "juta"]'::jsonb,
    'fr', '["coton", "jute"]'::jsonb,
    'de', '["Baumwolle", "Jute"]'::jsonb,
    'es', '["algodón", "yute"]'::jsonb
  )
WHERE id = '642f4370-35d8-4ac7-83c6-a1bb71463d19';


-- products bls-4400-abek1-p3
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 4400 ABEK1 P3"'::jsonb,
    'it', '"BLS 4400 ABEK1 P3"'::jsonb,
    'fr', '"BLS 4400 ABEK1 P3"'::jsonb,
    'de', '"BLS 4400 ABEK1 P3"'::jsonb,
    'es', '"BLS 4400 ABEK1 P3"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Reusable half mask certified to EN 140, supplied as a ready-to-use kit with combined ABEK1P3 filters. Thanks to the B‑Lock bayonet system, the filters can be replaced quickly."'::jsonb,
    'it', '"Semimaschera riutilizzabile certificata EN 140, fornita in kit pronto all’uso con filtri combinati ABEK1P3. Grazie al sistema a baionetta B‑Lock è possibile sostituire rapidamente i filtri"'::jsonb,
    'fr', '"Demi-masque réutilisable certifié EN 140, fourni en kit prêt à l''emploi avec filtres combinés ABEK1P3. Grâce au système à baïonnette B-Lock, il est possible de remplacer rapidement les filtres"'::jsonb,
    'de', '"Wiederverwendbare Halbmaske gemäß EN 140 zertifiziert, geliefert als gebrauchsfertiges Set mit Kombifiltern ABEK1P3. Dank des B-Lock-Bajonettsystems können die Filter schnell ausgetauscht werden"'::jsonb,
    'es', '"Semimáscara reutilizable certificada según EN 140, suministrada en kit listo para usar con filtros combinados ABEK1P3. Gracias al sistema de bayoneta B-Lock, los filtros pueden sustituirse rápidamente"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Reusable half mask with ABEK1 P3 filters"'::jsonb,
    'it', '"Semimaschera riutilizzabile con ki filtri ABEK1 P3"'::jsonb,
    'fr', '"Demi-masque réutilisable avec kit de filtres ABEK1 P3"'::jsonb,
    'de', '"Wiederverwendbare Halbmaske mit Filterset ABEK1 P3"'::jsonb,
    'es', '"Semimáscara reutilizable con kit de filtros ABEK1 P3"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half masks"'::jsonb,
    'it', '"semimaschere facciali"'::jsonb,
    'fr', '"demi-masques faciaux"'::jsonb,
    'de', '"Halbmasken"'::jsonb,
    'es', '"semimáscaras faciales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent fit", "Quick filter removal", "Advanced P3 filtration", "Hypoallergenic elastomer", "Balanced dual-filter system for optimal weight distribution", "Drop-off system to lower the mask without removing it", "Compatible with eyewear", "EN405: ABEK1 + P3"]'::jsonb,
    'it', '["Ottima aderenza", "Smontaggio rapido dei filtri", "Filtrazione P3 avanzata", "Elastomero ipoallergenico", "Bifiltro bilanciato per un ottima distribuzione dei pesi", "Sistema Drop‑off per abbassare la maschera senza toglierla", "Compatibile con occhiali"]'::jsonb,
    'fr', '["Excellente adhérence", "Démontage rapide des filtres", "Filtration P3 avancée", "Élastomère hypoallergénique", "Double filtre équilibré pour une excellente répartition du poids", "Système Drop‑off pour abaisser le masque sans l''enlever", "Compatible avec les lunettes"]'::jsonb,
    'de', '["Ausgezeichnete Griffigkeit", "Schnelle Demontage der Filter", "Fortschrittliche P3-Filtration", "Hypoallergenes Elastomer", "Ausgeglichenes Doppelfiltersystem für eine ausgezeichnete Gewichtsverteilung", "Drop‑off-System zum Absenken der Maske, ohne sie abzunehmen", "Kompatibel mit Brillen"]'::jsonb,
    'es', '["Excelente adherencia", "Desmontaje rápido de los filtros", "Filtración P3 avanzada", "Elastómero hipoalergénico", "Doble filtro equilibrado para una excelente distribución del peso", "Sistema Drop‑off para bajar la máscara sin quitársela", "Compatible con gafas"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Painting", "Maintenance and cleaning with solvents", "Agriculture with pesticides"]'::jsonb,
    'it', '["Verniciatura", "Manutenzione e pulizia con solventi", "Agricoltura con pesticidi"]'::jsonb,
    'fr', '["Peinture", "Entretien et nettoyage avec des solvants", "Agriculture avec pesticides"]'::jsonb,
    'de', '["Lackieren", "Wartung und Reinigung mit Lösungsmitteln", "Landwirtschaft mit Pestiziden"]'::jsonb,
    'es', '["Pintura", "Mantenimiento y limpieza con disolventes", "Agricultura con pesticidas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Chemical manufacturing", "paint/spraying", "metal working", "welding", "pharma"]'::jsonb,
    'it', '["Produzione chimica", "verniciatura/spruzzatura", "lavorazione dei metalli", "saldatura", "industria farmaceutica"]'::jsonb,
    'fr', '["Production chimique", "peinture/pulvérisation", "travail des métaux", "soudage", "industrie pharmaceutique"]'::jsonb,
    'de', '["Chemische Produktion", "Lackieren/Spritzen", "Metallverarbeitung", "Schweißen", "pharmazeutische Industrie"]'::jsonb,
    'es', '["Producción química", "pintura/pulverización", "trabajo de metales", "soldadura", "industria farmacéutica"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Reusable half mask with replaceable filters"]'::jsonb,
    'it', '["Semimaschera riutilizzabile con filtri intercambiabili"]'::jsonb,
    'fr', '["Demi-masque réutilisable avec filtres interchangeables"]'::jsonb,
    'de', '["Wiederverwendbare Halbmaske mit auswechselbaren Filtern"]'::jsonb,
    'es', '["Semimáscara reutilizable con filtros intercambiables"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = 'cb04fa6c-500d-4d38-aa68-beb1b11f7788';


-- products cleanspace-work
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"CLEANSPACE WORK"'::jsonb,
    'it', '"CLEANSPACE WORK"'::jsonb,
    'fr', '"CLEANSPACE WORK"'::jsonb,
    'de', '"CLEANSPACE WORK"'::jsonb,
    'es', '"CLEANSPACE WORK"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ultralight respirator with TM3 P3 filtration, suitable for protection against dust and airborne particulate matter"'::jsonb,
    'it', '"Respiratore ultraleggero con filtrazione TM3 P3, adatta per la protezione da polveri e particolato aerodisperso"'::jsonb,
    'fr', '"Respirateur ultraléger avec filtration TM3 P3, adapté à la protection contre les poussières et les particules en suspension dans l''air"'::jsonb,
    'de', '"Ultraleichtes Atemschutzgerät mit TM3-P3-Filterung, geeignet zum Schutz vor Staub und luftgetragenen Partikeln"'::jsonb,
    'es', '"Respirador ultraligero con filtración TM3 P3, adecuado para la protección frente a polvo y partículas en suspensión"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Ultralight respirator"'::jsonb,
    'it', '"Respiratore ultraleggero"'::jsonb,
    'fr', '"Respirateur ultraléger"'::jsonb,
    'de', '"Ultraleichtes Atemschutzgerät"'::jsonb,
    'es', '"Respirador ultraligero"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Maintains positive pressure inside the mask", "Reduces the risk of contaminant ingress even in the event of small leaks", "Filters with efficiency up to 99.97%", "Audible alarms to indicate low battery and airflow issues", "Automatically adjusts airflow based on breathing", "Ensures consistent protection and comfort, preventing under-protection", "Very lightweight (approx. <350 g)", "Reduces fatigue during prolonged use"]'::jsonb,
    'it', '["Mantiene una pressione positiva nella maschera", "Riduce il rischio di ingresso di contaminanti anche in caso di piccole perdite", "Filtri con efficienza fino al 99,97%", "Regola automaticamente il flusso d’aria in base alla respirazione", "Garantisce protezione costante e comfort, evitando sottoprotezione", "Peso molto ridotto (circa <350 g)", "Riduce affaticamento durante l’uso prolungato"]'::jsonb,
    'fr', '["Maintient une pression positive dans le masque", "Réduit le risque d''entrée de contaminants même en cas de petites fuites", "Filtres avec une efficacité allant jusqu''à 99,97%", "Régule automatiquement le débit d''air en fonction de la respiration", "Garantit une protection constante et un confort optimal, évitant toute sous-protection", "Poids très réduit (environ <350 g)", "Réduit la fatigue lors d''une utilisation prolongée"]'::jsonb,
    'de', '["Hält einen Überdruck in der Maske aufrecht", "Verringert das Risiko des Eindringens von Schadstoffen auch bei kleinen Undichtigkeiten", "Filter mit einer Effizienz von bis zu 99,97%", "Reguliert den Luftstrom automatisch entsprechend der Atmung", "Gewährleistet gleichbleibenden Schutz und Komfort und verhindert eine Unterversorgung mit Schutz", "Sehr geringes Gewicht (ca. <350 g)", "Reduziert Ermüdung bei längerem Gebrauch"]'::jsonb,
    'es', '["Mantiene una presión positiva en la máscara", "Reduce el riesgo de entrada de contaminantes incluso en caso de pequeñas fugas", "Filtros con una eficiencia de hasta el 99,97%", "Regula automáticamente el flujo de aire según la respiración", "Garantiza una protección constante y comodidad, evitando la subprotección", "Peso muy reducido (aprox. <350 g)", "Reduce la fatiga durante el uso prolongado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction and cement processing", "Wood processing", "Maintenance and industrial cleaning", "Agriculture"]'::jsonb,
    'it', '["Edilizia e lavorazione cemento", "Lavorazione del legno", "Manutenzione e pulizie industriali", "Agricoltura"]'::jsonb,
    'fr', '["Construction et travail du ciment", "Travail du bois", "Maintenance et nettoyage industriel", "Agriculture"]'::jsonb,
    'de', '["Bauwesen und Zementverarbeitung", "Holzbearbeitung", "Wartung und industrielle Reinigung", "Landwirtschaft"]'::jsonb,
    'es', '["Construcción y trabajo del cemento", "Trabajo de la madera", "Mantenimiento y limpieza industrial", "Agricultura"]'::jsonb
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
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = '61b81f45-e355-4a17-b9ec-f40452d94aaa';


-- products 152-12sgml
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/12SGML"'::jsonb,
    'it', '"152/12SGML"'::jsonb,
    'fr', '"152/12SGML"'::jsonb,
    'de', '"152/12SGML"'::jsonb,
    'es', '"152/12SGML"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Five-finger 100% cotton 12 oz glove with double-knit palm brushed inside/outside, double jersey back and with full knuckle guard.\n15 cm adjustable cuff."'::jsonb,
    'it', '"\"Guanto a cinque dita in 100% cotone 12 oz con palmo doppio garzato interno/esterno, dorso jersey doppio con paranocche.\nManichetta da 15cm (adattabile).\""'::jsonb,
    'fr', '"\"Gant à cinq doigts en coton 100 % 12 oz avec paume double grattée intérieur/extérieur, dos en jersey double avec protège-jointures.\nManchette de 15 cm (ajustable).\""'::jsonb,
    'de', '"\"Fünffingerhandschuh aus 100 % Baumwolle 12 oz mit innen/außen aufgerauter Doppelpalme, doppeltem Jersey-Rücken mit Knöchelschutz.\nStulpe 15 cm (anpassbar).\""'::jsonb,
    'es', '"\"Guante de cinco dedos de algodón 100 % 12 oz con palma doble afelpada interior/exterior, dorso de punto doble con protección de nudillos.\nManguito de 15 cm (adaptable).\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove (250 °C) in 12 oz cotton, double knit inside/outside, double-jersey cotton back and full knuckle guard"'::jsonb,
    'it', '"Guanto anticalore (250C) in cotone 12 oz, doppio garzato interno/esterno, doppio tessuto in jersey di cotone sul dorso e paranocche"'::jsonb,
    'fr', '"Gant anti-chaleur (250 °C) en coton 12 oz, double grattage intérieur/extérieur, double tissu en jersey de coton sur le dos et protège-jointures"'::jsonb,
    'de', '"Hitzeschutzhandschuh (250 °C) aus Baumwolle 12 oz, innen/außen doppelt aufgeraut, doppeltem Baumwolljersey am Handrücken und Knöchelschutz"'::jsonb,
    'es', '"Guante resistente al calor (250 °C) de algodón 12 oz, doble afelpado interior/exterior, doble tejido de punto de algodón en el dorso y protección de nudillos"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Great protection in high temperature environment, against contact, radiant and convective heat", "Excellent convective-heat resistance", "Excellent tear resistance", "Reinforced leather seams between palm & thumb"]'::jsonb,
    'it', '["Buona resistenza al calore da contatto", "Ottima resistenza al calore convettivo", "Eccellente resistenza allo strappo", "Salva cuciture in pelle tra palmo e pollice"]'::jsonb,
    'fr', '["Bonne résistance à la chaleur de contact", "Excellente résistance à la chaleur par convection", "Résistance exceptionnelle à la déchirure", "Renfort de couture en cuir entre la paume et le pouce"]'::jsonb,
    'de', '["Gute Beständigkeit gegen Kontakthitze", "Ausgezeichnete Beständigkeit gegen konvektive Hitze", "Hervorragende Reißfestigkeit", "Lederverstärkung an der Naht zwischen Handfläche und Daumen"]'::jsonb,
    'es', '["Buena resistencia al calor de contacto", "Excelente resistencia al calor convectivo", "Resistencia excepcional al desgarro", "Refuerzo de costura de cuero entre la palma y el pulgar"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 250 °C", "Glassworks, steelworks & hot-plastic molding", "Glass blowing"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250°C", "Vetrerie, stamperie, acciaierie e stampaggio materiale plastico a caldo", "Soffiatura vetro"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250°C", "Verreries, ateliers d''estampage, aciéries et moulage de plastique à chaud", "Soufflage du verre"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250°C", "Glashütten, Stanzereien, Stahlwerke und Heißpressen von Kunststoff", "Glasblasen"]'::jsonb,
    'es', '["Manipulación de piezas hasta 250°C", "Vidrierías, talleres de estampación, acerías y moldeo de plástico en caliente", "Soplado de vidrio"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glassworks", "Industrial maintenance", "Aerospace"]'::jsonb,
    'it', '["Vetreria", "Manutenzione industriale", "Aerospaziale"]'::jsonb,
    'fr', '["Verrerie", "Maintenance industrielle", "Aérospatiale"]'::jsonb,
    'de', '["Glasproduktion", "Industriewartung", "Luft- und Raumfahrt"]'::jsonb,
    'es', '["Vidriería", "Mantenimiento industrial", "Aeroespacial"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "250 °C", "back-of-hand protection"]'::jsonb,
    'it', '["anticalore", "250C", "protezione dorso mano"]'::jsonb,
    'fr', '["anti-chaleur", "250 °C", "protection du dos de la main"]'::jsonb,
    'de', '["hitzebeständig", "250 °C", "Handrückenschutz"]'::jsonb,
    'es', '["resistente al calor", "250 °C", "protección del dorso de la mano"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '3b34ffb8-00ce-4099-a1d1-6ba834c82401';


-- products cleanspace-pro
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"CLEANSPACE PRO"'::jsonb,
    'it', '"CLEANSPACE PRO"'::jsonb,
    'fr', '"CLEANSPACE PRO"'::jsonb,
    'de', '"CLEANSPACE PRO"'::jsonb,
    'es', '"CLEANSPACE PRO"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-performance PAPR respirator, class TM3 P3, for advanced protection against dust, gases, and vapors in complex industrial environments."'::jsonb,
    'it', '"Respiratore PAPR ad alte prestazioni, classe TM3 P3, per protezione avanzata da polveri, gas e vapori in ambienti industriali complessi."'::jsonb,
    'fr', '"Respirateur PAPR haute performance, classe TM3 P3, pour une protection avancée contre les poussières, les gaz et les vapeurs dans des environnements industriels complexes."'::jsonb,
    'de', '"Hochleistungs-PAPR-Atemschutzgerät der Klasse TM3 P3 für erweiterten Schutz vor Staub, Gasen und Dämpfen in komplexen Industrieumgebungen."'::jsonb,
    'es', '"Respirador PAPR de altas prestaciones, clase TM3 P3, para protección avanzada frente a polvo, gases y vapores en entornos industriales complejos."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-performance PAPR respirator"'::jsonb,
    'it', '"Respiratore PAPR ad alte prestazioni"'::jsonb,
    'fr', '"Respirateur PAPR haute performance"'::jsonb,
    'de', '"Hochleistungs-PAPR-Atemschutzgerät"'::jsonb,
    'es', '"Respirador PAPR de altas prestaciones"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full face masks"'::jsonb,
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Maintains positive pressure inside the mask", "Filters with efficiency up to 99.97%", "Audible alarms to indicate low battery and airflow issues", "Pressure and airflow control + filter management (IMFT)", "Free from hoses and belts", "Lightweight (400 g)", "Smart app connectivity", "AirSensit technology for natural breathing"]'::jsonb,
    'it', '["Mantiene una pressione positiva nella maschera", "Controllo pressione e flusso + gestione filtro (IMFT)", "Filtri con efficienza fino al 99,97%", "Segnali acustici per indicare batteria scarica e problemi di flusso", "Tecnologia AirSensit per una normale respirazione", "Connettività App smart", "Peso leggero 400g", "Privo di tubi e cinture"]'::jsonb,
    'fr', '["Maintient une pression positive dans le masque", "Contrôle de la pression et du débit + gestion du filtre (IMFT)", "Filtres avec une efficacité allant jusqu''à 99,97%", "Signaux sonores pour indiquer une batterie faible et des problèmes de débit", "Technologie AirSensit pour une respiration normale", "Connectivité avec application intelligente", "Poids léger 400 g", "Sans tuyaux ni ceintures"]'::jsonb,
    'de', '["Hält einen Überdruck in der Maske aufrecht", "Druck- und Durchflusskontrolle + Filterverwaltung (IMFT)", "Filter mit einer Effizienz von bis zu 99,97%", "Akustische Signale zur Anzeige von niedrigem Akkustand und Durchflussproblemen", "AirSensit-Technologie für eine normale Atmung", "Smarte App-Konnektivität", "Geringes Gewicht 400 g", "Ohne Schläuche und Gurte"]'::jsonb,
    'es', '["Mantiene una presión positiva en la máscara", "Control de presión y caudal + gestión del filtro (IMFT)", "Filtros con una eficiencia de hasta el 99,97%", "Señales acústicas para indicar batería baja y problemas de flujo", "Tecnología AirSensit para una respiración normal", "Conectividad con aplicación inteligente", "Peso ligero 400 g", "Sin tubos ni cinturones"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heavy and mining industries", "Chemical and pharmaceutical industries", "Waste management, maintenance, and services", "Heavy and mining industries"]'::jsonb,
    'it', '["Industria pesante e mineraria", "Industria chimica e farmaceutica", "Waste, manutenzione e servizi", "Industria pesante e mineraria"]'::jsonb,
    'fr', '["Industrie lourde et minière", "Industrie chimique et pharmaceutique", "Gestion des déchets, maintenance et services", "Industrie lourde et minière"]'::jsonb,
    'de', '["Schwerindustrie und Bergbau", "Chemische und pharmazeutische Industrie", "Abfallwirtschaft, Wartung und Dienstleistungen", "Schwerindustrie und Bergbau"]'::jsonb,
    'es', '["Industria pesada y minera", "Industria química y farmacéutica", "Gestión de residuos, mantenimiento y servicios", "Industria pesada y minera"]'::jsonb
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
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = 'a89adceb-11fe-4db5-be78-d7eace0bf24f';


-- products cleanspace-ultra
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"CLEANSPACE ULTRA"'::jsonb,
    'it', '"CLEANSPACE ULTRA"'::jsonb,
    'fr', '"CLEANSPACE ULTRA"'::jsonb,
    'de', '"CLEANSPACE ULTRA"'::jsonb,
    'es', '"CLEANSPACE ULTRA"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Powered air-purifying respirator (PAPR), class TM3 with P3 filtration, designed for demanding industrial environments and operations requiring high-level protection, even in the presence of water and contaminants."'::jsonb,
    'it', '"Respiratore a ventilazione assistita PAPR di classe TM3 con filtrazione P3, progettato per ambienti industriali impegnativi e operazioni che richiedono elevata protezione anche in presenza di acqua e contaminanti."'::jsonb,
    'fr', '"Respirateur à ventilation assistée PAPR de classe TM3 avec filtration P3, conçu pour des environnements industriels exigeants et des opérations nécessitant une protection élevée, y compris en présence d''eau et de contaminants."'::jsonb,
    'de', '"Gebläseunterstütztes PAPR-Atemschutzgerät der Klasse TM3 mit P3-Filterung, konzipiert für anspruchsvolle Industrieumgebungen und Arbeiten, die auch bei Vorhandensein von Wasser und Schadstoffen einen hohen Schutz erfordern."'::jsonb,
    'es', '"Respirador con ventilación asistida PAPR de clase TM3 con filtración P3, diseñado para entornos industriales exigentes y operaciones que requieren una elevada protección incluso en presencia de agua y contaminantes."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-performance PAPR respirator suitable for use in the presence of liquids"'::jsonb,
    'it', '"Respiratore PAPR ad alte prestazioni In presenza di liquidi"'::jsonb,
    'fr', '"Respirateur PAPR haute performance en présence de liquides"'::jsonb,
    'de', '"Hochleistungs-PAPR-Atemschutzgerät bei Vorhandensein von Flüssigkeiten"'::jsonb,
    'es', '"Respirador PAPR de altas prestaciones en presencia de líquidos"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full face masks"'::jsonb,
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Maintains positive pressure inside the mask", "Suitable for extreme environments (IP65/IP66)", "Filters with efficiency up to 99.97%", "Audible alarms to indicate low battery and airflow issues", "AirSensit technology for natural breathing", "Smart app connectivity", "Lightweight (500 g)", "Free from hoses and belts"]'::jsonb,
    'it', '["Mantiene una pressione positiva nella maschera", "Idoneità per ambienti estremi (IP65/IP66)", "Filtri con efficienza fino al 99,97%", "Segnali acustici per indicare batteria scarica e problemi di flusso", "Tecnologia AirSensit per una normale respirazione", "Connettività App smart", "Peso contenuto 500g", "Privo di tubi e cinture"]'::jsonb,
    'fr', '["Maintient une pression positive dans le masque", "Adapté aux environnements extrêmes (IP65/IP66)", "Filtres avec une efficacité allant jusqu''à 99,97%", "Signaux sonores pour indiquer une batterie faible et des problèmes de débit", "Technologie AirSensit pour une respiration normale", "Connectivité avec application intelligente", "Poids réduit 500 g", "Sans tuyaux ni ceintures"]'::jsonb,
    'de', '["Hält einen Überdruck in der Maske aufrecht", "Geeignet für extreme Umgebungen (IP65/IP66)", "Filter mit einer Effizienz von bis zu 99,97%", "Akustische Signale zur Anzeige von niedrigem Akkustand und Durchflussproblemen", "AirSensit-Technologie für eine normale Atmung", "Smarte App-Konnektivität", "Geringes Gewicht 500 g", "Ohne Schläuche und Gurte"]'::jsonb,
    'es', '["Mantiene una presión positiva en la máscara", "Idóneo para entornos extremos (IP65/IP66)", "Filtros con una eficiencia de hasta el 99,97%", "Señales acústicas para indicar batería baja y problemas de flujo", "Tecnología AirSensit para una respiración normal", "Conectividad con aplicación inteligente", "Peso contenido 500 g", "Sin tubos ni cinturones"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heavy and mining industries", "Chemical and pharmaceutical industries", "Decontamination and remediation", "Industrial maintenance and cleaning"]'::jsonb,
    'it', '["Decontaminazione e bonifiche", "Industria pesante e mineraria", "Saldatura e lavorazioni metalliche", "Manutenzione industriale e cleaning"]'::jsonb,
    'fr', '["Décontamination et dépollution", "Industrie lourde et minière", "Soudage et travail des métaux", "Maintenance industrielle et nettoyage"]'::jsonb,
    'de', '["Dekontamination und Sanierung", "Schwerindustrie und Bergbau", "Schweißen und Metallbearbeitung", "Industrielle Wartung und Reinigung"]'::jsonb,
    'es', '["Descontaminación y saneamiento", "Industria pesada y minera", "Soldadura y trabajo de metales", "Mantenimiento industrial y limpieza"]'::jsonb
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
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = '2e738d49-27c7-49eb-9e60-e0992b6c4675';


-- products 06-p-212-l
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"06 P 212 L"'::jsonb,
    'it', '"06 P 212 L"'::jsonb,
    'fr', '"06 P 212 L"'::jsonb,
    'de', '"06 P 212 L"'::jsonb,
    'es', '"06 P 212 L"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Long-cuff thermal glove, 100% continuous yarn cotton (32 cm + 11 cm cuff). Ergonomic design for prolonged use in operations up to 250 °C requiring high dexterity."'::jsonb,
    'it', '"\"Guanto Termico Polso Lungo 212g – Doppio guanto in cotone 100% (32 cm e 11 cm polsino), peso 212 g.\nGuanto con design ergonomico per uso prolungato per operazioni fino a 250C\""'::jsonb,
    'fr', '"\"Gant thermique à poignet long 212 g – Double gant en coton 100 % (32 cm et poignet 11 cm), poids 212 g.\nGant au design ergonomique pour une utilisation prolongée, pour des opérations jusqu''à 250 °C\""'::jsonb,
    'de', '"\"Hitzeschutzhandschuh mit langer Stulpe 212 g – Doppelhandschuh aus 100 % Baumwolle (32 cm und 11 cm Bund), Gewicht 212 g.\nErgonomisch gestalteter Handschuh für den langfristigen Einsatz bei Arbeiten bis 250 °C\""'::jsonb,
    'es', '"\"Guante Térmico de Puño Largo 212 g – Guante doble de algodón 100 % (32 cm y puño de 11 cm), peso 212 g.\nGuante de diseño ergonómico para uso prolongado en operaciones hasta 250 °C\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double glove with long cuff, designed for high dexterity in operations up to 250 °C"'::jsonb,
    'it', '"Doppio guanto anticalore con polso lungo ad elevata destrezza per operazioni fino a 250C"'::jsonb,
    'fr', '"Gant double anti-chaleur avec poignet long et haute dextérité, pour des opérations jusqu''à 250C"'::jsonb,
    'de', '"Doppelter Hitzeschutzhandschuh mit langer Stulpe und hoher Fingerfertigkeit für Arbeiten bis 250C"'::jsonb,
    'es', '"Doble guante resistente al calor con puño largo y alta destreza para operaciones hasta 250C"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Seamless continuous-yarn", "Ergonomic design for prolonged use", "Certified to 250 °C", "Weight: 212 g"]'::jsonb,
    'it', '["Filo continuo, senza cuciture", "Design ergonomico per uso prolungato", "Certificato fino a 250C", "Peso 212 g"]'::jsonb,
    'fr', '["Fil continu, sans couture", "Design ergonomique pour un usage prolongé", "Certifié jusqu''à 250C", "Poids 212 g"]'::jsonb,
    'de', '["Durchgehender Faden, nahtlos", "Ergonomisches Design für den Dauereinsatz", "Zertifiziert bis 250C", "Gewicht 212 g"]'::jsonb,
    'es', '["Hilo continuo, sin costuras", "Diseño ergonómico para un uso prolongado", "Certificado hasta 250C", "Peso 212 g"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 250 °C", "Extended forearm exposure operations (furnaces & brazing)", "Boiler & burner maintenance"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250°C", "Operazioni con avambraccio esposto – forni e brasatura", "Manutenzione caldaie e bruciatori"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250°C", "Opérations avec avant-bras exposé – fours et brasage", "Maintenance des chaudières et brûleurs"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250°C", "Arbeiten mit freiliegendem Unterarm – Öfen und Hartlöten", "Wartung von Heizkesseln und Brennern"]'::jsonb,
    'es', '["Manipulación de piezas hasta 250°C", "Operaciones con antebrazo expuesto: hornos y soldadura fuerte", "Mantenimiento de calderas y quemadores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Foundry", "Mechanical industry", "Boiler maintenance"]'::jsonb,
    'it', '["Fonderia", "Industria meccanica", "Manutenzione caldaie"]'::jsonb,
    'fr', '["Fonderie", "Industrie mécanique", "Maintenance des chaudières"]'::jsonb,
    'de', '["Gießerei", "Maschinenbauindustrie", "Kesselwartung"]'::jsonb,
    'es', '["Fundición", "Industria mecánica", "Mantenimiento de calderas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "250 °C", "medium risk", "cotton glove"]'::jsonb,
    'it', '["anticalore", "250C", "rischi medi", "guanto in cotone"]'::jsonb,
    'fr', '["anti-chaleur", "250 °C", "risques moyens", "gant en coton"]'::jsonb,
    'de', '["hitzebeständig", "250 °C", "mittlere Risiken", "Baumwollhandschuh"]'::jsonb,
    'es', '["resistente al calor", "250 °C", "riesgos medios", "guante de algodón"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '47bf886d-4df4-49e2-bf4c-096088262754';


-- products cleanspace-xte
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"CLEANSPACE XTE"'::jsonb,
    'it', '"CLEANSPACE XTE"'::jsonb,
    'fr', '"CLEANSPACE XTE"'::jsonb,
    'de', '"CLEANSPACE XTE"'::jsonb,
    'es', '"CLEANSPACE XTE"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The CleanSpace EX (XTE) is a powered air-purifying respirator (PAPR), class TM3 with P3 filtration and ATEX/IECEx certification, designed for operation in potentially explosive atmospheres."'::jsonb,
    'it', '"Il CleanSpace EX (XTE) è un respiratore a ventilazione assistita (PAPR) di classe TM3 con filtrazione P3 e certificazione ATEX/IECEx, progettato per operare in atmosfere potenzialmente esplosive."'::jsonb,
    'fr', '"Le CleanSpace EX (XTE) est un respirateur à ventilation assistée (PAPR) de classe TM3 avec filtration P3 et certification ATEX/IECEx, conçu pour fonctionner dans des atmosphères potentiellement explosives."'::jsonb,
    'de', '"Das CleanSpace EX (XTE) ist ein gebläseunterstütztes Atemschutzgerät (PAPR) der Klasse TM3 mit P3-Filterung und ATEX/IECEx-Zertifizierung, konzipiert für den Einsatz in explosionsgefährdeten Bereichen."'::jsonb,
    'es', '"El CleanSpace EX (XTE) es un respirador con ventilación asistida (PAPR) de clase TM3 con filtración P3 y certificación ATEX/IECEx, diseñado para funcionar en atmósferas potencialmente explosivas."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"ATEX-certified TM3 P3 PAPR respirator, designed for explosive environments with the presence of gases"'::jsonb,
    'it', '"Respiratore PAPR classe TM3 P3 certificato ATEX, progettato per ambienti esplosivi con presenza di gas"'::jsonb,
    'fr', '"Respirateur PAPR classe TM3 P3 certifié ATEX, conçu pour les environnements explosifs en présence de gaz"'::jsonb,
    'de', '"PAPR-Atemschutzgerät der Klasse TM3 P3, ATEX-zertifiziert, konzipiert für explosionsgefährdete Bereiche mit Gasvorkommen"'::jsonb,
    'es', '"Respirador PAPR de clase TM3 P3 certificado ATEX, diseñado para entornos explosivos con presencia de gas"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Respiratory Protection"'::jsonb,
    'it', '"Protezione respiratoria"'::jsonb,
    'fr', '"Protection respiratoire"'::jsonb,
    'de', '"Atemschutz"'::jsonb,
    'es', '"Protección respiratoria"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Full face masks"'::jsonb,
    'it', '"Maschere integrali"'::jsonb,
    'fr', '"Masques intégraux"'::jsonb,
    'de', '"Vollmasken"'::jsonb,
    'es', '"Máscaras integrales"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["AirSensit technology for natural breathing", "Smart app connectivity", "Lightweight (550 g)", "“One-button” system for easy operation", "Use in explosive environments", "Does not cause ignition sources", "Complete protection against airborne contaminants", "Audible alarms to indicate low battery and airflow issues"]'::jsonb,
    'it', '["Utilizzo in ambienti esplosivi", "Non provoca principi di innesco", "Protezione completa da contaminanti aerodispersi", "Segnali acustici per indicare batteria scarica e problemi di flusso", "Tecnologia AirSensit per una normale respirazione", "Connettività App smart", "Peso contenuto 550g", "Sistema \"one button\" per un utilizzo pratico"]'::jsonb,
    'fr', '["Utilisation en environnements explosifs", "Ne provoque pas d''amorce d''inflammation", "Protection complète contre les contaminants en suspension dans l''air", "Signaux sonores pour indiquer une batterie faible et des problèmes de débit", "Technologie AirSensit pour une respiration normale", "Connectivité avec application intelligente", "Poids réduit 550 g", "Système « one button » pour une utilisation pratique"]'::jsonb,
    'de', '["Einsatz in explosionsgefährdeten Bereichen", "Verursacht keine Zündquellen", "Vollständiger Schutz vor luftgetragenen Schadstoffen", "Akustische Signale zur Anzeige von niedrigem Akkustand und Durchflussproblemen", "AirSensit-Technologie für eine normale Atmung", "Smarte App-Konnektivität", "Geringes Gewicht 550 g", "„One-Button“-System für eine praktische Bedienung"]'::jsonb,
    'es', '["Uso en entornos explosivos", "No provoca focos de ignición", "Protección completa frente a contaminantes en suspensión en el aire", "Señales acústicas para indicar batería baja y problemas de flujo", "Tecnología AirSensit para una respiración normal", "Conectividad con aplicación inteligente", "Peso contenido 550 g", "Sistema «one button» para un uso práctico"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["ATEX environments", "Mining industry", "Chemical processing", "Industrial maintenance"]'::jsonb,
    'it', '["Ambienti Atex", "Industria mineraria", "Lavorazioni chimiche", "Manutenzione industriale"]'::jsonb,
    'fr', '["Environnements Atex", "Industrie minière", "Travaux chimiques", "Maintenance industrielle"]'::jsonb,
    'de', '["Atex-Umgebungen", "Bergbauindustrie", "Chemische Verarbeitung", "Industriewartung"]'::jsonb,
    'es', '["Entornos Atex", "Industria minera", "Trabajos químicos", "Mantenimiento industrial"]'::jsonb
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
    'en', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone", "Polycarbonate (PC)", "Other"]'::jsonb,
    'it', '["Silicone", "policarbonato (PC)", "altri"]'::jsonb,
    'fr', '["Silicone", "polycarbonate (PC)", "autres"]'::jsonb,
    'de', '["Silikon", "Polycarbonat (PC)", "andere"]'::jsonb,
    'es', '["Silicona", "policarbonato (PC)", "otros"]'::jsonb
  )
WHERE id = '5197bb18-538e-4410-9112-2e91b25f8f54';


-- products 2-macsole-hi-hro-src-scarpa
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"2 MACSOLE HI HRO SRC (scarpa)"'::jsonb,
    'it', '"2 MACSOLE HI HRO SRC"'::jsonb,
    'fr', '"2 MACSOLE HI HRO SRC"'::jsonb,
    'de', '"2 MACSOLE HI HRO SRC"'::jsonb,
    'es', '"2 MACSOLE HI HRO SRC"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible safety boot S3L class with rubber sole resistant to heat, cut and chemicals"'::jsonb,
    'it', '"Scarpa S3L leggeri e flessibili con suola in gomma resistente al calore, taglio e sostanze chimiche"'::jsonb,
    'fr', '"Chaussure S3L légère et flexible avec semelle en caoutchouc résistante à la chaleur, à la coupure et aux substances chimiques"'::jsonb,
    'de', '"Leichter und flexibler S3L-Schuh mit Gummisohle, hitze-, schnitt- und chemikalienbeständig"'::jsonb,
    'es', '"Calzado S3L ligero y flexible con suela de caucho resistente al calor, al corte y a las sustancias químicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible safety shoes S3L S7L S1 PL class with rubber sole"'::jsonb,
    'it', '"Scarpa S3L S7L S1 PL leggeri e flessibili con suola in gomma"'::jsonb,
    'fr', '"Chaussure S3L S7L S1 PL légère et flexible avec semelle en caoutchouc"'::jsonb,
    'de', '"Leichter und flexibler Schuh S3L S7L S1 PL mit Gummisohle"'::jsonb,
    'es', '"Calzado S3L S7L S1 PL ligero y flexible con suela de caucho"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Footwear"'::jsonb,
    'it', '"Calzature di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety shoes"'::jsonb,
    'it', '"Scarpe di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection class S3 in accordance with EN ISO 20345:2011, with additional marking for excellent slip resistance (SRC) and heat resistance up to +300 °C (HI HRO)", "Stable posture even on ladders thanks to the stabilizing footbed support", "Antistatic, shock-absorbing PU midsole", "Slip, contact-heat and oil/fuel-resistant sole"]'::jsonb,
    'it', '["Classe di protezione S3 in conformità alla normativa EN ISO 20345:2011 con marcatura aggiuntiva per ottime proprietà antiscivolo (SRC) e resistenza alle temperature fino a +300 °C (HI HRO)", "Postura sicura anche quando sulle scale a pioli grazie al supporto plantare stabilizzante", "Intersuola in PU antistatica e ammortizzante", "Suola resistente a scivolamento, calore da contatto e oli/carburanti", "Comfort assoluto grazie al concept innovativo che utilizza materiali climatizzanti e traspiranti e al design traforato", "Tomaia priva di cuciture in morbidissima pelle per eliminare i punti di pressione", "Plantare antistatico estraibile con sistema di trasporto dell''umidità e assorbimento degli urti su tallone e avampiede", "Morbida imbottitura su collarino e linguetta antipolvere"]'::jsonb,
    'fr', '["Classe de protection S3 conforme à la norme EN ISO 20345:2011 avec marquage supplémentaire pour d''excellentes propriétés antidérapantes (SRC) et une résistance à la température jusqu''à +300 °C (HI HRO)", "Posture sûre même sur les échelles grâce au support plantaire stabilisateur", "Semelle intermédiaire en PU antistatique et amortissante", "Semelle résistante au glissement, à la chaleur de contact et aux huiles/carburants", "Confort absolu grâce au concept innovant utilisant des matériaux climatisants et respirants ainsi qu''à un design perforé", "Tige sans coutures en cuir extra-souple pour éliminer les points de pression", "Semelle intérieure antistatique amovible avec système de gestion de l''humidité et absorption des chocs au talon et à l''avant-pied", "Rembourrage souple au niveau du col et languette anti-poussière"]'::jsonb,
    'de', '["Schutzklasse S3 gemäß EN ISO 20345:2011 mit zusätzlicher Kennzeichnung für hervorragende Rutschhemmung (SRC) und Temperaturbeständigkeit bis +300 °C (HI HRO)", "Sicherer Stand auch auf Leitern dank stabilisierender Fußbettstütze", "Antistatische und dämpfende PU-Zwischensohle", "Sohle beständig gegen Rutschen, Kontaktwärme und Öle/Kraftstoffe", "Absoluter Komfort dank des innovativen Konzepts mit klimaregulierenden und atmungsaktiven Materialien sowie dem perforierten Design", "Nahtloser Schaft aus besonders weichem Leder zur Vermeidung von Druckstellen", "Herausnehmbare antistatische Einlegesohle mit Feuchtigkeitstransportsystem und Stoßdämpfung im Fersen- und Vorfußbereich", "Weiche Polsterung am Schaftrand und staubdichte Lasche"]'::jsonb,
    'es', '["Clase de protección S3 conforme a la norma EN ISO 20345:2011 con marcado adicional por sus excelentes propiedades antideslizantes (SRC) y resistencia a temperaturas de hasta +300 °C (HI HRO)", "Postura segura incluso en escaleras de mano gracias al soporte plantar estabilizador", "Entresuela de PU antiestática y amortiguadora", "Suela resistente al deslizamiento, al calor de contacto y a aceites/combustibles", "Confort absoluto gracias al concepto innovador que utiliza materiales climatizantes y transpirables, así como al diseño perforado", "Empeine sin costuras de cuero extra suave para eliminar los puntos de presión", "Plantilla antiestática extraíble con sistema de transporte de la humedad y absorción de impactos en el talón y el antepié", "Acolchado suave en el collarín y lengüeta antipolvo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Moderate applications, requiring high sole durability", "Activities in indoor and outdoor environments", "Operations in challenging ground conditions"]'::jsonb,
    'it', '["Applicazioni moderate, con necessita'' di alta robustezza della suola", "Attivita'' in ambiente interno ed esterno", "Operazioni con difficili condizioni del suolo"]'::jsonb,
    'fr', '["Applications modérées, nécessitant une grande robustesse de la semelle", "Activités en intérieur et en extérieur", "Opérations dans des conditions de sol difficiles"]'::jsonb,
    'de', '["Mittlere Einsatzbereiche mit hohem Anspruch an die Robustheit der Sohle", "Tätigkeiten in Innen- und Außenbereichen", "Einsätze bei schwierigen Bodenverhältnissen"]'::jsonb,
    'es', '["Aplicaciones moderadas, con necesidad de alta robustez de la suela", "Actividades en interiores y exteriores", "Operaciones en condiciones de suelo difíciles"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Utilities", "Construction", "Oil&Gas", "Heavy industry", "Rail", "Ports", "Defense", "Agriculture"]'::jsonb,
    'it', '["Servizi pubblici", "costruzioni", "petrolio e gas", "industria pesante", "settore ferroviario", "porti", "difesa e agricoltura"]'::jsonb,
    'fr', '["Services publics", "constructions", "pétrole et gaz", "industrie lourde", "secteur ferroviaire", "ports", "défense et agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Bauwesen", "Öl und Gas", "Schwerindustrie", "Bahnsektor", "Häfen", "Verteidigung und Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "construcciones", "petróleo y gas", "industria pesada", "sector ferroviario", "puertos", "defensa y agricultura"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"35 - 52"'::jsonb,
    'fr', '"35 - 52"'::jsonb,
    'de', '"35 - 52"'::jsonb,
    'es', '"35 - 52"'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Absolute comfort thanks to an innovative concept using climate-regulating and breathable materials and perforated design", "Seam-free upper in ultra-soft leather to eliminate pressure points", "Removable antistatic insole with moisture-wicking system and shock absorption on heel and forefoot", "Soft padding on collar and dust-resistant tongue"]'::jsonb
  )
WHERE id = '7990a6c4-159e-47f6-a1bb-ce0be0409d61';


-- products 1-x-tended-s1-p-src
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"1 X-tended S1 P SRC"'::jsonb,
    'it', '"1 X-tended S1 P SRC"'::jsonb,
    'fr', '"1 X-tended S1 P SRC"'::jsonb,
    'de', '"1 X-tended S1 P SRC"'::jsonb,
    'es', '"1 X-tended S1 P SRC"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Scarpa S1 P leggera e flessibile con suola in gomma"'::jsonb,
    'it', '"Scarpa basse antinfortunistiche S1 traforate, versatili e ultraleggere con copripunte in poliuretano"'::jsonb,
    'fr', '"Chaussures basses de sécurité S1 perforées, polyvalentes et ultralégères avec embout en polyuréthane"'::jsonb,
    'de', '"Perforierte, vielseitige und ultraleichte S1-Sicherheitshalbschuhe mit Polyurethan-Zehenschutzkappe"'::jsonb,
    'es', '"Calzado bajo de seguridad S1 perforado, versátil y ultraligero con puntera de poliuretano"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible S1 P shoe with a rubber sole"'::jsonb,
    'it', '"Scarpa S1 P leggera e flessibile con suola in gomma"'::jsonb,
    'fr', '"Chaussure S1 P légère et flexible avec semelle en caoutchouc"'::jsonb,
    'de', '"Leichter und flexibler S1-P-Schuh mit Gummisohle"'::jsonb,
    'es', '"Calzado S1 P ligero y flexible con suela de caucho"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Footwear"'::jsonb,
    'it', '"Calzature di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety shoes"'::jsonb,
    'it', '"Scarpe di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection class S1 PL in accordance with EN ISO 20345:2022 + A1:2024 with additional marking for penetration resistance (PL)", "Excellent slip resistance (SR)", "100% metal-free protective toe cap", "Metal-free anti-penetration insole that ensures flexibility of the footwear"]'::jsonb,
    'it', '["Classe di protezione S1 PL in conformità alla norma EN ISO 20345:2022 + A1:2024 con marcatura aggiuntiva per resistenza alla penetrazione (PL)", "Ottima resistenza allo scivolamento (SR)", "Puntale protettivo 100% privo di metallo", "Soletta antiperforazione metal-free che garantisce flessibilità alla calzatura"]'::jsonb,
    'fr', '["Classe de protection S1 PL conforme à la norme EN ISO 20345:2022 + A1:2024 avec marquage supplémentaire pour la résistance à la perforation (PL)", "Excellente résistance au glissement (SR)", "Embout de protection 100% sans métal", "Semelle anti-perforation non métallique garantissant la flexibilité de la chaussure"]'::jsonb,
    'de', '["Schutzklasse S1 PL gemäß EN ISO 20345:2022 + A1:2024 mit zusätzlicher Kennzeichnung für Durchtrittwiderstand (PL)", "Hervorragende Rutschfestigkeit (SR)", "Schutzkappe zu 100% metallfrei", "Metallfreie durchtrittsichere Sohle, die die Flexibilität des Schuhs gewährleistet"]'::jsonb,
    'es', '["Clase de protección S1 PL conforme a la norma EN ISO 20345:2022 + A1:2024 con marcado adicional por resistencia a la perforación (PL)", "Excelente resistencia al deslizamiento (SR)", "Puntera de protección 100% libre de metal", "Plantilla antiperforación sin metal que garantiza la flexibilidad del calzado"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Light-duty applications", "Activities in indoor and outdoor environments"]'::jsonb,
    'it', '["Light-duty applications", "Activities in indoor and outdoor environments"]'::jsonb,
    'fr', '["Applications légères", "Activités en environnements intérieurs et extérieurs"]'::jsonb,
    'de', '["Anwendungen für leichte Beanspruchung", "Tätigkeiten in Innen- und Außenbereichen"]'::jsonb,
    'es', '["Aplicaciones de uso ligero", "Actividades en entornos interiores y exteriores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Public services", "healthcare", "agriculture"]'::jsonb,
    'it', '["Servizi pubblici", "sanità agricoltura"]'::jsonb,
    'fr', '["Services publics", "santé et agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Gesundheitswesen und Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "sanidad y agricultura"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"35 - 52"'::jsonb,
    'fr', '"35 - 52"'::jsonb,
    'de', '"35 - 52"'::jsonb,
    'es', '"35 - 52"'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Outstanding comfort thanks to an innovative design, including the use of thermoregulating and breathable perforated materials", "Removable, breathable antistatic comfort insole", "High-tech micro-velour upper", "Individually adjustable elastic laces with a quick fastening mechanism"]'::jsonb,
    'it', '["Comfort straordinario grazie a una concezione innovativa della forma, che comprende l''uso di materiali traforati termoregolanti e traspiranti", "Soletta comfort antistatica estraibile traspirante", "Tomaia in microvelluto hi-tech", "Lacci elastici regolabili individualmente con meccanismo di fissaggio rapido"]'::jsonb,
    'fr', '["Confort extraordinaire grâce à une conception innovante de la forme, incluant l''utilisation de matériaux perforés thermorégulateurs et respirants", "Semelle confort antistatique amovible et respirante", "Tige en microvelours high-tech", "Lacets élastiques réglables individuellement avec système de fixation rapide"]'::jsonb,
    'de', '["Außergewöhnlicher Komfort dank eines innovativen Formkonzepts, das den Einsatz von perforierten, temperaturregulierenden und atmungsaktiven Materialien umfasst", "Herausnehmbare, atmungsaktive antistatische Komfort-Einlegesohle", "Schaft aus High-Tech-Mikrovelours", "Individuell verstellbare elastische Schnürsenkel mit Schnellverschluss"]'::jsonb,
    'es', '["Confort extraordinario gracias a un diseño innovador de la forma, que incluye el uso de materiales perforados termorreguladores y transpirables", "Plantilla de confort antiestática, extraíble y transpirable", "Empeine de microvelour de alta tecnología", "Cordones elásticos ajustables individualmente con sistema de fijación rápida"]'::jsonb
  )
WHERE id = 'ed099e42-d74b-4c12-ad52-c400a8d2b4f8';


-- products 01-501
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"01-501"'::jsonb,
    'it', '"01-501"'::jsonb,
    'fr', '"01-501"'::jsonb,
    'de', '"01-501"'::jsonb,
    'es', '"01-501"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13 gauge Graphene nylon liner glove and micro sandy foam nitrile palm coating, reinforced crotch"'::jsonb,
    'it', '"Guanto 13 aghi con fodera in grafene e nylon, rivestimento sul palmo in nitrile microsabbiato, crotch rinforzato"'::jsonb,
    'fr', '"Gant 13 jauges avec doublure en graphène et nylon, revêtement de la paume en nitrile microsablé, fourchette renforcée"'::jsonb,
    'de', '"13-Gauge-Handschuh mit Graphen-Nylon-Futter, mikrosandgestrahlter Nitrilbeschichtung auf der Handfläche, verstärktem Fingerzwickel"'::jsonb,
    'es', '"Guante de 13 galgas con forro de grafeno y nylon, recubrimiento de la palma en nitrilo microarenado, horquilla reforzada"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13G  Graphene Liner, Micro foam Nitrile palm coated glove, reinforced crotch"'::jsonb,
    'it', '"Guanto  13 aghi, fodera in grafene, rivestimento in micro schiuma di nitrile sul palmo, thumb crotch rinforzato"'::jsonb,
    'fr', '"Gant 13 jauges, doublure en graphène, enduction en mousse de nitrile sur la paume, fourche du pouce renforcée"'::jsonb,
    'de', '"13-Gauge-Handschuh, Graphenfutter, Nitril-Mikroschaum-Beschichtung auf der Handfläche, verstärkter Daumenzwickel"'::jsonb,
    'es', '"Guante de 13 galgas, forro de grafeno, recubrimiento de microespuma de nitrilo en la palma, horquilla del pulgar reforzada"'::jsonb
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
    'en', '["13 gauge grey Kyorene® graphene liner", "Bacteriostatic kills harmful bacteria", "Thermal regulating to keep the hands comfortable", "Odor neutralizing to keep the gloves smelling Fresh", "Touch Screen compatible", "ANTI cut level A3"]'::jsonb,
    'it', '["Fodera in grafene Kyorene® grigio calibro 13", "Batteriostatico uccide i batteri nocivi", "Regolazione termica per mantenere le mani comode", "Neutralizza gli odori per mantenere i guanti con un odore fresco", "Compatibile Touch Screen", "ANSI taglio livello A3"]'::jsonb,
    'fr', '["Doublure en graphène Kyorene® gris, jauge 13", "Bactériostatique, élimine les bactéries nocives", "Régulation thermique pour garder les mains confortables", "Neutralise les odeurs pour garder les gants avec une odeur fraîche", "Compatible écran tactile", "Niveau de coupure ANSI A3"]'::jsonb,
    'de', '["Innenfutter aus grauem Kyorene®-Graphen, Feinheit 13", "Bakteriostatisch, tötet schädliche Bakterien ab", "Thermoregulierung für ein angenehmes Handgefühl", "Neutralisiert Gerüche, damit die Handschuhe frisch riechen", "Touchscreen-kompatibel", "ANSI-Schnittschutzstufe A3"]'::jsonb,
    'es', '["Forro de grafeno Kyorene® gris, calibre 13", "Bacteriostático, elimina las bacterias nocivas", "Regulación térmica para mantener las manos cómodas", "Neutraliza los olores para mantener los guantes con un olor fresco", "Compatible con pantalla táctil", "Nivel de corte ANSI A3"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal stamping", "Sharp object handling", "Operations in warm environments"]'::jsonb,
    'it', '["Stampaggio metalli", "Operazioni in temperature medie", "Manovra di oggetti taglienti"]'::jsonb,
    'fr', '["Estampage des métaux", "Opérations à températures moyennes", "Manipulation d''objets coupants"]'::jsonb,
    'de', '["Metallumformung", "Arbeiten bei mittleren Temperaturen", "Handhabung scharfkantiger Gegenstände"]'::jsonb,
    'es', '["Estampado de metales", "Operaciones a temperaturas medias", "Manipulación de objetos cortantes"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive", "Construction", "Metal manufacturing", "Appliance and white goods manufacturing"]'::jsonb,
    'it', '["Automotive", "Manufatturiero", "Edilizia", "Industria dei metalli"]'::jsonb,
    'fr', '["Automobile", "Manufacturier", "Construction", "Industrie des métaux"]'::jsonb,
    'de', '["Automobilindustrie", "Verarbeitendes Gewerbe", "Bauwesen", "Metallindustrie"]'::jsonb,
    'es', '["Automoción", "Manufacturero", "Construcción", "Industria de los metales"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene", "cut-resistant gloves"]'::jsonb,
    'it', '["antitaglio", "Grafene"]'::jsonb,
    'fr', '["anticoupure", "Graphène"]'::jsonb,
    'de', '["schnittfest", "Graphen"]'::jsonb,
    'es', '["anticorte", "Grafeno"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"6 - 11"'::jsonb,
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
WHERE id = '9396f4d7-7310-4163-95f4-b352aa93e5e1';


-- products 1-x-tended-s3-src
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"1 X-tended S3 SRC"'::jsonb,
    'it', '"1 X-tended S3 SRC"'::jsonb,
    'fr', '"1 X-tended S3 SRC"'::jsonb,
    'de', '"1 X-tended S3 SRC"'::jsonb,
    'es', '"1 X-tended S3 SRC"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible safety boot S3 class with rubber sole resistant to heat, cut and chemicals"'::jsonb,
    'it', '"Scarpa S3 leggera e flessibile con suola in gomma resistente al calore, taglio e sostanze chimiche"'::jsonb,
    'fr', '"Chaussure S3 légère et flexible avec semelle en caoutchouc résistante à la chaleur, à la coupure et aux substances chimiques"'::jsonb,
    'de', '"Leichter und flexibler S3-Schuh mit hitze-, schnitt- und chemikalienbeständiger Gummisohle"'::jsonb,
    'es', '"Zapato S3 ligero y flexible con suela de goma resistente al calor, al corte y a las sustancias químicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible safety shoes S3 class with rubber sole"'::jsonb,
    'it', '"Scarpa S3L leggera e flessibile con suola in gomma"'::jsonb,
    'fr', '"Chaussure S3L légère et flexible avec semelle en caoutchouc"'::jsonb,
    'de', '"Leichter und flexibler S3L-Schuh mit Gummisohle"'::jsonb,
    'es', '"Zapato S3L ligero y flexible con suela de goma"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety Footwear"'::jsonb,
    'it', '"Calzature di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety shoes"'::jsonb,
    'it', '"Scarpe di sicurezza"'::jsonb,
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection class S1 PL in accordance with EN ISO 20345:2022 + A1:2024 with with additional marking for excellent slip resistance (SR)", "Excellent slip resistance (SR)", "100% metal-free protective toe cap", "Lateral and medial foot support through a dedicated side frame that protects against twisting and impacts"]'::jsonb,
    'it', '["Classe di protezione S3L in conformità alla norma EN ISO 20345:2022 + A1:2024 con marcatura aggiuntiva per ottima resistenza allo scivolamento (SR)", "Puntale protettivo 100% privo di metallo", "Supporto laterale e mediano del piede tramite un''apposita cornice laterale che protegge dalle torsioni e dagli impatti"]'::jsonb,
    'fr', '["Classe de protection S3L conforme à la norme EN ISO 20345:2022 + A1:2024 avec marquage supplémentaire pour une excellente résistance au glissement (SR)", "Embout de protection 100% sans métal", "Soutien latéral et médian du pied grâce à un cadre latéral spécifique qui protège contre les torsions et les chocs"]'::jsonb,
    'de', '["Schutzklasse S3L gemäß EN ISO 20345:2022 + A1:2024 mit zusätzlicher Kennzeichnung für hervorragende Rutschfestigkeit (SR)", "Schutzkappe zu 100% metallfrei", "Seitliche und mediale Fußstütze durch einen speziellen Seitenrahmen, der vor Verdrehungen und Stößen schützt"]'::jsonb,
    'es', '["Clase de protección S3L conforme a la norma EN ISO 20345:2022 + A1:2024 con marcado adicional por su excelente resistencia al deslizamiento (SR)", "Puntera de protección 100% libre de metal", "Soporte lateral y medial del pie mediante un marco lateral específico que protege frente a torsiones e impactos"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Moderate applications, requiring high sole durability", "Activities in indoor and outdoor environments", "Operations in challenging ground conditions"]'::jsonb,
    'it', '["Applicazioni moderate, con necessita'' di alta robustezza della suola", "Attivita'' in ambiente interno ed esterno", "Operazioni con difficili condizioni del suolo"]'::jsonb,
    'fr', '["Applications modérées, nécessitant une grande robustesse de la semelle", "Activités en intérieur et en extérieur", "Opérations dans des conditions de sol difficiles"]'::jsonb,
    'de', '["Mittlere Einsatzbereiche mit hohem Anspruch an die Robustheit der Sohle", "Tätigkeiten in Innen- und Außenbereichen", "Einsätze bei schwierigen Bodenverhältnissen"]'::jsonb,
    'es', '["Aplicaciones moderadas, con necesidad de alta robustez de la suela", "Actividades en interiores y exteriores", "Operaciones en condiciones de suelo difíciles"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Utilities", "Construction", "Oil&Gas", "Heavy industry", "Rail", "Ports", "Defense", "Agriculture"]'::jsonb,
    'it', '["Servizi pubblici", "costruzioni", "petrolio e gas", "industria pesante", "settore ferroviario", "porti", "difesa e agricoltura"]'::jsonb,
    'fr', '["Services publics", "constructions", "pétrole et gaz", "industrie lourde", "secteur ferroviaire", "ports", "défense et agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Bauwesen", "Öl und Gas", "Schwerindustrie", "Bahnsektor", "Häfen", "Verteidigung und Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "construcciones", "petróleo y gas", "industria pesada", "sector ferroviario", "puertos", "defensa y agricultura"]'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Outstanding comfort thanks to an innovative design, including the use of thermoregulating and breathable perforated materials", "Removable, breathable antistatic comfort insole with shock absorption in the heel and forefoot", "Outstanding comfort thanks to an innovative design, including the use of thermoregulating and breathable materials"]'::jsonb,
    'it', '["Comfort straordinario grazie a una concezione innovativa della forma, che comprende l''uso di materiali traforati termoregolanti e traspiranti", "Soletta comfort antistatica estraibile traspirante e assorbimento degli urti su tallone e avampiede", "Comfort straordinario grazie a una concezione innovativa della forma, che comprende l''uso di materiali termoregolanti e traspiranti"]'::jsonb,
    'fr', '["Confort extraordinaire grâce à une conception innovante de la forme, incluant l''utilisation de matériaux perforés thermorégulateurs et respirants", "Semelle confort antistatique amovible et respirante avec absorption des chocs au talon et à l''avant-pied", "Confort exceptionnel grâce à une conception innovante de la forme, incluant l''utilisation de matériaux thermorégulateurs et respirants"]'::jsonb,
    'de', '["Außergewöhnlicher Komfort dank eines innovativen Formkonzepts, das den Einsatz von perforierten, temperaturregulierenden und atmungsaktiven Materialien umfasst", "Herausnehmbare, atmungsaktive antistatische Komfort-Einlegesohle mit Stoßdämpfung im Fersen- und Vorfußbereich", "Außergewöhnlicher Komfort dank eines innovativen Formkonzepts, das den Einsatz thermoregulierender und atmungsaktiver Materialien einschließt"]'::jsonb,
    'es', '["Confort extraordinario gracias a un diseño innovador de la forma, que incluye el uso de materiales perforados termorreguladores y transpirables", "Plantilla de confort antiestática, extraíble y transpirable, con absorción de impactos en el talón y el antepié", "Confort extraordinario gracias a una concepción innovadora de la forma, que incluye el uso de materiales termorreguladores y transpirables"]'::jsonb
  )
WHERE id = '64f12246-8769-4394-922f-f6e0b81af4f3';


-- products 06-p-212
UPDATE products
SET
  name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"06 P 212"'::jsonb,
    'it', '"06 P 212"'::jsonb,
    'fr', '"06 P 212"'::jsonb,
    'de', '"06 P 212"'::jsonb,
    'es', '"06 P 212"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Long-cuff thermal glove 212 g – double 100 % continuous yarn cotton glove (28 cm), 212 g weight. Ergonomic design for prolonged use in operations up to 250 °C requiring high dexterity."'::jsonb,
    'it', '"\"Guanto Termico Polso Lungo 212g – Doppio guanto in cotone 100% (28 cm), peso 212 g.\nGuanto con design ergonomico per uso prolungato per operazioni fino a 250C\""'::jsonb,
    'fr', '"\"Gant thermique à poignet long 212 g – Double gant en coton 100 % (28 cm), poids 212 g.\nGant au design ergonomique pour une utilisation prolongée, pour des opérations jusqu''à 250 °C\""'::jsonb,
    'de', '"\"Hitzeschutzhandschuh mit langer Stulpe 212 g – Doppelhandschuh aus 100 % Baumwolle (28 cm), Gewicht 212 g.\nErgonomisch gestalteter Handschuh für den langfristigen Einsatz bei Arbeiten bis 250 °C\""'::jsonb,
    'es', '"\"Guante Térmico de Puño Largo 212 g – Guante doble de algodón 100 % (28 cm), peso 212 g.\nGuante de diseño ergonómico para uso prolongado en operaciones hasta 250 °C\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double heat-resistant glove with long cuff for high dexterity in operations up to 250 °C"'::jsonb,
    'it', '"Doppio guanto anticalore con polso lungo ad elevata destrezza per operazioni fino a 250C"'::jsonb,
    'fr', '"Gant double anti-chaleur avec poignet long et haute dextérité, pour des opérations jusqu''à 250C"'::jsonb,
    'de', '"Doppelter Hitzeschutzhandschuh mit langer Stulpe und hoher Fingerfertigkeit für Arbeiten bis 250C"'::jsonb,
    'es', '"Doble guante resistente al calor con puño largo y alta destreza para operaciones hasta 250C"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hand protection"'::jsonb,
    'it', '"Protezione delle mani"'::jsonb,
    'fr', '"Protection des mains"'::jsonb,
    'de', '"Handschutz"'::jsonb,
    'es', '"Protección de las manos"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat resistant gloves"'::jsonb,
    'it', '"Guanti anticalore"'::jsonb,
    'fr', '"Gants anti-chaleur"'::jsonb,
    'de', '"Hitzeschutzhandschuhe"'::jsonb,
    'es', '"Guantes resistentes al calor"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Seamless continuous-yarn", "Ergonomic design for prolonged use", "Certified to 250 °C", "Weight: 212 g"]'::jsonb,
    'it', '["Filo continuo, senza cuciture", "Design ergonomico per uso prolungato", "Certificato fino a 250C", "Peso 212 g"]'::jsonb,
    'fr', '["Fil continu, sans couture", "Design ergonomique pour un usage prolongé", "Certifié jusqu''à 250C", "Poids 212 g"]'::jsonb,
    'de', '["Durchgehender Faden, nahtlos", "Ergonomisches Design für den Dauereinsatz", "Zertifiziert bis 250C", "Gewicht 212 g"]'::jsonb,
    'es', '["Hilo continuo, sin costuras", "Diseño ergonómico para un uso prolongado", "Certificado hasta 250C", "Peso 212 g"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 250 °C", "Finishing & assembly in hot environments", "Thermal-plant maintenance"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250°C", "Lavori di finitura e assemblaggi in ambienti caldi", "Manutenzione impianti termici"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250°C", "Travaux de finition et d''assemblage en environnements chauds", "Maintenance des installations thermiques"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250°C", "Fertigungs- und Montagearbeiten in heißen Umgebungen", "Wartung von Wärmeanlagen"]'::jsonb,
    'es', '["Manipulación de piezas hasta 250°C", "Trabajos de acabado y montaje en entornos calientes", "Mantenimiento de instalaciones térmicas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Foundries", "Glass industry", "Industrial maintenance"]'::jsonb,
    'it', '["Fonderia", "Industria del vetro", "Manutenzione industriale"]'::jsonb,
    'fr', '["Fonderie", "Industrie du verre", "Maintenance industrielle"]'::jsonb,
    'de', '["Gießerei", "Glasindustrie", "Industriewartung"]'::jsonb,
    'es', '["Fundición", "Industria del vidrio", "Mantenimiento industrial"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "250 °C", "medium risk", "cotton glove"]'::jsonb,
    'it', '["anticalore", "250C", "rischi medi", "guanto in cotone"]'::jsonb,
    'fr', '["anti-chaleur", "250 °C", "risques moyens", "gant en coton"]'::jsonb,
    'de', '["hitzebeständig", "250 °C", "mittlere Risiken", "Baumwollhandschuh"]'::jsonb,
    'es', '["resistente al calor", "250 °C", "riesgos medios", "guante de algodón"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cotton"]'::jsonb,
    'it', '["cotone"]'::jsonb,
    'fr', '["coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["algodón"]'::jsonb
  )
WHERE id = '5604e35d-caca-4328-8716-96259e4b9db7';


COMMIT;
