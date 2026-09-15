import type { Locale } from './config';

/**
 * Strings added on top of the ported marketing copy: the quote flow, the legal
 * pages and a few chrome labels. Same parity guarantee as `dictionaries.ts` —
 * `nl` defines the shape, the other two must match it exactly.
 */
const ui = {
  nl: {
    legalPrivacy: 'Privacy',
    vanAlt: 'De bus van Pupa Elektrotechniek naast een rij batterijkasten op een bedrijventerrein.',
    vanTitle: 'Eén bus, één ploeg, van de eerste meting tot de laatste keuring.',
    vanBody:
      'Wij besteden het zware werk niet uit. Dezelfde monteurs die de rails opbouwen, meten de installatie ook door en zetten hun handtekening onder het dossier. Daarom weten wij bij een storing precies waar wij moeten kijken.',
    vanServices: 'Elektra · Licht en kracht · Energieopslag · Laadpalen · Service',
    legalTerms: 'Algemene voorwaarden',
    whatsappIntro: 'Goedendag, ik heb een vraag over een installatie.',

    qTitle: 'Offerte aanvragen',
    qLede:
      'Vier korte stappen. Hoe concreter uw antwoorden, hoe scherper de berekening die u terugkrijgt.',
    qStep: 'Stap',
    qOf: 'van',
    s1Title: 'Wat heeft u nodig?',
    s2Title: 'Uw situatie',
    s3Title: 'Toelichting',
    s4Title: 'Hoe bereiken wij u?',

    fService: 'Dienst',
    fCustomer: 'U vraagt aan als',
    fResidential: 'Particulier',
    fBusiness: 'Zakelijk',
    fConnection: 'Huidige aansluiting',
    fConnUnknown: 'Weet ik niet',
    fTimeline: 'Wanneer',
    fAsap: 'Zo snel mogelijk',
    f1to3: 'Binnen 1–3 maanden',
    f3to6: 'Binnen 3–6 maanden',
    fOrienting: 'Nog oriënterend',
    fMessage: 'Toelichting',
    fMessageHint: 'Bijvoorbeeld: dakoppervlak, aantal laadpunten, bestaande omvormer…',
    fName: 'Naam',
    fEmail: 'E-mailadres',
    fPhone: 'Telefoon',
    fPostcode: 'Postcode',
    fHouseNumber: 'Huisnummer',
    fCompany: 'Bedrijfsnaam',
    fPreferred: 'Liefst contact via',
    fByPhone: 'Bellen',
    fByEmail: 'Mailen',
    fByWhatsapp: 'WhatsApp',
    fConsent: 'Ik ga ermee akkoord dat Pupa Elektrotechniek mijn gegevens gebruikt om deze aanvraag te beantwoorden.',
    fOptional: 'optioneel',

    back: 'Vorige',
    next: 'Volgende',
    submit: 'Aanvraag versturen',
    submitting: 'Aanvraag versturen…',
    reviewTitle: 'Controleer uw aanvraag',
    edit: 'Wijzigen',

    errRequired: 'Dit veld is verplicht.',
    errEmail: 'Vul een geldig e-mailadres in.',
    errPhone: 'Vul een geldig telefoonnummer in.',
    errPostcode: 'Vul een geldige postcode in, bijvoorbeeld 2011 AB.',
    errConsent: 'Zonder akkoord kunnen wij uw aanvraag niet in behandeling nemen.',
    errCompany: 'Vul de bedrijfsnaam in.',
    errorSummary: 'Er ontbreekt nog iets. Controleer de gemarkeerde velden.',
    errorTitle: 'Versturen is niet gelukt',
    errorBody: 'Probeer het opnieuw, of bel ons rechtstreeks — dat werkt altijd.',

    successTitle: 'Aanvraag ontvangen',
    successBody:
      'Wij nemen binnen twee werkdagen contact op met een onderbouwde berekening. Geen standaardprijs: wij rekenen uw situatie door.',
    successRef: 'Kenmerk',
    backHome: 'Terug naar de homepage',
    devNotice:
      'Ontwikkelmodus: er is geen RESEND_API_KEY ingesteld, dus de aanvraag is naar de serverlog geschreven in plaats van gemaild.',

    privacyTitle: 'Privacyverklaring',
    termsTitle: 'Algemene voorwaarden',
    legalDraft:
      'Deze tekst is een opzet. Laat hem door een jurist controleren voordat de site live gaat; de onderdelen die om bedrijfsgegevens vragen staan gemarkeerd als TODO.',
  },
  en: {
    legalPrivacy: 'Privacy',
    vanAlt: 'The Pupa Elektrotechniek van beside a row of battery cabinets on an industrial estate.',
    vanTitle: 'One van, one crew, from the first measurement to the final inspection.',
    vanBody:
      'We do not subcontract the heavy work. The same engineers who build the busbars also test the installation and sign the dossier. That is why, when something trips, we already know where to look.',
    vanServices: 'Power · Light & power · Storage · Charging · Service',
    legalTerms: 'Terms and conditions',
    whatsappIntro: 'Hello, I have a question about an installation.',

    qTitle: 'Request a quote',
    qLede:
      'Four short steps. The more concrete your answers, the sharper the calculation you get back.',
    qStep: 'Step',
    qOf: 'of',
    s1Title: 'What do you need?',
    s2Title: 'Your situation',
    s3Title: 'Details',
    s4Title: 'How do we reach you?',

    fService: 'Service',
    fCustomer: 'You are asking as',
    fResidential: 'Private',
    fBusiness: 'Business',
    fConnection: 'Current connection',
    fConnUnknown: "I don't know",
    fTimeline: 'Timing',
    fAsap: 'As soon as possible',
    f1to3: 'Within 1–3 months',
    f3to6: 'Within 3–6 months',
    fOrienting: 'Just exploring',
    fMessage: 'Details',
    fMessageHint: 'For example: roof area, number of charge points, existing inverter…',
    fName: 'Name',
    fEmail: 'Email address',
    fPhone: 'Phone',
    fPostcode: 'Postcode',
    fHouseNumber: 'House number',
    fCompany: 'Company name',
    fPreferred: 'Preferred contact',
    fByPhone: 'Phone',
    fByEmail: 'Email',
    fByWhatsapp: 'WhatsApp',
    fConsent: 'I agree that Pupa Elektrotechniek may use my details to answer this request.',
    fOptional: 'optional',

    back: 'Back',
    next: 'Next',
    submit: 'Send request',
    submitting: 'Sending request…',
    reviewTitle: 'Check your request',
    edit: 'Change',

    errRequired: 'This field is required.',
    errEmail: 'Enter a valid email address.',
    errPhone: 'Enter a valid phone number.',
    errPostcode: 'Enter a valid postcode, for example 2011 AB.',
    errConsent: 'Without your agreement we cannot process the request.',
    errCompany: 'Enter the company name.',
    errorSummary: 'Something is still missing. Check the marked fields.',
    errorTitle: 'Sending failed',
    errorBody: 'Try again, or call us directly — that always works.',

    successTitle: 'Request received',
    successBody:
      'We will get back to you within two working days with a substantiated calculation. Not a list price: we work through your situation.',
    successRef: 'Reference',
    backHome: 'Back to the homepage',
    devNotice:
      'Development mode: no RESEND_API_KEY is set, so the request was written to the server log instead of emailed.',

    privacyTitle: 'Privacy statement',
    termsTitle: 'Terms and conditions',
    legalDraft:
      'This text is a draft. Have a lawyer review it before the site goes live; the parts that need company details are marked TODO.',
  },
  es: {
    legalPrivacy: 'Privacidad',
    vanAlt: 'La furgoneta de Pupa Elektrotechniek junto a una fila de armarios de baterías en un polígono.',
    vanTitle: 'Una furgoneta, un equipo, de la primera medición a la inspección final.',
    vanBody:
      'No subcontratamos el trabajo pesado. Los mismos técnicos que montan los embarrados miden la instalación y firman el expediente. Por eso, cuando algo salta, ya sabemos dónde mirar.',
    vanServices: 'Electra · Luz y fuerza · Almacenaje · Recarga · Servicio',
    legalTerms: 'Condiciones generales',
    whatsappIntro: 'Buenos días, tengo una consulta sobre una instalación.',

    qTitle: 'Pedir presupuesto',
    qLede:
      'Cuatro pasos breves. Cuanto más concretas sean sus respuestas, más ajustado será el cálculo que reciba.',
    qStep: 'Paso',
    qOf: 'de',
    s1Title: '¿Qué necesita?',
    s2Title: 'Su situación',
    s3Title: 'Detalles',
    s4Title: '¿Cómo le contactamos?',

    fService: 'Servicio',
    fCustomer: 'Solicita como',
    fResidential: 'Particular',
    fBusiness: 'Empresa',
    fConnection: 'Acometida actual',
    fConnUnknown: 'No lo sé',
    fTimeline: 'Plazo',
    fAsap: 'Lo antes posible',
    f1to3: 'En 1–3 meses',
    f3to6: 'En 3–6 meses',
    fOrienting: 'Solo estoy mirando',
    fMessage: 'Detalles',
    fMessageHint: 'Por ejemplo: superficie de cubierta, número de puntos de recarga, inversor existente…',
    fName: 'Nombre',
    fEmail: 'Correo electrónico',
    fPhone: 'Teléfono',
    fPostcode: 'Código postal',
    fHouseNumber: 'Número',
    fCompany: 'Empresa',
    fPreferred: 'Prefiere que le contactemos por',
    fByPhone: 'Teléfono',
    fByEmail: 'Correo',
    fByWhatsapp: 'WhatsApp',
    fConsent: 'Acepto que Pupa Elektrotechniek use mis datos para responder a esta solicitud.',
    fOptional: 'opcional',

    back: 'Atrás',
    next: 'Siguiente',
    submit: 'Enviar solicitud',
    submitting: 'Enviando solicitud…',
    reviewTitle: 'Revise su solicitud',
    edit: 'Cambiar',

    errRequired: 'Este campo es obligatorio.',
    errEmail: 'Introduzca un correo electrónico válido.',
    errPhone: 'Introduzca un teléfono válido.',
    errPostcode: 'Introduzca un código postal válido, por ejemplo 2011 AB.',
    errConsent: 'Sin su consentimiento no podemos tramitar la solicitud.',
    errCompany: 'Indique el nombre de la empresa.',
    errorSummary: 'Falta algo. Revise los campos marcados.',
    errorTitle: 'No se pudo enviar',
    errorBody: 'Inténtelo de nuevo o llámenos directamente — eso siempre funciona.',

    successTitle: 'Solicitud recibida',
    successBody:
      'Le responderemos en dos días laborables con un cálculo razonado. No es una tarifa de catálogo: calculamos su caso.',
    successRef: 'Referencia',
    backHome: 'Volver a la página principal',
    devNotice:
      'Modo de desarrollo: no hay RESEND_API_KEY configurada, así que la solicitud se escribió en el log del servidor en lugar de enviarse por correo.',

    privacyTitle: 'Declaración de privacidad',
    termsTitle: 'Condiciones generales',
    legalDraft:
      'Este texto es un borrador. Que lo revise un jurista antes de publicar la web; las partes que requieren datos de empresa están marcadas como TODO.',
  },
};

export type UiDictionary = typeof ui.nl;

export const uiDictionaries: Record<Locale, UiDictionary> = ui;
