import type { Localised } from './types';

export type DossierCopy = {
  title: string;
  summary: string;
  /** the standard that was checked at this exact point in the job */
  norm: string;
};

export type DossierPhase = Localised<DossierCopy> & {
  /** ISO date — rendered per locale with Intl.DateTimeFormat */
  date: string;
  crew: string;
  /** photographs actually taken during this phase */
  photos: string[];
};

/**
 * One real job, phase by phase: a 3200 A main distribution board with a busbar
 * system. Client and location are left out on purpose; everything else —
 * the sequence, the checks, the photographs — is what the customer receives.
 */
export const dossier: DossierPhase[] = [
  {
    date: '2026-03-02',
    crew: '2',
    photos: ['work-09'],
    nl: {
      title: 'Intake & inmeten',
      summary:
        'Kabeltracé en invoer opgenomen, aansluitwaarde en kortsluitvermogen opgevraagd bij de netbeheerder, en de bestaande kabelkelder ingemeten.',
      norm: 'Aansluitwaarde en kortsluitvermogen schriftelijk bevestigd',
    },
    en: {
      title: 'Survey & measuring up',
      summary:
        'Cable route and entry recorded, connection capacity and short-circuit power requested from the grid operator, and the existing cable basement measured.',
      norm: 'Connection capacity and short-circuit power confirmed in writing',
    },
    es: {
      title: 'Visita previa y toma de medidas',
      summary:
        'Trazado y entrada de cable registrados, potencia de acometida y poder de cortocircuito solicitados a la distribuidora, y sótano de cables medido.',
      norm: 'Potencia y poder de cortocircuito confirmados por escrito',
    },
  },
  {
    date: '2026-03-06',
    crew: '1',
    photos: ['work-03'],
    nl: {
      title: 'Ontwerp & railberekening',
      summary:
        'Railmaten, kortsluitvastheid en selectiviteit doorgerekend; velden vooraf genummerd zodat de kast op papier al klopt.',
      norm: 'NEN 1010 deel 4 — beveiliging tegen overstroom',
    },
    en: {
      title: 'Design & busbar calculation',
      summary:
        'Busbar sizing, short-circuit withstand and discrimination calculated; sections numbered in advance so the board is right on paper first.',
      norm: 'NEN 1010 part 4 — overcurrent protection',
    },
    es: {
      title: 'Diseño y cálculo de embarrado',
      summary:
        'Dimensionado de pletinas, resistencia al cortocircuito y selectividad calculados; campos numerados de antemano.',
      norm: 'NEN 1010 parte 4 — protección contra sobreintensidad',
    },
  },
  {
    date: '2026-03-18',
    crew: '2',
    photos: ['work-06', 'work-04'],
    nl: {
      title: 'Montage',
      summary:
        'Railsysteem opgebouwd, kabelschoenen geperst met de juiste matrijs, bouten aangedraaid op moment en direct gemarkeerd.',
      norm: 'Aandraaimomenten gelogd en zichtbaar gemarkeerd',
    },
    en: {
      title: 'Installation',
      summary:
        'Busbar system built up, lugs crimped with the correct die, bolts torqued to spec and marked on the spot.',
      norm: 'Torque values logged and visibly marked',
    },
    es: {
      title: 'Montaje',
      summary:
        'Embarrado montado, terminales prensados con la matriz correcta, tornillos apretados a par y marcados en el acto.',
      norm: 'Pares de apriete registrados y marcados a la vista',
    },
  },
  {
    date: '2026-03-19',
    crew: '2',
    photos: ['work-01', 'work-07'],
    nl: {
      title: 'Keuring & inbedrijfstelling',
      summary:
        'Isolatieweerstand, aardverspreidingsweerstand en uitschakeltijden gemeten; fasen gecontroleerd en gelabeld voordat er spanning op ging.',
      norm: 'NEN 1010 — meetrapport opgesteld',
    },
    en: {
      title: 'Inspection & commissioning',
      summary:
        'Insulation resistance, earth electrode resistance and trip times measured; phases checked and labelled before anything went live.',
      norm: 'NEN 1010 — test report issued',
    },
    es: {
      title: 'Inspección y puesta en marcha',
      summary:
        'Resistencia de aislamiento, puesta a tierra y tiempos de disparo medidos; fases verificadas y rotuladas antes de dar tensión.',
      norm: 'NEN 1010 — informe de medición emitido',
    },
  },
  {
    date: '2026-03-20',
    crew: '1',
    photos: ['work-02'],
    nl: {
      title: 'Oplevering & dossier',
      summary:
        'Schema, meetrapport, foto’s van elke fase, garantiebewijzen en bedieningsinstructie overhandigd en ter plaatse doorgenomen.',
      norm: 'Dossier ondertekend door klant en monteur',
    },
    en: {
      title: 'Handover & dossier',
      summary:
        'Diagram, test report, photographs of every phase, warranty certificates and operating instructions handed over and walked through on site.',
      norm: 'Dossier signed by client and engineer',
    },
    es: {
      title: 'Entrega y expediente',
      summary:
        'Esquema, informe de medición, fotos de cada fase, certificados de garantía e instrucciones entregados y repasados in situ.',
      norm: 'Expediente firmado por cliente y técnico',
    },
  },
];
