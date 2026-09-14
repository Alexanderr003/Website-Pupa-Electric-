import type { Localised } from './types';

export type CertCopy = {
  /** what kind of thing this is: a norm, an accreditation, a registration */
  kind: string;
  /** plain language: what it means for the customer, not what it means to us */
  meaning: string;
};

export type Certification = Localised<CertCopy> & {
  /** never translated — norm names are proper nouns */
  name: string;
  registration: string;
  validUntil: string;
};

const raw = [
    {name:'NEN 1010', reg:'—', val:'—',
     nl:{k:'Installatienorm laagspanning',w:'De norm waaraan elke laagspanningsinstallatie moet voldoen. Wij meten en rapporteren bij élke oplevering.'},
     en:{k:'Low-voltage installation standard',w:'The standard every low-voltage installation must meet. We measure and report on every single handover.'},
     es:{k:'Norma de instalación en baja tensión',w:'La norma que debe cumplir toda instalación de baja tensión. Medimos e informamos en cada entrega.'}},
    {name:'NEN 3140', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Inspectie & onderhoud',w:'Onze monteurs zijn aangewezen als vakbekwaam persoon voor werken aan installaties onder spanning.'},
     en:{k:'Inspection & maintenance',w:'Our engineers are designated as competent persons for working on live installations.'},
     es:{k:'Inspección y mantenimiento',w:'Nuestros técnicos están designados como personas cualificadas para trabajar en instalaciones en tensión.'}},
    {name:'VCA**', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Veiligheidsbeheersysteem',w:'Vereist om bij derden op locatie te mogen werken — op vrijwel elk industrieterrein verplicht.'},
     en:{k:'Safety management system',w:'Required to work on third-party sites — mandatory on virtually every industrial estate.'},
     es:{k:'Sistema de gestión de seguridad',w:'Necesario para trabajar en instalaciones de terceros — obligatorio en casi todo polígono industrial.'}},
    {name:'InstallQ', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Erkenning installateur',w:'Vrijwillige kwaliteitserkenning voor zonnepanelen, opslag en laadinfrastructuur.'},
     en:{k:'Installer accreditation',w:'Voluntary quality accreditation for solar, storage and charging infrastructure.'},
     es:{k:'Acreditación de instalador',w:'Acreditación voluntaria de calidad para fotovoltaica, almacenamiento y recarga.'}},
    {name:'Netbeheerder', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Erkenning netbeheerder',w:'Geregistreerd om zelf aan te sluiten en installaties te melden bij de netbeheerder.'},
     en:{k:'Grid operator registration',w:'Registered to connect and to notify installations to the grid operator ourselves.'},
     es:{k:'Reconocimiento de la distribuidora',w:'Registrados para conectar y declarar instalaciones ante la distribuidora.'}},
    {name:'KvK', reg:'TODO_KVK', val:'—',
     nl:{k:'Handelsregister',w:'Ingeschreven in het Nederlandse handelsregister; het uittreksel sturen wij op verzoek mee.'},
     en:{k:'Chamber of Commerce',w:'Registered in the Dutch trade register; we send the extract on request.'},
     es:{k:'Registro mercantil',w:'Inscritos en el registro mercantil neerlandés; enviamos el extracto si lo pide.'}}
  ];

export const certifications: Certification[] = raw.map((c) => ({
  name: c.name,
  registration: c.reg,
  validUntil: c.val,
  nl: { kind: c.nl.k, meaning: c.nl.w },
  en: { kind: c.en.k, meaning: c.en.w },
  es: { kind: c.es.k, meaning: c.es.w },
}));
