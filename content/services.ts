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
    fr: {
      tag: 'Électricité',
      name: 'Tableaux généraux de distribution',
      description:
        'Tableaux et jeux de barres pour l’industrie et le tertiaire. Cosses serties, serrées au couple et repérées une à une.',
      specs: ['Jusqu’à 4000 A', 'Jeux de barres et tableaux', 'Phases étiquetées L1 / L2 / L3'],
      alt: 'Jeu de barres basse tension avec cosses serties et conducteurs de terre vert-jaune.',
    },
    pt: {
      tag: 'Eletricidade',
      name: 'Quadros gerais de distribuição',
      description:
        'Quadros e sistemas de barramento para indústria e serviços. Terminais cravados, apertados ao binário e marcados um a um.',
      specs: ['Até 4000 A', 'Barramentos e quadros', 'Fases etiquetadas L1 / L2 / L3'],
      alt: 'Barramento de baixa tensão com terminais cravados e condutores de terra verde-amarelo.',
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
    fr: {
      tag: 'Éclairage et force',
      name: 'Installations d’éclairage et de force',
      description:
        'Installations complètes pour bâtiments d’activité et de production : circuits de force, éclairage, éclairage de secours et tout le câblage intermédiaire.',
      specs: ['230 / 400 V', 'Circuits de force et distribution', 'Éclairage de secours'],
      alt: 'Armoire de distribution avec câblage complet en bleu, brun, noir et gris.',
    },
    pt: {
      tag: 'Luz e força',
      name: 'Instalações de iluminação e força',
      description:
        'Instalações completas para pavilhões e produção: circuitos de força, iluminação, iluminação de emergência e toda a cablagem intermédia.',
      specs: ['230 / 400 V', 'Circuitos de força e distribuição', 'Iluminação de emergência'],
      alt: 'Quadro de distribuição com cablagem completa em azul, castanho, preto e cinzento.',
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
    fr: {
      tag: 'Stockage',
      name: 'Stockage par batteries',
      description:
        'Raccordement et protection des systèmes de batteries : coffrets de regroupement DC, onduleurs et la liaison vers votre tableau général.',
      specs: ['5 – 250 kWh', 'Couplage AC et DC', 'Écrêtage de pointe et secours'],
      alt: 'Coffret de regroupement DC avec fusibles et interrupteur général AC dans une armoire de stockage.',
    },
    pt: {
      tag: 'Armazenamento',
      name: 'Armazenamento em baterias',
      description:
        'Ligação e proteção de sistemas de baterias: caixas de agrupamento DC, inversores e a ligação ao seu quadro geral.',
      specs: ['5 – 250 kWh', 'Acoplamento AC e DC', 'Corte de picos e socorro'],
      alt: 'Caixa de agrupamento DC com fusíveis e interruptor geral AC num armário de armazenamento.',
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
    fr: {
      tag: 'Recharge',
      name: 'Infrastructure de recharge',
      description:
        'D’une borne unique à une station complète : l’alimentation, la distribution et le comptage en dessous — c’est là qu’est le vrai travail.',
      specs: ['11 – 400 kW', 'Équilibrage de charge dynamique', 'Comptage certifié MID'],
      alt: 'Coffret d’alimentation avec barres repérées U, V, W et N et câbles de forte section.',
    },
    pt: {
      tag: 'Carregamento',
      name: 'Infraestrutura de carregamento',
      description:
        'De um ponto de carregamento a um posto completo: a alimentação, a distribuição e a contagem por baixo — é aí que está o verdadeiro trabalho.',
      specs: ['11 – 400 kW', 'Equilíbrio dinâmico de carga', 'Contagem certificada MID'],
      alt: 'Quadro de alimentação com barras marcadas U, V, W e N e cabos de grande secção.',
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
    fr: {
      tag: 'Service',
      name: 'Service et maintenance',
      description:
        'Inspection périodique, thermographie et service de dépannage. Nous connaissons votre installation parce que nous l’avons construite.',
      specs: ['Inspection NEN 3140', 'Thermographie', 'Service de dépannage'],
      alt: 'Monteur au travail dans une armoire de distribution, en vêtements haute visibilité.',
    },
    pt: {
      tag: 'Serviço',
      name: 'Serviço e manutenção',
      description:
        'Inspeção periódica, termografia e serviço de avarias. Conhecemos a sua instalação porque fomos nós que a construímos.',
      specs: ['Inspeção NEN 3140', 'Termografia', 'Serviço de avarias'],
      alt: 'Técnico a trabalhar dentro de um quadro de distribuição, com vestuário de alta visibilidade.',
    },
  },
];
