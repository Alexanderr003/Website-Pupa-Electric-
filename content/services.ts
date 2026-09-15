import type { Localised } from './types';

export type ServiceCopy = {
  /** short category chip shown on the card image */
  tag: string;
  name: string;
  description: string;
  /** hard specifications — the numbers a buyer actually compares */
  specs: string[];
  /** what the photograph on the card is actually showing */
  alt: string;
};

export type Service = Localised<ServiceCopy> & {
  id: string;
  /** basename in /public/img */
  image: string;
};

/**
 * The five disciplines lettered on the company van, in the company's own words.
 *
 * Medium voltage is deliberately absent: the company does not hold the
 * certification for terminating MV cable, so the site must not offer it.
 */
export const services: Service[] = [
  {
    id: 'elektra',
    image: 'svc-elektra',
    nl: {
      tag: 'Elektra',
      name: 'Hoofdverdeelinrichtingen',
      description:
        'Verdeelkasten en railsystemen voor industrie en utiliteit. Kabelschoenen geperst, aangedraaid op moment en per aansluiting gemerkt.',
      specs: ['Tot 4000 A', 'Railsystemen & verdelers', 'Fasen gelabeld L1 / L2 / L3'],
      alt: 'Laagspanningsrail met geperste kabelschoenen en groen-gele aardleidingen.',
    },
    en: {
      tag: 'Power',
      name: 'Main distribution boards',
      description:
        'Distribution boards and busbar systems for industry and utilities. Lugs crimped, torqued to spec and marked per connection.',
      specs: ['Up to 4000 A', 'Busbar systems & boards', 'Phases labelled L1 / L2 / L3'],
      alt: 'Low-voltage busbar with crimped cable lugs and green-yellow earth conductors.',
    },
    es: {
      tag: 'Electra',
      name: 'Cuadros generales de distribución',
      description:
        'Cuadros y sistemas de embarrado para industria y terciario. Terminales prensados, apretados a par y marcados uno a uno.',
      specs: ['Hasta 4000 A', 'Embarrados y cuadros', 'Fases rotuladas L1 / L2 / L3'],
      alt: 'Embarrado de baja tensión con terminales prensados y conductores de tierra amarillo-verde.',
    },
  },
  {
    id: 'licht-kracht',
    image: 'svc-licht-kracht',
    nl: {
      tag: 'Licht & kracht',
      name: 'Licht- en krachtinstallaties',
      description:
        'Complete installaties voor bedrijfspanden en productie: krachtgroepen, verlichting, noodverlichting en alle bekabeling ertussen.',
      specs: ['230 / 400 V', 'Krachtgroepen & verdeling', 'Noodverlichting'],
      alt: 'Verdeelkast met complete bekabeling in blauw, bruin, zwart en grijs.',
    },
    en: {
      tag: 'Light & power',
      name: 'Lighting and power installations',
      description:
        'Complete installations for commercial and production buildings: power circuits, lighting, emergency lighting and all the cabling between.',
      specs: ['230 / 400 V', 'Power circuits & distribution', 'Emergency lighting'],
      alt: 'Distribution cabinet with complete cabling in blue, brown, black and grey.',
    },
    es: {
      tag: 'Luz y fuerza',
      name: 'Instalaciones de alumbrado y fuerza',
      description:
        'Instalaciones completas para naves y producción: circuitos de fuerza, alumbrado, alumbrado de emergencia y todo el cableado intermedio.',
      specs: ['230 / 400 V', 'Circuitos de fuerza y reparto', 'Alumbrado de emergencia'],
      alt: 'Cuadro de distribución con cableado completo en azul, marrón, negro y gris.',
    },
  },
  {
    id: 'opslag',
    image: 'svc-opslag',
    nl: {
      tag: 'Energieopslag',
      name: 'Batterijopslag',
      description:
        'Aansluiting en beveiliging van batterijsystemen: DC-verzamelaars, omvormers en de koppeling naar uw hoofdverdeling.',
      specs: ['5 – 250 kWh', 'AC- en DC-gekoppeld', 'Peakshaving & noodstroom'],
      alt: 'DC-verzamelaar met zekeringen en AC-hoofdschakelaar in een opslagkast.',
    },
    en: {
      tag: 'Storage',
      name: 'Battery storage',
      description:
        'Connection and protection of battery systems: DC combiners, inverters and the tie-in to your main distribution.',
      specs: ['5 – 250 kWh', 'AC- and DC-coupled', 'Peak shaving & backup'],
      alt: 'DC combiner with fuses and AC main switch inside a storage cabinet.',
    },
    es: {
      tag: 'Almacenaje',
      name: 'Almacenamiento en baterías',
      description:
        'Conexión y protección de sistemas de baterías: cajas de agrupación CC, inversores y el enlace con su cuadro general.',
      specs: ['5 – 250 kWh', 'Acoplamiento CA y CC', 'Recorte de picos y respaldo'],
      alt: 'Caja de agrupación de continua con fusibles e interruptor general de alterna.',
    },
  },
  {
    id: 'laadinfra',
    image: 'svc-laadinfra',
    nl: {
      tag: 'Laadpalen',
      name: 'Laadinfrastructuur',
      description:
        'Van één laadpaal tot een laadplein: de voeding, de verdeling en de meting die eronder liggen — daar zit het echte werk.',
      specs: ['11 – 400 kW', 'Dynamisch load balancing', 'MID-gekeurde meting'],
      alt: 'Voedingskast met rails gemerkt U, V, W en N en zware aansluitkabels.',
    },
    en: {
      tag: 'Charging',
      name: 'Charging infrastructure',
      description:
        'From a single charge point to a fleet hub: the supply, the distribution and the metering underneath — that is where the real work sits.',
      specs: ['11 – 400 kW', 'Dynamic load balancing', 'MID-certified metering'],
      alt: 'Supply cabinet with bars marked U, V, W and N and heavy connection cables.',
    },
    es: {
      tag: 'Recarga',
      name: 'Infraestructura de recarga',
      description:
        'De un punto de recarga a una electrolinera: la alimentación, el reparto y la medida que hay debajo — ahí está el trabajo de verdad.',
      specs: ['11 – 400 kW', 'Reparto dinámico de carga', 'Medida certificada MID'],
      alt: 'Cuadro de alimentación con pletinas marcadas U, V, W y N y cables de gran sección.',
    },
  },
  {
    id: 'service',
    image: 'svc-service',
    nl: {
      tag: 'Service',
      name: 'Service & onderhoud',
      description:
        'Periodieke inspectie, thermografie en storingsdienst. Wij kennen uw installatie omdat wij hem gebouwd hebben.',
      specs: ['NEN 3140-inspectie', 'Thermografie', 'Storingsdienst'],
      alt: 'Monteur aan het werk in een verdeelkast, in signaalkleding.',
    },
    en: {
      tag: 'Service',
      name: 'Service & maintenance',
      description:
        'Periodic inspection, thermography and a breakdown service. We know your installation because we built it.',
      specs: ['NEN 3140 inspection', 'Thermography', 'Breakdown service'],
      alt: 'Engineer working inside a distribution cabinet, in high-visibility clothing.',
    },
    es: {
      tag: 'Servicio',
      name: 'Servicio y mantenimiento',
      description:
        'Inspección periódica, termografía y servicio de averías. Conocemos su instalación porque la construimos nosotros.',
      specs: ['Inspección NEN 3140', 'Termografía', 'Servicio de averías'],
      alt: 'Técnico trabajando dentro de un cuadro de distribución, con ropa de alta visibilidad.',
    },
  },
];
