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
  /** how many photographs belong to this phase (placeholders until supplied) */
  photos: number;
  crew: string;
};

const raw = [
    {date:'2026-03-02', shots:2, crew:'2',
     nl:{t:'Intake & netberekening',d:'Aansluitwaarde en kortsluitvermogen opgevraagd bij de netbeheerder; verbruiksprofiel uitgelezen uit de slimme meter.',n:'Aansluitwaarde 3×25 A geverifieerd'},
     en:{t:'Intake & grid calculation',d:'Connection capacity and short-circuit power requested from the grid operator; consumption profile read from the smart meter.',n:'Connection capacity 3×25 A verified'},
     es:{t:'Visita previa y cálculo de red',d:'Potencia de acometida y poder de cortocircuito solicitados a la distribuidora; perfil de consumo leído del contador inteligente.',n:'Acometida 3×25 A verificada'}},
    {date:'2026-03-06', shots:1, crew:'1',
     nl:{t:'Ontwerp & eendraadschema',d:'Kabelberekening, selectiviteit en plaatsbepaling; het schema is vooraf met de klant doorgenomen.',n:'NEN 1010 deel 4 — beveiliging tegen overstroom'},
     en:{t:'Design & one-line diagram',d:'Cable sizing, discrimination and siting; the diagram was walked through with the client beforehand.',n:'NEN 1010 part 4 — overcurrent protection'},
     es:{t:'Diseño y esquema unifilar',d:'Cálculo de secciones, selectividad y ubicación; el esquema se repasó con el cliente de antemano.',n:'NEN 1010 parte 4 — protección contra sobreintensidad'}},
    {date:'2026-03-18', shots:3, crew:'2',
     nl:{t:'Montage',d:'Batterijkast geplaatst, voeding aangelegd, kabelschoenen op moment aangedraaid en per aansluiting gelogd.',n:'Aandraaimomenten gelogd per aansluiting'},
     en:{t:'Installation',d:'Battery cabinet placed, supply routed, cable lugs torqued to spec and logged per terminal.',n:'Torque values logged per terminal'},
     es:{t:'Montaje',d:'Armario de baterías colocado, alimentación tendida, terminales apretados a par y registrados uno a uno.',n:'Pares de apriete registrados por terminal'}},
    {date:'2026-03-19', shots:2, crew:'2',
     nl:{t:'Keuring & inbedrijfstelling',d:'Isolatieweerstand, aardverspreidingsweerstand en uitschakeltijd van de aardlekbeveiliging gemeten en genoteerd.',n:'NEN 1010 — meetrapport opgesteld'},
     en:{t:'Inspection & commissioning',d:'Insulation resistance, earth electrode resistance and RCD trip time measured and recorded.',n:'NEN 1010 — test report issued'},
     es:{t:'Inspección y puesta en marcha',d:'Resistencia de aislamiento, resistencia de puesta a tierra y tiempo de disparo del diferencial medidos y anotados.',n:'NEN 1010 — informe de medición emitido'}},
    {date:'2026-03-20', shots:1, crew:'1',
     nl:{t:'Oplevering & dossier',d:'Eendraadschema, meetrapport, foto’s, garantiebewijzen en bedieningsinstructie overhandigd en doorgenomen.',n:'Dossier ondertekend door klant en monteur'},
     en:{t:'Handover & dossier',d:'One-line diagram, test report, photographs, warranty certificates and operating instructions handed over and explained.',n:'Dossier signed by client and engineer'},
     es:{t:'Entrega y expediente',d:'Esquema unifilar, informe de medición, fotos, certificados de garantía e instrucciones de uso entregados y explicados.',n:'Expediente firmado por cliente y técnico'}}
  ];

export const dossier: DossierPhase[] = raw.map((p) => ({
  date: p.date,
  photos: p.shots,
  crew: p.crew,
  nl: { title: p.nl.t, summary: p.nl.d, norm: p.nl.n },
  en: { title: p.en.t, summary: p.en.d, norm: p.en.n },
  es: { title: p.es.t, summary: p.es.d, norm: p.es.n },
}));
