import { company } from './company';
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
     es:{k:'Norma de instalación en baja tensión',w:'La norma que debe cumplir toda instalación de baja tensión. Medimos e informamos en cada entrega.'},
     fr:{k:'Norme d’installation basse tension',w:'La norme que doit respecter toute installation basse tension. Nous mesurons et rapportons à chaque réception.'},
     pt:{k:'Norma de instalação em baixa tensão',w:'A norma que qualquer instalação de baixa tensão tem de cumprir. Medimos e reportamos em cada entrega.'}},
    {name:'NEN 3140', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Inspectie & onderhoud',w:'Onze monteurs zijn aangewezen als vakbekwaam persoon voor werken aan installaties onder spanning.'},
     en:{k:'Inspection & maintenance',w:'Our engineers are designated as competent persons for working on live installations.'},
     es:{k:'Inspección y mantenimiento',w:'Nuestros técnicos están designados como personas cualificadas para trabajar en instalaciones en tensión.'},
     fr:{k:'Inspection et maintenance',w:'Nos monteurs sont désignés comme personnes qualifiées pour intervenir sur des installations sous tension.'},
     pt:{k:'Inspeção e manutenção',w:'Os nossos técnicos estão designados como pessoas qualificadas para trabalhar em instalações em tensão.'}},
    {name:'VCA**', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Veiligheidsbeheersysteem',w:'Vereist om bij derden op locatie te mogen werken — op vrijwel elk industrieterrein verplicht.'},
     en:{k:'Safety management system',w:'Required to work on third-party sites — mandatory on virtually every industrial estate.'},
     es:{k:'Sistema de gestión de seguridad',w:'Necesario para trabajar en instalaciones de terceros — obligatorio en casi todo polígono industrial.'},
     fr:{k:'Système de gestion de la sécurité',w:'Exigé pour intervenir sur les sites de tiers — obligatoire sur pratiquement toute zone industrielle.'},
     pt:{k:'Sistema de gestão da segurança',w:'Exigido para trabalhar em instalações de terceiros — obrigatório em quase todas as zonas industriais.'}},
    {name:'InstallQ', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Erkenning installateur',w:'Vrijwillige kwaliteitserkenning voor zonnepanelen, opslag en laadinfrastructuur.'},
     en:{k:'Installer accreditation',w:'Voluntary quality accreditation for solar, storage and charging infrastructure.'},
     es:{k:'Acreditación de instalador',w:'Acreditación voluntaria de calidad para fotovoltaica, almacenamiento y recarga.'},
     fr:{k:'Agrément installateur',w:'Agrément qualité volontaire pour le photovoltaïque, le stockage et la recharge.'},
     pt:{k:'Acreditação de instalador',w:'Acreditação voluntária de qualidade para fotovoltaico, armazenamento e carregamento.'}},
    {name:'Netbeheerder', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Erkenning netbeheerder',w:'Geregistreerd om zelf aan te sluiten en installaties te melden bij de netbeheerder.'},
     en:{k:'Grid operator registration',w:'Registered to connect and to notify installations to the grid operator ourselves.'},
     es:{k:'Reconocimiento de la distribuidora',w:'Registrados para conectar y declarar instalaciones ante la distribuidora.'},
     fr:{k:'Agrément gestionnaire de réseau',w:'Enregistrés pour raccorder nous-mêmes et déclarer les installations au gestionnaire de réseau.'},
     pt:{k:'Reconhecimento do operador de rede',w:'Registados para ligar e declarar instalações junto do operador de rede.'}},
    {name:'DVP', reg:'TODO_NR', val:'TODO_DATUM',
     nl:{k:'Digitaal Veiligheidspaspoort',w:'Vereist om te werken in de spoor- en OV-omgeving: baan, perron, metro en tram. Daarmee mogen wij ook binnen het hek aan de slag.'},
     en:{k:'Digital safety passport',w:'Required to work in the rail and public-transport environment: track, platform, metro and tram. It lets us work inside the fence as well.'},
     es:{k:'Pasaporte digital de seguridad',w:'Necesario para trabajar en entorno ferroviario y de transporte público: vía, andén, metro y tranvía. Nos permite trabajar también dentro del vallado.'},
     fr:{k:'Passeport numérique de sécurité',w:'Exigé pour intervenir en milieu ferroviaire et de transport public : voie, quai, métro et tramway. Il nous ouvre aussi l’intérieur de l’emprise.'},
     pt:{k:'Passaporte digital de segurança',w:'Exigido para trabalhar em ambiente ferroviário e de transporte público: via, plataforma, metro e elétrico. Permite-nos trabalhar também dentro da vedação.'}},
    {name:'KvK', reg:company.kvk, val:'—',
     nl:{k:'Handelsregister',w:'Ingeschreven in het Nederlandse handelsregister; het uittreksel sturen wij op verzoek mee.'},
     en:{k:'Chamber of Commerce',w:'Registered in the Dutch trade register; we send the extract on request.'},
     es:{k:'Registro mercantil',w:'Inscritos en el registro mercantil neerlandés; enviamos el extracto si lo pide.'},
     fr:{k:'Registre du commerce',w:'Inscrits au registre du commerce néerlandais ; nous envoyons l’extrait sur demande.'},
     pt:{k:'Registo comercial',w:'Inscritos no registo comercial neerlandês; enviamos a certidão a pedido.'}}
  ];

export const certifications: Certification[] = raw.map((c) => ({
  name: c.name,
  registration: c.reg,
  validUntil: c.val,
  nl: { kind: c.nl.k, meaning: c.nl.w },
  en: { kind: c.en.k, meaning: c.en.w },
  es: { kind: c.es.k, meaning: c.es.w },
  fr: { kind: c.fr.k, meaning: c.fr.w },
  pt: { kind: c.pt.k, meaning: c.pt.w },
}));
