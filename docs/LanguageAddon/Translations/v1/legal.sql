-- Legal documents: create tables and seed English/Italian from content/legal.ts
-- Paste into the Supabase SQL editor. Take a backup first.
-- FR/DE/ES stay empty so the site falls back to English until Luca returns the Legal.csv sheet.

BEGIN;

CREATE TABLE IF NOT EXISTS public.legal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  title_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_updated_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.legal_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.legal_documents(id) ON DELETE CASCADE,
  slug text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  title_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  content_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, slug)
);

CREATE INDEX IF NOT EXISTS legal_documents_sort_idx ON public.legal_documents (sort_order);
CREATE INDEX IF NOT EXISTS legal_sections_document_idx ON public.legal_sections (document_id);
CREATE INDEX IF NOT EXISTS legal_sections_sort_idx ON public.legal_sections (sort_order);

GRANT SELECT ON public.legal_documents TO anon, authenticated;
GRANT SELECT ON public.legal_sections TO anon, authenticated;

INSERT INTO public.legal_documents (id, slug, sort_order, published, title_locales, last_updated_locales)
VALUES (
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms',
  1,
  true,
  '{"en":"Terms of Use","it":"Termini di Utilizzo"}'::jsonb,
  '{"en":"Last update: 4th August 2025","it":"Ultimo aggiornamento: 4 agosto 2025"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_documents.title_locales || EXCLUDED.title_locales,
  last_updated_locales = public.legal_documents.last_updated_locales || EXCLUDED.last_updated_locales,
  updated_at = now();

INSERT INTO public.legal_documents (id, slug, sort_order, published, title_locales, last_updated_locales)
VALUES (
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy',
  2,
  true,
  '{"en":"Privacy Policy","it":"Informativa sulla Privacy"}'::jsonb,
  '{"en":"Last update: 4th August 2025","it":"Ultimo aggiornamento: 4 agosto 2025"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_documents.title_locales || EXCLUDED.title_locales,
  last_updated_locales = public.legal_documents.last_updated_locales || EXCLUDED.last_updated_locales,
  updated_at = now();

INSERT INTO public.legal_documents (id, slug, sort_order, published, title_locales, last_updated_locales)
VALUES (
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies',
  3,
  true,
  '{"en":"Cookie Policy","it":"Informativa sui Cookie"}'::jsonb,
  '{"en":"Last update: 4th August 2025","it":"Ultimo aggiornamento: 4 agosto 2025"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_documents.title_locales || EXCLUDED.title_locales,
  last_updated_locales = public.legal_documents.last_updated_locales || EXCLUDED.last_updated_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '103c03e6-79c2-538b-8a44-40cbedc2b437',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-introduction',
  1,
  true,
  '{"en":"Introduction","it":"Introduzione"}'::jsonb,
  '{"en":"<p>These Terms of Use are entered into by and between you and Hand Line Company S.r.l. and its affiliates (\"Hand Line\", \"we\", \"us\", or \"our\"). The following terms govern your access to and use of our website (the \"Website\"), including any content, features, and services made available through it, whether as a guest or a registered user.</p>\n<p>By accessing or using this Website, you accept and agree to be bound by these Terms of Use, as well as our Privacy Policy, Cookie Policy, and, if applicable, our Terms of Sale. If you do not agree to these terms, please do not use the Website.</p>","it":"<p>I presenti Termini di Utilizzo sono stipulati tra l''utente e Hand Line Company S.r.l. e le sue affiliate (\"Hand Line\", \"noi\", \"ci\" o \"nostro\"). I termini seguenti regolano l''accesso e l''utilizzo del nostro sito web (il \"Sito\"), e si estendono a tutti i contenuti, le funzionalità e i servizi resi disponibili attraverso di esso, sia come utente ospite che come utente registrato.</p>\n<p>Accedendo o utilizzando questo Sito, accetti di essere vincolato dai presenti Termini di Utilizzo, nonché dalla nostra Informativa sulla Privacy, dalla Cookie Policy e, se applicabile, dai nostri Termini di Vendita. Se non accetti questi termini, ti preghiamo di non utilizzare il Sito.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '620f29c0-fb87-539c-bedd-ac75f2c04f5c',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-eligibility',
  2,
  true,
  '{"en":"Eligibility","it":"Requisiti di età"}'::jsonb,
  '{"en":"<p>This Website is intended for users who are at least 16 years old. By using this Website, you confirm that you meet this requirement.</p>","it":"<p>Questo Sito è destinato a utenti di almeno 16 anni. Utilizzando il Sito, confermi di soddisfare tale requisito.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '77ec1774-5d9c-5f07-991d-5a6627993e3b',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-intellectual-property-and-use-of-content',
  3,
  true,
  '{"en":"Intellectual Property and Use of Content","it":"Proprietà intellettuale e utilizzo dei contenuti"}'::jsonb,
  '{"en":"<p>The Website and its content, including but not limited to text, graphics, logos, images, audio, video, and software, are the property of Hand Line or its licensors and are protected by applicable intellectual property laws. You may use the Website only for your personal, non-commercial use. You may not reproduce, distribute, modify, or publicly display any part of the Website without express written consent.</p>\n<p>You agree to use the Website only for lawful purposes.</p>\n<p>You are prohibited from:</p>\n<ul>\n<li>Violating any local or international laws</li>\n<li>Attempting unauthorized access or disrupting the Website</li>\n<li>Using the Website to transmit spam or malware</li>\n<li>Impersonating any individual or entity</li>\n<li>Using the content for commercial purposes without authorization</li>\n<li>To transmit, or procure the sending of, any advertising or promotional material, including any \"junk mail\", \"chain letter\", \"spam\", or any other similar solicitation</li>\n<li>To engage in any other conduct that restricts or inhibits anyone''s use or enjoyment of our Services, or which, as determined by us, may harm HandLine Company or users of our Services or expose them to liability</li>\n</ul>","it":"<p>Il Sito e i suoi contenuti, inclusi ma non limitati a testi, grafica, loghi, immagini, audio, video e software, sono di proprietà di Hand Line o dei suoi licenziatari e sono protetti dalle leggi vigenti in materia di proprietà intellettuale. Il Sito può essere utilizzato solo per scopi personali e non commerciali. Non è consentito riprodurre, distribuire, modificare o mostrare pubblicamente alcuna parte del Sito senza esplicito consenso scritto.</p>\n<p>Accetti di utilizzare il Sito esclusivamente per scopi leciti. Non è consentito:</p>\n<ul>\n<li>Violare leggi locali o internazionali</li>\n<li>Tentare di accedere in modo non autorizzato o compromettere il funzionamento del Sito</li>\n<li>Utilizzare il Sito per inviare spam o software dannosi</li>\n<li>Impersonare qualsiasi persona o entità</li>\n<li>Utilizzare i contenuti per fini commerciali senza autorizzazione</li>\n<li>Inviare o far inviare materiale pubblicitario o promozionale non richiesto</li>\n<li>Adottare comportamenti che limitino o ostacolino l''utilizzo del Sito da parte di altri o che possano danneggiare Hand Line o altri utenti</li>\n</ul>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'e6d38833-3e31-5dc7-8bf1-892356b8e6a7',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-account-registration',
  4,
  true,
  '{"en":"Account Registration","it":"Registrazione account"}'::jsonb,
  '{"en":"<p>To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>\n<p>You are responsible for safeguarding the password that you use to access our Services and for any activities or actions under your password. We encourage you to use \"strong\" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.</p>","it":"<p>Per accedere a determinate funzionalità, potrebbe essere necessario registrarsi. Accetti di fornire informazioni accurate e aggiornate durante la registrazione e di mantenerle aggiornate.</p>\n<p>Sei responsabile della protezione della tua password e dell''utilizzo del tuo account. Ti consigliamo di utilizzare password sicure (combinazione di lettere maiuscole/minuscole, numeri e simboli).</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'eb15c89f-ebad-5fc6-b4a3-64efa85c329c',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-linking-to-our-website',
  5,
  true,
  '{"en":"Linking to Our Website","it":"Collegamenti al nostro sito"}'::jsonb,
  '{"en":"<p>You may link to our homepage in a way that is fair and legal, but not in a manner that suggests any endorsement or affiliation without our express consent. We reserve the right to withdraw linking permission without notice.</p>","it":"<p>Puoi collegarti alla nostra homepage in modo equo e legale, a condizione che ciò non implichi alcuna affiliazione o approvazione da parte nostra senza esplicito consenso. Ci riserviamo il diritto di revocare il permesso di collegamento in qualsiasi momento e senza preavviso.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'dd90bd35-fc82-5573-965f-66202bf4e36d',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-disclaimer-of-warranties',
  6,
  true,
  '{"en":"Disclaimer of Warranties","it":"Esclusione di garanzie"}'::jsonb,
  '{"en":"<p>The Website is provided on an ''as is'' and ''as available'' basis without warranties of any kind. Hand Line does not guarantee the accuracy, completeness, or reliability of any content. To the fullest extent permitted by law, we disclaim all warranties, express or implied.</p>","it":"<p>Il Sito viene fornito \"così com''è\" e \"come disponibile\", senza alcuna garanzia di alcun tipo. Hand Line non garantisce l''accuratezza, la completezza o l''affidabilità dei contenuti. Nei limiti consentiti dalla legge, decliniamo ogni garanzia, espressa o implicita.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '9972ec0a-a8e7-54f0-9b63-0d46e3a8a5f1',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-limitation-of-liability',
  7,
  true,
  '{"en":"Limitation of Liability","it":"Limitazione di responsabilità"}'::jsonb,
  '{"en":"<p>Hand Line, its directors, employees, partners, agents, suppliers, or affiliates, shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our Services.</p>\n<p>Additionally, we decline any liability from any other website which you choose to access from our website. Links to third party websites do not represent any level of endorsement or validation of the safety and content therein.</p>","it":"<p>Hand Line, i suoi direttori, dipendenti, agenti, fornitori o affiliati non saranno responsabili per danni indiretti, accidentali, speciali, consequenziali o punitivi, inclusi, a titolo esemplificativo ma non esaustivo, perdita di profitti, dati, utilizzo, avviamento o altri danni intangibili derivanti dall''accesso o uso del Sito.</p>\n<p>Inoltre, decliniamo ogni responsabilità per eventuali contenuti presenti su siti esterni accessibili tramite link presenti nel nostro Sito. Il collegamento non implica alcuna approvazione dei contenuti da parte nostra.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '18730609-7e39-57e7-b184-b5696cc170c5',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-governing-law-and-jurisdiction',
  8,
  true,
  '{"en":"Governing Law and Jurisdiction","it":"Legge applicabile e corte competente"}'::jsonb,
  '{"en":"<p>These Terms are governed by the laws of Italy. Any disputes arising from the use of the Website shall be subject to the exclusive jurisdiction of the courts of Como, Italy.</p>\n<p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>","it":"<p>I presenti Termini sono regolati dalla legge italiana. Qualsiasi controversia derivante dall''uso del Sito sarà sottoposta alla giurisdizione esclusiva di Como, Italia.</p>\n<p>La mancata applicazione di qualsiasi diritto da parte nostra non costituirà rinuncia a quel diritto. Se una clausola dei presenti Termini dovesse essere considerata invalida da un tribunale, le restanti clausole continueranno ad avere pieno effetto.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '298a9c2a-f11f-5b23-8d2e-844745745523',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-changes-to-terms',
  9,
  true,
  '{"en":"Changes to Terms","it":"Modifiche ai Termini"}'::jsonb,
  '{"en":"<p>We reserve the right to revise and update these Terms of Use at any time. Changes will be posted on this page and are effective immediately. Continued use of the Website after such changes implies your acceptance of the revised Terms.</p>\n<p>By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorised to use our Services.</p>","it":"<p>Ci riserviamo il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina ed entreranno in vigore immediatamente. L''uso continuato del Sito implica l''accettazione delle modifiche.</p>\n<p>Utilizzando ancora il Sito dopo l''entrata in vigore delle modifiche, accetti di essere vincolato dai nuovi termini. Se non sei d''accordo con le modifiche, non sei più autorizzato a utilizzare i nostri servizi.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '79805398-f52d-59a0-9eca-fb52c51ff623',
  '27afffe8-e25f-5afa-8520-d349e0d73873',
  'terms-contact-information',
  10,
  true,
  '{"en":"Contact Information","it":"Contatti"}'::jsonb,
  '{"en":"<p>If you have questions about these Terms of Use, please contact us at:</p>\n<p><strong>Email:</strong> legal@handlineco.com</p>\n<p><strong>Mail:</strong> Privacy Office, Hand Line Company S.r.l. Via Brusa 34. 22035, Canzo (Co) Italy.</p>","it":"<p>Per qualsiasi domanda relativa ai presenti Termini di Utilizzo, contattaci:</p>\n<p><strong>📧 Email:</strong> legal@handlineco.com</p>\n<p><strong>📬 Posta:</strong> Ufficio Privacy, Hand Line Company S.r.l., Via Brusa 34, 22035 Canzo (CO), Italia</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'c68a1b19-6eab-500d-8b69-6fecf84d3be7',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-introduction',
  1,
  true,
  '{"en":"Introduction","it":"Introduzione"}'::jsonb,
  '{"en":"<p>Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit or interact with our website.</p>\n<p>Please read it carefully to understand your rights and our responsibilities.</p>\n<p>Hand Line Company S.r.l. is the controller and responsible for your personal data (collectively referred to as \"Hand Line Company\",\" Hand Line\", \"we\", \"us\", or \"our\" in this Privacy Policy).</p>","it":"<p>La tua privacy è importante per noi. La presente Informativa sulla Privacy spiega come raccogliamo, utilizziamo, condividiamo e proteggiamo i tuoi dati personali quando visiti o interagisci con il nostro sito web.</p>\n<p>Ti invitiamo a leggerla attentamente per comprendere i tuoi diritti e le nostre responsabilità.</p>\n<p>Hand Line Company S.r.l. è il titolare del trattamento ed è responsabile dei tuoi dati personali (collettivamente indicata come \"Hand Line Company\", \"Hand Line\", \"noi\", o \"nostro/a/i/e\" nella presente Informativa sulla Privacy).</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'cdf76370-5e9d-5a56-8805-4eed35d845bd',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-what-information-we-collect',
  2,
  true,
  '{"en":"What information we collect","it":"Quali dati raccogliamo"}'::jsonb,
  '{"en":"<p>We may collect the following types of information:</p>\n<ul>\n<li><strong>Personal Information:</strong> such as your name, email address, phone number, mailing address, and any other information you choose to provide</li>\n<li><strong>Technical Information:</strong> including your browser type, operating system, IP address, referring page, and device information</li>\n<li><strong>Location information:</strong> Information about your general location, derived from your IP address</li>\n<li><strong>Usage Data:</strong> Information about how you use our services, such as the pages you visit, the time you spend on our site, and the links you click on</li>\n<li><strong>Account information:</strong> Information you provide when you create an account with us, including username and password</li>\n</ul>","it":"<p>Possiamo raccogliere i seguenti tipi di informazioni:</p>\n<ul>\n<li><strong>Dati personali:</strong> come nome, indirizzo email, numero di telefono, indirizzo postale e qualsiasi altra informazione tu scelga di fornire.</li>\n<li><strong>Informazioni tecniche:</strong> tipo di browser, sistema operativo, indirizzo IP, pagina di provenienza, e informazioni sul dispositivo.</li>\n<li><strong>Dati di geolocalizzazione:</strong> informazioni generali sulla tua posizione, derivate dal tuo indirizzo IP.</li>\n<li><strong>Dati di utilizzo:</strong> informazioni su come utilizzi i nostri servizi, ad esempio le pagine visitate, il tempo trascorso sul sito, i link cliccati.</li>\n<li><strong>Dati dell''account:</strong> informazioni fornite al momento della creazione di un account, incluso username e password.</li>\n</ul>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '2721d49c-4f01-51a6-ac7b-d7e923b0e005',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-how-we-collect-information',
  3,
  true,
  '{"en":"How we collect information","it":"Come raccogliamo i dati"}'::jsonb,
  '{"en":"<p>We may collect information:</p>\n<ul>\n<li>When you fill in forms, sign up for newsletters, or contact us directly</li>\n<li>Through automated tracking technologies as you browse our site</li>\n<li>From third-party partners, such as analytics or advertising providers</li>\n</ul>\n<p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>\n<p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>\n<p>Please refer to our Cookie Policy for more information.</p>","it":"<p>Raccogliamo dati:</p>\n<ul>\n<li>Quando compili moduli, ti iscrivi alla newsletter o ci contatti direttamente.</li>\n<li>Tramite tecnologie di tracciamento automatico mentre navighi sul nostro sito.</li>\n<li>Da partner terzi, come fornitori di analisi o pubblicità.</li>\n</ul>\n<p>Utilizziamo cookie e tecnologie simili per monitorare l''attività sul nostro servizio e conservare alcune informazioni. I cookie sono file con una piccola quantità di dati che possono includere un identificativo univoco anonimo.</p>\n<p>Puoi configurare il tuo browser per rifiutare tutti i cookie o per avvisarti quando un cookie viene inviato. Tuttavia, se non accetti i cookie, potresti non essere in grado di utilizzare alcune parti del nostro servizio.</p>\n<p>Per maggiori informazioni, consulta la nostra Cookie Policy.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '10c4a383-9397-5198-a8d4-a6197770c3bc',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-how-we-use-your-information',
  4,
  true,
  '{"en":"How we use your information","it":"Come utilizziamo i tuoi dati"}'::jsonb,
  '{"en":"<p>We collect information to:</p>\n<ul>\n<li>provide and maintain our website and services</li>\n<li>respond to your requests and communicate with you</li>\n<li>provide customer support</li>\n<li>analyse and improve our website''s performance and user experience</li>\n<li>monitor the use of our services</li>\n<li>comply with legal requirements</li>\n<li>protect against fraud and ensure security</li>\n<li>detect, prevent and address technical issues</li>\n<li>For marketing purposes, if you have consented</li>\n</ul>","it":"<p>Utilizziamo i dati per:</p>\n<ul>\n<li>fornire e mantenere il nostro sito web e i nostri servizi</li>\n<li>rispondere alle tue richieste e comunicare con te</li>\n<li>fornire assistenza clienti</li>\n<li>analizzare e migliorare le prestazioni del sito e l''esperienza utente</li>\n<li>monitorare l''utilizzo dei servizi</li>\n<li>rispettare gli obblighi legali</li>\n<li>prevenire frodi e garantire la sicurezza</li>\n<li>individuare, prevenire e risolvere problemi tecnici</li>\n<li>scopi di marketing, se hai fornito il consenso</li>\n</ul>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'f31f7b68-5106-5242-9ce1-4527379183b9',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-how-we-share-your-information',
  5,
  true,
  '{"en":"How we share your information","it":"Condivisione dei tuoi dati"}'::jsonb,
  '{"en":"<p>We may share your information:</p>\n<ul>\n<li><strong>Our affiliates:</strong> We share your information across the company and its affiliates</li>\n<li><strong>Service providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer service</li>\n<li><strong>Business partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions</li>\n<li><strong>Legal requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities</li>\n</ul>\n<p><strong>We do not sell your personal information to third parties.</strong></p>","it":"<p>Possiamo condividere i tuoi dati con:</p>\n<ul>\n<li><strong>Le nostre affiliate:</strong> condividiamo i dati all''interno del gruppo Hand Line Company</li>\n<li><strong>Fornitori di servizi:</strong> condividiamo i dati con terze parti che forniscono servizi per nostro conto, come hosting, analisi, pagamenti e assistenza clienti</li>\n<li><strong>Partner commerciali:</strong> possiamo condividere i dati con partner per offrirti prodotti, servizi o promozioni</li>\n<li><strong>Obblighi legali:</strong> possiamo divulgare i dati se richiesto dalla legge o da autorità competenti</li>\n</ul>\n<p><strong>Non vendiamo i tuoi dati personali a terzi.</strong></p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'dba1e461-9a50-532f-8242-7e0c0cd8fab3',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-data-security-retention',
  6,
  true,
  '{"en":"Data security & retention","it":"Sicurezza e conservazione dei dati"}'::jsonb,
  '{"en":"<p>We use reasonable measures to protect your data, including encryption and secure storage. We keep your information only as long as necessary for the purposes described or as required by law, after which it will be securely deleted or anonymised.</p>\n<p>We have implemented appropriate technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>","it":"<p>Adottiamo misure ragionevoli per proteggere i tuoi dati, inclusa la crittografia e l''archiviazione sicura. Conserveremo i dati solo per il tempo necessario a soddisfare gli scopi dichiarati o come richiesto dalla legge. Successivamente verranno cancellati o resi anonimi.</p>\n<p>Nonostante le nostre precauzioni, nessuna trasmissione via Internet o tecnologia di archiviazione può essere garantita al 100% sicura.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '3b95e9f4-f677-56b3-b22e-e2f5dd8794be',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-your-rights',
  7,
  true,
  '{"en":"Your rights","it":"I tuoi diritti"}'::jsonb,
  '{"en":"<p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>\n<ul>\n<li>The right to access, update or delete the information we have on you</li>\n<li>The right of rectification (to correct information that is inaccurate or incomplete)</li>\n<li>The right to object to our processing of your personal data</li>\n<li>The right of restriction (to request that we restrict the processing of your personal data)</li>\n<li>The right to data portability (to request a copy of your data in a structured, commonly used, machine-readable format)</li>\n<li>The right to withdraw consent at any time, where we rely on your consent to process your personal information</li>\n</ul>\n<p>Contact us to exercise your rights or for any privacy-related questions.</p>","it":"<p>Hai alcuni diritti in materia di protezione dei dati personali, tra cui:</p>\n<ul>\n<li>Il diritto di accedere, aggiornare o cancellare i tuoi dati</li>\n<li>Il diritto di rettifica dei dati inesatti o incompleti</li>\n<li>Il diritto di opporti al trattamento</li>\n<li>Il diritto di limitare il trattamento</li>\n<li>Il diritto alla portabilità dei dati</li>\n<li>Il diritto di revocare il consenso in qualsiasi momento (se il trattamento è basato sul consenso)</li>\n</ul>\n<p>Contattaci per esercitare i tuoi diritti o per qualsiasi domanda sulla privacy.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '2dd59693-7770-5ccc-b6a0-9cf6867f4a60',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-childrens-privacy',
  8,
  true,
  '{"en":"Children''s privacy","it":"Privacy dei minori"}'::jsonb,
  '{"en":"<p>Our website is not intended for children under the age of 16, and we do not knowingly collect personal data from minors. If you are a parent or guardian and believe we may have collected personal information from a child, please contact us.</p>","it":"<p>Il nostro sito non è destinato ai minori di 16 anni e non raccogliamo consapevolmente dati personali da minori. Se sei un genitore o tutore e ritieni che potremmo aver raccolto informazioni da un minore, contattaci.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'ee8f007b-7f10-5f48-9619-724c23d583c6',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-international-transfers',
  9,
  true,
  '{"en":"International transfers","it":"Trasferimenti internazionali"}'::jsonb,
  '{"en":"<p>Your information may be transferred and processed outside your country. We take steps to protect your data in accordance with this policy.</p>","it":"<p>I tuoi dati possono essere trasferiti e trattati al di fuori del tuo paese. Adottiamo misure per proteggerli in conformità con questa politica.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '1fe5de18-b6de-5f02-8d02-846bffde2c15',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-changes-to-this-policy',
  10,
  true,
  '{"en":"Changes to this policy","it":"Modifiche alla presente informativa"}'::jsonb,
  '{"en":"<p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date at the top of this Privacy Policy.</p>\n<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>","it":"<p>Potremmo aggiornare periodicamente questa Informativa sulla Privacy. Le modifiche verranno pubblicate in questa pagina con la data di aggiornamento.</p>\n<p>Ti invitiamo a consultare regolarmente questa pagina per restare informato.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '39dd87ce-8746-5b74-b88e-5852377ff7de',
  'c27ee802-df4e-591b-b148-9bb0044ed3bf',
  'privacy-contact-us',
  11,
  true,
  '{"en":"Contact us","it":"Contatti"}'::jsonb,
  '{"en":"<p>If you have questions about this Privacy Policy, please contact us at:</p>\n<p><strong>Email:</strong> privacy@handlineco.com</p>\n<p><strong>Mail:</strong> Privacy Office, Hand Line Company S.r.l. Via Brusa 34. 22035, Canzo (Co) Italy.</p>","it":"<p>Per qualsiasi domanda relativa alla privacy, contattaci:</p>\n<p><strong>📧 Email:</strong> privacy@handlineco.com</p>\n<p><strong>📬 Posta:</strong> Ufficio Privacy, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italia.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '83a015ec-064d-547b-b437-eee8d3a3cdc6',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-introduction',
  1,
  true,
  '{"en":"Introduction","it":"Introduzione"}'::jsonb,
  '{"en":"<p>This Cookie Policy explains how Hand Line Company S.r.l. and its affiliates (\"we\", \"us\", or \"our\") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this Cookie Policy.</p>","it":"<p>La presente infomativa spiega come Hand Line Company S.r.l. e le sue affiliate (\"noi\") utilizzano i cookie e tecnologie simili sul nostro sito web. Utilizzando il nostro sito, acconsenti all''uso dei cookie come descritto in questa informativa.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '89c4d083-963b-52a7-bac7-a554314d0430',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-what-are-cookies',
  2,
  true,
  '{"en":"What are cookies?","it":"Cosa sono i cookie?"}'::jsonb,
  '{"en":"<p>Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They allow the website to recognise your device and remember if you''ve been to the website before. Cookies are widely used to make websites work more efficiently, provide a better user experience, and to provide information to the owners of the site.</p>\n<p>Cookies set by the website owner (us) are called \"first-party cookies\".</p>\n<p>Cookies set by parties other than the website owner are called \"third-party cookies\". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).</p>","it":"<p>I cookie sono piccoli file di testo memorizzati sul tuo dispositivo (computer, tablet o smartphone) quando visiti un sito web. Permettono al sito di riconoscere il tuo dispositivo e ricordare se hai già visitato il sito in passato.</p>\n<p>I cookie sono ampiamente utilizzati per far funzionare i siti in modo più efficiente, migliorare l''esperienza dell''utente e fornire informazioni ai gestori del sito.</p>\n<p>I cookie impostati direttamente dal proprietario del sito (cioè noi) sono detti cookie di prima parte. I cookie impostati da soggetti terzi sono detti cookie di terze parti, e abilitano funzionalità esterne come pubblicità, contenuti interattivi o analisi.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '70a2202f-bfa5-525c-99bf-f692d18612d2',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-why-we-use-cookies',
  3,
  true,
  '{"en":"Why we use cookies","it":"Perché usiamo i cookie"}'::jsonb,
  '{"en":"<p>We use cookies to provide a smooth and secure website experience that is personalised (remember your settings and preferences) and relevant to each individual user.</p>\n<p>We also gather statistics and understand how visitors use our site to optimise the website and products/services we offer.</p>","it":"<p>Utilizziamo i cookie per garantire un''esperienza di navigazione fluida, sicura e personalizzata (ad esempio ricordando le tue preferenze).</p>\n<p>Inoltre, ci aiutano a raccogliere statistiche e capire come gli utenti interagiscono con il sito per migliorarne il contenuto e i servizi offerti.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '1259b87f-cd60-5b8c-88dc-d4674c0e84f6',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-types-of-cookies-we-use',
  4,
  true,
  '{"en":"Types of cookies we use","it":"Tipi di cookie che utilizziamo"}'::jsonb,
  '{"en":"<p>We use the following types of cookies:</p>\n<ul>\n<li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.</li>\n<li><strong>Performance Cookies:</strong> These cookies help us to improve the way our website works by collecting information about how visitors use our site, such as which pages visitors go to most often.</li>\n<li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, more personal features.</li>\n<li><strong>Analytics Cookies:</strong> These cookies collect information about how visitors use a website, for instance which pages visitors go to most often, and if they get error messages from web pages.</li>\n<li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>\n</ul>","it":"<table class=\"w-full border-collapse border border-gray-300 mt-4\">\n<thead>\n<tr class=\"bg-gray-100\">\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Tipo di Cookie</th>\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Descrizione</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookie essenziali</td>\n<td class=\"border border-gray-300 p-2\">Necessari per il funzionamento del sito. Consentono funzionalità base come la sicurezza, la gestione della rete e l''accesso all''account. Disattivarli potrebbe compromettere il corretto funzionamento del sito.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookie di performance</td>\n<td class=\"border border-gray-300 p-2\">Raccolgono informazioni su come gli utenti utilizzano il sito, ad esempio le pagine più visitate, per aiutarci a migliorare la navigazione.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookie funzionali</td>\n<td class=\"border border-gray-300 p-2\">Memorizzano le preferenze dell''utente (come nome utente, lingua o regione) per offrire un''esperienza più personalizzata.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookie analitici</td>\n<td class=\"border border-gray-300 p-2\">Rilevano informazioni sull''uso del sito, come errori o frequenza delle visite, per migliorare i contenuti.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookie di targeting</td>\n<td class=\"border border-gray-300 p-2\">Tracciano le pagine visitate e i link cliccati, per rendere i contenuti e le pubblicità più pertinenti ai tuoi interessi.</td>\n</tr>\n</tbody>\n</table>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '1939cd94-d378-56c6-ba83-a00953713b81',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-managing-your-cookie-preferences',
  5,
  true,
  '{"en":"Managing your cookie preferences","it":"Gestione delle preferenze sui cookie"}'::jsonb,
  '{"en":"<p>You can control and manage cookies through your browser settings. You can accept, reject, or delete cookies at any time. Note that disabling essential cookies may affect functionality of certain features on our site.</p>\n<p>You can find more information about cookies and how to manage them in your browser using the links below:</p>\n<ul>\n<li><a href=\"https://support.google.com/chrome/answer/95647\" target=\"_blank\" rel=\"noopener noreferrer\">Google Chrome</a></li>\n<li><a href=\"https://support.microsoft.com/en-gb/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd\" target=\"_blank\" rel=\"noopener noreferrer\">Microsoft Edge</a></li>\n<li><a href=\"https://support.apple.com/en-gb/guide/safari/sfri11471/mac\" target=\"_blank\" rel=\"noopener noreferrer\">Safari</a></li>\n</ul>","it":"<p>Puoi gestire i cookie tramite le impostazioni del tuo browser. In qualsiasi momento puoi accettare, rifiutare o eliminare i cookie.</p>\n<p>Disattivare i cookie essenziali può compromettere alcune funzionalità del sito.</p>\n<p>Per maggiori informazioni sulla gestione dei cookie nei browser più comuni:</p>\n<ul>\n<li><a href=\"https://support.google.com/chrome/answer/95647\" target=\"_blank\" rel=\"noopener noreferrer\">Google Chrome</a></li>\n<li><a href=\"https://support.microsoft.com/en-gb/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd\" target=\"_blank\" rel=\"noopener noreferrer\">Microsoft Edge</a></li>\n<li><a href=\"https://support.apple.com/en-gb/guide/safari/sfri11471/mac\" target=\"_blank\" rel=\"noopener noreferrer\">Safari</a></li>\n</ul>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  'b276c2c1-43c9-5d39-bf5c-c879f1383336',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-third-party-cookies',
  6,
  true,
  '{"en":"Third-party cookies","it":"Cookie di terze parti"}'::jsonb,
  '{"en":"<p>We may allow third-party services, such as analytics or advertisers, to place cookies on your device. Their use of cookies is governed by their own privacy and cookie policies.</p>","it":"<p>Potremmo consentire a fornitori terzi (es. servizi di analisi o pubblicità) di impostare cookie sul tuo dispositivo. L''uso dei cookie da parte di questi soggetti è disciplinato dalle loro rispettive privacy e cookie policy.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '79d908ef-4bf9-50f4-9eb7-d4a6f0a190cb',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-changes-to-this-policy',
  7,
  true,
  '{"en":"Changes to this policy","it":"Modifiche a questa informativa"}'::jsonb,
  '{"en":"<p>We may update our Cookie Policy from time to time. Any changes will be posted on this page and will become effective immediately upon posting. We encourage you to periodically review this Cookie Policy to stay informed about how we use cookies.</p>","it":"<p>Potremmo aggiornare periodicamente la presente informativa. Le modifiche saranno pubblicate su questa pagina ed entreranno in vigore al momento della pubblicazione.</p>\n<p>Ti invitiamo a consultare regolarmente questa Cookie Policy per restare informato sull''utilizzo dei cookie.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

INSERT INTO public.legal_sections (id, document_id, slug, sort_order, published, title_locales, content_locales)
VALUES (
  '11c6405c-4178-5e97-8ad1-d33c8c3b1349',
  '7e330964-77db-53e4-bdec-e05515299817',
  'cookies-contact-us',
  8,
  true,
  '{"en":"Contact Us","it":"Contatti"}'::jsonb,
  '{"en":"<p>If you have questions or concerns about our use of cookies, please contact us at:</p>\n<p><strong>Email:</strong> privacy@handlineco.com</p>\n<p><strong>Mail:</strong> Privacy Office, Hand Line Company S.r.l. Via Brusa 34. 22035, Canzo (Co) Italy.</p>","it":"<p>Per domande o dubbi sull''uso dei cookie, contattaci:</p>\n<p><strong>📧 Email:</strong> privacy@handlineco.com</p>\n<p><strong>📬 Posta:</strong> Ufficio Privacy, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italia.</p>"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  document_id = EXCLUDED.document_id,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order,
  title_locales = public.legal_sections.title_locales || EXCLUDED.title_locales,
  content_locales = public.legal_sections.content_locales || EXCLUDED.content_locales,
  updated_at = now();

COMMIT;
