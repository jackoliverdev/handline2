-- Products locale merge from docs/LanguageAddon/Translations/Products.csv
-- Data-only UPDATE. No ALTER TABLE. No published-flag changes.
-- Part 3 of 5. Run this in the Supabase SQL editor after a backup, then run the next part.
-- Merges en/it/fr/de/es into existing JSONB locale objects.
-- Skipped: blank cells, "" placeholders, empty arrays, and empty objects.
-- Warning: the admin product editor still saves only en/it. Saving a product there will wipe fr/de/es.

BEGIN;

-- 152-12-015l-fdt
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/12-015L FDT"'::jsonb,
    'it', '"152/12-015L FDT"'::jsonb,
    'fr', '"152/12-015L FDT"'::jsonb,
    'de', '"152/12-015L FDT"'::jsonb,
    'es', '"152/12-015L FDT"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant (250 °C) 12 oz cotton glove with double-knit palm and double-layer back plus leather-reinforced seams. 13 cm adjustable cuff."'::jsonb,
    'it', '"\"Guanto anticalore (250°C) in cotone 12 oz con doppio tessuto garzato interno sul palmo e doppio tessuto sul dorso con rinforzi in pelle salva cuciture.\nManichetta da 13cm (adattabile).\""'::jsonb,
    'fr', '"\"Gant anti-chaleur (250°C) en coton 12 oz avec double tissu gratté à l''intérieur sur la paume et double tissu sur le dos avec renforts en cuir protège-coutures.\nManchette de 13 cm (ajustable).\""'::jsonb,
    'de', '"\"Hitzeschutzhandschuh (250°C) aus 12-oz-Baumwolle mit innen aufgerautem Doppelgewebe an der Handfläche und Doppelgewebe am Handrücken mit nahtschützenden Lederverstärkungen.\nStulpe von 13 cm (anpassbar).\""'::jsonb,
    'es', '"\"Guante resistente al calor (250°C) de algodón de 12 oz con doble tejido perchado por dentro en la palma y doble tejido en el dorso con refuerzos de cuero protege-costuras.\nPuño de 13 cm (adaptable).\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"12 oz cotton glove with doubled palm and back for operations up to 250 °C"'::jsonb,
    'it', '"Guanto in cotone 12 oz con palmo e dorso doppiati per operazioni fino a 250C"'::jsonb,
    'fr', '"Gant en coton 12 oz avec paume et dos doublés pour des opérations jusqu''à 250C"'::jsonb,
    'de', '"Handschuh aus 12-oz-Baumwolle mit doppelter Handfläche und doppeltem Handrücken für Arbeiten bis 250C"'::jsonb,
    'es', '"Guante de algodón de 12 oz con palma y dorso doblados para operaciones de hasta 250C"'::jsonb
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
    'en', '["Handling parts up to 250 °C", "Thermal inspections", "Prolonged contact operations"]'::jsonb,
    'it', '["Manipolazione pezzi fino a 250°C", "Ispezioni termiche", "Operazioni prolungate a contatto"]'::jsonb,
    'fr', '["Manipulation de pièces jusqu''à 250°C", "Inspections thermiques", "Opérations prolongées au contact"]'::jsonb,
    'de', '["Handhabung von Teilen bis 250°C", "Thermische Inspektionen", "Langandauernde Kontaktarbeiten"]'::jsonb,
    'es', '["Manipulación de piezas hasta 250°C", "Inspecciones térmicas", "Operaciones prolongadas de contacto"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glassworks", "Foundries", "Mechanical industry", "Metallurgy"]'::jsonb,
    'it', '["Vetrerie", "Fonderia", "Industria meccanica", "Metallurgia"]'::jsonb,
    'fr', '["Verreries", "Fonderie", "Industrie mécanique", "Métallurgie"]'::jsonb,
    'de', '["Glashütten", "Gießerei", "Maschinenbauindustrie", "Metallurgie"]'::jsonb,
    'es', '["Vidrierías", "Fundición", "Industria mecánica", "Metalurgia"]'::jsonb
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
WHERE id = '64ee08af-9438-4029-87f2-99e2a0eae0e7';

-- suxxeed-industry-t-shirt-men
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed industry T-SHIRT Men"'::jsonb,
    'it', '"suXXeed industry T-SHIRT UOMO"'::jsonb,
    'fr', '"suXXeed industry T-SHIRT HOMME"'::jsonb,
    'de', '"suXXeed industry T-SHIRT HERREN"'::jsonb,
    'es', '"suXXeed industry CAMISETA HOMBRE"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Men’s work T-shirt with concealed fastening and premium materials"'::jsonb,
    'it', '"T-shirt da lavoro da uomo con chiusura a scompara e materiali premium"'::jsonb,
    'fr', '"T-shirt de travail pour homme avec fermeture dissimulée et matériaux premium"'::jsonb,
    'de', '"Arbeits-T-Shirt für Herren mit verdecktem Verschluss und Premium-Materialien"'::jsonb,
    'es', '"Camiseta de trabajo para hombre con cierre oculto y materiales premium"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Men’s work T-shirt"'::jsonb,
    'it', '"T-shirt da lavoro da uomo"'::jsonb,
    'fr', '"T-shirt de travail pour homme"'::jsonb,
    'de', '"Arbeits-T-Shirt für Herren"'::jsonb,
    'es', '"Camiseta de trabajo para hombre"'::jsonb
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
    'en', '["Contrasting stitching on the left shoulder", "Forward-positioned side seams", "Certified in accordance with OEKO-TEX® Standard 100", "Round neckline", "Highly breathable", "Excellent freedom of movement"]'::jsonb,
    'it', '["Cuciture a contrasto sulla spalla sinistra", "Cuciture laterali avanzate", "Certificazione secondo OEKO-TEX® Standard 100", "Scollatura rotonda", "Molto traspirante", "Ottimo movimento"]'::jsonb,
    'fr', '["Coutures contrastantes sur l''épaule gauche", "Coutures latérales avancées", "Certification selon OEKO-TEX® Standard 100", "Encolure ronde", "Très respirant", "Excellente liberté de mouvement"]'::jsonb,
    'de', '["Kontrastnähte an der linken Schulter", "Fortschrittliche Seitennähte", "Zertifizierung nach OEKO-TEX® Standard 100", "Rundhalsausschnitt", "Sehr atmungsaktiv", "Hervorragende Bewegungsfreiheit"]'::jsonb,
    'es', '["Costuras de contraste en el hombro izquierdo", "Costuras laterales avanzadas", "Certificación según OEKO-TEX® Standard 100", "Escote redondo", "Muy transpirable", "Excelente movimiento"]'::jsonb
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
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Colours: Anthracite, Midnight Blue, Ultramarine Blue, Graphite, Red, White"]'::jsonb,
    'it', '["Colours: Antracite, Blu notte, Blu ultramarino, Grafite, Rosso, Bianco"]'::jsonb,
    'fr', '["Couleurs : Anthracite, Bleu nuit, Bleu outremer, Graphite, Rouge, Blanc"]'::jsonb,
    'de', '["Farben: Anthrazit, Nachtblau, Ultramarinblau, Graphit, Rot, Weiß"]'::jsonb,
    'es', '["Colores: Antracita, Azul noche, Azul ultramar, Grafito, Rojo, Blanco"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb
  )
WHERE id = 'aa1fc0af-257a-4bba-9768-3031ff7857ef';

-- 152-14ml-3l15
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/14ML-3L15"'::jsonb,
    'it', '"152/14ML-3L15"'::jsonb,
    'fr', '"152/14ML-3L15"'::jsonb,
    'de', '"152/14ML-3L15"'::jsonb,
    'es', '"152/14ML-3L15"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove protecting up to 350°C. Palm protected by triple-layer and back by double-layer 14 oz cotton knit (brushed inside/outside) plus full knuckle guard. 15 cm Kanvas cuff. Guards against molten-material hazards and provides Level 3 cut resistance."'::jsonb,
    'it', '"Guanto anticalore con protezione fino a 350 °C. Protezione del palmo con triplo strato e del dorso con doppio strato in cotone 14 oz garzato interno/esterno e paranocche intero.\nManichetta in Kanvas da 15 cm.\nCopertura da rischi da materiale fuso e protezione al taglio di livello 3."'::jsonb,
    'fr', '"Gant anti-chaleur avec protection jusqu''à 350 °C. Protection de la paume à triple couche et du dos à double couche en coton 14 oz gratté intérieur/extérieur avec protège-jointures intégral.\nManchette en Kanvas de 15 cm.\nProtection contre les risques de projections de matière en fusion et résistance à la coupure de niveau 3."'::jsonb,
    'de', '"Hitzeschutzhandschuh mit Schutz bis 350 °C. Dreilagiger Handflächenschutz und zweilagiger Handrückenschutz aus innen/außen aufgerauter 14-oz-Baumwolle mit vollständigem Knöchelschutz.\nStulpe aus Kanvas, 15 cm.\nSchutz vor Risiken durch geschmolzenes Material und Schnittschutzstufe 3."'::jsonb,
    'es', '"Guante resistente al calor con protección de hasta 350 °C. Protección de la palma con triple capa y del dorso con doble capa de algodón de 14 oz perchado por dentro/fuera y protección total de nudillos.\nPuño de Kanvas de 15 cm.\nCobertura frente a riesgos de material fundido y resistencia al corte de nivel 3."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove in cotton (350 °C) with triple layer and back-of-hand reinforcement for high-temperature operations and mechanical hazards"'::jsonb,
    'it', '"Guanto anticalore in cotone (350C) con triplo strato e protezione del dorso per operazioni ad elevate temperature e con rischi meccanici"'::jsonb,
    'fr', '"Gant anti-chaleur en coton (350C) à triple couche avec protection du dos, pour des opérations à hautes températures et à risques mécaniques"'::jsonb,
    'de', '"Hitzeschutzhandschuh aus Baumwolle (350C) mit dreilagigem Aufbau und Handrückenschutz für Arbeiten bei hohen Temperaturen und mechanischen Risiken"'::jsonb,
    'es', '"Guante resistente al calor de algodón (350C) con triple capa y protección del dorso para operaciones a altas temperaturas y con riesgos mecánicos"'::jsonb
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
    'en', '["High contact-heat resistance up to 350°C", "Triple layer on palm & double layer on back for full-hand protection", "Protection against mechanical hazards", "Reinforced leather seams between palm & thumb"]'::jsonb,
    'it', '["Elevata resistenza al calore da contatto fino a 350 °C", "Triplo strato sul palmo e doppio strato sul dorso per protezione completa della mano", "Resistenza alle sollecitazioni meccaniche", "Salva cuciture in pelle tra palmo e pollice"]'::jsonb,
    'fr', '["Résistance élevée à la chaleur de contact jusqu''à 350 °C", "Triple couche sur la paume et double couche sur le dos de la main pour une protection complète de la main", "Résistance aux contraintes mécaniques", "Renfort de couture en cuir entre la paume et le pouce"]'::jsonb,
    'de', '["Hohe Beständigkeit gegen Kontaktwärme bis 350 °C", "Dreifache Schicht am Handteller und doppelte Schicht am Handrücken für vollständigen Handschutz", "Beständigkeit gegen mechanische Beanspruchung", "Lederverstärkung an der Naht zwischen Handfläche und Daumen"]'::jsonb,
    'es', '["Alta resistencia al calor de contacto de hasta 350 °C", "Triple capa en la palma y doble capa en el dorso para una protección completa de la mano", "Resistencia a los esfuerzos mecánicos", "Refuerzo de costura de cuero entre la palma y el pulgar"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for glass industry: handling hot objects up to 350 °C & hot-zone operations", "Hot-plastic printing & thermoforming", "Handling heated components in ceramic production lines", "Swabbing and lubricating activities"]'::jsonb,
    'it', '["Studiato per l’industria del vetro per manipolazione di oggetti caldi fino a 350C e operazioni in zona calda", "Operazioni di stampa e termoformatura di plastiche calde", "Movimentazione di componenti riscaldati in linee di produzione ceramica"]'::jsonb,
    'fr', '["Conçu pour l''industrie du verre, pour la manipulation d''objets chauds jusqu''à 350C et les opérations en zone chaude", "Opérations de moulage et de thermoformage de plastiques chauds", "Manutention de composants chauffés sur les lignes de production céramique"]'::jsonb,
    'de', '["Entwickelt für die Glasindustrie, zur Handhabung heißer Gegenstände bis 350C und für Arbeiten im Heißbereich", "Form- und Thermoformarbeiten mit heißen Kunststoffen", "Handhabung erhitzter Bauteile in Keramik-Produktionslinien"]'::jsonb,
    'es', '["Diseñado para la industria del vidrio, para la manipulación de objetos calientes hasta 350C y operaciones en zona caliente", "Operaciones de moldeo y termoformado de plásticos calientes", "Manipulación de componentes calentados en líneas de producción cerámica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass", "Ceramic", "Plastic-molding", "Cement"]'::jsonb,
    'it', '["Industria del Vetro", "Industria ceramica", "Stampaggio plastico", "Industria del cemento"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie céramique", "Moulage plastique", "Industrie du ciment"]'::jsonb,
    'de', '["Glasindustrie", "Keramikindustrie", "Kunststoffspritzguss", "Zementindustrie"]'::jsonb,
    'es', '["Industria del vidrio", "Industria cerámica", "Moldeo de plástico", "Industria del cemento"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Heat‐resistant glove", "350 °C", "cotton", "back‐of‐hand protection", "high-temperature", "cut protection"]'::jsonb,
    'it', '["Guanto anticalore", "350C", "cotone", "protezione dorso mano", "elevate temperature", "protezione taglio"]'::jsonb,
    'fr', '["Gant anti-chaleur", "350 °C", "coton", "protection du dos de la main", "températures élevées", "protection contre les coupures"]'::jsonb,
    'de', '["Hitzeschutzhandschuh", "350 °C", "Baumwolle", "Handrückenschutz", "hohe Temperaturen", "Schnittschutz"]'::jsonb,
    'es', '["Guante resistente al calor", "350 °C", "algodón", "protección del dorso de la mano", "temperaturas elevadas", "protección contra cortes"]'::jsonb
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
WHERE id = '70ce7549-de8c-4854-9d4b-074d9efb58eb';

-- 152-14ml-3l20
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"152/14ML-3L20"'::jsonb,
    'it', '"152/14ML-3L20"'::jsonb,
    'fr', '"152/14ML-3L20"'::jsonb,
    'de', '"152/14ML-3L20"'::jsonb,
    'es', '"152/14ML-3L20"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove protecting up to 350°C. Palm protected by triple-layer and back by double-layer 14 oz cotton knit (brushed inside/outside) plus full knuckle guard. 20 cm double-layered cotton cuff. Guards against molten-material hazards and provides Level 3 cut resistance."'::jsonb,
    'it', '"Guanto anticalore con protezione fino a 350°C. Protezione del palmo con triplo strato e del dorso con doppio strato in cotone 14 oz garzato interno/esterno e paranocche intero.\nManichetta in doppio strato di cotone da 20 cm.\nCopertura da rischi da materiale fuso e protezione al taglio di livello 3."'::jsonb,
    'fr', '"Gant anti-chaleur avec protection jusqu''à 350°C. Protection de la paume à triple couche et du dos à double couche en coton 14 oz gratté intérieur/extérieur avec protège-jointures intégral.\nManchette en double couche de coton de 20 cm.\nProtection contre les risques de projections de matière en fusion et résistance à la coupure de niveau 3."'::jsonb,
    'de', '"Hitzeschutzhandschuh mit Schutz bis 350°C. Dreilagiger Handflächenschutz und zweilagiger Handrückenschutz aus innen/außen aufgerauter 14-oz-Baumwolle mit vollständigem Knöchelschutz.\nStulpe aus doppellagiger Baumwolle, 20 cm.\nSchutz vor Risiken durch geschmolzenes Material und Schnittschutzstufe 3."'::jsonb,
    'es', '"Guante resistente al calor con protección de hasta 350°C. Protección de la palma con triple capa y del dorso con doble capa de algodón de 14 oz perchado por dentro/fuera y protección total de nudillos.\nPuño de doble capa de algodón de 20 cm.\nCobertura frente a riesgos de material fundido y resistencia al corte de nivel 3."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove in cotton (350 °C) with triple layer and back-of-hand reinforcement for high-temperature operations and mechanical hazards"'::jsonb,
    'it', '"Guanto anticalore in cotone (350°C) con triplo strato e protezione del dorso per operazioni ad elevate temperature e con rischi meccanici"'::jsonb,
    'fr', '"Gant anti-chaleur en coton (350°C) à triple couche avec protection du dos, pour des opérations à hautes températures et à risques mécaniques"'::jsonb,
    'de', '"Hitzeschutzhandschuh aus Baumwolle (350°C) mit dreilagigem Aufbau und Handrückenschutz für Arbeiten bei hohen Temperaturen und mechanischen Risiken"'::jsonb,
    'es', '"Guante resistente al calor de algodón (350°C) con triple capa y protección del dorso para operaciones a altas temperaturas y con riesgos mecánicos"'::jsonb
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
    'en', '["High contact-heat resistance up to 350°C", "Triple layer on palm & double layer on back for full-hand protection", "Protection against mechanical hazards", "Reinforced leather seams between palm & thumb"]'::jsonb,
    'it', '["Elevata resistenza al calore da contatto fino a 350°C", "Triplo strato sul palmo e doppio strato sul dorso per protezione completa della mano", "Resistenza alle sollecitazioni meccaniche", "Salva cuciture in pelle tra palmo e pollice"]'::jsonb,
    'fr', '["Résistance élevée à la chaleur de contact jusqu''à 350°C", "Triple couche sur la paume et double couche sur le dos de la main pour une protection complète de la main", "Résistance aux contraintes mécaniques", "Renfort de couture en cuir entre la paume et le pouce"]'::jsonb,
    'de', '["Hohe Beständigkeit gegen Kontaktwärme bis 350°C", "Dreifache Schicht am Handteller und doppelte Schicht am Handrücken für vollständigen Handschutz", "Beständigkeit gegen mechanische Beanspruchung", "Lederverstärkung an der Naht zwischen Handfläche und Daumen"]'::jsonb,
    'es', '["Alta resistencia al calor de contacto de hasta 350°C", "Triple capa en la palma y doble capa en el dorso para una protección completa de la mano", "Resistencia a los esfuerzos mecánicos", "Refuerzo de costura de cuero entre la palma y el pulgar"]'::jsonb
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
    'en', '["Cotton"]'::jsonb,
    'it', '["Cotone"]'::jsonb,
    'fr', '["Coton"]'::jsonb,
    'de', '["Baumwolle"]'::jsonb,
    'es', '["Algodón"]'::jsonb
  )
WHERE id = 'c2ba947b-7c52-400e-9088-ee250b5a5030';

-- 188-s
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"188 S"'::jsonb,
    'it', '"188 S"'::jsonb,
    'fr', '"188 S"'::jsonb,
    'de', '"188 S"'::jsonb,
    'es', '"188 S"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Triple-layered heat resistant glove with terry aramid fibre, thermal layer in Nomex and internal fleece protecting up to 500°C for over 15 seconds.  Guards against molten-material hazards and provides Level 5 cut resistance."'::jsonb,
    'it', '"Guanto termoresistente a triplo strato in fibra aramidica spugnata, con strato termico in Nomex e interno in pile, che offre protezione fino a 500°C per oltre 15 secondi.\n\nProtegge dai rischi legati a materiali fusi e garantisce una resistenza al taglio di Livello 5."'::jsonb,
    'fr', '"Gant thermorésistant à triple couche en fibre aramide bouclée, avec couche thermique en Nomex et intérieur en polaire, offrant une protection jusqu''à 500°C pendant plus de 15 secondes.\n\nProtège contre les risques liés aux matières en fusion et garantit une résistance à la coupure de niveau 5."'::jsonb,
    'de', '"Hitzebeständiger Dreilagen-Handschuh aus flauschiger Aramidfaser mit Thermoschicht aus Nomex und Fleece-Innenfutter, der Schutz bis 500°C für über 15 Sekunden bietet.\n\nSchützt vor Risiken durch geschmolzenes Material und gewährleistet eine Schnittschutzstufe 5."'::jsonb,
    'es', '"Guante termorresistente de triple capa de fibra aramídica afelpada, con capa térmica de Nomex e interior de forro polar, que ofrece protección de hasta 500°C durante más de 15 segundos.\n\nProtege frente a los riesgos relacionados con materiales fundidos y garantiza una resistencia al corte de nivel 5."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat-resistant glove in aramid fibre protecting above 500C"'::jsonb,
    'it', '"Guanto in fibra aramidica resistente al calore, per protezione oltre 500°C"'::jsonb,
    'fr', '"Gant en fibre aramide résistant à la chaleur, pour une protection au-delà de 500°C"'::jsonb,
    'de', '"Handschuh aus hitzebeständiger Aramidfaser für Schutz über 500°C"'::jsonb,
    'es', '"Guante de fibra aramídica resistente al calor, para protección superior a 500°C"'::jsonb
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
    'en', '["High contact-heat resistance over 500°C (Level 4)", "Triple layer on palm & back for full hand protection", "High manoeuvrability", "High cut and high temperature  protection"]'::jsonb,
    'it', '["Resistenza al calore da contatto fino a oltre 500°C (Livello 4)", "Triplo strato su palmo e dorso per una protezione totale della mano", "Ottima maneggevolezza", "Elevata protezione contro taglio e alte temperature"]'::jsonb,
    'fr', '["Résistance à la chaleur de contact jusqu''à plus de 500°C (Niveau 4)", "Triple couche sur la paume et le dos pour une protection totale de la main", "Excellente maniabilité", "Protection élevée contre la coupure et les hautes températures"]'::jsonb,
    'de', '["Beständigkeit gegen Kontaktwärme bis über 500°C (Stufe 4)", "Dreilagiger Aufbau an Handfläche und Handrücken für vollständigen Handschutz", "Hervorragende Handhabung", "Hoher Schutz vor Schnitten und hohen Temperaturen"]'::jsonb,
    'es', '["Resistencia al calor de contacto de hasta más de 500°C (Nivel 4)", "Triple capa en la palma y el dorso para una protección total de la mano", "Excelente manejabilidad", "Alta protección contra cortes y altas temperaturas"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Operations at extreme termperatures (>500C)", "Designed for handling very hot objects  over 500 °C & hot-zone operations and  furnaces", "Furnace ring and moulds substitution in  heavy industries", "Handling heated components in  ceramic production lines"]'::jsonb,
    'it', '["Utilizzo in condizioni di temperatura estrema (>500°C)", "Ideale per la manipolazione di materiali molto caldi oltre 500°C, in aree forno e zone ad alta temperatura", "Adatto alla sostituzione di anelli forno e stampi nelle industrie pesanti", "Per la movimentazione di componenti caldi nelle linee di produzione ceramica"]'::jsonb,
    'fr', '["Utilisation dans des conditions de température extrême (>500°C)", "Idéal pour la manipulation de matériaux très chauds au-delà de 500°C, dans les zones de four et les zones à haute température", "Adapté au remplacement des anneaux de four et des moules dans les industries lourdes", "Pour la manutention de composants chauds sur les lignes de production céramique"]'::jsonb,
    'de', '["Einsatz unter extremen Temperaturbedingungen (>500°C)", "Ideal für die Handhabung sehr heißer Materialien über 500°C, in Ofenbereichen und Hochtemperaturzonen", "Geeignet für den Austausch von Ofenringen und Formen in der Schwerindustrie", "Für die Handhabung heißer Bauteile in Fertigungslinien der Keramikindustrie"]'::jsonb,
    'es', '["Uso en condiciones de temperatura extrema (>500°C)", "Ideal para la manipulación de materiales muy calientes por encima de 500°C, en zonas de horno y áreas de alta temperatura", "Adecuado para la sustitución de anillos de horno y moldes en las industrias pesadas", "Para la manipulación de componentes calientes en las líneas de producción cerámica"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Metal", "Ceramics"]'::jsonb,
    'it', '["Industria del vetro", "Industria dell''acciaio", "Metallurgia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["500C", "Extreme temperatures", "Kevlar"]'::jsonb,
    'it', '["500C", "Kevlar", "Temperature estreme"]'::jsonb,
    'fr', '["500 °C", "Kevlar", "Températures extrêmes"]'::jsonb,
    'de', '["500 °C", "Kevlar", "Extreme Temperaturen"]'::jsonb,
    'es', '["500 °C", "Kevlar", "Temperaturas extremas"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Taglia Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Aramid fibre", "Nomex", "Cotton lining"]'::jsonb,
    'it', '["Fibra aramidica", "Nomex", "Fodera in cotone"]'::jsonb,
    'fr', '["Fibre aramide", "Nomex", "Doublure en coton"]'::jsonb,
    'de', '["Aramidfaser", "Nomex", "Baumwollfutter"]'::jsonb,
    'es', '["Fibra de aramida", "Nomex", "Forro de algodón"]'::jsonb
  )
WHERE id = '8d347948-4371-424a-abcb-6a20a5c7ccda';

-- 1-x-craft-s3
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"1 x-craft (S3)"'::jsonb,
    'it', '"1 x-craft (S3)"'::jsonb,
    'fr', '"1 x-craft (S3)"'::jsonb,
    'de', '"1 x-craft (S3)"'::jsonb,
    'es', '"1 x-craft (S3)"'::jsonb
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
    'en', '"Safety boots"'::jsonb,
    'it', '"Stivali di sicurezza"'::jsonb,
    'fr', '"Bottes de sécurité"'::jsonb,
    'de', '"Sicherheitsstiefel"'::jsonb,
    'es', '"Botas de seguridad"'::jsonb
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
  )
WHERE id = 'd4c376c4-18b0-4c89-8c54-98b40b00c91c';

-- 225
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"225"'::jsonb,
    'it', '"225"'::jsonb,
    'fr', '"225"'::jsonb,
    'de', '"225"'::jsonb,
    'es', '"225"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double-layered heat-resistant cotton terry glove with thermal layer protecting up to 350°C for 17 seconds. \nLong cuff with insulating felt for added protection. Guards against molten-material hazards and provides Level 3 cut resistance."'::jsonb,
    'it', '"Guanto in spugna di cotone termoresistente a doppio strato, dotato di uno strato termoisolante che offre protezione dal calore da contatto fino a 350°C per 17 secondi.\n\nIl polsino lungo, con inserto isolante in feltro, garantisce una protezione aggiuntiva dell''avambraccio.\n\nProtegge inoltre dai rischi associati a schizzi di materiale fuso e offre una resistenza al taglio di Livello 3."'::jsonb,
    'fr', '"Gant en tissu éponge de coton thermorésistant à double couche, doté d''une couche thermo-isolante offrant une protection contre la chaleur de contact jusqu''à 350°C pendant 17 secondes.\n\nLe poignet long, avec insert isolant en feutre, garantit une protection supplémentaire de l''avant-bras.\n\nIl protège également contre les risques liés aux projections de matière en fusion et offre une résistance à la coupure de niveau 3."'::jsonb,
    'de', '"Hitzebeständiger doppellagiger Handschuh aus Baumwollfrottee mit einer wärmeisolierenden Schicht, die Schutz vor Kontaktwärme bis 350°C für 17 Sekunden bietet.\n\nDie lange Stulpe mit isolierendem Filzeinsatz gewährleistet zusätzlichen Schutz des Unterarms.\n\nEr schützt außerdem vor Risiken durch Spritzer von geschmolzenem Material und bietet eine Schnittschutzstufe 3."'::jsonb,
    'es', '"Guante de rizo de algodón termorresistente de doble capa, dotado de una capa termoaislante que ofrece protección contra el calor de contacto de hasta 350°C durante 17 segundos.\n\nEl puño largo, con inserto aislante de fieltro, garantiza una protección adicional del antebrazo.\n\nProtege además frente a los riesgos asociados a las salpicaduras de material fundido y ofrece una resistencia al corte de nivel 3."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double-layer cotton terry glove"'::jsonb,
    'it', '"Guanto in tessuto spugna di cotone a doppio strato"'::jsonb,
    'fr', '"Gant en tissu éponge de coton à double épaisseur"'::jsonb,
    'de', '"Handschuh aus doppellagigem Baumwollfrottee"'::jsonb,
    'es', '"Guante de tejido de rizo de algodón de doble capa"'::jsonb
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
    'en', '["High contact heat resistance, tested for level 3 performing over 17 seconds at 350C", "Ambidextrous with same composition on both sides to increase durability", "Double layer throughout and felt-reinforced cuff for complete hand protection"]'::jsonb,
    'it', '["Protezione avanzata dal calore da contatto, testata secondo il Livello 3 e in grado di resistere per oltre 17 secondi a 350°C", "Struttura ambidestra con materiali uniformi su entrambi i lati, per incrementare la durabilità del guanto", "Struttura a doppio strato su tutta la superficie con polsino rinforzato in feltro per una protezione completa della mano"]'::jsonb,
    'fr', '["Protection avancée contre la chaleur de contact, testée selon le niveau 3 et capable de résister plus de 17 secondes à 350°C", "Structure ambidextre avec des matériaux uniformes des deux côtés, pour augmenter la durabilité du gant", "Structure à double couche sur toute la surface avec poignet renforcé en feutre pour une protection complète de la main"]'::jsonb,
    'de', '["Fortschrittlicher Schutz vor Kontaktwärme, geprüft nach Level 3 und beständig für mehr als 17 Sekunden bei 350°C", "Beidhändig tragbare Struktur mit einheitlichem Material auf beiden Seiten für eine höhere Haltbarkeit des Handschuhs", "Doppellagige Struktur über die gesamte Fläche mit verstärktem Filzbund für vollständigen Handschutz"]'::jsonb,
    'es', '["Protección avanzada frente al calor de contacto, probada según el Nivel 3 y capaz de resistir más de 17 segundos a 350°C", "Estructura ambidiestra con materiales uniformes en ambos lados, para aumentar la durabilidad del guante", "Estructura de doble capa en toda la superficie con puño reforzado de fieltro para una protección completa de la mano"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for the hot end of glass industry to handle hot moulds", "Hot-plastic printing & thermoforming", "Handling heated components in ceramic production lines"]'::jsonb,
    'it', '["Progettato per la zona calda dell''industria del vetro e dei metalli", "Sostituzione stampi ad elevate temperature", "Stampaggio di plastiche"]'::jsonb,
    'fr', '["Conçu pour la zone chaude de l''industrie du verre et des métaux", "Remplacement de moules à hautes températures", "Moulage de matières plastiques"]'::jsonb,
    'de', '["Entwickelt für den Heißbereich der Glas- und Metallindustrie", "Formenwechsel bei hohen Temperaturen", "Kunststoffformung"]'::jsonb,
    'es', '["Diseñado para la zona caliente de la industria del vidrio y de los metales", "Sustitución de moldes a altas temperaturas", "Moldeo de plásticos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Metal", "Ceramics"]'::jsonb,
    'it', '["Industria del vetro", "Industria dell''acciaio", "Metallurgia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["350C", "Cotton heat-resistant glove", "500C"]'::jsonb,
    'it', '["350C", "Guanto anticalore in cotone"]'::jsonb,
    'fr', '["350 °C", "Gant anti-chaleur en coton"]'::jsonb,
    'de', '["350 °C", "Hitzeschutzhandschuh aus Baumwolle"]'::jsonb,
    'es', '["350 °C", "Guante resistente al calor de algodón"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Taglia Unica"'::jsonb,
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
WHERE id = 'ae930c59-6b8b-4813-8001-bd0c3746c1cf';

-- 225-l-bk
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"225 L BK"'::jsonb,
    'it', '"225 L BK"'::jsonb,
    'fr', '"225 L BK"'::jsonb,
    'de', '"225 L BK"'::jsonb,
    'es', '"225 L BK"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double-layered heat-resistant cotton terry glove with thermal layer protecting up to 350°C for 17 seconds. \nLong cuff - available in 15cm and 22cm (L) for added protection. Guards against molten-material hazards and provides Level 3 cut resistance. \nBlack colour to help reduce over-usage."'::jsonb,
    'it', '"Guanto in spugna di cotone termoresistente a doppio strato, dotato di uno strato termoisolante che offre protezione dal calore da contatto fino a 350°C per 17 secondi.\n\nIl polsino lungo, disponibile in 15cm e 22cm (L), garantisce una protezione aggiuntiva dell''avambraccio.\n\nProtegge inoltre dai rischi associati a schizzi di materiale fuso e offre una resistenza al taglio di Livello 3.\n\nColore nero - aiuta a ridurre i consumi."'::jsonb,
    'fr', '"Gant en tissu éponge de coton thermorésistant à double couche, doté d''une couche thermo-isolante offrant une protection contre la chaleur de contact jusqu''à 350°C pendant 17 secondes.\n\nLe poignet long, disponible en 15 cm et 22 cm (L), garantit une protection supplémentaire de l''avant-bras.\n\nIl protège également contre les risques liés aux projections de matière en fusion et offre une résistance à la coupure de niveau 3.\n\nCouleur noire - contribue à réduire la consommation."'::jsonb,
    'de', '"Hitzebeständiger doppellagiger Handschuh aus Baumwollfrottee mit einer wärmeisolierenden Schicht, die Schutz vor Kontaktwärme bis 350°C für 17 Sekunden bietet.\n\nDie lange Stulpe, erhältlich in 15 cm und 22 cm (L), gewährleistet zusätzlichen Schutz des Unterarms.\n\nEr schützt außerdem vor Risiken durch Spritzer von geschmolzenem Material und bietet eine Schnittschutzstufe 3.\n\nSchwarze Farbe - trägt zur Reduzierung des Verbrauchs bei."'::jsonb,
    'es', '"Guante de rizo de algodón termorresistente de doble capa, dotado de una capa termoaislante que ofrece protección contra el calor de contacto de hasta 350°C durante 17 segundos.\n\nEl puño largo, disponible en 15 cm y 22 cm (L), garantiza una protección adicional del antebrazo.\n\nProtege además frente a los riesgos asociados a las salpicaduras de material fundido y ofrece una resistencia al corte de nivel 3.\n\nColor negro: ayuda a reducir el consumo."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Double-layer cotton terry glove"'::jsonb,
    'it', '"Guanto in tessuto spugna di cotone a doppio strato"'::jsonb,
    'fr', '"Gant en tissu éponge de coton à double épaisseur"'::jsonb,
    'de', '"Handschuh aus doppellagigem Baumwollfrottee"'::jsonb,
    'es', '"Guante de tejido de rizo de algodón de doble capa"'::jsonb
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
    'en', '["High contact heat resistance, tested for level 3 performing over 17 seconds at 350C", "Ambidextrous with same composition on both sides to increase durability", "Double layer throughout and felt-reinforced cuff for complete hand protection", "Black colour"]'::jsonb,
    'it', '["Protezione avanzata dal calore da contatto, testata secondo il Livello 3 e in grado di resistere per oltre 17 secondi a 350°C", "Struttura ambidestra con materiali uniformi su entrambi i lati, per incrementare la durabilità del guanto", "Struttura a doppio strato su tutta la superficie con polsino rinforzato in feltro per una protezione completa della mano", "Guanto nero"]'::jsonb,
    'fr', '["Protection avancée contre la chaleur de contact, testée selon le niveau 3 et capable de résister plus de 17 secondes à 350°C", "Structure ambidextre avec des matériaux uniformes des deux côtés, pour augmenter la durabilité du gant", "Structure à double couche sur toute la surface avec poignet renforcé en feutre pour une protection complète de la main", "Gant noir"]'::jsonb,
    'de', '["Fortschrittlicher Schutz vor Kontaktwärme, geprüft nach Level 3 und beständig für mehr als 17 Sekunden bei 350°C", "Beidhändig tragbare Struktur mit einheitlichem Material auf beiden Seiten für eine höhere Haltbarkeit des Handschuhs", "Doppellagige Struktur über die gesamte Fläche mit verstärktem Filzbund für vollständigen Handschutz", "Schwarzer Handschuh"]'::jsonb,
    'es', '["Protección avanzada frente al calor de contacto, probada según el Nivel 3 y capaz de resistir más de 17 segundos a 350°C", "Estructura ambidiestra con materiales uniformes en ambos lados, para aumentar la durabilidad del guante", "Estructura de doble capa en toda la superficie con puño reforzado de fieltro para una protección completa de la mano", "Guante negro"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for the hot end of glass industry to handle hot moulds", "Hot-plastic printing & thermoforming", "Handling heated components in ceramic production lines"]'::jsonb,
    'it', '["Progettato per la zona calda dell''industria del vetro e dei metalli", "Sostituzione stampi ad elevate temperature", "Stampaggio di plastiche"]'::jsonb,
    'fr', '["Conçu pour la zone chaude de l''industrie du verre et des métaux", "Remplacement de moules à hautes températures", "Moulage de matières plastiques"]'::jsonb,
    'de', '["Entwickelt für den Heißbereich der Glas- und Metallindustrie", "Formenwechsel bei hohen Temperaturen", "Kunststoffformung"]'::jsonb,
    'es', '["Diseñado para la zona caliente de la industria del vidrio y de los metales", "Sustitución de moldes a altas temperaturas", "Moldeo de plásticos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Metal", "Ceramics"]'::jsonb,
    'it', '["Industria del vetro", "Industria dell''acciaio", "Metallurgia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["350C", "Cotton heat-resistant glove", "500C", "Black glove"]'::jsonb,
    'it', '["350C", "Guanto anticalore in cotone", "Guanto nero"]'::jsonb,
    'fr', '["350 °C", "Gant anti-chaleur en coton", "Gant noir"]'::jsonb,
    'de', '["350 °C", "Hitzeschutzhandschuh aus Baumwolle", "Schwarzer Handschuh"]'::jsonb,
    'es', '["350 °C", "Guante resistente al calor de algodón", "Guante negro"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Taglia Unica"'::jsonb,
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
WHERE id = '9be21dc7-b16d-4024-aefd-3018f4ade557';

-- suxxeed-industry-t-shirt-women
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed industry T-SHIRT Women"'::jsonb,
    'it', '"suXXeed industry T-SHIRT DONNA"'::jsonb,
    'fr', '"suXXeed industry T-SHIRT FEMME"'::jsonb,
    'de', '"suXXeed industry T-SHIRT DAMEN"'::jsonb,
    'es', '"suXXeed industry CAMISETA MUJER"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Women’s work T-shirt with concealed fastening and premium materials"'::jsonb,
    'it', '"T-shirt da lavoro da donna con chiusura a scompara e materiali premium"'::jsonb,
    'fr', '"T-shirt de travail pour femme avec fermeture dissimulée et matériaux premium"'::jsonb,
    'de', '"Arbeits-T-Shirt für Damen mit verdecktem Verschluss und Premium-Materialien"'::jsonb,
    'es', '"Camiseta de trabajo para mujer con cierre oculto y materiales premium"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Women’s work T-shirt"'::jsonb,
    'it', '"T-shirt da lavoro da donna"'::jsonb,
    'fr', '"T-shirt de travail pour femme"'::jsonb,
    'de', '"Arbeits-T-Shirt für Damen"'::jsonb,
    'es', '"Camiseta de trabajo para mujer"'::jsonb
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
    'en', '["Contrasting stitching on the left shoulder", "Forward-positioned side seams", "Certified in accordance with OEKO-TEX® Standard 100", "Round neckline", "Highly breathable", "Excellent freedom of movement"]'::jsonb,
    'it', '["Cuciture a contrasto sulla spalla sinistra", "Cuciture laterali avanzate", "Certificazione secondo OEKO-TEX® Standard 100", "Scollatura rotonda", "Molto traspirante", "Ottimo movimento"]'::jsonb,
    'fr', '["Coutures contrastantes sur l''épaule gauche", "Coutures latérales avancées", "Certification selon OEKO-TEX® Standard 100", "Encolure ronde", "Très respirant", "Excellente liberté de mouvement"]'::jsonb,
    'de', '["Kontrastnähte an der linken Schulter", "Fortschrittliche Seitennähte", "Zertifizierung nach OEKO-TEX® Standard 100", "Rundhalsausschnitt", "Sehr atmungsaktiv", "Hervorragende Bewegungsfreiheit"]'::jsonb,
    'es', '["Costuras de contraste en el hombro izquierdo", "Costuras laterales avanzadas", "Certificación según OEKO-TEX® Standard 100", "Escote redondo", "Muy transpirable", "Excelente movimiento"]'::jsonb
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
  clothing_other_details_locales = COALESCE(clothing_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Colours: Anthracite, Midnight Blue, Ultramarine Blue, Graphite, Red, White"]'::jsonb,
    'it', '["Colours: Antracite, Blu notte, Blu ultramarino, Grafite, Rosso, Bianco"]'::jsonb,
    'fr', '["Couleurs : Anthracite, Bleu nuit, Bleu outremer, Graphite, Rouge, Blanc"]'::jsonb,
    'de', '["Farben: Anthrazit, Nachtblau, Ultramarinblau, Graphit, Rot, Weiß"]'::jsonb,
    'es', '["Colores: Antracita, Azul noche, Azul ultramar, Grafito, Rojo, Blanco"]'::jsonb
  ),
  clothing_attributes_locales = COALESCE(clothing_attributes_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '{"fit": "Regular Fit", "size_range": ""}'::jsonb,
    'it', '{"fit": "Regolare", "size_range": ""}'::jsonb,
    'fr', '{"fit": "Régulier", "size_range": ""}'::jsonb,
    'de', '{"fit": "Normal", "size_range": ""}'::jsonb,
    'es', '{"fit": "Regular", "size_range": ""}'::jsonb
  )
WHERE id = '6f583a03-91ed-43b3-b7ff-f3a2a09bde61';

-- 325-hr
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"325 HR"'::jsonb,
    'it', '"325 HR"'::jsonb,
    'fr', '"325 HR"'::jsonb,
    'de', '"325 HR"'::jsonb,
    'es', '"325 HR"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Triple-layered heat-resistant cotton terry glove with thermal layer protecting up to 350°C for over 24 seconds and 13 seconds at 500°C.\nLong cuff with insulating felt for added protection. Guards against molten-material hazards and provides Level 5 cut resistance."'::jsonb,
    'it', '"Guanto in spugna di cotone termoresistente a triplo strato, dotato di uno strato termoisolante che offre protezione dal calore da contatto fino a 350°C per oltre 24 secondi e fino a 500°C per 13 secondi.\n\nIl polsino lungo, con inserto isolante in feltro, garantisce una protezione aggiuntiva dell''avambraccio. Protegge inoltre dai rischi associati a schizzi di materiale fuso e offre resistenza al taglio di Livello 5."'::jsonb,
    'fr', '"Gant en éponge de coton thermorésistant à triple couche, doté d''une couche thermoisolante qui offre une protection contre la chaleur de contact jusqu''à 350°C pendant plus de 24 secondes et jusqu''à 500°C pendant 13 secondes.\n\nLe poignet long, avec insert isolant en feutre, garantit une protection supplémentaire de l''avant-bras. Il protège également contre les risques liés aux projections de métal en fusion et offre une résistance à la coupure de Niveau 5."'::jsonb,
    'de', '"Handschuh aus hitzebeständigem dreilagigem Baumwollfrottee mit einer wärmeisolierenden Schicht, die Schutz vor Kontaktwärme bis 350°C für über 24 Sekunden und bis 500°C für 13 Sekunden bietet.\n\nDie lange Stulpe mit isolierendem Filzeinsatz gewährleistet zusätzlichen Schutz des Unterarms. Zudem schützt er vor Risiken durch Spritzer geschmolzenen Materials und bietet Schnittfestigkeit der Stufe 5."'::jsonb,
    'es', '"Guante de rizo de algodón termorresistente de triple capa, dotado de una capa termoaislante que ofrece protección contra el calor de contacto hasta 350°C durante más de 24 segundos y hasta 500°C durante 13 segundos.\n\nEl puño largo, con inserto aislante de fieltro, garantiza una protección adicional del antebrazo. Además, protege frente a los riesgos asociados a las salpicaduras de material fundido y ofrece resistencia al corte de Nivel 5."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Three-layer cotton terry glove for prolonged contact heat"'::jsonb,
    'it', '"Guanto in tessuto spugna di cotone a triplo strato per la protezione contro il calore da contatto prolungato"'::jsonb,
    'fr', '"Gant en tissu éponge de coton à triple épaisseur pour la protection contre la chaleur de contact prolongée"'::jsonb,
    'de', '"Handschuh aus dreilagigem Baumwollfrottee zum Schutz vor länger anhaltender Kontaktwärme"'::jsonb,
    'es', '"Guante de tejido de rizo de algodón de triple capa para la protección contra el calor de contacto prolongado"'::jsonb
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
    'en', '["Designed for prolonged contact heat resistance with over 24 seconds at 350C and 13 seconds at 500C", "Ambidextrous, increases durability", "Very high manoeuvrability", "High cut and temperature resistance", "Leather thumbcroth reinforcement"]'::jsonb,
    'it', '["Specificamente progettato per applicazioni con esposizione prolungata al calore da contatto, offrendo oltre 24 secondi di protezione a 350°C e 13 secondi a 500°C", "Ambidestro con stessa composizione sul dorso per massimizzare la durabilita''", "Rinforzo in pelle tra pollice e indice", "Elevatissima manovrabilita'' per operazioni di maggior precisione", "Alta resistenza sia al taglio che alla temperatura"]'::jsonb,
    'fr', '["Spécialement conçu pour les applications avec une exposition prolongée à la chaleur de contact, offrant plus de 24 secondes de protection à 350°C et 13 secondes à 500°C", "Ambidextre avec la même composition sur le dos pour maximiser la durabilité", "Renfort en cuir entre le pouce et l''index", "Très grande maniabilité pour des opérations de plus haute précision", "Haute résistance à la coupure et à la température"]'::jsonb,
    'de', '["Speziell entwickelt für Anwendungen mit länger anhaltender Kontaktwärme-Exposition und bietet mehr als 24 Sekunden Schutz bei 350°C und 13 Sekunden bei 500°C", "Beidhändig einsetzbar mit gleicher Materialzusammensetzung am Handrücken zur maximalen Haltbarkeit", "Lederverstärkung zwischen Daumen und Zeigefinger", "Sehr hohe Beweglichkeit für Arbeiten mit höherer Präzision", "Hohe Beständigkeit gegen Schnitte und Temperatur"]'::jsonb,
    'es', '["Diseñado específicamente para aplicaciones con exposición prolongada al calor de contacto, ofreciendo más de 24 segundos de protección a 350°C y 13 segundos a 500°C", "Ambidiestro con la misma composición en el dorso para maximizar la durabilidad", "Refuerzo de cuero entre el pulgar y el índice", "Altísima maniobrabilidad para operaciones de mayor precisión", "Alta resistencia tanto al corte como a la temperatura"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for the hot end of glass industry to handle hot moulds", "Hot-plastic printing & thermoforming", "Handling heated components in ceramic production lines"]'::jsonb,
    'it', '["Progettato per la zona calda dell''industria del vetro e dei metalli", "Sostituzione stampi ad elevate temperature", "Stampaggio di plastiche"]'::jsonb,
    'fr', '["Conçu pour la zone chaude de l''industrie du verre et des métaux", "Remplacement de moules à hautes températures", "Moulage de matières plastiques"]'::jsonb,
    'de', '["Entwickelt für den Heißbereich der Glas- und Metallindustrie", "Formenwechsel bei hohen Temperaturen", "Kunststoffformung"]'::jsonb,
    'es', '["Diseñado para la zona caliente de la industria del vidrio y de los metales", "Sustitución de moldes a altas temperaturas", "Moldeo de plásticos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Metal", "Ceramics"]'::jsonb,
    'it', '["Industria del vetro", "Industria dell''acciaio", "Metallurgia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["350C", "Cotton heat-resistant glove", "500C"]'::jsonb,
    'it', '["350C", "Guanto anticalore in cotone"]'::jsonb,
    'fr', '["350 °C", "Gant anti-chaleur en coton"]'::jsonb,
    'de', '["350 °C", "Hitzeschutzhandschuh aus Baumwolle"]'::jsonb,
    'es', '["350 °C", "Guante resistente al calor de algodón"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Taglia Unica"'::jsonb,
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
WHERE id = '05da82a6-fb27-47f0-9a1c-95027a84df84';

-- 325-hr-l-bk
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"325 HR L BK"'::jsonb,
    'it', '"325 HR L BK"'::jsonb,
    'fr', '"325 HR L BK"'::jsonb,
    'de', '"325 HR L BK"'::jsonb,
    'es', '"325 HR L BK"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Triple-layered heat-resistant cotton terry glove with thermal layer protecting up to 350°C for over 24 seconds and 13 seconds at 500°C.\nLonger cuff with insulating felt for added protection. Guards against molten-material hazards and provides Level 5 cut resistance.\n\nAvailable with 15cm and 22cm cuff. Black colour helps reduce over-usage."'::jsonb,
    'it', '"Guanto in spugna di cotone termoresistente a triplo strato, dotato di uno strato termoisolante che offre protezione dal calore da contatto fino a 350°C per oltre 24 secondi e fino a 500°C per 13 secondi.\n\nIl polsino lungo, disponibile in 15cm e 22cm, garantisce una protezione aggiuntiva dell''avambraccio. Protegge inoltre dai rischi associati a schizzi di materiale fuso e offre resistenza al taglio di Livello 5.\n\nColore nero - aiuta a ridurre i consumi."'::jsonb,
    'fr', '"Gant en éponge de coton thermorésistant à triple couche, doté d''une couche thermoisolante qui offre une protection contre la chaleur de contact jusqu''à 350°C pendant plus de 24 secondes et jusqu''à 500°C pendant 13 secondes.\n\nLe poignet long, disponible en 15 cm et 22 cm, garantit une protection supplémentaire de l''avant-bras. Il protège également contre les risques liés aux projections de métal en fusion et offre une résistance à la coupure de Niveau 5.\n\nCouleur noire - aide à réduire la consommation."'::jsonb,
    'de', '"Handschuh aus hitzebeständigem dreilagigem Baumwollfrottee mit einer wärmeisolierenden Schicht, die Schutz vor Kontaktwärme bis 350°C für über 24 Sekunden und bis 500°C für 13 Sekunden bietet.\n\nDie lange Stulpe, erhältlich in 15 cm und 22 cm, gewährleistet zusätzlichen Schutz des Unterarms. Zudem schützt er vor Risiken durch Spritzer geschmolzenen Materials und bietet Schnittfestigkeit der Stufe 5.\n\nSchwarze Farbe - hilft, den Verbrauch zu reduzieren."'::jsonb,
    'es', '"Guante de rizo de algodón termorresistente de triple capa, dotado de una capa termoaislante que ofrece protección contra el calor de contacto hasta 350°C durante más de 24 segundos y hasta 500°C durante 13 segundos.\n\nEl puño largo, disponible en 15 cm y 22 cm, garantiza una protección adicional del antebrazo. Además, protege frente a los riesgos asociados a las salpicaduras de material fundido y ofrece resistencia al corte de Nivel 5.\n\nColor negro - ayuda a reducir el consumo."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Three-layer cotton terry glove for prolonged contact heat with long sleeve. Black."'::jsonb,
    'it', '"Guanto in tessuto spugna di cotone a triplo strato per la protezione contro il calore da contatto prolungato"'::jsonb,
    'fr', '"Gant en tissu éponge de coton à triple épaisseur pour la protection contre la chaleur de contact prolongée"'::jsonb,
    'de', '"Handschuh aus dreilagigem Baumwollfrottee zum Schutz vor länger anhaltender Kontaktwärme"'::jsonb,
    'es', '"Guante de tejido de rizo de algodón de triple capa para la protección contra el calor de contacto prolongado"'::jsonb
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
    'en', '["Designed for prolonged contact heat resistance with over 24 seconds at 350C and 13 seconds at 500C", "Ambidextrous, increases durability", "Very high manoeuvrability", "High cut and temperature resistance", "Leather thumbcroth reinforcement", "22cm cuff for forearm protection", "Black colour"]'::jsonb,
    'it', '["Specificamente progettato per applicazioni con esposizione prolungata al calore da contatto, offrendo oltre 24 secondi di protezione a 350°C e 13 secondi a 500°C", "Ambidestro con stessa composizione sul dorso per massimizzare la durabilita''", "Rinforzo in pelle tra pollice e indice", "Elevatissima manovrabilita'' per operazioni di maggior precisione", "Alta resistenza sia al taglio che alla temperatura", "Manichetta da 22cm per protezione avambraccio"]'::jsonb,
    'fr', '["Spécialement conçu pour les applications avec une exposition prolongée à la chaleur de contact, offrant plus de 24 secondes de protection à 350°C et 13 secondes à 500°C", "Ambidextre avec la même composition sur le dos pour maximiser la durabilité", "Renfort en cuir entre le pouce et l''index", "Très grande maniabilité pour des opérations de plus haute précision", "Haute résistance à la coupure et à la température", "Manchette de 22 cm pour la protection de l''avant-bras"]'::jsonb,
    'de', '["Speziell entwickelt für Anwendungen mit länger anhaltender Kontaktwärme-Exposition und bietet mehr als 24 Sekunden Schutz bei 350°C und 13 Sekunden bei 500°C", "Beidhändig einsetzbar mit gleicher Materialzusammensetzung am Handrücken zur maximalen Haltbarkeit", "Lederverstärkung zwischen Daumen und Zeigefinger", "Sehr hohe Beweglichkeit für Arbeiten mit höherer Präzision", "Hohe Beständigkeit gegen Schnitte und Temperatur", "22 cm Stulpe zum Schutz des Unterarms"]'::jsonb,
    'es', '["Diseñado específicamente para aplicaciones con exposición prolongada al calor de contacto, ofreciendo más de 24 segundos de protección a 350°C y 13 segundos a 500°C", "Ambidiestro con la misma composición en el dorso para maximizar la durabilidad", "Refuerzo de cuero entre el pulgar y el índice", "Altísima maniobrabilidad para operaciones de mayor precisión", "Alta resistencia tanto al corte como a la temperatura", "Manguito de 22 cm para protección del antebrazo"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for the hot end of glass industry to handle hot moulds", "Hot-plastic printing & thermoforming", "Handling heated components in ceramic production lines"]'::jsonb,
    'it', '["Progettato per la zona calda dell''industria del vetro e dei metalli", "Sostituzione stampi ad elevate temperature", "Stampaggio di plastiche"]'::jsonb,
    'fr', '["Conçu pour la zone chaude de l''industrie du verre et des métaux", "Remplacement de moules à hautes températures", "Moulage de matières plastiques"]'::jsonb,
    'de', '["Entwickelt für den Heißbereich der Glas- und Metallindustrie", "Formenwechsel bei hohen Temperaturen", "Kunststoffformung"]'::jsonb,
    'es', '["Diseñado para la zona caliente de la industria del vidrio y de los metales", "Sustitución de moldes a altas temperaturas", "Moldeo de plásticos"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glass manufacturing", "Steel manufacturing", "Metal", "Ceramics"]'::jsonb,
    'it', '["Industria del vetro", "Industria dell''acciaio", "Metallurgia"]'::jsonb,
    'fr', '["Industrie du verre", "Industrie sidérurgique", "Métallurgie"]'::jsonb,
    'de', '["Glasindustrie", "Stahlindustrie", "Metallurgie"]'::jsonb,
    'es', '["Industria del vidrio", "Industria del acero", "Metalurgia"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["350C", "Cotton heat-resistant glove", "500C", "Black glove"]'::jsonb,
    'it', '["350C", "Guanto anticalore in cotone", "Guanto nero"]'::jsonb,
    'fr', '["350 °C", "Gant anti-chaleur en coton", "Gant noir"]'::jsonb,
    'de', '["350 °C", "Hitzeschutzhandschuh aus Baumwolle", "Schwarzer Handschuh"]'::jsonb,
    'es', '["350 °C", "Guante resistente al calor de algodón", "Guante negro"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Taglia Unica"'::jsonb,
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
WHERE id = '89b55641-ffa6-41b5-b9fc-cf1022c56415';

-- 49k-c
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"49K-C"'::jsonb,
    'it', '"49K-C"'::jsonb,
    'fr', '"49K-C"'::jsonb,
    'de', '"49K-C"'::jsonb,
    'es', '"49K-C"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Five‑finger welder’s glove in bovine split leather, fully lined.\nIdeal for medium to heavy welding and handling.\n\nReduced length (27 cm) for improved maneuverability."'::jsonb,
    'it', '"Guanto per saldatore a cinque dita in pelle crosta bovina, totalmente foderato.\nIdeale per saldature e manipolazione medie/pesanti.\n\nLunghezza ridotta (27 cm) per migliore manovrabilità."'::jsonb,
    'fr', '"Gant de soudage à cinq doigts en croûte de cuir bovin, entièrement doublé.\nIdéal pour les travaux de soudage et la manipulation moyenne/lourde.\n\nLongueur réduite (27 cm) pour une meilleure maniabilité."'::jsonb,
    'de', '"Fünffinger-Schweißerhandschuh aus Rindspaltleder, vollständig gefüttert.\nIdeal für Schweißarbeiten und mittelschwere/schwere Handhabung.\n\nReduzierte Länge (27 cm) für bessere Handhabbarkeit."'::jsonb,
    'es', '"Guante de soldadura de cinco dedos en cuero serraje bovino, totalmente forrado.\nIdeal para soldadura y manipulación media/pesada.\n\nLongitud reducida (27 cm) para una mejor maniobrabilidad."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Heat‑resistant cowhide‑leather welder’s glove, lined with heat‑resistant fabric on the palm."'::jsonb,
    'it', '"Guanto per saldatore in pelle crosta bovina anticalore, foderato con tessuto anticalore sul palmo."'::jsonb,
    'fr', '"Gant de soudage en croûte de cuir bovin anti-chaleur, doublé de tissu anti-chaleur sur la paume."'::jsonb,
    'de', '"Hitzebeständiger Schweißerhandschuh aus Rindspaltleder, mit hitzebeständigem Gewebe an der Handfläche gefüttert."'::jsonb,
    'es', '"Guante de soldadura en cuero serraje bovino resistente al calor, forrado con tejido resistente al calor en la palma."'::jsonb
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
    'en', '["Excellent contact‑heat protection (250 °C)", "Excellent flame resistance", "High tear resistance", "High puncture resistance"]'::jsonb,
    'it', '["Ottima protezione calore da contatto (250˚C)", "Ottima resistenza all’infiammabilità", "Elevata resistenza allo strappo", "Elevata resistenza alla perforazione"]'::jsonb,
    'fr', '["Excellente protection contre la chaleur de contact (250˚C)", "Excellente résistance à l''inflammabilité", "Haute résistance à la déchirure", "Haute résistance à la perforation"]'::jsonb,
    'de', '["Ausgezeichneter Schutz gegen Kontakthitze (250˚C)", "Hervorragende Beständigkeit gegen Entflammbarkeit", "Hohe Reißfestigkeit", "Hohe Durchstichfestigkeit"]'::jsonb,
    'es', '["Excelente protección contra el calor de contacto (250˚C)", "Excelente resistencia a la inflamabilidad", "Alta resistencia al desgarro", "Alta resistencia a la perforación"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welding of ferrous metals", "Heavy‑duty construction work", "Maintenance at thermal plants"]'::jsonb,
    'it', '["Saldatura di metalli ferrosi", "Lavorazioni gravose in edilizia pesante", "Manutenzione presso impianti termici"]'::jsonb,
    'fr', '["Soudage de métaux ferreux", "Travaux exigeants en construction lourde", "Maintenance dans les installations thermiques"]'::jsonb,
    'de', '["Schweißen von Eisenmetallen", "Schwere Arbeiten im Bauwesen", "Wartungsarbeiten an thermischen Anlagen"]'::jsonb,
    'es', '["Soldadura de metales férricos", "Trabajos exigentes en construcción pesada", "Mantenimiento en instalaciones térmicas"]'::jsonb
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
    'it', '["Guanto corto per saldatore", "guanto in pelle", "destrezza", "250°C"]'::jsonb,
    'fr', '["Gant court de soudeur", "gant en cuir", "dextérité", "250 °C"]'::jsonb,
    'de', '["Kurzer Schweißerhandschuh", "Lederhandschuh", "Fingerfertigkeit", "250 °C"]'::jsonb,
    'es', '["Guante corto de soldador", "guante de cuero", "destreza", "250 °C"]'::jsonb
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
WHERE id = '04e271ed-8b6d-4489-8bbe-875de9193dcd';

-- 49k-cut5
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"49K-CUT5"'::jsonb,
    'it', '"49K-CUT5"'::jsonb,
    'fr', '"49K-CUT5"'::jsonb,
    'de', '"49K-CUT5"'::jsonb,
    'es', '"49K-CUT5"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welder''s glove in cowhide leather with full lining and HPPE/steel cut‑resistant internal mesh for Level C cut protection. \nProvides advanced contact‑heat resistance, abrasion, tear and cut protection while maintaining comfort."'::jsonb,
    'it', '"Guanto per saldatore in pelle crosta bovina foderato con maglia interna antitaglio in HPPE+acciaio. \nElevata protezione al taglio e calore da contatto."'::jsonb,
    'fr', '"Gant de soudage en croûte de cuir bovin doublé d''un tricot anticoupure intérieur en HPPE + acier. \nProtection élevée contre la coupure et la chaleur de contact."'::jsonb,
    'de', '"Schweißerhandschuh aus Rindspaltleder mit innenliegendem Schnittschutzgestrick aus HPPE + Stahl gefüttert. \nHoher Schutz vor Schnitten und Kontaktwärme."'::jsonb,
    'es', '"Guante de soldadura en cuero serraje bovino forrado con malla interior anticorte de HPPE + acero. \nAlta protección al corte y al calor de contacto."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lined cowhide‑leather welder’s glove with internal HPPE+steel cut‑resistant mesh. High cut and contact‑heat protection."'::jsonb,
    'it', '"Guanto per saldatore in pelle crosta bovina foderato con maglia interna antitaglio in HPPE+acciaio. Elevata protezione al taglio e calore da contatto."'::jsonb,
    'fr', '"Gant de soudage en croûte de cuir bovin doublé d''un tricot anticoupure intérieur en HPPE + acier. Protection élevée contre la coupure et la chaleur de contact."'::jsonb,
    'de', '"Schweißerhandschuh aus Rindspaltleder mit innenliegendem Schnittschutzgestrick aus HPPE + Stahl gefüttert. Hoher Schutz vor Schnitten und Kontaktwärme."'::jsonb,
    'es', '"Guante de soldadura en cuero serraje bovino forrado con malla interior anticorte de HPPE + acero. Alta protección al corte y al calor de contacto."'::jsonb
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
    'en', '["Excellent contact-heat protection (250 °C)", "High flame resistance", "High cut resistance", "High puncture resistance"]'::jsonb,
    'it', '["Ottima protezione calore da contatto (250˚C)", "Elevata resistenza all’infiammabilità", "Elevata resistenza al taglio", "Elevata resistenza alla perforazione"]'::jsonb,
    'fr', '["Excellente protection contre la chaleur de contact (250˚C)", "Haute résistance à l’inflammabilité", "Résistance élevée à la coupure", "Haute résistance à la perforation"]'::jsonb,
    'de', '["Ausgezeichneter Schutz gegen Kontakthitze (250˚C)", "Hohe Beständigkeit gegen Entflammbarkeit", "Hohe Schnittfestigkeit", "Hohe Durchstichfestigkeit"]'::jsonb,
    'es', '["Excelente protección contra el calor de contacto (250˚C)", "Alta resistencia a la inflamabilidad", "Elevada resistencia al corte", "Alta resistencia a la perforación"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for heavy-metal welding operations", "Heavy-duty operations", "Handling hot sheet metal"]'::jsonb,
    'it', '["Guanto disegnato per operazioni di saldatura di metalli pesanti", "Lavorazioni gravose", "Manipolazione di lamiere calde"]'::jsonb,
    'fr', '["Gant conçu pour les opérations de soudage de métaux lourds", "Travaux exigeants", "Manipulation de tôles chaudes"]'::jsonb,
    'de', '["Handschuh, entwickelt für Schweißarbeiten mit schweren Metallen", "Schwere Arbeiten", "Handhabung von heißen Blechen"]'::jsonb,
    'es', '["Guante diseñado para operaciones de soldadura de metales pesados", "Trabajos exigentes", "Manipulación de chapas calientes"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial welding", "Carpentry", "Metallurgical industry", "Glass industry"]'::jsonb,
    'it', '["Saldatura industriale", "Carpenteria", "Industria metallurgica", "Industria del vetro"]'::jsonb,
    'fr', '["Soudage industriel", "Charpente métallique", "Industrie métallurgique", "Industrie du verre"]'::jsonb,
    'de', '["Industrielles Schweißen", "Stahlbau", "Metallurgische Industrie", "Glasindustrie"]'::jsonb,
    'es', '["Soldadura industrial", "Carpintería metálica", "Industria metalúrgica", "Industria del vidrio"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welder’s glove", "leather", "dexterity", "250 °C", "cut-resistant glove"]'::jsonb,
    'it', '["Guanto per saldatore", "guanto in pelle", "destrezza", "250°C", "guanto antitaglio"]'::jsonb,
    'fr', '["Gant de soudeur", "gant en cuir", "dextérité", "250 °C", "gant anticoupure"]'::jsonb,
    'de', '["Schweißerhandschuh", "Lederhandschuh", "Fingerfertigkeit", "250 °C", "Schnittschutzhandschuh"]'::jsonb,
    'es', '["Guante de soldador", "guante de cuero", "destreza", "250 °C", "guante anticorte"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["leather", "HPPE", "steel"]'::jsonb,
    'it', '["pelle", "HPPE", "acciaio"]'::jsonb,
    'fr', '["cuir", "HPPE", "acier"]'::jsonb,
    'de', '["Leder", "HPPE", "Stahl"]'::jsonb,
    'es', '["cuero", "HPPE", "acero"]'::jsonb
  )
WHERE id = 'e62c1287-6a71-48ad-9f5b-f85828a4a40b';

-- 49k-da
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"49K-DA"'::jsonb,
    'it', '"49K-DA"'::jsonb,
    'fr', '"49K-DA"'::jsonb,
    'de', '"49K-DA"'::jsonb,
    'es', '"49K-DA"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Welder’s glove in bovine split leather with full lining and an aluminized back, offering enhanced protection against radiant and convective heat.\nLined cowhide‑leather welder’s glove. High cut and contact‑heat protection."'::jsonb,
    'it', '"Guanto da saldatore in pelle crosta bovina con fodera completa e dorso alluminizzato che offre maggiore protezione da calore radiante e convettivo.\nGuanto per saldatore in pelle crosta bovina foderato. Elevata protezione al taglio e calore da contatto."'::jsonb,
    'fr', '"Gant de soudage en croûte de cuir bovin avec doublure complète et dos aluminisé offrant une meilleure protection contre la chaleur radiante et convective.\nGant de soudage en croûte de cuir bovin doublé. Protection élevée contre la coupure et la chaleur de contact."'::jsonb,
    'de', '"Schweißerhandschuh aus Rindspaltleder mit Vollfütterung und aluminisiertem Handrücken, der besseren Schutz vor Strahlungs- und Konvektionswärme bietet.\nGefütterter Schweißerhandschuh aus Rindspaltleder. Hoher Schutz vor Schnitten und Kontaktwärme."'::jsonb,
    'es', '"Guante de soldadura en cuero serraje bovino con forro completo y dorso aluminizado que ofrece mayor protección frente al calor radiante y convectivo.\nGuante de soldadura en cuero serraje bovino forrado. Alta protección al corte y al calor de contacto."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Aluminized‑back cowhide welder’s glove; high cut and contact‑heat protection."'::jsonb,
    'it', '"Guanto per saldatore in pelle con dorso alluminizzato; elevata protezione al taglio e al calore da contatto."'::jsonb,
    'fr', '"Gant de soudage en cuir avec dos aluminisé ; protection élevée contre la coupure et la chaleur de contact."'::jsonb,
    'de', '"Schweißerhandschuh aus Leder mit aluminisiertem Handrücken; hoher Schutz vor Schnitten und Kontaktwärme."'::jsonb,
    'es', '"Guante de soldadura en cuero con dorso aluminizado; alta protección al corte y al calor de contacto."'::jsonb
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
    'en', '["Excellent contact-heat protection (250 °C)", "High flame resistance", "High cut resistance", "High puncture resistance"]'::jsonb,
    'it', '["Ottima protezione calore da contatto (250˚C)", "Elevata resistenza all’infiammabilità", "Elevata resistenza al taglio", "Elevata resistenza alla perforazione"]'::jsonb,
    'fr', '["Excellente protection contre la chaleur de contact (250˚C)", "Haute résistance à l’inflammabilité", "Résistance élevée à la coupure", "Haute résistance à la perforation"]'::jsonb,
    'de', '["Ausgezeichneter Schutz gegen Kontakthitze (250˚C)", "Hohe Beständigkeit gegen Entflammbarkeit", "Hohe Schnittfestigkeit", "Hohe Durchstichfestigkeit"]'::jsonb,
    'es', '["Excelente protección contra el calor de contacto (250˚C)", "Alta resistencia a la inflamabilidad", "Elevada resistencia al corte", "Alta resistencia a la perforación"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Designed for heavy-metal welding operations", "Heavy-duty operations", "Handling hot sheet metal"]'::jsonb,
    'it', '["Guanto disegnato per operazioni di saldatura di metalli pesanti", "Lavorazioni gravose", "Manipolazione di lamiere calde"]'::jsonb,
    'fr', '["Gant conçu pour les opérations de soudage de métaux lourds", "Travaux exigeants", "Manipulation de tôles chaudes"]'::jsonb,
    'de', '["Handschuh, entwickelt für Schweißarbeiten mit schweren Metallen", "Schwere Arbeiten", "Handhabung von heißen Blechen"]'::jsonb,
    'es', '["Guante diseñado para operaciones de soldadura de metales pesados", "Trabajos exigentes", "Manipulación de chapas calientes"]'::jsonb
  ),
  industries_locales = COALESCE(industries_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Industrial welding", "Carpentry", "Metallurgical industry", "Glass industry"]'::jsonb,
    'it', '["Saldatura industriale", "Carpenteria", "Industria metallurgica", "Industria del vetro"]'::jsonb,
    'fr', '["Soudage industriel", "Charpente métallique", "Industrie métallurgique", "Industrie du verre"]'::jsonb,
    'de', '["Industrielles Schweißen", "Stahlbau", "Metallurgische Industrie", "Glasindustrie"]'::jsonb,
    'es', '["Soldadura industrial", "Carpintería metálica", "Industria metalúrgica", "Industria del vidrio"]'::jsonb
  ),
  tags_locales = COALESCE(tags_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Welder’s glove", "leather", "dexterity", "250 °C", "cut-resistant glove"]'::jsonb,
    'it', '["Guanto per saldatore", "guanto in pelle", "destrezza", "250°C", "guanto antitaglio"]'::jsonb,
    'fr', '["Gant de soudeur", "gant en cuir", "dextérité", "250 °C", "gant anticoupure"]'::jsonb,
    'de', '["Schweißerhandschuh", "Lederhandschuh", "Fingerfertigkeit", "250 °C", "Schnittschutzhandschuh"]'::jsonb,
    'es', '["Guante de soldador", "guante de cuero", "destreza", "250 °C", "guante anticorte"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"One size"'::jsonb,
    'it', '"Unica"'::jsonb,
    'fr', '"Taille unique"'::jsonb,
    'de', '"Einheitsgröße"'::jsonb,
    'es', '"Talla única"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Split Leather", "Alluminised back"]'::jsonb,
    'it', '["Pelle crosta", "Dorso alluminizzato"]'::jsonb,
    'fr', '["Cuir croûte", "Dos aluminisé"]'::jsonb,
    'de', '["Spaltleder", "Aluminisierter Rücken"]'::jsonb,
    'es', '["Cuero descarne", "Dorso aluminizado"]'::jsonb
  )
WHERE id = '247af0ef-e855-4cff-909e-09e725e904dd';

-- 49k-r
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"49K-R"'::jsonb,
    'it', '"49K-R"'::jsonb,
    'fr', '"49K-R"'::jsonb,
    'de', '"49K-R"'::jsonb,
    'es', '"49K-R"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Five‑finger welder’s glove in bovine split leather, fully lined and internally reinforced on the palm.\nIdeal for medium to heavy welding and handling.\n\nAvailable in multiple colors (incl. natural)."'::jsonb,
    'it', '"Guanto per saldatore a cinque dita in pelle crosta bovina, totalmente foderato e rinforzato internamente sul palmo.\nIdeale per saldature e manipolazione medie/pesanti.\n\nDisponibile in diverse colorazioni (incl. naturale)."'::jsonb,
    'fr', '"Gant de soudage à cinq doigts en croûte de cuir bovin, entièrement doublé et renforcé à l''intérieur de la paume.\nIdéal pour les travaux de soudage et la manipulation moyenne/lourde.\n\nDisponible en différentes couleurs (dont naturel)."'::jsonb,
    'de', '"Fünffinger-Schweißerhandschuh aus Rindspaltleder, vollständig gefüttert und innen an der Handfläche verstärkt.\nIdeal für Schweißarbeiten und mittelschwere/schwere Handhabung.\n\nErhältlich in verschiedenen Farben (inkl. naturfarben)."'::jsonb,
    'es', '"Guante de soldadura de cinco dedos en cuero serraje bovino, totalmente forrado y reforzado internamente en la palma.\nIdeal para soldadura y manipulación media/pesada.\n\nDisponible en diferentes colores (incl. natural)."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Lined cowhide‑leather welder’s glove with a Kevlar back insert and reinforced palm."'::jsonb,
    'it', '"Guanto per saldatore in pelle crosta bovina, foderato, con inserto in Kevlar sul dorso e palmo rinforzato."'::jsonb,
    'fr', '"Gant de soudage en croûte de cuir bovin, doublé, avec insert en Kevlar sur le dos et paume renforcée."'::jsonb,
    'de', '"Schweißerhandschuh aus Rindspaltleder, gefüttert, mit Kevlar-Einsatz am Handrücken und verstärkter Handfläche."'::jsonb,
    'es', '"Guante de soldadura en cuero serraje bovino, forrado, con inserto de Kevlar en el dorso y palma reforzada."'::jsonb
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
    'en', '["High flame resistance", "High tear resistance", "Reinforced palm", "Excellent contact‑heat protection (350 °C)"]'::jsonb,
    'it', '["Elevata resistenza all’infiammabilità", "Elevata resistenza allo strappo", "Palmo rinforzato", "Ottima protezione calore da contatto (350˚C)"]'::jsonb,
    'fr', '["Haute résistance à l’inflammabilité", "Haute résistance à la déchirure", "Paume renforcée", "Excellente protection contre la chaleur de contact (350˚C)"]'::jsonb,
    'de', '["Hohe Beständigkeit gegen Entflammbarkeit", "Hohe Reißfestigkeit", "Verstärkte Handfläche", "Hervorragender Schutz vor Kontaktwärme (350˚C)"]'::jsonb,
    'es', '["Alta resistencia a la inflamabilidad", "Alta resistencia al desgarro", "Palma reforzada", "Excelente protección frente al calor de contacto (350˚C)"]'::jsonb
  ),
  applications_locales = COALESCE(applications_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Glove designed for welding operations", "Suitable for operations and handling in the glass & steel industry", "Handling metal slags"]'::jsonb,
    'it', '["Guanto disegnato per operazioni di saldatura", "Indicato nelle lavorazioni e manipolazione nell''industria del vetro e dell''acciaio", "Movimentazione di scorie metalliche"]'::jsonb,
    'fr', '["Gant conçu pour les opérations de soudage", "Indiqué pour les travaux et la manipulation dans l''industrie du verre et de l''acier", "Manutention de scories métalliques"]'::jsonb,
    'de', '["Für Schweißarbeiten konzipierter Handschuh", "Geeignet für Bearbeitung und Handhabung in der Glas- und Stahlindustrie", "Handhabung von Metallschlacke"]'::jsonb,
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
    'it', '["Guanto corto per saldatore", "guanto in pelle", "destrezza", "250°C"]'::jsonb,
    'fr', '["Gant court de soudeur", "gant en cuir", "dextérité", "250 °C"]'::jsonb,
    'de', '["Kurzer Schweißerhandschuh", "Lederhandschuh", "Fingerfertigkeit", "250 °C"]'::jsonb,
    'es', '["Guante corto de soldador", "guante de cuero", "destreza", "250 °C"]'::jsonb
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
WHERE id = '815eb38e-75d1-437d-b266-cf3a21bf6d63';

-- suxxeed-construction-jacket
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"suXXeed construction Jacket"'::jsonb,
    'it', '"suXXeed construction GIACCA"'::jsonb,
    'fr', '"suXXeed construction VESTE"'::jsonb,
    'de', '"suXXeed construction JACKE"'::jsonb,
    'es', '"suXXeed construction CHAQUETA"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility work jacket with an excellent fit and great freedom of movement."'::jsonb,
    'it', '"Giacca da lavoro alta visibilità con un ottima vestibilità e mobilità."'::jsonb,
    'fr', '"Veste de travail haute visibilité avec un excellent ajustement et une grande mobilité."'::jsonb,
    'de', '"Warnschutz-Arbeitsjacke mit hervorragender Passform und Bewegungsfreiheit."'::jsonb,
    'es', '"Chaqueta de trabajo de alta visibilidad con un excelente ajuste y movilidad."'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"High-visibility work jacket"'::jsonb,
    'it', '"Giacca da lavoro alta visibilità"'::jsonb,
    'fr', '"Veste de travail haute visibilité"'::jsonb,
    'de', '"Warnschutz-Arbeitsjacke"'::jsonb,
    'es', '"Chaqueta de trabajo de alta visibilidad"'::jsonb
  ),
  category_locales = COALESCE(category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Protective Clothing"'::jsonb,
    'it', '"Abbigliamento protettivo"'::jsonb,
    'fr', '"Vêtements de protection"'::jsonb,
    'de', '"Schutzkleidung"'::jsonb,
    'es', '"Ropa de protección"'::jsonb
  ),
  sub_category_locales = COALESCE(sub_category_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Hi-Vis Jackets"'::jsonb,
    'it', '"Giacca alta visibilità"'::jsonb,
    'fr', '"Veste haute visibilité"'::jsonb,
    'de', '"Warnschutzjacke"'::jsonb,
    'es', '"Chaqueta de alta visibilidad"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Ensures excellent visibility thanks to reflective components", "Provides UV protection", "Certified in accordance with OEKO-TEX® Standard 100", "Excellent fit and freedom of movement", "Two side pockets", "Adjustable sleeve hem"]'::jsonb,
    'it', '["Garantisce ottima visibilità, con componenti reflex", "Garantisce protezione uv", "Certificazione secondo OEKO-TEX® Standard 100", "Ottima vestibilità e mobilità", "Due tasche laterali", "Orlo della manica regolabile"]'::jsonb,
    'fr', '["Garantit une excellente visibilité, avec des éléments réfléchissants", "Garantit une protection UV", "Certification selon OEKO-TEX® Standard 100", "Excellent ajustement et grande mobilité", "Deux poches latérales", "Ourlet de manche réglable"]'::jsonb,
    'de', '["Gewährleistet ausgezeichnete Sichtbarkeit dank reflektierender Elemente", "Gewährleistet UV-Schutz", "Zertifizierung nach OEKO-TEX® Standard 100", "Hervorragende Passform und Bewegungsfreiheit", "Zwei Seitentaschen", "Verstellbarer Ärmelabschluss"]'::jsonb,
    'es', '["Garantiza una excelente visibilidad, con componentes reflectantes", "Garantiza protección UV", "Certificación según OEKO-TEX® Standard 100", "Excelente ajuste y movilidad", "Dos bolsillos laterales", "Dobladillo de manga ajustable"]'::jsonb
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
WHERE id = '96bbbd32-343a-4612-b027-3b799764d7ce';

-- bls-202
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 202"'::jsonb,
    'it', '"BLS 202"'::jsonb,
    'fr', '"BLS 202"'::jsonb,
    'de', '"BLS 202"'::jsonb,
    'es', '"BLS 202"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Dust filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Polveri con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre à particules avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Partikelfilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para partículas con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Dust filtering efficiency 99.99%"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Efficienza di filtrazione delle polveri 99,99%"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Efficacité de filtration des poussières de 99,99%"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Filterleistung für Staub von 99,99%"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Eficiencia de filtración de partículas del 99,99%"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '94286eee-9255-4877-9db1-a9d7d5004a02';

-- bls-210
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 210"'::jsonb,
    'it', '"BLS 210"'::jsonb,
    'fr', '"BLS 210"'::jsonb,
    'de', '"BLS 210"'::jsonb,
    'es', '"BLS 210"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = 'ed7b00de-d544-4390-9629-064548d8c198';

-- bls-211
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 211"'::jsonb,
    'it', '"BLS 211"'::jsonb,
    'fr', '"BLS 211"'::jsonb,
    'de', '"BLS 211"'::jsonb,
    'es', '"BLS 211"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = 'a1d419f0-f667-4f13-bb51-658e42535780';

-- bls-212
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 212"'::jsonb,
    'it', '"BLS 212"'::jsonb,
    'fr', '"BLS 212"'::jsonb,
    'de', '"BLS 212"'::jsonb,
    'es', '"BLS 212"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '65569ef7-76dc-4634-b3c5-efea47cc7eab';

-- bls-213
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 213"'::jsonb,
    'it', '"BLS 213"'::jsonb,
    'fr', '"BLS 213"'::jsonb,
    'de', '"BLS 213"'::jsonb,
    'es', '"BLS 213"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '4051672d-3615-4fed-8339-44e4d0e8738f';

-- bls-214
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 214"'::jsonb,
    'it', '"BLS 214"'::jsonb,
    'fr', '"BLS 214"'::jsonb,
    'de', '"BLS 214"'::jsonb,
    'es', '"BLS 214"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '955d3036-f803-44a9-9491-692747e24569';

-- bls-221
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 221"'::jsonb,
    'it', '"BLS 221"'::jsonb,
    'fr', '"BLS 221"'::jsonb,
    'de', '"BLS 221"'::jsonb,
    'es', '"BLS 221"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '0779e5cc-1b02-487c-b4e2-cd505bd4a7ae';

-- bls-222
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 222"'::jsonb,
    'it', '"BLS 222"'::jsonb,
    'fr', '"BLS 222"'::jsonb,
    'de', '"BLS 222"'::jsonb,
    'es', '"BLS 222"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = 'f96da228-9d82-4b55-9ec5-42ff752ea6c7';

-- bls-225
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 225"'::jsonb,
    'it', '"BLS 225"'::jsonb,
    'fr', '"BLS 225"'::jsonb,
    'de', '"BLS 225"'::jsonb,
    'es', '"BLS 225"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
  ),
  respiratory_comfort_features_locales = COALESCE(respiratory_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  respiratory_other_details_locales = COALESCE(respiratory_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
  ),
  respiratory_equipment_locales = COALESCE(respiratory_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["test"]'::jsonb,
    'it', '["testa"]'::jsonb,
    'fr', '["tête"]'::jsonb,
    'de', '["Kopf"]'::jsonb,
    'es', '["cabeza"]'::jsonb
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
WHERE id = '3ca418fd-d279-4aff-bbcd-f47a952da88d';

-- bls-226
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 226"'::jsonb,
    'it', '"BLS 226"'::jsonb,
    'fr', '"BLS 226"'::jsonb,
    'de', '"BLS 226"'::jsonb,
    'es', '"BLS 226"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '11cadd2e-05ac-480b-a2de-786d2729611f';

-- bls-227
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 227"'::jsonb,
    'it', '"BLS 227"'::jsonb,
    'fr', '"BLS 227"'::jsonb,
    'de', '"BLS 227"'::jsonb,
    'es', '"BLS 227"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Filters with b-lock connection."'::jsonb,
    'it', '"Filtro con aggancio b-lock"'::jsonb,
    'fr', '"Filtre à raccord b-lock"'::jsonb,
    'de', '"Filter mit B-Lock-Anschluss"'::jsonb,
    'es', '"Filtro con conexión b-lock"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = 'ec096311-7603-45a2-a63f-6934f040faf9';

-- bls-242
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 242"'::jsonb,
    'it', '"BLS 242"'::jsonb,
    'fr', '"BLS 242"'::jsonb,
    'de', '"BLS 242"'::jsonb,
    'es', '"BLS 242"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"\"Combined filter with b-lock connection and activated carbons.\\nTested on Fluoridric acid\""'::jsonb,
    'it', '"\"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi.\\nTestato con acido fluoridrico\""'::jsonb,
    'fr', '"\"Filtre pour Combinés avec raccord à baïonnette b-lock et charbons actifs.\\nTesté à l''acide fluorhydrique\""'::jsonb,
    'de', '"\"Kombinationsfilter mit b-lock-Bajonettanschluss und Aktivkohle.\\nGetestet mit Flusssäure\""'::jsonb,
    'es', '"\"Filtro para combinados con conexión de bayoneta b-lock y carbón activo.\\nProbado con ácido fluorhídrico\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = 'b8fcfe3e-5a90-4168-8713-038a93a7d444';

-- bls-243
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 243"'::jsonb,
    'it', '"BLS 243"'::jsonb,
    'fr', '"BLS 243"'::jsonb,
    'de', '"BLS 243"'::jsonb,
    'es', '"BLS 243"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"\"Gasses & Vapours filter with b-lock connection and activated carbons.\\nTested on formaldehyde\""'::jsonb,
    'it', '"\"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi.\\nTestato con formaldeide\""'::jsonb,
    'fr', '"\"Filtre pour Gaz & Vapeurs avec raccord à baïonnette b-lock et charbons actifs.\\nTesté à la formaldéhyde\""'::jsonb,
    'de', '"\"Filter für Gase & Dämpfe mit b-lock-Bajonettanschluss und Aktivkohle.\\nGetestet mit Formaldehyd\""'::jsonb,
    'es', '"\"Filtro para Gases y Vapores con conexión de bayoneta b-lock y carbón activo.\\nProbado con formaldehído\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons."'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = 'dbf7dc9b-84d9-41f2-8e3e-95e674c50020';

-- bls-244
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 244"'::jsonb,
    'it', '"BLS 244"'::jsonb,
    'fr', '"BLS 244"'::jsonb,
    'de', '"BLS 244"'::jsonb,
    'es', '"BLS 244"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"\"Gasses & Vapours filter with b-lock connection and activated carbons.\\nTested on formaldehyde\""'::jsonb,
    'it', '"\"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi.\\nTestato con formaldeide\""'::jsonb,
    'fr', '"\"Filtre pour Gaz & Vapeurs avec raccord à baïonnette b-lock et charbons actifs.\\nTesté à la formaldéhyde\""'::jsonb,
    'de', '"\"Filter für Gase & Dämpfe mit b-lock-Bajonettanschluss und Aktivkohle.\\nGetestet mit Formaldehyd\""'::jsonb,
    'es', '"\"Filtro para Gases y Vapores con conexión de bayoneta b-lock y carbón activo.\\nProbado con formaldehído\""'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Gasses & Vapours filter with b-lock connection and activated carbons."'::jsonb,
    'it', '"Filtro per Gas & Vapori con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre pour gaz et vapeurs avec raccord à baïonnette b-lock et charbons actifs"'::jsonb,
    'de', '"Gas- und Dampffilter mit b-lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro para gases y vapores con conexión de bayoneta b-lock y carbón activo"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '2f232f95-e329-4837-b565-15f7bcfe77c8';

-- bls-253
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 253"'::jsonb,
    'it', '"BLS 253"'::jsonb,
    'fr', '"BLS 253"'::jsonb,
    'de', '"BLS 253"'::jsonb,
    'es', '"BLS 253"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons."'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '3bf24510-1f6e-45bc-94d1-daef3bfed67e';

-- bls-254
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 254"'::jsonb,
    'it', '"BLS 254"'::jsonb,
    'fr', '"BLS 254"'::jsonb,
    'de', '"BLS 254"'::jsonb,
    'es', '"BLS 254"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons"'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Combined filter with b-lock connection and activated carbons."'::jsonb,
    'it', '"Filtro per Combinati con attacco a baionetta b-lock e carboni attivi"'::jsonb,
    'fr', '"Filtre combiné à raccord baïonnette b-lock avec charbon actif"'::jsonb,
    'de', '"Kombinationsfilter mit B-Lock-Bajonettanschluss und Aktivkohle"'::jsonb,
    'es', '"Filtro combinado con conexión de bayoneta b-lock y carbón activo"'::jsonb
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
    'en', '["Non deformable ABS filter canister avoids air corridors", "Excellent filtration performance with high-quality activated carbons"]'::jsonb,
    'it', '["Il contenitore del filtro in ABS non deformabile evita corridoi d’aria", "Eccellente prestazione di filtrazione grazie a carboni attivi di alta qualità"]'::jsonb,
    'fr', '["Le boîtier du filtre en ABS indéformable évite les passages d’air", "Excellente performance de filtration grâce à des charbons actifs de haute qualité"]'::jsonb,
    'de', '["Das formstabile Filtergehäuse aus ABS verhindert Luftkanäle", "Hervorragende Filterleistung dank hochwertiger Aktivkohle"]'::jsonb,
    'es', '["La carcasa del filtro de ABS indeformable evita pasillos de aire", "Excelente rendimiento de filtración gracias a carbones activos de alta calidad"]'::jsonb
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
    'en', '["ABS", "Pleated glass fibre", "Activated carbons grains"]'::jsonb,
    'it', '["ABS", "fibra di vetro plissettata", "granuli di carbone attivo"]'::jsonb,
    'fr', '["ABS", "fibre de verre plissée", "granulés de charbon actif"]'::jsonb,
    'de', '["ABS", "gefaltete Glasfaser", "Aktivkohlegranulat"]'::jsonb,
    'es', '["ABS", "fibra de vidrio plisada", "gránulos de carbón activo"]'::jsonb
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
WHERE id = '11637dbb-5ce2-4b10-9d51-cad8cdaea0fb';

-- bls-4000-next-s
UPDATE products
SET name_locales = COALESCE(name_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"BLS 4000 next S"'::jsonb,
    'fr', '"BLS 4000 next S"'::jsonb,
    'de', '"BLS 4000 next S"'::jsonb,
    'es', '"BLS 4000 next S"'::jsonb
  ),
  description_locales = COALESCE(description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"b-lock half mask compatible BLS 200 and BLS 400 Filters"'::jsonb,
    'fr', '"Demi-masque b-lock compatible avec les filtres BLS 200 et BLS 400"'::jsonb,
    'de', '"b-lock Halbmaske kompatibel mit BLS 200 und BLS 400 Filtern"'::jsonb,
    'es', '"Media máscara b-lock compatible con los filtros BLS 200 y BLS 400"'::jsonb
  ),
  short_description_locales = COALESCE(short_description_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"Half mask"'::jsonb,
    'fr', '"Demi-masque"'::jsonb,
    'de', '"Halbmaske"'::jsonb,
    'es', '"Media máscara"'::jsonb
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
    'fr', '"Demi-masques"'::jsonb,
    'de', '"Halbmasken"'::jsonb,
    'es', '"Semimáscaras"'::jsonb
  ),
  features_locales = COALESCE(features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Protection against all contaminants in combination with appropriate filter"]'::jsonb
  ),
  size_locales = COALESCE(size_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '"S/M - M/L"'::jsonb,
    'fr', '"S/M - M/L"'::jsonb,
    'de', '"S/M - M/L"'::jsonb,
    'es', '"S/M - M/L"'::jsonb
  ),
  materials_locales = COALESCE(materials_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Silicone"]'::jsonb
  ),
  respiratory_comfort_features_locales = COALESCE(respiratory_comfort_features_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Available in two sizes (S/M and M/L)", "Drop-off mask with quick attachment and release system"]'::jsonb
  ),
  respiratory_other_details_locales = COALESCE(respiratory_other_details_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Easy and fast maintenance"]'::jsonb
  ),
  respiratory_equipment_locales = COALESCE(respiratory_equipment_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["Drop-off lace"]'::jsonb
  ),
  connections_locales = COALESCE(connections_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["B-Lock"]'::jsonb,
    'it', '["B-Lock"]'::jsonb,
    'fr', '["B-Lock"]'::jsonb,
    'de', '["B-Lock"]'::jsonb,
    'es', '["B-Lock"]'::jsonb
  ),
  compatible_with_locales = COALESCE(compatible_with_locales, '{}'::jsonb) || jsonb_build_object(
    'en', '["BLS 200 Filters"]'::jsonb,
    'it', '["Filtri BLS 200"]'::jsonb,
    'fr', '["Filtres BLS 200"]'::jsonb,
    'de', '["BLS 200-Filter"]'::jsonb,
    'es', '["Filtros BLS 200"]'::jsonb
  )
WHERE id = '3dbde19c-6ef2-4154-9729-94fbc57e11fb';

COMMIT;
