import type { Localised } from './types';

export type PartnerCopy = {
  /** what the working relationship actually is — never an endorsement claim */
  role: string;
};

export type Partner = Localised<PartnerCopy> & { name: string };

/**
 * Companies we work alongside. Deliberately worded as a working relationship
 * and nothing more: naming a partner is not a claim that they vouch for us, and
 * their marks are not reproduced here.
 */
export const partners: Partner[] = [
  {
    name: 'TC Zone Energie B.V.',
    nl: { role: 'Samenwerkingspartner voor energieprojecten' },
    en: { role: 'Working partner on energy projects' },
    es: { role: 'Socio colaborador en proyectos de energía' },
    fr: { role: 'Partenaire de travail sur les projets d’énergie' },
    pt: { role: 'Parceiro de trabalho em projetos de energia' },
  },
];
