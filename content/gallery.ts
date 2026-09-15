import type { Localised } from './types';

export type ShotCopy = {
  /** what you are looking at, named precisely — this is the point of the section */
  caption: string;
  alt: string;
};

export type Shot = Localised<ShotCopy> & { image: string };

/**
 * Real photographs from real jobs, captioned with what is actually in frame.
 * Nothing is staged and nothing is a render: the whole argument of the page is
 * that the workmanship survives being looked at closely.
 */
export const gallery: Shot[] = [
  {
    image: 'work-01',
    nl: { caption: 'Hoofdschakelaar op koperen rail; fasen gemerkt L1, L2 en L3.', alt: 'Vermogensschakelaar boven koperen rails met gele fase-etiketten.' },
    en: { caption: 'Main breaker on copper busbar; phases marked L1, L2 and L3.', alt: 'Circuit breaker above copper busbars with yellow phase labels.' },
    es: { caption: 'Interruptor general sobre embarrado de cobre; fases marcadas L1, L2 y L3.', alt: 'Interruptor automático sobre embarrados de cobre con etiquetas de fase amarillas.' },
  },
  {
    image: 'work-02',
    nl: { caption: 'PEN-rail met geperste kabelschoenen; elke aardleiding apart afgemonteerd.', alt: 'Koperen PEN-rail met blauwe aders en groen-gele aardleidingen.' },
    en: { caption: 'PEN bar with crimped lugs; every earth conductor terminated separately.', alt: 'Copper PEN bar with blue cores and green-yellow earth conductors.' },
    es: { caption: 'Pletina PEN con terminales prensados; cada conductor de tierra rematado aparte.', alt: 'Pletina PEN de cobre con conductores azules y de tierra amarillo-verde.' },
  },
  {
    image: 'work-03',
    nl: { caption: 'Railframe met gemerkte velden; elke bout heeft een aandraaimarkering.', alt: 'Koperen railconstructie met velden 3L, 11L en 12L en rode moermarkeringen.' },
    en: { caption: 'Busbar frame with labelled sections; every bolt carries a torque mark.', alt: 'Copper busbar structure with sections 3L, 11L and 12L and red nut markings.' },
    es: { caption: 'Estructura de embarrado con campos rotulados; cada tornillo lleva marca de par.', alt: 'Estructura de cobre con campos 3L, 11L y 12L y marcas rojas en las tuercas.' },
  },
  {
    image: 'work-04',
    nl: { caption: 'Railaansluiting L1–L3 met krimpkousen, aardrail eronder gescheiden.', alt: 'Koperen rails met kabelschoenen en een aparte aardrail linksonder.' },
    en: { caption: 'Busbar connection L1–L3 with heat-shrink, earth bar kept separate below.', alt: 'Copper busbars with cable lugs and a separate earth bar at lower left.' },
    es: { caption: 'Conexión al embarrado L1–L3 con termorretráctil y pletina de tierra separada.', alt: 'Embarrados de cobre con terminales y pletina de tierra independiente abajo.' },
  },
  {
    image: 'work-05',
    nl: { caption: 'Transformator met MS-kabels in klemmen, over de hele rij gelijk gebogen.', alt: 'Groene transformator met rode middenspanningskabels in kabelklemmen.' },
    en: { caption: 'Transformer with MV cables in clamps, bent alike across the whole run.', alt: 'Green transformer with red medium-voltage cables in cable clamps.' },
    es: { caption: 'Transformador con cables de MT en abrazaderas, curvados igual en toda la fila.', alt: 'Transformador verde con cables rojos de media tensión en abrazaderas.' },
  },
  {
    image: 'work-06',
    nl: { caption: 'Montage in een middenspanningsveld, volgens NEN 3140 met aangewezen persoon.', alt: 'Monteur in signaalkleding werkt in een kast met rode MS-kabels en koperrails.' },
    en: { caption: 'Working inside a medium-voltage panel, to NEN 3140 with a designated person.', alt: 'Engineer in high-visibility clothing working in a cabinet with red MV cables and copper bars.' },
    es: { caption: 'Montaje en una celda de media tensión, según NEN 3140 con persona cualificada.', alt: 'Técnico con ropa de alta visibilidad trabajando entre cables rojos de MT y pletinas de cobre.' },
  },
  {
    image: 'work-07',
    nl: { caption: 'Kabelschoenen geperst en gemerkt; mantels op gelijke hoogte afgewerkt.', alt: 'Koperen rail met een rij geperste kabelschoenen en witte, bruine en zwarte aders.' },
    en: { caption: 'Lugs crimped and marked; sheaths finished to the same height.', alt: 'Copper bar with a row of crimped lugs and white, brown and black cores.' },
    es: { caption: 'Terminales prensados y marcados; cubiertas rematadas a la misma altura.', alt: 'Pletina de cobre con una fila de terminales prensados y conductores blancos, marrones y negros.' },
  },
  {
    image: 'work-08',
    nl: { caption: 'Aders met krimpkous op een messing rail, per pool gemerkt.', alt: 'Rode kabels met blauwe krimpkous op een messing rail in een groene kast.' },
    en: { caption: 'Cores with heat-shrink onto a brass bar, marked per pole.', alt: 'Red cables with blue heat-shrink on a brass bar inside a green enclosure.' },
    es: { caption: 'Conductores con termorretráctil sobre pletina de latón, marcados por polo.', alt: 'Cables rojos con termorretráctil azul sobre pletina de latón en un armario verde.' },
  },
  {
    image: 'work-09',
    nl: { caption: 'Kabelkelder: MS-kabels op klemmen met dezelfde buigradius over de hele rij.', alt: 'Kabelkelder met rode middenspanningskabels op zwarte kabelklemmen.' },
    en: { caption: 'Cable basement: MV cables on clamps with the same bend radius throughout.', alt: 'Cable basement with red medium-voltage cables on black cable clamps.' },
    es: { caption: 'Sótano de cables: cables de MT en abrazaderas con el mismo radio de curvatura.', alt: 'Sótano de cables con cables rojos de media tensión sobre abrazaderas negras.' },
  },
];
