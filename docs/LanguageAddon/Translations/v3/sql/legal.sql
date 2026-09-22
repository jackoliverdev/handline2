-- Legal locale merge — FR/DE/ES only
-- Live tables already exist: legal_documents (3 rows) and legal_sections (29 rows).
-- IDs and slugs match the v3 sheet. EN/IT on those rows already match the live copy
-- except the sheet dated last-update as 2026; live EN/IT and content/legal.ts are 2025,
-- so this file does not overwrite English or Italian.
-- Data-only UPDATE. No CREATE TABLE. No INSERT. No GRANT.

BEGIN;

-- legal_documents terms
UPDATE legal_documents
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Conditions d''Utilisation"'::jsonb,
    'de', '"Nutzungsbedingungen"'::jsonb,
    'es', '"Términos de Uso"'::jsonb
  ),
  last_updated_locales = COALESCE(last_updated_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Dernière mise à jour : 4 août 2025"'::jsonb,
    'de', '"Letzte Aktualisierung: 4. August 2025"'::jsonb,
    'es', '"Última actualización: 4 de agosto de 2025"'::jsonb
  ),
  updated_at = now()
WHERE id = '27afffe8-e25f-5afa-8520-d349e0d73873';


-- legal_documents privacy
UPDATE legal_documents
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Politique de Confidentialité"'::jsonb,
    'de', '"Datenschutzerklärung"'::jsonb,
    'es', '"Política de Privacidad"'::jsonb
  ),
  last_updated_locales = COALESCE(last_updated_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Dernière mise à jour : 4 août 2025"'::jsonb,
    'de', '"Letzte Aktualisierung: 4. August 2025"'::jsonb,
    'es', '"Última actualización: 4 de agosto de 2025"'::jsonb
  ),
  updated_at = now()
WHERE id = 'c27ee802-df4e-591b-b148-9bb0044ed3bf';


-- legal_documents cookies
UPDATE legal_documents
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Politique relative aux Cookies"'::jsonb,
    'de', '"Cookie-Richtlinie"'::jsonb,
    'es', '"Política de Cookies"'::jsonb
  ),
  last_updated_locales = COALESCE(last_updated_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Dernière mise à jour : 4 août 2025"'::jsonb,
    'de', '"Letzte Aktualisierung: 4. August 2025"'::jsonb,
    'es', '"Última actualización: 4 de agosto de 2025"'::jsonb
  ),
  updated_at = now()
WHERE id = '7e330964-77db-53e4-bdec-e05515299817';


-- legal_sections terms-introduction
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Introduction"'::jsonb,
    'de', '"Einleitung"'::jsonb,
    'es', '"Introducción"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Les présentes Conditions d''Utilisation sont conclues entre l''utilisateur et Hand Line Company S.r.l. et ses sociétés affiliées (« Hand Line », « nous », « notre » ou « nos »). Les conditions suivantes régissent l''accès et l''utilisation de notre site web (le « Site »), et s''étendent à l''ensemble des contenus, fonctionnalités et services mis à disposition par son intermédiaire, que ce soit en tant qu''utilisateur invité ou utilisateur enregistré.</p>\n<p>En accédant à ce Site ou en l''utilisant, vous acceptez d''être lié par les présentes Conditions d''Utilisation, ainsi que par notre Politique de Confidentialité, notre Politique relative aux Cookies et, le cas échéant, nos Conditions de Vente. Si vous n''acceptez pas ces conditions, veuillez ne pas utiliser le Site.</p>"'::jsonb,
    'de', '"<p>Die vorliegenden Nutzungsbedingungen werden zwischen dem Nutzer und der Hand Line Company S.r.l. sowie ihren verbundenen Unternehmen (\"Hand Line\", \"wir\", \"uns\" oder \"unser\") geschlossen. Die folgenden Bedingungen regeln den Zugang zu und die Nutzung unserer Website (die \"Website\") und erstrecken sich auf sämtliche Inhalte, Funktionen und Dienste, die über sie zur Verfügung gestellt werden, sowohl für Gastnutzer als auch für registrierte Nutzer.</p>\n<p>Durch den Zugriff auf diese Website oder deren Nutzung erklären Sie sich damit einverstanden, an die vorliegenden Nutzungsbedingungen sowie an unsere Datenschutzerklärung, unsere Cookie-Richtlinie und, sofern anwendbar, unsere Verkaufsbedingungen gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, bitten wir Sie, die Website nicht zu nutzen.</p>"'::jsonb,
    'es', '"<p>Los presentes Términos de Uso se celebran entre el usuario y Hand Line Company S.r.l. y sus filiales (\"Hand Line\", \"nosotros\" o \"nuestro\"). Los siguientes términos regulan el acceso y el uso de nuestro sitio web (el \"Sitio\"), y se extienden a todos los contenidos, funcionalidades y servicios puestos a disposición a través de él, ya sea como usuario invitado o como usuario registrado.</p>\n<p>Al acceder o utilizar este Sitio, aceptas quedar vinculado por los presentes Términos de Uso, así como por nuestra Política de Privacidad, nuestra Política de Cookies y, si corresponde, nuestros Términos de Venta. Si no aceptas estos términos, te rogamos que no utilices el Sitio.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '103c03e6-79c2-538b-8a44-40cbedc2b437';


-- legal_sections terms-eligibility
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Conditions d''âge"'::jsonb,
    'de', '"Altersanforderungen"'::jsonb,
    'es', '"Requisitos de edad"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Ce Site est destiné aux utilisateurs âgés d''au moins 16 ans. En utilisant le Site, vous confirmez remplir cette condition.</p>"'::jsonb,
    'de', '"<p>Diese Website richtet sich an Nutzer, die mindestens 16 Jahre alt sind. Durch die Nutzung der Website bestätigen Sie, dass Sie diese Voraussetzung erfüllen.</p>"'::jsonb,
    'es', '"<p>Este Sitio está destinado a usuarios de al menos 16 años de edad. Al utilizar el Sitio, confirmas que cumples con este requisito.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '620f29c0-fb87-539c-bedd-ac75f2c04f5c';


-- legal_sections terms-intellectual-property-and-use-of-content
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Propriété intellectuelle et utilisation des contenus"'::jsonb,
    'de', '"Geistiges Eigentum und Nutzung der Inhalte"'::jsonb,
    'es', '"Propiedad intelectual y uso de los contenidos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Le Site et son contenu, y compris, sans s''y limiter, les textes, graphiques, logos, images, contenus audio, vidéos et logiciels, sont la propriété de Hand Line ou de ses concédants de licence et sont protégés par les lois en vigueur en matière de propriété intellectuelle. Le Site ne peut être utilisé qu''à des fins personnelles et non commerciales. Il est interdit de reproduire, distribuer, modifier ou afficher publiquement toute partie du Site sans consentement écrit explicite.</p>\n<p>Vous acceptez d''utiliser le Site exclusivement à des fins licites. Il est interdit de :</p>\n<ul>\n<li>Violer des lois locales ou internationales</li>\n<li>Tenter d''accéder de manière non autorisée au Site ou de compromettre son fonctionnement</li>\n<li>Utiliser le Site pour envoyer des spams ou des logiciels malveillants</li>\n<li>Usurper l''identité d''une personne ou d''une entité</li>\n<li>Utiliser les contenus à des fins commerciales sans autorisation</li>\n<li>Envoyer ou faire envoyer du matériel publicitaire ou promotionnel non sollicité</li>\n<li>Adopter des comportements qui limitent ou entravent l''utilisation du Site par d''autres utilisateurs, ou qui pourraient porter préjudice à Hand Line ou à d''autres utilisateurs</li>\n</ul>"'::jsonb,
    'de', '"<p>Die Website und ihre Inhalte, einschließlich, aber nicht beschränkt auf Texte, Grafiken, Logos, Bilder, Audio- und Videomaterial sowie Software, sind Eigentum von Hand Line oder seinen Lizenzgebern und werden durch die geltenden Gesetze zum geistigen Eigentum geschützt. Die Website darf ausschließlich für persönliche und nicht kommerzielle Zwecke genutzt werden. Es ist nicht gestattet, Teile der Website ohne ausdrückliche schriftliche Zustimmung zu vervielfältigen, zu verbreiten, zu verändern oder öffentlich zugänglich zu machen.</p>\n<p>Sie verpflichten sich, die Website ausschließlich für rechtmäßige Zwecke zu nutzen. Nicht gestattet ist es:</p>\n<ul>\n<li>gegen lokale oder internationale Gesetze zu verstoßen</li>\n<li>zu versuchen, unbefugt auf die Website zuzugreifen oder deren Funktionsweise zu beeinträchtigen</li>\n<li>die Website zum Versand von Spam oder schädlicher Software zu nutzen</li>\n<li>sich als eine andere Person oder Einrichtung auszugeben</li>\n<li>die Inhalte ohne Genehmigung für kommerzielle Zwecke zu nutzen</li>\n<li>unaufgefordertes Werbe- oder Promotionmaterial zu versenden oder versenden zu lassen</li>\n<li>Verhaltensweisen an den Tag zu legen, die die Nutzung der Website durch andere einschränken oder behindern oder die Hand Line oder anderen Nutzern schaden könnten</li>\n</ul>"'::jsonb,
    'es', '"<p>El Sitio y sus contenidos, incluidos, entre otros, textos, gráficos, logotipos, imágenes, audio, vídeo y software, son propiedad de Hand Line o de sus licenciantes y están protegidos por las leyes vigentes en materia de propiedad intelectual. El Sitio solo puede utilizarse con fines personales y no comerciales. No está permitido reproducir, distribuir, modificar o mostrar públicamente ninguna parte del Sitio sin el consentimiento previo y expreso por escrito.</p>\n<p>Aceptas utilizar el Sitio exclusivamente para fines lícitos. No está permitido:</p>\n<ul>\n<li>Vulnerar leyes locales o internacionales</li>\n<li>Intentar acceder de forma no autorizada o comprometer el funcionamiento del Sitio</li>\n<li>Utilizar el Sitio para enviar spam o software dañino</li>\n<li>Suplantar la identidad de cualquier persona o entidad</li>\n<li>Utilizar los contenidos con fines comerciales sin autorización</li>\n<li>Enviar o hacer enviar material publicitario o promocional no solicitado</li>\n<li>Adoptar comportamientos que limiten u obstaculicen el uso del Sitio por parte de otros usuarios o que puedan perjudicar a Hand Line o a otros usuarios</li>\n</ul>"'::jsonb
  ),
  updated_at = now()
WHERE id = '77ec1774-5d9c-5f07-991d-5a6627993e3b';


-- legal_sections terms-account-registration
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Inscription du compte"'::jsonb,
    'de', '"Kontoregistrierung"'::jsonb,
    'es', '"Registro de cuenta"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Pour accéder à certaines fonctionnalités, il peut être nécessaire de s''inscrire. Vous acceptez de fournir des informations exactes et à jour lors de l''inscription et de les tenir à jour.</p>\n<p>Vous êtes responsable de la protection de votre mot de passe et de l''utilisation de votre compte. Nous vous recommandons d''utiliser des mots de passe sécurisés (combinaison de lettres majuscules/minuscules, de chiffres et de symboles).</p>"'::jsonb,
    'de', '"<p>Für den Zugriff auf bestimmte Funktionen kann eine Registrierung erforderlich sein. Sie verpflichten sich, bei der Registrierung genaue und aktuelle Informationen anzugeben und diese auf dem neuesten Stand zu halten.</p>\n<p>Sie sind für den Schutz Ihres Passworts und die Nutzung Ihres Kontos verantwortlich. Wir empfehlen Ihnen, sichere Passwörter zu verwenden (Kombination aus Groß-/Kleinbuchstaben, Zahlen und Symbolen).</p>"'::jsonb,
    'es', '"<p>Para acceder a determinadas funcionalidades, puede ser necesario registrarse. Aceptas proporcionar información precisa y actualizada durante el registro, así como mantenerla actualizada.</p>\n<p>Eres responsable de proteger tu contraseña y del uso de tu cuenta. Te recomendamos utilizar contraseñas seguras (combinación de letras mayúsculas/minúsculas, números y símbolos).</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'e6d38833-3e31-5dc7-8bf1-892356b8e6a7';


-- legal_sections terms-linking-to-our-website
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Liens vers notre site"'::jsonb,
    'de', '"Links zu unserer Website"'::jsonb,
    'es', '"Enlaces a nuestro sitio"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Vous pouvez créer un lien vers notre page d''accueil de manière loyale et licite, à condition que cela n''implique aucune affiliation ou approbation de notre part sans consentement explicite. Nous nous réservons le droit de révoquer l''autorisation de lien à tout moment et sans préavis.</p>"'::jsonb,
    'de', '"<p>Sie dürfen auf faire und rechtmäßige Weise auf unsere Startseite verlinken, sofern dies ohne unsere ausdrückliche Zustimmung keine Verbindung mit uns oder eine Billigung unsererseits suggeriert. Wir behalten uns das Recht vor, die Erlaubnis zur Verlinkung jederzeit und ohne Vorankündigung zu widerrufen.</p>"'::jsonb,
    'es', '"<p>Puedes enlazar a nuestra página de inicio de manera leal y lícita, siempre que ello no implique ninguna afiliación o aprobación por nuestra parte sin nuestro consentimiento expreso. Nos reservamos el derecho de revocar el permiso de enlace en cualquier momento y sin previo aviso.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'eb15c89f-ebad-5fc6-b4a3-64efa85c329c';


-- legal_sections terms-disclaimer-of-warranties
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Exclusion de garanties"'::jsonb,
    'de', '"Gewährleistungsausschluss"'::jsonb,
    'es', '"Exclusión de garantías"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Le Site est fourni « en l''état » et « selon disponibilité », sans garantie d''aucune sorte. Hand Line ne garantit pas l''exactitude, l''exhaustivité ou la fiabilité des contenus. Dans les limites permises par la loi, nous déclinons toute garantie, expresse ou implicite.</p>"'::jsonb,
    'de', '"<p>Die Website wird \"wie besehen\" und \"wie verfügbar\" bereitgestellt, ohne jegliche Gewährleistung. Hand Line übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Zuverlässigkeit der Inhalte. Soweit gesetzlich zulässig, schließen wir jegliche ausdrückliche oder stillschweigende Gewährleistung aus.</p>"'::jsonb,
    'es', '"<p>El Sitio se proporciona \"tal cual\" y \"según disponibilidad\", sin garantía de ningún tipo. Hand Line no garantiza la exactitud, integridad o fiabilidad de los contenidos. En la medida permitida por la ley, rechazamos cualquier garantía, expresa o implícita.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'dd90bd35-fc82-5573-965f-66202bf4e36d';


-- legal_sections terms-limitation-of-liability
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Limitation de responsabilité"'::jsonb,
    'de', '"Haftungsbeschränkung"'::jsonb,
    'es', '"Limitación de responsabilidad"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Hand Line, ses dirigeants, employés, agents, fournisseurs ou sociétés affiliées ne seront pas responsables des dommages indirects, accidentels, spéciaux, consécutifs ou punitifs, y compris, à titre d''exemple non exhaustif, la perte de profits, de données, d''usage, de clientèle ou d''autres préjudices immatériels résultant de l''accès au Site ou de son utilisation.</p>\n<p>Par ailleurs, nous déclinons toute responsabilité quant au contenu éventuel de sites externes accessibles via des liens présents sur notre Site. Le lien n''implique aucune approbation des contenus de notre part.</p>"'::jsonb,
    'de', '"<p>Hand Line, seine Geschäftsführer, Mitarbeiter, Vertreter, Lieferanten oder verbundenen Unternehmen haften nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, einschließlich, aber nicht beschränkt auf entgangenen Gewinn, Datenverlust, Nutzungsausfall, Verlust des Geschäftswerts oder andere immaterielle Schäden, die sich aus dem Zugriff auf die Website oder deren Nutzung ergeben.</p>\n<p>Darüber hinaus übernehmen wir keine Verantwortung für etwaige Inhalte auf externen Websites, die über Links auf unserer Website zugänglich sind. Die Verlinkung stellt keine Billigung der Inhalte durch uns dar.</p>"'::jsonb,
    'es', '"<p>Hand Line, sus directores, empleados, agentes, proveedores o filiales no serán responsables de los daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidos, entre otros, la pérdida de beneficios, datos, uso, fondo de comercio u otros daños intangibles derivados del acceso o el uso del Sitio.</p>\n<p>Asimismo, rechazamos toda responsabilidad por los contenidos que puedan existir en sitios externos accesibles a través de enlaces presentes en nuestro Sitio. El enlace no implica ninguna aprobación de dichos contenidos por nuestra parte.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '9972ec0a-a8e7-54f0-9b63-0d46e3a8a5f1';


-- legal_sections terms-governing-law-and-jurisdiction
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Droit applicable et juridiction compétente"'::jsonb,
    'de', '"Anwendbares Recht und Gerichtsstand"'::jsonb,
    'es', '"Ley aplicable y jurisdicción competente"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Les présentes Conditions sont régies par le droit italien. Tout litige découlant de l''utilisation du Site sera soumis à la juridiction exclusive de Côme (Como), Italie.</p>\n<p>Le fait de ne pas exercer un droit de notre part ne constituera pas une renonciation à ce droit. Si une clause des présentes Conditions devait être jugée invalide par un tribunal, les clauses restantes continueront de produire leurs pleins effets.</p>"'::jsonb,
    'de', '"<p>Die vorliegenden Bedingungen unterliegen italienischem Recht. Jegliche Streitigkeit, die sich aus der Nutzung der Website ergibt, unterliegt der ausschließlichen Zuständigkeit der Gerichte von Como, Italien.</p>\n<p>Die Nichtausübung eines Rechts durch uns stellt keinen Verzicht auf dieses Recht dar. Sollte eine Klausel der vorliegenden Bedingungen von einem Gericht für unwirksam erklärt werden, bleiben die übrigen Klauseln in vollem Umfang wirksam.</p>"'::jsonb,
    'es', '"<p>Los presentes Términos se rigen por la legislación italiana. Cualquier controversia derivada del uso del Sitio se someterá a la jurisdicción exclusiva de Como, Italia.</p>\n<p>La falta de ejercicio de cualquier derecho por nuestra parte no constituirá una renuncia a dicho derecho. Si un tribunal considerase inválida alguna cláusula de los presentes Términos, las restantes cláusulas seguirán teniendo plena vigencia.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '18730609-7e39-57e7-b184-b5696cc170c5';


-- legal_sections terms-changes-to-terms
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Modifications des Conditions"'::jsonb,
    'de', '"Änderungen der Bedingungen"'::jsonb,
    'es', '"Modificaciones de los Términos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous nous réservons le droit de modifier les présentes Conditions à tout moment. Les modifications seront publiées sur cette page et prendront effet immédiatement. La poursuite de l''utilisation du Site implique l''acceptation des modifications.</p>\n<p>En continuant à utiliser le Site après l''entrée en vigueur des modifications, vous acceptez d''être lié par les nouvelles conditions. Si vous n''êtes pas d''accord avec les modifications, vous n''êtes plus autorisé à utiliser nos services.</p>"'::jsonb,
    'de', '"<p>Wir behalten uns das Recht vor, die vorliegenden Bedingungen jederzeit zu ändern. Änderungen werden auf dieser Seite veröffentlicht und treten unmittelbar in Kraft. Die fortgesetzte Nutzung der Website gilt als Annahme der Änderungen.</p>\n<p>Wenn Sie die Website nach Inkrafttreten der Änderungen weiterhin nutzen, erklären Sie sich mit den neuen Bedingungen einverstanden. Wenn Sie mit den Änderungen nicht einverstanden sind, sind Sie nicht mehr berechtigt, unsere Dienste zu nutzen.</p>"'::jsonb,
    'es', '"<p>Nos reservamos el derecho de modificar los presentes Términos en cualquier momento. Las modificaciones se publicarán en esta página y entrarán en vigor de inmediato. El uso continuado del Sitio implica la aceptación de las modificaciones.</p>\n<p>Si continúas utilizando el Sitio después de la entrada en vigor de las modificaciones, aceptas quedar vinculado por los nuevos términos. Si no estás de acuerdo con las modificaciones, ya no estás autorizado a utilizar nuestros servicios.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '298a9c2a-f11f-5b23-8d2e-844745745523';


-- legal_sections terms-contact-information
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Contact"'::jsonb,
    'de', '"Kontakt"'::jsonb,
    'es', '"Contacto"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Pour toute question relative aux présentes Conditions d''Utilisation, veuillez nous contacter :</p>\n<p><strong>📧 E-mail :</strong> legal@handlineco.com</p>\n<p><strong>📬 Courrier :</strong> Bureau de la Confidentialité, Hand Line Company S.r.l., Via Brusa 34, 22035 Canzo (CO), Italie</p>"'::jsonb,
    'de', '"<p>Bei Fragen zu den vorliegenden Nutzungsbedingungen kontaktieren Sie uns bitte:</p>\n<p><strong>📧 E-Mail:</strong> legal@handlineco.com</p>\n<p><strong>📬 Post:</strong> Datenschutzbüro, Hand Line Company S.r.l., Via Brusa 34, 22035 Canzo (CO), Italien</p>"'::jsonb,
    'es', '"<p>Para cualquier consulta relacionada con los presentes Términos de Uso, contáctanos:</p>\n<p><strong>📧 Correo electrónico:</strong> legal@handlineco.com</p>\n<p><strong>📬 Correo postal:</strong> Oficina de Privacidad, Hand Line Company S.r.l., Via Brusa 34, 22035 Canzo (CO), Italia</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '79805398-f52d-59a0-9eca-fb52c51ff623';


-- legal_sections privacy-introduction
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Introduction"'::jsonb,
    'de', '"Einleitung"'::jsonb,
    'es', '"Introducción"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Votre confidentialité est importante pour nous. La présente Politique de Confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos données personnelles lorsque vous visitez ou interagissez avec notre site web.</p>\n<p>Nous vous invitons à la lire attentivement afin de comprendre vos droits et nos responsabilités.</p>\n<p>Hand Line Company S.r.l. est le responsable du traitement et est responsable de vos données personnelles (désignée collectivement par « Hand Line Company », « Hand Line », « nous » ou « notre/nos » dans la présente Politique de Confidentialité).</p>"'::jsonb,
    'de', '"<p>Ihre Privatsphäre ist uns wichtig. Die vorliegende Datenschutzerklärung erläutert, wie wir Ihre personenbezogenen Daten erheben, verwenden, weitergeben und schützen, wenn Sie unsere Website besuchen oder mit ihr interagieren.</p>\n<p>Wir bitten Sie, sie aufmerksam zu lesen, um Ihre Rechte und unsere Pflichten zu verstehen.</p>\n<p>Hand Line Company S.r.l. ist der für die Verarbeitung Verantwortliche und für Ihre personenbezogenen Daten verantwortlich (in dieser Datenschutzerklärung zusammenfassend als \"Hand Line Company\", \"Hand Line\", \"wir\" oder \"unser\" bezeichnet).</p>"'::jsonb,
    'es', '"<p>Tu privacidad es importante para nosotros. La presente Política de Privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos tus datos personales cuando visitas o interactúas con nuestro sitio web.</p>\n<p>Te invitamos a leerla atentamente para comprender tus derechos y nuestras responsabilidades.</p>\n<p>Hand Line Company S.r.l. es el responsable del tratamiento y es responsable de tus datos personales (denominada colectivamente \"Hand Line Company\", \"Hand Line\", \"nosotros\" o \"nuestro/a/os/as\" en la presente Política de Privacidad).</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'c68a1b19-6eab-500d-8b69-6fecf84d3be7';


-- legal_sections privacy-what-information-we-collect
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Quelles données nous collectons"'::jsonb,
    'de', '"Welche Daten wir erheben"'::jsonb,
    'es', '"Qué datos recopilamos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous pouvons collecter les types d''informations suivants :</p>\n<ul>\n<li><strong>Données personnelles :</strong> telles que le nom, l''adresse e-mail, le numéro de téléphone, l''adresse postale et toute autre information que vous choisissez de fournir.</li>\n<li><strong>Informations techniques :</strong> type de navigateur, système d''exploitation, adresse IP, page de provenance et informations sur l''appareil.</li>\n<li><strong>Données de géolocalisation :</strong> informations générales sur votre position, dérivées de votre adresse IP.</li>\n<li><strong>Données d''utilisation :</strong> informations sur la manière dont vous utilisez nos services, par exemple les pages visitées, le temps passé sur le site, les liens cliqués.</li>\n<li><strong>Données de compte :</strong> informations fournies lors de la création d''un compte, y compris le nom d''utilisateur et le mot de passe.</li>\n</ul>"'::jsonb,
    'de', '"<p>Wir können folgende Arten von Informationen erheben:</p>\n<ul>\n<li><strong>Personenbezogene Daten:</strong> wie Name, E-Mail-Adresse, Telefonnummer, Postanschrift und alle weiteren Informationen, die Sie freiwillig angeben.</li>\n<li><strong>Technische Informationen:</strong> Browsertyp, Betriebssystem, IP-Adresse, Herkunftsseite und Geräteinformationen.</li>\n<li><strong>Geolokalisierungsdaten:</strong> allgemeine Informationen zu Ihrem Standort, die aus Ihrer IP-Adresse abgeleitet werden.</li>\n<li><strong>Nutzungsdaten:</strong> Informationen darüber, wie Sie unsere Dienste nutzen, z. B. besuchte Seiten, auf der Website verbrachte Zeit, angeklickte Links.</li>\n<li><strong>Kontodaten:</strong> Informationen, die bei der Erstellung eines Kontos angegeben werden, einschließlich Benutzername und Passwort.</li>\n</ul>"'::jsonb,
    'es', '"<p>Podemos recopilar los siguientes tipos de información:</p>\n<ul>\n<li><strong>Datos personales:</strong> como nombre, dirección de correo electrónico, número de teléfono, dirección postal y cualquier otra información que decidas proporcionar.</li>\n<li><strong>Información técnica:</strong> tipo de navegador, sistema operativo, dirección IP, página de procedencia e información sobre el dispositivo.</li>\n<li><strong>Datos de geolocalización:</strong> información general sobre tu ubicación, derivada de tu dirección IP.</li>\n<li><strong>Datos de uso:</strong> información sobre cómo utilizas nuestros servicios, por ejemplo, las páginas visitadas, el tiempo transcurrido en el sitio, los enlaces en los que has hecho clic.</li>\n<li><strong>Datos de la cuenta:</strong> información proporcionada al crear una cuenta, incluidos el nombre de usuario y la contraseña.</li>\n</ul>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'cdf76370-5e9d-5a56-8805-4eed35d845bd';


-- legal_sections privacy-how-we-collect-information
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Comment nous collectons les données"'::jsonb,
    'de', '"Wie wir Daten erheben"'::jsonb,
    'es', '"Cómo recopilamos los datos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous collectons des données :</p>\n<ul>\n<li>Lorsque vous remplissez des formulaires, vous inscrivez à la newsletter ou nous contactez directement.</li>\n<li>Grâce à des technologies de suivi automatique lorsque vous naviguez sur notre site.</li>\n<li>Auprès de partenaires tiers, tels que des fournisseurs d''analyse ou de publicité.</li>\n</ul>\n<p>Nous utilisons des cookies et des technologies similaires pour suivre l''activité sur notre service et conserver certaines informations. Les cookies sont des fichiers contenant une petite quantité de données pouvant inclure un identifiant unique anonyme.</p>\n<p>Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour vous avertir lorsqu''un cookie est envoyé. Toutefois, si vous n''acceptez pas les cookies, il se peut que vous ne puissiez pas utiliser certaines parties de notre service.</p>\n<p>Pour plus d''informations, veuillez consulter notre Politique relative aux Cookies.</p>"'::jsonb,
    'de', '"<p>Wir erheben Daten:</p>\n<ul>\n<li>Wenn Sie Formulare ausfüllen, den Newsletter abonnieren oder uns direkt kontaktieren.</li>\n<li>Durch automatische Tracking-Technologien, während Sie auf unserer Website navigieren.</li>\n<li>Von Drittpartnern, wie z. B. Analyse- oder Werbeanbietern.</li>\n</ul>\n<p>Wir verwenden Cookies und ähnliche Technologien, um die Aktivität auf unserem Dienst zu überwachen und bestimmte Informationen zu speichern. Cookies sind Dateien mit einer kleinen Datenmenge, die eine anonyme eindeutige Kennung enthalten können.</p>\n<p>Sie können Ihren Browser so einstellen, dass er alle Cookies ablehnt oder Sie benachrichtigt, wenn ein Cookie gesendet wird. Wenn Sie Cookies jedoch nicht akzeptieren, können Sie möglicherweise bestimmte Teile unseres Dienstes nicht nutzen.</p>\n<p>Weitere Informationen finden Sie in unserer Cookie-Richtlinie.</p>"'::jsonb,
    'es', '"<p>Recopilamos datos:</p>\n<ul>\n<li>Cuando completas formularios, te suscribes al boletín informativo o te pones en contacto con nosotros directamente.</li>\n<li>Mediante tecnologías de rastreo automático mientras navegas por nuestro sitio.</li>\n<li>De socios externos, como proveedores de análisis o publicidad.</li>\n</ul>\n<p>Utilizamos cookies y tecnologías similares para supervisar la actividad en nuestro servicio y conservar determinada información. Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo.</p>\n<p>Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envíe una cookie. Sin embargo, si no aceptas las cookies, es posible que no puedas utilizar algunas partes de nuestro servicio.</p>\n<p>Para más información, consulta nuestra Política de Cookies.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '2721d49c-4f01-51a6-ac7b-d7e923b0e005';


-- legal_sections privacy-how-we-use-your-information
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Comment nous utilisons vos données"'::jsonb,
    'de', '"Wie wir Ihre Daten verwenden"'::jsonb,
    'es', '"Cómo utilizamos tus datos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous utilisons les données pour :</p>\n<ul>\n<li>fournir et maintenir notre site web et nos services</li>\n<li>répondre à vos demandes et communiquer avec vous</li>\n<li>fournir une assistance clientèle</li>\n<li>analyser et améliorer les performances du site et l''expérience utilisateur</li>\n<li>surveiller l''utilisation des services</li>\n<li>respecter les obligations légales</li>\n<li>prévenir les fraudes et garantir la sécurité</li>\n<li>détecter, prévenir et résoudre les problèmes techniques</li>\n<li>à des fins de marketing, si vous avez donné votre consentement</li>\n</ul>"'::jsonb,
    'de', '"<p>Wir verwenden die Daten, um:</p>\n<ul>\n<li>unsere Website und unsere Dienste bereitzustellen und aufrechtzuerhalten</li>\n<li>auf Ihre Anfragen zu antworten und mit Ihnen zu kommunizieren</li>\n<li>Kundensupport zu leisten</li>\n<li>die Leistung der Website und die Nutzererfahrung zu analysieren und zu verbessern</li>\n<li>die Nutzung der Dienste zu überwachen</li>\n<li>rechtlichen Verpflichtungen nachzukommen</li>\n<li>Betrug vorzubeugen und die Sicherheit zu gewährleisten</li>\n<li>technische Probleme zu erkennen, zu verhindern und zu beheben</li>\n<li>für Marketingzwecke, sofern Sie Ihre Einwilligung erteilt haben</li>\n</ul>"'::jsonb,
    'es', '"<p>Utilizamos los datos para:</p>\n<ul>\n<li>proporcionar y mantener nuestro sitio web y nuestros servicios</li>\n<li>responder a tus solicitudes y comunicarnos contigo</li>\n<li>proporcionar atención al cliente</li>\n<li>analizar y mejorar el rendimiento del sitio y la experiencia del usuario</li>\n<li>supervisar el uso de los servicios</li>\n<li>cumplir con las obligaciones legales</li>\n<li>prevenir fraudes y garantizar la seguridad</li>\n<li>detectar, prevenir y resolver problemas técnicos</li>\n<li>fines de marketing, si has otorgado tu consentimiento</li>\n</ul>"'::jsonb
  ),
  updated_at = now()
WHERE id = '10c4a383-9397-5198-a8d4-a6197770c3bc';


-- legal_sections privacy-how-we-share-your-information
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Partage de vos données"'::jsonb,
    'de', '"Weitergabe Ihrer Daten"'::jsonb,
    'es', '"Compartición de sus datos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous pouvons partager vos données avec :</p>\n<ul>\n<li><strong>Nos filiales :</strong> nous partageons les données au sein du groupe Hand Line Company</li>\n<li><strong>Prestataires de services :</strong> nous partageons les données avec des tiers qui fournissent des services pour notre compte, tels que l''hébergement, l''analyse, les paiements et le service client</li>\n<li><strong>Partenaires commerciaux :</strong> nous pouvons partager les données avec des partenaires afin de vous proposer des produits, services ou promotions</li>\n<li><strong>Obligations légales :</strong> nous pouvons divulguer les données si la loi ou les autorités compétentes l''exigent</li>\n</ul>\n<p><strong>Nous ne vendons pas vos données personnelles à des tiers.</strong></p>"'::jsonb,
    'de', '"<p>Wir können Ihre Daten mit folgenden Empfängern teilen:</p>\n<ul>\n<li><strong>Unsere verbundenen Unternehmen:</strong> Wir geben Daten innerhalb der Hand-Line-Company-Gruppe weiter</li>\n<li><strong>Dienstleister:</strong> Wir geben Daten an Dritte weiter, die Dienstleistungen in unserem Auftrag erbringen, z. B. Hosting, Analyse, Zahlungsabwicklung und Kundenservice</li>\n<li><strong>Geschäftspartner:</strong> Wir können Daten mit Partnern teilen, um Ihnen Produkte, Dienstleistungen oder Werbeaktionen anzubieten</li>\n<li><strong>Gesetzliche Verpflichtungen:</strong> Wir können Daten offenlegen, wenn dies gesetzlich vorgeschrieben ist oder von zuständigen Behörden verlangt wird</li>\n</ul>\n<p><strong>Wir verkaufen Ihre personenbezogenen Daten nicht an Dritte.</strong></p>"'::jsonb,
    'es', '"<p>Podemos compartir sus datos con:</p>\n<ul>\n<li><strong>Nuestras filiales:</strong> compartimos los datos dentro del grupo Hand Line Company</li>\n<li><strong>Proveedores de servicios:</strong> compartimos los datos con terceros que prestan servicios por nuestra cuenta, como alojamiento, análisis, pagos y atención al cliente</li>\n<li><strong>Socios comerciales:</strong> podemos compartir los datos con socios para ofrecerle productos, servicios o promociones</li>\n<li><strong>Obligaciones legales:</strong> podemos divulgar los datos si así lo exige la ley o las autoridades competentes</li>\n</ul>\n<p><strong>No vendemos sus datos personales a terceros.</strong></p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'f31f7b68-5106-5242-9ce1-4527379183b9';


-- legal_sections privacy-data-security-retention
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Sécurité et conservation des données"'::jsonb,
    'de', '"Datensicherheit und Datenspeicherung"'::jsonb,
    'es', '"Seguridad y conservación de los datos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous adoptons des mesures raisonnables pour protéger vos données, y compris le chiffrement et le stockage sécurisé. Nous ne conserverons les données que le temps nécessaire pour répondre aux finalités déclarées ou comme l''exige la loi. Elles seront ensuite supprimées ou rendues anonymes.</p>\n<p>Malgré nos précautions, aucune transmission par Internet ni aucune technologie de stockage ne peut être garantie sécurisée à 100 %.</p>"'::jsonb,
    'de', '"<p>Wir treffen angemessene Maßnahmen zum Schutz Ihrer Daten, einschließlich Verschlüsselung und sicherer Speicherung. Wir speichern die Daten nur so lange, wie es zur Erfüllung der genannten Zwecke erforderlich ist oder gesetzlich vorgeschrieben ist. Anschließend werden sie gelöscht oder anonymisiert.</p>\n<p>Trotz unserer Vorsichtsmaßnahmen kann keine Übertragung über das Internet oder Speichertechnologie als zu 100 % sicher garantiert werden.</p>"'::jsonb,
    'es', '"<p>Adoptamos medidas razonables para proteger sus datos, incluidos el cifrado y el almacenamiento seguro. Conservaremos los datos únicamente durante el tiempo necesario para cumplir los fines declarados o según lo exija la ley. Posteriormente serán eliminados o anonimizados.</p>\n<p>A pesar de nuestras precauciones, ninguna transmisión por Internet ni tecnología de almacenamiento puede garantizarse segura al 100 %.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'dba1e461-9a50-532f-8242-7e0c0cd8fab3';


-- legal_sections privacy-your-rights
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Vos droits"'::jsonb,
    'de', '"Ihre Rechte"'::jsonb,
    'es', '"Sus derechos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Vous disposez de certains droits en matière de protection des données personnelles, notamment :</p>\n<ul>\n<li>Le droit d''accéder à vos données, de les mettre à jour ou de les supprimer</li>\n<li>Le droit de rectification des données inexactes ou incomplètes</li>\n<li>Le droit d''opposition au traitement</li>\n<li>Le droit de limiter le traitement</li>\n<li>Le droit à la portabilité des données</li>\n<li>Le droit de retirer votre consentement à tout moment (si le traitement est fondé sur le consentement)</li>\n</ul>\n<p>Contactez-nous pour exercer vos droits ou pour toute question relative à la vie privée.</p>"'::jsonb,
    'de', '"<p>Ihnen stehen bestimmte Rechte im Bereich des Schutzes personenbezogener Daten zu, insbesondere:</p>\n<ul>\n<li>Das Recht, auf Ihre Daten zuzugreifen, sie zu aktualisieren oder zu löschen</li>\n<li>Das Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>\n<li>Das Widerspruchsrecht gegen die Verarbeitung</li>\n<li>Das Recht, die Verarbeitung einzuschränken</li>\n<li>Das Recht auf Datenübertragbarkeit</li>\n<li>Das Recht, Ihre Einwilligung jederzeit zu widerrufen (sofern die Verarbeitung auf der Einwilligung beruht)</li>\n</ul>\n<p>Kontaktieren Sie uns, um Ihre Rechte auszuüben oder bei Fragen zum Datenschutz.</p>"'::jsonb,
    'es', '"<p>Usted dispone de determinados derechos en materia de protección de datos personales, entre ellos:</p>\n<ul>\n<li>El derecho de acceso, actualización o supresión de sus datos</li>\n<li>El derecho de rectificación de los datos inexactos o incompletos</li>\n<li>El derecho de oposición al tratamiento</li>\n<li>El derecho a limitar el tratamiento</li>\n<li>El derecho a la portabilidad de los datos</li>\n<li>El derecho a revocar el consentimiento en cualquier momento (si el tratamiento se basa en el consentimiento)</li>\n</ul>\n<p>Contáctenos para ejercer sus derechos o para cualquier pregunta relativa a la privacidad.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '3b95e9f4-f677-56b3-b22e-e2f5dd8794be';


-- legal_sections privacy-childrens-privacy
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Confidentialité des mineurs"'::jsonb,
    'de', '"Datenschutz für Minderjährige"'::jsonb,
    'es', '"Privacidad de los menores"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Notre site n''est pas destiné aux mineurs de moins de 16 ans et nous ne collectons pas sciemment de données personnelles auprès de mineurs. Si vous êtes parent ou tuteur légal et pensez que nous pourrions avoir recueilli des informations auprès d''un mineur, veuillez nous contacter.</p>"'::jsonb,
    'de', '"<p>Unsere Website richtet sich nicht an Minderjährige unter 16 Jahren, und wir erheben wissentlich keine personenbezogenen Daten von Minderjährigen. Wenn Sie Elternteil oder Erziehungsberechtigter sind und der Ansicht sind, dass wir möglicherweise Informationen von einem Minderjährigen erhoben haben, kontaktieren Sie uns bitte.</p>"'::jsonb,
    'es', '"<p>Nuestro sitio web no está destinado a menores de 16 años y no recopilamos conscientemente datos personales de menores. Si usted es padre, madre o tutor legal y considera que podríamos haber recopilado información de un menor, póngase en contacto con nosotros.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '2dd59693-7770-5ccc-b6a0-9cf6867f4a60';


-- legal_sections privacy-international-transfers
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Transferts internationaux"'::jsonb,
    'de', '"Internationale Datenübermittlungen"'::jsonb,
    'es', '"Transferencias internacionales"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Vos données peuvent être transférées et traitées en dehors de votre pays. Nous adoptons des mesures pour les protéger conformément à la présente politique.</p>"'::jsonb,
    'de', '"<p>Ihre Daten können außerhalb Ihres Landes übermittelt und verarbeitet werden. Wir treffen Maßnahmen, um sie im Einklang mit dieser Richtlinie zu schützen.</p>"'::jsonb,
    'es', '"<p>Sus datos pueden ser transferidos y tratados fuera de su país. Adoptamos medidas para protegerlos de conformidad con esta política.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'ee8f007b-7f10-5f48-9619-724c23d583c6';


-- legal_sections privacy-changes-to-this-policy
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Modifications de la présente politique"'::jsonb,
    'de', '"Änderungen dieser Datenschutzerklärung"'::jsonb,
    'es', '"Modificaciones de la presente política"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous pourrions mettre à jour périodiquement la présente Politique de Confidentialité. Les modifications seront publiées sur cette page avec la date de mise à jour.</p>\n<p>Nous vous invitons à consulter régulièrement cette page afin de rester informé.</p>"'::jsonb,
    'de', '"<p>Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite mit dem Datum der Aktualisierung veröffentlicht.</p>\n<p>Wir empfehlen Ihnen, diese Seite regelmäßig zu besuchen, um stets informiert zu bleiben.</p>"'::jsonb,
    'es', '"<p>Podremos actualizar periódicamente esta Política de Privacidad. Las modificaciones se publicarán en esta página junto con la fecha de actualización.</p>\n<p>Le invitamos a consultar esta página con regularidad para mantenerse informado.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '1fe5de18-b6de-5f02-8d02-846bffde2c15';


-- legal_sections privacy-contact-us
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Contact"'::jsonb,
    'de', '"Kontakt"'::jsonb,
    'es', '"Contacto"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Pour toute question relative à la protection de la vie privée, contactez-nous :</p>\n<p><strong>📧 E-mail :</strong> privacy@handlineco.com</p>\n<p><strong>📬 Courrier :</strong> Service Confidentialité, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italie.</p>"'::jsonb,
    'de', '"<p>Bei Fragen zum Datenschutz kontaktieren Sie uns bitte:</p>\n<p><strong>📧 E-Mail:</strong> privacy@handlineco.com</p>\n<p><strong>📬 Post:</strong> Datenschutzbüro, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italien.</p>"'::jsonb,
    'es', '"<p>Para cualquier pregunta relacionada con la privacidad, contáctenos:</p>\n<p><strong>📧 Correo electrónico:</strong> privacy@handlineco.com</p>\n<p><strong>📬 Correo postal:</strong> Oficina de Privacidad, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italia.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '39dd87ce-8746-5b74-b88e-5852377ff7de';


-- legal_sections cookies-introduction
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Introduction"'::jsonb,
    'de', '"Einleitung"'::jsonb,
    'es', '"Introducción"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>La présente politique explique comment Hand Line Company S.r.l. et ses filiales (« nous ») utilisent les cookies et technologies similaires sur notre site web. En utilisant notre site, vous consentez à l''utilisation des cookies comme décrit dans la présente politique.</p>"'::jsonb,
    'de', '"<p>Diese Richtlinie erläutert, wie Hand Line Company S.r.l. und ihre verbundenen Unternehmen („wir\") Cookies und ähnliche Technologien auf unserer Website verwenden. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu.</p>"'::jsonb,
    'es', '"<p>La presente política explica cómo Hand Line Company S.r.l. y sus filiales («nosotros») utilizan cookies y tecnologías similares en nuestro sitio web. Al utilizar nuestro sitio, usted consiente el uso de cookies tal como se describe en esta política.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '83a015ec-064d-547b-b437-eee8d3a3cdc6';


-- legal_sections cookies-what-are-cookies
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Que sont les cookies ?"'::jsonb,
    'de', '"Was sind Cookies?"'::jsonb,
    'es', '"¿Qué son las cookies?"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Les cookies sont de petits fichiers texte enregistrés sur votre appareil (ordinateur, tablette ou smartphone) lorsque vous visitez un site web. Ils permettent au site de reconnaître votre appareil et de se souvenir si vous avez déjà visité le site par le passé.</p>\n<p>Les cookies sont largement utilisés pour faire fonctionner les sites de manière plus efficace, améliorer l''expérience de l''utilisateur et fournir des informations aux gestionnaires du site.</p>\n<p>Les cookies déposés directement par le propriétaire du site (c''est-à-dire nous) sont appelés cookies internes (ou de première partie). Les cookies déposés par des tiers sont appelés cookies tiers, et permettent des fonctionnalités externes telles que la publicité, les contenus interactifs ou l''analyse.</p>"'::jsonb,
    'de', '"<p>Cookies sind kleine Textdateien, die auf Ihrem Gerät (Computer, Tablet oder Smartphone) gespeichert werden, wenn Sie eine Website besuchen. Sie ermöglichen es der Website, Ihr Gerät wiederzuerkennen und sich zu merken, ob Sie die Website bereits zuvor besucht haben.</p>\n<p>Cookies werden häufig verwendet, um Websites effizienter funktionieren zu lassen, die Nutzererfahrung zu verbessern und den Websitebetreibern Informationen bereitzustellen.</p>\n<p>Cookies, die direkt vom Websitebetreiber (also von uns) gesetzt werden, werden als Erstanbieter-Cookies bezeichnet. Cookies, die von Dritten gesetzt werden, werden als Cookies von Drittanbietern bezeichnet und ermöglichen externe Funktionen wie Werbung, interaktive Inhalte oder Analysen.</p>"'::jsonb,
    'es', '"<p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o smartphone) cuando visita un sitio web. Permiten que el sitio reconozca su dispositivo y recuerde si ya lo ha visitado con anterioridad.</p>\n<p>Las cookies se utilizan ampliamente para que los sitios funcionen de manera más eficiente, mejorar la experiencia del usuario y proporcionar información a los administradores del sitio.</p>\n<p>Las cookies establecidas directamente por el propietario del sitio (es decir, nosotros) se denominan cookies propias. Las cookies establecidas por terceros se denominan cookies de terceros, y permiten funcionalidades externas como publicidad, contenido interactivo o análisis.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '89c4d083-963b-52a7-bac7-a554314d0430';


-- legal_sections cookies-why-we-use-cookies
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Pourquoi nous utilisons des cookies"'::jsonb,
    'de', '"Warum wir Cookies verwenden"'::jsonb,
    'es', '"Por qué utilizamos cookies"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous utilisons les cookies pour garantir une expérience de navigation fluide, sécurisée et personnalisée (par exemple en mémorisant vos préférences).</p>\n<p>Ils nous aident également à recueillir des statistiques et à comprendre comment les utilisateurs interagissent avec le site afin d''en améliorer le contenu et les services proposés.</p>"'::jsonb,
    'de', '"<p>Wir verwenden Cookies, um ein reibungsloses, sicheres und personalisiertes Browsing-Erlebnis zu gewährleisten (indem wir uns beispielsweise Ihre Präferenzen merken).</p>\n<p>Außerdem helfen sie uns, Statistiken zu erheben und zu verstehen, wie Nutzer mit der Website interagieren, um deren Inhalte und angebotene Dienste zu verbessern.</p>"'::jsonb,
    'es', '"<p>Utilizamos cookies para garantizar una experiencia de navegación fluida, segura y personalizada (por ejemplo, recordando sus preferencias).</p>\n<p>Además, nos ayudan a recopilar estadísticas y comprender cómo interactúan los usuarios con el sitio para mejorar su contenido y los servicios ofrecidos.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '70a2202f-bfa5-525c-99bf-f692d18612d2';


-- legal_sections cookies-types-of-cookies-we-use
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Types de cookies que nous utilisons"'::jsonb,
    'de', '"Arten von Cookies, die wir verwenden"'::jsonb,
    'es', '"Tipos de cookies que utilizamos"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<table class=\"w-full border-collapse border border-gray-300 mt-4\">\n<thead>\n<tr class=\"bg-gray-100\">\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Type de Cookie</th>\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies essentiels</td>\n<td class=\"border border-gray-300 p-2\">Nécessaires au fonctionnement du site. Ils permettent des fonctionnalités de base telles que la sécurité, la gestion du réseau et l''accès au compte. Les désactiver pourrait compromettre le bon fonctionnement du site.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies de performance</td>\n<td class=\"border border-gray-300 p-2\">Ils recueillent des informations sur la manière dont les utilisateurs utilisent le site, par exemple les pages les plus consultées, afin de nous aider à améliorer la navigation.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies de fonctionnalité</td>\n<td class=\"border border-gray-300 p-2\">Ils mémorisent les préférences de l''utilisateur (comme le nom d''utilisateur, la langue ou la région) afin d''offrir une expérience plus personnalisée.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies analytiques</td>\n<td class=\"border border-gray-300 p-2\">Ils détectent des informations sur l''utilisation du site, comme les erreurs ou la fréquence des visites, afin d''améliorer les contenus.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies de ciblage</td>\n<td class=\"border border-gray-300 p-2\">Ils suivent les pages visitées et les liens cliqués, afin de rendre les contenus et les publicités plus pertinents par rapport à vos intérêts.</td>\n</tr>\n</tbody>\n</table>"'::jsonb,
    'de', '"<table class=\"w-full border-collapse border border-gray-300 mt-4\">\n<thead>\n<tr class=\"bg-gray-100\">\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Cookie-Art</th>\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Beschreibung</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Essenzielle Cookies</td>\n<td class=\"border border-gray-300 p-2\">Für den Betrieb der Website erforderlich. Sie ermöglichen grundlegende Funktionen wie Sicherheit, Netzwerkverwaltung und Kontozugriff. Ihre Deaktivierung könnte die ordnungsgemäße Funktion der Website beeinträchtigen.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Performance-Cookies</td>\n<td class=\"border border-gray-300 p-2\">Sie sammeln Informationen darüber, wie Nutzer die Website verwenden, zum Beispiel die am häufigsten besuchten Seiten, um uns bei der Verbesserung der Navigation zu helfen.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Funktionale Cookies</td>\n<td class=\"border border-gray-300 p-2\">Sie speichern die Präferenzen des Nutzers (wie Benutzername, Sprache oder Region), um ein persönlicheres Erlebnis zu bieten.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Analyse-Cookies</td>\n<td class=\"border border-gray-300 p-2\">Sie erfassen Informationen über die Nutzung der Website, wie Fehler oder Besuchshäufigkeit, um die Inhalte zu verbessern.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Targeting-Cookies</td>\n<td class=\"border border-gray-300 p-2\">Sie verfolgen besuchte Seiten und angeklickte Links, um Inhalte und Werbung relevanter für Ihre Interessen zu gestalten.</td>\n</tr>\n</tbody>\n</table>"'::jsonb,
    'es', '"<table class=\"w-full border-collapse border border-gray-300 mt-4\">\n<thead>\n<tr class=\"bg-gray-100\">\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Tipo de Cookie</th>\n<th class=\"border border-gray-300 p-2 text-left font-semibold\">Descripción</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies esenciales</td>\n<td class=\"border border-gray-300 p-2\">Necesarias para el funcionamiento del sitio. Permiten funciones básicas como la seguridad, la gestión de la red y el acceso a la cuenta. Desactivarlas podría comprometer el correcto funcionamiento del sitio.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies de rendimiento</td>\n<td class=\"border border-gray-300 p-2\">Recopilan información sobre cómo utilizan los usuarios el sitio, por ejemplo las páginas más visitadas, para ayudarnos a mejorar la navegación.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies de funcionalidad</td>\n<td class=\"border border-gray-300 p-2\">Almacenan las preferencias del usuario (como el nombre de usuario, el idioma o la región) para ofrecer una experiencia más personalizada.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies analíticos</td>\n<td class=\"border border-gray-300 p-2\">Detectan información sobre el uso del sitio, como errores o frecuencia de las visitas, para mejorar los contenidos.</td>\n</tr>\n<tr>\n<td class=\"border border-gray-300 p-2 font-semibold\">Cookies de segmentación</td>\n<td class=\"border border-gray-300 p-2\">Rastrean las páginas visitadas y los enlaces pulsados, para hacer que los contenidos y la publicidad sean más pertinentes a sus intereses.</td>\n</tr>\n</tbody>\n</table>"'::jsonb
  ),
  updated_at = now()
WHERE id = '1259b87f-cd60-5b8c-88dc-d4674c0e84f6';


-- legal_sections cookies-managing-your-cookie-preferences
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Gestion des préférences en matière de cookies"'::jsonb,
    'de', '"Verwaltung Ihrer Cookie-Einstellungen"'::jsonb,
    'es', '"Gestión de las preferencias sobre cookies"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Vous pouvez gérer les cookies via les paramètres de votre navigateur. Vous pouvez à tout moment accepter, refuser ou supprimer les cookies.</p>\n<p>La désactivation des cookies essentiels peut compromettre certaines fonctionnalités du site.</p>\n<p>Pour plus d''informations sur la gestion des cookies dans les navigateurs les plus courants :</p>\n<ul>\n<li><a href=\"https://support.google.com/chrome/answer/95647\" target=\"_blank\" rel=\"noopener noreferrer\">Google Chrome</a></li>\n<li><a href=\"https://support.microsoft.com/en-gb/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd\" target=\"_blank\" rel=\"noopener noreferrer\">Microsoft Edge</a></li>\n<li><a href=\"https://support.apple.com/en-gb/guide/safari/sfri11471/mac\" target=\"_blank\" rel=\"noopener noreferrer\">Safari</a></li>\n</ul>"'::jsonb,
    'de', '"<p>Sie können Cookies über die Einstellungen Ihres Browsers verwalten. Sie können Cookies jederzeit akzeptieren, ablehnen oder löschen.</p>\n<p>Das Deaktivieren essenzieller Cookies kann bestimmte Funktionen der Website beeinträchtigen.</p>\n<p>Weitere Informationen zur Verwaltung von Cookies in den gängigsten Browsern finden Sie hier:</p>\n<ul>\n<li><a href=\"https://support.google.com/chrome/answer/95647\" target=\"_blank\" rel=\"noopener noreferrer\">Google Chrome</a></li>\n<li><a href=\"https://support.microsoft.com/en-gb/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd\" target=\"_blank\" rel=\"noopener noreferrer\">Microsoft Edge</a></li>\n<li><a href=\"https://support.apple.com/en-gb/guide/safari/sfri11471/mac\" target=\"_blank\" rel=\"noopener noreferrer\">Safari</a></li>\n</ul>"'::jsonb,
    'es', '"<p>Puede gestionar las cookies a través de la configuración de su navegador. En cualquier momento puede aceptar, rechazar o eliminar las cookies.</p>\n<p>Desactivar las cookies esenciales puede comprometer algunas funcionalidades del sitio.</p>\n<p>Para más información sobre la gestión de cookies en los navegadores más comunes:</p>\n<ul>\n<li><a href=\"https://support.google.com/chrome/answer/95647\" target=\"_blank\" rel=\"noopener noreferrer\">Google Chrome</a></li>\n<li><a href=\"https://support.microsoft.com/en-gb/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd\" target=\"_blank\" rel=\"noopener noreferrer\">Microsoft Edge</a></li>\n<li><a href=\"https://support.apple.com/en-gb/guide/safari/sfri11471/mac\" target=\"_blank\" rel=\"noopener noreferrer\">Safari</a></li>\n</ul>"'::jsonb
  ),
  updated_at = now()
WHERE id = '1939cd94-d378-56c6-ba83-a00953713b81';


-- legal_sections cookies-third-party-cookies
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Cookies tiers"'::jsonb,
    'de', '"Cookies von Drittanbietern"'::jsonb,
    'es', '"Cookies de terceros"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous pourrions autoriser des fournisseurs tiers (par exemple des services d''analyse ou de publicité) à déposer des cookies sur votre appareil. L''utilisation des cookies par ces tiers est régie par leurs propres politiques de confidentialité et de cookies respectives.</p>"'::jsonb,
    'de', '"<p>Wir können Drittanbietern (z. B. Analyse- oder Werbedienste) gestatten, Cookies auf Ihrem Gerät zu setzen. Die Verwendung von Cookies durch diese Anbieter unterliegt deren jeweiligen Datenschutz- und Cookie-Richtlinien.</p>"'::jsonb,
    'es', '"<p>Podemos permitir que proveedores externos (por ejemplo, servicios de análisis o publicidad) instalen cookies en su dispositivo. El uso de cookies por parte de estos terceros se rige por sus respectivas políticas de privacidad y de cookies.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = 'b276c2c1-43c9-5d39-bf5c-c879f1383336';


-- legal_sections cookies-changes-to-this-policy
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Modifications de la présente politique"'::jsonb,
    'de', '"Änderungen dieser Richtlinie"'::jsonb,
    'es', '"Modificaciones de esta política"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Nous pourrions mettre à jour périodiquement la présente politique. Les modifications seront publiées sur cette page et entreront en vigueur dès leur publication.</p>\n<p>Nous vous invitons à consulter régulièrement cette Politique relative aux Cookies afin de rester informé sur l''utilisation des cookies.</p>"'::jsonb,
    'de', '"<p>Wir können diese Richtlinie von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite veröffentlicht und treten mit ihrer Veröffentlichung in Kraft.</p>\n<p>Wir empfehlen Ihnen, diese Cookie-Richtlinie regelmäßig zu lesen, um über die Verwendung von Cookies informiert zu bleiben.</p>"'::jsonb,
    'es', '"<p>Podremos actualizar periódicamente la presente política. Las modificaciones se publicarán en esta página y entrarán en vigor en el momento de su publicación.</p>\n<p>Le invitamos a consultar regularmente esta Política de Cookies para mantenerse informado sobre el uso de las cookies.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '79d908ef-4bf9-50f4-9eb7-d4a6f0a190cb';


-- legal_sections cookies-contact-us
UPDATE legal_sections
SET
  title_locales = COALESCE(title_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"Contact"'::jsonb,
    'de', '"Kontakt"'::jsonb,
    'es', '"Contacto"'::jsonb
  ),
  content_locales = COALESCE(content_locales, '{}'::jsonb) || jsonb_build_object(
    'fr', '"<p>Pour toute question ou préoccupation concernant l''utilisation des cookies, contactez-nous :</p>\n<p><strong>📧 E-mail :</strong> privacy@handlineco.com</p>\n<p><strong>📬 Courrier :</strong> Service Confidentialité, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italie.</p>"'::jsonb,
    'de', '"<p>Bei Fragen oder Bedenken zur Verwendung von Cookies kontaktieren Sie uns bitte:</p>\n<p><strong>📧 E-Mail:</strong> privacy@handlineco.com</p>\n<p><strong>📬 Post:</strong> Datenschutzbüro, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italien.</p>"'::jsonb,
    'es', '"<p>Para preguntas o dudas sobre el uso de las cookies, contáctenos:</p>\n<p><strong>📧 Correo electrónico:</strong> privacy@handlineco.com</p>\n<p><strong>📬 Correo postal:</strong> Oficina de Privacidad, Hand Line Company S.r.l. Via Brusa 34, 22035, Canzo (CO), Italia.</p>"'::jsonb
  ),
  updated_at = now()
WHERE id = '11c6405c-4178-5e97-8ad1-d33c8c3b1349';


COMMIT;
