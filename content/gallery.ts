import type { Localised } from './types';

export type ShotCopy = {
  /** what you are looking at, named precisely — this is the point of the section */
  caption: string;
  alt: string;
};

export type Shot = Localised<ShotCopy> & { image: string };

/**
 * Real photographs from real jobs, captioned with what is actually in frame.
 * Captions stay strictly descriptive of what the lens caught — the company is
 * not certified to terminate medium-voltage cable, so nothing here may read as
 * an offer of that work.
 * Nothing is staged and nothing is a render: the whole argument of the page is
 * that the workmanship survives being looked at closely.
 */
export const gallery: Shot[] = [
  {
    image: 'work-01',
    nl: { caption: 'Hoofdschakelaar op koperen rail; fasen gemerkt L1, L2 en L3.', alt: 'Vermogensschakelaar boven koperen rails met gele fase-etiketten.' },
    en: { caption: 'Main breaker on copper busbar; phases marked L1, L2 and L3.', alt: 'Circuit breaker above copper busbars with yellow phase labels.' },
    es: { caption: 'Interruptor general sobre embarrado de cobre; fases marcadas L1, L2 y L3.', alt: 'Interruptor automático sobre embarrados de cobre con etiquetas de fase amarillas.' },
    fr: { caption: 'Disjoncteur général sur jeu de barres cuivre ; phases repérées L1, L2 et L3.', alt: 'Disjoncteur au-dessus de barres cuivre avec étiquettes de phase jaunes.' },
    pt: { caption: 'Disjuntor geral sobre barramento de cobre; fases marcadas L1, L2 e L3.', alt: 'Disjuntor sobre barramentos de cobre com etiquetas de fase amarelas.' },
  },
  {
    image: 'work-02',
    nl: { caption: 'PEN-rail met geperste kabelschoenen; elke aardleiding apart afgemonteerd.', alt: 'Koperen PEN-rail met blauwe aders en groen-gele aardleidingen.' },
    en: { caption: 'PEN bar with crimped lugs; every earth conductor terminated separately.', alt: 'Copper PEN bar with blue cores and green-yellow earth conductors.' },
    es: { caption: 'Pletina PEN con terminales prensados; cada conductor de tierra rematado aparte.', alt: 'Pletina PEN de cobre con conductores azules y de tierra amarillo-verde.' },
    fr: { caption: 'Barre PEN avec cosses serties ; chaque conducteur de terre raccordé séparément.', alt: 'Barre PEN en cuivre avec conducteurs bleus et de terre vert-jaune.' },
    pt: { caption: 'Barra PEN com terminais cravados; cada condutor de terra rematado à parte.', alt: 'Barra PEN de cobre com condutores azuis e de terra verde-amarelo.' },
  },
  {
    image: 'work-03',
    nl: { caption: 'Railframe met gemerkte velden; elke bout heeft een aandraaimarkering.', alt: 'Koperen railconstructie met velden 3L, 11L en 12L en rode moermarkeringen.' },
    en: { caption: 'Busbar frame with labelled sections; every bolt carries a torque mark.', alt: 'Copper busbar structure with sections 3L, 11L and 12L and red nut markings.' },
    es: { caption: 'Estructura de embarrado con campos rotulados; cada tornillo lleva marca de par.', alt: 'Estructura de cobre con campos 3L, 11L y 12L y marcas rojas en las tuercas.' },
    fr: { caption: 'Châssis de barres aux champs repérés ; chaque boulon porte un repère de couple.', alt: 'Structure de barres cuivre avec champs 3L, 11L et 12L et repères rouges sur les écrous.' },
    pt: { caption: 'Estrutura de barramento com campos rotulados; cada parafuso tem marca de binário.', alt: 'Estrutura de cobre com campos 3L, 11L e 12L e marcas vermelhas nas porcas.' },
  },
  {
    image: 'work-04',
    nl: { caption: 'Railaansluiting L1–L3 met krimpkousen, aardrail eronder gescheiden.', alt: 'Koperen rails met kabelschoenen en een aparte aardrail linksonder.' },
    en: { caption: 'Busbar connection L1–L3 with heat-shrink, earth bar kept separate below.', alt: 'Copper busbars with cable lugs and a separate earth bar at lower left.' },
    es: { caption: 'Conexión al embarrado L1–L3 con termorretráctil y pletina de tierra separada.', alt: 'Embarrados de cobre con terminales y pletina de tierra independiente abajo.' },
    fr: { caption: 'Raccordement L1–L3 sous gaine thermorétractable, barre de terre séparée en dessous.', alt: 'Barres cuivre avec cosses et barre de terre distincte en bas à gauche.' },
    pt: { caption: 'Ligação ao barramento L1–L3 com manga termorretrátil e barra de terra separada.', alt: 'Barramentos de cobre com terminais e barra de terra independente em baixo.' },
  },
  {
    image: 'work-05',
    nl: { caption: 'Transformator met kabels in klemmen, over de hele rij gelijk gebogen.', alt: 'Groene transformator met rode kabels in kabelklemmen.' },
    en: { caption: 'Transformer with cables in clamps, bent alike across the whole run.', alt: 'Green transformer with red cables in cable clamps.' },
    es: { caption: 'Transformador con cables en abrazaderas, curvados igual en toda la fila.', alt: 'Transformador verde con cables rojos en abrazaderas.' },
    fr: { caption: 'Transformateur, câbles en colliers, cintrés à l’identique sur toute la rangée.', alt: 'Transformateur vert avec câbles rouges dans des colliers de fixation.' },
    pt: { caption: 'Transformador com cabos em abraçadeiras, dobrados por igual em toda a fila.', alt: 'Transformador verde com cabos vermelhos em abraçadeiras.' },
  },
  {
    image: 'work-07',
    nl: { caption: 'Kabelschoenen geperst en gemerkt; mantels op gelijke hoogte afgewerkt.', alt: 'Koperen rail met een rij geperste kabelschoenen en witte, bruine en zwarte aders.' },
    en: { caption: 'Lugs crimped and marked; sheaths finished to the same height.', alt: 'Copper bar with a row of crimped lugs and white, brown and black cores.' },
    es: { caption: 'Terminales prensados y marcados; cubiertas rematadas a la misma altura.', alt: 'Pletina de cobre con una fila de terminales prensados y conductores blancos, marrones y negros.' },
    fr: { caption: 'Cosses serties et repérées ; gaines coupées à la même hauteur.', alt: 'Barre cuivre avec une rangée de cosses serties et des conducteurs blancs, bruns et noirs.' },
    pt: { caption: 'Terminais cravados e marcados; bainhas rematadas à mesma altura.', alt: 'Barra de cobre com uma fila de terminais cravados e condutores brancos, castanhos e pretos.' },
  },
  {
    image: 'work-08',
    nl: { caption: 'Aders met krimpkous op een messing rail, per pool gemerkt.', alt: 'Rode kabels met blauwe krimpkous op een messing rail in een groene kast.' },
    en: { caption: 'Cores with heat-shrink onto a brass bar, marked per pole.', alt: 'Red cables with blue heat-shrink on a brass bar inside a green enclosure.' },
    es: { caption: 'Conductores con termorretráctil sobre pletina de latón, marcados por polo.', alt: 'Cables rojos con termorretráctil azul sobre pletina de latón en un armario verde.' },
    fr: { caption: 'Conducteurs sous gaine sur une barre laiton, repérés pôle par pôle.', alt: 'Câbles rouges à gaine bleue sur une barre en laiton dans une enveloppe verte.' },
    pt: { caption: 'Condutores com manga termorretrátil sobre barra de latão, marcados por polo.', alt: 'Cabos vermelhos com manga azul sobre barra de latão num armário verde.' },
  },
  {
    image: 'work-09',
    nl: { caption: 'Kabelkelder: kabels op klemmen met dezelfde buigradius over de hele rij.', alt: 'Kabelkelder met rode kabels op zwarte kabelklemmen.' },
    en: { caption: 'Cable basement: cables on clamps with the same bend radius throughout.', alt: 'Cable basement with red cables on black cable clamps.' },
    es: { caption: 'Sótano de cables: cables en abrazaderas con el mismo radio de curvatura.', alt: 'Sótano de cables con cables rojos sobre abrazaderas negras.' },
    fr: { caption: 'Cave à câbles : câbles sur colliers, même rayon de courbure sur toute la rangée.', alt: 'Cave à câbles avec des câbles rouges sur des colliers noirs.' },
    pt: { caption: 'Cave de cabos: cabos em abraçadeiras com o mesmo raio de curvatura.', alt: 'Cave de cabos com cabos vermelhos sobre abraçadeiras pretas.' },
  },
];
