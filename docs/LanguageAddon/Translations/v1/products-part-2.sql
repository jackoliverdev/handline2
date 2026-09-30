-- Products locale merge from docs/LanguageAddon/Translations/Products.csv
-- Data-only UPDATE. No ALTER TABLE. No published-flag changes.
-- Part 2 of 5. Run this in the Supabase SQL editor after a backup, then run the next part.
-- Merges en/it/fr/de/es into existing JSONB locale objects.
-- Skipped: blank cells, "" placeholders, empty arrays, and empty objects.
-- Warning: the admin product editor still saves only en/it. Saving a product there will wipe fr/de/es.

BEGIN;

-- 1-x-craft-s3-pl-fo-sc-sr
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"1 X-craft S3 PL FO SC SR"'::jsonb,
    'it', '"1 X-craft S3 PL FO SC SR"'::jsonb,
    'fr', '"1 X-craft S3 PL FO SC SR"'::jsonb,
    'de', '"1 X-craft S3 PL FO SC SR"'::jsonb,
    'es', '"1 X-craft S3 PL FO SC SR"'::jsonb
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
    'en', '["Sporty and particularly lightweight S3L safety lace-up boot", "Removable antistatic comfort insole", "Foamed polyurethane heel reinforcement"]'::jsonb,
    'it', '["Stivale con lacci antinfortunistico S3L sportivo e particolarmente leggero", "Soletta comfort antistatica estraibile", "Rinforzo in poliuretano espanso in corrispondenza del tallone"]'::jsonb,
    'fr', '["Bottine de sécurité à lacets S3L, sportive et particulièrement légère", "Semelle confort antistatique amovible", "Renfort en mousse de polyuréthane au niveau du talon"]'::jsonb,
    'de', '["Schnürstiefel-Sicherheitsschuh S3L, sportlich und besonders leicht", "Herausnehmbare antistatische Komfort-Einlegesohle", "Verstärkung aus Polyurethanschaum im Fersenbereich"]'::jsonb,
    'es', '["Bota de seguridad con cordones S3L, deportiva y especialmente ligera", "Plantilla de confort antiestática y extraíble", "Refuerzo de espuma de poliuretano en la zona del talón"]'::jsonb
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
    'en', '["Shock-absorbing uvex i-PUREnrj planet midsole with energy return technology", "Breathable Distance Mesh lining", "Lightweight and breathable micro-velour upper"]'::jsonb,
    'it', '["Intersuola uvex i-PUREnrj planet ammortizzante e con tecnologia di recupero di energia,", "Fodera Distance Mesh traspirante", "Tomaia in microvelluto leggero e traspirante"]'::jsonb,
    'fr', '["Semelle intermédiaire uvex i-PUREnrj planet amortissante et dotée d''une technologie de restitution d''énergie,", "Doublure Distance Mesh respirante", "Tige en microvelours léger et respirant"]'::jsonb,
    'de', '["Zwischensohle uvex i-PUREnrj planet, dämpfend und mit Energierückgewinnungstechnologie,", "Atmungsaktives Distance-Mesh-Futter", "Schaft aus leichtem und atmungsaktivem Mikrovelours"]'::jsonb,
    'es', '["Entresuela uvex i-PUREnrj planet amortiguadora y con tecnología de recuperación de energía,", "Forro Distance Mesh transpirable", "Empeine de microvelour ligero y transpirable"]'::jsonb
  ),
  footwear_materials_locales = COALESCE(footwear_materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"sole": "Rubber", "upper": "Distance-Mesh", "insole": "Microfibre + PU foam", "lining": "Distance-Mesh", "toe_cap": "PU foam, Plastic"}'::jsonb
  )
WHERE id = '5e3b16ac-3347-402f-ba5e-4946a34f4ef8';

-- maccrossroad-3-0-low
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Maccrossroad 3.0 LOW"'::jsonb,
    'it', '"Maccrossroad 3.0 LOW"'::jsonb,
    'fr', '"Maccrossroad 3.0 LOW"'::jsonb,
    'de', '"Maccrossroad 3.0 LOW"'::jsonb,
    'es', '"Maccrossroad 3.0 LOW"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boot S3/S3L class with rubber sole"'::jsonb,
    'it', '"Scarpa di sicurezza classe S3 con suola in gomma ed inserti MACABSORB EVA per maggiore flessibilità"'::jsonb,
    'fr', '"Chaussure de sécurité classe S3 avec semelle en caoutchouc et inserts MACABSORB EVA pour plus de flexibilité"'::jsonb,
    'de', '"Sicherheitsschuh der Klasse S3 mit Gummisohle und MACABSORB-EVA-Einsätzen für mehr Flexibilität"'::jsonb,
    'es', '"Zapato de seguridad clase S3 con suela de caucho e insertos MACABSORB EVA para mayor flexibilidad"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boot S3/S3L class with rubber sole"'::jsonb,
    'it', '"Scarponcino di sicurezza classe S3/S3L con suola in gomma"'::jsonb,
    'fr', '"Chaussure montante de sécurité classe S3/S3L avec semelle en caoutchouc"'::jsonb,
    'de', '"Sicherheitsschnürstiefel der Klasse S3/S3L mit Gummisohle"'::jsonb,
    'es', '"Botín de seguridad clase S3/S3L con suela de goma"'::jsonb
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
    'en', '["Oil, hydrocarbons and chemical resistant sole, for up to 300˚C", "Metatarsal protection 100 Joules fully integrated into the tongue", "Metal-free toe cap and penetration resistant sole", "Eccellente aderenza (SRC)"]'::jsonb,
    'it', '["Eccellente aderenza (SRC)", "Suola resistente a oli, idrocarburi e sostanze chimiche, fino a 300°C", "Protezione del metatarso da 100 Joule completamente integrata nella linguetta", "Punta e suola antiperforazione senza metallo"]'::jsonb,
    'fr', '["Adhérence exceptionnelle (SRC)", "Semelle résistante aux huiles, aux hydrocarbures et aux substances chimiques, jusqu''à 300°C", "Protection du métatarse de 100 Joules entièrement intégrée dans la languette", "Embout et semelle anti-perforation sans métal"]'::jsonb,
    'de', '["Hervorragende Rutschhemmung (SRC)", "Sohle beständig gegen Öle, Kohlenwasserstoffe und Chemikalien, bis 300°C", "Vollständig in die Lasche integrierter Metatarsalschutz mit 100 Joule", "Metallfreie Zehenkappe und durchtrittsichere Sohle"]'::jsonb,
    'es', '["Adherencia excepcional (SRC)", "Suela resistente a aceites, hidrocarburos y sustancias químicas, hasta 300°C", "Protección del metatarso de 100 julios totalmente integrada en la lengüeta", "Puntera y suela antiperforación sin metal"]'::jsonb
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
    'it', '["Servizi pubblici", "costruzioni", "petrolio e gas", "industria pesante", "settore ferroviario", "porti", "difesa e agricoltura"]'::jsonb,
    'fr', '["Services publics", "constructions", "pétrole et gaz", "industrie lourde", "secteur ferroviaire", "ports", "défense et agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Bauwesen", "Öl und Gas", "Schwerindustrie", "Bahnsektor", "Häfen", "Verteidigung und Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "construcciones", "petróleo y gas", "industria pesada", "sector ferroviario", "puertos", "defensa y agricultura"]'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Rubber sole with insert in forefoot & heel for excellent shock absorption and flexibility", "Ergonomic sole supports natural rolling movement of the foot  and all-terrain sole profile disperses surface debris for better grip", "Ankle Guard & reinforced heel supports foot for better stability especially on uneven surfaces while retaining a high level of movement", "Anatomically shaped insole wih shock absorbers in the heel and forefoot and microfibre layer for better abrasion resistance"]'::jsonb,
    'it', '["Suola in gomma con inserti su avampiede e tallone per eccellente assorbimento degli urti e flessibilità", "Suola ergonomica che supporta il naturale movimento rotatorio del piede e profilo all-terrain che disperde detriti superficiali per una migliore aderenza", "Protezione caviglia e tallone rinforzato supportano il piede per maggiore stabilità, soprattutto su superfici irregolari, mantenendo comunque un alto livello di movimento", "Sottopiede anatomico con ammortizzatori su tallone e avampiede e strato in microfibra per maggiore resistenza all’abrasione"]'::jsonb,
    'fr', '["Semelle en caoutchouc avec inserts à l''avant-pied et au talon pour une excellente absorption des chocs et une grande flexibilité", "Semelle ergonomique qui soutient le mouvement rotatif naturel du pied et profil tout-terrain qui évacue les débris superficiels pour une meilleure adhérence", "La protection de la cheville et le talon renforcé soutiennent le pied pour plus de stabilité, notamment sur les surfaces irrégulières, tout en conservant un haut niveau de mobilité", "Semelle intérieure anatomique avec amortisseurs au talon et à l''avant-pied et couche en microfibre pour une meilleure résistance à l''abrasion"]'::jsonb,
    'de', '["Gummisohle mit Einsätzen im Vorfuß- und Fersenbereich für hervorragende Stoßdämpfung und Flexibilität", "Ergonomische Sohle, die die natürliche Drehbewegung des Fußes unterstützt, mit Allgelände-Profil, das Oberflächenschmutz ableitet für besseren Grip", "Knöchelschutz und verstärkte Ferse stützen den Fuß für mehr Stabilität, insbesondere auf unebenen Untergründen, bei gleichzeitig hoher Bewegungsfreiheit", "Anatomisches Fußbett mit Dämpfung im Fersen- und Vorfußbereich sowie einer Mikrofaserschicht für höhere Abriebfestigkeit"]'::jsonb,
    'es', '["Suela de caucho con insertos en el antepié y el talón para una excelente absorción de impactos y flexibilidad", "Suela ergonómica que favorece el movimiento rotatorio natural del pie y perfil todoterreno que dispersa los residuos superficiales para un mejor agarre", "La protección del tobillo y el talón reforzado sostienen el pie para mayor estabilidad, especialmente en superficies irregulares, manteniendo un alto nivel de movimiento", "Plantilla anatómica con amortiguadores en el talón y el antepié y capa de microfibra para mayor resistencia a la abrasión"]'::jsonb
  )
WHERE id = '7c2dce68-e64f-400a-94ef-594959df3553';

-- 49k
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"49K"'::jsonb,
    'it', '"49K"'::jsonb,
    'fr', '"49K"'::jsonb,
    'de', '"49K"'::jsonb,
    'es', '"49K"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Five‑finger welder’s glove in bovine split leather, fully lined.\nIdeal for medium to heavy welding and handling.\n\nAvailable in multiple colors (incl. natural)."'::jsonb,
    'it', '"Guanto per saldatore a cinque dita in pelle crosta bovina, totalmente foderato.\nIdeale per saldature e manipolazione medie/pesanti.\n\nDisponibile in diverse colorazioni (incl. naturale)."'::jsonb,
    'fr', '"Gant de soudeur à cinq doigts en croûte de cuir bovin, entièrement doublé.\nIdéal pour le soudage et la manipulation moyenne/lourde.\n\nDisponible en plusieurs coloris (y compris naturel)."'::jsonb,
    'de', '"Fünffinger-Schweißerhandschuh aus Rindspaltleder, vollständig gefüttert.\nIdeal zum Schweißen und für mittlere/schwere Handhabungsarbeiten.\n\nErhältlich in verschiedenen Farben (inkl. Naturfarbe)."'::jsonb,
    'es', '"Guante de soldador de cinco dedos de serraje de vacuno, totalmente forrado.\nIdeal para soldadura y manipulación media/pesada.\n\nDisponible en diferentes colores (incl. natural)."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lined cowhide-leather welder’s glove with a Kevlar insert on the back."'::jsonb,
    'it', '"Guanto per saldatore in pelle crosta bovina, foderato, con inserto in Kevlar sul dorso."'::jsonb,
    'fr', '"Gant de soudeur en croûte de cuir bovin, doublé, avec insert en Kevlar sur le dos."'::jsonb,
    'de', '"Schweißerhandschuh aus Rindspaltleder, gefüttert, mit Kevlar-Einsatz am Handrücken."'::jsonb,
    'es', '"Guante de soldador de serraje de vacuno, forrado, con inserto de Kevlar en el dorso."'::jsonb
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
    'en', '["Excellent contact-heat protection (250 °C)", "High flame resistance", "High tear resistance", "Available colors: Gray, Green, Brick"]'::jsonb,
    'it', '["Ottima protezione calore da contatto (250˚C)", "Elevata resistenza all’infiammabilità", "Elevata resistenza allo strappo", "Colori disponibili: Grigio, Verde, Mattone"]'::jsonb,
    'fr', '["Excellente protection contre la chaleur de contact (250˚C)", "Haute résistance à l’inflammabilité", "Haute résistance à la déchirure", "Coloris disponibles : Gris, Vert, Brique"]'::jsonb,
    'de', '["Ausgezeichneter Schutz gegen Kontakthitze (250˚C)", "Hohe Beständigkeit gegen Entflammbarkeit", "Hohe Reißfestigkeit", "Verfügbare Farben: Grau, Grün, Ziegelrot"]'::jsonb,
    'es', '["Excelente protección contra el calor de contacto (250˚C)", "Alta resistencia a la inflamabilidad", "Alta resistencia al desgarro", "Colores disponibles: Gris, Verde, Ladrillo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glove designed for welding operations", "Suitable for operations and handling in the glass & steel industry", "Handling metal slags"]'::jsonb,
    'it', '["Guanto progettato per operazioni di saldatura", "Indicato nelle lavorazioni e manipolazione nell''industria del vetro e dell''acciaio", "Movimentazione di scorie metalliche"]'::jsonb,
    'fr', '["Gant conçu pour les opérations de soudage", "Indiqué pour les travaux et la manipulation dans l''industrie du verre et de l''acier", "Manutention de scories métalliques"]'::jsonb,
    'de', '["Handschuh für Schweißarbeiten konzipiert", "Geeignet für Bearbeitung und Handhabung in der Glas- und Stahlindustrie", "Handhabung von Metallschlacke"]'::jsonb,
    'es', '["Guante diseñado para operaciones de soldadura", "Indicado para trabajos y manipulación en la industria del vidrio y del acero", "Manipulación de escorias metálicas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial welding", "Carpentry", "Metallurgical industry", "Glass industry"]'::jsonb,
    'it', '["Saldatura industriale", "Carpenteria", "Industria metallurgica", "Industria del vetro"]'::jsonb,
    'fr', '["Soudage industriel", "Charpente métallique", "Industrie métallurgique", "Industrie du verre"]'::jsonb,
    'de', '["Industrielles Schweißen", "Stahlbau", "Metallurgische Industrie", "Glasindustrie"]'::jsonb,
    'es', '["Soldadura industrial", "Carpintería metálica", "Industria metalúrgica", "Industria del vidrio"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welder’s glove", "leather glove", "dexterity", "250 °C"]'::jsonb,
    'it', '["Guanto per saldatore", "guanto in pelle", "destrezza", "250°C"]'::jsonb,
    'fr', '["Gant de soudeur", "gant en cuir", "dextérité", "250 °C"]'::jsonb,
    'de', '["Schweißerhandschuh", "Lederhandschuh", "Fingerfertigkeit", "250 °C"]'::jsonb,
    'es', '["Guante de soldador", "guante de cuero", "destreza", "250 °C"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["leather"]'::jsonb,
    'it', '["pelle"]'::jsonb,
    'fr', '["cuir"]'::jsonb,
    'de', '["Leder"]'::jsonb,
    'es', '["cuero"]'::jsonb
  )
WHERE id = '110a9c54-9891-449c-b34c-91dc040c5017';

-- maccrossroad-3-0-hight
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Maccrossroad 3.0 HIGHT"'::jsonb,
    'it', '"Maccrossroad 3.0 LOW (2)"'::jsonb,
    'fr', '"Maccrossroad 3.0 LOW (2)"'::jsonb,
    'de', '"Maccrossroad 3.0 LOW (2)"'::jsonb,
    'es', '"Maccrossroad 3.0 LOW (2)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boot S3/S3L class with rubber sole"'::jsonb,
    'it', '"Scarpa di sicurezza classe S3 con suola in gomma ed inserti MACABSORB EVA per maggiore flessibilità"'::jsonb,
    'fr', '"Chaussure de sécurité classe S3 avec semelle en caoutchouc et inserts MACABSORB EVA pour plus de flexibilité"'::jsonb,
    'de', '"Sicherheitsschuh der Klasse S3 mit Gummisohle und MACABSORB-EVA-Einsätzen für mehr Flexibilität"'::jsonb,
    'es', '"Zapato de seguridad clase S3 con suela de caucho e insertos MACABSORB EVA para mayor flexibilidad"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safety boot S3/S3L class with rubber sole"'::jsonb,
    'it', '"Scarponcino di sicurezza classe S3/S3L con suola in gomma"'::jsonb,
    'fr', '"Chaussure montante de sécurité classe S3/S3L avec semelle en caoutchouc"'::jsonb,
    'de', '"Sicherheitsschnürstiefel der Klasse S3/S3L mit Gummisohle"'::jsonb,
    'es', '"Botín de seguridad clase S3/S3L con suela de goma"'::jsonb
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
    'en', '["Oil, hydrocarbons and chemical resistant sole, for up to 300˚C", "Metatarsal protection 100 Joules fully integrated into the tongue", "Metal-free toe cap and penetration resistant sole", "Eccellente aderenza (SRC)"]'::jsonb,
    'it', '["Eccellente aderenza (SRC)", "Suola resistente a oli, idrocarburi e sostanze chimiche, fino a 300°C", "Protezione del metatarso da 100 Joule completamente integrata nella linguetta", "Punta e suola antiperforazione senza metallo"]'::jsonb,
    'fr', '["Adhérence exceptionnelle (SRC)", "Semelle résistante aux huiles, aux hydrocarbures et aux substances chimiques, jusqu''à 300°C", "Protection du métatarse de 100 Joules entièrement intégrée dans la languette", "Embout et semelle anti-perforation sans métal"]'::jsonb,
    'de', '["Hervorragende Rutschhemmung (SRC)", "Sohle beständig gegen Öle, Kohlenwasserstoffe und Chemikalien, bis 300°C", "Vollständig in die Lasche integrierter Metatarsalschutz mit 100 Joule", "Metallfreie Zehenkappe und durchtrittsichere Sohle"]'::jsonb,
    'es', '["Adherencia excepcional (SRC)", "Suela resistente a aceites, hidrocarburos y sustancias químicas, hasta 300°C", "Protección del metatarso de 100 julios totalmente integrada en la lengüeta", "Puntera y suela antiperforación sin metal"]'::jsonb
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
    'it', '["Servizi pubblici", "costruzioni", "petrolio e gas", "industria pesante", "settore ferroviario", "porti", "difesa e agricoltura"]'::jsonb,
    'fr', '["Services publics", "constructions", "pétrole et gaz", "industrie lourde", "secteur ferroviaire", "ports", "défense et agriculture"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Bauwesen", "Öl und Gas", "Schwerindustrie", "Bahnsektor", "Häfen", "Verteidigung und Landwirtschaft"]'::jsonb,
    'es', '["Servicios públicos", "construcciones", "petróleo y gas", "industria pesada", "sector ferroviario", "puertos", "defensa y agricultura"]'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Rubber sole with insert in forefoot & heel for excellent shock absorption and flexibility", "Ergonomic sole supports natural rolling movement of the foot  and all-terrain sole profile disperses surface debris for better grip", "Ankle Guard & reinforced heel supports foot for better stability especially on uneven surfaces while retaining a high level of movement", "Anatomically shaped insole wih shock absorbers in the heel and forefoot and microfibre layer for better abrasion resistance"]'::jsonb,
    'it', '["Suola in gomma con inserti su avampiede e tallone per eccellente assorbimento degli urti e flessibilità", "Suola ergonomica che supporta il naturale movimento rotatorio del piede e profilo all-terrain che disperde detriti superficiali per una migliore aderenza", "Protezione caviglia e tallone rinforzato supportano il piede per maggiore stabilità, soprattutto su superfici irregolari, mantenendo comunque un alto livello di movimento", "Sottopiede anatomico con ammortizzatori su tallone e avampiede e strato in microfibra per maggiore resistenza all’abrasione"]'::jsonb,
    'fr', '["Semelle en caoutchouc avec inserts à l''avant-pied et au talon pour une excellente absorption des chocs et une grande flexibilité", "Semelle ergonomique qui soutient le mouvement rotatif naturel du pied et profil tout-terrain qui évacue les débris superficiels pour une meilleure adhérence", "La protection de la cheville et le talon renforcé soutiennent le pied pour plus de stabilité, notamment sur les surfaces irrégulières, tout en conservant un haut niveau de mobilité", "Semelle intérieure anatomique avec amortisseurs au talon et à l''avant-pied et couche en microfibre pour une meilleure résistance à l''abrasion"]'::jsonb,
    'de', '["Gummisohle mit Einsätzen im Vorfuß- und Fersenbereich für hervorragende Stoßdämpfung und Flexibilität", "Ergonomische Sohle, die die natürliche Drehbewegung des Fußes unterstützt, mit Allgelände-Profil, das Oberflächenschmutz ableitet für besseren Grip", "Knöchelschutz und verstärkte Ferse stützen den Fuß für mehr Stabilität, insbesondere auf unebenen Untergründen, bei gleichzeitig hoher Bewegungsfreiheit", "Anatomisches Fußbett mit Dämpfung im Fersen- und Vorfußbereich sowie einer Mikrofaserschicht für höhere Abriebfestigkeit"]'::jsonb,
    'es', '["Suela de caucho con insertos en el antepié y el talón para una excelente absorción de impactos y flexibilidad", "Suela ergonómica que favorece el movimiento rotatorio natural del pie y perfil todoterreno que dispersa los residuos superficiales para un mejor agarre", "La protección del tobillo y el talón reforzado sostienen el pie para mayor estabilidad, especialmente en superficies irregulares, manteniendo un alto nivel de movimiento", "Plantilla anatómica con amortiguadores en el talón y el antepié y capa de microfibra para mayor resistencia a la abrasión"]'::jsonb
  )
WHERE id = 'a8871897-a0c1-483a-b970-f8cc6a251693';

-- 00-810
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"00-810"'::jsonb,
    'it', '"00-810"'::jsonb,
    'fr', '"00-810"'::jsonb,
    'de', '"00-810"'::jsonb,
    'es', '"00-810"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18G grey graphene nylon liner, black nitrile palm coated glove. Reinforcement on crotch"'::jsonb,
    'it', '"Guanto 18 aghi con fodera in nylon grafene grigio, palmo rivestito in nitrile nero. Crotch rinforzato"'::jsonb,
    'fr', '"Gant 18 jauges avec doublure en nylon graphène gris, paume enduite de nitrile noir. Fourchette renforcée"'::jsonb,
    'de', '"18-Gauge-Handschuh mit grauem Graphen-Nylon-Futter, Handfläche mit schwarzer Nitrilbeschichtung. Verstärkter Fingerzwickel"'::jsonb,
    'es', '"Guante de 18 galgas con forro de nylon grafeno gris, palma recubierta de nitrilo negro. Horquilla reforzada"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"18G grey graphene nylon liner, black nitrile palm coated glove. Reinforcement on crotch"'::jsonb,
    'it', '"Guanto 18 aghi con fodera in nylon grafene grigio, palmo rivestito in nitrile nero"'::jsonb,
    'fr', '"Gant 18 jauges avec doublure en nylon graphène gris, paume enduite de nitrile noir"'::jsonb,
    'de', '"18-Gauge-Handschuh mit grauem Graphen-Nylon-Futter, Handfläche mit schwarzer Nitrilbeschichtung"'::jsonb,
    'es', '"Guante de 18 galgas con forro de nylon grafeno gris, palma recubierta de nitrilo negro"'::jsonb
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
    'en', '["No stainless steel or fiberglass", "DMF and silicone free", "Ergonomically shaped for superior fit", "Bacteriostatic kills harmful bacteria", "Touch screen", "Black nitrile palm coating"]'::jsonb,
    'it', '["Senza DMF e senza silicone", "Niente acciaio inossidabile o fibra di vetro", "Forma ergonomica per una vestibilità superiore", "Batteriostatico per eliminare i batteri nocivi", "Palmo rivestito in nitrile nero", "Compatibile con touch screen"]'::jsonb,
    'fr', '["Sans DMF ni silicone", "Pas d''acier inoxydable ni de fibre de verre", "Forme ergonomique pour un ajustement supérieur", "Bactériostatique pour éliminer les bactéries nocives", "Paume enduite de nitrile noir", "Compatible avec écran tactile"]'::jsonb,
    'de', '["Ohne DMF und ohne Silikon", "Kein Edelstahl oder Glasfaser", "Ergonomische Form für optimalen Sitz", "Bakteriostatisch zur Beseitigung schädlicher Bakterien", "Handfläche mit schwarzer Nitrilbeschichtung", "Kompatibel mit Touchscreens"]'::jsonb,
    'es', '["Sin DMF y sin silicona", "Sin acero inoxidable ni fibra de vidrio", "Forma ergonómica para un ajuste superior", "Bacteriostático para eliminar las bacterias nocivas", "Palma recubierta de nitrilo negro", "Compatible con pantalla táctil"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Maintenance activitites", "Warehousing in warm and cold temperatures", "Landscaping"]'::jsonb,
    'it', '["Manutenzione", "Magazzinaggio a temperature calde o basse", "Giardinaggio e paesaggistica"]'::jsonb,
    'fr', '["Maintenance", "Stockage à températures chaudes ou basses", "Jardinage et aménagement paysager"]'::jsonb,
    'de', '["Wartung", "Lagerung bei hohen oder niedrigen Temperaturen", "Garten- und Landschaftsbau"]'::jsonb,
    'es', '["Mantenimiento", "Almacenamiento a temperaturas altas o bajas", "Jardinería y paisajismo"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive manufacturing", "Warehousing"]'::jsonb,
    'it', '["Automobilistica", "Magazzinaggio"]'::jsonb,
    'fr', '["Automobile", "Entreposage"]'::jsonb,
    'de', '["Automobilbranche", "Lagerhaltung"]'::jsonb,
    'es', '["Automotriz", "Almacenamiento"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["protection glove", "graphene"]'::jsonb,
    'it', '["Guanto di protezione", "Grafene"]'::jsonb,
    'fr', '["Gant de protection", "Graphène"]'::jsonb,
    'de', '["Schutzhandschuh", "Graphen"]'::jsonb,
    'es', '["Guante de protección", "Grafeno"]'::jsonb
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
WHERE id = '8b727af7-c619-4703-be57-620b5c234e66';

-- 5-6-comfort-light
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"5/6 comfort light"'::jsonb,
    'it', '"5/6 comfort light"'::jsonb,
    'fr', '"5/6 comfort light"'::jsonb,
    'de', '"5/6 comfort light"'::jsonb,
    'es', '"5/6 comfort light"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The disposable coverall is made from lightweight laminated uvex com4 material, combined with an SMS back panel for enhanced breathability."'::jsonb,
    'it', '"La tuta monouso costituita dal leggero materiale laminato com4 uvex in combinazione con una parte posteriore in SMS per una maggiore traspirabilità."'::jsonb,
    'fr', '"La combinaison jetable est constituée du matériau laminé léger com4 uvex associé à un dos en SMS pour une meilleure respirabilité."'::jsonb,
    'de', '"Der Einwegoverall besteht aus dem leichten com4-Laminatmaterial von uvex in Kombination mit einem SMS-Rücken für eine höhere Atmungsaktivität."'::jsonb,
    'es', '"El mono desechable está fabricado con el ligero material laminado com4 de uvex combinado con una parte posterior de SMS para una mayor transpirabilidad."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Chemical protective coverall"'::jsonb,
    'it', '"Tuta di protezione dalle sostanze chimiche"'::jsonb,
    'fr', '"Combinaison de protection chimique"'::jsonb,
    'de', '"Chemikalienschutzanzug"'::jsonb,
    'es', '"Traje de protección química"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"safety suit"'::jsonb,
    'fr', '"combinaison de sécurité"'::jsonb,
    'de', '"Schutzanzug"'::jsonb,
    'es', '"traje de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Particle-tight and limited splash-tight", "The combination of laminated com4 material and an SMS back panel ensures a high level of moisture management without compromising the level of protection", "Free from silicones and substances that can damage the painting process"]'::jsonb,
    'it', '["A tenuta di particelle e a tenuta limitata di spruzzi", "La combinazione del materiale laminato com4 e della parte posteriore in SMS garantisce una gestione dell''umidità di livello elevato senza pregiudicare il grado di protezione", "Priva di siliconi e di sostanze che danneggiano il processo di verniciatura", "Materiale in tessuto non tessuto rispettoso della pelle sul lato interno", "Parte posteriore in SMS traspirante", "Chiusura con cerniera doppia"]'::jsonb,
    'fr', '["Étanche aux particules et à étanchéité limitée aux projections liquides", "La combinaison du matériau laminé com4 et du dos en SMS garantit une gestion de l''humidité de haut niveau sans compromettre le degré de protection", "Sans silicone ni substances nuisibles au processus de peinture", "Matériau en non-tissé respectueux de la peau sur la face intérieure", "Dos en SMS respirant", "Fermeture à double fermeture éclair"]'::jsonb,
    'de', '["Partikeldicht und begrenzt spritzdicht", "Die Kombination aus com4-Laminatmaterial und SMS-Rücken sorgt für ein hohes Maß an Feuchtigkeitsmanagement, ohne den Schutzgrad zu beeinträchtigen", "Frei von Silikonen und Stoffen, die den Lackierprozess beeinträchtigen", "Hautfreundliches Vliesstoffmaterial auf der Innenseite", "Atmungsaktiver SMS-Rücken", "Verschluss mit doppeltem Reißverschluss"]'::jsonb,
    'es', '["Estanco a partículas y con estanqueidad limitada a salpicaduras", "La combinación del material laminado com4 y la parte posterior de SMS garantiza una gestión de la humedad de alto nivel sin comprometer el grado de protección", "Libre de siliconas y de sustancias que perjudican el proceso de pintado", "Material de tejido no tejido respetuoso con la piel en el lado interior", "Parte posterior de SMS transpirable", "Cierre con cremallera doble"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Processing involving chemical and harmful substances"]'::jsonb,
    'it', '["Lavorazioni con sostanze chimiche e nocive"]'::jsonb,
    'fr', '["Travaux avec des substances chimiques et nocives"]'::jsonb,
    'de', '["Arbeiten mit chemischen und schädlichen Substanzen"]'::jsonb,
    'es', '["Trabajos con sustancias químicas y nocivas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial painting", "chemical companies"]'::jsonb,
    'it', '["Verniciatura", "aziende chimiche"]'::jsonb,
    'fr', '["Peinture", "entreprises chimiques"]'::jsonb,
    'de', '["Lackieren", "Chemieunternehmen"]'::jsonb,
    'es', '["Pintura", "empresas químicas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Altri indumenti protettivi"]'::jsonb,
    'fr', '["Autres vêtements de protection"]'::jsonb,
    'de', '["Andere Schutzkleidung"]'::jsonb,
    'es', '["Otras prendas de protección"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["100% Polypropylen"]'::jsonb,
    'it', '["100% polipropilene"]'::jsonb,
    'fr', '["100 % polypropylène"]'::jsonb,
    'de', '["100 % Polypropylen"]'::jsonb,
    'es', '["100 % polipropileno"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN ISO 13688: Yes", "EN 13034: Type 6"]'::jsonb,
    'it', '["EN ISO 13688: Yes", "EN 1073: Yes", "EN 13034: Yes"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui", "EN 1073 : Oui", "EN 13034 : Oui"]'::jsonb,
    'de', '["EN ISO 13688: Ja", "EN 1073: Ja", "EN 13034: Ja"]'::jsonb,
    'es', '["EN ISO 13688: Sí", "EN 1073: Sí", "EN 13034: Sí"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb
  )
WHERE id = '7c7e7389-9ae9-4417-9462-9d79431503a2';

-- 1-x-craft
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"1 x-craft"'::jsonb,
    'it', '"1 x-craft"'::jsonb,
    'fr', '"1 x-craft"'::jsonb,
    'de', '"1 x-craft"'::jsonb,
    'es', '"1 x-craft"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The uvex 1 x-craft is a state-of-the-art footwear solution for light-duty applications."'::jsonb,
    'it', '"La uvex 1 x-craft è una calzatura all''avanguardia per ambiti di applicazioni leggere"'::jsonb,
    'fr', '"La uvex 1 x-craft est une chaussure à la pointe de la technologie pour les applications légères"'::jsonb,
    'de', '"Der uvex 1 x-craft ist ein hochmoderner Schuh für den Einsatz in leichten Anwendungsbereichen"'::jsonb,
    'es', '"El uvex 1 x-craft es un calzado de vanguardia para ámbitos de aplicación ligeros"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible S1 shoe with a rubber sole"'::jsonb,
    'it', '"Scarpa S1 leggera e flessibile con suola in gomma"'::jsonb,
    'fr', '"Chaussure S1 légère et flexible avec semelle en caoutchouc"'::jsonb,
    'de', '"Leichter und flexibler S1-Schuh mit Gummisohle"'::jsonb,
    'es', '"Calzado S1 ligero y flexible con suela de caucho"'::jsonb
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
    'fr', '"Chaussures de sécurité"'::jsonb,
    'de', '"Sicherheitsschuhe"'::jsonb,
    'es', '"Calzado de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Antistatic", "Short-term heat-resistant up to 120C", "Oil and fuel resistant (FO)", "Free of silicones, plasticisers and other substances that interfere with wetting  agents", "Sporty low-cut S1 PL safety shoes, particularly lightweight"]'::jsonb,
    'it', '["Scarpe basse antinfortunistiche sportive S1 PL particolarmente leggere", "Certificazione ESD", "Resistenza alla penetrazione del tessuto flessibile"]'::jsonb,
    'fr', '["Chaussures basses de sécurité sportives S1 PL particulièrement légères", "Certification ESD", "Résistance à la pénétration du tissu flexible"]'::jsonb,
    'de', '["Besonders leichte niedrige Sicherheits-Sportschuhe S1 PL", "ESD-Zertifizierung", "Durchdringungswiderstand des flexiblen Gewebes"]'::jsonb,
    'es', '["Zapatos bajos de seguridad deportivos S1 PL especialmente ligeros", "Certificación ESD", "Resistencia a la penetración del tejido flexible"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Light-duty applications", "Activities in indoor and outdoor environments"]'::jsonb,
    'it', '["Applicazioni leggere", "Attivita'' in ambiente interno ed esterno"]'::jsonb,
    'fr', '["Applications légères", "Activités en intérieur et en extérieur"]'::jsonb,
    'de', '["Leichte Anwendungen", "Tätigkeiten in Innen- und Außenbereichen"]'::jsonb,
    'es', '["Aplicaciones ligeras", "Actividades en interiores y exteriores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Healthcare", "Public services"]'::jsonb,
    'it', '["Servizi pubblici", "Sanita''"]'::jsonb,
    'fr', '["Services publics", "Santé"]'::jsonb,
    'de', '["Öffentliche Dienstleistungen", "Gesundheitswesen"]'::jsonb,
    'es', '["Servicios públicos", "Sanidad"]'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["shock-absorbing and energy-returning midsole", "ergonomically designed PU outsole", "Individually adjustable elastic laces with a quick fastening mechanism"]'::jsonb,
    'it', '["Lacci elastici regolabili individualmente con meccanismo di fissaggio rapido"]'::jsonb,
    'fr', '["Lacets élastiques réglables individuellement avec système de fixation rapide"]'::jsonb,
    'de', '["Individuell verstellbare elastische Schnürsenkel mit Schnellverschluss"]'::jsonb,
    'es', '["Cordones elásticos ajustables individualmente con sistema de fijación rápida"]'::jsonb
  ),
  footwear_materials_locales = COALESCE(footwear_materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"sole": "Rubber", "upper": "Distance-Mesh", "insole": "Microfibre + PU foam", "lining": "Distance-Mesh", "toe_cap": "PU foam, Plastic"}'::jsonb,
    'it', '{"sole": "Gomma", "upper": "Distance-Mesh", "insole": "Microfibra + schiuma di PU", "lining": "Distance-Mesh", "toe_cap": "Schiuma di poliuretano, Plastica"}'::jsonb,
    'fr', '{"sole": "Caoutchouc", "upper": "Distance-Mesh", "insole": "Microfibre + mousse PU", "lining": "Distance-Mesh", "toe_cap": "Mousse de polyuréthane, Plastique"}'::jsonb,
    'de', '{"sole": "Gummi", "upper": "Distance-Mesh", "insole": "Mikrofaser + PU-Schaum", "lining": "Distance-Mesh", "toe_cap": "Polyurethanschaum, Kunststoff"}'::jsonb,
    'es', '{"sole": "Caucho", "upper": "Distance-Mesh", "insole": "Microfibra + espuma de PU", "lining": "Distance-Mesh", "toe_cap": "Espuma de poliuretano, Plástico"}'::jsonb
  ),
  footwear_special_features_locales = COALESCE(footwear_special_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ideal for people with chrome allergies, thanks to the use of synthetic materials", "All sole materials are free from silicones, plasticizers, and other substances that can damage the painting process"]'::jsonb,
    'it', '["Ideali per chi presenta allergie al cromo, grazie alla realizzazione in materiali sintetici", "Tutte le suole sono composte di materiali privi di siliconi, plastificanti e altre sostanze che danneggiano il processo di verniciatura"]'::jsonb,
    'fr', '["Idéales pour les personnes allergiques au chrome, grâce à leur fabrication en matériaux synthétiques", "Toutes les semelles sont composées de matériaux exempts de silicone, de plastifiants et d''autres substances nuisibles au processus de peinture"]'::jsonb,
    'de', '["Ideal für Personen mit Chromallergie dank der Verarbeitung aus synthetischen Materialien", "Alle Sohlen bestehen aus Materialien, die frei von Silikonen, Weichmachern und anderen Stoffen sind, die den Lackierprozess beeinträchtigen"]'::jsonb,
    'es', '["Ideales para quienes presentan alergia al cromo, gracias a su fabricación en materiales sintéticos", "Todas las suelas están fabricadas con materiales libres de siliconas, plastificantes y otras sustancias que perjudican el proceso de pintado"]'::jsonb
  )
WHERE id = 'dfde9f6c-b978-415f-84f2-ff2d8bc89708';

-- 5-6-classic-light
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"5/6 classic light"'::jsonb,
    'it', '"5/6 classic light"'::jsonb,
    'fr', '"5/6 classic light"'::jsonb,
    'de', '"5/6 classic light"'::jsonb,
    'es', '"5/6 classic light"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"The lightweight disposable uvex 5/6 classic light coverall offers reliable protection while also providing maximum comfort."'::jsonb,
    'it', '"La leggera tuta monouso uvex 5/6 classic light offre una protezione affidabile fornendo al contempo il massimo livello di comfort."'::jsonb,
    'fr', '"La combinaison jetable légère uvex 5/6 classic light offre une protection fiable tout en garantissant un niveau de confort maximal."'::jsonb,
    'de', '"Der leichte Einwegoverall uvex 5/6 classic light bietet zuverlässigen Schutz und gleichzeitig ein Höchstmaß an Komfort."'::jsonb,
    'es', '"El ligero mono desechable uvex 5/6 classic light ofrece una protección fiable proporcionando al mismo tiempo el máximo nivel de confort."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Chemical protective coverall"'::jsonb,
    'it', '"Tuta di protezione dalle sostanze chimiche"'::jsonb,
    'fr', '"Combinaison de protection chimique"'::jsonb,
    'de', '"Chemikalienschutzanzug"'::jsonb,
    'es', '"Traje de protección química"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"safety suit"'::jsonb,
    'fr', '"combinaison de sécurité"'::jsonb,
    'de', '"Schutzanzug"'::jsonb,
    'es', '"traje de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Optimal protection thanks to the self-adhesive zipper flap", "Antistatic properties", "Protection against infectious agents", "Skin-friendly fleece inner lining", "Secure and comfortable closures thanks to elastic bands on the hood, arms, and legs", "Two-way zipper"]'::jsonb,
    'it', '["Protezione ottimale grazie alla copertura con cerniera autoadesiva", "Proprietà antistatiche", "Protezione dagli agenti infettivi", "Interno in pile delicato sulla pelle", "Chiusure sicure e confortevoli grazie agli elastici su cappuccio, braccia e gambe", "Cerniera bidirezionale"]'::jsonb,
    'fr', '["Protection optimale grâce au rabat autoadhésif recouvrant la fermeture éclair", "Propriétés antistatiques", "Protection contre les agents infectieux", "Intérieur en polaire douce pour la peau", "Fermetures sûres et confortables grâce aux élastiques sur la capuche, les bras et les jambes", "Fermeture éclair bidirectionnelle"]'::jsonb,
    'de', '["Optimaler Schutz durch die selbstklebende Reißverschlussabdeckung", "Antistatische Eigenschaften", "Schutz vor infektiösen Erregern", "Innenseite aus hautfreundlichem Fleece", "Sichere und komfortable Abschlüsse dank elastischer Bündchen an Kapuze, Ärmeln und Beinen", "Zweiwege-Reißverschluss"]'::jsonb,
    'es', '["Protección óptima gracias a la solapa autoadhesiva que cubre la cremallera", "Propiedades antiestáticas", "Protección frente a agentes infecciosos", "Interior de forro polar suave para la piel", "Cierres seguros y cómodos gracias a los elásticos en la capucha, los brazos y las piernas", "Cremallera bidireccional"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Processing involving chemical and harmful substances"]'::jsonb,
    'it', '["Lavorazioni con sostanze chimiche e nocive"]'::jsonb,
    'fr', '["Travaux avec des substances chimiques et nocives"]'::jsonb,
    'de', '["Arbeiten mit chemischen und schädlichen Substanzen"]'::jsonb,
    'es', '["Trabajos con sustancias químicas y nocivas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial painting", "chemical companies"]'::jsonb,
    'it', '["Verniciatura", "aziende chimiche"]'::jsonb,
    'fr', '["Peinture", "entreprises chimiques"]'::jsonb,
    'de', '["Lackieren", "Chemieunternehmen"]'::jsonb,
    'es', '["Pintura", "empresas químicas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'it', '["Altri indumenti protettivi"]'::jsonb,
    'fr', '["Autres vêtements de protection"]'::jsonb,
    'de', '["Andere Schutzkleidung"]'::jsonb,
    'es', '["Otras prendas de protección"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["100% Polypropylen"]'::jsonb,
    'it', '["100% polipropilene"]'::jsonb,
    'fr', '["100 % polypropylène"]'::jsonb,
    'de', '["100 % Polypropylen"]'::jsonb,
    'es', '["100 % polipropileno"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN ISO 13688: Yes", "EN 13034: Type 6", "EN 14126: Yes"]'::jsonb,
    'it', '["EN ISO 13688: Yes", "EN 1073: Yes", "EN 13034: Yes"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui", "EN 1073 : Oui", "EN 13034 : Oui"]'::jsonb,
    'de', '["EN ISO 13688: Ja", "EN 1073: Ja", "EN 13034: Ja"]'::jsonb,
    'es', '["EN ISO 13688: Sí", "EN 1073: Sí", "EN 13034: Sí"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '0d82e241-0d38-473c-bb79-537ce7bdd478';

-- 151-8
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"151/8"'::jsonb,
    'it', '"151/8"'::jsonb,
    'fr', '"151/8"'::jsonb,
    'de', '"151/8"'::jsonb,
    'es', '"151/8"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Thermal glove in 8 oz cotton with double-knit palm and knitted cuff for operations up to 250°C."'::jsonb,
    'it', '"Guanto in cotone 8 oz con palmo doppio garzato e polso maglia per operazioni fino a 250 °C."'::jsonb,
    'fr', '"Gant en coton 8 oz avec paume double grattée et poignet tricoté, pour des opérations jusqu''à 250 °C."'::jsonb,
    'de', '"Handschuh aus Baumwolle 8 oz mit aufgerauter Doppelpalme und gestricktem Bund, für Arbeiten bis 250 °C."'::jsonb,
    'es', '"Guante de algodón 8 oz con palma doble afelpada y puño de punto, para operaciones hasta 250 °C."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"8 oz cotton heat-resistant glove up to 250 °C"'::jsonb,
    'it', '"Guanto in cotone 8oz anticalore fino a 250C"'::jsonb,
    'fr', '"Gant en coton 8 oz anti-chaleur jusqu''à 250 °C"'::jsonb,
    'de', '"Hitzeschutzhandschuh aus Baumwolle 8 oz bis 250 °C"'::jsonb,
    'es', '"Guante de algodón 8 oz resistente al calor hasta 250 °C"'::jsonb
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
    'en', '["Lightweight and practical for tasks requiring good precision", "Knitted cuff to protect against potential sharp or hot objects", "Certified for contact temperature up to 250°C"]'::jsonb,
    'it', '["Leggero e pratico per operazioni che richiedono buona precisione", "Polso maglia per proteggere da potenziali corpi taglienti o caldi", "Certificato fino a 250°C al contatto"]'::jsonb,
    'fr', '["Léger et pratique pour les opérations nécessitant une bonne précision", "Poignet tricoté pour protéger contre les corps potentiellement coupants ou chauds", "Certifié jusqu''à 250 °C au contact"]'::jsonb,
    'de', '["Leicht und praktisch für Arbeiten, die eine gute Präzision erfordern", "Gestrickter Bund zum Schutz vor potenziell scharfen oder heißen Gegenständen", "Zertifiziert bis 250 °C bei Kontakt"]'::jsonb,
    'es', '["Ligero y práctico para operaciones que requieren buena precisión", "Puño de punto para proteger frente a posibles cuerpos cortantes o calientes", "Certificado hasta 250 °C al contacto"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 250°C", "Handling glass-industry objects outside the hot zone", "Light grooving work", "Industrial assembly in heated areas"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250°C", "Manipolazione oggetti nell''idustria del vetro fuori dalla zona calda", "Lavorazioni di scanalatura leggera", "Assemblaggio in reparti termici"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250°C", "Manipulation d''objets dans l''industrie du verre en dehors de la zone chaude", "Travaux de rainurage léger", "Assemblage dans des zones thermiques"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250°C", "Handhabung von Objekten in der Glasindustrie außerhalb der Heißzone", "Leichte Nutbearbeitung", "Montage in Wärmezonen"]'::jsonb,
    'es', '["Manipulación de piezas hasta 250°C", "Manipulación de objetos en la industria del vidrio fuera de la zona caliente", "Trabajos de ranurado ligero", "Montaje en zonas térmicas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Light construction", "Industrial assembly", "Thermal packaging", "Glass industry"]'::jsonb,
    'it', '["Edile leggero", "Assemblaggio industriale", "Packaging termico", "Industria del vetro"]'::jsonb,
    'fr', '["Bâtiment léger", "Assemblage industriel", "Emballage thermique", "Industrie du verre"]'::jsonb,
    'de', '["Leichtbau", "Industriemontage", "Thermoverpackung", "Glasindustrie"]'::jsonb,
    'es', '["Construcción ligera", "Ensamblaje industrial", "Embalaje térmico", "Industria del vidrio"]'::jsonb
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
WHERE id = 'b4a6d7a0-112d-40bd-b692-d4252b6970b5';

-- 4b
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"4B"'::jsonb,
    'it', '"4B"'::jsonb,
    'fr', '"4B"'::jsonb,
    'de', '"4B"'::jsonb,
    'es', '"4B"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Safe and breathable protective coverall. The taped seams ensure complete waterproofness of the garment."'::jsonb,
    'it', '"Tuta di protezione sicura e traspirante. Le cuciture nastrate garantiscono la completa impermeabilità della tuta"'::jsonb,
    'fr', '"Combinaison de protection sûre et respirante. Les coutures thermosoudées garantissent l''étanchéité totale de la combinaison"'::jsonb,
    'de', '"Sicherer und atmungsaktiver Schutzanzug. Die verklebten Nähte gewährleisten die vollständige Wasserdichtigkeit des Anzugs"'::jsonb,
    'es', '"Mono de protección seguro y transpirable. Las costuras termoselladas garantizan la total impermeabilidad del mono"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Chemical protective coverall"'::jsonb,
    'it', '"Tuta di protezione dalle sostanze chimiche"'::jsonb,
    'fr', '"Combinaison de protection chimique"'::jsonb,
    'de', '"Chemikalienschutzanzug"'::jsonb,
    'es', '"Traje de protección química"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"safety suit"'::jsonb,
    'fr', '"combinaison de sécurité"'::jsonb,
    'de', '"Schutzanzug"'::jsonb,
    'es', '"traje de seguridad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Antistatic properties", "Middle finger loop to prevent the sleeves from slipping up the arm", "Taped seams for complete waterproofness", "Skin‑friendly non‑woven fabric on the inner side", "Perfect fit thanks to the elastic waistband", "Closure with double zipper."]'::jsonb,
    'it', '["Cuciture nastrate per la completa impearmeabilità", "Anello per il dito medio che previene il rischio di scivolamento delle maniche sul braccio", "Proprietà antistatiche", "Materiale in tessuto non tessuto rispettoso della pelle sul lato interno", "Vestibilità perfetta grazie alla banda elasticizzata in vita", "Chiusura con cerniera doppia"]'::jsonb,
    'fr', '["Coutures thermosoudées pour une étanchéité totale", "Anneau pour le majeur qui évite le risque de glissement des manches sur le bras", "Propriétés antistatiques", "Matériau en non-tissé respectueux de la peau sur la face intérieure", "Coupe parfaite grâce à la bande élastique à la taille", "Fermeture à double fermeture éclair"]'::jsonb,
    'de', '["Verklebte Nähte für vollständige Wasserdichtigkeit", "Mittelfingerschlaufe, die verhindert, dass die Ärmel am Arm verrutschen", "Antistatische Eigenschaften", "Hautfreundliches Vliesstoffmaterial auf der Innenseite", "Perfekte Passform dank elastischem Taillenbund", "Verschluss mit doppeltem Reißverschluss"]'::jsonb,
    'es', '["Costuras termoselladas para una impermeabilidad total", "Anilla para el dedo corazón que evita el riesgo de deslizamiento de las mangas sobre el brazo", "Propiedades antiestáticas", "Material de tejido no tejido respetuoso con la piel en el lado interior", "Ajuste perfecto gracias a la banda elástica en la cintura", "Cierre con cremallera doble"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Processing involving chemical and harmful substances"]'::jsonb,
    'it', '["Lavorazioni con sostanze chimiche e nocive"]'::jsonb,
    'fr', '["Travaux avec des substances chimiques et nocives"]'::jsonb,
    'de', '["Arbeiten mit chemischen und schädlichen Substanzen"]'::jsonb,
    'es', '["Trabajos con sustancias químicas y nocivas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial painting", "chemical companies"]'::jsonb,
    'it', '["Verniciatura", "aziende chimiche"]'::jsonb,
    'fr', '["Peinture", "entreprises chimiques"]'::jsonb,
    'de', '["Lackieren", "Chemieunternehmen"]'::jsonb,
    'es', '["Pintura", "empresas químicas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Other safety clothing"]'::jsonb,
    'it', '["Altri indumenti protettivi"]'::jsonb,
    'fr', '["Autres vêtements de protection"]'::jsonb,
    'de', '["Andere Schutzkleidung"]'::jsonb,
    'es', '["Otras prendas de protección"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["100% Polypropylen"]'::jsonb,
    'it', '["100% polipropilene"]'::jsonb,
    'fr', '["100 % polypropylène"]'::jsonb,
    'de', '["100 % Polypropylen"]'::jsonb,
    'es', '["100 % polipropileno"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN ISO 13688: Yes", "EN 14126: Yes", "EN 13034: Type 6B", "EN 14605: 4B"]'::jsonb,
    'it', '["EN ISO 13688: Yes", "EN 1073: Yes", "EN 13034: Yes"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui", "EN 1073 : Oui", "EN 13034 : Oui"]'::jsonb,
    'de', '["EN ISO 13688: Ja", "EN 1073: Ja", "EN 13034: Ja"]'::jsonb,
    'es', '["EN ISO 13688: Sí", "EN 1073: Sí", "EN 13034: Sí"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb
  )
WHERE id = '99c6541f-6d9b-4d27-a30d-62c626dd4df2';

-- 2-macsole
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"2 MACSOLE"'::jsonb,
    'it', '"2 MACSOLE"'::jsonb,
    'fr', '"2 MACSOLE"'::jsonb,
    'de', '"2 MACSOLE"'::jsonb,
    'es', '"2 MACSOLE"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible safety boot S3L class with rubber sole resistant to heat, cut and chemicals"'::jsonb,
    'it', '"Scarponcini S3L leggeri e flessibili con suola in gomma resistente al calore, taglio e sostanze chimiche"'::jsonb,
    'fr', '"Bottines de sécurité S3L légères et souples avec semelle en caoutchouc résistante à la chaleur, à la coupure et aux produits chimiques"'::jsonb,
    'de', '"Leichte und flexible Sicherheitsstiefeletten S3L mit Gummisohle, hitze-, schnitt- und chemikalienbeständig"'::jsonb,
    'es', '"Botines de seguridad S3L ligeros y flexibles con suela de caucho resistente al calor, al corte y a las sustancias químicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight and flexible safety boot S3L with rubber sole"'::jsonb,
    'it', '"Scarponcini S3L leggeri e flessibili con suola in gomma"'::jsonb,
    'fr', '"Bottines de sécurité S3L légères et souples avec semelle en caoutchouc"'::jsonb,
    'de', '"Leichte und flexible Sicherheitsstiefeletten S3L mit Gummisohle"'::jsonb,
    'es', '"Botines de seguridad S3L ligeros y flexibles con suela de caucho"'::jsonb
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
    'en', '["Protection class S3L (EN ISO 20345:2022) with SRC slip resistance and heat resistance up to +300°C (HI HRO)", "Stable posture even on ladders thanks to the stabilising footbed support", "Antistatic, shock-absorbing PU midsole", "Slip, contact-heat and oil/fuel-resistant sole"]'::jsonb,
    'it', '["Classe di protezione S3L (EN ISO 20345:2022) con resistenza allo scivolamento SRC e resistenza al calore fino a +300°C (HI HRO)", "Postura stabile anche su scale grazie al supporto plantare stabilizzante", "Intersuola in PU antistatica e ammortizzante", "Suola resistente a scivolamento, calore da contatto e oli/carburanti"]'::jsonb,
    'fr', '["Classe de protection S3L (EN ISO 20345:2022) avec résistance au glissement SRC et résistance à la chaleur jusqu''à +300°C (HI HRO)", "Posture stable même sur des échelles grâce au support plantaire stabilisateur", "Semelle intermédiaire en PU antistatique et amortissante", "Semelle résistante au glissement, à la chaleur de contact et aux huiles/carburants"]'::jsonb,
    'de', '["Schutzklasse S3L (EN ISO 20345:2022) mit Rutschhemmung SRC und Hitzebeständigkeit bis +300°C (HI HRO)", "Stabile Haltung auch auf Leitern dank stabilisierender Einlegesohle", "Antistatische und dämpfende PU-Zwischensohle", "Sohle beständig gegen Rutschen, Kontaktwärme und Öle/Kraftstoffe"]'::jsonb,
    'es', '["Clase de protección S3L (EN ISO 20345:2022) con resistencia al deslizamiento SRC y resistencia al calor de hasta +300°C (HI HRO)", "Postura estable incluso en escaleras gracias al soporte plantar estabilizador", "Entresuela de PU antiestática y amortiguadora", "Suela resistente al deslizamiento, al calor de contacto y a aceites/combustibles"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Moderate applications requiring high sole durability", "Activities in indoor and outdoor environments", "Operations in challenging ground conditions"]'::jsonb,
    'it', '["Applicazioni moderate, con necessità di alta robustezza della suola", "Attività in ambiente interno ed esterno", "Operazioni con difficili condizioni del suolo"]'::jsonb,
    'fr', '["Applications modérées, nécessitant une grande robustesse de la semelle", "Activités en intérieur et en extérieur", "Opérations dans des conditions de sol difficiles"]'::jsonb,
    'de', '["Mäßig anspruchsvolle Anwendungen mit hohem Bedarf an Sohlenfestigkeit", "Tätigkeiten in Innen- und Außenbereichen", "Einsätze bei schwierigen Bodenverhältnissen"]'::jsonb,
    'es', '["Aplicaciones moderadas, con necesidad de alta robustez de la suela", "Actividades en interiores y exteriores", "Operaciones en condiciones de suelo difíciles"]'::jsonb
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
    'en', '"35 - 52"'::jsonb,
    'it', '"35 - 52"'::jsonb,
    'fr', '"35 - 52"'::jsonb,
    'de', '"35 - 52"'::jsonb,
    'es', '"35 - 52"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Leather", "Rubber", "PU"]'::jsonb,
    'it', '["Pelle", "Gomma", "PU"]'::jsonb,
    'fr', '["Cuir", "Caoutchouc", "PU"]'::jsonb,
    'de', '["Leder", "Gummi", "PU"]'::jsonb,
    'es', '["Cuero", "Caucho", "PU"]'::jsonb
  ),
  footwear_comfort_features_locales = COALESCE(footwear_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  )
WHERE id = '43805686-8cd9-46ab-aec6-6ba565b7305e';

-- cut-quatroflex-pantaloni
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"cut quatroflex (pantaloni)"'::jsonb,
    'it', '"cut quatroflex (pantaloni)"'::jsonb,
    'fr', '"cut quatroflex (pantalon)"'::jsonb,
    'de', '"cut quatroflex (Hose)"'::jsonb,
    'es', '"cut quatroflex (pantalón)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Trousers designed to protect against injuries that can be caused by blades, glass sheets, and sharp objects. The different knitting technologies used make the garment particularly elastic in all directions."'::jsonb,
    'it', '"Pantaloni nati perprotegge contro le ferite che possono essere causate da lame, lastre di vetro e oggetti acuminati. Le diverse tecnologie di maglieria utilizzate rendono l''indumento particolarmente elastico, in tutte le direzioni."'::jsonb,
    'fr', '"Pantalon conçu pour protéger contre les blessures pouvant être causées par des lames, des plaques de verre et des objets pointus. Les différentes technologies de tricotage utilisées rendent le vêtement particulièrement élastique, dans toutes les directions."'::jsonb,
    'de', '"Hose, die zum Schutz vor Verletzungen entwickelt wurde, die durch Klingen, Glasplatten und spitze Gegenstände verursacht werden können. Die verschiedenen verwendeten Stricktechnologien machen das Kleidungsstück besonders elastisch, in alle Richtungen."'::jsonb,
    'es', '"Pantalón creado para proteger contra las heridas que pueden ser causadas por cuchillas, láminas de vidrio y objetos punzantes. Las diferentes tecnologías de punto utilizadas hacen que la prenda sea especialmente elástica en todas las direcciones."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant work trousers"'::jsonb,
    'it', '"Pantaloni da lavoro antitaglio"'::jsonb,
    'fr', '"Pantalon de travail anticoupure"'::jsonb,
    'de', '"Schnittschutz-Arbeitshose"'::jsonb,
    'es', '"Pantalón de trabajo anticorte"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Work Trousers"'::jsonb,
    'it', '"Pantaloni da lavoro"'::jsonb,
    'fr', '"Pantalons de travail"'::jsonb,
    'de', '"Arbeitshosen"'::jsonb,
    'es', '"Pantalones de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Sporty-cut trousers with level 5 cut resistance on the front of the leg", "Innovative double-face fabric combined with Bamboo TwinFlex® inserts", "Highly functional and extremely elastic panels on the knees", "Elastic waistband at the back", "Excellent flexibility and freedom of movement", "Two large back pockets"]'::jsonb,
    'it', '["Pantaloni dal taglio sportivo con resistenza al taglio di livello 5 su lato anteriore della gamba", "Tessuto innovativo principio double-face e agli inserti Bamboo TwinFlex®", "Strisce funzionali ed estremamente elastiche sulle ginocchia", "Cintura elastica in vita nella parte posteriore", "Ottima flessibilità e libertà nei movimenti", "Due ampie tasche posteriori"]'::jsonb,
    'fr', '["Pantalon à la coupe sportive avec une résistance à la coupure de niveau 5 sur l''avant de la jambe", "Tissu innovant à principe double-face et inserts Bamboo TwinFlex®", "Bandes fonctionnelles et extrêmement élastiques au niveau des genoux", "Ceinture élastique à la taille à l''arrière", "Excellente flexibilité et liberté de mouvement", "Deux grandes poches arrière"]'::jsonb,
    'de', '["Hose mit sportlichem Schnitt und Schnittfestigkeit Stufe 5 auf der Vorderseite des Beins", "Innovatives Gewebe nach dem Double-Face-Prinzip mit Bamboo TwinFlex®-Einsätzen", "Funktionale und extrem elastische Einsätze an den Knien", "Elastischer Taillenbund im Rückenbereich", "Ausgezeichnete Flexibilität und Bewegungsfreiheit", "Zwei große Gesäßtaschen"]'::jsonb,
    'es', '["Pantalón de corte deportivo con resistencia al corte de nivel 5 en la parte delantera de la pierna", "Tejido innovador con principio double-face e insertos Bamboo TwinFlex®", "Franjas funcionales y extremadamente elásticas en las rodillas", "Cinturón elástico en la cintura en la parte posterior", "Excelente flexibilidad y libertad de movimiento", "Dos amplios bolsillos traseros"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Forestry work", "Wood industry", "Construction work"]'::jsonb,
    'it', '["Lavori Silvocultura", "Industria del legno", "Lavori edilizia"]'::jsonb,
    'fr', '["Travaux sylvicoles", "Industrie du bois", "Travaux du bâtiment"]'::jsonb,
    'de', '["Forstarbeiten", "Holzindustrie", "Bauarbeiten"]'::jsonb,
    'es', '["Trabajos de silvicultura", "Industria de la madera", "Trabajos de construcción"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "work involving the presence of blades"]'::jsonb,
    'it', '["Edilizia", "Lavorazini in presenza di lame"]'::jsonb,
    'fr', '["Construction", "Travaux en présence de lames"]'::jsonb,
    'de', '["Bauwesen", "Arbeiten mit Klingen"]'::jsonb,
    'es', '["Construcción", "Trabajos en presencia de cuchillas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work Trousers"]'::jsonb,
    'it', '["Pantaloni da lavoro"]'::jsonb,
    'fr', '["Pantalons de travail"]'::jsonb,
    'de', '["Arbeitshosen"]'::jsonb,
    'es', '["Pantalones de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["65% polyester, 35% cotton"]'::jsonb,
    'it', '["65% poliestere, 35% cotone"]'::jsonb,
    'fr', '["65 % polyester, 35 % coton"]'::jsonb,
    'de', '["65 % Polyester, 35 % Baumwolle"]'::jsonb,
    'es', '["65 % poliéster, 35 % algodón"]'::jsonb
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
WHERE id = '916348d7-e366-4011-84d7-d858eca143db';

-- cut-quatroflex-polo-uv
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"cut quatroflex (polo uv)"'::jsonb,
    'it', '"cut quatroflex (polo uv)"'::jsonb,
    'fr', '"cut quatroflex (polo UV)"'::jsonb,
    'de', '"cut quatroflex (UV-Poloshirt)"'::jsonb,
    'es', '"cut quatroflex (polo UV)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Shirt designed to protect against cuts, glass sheets, and sharp objects, while offering excellent freedom of movement and elasticity"'::jsonb,
    'it', '"Maglia nata per proteggere da tagli, lastre di vetro e oggetti accuminati, pur offrendo ottimo movimento ed elasticità"'::jsonb,
    'fr', '"Maillot conçu pour protéger contre les coupures, les plaques de verre et les objets pointus, tout en offrant un excellent mouvement et une grande élasticité"'::jsonb,
    'de', '"Shirt, entwickelt zum Schutz vor Schnitten, Glasplatten und spitzen Gegenständen, mit hervorragender Bewegungsfreiheit und Elastizität"'::jsonb,
    'es', '"Camiseta creada para proteger contra cortes, láminas de vidrio y objetos punzantes, ofreciendo a la vez un excelente movimiento y elasticidad"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant work shirt"'::jsonb,
    'it', '"Maglia antitaglio da lavoro"'::jsonb,
    'fr', '"Maillot anticoupure de travail"'::jsonb,
    'de', '"Schnittschutz-Arbeitsshirt"'::jsonb,
    'es', '"Camiseta anticorte de trabajo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Workwear shirts"'::jsonb,
    'it', '"Maglie da lavoro"'::jsonb,
    'fr', '"Maillots de travail"'::jsonb,
    'de', '"Arbeitsshirts"'::jsonb,
    'es', '"Camisetas de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent flexibility and freedom of movement", "Seamless knitted sleeve cuffs", "Three-button placket", "Polo collar", "Polo shirt with maximum-level cut-resistant sleeves", "Innovative double-face fabric combined with Bamboo TwinFlex® inserts", "Highly functional and extremely elastic panels on the elbows", "UV protection UPF 50+"]'::jsonb,
    'it', '["Polo con maniche resistenti al taglio di livello massimo", "Tessuto innovativo principio double-face e agli inserti Bamboo TwinFlex®", "Strisce funzionali ed estremamente elastiche sui gomiti", "Ottima flessibilità e libertà nei movimenti", "Polsini della manica in tessuto a maglia senza cuciture", "Abbottonatura con tre bottoni", "Colletto polo", "Protezione UV UPF 50+"]'::jsonb,
    'fr', '["Polo avec manches résistantes à la coupure de niveau maximal", "Tissu innovant à principe double-face et inserts Bamboo TwinFlex®", "Bandes fonctionnelles extrêmement élastiques au niveau des coudes", "Excellente flexibilité et liberté de mouvement", "Poignets de manche en tissu tricoté sans couture", "Boutonnage à trois boutons", "Col polo", "Protection UV UPF 50+"]'::jsonb,
    'de', '["Poloshirt mit schnittfesten Ärmeln der höchsten Schutzstufe", "Innovatives Gewebe nach dem Double-Face-Prinzip mit Bamboo TwinFlex®-Einsätzen", "Funktionelle, extrem elastische Streifen an den Ellbogen", "Ausgezeichnete Flexibilität und Bewegungsfreiheit", "Ärmelbündchen aus nahtlosem Strickstoff", "Knopfleiste mit drei Knöpfen", "Polokragen", "UV-Schutz UPF 50+"]'::jsonb,
    'es', '["Polo con mangas resistentes al corte de nivel máximo", "Tejido innovador con principio double-face e insertos Bamboo TwinFlex®", "Bandas funcionales y extremadamente elásticas en los codos", "Excelente flexibilidad y libertad de movimiento", "Puños de manga en tejido de punto sin costuras", "Abotonadura con tres botones", "Cuello polo", "Protección UV UPF 50+"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Forestry work", "Wood industry", "Construction work"]'::jsonb,
    'it', '["Lavori Silvocultura", "Industria del legno", "Lavori edilizia"]'::jsonb,
    'fr', '["Travaux sylvicoles", "Industrie du bois", "Travaux du bâtiment"]'::jsonb,
    'de', '["Forstarbeiten", "Holzindustrie", "Bauarbeiten"]'::jsonb,
    'es', '["Trabajos de silvicultura", "Industria de la madera", "Trabajos de construcción"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "work involving the presence of blades"]'::jsonb,
    'it', '["Edilizia", "Lavorazini in presenza di lame"]'::jsonb,
    'fr', '["Construction", "Travaux en présence de lames"]'::jsonb,
    'de', '["Bauwesen", "Arbeiten mit Klingen"]'::jsonb,
    'es', '["Construcción", "Trabajos en presencia de cuchillas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work shirt"]'::jsonb,
    'it', '["Maglia da lavoro"]'::jsonb,
    'fr', '["Maillot de travail"]'::jsonb,
    'de', '["Arbeitsshirt"]'::jsonb,
    'es', '["Camiseta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["54% modacrylic, 44% cotton, 2% antistatic fibres"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN 388 livello 5", "EN ISO 13688: Yes"]'::jsonb,
    'it', '["EN ISO 13688: Yes", "EN 388 livello 5"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui", "EN 388 niveau 5"]'::jsonb,
    'de', '["EN ISO 13688: Ja", "EN 388 Stufe 5"]'::jsonb,
    'es', '["EN ISO 13688: Sí", "EN 388 nivel 5"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Slim Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Aderente", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Ajusté", "size_range": ""}'::jsonb,
    'de', '{"fit": "Eng anliegend", "size_range": ""}'::jsonb,
    'es', '{"fit": "Ajustado", "size_range": ""}'::jsonb
  )
WHERE id = '50646393-e303-4e17-abcb-2dd1bf2be613';

-- cut-quatroflex-t-shirt
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"cut quatroflex (t-shirt)"'::jsonb,
    'it', '"cut quatroflex (t-shirt)"'::jsonb,
    'fr', '"cut quatroflex (t-shirt)"'::jsonb,
    'de', '"cut quatroflex (T-Shirt)"'::jsonb,
    'es', '"cut quatroflex (camiseta)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"T-shirt designed to protect against cuts, glass sheets, and sharp objects, while offering excellent freedom of movement and elasticity"'::jsonb,
    'it', '"T-shirt nata per proteggere da tagli, lastre di vetro e oggetti accuminati, pur offrendo ottimo movimento ed elasticità"'::jsonb,
    'fr', '"T-shirt conçu pour protéger contre les coupures, les plaques de verre et les objets pointus, tout en offrant une excellente liberté de mouvement et élasticité"'::jsonb,
    'de', '"T-Shirt, das zum Schutz vor Schnitten, Glasplatten und spitzen Gegenständen entwickelt wurde und dabei hervorragende Bewegungsfreiheit und Elastizität bietet"'::jsonb,
    'es', '"Camiseta creada para proteger contra cortes, láminas de vidrio y objetos punzantes, ofreciendo además un excelente movimiento y elasticidad"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant work shirt"'::jsonb,
    'it', '"Maglia antitaglio da lavoro"'::jsonb,
    'fr', '"Maillot anticoupure de travail"'::jsonb,
    'de', '"Schnittschutz-Arbeitsshirt"'::jsonb,
    'es', '"Camiseta anticorte de trabajo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Workwear shirts"'::jsonb,
    'it', '"Maglie da lavoro"'::jsonb,
    'fr', '"Maillots de travail"'::jsonb,
    'de', '"Arbeitsshirts"'::jsonb,
    'es', '"Camisetas de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent flexibility and freedom of movement", "Seamless knitted sleeve cuffs", "T-shirt with maximum-level cut-resistant sleeves", "Innovative double-face fabric combined with Bamboo TwinFlex® inserts", "Highly functional and extremely elastic panels on the elbows"]'::jsonb,
    'it', '["Tessuto innovativo principio double-face e agli inserti Bamboo TwinFlex®", "Strisce funzionali ed estremamente elastiche sui gomiti", "Ottima flessibilità e libertà nei movimenti", "Polsini della manica in tessuto a maglia senza cuciture", "T-shirt with maximum-level cut-resistant sleeves"]'::jsonb,
    'fr', '["Tissu innovant à principe double-face et inserts Bamboo TwinFlex®", "Bandes fonctionnelles extrêmement élastiques au niveau des coudes", "Excellente flexibilité et liberté de mouvement", "Poignets de manche en tissu tricoté sans couture", "T-shirt avec manches anticoupure de niveau maximal"]'::jsonb,
    'de', '["Innovatives Gewebe nach dem Double-Face-Prinzip mit Bamboo TwinFlex®-Einsätzen", "Funktionelle, extrem elastische Streifen an den Ellbogen", "Ausgezeichnete Flexibilität und Bewegungsfreiheit", "Ärmelbündchen aus nahtlosem Strickstoff", "T-Shirt mit schnittfesten Ärmeln der höchsten Stufe"]'::jsonb,
    'es', '["Tejido innovador con principio double-face e insertos Bamboo TwinFlex®", "Bandas funcionales y extremadamente elásticas en los codos", "Excelente flexibilidad y libertad de movimiento", "Puños de manga en tejido de punto sin costuras", "Camiseta con mangas anticorte de nivel máximo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Forestry work", "Wood industry", "Construction work"]'::jsonb,
    'it', '["Lavori Silvocultura", "Industria del legno", "Lavori edilizia"]'::jsonb,
    'fr', '["Travaux sylvicoles", "Industrie du bois", "Travaux du bâtiment"]'::jsonb,
    'de', '["Forstarbeiten", "Holzindustrie", "Bauarbeiten"]'::jsonb,
    'es', '["Trabajos de silvicultura", "Industria de la madera", "Trabajos de construcción"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "work involving the presence of blades"]'::jsonb,
    'it', '["Edilizia", "Lavorazini in presenza di lame"]'::jsonb,
    'fr', '["Construction", "Travaux en présence de lames"]'::jsonb,
    'de', '["Bauwesen", "Arbeiten mit Klingen"]'::jsonb,
    'es', '["Construcción", "Trabajos en presencia de cuchillas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work shirt"]'::jsonb,
    'it', '["Maglia da lavoro"]'::jsonb,
    'fr', '["Maillot de travail"]'::jsonb,
    'de', '["Arbeitsshirt"]'::jsonb,
    'es', '["Camiseta de trabajo"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN 388 livello 5", "EN ISO 13688: Yes"]'::jsonb,
    'it', '["EN ISO 13688: Yes", "EN 388 livello 5"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui", "EN 388 niveau 5"]'::jsonb,
    'de', '["EN ISO 13688: Ja", "EN 388 Stufe 5"]'::jsonb,
    'es', '["EN ISO 13688: Sí", "EN 388 nivel 5"]'::jsonb
  )
WHERE id = 'e8af2655-8412-4e02-b849-968ea8af21c7';

-- bls-201-3
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 201-3"'::jsonb,
    'it', '"BLS 201-3"'::jsonb,
    'fr', '"BLS 201-3"'::jsonb,
    'de', '"BLS 201-3"'::jsonb,
    'es', '"BLS 201-3"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flat filters with b-lock connection. FFP3 R classified, protect from dusts, fibers, fumes, aerosols of toxic particles"'::jsonb,
    'it', '"Filtri piatti con attacco a baionetta b-lock. Classificazione FFP3 R, proteggono da polveri, fibre, fumi e aerosol di particelle tossiche"'::jsonb,
    'fr', '"Filtres plats avec raccord à baïonnette b-lock. Classification FFP3 R, ils protègent contre les poussières, fibres, fumées et aérosols de particules toxiques"'::jsonb,
    'de', '"Flachfilter mit b-lock-Bajonettanschluss. Klassifizierung FFP3 R, schützen vor Stäuben, Fasern, Rauch und Aerosolen toxischer Partikel"'::jsonb,
    'es', '"Filtros planos con conexión de bayoneta b-lock. Clasificación FFP3 R, protegen frente a polvo, fibras, humos y aerosoles de partículas tóxicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flat filters with b-lock connection"'::jsonb,
    'it', '"Filtro piatto con aggancio b-lock"'::jsonb,
    'fr', '"Filtre plat avec fixation b-lock"'::jsonb,
    'de', '"Flachfilter mit b-lock-Anschluss"'::jsonb,
    'es', '"Filtro plano con conexión b-lock"'::jsonb
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
    'en', '["Lightweight and small size with slim profile", "Dust filtering efficiency 99.99%"]'::jsonb,
    'it', '["Leggero e di piccole dimensioni con profilo sottile", "Efficienza di filtrazione delle polveri 99,99%"]'::jsonb,
    'fr', '["Léger et compact avec un profil fin", "Efficacité de filtration des poussières de 99,99%"]'::jsonb,
    'de', '["Leicht und kompakt mit schlankem Profil", "Filterleistung für Staub von 99,99%"]'::jsonb,
    'es', '["Ligero y de pequeño tamaño con perfil fino", "Eficiencia de filtración de partículas del 99,99%"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapor, particulate, combined, etc.)"]'::jsonb,
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
    'en', '["Polypropylene (PP)"]'::jsonb,
    'it', '["Polipropilene (PP)"]'::jsonb,
    'fr', '["Polypropylène (PP)"]'::jsonb,
    'de', '["Polypropylen (PP)"]'::jsonb,
    'es', '["Polipropileno (PP)"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["B-Lock"]'::jsonb,
    'it', '["B-Lock"]'::jsonb,
    'fr', '["B-Lock"]'::jsonb,
    'de', '["B-Lock"]'::jsonb,
    'es', '["B-Lock"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = 'ab75311e-8a28-42b0-9f93-106100ca3735';

-- cut-quatroflex-polo
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"cut quatroflex (polo)"'::jsonb,
    'it', '"cut quatroflex (polo)"'::jsonb,
    'fr', '"cut quatroflex (polo)"'::jsonb,
    'de', '"cut quatroflex (Polo)"'::jsonb,
    'es', '"cut quatroflex (polo)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Shirt designed to protect against cuts, glass sheets, and sharp objects, while offering excellent freedom of movement and elasticity"'::jsonb,
    'it', '"Maglia nata per proteggere da tagli, lastre di vetro e oggetti accuminati, pur offrendo ottimo movimento ed elasticità"'::jsonb,
    'fr', '"Maillot conçu pour protéger contre les coupures, les plaques de verre et les objets pointus, tout en offrant un excellent mouvement et une grande élasticité"'::jsonb,
    'de', '"Shirt, entwickelt zum Schutz vor Schnitten, Glasplatten und spitzen Gegenständen, mit hervorragender Bewegungsfreiheit und Elastizität"'::jsonb,
    'es', '"Camiseta creada para proteger contra cortes, láminas de vidrio y objetos punzantes, ofreciendo a la vez un excelente movimiento y elasticidad"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut-resistant work shirt"'::jsonb,
    'it', '"Maglia antitaglio da lavoro"'::jsonb,
    'fr', '"Maillot anticoupure de travail"'::jsonb,
    'de', '"Schnittschutz-Arbeitsshirt"'::jsonb,
    'es', '"Camiseta anticorte de trabajo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Workwear shirts"'::jsonb,
    'it', '"Maglie da lavoro"'::jsonb,
    'fr', '"Maillots de travail"'::jsonb,
    'de', '"Arbeitsshirts"'::jsonb,
    'es', '"Camisetas de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Excellent flexibility and freedom of movement", "Seamless knitted sleeve cuffs", "Three-button placket", "Polo collar", "Polo shirt with maximum-level cut-resistant sleeves", "Innovative double-face fabric combined with Bamboo TwinFlex® inserts", "Highly functional and extremely elastic panels on the elbows"]'::jsonb,
    'it', '["Polo con maniche resistenti al taglio di livello massimo", "Tessuto innovativo principio double-face e agli inserti Bamboo TwinFlex®", "Strisce funzionali ed estremamente elastiche sui gomiti", "Ottima flessibilità e libertà nei movimenti", "Polsini della manica in tessuto a maglia senza cuciture", "Abbottonatura con tre bottoni", "Colletto polo"]'::jsonb,
    'fr', '["Polo avec manches résistantes à la coupure de niveau maximal", "Tissu innovant à principe double-face et inserts Bamboo TwinFlex®", "Bandes fonctionnelles extrêmement élastiques au niveau des coudes", "Excellente flexibilité et liberté de mouvement", "Poignets de manche en tissu tricoté sans couture", "Boutonnage à trois boutons", "Col polo"]'::jsonb,
    'de', '["Poloshirt mit schnittfesten Ärmeln der höchsten Schutzstufe", "Innovatives Gewebe nach dem Double-Face-Prinzip mit Bamboo TwinFlex®-Einsätzen", "Funktionelle, extrem elastische Streifen an den Ellbogen", "Ausgezeichnete Flexibilität und Bewegungsfreiheit", "Ärmelbündchen aus nahtlosem Strickstoff", "Knopfleiste mit drei Knöpfen", "Polokragen"]'::jsonb,
    'es', '["Polo con mangas resistentes al corte de nivel máximo", "Tejido innovador con principio double-face e insertos Bamboo TwinFlex®", "Bandas funcionales y extremadamente elásticas en los codos", "Excelente flexibilidad y libertad de movimiento", "Puños de manga en tejido de punto sin costuras", "Abotonadura con tres botones", "Cuello polo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Forestry work", "Wood industry", "Construction work"]'::jsonb,
    'it', '["Lavori Silvocultura", "Industria del legno", "Lavori edilizia"]'::jsonb,
    'fr', '["Travaux sylvicoles", "Industrie du bois", "Travaux du bâtiment"]'::jsonb,
    'de', '["Forstarbeiten", "Holzindustrie", "Bauarbeiten"]'::jsonb,
    'es', '["Trabajos de silvicultura", "Industria de la madera", "Trabajos de construcción"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Construction", "work involving the presence of blades"]'::jsonb,
    'it', '["Edilizia", "Lavorazini in presenza di lame"]'::jsonb,
    'fr', '["Construction", "Travaux en présence de lames"]'::jsonb,
    'de', '["Bauwesen", "Arbeiten mit Klingen"]'::jsonb,
    'es', '["Construcción", "Trabajos en presencia de cuchillas"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work shirt"]'::jsonb,
    'it', '["Maglia da lavoro"]'::jsonb,
    'fr', '["Maillot de travail"]'::jsonb,
    'de', '["Arbeitsshirt"]'::jsonb,
    'es', '["Camiseta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["45% polyester, 55% cotton"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN 388 livello 5", "EN ISO 13688: Yes"]'::jsonb,
    'it', '["EN ISO 13688: Yes", "EN 388 livello 5"]'::jsonb,
    'fr', '["EN ISO 13688 : Oui", "EN 388 niveau 5"]'::jsonb,
    'de', '["EN ISO 13688: Ja", "EN 388 Stufe 5"]'::jsonb,
    'es', '["EN ISO 13688: Sí", "EN 388 nivel 5"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular ", "size_range": ""}'::jsonb,
    'it', '{"fit": "Aderente", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Ajusté", "size_range": ""}'::jsonb,
    'de', '{"fit": "Eng anliegend", "size_range": ""}'::jsonb,
    'es', '{"fit": "Ajustado", "size_range": ""}'::jsonb
  )
WHERE id = 'b87781a3-91cd-456f-b8bb-e487af49f9e7';

-- bls-201-3c
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 201-3C"'::jsonb,
    'it', '"BLS 201-3C"'::jsonb,
    'fr', '"BLS 201-3C"'::jsonb,
    'de', '"BLS 201-3C"'::jsonb,
    'es', '"BLS 201-3C"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flat filters with b-lock connection. FFP3 R classified, protect from dusts, fibers, fumes, aerosols of toxic particles. Activated carbons to block gasses & vapour organic and acid in lower concentration than the TLV"'::jsonb,
    'it', '"Filtri piatti con attacco a baionetta b-lock. Classificazione FFP3 R, proteggono da polveri, fibre, fumi e aerosol di particelle tossiche"'::jsonb,
    'fr', '"Filtres plats avec raccord à baïonnette b-lock. Classification FFP3 R, ils protègent contre les poussières, fibres, fumées et aérosols de particules toxiques"'::jsonb,
    'de', '"Flachfilter mit b-lock-Bajonettanschluss. Klassifizierung FFP3 R, schützen vor Stäuben, Fasern, Rauch und Aerosolen toxischer Partikel"'::jsonb,
    'es', '"Filtros planos con conexión de bayoneta b-lock. Clasificación FFP3 R, protegen frente a polvo, fibras, humos y aerosoles de partículas tóxicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flat filters with b-lock connection."'::jsonb,
    'it', '"Filtro piatto con aggancio b-lock"'::jsonb,
    'fr', '"Filtre plat avec fixation b-lock"'::jsonb,
    'de', '"Flachfilter mit b-lock-Anschluss"'::jsonb,
    'es', '"Filtro plano con conexión b-lock"'::jsonb
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
    'en', '["Lightweight and small size with slim profile", "Dust filtering efficiency 99.99%"]'::jsonb,
    'it', '["Leggero e di piccole dimensioni con profilo sottile", "Efficienza di filtrazione delle polveri 99,99%"]'::jsonb,
    'fr', '["Léger et compact avec un profil fin", "Efficacité de filtration des poussières de 99,99%"]'::jsonb,
    'de', '["Leicht und kompakt mit schlankem Profil", "Filterleistung für Staub von 99,99%"]'::jsonb,
    'es', '["Ligero y de pequeño tamaño con perfil fino", "Eficiencia de filtración de partículas del 99,99%"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Application depends on the filter used (gas, vapor, particulate, combined, etc.)"]'::jsonb,
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
    'en', '["Polypropylene (PP)", "Polyester (PES) + carbon grains"]'::jsonb,
    'it', '["Polipropilene (PP)", "Poliestere (PES) + granuli di carbone"]'::jsonb,
    'fr', '["Polypropylène (PP)", "Polyester (PES) + granulés de charbon"]'::jsonb,
    'de', '["Polypropylen (PP)", "Polyester (PES) + Kohlegranulat"]'::jsonb,
    'es', '["Polipropileno (PP)", "Poliéster (PES) + gránulos de carbón"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["B-Lock"]'::jsonb,
    'it', '["B-Lock"]'::jsonb,
    'fr', '["B-Lock"]'::jsonb,
    'de', '["B-Lock"]'::jsonb,
    'es', '["B-Lock"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Half masks", "Full masks"]'::jsonb,
    'it', '["Semimaschere", "Maschere integrali"]'::jsonb,
    'fr', '["Demi-masques", "Masques intégraux"]'::jsonb,
    'de', '["Halbmasken", "Vollmasken"]'::jsonb,
    'es', '["Semimáscaras", "Máscaras integrales"]'::jsonb
  )
WHERE id = 'c5bd00df-919e-44d4-a2ca-ca8d48e7e738';

-- pantalone-suxxeed-arc
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"pantalone suXXeed arc"'::jsonb,
    'it', '"pantalone suXXeed arc"'::jsonb,
    'fr', '"pantalon suXXeed arc"'::jsonb,
    'de', '"Hose suXXeed arc"'::jsonb,
    'es', '"pantalón suXXeed arc"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Multi-purpose trousers certified for protection against internal electric arc, heat, flame, and chemicals"'::jsonb,
    'it', '"Pantalone multiuso certificata per la protezione da arco elettrico interno, calore, fiamma e sostanze chimiche"'::jsonb,
    'fr', '"Pantalon multiusage certifié pour la protection contre l''arc électrique interne, la chaleur, la flamme et les substances chimiques"'::jsonb,
    'de', '"Multifunktionshose, zertifiziert für den Schutz vor internem Lichtbogen, Hitze, Flammen und Chemikalien"'::jsonb,
    'es', '"Pantalón multiusos certificado para la protección contra el arco eléctrico interno, el calor, la llama y las sustancias químicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-resistant multi-purpose trousers in flame-resistant fabric"'::jsonb,
    'it', '"pantalone multifunzione in tessuto ignifugo"'::jsonb,
    'fr', '"pantalon multifonction en tissu ignifuge"'::jsonb,
    'de', '"Multifunktionshose aus flammhemmendem Gewebe"'::jsonb,
    'es', '"pantalón multifunción en tejido ignífugo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Work trousers"'::jsonb,
    'fr', '"Pantalons de travail"'::jsonb,
    'de', '"Arbeitshosen"'::jsonb,
    'es', '"Pantalones de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Multifunctional trousers in an ergonomic fit that meets a wide variety of challenges", "Attached reflex elements", "\"This protective clothing must always be worn as a suit in combination with a jacket with  dungarees / trousers and closed to achieve protection levels\"", "Highly resistant and durable", "Ergonomic fit with extended back part", "Two side pockets and leg pockets with a ruler pocket, concealed with a flap", "Gusset insert for maximum freedom of movement", "High level of comfort"]'::jsonb,
    'it', '["Pantalone multifunzionale a vita con vestibilità ergonomica, adatta a una vasta gamma di sfide.", "Elementi riflettenti applicati", "Questo capo protettivo deve sempre essere indossato come completo, in combinazione con una giacca con salopette/pantaloni chiusi, per garantire i livelli di protezione", "Altamente resistente e durevole", "Vestibilità ergonomica con parte posteriore estesa", "Due tasche laterali e sulle gambe con tasca per metro pieghevole, nascosta con patta", "v", "Inserto inguinale per la massima libertà di movimento", "Elevato comfort"]'::jsonb,
    'fr', '["Pantalon multifonctionnel taille avec coupe ergonomique, adapté à un large éventail de défis.", "Éléments réfléchissants appliqués", "Ce vêtement de protection doit toujours être porté en tant qu''ensemble, associé à une veste avec une salopette/un pantalon fermé, afin de garantir les niveaux de protection", "Extrêmement résistant et durable", "Coupe ergonomique avec dos allongé", "Deux poches latérales et sur les jambes avec poche pour mètre pliant, dissimulée par un rabat", "v", "Empiècement à l''entrejambe pour une liberté de mouvement maximale", "Confort élevé"]'::jsonb,
    'de', '["Multifunktionale Bundhose mit ergonomischer Passform, geeignet für eine Vielzahl von Herausforderungen.", "Aufgebrachte reflektierende Elemente", "Dieses Schutzkleidungsstück muss immer als komplettes Set getragen werden, in Kombination mit einer Jacke mit Latzhose/geschlossener Hose, um die Schutzstufen zu gewährleisten", "Sehr widerstandsfähig und langlebig", "Ergonomische Passform mit verlängertem Rückenteil", "Zwei Seiten- und Beintaschen mit Zollstocktasche, mit Patte verdeckt", "v", "Schritteinsatz für maximale Bewegungsfreiheit", "Hoher Komfort"]'::jsonb,
    'es', '["Pantalón multifuncional de cintura con corte ergonómico, adecuado para una amplia gama de retos.", "Elementos reflectantes aplicados", "Esta prenda de protección debe llevarse siempre como conjunto completo, combinada con una chaqueta con peto/pantalón cerrado, para garantizar los niveles de protección", "Altamente resistente y duradero", "Ajuste ergonómico con parte trasera extendida", "Dos bolsillos laterales y en las piernas con bolsillo para metro plegable, oculto con solapa", "v", "Inserto en la entrepierna para la máxima libertad de movimiento", "Alto confort"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electrical installations", "Operations with low or moderate chemical hazards", "Welding work"]'::jsonb,
    'it', '["Installazioni elettriche", "Operazioni in presenza di rischi chimici bassi o moderati", "Lavori di saldatura"]'::jsonb,
    'fr', '["Installations électriques", "Opérations en présence de risques chimiques faibles ou modérés", "Travaux de soudage"]'::jsonb,
    'de', '["Elektroinstallationen", "Arbeiten bei niedrigen oder mittleren chemischen Risiken", "Schweißarbeiten"]'::jsonb,
    'es', '["Instalaciones eléctricas", "Operaciones con riesgos químicos bajos o moderados", "Trabajos de soldadura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico", "Chimico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile", "Chimique"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche", "Chemisch"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz", "Químico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Flame-resistant trousers"]'::jsonb,
    'it', '["Pantalone", "ignifugo"]'::jsonb,
    'fr', '["Pantalon", "ignifuge"]'::jsonb,
    'de', '["Hose", "flammhemmend"]'::jsonb,
    'es', '["Pantalón", "ignífugo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["88% cotton, 12% polyamide"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN 13034: Type 6"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '09150aab-31f1-4991-98fe-6ceeecdc9687';

-- pantalone-suxxeed-multifunction
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"pantalone suXXeed multifunction"'::jsonb,
    'it', '"pantalone suXXeed arc (2)"'::jsonb,
    'fr', '"pantalon suXXeed arc (2)"'::jsonb,
    'de', '"Hose suXXeed arc (2)"'::jsonb,
    'es', '"pantalón suXXeed arc (2)"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-resistant multi-purpose trousers, suitable for a wide range of applications"'::jsonb,
    'it', '"Pantalone multiuso certificata per la protezione da arco elettrico interno, calore, fiamma e sostanze chimiche"'::jsonb,
    'fr', '"Pantalon multiusage certifié pour la protection contre l''arc électrique interne, la chaleur, la flamme et les substances chimiques"'::jsonb,
    'de', '"Multifunktionshose, zertifiziert für den Schutz vor internem Lichtbogen, Hitze, Flammen und Chemikalien"'::jsonb,
    'es', '"Pantalón multiusos certificado para la protección contra el arco eléctrico interno, el calor, la llama y las sustancias químicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-resistant multi-purpose trousers in flame-resistant fabric"'::jsonb,
    'it', '"pantalone multifunzione in tessuto ignifugo"'::jsonb,
    'fr', '"pantalon multifonction en tissu ignifuge"'::jsonb,
    'de', '"Multifunktionshose aus flammhemmendem Gewebe"'::jsonb,
    'es', '"pantalón multifunción en tejido ignífugo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Work trousers"'::jsonb,
    'fr', '"Pantalons de travail"'::jsonb,
    'de', '"Arbeitshosen"'::jsonb,
    'es', '"Pantalones de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Attached reflex elements", "\"This protective clothing must always be worn as a suit in combination with a jacket with  dungarees / trousers and closed to achieve protection levels\"", "Highly resistant and durable", "Ergonomically fitted multi-purpose salopette with a waistband, suitable for a wide range of applications", "Inner pocket for knee pad", "Flame-resistant fabric"]'::jsonb,
    'it', '["Elementi riflettenti applicati", "Questo capo protettivo deve sempre essere indossato come completo, in combinazione con una giacca con salopette/pantaloni chiusi, per garantire i livelli di protezione", "Altamente resistente e durevole", "Pantalone multifunzionale a vita con vestibilità ergonomica, adatta a una vasta gamma di applicazioni", "Tasca interna per ginocchiera imbottita", "Tessuto ignifugo"]'::jsonb,
    'fr', '["Éléments réfléchissants appliqués", "Ce vêtement de protection doit toujours être porté en tant qu''ensemble, associé à une veste avec une salopette/un pantalon fermé, afin de garantir les niveaux de protection", "Extrêmement résistant et durable", "Pantalon multifonctionnel à taille avec coupe ergonomique, adapté à une large gamme d''applications", "Poche intérieure pour genouillère rembourrée", "Tissu ignifuge"]'::jsonb,
    'de', '["Aufgebrachte reflektierende Elemente", "Dieses Schutzkleidungsstück muss immer als komplettes Set getragen werden, in Kombination mit einer Jacke mit Latzhose/geschlossener Hose, um die Schutzstufen zu gewährleisten", "Sehr widerstandsfähig und langlebig", "Multifunktionale Bundhose mit ergonomischer Passform, geeignet für ein breites Anwendungsspektrum", "Innentasche für gepolsterte Knieschützer", "Flammhemmendes Gewebe"]'::jsonb,
    'es', '["Elementos reflectantes aplicados", "Esta prenda de protección debe llevarse siempre como conjunto completo, combinada con una chaqueta con peto/pantalón cerrado, para garantizar los niveles de protección", "Altamente resistente y duradero", "Pantalón multifuncional de cintura con ajuste ergonómico, adecuado para una amplia gama de aplicaciones", "Bolsillo interior para rodillera acolchada", "Tejido ignífugo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations with low or moderate chemical hazards", "Welding work", "Hobby"]'::jsonb,
    'it', '["Operazioni in presenza di rischi chimici bassi o moderati", "Lavori di saldatura", "Hobbystica"]'::jsonb,
    'fr', '["Opérations en présence de risques chimiques faibles ou modérés", "Travaux de soudage", "Bricolage"]'::jsonb,
    'de', '["Arbeiten bei niedrigen oder mittleren chemischen Risiken", "Schweißarbeiten", "Hobby"]'::jsonb,
    'es', '["Operaciones con riesgos químicos bajos o moderados", "Trabajos de soldadura", "Bricolaje"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico", "Chimico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile", "Chimique"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche", "Chemisch"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz", "Químico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Flame-resistant trousers"]'::jsonb,
    'it', '["Pantalone", "ignifugo"]'::jsonb,
    'fr', '["Pantalon", "ignifuge"]'::jsonb,
    'de', '["Hose", "flammhemmend"]'::jsonb,
    'es', '["Pantalón", "ignífugo"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = 'dea85339-6c46-46e5-bcf6-687eb3726e68';

-- salopette-suxxeed-arc
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"salopette suXXeed arc"'::jsonb,
    'it', '"salopette suXXeed arc"'::jsonb,
    'fr', '"salopette suXXeed arc"'::jsonb,
    'de', '"Latzhose suXXeed arc"'::jsonb,
    'es', '"peto suXXeed arc"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Multi-purpose bib overalls certified for protection against internal electric arc, heat, flame, and chemicals"'::jsonb,
    'it', '"Salopette multiuso certificata per la protezione da arco elettrico interno, calore, fiamma e sostanze chimiche"'::jsonb,
    'fr', '"Salopette polyvalente certifiée pour la protection contre l''arc électrique interne, la chaleur, la flamme et les substances chimiques"'::jsonb,
    'de', '"Vielseitige Latzhose, zertifiziert zum Schutz vor internem Lichtbogen, Hitze, Flamme und Chemikalien"'::jsonb,
    'es', '"Peto multiusos certificado para la protección contra el arco eléctrico interno, el calor, la llama y las sustancias químicas"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-resistant multi-purpose salopette in flame-resistant fabric"'::jsonb,
    'it', '"Salopette multifunzione in tessuto ignifugo"'::jsonb,
    'fr', '"Salopette multifonction en tissu ignifuge"'::jsonb,
    'de', '"Multifunktionslatzhose aus flammhemmendem Gewebe"'::jsonb,
    'es', '"Peto multifunción en tejido ignífugo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Work bib overalls"'::jsonb,
    'fr', '"Salopettes de travail"'::jsonb,
    'de', '"Arbeitslatzhosen"'::jsonb,
    'es', '"Petos de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Attached reflex elements", "\"This protective clothing must always be worn as a suit in combination with a jacket with  dungarees / trousers and closed to achieve protection levels\"", "Highly resistant and durable", "Ergonomic fit with extended back part", "Two side pockets and leg pockets with a ruler pocket, concealed with a flap", "Gusset insert for maximum freedom of movement", "High level of comfort"]'::jsonb,
    'it', '["Pantalone multifunzionale a vita con vestibilità ergonomica, adatta a una vasta gamma di sfide.", "Elementi riflettenti applicati", "Questo capo protettivo deve sempre essere indossato come completo, in combinazione con una giacca con salopette/pantaloni chiusi, per garantire i livelli di protezione", "Altamente resistente e durevole", "Vestibilità ergonomica con parte posteriore estesa", "Due tasche laterali e sulle gambe con tasca per metro pieghevole, nascosta con patta", "v", "Inserto inguinale per la massima libertà di movimento", "Elevato comfort"]'::jsonb,
    'fr', '["Pantalon multifonctionnel taille avec coupe ergonomique, adapté à un large éventail de défis.", "Éléments réfléchissants appliqués", "Ce vêtement de protection doit toujours être porté en tant qu''ensemble, associé à une veste avec une salopette/un pantalon fermé, afin de garantir les niveaux de protection", "Extrêmement résistant et durable", "Coupe ergonomique avec dos allongé", "Deux poches latérales et sur les jambes avec poche pour mètre pliant, dissimulée par un rabat", "v", "Empiècement à l''entrejambe pour une liberté de mouvement maximale", "Confort élevé"]'::jsonb,
    'de', '["Multifunktionale Bundhose mit ergonomischer Passform, geeignet für eine Vielzahl von Herausforderungen.", "Aufgebrachte reflektierende Elemente", "Dieses Schutzkleidungsstück muss immer als komplettes Set getragen werden, in Kombination mit einer Jacke mit Latzhose/geschlossener Hose, um die Schutzstufen zu gewährleisten", "Sehr widerstandsfähig und langlebig", "Ergonomische Passform mit verlängertem Rückenteil", "Zwei Seiten- und Beintaschen mit Zollstocktasche, mit Patte verdeckt", "v", "Schritteinsatz für maximale Bewegungsfreiheit", "Hoher Komfort"]'::jsonb,
    'es', '["Pantalón multifuncional de cintura con corte ergonómico, adecuado para una amplia gama de retos.", "Elementos reflectantes aplicados", "Esta prenda de protección debe llevarse siempre como conjunto completo, combinada con una chaqueta con peto/pantalón cerrado, para garantizar los niveles de protección", "Altamente resistente y duradero", "Ajuste ergonómico con parte trasera extendida", "Dos bolsillos laterales y en las piernas con bolsillo para metro plegable, oculto con solapa", "v", "Inserto en la entrepierna para la máxima libertad de movimiento", "Alto confort"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Electrical installations", "Operations with low or moderate chemical hazards", "Welding work"]'::jsonb,
    'it', '["Installazioni elettriche", "Operazioni in presenza di rischi chimici bassi o moderati", "Lavori di saldatura"]'::jsonb,
    'fr', '["Installations électriques", "Opérations en présence de risques chimiques faibles ou modérés", "Travaux de soudage"]'::jsonb,
    'de', '["Elektroinstallationen", "Arbeiten bei niedrigen oder mittleren chemischen Risiken", "Schweißarbeiten"]'::jsonb,
    'es', '["Instalaciones eléctricas", "Operaciones con riesgos químicos bajos o moderados", "Trabajos de soldadura"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico", "Chimico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile", "Chimique"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche", "Chemisch"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz", "Químico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Flame-resistant trousers"]'::jsonb,
    'it', '["Pantalone", "ignifugo"]'::jsonb,
    'fr', '["Pantalon", "ignifuge"]'::jsonb,
    'de', '["Hose", "flammhemmend"]'::jsonb,
    'es', '["Pantalón", "ignífugo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["59% FR viscose, 33% Nomex®, 8% elastane"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["EN 13034: Type 6"]'::jsonb
  )
WHERE id = '59dfd8d9-d335-4025-80b9-6874aff32411';

-- 01-301
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"01-301"'::jsonb,
    'it', '"01-301"'::jsonb,
    'fr', '"01-301"'::jsonb,
    'de', '"01-301"'::jsonb,
    'es', '"01-301"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13 gauges Glove, Graphene liner, Micro foam Nitrile palm coating, reinforced crotch"'::jsonb,
    'it', '"Guanto  13 aghi, fodera in grafene, rivestimento in micro schiuma di nitrile sul palmo, thumb crotch rinforzato"'::jsonb,
    'fr', '"Gant 13 jauges, doublure en graphène, enduction en mousse de nitrile sur la paume, fourche du pouce renforcée"'::jsonb,
    'de', '"13-Gauge-Handschuh, Graphenfutter, Nitril-Mikroschaum-Beschichtung auf der Handfläche, verstärkter Daumenzwickel"'::jsonb,
    'es', '"Guante de 13 galgas, forro de grafeno, recubrimiento de microespuma de nitrilo en la palma, horquilla del pulgar reforzada"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13 gauges Glove, Graphene liner, Micro foam Nitrile palm coating, reinforced crotch"'::jsonb,
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
    'en', '["13 gauge grey Kyorene® graphene liner", "Bacteriostatic kills harmful bacteria", "Thermal regulating to keep the hands comfortable", "Odor neutralizing to keep the gloves smelling Fresh", "Touch Screen compatible", "ANSI cut level A2"]'::jsonb,
    'it', '["Fodera in grafene Kyorene® grigio calibro 13", "Il batteriostatico uccide i batteri nocivi", "Regolazione termica per mantenere le mani comode", "Neutralizza gli odori per mantenere i guanti con un odore fresco", "Compatibile con Touch Screen", "ANSI livello taglio A2"]'::jsonb,
    'fr', '["Doublure en graphène Kyorene® gris, jauge 13", "L''agent bactériostatique tue les bactéries nocives", "Régulation thermique pour garder les mains confortables", "Neutralise les odeurs pour garder les gants avec une odeur fraîche", "Compatible avec écran tactile", "Niveau de coupure ANSI A2"]'::jsonb,
    'de', '["Innenfutter aus grauem Kyorene®-Graphen, Feinheit 13", "Der bakteriostatische Wirkstoff tötet schädliche Bakterien ab", "Thermoregulierung für ein angenehmes Handgefühl", "Neutralisiert Gerüche, damit die Handschuhe frisch riechen", "Touchscreen-kompatibel", "ANSI-Schnittschutzstufe A2"]'::jsonb,
    'es', '["Forro de grafeno Kyorene® gris, calibre 13", "El bacteriostático mata las bacterias nocivas", "Regulación térmica para mantener las manos cómodas", "Neutraliza los olores para mantener los guantes con un olor fresco", "Compatible con pantalla táctil", "Nivel de corte ANSI A2"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations in production and manufacturing lines", "Metal sheets handling"]'::jsonb,
    'it', '["Operazioni in catena produttiva", "Movimentazione lamiere"]'::jsonb,
    'fr', '["Opérations sur chaîne de production", "Manutention de tôles"]'::jsonb,
    'de', '["Arbeiten am Fließband", "Handhabung von Blechen"]'::jsonb,
    'es', '["Operaciones en cadena de producción", "Manipulación de chapas"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Automotive", "Manufacturing", "Appliances and white goods", "Construction"]'::jsonb,
    'it', '["Automotive", "Edilizia", "Produzione di elettrodomestici", "Manufacturing"]'::jsonb,
    'fr', '["Automobile", "Construction", "Fabrication d''appareils électroménagers", "Fabrication"]'::jsonb,
    'de', '["Automobilindustrie", "Bauwesen", "Haushaltsgeräteherstellung", "Fertigung"]'::jsonb,
    'es', '["Automoción", "Construcción", "Fabricación de electrodomésticos", "Fabricación"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene", "Cut-resistant gloves", "Nitrile micro-foam"]'::jsonb,
    'it', '["Grafene", "antitaglio", "spalmatura nitrile"]'::jsonb,
    'fr', '["Graphène", "anticoupure", "enduction nitrile"]'::jsonb,
    'de', '["Graphen", "schnittfest", "Nitrilbeschichtung"]'::jsonb,
    'es', '["Grafeno", "anticorte", "recubrimiento de nitrilo"]'::jsonb
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
WHERE id = 'f6491ee3-e268-48f8-9de3-13b955079068';

-- salopette-suxxeed-multifunction
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"salopette suXXeed multifunction"'::jsonb,
    'it', '"salopette suXXeed multifunction"'::jsonb,
    'fr', '"salopette suXXeed multifunction"'::jsonb,
    'de', '"Latzhose suXXeed multifunction"'::jsonb,
    'es', '"peto suXXeed multifunction"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-resistant multi-purpose bib overalls, suitable for a wide range of applications"'::jsonb,
    'it', '"Salopette mutlifunzione ignifugo, adatto per molteplici campi di impiego"'::jsonb,
    'fr', '"Salopette multifonctionnelle ignifuge, adaptée à de nombreux domaines d''application"'::jsonb,
    'de', '"Multifunktionale, flammhemmende Latzhose, geeignet für zahlreiche Einsatzbereiche"'::jsonb,
    'es', '"Peto multifunción ignífugo, adecuado para múltiples ámbitos de uso"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Flame-resistant multi-purpose salopette in flame-resistant fabric"'::jsonb,
    'it', '"Salopette multifunzione in tessuto ignifugo"'::jsonb,
    'fr', '"Salopette multifonction en tissu ignifuge"'::jsonb,
    'de', '"Multifunktionslatzhose aus flammhemmendem Gewebe"'::jsonb,
    'es', '"Peto multifunción en tejido ignífugo"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Work bib overalls"'::jsonb,
    'fr', '"Salopettes de travail"'::jsonb,
    'de', '"Arbeitslatzhosen"'::jsonb,
    'es', '"Petos de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Attached reflex elements", "\"This protective clothing must always be worn as a suit in combination with a jacket with  dungarees / trousers and closed to achieve protection levels\"", "Highly resistant and durable", "Inner pocket for knee pad", "Flame-resistant fabric", "Ergonomic multi-purpose bib overalls, suitable for a wide range of applications", "Flame-resistant fabric"]'::jsonb,
    'it', '["Elementi riflettenti applicati", "Questo capo protettivo deve sempre essere indossato come completo, in combinazione con una giacca con salopette/pantaloni chiusi, per garantire i livelli di protezione", "Altamente resistente e durevole", "Tasca interna per ginocchiera imbottita", "Tessuto ignifugo", "Salopette multifunzionale ergonomica, adatta a una vasta gamma di applicazioni"]'::jsonb,
    'fr', '["Éléments réfléchissants appliqués", "Ce vêtement de protection doit toujours être porté en tant qu''ensemble, associé à une veste avec une salopette/un pantalon fermé, afin de garantir les niveaux de protection", "Extrêmement résistant et durable", "Poche intérieure pour genouillère rembourrée", "Tissu ignifuge", "Salopette multifonctionnelle ergonomique, adaptée à une large gamme d''applications"]'::jsonb,
    'de', '["Aufgebrachte reflektierende Elemente", "Dieses Schutzkleidungsstück muss immer als komplettes Set getragen werden, in Kombination mit einer Jacke mit Latzhose/geschlossener Hose, um die Schutzstufen zu gewährleisten", "Sehr widerstandsfähig und langlebig", "Innentasche für gepolsterte Knieschützer", "Flammhemmendes Gewebe", "Ergonomische multifunktionale Latzhose, geeignet für ein breites Anwendungsspektrum"]'::jsonb,
    'es', '["Elementos reflectantes aplicados", "Esta prenda de protección debe llevarse siempre como conjunto completo, combinada con una chaqueta con peto/pantalón cerrado, para garantizar los niveles de protección", "Altamente resistente y duradero", "Bolsillo interior para rodillera acolchada", "Tejido ignífugo", "Peto multifuncional ergonómico, adecuado para una amplia gama de aplicaciones"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations with low or moderate chemical hazards", "Welding work", "Hobby"]'::jsonb,
    'it', '["Operazioni in presenza di rischi chimici bassi o moderati", "Lavori di saldatura", "Hobbystica"]'::jsonb,
    'fr', '["Opérations en présence de risques chimiques faibles ou modérés", "Travaux de soudage", "Bricolage"]'::jsonb,
    'de', '["Arbeiten bei niedrigen oder mittleren chemischen Risiken", "Schweißarbeiten", "Hobby"]'::jsonb,
    'es', '["Operaciones con riesgos químicos bajos o moderados", "Trabajos de soldadura", "Bricolaje"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico", "Chimico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile", "Chimique"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche", "Chemisch"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz", "Químico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Flame-resistant trousers"]'::jsonb,
    'it', '["Pantalone", "ignifugo"]'::jsonb,
    'fr', '["Pantalon", "ignifuge"]'::jsonb,
    'de', '["Hose", "flammhemmend"]'::jsonb,
    'es', '["Pantalón", "ignífugo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["49% modacrylic, 42% cotton, 5% aramid, 3% polyamide, 1% antistatic fibres"]'::jsonb,
    'it', '["49 % Modacrilico, 42 % Cotone, 5 % Aramide, 3 % Poliammide, 1 % Fibre antistatiche"]'::jsonb,
    'fr', '["49 % modacrylique, 42 % coton, 5 % aramide, 3 % polyamide, 1 % fibres antistatiques"]'::jsonb,
    'de', '["49 % Modacryl, 42 % Baumwolle, 5 % Aramid, 3 % Polyamid, 1 % antistatische Fasern"]'::jsonb,
    'es', '["49 % modacrílico, 42 % algodón, 5 % aramida, 3 % poliamida, 1 % fibras antiestáticas"]'::jsonb
  )
WHERE id = '44234833-12d6-4d23-a9f7-b7bf51aa26af';

-- 01-701
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"01-701"'::jsonb,
    'it', '"01-701"'::jsonb,
    'fr', '"01-701"'::jsonb,
    'de', '"01-701"'::jsonb,
    'es', '"01-701"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13 gauge  Kyorene® graphene liner glove and nitrile microfoam palm coating"'::jsonb,
    'it', '"Guanto 13 aghi con fodera in fibra di grafene Kyorene® e rivestimento del palmo in microschiuma di nitrile"'::jsonb,
    'fr', '"Gant 13 jauges avec doublure en fibre de graphène Kyorene® et paume enduite de mousse de nitrile micro-poreuse"'::jsonb,
    'de', '"13-Gauge-Handschuh mit Futter aus Kyorene®-Graphenfaser und Handfläche mit Nitril-Mikroschaumbeschichtung"'::jsonb,
    'es', '"Guante de 13 galgas con forro de fibra de grafeno Kyorene® y palma recubierta de microespuma de nitrilo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13g Kyorene liner, nitrile microfoam palm coated glove. Reinforcement on crotch"'::jsonb,
    'it', '"Guanto  13 aghi, fodera Kyorene, palmo rivestito in microschiuma di nitrile, thumb crotch rinforzato"'::jsonb,
    'fr', '"Gant 13 jauges, doublure Kyorene, paume enduite de mousse de nitrile micro-poreuse, fourchette du pouce renforcée"'::jsonb,
    'de', '"13-Gauge-Handschuh, Kyorene-Futter, Handfläche mit Nitril-Mikroschaum beschichtet, verstärkter Daumensteg"'::jsonb,
    'es', '"Guante de 13 galgas, forro Kyorene, palma recubierta de microespuma de nitrilo, horquilla del pulgar reforzada"'::jsonb
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
    'en', '["13 gauge grey Kyorene® graphene liner", "Bacteriostatic kills harmful bacteria", "Thermal regulating to keep the hands comfortable", "Odor neutralizing to keep the gloves smelling Fresh", "Touch Screen compatible", "ANSI cut level A6"]'::jsonb,
    'it', '["Fodera in grafene Kyorene® grigio calibro 13", "Il batteriostatico uccide i batteri nocivi", "Regolazione termica per mantenere le mani comode", "Neutralizzazione degli odori per mantenere i guanti con un odore fresco", "Compatibile Touch Screen", "ANSI taglio livello A6"]'::jsonb,
    'fr', '["Doublure en graphène Kyorene® gris, jauge 13", "L''agent bactériostatique tue les bactéries nocives", "Régulation thermique pour garder les mains confortables", "Neutralisation des odeurs pour garder les gants toujours frais", "Compatible écran tactile", "Niveau de coupure ANSI A6"]'::jsonb,
    'de', '["Innenfutter aus grauem Kyorene®-Graphen, Feinheit 13", "Der bakteriostatische Wirkstoff tötet schädliche Bakterien ab", "Thermoregulierung für ein angenehmes Handgefühl", "Geruchsneutralisierung, damit die Handschuhe stets frisch riechen", "Touchscreen-kompatibel", "ANSI-Schnittschutzstufe A6"]'::jsonb,
    'es', '["Forro de grafeno Kyorene® gris, calibre 13", "El bacteriostático mata las bacterias nocivas", "Regulación térmica para mantener las manos cómodas", "Neutralización de olores para mantener los guantes con un olor fresco", "Compatible con pantalla táctil", "Nivel de corte ANSI A6"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal stamping", "Handling sharp objects and metal sheets", "Operations with elevated cut risk"]'::jsonb,
    'it', '["Stampaggio metalli", "Controllo qualita'' zona fredda del vetro", "Manovra di oggetti taglienti e lamerie", "Operazioni con elevato rischio di taglio"]'::jsonb,
    'fr', '["Estampage des métaux", "Contrôle qualité de la zone froide du verre", "Manipulation d''objets tranchants et de tôles", "Opérations à risque de coupure élevé"]'::jsonb,
    'de', '["Metallumformung", "Qualitätskontrolle in der Kaltzone des Glases", "Handhabung von scharfen Gegenständen und Blechen", "Arbeiten mit hohem Schnittrisiko"]'::jsonb,
    'es', '["Estampado de metales", "Control de calidad de la zona fría del vidrio", "Manejo de objetos cortantes y chapas", "Operaciones con alto riesgo de corte"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Metal manufacturing", "Steel manufacturing", "Recycling", "Glass manufacturing"]'::jsonb,
    'it', '["Industria del vetro", "Industria dell''acciaio", "Fabbricazione di metalli", "Edilizia", "RIciclaggio"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Fabrication de métaux", "Construction", "Recyclage"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallherstellung", "Bauwesen", "Recycling"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Fabricación de metales", "Construcción", "Reciclaje"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene", "cut-resistant gloves"]'::jsonb,
    'it', '["Grafene", "antitaglio"]'::jsonb,
    'fr', '["Graphène", "anticoupure"]'::jsonb,
    'de', '["Graphen", "schnittfest"]'::jsonb,
    'es', '["Grafeno", "anticorte"]'::jsonb
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
WHERE id = 'e4f19b00-de51-4f84-9d6f-8ad041169041';

-- 2
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"2"'::jsonb,
    'it', '"2"'::jsonb,
    'fr', '"2"'::jsonb,
    'de', '"2"'::jsonb,
    'es', '"2"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% continuous-filament cotton five-finger glove, fully lined on all fingers with an elasticized wrist.\nA practical, lightweight glove suitable for minimal risks and contact-heat protection up to 50 °C"'::jsonb,
    'it', '"Guanto in cotone 100% filo continuo a cinque dita doppiato su tutte le dita con polso elasticizzato.\nGuanto pratico e leggero, adatto a rischi minimi e protezione da calore di contatto fino a 50°C"'::jsonb,
    'fr', '"Gant en coton 100 % fil continu à cinq doigts, doublé sur tous les doigts, avec poignet élastiqué.\nGant pratique et léger, adapté aux risques minimes et à la protection contre la chaleur de contact jusqu''à 50°C"'::jsonb,
    'de', '"Handschuh aus 100 % durchgehendem Baumwollgarn mit fünf Fingern, an allen Fingern doppelt verstärkt, mit elastischem Bund.\nPraktischer und leichter Handschuh, geeignet für geringe Risiken und Schutz vor Kontaktwärme bis 50°C"'::jsonb,
    'es', '"Guante de algodón 100 % hilo continuo de cinco dedos, doblado en todos los dedos, con puño elástico.\nGuante práctico y ligero, adecuado para riesgos mínimos y protección contra el calor de contacto de hasta 50°C"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100% continuous-yarn cotton glove, doubled on all fingers; minimal hazards & contact-heat protection to 50 °C"'::jsonb,
    'it', '"Guanto in cotone 100% filo continuo doppiato su tutte le dita per rischi minimi e temperature fino a 50°C"'::jsonb,
    'fr', '"Gant en coton 100 % fil continu doublé sur tous les doigts, pour risques minimes et températures jusqu''à 50°C"'::jsonb,
    'de', '"Handschuh aus 100 % durchgehendem Baumwollgarn, an allen Fingern doppelt verstärkt, für geringe Risiken und Temperaturen bis 50°C"'::jsonb,
    'es', '"Guante de algodón 100 % hilo continuo doblado en todos los dedos, para riesgos mínimos y temperaturas de hasta 50°C"'::jsonb
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
    'en', '["Reinforced fingers", "Excellent dexterity in low-risk environments"]'::jsonb,
    'it', '["Rinforzato sulle dita", "Ottima destrezza in ambienti a minimi rischi"]'::jsonb,
    'fr', '["Renforcé au niveau des doigts", "Excellente dextérité dans des environnements à risques minimes"]'::jsonb,
    'de', '["An den Fingern verstärkt", "Ausgezeichnete Fingerfertigkeit in Umgebungen mit minimalen Risiken"]'::jsonb,
    'es', '["Reforzado en los dedos", "Excelente destreza en entornos con riesgos mínimos"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Minimal-risk protection", "Low-temperature contact-heat protection (50 °C)", "Light handling", "Assembly, packing, and packaging in clean environments"]'::jsonb,
    'it', '["Protezione rischi minimi", "Protezione calore contatto basse temperature (50°C)", "Manipolazioni leggere", "Assemblaggio, imballaggio e confezionamento in ambienti puliti"]'::jsonb,
    'fr', '["Protection contre les risques minimes", "Protection contre la chaleur de contact à basse température (50°C)", "Manipulations légères", "Assemblage, emballage et conditionnement en environnements propres"]'::jsonb,
    'de', '["Schutz vor geringen Risiken", "Schutz vor Kontaktwärme bei niedrigen Temperaturen (50°C)", "Leichte Handhabung", "Montage, Verpackung und Konfektionierung in sauberen Umgebungen"]'::jsonb,
    'es', '["Protección contra riesgos mínimos", "Protección contra el calor de contacto a bajas temperaturas (50°C)", "Manipulaciones ligeras", "Montaje, embalaje y envasado en entornos limpios"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass industry", "Logistics", "Light-duty maintenance"]'::jsonb,
    'it', '["Industria del vetro", "Logistica", "Manutenzione generica leggera"]'::jsonb,
    'fr', '["Industrie du verre", "Logistique", "Maintenance générale légère"]'::jsonb,
    'de', '["Glasindustrie", "Logistik", "Leichte allgemeine Wartung"]'::jsonb,
    'es', '["Industria del vidrio", "Logística", "Mantenimiento general ligero"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Minimal hazards", "high dexterity", "comfort"]'::jsonb,
    'it', '["rischi minimi", "elevata destrezza", "comfort"]'::jsonb,
    'fr', '["risques minimes", "grande dextérité", "confort"]'::jsonb,
    'de', '["geringe Risiken", "hohe Fingerfertigkeit", "Komfort"]'::jsonb,
    'es', '["riesgos mínimos", "alta destreza", "confort"]'::jsonb
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
WHERE id = 'c495dca9-4296-4d56-be66-aef4d2ebb63d';

-- suxxeed-industry-men-cargo-trousers
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed industry men cargo trousers"'::jsonb,
    'it', '"suXXeed industry PANTALONI UOMO"'::jsonb,
    'fr', '"suXXeed industry PANTALON HOMME"'::jsonb,
    'de', '"suXXeed industry HERRENHOSE"'::jsonb,
    'es', '"suXXeed industry PANTALÓN HOMBRE"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Sporty work trousers; the stretch fabric ensures a comfortable fit"'::jsonb,
    'it', '"Pantaloni sportivi da lavoro, il tessuto elasticizzato garantisce una vestibilità comoda"'::jsonb,
    'fr', '"Pantalons de travail sportifs, le tissu extensible garantit un confort de port"'::jsonb,
    'de', '"Sportliche Arbeitshosen, das elastische Gewebe sorgt für einen bequemen Sitz"'::jsonb,
    'es', '"Pantalones deportivos de trabajo, el tejido elástico garantiza un ajuste cómodo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Men’s multi-purpose work trousers"'::jsonb,
    'it', '"Pantaloni da lavoro multifunzione uomo"'::jsonb,
    'fr', '"Pantalon de travail multifonction homme"'::jsonb,
    'de', '"Multifunktionale Arbeitshose für Herren"'::jsonb,
    'es', '"Pantalón de trabajo multifunción para hombre"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Subtle contrasting color", "Certified in accordance with OEKO-TEX® Standard 100", "Reflective details", "Two reinforced back pockets with Cordura, high-capacity thigh pocket and integrated mobile phone pocket, folding ruler pocket in Cordura", "All fastenings are covered", "Knee pad pocket", "Ergonomic lines for greater freedom of movement"]'::jsonb,
    'it', '["Discreto colore a contrasto", "Certificazione in conformità a OEKO-TEX® Standard 100", "Dettagli riflettenti", "Due tasche posteriori rinforzate con Cordura, tasca sulla coscia ad alto volume e tasca per cellulare integrata, tasca per metro pieghevole in Cordura", "Tutte le chiusure sono coperte", "Tasca per ginocchiera", "Linee ergonomiche per una maggiore libertà di movimento"]'::jsonb,
    'fr', '["Couleur contrastante discrète", "Certification conforme à OEKO-TEX® Standard 100", "Détails réfléchissants", "Deux poches arrière renforcées en Cordura, poche cuisse grand volume et poche pour téléphone intégrée, poche pour mètre pliant en Cordura", "Toutes les fermetures sont recouvertes", "Poche pour genouillère", "Lignes ergonomiques pour une plus grande liberté de mouvement"]'::jsonb,
    'de', '["Dezente Kontrastfarbe", "Zertifizierung gemäß OEKO-TEX® Standard 100", "Reflektierende Details", "Zwei mit Cordura verstärkte Gesäßtaschen, voluminöse Oberschenkeltasche und integrierte Handytasche, Zollstocktasche aus Cordura", "Alle Verschlüsse sind verdeckt", "Knieschützertasche", "Ergonomische Linienführung für mehr Bewegungsfreiheit"]'::jsonb,
    'es', '["Color de contraste discreto", "Certificación conforme a OEKO-TEX® Standard 100", "Detalles reflectantes", "Dos bolsillos traseros reforzados con Cordura, bolsillo de gran volumen en el muslo y bolsillo para móvil integrado, bolsillo para metro plegable en Cordura", "Todos los cierres están cubiertos", "Bolsillo para rodillera", "Líneas ergonómicas para una mayor libertad de movimiento"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work and leisure", "Indoor work"]'::jsonb,
    'it', '["Lavoro e tempo libero", "Lavori indoor"]'::jsonb,
    'fr', '["Travail et loisirs", "Travaux en intérieur"]'::jsonb,
    'de', '["Arbeit und Freizeit", "Arbeiten im Innenbereich"]'::jsonb,
    'es', '["Trabajo y tiempo libre", "Trabajos en interiores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work trousers"]'::jsonb,
    'it', '["Pantaloni da lavoro"]'::jsonb,
    'fr', '["Pantalons de travail"]'::jsonb,
    'de', '["Arbeitshosen"]'::jsonb,
    'es', '["Pantalones de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["49% cotton, 49% polyester, 2% elastane"]'::jsonb,
    'it', '["49 % Cotone, 49 % Poliestere, 2 % Elasthan®"]'::jsonb,
    'fr', '["49 % coton, 49 % polyester, 2 % Elasthanne®"]'::jsonb,
    'de', '["49 % Baumwolle, 49 % Polyester, 2 % Elasthan®"]'::jsonb,
    'es', '["49 % algodón, 49 % poliéster, 2 % Elastano®"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Colours: Anthracite, Navy Blue, Midnight Blue, Ultramarine Blue, Graphite, Red, Dark Green"]'::jsonb,
    'it', '["Colour: Antracite, Blu navy, Blu notte, Blu ultramarino, Grafite, Rosso, Verde scuro"]'::jsonb,
    'fr', '["Couleur : Anthracite, Bleu marine, Bleu nuit, Bleu outremer, Graphite, Rouge, Vert foncé"]'::jsonb,
    'de', '["Farbe: Anthrazit, Marineblau, Nachtblau, Ultramarinblau, Graphit, Rot, Dunkelgrün"]'::jsonb,
    'es', '["Color: Antracita, Azul marino, Azul noche, Azul ultramar, Grafito, Rojo, Verde oscuro"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '705bc299-77cc-4a7d-8e18-698b3da5c74a';

-- suxxeed-industry-womens-cargo-trousers
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed industry womens cargo trousers"'::jsonb,
    'it', '"suXXeed industry PANTALONI DONNA"'::jsonb,
    'fr', '"suXXeed industry PANTALON FEMME"'::jsonb,
    'de', '"suXXeed industry DAMENHOSE"'::jsonb,
    'es', '"suXXeed industry PANTALÓN MUJER"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Sporty work trousers; the stretch fabric ensures a comfortable fit"'::jsonb,
    'it', '"Pantaloni sportivi da lavoro, il tessuto elasticizzato garantisce una vestibilità comoda"'::jsonb,
    'fr', '"Pantalons de travail sportifs, le tissu extensible garantit un confort de port"'::jsonb,
    'de', '"Sportliche Arbeitshosen, das elastische Gewebe sorgt für einen bequemen Sitz"'::jsonb,
    'es', '"Pantalones deportivos de trabajo, el tejido elástico garantiza un ajuste cómodo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"womens multi-purpose work trousers"'::jsonb,
    'it', '"Pantaloni da lavoro multifunzione donna"'::jsonb,
    'fr', '"Pantalon de travail multifonction femme"'::jsonb,
    'de', '"Multifunktionale Arbeitshose für Damen"'::jsonb,
    'es', '"Pantalón de trabajo multifunción para mujer"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Subtle contrasting color", "Certified in accordance with OEKO-TEX® Standard 100", "Reflective details", "Two reinforced back pockets with Cordura, high-capacity thigh pocket and integrated mobile phone pocket, folding ruler pocket in Cordura", "All fastenings are covered", "Knee pad pocket", "Ergonomic lines for greater freedom of movement"]'::jsonb,
    'it', '["Discreto colore a contrasto", "Certificazione in conformità a OEKO-TEX® Standard 100", "Dettagli riflettenti", "Due tasche posteriori rinforzate con Cordura, tasca sulla coscia ad alto volume e tasca per cellulare integrata, tasca per metro pieghevole in Cordura", "Tutte le chiusure sono coperte", "Tasca per ginocchiera", "Linee ergonomiche per una maggiore libertà di movimento"]'::jsonb,
    'fr', '["Couleur contrastante discrète", "Certification conforme à OEKO-TEX® Standard 100", "Détails réfléchissants", "Deux poches arrière renforcées en Cordura, poche cuisse grand volume et poche pour téléphone intégrée, poche pour mètre pliant en Cordura", "Toutes les fermetures sont recouvertes", "Poche pour genouillère", "Lignes ergonomiques pour une plus grande liberté de mouvement"]'::jsonb,
    'de', '["Dezente Kontrastfarbe", "Zertifizierung gemäß OEKO-TEX® Standard 100", "Reflektierende Details", "Zwei mit Cordura verstärkte Gesäßtaschen, voluminöse Oberschenkeltasche und integrierte Handytasche, Zollstocktasche aus Cordura", "Alle Verschlüsse sind verdeckt", "Knieschützertasche", "Ergonomische Linienführung für mehr Bewegungsfreiheit"]'::jsonb,
    'es', '["Color de contraste discreto", "Certificación conforme a OEKO-TEX® Standard 100", "Detalles reflectantes", "Dos bolsillos traseros reforzados con Cordura, bolsillo de gran volumen en el muslo y bolsillo para móvil integrado, bolsillo para metro plegable en Cordura", "Todos los cierres están cubiertos", "Bolsillo para rodillera", "Líneas ergonómicas para una mayor libertad de movimiento"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work and leisure", "Indoor work"]'::jsonb,
    'it', '["Lavoro e tempo libero", "Lavori indoor"]'::jsonb,
    'fr', '["Travail et loisirs", "Travaux en intérieur"]'::jsonb,
    'de', '["Arbeit und Freizeit", "Arbeiten im Innenbereich"]'::jsonb,
    'es', '["Trabajo y tiempo libre", "Trabajos en interiores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work trousers"]'::jsonb,
    'it', '["Pantaloni da lavoro"]'::jsonb,
    'fr', '["Pantalons de travail"]'::jsonb,
    'de', '["Arbeitshosen"]'::jsonb,
    'es', '["Pantalones de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["49% cotton, 49% polyester, 2% elastane"]'::jsonb,
    'it', '["49 % Cotone, 49 % Poliestere, 2 % Elasthan®"]'::jsonb,
    'fr', '["49 % coton, 49 % polyester, 2 % Elasthanne®"]'::jsonb,
    'de', '["49 % Baumwolle, 49 % Polyester, 2 % Elasthan®"]'::jsonb,
    'es', '["49 % algodón, 49 % poliéster, 2 % Elastano®"]'::jsonb
  ),
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Colours: Anthracite, Navy Blue, Midnight Blue, Ultramarine Blue, Graphite, Red, Dark Green"]'::jsonb,
    'it', '["Colour: Antracite, Blu navy, Blu notte, Blu ultramarino, Grafite, Rosso, Verde scuro"]'::jsonb,
    'fr', '["Couleur : Anthracite, Bleu marine, Bleu nuit, Bleu outremer, Graphite, Rouge, Vert foncé"]'::jsonb,
    'de', '["Farbe: Anthrazit, Marineblau, Nachtblau, Ultramarinblau, Graphit, Rot, Dunkelgrün"]'::jsonb,
    'es', '["Color: Antracita, Azul marino, Azul noche, Azul ultramar, Grafito, Rojo, Verde oscuro"]'::jsonb
  )
WHERE id = '56ef776a-702f-4363-b45f-63c19167e69a';

-- 06-120
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"06-120"'::jsonb,
    'it', '"06-120"'::jsonb,
    'fr', '"06-120"'::jsonb,
    'de', '"06-120"'::jsonb,
    'es', '"06-120"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight thermal glove, 120 g, double-layer 100 % continuous-yarn cotton. Designed for medium mechanical & thermal risks."'::jsonb,
    'it', '"Guanto Termico Leggero 120g in doppio strato di cotone 100% a filo continuo. Disegnato per garantire elevata destrezza e protezione da rischi meccanici e termici di media gravita''."'::jsonb,
    'fr', '"Gant thermique léger 120 g en double couche de coton 100 % fil continu. Conçu pour garantir une grande dextérité et une protection contre les risques mécaniques et thermiques de gravité moyenne."'::jsonb,
    'de', '"Leichter Thermohandschuh 120 g aus doppellagiger 100%iger Baumwolle mit durchgehendem Garn. Entwickelt, um hohe Fingerfertigkeit und Schutz vor mechanischen und thermischen Risiken mittleren Schweregrads zu gewährleisten."'::jsonb,
    'es', '"Guante térmico ligero de 120 g en doble capa de algodón 100 % hilo continuo. Diseñado para garantizar una elevada destreza y protección contra riesgos mecánicos y térmicos de gravedad media."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lightweight thermal glove, 120 g, 100 % continuous-yarn cotton"'::jsonb,
    'it', '"Doppio guanto anticalore in cotone continuo, 120 g"'::jsonb,
    'fr', '"Gant anti-chaleur double en coton continu, 120 g"'::jsonb,
    'de', '"Doppellagiger Hitzeschutzhandschuh aus durchgehender Baumwolle, 120 g"'::jsonb,
    'es', '"Guante doble resistente al calor de algodón continuo, 120 g"'::jsonb
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
    'en', '["Seamless continuous-yarn", "Ergonomic design for prolonged use", "Certified to 150 °C", "Weight: 120 g"]'::jsonb,
    'it', '["Filo continuo, senza cuciture", "Design ergonomico per uso prolungato", "Certificato fino a 150C", "Peso 120 g"]'::jsonb,
    'fr', '["Fil continu, sans couture", "Design ergonomique pour un usage prolongé", "Certifié jusqu''à 150C", "Poids 120 g"]'::jsonb,
    'de', '["Durchgehender Faden, nahtlos", "Ergonomisches Design für den Dauereinsatz", "Zertifiziert bis 150C", "Gewicht 120 g"]'::jsonb,
    'es', '["Hilo continuo, sin costuras", "Diseño ergonómico para un uso prolongado", "Certificado hasta 150C", "Peso 120 g"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 150 °C", "Hot-material finishing & handling", "Assembly in hot-area operations"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 150°C", "Lavori di finitura e movimentazione materiali caldi", "Operazioni di assemblaggio in reparti caldi"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 150°C", "Travaux de finition et manutention de matériaux chauds", "Opérations d''assemblage dans des zones chaudes"]'::jsonb,
    'de', '["Handhabung von Teilen bis 150°C", "Nacharbeiten und Handhabung heißer Materialien", "Montagearbeiten in heißen Bereichen"]'::jsonb,
    'es', '["Manipulación de piezas de hasta 150°C", "Trabajos de acabado y manipulación de materiales calientes", "Operaciones de montaje en zonas calientes"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Food", "Packaging", "Light-industry maintenance"]'::jsonb,
    'it', '["Alimentare", "Packaging", "Manutenzione industria leggera"]'::jsonb,
    'fr', '["Alimentaire", "Emballage", "Maintenance de l''industrie légère"]'::jsonb,
    'de', '["Lebensmittel", "Verpackung", "Wartung in der Leichtindustrie"]'::jsonb,
    'es', '["Alimentación", "Embalaje", "Mantenimiento de industria ligera"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant", "150 °C", "medium risk", "cotton glove"]'::jsonb,
    'it', '["anticalore", "150C", "rischi medi", "guanto in cotone"]'::jsonb,
    'fr', '["anti-chaleur", "150 °C", "risques moyens", "gant en coton"]'::jsonb,
    'de', '["hitzebeständig", "150 °C", "mittlere Risiken", "Baumwollhandschuh"]'::jsonb,
    'es', '["resistente al calor", "150 °C", "riesgos medios", "guante de algodón"]'::jsonb
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
WHERE id = '691e1987-709c-412e-b1c0-c9d05ca824d3';

-- suxxeed-industry-mens-long-sleeve-work-shirt
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed industry mens long sleeve work shirt"'::jsonb,
    'it', '"suXXeed industry MAGLIA MANICHE LUNGHE UOMO"'::jsonb,
    'fr', '"suXXeed industry T-SHIRT MANCHES LONGUES HOMME"'::jsonb,
    'de', '"suXXeed industry LANGARMSHIRT HERREN"'::jsonb,
    'es', '"suXXeed industry CAMISETA MANGA LARGA HOMBRE"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Men’s long-sleeve work shirt with concealed fastenings, suitable for industrial washing."'::jsonb,
    'it', '"Maglia da lavoro a maniche lunghe da uomo con chiusure a scomparsa, adatto per il lavaggio industriale."'::jsonb,
    'fr', '"T-shirt de travail à manches longues pour homme avec fermetures dissimulées, adapté au lavage industriel."'::jsonb,
    'de', '"Langarm-Arbeitsshirt für Herren mit verdeckten Verschlüssen, geeignet für industrielle Wäsche."'::jsonb,
    'es', '"Camiseta de trabajo de manga larga para hombre con cierres ocultos, apta para lavado industrial."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Men’s long-sleeve work shirt"'::jsonb,
    'it', '"Maglia da lavoro a maniche lunghe da uomo"'::jsonb,
    'fr', '"T-shirt de travail à manches longues pour homme"'::jsonb,
    'de', '"Langarm-Arbeitsshirt für Herren"'::jsonb,
    'es', '"Camiseta de trabajo de manga larga para hombre"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Workwear shirts"'::jsonb,
    'it', '"Maglie da lavoro"'::jsonb,
    'fr', '"Maillots de travail"'::jsonb,
    'de', '"Arbeitsshirts"'::jsonb,
    'es', '"Camisetas de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Contrasting stitching on the left shoulder", "Forward-positioned side seams", "Certified in accordance with OEKO-TEX® Standard 100", "Round neckline", "Highly breathable"]'::jsonb,
    'it', '["Cuciture a contrasto sulla spalla sinistra", "Cuciture laterali avanzate", "Certificazione secondo OEKO-TEX® Standard 100", "Scollatura rotonda", "Molto traspirante"]'::jsonb,
    'fr', '["Coutures contrastantes sur l''épaule gauche", "Coutures latérales avancées", "Certification selon OEKO-TEX® Standard 100", "Encolure ronde", "Très respirant"]'::jsonb,
    'de', '["Kontrastnähte an der linken Schulter", "Fortschrittliche Seitennähte", "Zertifizierung nach OEKO-TEX® Standard 100", "Rundhalsausschnitt", "Sehr atmungsaktiv"]'::jsonb,
    'es', '["Costuras de contraste en el hombro izquierdo", "Costuras laterales avanzadas", "Certificación según OEKO-TEX® Standard 100", "Escote redondo", "Muy transpirable"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work and leisure", "Indoor work"]'::jsonb,
    'it', '["Lavoro e tempo libero", "Lavori indoor"]'::jsonb,
    'fr', '["Travail et loisirs", "Travaux en intérieur"]'::jsonb,
    'de', '["Arbeit und Freizeit", "Arbeiten im Innenbereich"]'::jsonb,
    'es', '["Trabajo y tiempo libre", "Trabajos en interiores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work shirt"]'::jsonb,
    'it', '["Maglia da lavoro"]'::jsonb,
    'fr', '["Maillot de travail"]'::jsonb,
    'de', '["Arbeitsshirt"]'::jsonb,
    'es', '["Camiseta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["50% polyester, 50% cotton"]'::jsonb,
    'it', '["50% poliestere, 50% cotone"]'::jsonb,
    'fr', '["50 % polyester, 50 % coton"]'::jsonb,
    'de', '["50 % Polyester, 50 % Baumwolle"]'::jsonb,
    'es', '["50 % poliéster, 50 % algodón"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '19ea7859-a176-449a-a246-1a22d05bd270';

-- 06-160
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"06-160"'::jsonb,
    'it', '"06-160"'::jsonb,
    'fr', '"06-160"'::jsonb,
    'de', '"06-160"'::jsonb,
    'es', '"06-160"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double-layer cotton glove (160 g continuous-yarn) for high temperatures (250 °C). Designed for dexterity & protection against medium/heavy mechanical and thermal risks."'::jsonb,
    'it', '"\"Guanto in doppio strato di cotone 160 g in filo continuo per alte temperature (250C).\nDisegnato per garantire elevata destrezza e protezione da rischi meccanici e termici di medio/alta gravita''.\""'::jsonb,
    'fr', '"\"Gant en double couche de coton 160 g à fil continu pour hautes températures (250C).\nConçu pour garantir une grande dextérité et une protection contre les risques mécaniques et thermiques de gravité moyenne/élevée.\""'::jsonb,
    'de', '"\"Handschuh aus doppellagiger 160-g-Baumwolle mit durchgehendem Garn für hohe Temperaturen (250C).\nEntwickelt, um hohe Fingerfertigkeit und Schutz vor mechanischen und thermischen Risiken mittleren bis hohen Schweregrads zu gewährleisten.\""'::jsonb,
    'es', '"\"Guante de doble capa de algodón de 160 g de hilo continuo para altas temperaturas (250C).\nDiseñado para garantizar una elevada destreza y protección contra riesgos mecánicos y térmicos de gravedad media/alta.\""'::jsonb
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
    'en', '["Seamless continuous-yarn", "Ergonomic design for prolonged use", "Certified to 250 °C", "Weight: 160 g"]'::jsonb,
    'it', '["Filo continuo, senza cuciture", "Design ergonomico per uso prolungato", "Certificato fino a 250C", "Peso 160 g"]'::jsonb,
    'fr', '["Fil continu, sans couture", "Design ergonomique pour un usage prolongé", "Certifié jusqu''à 250C", "Poids 160 g"]'::jsonb,
    'de', '["Durchgehender Faden, nahtlos", "Ergonomisches Design für den Dauereinsatz", "Zertifiziert bis 250C", "Gewicht 160 g"]'::jsonb,
    'es', '["Hilo continuo, sin costuras", "Diseño ergonómico para un uso prolongado", "Certificado hasta 250C", "Peso 160 g"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling parts up to 250 – 300°C", "Foundry & glassworks operations", "Furnace maintenance"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250-300°C", "Lavori in fonderia e vetreria", "Operazioni di manutenzione forni"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250-300°C", "Travaux en fonderie et en verrerie", "Opérations de maintenance des fours"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250-300°C", "Arbeiten in Gießerei und Glashütte", "Wartungsarbeiten an Öfen"]'::jsonb,
    'es', '["Manipulación de piezas de hasta 250-300°C", "Trabajos en fundición y vidriería", "Operaciones de mantenimiento de hornos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Foundry", "Steelworks", "Glass industry"]'::jsonb,
    'it', '["Fonderia", "Acciaieria", "Industria del vetro"]'::jsonb,
    'fr', '["Fonderie", "Aciérie", "Industrie du verre"]'::jsonb,
    'de', '["Gießerei", "Stahlwerk", "Glasindustrie"]'::jsonb,
    'es', '["Fundición", "Acería", "Industria del vidrio"]'::jsonb
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
WHERE id = '297912f2-2414-4bca-8112-578d1e176434';

-- 09-605r1
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"09-605R1"'::jsonb,
    'it', '"09-605R1"'::jsonb,
    'fr', '"09-605R1"'::jsonb,
    'de', '"09-605R1"'::jsonb,
    'es', '"09-605R1"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"13g grey/white graphene nylon liner, black latex palm coated glove. Extended reinforcement on crotch"'::jsonb,
    'it', '"Guanto  13 aghi con fodera in nylon grafene grigio/bianco, palmo rivestito in lattice nero, rinforzo thumb crotch esteso"'::jsonb,
    'fr', '"Gant 13 jauges avec doublure en nylon graphène gris/blanc, paume enduite de latex noir, renfort de fourchette du pouce prolongé"'::jsonb,
    'de', '"13-Gauge-Handschuh mit Futter aus Graphen-Nylon in Grau/Weiß, Handfläche mit schwarzem Latex beschichtet, verlängerter Daumenstegverstärkung"'::jsonb,
    'es', '"Guante de 13 galgas con forro de nailon grafeno gris/blanco, palma recubierta de látex negro, refuerzo de horquilla del pulgar extendido"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Cut protection glove in graphene and HCT® latex crinkle"'::jsonb,
    'it', '"Guanto antitaglio in grafene e Lattice HCT® stropicciato"'::jsonb,
    'fr', '"Gant anticoupure en graphène et latex HCT® crêpé"'::jsonb,
    'de', '"Schnittschutzhandschuh aus Graphen und genarbtem HCT®-Latex"'::jsonb,
    'es', '"Guante anticorte de grafeno y látex HCT® rugoso"'::jsonb
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
    'en', '["13 gauge grey Kyorene® graphene liner", "Bacteriostatic kills harmful bacteria", "Thermal regulating to keep the hands comfortable", "Odor neutralizing to keep the gloves smelling Fresh", "Touch Screen compatible"]'::jsonb,
    'it', '["Fodera in grafene Kyorene® grigio calibro 13", "Il batteriostatico uccide i batteri nocivi", "Regolazione termica per mantenere le mani comode", "Neutralizzazione degli odori per mantenere i guanti con un odore fresco", "Compatibile con Touch Screen"]'::jsonb,
    'fr', '["Doublure en graphène Kyorene® gris, jauge 13", "L''agent bactériostatique tue les bactéries nocives", "Régulation thermique pour garder les mains confortables", "Neutralisation des odeurs pour garder les gants toujours frais", "Compatible avec écran tactile"]'::jsonb,
    'de', '["Innenfutter aus grauem Kyorene®-Graphen, Feinheit 13", "Der bakteriostatische Wirkstoff tötet schädliche Bakterien ab", "Thermoregulierung für ein angenehmes Handgefühl", "Geruchsneutralisierung, damit die Handschuhe stets frisch riechen", "Touchscreen-kompatibel"]'::jsonb,
    'es', '["Forro de grafeno Kyorene® gris, calibre 13", "El bacteriostático mata las bacterias nocivas", "Regulación térmica para mantener las manos cómodas", "Neutralización de olores para mantener los guantes con un olor fresco", "Compatible con pantalla táctil"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heavy material handling", "Glass handling", "Operations in wet environments"]'::jsonb,
    'it', '["Movimentazione di materiali pesanti", "Movimentazione del vetro", "Imbottigliamento e attivita'' in ambienti umidi"]'::jsonb,
    'fr', '["Manutention de matériaux lourds", "Manutention du verre", "Embouteillage et activités en milieux humides"]'::jsonb,
    'de', '["Handhabung schwerer Materialien", "Handhabung von Glas", "Abfüllung und Tätigkeiten in feuchten Umgebungen"]'::jsonb,
    'es', '["Manipulación de materiales pesados", "Manipulación del vidrio", "Embotellado y actividades en entornos húmedos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Bottling", "Glass manufacturing", "Recycling"]'::jsonb,
    'it', '["Imbottigliamento", "Industria del vetro", "Riciclaggio"]'::jsonb,
    'fr', '["Embouteillage", "Industrie du verre", "Recyclage"]'::jsonb,
    'de', '["Abfüllung", "Glasindustrie", "Recycling"]'::jsonb,
    'es', '["Embotellado", "Industria del vidrio", "Reciclaje"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["cut-resistant glove", "cut level F", "latex coating"]'::jsonb,
    'it', '["guanti antitaglio", "prootezione taglio livello F", "Grafene"]'::jsonb,
    'fr', '["gants anticoupure", "protection contre les coupures niveau F", "Graphène"]'::jsonb,
    'de', '["Schnittschutzhandschuhe", "Schnittschutz Stufe F", "Graphen"]'::jsonb,
    'es', '["guantes anticorte", "protección contra cortes nivel F", "Grafeno"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"6 - 11"'::jsonb,
    'it', '"6 - 11"'::jsonb,
    'fr', '"6 - 11"'::jsonb,
    'de', '"6 - 11"'::jsonb,
    'es', '"6 - 11"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Graphene", "Latex"]'::jsonb,
    'it', '["Grafene", "Lattice"]'::jsonb,
    'fr', '["Graphène", "Latex"]'::jsonb,
    'de', '["Graphen", "Latex"]'::jsonb,
    'es', '["Grafeno", "Látex"]'::jsonb
  )
WHERE id = '0583521c-9802-4d60-ab53-f19c87d3b1f4';

-- suxxeed-industry-womens-long-sleeve-work-shirt-2
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed industry womens long sleeve work shirt (2)"'::jsonb,
    'it', '"suXXeed industry MAGLIA MANICHE LUNGHE DONNA"'::jsonb,
    'fr', '"suXXeed industry T-SHIRT MANCHES LONGUES FEMME"'::jsonb,
    'de', '"suXXeed industry LANGARMSHIRT DAMEN"'::jsonb,
    'es', '"suXXeed industry CAMISETA MANGA LARGA MUJER"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Women’s long-sleeve work shirt with concealed fastenings, suitable for industrial washing."'::jsonb,
    'it', '"Maglia da lavoro a maniche lunghe da donna con chiusure a scomparsa, adatto per il lavaggio industriale."'::jsonb,
    'fr', '"T-shirt de travail à manches longues pour femme avec fermetures dissimulées, adapté au lavage industriel."'::jsonb,
    'de', '"Langarm-Arbeitsshirt für Damen mit verdeckten Verschlüssen, geeignet für industrielle Wäsche."'::jsonb,
    'es', '"Camiseta de trabajo de manga larga para mujer con cierres ocultos, apta para lavado industrial."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Women’s long-sleeve work shirt"'::jsonb,
    'it', '"Maglia da lavoro a maniche lunghe da donna"'::jsonb,
    'fr', '"T-shirt de travail à manches longues pour femme"'::jsonb,
    'de', '"Langarm-Arbeitsshirt für Damen"'::jsonb,
    'es', '"Camiseta de trabajo de manga larga para mujer"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Workwear shirts"'::jsonb,
    'it', '"Maglie da lavoro"'::jsonb,
    'fr', '"Maillots de travail"'::jsonb,
    'de', '"Arbeitsshirts"'::jsonb,
    'es', '"Camisetas de trabajo"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Contrasting stitching on the left shoulder", "Forward-positioned side seams", "Certified in accordance with OEKO-TEX® Standard 100", "Round neckline", "Highly breathable"]'::jsonb,
    'it', '["Cuciture a contrasto sulla spalla sinistra", "Cuciture laterali avanzate", "Certificazione secondo OEKO-TEX® Standard 100", "Scollatura rotonda", "Molto traspirante"]'::jsonb,
    'fr', '["Coutures contrastantes sur l''épaule gauche", "Coutures latérales avancées", "Certification selon OEKO-TEX® Standard 100", "Encolure ronde", "Très respirant"]'::jsonb,
    'de', '["Kontrastnähte an der linken Schulter", "Fortschrittliche Seitennähte", "Zertifizierung nach OEKO-TEX® Standard 100", "Rundhalsausschnitt", "Sehr atmungsaktiv"]'::jsonb,
    'es', '["Costuras de contraste en el hombro izquierdo", "Costuras laterales avanzadas", "Certificación según OEKO-TEX® Standard 100", "Escote redondo", "Muy transpirable"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work and leisure", "Indoor work"]'::jsonb,
    'it', '["Lavoro e tempo libero", "Lavori indoor"]'::jsonb,
    'fr', '["Travail et loisirs", "Travaux en intérieur"]'::jsonb,
    'de', '["Arbeit und Freizeit", "Arbeiten im Innenbereich"]'::jsonb,
    'es', '["Trabajo y tiempo libre", "Trabajos en interiores"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Steel production", "Utilities", "Automotive", "Chemicals"]'::jsonb,
    'it', '["Acciaierie", "Servizi pubblici", "Automobilistico"]'::jsonb,
    'fr', '["Aciéries", "Services publics", "Automobile"]'::jsonb,
    'de', '["Stahlwerke", "Öffentliche Dienstleistungen", "Automobilbranche"]'::jsonb,
    'es', '["Acerías", "Servicios públicos", "Automotriz"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Work shirt"]'::jsonb,
    'it', '["Maglia da lavoro"]'::jsonb,
    'fr', '["Maillot de travail"]'::jsonb,
    'de', '["Arbeitsshirt"]'::jsonb,
    'es', '["Camiseta de trabajo"]'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["50% polyester, 50% cotton"]'::jsonb,
    'it', '["50% poliestere, 50% cotone"]'::jsonb,
    'fr', '["50 % polyester, 50 % coton"]'::jsonb,
    'de', '["50 % Polyester, 50 % Baumwolle"]'::jsonb,
    'es', '["50 % poliéster, 50 % algodón"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '42d8671a-9103-4a43-9735-344b7d38066e';

-- 100-al
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"100/AL"'::jsonb,
    'it', '"100/AL"'::jsonb,
    'fr', '"100/AL"'::jsonb,
    'de', '"100/AL"'::jsonb,
    'es', '"100/AL"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-performance cotton heat-resistant mitten glove with double palm. Offers excellent convective-heat & radiant-heat protection thanks to jute & sponge reinforcements on palm and sponge on back."'::jsonb,
    'it', '"Manopola anticalore ad elevata prestazione in cotone con palmo doppiato.\nOffre eccellente protezione contro calore convettivo e raggi radiante grazie  a rinforzo in juta e spugna su palmo e spugna sul dorso."'::jsonb,
    'fr', '"Moufle anti-chaleur haute performance en coton avec paume doublée.\nOffre une excellente protection contre la chaleur convective et le rayonnement grâce à un renfort en jute et éponge sur la paume et en éponge sur le dos de la main."'::jsonb,
    'de', '"Hochleistungs-Hitzeschutzfäustling aus Baumwolle mit doppelter Handfläche.\nBietet dank Jute- und Frotteeverstärkung an der Handfläche sowie Frottee am Handrücken hervorragenden Schutz vor konvektiver Wärme und Strahlungswärme."'::jsonb,
    'es', '"Manopla resistente al calor de alto rendimiento en algodón con palma doblada.\nOfrece una excelente protección contra el calor convectivo y los rayos radiantes gracias al refuerzo de yute y rizo en la palma y rizo en el dorso."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-performance cotton heat-resistant mitten glove with doubled palm plus jute & sponge reinforcement and sponge-reinforced back"'::jsonb,
    'it', '"Guanto manopola anticalore in cotone a prestazione elevata con palmo doppio e rinforzo di juta e spugna e dorso doppio rinforzato con spugna"'::jsonb,
    'fr', '"Gant moufle anti-chaleur en coton haute performance avec paume double et renfort en jute et éponge, dos doublé et renforcé en éponge"'::jsonb,
    'de', '"Hitzeschutz-Fäustlingshandschuh aus Hochleistungsbaumwolle mit doppelter Handfläche und Jute-/Frotteeverstärkung, doppelter Handrücken mit Frotteeverstärkung"'::jsonb,
    'es', '"Guante manopla resistente al calor de algodón de alto rendimiento con palma doble y refuerzo de yute y rizo, dorso doble reforzado con rizo"'::jsonb
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
    'en', '["Handling hot parts up to 250 °C", "Work in high-heat installations", "Industrial assembly", "Hand & wrist protection in light operations"]'::jsonb,
    'it', '["Movimentazone di pezzi caldi con temperatura fino a 250°C", "Lavori in impianti con rischio termico"]'::jsonb,
    'fr', '["Manutention de pièces chaudes à une température allant jusqu''à 250°C", "Travaux dans des installations à risque thermique"]'::jsonb,
    'de', '["Handhabung heißer Teile mit Temperaturen bis 250°C", "Arbeiten in Anlagen mit thermischem Risiko"]'::jsonb,
    'es', '["Manipulación de piezas calientes con temperatura de hasta 250°C", "Trabajos en instalaciones con riesgo térmico"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass", "Metallurgy", "Mold shops", "High-temperature environments"]'::jsonb,
    'it', '["Industria del vetro", "Metallurgica", "Stamperie", "Ambienti ad alte temperature"]'::jsonb,
    'fr', '["Industrie du verre", "Métallurgique", "Ateliers d''estampage", "Environnements à hautes températures"]'::jsonb,
    'de', '["Glasindustrie", "Metallurgisch", "Stanzereien", "Umgebungen mit hohen Temperaturen"]'::jsonb,
    'es', '["Industria del vidrio", "Metalúrgica", "Talleres de estampado", "Entornos de altas temperaturas"]'::jsonb
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
    'en', '["cotton", "jute", "sponge"]'::jsonb,
    'it', '["cotone", "juta", "spugna"]'::jsonb,
    'fr', '["coton", "jute", "mousse"]'::jsonb,
    'de', '["Baumwolle", "Jute", "Schwamm"]'::jsonb,
    'es', '["algodón", "yute", "esponja"]'::jsonb
  )
WHERE id = 'd7e3fdb9-8601-4285-a115-fe0cf6b284c2';

-- 152-12-015l
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/12 015L"'::jsonb,
    'it', '"152/12 015L"'::jsonb,
    'fr', '"152/12 015L"'::jsonb,
    'de', '"152/12 015L"'::jsonb,
    'es', '"152/12 015L"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove in 12 oz cotton, five-finger design with a double-knit inner palm and a 13 cm cuff. Protects up to 250°C, with excellent tear resistance and superior comfort for prolonged use."'::jsonb,
    'it', '"Guanto anticalore in cotone 12 oz a cinque dita con palmo doppio garzato interno e manichetta da 13 cm. Protegge fino a 250°C, con eccellente resistenza allo strappo, ottimo comfort  per uso prolungato."'::jsonb,
    'fr', '"Gant anti-chaleur en coton 12 oz à cinq doigts avec paume double à intérieur gratté et manchette de 13 cm. Protège jusqu''à 250°C, avec une excellente résistance à la déchirure et un confort optimal pour un usage prolongé."'::jsonb,
    'de', '"Hitzeschutzhandschuh aus 12-oz-Baumwolle mit fünf Fingern, innen aufgerauter Doppelhandfläche und 13 cm langer Stulpe. Schützt bis 250°C, mit ausgezeichneter Reißfestigkeit und optimalem Komfort bei längerem Gebrauch."'::jsonb,
    'es', '"Guante resistente al calor de algodón de 12 oz de cinco dedos con palma doble perchada por dentro y puño de 13 cm. Protege hasta 250°C, con excelente resistencia al desgarro y óptimo confort para uso prolongado."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove (250 °C) in cotton with high comfort for extended use"'::jsonb,
    'it', '"Guanto anticalore (250C) in cotone ad alto comfort per uso prolungato"'::jsonb,
    'fr', '"Gant anti-chaleur (250C) en coton à confort élevé pour un usage prolongé"'::jsonb,
    'de', '"Hitzeschutzhandschuh (250C) aus Baumwolle mit hohem Komfort für längeren Gebrauch"'::jsonb,
    'es', '"Guante resistente al calor (250C) de algodón de alto confort para uso prolongado"'::jsonb
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
    'en', '["Good contact-heat resistance", "High comfort", "Excellent convective-heat resistance", "Reinforced leather seams between palm & thumb"]'::jsonb,
    'it', '["Buona resistenza al calore da contatto", "Elevato comfort", "Ottima resistenza al calore convettivo", "Salva cuciture in pelle tra palmo e pollice"]'::jsonb,
    'fr', '["Bonne résistance à la chaleur de contact", "Confort élevé", "Excellente résistance à la chaleur par convection", "Renfort de couture en cuir entre la paume et le pouce"]'::jsonb,
    'de', '["Gute Beständigkeit gegen Kontakthitze", "Hoher Komfort", "Ausgezeichnete Beständigkeit gegen konvektive Hitze", "Lederverstärkung an der Naht zwischen Handfläche und Daumen"]'::jsonb,
    'es', '["Buena resistencia al calor de contacto", "Alto confort", "Excelente resistencia al calor convectivo", "Refuerzo de costura de cuero entre la palma y el pulgar"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Handling hot glass & ceramics up to 250°C", "Operations with hot plastic materials"]'::jsonb,
    'it', '["Movimentazione di vetri e ceramiche calde fino a 250°C", "Operazioni con materiale plastico a caldo"]'::jsonb,
    'fr', '["Manutention de verre et de céramiques chaudes jusqu''à 250°C", "Opérations avec des matières plastiques chaudes"]'::jsonb,
    'de', '["Handhabung von heißem Glas und heißer Keramik bis 250°C", "Arbeiten mit heißem Kunststoffmaterial"]'::jsonb,
    'es', '["Manipulación de vidrios y cerámicas calientes de hasta 250°C", "Operaciones con material plástico caliente"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass industry", "Ceramic industry", "Plastic molding"]'::jsonb,
    'it', '["Industria del Vetro", "Industria ceramica", "Stampaggio plastico"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie céramique", "Moulage plastique"]'::jsonb,
    'de', '["Glasindustrie", "Keramikindustrie", "Kunststoffspritzguss"]'::jsonb,
    'es', '["Industria del vidrio", "Industria cerámica", "Moldeo de plástico"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat-resistant glove", "250 °C", "Cotton", "Comfort", "Dexterity"]'::jsonb,
    'it', '["Guanto anticalore", "250C", "cotone", "comfort", "destrezza"]'::jsonb,
    'fr', '["Gant anti-chaleur", "250 °C", "coton", "confort", "dextérité"]'::jsonb,
    'de', '["Hitzeschutzhandschuh", "250 °C", "Baumwolle", "Komfort", "Fingerfertigkeit"]'::jsonb,
    'es', '["Guante resistente al calor", "250 °C", "algodón", "confort", "destreza"]'::jsonb
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
WHERE id = '0815677e-3a2c-48fd-b5d8-a1b10e992dcb';

COMMIT;
