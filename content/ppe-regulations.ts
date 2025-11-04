export const ppeRegulationsContent = {
  en: {
    regulation: {
      title: "PPE Regulation",
      lastUpdated: "Last update: 04/08/2025",
      sections: [
        {
          title: "Legal Framework",
          content: `
            <p>Personal Protective Equipment (PPE) is regulated to ensure that products placed on the market meet defined safety, health, and performance requirements. The main reference in the European Union is the PPE Regulation (EU) 2016/425, which applies directly in all Member States. In the United Kingdom, following Brexit, PPE is governed by the PPE Regulations 2016 (as retained and amended by UK law), aligned closely to the EU framework but with specific UKCA marking requirements.</p>
          `
        },
        {
          title: "Objectives of Regulation",
          content: `
            <p>The regulation ensures that:</p>
            <ul>
              <li>PPE provides adequate protection against the intended risks.</li>
              <li>Products are safe to use and fit for purpose.</li>
              <li>Users can rely on standardised testing, conformity assessment, and markings.</li>
            </ul>
          `
        },
        {
          title: "Definitions of PPE",
          content: `
            <p>PPE is defined broadly as any equipment designed and manufactured to be worn or held by an individual for protection against one or more risks to health or safety. It includes:</p>
            <ul>
              <li>Equipment (e.g., helmets, gloves, footwear).</li>
              <li>Accessories and interchangeable components (e.g., visors, filters).</li>
              <li>Connectors or harnesses used with PPE.</li>
            </ul>
          `
        },
        {
          title: "Conformity Assessment Procedures",
          content: `
            <p>Depending on the risk category, PPE must undergo one or more of the following:</p>
            <ul>
              <li><strong>EU/UK Type Examination:</strong> Independent notified body verifies product compliance against harmonised standards (Category II and III PPE).</li>
              <li><strong>Quality Assurance Modules:</strong> Periodic audits of the manufacturer's quality management system or ongoing sample testing for Category III PPE.</li>
            </ul>
          `
        },
        {
          title: "Marking & User Information",
          content: `
            <p>Marking is required under EU PPE Regulation 2016/425 and UK PPE Regulations 2016. It provides immediate, visible proof that the product meets the regulatory requirements and helps with traceability and accountability.</p>
            <p>All compliant PPE must carry:</p>
            <ul>
              <li>CE (EU) or UKCA (UK) mark.</li>
              <li>Manufacturer's identification (name, address, traceability code).</li>
              <li>Standard references.</li>
              <li>User instructions, in the language of the market where sold.</li>
            </ul>
          `
        }
      ]
    },
    categories: {
      title: "PPE Categories",
      lastUpdated: "Last update: 04/08/2025",
      sections: [
        {
          title: "PPE Categories Overview",
          content: `
            <p>PPE is classified into three categories (I, II, III) based on the level and type of risk they protect against. This classification determines the conformity assessment route, the level of third-party oversight, and the complexity of regulatory compliance.</p>
          `
        },
        {
          title: "Category I: Simple PPE (Low Risk)",
          content: `
            <p>PPE designed to protect against minimal risks that are easily detectable by the user. These are typically simple, low-risk items where the effectiveness can be quickly assessed visually or by common sense.</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>Gardening gloves</li>
              <li>Simple sunglasses (non-safety, for casual sun protection)</li>
              <li>Basic raincoats or aprons</li>
              <li>Non-specialised footwear (e.g., plastic shoe covers)</li>
            </ul>
            <p><strong>Key Features:</strong></p>
            <ul>
              <li>Low complexity design, no specialized protective technology.</li>
              <li>Protects against risks that are not likely to cause serious injury.</li>
              <li>Minimal likelihood of irreversible damage to the user.</li>
            </ul>
            <p><strong>Regulatory Requirements:</strong></p>
            <ul>
              <li>Self-certification by the manufacturer.</li>
              <li>Manufacturer must prepare a technical file demonstrating compliance with essential health and safety requirements.</li>
              <li>No involvement of a Notified/Approved Body.</li>
            </ul>
          `
        },
        {
          title: "Category II: Intermediate PPE (Medium Risk)",
          content: `
            <p>PPE that does not fall into Category I (simple) or Category III (complex). Typically protects against risks that are more serious but not life-threatening, requiring technical design and performance verification.</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>Industrial helmets and safety glasses</li>
              <li>High-visibility clothing</li>
              <li>Standard work gloves (e.g., cut-resistant, chemical splash protection)</li>
              <li>Ear protection for moderate noise levels</li>
            </ul>
            <p><strong>Key Features:</strong></p>
            <ul>
              <li>Requires standardized testing according to harmonised standards.</li>
              <li>Protects against serious risks where incorrect use or failure could lead to injury, though usually not irreversible.</li>
              <li>More complex materials and designs than Category I.</li>
            </ul>
            <p><strong>Regulatory Requirements:</strong></p>
            <ul>
              <li>Must undergo Type Examination by a Notified Body (EU) or Approved Body (UK).</li>
              <li>Manufacturer retains responsibility for production but independent verification is mandatory.</li>
              <li>CE or UKCA marking is required.</li>
            </ul>
          `
        },
        {
          title: "Category III: Complex PPE (High Risk)",
          content: `
            <p>PPE intended to protect against risks that may cause death or irreversible injury. These are high-complexity, critical safety products.</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>Respiratory protective devices (RPE) for toxic gases</li>
              <li>Chemical-resistant suits or garments for hazardous substances</li>
              <li>Firefighter protective clothing</li>
              <li>Fall arrest systems and harnesses</li>
              <li>Chainsaw protective clothing</li>
            </ul>
            <p><strong>Key Features:</strong></p>
            <ul>
              <li>Designed for serious or life-threatening hazards.</li>
              <li>Often involves complex engineering, advanced materials, or multi-layered protection systems.</li>
              <li>Failure of the PPE could result in irreversible harm or fatality.</li>
            </ul>
            <p><strong>Regulatory Requirements:</strong></p>
            <ul>
              <li>Must undergo Type Examination by a Notified/Approved Body.</li>
              <li>Ongoing quality assurance of production or periodic product testing is required.</li>
              <li>CE or UKCA marking must indicate the involvement of the notified/approved body.</li>
              <li>User instructions and markings must be detailed and precise, including performance classes.</li>
            </ul>
          `
        }
      ]
    },
    standards: {
      title: "EN, UKCA & ANSI Standards",
      lastUpdated: "Last update: 04/08/2025",
      sections: [
        {
          title: "What are EN, UKCA and ANSI?",
          content: `
            <p>EN, UKCA, and ANSI are three widely recognized systems for defining safety standards in personal protective equipment (PPE), each serving a specific geographic region and regulatory framework.</p>
            <p>EN standards, or European Norms, are developed by European standardization bodies and provide detailed technical specifications to ensure the safety, quality, and performance of PPE sold within the European Union and the European Economic Area. Compliance with EN standards is demonstrated through CE marking, which indicates that products meet regulatory requirements, including performance testing, user information, and risk categorization.</p>
            <p>Following Brexit, the UK introduced the UKCA mark to replace CE marking for PPE sold in Great Britain. The UKCA system closely mirrors EN standards, using the same technical specifications and risk categories, but requires assessment by UK-approved bodies. This mark ensures that PPE meets UK-specific regulatory requirements, while Northern Ireland may still accept CE marking due to its unique trade arrangements.</p>
            <p>ANSI, the American National Standards Institute, operates in the United States and develops voluntary consensus standards across industries, including PPE. Unlike EN and UKCA, ANSI standards are primarily performance-based rather than regulatory, although compliance may be required under OSHA or other federal and state regulations. ANSI-certified PPE undergoes independent testing to ensure that it meets the defined safety and performance criteria.</p>
          `
        },
        {
          title: "CE and UKCA Marking: Compliance and Use of PPE in Great Britain",
          content: `
            <p><strong>Are CE-marked products compliant in UK?</strong></p>
            <p>In line with the Government's announcements on 1 August 2023 and 24 January 2024 about extended recognition of CE marking for products intended for the GB market, the Product Safety and Metrology etc. (Amendment) Regulations 2024 were made on 23 May 2024 and came into force on 1 October 2024, extending recognition of CE marking indefinitely in GB.</p>
            <p>This allows businesses to use either CE or UKCA markings when placing goods on the GB market beyond 31 December 2024.</p>
            <p>CE-marked products are, therefore, compliant and can be utilised in GB.</p>
            <p><strong>What about dual marking (CE and UKCA)?</strong></p>
            <p>A product can carry both CE and UKCA marks, but only if the correct conformity assessments have been carried out. Before 1 October 2024, this means an EU Notified Body must issue the CE certificate and a UK Approved Body must issue the UKCA certificate. From 1 October 2024, it becomes easier: if an EU Notified Body has carried out the CE assessment, the same product can also be UKCA marked, provided it meets all UK safety requirements. Alternatively, if a CE assessment has been started by an EU Notified Body and then completed by a UK Approved Body, the product can also carry the UKCA mark.</p>
            <p>However, once a product has already been placed on the market with only a CE mark, it cannot later be relabelled with a UKCA mark unless it goes through a full conformity assessment again with a UK Approved Body.</p>
          `
        },
        {
          title: "Why is ANSI relevant in EU and UK?",
          content: `
            <p>Although ANSI is a U.S.-based standard, it has gained relevance in Europe because many manufacturers and end users look to ANSI standards as an additional benchmark for performance, particularly when EN standards do not fully align with certain testing methods or risk scenarios.</p>
            <p>One notable example is cut resistance in gloves: ANSI/ISEA cut level testing (such as the TDM test method used for measuring cut-through resistance) has been widely adopted alongside EN 388 in European markets. Manufacturers often reference both EN and ANSI cut levels to provide customers with a more comprehensive understanding of glove performance, especially for industrial applications involving high-risk sharp objects or machinery.</p>
            <p>ANSI standards are also sometimes used for protective eyewear, hearing protection, and high-visibility clothing when U.S. clients or multinational companies require dual compliance. By incorporating ANSI specifications, European suppliers can demonstrate that their PPE meets globally recognized benchmarks, giving buyers confidence in the performance and durability of products across different regulatory environments.</p>
          `
        }
      ]
    }
  },
  it: {
    regulation: {
      title: "Normative DPI",
      lastUpdated: "Ultimo aggiornamento: 04/08/2025",
      sections: [
        {
          title: "Quadro normativo",
          content: `
            <p>I dispositivi di protezione individuale (DPI) sono regolamentati per garantire che i prodotti immessi sul mercato soddisfino requisiti definiti di sicurezza, salute e prestazioni. Il principale riferimento nell'Unione Europea è il Regolamento DPI (UE) 2016/425, che si applica direttamente in tutti gli Stati membri. Nel Regno Unito, a seguito della Brexit, i DPI sono disciplinati dai PPE Regulations 2016 (come recepiti e modificati dalla legislazione nazionale), strettamente allineati al quadro europeo ma con requisiti specifici di marcatura UKCA.</p>
          `
        },
        {
          title: "Obiettivi della regolamentazione",
          content: `
            <p>La regolamentazione garantisce che:</p>
            <ul>
              <li>I DPI forniscano un'adeguata protezione contro i rischi previsti.</li>
              <li>I prodotti siano sicuri da usare e idonei allo scopo.</li>
              <li>Gli utenti possano fare affidamento su test standardizzati, procedure di valutazione della conformità e marcature.</li>
            </ul>
          `
        },
        {
          title: "Definizione di DPI",
          content: `
            <p>I DPI sono definiti in senso ampio come qualsiasi attrezzatura progettata e realizzata per essere indossata o tenuta da una persona al fine di proteggerla da uno o più rischi per la salute o la sicurezza. Essi comprendono:</p>
            <ul>
              <li>Attrezzature (ad es. caschi, guanti, calzature).</li>
              <li>Accessori e componenti intercambiabili (ad es. visiere, filtri).</li>
              <li>Connettori o imbracature da utilizzare con i DPI.</li>
            </ul>
          `
        },
        {
          title: "Procedure di valutazione della conformità",
          content: `
            <p>A seconda della categoria di rischio, i DPI devono essere sottoposti a una o più delle seguenti procedure:</p>
            <ul>
              <li><strong>Esame UE/UK di Tipo:</strong> un organismo notificato (UE) o approvato (UK) verifica la conformità del prodotto rispetto alle norme armonizzate (DPI di Categoria II e III).</li>
              <li><strong>Moduli di garanzia della qualità:</strong> audit periodici del sistema di gestione qualità del fabbricante o test continui a campione per i DPI di Categoria III.</li>
            </ul>
          `
        },
        {
          title: "Marcatura e informazioni per l'utente",
          content: `
            <p>La marcatura è obbligatoria ai sensi del Regolamento DPI (UE) 2016/425 e dei PPE Regulations 2016 del Regno Unito. Essa fornisce una prova immediata e visibile che il prodotto soddisfa i requisiti normativi, facilitando tracciabilità e responsabilità.</p>
            <p>Tutti i DPI conformi devono riportare:</p>
            <ul>
              <li>Marcatura CE (UE) o UKCA (UK).</li>
              <li>Identificazione del fabbricante (nome, indirizzo, codice di tracciabilità).</li>
              <li>Riferimenti alle norme.</li>
              <li>Istruzioni per l'uso, nella lingua del mercato di vendita.</li>
            </ul>
          `
        }
      ]
    },
    categories: {
      title: "Categorie di DPI",
      lastUpdated: "Ultimo aggiornamento: 04/08/2025",
      sections: [
        {
          title: "Panoramica delle categorie DPI",
          content: `
            <p>I DPI sono classificati in tre categorie (I, II, III) in base al livello e al tipo di rischio contro cui proteggono. Questa classificazione determina il percorso di valutazione della conformità, il grado di controllo di terzi e la complessità della conformità normativa.</p>
          `
        },
        {
          title: "Categoria I: DPI semplici (Rischio basso)",
          content: `
            <p>DPI progettati per proteggere da rischi minimi, facilmente percepibili dall'utilizzatore.</p>
            <p><strong>Esempi:</strong></p>
            <ul>
              <li>guanti da giardinaggio</li>
              <li>occhiali da sole semplici (non di sicurezza)</li>
              <li>impermeabili o grembiuli basici</li>
              <li>calzature non specializzate (copriscarpe in plastica)</li>
            </ul>
            <p><strong>Caratteristiche principali:</strong></p>
            <ul>
              <li>design semplice</li>
              <li>nessuna tecnologia protettiva complessa</li>
              <li>protezione da rischi non gravi o irreversibili</li>
            </ul>
            <p><strong>Requisiti normativi:</strong></p>
            <ul>
              <li>autocertificazione del fabbricante</li>
              <li>preparazione del fascicolo tecnico</li>
              <li>nessun coinvolgimento di un organismo notificato/approvato</li>
            </ul>
          `
        },
        {
          title: "Categoria II: DPI intermedi (Rischio medio)",
          content: `
            <p>DPI che non rientrano né nella Categoria I né nella III. Proteggono da rischi significativi ma non mortali.</p>
            <p><strong>Esempi:</strong></p>
            <ul>
              <li>caschi industriali e occhiali di sicurezza</li>
              <li>indumenti ad alta visibilità</li>
              <li>guanti da lavoro (resistenti al taglio, protezione da schizzi chimici)</li>
              <li>protezione auricolare per rumori moderati</li>
            </ul>
            <p><strong>Caratteristiche principali:</strong></p>
            <ul>
              <li>test standardizzati secondo norme armonizzate</li>
              <li>protezione da rischi seri ma non irreversibili</li>
              <li>materiali e design più complessi</li>
            </ul>
            <p><strong>Requisiti normativi:</strong></p>
            <ul>
              <li>esame di tipo obbligatorio da parte di un organismo notificato/approvato</li>
              <li>marcatura CE o UKCA</li>
            </ul>
          `
        },
        {
          title: "Categoria III: DPI complessi (Rischio elevato)",
          content: `
            <p>DPI destinati a proteggere da rischi che possono causare morte o lesioni irreversibili.</p>
            <p><strong>Esempi:</strong></p>
            <ul>
              <li>dispositivi di protezione delle vie respiratorie per gas tossici</li>
              <li>tute chimico-resistenti</li>
              <li>indumenti per vigili del fuoco</li>
              <li>sistemi anticaduta</li>
              <li>indumenti antitaglio per motosega</li>
            </ul>
            <p><strong>Caratteristiche principali:</strong></p>
            <ul>
              <li>progettati per rischi gravi o mortali</li>
              <li>spesso con materiali avanzati o sistemi multilayer</li>
              <li>la loro mancata efficacia può causare danni irreversibili</li>
            </ul>
            <p><strong>Requisiti normativi:</strong></p>
            <ul>
              <li>esame di tipo da parte di un organismo notificato/approvato</li>
              <li>garanzia di qualità continua o test periodici</li>
              <li>marcatura CE/UKCA con riferimento all'organismo notificato/approvato</li>
              <li>istruzioni dettagliate per l'utente</li>
            </ul>
          `
        }
      ]
    },
    standards: {
      title: "Norme EN, UKCA e ANSI",
      lastUpdated: "Ultimo aggiornamento: 04/08/2025",
      sections: [
        {
          title: "Cosa sono EN, UKCA e ANSI?",
          content: `
            <p>Le norme EN, UKCA e ANSI sono tre sistemi ampiamente riconosciuti per definire gli standard di sicurezza dei DPI, ciascuno legato a un contesto geografico e normativo.</p>
            <p>Le norme EN (Norme Europee) sono sviluppate dagli organismi di normazione europei e stabiliscono specifiche tecniche dettagliate per garantire la sicurezza, la qualità e le prestazioni dei DPI venduti nell'UE e nello Spazio Economico Europeo. La conformità si dimostra tramite la marcatura CE.</p>
            <p>A seguito della Brexit, il Regno Unito ha introdotto la marcatura UKCA, che sostituisce la CE per i DPI venduti in Gran Bretagna. Il sistema UKCA rispecchia da vicino quello europeo ma richiede la valutazione da parte di organismi approvati nel Regno Unito. L'Irlanda del Nord, invece, continua ad accettare la marcatura CE.</p>
            <p>L'ANSI (American National Standards Institute) opera negli Stati Uniti e sviluppa standard di consenso volontario per vari settori, inclusi i DPI. A differenza di EN e UKCA, gli standard ANSI sono principalmente prestazionali e non regolatori, sebbene in alcuni casi il rispetto sia richiesto da OSHA o altre normative statali.</p>
          `
        },
        {
          title: "Marcatura CE e UKCA: Conformità e utilizzo in Gran Bretagna",
          content: `
            <p><strong>I prodotti con marcatura CE sono conformi nel Regno Unito?</strong></p>
            <p>Sì. In base agli annunci del Governo del 1° agosto 2023 e del 24 gennaio 2024, il Product Safety and Metrology etc. (Amendment) Regulations 2024, adottato il 23 maggio 2024 ed entrato in vigore il 1° ottobre 2024, ha esteso il riconoscimento della marcatura CE a tempo indeterminato in Gran Bretagna.</p>
            <p>Ciò significa che le imprese possono continuare a utilizzare sia la marcatura CE sia la UKCA per immettere i prodotti sul mercato britannico anche dopo il 31 dicembre 2024.</p>
            <p><strong>È possibile la doppia marcatura (CE e UKCA)?</strong></p>
            <p>Un prodotto può riportare entrambe le marcature solo se ha seguito le corrette procedure di valutazione della conformità. Prima del 1° ottobre 2024, questo richiede che un organismo notificato UE rilasci il certificato CE e un organismo approvato UK quello UKCA. Dal 1° ottobre 2024 sarà più semplice: se un organismo notificato UE ha già eseguito la valutazione CE e il prodotto soddisfa i requisiti di sicurezza UK, può riportare anche la marcatura UKCA. In alternativa, se la valutazione CE è stata avviata da un organismo notificato UE e completata da un organismo approvato UK, il prodotto può essere doppiamente marcato.</p>
            <p>Un prodotto già immesso sul mercato con la sola marcatura CE non può essere successivamente rimarcato UKCA, a meno che non sia sottoposto a una nuova valutazione completa da parte di un organismo approvato UK.</p>
          `
        },
        {
          title: "Perché l'ANSI è rilevante in UE e UK?",
          content: `
            <p>Sebbene l'ANSI sia uno standard statunitense, è sempre più rilevante anche in Europa, poiché molti produttori e utilizzatori lo considerano un punto di riferimento aggiuntivo in particolare dove le norme EN non si allineano pienamente a certi metodi di prova o scenari di rischio.</p>
            <p>Un esempio significativo è la resistenza al taglio nei guanti: il test ANSI/ISEA (metodo TDM per misurare la resistenza al taglio) è ampiamente adottato accanto all'EN 388 nei mercati europei. I produttori spesso riportano sia i livelli EN che ANSI per offrire una visione più completa delle prestazioni.</p>
            <p>Inoltre, gli standard ANSI sono talvolta utilizzati per occhiali protettivi, protezione acustica e abbigliamento ad alta visibilità, in particolare quando clienti statunitensi o aziende multinazionali richiedono una doppia conformità. In questo modo, i fornitori europei possono dimostrare che i loro DPI soddisfano parametri riconosciuti a livello globale, aumentando la fiducia negli acquirenti sulla qualità e l'affidabilità dei prodotti.</p>
          `
        }
      ]
    }
  }
} as const;

export type PPERegulationSectionKey = keyof typeof ppeRegulationsContent.en;

